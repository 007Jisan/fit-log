'use client';
import React, { createContext, useContext, useState, useEffect } from 'react';

// Types to keep TypeScript happy
type Workout = any; 
type ContextType = {
  planList: Workout[];
  savedList: Workout[];
  toastMessage: string | null;
  addToPlan: (workout: Workout) => void;
  saveForLater: (workout: Workout) => void;
  removeFromPlan: (id: string) => void;
  removeFromSaved: (id: string) => void;
  markAsDone: (id: string) => void;
};

const WorkoutContext = createContext<ContextType | undefined>(undefined);

export function WorkoutProvider({ children }: { children: React.ReactNode }) {
  const [planList, setPlanList] = useState<Workout[]>([]);
  const [savedList, setSavedList] = useState<Workout[]>([]);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Load from localStorage on mount
  useEffect(() => {
    const savedPlan = localStorage.getItem('fitlog_plan');
    const savedItems = localStorage.getItem('fitlog_saved');
    if (savedPlan) setPlanList(JSON.parse(savedPlan));
    if (savedItems) setSavedList(JSON.parse(savedItems));
  }, []);

  // Sync to localStorage
  useEffect(() => {
    localStorage.setItem('fitlog_plan', JSON.stringify(planList));
  }, [planList]);

  useEffect(() => {
    localStorage.setItem('fitlog_saved', JSON.stringify(savedList));
  }, [savedList]);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  const addToPlan = (workout: Workout) => {
    if (planList.some(item => item.id === workout.id)) {
      showToast("Workout already in today's plan!");
      return;
    }
    if (planList.length >= 5) {
      showToast("Plan is full! Maximum 5 lifts allowed.");
      return;
    }
    setPlanList([...planList, { ...workout, done: false }]);
    showToast("Added to today's plan!");
  };

  const saveForLater = (workout: Workout) => {
    if (savedList.some(item => item.id === workout.id)) {
      showToast("Workout already saved!");
      return;
    }
    setSavedList([...savedList, workout]);
    showToast("Saved for later!");
  };

  const removeFromPlan = (id: string) => {
    setPlanList(planList.filter(item => item.id !== id));
    showToast("Removed from today's plan.");
  };

  const removeFromSaved = (id: string) => {
    setSavedList(savedList.filter(item => item.id !== id));
    showToast("Removed from saved items.");
  };

  const markAsDone = (id: string) => {
    setPlanList(planList.map(item => item.id === id ? { ...item, done: !item.done } : item));
    showToast("Workout status updated!");
  };

  return (
    <WorkoutContext.Provider value={{ planList, savedList, toastMessage, addToPlan, saveForLater, removeFromPlan, removeFromSaved, markAsDone }}>
      {children}
      {/* Global Toast Component */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 bg-[#ccff00] text-black font-bold px-4 py-3 rounded-xl shadow-2xl text-sm animate-bounce">
          {toastMessage}
        </div>
      )}
    </WorkoutContext.Provider>
  );
}

export const useWorkout = () => {
  const context = useContext(WorkoutContext);
  if (!context) throw new Error('useWorkout must be used within a WorkoutProvider');
  return context;
};