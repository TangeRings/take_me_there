import React, { useState, useCallback } from 'react';
import { VocalBridgeProvider } from '@vocalbridgeai/react';
import { initialPreferences, tradeOffOptions } from './data';
import { PreferenceItem, GeminiAnalysis } from './types';
import { MobileFrame } from './components/MobileFrame';
import { IntelligencePanel } from './components/IntelligencePanel';
import { BackstageView } from './components/BackstageView';
import { Screens } from './components/Screens';
import { 
  Sparkles, 
  RotateCcw, 
  UserCheck, 
  TrendingUp, 
  Check, 
  X, 
  Award,
  DollarSign,
  Heart,
  Calendar,
  Layers,
  HeartHandshake
} from 'lucide-react';

export default function App() {
  // App-wide state
  const [viewMode, setViewMode] = useState<'traveler' | 'creator'>('traveler');
  const [currentScreen, setCurrentScreen] = useState<number>(1);
  const [selectedOption, setSelectedOption] = useState<'A' | 'B' | 'C'>('A');
  // Only flexible items at startup — must-keep / preference come from Gemini,
  // hard-constraints come from voice input (screen 2)
  const [preferences, setPreferences] = useState<PreferenceItem[]>(
    initialPreferences.filter(p => p.category === 'flexible')
  );
  const [voiceStatus, setVoiceStatus] = useState<'idle' | 'listening' | 'analyzing' | 'done'>('idle');
  const [showCheckoutModal, setShowCheckoutModal] = useState<boolean>(false);
  const [geminiAnalysis, setGeminiAnalysis] = useState<GeminiAnalysis | null>(null);
  const [geminiStreamText, setGeminiStreamText] = useState<string>('');
  const [geminiError, setGeminiError] = useState<string | null>(null);

  // Gemini callbacks (stable references via useCallback)
  const handleGeminiToken = useCallback((token: string) => {
    setGeminiStreamText(prev => prev + token);
  }, []);

  const handleGeminiComplete = useCallback((analysis: GeminiAnalysis) => {
    setGeminiAnalysis(analysis);
    // Map extracted elements to preferences.
    // Hard constraints are intentionally EMPTY here — they come from the traveler's voice input (screen 2).
    const newPreferences: PreferenceItem[] = [
      ...analysis.signatureElements.slice(0, 2).map((el, i) => ({
        id: `g-must-${i}`,
        text: el,
        category: 'must-keep' as const,
      })),
      ...analysis.keywords.slice(0, 3).map((kw, i) => ({
        id: `g-pref-${i}`,
        text: kw,
        category: 'preference' as const,
      })),
      ...initialPreferences.filter(p => p.category === 'flexible'),
    ];
    setPreferences(newPreferences);
  }, []);

  // Reset helper
  const handleReset = () => {
    setCurrentScreen(1);
    setSelectedOption('A');
    setPreferences(initialPreferences.filter(p => p.category === 'flexible'));
    setVoiceStatus('idle');
    setShowCheckoutModal(false);
    setGeminiAnalysis(null);
    setGeminiStreamText('');
    setGeminiError(null);
  };

  const selectedData = tradeOffOptions.find(o => o.id === selectedOption) || tradeOffOptions[0];

  const vbApiKey = import.meta.env.VITE_VOCAL_BRIDGE_API_KEY as string | undefined;

  const content = (
    <div className="min-h-screen bg-brand-cream flex flex-col font-sans text-brand-charcoal select-none antialiased selection:bg-brand-accent/20">
      
      {/* Premium Top Navigation Bar */}
      <header className="bg-brand-cream/80 backdrop-blur-md border-b border-brand-charcoal/5 px-6 py-4 sticky top-0 z-50 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-full bg-brand-charcoal flex items-center justify-center shadow-sm">
            <div className="w-3.5 h-3.5 bg-brand-cream rotate-45" />
          </div>
          <div>
            <h1 className="text-sm font-sans font-bold uppercase tracking-widest text-brand-charcoal">Take Me There</h1>
            <p className="text-[9px] text-brand-charcoal/40 leading-none font-mono uppercase tracking-widest">Creator affiliate adaptor &bull; Hackathon Build</p>
          </div>
        </div>

        {/* Switch toggles & Reset */}
        <div className="flex items-center gap-3">
          {/* Reset Control */}
          <button 
            onClick={handleReset}
            className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 border border-brand-charcoal/10 rounded-xl hover:bg-brand-charcoal/5 text-xs text-brand-charcoal/60 font-medium font-sans cursor-pointer transition-colors"
            title="Reset simulated environment to initial conditions"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Reset Demo</span>
          </button>

          <div className="flex bg-brand-charcoal/5 p-1 rounded-xl border border-brand-charcoal/5 shadow-inner">
            <button
              onClick={() => setViewMode('traveler')}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-all cursor-pointer ${
                viewMode === 'traveler' 
                  ? 'bg-white text-brand-charcoal shadow-sm' 
                  : 'text-brand-charcoal/60 hover:text-brand-charcoal'
              }`}
            >
              <UserCheck className="w-3.5 h-3.5" />
              <span>Traveler View</span>
            </button>
            <button
              onClick={() => setViewMode('creator')}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-all cursor-pointer ${
                viewMode === 'creator' 
                  ? 'bg-white text-brand-charcoal shadow-sm' 
                  : 'text-brand-charcoal/60 hover:text-brand-charcoal'
              }`}
            >
              <TrendingUp className="w-3.5 h-3.5" />
              <span>Creator Backstage</span>
            </button>
          </div>
        </div>
      </header>

      {/* Main Container */}
      <main className="flex-grow p-4 md:p-6 lg:p-8 max-w-7xl w-full mx-auto flex flex-col justify-center">
        {viewMode === 'creator' ? (
          /* Creator Backstage view */
          <div className="w-full max-w-5xl mx-auto">
            <BackstageView 
              selectedOption={selectedOption} 
              onReset={handleReset}
              onSetScreen={(n) => {
                setViewMode('traveler');
                setCurrentScreen(n);
              }}
            />
          </div>
        ) : (
          /* Split View: Phone Emulator (Left/Center) + Intelligence Panel (Right, hidden on mobile) */
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center max-w-6xl mx-auto w-full">
            
            {/* Left/Center: Mobile phone preview */}
            <div className="lg:col-span-6 flex justify-center">
              <MobileFrame
                currentScreen={currentScreen}
                totalScreens={6}
                onBack={() => {
                  const prevMap: Record<number, number> = {
                    7: 1, // Gemini analysis → Instagram post screen
                    3: 7, // Preference confirmation → Gemini analysis screen
                    2: 3, // Voice input → Preference confirmation
                    4: 3, // Trade-off → Preference confirmation
                    5: 4, // Itinerary → Trade-off
                    6: 5, // Final/booking → Itinerary
                  };
                  const prev = prevMap[currentScreen];
                  if (prev !== undefined) setCurrentScreen(prev);
                }}
              >
                <Screens 
                  currentScreen={currentScreen}
                  setScreen={setCurrentScreen}
                  selectedOption={selectedOption}
                  setSelectedOption={setSelectedOption}
                  preferences={preferences}
                  setPreferences={setPreferences}
                  voiceStatus={voiceStatus}
                  setVoiceStatus={setVoiceStatus}
                  onReset={handleReset}
                  setShowCheckoutModal={setShowCheckoutModal}
                  onGeminiToken={handleGeminiToken}
                  onGeminiComplete={handleGeminiComplete}
                  geminiAnalysis={geminiAnalysis}
                  geminiError={geminiError}
                  onGeminiError={setGeminiError}
                />
              </MobileFrame>
            </div>

            {/* Right: Hackathon Intelligence Panel (Only visible on desktop/large screens) */}
            <div className="lg:col-span-6 h-[780px] hidden lg:block">
              <IntelligencePanel 
                currentScreen={currentScreen}
                preferences={preferences}
                selectedOption={selectedOption}
                geminiStreamText={geminiStreamText}
                geminiAnalysis={geminiAnalysis}
                geminiError={geminiError}
              />
            </div>

          </div>
        )}
      </main>

      {/* Simulated Checkout Confirmation Modal overlay */}
      {showCheckoutModal && (
        <div className="fixed inset-0 bg-brand-charcoal/70 backdrop-blur-md z-50 flex items-center justify-center p-4">
          <div className="bg-[#FAF8F5] rounded-3xl p-6 md:p-8 max-w-md w-full border border-brand-charcoal/10 shadow-2xl space-y-6 relative">
            <button 
              onClick={() => setShowCheckoutModal(false)}
              className="absolute top-4 right-4 p-1.5 rounded-full hover:bg-black/5 text-brand-charcoal/50 hover:text-brand-charcoal"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Header Success Ring */}
            <div className="text-center space-y-2">
              <div className="w-16 h-16 rounded-full bg-brand-sage/10 text-brand-sage flex items-center justify-center mx-auto border border-brand-sage/20">
                <Check className="w-8 h-8" />
              </div>
              <h3 className="text-2xl font-serif text-brand-charcoal font-bold">Booking Confirmed!</h3>
              <p className="text-xs text-brand-charcoal/60 leading-relaxed px-4">
                Thank you, Nicole. Your personalized version of <strong>“Kyoto, Slowly”</strong> is safely locked in and synced with Kyoto transit registries.
              </p>
            </div>

            {/* Receipt Summary */}
            <div className="bg-white rounded-2xl p-4 border border-brand-charcoal/5 shadow-sm space-y-3 text-xs">
              <h4 className="text-[10px] font-mono tracking-wider uppercase text-brand-charcoal/55 font-bold">RESERVATION DETAILS</h4>
              
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-brand-charcoal/60">Selected Package</span>
                  <span className="font-serif font-bold text-brand-charcoal">Split-Stay Custom Pack</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-brand-charcoal/60">Dates Selected</span>
                  <span className="font-mono text-brand-charcoal">Oct 14 &ndash; Oct 18, 2026</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-brand-charcoal/60">Total Cost Paid</span>
                  <span className="font-mono font-bold text-brand-sage">${selectedData.price} USD</span>
                </div>
              </div>

              {/* Creator Commission Badge inside Receipt */}
              <div className="border-t border-brand-charcoal/10 pt-3 flex items-start gap-3">
                <div className="p-2 bg-brand-accent/10 rounded-lg text-brand-accent flex-shrink-0 mt-0.5">
                  <HeartHandshake className="w-4 h-4" />
                </div>
                <div>
                  <p className="text-[11px] font-serif font-bold text-brand-charcoal">@mayaexplores Attribution Applied</p>
                  <p className="text-[10px] text-brand-charcoal/60 leading-normal">
                    {selectedData.commissionWeight}% weight of the referral pool was dispatched to Maya's developer payout wallet via PayPal SPLIT.
                  </p>
                </div>
              </div>
            </div>

            {/* Action buttons */}
            <div className="space-y-2 pt-2">
              <button 
                onClick={() => {
                  setShowCheckoutModal(false);
                  handleReset();
                }}
                className="w-full bg-brand-charcoal hover:bg-brand-charcoal/90 text-white font-serif py-3 rounded-xl text-xs font-semibold cursor-pointer text-center"
              >
                Reset Demo to Beginning
              </button>
              <button 
                onClick={() => {
                  setShowCheckoutModal(false);
                  setViewMode('creator');
                }}
                className="w-full bg-transparent hover:bg-black/5 text-brand-charcoal/70 py-2 rounded-xl text-xs font-semibold cursor-pointer text-center"
              >
                Go to Creator Backstage to Inspect Royalty
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Styled Footer */}
      <footer className="bg-brand-cream/50 py-4 px-6 border-t border-brand-charcoal/5 text-center text-[10px] text-brand-charcoal/40 font-mono flex flex-col sm:flex-row justify-between items-center gap-2">
        <span>© 2026 Take Me There &bull; Hackathon Prototype Build v1.0.0</span>
        <div className="flex gap-4">
          <span className="hover:text-brand-charcoal cursor-pointer">Attribution Rules</span>
          <span className="hover:text-brand-charcoal cursor-pointer">Solver API Specs</span>
          <span className="hover:text-brand-charcoal cursor-pointer">Integration Roadmap</span>
        </div>
      </footer>

    </div>
  );

  const vbTokenAuth = {
    tokenUrl: '/api/vb-token',
    body: geminiAnalysis ? {
      context_destination: geminiAnalysis.destination,
      context_hotel: geminiAnalysis.hotelName,
      context_experience: geminiAnalysis.experienceType,
      context_keywords: geminiAnalysis.keywords?.join(', '),
    } : {},
  };

  return (
    <VocalBridgeProvider options={{ auth: vbTokenAuth, participantName: 'Nicole' }}>
      {content}
    </VocalBridgeProvider>
  );
}
