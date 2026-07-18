import React, { useState, useEffect } from 'react';
import { 
  originalExperience, 
  tradeOffOptions 
} from '../data';
import { 
  PreferenceItem, 
  TradeOffOption, 
  PreferenceCategory 
} from '../types';
import { 
  Share2, 
  Bookmark, 
  MapPin, 
  Calendar, 
  Sparkles, 
  Mic, 
  Send, 
  Check, 
  AlertCircle, 
  ArrowRight, 
  ChevronRight, 
  Plane, 
  Hotel, 
  UtensilsCrossed, 
  Info, 
  Coins, 
  Compass, 
  Footprints,
  RotateCcw,
  Heart,
  MessageCircle,
  MoreHorizontal,
  Settings,
  Sliders,
  Volume2,
  X
} from 'lucide-react';

interface ScreenProps {
  currentScreen: number;
  setScreen: (n: number) => void;
  selectedOption: 'A' | 'B' | 'C';
  setSelectedOption: (opt: 'A' | 'B' | 'C') => void;
  preferences: PreferenceItem[];
  setPreferences: (p: PreferenceItem[]) => void;
  voiceStatus: 'idle' | 'listening' | 'analyzing' | 'done';
  setVoiceStatus: (v: 'idle' | 'listening' | 'analyzing' | 'done') => void;
  onReset: () => void;
  setShowCheckoutModal: (b: boolean) => void;
}

