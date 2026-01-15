import { applyTranslations, setLang } from './header-i18n.js';

export function initHeader() {
    const langSelect = document.getElementById("language-select");
    const topBar = document.getElementById("top-bar");
    const handle = document.getElementById("top-bar-handle");
    const themeToggle = document.getElementById("theme-toggle");


    if (!langSelect) {
        console.warn("Header elements missing");
        return;
    }

    // Initial translation pass
    applyTranslations();

    // Language switch
    langSelect.value = document.documentElement.lang || "en";
    langSelect.onchange = (e) => {
        setLang(e.target.value);
        applyTranslations();
    };

    // Top bar toggle
    if (topBar && handle) {
        handle.addEventListener("click", () => {
            topBar.classList.toggle("collapsed");
        });
    }
}
