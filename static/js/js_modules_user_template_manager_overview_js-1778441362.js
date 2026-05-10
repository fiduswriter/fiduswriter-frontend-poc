"use strict";
(self["rspackChunkfidus_writer"] = self["rspackChunkfidus_writer"] || []).push([["js_modules_user_template_manager_overview_js"], {
"./js/modules/user_template_manager/actions.js": (function (__unused_rspack_module, __webpack_exports__, __webpack_require__) {
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  DocTemplatesActions: function() { return DocTemplatesActions; }
});
/* import */ var _common__rspack_import_0 = __webpack_require__("./js/modules/common/index.js");
/* import */ var _document_template__rspack_import_1 = __webpack_require__("./js/modules/document_template/index.js");
/* import */ var _templates__rspack_import_2 = __webpack_require__("./js/modules/user_template_manager/templates.js");





class DocTemplatesActions {
    constructor(docTemplatesOverview) {
        docTemplatesOverview.mod.actions = this
        this.docTemplatesOverview = docTemplatesOverview
    }

    deleteDocTemplate(id) {
        const docTemplate = this.docTemplatesOverview.templateList.find(
            docTemplate => docTemplate.id === id
        )
        if (!docTemplate) {
            return
        }

        (0,_common__rspack_import_0.postJson)("/api/user_template_manager/delete/", {id})
            .catch(error => {
                (0,_common__rspack_import_0.addAlert)(
                    "error",
                    `${gettext("Could not delete document template")}: '${docTemplate.title}'`
                )
                throw error
            })
            .then(({json}) => {
                if (json.done) {
                    (0,_common__rspack_import_0.addAlert)(
                        "success",
                        `${gettext("Document template successfully deleted")}: '${docTemplate.title}'`
                    )
                    this.docTemplatesOverview.removeTableRows([id])
                    this.docTemplatesOverview.templateList =
                        this.docTemplatesOverview.templateList.filter(
                            docTemplate => docTemplate.id !== id
                        )
                } else {
                    (0,_common__rspack_import_0.addAlert)(
                        "error",
                        `${gettext("Document template still required by documents")}: '${docTemplate.title}'`
                    )
                }
            })
    }

    deleteDocTemplatesDialog(ids) {
        const buttons = [
            {
                text: gettext("Delete"),
                classes: "fw-dark",
                click: () => {
                    ids.forEach(id =>
                        this.deleteDocTemplate(Number.parseInt(id))
                    )
                    dialog.close()
                }
            },
            {
                type: "close"
            }
        ]

        const dialog = new _common__rspack_import_0.Dialog({
            title: gettext("Confirm deletion"),
            id: "confirmdeletion",
            icon: "exclamation-triangle",
            body: `<p>${ids.length > 1 ? gettext("Delete the document templates?") : gettext("Delete the document template?")}</p>`,
            buttons
        })
        dialog.open()
    }

    copyDocTemplate(oldDocTemplate) {
        return (0,_common__rspack_import_0.postJson)("/api/user_template_manager/copy/", {
            id: oldDocTemplate.id,
            title: `${gettext("Copy of")} ${oldDocTemplate.title}`
        })
            .catch(error => {
                (0,_common__rspack_import_0.addAlert)(
                    "error",
                    gettext("The document template could not be copied")
                )
                throw error
            })
            .then(({json}) => {
                const docTemplate = JSON.parse(JSON.stringify(oldDocTemplate))
                docTemplate.is_owner = true
                docTemplate.id = json["id"]
                docTemplate.title = json["title"]
                this.docTemplatesOverview.templateList.push(docTemplate)
                this.docTemplatesOverview.addDocTemplateToTable(docTemplate)
            })
    }

    downloadDocTemplate(id) {
        const exporter = new _document_template__rspack_import_1.DocumentTemplateExporter(
            id,
            "/api/user_template_manager/get/"
        )
        exporter.init()
    }

    uploadDocTemplate() {
        const buttons = [
            {
                text: gettext("Import"),
                classes: "fw-dark",
                click: () => {
                    let fidusTemplateFile = document.getElementById(
                        "fidus-template-uploader"
                    ).files
                    if (0 === fidusTemplateFile.length) {
                        return false
                    }
                    fidusTemplateFile = fidusTemplateFile[0]
                    if (104857600 < fidusTemplateFile.size) {
                        //TODO: This is an arbitrary size. What should be done with huge import files?
                        return false
                    }
                    (0,_common__rspack_import_0.activateWait)()

                    const importer = new _document_template__rspack_import_1.DocumentTemplateImporter(
                        fidusTemplateFile,
                        "/api/user_template_manager/create/"
                    )

                    importer
                        .init()
                        .then(({ok, statusText, docTemplate}) => {
                            ;(0,_common__rspack_import_0.deactivateWait)()
                            if (ok) {
                                (0,_common__rspack_import_0.addAlert)("info", statusText)
                            } else {
                                (0,_common__rspack_import_0.addAlert)("error", statusText)
                                return
                            }

                            docTemplate.is_owner = true

                            this.docTemplatesOverview.templateList.push(
                                docTemplate
                            )
                            this.docTemplatesOverview.addDocTemplateToTable(
                                docTemplate
                            )
                            importDialog.close()
                        })
                        .catch(() => false)
                }
            },
            {
                type: "cancel"
            }
        ]
        const importDialog = new _common__rspack_import_0.Dialog({
            id: "importfidustemplate",
            title: gettext("Import a Fidus Template file"),
            body: (0,_templates__rspack_import_2.importFidusTemplateTemplate)(),
            height: 100,
            buttons
        })
        importDialog.open()

        document
            .getElementById("fidus-template-uploader")
            .addEventListener("change", () => {
                document.getElementById(
                    "import-fidus-template-name"
                ).innerHTML = document
                    .getElementById("fidus-template-uploader")
                    .value.replace(/C:\\fakepath\\/i, "")
            })

        document
            .getElementById("import-fidus-template-btn")
            .addEventListener("click", event => {
                document.getElementById("fidus-template-uploader").click()
                event.preventDefault()
            })
    }
}


}),
"./js/modules/user_template_manager/menu.js": (function (__unused_rspack_module, __webpack_exports__, __webpack_require__) {
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  bulkMenuModel: function() { return bulkMenuModel; },
  menuModel: function() { return menuModel; }
});
/* import */ var _common__rspack_import_0 = __webpack_require__("./js/modules/common/index.js");


const menuModel = () => ({
    content: [
        {
            type: "text",
            title: gettext("Create new document template"),
            keys: "Alt-n",
            action: overview => {
                overview.app.goTo("/templates/0/")
            },
            order: 1
        },
        {
            type: "text",
            title: gettext("Upload FIDUSTEMPLATE file"),
            keys: "Alt-u",
            action: overview => overview.mod.actions.uploadDocTemplate(),
            order: 2
        }
    ]
})

const bulkMenuModel = () => ({
    content: [
        {
            title: gettext("Delete selected"),
            tooltip: gettext("Delete selected document templates."),
            action: overview => {
                const ids = overview.getSelected()
                const ownIds = ids.filter(id => {
                    const docTemplate = overview.templateList.find(
                        docTemplate => (docTemplate.id = id)
                    )
                    return docTemplate.is_owner
                })
                if (ownIds.length !== ids.length) {
                    (0,_common__rspack_import_0.addAlert)(
                        "error",
                        gettext("You cannot delete system document templates.")
                    )
                }
                if (ownIds.length) {
                    overview.mod.actions.deleteDocTemplatesDialog(ownIds)
                }
            },
            disabled: overview => !overview.getSelected().length
        },
        {
            title: gettext("Duplicate selected"),
            tooltip: gettext("Duplicate selected document templates."),
            action: overview => {
                const ids = overview.getSelected()
                ids.forEach(id =>
                    overview.mod.actions.copyDocTemplate(
                        overview.templateList.find(
                            docTemplate => docTemplate.id === id
                        )
                    )
                )
            },
            disabled: overview => !overview.getSelected().length
        },
        {
            title: gettext("Download selected"),
            tooltip: gettext("Download selected document templates."),
            action: overview => {
                const ids = overview.getSelected()
                ids.forEach(id => overview.mod.actions.downloadDocTemplate(id))
            },
            disabled: overview => !overview.getSelected().length
        }
    ]
})


}),
"./js/modules/user_template_manager/overview.js": (function (__unused_rspack_module, __webpack_exports__, __webpack_require__) {
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  DocTemplatesOverview: function() { return DocTemplatesOverview; }
});
/* import */ var simple_datatables__rspack_import_0 = __webpack_require__("./node_modules/.pnpm/simple-datatables@10.2.0/node_modules/simple-datatables/dist/module.js");
/* import */ var w3c_keyname__rspack_import_1 = __webpack_require__("./node_modules/.pnpm/w3c-keyname@2.2.8/node_modules/w3c-keyname/index.js");
/* import */ var _common__rspack_import_2 = __webpack_require__("./js/modules/common/index.js");
/* import */ var _feedback__rspack_import_3 = __webpack_require__("./js/modules/feedback/index.js");
/* import */ var _menu__rspack_import_4 = __webpack_require__("./js/modules/menu/index.js");
/* import */ var _actions__rspack_import_5 = __webpack_require__("./js/modules/user_template_manager/actions.js");
/* import */ var _menu__rspack_import_6 = __webpack_require__("./js/modules/user_template_manager/menu.js");









