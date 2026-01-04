import { t, setLang } from './i18n.js';
import { renderTasksView } from './task-scene.js';

export function initHeader() {
    const headerTitle = document.getElementById("app-title");
    const tasksBtn = document.getElementById("tasks-btn");
    const langSelect = document.getElementById("language-select");
    const topBar = document.getElementById("top-bar");
    const handle = document.getElementById("top-bar-handle");

    if (!headerTitle || !tasksBtn || !langSelect) {
        console.warn("Header elements missing");
        return;
    }

    // Set initial text
    headerTitle.innerText = t("app-title");
    tasksBtn.innerText = t("tasks-btn");
    langSelect.value = document.documentElement.lang || "en";

    // Language switch
    langSelect.onchange = (e) => {
        setLang(e.target.value);
        headerTitle.innerText = t("app-title");
        tasksBtn.innerText = t("tasks-btn");
        renderTasksView(); // re-render tasks in new language
    };

    // Top bar toggle
    if (topBar && handle) {
        handle.addEventListener("click", () => {
            topBar.classList.toggle("collapsed");
        });
    }
}
