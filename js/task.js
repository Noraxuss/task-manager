// =========================
// Sticky Note Creation
// =========================
export function addTaskDOM(note) {
    // Create the note container
    const noteEl = document.createElement("div");
    noteEl.className = "note";
    noteEl.style.setProperty("--note-color", note.color || "#fffb7d");

    // Set up the inner HTML: top bar + menu + content
    noteEl.innerHTML = `
        <!-- Top bar with title + menu -->
        <div class="note-top-bar">
            <!-- Title textarea -->
            <textarea class="note-title" placeholder="Task title...">${note.title || ""}</textarea>

            <!-- Menu button container -->
            <div class="note-menu-button-container">
                <button class="note-menu-btn" aria-label="Note options">
                    <img src="assets/ellipsis-vertical.svg" width="18" height="18" />
                </button>

                <!-- Dropdown menu -->
                <div class="note-menu" role="menu">
                    <input type="color" class="note-color-picker" value="${note.color || "#fffb7d"}" />
                    <button class="delete-task">
                        Delete
                        <img id="delete-icon" src="assets/delete.svg" width="18" height="18" />
                    </button>
                </div>
            </div>
        </div>

        <!-- Task content / description -->
        <textarea class="note-content" placeholder="New task...">${note.content || ""}</textarea>
    `;

    // -------------------------
    // Get references to elements
    // -------------------------
    const menuBtn = noteEl.querySelector(".note-menu-btn");
    const menu = noteEl.querySelector(".note-menu");
    const colorInput = noteEl.querySelector(".note-color-picker");
    const deleteBtn = noteEl.querySelector(".delete-task");
    const titleTextarea = noteEl.querySelector(".note-title");
    const contentTextarea = noteEl.querySelector(".note-content");

    // -------------------------
    // Menu toggle
    // -------------------------
    menuBtn.addEventListener("click", (e) => {
        e.stopPropagation();               
        noteEl.classList.toggle("show-menu");
    });

    document.addEventListener("click", (e) => {
        if (!noteEl.contains(e.target)) {
            noteEl.classList.remove("show-menu");
        }
    });

    // -------------------------
    // Color picker
    // -------------------------
    colorInput.addEventListener("input", (e) => {
        note.color = e.target.value;
        noteEl.style.setProperty("--note-color", note.color);
        saveNotes();  // Save all notes
    });

    // -------------------------
    // Title textarea input
    // -------------------------
    titleTextarea.addEventListener("input", (e) => {
        note.title = e.target.value;
        saveNotes();
    });

    // -------------------------
    // Content textarea input
    // -------------------------
    contentTextarea.addEventListener("input", (e) => {
        note.content = e.target.value;
        saveNotes();
    });

    // -------------------------
    // Delete note
    // -------------------------
    deleteBtn.addEventListener("click", () => {
        noteEl.remove();
        removeNote(note);  // Remove from notes array
        saveNotes();
    });

    return noteEl;
}
