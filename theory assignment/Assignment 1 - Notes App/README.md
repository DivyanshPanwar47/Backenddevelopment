# Assignment 1 - Notes App

**Student:** Divyansh Panwar
**SAP ID:** 590018990
**Course:** Backend Development

## Objective

Build a fully functional Notes/Todo application using only frontend HTML, CSS and JavaScript, with `localStorage` used for persistence.

## Requirements completed

- Add a note with text.
- Display all saved notes when the page loads.
- Edit an existing note.
- Delete an individual note.
- Persist notes across page refreshes.
- Store `id`, `text`, `createdAt` and `updatedAt` on every note.

## Stretch features included

- Mark notes complete or active.
- Search notes by text or tag.
- Filter by all, active or completed notes.
- Sort by created or updated date.
- Add tags to notes.
- Export and import notes as a JSON file.
- Light/dark theme saved in `localStorage`.
- Accessible labels, keyboard shortcut (`Ctrl/Cmd + Enter`) and responsive layout.

## Files

| File | Purpose |
|---|---|
| `index.html` | Accessible page structure and controls |
| `styles.css` | Responsive visual design and light/dark themes |
| `app.js` | CRUD operations, rendering, filters and storage logic |

## How to run

Open [`index.html`](./index.html) in a modern browser. No dependency installation or server is required.

## Data model

```js
{
  id: "unique-id",
  text: "Read about localStorage",
  completed: false,
  tags: ["javascript", "storage"],
  createdAt: "2026-10-03T00:00:00.000Z",
  updatedAt: null
}
```

The notes array is serialized with `JSON.stringify()` and saved under the key `divyansh-notes-assignment-1`. It is restored with `JSON.parse()` when the application starts.

## Testing checklist

1. Add a note and confirm it appears immediately.
2. Refresh the page and confirm the note remains.
3. Edit the note and confirm its updated date changes.
4. Mark it complete, then test the Active and Completed filters.
5. Search for part of the note text or a tag.
6. Delete the note and refresh to confirm it remains deleted.
7. Export notes, clear the app manually if needed, and import the JSON file again.
