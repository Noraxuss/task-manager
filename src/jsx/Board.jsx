import React, { useState, useEffect } from "react";
import StickyNote from "./StickyNote";

export default function Board() {
  const [notes, setNotes] = useState(
    JSON.parse(localStorage.getItem("notes")) || []
  );
  const [activeNoteIndex, setActiveNoteIndex] = useState(null);

  // ✅ functions FIRST
  const updateNote = (updatedNote) => {
    setNotes((prev) =>
      prev.map((n) => (n === updatedNote ? updatedNote : n))
    );
  };

  const deleteNote = (note) => {
    setNotes((prev) => prev.filter((n) => n !== note));
    setActiveNoteIndex(null);
  };

  const addNote = () => {
    setNotes((prev) => [
      ...prev,
      { title: "", content: "", color: "#fffb7d" },
    ]);
  };

  useEffect(() => {
    localStorage.setItem("notes", JSON.stringify(notes));
  }, [notes]);

  // ✅ JSX ONLY here
  return (
    <div className="board">
      {/* Overlay – only one, blocks interaction */}
      {activeNoteIndex !== null && (
        <div
          className="note-overlay"
          onClick={() => setActiveNoteIndex(null)}
        />
      )}

      {/* Add note button */}
      <button
        className="addTask"
        onClick={addNote}
        aria-label="Add note"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="40"
          height="40"
          viewBox="0 0 24 24"
          className="sticky-note-icon"
        >
          <path
            fill="var(--sticky-note-yellow)"
            stroke="var(--text-main)"
            strokeWidth="1"
            d="M21 9a2.4 2.4 0 0 0-.706-1.706l-3.588-3.588A2.4 2.4 0 0 0 15 3H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2z"
          />
          <path
            fill="none"
            stroke="var(--text-main)"
            strokeWidth="1"
            d="M15 3v5a1 1 0 0 0 1 1h5"
          />
        </svg>
      </button>

      {/* Notes */}
      {notes.map((note, idx) => (
        <StickyNote
          key={idx}
          note={note}
          isEnlarged={activeNoteIndex === idx}
          onOpen={() => setActiveNoteIndex(idx)}
          onClose={() => setActiveNoteIndex(null)}
          onUpdate={updateNote}
          onDelete={deleteNote}
        />
      ))}
    </div>
  );
}
