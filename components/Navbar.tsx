'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useWorkout } from '../context/WorkoutContext';

export default function Navbar() {
  const pathname = usePathname();
  const { planList, savedList } = useWorkout();

  return (
    <nav className="bg-[#09090b] sticky top-0 z-50 px-6 py-5 flex flex-wrap items-center justify-between gap-4 border-b border-zinc-900/50">
      <Link href="/" className="flex items-center gap-3">
        <img src="/logo.png" alt="FitLog Logo" className="h-6 w-auto object-contain" />
        <span className="font-black tracking-wider text-lg uppercase display-font">FitLog</span>
      </Link>
      
      <div className="flex items-center gap-8 font-semibold text-xs uppercase tracking-widest absolute left-1/2 -translate-x-1/2">
        <Link href="/" className={`transition pb-1.5 ${pathname === '/' ? 'text-[#ccff00] border-b-2 border-[#ccff00]' : 'text-zinc-500 hover:text-white'}`}>
          Workouts
        </Link>
        <Link href="/my-plan" className={`transition pb-1.5 ${pathname === '/my-plan' ? 'text-[#ccff00] border-b-2 border-[#ccff00]' : 'text-zinc-500 hover:text-white'}`}>
          My Plan
        </Link>
      </div>

      <div className="flex items-center gap-6 text-sm font-semibold text-zinc-300">
        <Link href="/my-plan" className="flex items-center gap-2 hover:text-white transition">
          Plan 
          <span className="bg-[#ccff00] text-black w-6 h-6 flex items-center justify-center rounded-full font-black text-xs">
            {planList.length}
          </span>
        </Link>
        <Link href="/my-plan" className="flex items-center gap-2 hover:text-white transition">
          Saved 
          <span className="bg-zinc-900 border border-zinc-800 text-zinc-400 w-6 h-6 flex items-center justify-center rounded-full font-bold text-xs">
            {savedList.length}
          </span>
        </Link>
      </div>
    </nav>
  );
}