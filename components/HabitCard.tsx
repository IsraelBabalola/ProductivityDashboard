"use client";
import { Habit } from "@/app/habits/page";

interface HabitCardProps {
  habit: Habit;
  onToggle: () => void;
  onDelete: () => void;
}

export default function HabitCard({ habit, onToggle, onDelete }: HabitCardProps) {
  const today = new Date().toISOString().split("T")[0];
  const completedToday = habit.history[today] === true;

  function calculateStreak() {
    let streak = 0;
    const dates = Object.keys(habit.history).sort().reverse();

    for (const date of dates) {
      if (habit.history[date]) streak++;
      else break;
    }
    return streak;
  }

  const streak = calculateStreak();

  return (
    <div className="flex items-center justify-between bg-gray-900 p-4 rounded-xl border border-gray-700">
      <div>
        <h3 className="font-semibold">{habit.name}</h3>
        <span className="inline-block px-2 py-1 bg-yellow-500 text-black rounded-lg text-sm">
          🔥 Streak: {habit.streak} days
        </span>
      </div>

      <div className="flex gap-2">
        <button
          onClick={onToggle}
          className={`px-3 py-2 rounded-lg font-semibold ${
            completedToday ? "bg-green-600 hover:bg-green-700" : "bg-red-600 hover:bg-red-700"
          }`}
        >
          {completedToday ? "Done" : "Mark"}
        </button>

        <button
          onClick={onDelete}
          className="px-3 py-2 rounded-lg bg-gray-700 hover:bg-gray-600"
        >
          🗑
        </button>
      </div>
    </div>
  );
}