class DocTemplatesOverview {
    // A class that contains everything that happens on the templates page.
    // It is currently not possible to initialize more than one such class, as it
    // contains bindings to menu items, etc. that are uniquely defined.
    constructor({app, user}) {
        this.app = app
        this.user = user
        this.mod = {}
        this.templateList = []
        this.styles = false

        this.lastSort = {column: 0, dir: "asc"}
    }

    init() {
        return (0,_common__rspack_import_2.whenReady)().then(() => {
            this.render()
            const smenu = new _menu__rspack_import_4.SiteMenu(this.app, "templates")
            smenu.init()
            new _actions__rspack_import_5.DocTemplatesActions(this)
            this.menu = new _common__rspack_import_2.OverviewMenuView(this, _menu__rspack_import_6.menuModel)
            this.menu.init()
            this.bind()
            return this.getTemplateListData()
        })
    }

    render() {
        this.dom = document.createElement("body")
        this.dom.innerHTML = (0,_common__rspack_import_2.baseBodyTemplate)({
            contents: "",
            user: this.user,
            hasOverview: true,
            app: this.app
        })
        document.body = this.dom
        ;(0,_common__rspack_import_2.ensureCSS)([
            staticUrl("css/add_remove_dialog.css"),
            staticUrl("css/access_rights_dialog.css")
        ])
        ;(0,_common__rspack_import_2.setDocTitle)(gettext("Document Templates Overview"), this.app)
        const feedbackTab = new _feedback__rspack_import_3.FeedbackTab()
        feedbackTab.init()
    }

