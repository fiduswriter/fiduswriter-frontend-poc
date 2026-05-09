const express = require("express");
const fs = require("fs");
const path = require("path");

const app = express();
const PORT = process.env.PORT || 3000;
const DATA_FILE = path.join(__dirname, "data", "document.json");

app.use(express.json());

// Serve static files
app.use("/static", express.static(path.join(__dirname, "static")));

// Manifest
app.get("/manifest.json", (_req, res) => {
    res.sendFile(path.join(__dirname, "static", "manifest.json"));
});

// ------------------------------------------------------------------
// API endpoints
// ------------------------------------------------------------------

// Error hook (swallow silently)
app.post("/api/django_js_error_hook/", (_req, res) => {
    res.status(200).json({ok: true});
});

// Browser check fallback
app.get("/api/browser_check/", (_req, res) => {
    res.send("<html><body>Browser OK</body></html>");
});

// Base configuration - mock authenticated user
app.post("/api/base/configuration/", (_req, res) => {
    res.json({
        language: "en",
        socialaccount_providers: [],
        ws_url_base: "",
        user: {
            id: 1,
            username: "demo",
            first_name: "Demo",
            name: "Demo User",
            last_name: "User",
            language: "en",
            avatar: "",
            emails: [{address: "demo@example.com", primary: true, verified: true}],
            socialaccounts: [],
            is_authenticated: true,
            waiting_invites: false
        }
    });
});

// Bibliography - empty
app.post("/api/bibliography/biblist/", (_req, res) => {
    res.json({
        bib_categories: [],
        bib_list: [],
        last_modified: -1,
        number_of_entries: 0,
        user_id: 1
    });
});

// User media images - empty
app.post("/api/usermedia/images/", (_req, res) => {
    res.json({
        imageCategories: [],
        images: []
    });
});

// Document styles - minimal
app.post("/api/document/get_doc_styles/", (_req, res) => {
    res.json({
        export_templates: [],
        document_styles: [],
        document_templates: {}
    });
});

// WebSocket base - empty because collab editing is off
app.post("/api/document/get_ws_base/", (_req, res) => {
    res.json({ws_base: ""});
});

// Get document data
app.post("/api/document/get_doc_data/", (_req, res) => {
    if (!fs.existsSync(DATA_FILE)) {
        return res.status(404).json({error: "Document not found"});
    }
    const docStore = JSON.parse(fs.readFileSync(DATA_FILE, "utf8"));
    res.json({
        doc_info: docStore.doc_info,
        doc: docStore.doc,
        time: Date.now()
    });
});

// Save document
app.post("/api/document/save/", (req, res) => {
    if (!fs.existsSync(DATA_FILE)) {
        return res.status(404).json({error: "Document not found"});
    }
    const docStore = JSON.parse(fs.readFileSync(DATA_FILE, "utf8"));
    const clientVersion = req.body.version;

    if (clientVersion !== undefined && docStore.doc.v !== clientVersion) {
        return res.status(409).json({
            error: "Document has been modified by another user.",
            version: docStore.doc.v
        });
    }

    // Update fields
    if ("content" in req.body) {
        docStore.doc.content = req.body.content;
    }
    if ("comments" in req.body) {
        docStore.doc.comments = req.body.comments;
    }
    if ("bibliography" in req.body) {
        docStore.doc.bibliography = req.body.bibliography;
    }
    if ("title" in req.body) {
        docStore.doc_info.title = req.body.title;
    }

    docStore.doc.v += 1;
    fs.writeFileSync(DATA_FILE, JSON.stringify(docStore, null, 2));
    res.json({version: docStore.doc.v});
});

// ------------------------------------------------------------------
// SPA shell - serve index.html for all non-API, non-static routes
// ------------------------------------------------------------------

const indexHtml = fs.readFileSync(
    path.join(__dirname, "index.html"),
    "utf8"
);

app.get("/", (_req, res) => res.redirect("/document/1/"));
app.get("/document/:id/", (_req, res) => res.send(indexHtml));

// Catch-all for any other SPA paths
app.get("*", (_req, res) => res.send(indexHtml));

app.listen(PORT, () => {
    console.log(`Fidus Writer POC server running at http://localhost:${PORT}`);
    console.log(`Open the editor at http://localhost:${PORT}/document/1/`);
});