export const Screens: React.FC<ScreenProps> = ({
  currentScreen,
  setScreen,
  selectedOption,
  setSelectedOption,
  preferences,
  setPreferences,
  voiceStatus,
  setVoiceStatus,
  onReset,
  setShowCheckoutModal
}) => {
  // Voice input transcription state
  const [typedVoiceText, setTypedVoiceText] = useState(
    "I want a similar experience, but I only have four days and my total budget is around $1,800. I really love the hotel. The rest is flexible."
  );

  // New States for Instagram-feel, Gemini-scan, voice bottom-sheet, and manual settings
  const [carouselIndex, setCarouselIndex] = useState(0);
  const [liked, setLiked] = useState(false);
  const [saved, setSaved] = useState(false);
  const [showManualSettings, setShowManualSettings] = useState(false);
  const [activeVoiceModifier, setActiveVoiceModifier] = useState(false);
  const [voiceModifierText, setVoiceModifierText] = useState("");
  const [voiceModifierSuccess, setVoiceModifierSuccess] = useState<string | null>(null);

  // Big options for Mapping Preferences easily
  const [travelerTier, setTravelerTier] = useState<'luxury' | 'medium' | 'budget'>('luxury');
  const [selectedKeywords, setSelectedKeywords] = useState<string[]>(['art-design']);

  // Gemini Vision Scan state
  const [visionProgress, setVisionProgress] = useState(0);
  const [visionStep, setVisionStep] = useState(0);

  // Loading state for search
  const [searchProgress, setSearchProgress] = useState(0);
  const [searchStep, setSearchStep] = useState("Accessing Gion hotel inventories...");

  // Gemini Vision Scan Effect
  useEffect(() => {
    if (currentScreen === 7) {
      setVisionProgress(0);
      setVisionStep(0);
      const interval = setInterval(() => {
        setVisionProgress((prev) => {
          if (prev >= 100) {
            clearInterval(interval);
            // Stop and let user confirm extracted details before proceeding
            return 100;
          }
          const next = prev + 5;
          if (next === 25) setVisionStep(1);
          if (next === 55) setVisionStep(2);
          if (next === 80) setVisionStep(3);
          return next;
        });
      }, 100);
      return () => clearInterval(interval);
    }
  }, [currentScreen]);

  useEffect(() => {
    if (currentScreen === 4) {
      setSearchProgress(0);
      setSearchStep("Accessing Gion hotel inventories...");
      const interval = setInterval(() => {
        setSearchProgress((prev) => {
          if (prev >= 100) {
            clearInterval(interval);
            return 100;
          }
          const next = prev + 10;
          if (next === 30) {
            setSearchStep("Querying flight pricing from SFO...");
          } else if (next === 60) {
            setSearchStep("Cross-referencing Maya's curation rules...");
          } else if (next === 90) {
            setSearchStep("Synthesizing optimal trade-off options...");
          }
          return next;
        });
      }, 200);
      return () => clearInterval(interval);
    }
  }, [currentScreen]);

  // Handle reclassification of preference item
  const handleMovePreference = (itemId: string, newCategory: PreferenceCategory) => {
    const updated = preferences.map(p => 
      p.id === itemId ? { ...p, category: newCategory } : p
    );
    setPreferences(updated);
  };

  // Toggle selected keywords
  const handleToggleKeyword = (kw: string) => {
    setSelectedKeywords(prev => 
      prev.includes(kw) ? prev.filter(k => k !== kw) : [...prev, kw]
    );
  };

  // Helper to render signature element icons
  const getIcon = (name: string) => {
    switch (name) {
      case 'Hotel': return <Hotel className="w-5 h-5 text-brand-accent" />;
      case 'Footprints': return <Footprints className="w-5 h-5 text-brand-accent" />;
      case 'Compass': return <Compass className="w-5 h-5 text-brand-accent" />;
      case 'UtensilsCrossed': return <UtensilsCrossed className="w-5 h-5 text-brand-accent" />;
      default: return <Sparkles className="w-5 h-5 text-brand-accent" />;
    }
  };

  // Screen 1: Instagram Post Style Home Page
  if (currentScreen === 1) {
    const carouselImages = [
      "https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?q=80&w=600&auto=format&fit=crop", // Kyoto street
      "https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?q=80&w=600&auto=format&fit=crop", // The Shinmonzen Hotel
      "https://images.unsplash.com/photo-1503899036084-c55cdd92da26?q=80&w=600&auto=format&fit=crop"  // Kaiseki Japanese Dining
    ];

    return (
      <div id="screen-landing" className="flex flex-col h-full bg-white overflow-y-auto font-sans text-[#262626]">
        {/* Instagram API Integration Banner */}
        <div className="bg-gradient-to-r from-[#833ab4] via-[#fd1d1d] to-[#fcb045] px-3.5 py-2 flex items-center justify-between text-white text-[10px] font-semibold shadow-inner flex-shrink-0">
          <div className="flex items-center gap-1.5">
            <span className="font-serif italic font-bold text-xs tracking-wide">Instagram</span>
            <span className="bg-white/20 text-[7px] font-mono px-1 rounded uppercase font-bold tracking-widest leading-normal">API Linked</span>
          </div>
          <span className="text-[8px] font-mono opacity-90 tracking-wide">Connected as @nicole_sftraveler</span>
        </div>

        {/* Instagram Header */}
        <div className="flex items-center justify-between px-3 py-2 border-b border-stone-100 bg-white sticky top-0 z-10 flex-shrink-0">
          <div className="flex items-center gap-2.5">
            <img 
              src={originalExperience.creator.avatar} 
              alt={originalExperience.creator.name} 
              className="w-8 h-8 rounded-full object-cover border border-stone-200"
              referrerPolicy="no-referrer"
            />
            <div className="flex flex-col">
              <div className="flex items-center gap-1">
                <span className="text-xs font-semibold text-stone-900 leading-none">{originalExperience.creator.handle}</span>
                <span className="w-1.5 h-1.5 bg-blue-500 rounded-full inline-block" title="Verified Curator" />
              </div>
              <span className="text-[10px] text-stone-500 leading-tight mt-0.5">{originalExperience.location}</span>
            </div>
          </div>
          <button className="text-stone-700 hover:text-stone-950 p-1">
            <MoreHorizontal className="w-5 h-5" />
          </button>
        </div>

        {/* Swipeable Instagram Carousel */}
        <div className="relative aspect-square w-full bg-stone-100 flex-shrink-0 group overflow-hidden">
          <img 
            src={carouselImages[carouselIndex]} 
            alt="Kyoto Carousel" 
            className="w-full h-full object-cover transition-all duration-300"
            referrerPolicy="no-referrer"
          />

          {/* Carousel Buttons */}
          {carouselIndex > 0 && (
            <button 
              onClick={() => setCarouselIndex(prev => prev - 1)}
              className="absolute left-2.5 top-1/2 -translate-y-1/2 w-6 h-6 rounded-full bg-white/80 hover:bg-white text-stone-800 flex items-center justify-center shadow-sm text-xs font-bold transition-all"
            >
              ‹
            </button>
          )}
          {carouselIndex < carouselImages.length - 1 && (
            <button 
              onClick={() => setCarouselIndex(prev => prev + 1)}
              className="absolute right-2.5 top-1/2 -translate-y-1/2 w-6 h-6 rounded-full bg-white/80 hover:bg-white text-stone-800 flex items-center justify-center shadow-sm text-xs font-bold transition-all"
            >
              ›
            </button>
          )}

          {/* Top-Right Indicator */}
          <div className="absolute top-3 right-3 bg-black/60 text-white text-[9px] px-2 py-0.5 rounded-full font-mono">
            {carouselIndex + 1}/{carouselImages.length}
          </div>
        </div>

        {/* Dot Indicators */}
        <div className="flex justify-center gap-1 py-2">
          {carouselImages.map((_, idx) => (
            <span 
              key={idx} 
              className={`w-1.5 h-1.5 rounded-full transition-all ${carouselIndex === idx ? 'bg-blue-500 scale-110' : 'bg-stone-300'}`}
            />
          ))}
        </div>

        {/* Action Buttons Row */}
        <div className="flex items-center justify-between px-3.5 py-1.5 flex-shrink-0">
          <div className="flex items-center gap-4">
            <button 
              onClick={() => setLiked(prev => !prev)}
              className={`hover:scale-110 transition-transform ${liked ? 'text-red-500 fill-red-500' : 'text-stone-800'}`}
            >
              <Heart className="w-5.5 h-5.5" />
            </button>
            <button className="text-stone-800 hover:scale-110 transition-transform">
              <MessageCircle className="w-5.5 h-5.5" />
            </button>
            <button className="text-stone-800 hover:scale-110 transition-transform">
              <Send className="w-5 h-5" />
            </button>
          </div>
          <button 
            onClick={() => setSaved(prev => !prev)}
            className={`hover:scale-110 transition-transform ${saved ? 'text-amber-500 fill-amber-500' : 'text-stone-800'}`}
          >
            <Bookmark className="w-5.5 h-5.5" />
          </button>
        </div>

        {/* Likes Count */}
        <div className="px-3.5 py-0.5 text-xs font-semibold text-stone-900 flex-shrink-0">
          Liked by design_curator and 1,248 others
        </div>

        {/* Caption & Comments */}
        <div className="px-3.5 pb-4 space-y-2 text-xs flex-grow">
          <div>
            <span className="font-semibold text-stone-900 mr-1.5">{originalExperience.creator.handle}</span>
            <span className="text-stone-800 leading-relaxed font-sans">{originalExperience.description}</span>
          </div>

          <div className="flex flex-wrap gap-1.5 pt-0.5">
            {originalExperience.tags.map((tag, i) => (
              <span key={i} className="text-blue-600 hover:underline cursor-pointer">
                #{tag.replace(/\s+/g, '')}
              </span>
            ))}
          </div>

          {/* Realistic Instagram Comments */}
          <div className="border-t border-stone-150 pt-2.5 mt-2 space-y-1.5">
            <div className="text-[11px]">
              <span className="font-semibold text-stone-900 mr-1.5">wanderlust_lisa</span>
              <span className="text-stone-600">This is stunning! Wish I could do it but 7 days is too long for me 😭</span>
            </div>
            <div className="text-[11px]">
              <span className="font-semibold text-stone-900 mr-1.5">tokyo_seeker</span>
              <span className="text-stone-600">The Shinmonzen is an absolute masterpiece hotel. Beautiful choice!</span>
            </div>
          </div>
        </div>

        {/* Action adapted integration button */}
        <div className="p-3 bg-white border-t border-stone-100 sticky bottom-0 z-10 flex-shrink-0">
          <button 
            onClick={() => setScreen(7)}
            className="w-full bg-brand-charcoal text-white font-sans uppercase tracking-widest py-3 px-4 rounded-full text-xs font-bold hover:bg-brand-charcoal/90 transition-all flex items-center justify-center gap-2 shadow-sm cursor-pointer"
          >
            <Sparkles className="w-3.5 h-3.5 text-brand-accent animate-pulse" />
            <span>Take me to my experience</span>
          </button>
        </div>
      </div>
    );
  }

  // Screen 7: Gemini Image & Text Content Multimodal Scan
  if (currentScreen === 7) {
    const scanKeywords = [
      {
        title: "Image 1: Gion Streetscape",
        keywords: ["Yasaka Pagoda", "Traditional Wooden Machiya", "Quiet Walkability", "Early Morning Light"]
      },
      {
        title: "Image 2: Anchor Hotel Sanctuary",
        keywords: ["The Shinmonzen Boutique Hotel", "Gion Canal Interface", "Tadao Ando Inspired Minimalism"]
      },
      {
        title: "Image 3: Kaiseki Gastronomy",
        keywords: ["9-Course Seasonal Kaiseki Dinner", "Master Chef Artistry", "Hidden Alleyway Culinary"]
      },
      {
        title: "Creator Caption Parsing",
        keywords: ["Maya Chen Curation Rules", "Pace: Slow Travel", "Focus: Design & Food", "Duration: 7 Days Baseline"]
      }
    ];

    const isScanComplete = visionProgress >= 100;

    return (
      <div id="screen-gemini-vision" className="flex flex-col h-full bg-[#0a0a0a] text-stone-100 overflow-y-auto p-4 justify-between">
        {/* Header */}
        <div className="flex items-center justify-between pb-3 border-b border-white/10 flex-shrink-0">
          <span className="text-[10px] font-mono tracking-widest uppercase text-purple-400 font-bold flex items-center gap-1.5">
            <Sparkles className="w-3 h-3 text-purple-400 animate-spin" />
            Gemini Multimodal Analysis
          </span>
          <span className="text-[9px] font-mono text-stone-400">Model: gemini-3.5-flash</span>
        </div>

        {/* Analyzer Grid Screen */}
        <div className="flex-grow py-4 flex flex-col justify-center space-y-4">
          {!isScanComplete ? (
            <>
              <div className="text-center space-y-1">
                <h3 className="text-sm font-semibold tracking-wide uppercase text-white font-sans">Scanning Post Media & Curation</h3>
                <p className="text-[11px] text-stone-400 leading-relaxed max-w-xs mx-auto">
                  Simulating multimodal visual recognition and natural language synthesis to extract trip DNA.
                </p>
              </div>

              {/* Scanner Layout */}
              <div className="space-y-3">
                {scanKeywords.map((item, idx) => {
                  const isScanning = visionStep === idx;
                  const isCompleted = visionStep > idx;
                  return (
                    <div 
                      key={idx} 
                      className={`p-3 rounded-xl border transition-all duration-300 flex items-start gap-3 relative overflow-hidden ${
                        isScanning 
                          ? 'bg-purple-950/20 border-purple-500/50 shadow-md shadow-purple-500/5' 
                          : isCompleted 
                          ? 'bg-white/5 border-emerald-500/30' 
                          : 'bg-white/[0.02] border-white/5 opacity-45'
                      }`}
                    >
                      {/* Sweep Laser bar */}
                      {isScanning && (
                        <div className="absolute inset-x-0 top-0 h-0.5 bg-gradient-to-r from-transparent via-purple-400 to-transparent animate-laser-sweep" />
                      )}

                      <div className="flex flex-col flex-grow space-y-1">
                        <div className="flex items-center justify-between">
                          <span className="text-xs font-bold text-white font-serif">{item.title}</span>
                          <span className={`text-[9px] font-mono uppercase tracking-wider font-bold ${
                            isScanning ? 'text-purple-400 animate-pulse' : isCompleted ? 'text-emerald-400' : 'text-stone-500'
                          }`}>
                            {isScanning ? "Processing..." : isCompleted ? "Success" : "Pending"}
                          </span>
                        </div>

                        {/* Detected tags */}
                        <div className="flex flex-wrap gap-1 pt-1">
                          {item.keywords.map((kw, i) => (
                            <span 
                              key={i} 
                              className={`text-[9px] font-mono px-2 py-0.5 rounded transition-colors ${
                                isScanning 
                                  ? 'bg-purple-900/40 text-purple-200 border border-purple-500/20' 
                                  : isCompleted 
                                  ? 'bg-emerald-950/40 text-emerald-200 border border-emerald-500/20' 
                                  : 'bg-stone-900 text-stone-400'
                              }`}
                            >
                              {kw}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Loading tracker */}
              <div className="space-y-1.5 pt-2">
                <div className="flex justify-between text-[10px] font-mono text-stone-400">
                  <span>Synthesizing trip anchors</span>
                  <span>{visionProgress}%</span>
                </div>
                <div className="w-full h-1 bg-stone-900 rounded-full overflow-hidden border border-white/5">
                  <div className="h-full bg-gradient-to-r from-purple-500 to-indigo-500 transition-all duration-150" style={{ width: `${visionProgress}%` }} />
                </div>
              </div>
            </>
          ) : (
            /* DNA Extraction Success Summary Page */
            <div className="space-y-4 animate-fade-in">
              <div className="text-center space-y-2">
                <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 mb-1">
                  <Check className="w-6 h-6" />
                </div>
                <h3 className="text-base font-bold text-white font-serif">Trip Anchors Successfully Extracted!</h3>
                <p className="text-xs text-stone-400 max-w-xs mx-auto">
                  Gemini has digested @mayaexplores' post details and designed a customizable skeleton trip blueprint.
                </p>
              </div>

              {/* Extracted Blueprint Details Card */}
              <div className="bg-white/5 border border-white/10 rounded-2xl p-4 space-y-3">
                <h4 className="text-[10px] font-mono text-purple-400 uppercase font-bold tracking-wider">Identified Flagships</h4>
                
                <div className="space-y-2 text-xs">
                  <div className="flex justify-between border-b border-white/5 pb-1.5">
                    <span className="text-stone-400">Anchor Lodging:</span>
                    <span className="text-white font-semibold">The Shinmonzen (Luxury)</span>
                  </div>
                  <div className="flex justify-between border-b border-white/5 pb-1.5">
                    <span className="text-stone-400">Signature Scene:</span>
                    <span className="text-white font-semibold">Yasaka Pagoda & Gion Streets</span>
                  </div>
                  <div className="flex justify-between border-b border-white/5 pb-1.5">
                    <span className="text-stone-400">Gastronomy:</span>
                    <span className="text-white font-semibold">9-Course Kaiseki Dinner</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-stone-400">Travel Pace:</span>
                    <span className="text-white font-semibold">Design-Centric Slow Travel</span>
                  </div>
                </div>
              </div>

              {/* Cognitive Rule Highlight explaining luxury logic */}
              <div className="bg-purple-950/20 border border-purple-500/30 rounded-2xl p-3.5 space-y-2">
                <div className="flex items-center gap-1.5 text-purple-400">
                  <Sparkles className="w-4 h-4 text-purple-400 animate-pulse" />
                  <span className="text-[10px] font-mono uppercase font-bold tracking-wider">Behind-the-Scenes Cognitive Inference</span>
                </div>
                <p className="text-[11px] text-stone-300 leading-relaxed font-sans">
                  <strong>Luxury Property Retention:</strong> Since Nicole insists on keeping <em>The Shinmonzen Boutique Hotel</em>, our core engine infers she is <strong>not strictly price-sensitive</strong> for key aesthetic markers.
                </p>
                <p className="text-[10px] text-stone-400 leading-relaxed font-sans italic">
                  Rule applied: Preserve luxury stays. Minimize budget conflicts by optimizing flight times, off-peak date shifts, or splitting secondary nights rather than substituting the main hotel.
                </p>
              </div>
            </div>
          )}
        </div>

        {/* CTA Actions */}
        <div className="pt-2 flex-shrink-0 space-y-2">
          {isScanComplete ? (
            <button 
              onClick={() => setScreen(3)}
              className="w-full bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white py-3 rounded-full text-xs font-bold font-sans tracking-wide cursor-pointer transition-all text-center flex items-center justify-center gap-2 shadow-lg"
            >
              <span>Confirm Anchors & Customize</span>
              <ArrowRight className="w-4 h-4 text-white" />
            </button>
          ) : (
            <button 
              onClick={() => setScreen(3)}
              className="w-full bg-white/10 hover:bg-white/15 text-white py-2.5 rounded-full text-xs font-semibold font-sans tracking-wide cursor-pointer transition-all text-center"
            >
              Skip to Customize →
            </button>
          )}
        </div>
      </div>
    );
  }

  // Screen 2: Voice Personalization Intro (Represented as bottom 1/4 sheet OVER background Screen 1)
  if (currentScreen === 2) {
    const carouselImages = [
      "https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?q=80&w=600&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?q=80&w=600&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1503899036084-c55cdd92da26?q=80&w=600&auto=format&fit=crop"
    ];

    return (
      <div id="screen-voice-overlay" className="flex flex-col h-full bg-white relative overflow-hidden select-none">
        
        {/* Background Post (Dimmed/Blurred representing the social app behind the assistant) */}
        <div className="absolute inset-0 flex flex-col pointer-events-none opacity-40 blur-[1px]">
          {/* Header */}
          <div className="flex items-center justify-between px-3 py-2 border-b border-stone-100">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-full bg-stone-200" />
              <div className="flex flex-col gap-1">
                <div className="w-20 h-3 bg-stone-200 rounded" />
                <div className="w-12 h-2.5 bg-stone-200 rounded" />
              </div>
            </div>
          </div>
          {/* Main Image */}
          <div className="aspect-square w-full bg-stone-100 relative">
            <img 
              src={carouselImages[carouselIndex]} 
              alt="Background" 
              className="w-full h-full object-cover" 
              referrerPolicy="no-referrer"
            />
          </div>
          {/* Caption */}
          <div className="p-3.5 space-y-2 flex-grow">
            <div className="w-1/2 h-3 bg-stone-200 rounded" />
            <div className="w-full h-3 bg-stone-100 rounded" />
            <div className="w-5/6 h-3 bg-stone-100 rounded" />
          </div>
        </div>

        {/* Ambient Dark Mask for Premium Contrast */}
        <div className="absolute inset-0 bg-brand-charcoal/25 backdrop-blur-[1px] pointer-events-none z-10" />

        {/* Floating Voice Indicator Info bar */}
        <div className="absolute top-4 left-1/2 -translate-x-1/2 bg-black/70 backdrop-blur-md text-white text-[10px] font-mono py-1.5 px-3.5 rounded-full flex items-center gap-2 z-20 shadow-lg border border-white/10 whitespace-nowrap">
          <span className="w-2 h-2 rounded-full bg-brand-accent animate-ping" />
          <span>Vocal Bridge Active over @mayaexplores Post</span>
        </div>

        {/* Bottom 1/4 to 1/3 Voice Assistant Bottom Sheet Panel */}
        <div className="absolute bottom-0 inset-x-0 bg-white rounded-t-[32px] border-t border-brand-charcoal/5 shadow-[0_-15px_40px_rgba(28,27,25,0.15)] flex flex-col p-5 space-y-4 z-30">
          
          {/* Drawer Handle */}
          <div className="w-12 h-1.5 bg-stone-200 rounded-full mx-auto" />

          {/* Voice Indicator & Transcript bar */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 bg-brand-accent rounded-full animate-pulse" />
                <span className="text-[10px] uppercase font-mono tracking-widest text-brand-accent font-bold">Vocal Bridge Intake</span>
              </div>
              <span className="text-[9px] font-mono text-stone-400">Listening to Nicole</span>
            </div>

            {/* Glowing sound wave visualization */}
            <div className="h-6 flex items-center justify-center gap-1 bg-brand-cream/50 rounded-lg p-2.5 border border-brand-charcoal/5 relative overflow-hidden">
              <div className="h-full w-1 bg-brand-accent rounded-full animate-wave-bar" style={{ animationDelay: '0.1s' }} />
              <div className="h-full w-1 bg-brand-accent rounded-full animate-wave-bar" style={{ animationDelay: '0.3s' }} />
              <div className="h-full w-1 bg-brand-accent rounded-full animate-wave-bar" style={{ animationDelay: '0.2s' }} />
              <div className="h-full w-1 bg-brand-accent rounded-full animate-wave-bar" style={{ animationDelay: '0.5s' }} />
              <div className="h-full w-1 bg-brand-accent rounded-full animate-wave-bar" style={{ animationDelay: '0.4s' }} />
              <div className="h-full w-1 bg-brand-accent rounded-full animate-wave-bar" style={{ animationDelay: '0.7s' }} />
              <div className="h-full w-1 bg-brand-accent rounded-full animate-wave-bar" style={{ animationDelay: '0.6s' }} />
              <div className="h-full w-1 bg-brand-accent rounded-full animate-wave-bar" style={{ animationDelay: '0.8s' }} />
            </div>

            {/* Running Subtitle/Transcript box */}
            <div className="bg-brand-cream/80 rounded-2xl p-3 border border-brand-charcoal/5 space-y-1">
              <textarea
                value={typedVoiceText}
                onChange={(e) => setTypedVoiceText(e.target.value)}
                className="w-full h-16 text-[11px] font-sans text-brand-charcoal bg-transparent resize-none border-none focus:outline-none leading-relaxed italic"
                placeholder="Talk to adapt this experience, e.g. I only have 4 days and my budget is $1,800..."
              />
              <div className="flex justify-end pt-1">
                <button 
                  onClick={() => setTypedVoiceText("I want a similar experience, but I only have four days and my total budget is around $1,800. I really love the hotel. The rest is flexible.")}
                  className="text-[9px] font-mono text-brand-charcoal/50 hover:text-brand-charcoal flex items-center gap-1 bg-white px-2 py-0.5 rounded border border-stone-200"
                >
                  <RotateCcw className="w-2.5 h-2.5" /> Use Default Request
                </button>
              </div>
            </div>
          </div>

          {/* Action Row */}
          <div className="grid grid-cols-5 gap-2">
            <button 
              onClick={() => setScreen(1)}
              className="col-span-1 bg-stone-100 hover:bg-stone-200 text-stone-700 py-3 rounded-full flex items-center justify-center transition-all cursor-pointer"
              title="Cancel"
            >
              <X className="w-4 h-4" />
            </button>
            <button 
              onClick={() => {
                setVoiceStatus('analyzing');
                setScreen(4);
                // Bypassing drag-and-drop manual preference, resolving immediately!
              }}
              className="col-span-4 bg-brand-charcoal hover:bg-brand-charcoal/90 text-white font-sans uppercase tracking-widest py-3 px-4 rounded-full text-[10px] font-bold transition-all flex items-center justify-center gap-1.5 shadow-sm cursor-pointer"
            >
              <Sparkles className="w-3.5 h-3.5 text-brand-accent" />
              <span>Analyze & Match Experience</span>
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Screen 3: Preference Confirmation
  if (currentScreen === 3) {
    const categories: { key: PreferenceCategory; label: string; bg: string; text: string; border: string }[] = [
      { key: 'must-keep', label: 'MUST KEEP', bg: 'bg-amber-50', text: 'text-amber-800', border: 'border-amber-200' },
      { key: 'preference', label: 'STRONG PREFERENCE', bg: 'bg-sage-50/50', text: 'text-brand-sage', border: 'border-brand-sage/20' },
      { key: 'flexible', label: 'FLEXIBLE', bg: 'bg-stone-50', text: 'text-stone-600', border: 'border-stone-200' },
      { key: 'hard-constraint', label: 'HARD CONSTRAINT', bg: 'bg-red-50/50', text: 'text-red-700', border: 'border-red-150' }
    ];

    const keywordOptions = [
      { id: "family", label: "👨‍👩‍👧‍👦 For Family", keyword: "family" },
      { id: "art-design", label: "🎨 Art & Design", keyword: "art-design" },
      { id: "foodie", label: "🥢 Gourmet Food", keyword: "foodie" },
      { id: "wellness", label: "🧘‍♀️ Slow Wellness", keyword: "wellness" },
      { id: "solo", label: "🎒 Solo Explorer", keyword: "solo" }
    ];

    return (
      <div id="screen-pref-confirmation" className="flex flex-col h-full bg-brand-cream overflow-y-auto">
        {/* Sticky Header */}
        <div className="flex items-center justify-between p-4 border-b border-brand-charcoal/5 bg-white/40 backdrop-blur-sm sticky top-0 z-10">
          <button onClick={() => setScreen(7)} className="text-xs text-brand-charcoal/60 hover:text-brand-charcoal">
            ← Back
          </button>
          <span className="text-xs font-serif font-medium text-brand-charcoal">Curation Adapter</span>
          <div className="w-10"></div>
        </div>

        {/* Intro */}
        <div className="p-4 space-y-1">
          <span className="text-[9px] font-mono uppercase tracking-widest text-brand-accent font-bold">Step 2: Map Curation Settings</span>
          <h2 className="text-xl font-serif text-brand-charcoal font-medium">Verify Curation Parameters</h2>
          <p className="text-[11px] text-brand-charcoal/60">
            Customize primary mapping variables and focus tags before activating agent tuning or resolving matches.
          </p>
        </div>

        {/* Big Mapping Options (Luxury / Medium / Budget) */}
        <div className="px-4 space-y-2.5">
          <h3 className="text-[10px] font-mono uppercase tracking-widest text-brand-charcoal/50 font-bold">PRIMARY CRITERIA MODE</h3>
          
          <div className="grid grid-cols-3 gap-2">
            {/* Luxury stays - default because of Shinmonzen */}
            <button 
              onClick={() => setTravelerTier('luxury')}
              className={`p-3 rounded-2xl border text-left flex flex-col justify-between transition-all cursor-pointer ${
                travelerTier === 'luxury'
                  ? 'bg-white border-brand-accent ring-1 ring-brand-accent/30 shadow-md'
                  : 'bg-white/50 border-brand-charcoal/5 hover:bg-white'
              }`}
            >
              <span className="text-sm">👑</span>
              <div className="mt-1.5">
                <p className="text-[10px] font-bold text-brand-charcoal leading-tight">Luxury Stay</p>
                <p className="text-[8px] text-brand-charcoal/50 leading-tight mt-0.5">Keep flagship hotel</p>
              </div>
            </button>

            {/* Medium Tier */}
            <button 
              onClick={() => setTravelerTier('medium')}
              className={`p-3 rounded-2xl border text-left flex flex-col justify-between transition-all cursor-pointer ${
                travelerTier === 'medium'
                  ? 'bg-white border-brand-accent ring-1 ring-brand-accent/30 shadow-md'
                  : 'bg-white/50 border-brand-charcoal/5 hover:bg-white'
              }`}
            >
              <span className="text-sm">⚖️</span>
              <div className="mt-1.5">
                <p className="text-[10px] font-bold text-brand-charcoal leading-tight">Balanced</p>
                <p className="text-[8px] text-brand-charcoal/50 leading-tight mt-0.5">Blend alternative stay</p>
              </div>
            </button>

            {/* Budget Tier */}
            <button 
              onClick={() => setTravelerTier('budget')}
              className={`p-3 rounded-2xl border text-left flex flex-col justify-between transition-all cursor-pointer ${
                travelerTier === 'budget'
                  ? 'bg-white border-brand-accent ring-1 ring-brand-accent/30 shadow-md'
                  : 'bg-white/50 border-brand-charcoal/5 hover:bg-white'
              }`}
            >
              <span className="text-sm">🏷️</span>
              <div className="mt-1.5">
                <p className="text-[10px] font-bold text-brand-charcoal leading-tight">Budget Smart</p>
                <p className="text-[8px] text-brand-charcoal/50 leading-tight mt-0.5">Prioritize savings</p>
              </div>
            </button>
          </div>
        </div>

        {/* Focus Keyword Pills */}
        <div className="px-4 pt-4 space-y-2">
          <h3 className="text-[10px] font-mono uppercase tracking-widest text-brand-charcoal/50 font-bold">FOCUS KEYWORDS</h3>
          <div className="flex flex-wrap gap-1.5">
            {keywordOptions.map((item) => {
              const isSelected = selectedKeywords.includes(item.keyword);
              return (
                <button
                  key={item.id}
                  onClick={() => handleToggleKeyword(item.keyword)}
                  className={`text-[10px] px-3 py-1.5 rounded-full border transition-all cursor-pointer font-sans font-medium flex items-center gap-1 ${
                    isSelected
                      ? 'bg-brand-charcoal text-white border-brand-charcoal shadow-sm'
                      : 'bg-white hover:bg-brand-cream border-brand-charcoal/10 text-brand-charcoal/80'
                  }`}
                >
                  <span>{item.label}</span>
                  {isSelected && <span className="text-[8px]">●</span>}
                </button>
              );
            })}
          </div>
        </div>

        {/* Fine-tuned Preference Lists */}
        <div className="px-4 pt-4 space-y-4 flex-grow">
          <h3 className="text-[10px] font-mono uppercase tracking-widest text-brand-charcoal/50 font-bold">DETAILED VALUES</h3>
          
          {categories.map((cat) => {
            const items = preferences.filter(p => p.category === cat.key);
            return (
              <div key={cat.key} className="space-y-1.5">
                <div className="flex items-center justify-between">
                  <span className={`text-[9px] font-mono font-bold tracking-wider px-2 py-0.5 rounded ${cat.bg} ${cat.text} border ${cat.border}`}>
                    {cat.label}
                  </span>
                  <span className="text-[9px] font-mono text-brand-charcoal/30">{items.length} items</span>
                </div>
                
                {items.length === 0 ? (
                  <p className="text-[10px] text-brand-charcoal/30 italic p-3 text-center bg-black/2 rounded-xl border border-dashed border-brand-charcoal/10">
                    No items in this category. Move other values here.
                  </p>
                ) : (
                  <div className="space-y-1.5">
                    {items.map((item) => (
                      <div 
                        key={item.id} 
                        className="bg-white hover:bg-brand-cream/40 p-2.5 rounded-xl border border-brand-charcoal/5 shadow-sm flex items-center justify-between gap-2 group transition-all"
                      >
                        <span className="text-xs text-brand-charcoal/85 leading-tight font-sans font-medium">{item.text}</span>
                        
                        {/* Selector control to switch category */}
                        <select
                           value={item.category}
                           onChange={(e) => handleMovePreference(item.id, e.target.value as PreferenceCategory)}
                           className="text-[9px] font-mono bg-brand-cream hover:bg-brand-beige border border-brand-charcoal/10 rounded px-1.5 py-0.5 text-brand-charcoal focus:outline-none max-w-[85px] cursor-pointer"
                        >
                          <option value="must-keep">Keep</option>
                          <option value="preference">Prefer</option>
                          <option value="flexible">Flexible</option>
                          <option value="hard-constraint">Limit</option>
                        </select>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Help disclaimer */}
        <div className="p-4 mx-4 my-2 bg-brand-beige/30 rounded-xl border border-brand-charcoal/5 flex items-start gap-2 flex-shrink-0">
          <Info className="w-3.5 h-3.5 text-brand-accent mt-0.5 flex-shrink-0" />
          <p className="text-[10px] text-brand-charcoal/65 leading-relaxed">
            These preferences map directly to the backstage decision solver and feed the acoustic parser.
          </p>
        </div>

        {/* CTA Double-Row Actions */}
        <div className="p-4 bg-white border-t border-brand-charcoal/5 sticky bottom-0 z-10 space-y-2 flex-shrink-0">
          <div className="grid grid-cols-2 gap-2">
            <button 
              onClick={() => setScreen(2)}
              className="w-full bg-brand-cream hover:bg-brand-beige border border-brand-charcoal/10 text-brand-charcoal font-sans uppercase tracking-widest py-3 px-4 rounded-full text-[9px] font-bold transition-all flex items-center justify-center gap-1.5 cursor-pointer shadow-sm"
            >
              <Volume2 className="w-3.5 h-3.5 text-brand-accent animate-pulse" />
              <span>Talk to Assistant</span>
            </button>
            <button 
              onClick={() => {
                setScreen(4);
              }}
              className="w-full bg-brand-charcoal text-white font-sans uppercase tracking-widest py-3 px-4 rounded-full text-[9px] font-bold hover:bg-brand-charcoal/90 transition-all flex items-center justify-center gap-1.5 shadow-sm cursor-pointer"
            >
              <span>Solve Curation</span>
              <ArrowRight className="w-3.5 h-3.5 text-white" />
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Screen 4: Conflict Discovery
  if (currentScreen === 4) {
    const isSearching = searchProgress < 100;

    return (
      <div id="screen-conflict" className="flex flex-col h-full bg-brand-cream justify-between">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-brand-charcoal/5 bg-white/40 backdrop-blur-sm sticky top-0 z-10 flex-shrink-0">
          <button onClick={() => setScreen(3)} className="text-xs text-brand-charcoal/60 hover:text-brand-charcoal">
            ← Back
          </button>
          <span className="text-xs font-serif font-medium text-brand-charcoal">Inventory Diagnostics</span>
          <div className="w-10"></div>
        </div>

        {isSearching ? (
          /* Loading State */
          <div className="flex-grow flex flex-col items-center justify-center p-6 space-y-4">
            <div className="relative w-16 h-16">
              <div className="absolute inset-0 rounded-full border-4 border-brand-accent/20 animate-pulse" />
              <div className="absolute inset-0 rounded-full border-4 border-brand-charcoal border-t-transparent animate-spin" />
            </div>
            <div className="text-center space-y-1.5 max-w-xs">
              <p className="text-xs font-mono uppercase tracking-widest text-brand-accent font-semibold">Simulating Search</p>
              <h3 className="text-sm font-serif font-semibold text-brand-charcoal">{searchStep}</h3>
              <p className="text-[10px] text-brand-charcoal/45 font-mono">Progress: {searchProgress}%</p>
            </div>
            <div className="w-44 h-1 bg-brand-beige rounded-full overflow-hidden border border-brand-charcoal/5">
              <div className="h-full bg-brand-accent transition-all duration-300" style={{ width: `${searchProgress}%` }} />
            </div>
          </div>
        ) : (
          /* Conflict Resolved Screen */
          <div className="flex-grow flex flex-col justify-between overflow-y-auto">
            <div className="p-4 space-y-4">
              {/* Conflict Box */}
              <div className="bg-red-50 border border-red-200/60 rounded-2xl p-4 space-y-2.5 shadow-sm">
                <div className="flex items-center gap-2">
                  <div className="p-1 bg-red-100 rounded-lg text-red-700">
                    <AlertCircle className="w-4 h-4" />
                  </div>
                  <h3 className="text-xs font-mono uppercase tracking-wider text-red-800 font-bold">Inventory Conflict</h3>
                </div>
                <p className="text-xs font-serif text-brand-charcoal leading-relaxed font-medium">
                  “The featured hotel is available, but staying there for all three nights would put your trip approximately <span className="text-red-700 font-semibold font-mono">$340 over budget</span>.”
                </p>
              </div>

              {/* Central Question */}
              <div className="space-y-1 text-center py-1">
                <p className="text-[10px] font-mono tracking-widest uppercase text-brand-accent font-bold">Trade-Off Selection</p>
                <h2 className="text-lg font-serif font-medium text-brand-charcoal">What would you rather change?</h2>
              </div>

              {/* Three Tradeoff Cards */}
              <div className="space-y-3">
                {/* Option A (Recommended) */}
                <button 
                  onClick={() => {
                    setSelectedOption('A');
                    setScreen(5);
                  }}
                  className={`w-full text-left p-4 rounded-2xl border transition-all relative cursor-pointer ${
                    selectedOption === 'A' 
                      ? 'bg-white border-brand-accent shadow-md ring-1 ring-brand-accent/30' 
                      : 'bg-white/80 hover:bg-white border-brand-charcoal/5 hover:border-brand-charcoal/20 shadow-sm'
                  }`}
                >
                  <div className="absolute top-3 right-3 bg-brand-sage/10 text-brand-sage border border-brand-sage/20 text-[9px] font-mono font-bold uppercase px-2 py-0.5 rounded-full">
                    Recommended Choice
                  </div>
                  <div className="space-y-1.5 max-w-[85%]">
                    <div className="flex items-center gap-1.5">
                      <span className="w-5 h-5 rounded-full bg-brand-accent text-white flex items-center justify-center font-mono text-[10px] font-bold">A</span>
                      <h4 className="text-xs font-serif font-bold text-brand-charcoal">Split the Hotel Stay</h4>
                    </div>
                    <p className="text-[11px] text-brand-charcoal/80 leading-relaxed font-medium">
                      “Stay at The Shinmonzen for one night, then move to a similar nearby hotel.”
                    </p>
                    <div className="pt-1.5 flex items-center gap-4 text-[10px] font-mono text-brand-charcoal/50">
                      <span>Price: <strong className="text-brand-charcoal">$1,760</strong></span>
                      <span>Attribution: <strong className="text-brand-sage">80%</strong></span>
                    </div>
                  </div>
                </button>

                {/* Option B */}
                <button 
                  onClick={() => {
                    setSelectedOption('B');
                    setScreen(5);
                  }}
                  className={`w-full text-left p-4 rounded-2xl border transition-all relative cursor-pointer ${
                    selectedOption === 'B' 
                      ? 'bg-white border-brand-accent shadow-md ring-1 ring-brand-accent/30' 
                      : 'bg-white/80 hover:bg-white border-brand-charcoal/5 hover:border-brand-charcoal/20 shadow-sm'
                  }`}
                >
                  <div className="space-y-1.5">
                    <div className="flex items-center gap-1.5">
                      <span className="w-5 h-5 rounded-full bg-stone-200 text-brand-charcoal flex items-center justify-center font-mono text-[10px] font-bold">B</span>
                      <h4 className="text-xs font-serif font-bold text-brand-charcoal">Keep the Full Luxury Stay</h4>
                    </div>
                    <p className="text-[11px] text-brand-charcoal/80 leading-relaxed">
                      “Keep the featured hotel for all three nights, but travel one week later and use a connecting flight.”
                    </p>
                    <div className="pt-1.5 flex items-center gap-4 text-[10px] font-mono text-brand-charcoal/50">
                      <span>Price: <strong className="text-brand-charcoal">$1,800</strong></span>
                      <span>Attribution: <strong className="text-brand-sage">100%</strong></span>
                    </div>
                  </div>
                </button>

                {/* Option C */}
                <button 
                  onClick={() => {
                    setSelectedOption('C');
                    setScreen(5);
                  }}
                  className={`w-full text-left p-4 rounded-2xl border transition-all relative cursor-pointer ${
                    selectedOption === 'C' 
                      ? 'bg-white border-brand-accent shadow-md ring-1 ring-brand-accent/30' 
                      : 'bg-white/80 hover:bg-white border-brand-charcoal/5 hover:border-brand-charcoal/20 shadow-sm'
                  }`}
                >
                  <div className="space-y-1.5">
                    <div className="flex items-center gap-1.5">
                      <span className="w-5 h-5 rounded-full bg-stone-200 text-brand-charcoal flex items-center justify-center font-mono text-[10px] font-bold">C</span>
                      <h4 className="text-xs font-serif font-bold text-brand-charcoal">Substitute the Entire Stay</h4>
                    </div>
                    <p className="text-[11px] text-brand-charcoal/80 leading-relaxed">
                      “Choose a similar boutique hotel in Gion and preserve the full four-day experience.”
                    </p>
                    <div className="pt-1.5 flex items-center gap-4 text-[10px] font-mono text-brand-charcoal/50">
                      <span>Price: <strong className="text-brand-charcoal">$1,460</strong></span>
                      <span>Attribution: <strong className="text-brand-sage">50%</strong></span>
                    </div>
                  </div>
                </button>
              </div>
            </div>

            {/* Quick Helper */}
            <p className="text-[10px] text-center text-brand-charcoal/40 font-mono pb-2">
              Choosing an option modifies the custom traveler package itinerary.
            </p>
          </div>
        )}

        {/* Hidden bottom padding to keep layout consistent */}
        <div className="h-2 flex-shrink-0" />
      </div>
    );
  }

  // Screen 5: Personalized Experience Result
  if (currentScreen === 5) {
    const selectedData = tradeOffOptions.find(o => o.id === selectedOption) || tradeOffOptions[0];
    const [activeTab, setActiveTab] = useState<'experience' | 'itinerary' | 'budget'>('experience');

    // Dynamic budget calculation depending on selected option
    const flightsCost = selectedOption === 'B' ? 220 : 760;
    const featuredHotelCost = selectedOption === 'A' ? 480 : selectedOption === 'B' ? 1440 : 0;
    const alternateHotelCost = selectedOption === 'A' ? 300 : selectedOption === 'B' ? 0 : 450;
    const activitiesCost = selectedOption === 'A' ? 220 : selectedOption === 'B' ? 140 : 250;
    const totalCost = selectedData.price;
    const underBudgetDiff = 1800 - totalCost;

    return (
      <div id="screen-personalized-result" className="flex flex-col h-full bg-brand-cream overflow-y-auto">
        {/* Sticky Header */}
        <div className="flex items-center justify-between p-4 border-b border-brand-charcoal/5 bg-white/40 backdrop-blur-sm sticky top-0 z-10 flex-shrink-0">
          <button onClick={() => setScreen(4)} className="text-xs text-brand-charcoal/60 hover:text-brand-charcoal">
            ← Refine
          </button>
          <span className="text-xs font-serif font-medium text-brand-charcoal">Your Adaptation</span>
          <div className="w-10"></div>
        </div>

        {/* Hero Card */}
        <div className="p-4 bg-white border-b border-brand-charcoal/5 space-y-3 flex-shrink-0">
          <div className="space-y-1">
            <span className="text-[9px] font-mono uppercase tracking-widest text-brand-accent font-bold">Personalized Route Generated</span>
            <h1 className="text-2xl font-serif text-brand-charcoal leading-tight font-medium">Your version of “Kyoto, Slowly”</h1>
          </div>

          <div className="flex items-center gap-3 py-1.5 border-y border-brand-charcoal/5">
            <div>
              <p className="text-[9px] uppercase tracking-wider text-brand-charcoal/40 font-mono">Duration</p>
              <p className="text-xs font-serif font-bold text-brand-charcoal">4 Days / 3 Nights</p>
            </div>
            <div className="w-px h-6 bg-brand-charcoal/10" />
            <div>
              <p className="text-[9px] uppercase tracking-wider text-brand-charcoal/40 font-mono">Origin</p>
              <p className="text-xs font-serif font-bold text-brand-charcoal">San Francisco (SFO)</p>
            </div>
            <div className="w-px h-6 bg-brand-charcoal/10" />
            <div>
              <p className="text-[9px] uppercase tracking-wider text-brand-charcoal/40 font-mono">Estimated Total</p>
              <p className="text-xs font-serif font-bold text-brand-sage">${totalCost.toLocaleString()}</p>
            </div>
          </div>

          {/* Under Budget Alert */}
          <div className="flex items-center justify-between bg-brand-beige/40 px-3 py-2 rounded-xl text-[11px] border border-brand-charcoal/5">
            <span className="text-brand-charcoal/70">Budget target: $1,800</span>
            <span className="font-mono font-bold text-brand-sage">
              {underBudgetDiff > 0 ? `$${underBudgetDiff} under your budget` : 'On budget'}
            </span>
          </div>
        </div>

        {/* Flight & Hotel Booking Confirmation Dashboard Summary Card */}
        <div className="mx-4 mt-1 mb-3 bg-white rounded-2xl p-4 border border-brand-charcoal/10 shadow-sm space-y-3 flex-shrink-0">
          <div className="flex items-center justify-between border-b border-brand-charcoal/5 pb-2">
            <span className="text-[10px] font-mono uppercase tracking-wider text-brand-accent font-bold">Flight & Hotel Status</span>
            <span className="text-[9px] font-mono bg-emerald-500/10 text-emerald-700 px-2.5 py-0.5 rounded-full font-bold border border-emerald-500/20">READY TO BOOK</span>
          </div>

          <div className="space-y-2.5 text-xs">
            {/* Flight */}
            <div className="flex items-start gap-2.5">
              <div className="p-1.5 bg-brand-cream rounded-lg text-brand-charcoal mt-0.5">
                <Plane className="w-3.5 h-3.5 text-brand-charcoal/60" />
              </div>
              <div className="space-y-0.5">
                <div className="flex items-center gap-2">
                  <p className="font-bold text-brand-charcoal">SFO ➔ KIX (Direct Flight)</p>
                  <span className="text-[9px] font-mono text-emerald-600 font-bold">● Locked</span>
                </div>
                <p className="text-[10px] text-brand-charcoal/50">Oct 14, 2026 • United Airlines • Seat Reserved</p>
              </div>
            </div>

            {/* Hotel */}
            <div className="flex items-start gap-2.5">
              <div className="p-1.5 bg-brand-cream rounded-lg text-brand-charcoal mt-0.5">
                <Hotel className="w-3.5 h-3.5 text-brand-charcoal/60" />
              </div>
              <div className="space-y-0.5">
                <div className="flex items-center gap-2">
                  <p className="font-bold text-brand-charcoal">
                    {selectedOption === 'A' ? 'Split Stay: 1n Shinmonzen, 2n Gion Terrace' : selectedOption === 'B' ? '3 nights: The Shinmonzen' : '3 nights: Gion Terrace Boutique'}
                  </p>
                  <span className="text-[9px] font-mono text-emerald-600 font-bold">● Confirmed</span>
                </div>
                <p className="text-[10px] text-brand-charcoal/50">Gion District, Kyoto • Boutique Aesthetics</p>
              </div>
            </div>
          </div>
        </div>

        {/* Tabs navigation */}
        <div className="px-4 pt-3 flex-shrink-0">
          <div className="flex border-b border-brand-charcoal/10">
            {(['experience', 'itinerary', 'budget'] as const).map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`flex-1 text-center pb-2 text-[11px] uppercase tracking-widest font-mono font-bold border-b-2 transition-all cursor-pointer ${
                  activeTab === tab 
                    ? 'border-brand-accent text-brand-accent' 
                    : 'border-transparent text-brand-charcoal/40 hover:text-brand-charcoal/70'
                }`}
              >
                {tab}
              </button>
            ))}
          </div>
        </div>

        {/* Dynamic Tab Body */}
        <div className="p-4 flex-grow">
          {activeTab === 'experience' && (
            <div className="space-y-4">
              <div className="relative rounded-2xl overflow-hidden aspect-[16/9] shadow-sm">
                <img 
                  src="https://images.unsplash.com/photo-1528164344705-47542687000d?q=80&w=600&auto=format&fit=crop" 
                  alt="Scenic Japanese Temple" 
                  className="absolute inset-0 w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end p-3">
                  <p className="text-white font-serif text-sm font-semibold leading-tight">Kyoto's Traditional Aesthetics</p>
                </div>
              </div>

              <div className="space-y-2.5">
                <h3 className="text-xs font-mono uppercase tracking-wider text-brand-charcoal/50 font-bold">How we optimized this experience</h3>
                <p className="text-xs text-brand-charcoal/80 leading-relaxed font-sans">
                  {selectedData.description}
                </p>
                
                <div className="bg-white p-3 rounded-xl border border-brand-charcoal/5 space-y-2">
                  <h4 className="text-[11px] font-mono text-brand-accent font-bold uppercase">PRESERVED SIGNATURES</h4>
                  <ul className="space-y-1.5 text-xs text-brand-charcoal/80">
                    <li className="flex items-center gap-2">
                      <span className="w-1.5 h-1.5 bg-brand-sage rounded-full" />
                      <span>Kyoto, Gion location focus</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="w-1.5 h-1.5 bg-brand-sage rounded-full" />
                      <span>{selectedOption === 'C' ? 'Maya\'s curated boutique pacing' : 'Featured hotel Stay (The Shinmonzen)'}</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="w-1.5 h-1.5 bg-brand-sage rounded-full" />
                      <span>Traditional Kyoto neighborhood atmosphere</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="w-1.5 h-1.5 bg-brand-sage rounded-full" />
                      <span>Premium Kaiseki master chef dining</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'itinerary' && (
            <div className="space-y-4">
              <p className="text-[10px] font-mono uppercase tracking-widest text-brand-charcoal/40 font-bold">Suggested Experience Structure</p>
              
              <div className="relative border-l border-brand-accent/20 ml-2.5 pl-4 space-y-5">
                {selectedData.itinerary.map((day) => (
                  <div key={day.day} className="relative space-y-1">
                    {/* Circle marker */}
                    <div className="absolute -left-[21px] top-1.5 w-2.5 h-2.5 rounded-full bg-brand-accent ring-4 ring-brand-cream" />
                    
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] uppercase tracking-wider font-mono font-bold text-brand-accent">Day {day.day}</span>
                      <span className="text-[9px] font-serif bg-brand-beige/85 px-2 py-0.5 rounded text-brand-charcoal font-semibold max-w-[140px] truncate">
                        🏨 {day.accommodation}
                      </span>
                    </div>
                    
                    <h4 className="text-xs font-serif font-bold text-brand-charcoal">{day.title}</h4>
                    <p className="text-[11px] text-brand-charcoal/70 leading-relaxed font-sans">{day.description}</p>
                    
                    <div className="flex flex-wrap gap-1 pt-1">
                      {day.activities.map((act, i) => (
                        <span key={i} className="text-[9px] bg-white border border-brand-charcoal/5 px-2 py-0.5 rounded text-brand-charcoal/80">
                          ✦ {act}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'budget' && (
            <div className="space-y-4">
              <div className="space-y-3 bg-white p-4 rounded-2xl border border-brand-charcoal/5 shadow-sm">
                <h3 className="text-xs font-mono uppercase tracking-wider text-brand-charcoal/50 font-bold">Adaptation Budget Breakdown</h3>
                
                <div className="space-y-2.5">
                  {/* Airfare */}
                  <div className="space-y-1">
                    <div className="flex justify-between text-xs font-sans">
                      <span className="text-brand-charcoal/70 flex items-center gap-1.5">
                        <Plane className="w-3.5 h-3.5 text-brand-charcoal/50" />
                        Airfare (SFO to KIX)
                      </span>
                      <span className="font-mono font-bold text-brand-charcoal">${flightsCost}</span>
                    </div>
                    <div className="h-1.5 bg-brand-beige rounded-full overflow-hidden">
                      <div className="h-full bg-brand-accent" style={{ width: `${(flightsCost/totalCost)*100}%` }} />
                    </div>
                  </div>

                  {/* Featured Hotel */}
                  {featuredHotelCost > 0 && (
                    <div className="space-y-1">
                      <div className="flex justify-between text-xs font-sans">
                        <span className="text-brand-charcoal/70 flex items-center gap-1.5">
                          <Hotel className="w-3.5 h-3.5 text-brand-charcoal/50" />
                          The Shinmonzen Stay
                        </span>
                        <span className="font-mono font-bold text-brand-charcoal">${featuredHotelCost}</span>
                      </div>
                      <div className="h-1.5 bg-brand-beige rounded-full overflow-hidden">
                        <div className="h-full bg-brand-gold" style={{ width: `${(featuredHotelCost/totalCost)*100}%` }} />
                      </div>
                    </div>
                  )}

                  {/* Alt Hotel */}
                  {alternateHotelCost > 0 && (
                    <div className="space-y-1">
                      <div className="flex justify-between text-xs font-sans">
                        <span className="text-brand-charcoal/70 flex items-center gap-1.5">
                          <Hotel className="w-3.5 h-3.5 text-brand-charcoal/50" />
                          Gion Terrace Boutique Stay
                        </span>
                        <span className="font-mono font-bold text-brand-charcoal">${alternateHotelCost}</span>
                      </div>
                      <div className="h-1.5 bg-brand-beige rounded-full overflow-hidden">
                        <div className="h-full bg-stone-500" style={{ width: `${(alternateHotelCost/totalCost)*100}%` }} />
                      </div>
                    </div>
                  )}

                  {/* Activities */}
                  <div className="space-y-1">
                    <div className="flex justify-between text-xs font-sans">
                      <span className="text-brand-charcoal/70 flex items-center gap-1.5">
                        <UtensilsCrossed className="w-3.5 h-3.5 text-brand-charcoal/50" />
                        Kaiseki & Local Experiences
                      </span>
                      <span className="font-mono font-bold text-brand-charcoal">${activitiesCost}</span>
                    </div>
                    <div className="h-1.5 bg-brand-beige rounded-full overflow-hidden">
                      <div className="h-full bg-brand-sage" style={{ width: `${(activitiesCost/totalCost)*100}%` }} />
                    </div>
                  </div>
                </div>

                <div className="pt-3 border-t border-brand-charcoal/10 flex items-center justify-between">
                  <span className="text-xs font-serif font-bold text-brand-charcoal">Sum Total</span>
                  <span className="text-sm font-mono font-bold text-brand-sage">${totalCost} USD</span>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Bottom CTA Actions */}
        <div className="p-4 bg-white border-t border-brand-charcoal/5 sticky bottom-0 z-10 grid grid-cols-2 gap-2 flex-shrink-0">
          <button 
            onClick={() => setScreen(2)}
            className="w-full bg-brand-cream hover:bg-brand-beige border border-brand-charcoal/10 text-brand-charcoal/80 py-3 rounded-full text-[10px] font-bold font-sans uppercase tracking-widest transition-all cursor-pointer flex items-center justify-center gap-1"
          >
            <Volume2 className="w-3.5 h-3.5 text-brand-accent animate-pulse" />
            <span>Refine with Voice</span>
          </button>
          <button 
            onClick={() => setScreen(6)}
            className="w-full bg-brand-charcoal hover:bg-brand-charcoal/90 text-white py-3 rounded-full text-[10px] font-bold font-sans uppercase tracking-widest transition-all cursor-pointer shadow-sm flex items-center justify-center gap-1"
          >
            <Check className="w-3.5 h-3.5 text-emerald-400" />
            <span>Book & Checkout</span>
          </button>
        </div>
      </div>
    );
  }

  // Screen 6: Attribution Summary
  if (currentScreen === 6) {
    const selectedData = tradeOffOptions.find(o => o.id === selectedOption) || tradeOffOptions[0];

    return (
      <div id="screen-attribution" className="flex flex-col h-full bg-brand-cream overflow-y-auto">
        {/* Sticky Header */}
        <div className="flex items-center justify-between p-4 border-b border-brand-charcoal/5 bg-white/40 backdrop-blur-sm sticky top-0 z-10 flex-shrink-0">
          <button onClick={() => setScreen(5)} className="text-xs text-brand-charcoal/60 hover:text-brand-charcoal">
            ← Adaptation
          </button>
          <span className="text-xs font-serif font-medium text-brand-charcoal">Creator Royalty Transparency</span>
          <div className="w-10"></div>
        </div>

        <div className="p-4 space-y-4 flex-grow">
          <div className="text-center space-y-1">
            <div className="inline-flex items-center justify-center p-2 bg-brand-sage/10 text-brand-sage rounded-full">
              <Coins className="w-5 h-5" />
            </div>
            <h2 className="text-lg font-serif font-semibold text-brand-charcoal">Creator Influence Preserved</h2>
            <p className="text-[11px] text-brand-charcoal/60 leading-relaxed px-4">
              “Maya inspired the destination, featured hotel, travel pace, and food focus. Your trip was adapted around your time and budget.”
            </p>
          </div>

          {/* Curation checklist */}
          <div className="bg-white rounded-2xl p-4 border border-brand-charcoal/5 shadow-sm space-y-3">
            <h3 className="text-[10px] font-mono tracking-wider uppercase text-brand-charcoal/55 font-bold">Influence Evidence Matrix</h3>
            
            <div className="space-y-2">
              <div className="flex items-center justify-between text-xs">
                <span className="text-brand-charcoal/70">Featured Gion Hotel Retained</span>
                <span className="font-mono text-brand-sage font-bold flex items-center gap-1">
                  {selectedOption === 'C' ? (
                    <span className="text-stone-400 text-[10px]">No (Substituted)</span>
                  ) : (
                    <>
                      <Check className="w-3.5 h-3.5" /> Yes ({selectedOption === 'A' ? '1 night' : 'Full'})
                    </>
                  )}
                </span>
              </div>
              <div className="flex items-center justify-between text-xs">
                <span className="text-brand-charcoal/70">Kyoto Destination Retained</span>
                <span className="font-mono text-brand-sage font-bold flex items-center gap-1">
                  <Check className="w-3.5 h-3.5" /> Yes (100%)
                </span>
              </div>
              <div className="flex items-center justify-between text-xs">
                <span className="text-brand-charcoal/70">Slow-Travel Style Curated</span>
                <span className="font-mono text-brand-sage font-bold flex items-center gap-1">
                  <Check className="w-3.5 h-3.5" /> Yes (Matching Pace)
                </span>
              </div>
              <div className="flex items-center justify-between text-xs">
                <span className="text-brand-charcoal/70">Boutique Kaiseki Dining Retained</span>
                <span className="font-mono text-brand-sage font-bold flex items-center gap-1">
                  <Check className="w-3.5 h-3.5" /> Yes (1 Meal)
                </span>
              </div>
              <div className="flex items-center justify-between text-xs border-t border-brand-charcoal/5 pt-2">
                <span className="text-brand-charcoal/70">Trip Duration Adapted</span>
                <span className="font-mono text-brand-charcoal/60">7 Days → 4 Days</span>
              </div>
              {selectedOption === 'A' && (
                <div className="flex items-center justify-between text-xs">
                  <span className="text-brand-charcoal/70">Secondary Hotel Substituted</span>
                  <span className="font-mono text-brand-charcoal/60">Gion Terrace Boutique</span>
                </div>
              )}
            </div>
          </div>

          {/* Allocation results */}
          <div className="bg-brand-beige/50 rounded-2xl p-4 border border-brand-charcoal/10 space-y-2.5 text-center">
            <div>
              <p className="text-[9px] uppercase tracking-wider text-brand-charcoal/50 font-mono">Calculated Attribution Tier</p>
              <p className="text-lg font-serif font-bold text-brand-charcoal">{selectedData.attributionTier}</p>
            </div>
            <div className="h-px bg-brand-charcoal/10 max-w-[120px] mx-auto" />
            <div>
              <p className="text-[9px] uppercase tracking-wider text-brand-charcoal/50 font-mono">Suggested Commission Weight</p>
              <p className="text-3xl font-mono font-bold text-brand-sage">{selectedData.commissionWeight}%</p>
              <p className="text-[10px] text-brand-charcoal/50 mt-1 max-w-xs mx-auto">
                {selectedData.attributionReason}
              </p>
            </div>
          </div>

          <p className="text-[9px] text-brand-charcoal/40 text-center italic leading-normal">
            “This prototype recommends an attribution tier. Payment distribution rules would be defined by the affiliate platform.”
          </p>
        </div>

        {/* Checkout CTA */}
        <div className="p-4 bg-white border-t border-brand-charcoal/5 sticky bottom-0 z-10 flex-shrink-0">
          <button 
            onClick={() => setShowCheckoutModal(true)}
            className="w-full bg-brand-sage hover:bg-brand-sage/90 text-white font-sans uppercase tracking-widest py-3.5 px-4 rounded-full text-xs font-bold transition-all flex items-center justify-center gap-2 shadow-sm cursor-pointer"
          >
            <span>Continue to checkout</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    );
  }

  return null;
};
