export async function loadTemplates() {
    console.log("Setting up templates container...");
    const templatesContainer = document.createElement("div");
    templatesContainer.id = "templates-container";
    templatesContainer.style.display = "none";

    document.body.appendChild(templatesContainer);

    console.log("Loading templates...");

    // List of template files
    const templateFiles = [
        { id: "note-template", path: "./templates/note-template.html" },
        { id: "color-change-template", path: "./templates/color-change-template.html" },
    ];

    for (const t of templateFiles) {
        try {
            const res = await fetch(t.path);
            if (!res.ok) throw new Error(`Failed to load ${t.path}`);
            const html = await res.text();
            
            const div = document.createElement("div");
            div.innerHTML = html;

            const templateEl = div.querySelector("template");
            if (templateEl) {
                templateEl.id = t.id; // ensure correct ID
                templatesContainer.appendChild(templateEl);
            }
        } catch (err) {
            console.error(err);
        }
    }

    return templatesContainer;
}
