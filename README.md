# Fidus Writer Frontend Proof of Concept

This is a proof-of-concept (POC) demonstrating the Fidus Writer editor running with a minimal Node.js backend instead of the full Django backend. It contains only the frontend JavaScript assets and a tiny Express server that can load and save a single document.

## What this is

- **Frontend-only**: All JavaScript code from Fidus Writer's build output (`static-transpile/js/` and `static-collected/` assets) is included.
- **Minimal backend**: A small Express server provides the bare minimum API endpoints required to open the editor and save a document.
- **Non-collaborative**: `COLLABORATIVE_EDITING` is set to `false`, so the editor uses the simpler `NoCollabSave` mechanism (REST POST every 10 seconds) instead of WebSocket-based real-time collaboration.

## Prerequisites

- [Node.js](https://nodejs.org/) (v18 or later recommended)
- npm (comes with Node.js)

## Installation

```bash
npm install
```

## Running

```bash
npm start
```

Then open your browser at:

```
http://localhost:3000/
```

The editor will load a pre-created demo document. Any changes you make will be auto-saved to `data/document.json` every 10 seconds (only when the document has actually changed).

## Updating the frontend from the main repo

A helper script is included to refresh the bundled assets when the main Fidus Writer project is rebuilt:

```bash
./update-from-source.sh /path/to/fiduswriter/fiduswriter
```

This will:
1. Copy the latest JS bundles from `static-transpile/js/`
2. Copy CSS, fonts, images, and other assets from `static-collected/`
3. Auto-detect the new build version hash and update `index.html`

**Note:** If `base/templates/app.html` changed significantly (new CSS links, new scripts, etc.), you may still need to update `index.html` manually.

## Project structure

```
.
├── server.js              # Minimal Express backend
├── package.json           # Node dependencies
├── update-from-source.sh  # Script to refresh assets from main repo
├── index.html             # SPA shell (replaces Django's app.html template)
├── data/
│   └── document.json      # The single stored document (initial fixture)
├── static/
│   ├── js/                # Bundled JavaScript from Fidus Writer (Rspack output)
│   ├── css/               # Stylesheets
│   ├── fonts/             # Web fonts
│   ├── img/               # Images and icons
│   ├── json/              # JSON assets
│   ├── svg/               # SVG assets
│   ├── zip/               # ZIP assets
│   └── ogg/               # Audio assets
├── README.md
└── LICENSE
```

### Data persistence and Git

`data/document.json` is kept in the repository as an initial fixture so the editor can load a document on first run. Runtime edits (version bumps, content changes) are ignored by Git via `git update-index --skip-worktree data/document.json`. If you want to commit an updated fixture, temporarily disable this with `git update-index --no-skip-worktree data/document.json`.

## API endpoints provided

| Endpoint | Description |
|----------|-------------|
| `POST /api/base/configuration/` | Returns mock user config (authenticated demo user) |
| `POST /api/document/get_doc_data/` | Loads the document from `data/document.json` |
| `POST /api/document/get_doc_styles/` | Returns empty document styles/templates |
| `POST /api/document/get_template_for_doc/` | Returns the document's template for export |
| `POST /api/document/save/` | Saves the document and increments version |
| `POST /api/document/get_ws_base/` | Returns empty WebSocket base (collab disabled) |
| `POST /api/bibliography/biblist/` | Returns empty bibliography |
| `POST /api/usermedia/images/` | Returns empty image database |
| `POST /api/feedback/feedback/` | Accepts feedback messages (logged to console) |

## Limitations of this POC

- **Single document only**: Only document ID `1` exists.
- **No user management**: A hard-coded "Demo User" is always authenticated.
- **No bibliography or image uploads**: The relevant endpoints return empty data.
- **No WebSocket features**: Chat, caret cursors, and real-time collaboration are disabled.
- **No export**: Export templates are not configured.
- **No service worker**: Offline support is disabled.
- **No template adjustment on load**: The document template is not sent with `get_doc_data`, so the editor skips the adjust-to-template worker step.
- **Simplified File menu**: Share, Save revision, Create copy, and Change password menu items are removed at runtime since they require backend features not present in this POC.

## Relationship to the main Fidus Writer project

This POC is a snapshot of the frontend build output from the main [Fidus Writer](https://github.com/fiduswriter/fiduswriter) project. The JavaScript bundles are copied verbatim from `static-transpile/` and `static-collected/`. However, three small upstream bugs were fixed in the main project's source so the non-collaborative mode works correctly:

1. **`App.connectWs()`** — unconditionally opened a WebSocket even when `ws_url_base` was empty, causing connection errors.
2. **`HeaderbarView.saveFileName()`** — crashed when `editor.ws` was undefined in non-collaborative mode.
3. **`NoCollabSave`** — saved every 10 seconds regardless of whether the document had changed, causing unnecessary version increments. A dirty check (`_hasUnsavedChanges`) was added so saves only happen when content actually changed.

These fixes are candidates for upstreaming into the main Fidus Writer project.

The goal of this POC is to explore what a separated frontend/backend architecture could look like in the future.

## License

This POC inherits the same license as Fidus Writer: GNU Affero General Public License v3.0 or later. See `LICENSE` for details.
