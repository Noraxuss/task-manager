let notes = JSON.parse(localStorage.getItem("notes")) || [];

export function initTaskScene() {
    const addBtn = document.getElementById("addTask");
    const scene = document.getElementById("task-scene");

    if (!addBtn || !scene) return;

    addBtn.addEventListener("click", () => {
        notes.push({ 
            content: "",
            color: "#fffb7d" // default yellow
            });
        saveAndRender();
    });

    renderTasksView(scene);
}

function saveAndRender() {
    localStorage.setItem("notes", JSON.stringify(notes));
    renderTasksView(document.getElementById("task-scene"));
}

function renderTasksView(scene) {
    // remove existing notes (not the button!)
    scene.querySelectorAll(".note").forEach(n => n.remove());

    notes.forEach((note, index) => {
        const el = document.createElement("div");
        el.className = "note";
        el.style.backgroundColor = note.color;

        const textarea = document.createElement("textarea");
        textarea.value = note.content;
        textarea.placeholder = "New task...";
        textarea.addEventListener("input", e => {
            notes[index].content = e.target.value;
            localStorage.setItem("notes", JSON.stringify(notes));
        });

        const colorInput = document.createElement("input");
        colorInput.type = "color";
        colorInput.value = note.color;

        colorInput.addEventListener("input", e => {
        notes[index].color = e.target.value;
            el.style.backgroundColor = e.target.value;
            localStorage.setItem("notes", JSON.stringify(notes));
        });

        const del = document.createElement("button");
        del.className = "delete-task";
        del.textContent = "×";
        del.addEventListener("click", () => {
            notes.splice(index, 1);
            saveAndRender();
        });

        el.append(textarea, colorInput, del);

        scene.appendChild(el);
    });
}
