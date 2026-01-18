// js/task-scene.js
import { addTaskDOM } from "./templates/task.js";

let notes = JSON.parse(localStorage.getItem("notes")) || [];

/**
 * Entry point called from app.js
 */
export function initTaskScene() {
  const scene = document.getElementById("task-scene");
  const addBtn = document.getElementById("addTask");
  const template = document.getElementById("note-template");

  if (!template) {
    console.error("Note template not found");
    return;
  }

  if (!scene || !addBtn) {
    console.warn("Task scene elements not found");
    return;
  }

  addBtn.addEventListener("click", () => {
    const note = {
      title: "",
      content: "",
      color: "#fffb7d",
    };

    notes.push(note);
    saveNotes();

    const el = createNote(note, scene, template);
    scene.appendChild(el);
  });

  renderTasks(scene, template);
}

/**
 * Render all notes
 */
function renderTasks(scene, template) {
  // clear existing notes
  scene.querySelectorAll(".note").forEach(n => n.remove());
    // render each note
  notes.forEach(note => {
    const el = createNote(note, scene, template);
    scene.appendChild(el);
  });
}

/** 
 * Create a single note element
 */
function createNote(note, scene, template) {
  const el = addTaskDOM(note, {
  onUpdate: saveNotes,
  onDelete: () => {
    const index = notes.indexOf(note);
    if (index !== -1) notes.splice(index, 1);
    el.remove();
    saveNotes();
  },
});


  return el;
}


/**
 * Persist notes
 */
function saveNotes() {
  localStorage.setItem("notes", JSON.stringify(notes));
}
