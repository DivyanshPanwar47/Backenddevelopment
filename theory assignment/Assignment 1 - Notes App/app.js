const STORAGE_KEY = "divyansh-notes-assignment-1";
const THEME_KEY = "divyansh-notes-theme";

const elements = {
  form: document.querySelector("#note-form"),
  composerTitle: document.querySelector("#composer-title"),
  noteInput: document.querySelector("#note-input"),
  tagInput: document.querySelector("#tag-input"),
  submitButton: document.querySelector("#submit-button"),
  cancelEdit: document.querySelector("#cancel-edit"),
  notesList: document.querySelector("#notes-list"),
  searchInput: document.querySelector("#search-input"),
  filterSelect: document.querySelector("#filter-select"),
  sortSelect: document.querySelector("#sort-select"),
  totalCount: document.querySelector("#total-count"),
  activeCount: document.querySelector("#active-count"),
  completedCount: document.querySelector("#completed-count"),
  statusMessage: document.querySelector("#status-message"),
  themeToggle: document.querySelector("#theme-toggle"),
  exportButton: document.querySelector("#export-button"),
  importInput: document.querySelector("#import-input")
};

let notes = readNotes();
let editingId = null;

function readNotes() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    const parsed = raw ? JSON.parse(raw) : [];
    return Array.isArray(parsed) ? parsed.map(normalizeNote).filter(Boolean) : [];
  } catch (error) {
    console.warn("Could not read saved notes.", error);
    return [];
  }
}

function normalizeNote(note) {
  if (!note || typeof note !== "object" || !String(note.text || "").trim()) {
    return null;
  }

  const now = new Date().toISOString();
  return {
    id: String(note.id || createId()),
    text: String(note.text).trim(),
    completed: Boolean(note.completed),
    tags: Array.isArray(note.tags)
      ? note.tags.map((tag) => String(tag).trim().replace(/^#/, "")).filter(Boolean).slice(0, 8)
      : [],
    createdAt: validDate(note.createdAt) ? note.createdAt : now,
    updatedAt: validDate(note.updatedAt) ? note.updatedAt : null
  };
}

function validDate(value) {
  return value && !Number.isNaN(new Date(value).getTime());
}

function createId() {
  return window.crypto?.randomUUID?.() || `${Date.now()}-${Math.random().toString(16).slice(2)}`;
}

function saveNotes() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(notes));
}

