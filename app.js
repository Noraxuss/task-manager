// app.js

import { loadTranslations } from './js/header-i18n.js';
import { initHeader } from './js/header.js';
import { initTaskScene } from './js/task-scene.js';
import { initTheme, initThemeToggle } from './js/header-theme.js';

// Helper to load HTML into a container
async function loadHTML(containerId, path) {
    const container = document.getElementById(containerId);
    if (!container) {
        console.error(`Container ${containerId} not found`);
        return null;
    }
    const response = await fetch(path);
    if (!response.ok) {
        console.error(`Failed to load ${path}: ${response.status}`);
        return null;
    }
    const html = await response.text();
    container.innerHTML = html;
    return container;
}


async function init() {
    initTheme();

    await loadTranslations();

    

    // 1️⃣ Load header HTML first, then initialize it
    await loadHTML('header-container', './components/header.html');
    initHeader(); // now header elements exist
    initThemeToggle(); // now theme toggle exists

    // 2️⃣ Load task scene HTML, then initialize it
    await loadHTML('task-scene-container', './components/task-scene.html');
    initTaskScene(); // now task-scene elements exist

    document.body.style.visibility = "visible";
    document.body.classList.remove("app");

}

window.addEventListener('DOMContentLoaded', init);
