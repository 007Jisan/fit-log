'use client';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Hero from '../components/Hero';
import { Clock, Flame, Star, ChevronDown, Search } from 'lucide-react';

export default function Home() {
  const [workouts, setWorkouts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [sortBy, setSortBy] = useState('default');
  const [searchQuery, setSearchQuery] = useState('');
  const router = useRouter();

  useEffect(() => {
    fetch('https://api.abcz.workers.dev/api/fitlog')
      .then(res => res.json())
      .then(data => {
        setWorkouts(data.data || data);
        setLoading(false);
      })
      .catch(err => {
        console.error(err);
        setLoading(false);
      });
  }, []);

  // Prothome Search er upite filter hobe, tarpor sort hobe
  const filteredWorkouts = workouts.filter((workout) => {
    const query = searchQuery.toLowerCase();
    const matchName = workout.name?.toLowerCase().includes(query);
    const cat = Array.isArray(workout.category) ? workout.category.join(' ') : workout.category || '';
    const matchTag = cat.toLowerCase().includes(query);
    return matchName || matchTag;
  });

  const sortedWorkouts = [...filteredWorkouts].sort((a, b) => {
    if (sortBy === 'duration') return parseInt(a.duration || '0') - parseInt(b.duration || '0');
    if (sortBy === 'calories') return parseInt(b.calories || b.calorie || '0') - parseInt(a.calories || a.calorie || '0');
    if (sortBy === 'rating') return parseFloat(b.rating || '0') - parseFloat(a.rating || '0');
    return 0;
  });

  return (
    <div>
      <Hero />
      <div id="library" className="max-w-7xl mx-auto px-6 py-16">
        <div className="flex flex-col lg:flex-row lg:items-end justify-between mb-8 gap-6">
          <div>
            <h2 className="display-font text-[2rem] font-black uppercase tracking-wide text-white">The Library</h2>
            <p className="text-zinc-400 text-sm mt-1">Twelve lifts covering every major muscle group.</p>
          </div>
          
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
            {/* Search Input */}
            <div className="relative w-full sm:w-64">
              <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-500" />
              <input 
                type="text" 
                placeholder="Search workout or tag..." 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-[#18181b] border border-zinc-800 rounded px-10 py-2 text-sm text-white focus:outline-none focus:border-zinc-600 transition placeholder:text-zinc-500"
              />
            </div>

            {/* Sort Dropdown */}
            <div className="flex items-center gap-2">
              <span className="text-[11px] text-zinc-400 font-bold uppercase tracking-widest hidden sm:block">Sort By:</span>
              <div className="relative flex items-center bg-transparent border border-zinc-800 rounded px-3 py-1.5 hover:border-zinc-600 transition">
                <select 
                  value={sortBy} 
                  onChange={(e) => setSortBy(e.target.value)}
                  className="bg-transparent text-white font-semibold text-xs focus:outline-none cursor-pointer appearance-none pr-6 z-10"
                >
                  <option value="default" className="bg-zinc-900">Default</option>
                  <option value="duration" className="bg-zinc-900">Duration</option>
                  <option value="calories" className="bg-zinc-900">Calories</option>
                  <option value="rating" className="bg-zinc-900">Rating</option>
                </select>
                <ChevronDown size={14} className="text-zinc-400 absolute right-2 z-0" />
              </div>
            </div>
          </div>
        </div>

        {loading ? (
          <div className="flex justify-center items-center py-32 flex-col gap-4">
            <div className="w-10 h-10 border-4 border-zinc-800 border-t-[#ccff00] rounded-full animate-spin"></div>
            <span className="text-zinc-400 font-bold tracking-widest uppercase text-xs">Loading workouts...</span>
          </div>
        ) : sortedWorkouts.length === 0 ? (
           <div className="text-center py-20 text-zinc-500 font-semibold">No workouts found matching "{searchQuery}"</div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {sortedWorkouts.map((workout) => {
              let categories: string[] = [];
              if (Array.isArray(workout.category)) {
                categories = workout.category;
              } else if (typeof workout.category === 'string') {
                categories = workout.category.split(',').map((c: string) => c.trim()).filter(Boolean);
              }
              if (categories.length === 0) categories = ['CHEST', 'ARMS'];

              const displayDuration = workout.duration ? String(workout.duration).replace('min', '').trim() + ' min' : '0 min';
              const rawCalories = workout.calories || workout.calorie;
              const displayCalories = rawCalories ? String(rawCalories).replace('kcal', '').trim() + ' kcal' : '0 kcal';

              return (
                <div 
                  key={workout.id}
                  onClick={() => router.push(`/workout/${workout.id}`)}
                  className="bg-[#121214] border border-zinc-800/50 rounded-2xl overflow-hidden cursor-pointer flex flex-col group transition-all hover:border-zinc-700"
                >
                  <div className="overflow-hidden h-[13rem] w-full relative">
                    <img src={workout.image || workout.img} alt={workout.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                  </div>
                  <div className="p-5 flex-grow flex flex-col">
                    <div className="flex gap-2 flex-wrap mb-3.5">
                      {categories.slice(0, 2).map((cat: string, idx: number) => (
                        <span key={idx} className="bg-[#ccff00] text-black px-2.5 py-1 rounded-full text-[10px] font-black uppercase tracking-widest">{cat}</span>
                      ))}
                    </div>
                    <h3 className="display-font text-xl font-black text-white uppercase tracking-wide leading-tight mb-1">{workout.name}</h3>
                    <p className="text-xs text-zinc-500 mb-6 font-medium">{workout.equipment}</p>
                    <div className="mt-auto flex items-center justify-between text-xs text-zinc-400 border-t border-zinc-800/80 pt-4 font-medium">
                      <span className="flex items-center gap-1.5"><Clock size={14} className="text-zinc-500" /> {displayDuration}</span>
                      <span className="flex items-center gap-1.5"><Flame size={14} className="text-zinc-500" /> {displayCalories}</span>
                      <span className="flex items-center gap-1.5"><Star size={14} className="text-zinc-500" /> {workout.rating || '0.0'}</span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}