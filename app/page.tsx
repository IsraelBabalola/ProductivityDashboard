"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import DashboardCard from "@/components/DashboardCard";

interface Task {
  title: string;
  due: string;
  completed?: boolean;
}

interface Habit {
  id: string;
  name: string;
  history: { [date: string]: boolean };
  streak: number;
  lastCompletedDate: string | null;
}

interface Note {
  id: string;
  title: string;
  content: string;
  category: string;
  createdAt: string;
}

export default function HomePage() {
  const router = useRouter();

  const [tasks, setTasks] = useState<Task[]>([]);
  const [habits, setHabits] = useState<Habit[]>([]);
  const [notes, setNotes] = useState<Note[]>([]);

  useEffect(() => {
    const savedTasks = localStorage.getItem("tasks");
    if (savedTasks) setTasks(JSON.parse(savedTasks));

    const savedHabits = localStorage.getItem("habits");
    if (savedHabits) setHabits(JSON.parse(savedHabits));

    const savedNotes = localStorage.getItem("notes");
    if (savedNotes) setNotes(JSON.parse(savedNotes));
  }, []);

  // Count completed tasks
  const tasksCompleted = tasks.filter((t) => t.completed).length;

  // Count habits completed today
  const today = new Date().toISOString().split("T")[0];
  const habitsCompletedToday = habits.filter((h) => h.history[today]).length;

  // Sum of all streaks (optional metric)
  const totalStreaks = habits.reduce((sum, h) => sum + h.streak, 0);

  return (
    <div className="p-4 space-y-6">
      <h1 className="text-3xl font-bold">Welcome!</h1>
      <p className="text-gray-400">Stay productive today</p>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <DashboardCard
          title="Tasks"
          count={`${tasksCompleted} / ${tasks.length}`}
          onClick={() => router.push("/tasks")}
        />
        <DashboardCard
          title="Habits"
          count={`${habitsCompletedToday} / ${habits.length}`}
          subtitle={`🔥 Total streaks: ${totalStreaks}`}
          onClick={() => router.push("/habits")}
        />
        <DashboardCard
          title="Notes"
          count={notes.length}
          onClick={() => router.push("/notes")}
        />
      </div>
    </div>
  );
}
