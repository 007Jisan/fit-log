'use client';
import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { useWorkout } from '../../../context/WorkoutContext';
import { ArrowLeft, Plus, Bookmark } from 'lucide-react';

export default function WorkoutDetails() {
  const params = useParams();
  const router = useRouter();
  const { planList, addToPlan, saveForLater } = useWorkout();
  const [workout, setWorkout] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check if params and params.id exist before fetching
    if (!params || !params.id) return;
    
    fetch(`https://api.abcz.workers.dev/api/fitlog/${params.id}`)
      .then(res => res.json())
      .then(data => {
        setWorkout(data.data || data);
        setLoading(false);
      })
      .catch(err => {
        console.error(err);
        setLoading(false);
      });
  }, [params]);

  if (loading) return <div className="py-32 text-center text-zinc-400 font-medium">Loading details...</div>;
  if (!workout) return <div className="py-32 text-center text-zinc-400 font-medium">Workout not found.</div>;

  const isPlanFull = planList.length >= 5;

  return (
    <div className="max-w-5xl mx-auto px-6 py-12">
      <button 
        onClick={() => router.push('/')} 
        className="flex items-center gap-2 text-zinc-400 hover:text-white mb-8 text-sm font-semibold transition"
      >
        <ArrowLeft size={16} /> Back to workouts
      </button>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-start">
        <div className="bg-[#09090b] rounded-2xl border border-zinc-800 overflow-hidden shadow-2xl flex justify-center items-center h-[450px]">
           <img 
             src={workout.image || workout.img} 
             alt={workout.name} 
             className="w-full h-full object-cover" 
           />
        </div>
        
        <div className="space-y-6">
          <div>
            <span className="text-[#ccff00] text-[10px] font-black px-2 py-1 rounded bg-zinc-900 border border-zinc-800 uppercase tracking-widest">
              {Array.isArray(workout.category) ? workout.category.join(', ') : workout.category}
            </span>
            <h1 className="display-font text-4xl font-black uppercase tracking-tight mt-4">{workout.name}</h1>
            <p className="text-zinc-400 text-sm mt-3 leading-relaxed">
              {workout.description || "A high-impact compound movement designed to maximize strength and muscle endurance."}
            </p>
          </div>

          <div className="bg-[#09090b] border border-zinc-800 rounded-xl overflow-hidden text-sm divide-y divide-zinc-900 shadow-sm">
            <div className="flex justify-between px-5 py-3.5"><span className="text-zinc-500 uppercase text-xs font-bold tracking-wider">Equipment</span><span className="font-semibold text-zinc-200">{workout.equipment}</span></div>
            <div className="flex justify-between px-5 py-3.5"><span className="text-zinc-500 uppercase text-xs font-bold tracking-wider">Difficulty</span><span className="font-semibold text-zinc-200">{workout.difficulty || "Intermediate"}</span></div>
            <div className="flex justify-between px-5 py-3.5"><span className="text-zinc-500 uppercase text-xs font-bold tracking-wider">Sets</span><span className="font-semibold text-zinc-200">{workout.sets || 4}</span></div>
            <div className="flex justify-between px-5 py-3.5"><span className="text-zinc-500 uppercase text-xs font-bold tracking-wider">Reps</span><span className="font-semibold text-zinc-200">{workout.reps || "8-10"}</span></div>
            <div className="flex justify-between px-5 py-3.5"><span className="text-zinc-500 uppercase text-xs font-bold tracking-wider">Duration</span><span className="font-semibold text-zinc-200">{workout.duration}</span></div>
            <div className="flex justify-between px-5 py-3.5"><span className="text-zinc-500 uppercase text-xs font-bold tracking-wider">Calories</span><span className="font-semibold text-zinc-200">{workout.calories} kcal</span></div>
            <div className="flex justify-between px-5 py-3.5"><span className="text-zinc-500 uppercase text-xs font-bold tracking-wider">Rating</span><span className="font-semibold text-zinc-200">{workout.rating} ⭐</span></div>
          </div>

          <div>
            <h3 className="font-black text-xs uppercase tracking-widest text-zinc-400 mb-3">Instructions</h3>
            <ol className="list-decimal list-inside space-y-2 text-sm text-zinc-300 leading-relaxed">
              {workout.instructions ? workout.instructions.map((step: string, idx: number) => (
                <li key={idx}>{step}</li>
              )) : (
                <>
                  <li>Set up the required weight and secure proper seating/positioning.</li>
                  <li>Maintain core tension and stable posture throughout the movement.</li>
                  <li>Execute with controlled tempo during eccentric and concentric phases.</li>
                  <li>Breathe steadily and complete the assigned repetition target.</li>
                </>
              )}
            </ol>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 pt-4">
            <button 
              onClick={() => addToPlan(workout)}
              disabled={isPlanFull}
              className={`flex-1 flex justify-center items-center gap-2 font-bold px-6 py-4 rounded transition text-sm tracking-wide uppercase ${isPlanFull ? 'bg-zinc-900 text-zinc-500 border border-zinc-800 cursor-not-allowed' : 'bg-[#ccff00] text-black hover:bg-[#b3e600]'}`}
            >
              <Plus size={18} strokeWidth={2.5} /> {isPlanFull ? 'Plan Full (Max 5)' : "Add to today's plan"}
            </button>
            <button 
              onClick={() => saveForLater(workout)} 
              className="flex justify-center items-center gap-2 bg-[#09090b] border border-zinc-700 font-semibold px-6 py-4 rounded hover:border-zinc-500 transition text-sm tracking-wide text-zinc-300"
            >
              <Bookmark size={18} /> Save for later
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}