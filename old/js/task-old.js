import { renderTask } from "./task-renderer.js";

// task.js
export function addTaskDOM(note, { onUpdate, onDelete }) {
    const template = document.getElementById("note-template");
    const noteEl = template.content.cloneNode(true).querySelector(".note");
    titleEl.value = note.title || "";
    contentEl.value = note.content || "";
    colorInput.value = note.color || "#fffb7d";



    //const noteEl = renderTask(note, { onUpdate, onDelete });

    // Elements
    const titleEl = noteEl.querySelector(".note-title");
    const contentEl = noteEl.querySelector(".note-content");
    const menuBtn = noteEl.querySelector(".note-menu-btn");
    const menu = noteEl.querySelector(".note-menu");
    const colorInput = noteEl.querySelector(".note-color-picker");
    const deleteBtn = noteEl.querySelector(".delete-task");
    const moveUpBtn = noteEl.querySelector(".note-move-up-btn");
    const moveDownBtn = noteEl.querySelector(".note-move-down-btn");


    // Menu toggle
    menuBtn.addEventListener("click", e => {
        e.stopPropagation();
        noteEl.classList.toggle("show-menu");
    });

    // Updates
    titleEl.addEventListener("input", e => {
        note.title = e.target.value;
        onUpdate();
    });

    contentEl.addEventListener("input", e => {
        note.content = e.target.value;
        onUpdate();
    });

    colorInput.addEventListener("input", e => {
        note.color = e.target.value;
        noteEl.style.setProperty("--note-color", note.color);
        onUpdate();
    });

    deleteBtn.addEventListener("click", () => {
        onDelete();
    });

    function toggleButton(btn) {
    btn.classList.toggle("active");
    }

    noteEl.querySelector(".bold-letter-btn")
        .addEventListener("click", e => {
            e.preventDefault();
            toggleButton(e.currentTarget);
            // later: apply bold logic
    });

    noteEl.querySelector(".italic-letter-btn")
        .addEventListener("click", e => {
            e.preventDefault();
            toggleButton(e.currentTarget);
            // later: apply italic logic
    });

    noteEl.querySelector(".strikethrough-letter-btn")
        .addEventListener("click", e => {
            e.preventDefault();
            toggleButton(e.currentTarget);
            // later: apply strikethrough logic
    });

    noteEl.querySelector(".underline-letter-btn")
        .addEventListener("click", e => {
            e.preventDefault();
            toggleButton(e.currentTarget);
            // later: apply underline logic
    });

    noteEl.querySelector(".note-move-up-btn")
        .addEventListener("click", e => {
            e.preventDefault();
            onUpdate('moveUp');
            // later: implement move up logic
    });

    noteEl.querySelector(".note-move-down-btn")
        .addEventListener("click", e => {
            e.preventDefault();
            onUpdate('moveDown');
            // later: implement move down logic
    });

    menuBtn.addEventListener("click", e => {
        e.stopPropagation();
        noteEl.classList.toggle("show-menu");
    });

    document.addEventListener("click", e => {
        if (!noteEl.contains(e.target)) {
            noteEl.classList.remove("show-menu");
        }
    });

    function positionMenu(menu, button) {
    const rect = menu.getBoundingClientRect();
    const btnRect = button.getBoundingClientRect();

    if (rect.right > window.innerWidth) {
        menu.style.right = "auto";
        menu.style.left = "0";
    }
    }

    menuBtn.addEventListener("click", e => {
        e.stopPropagation();
        noteEl.classList.toggle("show-menu");
        positionMenu(menu, menuBtn);
    });


    return noteEl;
}
