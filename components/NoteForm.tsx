"use client";
import { useState } from "react";

interface NoteFormProps {
  onAdd: (note: { title: string; content: string; category: string }) => void;
  categories: string[];
}

export default function NoteForm({ onAdd, categories }: NoteFormProps) {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [category, setCategory] = useState("");

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!title.trim() || !content.trim()) return;

    onAdd({
      title: title.trim(),
      content: content.trim(),
      category: category.trim() || "General",
    });

    setTitle("");
    setContent("");
    setCategory("");
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-gray-900 p-4 rounded-xl border border-gray-700 space-y-4"
    >
      <h2 className="text-lg font-semibold">Add Note</h2>

      <input
        type="text"
        placeholder="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className="w-full p-2 bg-gray-800 border border-gray-700 rounded-lg"
      />

      <textarea
        placeholder="Content"
        value={content}
        onChange={(e) => setContent(e.target.value)}
        className="w-full p-2 bg-gray-800 border border-gray-700 rounded-lg"
        rows={4}
      />

      <input
        type="text"
        placeholder="Category"
        value={category}
        onChange={(e) => setCategory(e.target.value)}
        className="w-full p-2 bg-gray-800 border border-gray-700 rounded-lg"
        list="category-list"
      />

      <datalist id="category-list">
        {categories.map((cat) => (
          <option key={cat} value={cat} />
        ))}
      </datalist>

      <button
        type="submit"
        className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-lg"
      >
        Add Note
      </button>
    </form>
  );
}