    onResize() {
        if (!this.table) {
            return
        }
        this.initTable()
    }

    /* Initialize the overview table */
    initTable() {
        const tableEl = document.createElement("table")
        tableEl.classList.add("fw-data-table")
        tableEl.classList.add("fw-large")
        this.dom.querySelector(".fw-contents").innerHTML = ""
        this.dom.querySelector(".fw-contents").appendChild(tableEl)

        this.dtBulk = new _common__rspack_import_2.DatatableBulk(this, (0,_menu__rspack_import_6.bulkMenuModel)(), 1)

        const hiddenCols = [0]

        if (window.innerWidth < 500) {
            hiddenCols.push(1)
        }

        this.table = new simple_datatables__rspack_import_0.DataTable(tableEl, {
            searchable: true,
            paging: false,
            scrollY: `${Math.max(window.innerHeight - 360, 100)}px`,
            labels: {
                noRows: gettext("No document templates available"),
                noResults: gettext("No document templates found") // Message shown when there are no search results
            },
            rowNavigation: true,
            rowSelectionKeys: ["Enter", "Delete", " "],
            tabIndex: 1,
            template: (
                options,
                _dom
            ) => `<div class='${options.classes.container}'${options.scrollY.length ? ` style='height: ${options.scrollY}; overflow-Y: auto;'` : ""}></div>
            <div class='${options.classes.bottom}'>
                <nav class='${options.classes.pagination}'></nav>
            </div>`,
            data: {
                headings: [
                    "",
                    this.dtBulk.getHTML(),
                    gettext("Title"),
                    gettext("Created"),
                    gettext("Last changed"),
                    ""
                ],
                data: this.templateList.map(docTemplate =>
                    this.createTableRow(docTemplate)
                )
            },
            columns: [
                {
                    select: 0,
                    type: "number"
                },
                {
                    select: 1,
                    sortable: false,
                    type: "boolean"
                },
                {
                    select: hiddenCols,
                    hidden: true
                },
                {
                    select: 5,
                    sortable: false
                }
            ],
            rowRender: (row, tr, _index) => {
                const id = row.cells[0].data
                const inputNode = {
                    nodeName: "input",
                    attributes: {
                        type: "checkbox",
                        class: "entry-select fw-check",
                        "data-id": String(id),
                        id: `template-${id}`
                    }
                }
                if (row.cells[1].data) {
                    inputNode.attributes.checked = true
                }
                tr.childNodes[0].childNodes = [
                    inputNode,
                    {
                        nodeName: "label",
                        attributes: {
                            for: `template-${id}`
                        }
                    }
                ]
            }
        })

        this.table.on("datatable.selectrow", (rowIndex, event, focused) => {
            event.preventDefault()
            if (event.type === "keydown") {
                const key = (0,w3c_keyname__rspack_import_1.keyName)(event)
                if (key === "Enter") {
                    if (this.getSelected().length > 0) {
                        // Don't open. Let the bulk menu handle it.
                        return
                    }
                    const link = this.table.dom.querySelector(
                        `tr[data-index="${rowIndex}"] a`
                    )
                    if (link) {
                        link.click()
                    }
                } else if (key === " ") {
                    const cell = this.table.data.data[rowIndex].cells[1]
                    cell.data = !cell.data
                    cell.text = String(cell.data)
                    this.table.update()
                } else if (key === "Delete") {
                    const cell = this.table.data.data[rowIndex].cells[0]
                    const imageId = cell.data
                    this.deleteDocTemplatesDialog([imageId])
                }
            } else {
                if (
                    event.target.closest("a, span.delete-doc-template, label")
                ) {
                    return
                }
                if (!focused) {
                    this.table.dom.focus()
                }
                this.table.rows.setCursor(rowIndex)
            }
        })

        this.table.on("datatable.sort", (column, dir) => {
            this.lastSort = {column, dir}
        })

        this.dtBulk.init(this.table)

        this.table.dom.focus()
    }

