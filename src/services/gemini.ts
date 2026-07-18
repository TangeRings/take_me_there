import { GoogleGenAI } from '@google/genai';
import { GeminiAnalysis } from '../types';

const MODEL = 'gemini-3.5-flash';
const JSON_SENTINEL = '---JSON---';

const SYSTEM_PROMPT = `You are an AI travel experience analyst. Analyze the travel creator post (images + caption) below to extract a structured trip blueprint.

First write a natural-language analysis (3–5 short paragraphs) covering:
- What the images reveal about the destination, vibe, and key locations
- What the caption communicates about pace, priorities, and style
- Which elements are "signature" to this creator's aesthetic
- Any budget or duration clues in the caption
- Any specific hotel or accommodation names and addresses mentioned

Then output the following line exactly as written (no extra text before or after it on the line):
${JSON_SENTINEL}
Then output ONLY a valid JSON object — no markdown fences, no extra text — with this exact shape:
{
  "destination": "City, Country",
  "keywords": ["keyword1", "keyword2", "keyword3", "keyword4"],
  "experienceType": "one short phrase, e.g. Slow Travel / Cultural Immersion",
  "budgetEstimate": "e.g. ~$3,200 for 7 days (mentioned in caption)",
  "pace": "Slow",
  "signatureElements": ["element1", "element2", "element3", "element4"],
  "hotelName": "Exact hotel or accommodation name from the caption",
  "hotelAddress": "Full address if mentioned in the caption"
}
Use null (not a string) for budgetEstimate if nothing is mentioned in the caption.
Use "NA" for hotelName and hotelAddress if no hotel or accommodation is explicitly named.`;

async function fetchImageAsBase64(url: string): Promise<{ data: string; mimeType: string } | null> {
  try {
    const response = await fetch(url);
    if (!response.ok) return null;
    const blob = await response.blob();
    return new Promise((resolve) => {
      const reader = new FileReader();
      reader.onloadend = () => {
        const result = reader.result as string;
        const [header, data] = result.split(',');
        const mimeType = header.split(':')[1].split(';')[0];
        resolve({ data, mimeType });
      };
      reader.onerror = () => resolve(null);
      reader.readAsDataURL(blob);
    });
  } catch {
    return null;
  }
}

// Try multiple strategies to extract a JSON object from the full response text.
// Returns whatever fields were successfully parsed; missing fields become "NA".
function extractJson(fullText: string): GeminiAnalysis {
  let parsed: Record<string, unknown> | null = null;

  // Strategy 1: look for our sentinel, then parse everything after it
  const sentinelIdx = fullText.indexOf(JSON_SENTINEL);
  if (sentinelIdx !== -1) {
    const afterSentinel = fullText.slice(sentinelIdx + JSON_SENTINEL.length).trim();
    // Strip optional markdown fences
    const stripped = afterSentinel.replace(/^```(?:json)?\s*/i, '').replace(/\s*```$/, '').trim();
    try { parsed = JSON.parse(stripped); } catch { /* fall through */ }
  }

  // Strategy 2: find the last well-formed {...} block anywhere in the text
  if (!parsed) {
    const lastBrace = fullText.lastIndexOf('}');
    if (lastBrace !== -1) {
      let depth = 0;
      let start = -1;
      for (let i = lastBrace; i >= 0; i--) {
        if (fullText[i] === '}') depth++;
        if (fullText[i] === '{') { depth--; if (depth === 0) { start = i; break; } }
      }
      if (start !== -1) {
        try { parsed = JSON.parse(fullText.slice(start, lastBrace + 1)); } catch { /* fall through */ }
      }
    }
  }

  // Build result — keep successfully parsed fields, use "NA" for anything missing or wrong type
  return {
    destination: typeof parsed?.destination === 'string' ? parsed.destination : 'NA',
    keywords: Array.isArray(parsed?.keywords) ? (parsed.keywords as string[]) : [],
    experienceType: typeof parsed?.experienceType === 'string' ? parsed.experienceType : 'NA',
    budgetEstimate: typeof parsed?.budgetEstimate === 'string' ? parsed.budgetEstimate : null,
    pace: typeof parsed?.pace === 'string' ? parsed.pace : 'NA',
    signatureElements: Array.isArray(parsed?.signatureElements) ? (parsed.signatureElements as string[]) : [],
    hotelName: typeof parsed?.hotelName === 'string' ? parsed.hotelName : 'NA',
    hotelAddress: typeof parsed?.hotelAddress === 'string' ? parsed.hotelAddress : 'NA',
  };
}

