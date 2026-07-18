import React, { useEffect, useRef, useState } from 'react';
import { useVocalBridge, useTranscript, useAgentActions } from '@vocalbridgeai/react';
import { Mic, MicOff, X, Sparkles } from 'lucide-react';
import { PreferenceItem, GeminiAnalysis } from '../types';

interface ExtractedKeyword {
  type: 'travel_date' | 'num_people' | 'budget' | 'hotel_pref' | 'flight_pref' | 'other';
  value: string;
}

const KEYWORD_EMOJI: Record<ExtractedKeyword['type'], string> = {
  travel_date: '📅',
  num_people: '👥',
  budget:     '💰',
  hotel_pref: '🏨',
  flight_pref: '✈️',
  other:      '📌',
};

interface VoiceSheetProps {
  onClose: () => void;
  onConfirm: (constraints: PreferenceItem[]) => void;
  onKeywordUpdate?: (pref: PreferenceItem) => void;
  geminiAnalysis?: GeminiAnalysis | null;
}

export const VoiceSheet: React.FC<VoiceSheetProps> = ({ onClose, onConfirm, onKeywordUpdate, geminiAnalysis }) => {
  const { state, connect, disconnect, sendAction, setMicrophoneEnabled } = useVocalBridge();
  const { transcript } = useTranscript();
  const { onAction } = useAgentActions();
  const [keywords, setKeywords] = useState<ExtractedKeyword[]>([]);
  const [pendingConstraints, setPendingConstraints] = useState<string[]>([]);
  const transcriptEndRef = useRef<HTMLDivElement>(null);
  const hasApiKey = !!import.meta.env.VITE_VOCAL_BRIDGE_API_KEY;

  // Auto-scroll transcript
  useEffect(() => {
    transcriptEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [transcript]);

  // Listen for agent client actions
  useEffect(() => {
    const unsubKw = onAction('keyword_extracted', (payload) => {
      const kw = payload as unknown as ExtractedKeyword;
      setKeywords(prev => {
        const filtered = prev.filter(k => k.type !== kw.type);
        return [...filtered, kw];
      });
      // Sync to app preferences in real-time for Sabre context
      onKeywordUpdate?.({
        id: kw.type === 'flight_pref' ? 'p-flights' : `vb-kw-${kw.type}`,
        text: kw.value,
        category: 'hard-constraint',
      });
    });
    const unsubDone = onAction('preferences_complete', (payload) => {
      const { constraints } = payload as { constraints: string[] };
      setPendingConstraints(constraints);
    });
    return () => { unsubKw(); unsubDone(); };
  }, [onAction]);

  const isConnected = state === 'connected';
  const isConnecting = state === 'connecting';

  // Show hotel card only when the agent has mentioned the hotel name in transcript
  const hotelName = geminiAnalysis?.hotelName && geminiAnalysis.hotelName !== 'NA'
    ? geminiAnalysis.hotelName
    : null;
  const hotelMentioned = hotelName !== null && transcript.some(entry =>
    entry.text.toLowerCase().includes(hotelName.toLowerCase().split(' ')[0]) ||
    entry.text.toLowerCase().includes('hotel') ||
    entry.text.toLowerCase().includes('ryokan') ||
    entry.text.toLowerCase().includes('stay')
  );

  const handleMicClick = async () => {
    if (isConnected) {
      await disconnect();
    } else if (!isConnecting) {
      try {
        await connect();
        // Mute mic while context loads so user can't speak before agent has context
        await setMicrophoneEnabled(false);
        // Send Gemini post data as a notify action (silently injected into agent context)
        if (geminiAnalysis) {
          await sendAction('initialize_context', {
            destination: geminiAnalysis.destination,
            hotelName: geminiAnalysis.hotelName,
            hotelAddress: geminiAnalysis.hotelAddress,
            experienceType: geminiAnalysis.experienceType,
            budgetEstimate: geminiAnalysis.budgetEstimate,
            pace: geminiAnalysis.pace,
            keywords: geminiAnalysis.keywords,
            signatureElements: geminiAnalysis.signatureElements,
          });
        }
        // Re-enable mic once context is delivered
        await setMicrophoneEnabled(true);
      } catch (e) {
        console.error('VocalBridge connect error:', e);
      }
    }
  };

  const handleConfirm = () => {
    // Build hard-constraint preference items from either
    // preferences_complete payload or accumulated keywords
    const source =
      pendingConstraints.length > 0
        ? pendingConstraints
        : keywords.map(k => `${k.value}`);

    const constraints: PreferenceItem[] = source.map((text, i) => ({
      id: `vb-c-${i}`,
      text,
      category: 'hard-constraint',
    }));

    // Also add keyword pills that weren't in preferences_complete
    if (pendingConstraints.length === 0 && keywords.length > 0) {
      // already mapped above
    }

    onConfirm(constraints);
  };

  return (
    <>
      {/* Soft scrim above the sheet */}
      <div className="h-10 bg-gradient-to-t from-black/25 to-transparent pointer-events-none" />

      <div className="bg-white rounded-t-[28px] border-t border-brand-charcoal/5 shadow-[0_-12px_40px_rgba(28,27,25,0.18)] p-5 space-y-3">
        {/* Drawer handle */}
        <div className="w-12 h-1.5 bg-stone-200 rounded-full mx-auto" />

        {/* Header row — mic + hotel card side by side */}
        <div className="flex items-center gap-3">
          {/* Mic button */}
          <button
            onClick={handleMicClick}
            disabled={isConnecting}
            className={`
              w-10 h-10 rounded-full flex items-center justify-center transition-all cursor-pointer flex-shrink-0
              shadow border-2 disabled:opacity-60 disabled:cursor-wait
              ${isConnected
                ? 'bg-red-500 border-red-400 text-white animate-pulse shadow-red-200'
                : isConnecting
                  ? 'bg-stone-200 border-stone-300 text-stone-400'
                  : 'bg-brand-charcoal border-brand-charcoal/80 text-white hover:bg-brand-charcoal/90 active:scale-95'}
            `}
            aria-label={isConnected ? 'Stop listening' : 'Start listening'}
          >
            {isConnected ? <MicOff className="w-4 h-4" /> : <Mic className="w-4 h-4" />}
          </button>

          {/* Hotel card (fades in) or Vocal Bridge label — same slot */}
          <div className="flex-1 min-w-0 relative h-10">
            {/* Vocal Bridge label — hidden once hotel appears */}
            <div className={`absolute inset-0 flex flex-col justify-center transition-opacity duration-300 ${hotelMentioned ? 'opacity-0 pointer-events-none' : 'opacity-100'}`}>
              <span className="text-[10px] uppercase font-mono tracking-widest text-brand-accent font-bold leading-none">Vocal Bridge</span>
              <span className="text-[9px] font-mono text-stone-400 leading-none mt-0.5">
                {isConnecting ? 'Connecting…' : isConnected ? 'Listening' : 'Tap mic to start'}
              </span>
            </div>
            {/* Hotel card — fades in when hotel mentioned */}
            <div className={`absolute inset-0 flex items-center gap-2 bg-stone-50 border border-stone-100 rounded-xl px-2 transition-opacity duration-500 ${hotelMentioned ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}>
              <img
                src="/images/hotel2.png"
                alt="Hotel"
                className="w-8 h-8 rounded-lg object-cover border border-white shadow-sm flex-shrink-0"
              />
              <div className="min-w-0 flex-1">
                <p className="text-[8px] font-mono uppercase tracking-wider text-stone-400 leading-none">Target Hotel</p>
                <p className="text-[11px] font-semibold text-brand-charcoal leading-tight truncate">{hotelName}</p>
              </div>
            </div>
          </div>

          {/* Live indicator dot */}
          <span className={`w-2 h-2 rounded-full flex-shrink-0 ${isConnected ? 'bg-brand-accent animate-pulse' : 'bg-stone-200'}`} />
        </div>

        {/* Live Transcript */}
        <div className="bg-brand-cream/80 rounded-2xl border border-brand-charcoal/5 overflow-hidden">
          <div className="px-3 pt-2 pb-1 border-b border-brand-charcoal/5">
            <span className="text-[9px] font-mono uppercase tracking-wider text-stone-400 font-bold">Live Transcript</span>
          </div>
          <div className="max-h-24 overflow-y-auto px-3 py-2 space-y-1.5">
            {transcript.length === 0 ? (
              <p className="text-[11px] text-stone-400 italic font-serif">
                Agent will ask: "When would you like to travel, and how many people are joining?"
              </p>
            ) : (
              transcript.map((entry, i) => (
                <p key={i} className={`text-[11px] leading-snug font-sans ${entry.role === 'agent' ? 'text-stone-500' : 'text-brand-charcoal font-medium'}`}>
                  <span className="font-mono text-[9px] mr-1 opacity-60">{entry.role === 'agent' ? 'Agent' : 'You'}:</span>
                  {entry.text}
                </p>
              ))
            )}
            <div ref={transcriptEndRef} />
          </div>
        </div>

        {/* Extracted Keywords */}
        <div className="space-y-1.5">
          <span className="text-[9px] font-mono uppercase tracking-wider text-stone-400 font-bold">Extracted</span>
          <div className="flex flex-wrap gap-1.5 min-h-[28px]">
            {keywords.length === 0 ? (
              <span className="text-[10px] text-stone-300 italic font-mono">keywords will appear here…</span>
            ) : (
              keywords.map((kw, i) => (
                <span
                  key={i}
                  className="flex items-center gap-1 text-[10px] font-mono px-2.5 py-1 bg-brand-charcoal text-white rounded-full"
                >
                  <span>{KEYWORD_EMOJI[kw.type]}</span>
                  <span>{kw.value}</span>
                </span>
              ))
            )}
          </div>
        </div>

        {/* Actions */}
        <div className="grid grid-cols-5 gap-2">
          <button
            onClick={() => { disconnect(); onClose(); }}
            className="col-span-1 bg-stone-100 hover:bg-stone-200 text-stone-700 py-3 rounded-full flex items-center justify-center transition-all cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
          <button
            onClick={handleConfirm}
            className="col-span-4 bg-brand-charcoal hover:bg-brand-charcoal/90 text-white font-sans uppercase tracking-widest py-3 px-4 rounded-full text-[10px] font-bold transition-all flex items-center justify-center gap-1.5 shadow-sm cursor-pointer"
          >
            <Sparkles className="w-3.5 h-3.5 text-brand-accent" />
            <span>Analyze &amp; Match Experience</span>
          </button>
        </div>
      </div>
    </>
  );
};
