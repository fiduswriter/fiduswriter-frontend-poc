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
http://localhost:3000/document/1/
```

The editor will load a pre-created demo document. Any changes you make will be auto-saved to `data/document.json` every 10 seconds.

## Project structure

```
.
├── server.js              # Minimal Express backend
├── package.json           # Node dependencies
├── index.html             # SPA shell (replaces Django's app.html template)
├── data/
│   └── document.json      # The single stored document
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

## API endpoints provided

| Endpoint | Description |
|----------|-------------|
| `POST /api/base/configuration/` | Returns mock user config (authenticated demo user) |
| `POST /api/document/get_doc_data/` | Loads the document from `data/document.json` |
| `POST /api/document/get_doc_styles/` | Returns empty document styles/templates |
| `POST /api/document/save/` | Saves the document and increments version |
| `POST /api/document/get_ws_base/` | Returns empty WebSocket base (collab disabled) |
| `POST /api/bibliography/biblist/` | Returns empty bibliography |
| `POST /api/usermedia/images/` | Returns empty image database |

## Limitations of this POC

- **Single document only**: Only document ID `1` exists.
- **No user management**: A hard-coded "Demo User" is always authenticated.
- **No bibliography or image uploads**: The relevant endpoints return empty data.
- **No WebSocket features**: Chat, caret cursors, and real-time collaboration are disabled.
- **No export**: Export templates are not configured.
- **No service worker**: Offline support is disabled.
- **No template adjustment on load**: The document template is not sent with `get_doc_data`, so the editor skips the adjust-to-template worker step.

## Relationship to the main Fidus Writer project

This POC is a snapshot of the frontend build output from the main [Fidus Writer](https://github.com/fiduswriter/fiduswriter) project. The JavaScript bundles are copied verbatim from `static-transpile/` and `static-collected/`; no source code was modified.

The goal of this POC is to explore what a separated frontend/backend architecture could look like in the future.

## License

This POC inherits the same license as Fidus Writer: GNU Affero General Public License v3.0 or later. See `LICENSE` for details.