function parseTags(value) {
  return [...new Set(
    value
      .split(",")
      .map((tag) => tag.trim().replace(/^#/, ""))
      .filter(Boolean)
  )].slice(0, 8);
}

function formatDate(dateValue) {
  return new Intl.DateTimeFormat(undefined, {
    day: "numeric",
    month: "short",
    year: "numeric"
  }).format(new Date(dateValue));
}

function showStatus(message) {
  elements.statusMessage.textContent = message;
  window.clearTimeout(showStatus.timeoutId);
  if (message) {
    showStatus.timeoutId = window.setTimeout(() => {
      elements.statusMessage.textContent = "";
    }, 3500);
  }
}

function getVisibleNotes() {
  const searchTerm = elements.searchInput.value.trim().toLowerCase();
  const filter = elements.filterSelect.value;
  const sort = elements.sortSelect.value;

  const visibleNotes = notes.filter((note) => {
    const matchesFilter = filter === "all"
      || (filter === "active" && !note.completed)
      || (filter === "completed" && note.completed);
    const searchableText = `${note.text} ${note.tags.join(" ")}`.toLowerCase();
    return matchesFilter && (!searchTerm || searchableText.includes(searchTerm));
  });

  return visibleNotes.sort((left, right) => {
    if (sort === "oldest") return new Date(left.createdAt) - new Date(right.createdAt);
    if (sort === "updated") return new Date(right.updatedAt || right.createdAt) - new Date(left.updatedAt || left.createdAt);
    return new Date(right.createdAt) - new Date(left.createdAt);
  });
}

function createButton(action, label, icon, extraClass = "") {
  const button = document.createElement("button");
  button.type = "button";
  button.className = `icon-button ${extraClass}`.trim();
  button.dataset.action = action;
  button.setAttribute("aria-label", label);
  button.title = label;
  button.textContent = icon;
  return button;
}

function renderNote(note, index) {
  const card = document.createElement("article");
  card.className = `note-card${note.completed ? " is-completed" : ""}`;
  card.dataset.noteId = note.id;

  const header = document.createElement("div");
  header.className = "note-card-header";

  const number = document.createElement("span");
  number.className = "note-number";
  number.textContent = `NOTE ${String(index + 1).padStart(2, "0")}`;

  const checkLabel = document.createElement("label");
  checkLabel.className = "check-label";
  const checkbox = document.createElement("input");
  checkbox.type = "checkbox";
  checkbox.checked = note.completed;
  checkbox.dataset.action = "toggle";
  checkbox.setAttribute("aria-label", `Mark note ${index + 1} as complete`);
  checkLabel.append(checkbox, document.createTextNode("Done"));
  header.append(number, checkLabel);

  const text = document.createElement("p");
  text.className = "note-text";
  text.textContent = note.text;

  const tagList = document.createElement("div");
  tagList.className = "tag-list";
  note.tags.forEach((tag) => {
    const tagElement = document.createElement("span");
    tagElement.className = "tag";
    tagElement.textContent = `#${tag}`;
    tagList.append(tagElement);
  });

  const footer = document.createElement("div");
  footer.className = "note-card-footer";
  const date = document.createElement("time");
  date.className = "note-date";
  const shownDate = note.updatedAt || note.createdAt;
  date.dateTime = shownDate;
  date.textContent = note.updatedAt ? `Updated ${formatDate(shownDate)}` : `Created ${formatDate(shownDate)}`;

  const actions = document.createElement("div");
  actions.className = "card-actions";
  actions.append(
    createButton("edit", "Edit note", "✎"),
    createButton("delete", "Delete note", "×", "delete-button")
  );
  footer.append(date, actions);

  card.append(header, text);
  if (note.tags.length) card.append(tagList);
  card.append(footer);
  return card;
}

function render() {
  const completedCount = notes.filter((note) => note.completed).length;
  elements.totalCount.textContent = notes.length;
  elements.activeCount.textContent = notes.length - completedCount;
  elements.completedCount.textContent = completedCount;
  elements.notesList.replaceChildren();

  const visibleNotes = getVisibleNotes();
  if (!visibleNotes.length) {
    const empty = document.createElement("div");
    empty.className = "empty-state";
    const icon = document.createElement("div");
    icon.className = "empty-state-icon";
    icon.setAttribute("aria-hidden", "true");
    icon.textContent = notes.length ? "⌕" : "✦";
    const heading = document.createElement("h3");
    heading.textContent = notes.length ? "No matching notes" : "Your board is clear";
    const message = document.createElement("p");
    message.textContent = notes.length
      ? "Try a different search or filter."
      : "Add your first note above and it will appear here.";
    empty.append(icon, heading, message);
    elements.notesList.append(empty);
    return;
  }

  visibleNotes.forEach((note, index) => elements.notesList.append(renderNote(note, index)));
}

function resetComposer() {
  editingId = null;
  elements.form.reset();
  elements.composerTitle.textContent = "Write a new note";
  elements.submitButton.innerHTML = 'Add note <span aria-hidden="true">↗</span>';
  elements.cancelEdit.classList.add("hidden");
}

function startEditing(note) {
  editingId = note.id;
  elements.noteInput.value = note.text;
  elements.tagInput.value = note.tags.join(", ");
  elements.composerTitle.textContent = "Edit your note";
  elements.submitButton.innerHTML = 'Save changes <span aria-hidden="true">✓</span>';
  elements.cancelEdit.classList.remove("hidden");
  elements.noteInput.focus();
  window.scrollTo({ top: 0, behavior: "smooth" });
}

function submitNote(event) {
  event.preventDefault();
  const text = elements.noteInput.value.trim();
  if (!text) {
    showStatus("Write something before saving your note.");
    elements.noteInput.focus();
    return;
  }

  const tags = parseTags(elements.tagInput.value);
  if (editingId) {
    const note = notes.find((item) => item.id === editingId);
    if (note) {
      note.text = text;
      note.tags = tags;
      note.updatedAt = new Date().toISOString();
      showStatus("Note updated.");
    }
  } else {
    notes.unshift({
      id: createId(),
      text,
      completed: false,
      tags,
      createdAt: new Date().toISOString(),
      updatedAt: null
    });
    showStatus("Note saved locally.");
  }

  saveNotes();
  resetComposer();
  render();
}

function handleNoteAction(event) {
  const target = event.target.closest("[data-action]");
  const card = event.target.closest("[data-note-id]");
  if (!target || !card) return;

  const note = notes.find((item) => item.id === card.dataset.noteId);
  if (!note) return;

  if (target.dataset.action === "toggle") {
    note.completed = target.checked;
    note.updatedAt = new Date().toISOString();
    saveNotes();
    render();
    showStatus(note.completed ? "Note marked complete." : "Note marked active.");
  }

  if (target.dataset.action === "edit") startEditing(note);

  if (target.dataset.action === "delete") {
    notes = notes.filter((item) => item.id !== note.id);
    saveNotes();
    if (editingId === note.id) resetComposer();
    render();
    showStatus("Note deleted.");
  }
}

function toggleTheme() {
  const nextTheme = document.body.dataset.theme === "dark" ? "light" : "dark";
  document.body.dataset.theme = nextTheme;
  localStorage.setItem(THEME_KEY, nextTheme);
}

function loadTheme() {
  const savedTheme = localStorage.getItem(THEME_KEY);
  if (savedTheme === "dark" || savedTheme === "light") document.body.dataset.theme = savedTheme;
}

function exportNotes() {
  const file = new Blob([JSON.stringify(notes, null, 2)], { type: "application/json" });
  const url = URL.createObjectURL(file);
  const link = document.createElement("a");
  link.href = url;
  link.download = "divyansh-notes.json";
  link.click();
  URL.revokeObjectURL(url);
  showStatus("Notes exported as JSON.");
}

function importNotes(event) {
  const [file] = event.target.files;
  if (!file) return;

  const reader = new FileReader();
  reader.addEventListener("load", () => {
    try {
      const parsed = JSON.parse(reader.result);
      if (!Array.isArray(parsed)) throw new Error("The file must contain an array of notes.");
      const imported = parsed.map(normalizeNote).filter(Boolean);
      notes = imported;
      saveNotes();
      resetComposer();
      render();
      showStatus(`${imported.length} note${imported.length === 1 ? "" : "s"} imported.`);
    } catch (error) {
      showStatus(`Import failed: ${error.message}`);
    } finally {
      elements.importInput.value = "";
    }
  });
  reader.readAsText(file);
}

elements.form.addEventListener("submit", submitNote);
elements.cancelEdit.addEventListener("click", resetComposer);
elements.notesList.addEventListener("click", handleNoteAction);
elements.notesList.addEventListener("change", handleNoteAction);
elements.searchInput.addEventListener("input", render);
elements.filterSelect.addEventListener("change", render);
elements.sortSelect.addEventListener("change", render);
elements.themeToggle.addEventListener("click", toggleTheme);
elements.exportButton.addEventListener("click", exportNotes);
elements.importInput.addEventListener("change", importNotes);

elements.noteInput.addEventListener("keydown", (event) => {
  if ((event.ctrlKey || event.metaKey) && event.key === "Enter") {
    elements.form.requestSubmit();
  }
  if (event.key === "Escape" && editingId) resetComposer();
});

loadTheme();
render();
