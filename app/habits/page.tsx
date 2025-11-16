"use client";
import { useState, useEffect } from "react";
import HabitForm from "@/components/HabitForm";
import HabitCard from "@/components/HabitCard";

export interface Habit {
  id: string;
  name: string;
  history: { [date: string]: boolean };
  streak: number;               // consecutive days completed
  lastCompletedDate: string | null; // YYYY-MM-DD
}

export default function HabitsPage() {
  const [habits, setHabits] = useState<Habit[]>([]);

  useEffect(() => {
    const saved = localStorage.getItem("habits");
    if (saved) setHabits(JSON.parse(saved));
  }, []);

  useEffect(() => {
    const today = new Date().toISOString().split("T")[0];

    const resetHabits = () => {
      const saved = localStorage.getItem("habits");
      if (!saved) return;

      const habitsData: Habit[] = JSON.parse(saved);
      const updated = habitsData.map(habit => {
        if (habit.lastCompletedDate !== today && habit.history[today] !== true) {
          return {
            ...habit,
            history: { ...habit.history, [today]: false },
          };
        }
        return habit;
      });

      localStorage.setItem("habits", JSON.stringify(updated));
    };

    resetHabits(); // run once when component mounts

    // schedule next reset at midnight
    const msUntilMidnight = new Date(new Date().setHours(24,0,0,0)) - new Date();
    const timer = setTimeout(() => {
      resetHabits();
      window.location.reload(); // refresh UI at midnight
    }, msUntilMidnight);

    return () => clearTimeout(timer);
  }, []); // empty dependency array




  const updateStorage = (data: Habit[]) => {
    setHabits(data);
    localStorage.setItem("habits", JSON.stringify(data));
  };

  const addHabit = (name: string) => {
    const newHabit: Habit = {
      id: crypto.randomUUID(),
      name,
      history: {},
      streak: 0,
      lastCompletedDate: null,
    };

    updateStorage([...habits, newHabit]);
  };

  const toggleHabitForToday = (id: string) => {
    const today = new Date().toISOString().split("T")[0];
    const yesterday = new Date(Date.now() - 86400000).toISOString().split("T")[0];

    const updated = habits.map((habit) => {
      if (habit.id === id) {
        const completedToday = habit.history[today] === true;
        const newHistory = { ...habit.history, [today]: !completedToday };
        let newStreak = habit.streak;
        let lastDate = habit.lastCompletedDate;

        if (!completedToday) { // marking done
          newStreak = habit.lastCompletedDate === yesterday ? habit.streak + 1 : 1;
          lastDate = today;
        } else { // unchecking
          newStreak = Math.max(habit.streak - 1, 0);
        }

        return { ...habit, history: newHistory, streak: newStreak, lastCompletedDate: lastDate };
      }
      return habit;
    });

    updateStorage(updated);
  };


  const deleteHabit = (id: string) => {
    const updated = habits.filter((habit) => habit.id !== id);
    updateStorage(updated);
  };

  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-bold">Habits</h1>

      <HabitForm onAdd={addHabit} />

      <div className="space-y-3">
        {habits.map((habit) => (
          <HabitCard
            key={habit.id}
            habit={habit}
            onToggle={() => toggleHabitForToday(habit.id)}
            onDelete={() => deleteHabit(habit.id)}
          />
        ))}
      </div>
    </div>
  );
}
