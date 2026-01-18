Icons by Lucide (https://lucide.dev/) — ISC License

const noteEl = document.createElement("div");
    noteEl.className = "note";
    noteEl.style.setProperty("--note-color", note.color || "#fffb7d");

    noteEl.innerHTML = `
        <!-- Title -->
        <div class="note-title-container">
            <textarea
                class="note-title"
                placeholder="Task title..."
            >${note.title || ""}</textarea>
        </div>

        <!-- Content -->
        <div class="note-content-container">
            <textarea
                class="note-content"
                placeholder="New task..."
            >${note.content || ""}</textarea>
        </div>

        <!-- Bottom menu -->
        <div class="note-bottom-container">

            <button class="bold-letter-btn" aria-label="bold letter">
                <img src="assets/bold.svg" width="18" height="18" />
            </button>

            <button class="italic-letter-btn" aria-label="italic letter">
                <img src="assets/italic.svg" width="18" height="18" />
            </button>

            <button class="underline-letter-btn" aria-label="underline letter">
                <img src="assets/underline.svg" width="18" height="18" />
            </button>

            <button class="strikethrough-letter-btn" aria-label="strikethrough letter">
                <img src="assets/strikethrough.svg" width="18" height="18" />
            </button>

            <button class="note-menu-btn" aria-label="Note options">
                <img src="assets/ellipsis-vertical.svg" width="18" height="18" />
            </button>

            <div class="note-menu">
                <button class="color-change-btn">

                    <img src="assets/palette.svg" width="18" height="18" />
            
                    <input
                        type="color"
                        class="note-color-picker"
                        value="${note.color || "#fffb7d"}"
                    />
                </button>

                <button class="delete-task">
                    <img src="assets/delete.svg" width="18" height="18" />
                </button>
            </div>
        </div>
    `;