    createTableRow(docTemplate) {
        return [
            docTemplate.id,
            false, // Checkbox
            `<span class="${docTemplate.is_owner ? "fw-data-table-title " : ""}fw-inline">
                <i class="far fa-file"></i>
                ${
                    docTemplate.is_owner
                        ? `<a href='/templates/${docTemplate.id}/'>
                        ${
                            docTemplate.title.length
                                ? (0,_common__rspack_import_2.escapeText)(docTemplate.title)
                                : gettext("Untitled")
                        }
                    </a>`
                        : docTemplate.title.length
                          ? (0,_common__rspack_import_2.escapeText)(docTemplate.title)
                          : gettext("Untitled")
                }
            </span>`,
            docTemplate.added, // format?
            docTemplate.updated, // format ?
            `<span class="delete-doc-template fw-inline fw-link-text" data-id="${docTemplate.id}" data-title="${(0,_common__rspack_import_2.escapeText)(docTemplate.title)}">
                ${docTemplate.is_owner ? '<i class="fa fa-trash-alt"></i>' : ""}
           </span>`
        ]
    }

    removeTableRows(ids) {
        const existingRows = this.table.data.data
            .map((row, index) => {
                const id = row.cells[0].data
                if (ids.includes(id)) {
                    return index
                } else {
                    return false
                }
            })
            .filter(rowIndex => rowIndex !== false)

        if (existingRows.length) {
            this.table.rows.remove(existingRows)
        }
    }

