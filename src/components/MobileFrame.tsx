import React from 'react';

interface MobileFrameProps {
  children: React.ReactNode;
}

export const MobileFrame: React.FC<MobileFrameProps> = ({ children }) => {
  return (
    <div className="relative mx-auto w-full max-w-[390px] h-[780px] bg-[#1a1917] rounded-[52px] p-3.5 shadow-[0_25px_60px_-15px_rgba(0,0,0,0.5)] border-4 border-[#3c3a35] flex flex-col overflow-hidden ring-1 ring-white/10">
      
      {/* Top Island Notch */}
      <div className="absolute top-4 left-1/2 -translate-x-1/2 w-32 h-6 bg-black rounded-2xl z-50 flex items-center justify-between px-3">
        {/* Camera Lens */}
        <div className="w-3.5 h-3.5 rounded-full bg-[#111] border border-white/5 flex items-center justify-center">
          <div className="w-1 h-1 rounded-full bg-[#1b223c]" />
        </div>
        {/* Sensor speaker */}
        <div className="w-12 h-1 bg-white/10 rounded-full" />
        <div className="w-3.5 h-3.5 rounded-full bg-[#111] border border-white/5 opacity-40" />
      </div>

      {/* Screen Container */}
      <div className="w-full h-full bg-brand-cream rounded-[40px] overflow-hidden relative flex flex-col border border-black/10 select-none">
        
        {/* Simulated iOS Status Bar */}
        <div className="h-10 px-6 pt-2 pb-1 flex items-end justify-between text-brand-charcoal text-[11px] font-semibold tracking-tight bg-transparent select-none z-40 relative flex-shrink-0">
          <span>9:41</span>
          
          <div className="flex items-center gap-1.5 text-xs">
            {/* Cellular strength dots */}
            <div className="flex gap-0.5 items-end h-2">
              <span className="w-1 h-1 bg-brand-charcoal rounded-full" />
              <span className="w-1 h-1.5 bg-brand-charcoal rounded-full" />
              <span className="w-1 h-2 bg-brand-charcoal rounded-full" />
              <span className="w-1 h-2.5 bg-brand-charcoal rounded-full" />
            </div>
            
            {/* WiFi Symbol */}
            <span className="text-[10px]">📶</span>
            
            {/* Battery */}
            <div className="w-5 h-2.5 rounded border border-brand-charcoal/70 p-0.5 flex items-center">
              <div className="h-full w-[80%] bg-brand-charcoal rounded-sm" />
            </div>
          </div>
        </div>

        {/* Device Content Port */}
        <div className="flex-grow overflow-hidden relative flex flex-col">
          {children}
        </div>

        {/* Simulated iOS Home Indicator Swipe Bar */}
        <div className="h-6 w-full flex items-center justify-center bg-white border-t border-brand-charcoal/5 flex-shrink-0 z-40 relative">
          <div className="w-28 h-1 bg-brand-charcoal/30 rounded-full" />
        </div>

      </div>
    </div>
  );
};
