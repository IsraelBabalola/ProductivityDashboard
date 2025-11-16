"use client";
import { useState } from "react";

interface HabitFormProps {
  onAdd: (name: string) => void;
}

export default function HabitForm({ onAdd }: HabitFormProps) {
  const [name, setName] = useState("");

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!name.trim()) return;

    onAdd(name.trim());
    setName("");
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-gray-900 p-4 rounded-xl border border-gray-700 space-y-4"
    >
      <h2 className="text-lg font-semibold">Add Habit</h2>

      <input
        type="text"
        placeholder="Habit name (e.g., Read 20 mins)"
        value={name}
        onChange={(e) => setName(e.target.value)}
        className="w-full p-2 bg-gray-800 border border-gray-700 rounded-lg"
      />

      <button
        type="submit"
        className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-lg"
      >
        Add
      </button>
    </form>
  );
}
