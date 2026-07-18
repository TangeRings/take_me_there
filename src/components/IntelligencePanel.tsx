import React from 'react';
import { PreferenceItem, TradeOffOption } from '../types';
import { 
  Sparkles, 
  MapPin, 
  Clock, 
  Layers, 
  Activity, 
  Coins, 
  CheckCircle, 
  Lock, 
  HelpCircle,
  Database,
  Volume2,
  FileSpreadsheet,
  Wallet
} from 'lucide-react';

interface IntelligencePanelProps {
  currentScreen: number;
  preferences: PreferenceItem[];
  selectedOption: 'A' | 'B' | 'C';
}

export const IntelligencePanel: React.FC<IntelligencePanelProps> = ({
  currentScreen,
  preferences,
  selectedOption
}) => {
  // Helper to find list items
  const getItemsByCat = (cat: string) => preferences.filter(p => p.category === cat);

  // Dynamic values depending on user selection
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
      {/* Header Panel */}
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
        <h2 className="text-xl font-serif text-white font-medium">ExperienceLink Core Reasoning</h2>
        <p className="text-[11px] text-white/50">
          Visualizing how the adapter engine reconciles creator curation with traveler budget constraints in real time.
        </p>
      </div>

      {/* Grid Content */}
      <div className="flex-grow py-5 space-y-6">
        
        {/* Section 1: Creator Experience Blueprint */}
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <span className="text-[10px] font-mono text-brand-accent bg-brand-accent/10 px-2 py-0.5 rounded border border-brand-accent/20">01</span>
            <h3 className="text-xs uppercase tracking-wider font-mono font-bold text-white/90">Creator Experience Blueprint</h3>
          </div>
          
          <div className="bg-white/5 rounded-xl p-3 border border-white/5 space-y-2.5 text-xs">
            <div className="flex justify-between items-center text-[11px] border-b border-white/5 pb-1.5">
              <span className="text-white/40 font-mono">Source Blueprint</span>
              <span className="text-white/95 font-semibold font-serif">“Kyoto, Slowly” by @mayaexplores</span>
            </div>
            <div className="grid grid-cols-2 gap-3 text-[11px]">
              <div>
                <span className="text-white/40 block font-mono">Core Destination</span>
                <span className="text-white/90 font-medium flex items-center gap-1 mt-0.5">
                  <MapPin className="w-3 h-3 text-brand-accent" /> Kyoto, Gion District
                </span>
              </div>
              <div>
                <span className="text-white/40 block font-mono">Anchor Anchor</span>
                <span className="text-white/90 font-medium block mt-0.5">The Shinmonzen (Luxury)</span>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-3 text-[11px] pt-1">
              <div>
                <span className="text-white/40 block font-mono">Original Duration</span>
                <span className="text-white/90 font-medium flex items-center gap-1 mt-0.5">
                  <Clock className="w-3 h-3 text-brand-accent" /> 7 Days ($3,200)
                </span>
              </div>
              <div>
                <span className="text-white/40 block font-mono">Replaceable Assets</span>
                <span className="text-white/90 font-medium block mt-0.5">Flights, dates, alt hotel</span>
              </div>
            </div>
          </div>
        </div>

        {/* Section 2: Traveler Preference Model */}
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <span className="text-[10px] font-mono text-brand-accent bg-brand-accent/10 px-2 py-0.5 rounded border border-brand-accent/20">02</span>
            <h3 className="text-xs uppercase tracking-wider font-mono font-bold text-white/90">Traveler Preference Model</h3>
          </div>

          <div className="bg-white/5 rounded-xl p-3 border border-white/5 space-y-2 text-xs">
            <div className="grid grid-cols-2 gap-2 text-[10px]">
              <div className="bg-red-500/10 border border-red-500/20 p-2 rounded-lg">
                <span className="text-red-300 block font-mono uppercase tracking-widest font-bold text-[8px]">HARD CONSTRAINTS</span>
                <ul className="list-disc list-inside mt-1 text-white/80 space-y-0.5">
                  <li>4 Days max duration</li>
                  <li>$1,800 total budget</li>
                  <li>SFO Departure</li>
                </ul>
              </div>
              
              <div className="bg-amber-500/10 border border-amber-500/20 p-2 rounded-lg">
                <span className="text-amber-300 block font-mono uppercase tracking-widest font-bold text-[8px]">MUST PRESERVE</span>
                <ul className="list-disc list-inside mt-1 text-white/80 space-y-0.5">
                  {getItemsByCat('must-keep').map((item, i) => (
                    <li key={i} className="truncate">{item.text.replace('Stay at ', '')}</li>
                  ))}
                  {getItemsByCat('must-keep').length === 0 && <li className="italic text-white/30">None designated</li>}
                </ul>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-2 text-[10px] pt-1">
              <div className="bg-emerald-500/10 border border-emerald-500/20 p-2 rounded-lg">
                <span className="text-emerald-300 block font-mono uppercase tracking-widest font-bold text-[8px]">STRONG PREFERENCES</span>
                <ul className="list-disc list-inside mt-1 text-white/80 space-y-0.5">
                  {getItemsByCat('preference').slice(0, 3).map((item, i) => (
                    <li key={i} className="truncate">{item.text}</li>
                  ))}
                </ul>
              </div>

              <div className="bg-blue-500/10 border border-blue-500/20 p-2 rounded-lg">
                <span className="text-blue-300 block font-mono uppercase tracking-widest font-bold text-[8px]">ACCEPTED TRADE-OFFS</span>
                <p className="mt-1 text-white/80 leading-normal line-clamp-3">
                  {currentScreen >= 4 ? currentOptionText : "Awaiting trade-off selection in Step 4"}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Section 2.5: Cognitive Inference & Logic (Behind-the-Scenes) */}
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <span className="text-[10px] font-mono text-amber-400 bg-amber-400/10 px-2 py-0.5 rounded border border-amber-400/20">02B</span>
            <h3 className="text-xs uppercase tracking-wider font-mono font-bold text-amber-300">Backstage Cognition & Inferences</h3>
          </div>

          <div className="bg-gradient-to-br from-amber-500/10 to-orange-500/10 border border-amber-500/30 rounded-xl p-3 space-y-2 text-xs">
            <div className="flex justify-between items-center text-[10px] border-b border-white/5 pb-1 text-amber-300/80 uppercase font-mono tracking-wider font-bold">
              <span>Active Agent Inferences</span>
              <span>Gemini Rule Engine v1.1</span>
            </div>
            
            <div className="space-y-1.5">
              <div className="flex items-center justify-between text-[11px]">
                <span className="text-white/50">Price Sensitivity:</span>
                <span className="text-emerald-400 font-mono font-bold">LOW (Aesthetic Priority)</span>
              </div>
              <p className="text-[11px] text-white/80 leading-normal">
                <strong>Rule Matrix:</strong> <code>If lodgingAnchor == Luxury (The Shinmonzen) ➔ PriceSensitivity = low</code>
              </p>
              <p className="text-[10px] text-white/50 leading-relaxed italic">
                Nicole kept the luxury property anchor in her parameters. The engine identifies that aesthetic match is non-negotiable, shifting flight scheduling and secondary lodging variables rather than replacing the premium hotel.
              </p>
            </div>
          </div>
        </div>

        {/* Section 3: Live Decision Trace */}
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <span className="text-[10px] font-mono text-brand-accent bg-brand-accent/10 px-2 py-0.5 rounded border border-brand-accent/20">03</span>
            <h3 className="text-xs uppercase tracking-wider font-mono font-bold text-white/90">Decision Trace</h3>
          </div>

          <div className="bg-white/5 rounded-xl p-3 border border-white/5 space-y-3 text-xs">
            {/* Timeline traces */}
            <div className="space-y-2.5">
              <div className="flex items-start gap-2">
                <span className={`w-2 h-2 rounded-full mt-1.5 ${currentScreen >= 1 ? 'bg-brand-accent' : 'bg-white/20'}`} />
                <div>
                  <p className="text-[11px] font-semibold text-white/90">Parse Creator Experience (Step 1)</p>
                  <p className="text-[10px] text-white/50">Extracted aesthetic signatures and luxury anchor stay rules from @mayaexplores.</p>
                </div>
              </div>

              <div className="flex items-start gap-2">
                <span className={`w-2 h-2 rounded-full mt-1.5 ${currentScreen >= 2 ? 'bg-brand-accent' : 'bg-white/20'}`} />
                <div>
                  <p className="text-[11px] font-semibold text-white/90">Acoustic Preference Extraction (Step 2-3)</p>
                  <p className="text-[10px] text-white/50">Nicole's vocal statement processed. Extracted 4-day budget limit of $1,800.</p>
                </div>
              </div>

              <div className="flex items-start gap-2">
                <span className={`w-2 h-2 rounded-full mt-1.5 ${currentScreen >= 4 ? 'bg-brand-accent' : 'bg-white/20'}`} />
                <div>
                  <p className="text-[11px] font-semibold text-white/90">Conflict & Solver Options (Step 4)</p>
                  <p className="text-[10px] text-white/50">Full hotel stay cost ($1,440) + airfare ($760) exceeded budget by $340. Generated alternatives.</p>
                </div>
              </div>

              <div className="flex items-start gap-2">
                <span className={`w-2 h-2 rounded-full mt-1.5 ${currentScreen >= 5 ? 'bg-brand-accent' : 'bg-white/20'}`} />
                <div>
                  <p className="text-[11px] font-semibold text-white/90">Adaptive Booking Assembly (Step 5-6)</p>
                  <p className="text-[10px] text-white/50">Currently active choice: Option <strong className="text-brand-accent font-mono">{selectedOption}</strong>. Computed final budget package.</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Section 4: Creator Attribution */}
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

      </div>

      {/* Integration Labels Map */}
      <div className="border-t border-white/10 pt-4 flex flex-wrap gap-2 text-[9px] font-mono text-white/45 justify-between">
        <span className="flex items-center gap-1 hover:text-white transition-colors">
          <Database className="w-3.5 h-3.5 text-brand-accent" />
          Gemini NLP (Extract)
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
