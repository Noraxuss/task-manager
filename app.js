// app.js

import { loadTranslations } from './js/i18n.js';
import { initHeader } from './js/header.js';
import { initTaskScene } from './js/task-scene.js';

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
    await loadTranslations();

    // 1️⃣ Load header HTML first, then initialize it
    await loadHTML('header-container', './components/header.html');
    initHeader(); // now the elements exist

    // 2️⃣ Load task scene HTML, then initialize it
    await loadHTML('task-scene-container', './components/task-scene.html');
    initTaskScene(); // now task-scene elements exist
}

window.addEventListener('DOMContentLoaded', init);
