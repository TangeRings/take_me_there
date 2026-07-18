import React, { useEffect, useRef } from 'react';
import { PreferenceItem, GeminiAnalysis } from '../types';
import { 
  Sparkles, 
  MapPin, 
  Clock, 
  Activity, 
  Database,
  Volume2,
  FileSpreadsheet,
  Wallet
} from 'lucide-react';

interface IntelligencePanelProps {
  currentScreen: number;
  preferences: PreferenceItem[];
  selectedOption: 'A' | 'B' | 'C';
  geminiStreamText?: string;
  geminiAnalysis?: GeminiAnalysis | null;
  geminiError?: string | null;
}

export const IntelligencePanel: React.FC<IntelligencePanelProps> = ({
  currentScreen,
  preferences,
  selectedOption,
  geminiStreamText = '',
  geminiAnalysis = null,
  geminiError = null,
}) => {
  const streamEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (streamEndRef.current) {
      streamEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [geminiStreamText]);

  const getItemsByCat = (cat: string) => preferences.filter(p => p.category === cat);

  const currentOptionText = selectedOption === 'A'
    ? "Accepted split-stay: 1 night Shinmonzen, 2 nights Gion Terrace Boutique. Preserved hotel experience & budget limit."
    : selectedOption === 'B'
    ? "Accepted schedule shift & layover flight: shifts travel window 1 week out, swaps direct flight for 1-stop connecting flight to keep 3 nights at Shinmonzen."
    : "Accepted hotel substitution: stay 3 nights at high-aesthetic Gion Terrace Boutique, saving $340 over budget constraint while keeping direct flights.";

  const attributionTierText = selectedOption === 'A' ? "Direct + Adapted" : selectedOption === 'B' ? "Direct Property Match" : "Assisted Substitution";
  const commissionWeightText = selectedOption === 'A' ? 80 : selectedOption === 'B' ? 100 : 50;
  const isDirectPropertyMatch = selectedOption === 'A' ? "Partial (1 Night)" : selectedOption === 'B' ? "Yes (Full 3 Nights)" : "No (Curated Alternative)";
  const substitutionLevel = selectedOption === 'A' ? "Partial (Split Stay)" : selectedOption === 'B' ? "No Substitution" : "Full Alternative Stay";

  return (
    <div className="w-full h-full bg-brand-charcoal text-white rounded-3xl p-6 flex flex-col justify-between overflow-y-auto border border-white/10 shadow-2xl">

      {/* Header */}
      <div className="border-b border-white/10 pb-4 space-y-1">
        <div className="flex items-center justify-between">
          <span className="text-[10px] uppercase tracking-widest text-brand-accent font-mono font-bold flex items-center gap-1.5">
            <Activity className="w-3.5 h-3.5 animate-pulse text-brand-accent" />
            Live Engine Intelligence
          </span>
          <span className="bg-white/15 px-2 py-0.5 rounded text-[9px] font-mono font-medium text-white/85">
            HACKATHON DECODER
          </span>
        </div>
        <h2 className="text-xl font-serif text-white font-medium">Take Me There — AI Reasoning</h2>
        <p className="text-[11px] text-white/50">
          Visualizing how the adapter engine reconciles creator curation with traveler budget constraints in real time.
        </p>
      </div>

      {/* Content — blank on screen 1, full sections from screen 7 onward */}
      <div className="flex-grow py-5 space-y-6">

        {/* Show awaiting state until Gemini analysis is complete (or actively streaming on screen 7) */}
        {!geminiAnalysis && currentScreen !== 7 ? (
          <div className="flex flex-col items-center justify-center h-full gap-4 py-10 text-center">
            <div className="w-14 h-14 rounded-full border border-white/10 flex items-center justify-center bg-white/5">
              <Sparkles className="w-6 h-6 text-white/20" />
            </div>
            <div className="space-y-1.5">
              <p className="text-sm font-serif text-white/40">Awaiting analysis</p>
              <p className="text-[11px] text-white/25 font-mono leading-relaxed max-w-[220px] mx-auto">
                Click <strong className="text-white/40">Take Me There</strong> on the post to start Gemini analysis
              </p>
            </div>
            <div className="flex flex-col gap-1.5 w-full max-w-[200px] mt-2">
              {['01 Creator Blueprint', '02 Preference Model', '02B AI Reasoning', '03 Decision Trace', '04 Attribution'].map((label) => (
                <div key={label} className="flex items-center gap-2 text-[9px] font-mono text-white/20">
                  <div className="flex-grow h-px bg-white/5" />
                  <span>{label}</span>
                  <div className="flex-grow h-px bg-white/5" />
                </div>
              ))}
            </div>
          </div>
        ) : (
          <>
            {/* Section 01: Creator Experience Blueprint */}
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-mono text-brand-accent bg-brand-accent/10 px-2 py-0.5 rounded border border-brand-accent/20">01</span>
                <h3 className="text-xs uppercase tracking-wider font-mono font-bold text-white/90">Creator Experience Blueprint</h3>
              </div>

              <div className="bg-white/5 rounded-xl p-3 border border-white/5 space-y-2.5 text-xs">
                <div className="grid grid-cols-2 gap-3 text-[11px]">
                  <div>
                    <span className="text-white/40 block font-mono">Core Destination</span>
                    <span className="text-white/90 font-medium flex items-center gap-1 mt-0.5">
                      <MapPin className="w-3 h-3 text-brand-accent" />
                      {geminiAnalysis?.destination && geminiAnalysis.destination !== 'NA'
                        ? geminiAnalysis.destination
                        : <span className="text-white/30 italic">N/A</span>}
                    </span>
                  </div>
                  <div>
                    <span className="text-white/40 block font-mono">Experience Type</span>
                    <span className="text-white/90 font-medium block mt-0.5">
                      {geminiAnalysis?.experienceType && geminiAnalysis.experienceType !== 'NA'
                        ? geminiAnalysis.experienceType
                        : <span className="text-white/30 italic">N/A</span>}
                    </span>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-3 text-[11px] pt-1">
                  <div>
                    <span className="text-white/40 block font-mono">Pace</span>
                    <span className="text-white/90 font-medium flex items-center gap-1 mt-0.5">
                      {geminiAnalysis?.pace && geminiAnalysis.pace !== 'NA'
                        ? geminiAnalysis.pace
                        : <span className="text-white/30 italic">N/A</span>}
                    </span>
                  </div>
                  <div>
                    <span className="text-white/40 block font-mono">Budget Estimate</span>
                    <span className="text-white/90 font-medium flex items-center gap-1 mt-0.5">
                      <Clock className="w-3 h-3 text-brand-accent" />
                      {geminiAnalysis?.budgetEstimate && geminiAnalysis.budgetEstimate !== 'NA'
                        ? geminiAnalysis.budgetEstimate
                        : <span className="text-white/30 italic">N/A</span>}
                    </span>
                  </div>
                </div>

                {/* Target Hotel — full-width row */}
                <div className="pt-1 border-t border-white/5">
                  <span className="text-white/40 block font-mono text-[10px] mb-0.5">Target Hotel</span>
                  {geminiAnalysis?.hotelName && geminiAnalysis.hotelName !== 'NA' ? (
                    <div>
                      <span className="text-white/90 font-medium text-[11px]">{geminiAnalysis.hotelName}</span>
                      {geminiAnalysis.hotelAddress && geminiAnalysis.hotelAddress !== 'NA' && (
                        <span className="text-white/40 text-[10px] block mt-0.5 leading-snug">{geminiAnalysis.hotelAddress}</span>
                      )}
                    </div>
                  ) : (
                    <span className="text-white/30 italic text-[11px]">N/A</span>
                  )}
                </div>
                {geminiAnalysis?.keywords && geminiAnalysis.keywords.length > 0 ? (
                  <div className="pt-1 flex flex-wrap gap-1">
                    {geminiAnalysis.keywords.map((kw, i) => (
                      <span key={i} className="text-[9px] font-mono px-1.5 py-0.5 bg-brand-accent/10 text-brand-accent border border-brand-accent/20 rounded">
                        {kw}
                      </span>
                    ))}
                  </div>
                ) : (
                  <p className="text-[9px] font-mono text-white/30 italic pt-1">keywords — N/A</p>
                )}
              </div>
            </div>

            {/* Section 02: Traveler Preference Model */}
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-mono text-brand-accent bg-brand-accent/10 px-2 py-0.5 rounded border border-brand-accent/20">02</span>
                <h3 className="text-xs uppercase tracking-wider font-mono font-bold text-white/90">Traveler Preference Model</h3>
              </div>

              <div className="bg-white/5 rounded-xl p-3 border border-white/5 space-y-2 text-xs">
                <div className="grid grid-cols-2 gap-2 text-[10px]">
                  <div className="bg-red-500/10 border border-red-500/20 p-2 rounded-lg">
                    <span className="text-red-300 block font-mono uppercase tracking-widest font-bold text-[8px]">HARD CONSTRAINTS</span>
                    {getItemsByCat('hard-constraint').length > 0 ? (
                      <ul className="list-disc list-inside mt-1 text-white/80 space-y-0.5">
                        {getItemsByCat('hard-constraint').map((item, i) => (
                          <li key={i}>{item.text}</li>
                        ))}
                      </ul>
                    ) : (
                      <p className="mt-1 text-white/30 italic text-[10px]">Awaiting traveler input</p>
                    )}
                  </div>

                  <div className="bg-amber-500/10 border border-amber-500/20 p-2 rounded-lg">
                    <span className="text-amber-300 block font-mono uppercase tracking-widest font-bold text-[8px]">MUST PRESERVE</span>
                    {getItemsByCat('must-keep').length > 0 ? (
                      <ul className="list-disc list-inside mt-1 text-white/80 space-y-0.5">
                        {getItemsByCat('must-keep').map((item, i) => (
                          <li key={i} className="truncate">{item.text.replace('Stay at ', '')}</li>
                        ))}
                      </ul>
                    ) : (
                      <p className="mt-1 text-white/30 italic text-[10px]">N/A</p>
                    )}
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-2 text-[10px] pt-1">
                  <div className="bg-emerald-500/10 border border-emerald-500/20 p-2 rounded-lg">
                    <span className="text-emerald-300 block font-mono uppercase tracking-widest font-bold text-[8px]">STRONG PREFERENCES</span>
                    {getItemsByCat('preference').length > 0 ? (
                      <ul className="list-disc list-inside mt-1 text-white/80 space-y-0.5">
                        {getItemsByCat('preference').slice(0, 3).map((item, i) => (
                          <li key={i} className="truncate">{item.text}</li>
                        ))}
                      </ul>
                    ) : (
                      <p className="mt-1 text-white/30 italic text-[10px]">N/A</p>
                    )}
                  </div>

                  <div className="bg-blue-500/10 border border-blue-500/20 p-2 rounded-lg">
                    <span className="text-blue-300 block font-mono uppercase tracking-widest font-bold text-[8px]">ACCEPTED TRADE-OFFS</span>
                    <p className="mt-1 text-white/80 leading-normal line-clamp-3">
                      {currentScreen >= 5 ? currentOptionText : <span className="text-white/30 italic">N/A</span>}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Section 02B: Backstage Cognition — live stream or post-analysis or idle */}
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-mono text-amber-400 bg-amber-400/10 px-2 py-0.5 rounded border border-amber-400/20">02B</span>
                <h3 className="text-xs uppercase tracking-wider font-mono font-bold text-amber-300">Backstage Cognition & Inferences</h3>
              </div>

              {currentScreen === 7 && geminiError ? (
                /* Error state */
                <div className="bg-red-950/30 border border-red-500/30 rounded-xl p-3 space-y-2 text-xs">
                  <div className="flex items-center gap-2 text-[10px] border-b border-white/5 pb-1 text-red-300/80 uppercase font-mono tracking-wider font-bold">
                    <span>Analysis Error</span>
                  </div>
                  <p className="text-[11px] text-red-200 leading-relaxed">{geminiError}</p>
                </div>
              ) : currentScreen === 7 && !geminiAnalysis ? (
                /* Gemini actively streaming */
                <div className="bg-gradient-to-br from-purple-500/10 to-indigo-500/10 border border-purple-500/30 rounded-xl p-3 space-y-2 text-xs">
                  <div className="flex justify-between items-center text-[10px] border-b border-white/5 pb-1 text-purple-300/80 uppercase font-mono tracking-wider font-bold">
                    <span>Gemini Live Reasoning Stream</span>
                    <span className="flex items-center gap-1">
                      <span className="w-1.5 h-1.5 bg-purple-400 rounded-full animate-ping" />
                      Streaming…
                    </span>
                  </div>
                  <div className="max-h-44 overflow-y-auto pr-1">
                    {geminiStreamText ? (
                      <p className="text-[10px] text-white/75 leading-relaxed font-mono whitespace-pre-wrap">{geminiStreamText}</p>
                    ) : (
                      <p className="text-[10px] text-white/30 italic font-mono">Waiting for Gemini response…</p>
                    )}
                    <div ref={streamEndRef} />
                  </div>
                </div>
              ) : geminiAnalysis ? (
                /* Analysis complete — show structured result */
                <div className="bg-gradient-to-br from-emerald-500/10 to-teal-500/10 border border-emerald-500/30 rounded-xl p-3 space-y-2 text-xs">
                  <div className="flex justify-between items-center text-[10px] border-b border-white/5 pb-1 text-emerald-300/80 uppercase font-mono tracking-wider font-bold">
                    <span>Gemini Analysis Complete</span>
                    <span>gemini-3.5-flash</span>
                  </div>
                  <div className="space-y-1.5">
                    <div className="flex items-center justify-between text-[11px]">
                      <span className="text-white/50">Destination:</span>
                      <span className={geminiAnalysis.destination === 'NA' ? 'text-white/30 italic font-mono text-[10px]' : 'text-white/90 font-semibold'}>{geminiAnalysis.destination}</span>
                    </div>
                    <div className="flex items-center justify-between text-[11px]">
                      <span className="text-white/50">Experience Type:</span>
                      <span className={geminiAnalysis.experienceType === 'NA' ? 'text-white/30 italic font-mono text-[10px]' : 'text-emerald-400 font-mono font-bold'}>{geminiAnalysis.experienceType}</span>
                    </div>
                    <div className="flex items-center justify-between text-[11px]">
                      <span className="text-white/50">Pace:</span>
                      <span className={geminiAnalysis.pace === 'NA' ? 'text-white/30 italic font-mono text-[10px]' : 'text-white/90'}>{geminiAnalysis.pace}</span>
                    </div>
                    {geminiAnalysis.budgetEstimate && (
                      <div className="flex items-center justify-between text-[11px]">
                        <span className="text-white/50">Budget Hint:</span>
                        <span className="text-emerald-400">{geminiAnalysis.budgetEstimate}</span>
                      </div>
                    )}
                    <div className="pt-1 flex flex-wrap gap-1">
                      {geminiAnalysis.keywords.length > 0
                        ? geminiAnalysis.keywords.map((kw, i) => (
                            <span key={i} className="text-[9px] font-mono px-1.5 py-0.5 bg-emerald-950/40 text-emerald-200 border border-emerald-500/20 rounded">
                              {kw}
                            </span>
                          ))
                        : <span className="text-[9px] font-mono text-white/30 italic">keywords — NA</span>
                      }
                    </div>
                  </div>
                </div>
              ) : (
                /* Post-screen-7 but no API key — neutral placeholder */
                <div className="bg-white/[0.03] border border-white/10 rounded-xl p-3 text-[10px] text-white/25 font-mono italic text-center">
                  Gemini reasoning will appear here during analysis
                </div>
              )}
            </div>

            {/* Section 03: Decision Trace */}
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-mono text-brand-accent bg-brand-accent/10 px-2 py-0.5 rounded border border-brand-accent/20">03</span>
                <h3 className="text-xs uppercase tracking-wider font-mono font-bold text-white/90">Decision Trace</h3>
              </div>

              <div className="bg-white/5 rounded-xl p-3 border border-white/5 text-xs">
                {!geminiAnalysis && currentScreen !== 7 ? (
                  <p className="text-white/25 font-mono italic text-center text-[10px]">No steps completed yet</p>
                ) : (
                  <div className="space-y-2.5">

                    {/* Step 1 — unlocks after Gemini analysis */}
                    <div className="flex items-start gap-2">
                      <span className={`w-2 h-2 rounded-full mt-1.5 flex-shrink-0 ${geminiAnalysis ? 'bg-brand-accent' : 'bg-white/20 animate-pulse'}`} />
                      <div>
                        <p className="text-[11px] font-semibold text-white/90">Gemini Vision Analysis</p>
                        <p className="text-[10px] text-white/50">
                          {geminiAnalysis
                            ? `Extracted: ${geminiAnalysis.experienceType !== 'NA' ? geminiAnalysis.experienceType : '—'} · ${geminiAnalysis.destination !== 'NA' ? geminiAnalysis.destination : '—'}`
                            : 'Analyzing post images and caption…'}
                        </p>
                        {geminiAnalysis?.hotelName && geminiAnalysis.hotelName !== 'NA' && (
                          <p className="text-[10px] text-brand-accent/70 mt-0.5">Hotel identified: {geminiAnalysis.hotelName}</p>
                        )}
                      </div>
                    </div>

                    {/* Step 2-3 — unlocks after voice input (hard constraints populated) */}
                    {getItemsByCat('hard-constraint').length > 0 && (
                      <div className="flex items-start gap-2">
                        <span className="w-2 h-2 rounded-full mt-1.5 flex-shrink-0 bg-brand-accent" />
                        <div>
                          <p className="text-[11px] font-semibold text-white/90">Traveler Preference Extraction</p>
                          <p className="text-[10px] text-white/50">
                            Constraints captured: {getItemsByCat('hard-constraint').map(i => i.text).join(' · ')}
                          </p>
                        </div>
                      </div>
                    )}

                    {/* Step 4 — unlocks after entering trade-off screen */}
                    {currentScreen >= 4 && (
                      <div className="flex items-start gap-2">
                        <span className="w-2 h-2 rounded-full mt-1.5 flex-shrink-0 bg-brand-accent" />
                        <div>
                          <p className="text-[11px] font-semibold text-white/90">Conflict &amp; Solver Options</p>
                          <p className="text-[10px] text-white/50">Budget conflict detected. Three adaptive options generated.</p>
                        </div>
                      </div>
                    )}

                    {/* Step 5-6 — unlocks after trade-off confirmed */}
                    {currentScreen >= 5 && (
                      <div className="flex items-start gap-2">
                        <span className="w-2 h-2 rounded-full mt-1.5 flex-shrink-0 bg-brand-accent" />
                        <div>
                          <p className="text-[11px] font-semibold text-white/90">Adaptive Booking Assembly</p>
                          <p className="text-[10px] text-white/50">
                            Option <strong className="text-brand-accent font-mono">{selectedOption}</strong> selected. Final package computed.
                          </p>
                        </div>
                      </div>
                    )}

                  </div>
                )}
              </div>
            </div>

            {/* Section 04: Creator Attribution */}
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-mono text-brand-accent bg-brand-accent/10 px-2 py-0.5 rounded border border-brand-accent/20">04</span>
                <h3 className="text-xs uppercase tracking-wider font-mono font-bold text-white/90">Creator Attribution & Royalty Engine</h3>
              </div>

              <div className="bg-brand-accent/10 rounded-xl p-3 border border-brand-accent/20 space-y-2.5 text-xs">
                <div className="grid grid-cols-2 gap-2 text-[10px]">
                  <div>
                    <span className="text-white/40 block font-mono uppercase tracking-wider text-[8px]">DIRECT PROPERTY MATCH</span>
                    <span className="text-brand-accent font-semibold block mt-0.5">{isDirectPropertyMatch}</span>
                  </div>
                  <div>
                    <span className="text-white/40 block font-mono uppercase tracking-wider text-[8px]">SUBSTITUTION STATE</span>
                    <span className="text-brand-accent font-semibold block mt-0.5">{substitutionLevel}</span>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-2 text-[10px] border-t border-white/5 pt-2">
                  <div>
                    <span className="text-white/40 block font-mono uppercase tracking-wider text-[8px]">ATTRIBUTION TIER</span>
                    <span className="text-white font-serif font-bold block mt-0.5">{attributionTierText}</span>
                  </div>
                  <div>
                    <span className="text-white/40 block font-mono uppercase tracking-wider text-[8px]">SUGGESTED WEIGHT</span>
                    <span className="text-emerald-400 font-mono font-bold text-sm block mt-0.5">{commissionWeightText}%</span>
                  </div>
                </div>
              </div>
            </div>
          </>
        )}
      </div>

      {/* Integration Labels */}
      <div className="border-t border-white/10 pt-4 flex flex-wrap gap-2 text-[9px] font-mono text-white/45 justify-between">
        <span className="flex items-center gap-1 hover:text-white transition-colors">
          <Database className="w-3.5 h-3.5 text-brand-accent" />
          Gemini Vision (Active)
        </span>
        <span className="flex items-center gap-1 hover:text-white transition-colors">
          <Volume2 className="w-3.5 h-3.5 text-brand-accent" />
          Vocal Bridge (Voice)
        </span>
        <span className="flex items-center gap-1 hover:text-white transition-colors">
          <FileSpreadsheet className="w-3.5 h-3.5 text-brand-accent" />
          Sabre GDS (Flights)
        </span>
        <span className="flex items-center gap-1 hover:text-white transition-colors">
          <Wallet className="w-3.5 h-3.5 text-brand-accent" />
          PayPal SPLIT (Payouts)
        </span>
      </div>
    </div>
  );
};
