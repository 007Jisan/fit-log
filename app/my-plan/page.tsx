'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useWorkout } from '../../context/WorkoutContext';
import { Clock, Flame, Star, Check, X, ArrowRight } from 'lucide-react';

export default function MyPlan() {
  const [activeTab, setActiveTab] = useState<'plan' | 'saved'>('plan');
  const router = useRouter();
  const { planList, savedList, removeFromPlan, removeFromSaved, markAsDone } = useWorkout();

  const totalExercises = planList.length;
  const totalMinutes = planList.reduce((acc: number, item: any) => acc + parseInt(item.duration || '0'), 0);
  const totalCalories = planList.reduce((acc: number, item: any) => acc + parseInt(item.calories || '0'), 0);
  const currentItems = activeTab === 'plan' ? planList : savedList;

  return (
    <div className="max-w-5xl mx-auto px-6 py-12">
      <h1 className="display-font text-4xl font-black uppercase tracking-tight">My Plan</h1>
      <p className="text-zinc-400 text-sm mt-2">Cap of five lifts for today. Finish them, then load more.</p>

      {/* Metrics Row */}
      <div className="grid grid-cols-3 gap-4 my-10">
        <div className="bg-[#09090b] border border-zinc-800 p-6 rounded-xl">
          <p className="text-xs text-zinc-500 font-bold uppercase tracking-wider">Exercises</p>
          <p className="text-4xl font-black mt-2 text-[#ccff00]">{totalExercises}</p>
        </div>
        <div className="bg-[#09090b] border border-zinc-800 p-6 rounded-xl">
          <p className="text-xs text-zinc-500 font-bold uppercase tracking-wider">Minutes</p>
          <p className="text-4xl font-black mt-2 text-[#ccff00]">{totalMinutes}</p>
        </div>
        <div className="bg-[#09090b] border border-zinc-800 p-6 rounded-xl">
          <p className="text-xs text-zinc-500 font-bold uppercase tracking-wider">Calories</p>
          <p className="text-4xl font-black mt-2 text-[#ccff00]">{totalCalories}</p>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex border-b border-zinc-800 mb-8 gap-8">
        <button 
          onClick={() => setActiveTab('plan')} 
          className={`pb-3 font-bold text-sm tracking-wide transition border-b-2 ${activeTab === 'plan' ? 'border-[#ccff00] text-[#ccff00]' : 'border-transparent text-zinc-500 hover:text-zinc-300'}`}
        >
          Today's Plan
        </button>
        <button 
          onClick={() => setActiveTab('saved')} 
          className={`pb-3 font-bold text-sm tracking-wide transition border-b-2 ${activeTab === 'saved' ? 'border-[#ccff00] text-[#ccff00]' : 'border-transparent text-zinc-500 hover:text-zinc-300'}`}
        >
          Saved
        </button>
      </div>

      {/* Content */}
      {currentItems.length === 0 ? (
        <div className="bg-[#09090b] border border-zinc-800 rounded-2xl p-16 text-center space-y-4 my-8 shadow-sm">
          <h3 className="display-font text-3xl font-black uppercase tracking-wide">Nothing here yet</h3>
          <p className="text-zinc-400 text-sm max-w-sm mx-auto">Browse the library and add a lift to get today moving.</p>
          <button 
            onClick={() => router.push('/')} 
            className="inline-flex items-center gap-2 bg-[#ccff00] text-black font-bold px-7 py-3.5 rounded hover:bg-[#b3e600] transition text-sm mt-4 uppercase tracking-wide"
          >
            Go to workouts <ArrowRight size={16} strokeWidth={2.5} />
          </button>
        </div>
      ) : (
        <div className="space-y-4">
          {currentItems.map((item: any) => (
            <div key={item.id} className={`bg-[#09090b] border border-zinc-800 rounded-xl p-4 flex flex-col sm:flex-row items-center justify-between gap-6 transition ${item.done ? 'opacity-40' : ''}`}>
              <div className="flex items-center gap-5 w-full sm:w-auto">
                <img src={item.image || item.img} alt={item.name} className="w-24 h-24 rounded-lg object-cover border border-zinc-800" />
                <div>
                  <h4 className={`display-font text-xl uppercase tracking-wide ${item.done ? 'line-through text-zinc-500' : 'text-white'}`}>{item.name}</h4>
                  <p className="text-xs text-zinc-400 mt-1">{item.equipment}</p>
                  <div className="flex items-center gap-4 text-xs text-zinc-300 mt-3 font-semibold">
                    <span className="flex items-center gap-1.5"><Clock size={14} className="text-zinc-500" /> {item.duration}</span>
                    <span className="flex items-center gap-1.5"><Flame size={14} className="text-[#ccff00]" /> {item.calories} kcal</span>
                    <span className="flex items-center gap-1.5"><Star size={14} className="text-zinc-400 fill-zinc-400" /> {item.rating}</span>
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-3 w-full sm:w-auto justify-end">
                <button 
                  onClick={() => router.push(`/workout/${item.id}`)} 
                  className="border border-zinc-700 text-xs font-semibold px-4 py-2.5 rounded hover:border-zinc-500 transition text-zinc-300"
                >
                  View Details
                </button>
                {activeTab === 'plan' && (
                  <button 
                    onClick={() => markAsDone(item.id)} 
                    className={`flex items-center gap-1.5 text-xs font-bold px-4 py-2.5 rounded transition uppercase tracking-wide ${item.done ? 'bg-zinc-900 text-zinc-500 border border-zinc-800' : 'bg-[#ccff00] text-black hover:bg-[#b3e600]'}`}
                  >
                    <Check size={16} strokeWidth={3} /> {item.done ? 'Done' : 'Mark as Done'}
                  </button>
                )}
                <button 
                  onClick={() => activeTab === 'plan' ? removeFromPlan(item.id) : removeFromSaved(item.id)} 
                  className="text-zinc-500 hover:text-red-400 p-2 hover:bg-zinc-900 rounded transition"
                >
                  <X size={18} />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}