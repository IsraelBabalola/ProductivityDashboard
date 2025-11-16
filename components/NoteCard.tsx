"use client";
import { Note } from "@/app/notes/page";

interface NoteCardProps {
  note: Note;
  onDelete: () => void;
}

export default function NoteCard({ note, onDelete }: NoteCardProps) {
  return (
    <div className="bg-gray-900 p-4 rounded-xl border border-gray-700 space-y-2">
      <div className="flex justify-between items-start">
        <h3 className="font-semibold text-lg">{note.title}</h3>
        <button
          onClick={onDelete}
          className="text-red-500 hover:text-red-400 font-bold"
        >
          🗑
        </button>
      </div>

      <p className="text-gray-300 whitespace-pre-wrap">{note.content}</p>

      <span className="inline-block px-2 py-1 bg-blue-600 text-black rounded-lg text-sm">
        {note.category || "General"}
      </span>
    </div>
  );
}
