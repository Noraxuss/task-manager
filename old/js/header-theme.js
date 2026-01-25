// js/header-theme.js
import { applyTranslations } from "./header-i18n.js";

function initThemeToggle(root = document) {
    const themeToggle = root.querySelector("#theme-toggle");
    const themeIcon = root.querySelector("#theme-icon");

    if (!themeToggle || !themeIcon) return;

    function updateUI() {
        const theme = document.documentElement.dataset.theme;
        const isDark = theme === "dark";

        console.log("Theme updated to:", theme);

        // Icon represents CURRENT theme
        themeIcon.src = isDark
        ? "assets/moon.svg"   // dark mode active
        : "assets/sun.svg";   // light mode active

        // Text represents CURRENT theme
        const label = themeToggle.querySelector("[data-i18n]");
        if (label) {
            label.dataset.i18n = isDark
                ? "header.themeDark"
                : "header.themeLight";

            applyTranslations(themeToggle);
        }
    }

    themeToggle.addEventListener("click", () => {
        const current = document.documentElement.dataset.theme;
        document.documentElement.dataset.theme =
            current === "dark" ? "light" : "dark";
        localStorage.setItem("theme", document.documentElement.dataset.theme);
        updateUI();
    });

    updateUI();
}

function initTheme() {
    console.log("Initializing theme");
    const saved =
        localStorage.getItem("theme") ||
        (matchMedia("(prefers-color-scheme: dark)").matches
            ? "dark"
            : "light");

    console.log("Saved theme:", saved);
    document.documentElement.dataset.theme = saved;
}

export { initTheme, initThemeToggle };
