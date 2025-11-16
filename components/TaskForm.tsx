"use client";
import { useState } from "react";

interface TaskFormProps {
  onAddTask: (task: { title: string; due: string }) => void;
}

export default function TaskForm({ onAddTask }: TaskFormProps) {
  const [title, setTitle] = useState("");
  const [due, setDue] = useState("");

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    if (!title || !due) return;

    onAddTask({ title, due });

    setTitle("");
    setDue("");
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-gray-900 p-4 rounded-xl border border-gray-700 space-y-4"
    >
      <h2 className="text-lg font-semibold">Add a Task</h2>

      <input
        type="text"
        placeholder="Task name"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className="w-full p-2 bg-gray-800 border border-gray-700 rounded-lg"
      />

      <input
        type="date"
        value={due}
        onChange={(e) => setDue(e.target.value)}
        className="w-full p-2 bg-gray-800 border border-gray-700 rounded-lg"
      />

      <button
        type="submit"
        className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-lg"
      >
        Add Task
      </button>
    </form>
  );
}