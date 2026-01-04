import { t } from './i18n.js';
import { addTaskDOM } from './task.js';

let notes = [];

export function initTaskScene() {
    const main = document.getElementById("main-content");
    if (!main) return;

    main.innerHTML = `
        <button id="add-task-btn">${t("add-note")}</button>
        <div id="tasks-container"></div>
    `;

    document.getElementById("add-task-btn").onclick = () => {
        addTask();
    };

    renderTasks();
}

function addTask() {
    notes.unshift({
        id: Date.now().toString(),
        title: "",
        content: ""
    });
    renderTasks();
}

export function renderTasksView() {
    renderTasks();
}

function renderTasks() {
    const container = document.getElementById("tasks-container");
    container.innerHTML = "";

    for (const note of notes) {
        const taskEl = addTaskDOM(note);
        container.appendChild(taskEl);
    }
}