    addDocTemplateToTable(docTemplate) {
        this.table.insert({data: [this.createTableRow(docTemplate)]})
        // Redo last sort
        this.table.columns.sort(this.lastSort.column, this.lastSort.dir)
    }

    getTemplateListData() {
        if (this.app.isOffline()) {
            return this.showCached()
        }
        return (0,_common__rspack_import_2.getJson)("/api/user_template_manager/list/")
            .then(json => {
                this.updateIndexedDB(json)
                this.initializeView(json)
            })
            .catch(error => {
                if (this.app.isOffline()) {
                    return this.showCached()
                } else {
                    (0,_common__rspack_import_2.addAlert)(
                        "error",
                        gettext("Document templates loading failed.")
                    )
                    throw error
                }
            })
    }

    initializeView(json) {
        if (this.app.page === this) {
            this.templateList = json.document_templates
            this.initTable()
            // Reset scroll position to top to prevent Safari from auto-scrolling
            // to the focused table element, which would hide the header/menu
            window.scrollTo(0, 0)
        }
    }

    showCached() {
        return this.loaddatafromIndexedDB().then(json =>
            this.initializeView(json)
        )
    }

    loaddatafromIndexedDB() {
        return this.app.indexedDB
            .readAllData("templates_list")
            .then(response => ({document_templates: response}))
    }

    updateIndexedDB(json) {
        // Clear data if any present
        this.app.indexedDB.clearData("templates_list").then(() => {
            this.app.indexedDB.insertData(
                "templates_list",
                json.document_templates
            )
        })
    }

    bind() {
        this.dom.addEventListener("click", event => {
            const el = {}
            switch (true) {
                case (0,_common__rspack_import_2.findTarget)(event, ".delete-doc-template", el): {
                    const docTemplateId = Number.parseInt(el.target.dataset.id)
                    this.mod.actions.deleteDocTemplatesDialog([docTemplateId])
                    break
                }
                case (0,_common__rspack_import_2.findTarget)(event, "a", el):
                    if (
                        el.target.hostname === window.location.hostname &&
                        el.target.getAttribute("href")[0] === "/"
                    ) {
                        event.preventDefault()
                        this.app.goTo(el.target.href)
                    }
                    break
                default:
                    break
            }
        })
    }

    getSelected() {
        return Array.from(
            this.dom.querySelectorAll(".entry-select:checked:not(:disabled)")
        ).map(el => Number.parseInt(el.getAttribute("data-id")))
    }

    close() {
        if (this.table) {
            this.table.destroy()
            this.table = null
        }
        if (this.dtBulk) {
            this.dtBulk.destroy()
            this.dtBulk = null
        }
        if (this.menu) {
            this.menu.destroy()
            this.menu = null
        }
    }
}


}),
"./js/modules/user_template_manager/templates.js": (function (__unused_rspack_module, __webpack_exports__, __webpack_require__) {
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  importFidusTemplateTemplate: function() { return importFidusTemplateTemplate; }
});
/** A template for the Fidus Writer document import dialog */
const importFidusTemplateTemplate = () =>
    `<form id="import-fidus-form" method="post" enctype="multipart/form-data" class="ajax-upload">
            <input type="file" id="fidus-template-uploader" name="fidustemplate" accept=".fidustemplate" required />
            <button id="import-fidus-template-btn" class="fw-button fw-light fw-large">
                ${gettext("Select a file")}
            </button>
            <label id="import-fidus-template-name" class="ajax-upload-label"></label>
        </form>`


}),

}]);