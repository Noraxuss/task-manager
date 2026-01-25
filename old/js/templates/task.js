// task.js
export function addTaskDOM(note, { onUpdate, onDelete }) {
  const template = document.getElementById("note-template");
  const noteEl = template.content.cloneNode(true).querySelector(".note");

  // -----------------
  // Elements
  // -----------------
  const els = {
    title: noteEl.querySelector(".note-title"),
    content: noteEl.querySelector(".note-content"),
    menuBtn: noteEl.querySelector(".note-menu-btn"),
    menu: noteEl.querySelector(".note-menu"),
    color: noteEl.querySelector(".note-color-picker"),
    deleteBtn: noteEl.querySelector(".delete-task"),
    bottomBar: noteEl.querySelector(".note-bottom-container"),
    moveUpBtn: noteEl.querySelector(".note-move-up-btn"),
    moveDownBtn: noteEl.querySelector(".note-move-down-btn"),
  };

  // -----------------
  // Initial state
  // -----------------
  els.title.value = note.title || "";
  els.content.value = note.content || "";
  els.color.value = note.color || "#fffb7d";
  noteEl.style.setProperty("--note-color", els.color.value);

  // -----------------
  // Menu logic
  // -----------------
  els.menuBtn.addEventListener("click", (e) => {
    e.stopPropagation();
    noteEl.classList.toggle("show-menu");
  });

  document.addEventListener("click", (e) => {
    if (!noteEl.contains(e.target)) {
      noteEl.classList.remove("show-menu");
    }
  });

  // -----------------
  // Data updates
  // -----------------
  els.title.addEventListener("input", (e) => {
    note.title = e.target.value;
    onUpdate();
  });

  els.content.addEventListener("input", (e) => {
    note.content = e.target.value;
    onUpdate();
  });

  els.color.addEventListener("input", (e) => {
    note.color = e.target.value;
    noteEl.style.setProperty("--note-color", note.color);
    onUpdate();
  });

  // Delete button
    els.deleteBtn.addEventListener("click", (e) => {
    e.stopPropagation(); // prevent triggering note enlargement
    onDelete(); // Just trigger callback
});



  // -----------------
  // Text formatting buttons
  // -----------------
  els.bottomBar.addEventListener("click", (e) => {
    const btn = e.target.closest(
      ".bold-letter-btn, .italic-letter-btn, .underline-letter-btn, .strikethrough-letter-btn, .move-up-btn, .move-down-btn",
    );

    if (!btn) return;
    btn.classList.toggle("active");
  });

  // Add overlay div to body once
  let overlay = document.querySelector(".note-overlay");
  if (!overlay) {
    overlay = document.createElement("div");
    overlay.className = "note-overlay";
    document.body.appendChild(overlay);
  }

  // Overlay click: collapse enlarged note
  noteEl.addEventListener("click", (e) => {
    if (e.target.closest(".note-bottom-container, .note-menu")) return;
    if (noteEl.classList.contains("enlarged")) return;

    // 1️⃣ Measure original layout position
    const rect = noteEl.getBoundingClientRect();

    // Save origin for reverse animation
    noteEl.dataset.originTop = rect.top;
    noteEl.dataset.originLeft = rect.left;
    noteEl.dataset.originWidth = rect.width;
    noteEl.dataset.originHeight = rect.height;

    // 2️⃣ Create placeholder to lock layout
    const placeholder = document.createElement("div");
    placeholder.className = "note-placeholder";
    placeholder.style.width = rect.width + "px";
    placeholder.style.height = rect.height + "px";
    noteEl.parentNode.insertBefore(placeholder, noteEl);

    // 3️⃣ Switch to fixed *at same screen position*
    noteEl.style.position = "fixed";
    noteEl.style.top = rect.top + "px";
    noteEl.style.left = rect.left + "px";
    noteEl.style.width = rect.width + "px";
    noteEl.style.height = rect.height + "px";
    noteEl.style.margin = "0";
    noteEl.style.transform = "none";
    noteEl.style.zIndex = "100";

    // Force reflow so transitions work
    noteEl.getBoundingClientRect();

    // 4️⃣ Animate to center
    noteEl.classList.add("enlarged");
    noteEl.style.top = "50%";
    noteEl.style.left = "50%";
    noteEl.style.transform = "translate(-50%, -50%)";
    noteEl.style.width = "60vw";
    noteEl.style.height = "auto";

    // 5️⃣ Make editable
    els.title.readOnly = false;
    els.content.readOnly = false;
    els.content.focus();

    // 6️⃣ Show overlay + fade others
    overlay.style.display = "block";
    document.querySelectorAll(".note").forEach((n) => {
      if (n !== noteEl) n.style.opacity = 0.4;
    });
  });

  // Note click: enlarge and animate to center
  overlay.addEventListener("click", () => {
    const note = document.querySelector(".note.enlarged");
    if (!note) return;

    // 1️⃣ Animate back to original position
    note.style.transform = "none";
    note.style.top = note.dataset.originTop + "px";
    note.style.left = note.dataset.originLeft + "px";
    note.style.width = note.dataset.originWidth + "px";
    note.style.height = note.dataset.originHeight + "px";

    // Make readonly immediately
    note.querySelector(".note-title").readOnly = true;
    note.querySelector(".note-content").readOnly = true;

    note.addEventListener(
      "transitionend",
      () => {
        // 2️⃣ Cleanup AFTER animation
        const placeholder = document.querySelector(".note-placeholder");
        if (placeholder) placeholder.remove();

        note.classList.remove("enlarged");

        note.style.position = "";
        note.style.top = "";
        note.style.left = "";
        note.style.width = "";
        note.style.height = "";
        note.style.transform = "";
        note.style.zIndex = "";
        note.style.margin = "";

        overlay.style.display = "none";

        document.querySelectorAll(".note").forEach((n) => {
          n.style.opacity = 1;
        });
      },
      { once: true },
    );
  });

  return noteEl;
}
