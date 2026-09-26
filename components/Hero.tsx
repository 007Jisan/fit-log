'use client';
import { ArrowDown } from 'lucide-react';

export default function Hero() {
  const scrollToLibrary = () => {
    document.getElementById('library')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="px-6 md:px-8 py-8 max-w-7xl mx-auto">
      <div className="bg-[#121214] rounded-[2rem] px-8 md:px-16 py-16 flex flex-col md:flex-row items-center justify-between gap-12 border border-zinc-900/50">
        <div className="max-w-xl space-y-5">
          <span className="text-[#ccff00] font-bold tracking-[0.15em] text-[11px] uppercase">Workout Library</span>
          <h1 className="display-font text-5xl md:text-[3.5rem] uppercase tracking-tight leading-[1.05] font-black">
            Train with intent. <br/> Log every set.
          </h1>
          <p className="text-zinc-400 text-sm md:text-base leading-relaxed max-w-md">
            FitLog is a dark, no-nonsense gym companion: pick a lift, lock it into today's plan, and watch the week's work add up.
          </p>
          <div className="pt-4">
            <button 
              onClick={scrollToLibrary}
              className="bg-[#ccff00] text-black font-black px-7 py-3 rounded hover:bg-[#b3e600] transition text-sm flex items-center gap-2 uppercase tracking-wide"
            >
              Browse Workouts <ArrowDown size={18} strokeWidth={3} />
            </button>
          </div>
        </div>
        
        <div className="w-full max-w-sm flex justify-end">
          <img 
            src="/banner.png" 
            alt="Train with intent" 
            className="w-full h-auto max-h-[400px] object-contain drop-shadow-2xl"
          />
        </div>
      </div>
    </div>
  );
}