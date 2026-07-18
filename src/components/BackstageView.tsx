import React from 'react';
import { mockCreatorDashboard, originalExperience } from '../data';
import { 
  TrendingUp, 
  BarChart3, 
  Layers, 
  CheckCircle, 
  ArrowRight, 
  Award, 
  Percent, 
  Compass, 
  Sparkles, 
  Eye, 
  MessageSquare, 
  ShoppingBag, 
  Heart,
  Share2
} from 'lucide-react';

interface BackstageViewProps {
  selectedOption: 'A' | 'B' | 'C';
  onReset: () => void;
  onSetScreen: (n: number) => void;
}

export const BackstageView: React.FC<BackstageViewProps> = ({
  selectedOption,
  onReset,
  onSetScreen
}) => {
  // Let's compute details of the active traveler session (Nicole) depending on selectedOption
  const currentOptionInfo = selectedOption === 'A' 
    ? {
        tier: "Direct + Adapted",
        weight: "80%",
        reason: "Nicole preserved Maya's signature hotel (The Shinmonzen) for one night and strictly followed the Gion slow-travel walking & dining templates.",
        changed: "Stay reduced to 4 days; moves to Gion Terrace Boutique for nights 2 & 3 to satisfy total $1,800 budget limit."
      }
    : selectedOption === 'B'
    ? {
        tier: "Direct Property Match",
        weight: "100%",
        reason: "Nicole preserved Maya's exact signature hotel (The Shinmonzen) for all 3 nights, choosing to travel 1 week later with a layover flight to balance the price.",
        changed: "Trip duration shortened from 7 to 4 days, offset peak flight prices to preserve complete featured hotel stay."
      }
    : {
        tier: "Assisted Substitution",
        weight: "50%",
        reason: "Although The Shinmonzen was replaced due to strict budget constraints, the substituted property matches Maya's curated Gion aesthetic, neighborhood pace, and walk templates.",
        changed: "Swapped primary hotel for curated alternative Gion Terrace Boutique for all 3 nights; retained direct flights."
      };

  return (
    <div className="w-full bg-[#FCFBFA] text-brand-charcoal min-h-[600px] rounded-3xl p-6 md:p-8 border border-brand-charcoal/10 shadow-lg space-y-8">
      {/* Top Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between border-b border-brand-charcoal/10 pb-6 gap-4">
        <div className="flex items-center gap-4">
          <img 
            src={originalExperience.creator.avatar} 
            alt="Maya Chen" 
            className="w-14 h-14 rounded-full object-cover border-2 border-brand-accent shadow-sm"
            referrerPolicy="no-referrer"
          />
          <div className="space-y-0.5">
            <div className="flex items-center gap-2">
              <h2 className="text-xl font-serif font-bold text-brand-charcoal">Maya Chen</h2>
              <span className="bg-brand-accent/10 border border-brand-accent/25 px-2.5 py-0.5 rounded-full text-[10px] font-mono text-brand-accent font-bold uppercase">
                Creator Backstage
              </span>
            </div>
            <p className="text-xs text-brand-charcoal/60">Aesthetic Travel Curator &bull; {originalExperience.creator.handle}</p>
          </div>
        </div>
        
        {/* Actions */}
        <div className="flex items-center gap-2">
          <button 
            onClick={onReset}
            className="px-4 py-2 border border-brand-charcoal/10 hover:bg-brand-beige rounded-xl text-xs font-semibold font-mono flex items-center gap-2 cursor-pointer transition-colors"
          >
            Reset Simulated Session
          </button>
          <button 
            onClick={() => onSetScreen(1)}
            className="px-4 py-2 bg-brand-charcoal text-white rounded-xl text-xs font-semibold font-sans hover:bg-brand-charcoal/90 flex items-center gap-2 cursor-pointer transition-colors"
          >
            <span>Launch Traveler View</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Experience title & overview */}
      <div className="bg-brand-beige/40 rounded-2xl p-5 border border-brand-charcoal/5 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="space-y-1">
          <span className="text-[10px] font-mono uppercase tracking-widest text-brand-accent font-bold">Active Experience link</span>
          <h3 className="text-2xl font-serif font-medium text-brand-charcoal">“Kyoto, Slowly”</h3>
          <p className="text-xs text-brand-charcoal/70 leading-relaxed max-w-2xl">
            This experience link is shared in your Instagram bio. Travelers can open it, simulated-voice talk to extract constraints, and book adapted iterations with guaranteed attribution.
          </p>
        </div>
        <div className="flex items-center gap-2 self-start md:self-auto">
          <button className="p-2 bg-white rounded-xl border border-brand-charcoal/5 hover:bg-brand-cream text-brand-charcoal/60 hover:text-brand-charcoal shadow-sm">
            <Share2 className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Analytical stats counters */}
      <div className="grid grid-cols-2 lg:grid-cols-5 gap-4">
        <div className="bg-white p-4 rounded-xl border border-brand-charcoal/5 shadow-sm space-y-1">
          <div className="flex items-center justify-between text-brand-charcoal/40">
            <span className="text-[10px] font-mono uppercase tracking-wider">Experience Opens</span>
            <Eye className="w-4 h-4 text-brand-accent/60" />
          </div>
          <p className="text-2xl font-mono font-bold text-brand-charcoal">{mockCreatorDashboard.stats.opens}</p>
          <p className="text-[9px] text-brand-sage font-semibold">&uarr; 14% from last week</p>
        </div>

        <div className="bg-white p-4 rounded-xl border border-brand-charcoal/5 shadow-sm space-y-1">
          <div className="flex items-center justify-between text-brand-charcoal/40">
            <span className="text-[10px] font-mono uppercase tracking-wider">Conversations</span>
            <MessageSquare className="w-4 h-4 text-brand-accent/60" />
          </div>
          <p className="text-2xl font-mono font-bold text-brand-charcoal">{mockCreatorDashboard.stats.conversations}</p>
          <p className="text-[9px] text-brand-sage font-semibold">&uarr; 45% conversion rate</p>
        </div>

        <div className="bg-white p-4 rounded-xl border border-brand-charcoal/5 shadow-sm space-y-1">
          <div className="flex items-center justify-between text-brand-charcoal/40">
            <span className="text-[10px] font-mono uppercase tracking-wider">Booking Intents</span>
            <ShoppingBag className="w-4 h-4 text-brand-accent/60" />
          </div>
          <p className="text-2xl font-mono font-bold text-brand-charcoal">{mockCreatorDashboard.stats.sessions}</p>
          <p className="text-[9px] text-brand-sage font-semibold">31% of conversations</p>
        </div>

        <div className="bg-white p-4 rounded-xl border border-brand-charcoal/5 shadow-sm space-y-1">
          <div className="flex items-center justify-between text-brand-charcoal/40">
            <span className="text-[10px] font-mono uppercase tracking-wider">Direct matches</span>
            <CheckCircle className="w-4 h-4 text-brand-accent/60" />
          </div>
          <p className="text-2xl font-mono font-bold text-brand-charcoal">{mockCreatorDashboard.stats.directMatches}</p>
          <p className="text-[9px] text-brand-charcoal/50">Full-featured stays</p>
        </div>

        <div className="col-span-2 lg:col-span-1 bg-white p-4 rounded-xl border border-brand-charcoal/5 shadow-sm space-y-1">
          <div className="flex items-center justify-between text-brand-charcoal/40">
            <span className="text-[10px] font-mono uppercase tracking-wider">Assisted subs</span>
            <Layers className="w-4 h-4 text-brand-accent/60" />
          </div>
          <p className="text-2xl font-mono font-bold text-brand-charcoal">{mockCreatorDashboard.stats.assistedSubstitutions}</p>
          <p className="text-[9px] text-brand-sage font-semibold">23% total royalties saved</p>
        </div>
      </div>

      {/* Main Grid: Active Session Details & Conversion Factors */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Left Grid: Live Session Inspector */}
        <div className="lg:col-span-7 bg-white p-5 rounded-2xl border border-brand-charcoal/5 shadow-sm space-y-4">
          <div className="flex items-center justify-between border-b border-brand-charcoal/5 pb-3">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-amber-500 animate-ping" />
              <h4 className="text-xs uppercase tracking-wider font-mono font-bold text-brand-charcoal/80">Live Session Inspector</h4>
            </div>
            <span className="text-[10px] font-mono text-brand-charcoal/55 bg-brand-cream border border-brand-charcoal/5 px-2 py-0.5 rounded">
              Session #2094 &bull; In Progress
            </span>
          </div>

          {/* Traveler summary */}
          <div className="space-y-2.5">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-brand-accent text-white font-serif flex items-center justify-center font-bold text-sm shadow-sm">
                N
              </div>
              <div>
                <p className="text-xs font-serif font-bold text-brand-charcoal">Nicole (San Francisco, CA)</p>
                <p className="text-[10px] text-brand-charcoal/40 font-mono">Source Referral: Link in Bio &bull; 4 days &bull; $1,800 limit</p>
              </div>
            </div>

            <div className="bg-brand-cream/60 p-3 rounded-xl border border-brand-charcoal/5 space-y-1">
              <span className="text-[9px] font-mono text-brand-accent uppercase font-bold">Simulated voice request</span>
              <p className="text-xs font-serif italic text-brand-charcoal/85 leading-relaxed">
                “{mockCreatorDashboard.travelerSession.request}”
              </p>
            </div>
          </div>

          {/* Preserved vs. Changed */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
            <div className="space-y-2">
              <h5 className="text-[10px] font-mono uppercase tracking-wider text-brand-sage font-bold">&bull; PRESERVED BY NICOLE</h5>
              <ul className="space-y-1.5">
                {mockCreatorDashboard.travelerSession.preserved.map((item, i) => (
                  <li key={i} className="text-[11px] text-brand-charcoal/85 flex items-start gap-1.5 font-sans leading-normal">
                    <span className="text-brand-sage font-bold flex-shrink-0">&bull;</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="space-y-2">
              <h5 className="text-[10px] font-mono uppercase tracking-wider text-amber-700 font-bold">&bull; ADAPTED FOR TIME & BUDGET</h5>
              <ul className="space-y-1.5">
                <li className="text-[11px] text-brand-charcoal/85 flex items-start gap-1.5 font-sans leading-normal">
                  <span className="text-amber-600 font-bold flex-shrink-0">&bull;</span>
                  <span>{currentOptionInfo.changed}</span>
                </li>
              </ul>
            </div>
          </div>

          {/* Calculated Royalty Allocation */}
          <div className="bg-brand-beige/30 p-4 rounded-xl border border-brand-charcoal/5 space-y-3 pt-3">
            <div className="flex items-center justify-between">
              <h5 className="text-[10px] font-mono uppercase tracking-wider text-brand-charcoal/60 font-bold">Computed Royalty Profile</h5>
              <span className="bg-brand-sage text-white text-[9px] font-mono font-bold uppercase px-2 py-0.5 rounded">
                Tier: {currentOptionInfo.tier}
              </span>
            </div>

            <div className="flex items-center gap-4">
              <div className="flex items-center gap-1">
                <span className="text-2xl font-mono font-bold text-brand-sage">{currentOptionInfo.weight}</span>
                <span className="text-[10px] font-sans text-brand-charcoal/50 max-w-[80px] leading-tight">royalty weight weight</span>
              </div>
              <div className="w-px h-10 bg-brand-charcoal/10" />
              <p className="text-xs text-brand-charcoal/70 leading-relaxed flex-grow">
                <strong>Why attribution remains high:</strong> {currentOptionInfo.reason}
              </p>
            </div>
          </div>
        </div>

        {/* Right Grid: Curation Driver & Valued items */}
        <div className="lg:col-span-5 bg-white p-5 rounded-2xl border border-brand-charcoal/5 shadow-sm space-y-4">
          <div className="flex items-center gap-2 border-b border-brand-charcoal/5 pb-3">
            <Award className="w-4 h-4 text-brand-accent" />
            <h4 className="text-xs uppercase tracking-wider font-mono font-bold text-brand-charcoal/80">My Experience Drivers</h4>
          </div>

          <p className="text-xs text-brand-charcoal/70 leading-relaxed">
            Which items in your <strong>“Kyoto, Slowly”</strong> package are most valued by travelers during adaptive personalizations?
          </p>

          <div className="space-y-4 pt-2">
            {mockCreatorDashboard.conversionFactors.map((fact, idx) => (
              <div key={idx} className="space-y-1.5">
                <div className="flex justify-between items-center text-xs">
                  <span className="font-serif font-bold text-brand-charcoal">{idx + 1}. {fact.element}</span>
                  <span className="font-mono font-semibold text-brand-charcoal/70">{fact.pct}% valued</span>
                </div>
                <div className="h-2 bg-brand-cream rounded-full overflow-hidden border border-brand-charcoal/5">
                  <div className={`h-full ${fact.color}`} style={{ width: `${fact.pct}%` }} />
                </div>
              </div>
            ))}
          </div>

          <div className="bg-brand-cream/50 rounded-xl p-3 border border-brand-charcoal/5 mt-4 space-y-1.5 text-[11px] leading-relaxed text-brand-charcoal/70">
            <p className="font-bold text-brand-charcoal flex items-center gap-1.5">
              <Compass className="w-3.5 h-3.5 text-brand-accent" />
              Curation Analytics Insight
            </p>
            <p>
              Your boutique selection <strong>“The Shinmonzen”</strong> is preserved in 85% of bookings, even when travelers reduce flight costs or shorten days to afford it. You have high brand gravity!
            </p>
          </div>
        </div>

      </div>
    </div>
  );
};
