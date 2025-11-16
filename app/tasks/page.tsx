"use client";

import { useState, useEffect } from "react";
import TaskCard from "@/components/TaskCard";
import TaskForm from "@/components/TaskForm";

type Task = {
  id: string;
  title: string;
  due: string;
  completed: boolean;
};

export default function TasksPage() {
  const [tasks, setTasks] = useState<Task[]>([]);

  // Load once on mount
  useEffect(() => {
    try {
      const saved = localStorage.getItem("tasks");
      if (saved) setTasks(JSON.parse(saved));
    } catch (err) {
      console.error("Failed to parse tasks from localStorage", err);
    }
  }, []);

  // Save whenever tasks change — central single source of persistence
  useEffect(() => {
    try {
      localStorage.setItem("tasks", JSON.stringify(tasks));
    } catch (err) {
      console.error("Failed to save tasks to localStorage", err);
    }
  }, [tasks]);

  // Add a task (TaskForm provides title + due)
  const addTask = (taskData: { title: string; due: string }) => {
    const newTask: Task = {
      id: String(Date.now()) + Math.random().toString(36).slice(2),
      title: taskData.title,
      due: taskData.due,
      completed: false,
    };
    setTasks((prev) => [...prev, newTask]);
  };

  // Delete by id (safer than index)
  const deleteTask = (id: string) => {
    setTasks((prev) => prev.filter((t) => t.id !== id));
  };

  // Toggle completed by id
  const toggleComplete = (id: string) => {
    setTasks((prev) =>
      prev.map((t) => (t.id === id ? { ...t, completed: !t.completed } : t))
    );
  };

  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-bold">Tasks</h1>

      <TaskForm onAddTask={addTask} />

      <div className="bg-gray-900 p-4 rounded-xl border border-gray-700">
        <h2 className="text-lg font-semibold mb-2">Task List</h2>

        <div className="space-y-3">
          {tasks.map((task) => (
            <TaskCard
              key={task.id}
              title={task.title}
              due={task.due}
              completed={task.completed}
              onDelete={() => deleteTask(task.id)}
              onToggle={() => toggleComplete(task.id)}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

/*
"use client";
import { useState, useEffect } from "react";
import TaskCard from "@/components/TaskCard";
import TaskForm from "@/components/TaskForm";

export default function TasksPage() {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
      const savedTasks = localStorage.getItem("tasks");
      if (savedTasks) {
        setTasks(JSON.parse(savedTasks));
      }
  }, []);

  const deleteTask = (index: number) => {
    const updated = tasks.filter((_, i) => i !== index);
    setTasks(updated);
    localStorage.setItem("tasks", JSON.stringify(updated));
  };

  const addTask = (task: string) => {
    const updated = [...tasks, task];
    setTasks(updated);
    localStorage.setItem("tasks", JSON.stringify(updated));
  };

  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-bold">Tasks</h1>

      <TaskForm onAddTask={addTask}/>

      <div className="bg-gray-900 p-4 rounded-xl border border-gray-700">
        <h2 className="text-lg font-semibold mb-2">Task List</h2>

        <div className="space-y-3">
          {tasks.map((task, index) => (
            <TaskCard key={index} title={task.title} due={task.due} />
          ))}
        </div>
      </div>
    </div>
  );
}
*/
/*
"use client";
import { useState, useEffect } from "react";
import TaskCard from "@/components/TaskCard";
import TaskForm from "@/components/TaskForm";



    { title: "Finish Next.js project setup", due: "2025-02-14" },
    { title: "Read 10 pages of a book", due: "2025-02-14" },
    { title: "Workout session", due: "2025-02-14" }


export default function TasksPage() {

  // React state storing the list of tasks
  const [tasks, setTasks] = useState<
    { title: string; due: string }[]
  >([]);

  // Load saved tasks from localStorage once when page loads
  useEffect(() => {
    const savedTasks = localStorage.getItem("tasks");
    if (savedTasks) {
      setTasks(JSON.parse(savedTasks));
    }
  }, []);

  // Save tasks to localStorage every time tasks change
  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  // Function passed to TaskForm to add new task
  function addTask(newTask: { title: string; due: string }) {
    setTasks((prev) => [...prev, newTask]);
  }

  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-bold">Tasks</h1>

      <TaskForm onAddTask={addTask} />

      <div className="bg-gray-900 p-4 rounded-xl border border-gray-700">
        <h2 className="text-lg font-semibold mb-2">Task List</h2>

        <div className="space-y-3">
          {tasks.map((task, index) => (
            <TaskCard key={index} title={task.title} due={task.due} />
          ))}
        </div>
      </div>
    </div>
  );
}
*/