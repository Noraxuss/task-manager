import React, { useState, useEffect } from "react";

export default function StickyNote({
    note,
    isEnlarged,
    onOpen,
    onClose,
    onUpdate,
    onDelete,
}) {
  const [showMenu, setShowMenu] = useState(false);

  useEffect(() => {
  if (!isEnlarged) setShowMenu(false);
}, [isEnlarged]);


  return (
    <>
      {isEnlarged && (
        <div className="note-overlay" onClick={onClose} />
      )}

      <div
        className={`note ${isEnlarged ? "enlarged" : ""} ${
          showMenu ? "show-menu" : ""
        }`}
        style={{ backgroundColor: note.color }}
        onClick={(e) => {
          e.stopPropagation();
          if (!isEnlarged) onOpen();
        }}

      >
        {/* Title */}
        <div className="note-title-container">
          <textarea
            className="note-title"
            placeholder="Task title..."
            value={note.title}
            readOnly={!isEnlarged}
            onChange={(e) =>
              onUpdate({ ...note, title: e.target.value })
            }
          />
        </div>

        {/* Content */}
        <div className="note-content-container">
          <textarea
            className="note-content"
            placeholder="New task..."
            value={note.content}
            readOnly={!isEnlarged}
            onChange={(e) =>
              onUpdate({ ...note, content: e.target.value })
            }
          />
        </div>

        {/* Bottom menu */}
        <div className="note-bottom-container">
          <button className="note-function-btn">
            <img src="/assets/bold.svg" width="18" height="18" />
          </button>

          <button className="note-function-btn">
            <img src="/assets/italic.svg" width="18" height="18" />
          </button>

          <button className="note-function-btn">
            <img src="/assets/underline.svg" width="18" height="18" />
          </button>

          <button className="note-function-btn">
            <img src="/assets/strikethrough.svg" width="18" height="18" />
          </button>

          <button className="note-function-btn">
            <img src="/assets/move-up.svg" width="18" height="18" />
          </button>

          <input type="number" class="font-size-input" aria-label="Font size" min="4" max="72" value="12" />

          <button className="note-function-btn">
            <img src="/assets/move-down.svg" width="18" height="18" />
          </button>

          <button
            className="note-menu-btn"
            onClick={(e) => {
              e.stopPropagation();
              setShowMenu((v) => !v);
            }}
          >
            <img src="/assets/ellipsis-vertical.svg" width="18" height="18" />
          </button>

          {/* Dropdown menu */}
          <div className="note-menu">
            <label className="color-change-btn">
              <img src="/assets/palette.svg" width="18" height="18" />
              <input
                type="color"
                className="note-color-picker"
                value={note.color}
                onChange={(e) =>
                  onUpdate({ ...note, color: e.target.value })
                }
              />
            </label>

            <button
              className="delete-task"
              onClick={() => onDelete(note)}
            >
              <img src="/assets/delete.svg" width="18" height="18" />
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
