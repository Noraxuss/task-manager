import { t } from './i18n.js';

export function addTaskDOM(note) {
    const el = document.createElement("div");
    el.className = "note";

    el.innerHTML = `
        <input placeholder="${t("note-title-placeholder")}" value="${note.title}">
        <textarea placeholder="${t("note-content-placeholder")}">${note.content}</textarea>
        <button class="delete-task">×</button>
    `;

    // Delete button
    el.querySelector(".delete-task").addEventListener("click", () => {
        el.remove();
    });

    return el;
}
