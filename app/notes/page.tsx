"use client";
import { useState, useEffect } from "react";
import NoteForm from "@/components/NoteForm";
import NoteCard from "@/components/NoteCard";

export interface Note {
  id: string;
  title: string;
  content: string;
  category: string;
  createdAt: string;
}

export default function NotesPage() {
  const [notes, setNotes] = useState<Note[]>([]);
  const [search, setSearch] = useState("");
  const [filterCategory, setFilterCategory] = useState("");

  useEffect(() => {
    const saved = localStorage.getItem("notes");
    if (saved) setNotes(JSON.parse(saved));
  }, []);

  const updateStorage = (data: Note[]) => {
    setNotes(data);
    localStorage.setItem("notes", JSON.stringify(data));
  };

  const addNote = (note: Omit<Note, "id" | "createdAt">) => {
    const newNote: Note = {
      ...note,
      id: crypto.randomUUID(),
      createdAt: new Date().toISOString(),
    };
    updateStorage([...notes, newNote]);
  };

  const deleteNote = (id: string) => {
    const updated = notes.filter((note) => note.id !== id);
    updateStorage(updated);
  };

  const filteredNotes = notes.filter(
    (note) =>
      note.title.toLowerCase().includes(search.toLowerCase()) &&
      (filterCategory ? note.category === filterCategory : true)
  );

  const categories = Array.from(new Set(notes.map(n => n.category)));

  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-bold">Notes</h1>

      <NoteForm onAdd={addNote} categories={categories} />

      <div className="flex gap-2 items-center">
        <input
          type="text"
          placeholder="Search notes..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="p-2 rounded-lg border border-gray-700 bg-gray-800"
        />

        <select
          value={filterCategory}
          onChange={(e) => setFilterCategory(e.target.value)}
          className="p-2 rounded-lg border border-gray-700 bg-gray-800"
        >
          <option value="">All Categories</option>
          {categories.map((cat) => (
            <option key={cat} value={cat}>
              {cat}
            </option>
          ))}
        </select>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredNotes.map((note) => (
          <NoteCard key={note.id} note={note} onDelete={() => deleteNote(note.id)} />
        ))}
      </div>
    </div>
  );
}