export async function analyzeInstagramPost(
  imageUrls: string[],
  caption: string,
  onToken: (token: string) => void,
  apiKey: string
): Promise<GeminiAnalysis> {
  const ai = new GoogleGenAI({ apiKey });

  const imageResults = await Promise.all(imageUrls.map(fetchImageAsBase64));
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const parts: any[] = [];

  let imageCount = 0;
  for (const img of imageResults) {
    if (img) {
      parts.push({ inlineData: { data: img.data, mimeType: img.mimeType } });
      imageCount++;
    }
  }
  console.log(`[TakeMeThere] Loaded ${imageCount}/${imageUrls.length} images as base64`);

  if (imageCount === 0) {
    parts.push({
      text: `[Images could not be loaded directly — descriptions provided instead:
Image 1: A traditional Kyoto street at dawn — Yasaka Pagoda visible, wooden machiya townhouses, two women in kimono.
Image 2: Interior of a luxury minimalist boutique hotel (The Shinmonzen, Gion) — exposed timber, floor-to-ceiling glass overlooking a canal.
Image 3: An elegantly plated kaiseki dinner — lacquerware bowls, delicate seasonal ingredients on a wooden counter.]`,
    });
  }

  parts.push({ text: `Creator caption:\n"${caption}"\n\n${SYSTEM_PROMPT}` });

  const stream = await ai.models.generateContentStream({
    model: MODEL,
    contents: [{ role: 'user', parts }],
  });

  let fullText = '';
  let sentinelReached = false;
  let streamedUpTo = 0;

  for await (const chunk of stream) {
    const chunkText = chunk.text ?? '';
    fullText += chunkText;

    if (!sentinelReached) {
      const sentinelIdx = fullText.indexOf(JSON_SENTINEL);
      if (sentinelIdx !== -1) {
        // Stream everything up to the sentinel to the panel, then stop
        const reasoningText = fullText.slice(0, sentinelIdx);
        if (streamedUpTo < reasoningText.length) {
          onToken(reasoningText.slice(streamedUpTo));
        }
        sentinelReached = true;
      } else {
        // Stream this chunk (stay behind the potential partial sentinel boundary by 20 chars)
        const safeEnd = Math.max(streamedUpTo, fullText.length - 20);
        if (safeEnd > streamedUpTo) {
          onToken(fullText.slice(streamedUpTo, safeEnd));
          streamedUpTo = safeEnd;
        }
      }
    }
  }

  // Flush any remaining reasoning text before the sentinel
  if (!sentinelReached && streamedUpTo < fullText.length) {
    onToken(fullText.slice(streamedUpTo));
  }

  console.log('[TakeMeThere] Full Gemini response length:', fullText.length, 'chars');
  console.log('[TakeMeThere] Sentinel found:', fullText.includes(JSON_SENTINEL));
  console.log('[TakeMeThere] Raw response:\n', fullText);

  const analysis = extractJson(fullText);
  console.log('[TakeMeThere] Parsed analysis:', analysis);

  // Flag any NA fields so the caller can show the user what didn't parse
  const naFields = (Object.entries(analysis) as [string, unknown][])
    .filter(([, v]) => v === 'NA' || (Array.isArray(v) && v.length === 0))
    .map(([k]) => k);
  if (naFields.length > 0) {
    console.warn('[TakeMeThere] Fields that could not be parsed (returned NA):', naFields);
  }

  return analysis;
}
