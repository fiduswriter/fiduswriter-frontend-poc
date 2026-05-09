(self["webpackChunkfidus_writer"] = self["webpackChunkfidus_writer"] || []).push([["js_modules_documents_overview_index_js"], {
"./js/modules/bibliography/import/bibliography_import.js": (function (__unused_rspack_module, __webpack_exports__, __webpack_require__) {
"use strict";
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  BibliographyImporter: function() { return BibliographyImporter; }
});
/* import */ var biblatex_csl_converter__rspack_import_0 = __webpack_require__("./node_modules/.pnpm/biblatex-csl-converter@3.6.0/node_modules/biblatex-csl-converter/lib/index.js");
/* import */ var _common__rspack_import_1 = __webpack_require__("./js/modules/common/index.js");



const ERROR_MSG = {
    no_entries: gettext(
        "No bibliography entries could be found in import file."
    ),
    entry_error: gettext("An error occured while reading a bibliography entry"),
    unknown_field: gettext(
        "Field cannot not be saved. Fidus Writer does not support the field."
    ),
    unknown_type: gettext(
        'Entry has been saved as "misc". Fidus Writer does not support the entry type.'
    ),
    unknown_date: gettext("Field does not contain a valid EDTF string."),
    server_save: gettext("The bibliography could not be updated"),
    unsupported_format: gettext("The file format could not be recognized.")
}

class BibliographyImporter {
    constructor(
        fileContents,
        bibDB,
        addToListCall,
        callback,
        showAlerts = true
    ) {
        this.fileContents = fileContents
        this.bibDB = bibDB
        this.addToListCall = addToListCall
        this.callback = callback
        this.showAlerts = showAlerts
    }

    init() {
        // Detect the format of the input file
        const format = (0,biblatex_csl_converter__rspack_import_0.sniffFormat)(this.fileContents)

        if (!format) {
            if (this.showAlerts) {
                (0,_common__rspack_import_1.addAlert)("error", ERROR_MSG.unsupported_format)
            }
            if (this.callback) {
                this.callback()
            }
            return
        }

        // Use the worker for the detected format
        const importWorker = (0,_common__rspack_import_1.makeWorker)(
            staticUrl("js/bibliography_import_worker.js")
        )
        importWorker.onmessage = message => this.onMessage(message.data)
        importWorker.postMessage({
            fileContents: this.fileContents,
            format: format
        })
    }

    onMessage(message) {
        let errorMsg, data
        switch (message.type) {
            case "error":
            case "warning":
                errorMsg = ERROR_MSG[message.errorCode]
                if (!errorMsg) {
                    errorMsg = gettext(
                        "There was an issue with the bibliography import"
                    )
                }
                if (message.errorType) {
                    errorMsg += `, error_type: ${message.errorType}`
                }
                if (message.key) {
                    errorMsg += `, key: ${message.key}`
                }
                if (message.type_name) {
                    errorMsg += `, entry: ${message.type_name}`
                }
                if (message.field_name) {
                    errorMsg += `, field_name: ${message.field_name}`
                }
                if (message.entry) {
                    errorMsg += `, entry: ${message.entry}`
                }
                if (this.showAlerts) {
                    (0,_common__rspack_import_1.addAlert)(message.type, errorMsg)
                }
                break
            case "data":
                data = message.data
                this.bibDB.saveBibEntries(data, true).then(idTranslations => {
                    const newIds = idTranslations.map(idTrans => idTrans[1])
                    this.addToListCall(newIds)
                })
                break
            default:
                break
        }
        if (message.done && this.callback) {
            this.callback()
        }
    }
}


}),
"./js/modules/bibliography/import/dialog.js": (function (__unused_rspack_module, __webpack_exports__, __webpack_require__) {
"use strict";
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  BibliographyFileImportDialog: function() { return BibliographyFileImportDialog; }
});
/* import */ var _common__rspack_import_0 = __webpack_require__("./js/modules/common/index.js");
/* import */ var _templates__rspack_import_1 = __webpack_require__("./js/modules/bibliography/import/templates.js");


/** First step of the bibliography file import. Creates a dialog box to specify upload file.
 * Supports multiple formats: BibTeX/BibLaTeX, CSL-JSON, RIS, EndNote, Citavi, NBIB, ODT/DOCX citations.
 */

class BibliographyFileImportDialog {
    constructor(bibDB, addToListCall, app) {
        this.bibDB = bibDB
        this.addToListCall = addToListCall
        this.tmpDB = false
        this.app = app
    }

    init() {
        if (this.app.isOffline()) {
            (0,_common__rspack_import_0.addAlert)(
                "info",
                gettext(
                    "You are currently offline. Please try again when you are back online."
                )
            )
            return
        }
        const buttons = [
            {
                text: gettext("Import"),
                classes: "fw-dark submit-import",
                click: () => {
                    let bibFile = document.getElementById("bib-uploader").files
                    if (0 === bibFile.length) {
                        return false
                    }
                    bibFile = bibFile[0]
                    if (10485760 < bibFile.size) {
                        return false
                    }
                    if (this.app.isOffline()) {
                        (0,_common__rspack_import_0.addAlert)(
                            "info",
                            gettext(
                                "You are currently offline. Please try again when you are back online."
                            )
                        )
                        dialog.close()
                        return false
                    }
                    (0,_common__rspack_import_0.activateWait)()
                    const reader = new window.FileReader()
                    reader.onload = event => {
                        Promise.resolve(/* import() */).then(__webpack_require__.bind(__webpack_require__, "./js/modules/bibliography/import/bibliography_import.js")).then(
                            ({BibliographyImporter}) => {
                                const importer = new BibliographyImporter(
                                    event.target.result,
                                    this.bibDB,
                                    this.addToListCall,
                                    () => (0,_common__rspack_import_0.deactivateWait)()
                                )
                                importer.init()
                            }
                        )
                    }
                    reader.readAsText(bibFile)
                    dialog.close()
                }
            },
            {
                type: "cancel"
            }
        ]
        const dialog = new _common__rspack_import_0.Dialog({
            id: "importbibtex",
            title: gettext("Import a bibliography"),
            body: (0,_templates__rspack_import_1.importBibFileTemplate)(),
            height: 200,
            buttons
        })
        dialog.open()
        document
            .getElementById("bib-uploader")
            .addEventListener(
                "change",
                () =>
                    (document.getElementById("import-bib-name").innerHTML =
                        document
                            .getElementById("bib-uploader")
                            .value.replace(/C:\\fakepath\\/i, ""))
            )
        document
            .getElementById("import-bib-btn")
            .addEventListener("click", () =>
                document.getElementById("bib-uploader").click()
            )
    }
}


}),
"./js/modules/bibliography/import/index.js": (function (__unused_rspack_module, __webpack_exports__, __webpack_require__) {
"use strict";
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  BibliographyFileImportDialog: function() { return /* reexport safe */ _dialog__rspack_import_0.BibliographyFileImportDialog; },
  BibliographyImporter: function() { return /* reexport safe */ _bibliography_import__rspack_import_1.BibliographyImporter; }
});
/* import */ var _dialog__rspack_import_0 = __webpack_require__("./js/modules/bibliography/import/dialog.js");
/* import */ var _bibliography_import__rspack_import_1 = __webpack_require__("./js/modules/bibliography/import/bibliography_import.js");




}),
"./js/modules/bibliography/import/templates.js": (function (__unused_rspack_module, __webpack_exports__, __webpack_require__) {
"use strict";
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  importBibFileTemplate: function() { return importBibFileTemplate; }
});
/** a template for the bibliography file import dialog */
const importBibFileTemplate = () =>
    `<form id="import-bib-form" method="post" enctype="multipart/form-data" class="ajax-upload">
        <input type="file" id="bib-uploader" name="bib" required />
        <span id="import-bib-btn" class="fw-button fw-light fw-large">
            ${gettext("Select a file")}
        </span>
        <label id="import-bib-name" class="ajax-upload-label"></label>
        <div class="import-format-info" style="margin-top: 10px; font-size: 0.9em; color: #666;">
            ${gettext("Supported formats: BibTeX/BibLaTeX, CSL-JSON, RIS, EndNote XML, EndNote Tagged, Citavi XML, Citavi JSON, NBIB/PubMed, ODT citations, DOCX citations")}
        </div>
    </form>`


}),
"./js/modules/documents/overview/actions.js": (function (__unused_rspack_module, __webpack_exports__, __webpack_require__) {
"use strict";
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  DocumentOverviewActions: function() { return DocumentOverviewActions; }
});
/* import */ var _common__rspack_import_0 = __webpack_require__("./js/modules/common/index.js");
/* import */ var _editor_e2ee_key_manager__rspack_import_1 = __webpack_require__("./js/modules/editor/e2ee/key-manager.js");
/* import */ var _editor_e2ee_password_dialog__rspack_import_2 = __webpack_require__("./js/modules/editor/e2ee/password-dialog.js");
/* import */ var _exporter_native__rspack_import_3 = __webpack_require__("./js/modules/exporter/native/index.js");
/* import */ var _importer_native__rspack_import_4 = __webpack_require__("./js/modules/importer/native/index.js");
/* import */ var _importer_register__rspack_import_5 = __webpack_require__("./js/modules/importer/register.js");
/* import */ var _revisions__rspack_import_6 = __webpack_require__("./js/modules/documents/revisions/index.js");
/* import */ var _tools__rspack_import_7 = __webpack_require__("./js/modules/documents/tools.js");
/* import */ var _templates__rspack_import_8 = __webpack_require__("./js/modules/documents/overview/templates.js");










class DocumentOverviewActions {
    constructor(documentOverview) {
        documentOverview.mod.actions = this
        this.documentOverview = documentOverview
    }

    deleteDocument(id) {
        const doc = this.documentOverview.documentList.find(
            doc => doc.id === id
        )
        if (!doc) {
            return Promise.resolve()
        }
        return (0,_common__rspack_import_0.jsonPostJson)("/api/document/delete/", {id}).then(({json}) => {
            if (json.done) {
                (0,_common__rspack_import_0.addAlert)(
                    "success",
                    `${gettext("Document has been deleted")}: '${(0,_common__rspack_import_0.escapeText)((0,_common__rspack_import_0.longFilePath)(doc.title, doc.path))}'`
                )
                this.documentOverview.documentList =
                    this.documentOverview.documentList.filter(
                        doc => doc.id !== id
                    )
                this.documentOverview.initTable()
            } else {
                (0,_common__rspack_import_0.addAlert)(
                    "error",
                    `${gettext("Could not delete document")}: '${(0,_common__rspack_import_0.escapeText)((0,_common__rspack_import_0.longFilePath)(doc.title, doc.path))}'`
                )
            }
        })
    }

    deleteDocumentDialog(ids, app) {
        if (app.isOffline()) {
            (0,_common__rspack_import_0.addAlert)(
                "info",
                gettext("You cannot delete a document while you are offline.")
            )
            return
        }
        const docPaths = ids.map(id => {
            const doc = this.documentOverview.documentList.find(
                doc => doc.id === id
            )
            return (0,_common__rspack_import_0.escapeText)((0,_common__rspack_import_0.longFilePath)(doc.title, doc.path))
        })
        const confirmDeletionDialog = new _common__rspack_import_0.Dialog({
            title: gettext("Confirm deletion"),
            body: `<p>
                ${
                    ids.length > 1
                        ? gettext(
                              "Do you really want to delete the following documents?"
                          )
                        : gettext(
                              "Do you really want to delete the following document?"
                          )
                }
                </p>
                <p>
                ${docPaths.join("<br>")}
                </p>`,
            id: "confirmdeletion",
            icon: "exclamation-triangle",
            buttons: [
                {
                    text: gettext("Delete"),
                    classes: "fw-dark",
                    height: Math.min(50 + 15 * ids.length, 500),
                    click: () => {
                        Promise.all(
                            ids.map(id => this.deleteDocument(id))
                        ).then(() => {
                            confirmDeletionDialog.close()
                            this.documentOverview.initTable()
                        })
                    }
                },
                {
                    type: "cancel"
                }
            ]
        })

        confirmDeletionDialog.open()
    }

    importFidus() {
        const buttons = [
            {
                text: gettext("Import"),
                classes: "fw-dark",
                click: () => {
                    let fidusFile =
                        document.getElementById("fidus-uploader").files
                    if (0 === fidusFile.length) {
                        return false
                    }
                    fidusFile = fidusFile[0]
                    if (104857600 < fidusFile.size) {
                        //TODO: This is an arbitrary size. What should be done with huge import files?
                        return false
                    }
                    (0,_common__rspack_import_0.activateWait)()

                    const importer = new _importer_native__rspack_import_4.FidusFileImporter(
                        fidusFile,
                        this.documentOverview.user,
                        this.documentOverview.path,
                        true,
                        this.documentOverview.contacts
                    )

                    importer
                        .init()
                        .then(({ok, statusText, doc}) => {
                            ;(0,_common__rspack_import_0.deactivateWait)()
                            if (ok) {
                                (0,_common__rspack_import_0.addAlert)("info", statusText)
                            } else {
                                (0,_common__rspack_import_0.addAlert)("error", statusText)
                                return
                            }
                            this.documentOverview.documentList.push(doc)
                            this.documentOverview.initTable()
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
            id: "importfidus",
            title: gettext("Import a Fidus file"),
            body: (0,_templates__rspack_import_8.importFidusTemplate)(),
            height: 100,
            buttons
        })
        importDialog.open()

        document
            .getElementById("fidus-uploader")
            .addEventListener("change", () => {
                document.getElementById("import-fidus-name").innerHTML =
                    document
                        .getElementById("fidus-uploader")
                        .value.replace(/C:\\fakepath\\/i, "")
            })

        document
            .getElementById("import-fidus-btn")
            .addEventListener("click", event => {
                document.getElementById("fidus-uploader").click()
                event.preventDefault()
            })
    }

    importExternal() {
        const importIds = Object.keys(this.documentOverview.documentTemplates)
        let importId = importIds[0] // Default to first template

        const templateSelector =
            importIds.length > 1
                ? `<label for="import-template-selector">${gettext("Import as:")}</label>
                <div class="fw-select-container">
                    <select class="fw-button fw-light fw-large" id="import-template-selector">
                        ${Object.entries(
                            this.documentOverview.documentTemplates
                        )
                            .map(
                                ([key, template]) =>
                                    `<option value="${(0,_common__rspack_import_0.escapeText)(key)}">${(0,_common__rspack_import_0.escapeText)(template.title)}</option>`
                            )
                            .join("")}
                    </select>
                    <div class="fw-select-arrow fa fa-caret-down"></div>
                </div>`
                : ""

        const buttons = [
            {
                text: gettext("Import"),
                classes: "fw-dark",
                click: () => {
                    let file =
                        document.getElementById("external-uploader").files
                    if (0 === file.length) {
                        return false
                    }
                    file = file[0]
                    if (104857600 < file.size) {
                        (0,_common__rspack_import_0.addAlert)("error", gettext("File too large"))
                        return false
                    }

                    if (file.type === "application/zip") {
                        return Promise.resolve(/* import() */).then(__webpack_require__.t.bind(__webpack_require__, "./node_modules/.pnpm/jszip@3.10.1/node_modules/jszip/dist/jszip.min.js", 23)).then(({default: JSZip}) => {
                            return JSZip.loadAsync(file).then(zip => {
                                const importerInfo =
                                    _importer_register__rspack_import_5.importerRegistry.getZipImporter(zip)

                                if (!importerInfo) {
                                    (0,_common__rspack_import_0.addAlert)(
                                        "error",
                                        gettext(
                                            "No importable files found in ZIP"
                                        )
                                    )
                                    return false
                                }

                                (0,_common__rspack_import_0.activateWait)()

                                return importerInfo
                                    .getContents()
                                    .then(files => {
                                        const importer =
                                            new importerInfo.importer(
                                                files.mainContent,
                                                this.documentOverview.user,
                                                this.documentOverview.path,
                                                importId,
                                                files
                                            )

                                        return importer
                                            .init()
                                            .then(({ok, statusText, doc}) => {
                                                ;(0,_common__rspack_import_0.deactivateWait)()
                                                if (ok) {
                                                    (0,_common__rspack_import_0.addAlert)("info", statusText)
                                                } else {
                                                    (0,_common__rspack_import_0.addAlert)(
                                                        "error",
                                                        statusText
                                                    )
                                                    return
                                                }
                                                this.documentOverview.documentList.push(
                                                    doc
                                                )
                                                this.documentOverview.initTable()
                                                importDialog.close()
                                            })
                                    })
                                    .catch(_error => {
                                        (0,_common__rspack_import_0.deactivateWait)()
                                    })
                            })
                        })
                    }

                    // Get file extension
                    const fileExtension = file.name
                        .split(".")
                        .pop()
                        .toLowerCase()
                    const importerInfo =
                        _importer_register__rspack_import_5.importerRegistry.getImporter(fileExtension)

                    if (!importerInfo) {
                        (0,_common__rspack_import_0.addAlert)("error", gettext("Unsupported file format"))
                        return false
                    }

                    // Get selected template if multiple templates exist
                    if (importIds.length > 1) {
                        importId = document.getElementById(
                            "import-template-selector"
                        ).value
                    }

                    (0,_common__rspack_import_0.activateWait)()

                    const options = {
                        bibDB: this.documentOverview.app.bibDB,
                        files: {} // Additional files to import
                    }

                    const importer = new importerInfo.importer(
                        file,
                        this.documentOverview.user,
                        this.documentOverview.path,
                        importId,
                        options
                    )

                    importer
                        .init()
                        .then(({ok, statusText, doc}) => {
                            ;(0,_common__rspack_import_0.deactivateWait)()
                            if (ok) {
                                (0,_common__rspack_import_0.addAlert)("info", statusText)
                            } else {
                                (0,_common__rspack_import_0.addAlert)("error", statusText)
                                return
                            }
                            this.documentOverview.documentList.push(doc)
                            this.documentOverview.initTable()
                            importDialog.close()
                        })
                        .catch(() => false)
                }
            },
            {
                type: "cancel"
            }
        ]
        const supportedDescriptions = Object.entries(
            _importer_register__rspack_import_5.importerRegistry.getAllDescriptions()
        )
            .map(
                ([description, extensions]) =>
                    `${description} (${extensions.join(", ")})`
            )
            .join("<br>")
        const supportedFormats = _importer_register__rspack_import_5.importerRegistry.getAllFormats()

        const importDialog = new _common__rspack_import_0.Dialog({
            id: "import_external",
            title: gettext("Import a text document in a different format"),
            body: `
            <form>
                ${templateSelector}
                <div class="fw-select-container">
                    <div class="fw-select-head">
                        <button type="button" class="fw-button fw-light fw-large" id="import-external-btn">
                            ${gettext("Select a file")}
                        </button>
                        <label id="import-external-name" class="ajax-upload-label"></label>
                    </div>
                    <input id="external-uploader" type="file" accept="${supportedFormats.map(format => `.${format}`).join(",")},.zip" style="display: none;">
                </div>
            </form>
            <div class="noteEl">${gettext("Supported formats")}:</div>
            <div class="noteEl">${supportedDescriptions}</div>
            <div class="noteEl">${gettext("You can also upload a ZIP file that contains one file in any of these formats as well as images and/or bibtex file.")}</div>`,
            height:
                (importIds.length > 1 ? 250 : 200) +
                supportedFormats.length * 12,
            buttons
        })
        importDialog.open()

        document
            .getElementById("external-uploader")
            .addEventListener("change", () => {
                document.getElementById("import-external-name").innerHTML =
                    document
                        .getElementById("external-uploader")
                        .value.replace(/C:\\fakepath\\/i, "")
            })

        document
            .getElementById("import-external-btn")
            .addEventListener("click", event => {
                document.getElementById("external-uploader").click()
                event.preventDefault()
            })
    }

    copyFiles(ids) {
        (0,_tools__rspack_import_7.getMissingDocumentListData)(
            ids,
            this.documentOverview.documentList,
            this.documentOverview.schema
        ).then(() => {
            ids.forEach(id => {
                const doc = this.documentOverview.documentList.find(
                    entry => entry.id === id
                )
                const copier = new _exporter_native__rspack_import_3.SaveCopy(
                    doc,
                    {db: doc.bibliography},
                    {db: doc.images},
                    this.documentOverview.user
                )

                copier
                    .init()
                    .then(({doc}) => {
                        this.documentOverview.documentList.push(doc)
                        this.documentOverview.initTable()
                    })
                    .catch(() => false)
            })
        })
    }

    copyFilesAs(ids) {
        (0,_tools__rspack_import_7.getMissingDocumentListData)(
            ids,
            this.documentOverview.documentList,
            this.documentOverview.schema
        ).then(() => {
            const docs = ids.map(id =>
                this.documentOverview.documentList.find(
                    entry => entry.id === id
                )
            )
            const allE2EE = docs.every(doc => doc.e2ee)
            const anyE2EE = docs.some(doc => doc.e2ee)
            const e2eeMode = this.documentOverview.app.settings.E2EE_MODE

            const canToggleE2EE =
                e2eeMode === "enabled" ||
                (e2eeMode === "required" && !allE2EE) ||
                (e2eeMode === "disabled" && anyE2EE)

            let e2eeHtml = ""
            if (canToggleE2EE) {
                const checked =
                    e2eeMode === "required" || allE2EE ? "checked" : ""
                e2eeHtml = `
                        <div class="e2ee-copy-toggle" style="margin-top: 15px;">
                            <label>
                                <input type="checkbox" id="e2ee-copy-toggle" ${checked}>
                                ${gettext("Encrypt the copy")}
                            </label>
                        </div>
                    `
            }

            const selectTemplateDialog = new _common__rspack_import_0.Dialog({
                title: gettext("Choose document template"),
                body: `<p>
                        ${ids.length > 1 ? gettext("Select document template for copies") : gettext("Select document template for copy.")}
                        </p>
                        <select class="fw-button fw-large fw-light">${Object.entries(
                            this.documentOverview.documentTemplates
                        )
                            .map(
                                ([importId, dt]) =>
                                    `<option value="${(0,_common__rspack_import_0.escapeText)(importId)}">${(0,_common__rspack_import_0.escapeText)(dt.title)}</option>`
                            )
                            .join("")}</select>
                        ${e2eeHtml}`,
                buttons: [
                    {
                        text: gettext("Copy"),
                        classes: "fw-dark",
                        click: () => {
                            const targetE2EE =
                                canToggleE2EE &&
                                selectTemplateDialog.dialogEl.querySelector(
                                    "#e2ee-copy-toggle"
                                )?.checked

                            const doCopy = (sourceKey, targetPassword) => {
                                ids.forEach(id => {
                                    const doc =
                                        this.documentOverview.documentList.find(
                                            entry => entry.id === id
                                        )
                                    const e2eeOptions = {}
                                    if (doc.e2ee && sourceKey) {
                                        e2eeOptions.sourceKey = sourceKey
                                    }
                                    if (targetE2EE && targetPassword) {
                                        e2eeOptions.targetE2EE = true
                                        e2eeOptions.targetPassword =
                                            targetPassword
                                    }

                                    const copier = new _exporter_native__rspack_import_3.SaveCopy(
                                        doc,
                                        {db: doc.bibliography},
                                        {db: doc.images},
                                        this.documentOverview.user,
                                        selectTemplateDialog.dialogEl.querySelector(
                                            "select"
                                        ).value,
                                        e2eeOptions
                                    )

                                    copier
                                        .init()
                                        .then(({doc}) => {
                                            this.documentOverview.documentList.push(
                                                doc
                                            )
                                            this.documentOverview.initTable()
                                        })
                                        .catch(error => {
                                            console.error(error)
                                            ;(0,_common__rspack_import_0.addAlert)(
                                                "error",
                                                gettext(
                                                    "Could not copy document."
                                                )
                                            )
                                        })
                                })
                                selectTemplateDialog.close()
                            }

                            if (anyE2EE && !targetE2EE) {
                                (0,_editor_e2ee_password_dialog__rspack_import_2.enterPasswordDialog)(async password => {
                                    try {
                                        const sampleDoc = docs.find(
                                            doc => doc.e2ee
                                        )
                                        const salt = new Uint8Array(
                                            atob(sampleDoc.e2ee_salt)
                                                .split("")
                                                .map(c => c.charCodeAt(0))
                                        )
                                        const key =
                                            await _editor_e2ee_key_manager__rspack_import_1.E2EEKeyManager.deriveKey(
                                                password,
                                                salt,
                                                sampleDoc.e2ee_iterations ||
                                                    600000
                                            )
                                        doCopy(key, null)
                                    } catch (_err) {
                                        (0,_common__rspack_import_0.addAlert)(
                                            "error",
                                            gettext("Incorrect password.")
                                        )
                                    }
                                })
                            } else if (!anyE2EE && targetE2EE) {
                                (0,_editor_e2ee_password_dialog__rspack_import_2.createPasswordDialog)(password => {
                                    doCopy(null, password)
                                })
                            } else if (anyE2EE && targetE2EE) {
                                (0,_editor_e2ee_password_dialog__rspack_import_2.enterPasswordDialog)(async password => {
                                    try {
                                        const sampleDoc = docs.find(
                                            doc => doc.e2ee
                                        )
                                        const salt = new Uint8Array(
                                            atob(sampleDoc.e2ee_salt)
                                                .split("")
                                                .map(c => c.charCodeAt(0))
                                        )
                                        const key =
                                            await _editor_e2ee_key_manager__rspack_import_1.E2EEKeyManager.deriveKey(
                                                password,
                                                salt,
                                                sampleDoc.e2ee_iterations ||
                                                    600000
                                            )
                                        ;(0,_editor_e2ee_password_dialog__rspack_import_2.createPasswordDialog)(targetPassword => {
                                            doCopy(key, targetPassword)
                                        })
                                    } catch (_err) {
                                        (0,_common__rspack_import_0.addAlert)(
                                            "error",
                                            gettext("Incorrect password.")
                                        )
                                    }
                                })
                            } else {
                                doCopy(null, null)
                            }
                        }
                    },
                    {
                        type: "cancel"
                    }
                ]
            })
            selectTemplateDialog.open()
        })
    }

    downloadNativeFiles(ids) {
        (0,_tools__rspack_import_7.getMissingDocumentListData)(
            ids,
            this.documentOverview.documentList,
            this.documentOverview.schema
        ).then(() =>
            ids.forEach(id => {
                const doc = this.documentOverview.documentList.find(
                    entry => entry.id === id
                )
                new _exporter_native__rspack_import_3.ExportFidusFile(
                    doc,
                    {db: doc.bibliography},
                    {db: doc.images}
                )
            })
        )
    }

    downloadSlimNativeFiles(ids) {
        (0,_tools__rspack_import_7.getMissingDocumentListData)(
            ids,
            this.documentOverview.documentList,
            this.documentOverview.schema
        ).then(() =>
            ids.forEach(id => {
                const doc = this.documentOverview.documentList.find(
                    entry => entry.id === id
                )
                new _exporter_native__rspack_import_3.ExportFidusFile(
                    doc,
                    {db: doc.bibliography},
                    {db: doc.images},
                    false
                )
            })
        )
    }

    downloadHTMLFiles(ids) {
        (0,_tools__rspack_import_7.getMissingDocumentListData)(
            ids,
            this.documentOverview.documentList,
            this.documentOverview.schema
        ).then(() =>
            ids.forEach(id => {
                const doc = this.documentOverview.documentList.find(
                    entry => entry.id === id
                )
                Promise.all(/* import() */ [__webpack_require__.e("vendors-node_modules_pnpm_mathlive_0_104_0_node_modules_mathlive_dist_mathlive_mjs"), __webpack_require__.e("vendors-node_modules_pnpm_pretty_2_0_0_node_modules_pretty_index_js"), __webpack_require__.e("js_modules_exporter_html_index_js")]).then(__webpack_require__.bind(__webpack_require__, "./js/modules/exporter/html/index.js")).then(({HTMLExporter}) => {
                    const exporter = new HTMLExporter(
                        doc,
                        {db: doc.bibliography},
                        {db: doc.images},
                        this.documentOverview.app.csl,
                        new Date(doc.updated * 1000),
                        this.documentOverview.documentStyles
                    )
                    exporter.init()
                })
            })
        )
    }

    downloadTemplateExportFiles(ids, templateUrl, templateType) {
        (0,_tools__rspack_import_7.getMissingDocumentListData)(
            ids,
            this.documentOverview.documentList,
            this.documentOverview.schema
        ).then(() => {
            ids.forEach(id => {
                const doc = this.documentOverview.documentList.find(
                    entry => entry.id === id
                )
                if (templateType === "docx") {
                    Promise.all(/* import() */ [__webpack_require__.e("vendors-node_modules_pnpm_mathml2omml_0_5_0_node_modules_mathml2omml_dist_index_js"), __webpack_require__.e("js_modules_bibliography_schema_csl_bib_js-js_modules_exporter_tools_doc_content_js-js_modules-d5afa0"), __webpack_require__.e("js_modules_exporter_docx_index_js")]).then(__webpack_require__.bind(__webpack_require__, "./js/modules/exporter/docx/index.js")).then(({DOCXExporter}) => {
                        const exporter = new DOCXExporter(
                            doc,
                            templateUrl,
                            {db: doc.bibliography},
                            {db: doc.images},
                            this.documentOverview.app.csl
                        )
                        exporter.init()
                    })
                } else {
                    Promise.all(/* import() */ [__webpack_require__.e("js_modules_bibliography_schema_csl_bib_js-js_modules_exporter_tools_doc_content_js-js_modules-d5afa0"), __webpack_require__.e("js_modules_exporter_odt_index_js")]).then(__webpack_require__.bind(__webpack_require__, "./js/modules/exporter/odt/index.js")).then(({ODTExporter}) => {
                        const exporter = new ODTExporter(
                            doc,
                            templateUrl,
                            {db: doc.bibliography},
                            {db: doc.images},
                            this.documentOverview.app.csl
                        )
                        exporter.init()
                    })
                }
            })
        })
    }

    downloadLatexFiles(ids) {
        (0,_tools__rspack_import_7.getMissingDocumentListData)(
            ids,
            this.documentOverview.documentList,
            this.documentOverview.schema
        ).then(() =>
            ids.forEach(id => {
                const doc = this.documentOverview.documentList.find(
                    entry => entry.id === id
                )
                __webpack_require__.e(/* import() */ "js_modules_exporter_latex_index_js").then(__webpack_require__.bind(__webpack_require__, "./js/modules/exporter/latex/index.js")).then(({LatexExporter}) => {
                    const exporter = new LatexExporter(
                        doc,
                        {db: doc.bibliography},
                        {db: doc.images},
                        new Date(doc.updated * 1000)
                    )
                    exporter.init()
                })
            })
        )
    }

    downloadJATSFiles(ids) {
        (0,_tools__rspack_import_7.getMissingDocumentListData)(
            ids,
            this.documentOverview.documentList,
            this.documentOverview.schema
        ).then(() =>
            ids.forEach(id => {
                const doc = this.documentOverview.documentList.find(
                    entry => entry.id === id
                )
                Promise.all(/* import() */ [__webpack_require__.e("vendors-node_modules_pnpm_mathlive_0_104_0_node_modules_mathlive_dist_mathlive_mjs"), __webpack_require__.e("vendors-node_modules_pnpm_pretty_2_0_0_node_modules_pretty_index_js"), __webpack_require__.e("js_modules_exporter_jats_index_js")]).then(__webpack_require__.bind(__webpack_require__, "./js/modules/exporter/jats/index.js")).then(({JATSExporter}) => {
                    const exporter = new JATSExporter(
                        doc,
                        {db: doc.bibliography},
                        {db: doc.images},
                        this.documentOverview.app.csl,
                        new Date(doc.updated * 1000),
                        "article"
                    )
                    exporter.init()
                })
            })
        )
    }

    downloadBITSFiles(ids) {
        (0,_tools__rspack_import_7.getMissingDocumentListData)(
            ids,
            this.documentOverview.documentList,
            this.documentOverview.schema
        ).then(() =>
            ids.forEach(id => {
                const doc = this.documentOverview.documentList.find(
                    entry => entry.id === id
                )
                Promise.all(/* import() */ [__webpack_require__.e("vendors-node_modules_pnpm_mathlive_0_104_0_node_modules_mathlive_dist_mathlive_mjs"), __webpack_require__.e("vendors-node_modules_pnpm_pretty_2_0_0_node_modules_pretty_index_js"), __webpack_require__.e("js_modules_exporter_jats_index_js")]).then(__webpack_require__.bind(__webpack_require__, "./js/modules/exporter/jats/index.js")).then(({JATSExporter}) => {
                    const exporter = new JATSExporter(
                        doc,
                        {db: doc.bibliography},
                        {db: doc.images},
                        this.documentOverview.app.csl,
                        new Date(doc.updated * 1000),
                        "book-part-wrapper"
                    )
                    exporter.init()
                })
            })
        )
    }

    downloadEpubFiles(ids) {
        (0,_tools__rspack_import_7.getMissingDocumentListData)(
            ids,
            this.documentOverview.documentList,
            this.documentOverview.schema
        ).then(() =>
            ids.forEach(id => {
                const doc = this.documentOverview.documentList.find(
                    entry => entry.id === id
                )
                Promise.all(/* import() */ [__webpack_require__.e("vendors-node_modules_pnpm_mathlive_0_104_0_node_modules_mathlive_dist_mathlive_mjs"), __webpack_require__.e("vendors-node_modules_pnpm_pretty_2_0_0_node_modules_pretty_index_js"), __webpack_require__.e("js_modules_exporter_html_index_js"), __webpack_require__.e("js_modules_exporter_epub_index_js")]).then(__webpack_require__.bind(__webpack_require__, "./js/modules/exporter/epub/index.js")).then(({EpubExporter}) => {
                    const exporter = new EpubExporter(
                        doc,
                        {db: doc.bibliography},
                        {db: doc.images},
                        this.documentOverview.app.csl,
                        new Date(doc.updated * 1000),
                        this.documentOverview.documentStyles
                    )
                    exporter.init()
                })
            })
        )
    }

    revisionsDialog(documentId, app) {
        if (app.isOffline()) {
            (0,_common__rspack_import_0.addAlert)(
                "info",
                gettext(
                    "You cannot view the revision history of a document while you are offline."
                )
            )
            return
        }
        const revDialog = new _revisions__rspack_import_6.DocumentRevisionsDialog(
            documentId,
            this.documentOverview.documentList,
            this.documentOverview.user
        )
        revDialog.init().then(actionObject => {
            switch (actionObject.action) {
                case "added-document":
                    this.documentOverview.documentList.push(actionObject.doc)
                    this.documentOverview.initTable()
                    break
                case "deleted-revision":
                    actionObject.doc.revisions =
                        actionObject.doc.revisions.filter(
                            rev => rev.pk !== actionObject.id
                        )
                    this.documentOverview.initTable()
                    break
            }
        })
    }
}


}),
"./js/modules/documents/overview/index.js": (function (__unused_rspack_module, __webpack_exports__, __webpack_require__) {
"use strict";
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  DocumentOverview: function() { return DocumentOverview; }
});
/* import */ var fast_deep_equal__rspack_import_0 = __webpack_require__("./node_modules/.pnpm/fast-deep-equal@3.1.3/node_modules/fast-deep-equal/index.js");
/* import */ var fast_deep_equal__rspack_import_0_default = /*#__PURE__*/__webpack_require__.n(fast_deep_equal__rspack_import_0);
/* import */ var simple_datatables__rspack_import_1 = __webpack_require__("./node_modules/.pnpm/simple-datatables@10.2.0/node_modules/simple-datatables/dist/module.js");
/* import */ var w3c_keyname__rspack_import_2 = __webpack_require__("./node_modules/.pnpm/w3c-keyname@2.2.8/node_modules/w3c-keyname/index.js");
/* import */ var _plugins_documents_overview__rspack_import_3 = __webpack_require__("./js/plugins/documents_overview/index.js");
/* import */ var _plugins_documents_overview__rspack_import_3_default = /*#__PURE__*/__webpack_require__.n(_plugins_documents_overview__rspack_import_3);
/* import */ var _common__rspack_import_4 = __webpack_require__("./js/modules/common/index.js");
/* import */ var _feedback__rspack_import_5 = __webpack_require__("./js/modules/feedback/index.js");
/* import */ var _menu__rspack_import_6 = __webpack_require__("./js/modules/menu/index.js");
/* import */ var _schema_document__rspack_import_7 = __webpack_require__("./js/modules/schema/document/index.js");
/* import */ var _access_rights__rspack_import_8 = __webpack_require__("./js/modules/documents/access_rights/index.js");
/* import */ var _actions__rspack_import_9 = __webpack_require__("./js/modules/documents/overview/actions.js");
/* import */ var _menu__rspack_import_10 = __webpack_require__("./js/modules/documents/overview/menu.js");
/* import */ var _templates__rspack_import_11 = __webpack_require__("./js/modules/documents/overview/templates.js");













/*
 * Helper functions for the document overview page.
 */

class DocumentOverview {
    constructor({app, user}, path = "/") {
        this.app = app
        this.user = user
        this.path = path
        this.schema = _schema_document__rspack_import_7.docSchema
        this.documentList = []
        this.contacts = []
        this.mod = {}
        this.lastSort = {column: 0, dir: "asc"}
        this.active = false
    }

    init() {
        if (this.active) {
            return Promise.resolve()
        }
        this.active = true
        return (0,_common__rspack_import_4.whenReady)().then(() => {
            this.render()
            const smenu = new _menu__rspack_import_6.SiteMenu(this.app, "documents")
            smenu.init()
            new _actions__rspack_import_9.DocumentOverviewActions(this)
            this.menu = new _common__rspack_import_4.OverviewMenuView(this, _menu__rspack_import_10.menuModel)
            this.menu.init()
            this.dtBulkModel = (0,_menu__rspack_import_10.bulkMenuModel)()
            this.activateFidusPlugins()
            this.bind()
            return this.getDocumentListData()
                .then(() => this.bulkDecryptDocumentEncryptionKeys())
                .then(() => (0,_common__rspack_import_4.deactivateWait)())
        })
    }

    render() {
        this.dom = document.createElement("body")
        this.dom.innerHTML = (0,_common__rspack_import_4.baseBodyTemplate)({
            contents: "",
            user: this.user,
            hasOverview: true,
            app: this.app
        })
        ;(0,_common__rspack_import_4.ensureCSS)([
            staticUrl("css/document_overview.css"),
            staticUrl("css/add_remove_dialog.css"),
            staticUrl("css/access_rights_dialog.css"),
            staticUrl("css/e2ee.css")
        ])
        document.body = this.dom
        ;(0,_common__rspack_import_4.setDocTitle)(gettext("Document Overview"), this.app)
        const feedbackTab = new _feedback__rspack_import_5.FeedbackTab()
        feedbackTab.init()
    }

    bind() {
        this.dom.addEventListener("click", event => {
            const el = {}
            let docId
            switch (true) {
                case (0,_common__rspack_import_4.findTarget)(event, ".revisions", el): {
                    docId = Number.parseInt(el.target.dataset.id)
                    this.mod.actions.revisionsDialog(docId, this.app)
                    break
                }
                case (0,_common__rspack_import_4.findTarget)(event, ".delete-document", el):
                    docId = Number.parseInt(el.target.dataset.id)
                    this.mod.actions.deleteDocumentDialog([docId], this.app)
                    break
                case (0,_common__rspack_import_4.findTarget)(event, ".delete-folder", el): {
                    const ids = el.target.dataset.ids
                        .split(",")
                        .map(id => Number.parseInt(id))
                    this.mod.actions.deleteDocumentDialog(ids, this.app)
                    break
                }
                case (0,_common__rspack_import_4.findTarget)(event, ".owned-by-user.rights", el): {
                    if (this.app.isOffline()) {
                        (0,_common__rspack_import_4.addAlert)(
                            "info",
                            gettext(
                                "You cannot access rights data of a document while you are offline."
                            )
                        )
                    } else {
                        docId = Number.parseInt(el.target.dataset.id)
                        const dialog = new _access_rights__rspack_import_8.DocumentAccessRightsDialog(
                            [docId],
                            this.contacts,
                            memberDetails => this.contacts.push(memberDetails),
                            false,
                            "",
                            null,
                            this.app.settings
                        )
                        dialog.init()
                    }
                    break
                }
                case (0,_common__rspack_import_4.findTarget)(event, "a.fw-data-table-title.parentdir", el):
                    event.preventDefault()
                    if (this.table.data.data.length > 0) {
                        this.path = el.target.dataset.path
                        window.history.pushState(
                            {},
                            "",
                            el.target.getAttribute("href")
                        )
                        this.initTable()
                    } else {
                        const confirmFolderDeletionDialog = new _common__rspack_import_4.Dialog({
                            title: gettext("Confirm deletion"),
                            body: `<p>
                    ${gettext("Leaving an empty folder will delete it. Do you really want to delete this folder?")}
                            </p>`,
                            id: "confirmfolderdeletion",
                            icon: "exclamation-triangle",
                            buttons: [
                                {
                                    text: gettext("Delete"),
                                    classes: "fw-dark delete-folder",
                                    height: 70,
                                    click: () => {
                                        confirmFolderDeletionDialog.close()
                                        this.path = el.target.dataset.path
                                        window.history.pushState(
                                            {},
                                            "",
                                            el.target.getAttribute("href")
                                        )
                                        this.initTable()
                                    }
                                },
                                {
                                    type: "cancel"
                                }
                            ]
                        })

                        confirmFolderDeletionDialog.open()
                    }

                    break
                case (0,_common__rspack_import_4.findTarget)(event, "a.fw-data-table-title.subdir", el):
                    event.preventDefault()
                    this.path = el.target.dataset.path
                    window.history.pushState(
                        {},
                        "",
                        el.target.getAttribute("href")
                    )
                    this.initTable()
                    break
                case (0,_common__rspack_import_4.findTarget)(event, "a.fw-data-table-title", el):
                    event.preventDefault()
                    if (this.app.isOffline()) {
                        (0,_common__rspack_import_4.addAlert)(
                            "info",
                            gettext(
                                "You cannot open a document while you are offline."
                            )
                        )
                    } else {
                        this.app.goTo(el.target.getAttribute("href"))
                    }
                    break
                default:
                    break
            }
        })
    }

    activateFidusPlugins() {
        // Add plugins.
        this.plugins = {}

        Object.keys(_plugins_documents_overview__rspack_import_3).forEach(plugin => {
            if (typeof _plugins_documents_overview__rspack_import_3[plugin] === "function") {
                this.plugins[plugin] = new _plugins_documents_overview__rspack_import_3[plugin](this)
                this.plugins[plugin].init()
            }
        })
    }

    getDocumentListData() {
        const cachedPromise = this.showCached()
        if (this.app.isOffline()) {
            return cachedPromise
        }
        return (0,_common__rspack_import_4.whenReady)()
            .then(() => (0,_common__rspack_import_4.jsonPostJson)("/api/document/documentlist/"))
            .then(({json}) => {
                return cachedPromise.then(oldJson => {
                    if (!fast_deep_equal__rspack_import_0_default()(json, oldJson)) {
                        this.updateIndexedDB(json)
                        this.initializeView(json)
                    }
                })
            })
            .catch(error => {
                if (this.app.isOffline()) {
                    return cachedPromise
                } else {
                    (0,_common__rspack_import_4.addAlert)("error", gettext("Document data loading failed."))
                    throw error
                }
            })
    }

    async bulkDecryptDocumentEncryptionKeys() {
        /**
         * Fetch all DocumentEncryptionKey instances for the user
         * and decrypt as many as possible using keys from sessionStorage.
         * This allows the overview to show more documents decrypted.
         */
        try {
            const response = await (0,_common__rspack_import_4.jsonPostJson)(
                "/api/document/encryption_key/get_all/",
                {}
            )

            if (!response.json?.keys?.length) {
                return
            }

            const {PassphraseCrypto} = await Promise.resolve(/* import() */).then(__webpack_require__.bind(__webpack_require__, "./js/modules/editor/e2ee/passphrase-crypto.js"))

            for (const keyData of response.json.keys) {
                const {document_id, encrypted_key, encrypted_with_master_key} =
                    keyData

                // Skip if key is already in session storage
                const sessionKey = sessionStorage.getItem(
                    `e2ee_key_${document_id}`
                )
                if (sessionKey) {
                    continue
                }

                // Only decrypt keys encrypted with master key (user's passphrase)
                if (!encrypted_with_master_key) {
                    continue
                }

                try {
                    // Try to decrypt using the master key
                    const masterKeyBase64 =
                        sessionStorage.getItem("e2ee_master_key")
                    if (!masterKeyBase64) {
                        continue
                    }

                    const masterKeyBytes = Uint8Array.from(
                        atob(masterKeyBase64),
                        c => c.charCodeAt(0)
                    )
                    const masterKey = await PassphraseCrypto.importKey(
                        masterKeyBytes,
                        "AES-GCM"
                    )

                    const dek = await PassphraseCrypto.decryptString(
                        encrypted_key,
                        masterKey
                    )

                    // Store the decrypted DEK in session storage
                    sessionStorage.setItem(`e2ee_key_${document_id}`, dek)
                } catch (_error) {
                    // Decryption failed, this is expected if user hasn't entered passphrase yet
                    continue
                }
            }
        } catch (_error) {
            // Silently fail - this is a best-effort operation
        }
    }

    showCached() {
        return this.loaddatafromIndexedDB().then(json => {
            if (!json) {
                (0,_common__rspack_import_4.activateWait)(true)
                return
            }
            return this.initializeView(json)
        })
    }

    loaddatafromIndexedDB() {
        return this.app.indexedDB
            .readAllData("document_data")
            .then(response => {
                if (!response.length) {
                    return false
                }
                const data = response[0]
                delete data.id
                return data
            })
    }

    updateIndexedDB(json) {
        json.id = 1
        // Clear data if any present
        return this.app.indexedDB
            .clearData("document_data")
            .then(() => this.app.indexedDB.insertData("document_data", [json]))
    }

    initializeView(json) {
        if (!this.active) {
            // page has been updated
            return json
        }
        const ids = new Set()
        this.documentList = json.documents.filter(doc => {
            if (ids.has(doc.id)) {
                return false
            }
            ids.add(doc.id)
            return true
        })

        this.contacts = json.contacts
        this.documentStyles = json.document_styles
        this.documentTemplates = json.document_templates
        this.initTable()
        // Attempt to decrypt E2EE titles for documents where the key is
        // available in sessionStorage but the title hasn't been cached yet.
        this.decryptE2EETitles()
        // Reset scroll position to top to prevent Safari from auto-scrolling
        // to the focused table element, which would hide the header/menu
        window.scrollTo(0, 0)
        if (Object.keys(this.documentTemplates).length > 1) {
            this.multipleNewDocumentMenuItem()
        } else {
            this.singleNewDocumentMenuItem()
        }
        return json
    }

    /**
     * For E2EE documents with an encrypted title (e2ee_title) and a key
     * available in sessionStorage, decrypt the title and update the DOM.
     */
    async decryptE2EETitles() {
        const e2eeDocs = this.documentList.filter(
            doc =>
                doc.e2ee &&
                doc.title &&
                sessionStorage.getItem(`e2ee_title_${doc.id}`) === null
        )
        if (!e2eeDocs.length) {
            return
        }
        const {E2EEKeyManager} = await Promise.resolve(/* import() */).then(__webpack_require__.bind(__webpack_require__, "./js/modules/editor/e2ee/key-manager.js"))
        const {E2EEEncryptor} = await Promise.resolve(/* import() */).then(__webpack_require__.bind(__webpack_require__, "./js/modules/editor/e2ee/encryptor.js"))
        for (const doc of e2eeDocs) {
            const key = await E2EEKeyManager.getKeyFromSession(doc.id)
            if (!key) {
                continue
            }
            try {
                const title = await E2EEEncryptor.decrypt(doc.title, key)
                sessionStorage.setItem(`e2ee_title_${doc.id}`, title)
                // Update the DOM element for this document's title
                const linkEl = document.querySelector(
                    `a.fw-data-table-title[href="/document/${doc.id}"]`
                )
                if (linkEl) {
                    const span = linkEl.querySelector("span.fw-searchable")
                    if (span) {
                        span.textContent = (0,_common__rspack_import_4.shortFileTitle)(title, doc.path)
                        span.classList.remove("e2ee-encrypted-title")
                    }
                }
            } catch (_e) {
                // Decryption failed — key may be stale. Ignore.
            }
        }
    }

    onResize() {
        if (!this.table) {
            return
        }
        this.initTable()
    }

    /* Initialize the overview table */
    initTable(searching = false) {
        if (this.table) {
            this.table.destroy()
            this.table = null
        }
        if (this.dtBulk) {
            this.dtBulk.destroy()
            this.dtBulk = null
        }
        const subdirs = {}
        const tableEl = document.createElement("table")
        tableEl.classList.add("fw-data-table")
        tableEl.classList.add("fw-document-table")
        tableEl.classList.add("fw-large")
        const contentsEl = document.querySelector(".fw-contents")
        contentsEl.innerHTML = "" // Delete any old table
        contentsEl.appendChild(tableEl)

        if (this.path !== "/") {
            const headerEl = document.createElement("h1")
            headerEl.innerHTML = (0,_common__rspack_import_4.escapeText)(this.path)
            contentsEl.insertBefore(headerEl, tableEl)
        }

        this.dtBulk = new _common__rspack_import_4.DatatableBulk(this, this.dtBulkModel, 2)

        const hiddenCols = [0, 1]

        if (window.innerWidth < 500) {
            hiddenCols.push(2, 5)
            if (window.innerWidth < 400) {
                hiddenCols.push(6)
            }
        }
        const fileList = this.documentList
            .map(doc => this.createTableRow(doc, subdirs, searching))
            .filter(row => !!row)

        let tableRender = false
        if (!searching && this.path !== "/") {
            const pathParts = this.path.split("/")
            pathParts.pop()
            pathParts.pop()
            const parentPath = pathParts.join("/") + "/"
            const href =
                parentPath === "/" && this.app.routes[""].app === "document"
                    ? parentPath
                    : `/documents${encodeURI(parentPath)}`
            tableRender = (_data, table, type) => {
                if (!["main", "message"].includes(type)) {
                    return
                }
                // Add a row at top of the table to go to parent directory.
                table.childNodes[1].childNodes.unshift({
                    nodeName: "TR",
                    attributes: {
                        "data-index": "0"
                    },
                    childNodes: [
                        {
                            nodeName: "TD"
                        },
                        {
                            nodeName: "TD",
                            childNodes: [
                                {
                                    nodeName: "a",
                                    attributes: {
                                        class: "fw-data-table-title fw-link-text parentdir",
                                        href: href,
                                        "data-path": parentPath
                                    },
                                    childNodes: [
                                        {
                                            nodeName: "i",
                                            attributes: {
                                                class: "fas fa-folder"
                                            }
                                        },
                                        {
                                            nodeName: "span",
                                            attributes: {},
                                            childNodes: [
                                                {
                                                    nodeName: "#text",
                                                    data: ".."
                                                }
                                            ]
                                        }
                                    ]
                                }
                            ]
                        },
                        {
                            nodeName: "TD"
                        },
                        {
                            nodeName: "TD"
                        },
                        {
                            nodeName: "TD"
                        },
                        {
                            nodeName: "TD"
                        },
                        {
                            nodeName: "TD"
                        },
                        {
                            nodeName: "TD"
                        }
                    ]
                })
            }
        }
        this.table = new simple_datatables__rspack_import_1.DataTable(tableEl, {
            searchable: searching,
            paging: false,
            scrollY: `${Math.max(window.innerHeight - 360, 200)}px`,
            tableRender,
            rowNavigation: true,
            rowSelectionKeys: ["Enter", "Delete", " "],
            tabIndex: 1,
            labels: {
                noRows: gettext("No documents available"), // Message shown when there are no entries
                noResults: gettext("No documents found") // Message shown when there are no search results
            },
            template: (options, _dom) =>
                `<div class='${options.classes.container}'style='height: ${options.scrollY}; overflow-Y: auto;'></div>`,
            data: {
                headings: [
                    "",
                    "",
                    this.dtBulk.getHTML(),
                    gettext("Title"),
                    gettext("Revisions"),
                    gettext("Created"),
                    gettext("Last changed"),
                    gettext("Owner"),
                    gettext("Rights"),
                    ""
                ],
                data: fileList
            },
            rowRender: (row, tr, _index) => {
                if (row.cells[1].data === "folder") {
                    tr.childNodes[0].childNodes = []
                    return
                }
                const id = row.cells[0].data
                const inputNode = {
                    nodeName: "input",
                    attributes: {
                        type: "checkbox",
                        class: "entry-select fw-check",
                        "data-id": id,
                        id: `doc-${id}`
                    }
                }
                if (row.cells[2].data) {
                    inputNode.attributes.checked = true
                }
                tr.childNodes[0].childNodes = [
                    inputNode,
                    {
                        nodeName: "label",
                        attributes: {
                            for: `doc-${id}`
                        }
                    }
                ]
            },
            columns: [
                {
                    select: 0,
                    type: "number"
                },
                {
                    select: 1,
                    type: "string"
                },
                {
                    select: 2,
                    type: "boolean"
                },
                /*{
                    select: 3,
                    type: "string"
                },*/
                {
                    select: [5, 6],
                    type: "date"
                },
                {
                    select: hiddenCols,
                    hidden: true
                },
                {
                    select: [2, 4, 8, 9],
                    sortable: false
                },
                {
                    select: [this.lastSort.column],
                    sort: this.lastSort.dir
                }
            ]
        })

        this.table.on("datatable.selectrow", (rowIndex, event, focused) => {
            event.preventDefault()
            if (event.type === "keydown") {
                const key = (0,w3c_keyname__rspack_import_2.keyName)(event)
                if (key === "Enter") {
                    if (this.getSelected().length > 0) {
                        // Don't open the document. Let the bulk menu handle it.
                        return
                    }
                    const link = this.table.dom.querySelector(
                        `tr[data-index="${rowIndex}"] a.fw-data-table-title`
                    )
                    if (link) {
                        link.click()
                    }
                } else if (key === " ") {
                    const cell = this.table.data.data[rowIndex].cells[2]
                    cell.data = !cell.data
                    cell.text = String(cell.data)
                    this.table.update()
                } else if (key === "Delete") {
                    const cell = this.table.data.data[rowIndex].cells[0]
                    const docId = cell.data
                    this.mod.actions.deleteDocumentDialog([docId], this.app)
                }
            } else {
                if (
                    event.target.closest(
                        "a, span.fw-link-text, span.delete-document, span.delete-folder, span.rights, span.revisions, label"
                    )
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

    createTableRow(doc, subdirs, searching) {
        let path = doc.path
        if (!path.startsWith("/")) {
            path = "/" + path
        }
        if (!path.startsWith(this.path)) {
            return false
        }
        if (path.endsWith("/")) {
            path += doc.title.replace(/\//g, "")
        }
        const currentPath = path.slice(this.path.length)
        if (!searching && currentPath.includes("/")) {
            // There is a subdir
            const subdir = currentPath.split("/").shift()
            if (subdirs[subdir]) {
                // subdir has been covered already
                // We only update the update/added columns if needed.
                if (doc.added < subdirs[subdir].added) {
                    subdirs[subdir].added = doc.added
                    subdirs[subdir].row[5] = (0,_templates__rspack_import_11.dateCell)({date: doc.added})
                }
                if (doc.updated > subdirs[subdir].updated) {
                    subdirs[subdir].updated = doc.updated
                    subdirs[subdir].row[6] = (0,_templates__rspack_import_11.dateCell)({date: doc.updated})
                }
                if (this.user.id === doc.owner.id) {
                    subdirs[subdir].ownedIds.push(doc.id)
                    subdirs[subdir].row[9] = (0,_templates__rspack_import_11.deleteFolderCell)({
                        subdir,
                        ids: subdirs[subdir].ownedIds
                    })
                }
                return false
            }

            const ownedIds = this.user.id === doc.owner.id ? [doc.id] : []
            // Display subdir
            const row = [
                "0",
                "folder",
                null,
                `<a class="fw-data-table-title fw-link-text subdir" href="/documents${encodeURI(this.path + subdir)}/" data-path="${this.path}${subdir}/">
                    <i class="fas fa-folder"></i>
                    <span>${(0,_common__rspack_import_4.escapeText)(subdir)}</span>
                </a>`,
                "",
                (0,_templates__rspack_import_11.dateCell)({date: doc.added}),
                (0,_templates__rspack_import_11.dateCell)({date: doc.updated}),
                "",
                "",
                ownedIds.length ? (0,_templates__rspack_import_11.deleteFolderCell)({subdir, ids: ownedIds}) : ""
            ]
            subdirs[subdir] = {
                row,
                added: doc.added,
                updated: doc.updated,
                ownedIds
            }
            return row
        }

        // For E2EE documents, check if the decrypted title is cached in
        // sessionStorage (set when the user opened the document this session).
        // The server stores the encrypted title in doc.title; we decrypt it
        // client-side when the key is available.
        let displayTitle = doc.title
        let hasDecryptedTitle = false
        if (doc.e2ee) {
            const cachedTitle = sessionStorage.getItem(`e2ee_title_${doc.id}`)
            if (cachedTitle !== null) {
                displayTitle = cachedTitle
                hasDecryptedTitle = true
            } else if (doc.title) {
                displayTitle = gettext("Encrypted Document")
            }
        }

        // This is the folder of the file. Return the file.
        return [
            String(doc.id),
            "file",
            false,
            `<a class="fw-data-table-title fw-link-text" href="/document/${doc.id}" data-id="${doc.id}">
                ${doc.e2ee ? '<i class="fas fa-lock e2ee-doc-indicator" title="' + gettext("End-to-end encrypted document") + '"></i>' : '<i class="far fa-file-alt"></i>'}
                <span class="fw-searchable${doc.e2ee && !hasDecryptedTitle ? " e2ee-encrypted-title" : ""}">
                    ${(0,_common__rspack_import_4.shortFileTitle)(displayTitle, doc.path)}
                </span>
                ${doc.template ? `<small class="doc-template-name">${(0,_common__rspack_import_4.escapeText)(doc.template)}</small>` : ""}
            </a>`,
            doc.revisions.length
                ? `<span class="revisions" data-id="${doc.id}">
                <i class="fas fa-history"></i>
            </span>`
                : "",
            (0,_templates__rspack_import_11.dateCell)({date: doc.added}),
            (0,_templates__rspack_import_11.dateCell)({date: doc.updated}),
            `<span>
                ${(0,_common__rspack_import_4.avatarTemplate)({user: doc.owner})}
            </span>
            <span class="fw-searchable">${(0,_common__rspack_import_4.escapeText)(doc.owner.name)}</span>`,
            `<span class="rights${doc.is_owner ? " owned-by-user" : ""}" data-id="${doc.id}" title="${doc.rights}">
                <i data-id="${doc.id}" class="icon-access-right icon-access-${doc.rights}"></i>
            </span>`,
            `<span class="delete-document fw-link-text" data-id="${doc.id}"
                    data-title="${(0,_common__rspack_import_4.escapeText)(currentPath)}">
                ${
                    this.user.id === doc.owner.id
                        ? '<i class="fa fa-trash-alt"></i>'
                        : ""
                }
            </span>`
        ]
    }

    multipleNewDocumentMenuItem() {
        const menuItem = this.menu.model.content.find(
            menuItem => menuItem.id === "new_document"
        )
        menuItem.type = "dropdown"
        menuItem.content = Object.values(this.documentTemplates).map(
            docTemplate => ({
                title: docTemplate.title || gettext("Undefined"),
                action: () => this.goToNewDocument(`n${docTemplate.id}`)
            })
        )
        this.menu.update()

        if (this.dtBulkModel.content.find(item => item.id === "copy_as")) {
            // Menuitem already present
            return
        }

        this.dtBulkModel.content.push({
            id: "copy_as",
            title: gettext("Copy selected as..."),
            tooltip: gettext(
                "Copy the documents and assign them to a specific template."
            ),
            action: overview => {
                const ids = overview.getSelected()
                if (ids.length) {
                    overview.mod.actions.copyFilesAs(ids)
                }
            },
            disabled: overview =>
                !overview.getSelected().length || overview.app.isOffline(),
            order: 2.5
        })

        this.dtBulk.update()
    }

    singleNewDocumentMenuItem() {
        const menuItem = this.menu.model.content.find(
            menuItem => menuItem.id === "new_document"
        )
        if (menuItem.type === "text") {
            // Already correctly set
            return
        }
        menuItem.type = "text"
        delete menuItem.content
        this.menu.update()

        this.dtBulkModel.content = this.dtBulkModel.content.filter(
            item => item.id !== "copy_as"
        )
        this.dtBulk.update()
    }

    getSelected() {
        return Array.from(
            document.querySelectorAll(".entry-select:checked:not(:disabled)")
        ).map(el => Number.parseInt(el.getAttribute("data-id")))
    }

    goToNewDocument(id) {
        let url = `/document${this.path}${id}`
        if (this.app.settings.E2EE_MODE === "required") {
            url += "?e2ee=true"
            this.app.goTo(url)
        } else if (this.app.settings.E2EE_MODE === "disabled") {
            this.app.goTo(url)
        } else {
            // E2EE is "enabled" - so the document can either be encrypted or non-encrypted
            // Let user choose.
            const encryptedInfoBody = `
                <p class="e2ee-choice-intro">${gettext("Encrypted documents protect your content so that only people with the password can read it.")}</p>
                <strong>${gettext("Advantages")}</strong>
                <ul>
                    <li>${gettext("Only people with the password can read the document.")}</li>
                    <li>${gettext("The server cannot access the document contents.")}</li>
                </ul>
                <strong>${gettext("Disadvantages")}</strong>
                <ul>
                    <li>${gettext("Limited access rights options (no tracked changes or review modes).")}</li>
                    <li>${gettext("If you lose the password or passphrase, there is no way to recover the document.")}</li>
                    <li>${gettext("You must share the password with collaborators manually (unless they use a personal passphrase).")}</li>
                </ul>
            `
            const regularInfoBody = `
                <p class="e2ee-choice-intro">${gettext("Regular documents are the default and work well for most users.")}</p>
                <strong>${gettext("Advantages")}</strong>
                <ul>
                    <li>${gettext("Full access rights options including tracked changes and review modes.")}</li>
                    <li>${gettext("No risk of losing access if you forget a password.")}</li>
                    <li>${gettext("Easier collaboration — no need to share passwords with collaborators.")}</li>
                </ul>
                <strong>${gettext("Disadvantages")}</strong>
                <ul>
                    <li>${gettext("The server can technically access the document contents.")}</li>
                    <li>${gettext("No additional protection beyond your account password.")}</li>
                </ul>
            `
            const dialog = new _common__rspack_import_4.Dialog({
                title: gettext("Choose encryption type of new document."),
                width: 460,
                body: `<div>
                    <div>
                        <input type="radio" id="nonencrypted" name="encryption" value="nonencrypted" checked>
                        <label for="nonencrypted">${gettext("Non-encrypted")}</label>
                    </div>
                    <div>&nbsp;</div>
                    <div>
                        <input type="radio" id="e2ee" name="encryption" value="e2ee">
                        <label for="e2ee">${gettext("Encrypted")}</label>
                    </div>
                    <div id="e2ee-info-regular" class="e2ee-choice-info">
                        ${regularInfoBody}
                    </div>
                    <div id="e2ee-info-encrypted" class="e2ee-choice-info" style="display: none;">
                        ${encryptedInfoBody}
                    </div>
                </div>`,
                buttons: [
                    {
                        text: gettext("Cancel"),
                        type: "cancel"
                    },
                    {
                        text: gettext("Create"),
                        type: "ok",
                        click: async _event => {
                            const e2ee =
                                document.querySelector(
                                    'input[name="encryption"]:checked'
                                )?.value === "e2ee"
                            dialog.close()

                            if (e2ee) {
                                // Check if user has passphrase keys already
                                const {PassphraseManager} = await Promise.resolve(/* import() */).then(__webpack_require__.bind(__webpack_require__, "./js/modules/editor/e2ee/passphrase-manager.js"))
                                const hasPassphraseKeys =
                                    await PassphraseManager.hasEncryptionKeys()
                                const hasDismissed =
                                    await PassphraseManager.hasUserDismissedPassphraseOffer()

                                if (!hasPassphraseKeys && !hasDismissed) {
                                    // Offer to set up passphrase
                                    const {setupPassphraseDialog} =
                                        await Promise.resolve(/* import() */).then(__webpack_require__.bind(__webpack_require__, "./js/modules/editor/e2ee/passphrase-dialog.js"))
                                    const setupConfirmed = await new Promise(
                                        resolve => {
                                            const setupDialog = new _common__rspack_import_4.Dialog({
                                                title: gettext(
                                                    "Set Up Personal Encryption (Optional)"
                                                ),
                                                body: `<p>${gettext("Would you like to set up a personal passphrase now? This will allow you to unlock all your encrypted documents with a single passphrase.")}</p>
                                            <p><strong>${gettext("Note:")}</strong> ${gettext("This is optional. You can also use a per-document password instead.")}</p>`,
                                                buttons: [
                                                    {
                                                        text: gettext(
                                                            "Skip for Now"
                                                        ),
                                                        type: "cancel",
                                                        click: async () => {
                                                            setupDialog.close()
                                                            await PassphraseManager.markPassphraseDismissed()
                                                            resolve(false)
                                                        }
                                                    },
                                                    {
                                                        text: gettext(
                                                            "Set Up Passphrase"
                                                        ),
                                                        type: "ok",
                                                        click: () => {
                                                            setupDialog.close()
                                                            resolve(true)
                                                        }
                                                    }
                                                ]
                                            })
                                            setupDialog.open()
                                        }
                                    )

                                    if (setupConfirmed) {
                                        // Show passphrase setup dialog
                                        await setupPassphraseDialog(
                                            async passphrase => {
                                                try {
                                                    const {recoveryKey} =
                                                        await PassphraseManager.setupEncryption(
                                                            passphrase
                                                        )
                                                    const {
                                                        showRecoveryKeyDialog
                                                    } = await Promise.resolve(/* import() */).then(__webpack_require__.bind(__webpack_require__, "./js/modules/editor/e2ee/passphrase-dialog.js"))
                                                    await showRecoveryKeyDialog(
                                                        recoveryKey
                                                    )
                                                } catch (e) {
                                                    (0,_common__rspack_import_4.addAlert)(
                                                        "error",
                                                        gettext(
                                                            "Failed to set up passphrase: " +
                                                                e.message
                                                        )
                                                    )
                                                }
                                            }
                                        )
                                    }
                                }

                                url += "?e2ee=true"
                            }
                            this.app.goTo(url)
                        }
                    }
                ]
            })
            dialog.open()
            // Bind radio buttons to show/hide the relevant info block
            setTimeout(() => {
                const nonencryptedRadio =
                    document.getElementById("nonencrypted")
                const e2eeRadio = document.getElementById("e2ee")
                const regularInfo = document.getElementById("e2ee-info-regular")
                const encryptedInfo = document.getElementById(
                    "e2ee-info-encrypted"
                )
                if (
                    nonencryptedRadio &&
                    e2eeRadio &&
                    regularInfo &&
                    encryptedInfo
                ) {
                    const toggleInfo = () => {
                        if (e2eeRadio.checked) {
                            regularInfo.style.display = "none"
                            encryptedInfo.style.display = "block"
                        } else {
                            regularInfo.style.display = "block"
                            encryptedInfo.style.display = "none"
                        }
                    }
                    nonencryptedRadio.addEventListener("change", toggleInfo)
                    e2eeRadio.addEventListener("change", toggleInfo)
                }
            }, 100)
        }
    }

    close() {
        if (!this.active) {
            return
        }
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
        this.active = false
    }
}


}),
"./js/modules/documents/overview/menu.js": (function (__unused_rspack_module, __webpack_exports__, __webpack_require__) {
"use strict";
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  bulkMenuModel: function() { return bulkMenuModel; },
  menuModel: function() { return menuModel; }
});
/* import */ var _common__rspack_import_0 = __webpack_require__("./js/modules/common/index.js");
/* import */ var _access_rights__rspack_import_1 = __webpack_require__("./js/modules/documents/access_rights/index.js");



const bulkMenuModel = () => ({
    content: [
        {
            title: gettext("Move selected"),
            tooltip: gettext("Move the documents that have been selected."),
            action: overview => {
                const ids = overview.getSelected()
                const docs = ids.map(id =>
                    overview.documentList.find(doc => doc.id === id)
                )
                if (docs.length) {
                    const dialog = new _common__rspack_import_0.FileDialog({
                        title:
                            docs.length > 1
                                ? gettext("Move documents")
                                : gettext("Move document"),
                        movingFiles: docs,
                        allFiles: overview.documentList,
                        moveUrl: "/api/document/move/",
                        successMessage: gettext("Document has been moved"),
                        errorMessage: gettext("Could not move document"),
                        succcessCallback: (file, path) => {
                            file.path = path
                            overview.initTable()
                        }
                    })
                    dialog.init()
                }
            },
            disabled: overview =>
                !overview.getSelected().length || overview.app.isOffline(),
            order: 1
        },
        {
            title: gettext("Share selected"),
            tooltip: gettext("Share the documents that have been selected."),
            action: overview => {
                const ids = overview.getSelected()
                const ownIds = ids.filter(
                    id =>
                        overview.documentList.find(doc => doc.id === id)
                            .is_owner
                )
                if (ownIds.length !== ids.length) {
                    (0,_common__rspack_import_0.addAlert)(
                        "error",
                        gettext("You cannot share documents of other users")
                    )
                }
                if (ownIds.length) {
                    // Check if any of the selected documents are E2EE encrypted
                    const e2ee = ownIds.some(
                        id =>
                            overview.documentList.find(doc => doc.id === id)
                                ?.e2ee
                    )
                    const dialog = new _access_rights__rspack_import_1.DocumentAccessRightsDialog(
                        ids,
                        overview.contacts,
                        memberDetails => overview.contacts.push(memberDetails),
                        e2ee,
                        "",
                        null,
                        overview.app.settings
                    )
                    dialog.init()
                }
            },
            disabled: overview =>
                !overview.getSelected().length || overview.app.isOffline(),
            order: 1
        },
        {
            title: gettext("Copy selected"),
            tooltip: gettext("Copy the documents that have been selected."),
            action: overview => {
                const ids = overview.getSelected()
                if (ids.length) {
                    overview.mod.actions.copyFiles(ids)
                }
            },
            disabled: overview =>
                !overview.getSelected().length || overview.app.isOffline(),
            order: 2
        },
        {
            title: gettext("Export selected as Epub"),
            tooltip: gettext(
                "Export the documents that have been selected as Epub files."
            ),
            action: overview => {
                const ids = overview.getSelected()
                if (ids.length) {
                    overview.mod.actions.downloadEpubFiles(ids)
                }
            },
            disabled: overview =>
                !overview.getSelected().length || overview.app.isOffline(),
            order: 3
        },
        {
            title: gettext("Export selected as HTML"),
            tooltip: gettext(
                "Export the documents that have been selected as HTML files."
            ),
            action: overview => {
                const ids = overview.getSelected()
                if (ids.length) {
                    overview.mod.actions.downloadHTMLFiles(ids)
                }
            },
            disabled: overview =>
                !overview.getSelected().length || overview.app.isOffline(),
            order: 4
        },
        {
            title: gettext("Export selected as LaTeX"),
            tooltip: gettext(
                "Export the documents that have been selected as LaTeX files."
            ),
            action: overview => {
                const ids = overview.getSelected()
                if (ids.length) {
                    overview.mod.actions.downloadLatexFiles(ids)
                }
            },
            disabled: overview =>
                !overview.getSelected().length || overview.app.isOffline(),
            order: 5
        },
        {
            title: gettext("Export selected as JATS"),
            tooltip: gettext(
                "Export the documents that have been selected as JATS files."
            ),
            action: overview => {
                const ids = overview.getSelected()
                if (ids.length) {
                    overview.mod.actions.downloadJATSFiles(ids)
                }
            },
            disabled: overview =>
                !overview.getSelected().length || overview.app.isOffline(),
            order: 6
        },
        {
            title: gettext("Export selected as BITS"),
            tooltip: gettext(
                "Export the documents that have been selected as BITS files."
            ),
            action: overview => {
                const ids = overview.getSelected()
                if (ids.length) {
                    overview.mod.actions.downloadBITSFiles(ids)
                }
            },
            disabled: overview =>
                !overview.getSelected().length || overview.app.isOffline(),
            order: 7
        },
        {
            title: gettext("Export selected as FIDUS"),
            tooltip: gettext(
                "Export the documents that have been selected as FIDUS files including their templates."
            ),
            action: overview => {
                const ids = overview.getSelected()
                if (ids.length) {
                    overview.mod.actions.downloadNativeFiles(ids)
                }
            },
            disabled: overview =>
                !overview.getSelected().length || overview.app.isOffline(),
            order: 8
        },
        {
            title: gettext("Export selected as Slim FIDUS"),
            tooltip: gettext(
                "Export the documents that have been selected as FIDUS files without their templates."
            ),
            action: overview => {
                const ids = overview.getSelected()
                if (ids.length) {
                    overview.mod.actions.downloadSlimNativeFiles(ids)
                }
            },
            disabled: overview =>
                !overview.getSelected().length || overview.app.isOffline(),
            order: 9
        },
        {
            title: gettext("Delete selected"),
            tooltip: gettext("Delete the documents that have been selected."),
            action: overview => {
                const ids = overview.getSelected()
                const ownIds = ids.filter(
                    id =>
                        overview.documentList.find(doc => doc.id === id)
                            .is_owner
                )
                if (ownIds.length !== ids.length) {
                    (0,_common__rspack_import_0.addAlert)(
                        "error",
                        gettext("You cannot delete documents of other users")
                    )
                }
                if (ownIds.length) {
                    overview.mod.actions.deleteDocumentDialog(
                        ownIds,
                        overview.app
                    )
                }
            },
            disabled: overview =>
                !overview.getSelected().length || overview.app.isOffline(),
            order: 10
        }
    ]
})

let currentlySearching = false

const menuModel = () => ({
    content: [
        {
            type: "text",
            id: "new_document",
            title: gettext("Create new document"),
            keys: "Alt-n",
            action: overview => overview.goToNewDocument("new"),
            order: 1
        },
        {
            type: "text",
            title: gettext("Create new folder"),
            keys: "Alt-f",
            action: overview => {
                const dialog = new _common__rspack_import_0.NewFolderDialog(folderName => {
                    overview.path = overview.path + folderName + "/"
                    window.history.pushState(
                        {},
                        "",
                        "/documents" + overview.path
                    )
                    overview.initTable()
                })
                dialog.open()
            },
            order: 2
        },
        {
            type: "text",
            title: gettext("Upload FIDUS document"),
            keys: "Alt-u",
            action: overview => overview.mod.actions.importFidus(),
            order: 3
        },
        {
            type: "text",
            id: "import_external",
            title: gettext("Import document"),
            keys: "Alt-i",
            action: overview => overview.mod.actions.importExternal(),
            order: 4
        },
        {
            type: "search",
            icon: "search",
            title: gettext("Search documents"),
            keys: "Alt-s",
            input: (overview, text) => {
                if (text.length && !currentlySearching) {
                    overview.initTable(true)
                    currentlySearching = true
                    overview.table.on("datatable.init", () =>
                        overview.table.search(text)
                    )
                } else if (!text.length && currentlySearching) {
                    overview.initTable(false)
                    currentlySearching = false
                } else if (text.length) {
                    overview.table.search(text)
                }
            },
            order: 5
        }
    ]
})


}),
"./js/modules/documents/overview/templates.js": (function (__unused_rspack_module, __webpack_exports__, __webpack_require__) {
"use strict";
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  dateCell: function() { return dateCell; },
  deleteFolderCell: function() { return deleteFolderCell; },
  importFidusTemplate: function() { return importFidusTemplate; }
});
/* import */ var _common__rspack_import_0 = __webpack_require__("./js/modules/common/index.js");


/** A template for the Fidus Writer document import dialog */
const importFidusTemplate = () =>
    `<form id="import-fidus-form" method="post" enctype="multipart/form-data" class="ajax-upload">
            <input type="file" id="fidus-uploader" name="fidus" accept=".fidus" required />
            <button id="import-fidus-btn" class="fw-button fw-light fw-large">
                ${gettext("Select a file")}
            </button>
            <label id="import-fidus-name" class="ajax-upload-label"></label>
        </form>`

const deleteFolderCell = ({subdir, ids}) =>
    `<span class="delete-folder fw-link-text" data-ids="${ids.join(",")}"
        data-title="${(0,_common__rspack_import_0.escapeText)(subdir)}">
        '<i class="fa fa-trash-alt"></i>
</span>`

const dateCell = ({date}) => ({
    data: (0,_common__rspack_import_0.localizeDate)(date * 1000, "sortable-date"),
    text: (0,_common__rspack_import_0.localizeDate)(date * 1000, "minutes")
})


}),
"./js/modules/documents/revisions/index.js": (function (__unused_rspack_module, __webpack_exports__, __webpack_require__) {
"use strict";
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  DocumentRevisionsDialog: function() { return DocumentRevisionsDialog; }
});
/* import */ var downloadjs__rspack_import_0 = __webpack_require__("./node_modules/.pnpm/downloadjs@1.4.7/node_modules/downloadjs/download.js");
/* import */ var downloadjs__rspack_import_0_default = /*#__PURE__*/__webpack_require__.n(downloadjs__rspack_import_0);
/* import */ var _common__rspack_import_1 = __webpack_require__("./js/modules/common/index.js");
/* import */ var _importer_native__rspack_import_2 = __webpack_require__("./js/modules/importer/native/index.js");
/* import */ var _templates__rspack_import_3 = __webpack_require__("./js/modules/documents/revisions/templates.js");






/**
 * Functions for the recovering previously created document revisions.
 */
class DocumentRevisionsDialog {
    constructor(documentId, documentList, user) {
        this.documentId = documentId // documentId The id in documentList.
        this.documentList = documentList
        this.user = user
        this.dialog = false
    }

    /**
     * Create a dialog showing the existing revisions for a certain document.
     * @function createDialog
     * @param {number}
     */
    init() {
        const doc = this.documentList.find(doc => doc.id === this.documentId)
        this.dialog = new _common__rspack_import_1.Dialog({
            title: `${gettext("Saved revisions of")} ${(0,_common__rspack_import_1.escapeText)((0,_common__rspack_import_1.shortFileTitle)(doc.title, doc.path))}`,
            id: "revisions-dialog",
            width: 620,
            height: 480,
            buttons: [{type: "close"}],
            body: (0,_templates__rspack_import_3.documentrevisionsTemplate)({doc})
        })
        this.dialog.open()
        return this.bind()
    }

    bind() {
        const dialogEl = this.dialog.dialogEl

        return new Promise(resolve => {
            dialogEl.addEventListener("click", event => {
                const el = {}
                let revisionId, revisionFilename
                switch (true) {
                    case (0,_common__rspack_import_1.findTarget)(event, ".download-revision", el):
                        revisionId = Number.parseInt(el.target.dataset.id)
                        revisionFilename = el.target.dataset.filename
                        this.download(revisionId, revisionFilename)
                        break
                    case (0,_common__rspack_import_1.findTarget)(event, ".recreate-revision", el):
                        revisionId = Number.parseInt(el.target.dataset.id)
                        resolve(this.recreate(revisionId, this.user))
                        break
                    case (0,_common__rspack_import_1.findTarget)(event, ".delete-revision", el):
                        revisionId = Number.parseInt(el.target.dataset.id)
                        resolve(this.delete(revisionId))
                        break
                    default:
                        break
                }
            })
        })
    }

    /**
     * Recreate a revision.
     * @function recreate
     * @param {number} id The pk value of the document revision.
     */

    recreate(id, user) {
        const doc = this.documentList.find(doc => doc.id === this.documentId)
        return (0,_common__rspack_import_1.get)(`/api/document/get_revision/${id}/`)
            .then(response => response.blob())
            .then(blob => {
                const importer = new _importer_native__rspack_import_2.FidusFileImporter(
                    blob,
                    user,
                    (0,_common__rspack_import_1.longFilePath)(
                        doc.title,
                        doc.path,
                        `${gettext("Revision of")} `
                    )
                )
                return importer.init()
            })
            .then(({ok, statusText, doc}) => {
                (0,_common__rspack_import_1.deactivateWait)()
                if (ok) {
                    (0,_common__rspack_import_1.addAlert)("info", statusText)
                    return {
                        action: "added-document",
                        doc
                    }
                } else {
                    (0,_common__rspack_import_1.addAlert)("error", statusText)
                    return Promise.reject(new Error(statusText))
                }
            })
    }

    /**
     * Download a revision.
     * @param {number} id The pk value of the document revision.
     */

    download(id, filename) {
        (0,_common__rspack_import_1.get)(`/api/document/get_revision/${id}/`)
            .then(response => response.blob())
            .then(blob => downloadjs__rspack_import_0_default()(blob, filename, "application/fidus+zip"))
    }

    /**
     * Delete a revision.
     * @param {number} id The pk value of the document revision.
     */

    delete(id) {
        const buttons = []
        const returnPromise = new Promise(resolve => {
            buttons.push({
                text: gettext("Delete"),
                classes: "fw-dark",
                click: () => {
                    revisionsConfirmDeleteDialog.close()
                    resolve(this.deleteRevision(id))
                }
            })
            buttons.push({
                type: "cancel",
                click: () => {
                    revisionsConfirmDeleteDialog.close()
                    resolve((0,_common__rspack_import_1.cancelPromise)())
                }
            })
        })

        const revisionsConfirmDeleteDialog = new _common__rspack_import_1.Dialog({
            id: "confirmdeletion",
            title: gettext("Confirm deletion"),
            icon: "exclamation-triangle",
            body: `${gettext("Do you really want to delete the revision?")}`,
            height: 80,
            buttons
        })
        revisionsConfirmDeleteDialog.open()

        return returnPromise
    }

    deleteRevision(id) {
        return (0,_common__rspack_import_1.jsonPost)("/api/document/delete_revision/", {id})
            .then(() => {
                const thisTr = document.querySelector(`tr.revision-${id}`),
                    documentId = thisTr.dataset.document,
                    doc = this.documentList.find(
                        doc => doc.id === Number.parseInt(documentId)
                    )
                thisTr.parentElement.removeChild(thisTr)
                ;(0,_common__rspack_import_1.addAlert)("success", gettext("Revision deleted"))
                return Promise.resolve({
                    action: "deleted-revision",
                    id,
                    doc
                })
                // TODO: Remove from overview menu as well
            })
            .catch(() => {
                (0,_common__rspack_import_1.addAlert)("error", gettext("Could not delete revision."))
                return Promise.reject(new Error("Could not delete revision."))
            })
    }
}


}),
"./js/modules/documents/revisions/templates.js": (function (__unused_rspack_module, __webpack_exports__, __webpack_require__) {
"use strict";
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  documentrevisionsTemplate: function() { return documentrevisionsTemplate; }
});
/* import */ var _common__rspack_import_0 = __webpack_require__("./js/modules/common/index.js");


/** A template for listing the templates of a certain document */
const documentrevisionsTemplate = ({doc}) =>
    `<table class="fw-data-table" style="width:342px;">
        <thead class="fw-data-table-header">
            <th width="80">${gettext("Time")}</th>
            <th width="300">${gettext("Description")}</th>
            <th width="50">${gettext("Recreate")}</th>
            <th width="50">${gettext("Download")}</th>
            ${doc.is_owner ? `<th width="50">${gettext("Delete")}</th>` : ""}
        </thead>
        <tbody class="fw-data-table-body fw-middle">
            ${doc.revisions
                .slice()
                .sort((a, b) => a.date > b.date)
                .map(
                    rev =>
                        `<tr class="revision-${rev.pk}" data-document="${doc.id}">
                        <td width="80"><span class="fw-inline">
                            ${(0,_common__rspack_import_0.localizeDate)(rev.date * 1000)}
                        </span></td>
                        <td width="300"><span class="fw-inline">${(0,_common__rspack_import_0.escapeText)(rev.note)}</span></td>
                        <td width="50"><span class="fw-inline recreate-revision" data-id="
                                ${rev.pk}"><i class="fa fa-download"></i></span></td>
                        <td width="50"><span class="fw-inline download-revision" data-id="
                                ${rev.pk}" data-filename="${(0,_common__rspack_import_0.escapeText)(rev.file_name)}">
                            <i class="fa fa-download"></i>
                        </span></td>
                        ${
                            doc.is_owner
                                ? `<td width="50">
                                <span class="fw-inline delete-revision" data-id="${rev.pk}">
                                    <i class="fa fa-trash"></i>
                                </span>
                            </td>`
                                : ""
                        }
                    </tr>`
                )}
        </tbody>
    </table>`


}),
"./js/modules/documents/tools.js": (function (__unused_rspack_module, __webpack_exports__, __webpack_require__) {
"use strict";
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  getMissingDocumentListData: function() { return getMissingDocumentListData; }
});
/* import */ var _common__rspack_import_0 = __webpack_require__("./js/modules/common/index.js");
/* import */ var _editor_track__rspack_import_1 = __webpack_require__("./js/modules/editor/track/index.js");
/* import */ var _schema_convert__rspack_import_2 = __webpack_require__("./js/modules/schema/convert.js");




const getMissingDocumentListData = (
    ids,
    documentList,
    schema,
    rawContent = false
) => {
    // get extra data for the documents identified by the ids and updates the
    // documentList correspondingly.
    const incompleteIds = []
    ids.forEach(id => {
        if (
            !documentList
                .find(doc => doc.id === Number.parseInt(id))
                .hasOwnProperty("content")
        ) {
            incompleteIds.push(Number.parseInt(id))
        } else if (
            rawContent &&
            !documentList
                .find(doc => doc.id === Number.parseInt(id))
                .hasOwnProperty("rawContent")
        ) {
            incompleteIds.push(Number.parseInt(id))
        }
    })

    if (incompleteIds.length > 0) {
        return (0,_common__rspack_import_0.jsonPostJson)("/api/document/documentlist/extra/", {
            ids: incompleteIds
        })
            .then(({json}) => {
                json.documents.forEach(extraValues => {
                    const doc = documentList.find(
                        entry => entry.id === extraValues.id
                    )
                    if (extraValues.e2ee) {
                        // For E2EE documents, content is an encrypted string.
                        // Store as-is without ProseMirror parsing.
                        if (rawContent) {
                            doc.rawContent = extraValues.content
                        }
                        doc.content = extraValues.content
                        doc.settings = {}
                    } else {
                        if (rawContent) {
                            doc.rawContent = JSON.parse(
                                JSON.stringify(
                                    schema
                                        .nodeFromJSON(extraValues.content)
                                        .toJSON()
                                )
                            )
                        }
                        doc.content = (0,_editor_track__rspack_import_1.acceptAllNoInsertions)(
                            schema.nodeFromJSON(extraValues.content)
                        ).toJSON()
                        doc.settings = (0,_schema_convert__rspack_import_2.getSettings)(doc.content)
                    }
                    doc.comments = extraValues.comments
                    doc.bibliography = extraValues.bibliography
                    doc.images = extraValues.images
                })
            })
            .catch(error => {
                (0,_common__rspack_import_0.addAlert)(
                    "error",
                    gettext("Could not obtain extra document data")
                )
                throw error
            })
    } else {
        return Promise.resolve()
    }
}


}),
"./js/modules/importer/citations.js": (function (__unused_rspack_module, __webpack_exports__, __webpack_require__) {
"use strict";
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  citationResultToNode: function() { return citationResultToNode; }
});
/**
 * Shared citation utilities for DOCX and ODT importers.
 *
 * Converts a CitationResult (from DocxCitationsParser or OdtCitationsParser
 * static methods) plus a BibDB (entries) into a Fidus Writer citation node,
 * and merges the new BibDB entries into the document bibliography.
 *
 * The `bibliography` object passed in is mutated in place: new entries are
 * appended with sequential numeric string keys ("1", "2", …).
 */

/**
 * Given a BibDB returned by a static Citations parser call and the current
 * document bibliography, add every entry that is not yet present (matched by
 * entry_key) and return a mapping from entry_key → bibliography key string.
 *
 * @param {Object} entries  BibDB (Record<number, EntryObject>) from parser
 * @param {Object} bibliography  Fidus Writer bibliography (mutated in place)
 * @returns {Object}  Map of entry_key → bibKey string
 */
function mergeBibEntries(entries, bibliography, bibDB) {
    const keyMap = {}

    for (const entry of Object.values(entries)) {
        if (!entry || !entry.entry_key) {
            continue
        }
        const entryKey = entry.entry_key

        // Check whether this entry_key is already in the bibliography.
        const existing = Object.entries(bibliography).find(
            ([, bibEntry]) => bibEntry && bibEntry.entry_key === entryKey
        )

        if (existing) {
            keyMap[entryKey] = existing[0]
        } else {
            if (bibDB && Object.keys(entry.fields).length === 0) {
                // Jabref citations don't contain any fields. Look up values in bibDB instead
                const bibEntry = Object.values(bibDB.db).find(
                    bibEntry => bibEntry && bibEntry.entry_key === entryKey
                )
                if (bibEntry) {
                    entry.fields = JSON.parse(JSON.stringify(bibEntry.fields))
                    entry.bib_type = bibEntry.bib_type
                }
            }
            // TODO: add for jabref citations - according to entry_key import from user
            // library if useExternalDB is true
            const bibKey = String(Object.keys(bibliography).length + 1)
            bibliography[bibKey] = entry
            keyMap[entryKey] = bibKey
        }
    }

    return keyMap
}

/**
 * Convert a CitationResult from a static DocxCitationsParser or
 * OdtCitationsParser call into a Fidus Writer citation node.
 *
 * The `bibliography` object is mutated in place to include any new entries.
 *
 * Each item in `metadata` (when `retrieveMetadata` was true) may carry:
 *   - id         : entry_key string identifying which entry this item refers to
 *   - prefix     : citation prefix text
 *   - suffix     : citation suffix / locator text (used as `locator`)
 *   - locator    : explicit locator string (preferred over suffix when present)
 *   - authorOnly : boolean – render author name only (maps to "textcite")
 *   - suppressAuthor : boolean – suppress author name (ignored, maps to default)
 *   - authorYear : boolean – render author name and year (maps to "textcite")
 *
 * `format` on the returned citation node matches the Fidus Writer citation schema:
 *   - "textcite"  when authorOnly or authorYear is set on the (single) item (biblatex \textcite)
 *   - "autocite"  otherwise, including when suppressAuthor is set (biblatex \autocite)
 *
 * @param {Object} result       CitationResult from a static parser method
 * @param {Object} bibliography Fidus Writer bibliography (mutated in place)
 * @returns {Object|null}  ProseMirror citation node or null
 */
function citationResultToNode(result, bibliography, bibDB = false) {
    if (!result || !result.isCitation || !result.entries) {
        return null
    }
    const entries = result.entries
    const metadata = result.metadata || []

    if (Object.keys(entries).length === 0) {
        return null
    }
    const keyMap = mergeBibEntries(entries, bibliography, bibDB)
    // Build the references array from entries.
    //
    const references = Object.entries(entries).map(([_entryId, entry]) => {
        const entryKey = entry.entry_key
        const entryMetadata = metadata.find(meta => meta.entry_key === entryKey)
        return {
            id: keyMap[entryKey],
            prefix: entryMetadata?.prefix || "",
            locator: entryMetadata?.locator || entryMetadata?.suffix || ""
        }
    })

    if (references.length === 0) {
        return null
    }

    // Determine citation format from the first item's metadata flags.
    // "textcite" corresponds to biblatex's \textcite (author-in-text / authorYear).
    // Even authorOnly comes through as "textcite" since it's a similar concept.
    // Everything else, including suppressAuthor, falls back to "autocite".
    // TODO: When an authorOnly citation is followed directly by a suppressAuthor
    // citation, this would display the same as a single authorYear citation and
    // should be treated as such.
    const format =
        metadata.length === 1 &&
        (metadata[0].authorOnly || metadata[0].authorYear)
            ? "textcite"
            : "autocite"

    return {
        type: "citation",
        attrs: {
            format,
            references
        }
    }
}


}),
"./js/modules/importer/docx/citations.js": (function (__unused_rspack_module, __webpack_exports__, __webpack_require__) {
"use strict";
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  isDocxBibliographyField: function() { return isDocxBibliographyField; },
  isDocxCitationField: function() { return isDocxCitationField; },
  isDocxSdtBibliography: function() { return isDocxSdtBibliography; },
  isDocxSdtCitation: function() { return isDocxSdtCitation; },
  parseDocxFieldCitation: function() { return parseDocxFieldCitation; },
  parseDocxSdtCitation: function() { return parseDocxSdtCitation; }
});
/* import */ var biblatex_csl_converter__rspack_import_0 = __webpack_require__("./node_modules/.pnpm/biblatex-csl-converter@3.6.0/node_modules/biblatex-csl-converter/lib/index.js");
/* import */ var _citations__rspack_import_1 = __webpack_require__("./js/modules/importer/citations.js");



/**
 * Check whether a field instruction string belongs to a citation.
 * Uses DocxCitationsParser.fieldCitation() with retrieve=false so no BibDB
 * is allocated for the check.
 *
 * @param {string} instrText - Concatenated w:instrText content
 * @returns {boolean}
 */
function isDocxCitationField(instrText) {
    if (!instrText) {
        return false
    }
    return biblatex_csl_converter__rspack_import_0.DocxCitationsParser.fieldCitation(instrText, false).isCitation
}

/**
 * Check whether a field instruction string belongs to a bibliography region
 * (Zotero ZOTERO_BIBL, Word native BIBLIOGRAPHY, EN.REFLIST, etc.).
 * Uses DocxCitationsParser.fieldBibliography() with the accumulated
 * instruction text between begin and separate markers.
 *
 * @param {string} instrText - Concatenated w:instrText content
 * @returns {boolean}
 */
function isDocxBibliographyField(instrText) {
    if (!instrText) {
        return false
    }

    return biblatex_csl_converter__rspack_import_0.DocxCitationsParser.fieldBibliography(instrText).isBibliography
}

/**
 * Check whether a w:sdt node contains a citation (Mendeley v3, Citavi).
 * Uses DocxCitationsParser.sdtCitation() with retrieve=false.
 *
 * @param {Object} sdtNode - The parsed w:sdt XMLElement node
 * @returns {boolean}
 */
function isDocxSdtCitation(sdtNode) {
    if (!sdtNode) {
        return false
    }
    return biblatex_csl_converter__rspack_import_0.DocxCitationsParser.sdtCitation(sdtNode.outerXML, false).isCitation
}

/**
 * Check whether a w:sdt node is a bibliography rendering region
 * (Mendeley v3 bibliography, Citavi bibliography).
 * Uses DocxCitationsParser.sdtBibliography().
 *
 * @param {Object} sdtNode - The parsed w:sdt XMLElement node
 * @returns {boolean}
 */
function isDocxSdtBibliography(sdtNode) {
    if (!sdtNode) {
        return false
    }
    return biblatex_csl_converter__rspack_import_0.DocxCitationsParser.sdtBibliography(sdtNode.outerXML).isBibliography
}

/**
 * Parse a citation from a DOCX field instruction and add any new bibliography
 * entries into `bibliography`.
 *
 * Handles all field-based citation managers: Zotero, Mendeley Desktop
 * (legacy), EndNote (both inline and fldData forms), Citavi (older ADDIN
 * form), and Word native (requires sourcesXml).
 *
 * @param {string}      instrText    - Concatenated w:instrText for this field
 * @param {string|null} fldData      - Base64 content of w:fldData (EndNote),
 *                                     or null/undefined if absent
 * @param {string|null} sourcesXml   - Content of customXml/item1.xml (required
 *                                     only for Word-native citations)
 * @param {Object}      bibliography - Fidus Writer bibliography (mutated)
 * @returns {Object|null}  ProseMirror citation node or null
 */
function parseDocxFieldCitation(
    instrText,
    fldData,
    sourcesXml,
    bibliography
) {
    if (!instrText) {
        return null
    }
    const options = sourcesXml ? {sourcesXml} : {}
    const result = biblatex_csl_converter__rspack_import_0.DocxCitationsParser.fieldCitation(
        instrText,
        true, // retrieve
        true, // retrieveMetadata
        true, // extractWordNative
        fldData || undefined,
        options
    )
    const node = (0,_citations__rspack_import_1.citationResultToNode)(result, bibliography)
    return node
}

/**
 * Parse a citation from a DOCX structured document tag (w:sdt) and add any
 * new bibliography entries into `bibliography`.
 *
 * Handles Mendeley Cite v3 and Citavi (modern SDT form).
 *
 * @param {Object} sdtNode      - The parsed w:sdt XMLElement node
 * @param {Object} bibliography - Fidus Writer bibliography (mutated)
 * @returns {Object|null}  ProseMirror citation node or null
 */
function parseDocxSdtCitation(sdtNode, bibliography) {
    if (!sdtNode) {
        return null
    }
    const result = biblatex_csl_converter__rspack_import_0.DocxCitationsParser.sdtCitation(
        sdtNode.outerXML,
        true, // retrieve
        true // retrieveMetadata
    )
    return (0,_citations__rspack_import_1.citationResultToNode)(result, bibliography)
}


}),
"./js/modules/importer/docx/convert.js": (function (__unused_rspack_module, __webpack_exports__, __webpack_require__) {
"use strict";
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  DocxConvert: function() { return DocxConvert; }
});
/* import */ var mathml_to_latex__rspack_import_0 = __webpack_require__("./node_modules/.pnpm/mathml-to-latex@1.4.3/node_modules/mathml-to-latex/dist/bundle.min.js");
/* import */ var mathml_to_latex__rspack_import_0_default = /*#__PURE__*/__webpack_require__.n(mathml_to_latex__rspack_import_0);
/* import */ var _exporter_tools_xml__rspack_import_1 = __webpack_require__("./js/modules/exporter/tools/xml.js");
/* import */ var _schema_common__rspack_import_2 = __webpack_require__("./js/modules/schema/common/index.js");
/* import */ var _citations__rspack_import_3 = __webpack_require__("./js/modules/importer/docx/citations.js");
/* import */ var _helpers__rspack_import_4 = __webpack_require__("./js/modules/importer/docx/helpers.js");
/* import */ var _omml2mathml__rspack_import_5 = __webpack_require__("./js/modules/importer/docx/omml2mathml.js");
/* import */ var _parse__rspack_import_6 = __webpack_require__("./js/modules/importer/docx/parse.js");








class DocxConvert {
    constructor(zip, importId, template, bibliography) {
        this.zip = zip
        this.importId = importId
        this.template = template
        this.bibliography = bibliography
        this.images = {}
        this.parser = new _parse__rspack_import_6.DocxParser(zip)
        this.tracks = {}
        this.currentTracks = []
        this.currentFields = []
        this.sourcesXml = null
    }

    async init() {
        await this.parser.init()
        // Load Word-native bibliography sources if present.
        // This file is required by DocxCitationsParser for CITATION field codes.
        this.sourcesXml =
            (await this.zip.file("customXml/item1.xml")?.async("string")) ??
            null
        const body = this.parser.document.query("w:body")
        if (!body) {
            return {
                content: {
                    type: "doc",
                    content: []
                },
                settings: {
                    import_id: this.importId,
                    tracked: false,
                    language: "en-US"
                },
                comments: {}
            }
        }
        // Find all reference targets in the document for cross-references
        this.referenceTargets = this.findReferenceTargets(this.parser.document)

        const convertedContent = this.convertDocument(body)
        // Convert document
        return {
            content: convertedContent,
            settings: {
                import_id: this.importId,
                tracked: this.hasTrackedChanges(this.parser.document),
                language: this.detectLanguage(this.parser.document)
            },
            comments: this.parser.comments
        }
    }

    convertDocument(body) {
        const templateParts = this.template.content.content.slice()
        templateParts.shift() // Remove first element

        const document = {
            type: "doc",
            attrs: {
                import_id: this.importId
            },
            content: []
        }
        // Add title (required first element)
        const title = this.extractTitle(body)
        document.content.push({
            type: "title",
            content: title.content || [
                {type: "text", text: gettext("Untitled")}
            ]
        })
        title.containerNodes.forEach(node => {
            node.parentElement.removeChild(node)
        })
        document.attrs.title =
            title.content.map(node => node.textContent).join("") ||
            gettext("Untitled")
        // Extract metadata sections
        const metadata = this.extractMetadata(body)
        metadata.forEach(({type, content}) => {
            const templatePart = templateParts.find(
                part => part.attrs.metadata === type
            )
            const attrs = {}
            if (templatePart.attrs.hidden) {
                attrs.hidden = false
            }
            if (templatePart) {
                document.content.push({
                    type: templatePart.type,
                    attrs: {
                        ...templatePart.attrs,
                        ...attrs
                    },
                    content: content.content
                })
                // Remove paragraphs from content so they are not added to body
                content.containerNodes.forEach(node => {
                    node.parentElement?.removeChild(node)
                })
            }
        })
        // Extract main content sections
        const sections = this.groupContentIntoSections(body)
        // Map sections to template parts
        sections.forEach(section => {
            const templatePart = this.findMatchingTemplatePart(
                section.title,
                templateParts
            )
            if (templatePart) {
                document.content.push({
                    type: "richtext_part",
                    attrs: {
                        title: templatePart.attrs.title,
                        id: templatePart.attrs.id,
                        metadata: templatePart.attrs.metadata || undefined,
                        marks: templatePart.attrs.marks || [
                            "strong",
                            "em",
                            "link"
                        ]
                    },
                    content: section.content
                })
            }
        })

        // Add remaining content to body section
        const unassignedContent = sections
            .filter(
                section =>
                    !this.findMatchingTemplatePart(section.title, templateParts)
            )
            .flatMap(section => section.content)

        if (unassignedContent.length) {
            const bodyTemplatePart = templateParts.find(
                part => !part.attrs.metadata && part.type === "richtext_part"
            )

            document.content.push({
                type: "richtext_part",
                attrs: {
                    title: bodyTemplatePart
                        ? bodyTemplatePart.attrs.title
                        : "Body",
                    id: bodyTemplatePart ? bodyTemplatePart.attrs.id : "body",
                    marks: ["strong", "em", "link"]
                },
                content: unassignedContent
            })
        }

        return document
    }

    extractMetadata(body) {
        const metadata = []
        // Extract authors if present
        const authors = this.extractAuthors(body)
        if (authors.content.length) {
            metadata.push({
                type: "authors",
                content: authors
            })
        }
        // Extract abstract if present
        const abstract = this.extractAbstract(body)
        if (abstract.content.length) {
            metadata.push({
                type: "abstract",
                content: abstract
            })
        }

        // Extract keywords if present
        const keywords = this.extractKeywords(body)
        if (keywords.content.length) {
            metadata.push({
                type: "keywords",
                content: keywords
            })
        }
        return metadata
    }

    extractAuthors(body) {
        const authors = []

        // Try to find author information in metadata
        const authorNodes = body
            .queryAll("w:pStyle", {"w:val": "Author"})
            .map(pStyle => pStyle.closest("w:p"))
            .filter(p => p)
        authorNodes.forEach(authorNode => {
            const authorText = this.getTextContent(authorNode)
            const [firstname = "", lastname = ""] = authorText.split(" ", 2)
            authors.push({
                type: "contributor",
                attrs: {
                    firstname,
                    lastname,
                    email: "",
                    institution: ""
                }
            })
        })
        if (authors.length) {
            return {
                content: authors,
                containerNodes: authorNodes
            }
        }
        // Also check Creator in document properties
        const creator = this.parser.coreDoc.query("dc:creator")?.textContent

        if (creator) {
            const [firstname = "", lastname = ""] = creator.split(" ", 2)

            return {
                content: [
                    {
                        type: "contributor",
                        attrs: {
                            firstname,
                            lastname,
                            email: "",
                            institution: ""
                        }
                    }
                ],
                containerNodes: []
            }
        }
        return {content: [], containerNodes: []}
    }

    extractAbstract(body) {
        // Look for section with Abstract style or heading
        const abstractNodes = body
            .queryAll("w:pStyle", {"w:val": "Abstract"})
            .map(pStyle => pStyle.closest("w:p"))
            .filter(p => p)
        if (abstractNodes.length) {
            return {
                content: abstractNodes.map(abstractNode =>
                    this.convertBlock(abstractNode)
                ),
                containerNodes: abstractNodes
            }
        }
        const extractedPart = this.extractPartOnTitle(body, ["Abstract"])
        if (extractedPart.content.length) {
            return {
                content: extractedPart.content.map(abstractNode =>
                    this.convertBlock(abstractNode)
                ),
                containerNodes: extractedPart.content.concat([
                    extractedPart.header
                ])
            }
        }
        return {content: [], containerNodes: []}
    }

    extractKeywords(body) {
        let extraNodes = []
        // Look for keywords section or metadata
        let keywordNodes = body
            .queryAll("w:pStyle", {"w:val": "Keywords"})
            .map(pStyle => pStyle.closest("w:p"))
            .filter(p => p)

        if (!keywordNodes.length) {
            // If no keywords section is found, look for a title called "Keywords"
            const extractedPart = this.extractPartOnTitle(
                body,
                ["Keywords", "Keywords:", "Keyword"],
                1
            )

            if (extractedPart.content.length) {
                keywordNodes = extractedPart.content
                extraNodes = extractedPart.header ? [extractedPart.header] : []
            }
        }

        if (keywordNodes) {
            return {
                content: keywordNodes
                    .map(keywordsNode => this.getTextContent(keywordsNode))
                    .flatMap(str => str.split(/[,;|:]+/)) // Split on multiple separators
                    .map(keyword => keyword.trim()) // Trim whitespace
                    .filter(keyword => keyword.length > 0)
                    .map(keyword => ({
                        type: "tag",
                        attrs: {
                            tag: keyword
                        }
                    })),
                containerNodes: keywordNodes.concat(extraNodes)
            }
        }

        return {content: [], containerNodes: []}
    }

    extractPartOnTitle(body, titleWords, maxPars = false) {
        // Fall back to heading starting with TITLEWORD in text
        if (typeof titleWords === "string") {
            titleWords = [titleWords]
        }
        const headingPars = body
            .queryAll("w:pStyle", {
                "w:val": [
                    "Heading1",
                    "Heading2",
                    "Heading3",
                    "Heading4",
                    "Heading5",
                    "Heading6",
                    "Heading7",
                    "Heading8",
                    "Heading9"
                ]
            })
            .map(pStyle => pStyle.closest("w:p"))
            .filter(p => p)
        const header = headingPars.find(p =>
            titleWords.includes(this.getTextContent(p).trim())
        )
        const content = []
        if (header && header.nextSibling) {
            //const content = []
            //const containerNodes = [sectionHeader]
            const headerLevel = this.getParaStyle(header).level
            let searchPar = header

            // Add everything to abstract until next heading with the same or lower level
            while (
                searchPar.nextSibling &&
                (!maxPars || content.length < maxPars)
            ) {
                searchPar = searchPar.nextSibling
                const paraStyle = this.getParaStyle(searchPar)
                if (paraStyle.isHeading && paraStyle.level <= headerLevel) {
                    break
                }
                content.push(searchPar)
            }
        }

        return {header, content}
    }

    groupContentIntoSections(body) {
        const sections = []
        let currentSection = {
            title: null,
            content: []
        }

        const skippedBlocks = []

        body.children.forEach(node => {
            if (skippedBlocks.includes(node)) {
                return
            }
            if (node.tagName !== "w:p") {
                return
            }

            const style = this.getParaStyle(node)
            const title = this.getSectionTitle(node, style)
            if (title && style.isHeading) {
                if (currentSection.content.length) {
                    sections.push(currentSection)
                }
                currentSection = {
                    title,
                    content: []
                }
            }

            const block = this.convertBlock(node, skippedBlocks)
            if (block) {
                currentSection.content.push(block)
            }
        })

        if (currentSection.content.length) {
            sections.push(currentSection)
        }

        return sections
    }

    getSectionTitle(node, style) {
        if (!node || !style) {
            return null
        }

        // For headings, use text content as section title
        if (style.isHeading && style.level <= 4) {
            return this.getTextContent(node)
        }

        // Check style name for section indicators
        if (style.name) {
            const name = style.name.toLowerCase()
            if (name.includes("section") || name.includes("title")) {
                return this.getTextContent(node)
            }
        }

        return null
    }

    findMatchingTemplatePart(sectionTitle, templateParts) {
        if (!sectionTitle) {
            return null
        }

        // Try exact match first
        let matchingPart = templateParts.find(
            part =>
                part.type === "richtext_part" &&
                !part.attrs.metadata &&
                part.attrs.title.toLowerCase() === sectionTitle.toLowerCase()
        )

        if (!matchingPart) {
            // Try fuzzy matching
            matchingPart = templateParts.find(
                part =>
                    part.type === "richtext_part" &&
                    !part.attrs.metadata &&
                    this.isSimilarTitle(part.attrs.title, sectionTitle)
            )
        }

        return matchingPart
    }

    isSimilarTitle(title1, title2) {
        const normalized1 = (0,_helpers__rspack_import_4.normalizeText)(title1)
        const normalized2 = (0,_helpers__rspack_import_4.normalizeText)(title2)

        return (
            normalized1.includes(normalized2) ||
            normalized2.includes(normalized1)
        )
    }

    getTextContent(node) {
        return node
            .queryAll("w:t")
            .map(t => t.textContent)
            .join("")
    }

    extractTitle(body) {
        // First try to find paragraph with Title style
        const titlePars = body
            .queryAll("w:pStyle", {"w:val": "Title"})
            .map(pStyle => pStyle.closest("w:p"))
            .filter(p => p)

        if (titlePars.length) {
            return {
                content: this.convertInline(titlePars[0]),
                containerNodes: [titlePars[0]]
            }
        }

        // Fall back to first heading
        const headingPars = body
            .queryAll("w:pStyle", {
                "w:val": [
                    "Heading1",
                    "Heading2",
                    "Heading3",
                    "Heading4",
                    "Heading5",
                    "Heading6",
                    "Heading7",
                    "Heading8",
                    "Heading9"
                ]
            })
            .map(pStyle => pStyle.closest("w:p"))
            .filter(p => p)
        if (headingPars.length) {
            return {
                content: this.convertInline(headingPars[0]),
                containerNodes: [headingPars[0]]
            }
        }

        return {
            content: [
                {
                    type: "text",
                    text: gettext("Untitled")
                }
            ],
            containerNodes: []
        }
    }

    inBibliography(node) {
        // Check if we currently are in a field.
        const currentField = this.currentFields[this.currentFields.length - 1]

        if (
            currentField &&
            (0,_citations__rspack_import_3.isDocxBibliographyField)(currentField.instructions)
        ) {
            return true
        }
        // Check every SDT block inside this paragraph.
        for (const sdt of node.queryAll("w:sdt")) {
            if ((0,_citations__rspack_import_3.isDocxSdtBibliography)(sdt)) {
                return true
            }
        }

        return false
    }

    convertBlock(node, skippedBlocks = []) {
        if (node.tagName !== "w:p") {
            return null
        }
        const inBibliography = this.inBibliography(node)
        let converted
        const style = this.getParaStyle(node)
        if (style.isHeading) {
            converted = this.convertHeading(node, style)
        } else if (style.numbering) {
            converted = this.convertListItem(node, style)
        } else if (
            style.isCaption &&
            (node.query("w:drawing") || node.query("w:pict"))
        ) {
            converted = this.convertFigure(node, node)
        } else if (
            style.isCaption &&
            (node.nextSibling?.query("w:drawing") ||
                node.nextSibling?.query("w:pict")) &&
            !skippedBlocks.includes(node.nextSibling)
        ) {
            skippedBlocks.push(node.nextSibling)
            converted = this.convertFigure(node.nextSibling, node)
        } else if (node.query("w:drawing") || node.query("w:pict")) {
            if (
                node.nextSibling &&
                this.getParaStyle(node.nextSibling).isCaption
            ) {
                skippedBlocks.push(node.nextSibling)
                converted = this.convertFigure(node, node.nextSibling)
            } else {
                converted = this.convertFigure(node)
            }
        } else {
            converted = this.convertParagraph(node)
        }
        if (inBibliography || this.inBibliography(node)) {
            // We skip bibliography paragraphs
            return null
        }
        return this.wrapTrackChanges(node, converted)
    }

    wrapTrackChanges(node, content) {
        if (!content || !node.previousSibling) {
            return content
        }
        const track = this.getTracksFromNode(node.previousSibling)
        if (!track) {
            return content
        }

        return {
            ...content,
            attrs: Object.assign({}, content.attrs || {}, {track})
        }
    }

    getTracksFromNode(node) {
        const deletion = node.query("w:pPr")?.query("w:del")
        const insertion = node.query("w:pPr")?.query("w:ins")

        const tracks = []

        if (insertion) {
            const date = new Date(insertion.getAttribute("w:date"))
            const date10 = Math.floor(date.getTime() / 60000) * 10
            tracks.push({
                type: "insertion",
                user: 0, // Default user ID
                username: insertion.getAttribute("w:author"),
                date: date10
            })
        }

        if (deletion) {
            const date = new Date(deletion.getAttribute("w:date"))
            const date10 = Math.floor(date.getTime() / 60000) * 10
            tracks.push({
                type: "deletion",
                user: 0, // Default user ID
                username: deletion.getAttribute("w:author"),
                date: date10
            })
        }

        if (tracks.length === 0) {
            return null
        }

        return tracks
    }

    getParaStyle(node) {
        const pStyle = node.query("w:pStyle")
        const styleId = pStyle?.getAttribute("w:val")
        const style = this.parser.styles[styleId] || {}

        const numPr = node.query("w:numPr")
        const numId = numPr?.query("w:numId")?.getAttribute("w:val")
        const ilvl = parseInt(
            numPr?.query("w:ilvl")?.getAttribute("w:val") || "0"
        )

        return {
            ...style,
            numbering: numId
                ? {
                      id: numId,
                      level: ilvl,
                      definition: this.parser.numbering[numId]
                  }
                : null
        }
    }

    convertParagraph(node) {
        const pStyle = node.query("w:pStyle")
        const styleId = pStyle?.getAttribute("w:val")

        // Check if this is a code block (Code style)
        if (
            styleId &&
            (styleId === "Code" || styleId.toLowerCase().includes("code"))
        ) {
            return {
                type: "code_block",
                attrs: {
                    track: [],
                    language: "",
                    category: "",
                    title: "",
                    id: ""
                },
                content: this.convertInline(node)
            }
        }

        return {
            type: "paragraph",
            content: this.convertInline(node)
        }
    }

    convertHeading(node, style) {
        return {
            type: `heading${style.level}`,
            attrs: {
                id: (0,_schema_common__rspack_import_2.randomHeadingId)(),
                level: style.level
            },
            content: this.convertInline(node)
        }
    }

    convertListItem(node, style) {
        const numbering = style.numbering
        const level = numbering.definition?.levels[numbering.level]

        return {
            type: level?.format === "bullet" ? "bullet_list" : "ordered_list",
            attrs: {
                id: `L${Math.random().toString(36).slice(2)}`,
                level: numbering.level,
                start: level?.start || 1
            },
            content: [
                {
                    type: "list_item",
                    content: [this.convertParagraph(node)]
                }
            ]
        }
    }

    convertFigure(node, captionNode = null) {
        let captionBlock, captionOrder
        if (captionNode) {
            captionBlock = this.convertParagraph(captionNode)
            captionOrder = node.nextSibling === captionNode ? "after" : "before"
        }

        const drawing = node.query("w:drawing")
        if (!drawing) {
            return null
        }

        const blip = drawing.query("a:blip")
        if (!blip) {
            return null
        }

        const rId = blip.getAttribute("r:embed")
        const rel = this.parser.relationships[rId]
        if (!rel) {
            return null
        }

        const imagePath = rel.target.split("/").pop()
        const imageBlob = this.parser.images[imagePath]

        if (!imageBlob) {
            return null
        }

        // <a:ext cx="5753598" cy="4463556" />
        //
        const size = drawing.query("a:ext")
        const width = parseInt(size.getAttribute("cx") || 0) / 9525 // In EMUs
        const height = parseInt(size.getAttribute("cy") || 0) / 9525 // In EMUs

        const imageId = Math.floor(Math.random() * 1000000)
        this.images[imageId] = {
            id: imageId,
            title: imagePath,
            image: imagePath,
            file: imageBlob,

            copyright: {
                holder: false,
                year: false,
                freeToRead: true,
                licenses: []
            },
            checksum: 0,
            width,
            height
        }

        const image = {
            type: "image",
            attrs: {
                image: imageId
            }
        }

        const caption = {
            type: "figure_caption",
            content: captionBlock?.content || []
        }

        const content =
            captionOrder === "before" ? [caption, image] : [image, caption]

        return {
            type: "figure",
            attrs: {
                id: (0,_schema_common__rspack_import_2.randomFigureId)(),
                aligned: "center",
                width: 100,
                caption: !!captionBlock
            },
            content
        }
    }

    convertInline(node) {
        const content = []

        // We'll process all inline nodes in document order
        node.children.forEach(child => {
            let contentReceiver = content
            const currentField =
                this.currentFields[this.currentFields.length - 1]
            if (currentField) {
                if (currentField.status === "instruction") {
                    // We're currently inside the instruction part of a fieldChar
                    const instrText = child.query("w:instrText")
                    if (instrText) {
                        currentField.instructions += instrText.textContent
                    }
                }
                if (currentField.status === "display") {
                    // We're currently inside the display part of a fieldChar
                    contentReceiver = currentField.display
                }
            }
            if (child.tagName === "w:r") {
                // A run
                const fieldChar = child.query("w:fldChar")
                if (fieldChar) {
                    let currentField
                    let rendercurrentField = false
                    const type = fieldChar.getAttribute("w:fldCharType")
                    if (type === "begin") {
                        currentField = {
                            status: "instruction",
                            display: [],
                            instructions: "",
                            data: null
                        }
                        this.currentFields.push(currentField)
                    } else if (type === "separate") {
                        currentField =
                            this.currentFields[this.currentFields.length - 1]
                        currentField.status = "display"
                        contentReceiver = currentField.display
                    } else if (type === "end") {
                        currentField = this.currentFields.pop()
                        // If a fieldChar is closed and there was no display part,
                        // or it is inside another fieldChar, do nothing
                        if (
                            currentField &&
                            currentField.status === "display" &&
                            this.currentFields.length === 0
                        ) {
                            rendercurrentField = true
                            contentReceiver = content
                        }
                    }
                    // Capture base64-encoded field data (used by EndNote)
                    const fldDataNode = fieldChar.query("w:fldData")
                    if (fldDataNode && currentField) {
                        currentField.data = fldDataNode.textContent || null
                    }

                    if (rendercurrentField && currentField) {
                        this.renderField(currentField).forEach(node =>
                            contentReceiver.push(node)
                        )
                    }
                    return
                }

                // Process footnote references
                const footnoteRef = child.query("w:footnoteReference")
                if (footnoteRef) {
                    const footnoteId = footnoteRef.getAttribute("w:id")
                    if (this.parser.footnotes[footnoteId]) {
                        contentReceiver.push(this.convertFootnote(footnoteId))
                    }
                    return
                }

                // Process endnote references
                const endnoteRef = child.query("w:endnoteReference")
                if (endnoteRef) {
                    const endnoteId = endnoteRef.getAttribute("w:id")
                    if (this.parser.endnotes[endnoteId]) {
                        contentReceiver.push(
                            this.convertFootnote(endnoteId, true)
                        )
                    }
                    return
                }

                // Process text with formatting
                const text =
                    child.query("w:t")?.textContent ||
                    child.query("w:delText")?.textContent
                if (!text) {
                    // Process line breaks
                    if (child.query("w:br")) {
                        contentReceiver.push({type: "hard_break"})
                    }
                    return
                }

                const rPr = child.query("w:rPr")
                const formatting = rPr
                    ? this.parser.extractRunProperties(rPr)
                    : {}
                const insertion = child.closest("w:ins")
                const deletion = child.closest("w:del")

                contentReceiver.push({
                    type: "text",
                    text,
                    marks: this.createMarksFromFormatting(
                        formatting,
                        insertion,
                        deletion
                    )
                })
            } else if (child.tagName === "w:hyperlink") {
                // Process hyperlink
                const rId = child.getAttribute("r:id")
                const anchor = child.getAttribute("w:anchor")
                const relationship = rId ? this.parser.relationships[rId] : null
                const href =
                    relationship?.target || (anchor ? `#${anchor}` : null)

                if (href) {
                    const runs = child.queryAll("w:r")
                    const text = runs
                        .map(run => run.query("w:t")?.textContent || "")
                        .join("")

                    if (text) {
                        // Check if this is an internal link (bookmark reference) that should be a cross-reference
                        if (anchor && this.referenceTargets[anchor]) {
                            // If the link text is similar to the target text, treat it as a cross-reference
                            const target = this.referenceTargets[anchor]
                            const targetText = target.text || anchor

                            // Compare normalized versions to check if text matches target
                            if (
                                (0,_helpers__rspack_import_4.normalizeText)(text) ===
                                    (0,_helpers__rspack_import_4.normalizeText)(targetText) ||
                                // Also check for "Figure X: " or "Table X: " style references
                                text.match(
                                    /^(Figure|Table|Equation)\s+\d+(\.\d+)*(\:|\.)?\s*$/i
                                )
                            ) {
                                contentReceiver.push(
                                    this.convertCrossReference(anchor, text)
                                )
                                return
                            }
                        }

                        // Otherwise, treat as a normal link
                        const rPr = runs[0]?.query("w:rPr")
                        const formatting = rPr
                            ? this.parser.extractRunProperties(rPr)
                            : {}

                        const marks = this.createMarksFromFormatting(formatting)
                        marks.push({
                            type: "link",
                            attrs: {href, title: text}
                        })
                        contentReceiver.push({
                            type: "text",
                            text,
                            marks
                        })
                    }
                }
            } else if (child.tagName === "m:oMath") {
                const equationNode = this.convertEquation(child)
                if (equationNode) {
                    contentReceiver.push(equationNode)
                }
            } else if (child.tagName === "w:sdt") {
                if ((0,_citations__rspack_import_3.isDocxSdtCitation)(child)) {
                    // Used by Mendeley Cite & Citavi
                    const citationNode = (0,_citations__rspack_import_3.parseDocxSdtCitation)(
                        child,
                        this.bibliography
                    )
                    if (citationNode) {
                        contentReceiver.push(citationNode)
                    }
                }
            } else {
                console.warn("unhandled node", child)
            }
        })

        return content
    }

    // Method to help process cross-references in documents
    findReferenceTargets(document) {
        const targets = {}

        // Find bookmarks
        document.queryAll("w:bookmarkStart").forEach(bookmark => {
            const id = bookmark.getAttribute("w:id")
            const name = bookmark.getAttribute("w:name")
            if (id && name) {
                targets[name] = {
                    id: name,
                    type: "bookmark"
                }
            }
        })

        // Find headings (with styles like Heading1, Heading2, etc.)
        document.queryAll("w:pStyle").forEach(pStyle => {
            const val = pStyle.getAttribute("w:val")
            if (val && val.match(/^Heading\d+$/)) {
                const paragraph = pStyle.closest("w:p")
                if (paragraph) {
                    const text = this.getTextContent(paragraph)
                    // Create an ID from the heading text
                    const id = text
                        .trim()
                        .toLowerCase()
                        .replace(/[^\w\s-]/g, "")
                        .replace(/\s+/g, "-")

                    targets[id] = {
                        id: id,
                        type: "heading",
                        text: text
                    }
                }
            }
        })

        return targets
    }

    convertFootnote(id, isEndnote = false) {
        const footnoteContent = isEndnote
            ? this.parser.endnotes[id].content
            : this.parser.footnotes[id].content

        // Convert the footnote content to our document model
        const content = []
        footnoteContent.forEach(block => {
            if (block.type === "paragraph") {
                content.push({
                    type: "paragraph",
                    content: block.content.map(node => {
                        if (node.type === "text") {
                            return {
                                type: "text",
                                text: node.text,
                                marks: node.marks || []
                            }
                        }
                        return node
                    })
                })
            }
        })

        return {
            type: "footnote",
            attrs: {
                footnote: content
            }
        }
    }

    convertEquation(oMathNode) {
        // Extract OMML content and convert to MathML
        const mmlNode = (0,_omml2mathml__rspack_import_5.omml2mathml)(oMathNode)
        const latex = mathml_to_latex__rspack_import_0.MathMLToLaTeX.convert(mmlNode.outerXML)
        return {
            type: "equation",
            attrs: {
                equation: latex
            }
        }
    }

    simplifiedOmmlToLatex(omml) {
        // This is a very basic conversion - in a real implementation you would
        // use a library like MathML-to-LaTeX or implement a more complete converter

        // Extract text content as a fallback
        const textContent = omml
            .replace(/<[^>]+>/g, " ")
            .replace(/\s+/g, " ")
            .trim()

        // If the OMML contains a fraction
        if (omml.includes("<m:f>")) {
            const numMatch = omml.match(/<m:num>(.*?)<\/m:num>/s)
            const denMatch = omml.match(/<m:den>(.*?)<\/m:den>/s)

            if (numMatch && denMatch) {
                const num = numMatch[1].replace(/<[^>]+>/g, "").trim()
                const den = denMatch[1].replace(/<[^>]+>/g, "").trim()
                return `\\frac{${num}}{${den}}`
            }
        }

        // If it contains a superscript
        if (omml.includes("<m:sup>")) {
            const baseMatch = omml.match(/<m:e>(.*?)<\/m:e>/s)
            const supMatch = omml.match(/<m:sup>(.*?)<\/m:sup>/s)

            if (baseMatch && supMatch) {
                const base = baseMatch[1].replace(/<[^>]+>/g, "").trim()
                const sup = supMatch[1].replace(/<[^>]+>/g, "").trim()
                return `${base}^{${sup}}`
            }
        }

        // If it contains a subscript
        if (omml.includes("<m:sub>")) {
            const baseMatch = omml.match(/<m:e>(.*?)<\/m:e>/s)
            const subMatch = omml.match(/<m:sub>(.*?)<\/m:sub>/s)

            if (baseMatch && subMatch) {
                const base = baseMatch[1].replace(/<[^>]+>/g, "").trim()
                const sub = subMatch[1].replace(/<[^>]+>/g, "").trim()
                return `${base}_{${sub}}`
            }
        }

        // Return a simplified representation with the text content
        return textContent || "x^2" // Default fallback
    }

    renderField(field) {
        const instr = field.instructions.trim()

        // Handle REF fields (cross-references)
        if (instr.startsWith("REF ")) {
            // Extract the target bookmark/heading ID
            const parts = instr.substring(4).trim().split(/\s+/)
            if (parts.length > 0) {
                const target = parts[0]
                const text = field.display.reduce(
                    (accumulator, currentValue) => {
                        if (currentValue.type === "text") {
                            return accumulator + currentValue.text
                        }
                        return accumulator
                    },
                    ""
                )
                return [this.convertCrossReference(target, text)]
            }
        }
        // Handle citation fields
        else if ((0,_citations__rspack_import_3.isDocxCitationField)(instr)) {
            return [
                (0,_citations__rspack_import_3.parseDocxFieldCitation)(
                    instr,
                    field.data,
                    this.sourcesXml,
                    this.bibliography
                )
            ]
        } else if ((0,_citations__rspack_import_3.isDocxBibliographyField)(instr)) {
            // We don't render the contents of bibliography fields
            return []
        } else {
            // We do not support this field type, so instead we return the display content.
            return field.display || []
        }
    }

    convertCrossReference(targetId, displayText) {
        // Look up the target in our reference targets
        const target = this.referenceTargets[targetId]

        // If we found the target, use its information
        if (target) {
            return {
                type: "cross_reference",
                attrs: {
                    id: targetId,
                    title: displayText || target.text || targetId
                }
            }
        }

        // If target not found, create a reference with the display text or target ID
        return {
            type: "cross_reference",
            attrs: {
                id: targetId,
                title: displayText || targetId
            }
        }
    }

    createMarksFromFormatting(formatting, insertion = null, deletion = null) {
        const marks = []
        if (formatting.bold) {
            marks.push({type: "strong"})
        }
        if (formatting.italic) {
            marks.push({type: "em"})
        }
        if (formatting.underline) {
            marks.push({type: "underline"})
        }
        // Handle superscript and subscript
        if (formatting.vertAlign === "superscript") {
            marks.push({type: "sup"})
        }
        if (formatting.vertAlign === "subscript") {
            marks.push({type: "sub"})
        }
        // Handle inline code (monospace fonts)
        if (formatting.fontFamily) {
            const monospacePatterns = [
                /^courier/i,
                /^consolas/i,
                /^monaco/i,
                /^menlo/i,
                /^lucida console/i,
                /^liberation mono/i,
                /^dejavu sans mono/i,
                /^bitstream vera sans mono/i,
                /^source code pro/i,
                /^fira code/i,
                /^ubuntu mono/i,
                /^droid sans mono/i
            ]
            const isMonospace = monospacePatterns.some(pattern =>
                pattern.test(formatting.fontFamily)
            )
            if (isMonospace) {
                marks.push({type: "code"})
            }
        }
        if (insertion) {
            const date = new Date(insertion.getAttribute("w:date"))
            const date10 = Math.floor(date.getTime() / 600000) * 10
            marks.push({
                type: "insertion",
                attrs: {
                    user: 0,
                    username: insertion.getAttribute("w:author"),
                    date: date10,
                    approved: false
                }
            })
        }
        if (deletion) {
            const date = new Date(deletion.getAttribute("w:date"))
            const date10 = Math.floor(date.getTime() / 600000) * 10
            marks.push({
                type: "deletion",
                attrs: {
                    user: 0,
                    username: deletion.getAttribute("w:author"),
                    date: date10
                }
            })
        }
        return marks
    }

    hasTrackedChanges(doc) {
        return Boolean(doc.query("w:ins") || doc.query("w:del"))
    }

    detectLanguage(doc) {
        return doc.query("w:lang")?.getAttribute("w:val") || "en-US"
    }
}


}),
"./js/modules/importer/docx/helpers.js": (function (__unused_rspack_module, __webpack_exports__, __webpack_require__) {
"use strict";
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  normalizeText: function() { return normalizeText; }
});
const normalizeText = text => {
    if (!text) {
        return ""
    }
    return text
        .toLowerCase()
        .replace(/[^a-z0-9]/g, "")
        .trim()
}


}),
"./js/modules/importer/docx/import.js": (function (__unused_rspack_module, __webpack_exports__, __webpack_require__) {
"use strict";
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  DocxImporter: function() { return DocxImporter; }
});
/* import */ var _common__rspack_import_0 = __webpack_require__("./js/modules/common/index.js");
/* import */ var _native__rspack_import_1 = __webpack_require__("./js/modules/importer/native/index.js");
/* import */ var _convert__rspack_import_2 = __webpack_require__("./js/modules/importer/docx/convert.js");




class DocxImporter {
    constructor(file, user, path, importId, options = {}) {
        this.file = file
        this.user = user
        this.path = path
        this.importId = importId
        this._options = options.files // Not used in the DOCX importer

        this.template = null
        this.output = {
            ok: false,
            statusText: "",
            doc: null,
            docInfo: null
        }
    }

    init() {
        return this.getTemplate().then(() => this.importDocx())
    }

    getTemplate() {
        return (0,_common__rspack_import_0.jsonPostJson)("/api/document/get_template/", {
            import_id: this.importId
        }).then(({json}) => {
            this.template = json.template
        })
    }

    importDocx() {
        const bibliography = {} // Initial empty bibliography
        return Promise.resolve(/* import() */).then(__webpack_require__.t.bind(__webpack_require__, "./node_modules/.pnpm/jszip@3.10.1/node_modules/jszip/dist/jszip.min.js", 23)).then(({default: JSZip}) => {
            return JSZip.loadAsync(this.file).then(zip => {
                const docx = new _convert__rspack_import_2.DocxConvert(
                    zip,
                    this.importId,
                    this.template,
                    bibliography
                )

                return docx.init().then(convertedDoc => {
                    const title =
                        convertedDoc.content.content[0].content?.[0]?.text ||
                        gettext("Untitled")
                    const nativeImporter = new _native__rspack_import_1.NativeImporter(
                        {
                            content: convertedDoc.content,
                            title,
                            comments: convertedDoc.comments,
                            settings: convertedDoc.settings
                        },
                        bibliography,
                        docx.images,
                        [], // No additional image files needed
                        this.user,
                        this.importId,
                        this.path + title
                    )

                    return nativeImporter
                        .init()
                        .then(({doc, docInfo}) => {
                            this.output.ok = true
                            this.output.doc = doc
                            this.output.docInfo = docInfo
                            this.output.statusText = `${(0,_common__rspack_import_0.escapeText)(doc.title)} ${gettext("successfully imported.")}`
                            return this.output
                        })
                        .catch(error => {
                            this.output.statusText = error.message
                            console.error(error)
                            return this.output
                        })
                })
            })
        })
    }
}


}),
"./js/modules/importer/docx/index.js": (function (__unused_rspack_module, __webpack_exports__, __webpack_require__) {
"use strict";
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  DocxImporter: function() { return /* reexport safe */ _import__rspack_import_0.DocxImporter; }
});
/* import */ var _import__rspack_import_0 = __webpack_require__("./js/modules/importer/docx/import.js");



}),
"./js/modules/importer/docx/omml2mathml.js": (function (__unused_rspack_module, __webpack_exports__, __webpack_require__) {
"use strict";
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  omml2mathml: function() { return omml2mathml; }
});
/* import */ var _exporter_tools_xml__rspack_import_0 = __webpack_require__("./js/modules/exporter/tools/xml.js");
// Converted version of https://github.com/scienceai/omml2mathml/blob/master/index.js
// that works with our xml dom.


const MATH_NS = "http://www.w3.org/1998/Math/MathML"

// Regular expression matching mathematical operators
const oprx =
    /[\+\-\*\/\^\&\|\!\~\<\>\=\:\u2208\u2209\u220B\u220C\u2218\u2219\u221D\u2223\u2224\u2225\u2226\u2227\u2228\u2229\u222A\u222B\u222C\u222D\u2234\u2235\u2236\u2237\u2238\u2239\u223A\u223B\u223C\u223D\u223E\u223F\u2240\u2241\u2242\u2243\u2244\u2245\u2246\u2247\u2248\u2249\u224A\u224B\u224C\u224D\u224E\u224F\u2250\u2251\u2252\u2253\u2254\u2255\u2256\u2257\u2258\u2259\u225A\u225B\u225C\u225D\u225E\u225F\u2260\u2261\u2262\u2263\u2264\u2265\u2266\u2267\u2268\u2269\u226A\u226B\u226C\u226D\u226E\u226F\u2270\u2271\u2272\u2273\u2274\u2275\u2276\u2277\u2278\u2279\u227A\u227B\u227C\u227D\u227E\u227F\u2280\u2281\u2282\u2283\u2284\u2285\u2286\u2287\u2288\u2289\u228A\u228B\u228C\u228D\u228E\u228F\u2290\u2291\u2292\u2293\u2294\u2295\u2296\u2297\u2298\u2299\u229A\u229B\u229C\u229D\u229E\u229F\u22A0\u22A1\u22A2\u22A3\u22A4\u22A5\u22A6\u22A7\u22A8\u22A9\u22AA\u22AB\u22AC\u22AD\u22AE\u22AF\u22B0\u22B1\u22B2\u22B3\u22B4\u22B5\u22B6\u22B7\u22B8\u22B9\u22BA\u22BB\u22BC\u22BD\u22C0\u22C1\u22C2\u22C3\u22C4\u22C5\u22C6\u22C7\u22C8\u22C9\u22CA\u22CB\u22CC\u22CD\u22CE\u22CF\u22D0\u22D1\u22D2\u22D3\u22D4\u22D5\u22D6\u22D7\u22D8\u22D9\u22DA\u22DB\u22DC\u22DD\u22DE\u22DF\u22E0\u22E1\u22E2\u22E3\u22E4\u22E5\u22E6\u22E7\u22E8\u22E9\u22EA\u22EB\u22EC\u22ED\u22EE\u22EF\u22F0\u22F1\u22F2\u22F3\u22F4\u22F5\u22F6\u22F7\u22F8\u22F9\u22FA\u22FB\u22FC\u22FD\u22FE\u22FF]/

/**
 * Converts OMML to MathML
 * @param {XMLElement} omml - OMML XML element
 * @return {string} MathML XML string
 */
function omml2mathml(omml) {
    // Create the root math element
    const math = (0,_exporter_tools_xml__rspack_import_0.xmlDOM)(`<math xmlns="${MATH_NS}" display="inline"></math>`)

    // Process the OMML document
    processOMML(omml, math)

    return math
}

/**
 * Process the OMML document and convert to MathML
 * @param {XMLElement} omml - The OMML element to process
 * @param {XMLElement} math - The parent MathML element
 */
function processOMML(omml, math) {
    // Handle different OMML elements
    if (omml.tagName === "m:oMathPara") {
        math.setAttribute("display", "block")
        omml.queryAll("m:oMath").forEach(omath => {
            processOMML(omath, math)
        })
    } else if (omml.tagName === "m:oMath") {
        const mrow = createMathElement("mrow", {}, math)
        processChildren(omml, mrow)
    } else {
        processElement(omml, math)
    }
}

/**
 * Process an OMML element and create corresponding MathML
 * @param {XMLElement} element - The OMML element to process
 * @param {XMLElement} parent - The parent MathML element
 */
function processElement(element, parent) {
    if (!element || !element.tagName) {
        return
    }

    switch (element.tagName) {
        case "m:f":
            processFraction(element, parent)
            break
        case "m:r":
            processRun(element, parent)
            break
        case "m:limLow":
            processLimLow(element, parent)
            break
        case "m:limUpp":
            processLimUpp(element, parent)
            break
        case "m:sSub":
            processSubscript(element, parent)
            break
        case "m:sSup":
            processSuperscript(element, parent)
            break
        case "m:sSubSup":
            processSubSuperscript(element, parent)
            break
        case "m:sPre":
            processPreScript(element, parent)
            break
        case "m:m":
            processMatrix(element, parent)
            break
        case "m:rad":
            processRadical(element, parent)
            break
        case "m:nary":
            processNary(element, parent)
            break
        case "m:d":
            processDelimiter(element, parent)
            break
        case "m:eqArr":
            processEqArr(element, parent)
            break
        case "m:func":
            processFunction(element, parent)
            break
        case "m:acc":
            processAccent(element, parent)
            break
        case "m:groupChr":
            processGroupChar(element, parent)
            break
        case "m:borderBox":
            processBorderBox(element, parent)
            break
        case "m:bar":
            processBar(element, parent)
            break
        case "m:phant":
            processPhantom(element, parent)
            break
        case "m:e":
        case "m:den":
        case "m:num":
        case "m:lim":
        case "m:sup":
        case "m:sub":
            processArgument(element, parent)
            break
        default:
            // Process children for unhandled elements
            processChildren(element, parent)
    }
}

/**
 * Process all children of an element
 * @param {XMLElement} element - The element whose children to process
 * @param {XMLElement} parent - The parent MathML element
 */
function processChildren(element, parent) {
    if (!element || !element.children) {
        return
    }

    element.children.forEach(child => {
        if (typeof child === "object") {
            processElement(child, parent)
        }
    })
}

/**
 * Create a MathML element with specified attributes
 * @param {string} tag - The MathML tag name
 * @param {Object} attrs - The attributes to set
 * @param {XMLElement} parent - The parent element
 * @return {XMLElement} The created element
 */
function createMathElement(tag, attrs = {}, parent = null) {
    const elem = (0,_exporter_tools_xml__rspack_import_0.xmlDOM)(`<${tag}></${tag}>`)

    // Set attributes
    Object.entries(attrs).forEach(([key, value]) => {
        if (value !== undefined && value !== "") {
            elem.setAttribute(key, value)
        }
    })

    if (parent) {
        parent.appendChild(elem)
    }

    return elem
}

/**
 * Process a fraction element
 * @param {XMLElement} element - The OMML fraction element
 * @param {XMLElement} parent - The parent MathML element
 */
function processFraction(element, parent) {
    const type = getAttr(element, "m:fPr/m:type", "m:val") || ""

    if (type.toLowerCase() === "lin") {
        const mrow = createMathElement("mrow", {}, parent)
        const numRow = createMathElement("mrow", {}, mrow)
        const num = element.query("m:num")
        if (num) {
            processElement(num, numRow)
        }
        const mo = createMathElement("mo", {}, mrow)
        mo.textContent = "/"

        const denRow = createMathElement("mrow", {}, mrow)
        const den = element.query("m:den")
        if (den) {
            processElement(den, denRow)
        }
    } else {
        const attr = getFracProps(type.toLowerCase())
        const mfrac = createMathElement("mfrac", attr, parent)

        const numRow = createMathElement("mrow", {}, mfrac)
        const num = element.query("m:num")
        if (num) {
            processElement(num, numRow)
        }
        const denRow = createMathElement("mrow", {}, mfrac)
        const den = element.query("m:den")
        if (den) {
            processElement(den, denRow)
        }
    }
}

/**
 * Process a run of text
 * @param {XMLElement} element - The OMML run element
 * @param {XMLElement} parent - The parent MathML element
 */
function processRun(element, parent) {
    const nor = forceFalse(getAttr(element, "m:rPr/m:nor", "m:val") || "false")
    if (nor) {
        const mtext = createMathElement("mtext", {}, parent)
        const textContent = element
            .queryAll("m:t")
            .map(t => t.textContent)
            .join("")
        mtext.textContent = nbsp(textContent)
    } else {
        element.queryAll("m:t").forEach(t => {
            const toParse = t.textContent
            const scr = getAttr(element, "m:rPr/m:scr", "m:val")
            const sty = getAttr(element, "m:rPr/m:sty", "m:val")
            parseMT(element, parent, {
                toParse,
                scr,
                sty,
                nor: false
            })
        })
    }
}

/**
 * Process a lower limit element
 * @param {XMLElement} element - The OMML limLow element
 * @param {XMLElement} parent - The parent MathML element
 */
function processLimLow(element, parent) {
    const munder = createMathElement("munder", {}, parent)
    const row1 = createMathElement("mrow", {}, munder)
    const row2 = createMathElement("mrow", {}, munder)

    const e = element.query("m:e")
    if (e) {
        processElement(e, row1)
    }

    const lim = element.query("m:lim")
    if (lim) {
        processElement(lim, row2)
    }
}

/**
 * Process an upper limit element
 * @param {XMLElement} element - The OMML limUpp element
 * @param {XMLElement} parent - The parent MathML element
 */
function processLimUpp(element, parent) {
    const mover = createMathElement("mover", {}, parent)
    const row1 = createMathElement("mrow", {}, mover)
    const row2 = createMathElement("mrow", {}, mover)

    const e = element.query("m:e")
    if (e) {
        processElement(e, row1)
    }

    const lim = element.query("m:lim")
    if (lim) {
        processElement(lim, row2)
    }
}

/**
 * Process a subscript element
 * @param {XMLElement} element - The OMML sSub element
 * @param {XMLElement} parent - The parent MathML element
 */
function processSubscript(element, parent) {
    const msub = createMathElement("msub", {}, parent)
    const row1 = createMathElement("mrow", {}, msub)
    const row2 = createMathElement("mrow", {}, msub)

    const e = element.query("m:e")
    if (e) {
        processElement(e, row1)
    }

    const sub = element.query("m:sub")
    if (sub) {
        processElement(sub, row2)
    }
}

/**
 * Process a superscript element
 * @param {XMLElement} element - The OMML sSup element
 * @param {XMLElement} parent - The parent MathML element
 */
function processSuperscript(element, parent) {
    const msup = createMathElement("msup", {}, parent)
    const row1 = createMathElement("mrow", {}, msup)
    const row2 = createMathElement("mrow", {}, msup)

    const e = element.query("m:e")
    if (e) {
        processElement(e, row1)
    }

    const sup = element.query("m:sup")
    if (sup) {
        processElement(sup, row2)
    }
}

/**
 * Process a subscript-superscript element
 * @param {XMLElement} element - The OMML sSubSup element
 * @param {XMLElement} parent - The parent MathML element
 */
function processSubSuperscript(element, parent) {
    const msubsup = createMathElement("msubsup", {}, parent)
    const row1 = createMathElement("mrow", {}, msubsup)
    const row2 = createMathElement("mrow", {}, msubsup)
    const row3 = createMathElement("mrow", {}, msubsup)

    const e = element.query("m:e")
    if (e) {
        processElement(e, row1)
    }

    const sub = element.query("m:sub")
    if (sub) {
        processElement(sub, row2)
    }

    const sup = element.query("m:sup")
    if (sup) {
        processElement(sup, row3)
    }
}

/**
 * Process a prescripted element
 * @param {XMLElement} element - The OMML sPre element
 * @param {XMLElement} parent - The parent MathML element
 */
function processPreScript(element, parent) {
    const mmultiscripts = createMathElement("mmultiscripts", {}, parent)
    const row = createMathElement("mrow", {}, mmultiscripts)

    const e = element.query("m:e")
    if (e) {
        processElement(e, row)
    }

    createMathElement("mprescripts", {}, mmultiscripts)

    const sub = element.query("m:sub")
    outputScript(mmultiscripts, sub)

    const sup = element.query("m:sup")
    outputScript(mmultiscripts, sup)
}

/**
 * Process a matrix element
 * @param {XMLElement} element - The OMML matrix element
 * @param {XMLElement} parent - The parent MathML element
 */
function processMatrix(element, parent) {
    const mcjc = getAttr(element, "m:mPr/m:mcs/m:mc/m:mcPr/m:mcJc", "m:val")

    const attrs = {}
    if (mcjc && mcjc.toLowerCase() !== "center") {
        attrs.columnalign = mcjc.toLowerCase()
    }

    const mtable = createMathElement("mtable", attrs, parent)

    element.queryAll("m:mr").forEach(mr => {
        const mtr = createMathElement("mtr", {}, mtable)

        mr.queryAll("m:e").forEach(me => {
            const mtd = createMathElement("mtd", {}, mtr)
            processElement(me, mtd)
        })
    })
}

/**
 * Process a radical element
 * @param {XMLElement} element - The OMML radical element
 * @param {XMLElement} parent - The parent MathML element
 */
function processRadical(element, parent) {
    const degHide = forceFalse(
        getAttr(element, "m:radPr/m:degHide", "m:val") || "false"
    )

    if (degHide) {
        const msqrt = createMathElement("msqrt", {}, parent)
        const e = element.query("m:e")
        if (e) {
            processElement(e, msqrt)
        }
    } else {
        const mroot = createMathElement("mroot", {}, parent)
        const row1 = createMathElement("mrow", {}, mroot)
        const row2 = createMathElement("mrow", {}, mroot)

        const e = element.query("m:e")
        if (e) {
            processElement(e, row1)
        }

        const deg = element.query("m:deg")
        if (deg) {
            processElement(deg, row2)
        }
    }
}

/**
 * Process an n-ary operator element
 * @param {XMLElement} element - The OMML nary element
 * @param {XMLElement} parent - The parent MathML element
 */
function processNary(element, parent) {
    const subHide = forceFalse(
        getAttr(element, "m:naryPr/m:subHide", "m:val") || "false"
    )
    const supHide = forceFalse(
        getAttr(element, "m:naryPr/m:supHide", "m:val") || "false"
    )
    const limLocSubSup =
        (getAttr(element, "m:naryPr/m:limLoc", "m:val") || "").toLowerCase() ===
            "" ||
        (getAttr(element, "m:naryPr/m:limLoc", "m:val") || "").toLowerCase() ===
            "subsup"
    const grow = forceFalse(
        getAttr(element, "m:naryPr/m:grow", "m:val") || "false"
    )

    const mrow = createMathElement("mrow", {}, parent)

    if (supHide && subHide) {
        outputNAryMO(element, mrow, grow)
    } else if (subHide) {
        const outer = createMathElement(
            limLocSubSup ? "msup" : "mover",
            {},
            mrow
        )
        outputNAryMO(element, outer, grow)

        const suprow = createMathElement("mrow", {}, outer)
        const sup = element.query("m:sup")
        if (sup) {
            processElement(sup, suprow)
        }
    } else if (supHide) {
        const outer = createMathElement(
            limLocSubSup ? "msub" : "munder",
            {},
            mrow
        )
        outputNAryMO(element, outer, grow)

        const subrow = createMathElement("mrow", {}, outer)
        const sub = element.query("m:sub")
        if (sub) {
            processElement(sub, subrow)
        }
    } else {
        const outer = createMathElement(
            limLocSubSup ? "msubsup" : "munderover",
            {},
            mrow
        )
        outputNAryMO(element, outer, grow)

        const subrow1 = createMathElement("mrow", {}, outer)
        const sub = element.query("m:sub")
        if (sub) {
            processElement(sub, subrow1)
        }

        const subrow2 = createMathElement("mrow", {}, outer)
        const sup = element.query("m:sup")
        if (sup) {
            processElement(sup, subrow2)
        }
    }

    const erow = createMathElement("mrow", {}, mrow)
    const e = element.query("m:e")
    if (e) {
        processElement(e, erow)
    }
}

/**
 * Process a delimiter element
 * @param {XMLElement} element - The OMML delimiter element
 * @param {XMLElement} parent - The parent MathML element
 */
function processDelimiter(element, parent) {
    const begChr = getAttr(element, "m:dPr/m:begChr", "m:val")
    const endChr = getAttr(element, "m:dPr/m:endChr", "m:val")
    const sepChr = getAttr(element, "m:dPr/m:sepChr", "m:val") || "|"

    const attr = {}
    if (begChr !== undefined && begChr !== "(") {
        attr.open = begChr
    }
    if (endChr !== undefined && endChr !== ")") {
        attr.close = endChr
    }
    if (sepChr !== ",") {
        attr.separators = sepChr
    }

    const mfenced = createMathElement("mfenced", attr, parent)

    element.queryAll("m:e").forEach(me => {
        const row = createMathElement("mrow", {}, mfenced)
        processElement(me, row)
    })
}

/**
 * Process an equation array element
 * @param {XMLElement} element - The OMML eqArr element
 * @param {XMLElement} parent - The parent MathML element
 */
function processEqArr(element, parent) {
    const mtable = createMathElement("mtable", {}, parent)

    element.queryAll("m:e").forEach(me => {
        const mtr = createMathElement("mtr", {}, mtable)
        const mtd = createMathElement("mtd", {}, mtr)

        const scrLvl = getAttr(me, "m:argPr/m:scrLvl", "m:val")
        const outer =
            scrLvl !== "0" && scrLvl
                ? createMathElement("mrow", {}, mtd)
                : createMathElement("mstyle", {scriptlevel: scrLvl}, mtd)

        createMathElement("maligngroup", {}, outer)

        const firstChild = me.children[0]
        if (firstChild) {
            createEqArrRow(outer, element, firstChild, 1)
        }
    })
}

/**
 * Process a function element
 * @param {XMLElement} element - The OMML function element
 * @param {XMLElement} parent - The parent MathML element
 */
function processFunction(element, parent) {
    const outer = createMathElement("mrow", {}, parent)
    const row1 = createMathElement("mrow", {}, outer)

    element.queryAll("m:fName").forEach(fn => {
        processElement(fn, row1)
    })

    const mo = createMathElement("mo", {}, outer)
    mo.textContent = "\u2061" // Function application

    const row2 = createMathElement("mrow", {}, outer)
    const e = element.query("m:e")
    if (e) {
        processElement(e, row2)
    }
}

/**
 * Process an accent element
 * @param {XMLElement} element - The OMML accent element
 * @param {XMLElement} parent - The parent MathML element
 */
function processAccent(element, parent) {
    const mover = createMathElement("mover", {accent: "true"}, parent)
    const row = createMathElement("mrow", {}, mover)

    const e = element.query("m:e")
    if (e) {
        processElement(e, row)
    }

    const acc = (getAttr(element, "m:accPr/m:chr", "m:val") || "\u0302").substr(
        0,
        1
    )
    const nonComb = toNonCombining(acc)

    if (acc.length === 0) {
        createMathElement("mo", {}, mover)
    } else {
        const nor = forceFalse(
            getAttr(element, "m:rPr/m:nor", "m:val") || "false"
        )
        parseMT(element, mover, {
            toParse: nonComb,
            scr: getAttr(element, "m:e/*/m:rPr/m:scr", "m:val"),
            sty: getAttr(element, "m:e/*/m:rPr/m:sty", "m:val"),
            nor
        })
    }
}

/**
 * Process a group character element
 * @param {XMLElement} element - The OMML groupChr element
 * @param {XMLElement} parent - The parent MathML element
 */
function processGroupChar(element, parent) {
    const lastGroupChrPr = element.query("m:groupChrPr")
    if (!lastGroupChrPr) {
        return
    }

    const pos = (getAttr(lastGroupChrPr, "m:pos", "m:val") || "").toLowerCase()
    const vertJc = (
        getAttr(lastGroupChrPr, "m:vertJc", "m:val") || ""
    ).toLowerCase()
    const chr = getAttr(lastGroupChrPr, "m:chr", "m:val") || "\u23DF"

    const mkMrow = parent => {
        const mrow = createMathElement("mrow", {}, parent)
        const e = element.query("m:e")
        if (e) {
            processElement(e, mrow)
        }
        return mrow
    }

    const mkMo = parent => {
        const mo = createMathElement("mo", {}, parent)
        mo.textContent = chr.substr(0, 1)
        return mo
    }

    if (pos === "top") {
        if (vertJc === "bot") {
            const outer = createMathElement("mover", {accent: "false"}, parent)
            mkMrow(outer)
            mkMo(outer)
        } else {
            const outer = createMathElement(
                "munder",
                {accentunder: "false"},
                parent
            )
            mkMo(outer)
            mkMrow(outer)
        }
    } else {
        if (vertJc === "bot") {
            const outer = createMathElement("mover", {accent: "false"}, parent)
            mkMo(outer)
            mkMrow(outer)
        } else {
            const outer = createMathElement(
                "munder",
                {accentunder: "false"},
                parent
            )
            mkMrow(outer)
            mkMo(outer)
        }
    }
}

/**
 * Process a border box element
 * @param {XMLElement} element - The OMML borderBox element
 * @param {XMLElement} parent - The parent MathML element
 */
function processBorderBox(element, parent) {
    const hideTop = forceTrue(
        getAttr(element, "m:borderBoxPr/m:hideTop", "m:val") || "false"
    )
    const hideBot = forceTrue(
        getAttr(element, "m:borderBoxPr/m:hideBot", "m:val") || "false"
    )
    const hideLeft = forceTrue(
        getAttr(element, "m:borderBoxPr/m:hideLeft", "m:val") || "false"
    )
    const hideRight = forceTrue(
        getAttr(element, "m:borderBoxPr/m:hideRight", "m:val") || "false"
    )
    const strikeH = forceTrue(
        getAttr(element, "m:borderBoxPr/m:strikeH", "m:val") || "false"
    )
    const strikeV = forceTrue(
        getAttr(element, "m:borderBoxPr/m:strikeV", "m:val") || "false"
    )
    const strikeBLTR = forceTrue(
        getAttr(element, "m:borderBoxPr/m:strikeBLTR", "m:val") || "false"
    )
    const strikeTLBR = forceTrue(
        getAttr(element, "m:borderBoxPr/m:strikeTLBR", "m:val") || "false"
    )

    let outer

    if (
        hideTop &&
        hideBot &&
        hideLeft &&
        hideRight &&
        !strikeH &&
        !strikeV &&
        !strikeBLTR &&
        !strikeTLBR
    ) {
        outer = createMathElement("mrow", {}, parent)
    } else {
        const notation = createMEnclodeNotation({
            hideTop,
            hideBot,
            hideLeft,
            hideRight,
            strikeH,
            strikeV,
            strikeBLTR,
            strikeTLBR
        })
        outer = createMathElement("menclose", notation, parent)
    }

    const e = element.query("m:e")
    if (e) {
        processElement(e, outer)
    }
}

/**
 * Process a bar element
 * @param {XMLElement} element - The OMML bar element
 * @param {XMLElement} parent - The parent MathML element
 */
function processBar(element, parent) {
    const pos = (getAttr(element, "m:barPr/m:pos", "m:val") || "").toLowerCase()

    if (pos === "top") {
        const outer = createMathElement("mover", {accent: "false"}, parent)
        const row = createMathElement("mrow", {}, outer)
        const mo = createMathElement("mo", {}, outer)

        const e = element.query("m:e")
        if (e) {
            processElement(e, row)
        }

        mo.textContent = "\u00af" // Macron
    } else {
        const outer = createMathElement(
            "munder",
            {underaccent: "false"},
            parent
        )
        const row = createMathElement("mrow", {}, outer)
        const mo = createMathElement("mo", {}, outer)

        const e = element.query("m:e")
        if (e) {
            processElement(e, row)
        }

        mo.textContent = "\u005f" // Underscore
    }
}

/**
 * Process a phantom element
 * @param {XMLElement} element - The OMML phantom element
 * @param {XMLElement} parent - The parent MathML element
 */
function processPhantom(element, parent) {
    const zeroWid = forceFalse(
        getAttr(element, "m:phantPr/m:zeroWid", "m:val") || "false"
    )
    const zeroAsc = forceFalse(
        getAttr(element, "m:phantPr/m:zeroAsc", "m:val") || "false"
    )
    const zeroDesc = forceFalse(
        getAttr(element, "m:phantPr/m:zeroDesc", "m:val") || "false"
    )
    const showVal = forceFalse(
        getAttr(element, "m:phantPr/m:show", "m:val") || "false"
    )

    let container

    if (showVal) {
        container = createMathElement(
            "mpadded",
            createMPaddedAttr({zeroWid, zeroAsc, zeroDesc}),
            parent
        )
    } else if (!zeroWid && !zeroAsc && !zeroDesc) {
        container = createMathElement("mphantom", {}, parent)
    } else {
        const phant = createMathElement("mphantom", {}, parent)
        container = createMathElement(
            "mpadded",
            createMPaddedAttr({zeroWid, zeroAsc, zeroDesc}),
            phant
        )
    }

    const row = createMathElement("mrow", {}, container)
    const e = element.query("m:e")
    if (e) {
        processElement(e, row)
    }
}

/**
 * Process an argument element
 * @param {XMLElement} element - The OMML argument element
 * @param {XMLElement} parent - The parent MathML element
 */
function processArgument(element, parent) {
    const scriptlevel = getAttr(element, "m:argPr/m:scrLvl", "m:val")

    if (!scriptlevel) {
        processChildren(element, parent)
    } else {
        const style = createMathElement("mstyle", {scriptlevel}, parent)
        processChildren(element, style)
    }
}

/**
 * Get attribute value from an element using a simplified XPath-like path
 * @param {XMLElement} element - The element to query
 * @param {string} path - The simplified path to the attribute
 * @param {string} attrName - The attribute name
 * @return {string} The attribute value or empty string
 */
function getAttr(element, path, attrName) {
    if (!element) {
        return ""
    }

    const parts = path.split("/")
    let current = element

    for (let i = 0; i < parts.length; i++) {
        if (!current) {
            return ""
        }

        const part = parts[i]
        if (part.includes("[last()]")) {
            const tagName = part.replace("[last()]", "")
            const elements = current.queryAll(tagName)
            current = elements.length ? elements[elements.length - 1] : null
        } else if (part.includes("[")) {
            const match = part.match(/([^[]+)\[(\d+)\]/)
            if (match) {
                const tagName = match[1]
                const index = parseInt(match[2], 10) - 1
                const elements = current.queryAll(tagName)
                current = elements[index] || null
            } else {
                current = current.query(part) || null
            }
        } else {
            current = current.query(part) || null
        }
    }

    return current ? current.getAttribute(attrName) || "" : ""
}

/**
 * Output a script element, or "none" if not provided
 * @param {XMLElement} parent - The parent element
 * @param {XMLElement} element - The script element to output
 */
function outputScript(parent, element) {
    if (element) {
        const row = createMathElement("mrow", {}, parent)
        processElement(element, row)
    } else {
        createMathElement("none", {}, parent)
    }
}

/**
 * Output an n-ary operator
 * @param {XMLElement} element - The OMML nary element
 * @param {XMLElement} parent - The parent MathML element
 * @param {boolean} grow - Whether the operator should stretch
 */
function outputNAryMO(element, parent, grow = false) {
    const mo = createMathElement(
        "mo",
        {stretchy: grow ? "true" : "false"},
        parent
    )
    const val = getAttr(element, "m:naryPr/m:chr", "m:val")
    mo.textContent = val || "\u222b" // Integral symbol by default
}

/**
 * Create an equation array row
 * @param {XMLElement} parent - The parent MathML element
 * @param {XMLElement} src - The source OMML element
 * @param {XMLElement} cur - The current OMML element
 * @param {number} align - Alignment indicator
 */
function createEqArrRow(parent, src, cur, align) {
    if (!cur) {
        return
    }

    if (cur.tagName === "m:r") {
        const allMt = cur
            .queryAll("m:t")
            .map(t => t.textContent)
            .join("")
        const nor = forceFalse(getAttr(cur, "m:rPr/m:nor", "m:val") || "false")

        parseEqArrMr(parent, {
            toParse: allMt,
            scr: getAttr(cur, "m:rPr/m:scr", "m:val"),
            sty: getAttr(cur, "m:rPr/m:sty", "m:val"),
            nor,
            align
        })
    } else {
        processElement(cur, parent)
    }

    // Get the next sibling if available
    const siblings = cur.parentElement ? cur.parentElement.children : []
    const index = siblings.indexOf(cur)
    const nextSibling = index < siblings.length - 1 ? siblings[index + 1] : null

    if (nextSibling) {
        const allMt = cur
            .queryAll("m:t")
            .map(t => t.textContent)
            .join("")
        const amp = countAmp(allMt)
        createEqArrRow(parent, src, nextSibling, (align + (amp % 2)) % 2)
    }
}

/**
 * Parse equation array run text
 * @param {XMLElement} parent - The parent MathML element
 * @param {Object} options - Parsing options
 */
function parseEqArrMr(parent, {toParse = "", scr, sty, nor, align}) {
    if (!toParse.length) {
        return
    }

    if (toParse[0] === "&") {
        createMathElement(align ? "malignmark" : "maligngroup", {}, parent)
        parseEqArrMr(parent, {
            toParse: toParse.substr(1),
            align: !align,
            scr,
            sty,
            nor
        })
    } else {
        const firstOper = rxIndexOf(toParse, oprx)
        const firstNum = rxIndexOf(toParse, /\d/)
        const startsWithOper = firstOper === 1
        const startsWithNum = firstNum === 1

        if (!startsWithOper && !startsWithNum) {
            if (!nor) {
                const mi = createMathElement(
                    "mi",
                    tokenAttributes({
                        scr,
                        sty,
                        nor,
                        charToPrint: 1,
                        tokenType: "mi"
                    }),
                    parent
                )
                mi.textContent = nbsp(toParse.substr(0, 1))
            } else {
                const mt = createMathElement("mtext", {}, parent)
                mt.textContent = nbsp(toParse.substr(0, 1))
            }
            parseEqArrMr(parent, {
                toParse: toParse.substr(1),
                scr,
                sty,
                nor,
                align
            })
        } else if (startsWithOper) {
            if (!nor) {
                const mo = createMathElement(
                    "mo",
                    tokenAttributes({
                        nor,
                        charToPrint: 1,
                        tokenType: "mo"
                    }),
                    parent
                )
                mo.textContent = toParse.substr(0, 1)
            } else {
                const mt = createMathElement("mtext", {}, parent)
                mt.textContent = toParse.substr(0, 1)
            }
            parseEqArrMr(parent, {
                toParse: toParse.substr(1),
                scr,
                sty,
                nor,
                align
            })
        } else {
            const num = numStart(toParse)
            if (!nor) {
                const mn = createMathElement(
                    "mn",
                    tokenAttributes({
                        sty: "p",
                        nor,
                        charToPrint: 1,
                        tokenType: "mn"
                    }),
                    parent
                )
                mn.textContent = num
            } else {
                const mt = createMathElement("mtext", {}, parent)
                mt.textContent = num
            }
            parseEqArrMr(parent, {
                toParse: toParse.substr(num.length),
                scr,
                sty,
                nor,
                align
            })
        }
    }
}

/**
 * Parse math text
 * @param {XMLElement} ctx - The context OMML element
 * @param {XMLElement} parent - The parent MathML element
 * @param {Object} options - Parsing options
 */
function parseMT(ctx, parent, {toParse = "", scr, sty, nor}) {
    if (!toParse.length) {
        return
    }
    const firstOper = rxIndexOf(toParse, oprx)
    const firstNum = rxIndexOf(toParse, /\d/)
    const startsWithOper = firstOper === 1
    const startsWithNum = firstNum === 1
    if (!startsWithOper && !startsWithNum) {
        let charToPrint = 1
        // Check if we're in a function name
        const inFuncName = ctx.closest("m:fName") !== null
        if (inFuncName) {
            if (!firstOper && !firstNum) {
                charToPrint = toParse.length
            } else {
                charToPrint =
                    Math.min(
                        firstOper || Number.MAX_VALUE,
                        firstNum || Number.MAX_VALUE
                    ) - 1
            }
        }
        const mi = createMathElement(
            "mi",
            tokenAttributes({
                scr,
                sty,
                nor,
                charToPrint,
                tokenType: "mi"
            }),
            parent
        )
        mi.textContent = nbsp(toParse.substr(0, charToPrint))
        parseMT(ctx, parent, {
            toParse: toParse.substr(charToPrint),
            scr,
            sty,
            nor
        })
    } else if (startsWithOper) {
        const mo = createMathElement(
            "mo",
            tokenAttributes({
                nor,
                tokenType: "mo"
            }),
            parent
        )
        mo.textContent = toParse.substr(0, 1)

        parseMT(ctx, parent, {
            toParse: toParse.substr(1),
            scr,
            sty,
            nor
        })
    } else {
        const num = numStart(toParse)
        const mn = createMathElement(
            "mn",
            tokenAttributes({
                scr,
                sty: "p",
                nor,
                tokenType: "mn"
            }),
            parent
        )
        mn.textContent = num

        parseMT(ctx, parent, {
            toParse: toParse.substr(num.length),
            scr,
            sty,
            nor
        })
    }
}

/**
 * Find the index of a regex match in a string
 * @param {string} str - The string to search
 * @param {RegExp} rx - The regex to match
 * @return {number} The match index + 1, or 0 if no match
 */
function rxIndexOf(str, rx) {
    const re = rx.exec(str)
    if (!re) {
        return 0
    }
    return re.index + 1
}

/**
 * Get the start of a number in a string
 * @param {string} str - The string to check
 * @return {string} The number at the start of the string
 */
function numStart(str) {
    if (!str) {
        return ""
    }
    const match = str.match(/^(\d+)/)
    return match ? match[1] : ""
}

/**
 * Count ampersands in a string
 * @param {string} str - The string to check
 * @return {number} The number of ampersands
 */
function countAmp(str) {
    return ((str || "").match(/&/g) || []).length
}

/**
 * Convert a combining character to its non-combining equivalent
 * @param {string} ch - The character to convert
 * @return {string} The non-combining equivalent
 */
function toNonCombining(ch) {
    const combiMap = {
        "\u0306": "\u02D8", // breve
        "\u032e": "\u02D8", // breve below
        "\u0312": "\u00B8", // cedilla
        "\u0327": "\u00B8", // cedilla
        "\u0300": "\u0060", // grave
        "\u0316": "\u0060", // grave below
        "\u0305": "\u002D", // macron/overbar
        "\u0332": "\u002D", // macron/underbar
        "\u0323": "\u002E", // dot below
        "\u0307": "\u02D9", // dot above
        "\u030B": "\u02DD", // double acute
        "\u0317": "\u00B4", // acute below
        "\u0301": "\u00B4", // acute
        "\u0330": "\u007E", // tilde below
        "\u0303": "\u007E", // tilde
        "\u0324": "\u00A8", // diaeresis below
        "\u0308": "\u00A8", // diaeresis
        "\u032C": "\u02C7", // caron below
        "\u030C": "\u02C7", // caron
        "\u0302": "\u005E", // circumflex
        "\u032D": "\u005E", // circumflex below
        "\u20D7": "\u2192", // vector/right arrow
        "\u20EF": "\u2192", // vector/right arrow below
        "\u20D6": "\u2190", // left arrow
        "\u20EE": "\u2190" // left arrow below
    }
    return combiMap[ch] || ch
}

/**
 * Create MathML token attributes based on token settings
 * @param {Object} options - Token options
 * @return {Object} Attribute object
 */
function tokenAttributes({scr, sty, nor, charToPrint = 0, tokenType}) {
    const attr = {}

    if (nor) {
        attr.mathvariant = "normal"
    } else {
        let mathvariant
        const fontweight = sty === "b" || sty === "bi" ? "bold" : "normal"
        const fontstyle = sty === "b" || sty === "p" ? "normal" : "italic"

        if (tokenType !== "mn") {
            if (scr === "monospace") {
                mathvariant = "monospace"
            } else if (scr === "sans-serif" && sty === "i") {
                mathvariant = "sans-serif-italic"
            } else if (scr === "sans-serif" && sty === "b") {
                mathvariant = "bold-sans-serif"
            } else if (scr === "sans-serif" && sty === "bi") {
                mathvariant = "sans-serif-bold-italic"
            } else if (scr === "sans-serif") {
                mathvariant = "sans-serif"
            } else if (scr === "fraktur" && (sty === "b" || sty === "i")) {
                mathvariant = "bold-fraktur"
            } else if (scr === "fraktur") {
                mathvariant = "fraktur"
            } else if (scr === "double-struck") {
                mathvariant = "double-struck"
            } else if (scr === "script" && (sty === "b" || sty === "i")) {
                mathvariant = "bold-script"
            } else if (scr === "script") {
                mathvariant = "script"
            } else if (scr === "roman" || !scr) {
                if (sty === "b") {
                    mathvariant = "bold"
                } else if (sty === "i") {
                    mathvariant = "italic"
                } else if (sty === "p") {
                    mathvariant = "normal"
                } else if (sty === "bi") {
                    mathvariant = "bold-italic"
                }
            }
        }

        if (tokenType === "mo" && mathvariant !== "normal") {
            return attr
        }

        if (
            tokenType === "mi" &&
            charToPrint === 1 &&
            (mathvariant === "italic" || !mathvariant)
        ) {
            return attr
        }

        if (
            tokenType === "mi" &&
            charToPrint > 1 &&
            (mathvariant === "italic" || !mathvariant)
        ) {
            attr.mathvariant = "italic"
        } else if (mathvariant && mathvariant !== "italic") {
            attr.mathvariant = mathvariant
        } else {
            if (
                fontstyle === "italic" &&
                !(tokenType === "mi" && charToPrint === 1)
            ) {
                attr.fontstyle = "italic"
            }
            if (fontweight === "bold") {
                attr.fontweight = "bold"
            }
        }
    }

    return attr
}

/**
 * Create menclose notation attribute value
 * @param {Object} options - Notation options
 * @return {Object} The notation attributes
 */
function createMEnclodeNotation({
    hideTop,
    hideBot,
    hideLeft,
    hideRight,
    strikeH,
    strikeV,
    strikeBLTR,
    strikeTLBR
}) {
    const notation = []

    if (!hideTop && !hideBot && !hideLeft && !hideRight) {
        notation.push("box")
    } else {
        if (!hideTop) {
            notation.push("top")
        }
        if (!hideBot) {
            notation.push("bottom")
        }
        if (!hideLeft) {
            notation.push("left")
        }
        if (!hideRight) {
            notation.push("right")
        }
    }

    if (strikeH) {
        notation.push("horizontalstrike")
    }
    if (strikeV) {
        notation.push("verticalstrike")
    }
    if (strikeBLTR) {
        notation.push("updiagonalstrike")
    }
    if (strikeTLBR) {
        notation.push("downdiagonalstrike")
    }

    return {notation: notation.join(" ")}
}

/**
 * Create mpadded attributes
 * @param {Object} options - Padding options
 * @return {Object} The padding attributes
 */
function createMPaddedAttr({zeroWid, zeroAsc, zeroDesc}) {
    const attr = {}

    if (zeroWid) {
        attr.width = "0in"
    }
    if (zeroAsc) {
        attr.height = "0in"
    }
    if (zeroDesc) {
        attr.depth = "0in"
    }

    return attr
}

/**
 * Get fraction properties
 * @param {string} type - Fraction type
 * @return {Object} Fraction attributes
 */
function getFracProps(type) {
    if (type === "skw" || type === "lin") {
        return {bevelled: "true"}
    }
    if (type === "nobar") {
        return {linethickness: "0pt"}
    }
    return {}
}

/**
 * Replace spaces with non-breaking spaces
 * @param {string} str - The string to process
 * @return {string} String with non-breaking spaces
 */
function nbsp(str) {
    if (!str) {
        return ""
    }
    return str.replace(/\s/g, "\u00a0")
}

/**
 * Parse a boolean value
 * @param {string} str - The string to parse
 * @return {boolean|undefined} The parsed boolean or undefined
 */
function tf(str) {
    if (str == null) {
        return
    }
    str = str.toLowerCase()
    if (str === "on" || str === "1" || str === "true") {
        return true
    }
    if (str === "off" || str === "0" || str === "false") {
        return false
    }
}

/**
 * Force a value to be true unless explicitly false
 * @param {string} str - The string to parse
 * @return {boolean} True unless the string is explicitly false
 */
function forceFalse(str) {
    const res = tf(str)
    if (res === false) {
        return false
    }
    return true
}

/**
 * Force a value to be false unless explicitly true
 * @param {string} str - The string to parse
 * @return {boolean} False unless the string is explicitly true
 */
function forceTrue(str) {
    return tf(str) || false
}


}),
"./js/modules/importer/docx/parse.js": (function (__unused_rspack_module, __webpack_exports__, __webpack_require__) {
"use strict";
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  DocxParser: function() { return DocxParser; }
});
/* import */ var _exporter_tools_xml__rspack_import_0 = __webpack_require__("./js/modules/exporter/tools/xml.js");


const DEFAULT_STYLES_XML = `<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<w:styles xmlns:w="http://schemas.openxmlformats.org/wordprocessingml/2006/main">
</w:styles>`

class DocxParser {
    constructor(zip) {
        this.zip = zip
        this.styles = {}
        this.numbering = {}
        this.comments = {}
        this.footnotes = {}
        this.endnotes = {}
        this.relationships = {}
        this.images = {}

        this.coreDoc = null
        this.document = null
    }

    init() {
        return this.parseStyles()
            .then(() => this.parseNumbering())
            .then(() => this.parseComments())
            .then(() => this.parseFootnotes())
            .then(() => this.parseEndnotes())
            .then(() => this.parseRelationships())
            .then(() => this.parseImages())
            .then(() => this.parseCoreDoc())
            .then(() => this.parseDocument())
    }

    async parseStyles() {
        try {
            const content = await this.zip
                .file("word/styles.xml")
                ?.async("string")
            const stylesDoc = (0,_exporter_tools_xml__rspack_import_0.xmlDOM)(content || DEFAULT_STYLES_XML)
            const styles = stylesDoc.queryAll("w:style")

            styles.forEach(style => {
                const id = style.getAttribute("w:styleId")
                const type = style.getAttribute("w:type")
                const name = style.query("w:name")?.getAttribute("w:val")
                const basedOn = style.query("w:basedOn")?.getAttribute("w:val")

                this.styles[id] = {
                    id,
                    type,
                    name,
                    isHeading:
                        (id && /heading\d+/i.test(id)) ||
                        (basedOn && /heading\d+/i.test(basedOn)),
                    isCaption:
                        (id && /caption/i.test(id)) ||
                        (basedOn && /caption/i.test(basedOn)),
                    level: id ? parseInt(id.match(/\d+/)?.[0] || 0) : 0,
                    basedOn,
                    paragraphProps: this.extractParagraphProperties(style),
                    runProps: this.extractRunProperties(style)
                }
            })
        } catch (err) {
            console.warn("Could not parse styles", err)
        }
    }

    extractParagraphProperties(style) {
        const pPr = style.query("w:pPr")
        if (!pPr) {
            return {}
        }

        return {
            indent: this.extractIndentation(pPr),
            alignment: pPr.query("w:jc")?.getAttribute("w:val"),
            numbering: this.extractNumbering(pPr),
            keepNext: Boolean(pPr.query("w:keepNext"))
        }
    }

    extractIndentation(pPr) {
        const ind = pPr.query("w:ind")
        if (!ind) {
            return {}
        }

        return {
            left: parseInt(
                ind.getAttribute("w:left") || ind.getAttribute("w:start") || "0"
            ),
            right: parseInt(
                ind.getAttribute("w:right") || ind.getAttribute("w:end") || "0"
            ),
            hanging: parseInt(ind.getAttribute("w:hanging") || "0"),
            firstLine: parseInt(ind.getAttribute("w:firstLine") || "0")
        }
    }

    extractNumbering(pPr) {
        const numPr = pPr.query("w:numPr")
        if (!numPr) {
            return null
        }

        return {
            id: numPr.query("w:numId")?.getAttribute("w:val"),
            level: parseInt(numPr.query("w:ilvl")?.getAttribute("w:val") || "0")
        }
    }

    extractRunProperties(rPr) {
        if (!rPr) {
            return {}
        }

        return {
            bold: Boolean(rPr.query("w:b")),
            italic: Boolean(rPr.query("w:i")),
            underline: rPr.query("w:u")?.getAttribute("w:val") || false,
            strike: Boolean(rPr.query("w:strike")),
            smallCaps: Boolean(rPr.query("w:smallCaps")),
            vertAlign: rPr.query("w:vertAlign")?.getAttribute("w:val") || false,
            fontSize:
                parseInt(rPr.query("w:sz")?.getAttribute("w:val") || "0") / 2,
            color: rPr.query("w:color")?.getAttribute("w:val") || false,
            fontFamily: rPr.query("w:rFonts")?.getAttribute("w:ascii") || false
        }
    }

    async parseNumbering() {
        try {
            const content = await this.zip
                .file("word/numbering.xml")
                ?.async("string")
            if (!content) {
                return
            }
            const numberingDoc = (0,_exporter_tools_xml__rspack_import_0.xmlDOM)(content)

            // Parse abstract numbering definitions
            const abstractNums = numberingDoc.queryAll("w:abstractNum")
            const abstractNumbering = {}

            abstractNums.forEach(abstractNum => {
                const id = abstractNum.getAttribute("w:abstractNumId")
                const levels = abstractNum.queryAll("w:lvl").map(lvl => ({
                    level: lvl.getAttribute("w:ilvl"),
                    format: lvl.query("w:numFmt")?.getAttribute("w:val"),
                    text: lvl.query("w:lvlText")?.getAttribute("w:val"),
                    start: parseInt(
                        lvl.query("w:start")?.getAttribute("w:val") || "1"
                    )
                }))
                abstractNumbering[id] = levels
            })

            // Parse numbering instances
            const nums = numberingDoc.queryAll("w:num")
            nums.forEach(num => {
                const numId = num.getAttribute("w:numId")
                const abstractNumId = num
                    .query("w:abstractNumId")
                    ?.getAttribute("w:val")

                this.numbering[numId] = {
                    abstractId: abstractNumId,
                    levels: abstractNumbering[abstractNumId] || [],
                    overrides: this.extractNumberingOverrides(num)
                }
            })
        } catch (err) {
            console.warn("Could not parse numbering", err)
        }
    }

    extractNumberingOverrides(num) {
        return num.queryAll("w:lvlOverride").map(override => ({
            level: override.getAttribute("w:ilvl"),
            start: parseInt(
                override.query("w:startOverride")?.getAttribute("w:val") || "1"
            )
        }))
    }

    async parseComments() {
        try {
            const content = await this.zip
                .file("word/comments.xml")
                ?.async("string")
            if (!content) {
                return
            }
            const commentsDoc = (0,_exporter_tools_xml__rspack_import_0.xmlDOM)(content)

            commentsDoc.queryAll("w:comment").forEach(comment => {
                const id = comment.getAttribute("w:id")
                this.comments[id] = {
                    id,
                    author: comment.getAttribute("w:author"),
                    date: comment.getAttribute("w:date"),
                    content: this.extractCommentContent(comment)
                }
            })
        } catch (err) {
            console.warn("Could not parse comments", err)
        }
    }

    extractCommentContent(comment) {
        const content = []
        comment.queryAll("w:p").forEach(p => {
            content.push({
                type: "paragraph",
                content: this.extractParagraphContent(p)
            })
        })
        return content
    }

    async parseFootnotes() {
        try {
            const content = await this.zip
                .file("word/footnotes.xml")
                ?.async("string")
            if (!content) {
                return
            }
            const footnotesDoc = (0,_exporter_tools_xml__rspack_import_0.xmlDOM)(content)

            footnotesDoc.queryAll("w:footnote").forEach(footnote => {
                const id = footnote.getAttribute("w:id")
                if (id === "0" || id === "-1") {
                    return // Skip separator footnotes
                }
                this.footnotes[id] = {
                    id,
                    content: this.extractBlockContent(footnote)
                }
            })
        } catch (err) {
            console.warn("Could not parse footnotes", err)
        }
    }

    // async parseFootnotes() {
    //     try {
    //         const content = await this.zip
    //             .file("word/footnotes.xml")
    //             ?.async("string")
    //         if (!content) {
    //             return
    //         }
    //         const footnotesDoc = xmlDOM(content)

    //         footnotesDoc.queryAll("w:footnote").forEach(footnote => {
    //             const id = footnote.getAttribute("w:id")
    //             if (id === "0" || id === "-1") {
    //                 return // Skip separator footnotes
    //             }

    //             // Process each paragraph in the footnote
    //             const paragraphs = []
    //             footnote.queryAll("w:p").forEach(p => {
    //                 paragraphs.push({
    //                     type: "paragraph",
    //                     content: this.extractParagraphContent(p)
    //                 })
    //             })

    //             this.footnotes[id] = {
    //                 id,
    //                 content: paragraphs
    //             }
    //         })
    //     } catch (err) {
    //         console.warn("Could not parse footnotes", err)
    //     }
    // }

    // extractParagraphContent(p) {
    //     const content = []

    //     // Handle field codes (for cross-references)
    //     const fieldRuns = []
    //     let currentFieldCode = null
    //     let collectingField = false

    //     p.queryAll("w:r").forEach(r => {
    //         const fieldChar = r.query("w:fldChar")
    //         if (fieldChar) {
    //             const type = fieldChar.getAttribute("w:fldCharType")
    //             if (type === "begin") {
    //                 collectingField = true
    //                 currentFieldCode = { code: "", result: "" }
    //             } else if (type === "separate") {
    //                 collectingField = false
    //             } else if (type === "end") {
    //                 if (currentFieldCode) {
    //                     fieldRuns.push(currentFieldCode)
    //                     currentFieldCode = null
    //                 }
    //             }
    //         } else if (collectingField && currentFieldCode) {
    //             const instrText = r.query("w:instrText")
    //             if (instrText) {
    //                 currentFieldCode.code += instrText.textContent
    //             }
    //         } else if (currentFieldCode) {
    //             const text = r.query("w:t")?.textContent
    //             if (text) {
    //                 currentFieldCode.result += text
    //             }
    //         }

    //         // Normal text processing
    //         const text = r.query("w:t")?.textContent
    //         if (!text && !r.query("w:drawing") && !r.query("w:pict")) {
    //             // Check for breaks
    //             if (r.query("w:br")) {
    //                 content.push({ type: "hard_break" })
    //             }
    //             return
    //         }

    //         // Check for hyperlinks
    //         const hyperlink = r.closest("w:hyperlink")
    //         if (hyperlink && !r.query("w:drawing") && !r.query("w:pict")) {
    //             // This will be handled separately
    //             return
    //         }

    //         const rPr = r.query("w:rPr")
    //         const formatting = rPr ? this.extractRunProperties(rPr) : {}

    //         if (text) {
    //             content.push({
    //                 type: "text",
    //                 text,
    //                 marks: this.createMarksFromFormatting(formatting)
    //             })
    //         }
    //     })

    //     // Process hyperlinks in the paragraph
    //     p.queryAll("w:hyperlink").forEach(hyperlink => {
    //         const rId = hyperlink.getAttribute("r:id")
    //         const anchor = hyperlink.getAttribute("w:anchor")

    //         // Collect all text from the hyperlink
    //         let linkText = ""
    //         hyperlink.queryAll("w:r").forEach(r => {
    //             const t = r.query("w:t")
    //             if (t) {
    //                 linkText += t.textContent
    //             }
    //         })

    //         if (linkText) {
    //             let href = "#"
    //             if (rId && this.relationships[rId]) {
    //                 href = this.relationships[rId].target
    //             } else if (anchor) {
    //                 href = `#${anchor}`
    //             }

    //             content.push({
    //                 type: "text",
    //                 text: linkText,
    //                 marks: [{
    //                     type: "link",
    //                     attrs: {
    //                         href,
    //                         title: linkText
    //                     }
    //                 }]
    //             })
    //         }
    //     })

    //     // Process field runs for cross-references
    //     fieldRuns.forEach(field => {
    //         if (field.code.startsWith("REF ")) {
    //             const target = field.code.substring(4).trim().split(/\s+/)[0]
    //             content.push({
    //                 type: "cross_reference",
    //                 attrs: {
    //                     id: target,
    //                     title: field.result || target
    //                 }
    //             })
    //         }
    //     })

    //     // Handle equations
    //     const oMath = p.query("m:oMath")
    //     if (oMath) {
    //         // Very basic LaTeX conversion (would need a proper OMML to LaTeX converter)
    //         const latex = "x^2" // Placeholder - should use a proper converter
    //         content.push({
    //             type: "equation",
    //             attrs: {
    //                 equation: latex
    //             }
    //         })
    //     }

    //     return content
    // }

    async parseEndnotes() {
        try {
            const content = await this.zip
                .file("word/endnotes.xml")
                ?.async("string")
            if (!content) {
                return
            }
            const endnotesDoc = (0,_exporter_tools_xml__rspack_import_0.xmlDOM)(content)

            endnotesDoc.queryAll("w:endnote").forEach(endnote => {
                const id = endnote.getAttribute("w:id")
                if (id === "0" || id === "-1") {
                    return // Skip separator endnotes
                }
                this.endnotes[id] = {
                    id,
                    content: this.extractBlockContent(endnote)
                }
            })
        } catch (err) {
            console.warn("Could not parse endnotes", err)
        }
    }

    async parseRelationships() {
        try {
            const content = await this.zip
                .file("word/_rels/document.xml.rels")
                ?.async("string")
            if (!content) {
                return
            }
            const relsDoc = (0,_exporter_tools_xml__rspack_import_0.xmlDOM)(content)

            relsDoc.queryAll("Relationship").forEach(rel => {
                const id = rel.getAttribute("Id")
                this.relationships[id] = {
                    id,
                    type: rel.getAttribute("Type"),
                    target: rel.getAttribute("Target")
                }
            })
        } catch (err) {
            console.warn("Could not parse relationships", err)
        }
    }

    async parseImages() {
        // Find and extract image files
        const imageFiles = Object.keys(this.zip.files).filter(path =>
            path.startsWith("word/media/")
        )

        for (const path of imageFiles) {
            try {
                const blob = await this.zip.file(path).async("blob")
                const filename = path.split("/").pop()
                const content = this.addMimeType(blob, filename)
                this.images[filename] = content
            } catch (err) {
                console.warn(`Could not parse image ${path}`, err)
            }
        }
    }

    addMimeType(blob, filename) {
        return new File([blob], filename, {
            type: this.getImageFileType(filename)
        })
    }

    getImageFileType(filename) {
        const ext = filename.split(".").pop().toLowerCase()
        switch (ext) {
            case "avif":
            case "avifs":
                return "image/avif"
            case "png":
                return "image/png"
            case "jpg":
            case "jpeg":
                return "image/jpeg"
            case "gif":
                return "image/gif"
            case "svg":
                return "image/svg+xml"
            case "webp":
                return "image/webp"
            default:
                return "image/png" // Default fallback
        }
    }

    extractBlockContent(node) {
        const content = []
        node.queryAll("w:p").forEach(p => {
            content.push({
                type: "paragraph",
                content: this.extractParagraphContent(p)
            })
        })
        return content
    }

    extractParagraphContent(p) {
        const content = []
        p.queryAll("w:r").forEach(r => {
            const text = r.query("w:t")?.textContent
            if (!text) {
                return
            }

            const rPr = r.query("w:rPr")
            const formatting = rPr ? this.extractRunProperties(rPr) : {}

            content.push({
                type: "text",
                text,
                marks: this.createMarksFromFormatting(formatting)
            })
        })
        return content
    }

    createMarksFromFormatting(formatting) {
        const marks = []
        if (formatting.bold) {
            marks.push({type: "strong"})
        }
        if (formatting.italic) {
            marks.push({type: "em"})
        }
        if (formatting.underline) {
            marks.push({type: "underline"})
        }
        return marks
    }

    async parseCoreDoc() {
        try {
            const content = await this.zip
                .file("docProps/core.xml")
                ?.async("string")
            if (!content) {
                return
            }
            this.coreDoc = (0,_exporter_tools_xml__rspack_import_0.xmlDOM)(content)
        } catch (err) {
            console.warn("Could not parse core doc", err)
        }
    }

    async parseDocument() {
        try {
            const content = await this.zip
                .file("word/document.xml")
                ?.async("string")
            if (!content) {
                return
            }
            this.document = (0,_exporter_tools_xml__rspack_import_0.xmlDOM)(content)
        } catch (err) {
            console.warn("Could not parse document", err)
        }
    }
}


}),
"./js/modules/importer/odt/citations.js": (function (__unused_rspack_module, __webpack_exports__, __webpack_require__) {
"use strict";
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  isOdtBibliographyReferenceMark: function() { return isOdtBibliographyReferenceMark; },
  isOdtBibliographySection: function() { return isOdtBibliographySection; },
  isOdtCitationMark: function() { return isOdtCitationMark; },
  parseOdtBibliographyMark: function() { return parseOdtBibliographyMark; },
  parseOdtReferenceMark: function() { return parseOdtReferenceMark; }
});
/* import */ var biblatex_csl_converter__rspack_import_0 = __webpack_require__("./node_modules/.pnpm/biblatex-csl-converter@3.6.0/node_modules/biblatex-csl-converter/lib/index.js");
/* import */ var _citations__rspack_import_1 = __webpack_require__("./js/modules/importer/citations.js");



/**
 * Check whether an ODT reference mark name belongs to a bibliography region
 * (Zotero ZOTERO_BIBL, Mendeley CSL_BIBLIOGRAPHY).
 * Uses OdtCitationsParser.referenceMarkBibliography().
 *
 * @param {string} markName - text:name attribute value
 * @returns {boolean}
 */
function isOdtBibliographyReferenceMark(markName) {
    if (!markName) {
        return false
    }
    return biblatex_csl_converter__rspack_import_0.OdtCitationsParser.referenceMarkBibliography(markName).isBibliography
}

/**
 * Check whether a text:section name belongs to a bibliography region
 * (Zotero, JabRef).
 * Uses OdtCitationsParser.sectionBibliography().
 *
 * @param {string} sectionName - text:name attribute value
 * @returns {boolean}
 */
function isOdtBibliographySection(sectionName) {
    if (!sectionName) {
        return false
    }
    return biblatex_csl_converter__rspack_import_0.OdtCitationsParser.sectionBibliography(sectionName).isBibliography
}

/**
 * Check whether an ODT reference mark name belongs to a citation.
 * Uses OdtCitationsParser.referenceMarkCitation() with retrieve=false.
 *
 * @param {string} markName - text:name attribute value
 * @returns {boolean}
 */
function isOdtCitationMark(markName) {
    if (!markName) {
        return false
    }
    return biblatex_csl_converter__rspack_import_0.OdtCitationsParser.referenceMarkCitation(markName, false).isCitation
}

/**
 * Parse a citation from an ODT reference mark name and add any new
 * bibliography entries into `bibliography`.
 *
 * Handles Zotero, Mendeley Desktop (legacy), and JabRef reference marks.
 *
 * @param {string} markName     - text:name attribute of the reference-mark-start
 * @param {Object} bibliography - Fidus Writer bibliography (mutated in place)
 * @returns {Object|null}  ProseMirror citation node or null
 */
function parseOdtReferenceMark(markName, bibliography, bibDB) {
    if (!markName) {
        return null
    }
    const result = biblatex_csl_converter__rspack_import_0.OdtCitationsParser.referenceMarkCitation(
        markName,
        true, // retrieve
        true // retrieveMetadata
    )
    return (0,_citations__rspack_import_1.citationResultToNode)(result, bibliography, bibDB)
}

/**
 * Parse a citation from a LibreOffice native <text:bibliography-mark> element
 * and add any new bibliography entries into `bibliography`.
 *
 * @param {Object} bibMarkNode  - The parsed text:bibliography-mark XMLElement
 * @param {Object} bibliography - Fidus Writer bibliography (mutated in place)
 * @returns {Object|null}  ProseMirror citation node or null
 */
function parseOdtBibliographyMark(bibMarkNode, bibliography) {
    if (!bibMarkNode) {
        return null
    }
    const result = biblatex_csl_converter__rspack_import_0.OdtCitationsParser.bibliographyMarkCitation(
        bibMarkNode.outerXML,
        true // retrieve
    )
    return (0,_citations__rspack_import_1.citationResultToNode)(result, bibliography)
}


}),
"./js/modules/importer/odt/convert.js": (function (__unused_rspack_module, __webpack_exports__, __webpack_require__) {
"use strict";
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  OdtConvert: function() { return OdtConvert; }
});
/* import */ var mathml_to_latex__rspack_import_0 = __webpack_require__("./node_modules/.pnpm/mathml-to-latex@1.4.3/node_modules/mathml-to-latex/dist/bundle.min.js");
/* import */ var mathml_to_latex__rspack_import_0_default = /*#__PURE__*/__webpack_require__.n(mathml_to_latex__rspack_import_0);
/* import */ var _exporter_tools_xml__rspack_import_1 = __webpack_require__("./js/modules/exporter/tools/xml.js");
/* import */ var _schema_common__rspack_import_2 = __webpack_require__("./js/modules/schema/common/index.js");
/* import */ var _schema_common_track__rspack_import_3 = __webpack_require__("./js/modules/schema/common/track.js");
/* import */ var _citations__rspack_import_4 = __webpack_require__("./js/modules/importer/odt/citations.js");







class OdtConvert {
    constructor(
        contentXml,
        stylesXml,
        manifestXml,
        importId,
        template,
        bibliography,
        bibDb
    ) {
        this.importId = importId
        this.template = template
        this.bibliography = bibliography
        this.bibDB = bibDb
        this.images = {}
        this.styles = {}

        this.contentDoc = contentXml ? (0,_exporter_tools_xml__rspack_import_1.xmlDOM)(contentXml) : null
        this.stylesDoc = stylesXml ? (0,_exporter_tools_xml__rspack_import_1.xmlDOM)(stylesXml) : null
        this.manifestDoc = manifestXml ? (0,_exporter_tools_xml__rspack_import_1.xmlDOM)(manifestXml) : null

        this.tracks = {}
        this.comments = {}
        this.currentCommentIds = []
        this.currentTracks = []
        this.referenceableObjects = {} // All objects that can be referenced
    }

    init() {
        this.parseTrackedChanges()
        this.parseStyles()
        this.parseComments()

        this.collectReferenceableObjects(this.contentDoc)
        const content = this.convert()
        return {
            content,
            settings: {
                import_id: this.importId,
                tracked: Object.keys(this.tracks).length > 0,
                language: this.detectLanguage()
            },
            comments: this.comments
        }
    }

    parseTrackedChanges() {
        const trackedChangesEl = this.contentDoc.query("text:tracked-changes")
        if (!trackedChangesEl) {
            return
        }

        // Tracked deletions are stored in two different ways in FW and ODT.
        // FW: The deleted content stays in place where it was before the deletion,
        // and is marked with a tracked change mark. Megre only occurs after change
        // has been accepted.
        // ODT: The deleted content is removed from the content flow and is replaced by a marker.
        // The removed content is stored in a special section of the document.
        // This method takes all the deleted content and puts it back into the place where
        // it was previously. That way the structure is more similar to the output FW document
        // and is more easily converted.
        const deletions = {}

        const changedRegions = trackedChangesEl.queryAll("text:changed-region")
        changedRegions.forEach(region => {
            const id = region.getAttribute("text:id")

            const insertion = region.query("text:insertion")
            const deletion = region.query("text:deletion")
            if (!insertion && !deletion) {
                // Neither insertion or deletion. Must be type unknown to us
                return
            }
            const changeInfo = region.query("office:change-info")
            if (changeInfo) {
                const track = {
                    type: insertion ? "insertion" : "deletion",
                    user: 1,
                    username: changeInfo.query("dc:creator")?.textContent || "",
                    date: parseInt(
                        new Date(
                            changeInfo.query("dc:date")?.textContent || ""
                        ).getTime() / 60000
                    )
                }
                if (insertion) {
                    track.approved = false
                }
                this.tracks[id] = track

                if (deletion) {
                    // Store deletion content for later use
                    deletions[id] = deletion.children.filter(
                        child => child.tagName !== "office:change-info"
                    )
                }
            }
        })

        // Then find and replace all deletion change markers
        const changeMarkers = this.contentDoc.queryAll("text:change")
        changeMarkers.forEach(marker => {
            const changeId = marker.getAttribute("text:change-id")
            const deletion = deletions[changeId]
            if (deletion) {
                if (deletion.length > 0) {
                    // Create change-start and change-end elements
                    const markerIndex =
                        marker.parentElement.children.indexOf(marker)

                    marker.parentElement.insertXMLAt(
                        `<text:change-start text:change-id="${changeId}"/>`,
                        markerIndex
                    )
                    marker.parentElement.insertXMLAt(
                        `<text:change-end text:change-id="${changeId}"/>`,
                        markerIndex + 2
                    )

                    if (deletion.length === 1) {
                        // Single block - just insert the content
                        deletion[0].children.forEach(content => {
                            marker.parentElement.insertBefore(content, marker)
                        })
                    } else {
                        // Multiple blocks - need to split the paragraph/headline
                        const parentElement = marker.parentElement
                        parentElement.splitAtChildElement(
                            marker,
                            deletion[0].children
                                ?.map(node => node.toString())
                                .join("") || "", // First block content to be added to current node
                            deletion
                                .slice(1, -1)
                                .map(node => node.toString())
                                .join(""), // Middle blocks
                            deletion[deletion.length - 1].toString() // Last block
                        )
                    }
                }
                // Remove the original change marker
                marker.parentElement.removeChild(marker)
            }
        })
    }

    parseStyles() {
        if (!this.stylesDoc) {
            return
        }
        const styleNodes = this.stylesDoc.queryAll("style:style")
        styleNodes.forEach(node => {
            const styleName = node.getAttribute("style:name")
            this.styles[styleName] = this.parseStyle(node)
        })
        const contentStyleNodes = this.contentDoc.queryAll("style:style")
        contentStyleNodes.forEach(node => {
            const styleName = node.getAttribute("style:name")
            this.styles[styleName] = this.parseStyle(node)
        })
    }

    parseStyle(styleNode) {
        const properties = {
            // Basic style information
            parentStyleName: styleNode.getAttribute("style:parent-style-name"),
            isSection:
                styleNode.getAttribute("style:family") === "section" ||
                Boolean(styleNode.query("style:section-properties")),
            title: styleNode.getAttribute("style:display-name"),

            // Family and name info
            family: styleNode.getAttribute("style:family"),
            name: styleNode.getAttribute("style:name"),

            // Heading related
            isHeading:
                styleNode.getAttribute("style:family") === "paragraph" &&
                (styleNode
                    .getAttribute("style:name")
                    .toLowerCase()
                    .includes("heading") ||
                    styleNode
                        .getAttribute("style:parent-style-name")
                        ?.toLowerCase()
                        .includes("heading")),
            outlineLevel: styleNode.getAttribute("text:outline-level"),

            // Text properties
            textProperties: {},

            // Paragraph properties
            paragraphProperties: {},

            // Section properties
            sectionProperties: {}
        }

        // Parse text properties
        const textProperties = styleNode.query("style:text-properties")
        if (textProperties) {
            properties.textProperties = {
                bold: textProperties.getAttribute("fo:font-weight") === "bold",
                italic:
                    textProperties.getAttribute("fo:font-style") === "italic",
                fontSize: this.convertLength(
                    textProperties.getAttribute("fo:font-size")
                ),
                fontFamily: textProperties.getAttribute("fo:font-family"),
                color: textProperties.getAttribute("fo:color"),
                backgroundColor: textProperties.getAttribute(
                    "fo:background-color"
                ),
                textDecoration:
                    textProperties.getAttribute("style:text-underline-style") ||
                    textProperties.getAttribute(
                        "style:text-line-through-style"
                    ),
                textPosition: textProperties.getAttribute("style:text-position")
            }
        }

        // Parse paragraph properties
        const paragraphProperties = styleNode.query(
            "style:paragraph-properties"
        )
        if (paragraphProperties) {
            properties.paragraphProperties = {
                marginTop: this.convertLength(
                    paragraphProperties.getAttribute("fo:margin-top")
                ),
                marginBottom: this.convertLength(
                    paragraphProperties.getAttribute("fo:margin-bottom")
                ),
                marginLeft: this.convertLength(
                    paragraphProperties.getAttribute("fo:margin-left")
                ),
                marginRight: this.convertLength(
                    paragraphProperties.getAttribute("fo:margin-right")
                ),
                textAlign: paragraphProperties.getAttribute("fo:text-align"),
                lineHeight: paragraphProperties.getAttribute("fo:line-height"),
                backgroundColor: paragraphProperties.getAttribute(
                    "fo:background-color"
                ),
                padding: this.convertLength(
                    paragraphProperties.getAttribute("fo:padding")
                ),
                borderStyle: paragraphProperties.getAttribute("fo:border-style")
            }
        }

        // Parse section properties
        const sectionProperties = styleNode.query("style:section-properties")
        if (sectionProperties) {
            properties.sectionProperties = {
                columnCount: sectionProperties.getAttribute("fo:column-count"),
                columnGap: this.convertLength(
                    sectionProperties.getAttribute("fo:column-gap")
                ),
                backgroundColor: sectionProperties.getAttribute(
                    "fo:background-color"
                ),
                margins: {
                    top: this.convertLength(
                        sectionProperties.getAttribute("fo:margin-top")
                    ),
                    bottom: this.convertLength(
                        sectionProperties.getAttribute("fo:margin-bottom")
                    ),
                    left: this.convertLength(
                        sectionProperties.getAttribute("fo:margin-left")
                    ),
                    right: this.convertLength(
                        sectionProperties.getAttribute("fo:margin-right")
                    )
                }
            }
        }

        // Additional table-specific properties
        if (styleNode.getAttribute("style:family") === "table") {
            properties.tableProperties = {
                align: styleNode.getAttribute("table:align"),
                width: this.convertLength(
                    styleNode.getAttribute("style:width")
                ),
                relWidth: styleNode.getAttribute("style:rel-width")
            }
        }

        return properties
    }

    convertObject(node, attrs) {
        const mathEl = node.query("math")
        if (mathEl) {
            attrs = Object.assign(
                {
                    equation: mathml_to_latex__rspack_import_0.MathMLToLaTeX.convert(mathEl.innerXML)
                },
                attrs
            )
            return {
                type: "equation",
                attrs
            }
        }
        return null
    }

    parseComments() {
        const annotations = this.contentDoc.queryAll("office:annotation")
        annotations.forEach(annotation => {
            const username = annotation.query("dc:creator")?.textContent || ""
            const date = new Date(
                annotation.query("dc:date")?.textContent || ""
            ).getTime()

            const id = (annotation.getAttribute("office:name") || "")
                .replace(/\D/g, "")
                .slice(0, 9)

            if (id) {
                // main comment
                this.comments[id] = {
                    user: 0,
                    username,
                    date,
                    comment: annotation
                        .queryAll("text:p")
                        .map(par => this.convertBlockNode(par))
                        .filter(par => par)
                        .flat(),
                    answers: [],
                    resolved:
                        annotation.getAttribute("loext:resolved") === "true"
                }
            } else {
                const parentId = (
                    annotation.getAttribute("loext:parent-name") || ""
                )
                    .replace(/\D/g, "")
                    .slice(0, 9)
                if (parentId && this.comments[parentId]) {
                    this.comments[parentId].answers.push({
                        id: (0,_schema_common__rspack_import_2.randomCommentId)(),
                        user: 0,
                        username,
                        date,
                        // drop the frist paragraph. It only contains "Reply to...."
                        answer: annotation
                            .queryAll("text:p")
                            .slice(1)
                            .map(par => this.convertBlockNode(par))
                            .filter(par => par)
                            .flat()
                    })
                }
            }
        })
    }

    collectReferenceableObjects(node) {
        // Handle heading bookmarks
        const bookmarkStarts = node.queryAll("text:bookmark-start")
        bookmarkStarts.forEach(mark => {
            const refName = mark.getAttribute("text:name")
            if (!refName) {
                return
            }

            // Find the closest heading
            let targetParent = mark.parentElement
            while (targetParent) {
                if (targetParent.tagName === "text:h") {
                    const id = (0,_schema_common__rspack_import_2.randomHeadingId)()
                    this.referenceableObjects[refName] = {
                        type: "heading",
                        id,
                        node: targetParent
                    }
                    break
                }
                targetParent = targetParent.parentElement
            }
        })

        // Handle figure sequences
        const sequences = node.queryAll("text:sequence")
        sequences.forEach(sequence => {
            const refName = sequence.getAttribute("text:ref-name")
            if (!refName) {
                return
            }

            // Find the figure container
            let targetParent = sequence.parentElement
            while (targetParent) {
                if (targetParent.tagName === "draw:frame") {
                    const id = (0,_schema_common__rspack_import_2.randomFigureId)()
                    this.referenceableObjects[refName] = {
                        type: "figure",
                        id,
                        node: targetParent
                    }
                    break
                }
                targetParent = targetParent.parentElement
            }
        })
    }

    convert() {
        const templateParts = this.template.content.content.slice()
        templateParts.shift()

        const document = {
            type: "doc",
            attrs: {
                import_id: this.importId
            },
            content: []
        }

        // Add title (required first element)
        const title = this.extractTitle()

        if (title.content.length) {
            document.content.push({
                type: "title",
                content: title.content
            })
        } else {
            // If no title found, use default title
            document.content.push({
                type: "title",
                content: [
                    {
                        type: "text",
                        text: gettext("Untitled")
                    }
                ]
            })
        }
        title.containerNodes.forEach(node => {
            node.parentElement.removeChild(node)
        })

        document.attrs.title =
            title.content.map(node => node.textContent).join("") ||
            gettext("Untitled")

        // Get all content sections from the ODT
        const body = this.contentDoc.query("office:text")
        if (!body) {
            return document
        }

        // Look for metadata sections first (author, abstract, etc.)
        const metadataContent = this.extractMetadata()
        metadataContent.forEach(({type, attrs, content}) => {
            const templatePart = templateParts.find(
                part => part.attrs.metadata === type
            )
            if (templatePart) {
                document.content.push({
                    type: templatePart.type,
                    attrs: {
                        ...templatePart.attrs,
                        ...attrs
                    },
                    content: content.content
                })
                // Remove paragraphs from content so they are not added to body
                content.containerNodes.forEach(node => {
                    node.parentElement.removeChild(node)
                })
            }
        })

        // Group remaining content by sections based on style names/titles
        const sections = this.groupContentIntoSections(body)

        // Map ODT sections to template parts
        sections.forEach(section => {
            // Find matching template part
            const templatePart = this.findMatchingTemplatePart(
                section.title,
                templateParts
            )

            if (templatePart) {
                // If template part found, use its configuration
                document.content.push({
                    type: "richtext_part",
                    attrs: {
                        title: templatePart.attrs.title,
                        id: templatePart.attrs.id,
                        metadata: templatePart.attrs.metadata || undefined,
                        marks: templatePart.attrs.marks || [
                            "strong",
                            "em",
                            "link"
                        ]
                    },
                    content: section.content
                })
            }
        })

        // Add remaining content to body section
        const unassignedContent = sections
            .filter(
                section =>
                    !this.findMatchingTemplatePart(section.title, templateParts)
            )
            .flatMap(section => section.content)

        if (unassignedContent.length) {
            // Find default body template part
            const bodyTemplatePart = templateParts.find(
                part => !part.attrs.metadata && part.type === "richtext_part"
            )

            document.content.push({
                type: "richtext_part",
                attrs: {
                    title: bodyTemplatePart
                        ? bodyTemplatePart.attrs.title
                        : "Body",
                    id: bodyTemplatePart ? bodyTemplatePart.attrs.id : "body",
                    marks: ["strong", "em", "link"]
                },
                content: unassignedContent
            })
        }

        return document
    }

    extractMetadata() {
        const metadata = []

        // Extract authors if present
        const authors = this.extractAuthors()
        if (authors.content.length) {
            metadata.push({
                type: "authors",
                content: authors
            })
        }

        // Extract abstract if present
        const abstract = this.extractAbstract()
        if (abstract.content.length) {
            metadata.push({
                type: "abstract",
                content: abstract
            })
        }

        // Extract keywords if present
        const keywords = this.extractKeywords()
        if (keywords.content.length) {
            metadata.push({
                type: "keywords",
                content: keywords
            })
        }

        return metadata
    }

    extractAuthors() {
        const authors = []

        // Try to find author information in metadata
        const metaAuthors = this.contentDoc.queryAll("meta:user-defined", {
            "meta:name": "author"
        })
        metaAuthors.forEach(authorMeta => {
            const authorText = authorMeta.textContent
            const [firstname = "", lastname = ""] = authorText.split(" ", 2)
            authors.push({
                type: "contributor",
                attrs: {
                    firstname,
                    lastname,
                    email: "",
                    institution: ""
                }
            })
        })
        if (authors.length) {
            return {
                content: authors,
                containerNodes: metaAuthors
            }
        }

        // Also check for creator in document metadata
        const creator = this.contentDoc.query("meta:creator")
        if (creator) {
            const [firstname = "", lastname = ""] = creator.textContent.split(
                " ",
                2
            )
            return {
                content: [
                    {
                        type: "contributor",
                        attrs: {
                            firstname,
                            lastname,
                            email: "",
                            institution: ""
                        }
                    }
                ],
                containerNodes: []
            }
        }

        return {content: [], containerNodes: []}
    }

    extractAbstract() {
        // Look for section titled "Abstract" or with abstract style
        const abstractSection =
            this.contentDoc.query("text:section", {
                "text:style-name": "Abstract"
            }) ||
            this.contentDoc.query("text:h", {
                "text:outline-level": "1"
            }) // Then check content for "Abstract"

        if (
            abstractSection &&
            (abstractSection.getAttribute("text:style-name") === "Abstract" ||
                abstractSection.textContent.includes("Abstract"))
        ) {
            return {
                content: this.convertContainer(abstractSection),
                containerNodes: [abstractSection]
            }
        }

        return {
            content: [],
            containerNodes: []
        }
    }

    extractKeywords() {
        // Look for keywords section or metadata
        const keywordsSection =
            this.contentDoc.query("text:p", {"text:style-name": "Keywords"}) ||
            this.contentDoc.query("meta:user-defined", {
                "meta:name": "keywords"
            })

        if (keywordsSection) {
            return {
                content: this.convertContainer(keywordsSection),
                containerNodes: [keywordsSection]
            }
        }

        return {content: [], containerNodes: []}
    }

    findMatchingTemplatePart(sectionTitle, templateParts) {
        if (!sectionTitle) {
            return null
        }

        // Try exact match first
        let matchingPart = templateParts.find(
            part =>
                part.type === "richtext_part" &&
                !part.attrs.metadata &&
                part.attrs.title.toLowerCase() === sectionTitle.toLowerCase()
        )

        if (!matchingPart) {
            // Try fuzzy matching if exact match fails
            matchingPart = templateParts.find(
                part =>
                    part.type === "richtext_part" &&
                    !part.attrs.metadata &&
                    this.isSimilarTitle(part.attrs.title, sectionTitle)
            )
        }

        return matchingPart
    }

    isSimilarTitle(title1, title2) {
        // Remove special characters and extra spaces
        const normalize = str =>
            str
                .toLowerCase()
                .replace(/[^a-z0-9]/g, "")
                .trim()

        const normalized1 = normalize(title1)
        const normalized2 = normalize(title2)

        // Check if one string contains the other
        return (
            normalized1.includes(normalized2) ||
            normalized2.includes(normalized1)
        )
    }

    extractTitle() {
        // First try to find paragraph with Title style
        const titleParagraph = this.contentDoc.query("text:p", {
            "text:style-name": "Title"
        })
        if (titleParagraph) {
            return {
                content: this.convertBlockNode(titleParagraph)?.content || [],
                containerNodes: [titleParagraph]
            }
        }

        // Fall back to first heading
        const titleHeading = this.contentDoc.query("text:h", {
            "text:outline-level": "1"
        })
        if (titleHeading) {
            return {
                content: this.convertBlockNode(titleHeading)?.content || [],
                containerNodes: [titleHeading]
            }
        }

        // Check for other common title style names
        const commonTitleStyles = [
            "title",
            "doctitle",
            "document-title",
            "heading-title"
        ]
        for (const styleName of commonTitleStyles) {
            const titleElement = this.contentDoc.query("text:p", {
                "text:style-name": styleName
            })
            if (titleElement) {
                return {
                    content: this.convertBlockNode(titleElement)?.content || [],
                    containerNodes: [titleElement]
                }
            }
        }

        // Check style properties for title-like formatting
        const firstParagraph = this.contentDoc.query("text:p")
        if (firstParagraph) {
            const styleName = firstParagraph.getAttribute("text:style-name")
            const style = this.styles[styleName]

            if (style && this.isTitleStyle(style)) {
                // Remove this node from the document so it's not processed again
                return {
                    content:
                        this.convertBlockNode(firstParagraph)?.content || [],
                    containerNodes: [firstParagraph]
                }
            }
        }

        return {
            content: [],
            containerNodes: []
        }
    }

    isTitleStyle(style) {
        // Check if style or its parent has characteristics of a title style
        if (!style) {
            return false
        }

        // Check style name
        if (style.title?.toLowerCase().includes("title")) {
            return true
        }

        // Check text properties for title-like formatting
        const textProps = style.textProperties
        if (textProps) {
            // Title usually has larger font size and/or bold weight
            if (textProps.fontSize > 14 || textProps.bold) {
                return true
            }
        }

        // Check paragraph properties
        const paraProps = style.paragraphProperties
        if (paraProps) {
            // Titles are often centered and have larger margins
            if (
                paraProps.textAlign === "center" ||
                (paraProps.marginTop > 0.5 && paraProps.marginBottom > 0.5)
            ) {
                return true
            }
        }

        // Check parent style if exists
        if (style.parentStyleName) {
            const parentStyle = this.styles[style.parentStyleName]
            return this.isTitleStyle(parentStyle)
        }

        return false
    }

    getSectionTitle(node, styleName) {
        if (!node || !styleName) {
            return null
        }

        // For headings, use the text content as section title
        if (node.tagName === "text:h") {
            // Get the heading level
            const level = parseInt(node.getAttribute("text:outline-level")) || 1

            // Only use level 1 and 2 headings as section titles
            if (level <= 2) {
                return node.textContent.trim()
            }
        }

        // Check if the style indicates a section title
        const style = this.styles[styleName]
        if (style) {
            // Check for explicit section title style
            if (
                style.title ||
                styleName.toLowerCase().includes("section") ||
                styleName.toLowerCase().includes("title")
            ) {
                // If it's a styled paragraph, use its content as title
                if (node.tagName === "text:p") {
                    return node.textContent.trim()
                }
            }

            // Check if it's a custom section style
            const parentStyle = style.parentStyleName
                ? this.styles[style.parentStyleName]
                : null
            if (parentStyle?.isSection) {
                return node.textContent.trim()
            }
        }

        // For text:section elements, check for section-name attribute
        if (node.tagName === "text:section") {
            const sectionName = node.getAttribute("text:name")
            if (sectionName) {
                return this.formatSectionName(sectionName)
            }
        }

        return null
    }

    formatSectionName(name) {
        // Remove common suffixes
        name = name.replace(/_?(section|part|chapter)$/i, "")

        // Split by underscores or hyphens
        const words = name.split(/[_-]/)

        // Capitalize first letter of each word and join
        return words
            .map(
                word =>
                    word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()
            )
            .join(" ")
            .trim()
    }

    groupContentIntoSections(body) {
        const sections = []
        let currentSection = {
            title: null,
            content: []
        }

        body.children.forEach(node => {
            const styleName = node.getAttribute("text:style-name")
            const title = this.getSectionTitle(node, styleName)

            if (title && this.isHeadingStyle(styleName)) {
                // Start new section
                if (currentSection.content.length) {
                    sections.push(currentSection)
                }
                currentSection = {
                    title: title,
                    content: []
                }
            }

            const converted = [this.convertBlockNode(node)]
                .filter(node => node)
                .flat()
            converted.forEach(node => currentSection.content.push(node))
        })

        // Add final section
        if (currentSection.content.length) {
            sections.push(currentSection)
        }

        return sections
    }

    isCodeBlockStyle(styleName, style) {
        if (!styleName) {
            return false
        }

        // Check if style name contains preformatted or code indicators
        const lowerStyleName = styleName.toLowerCase()
        if (
            lowerStyleName.includes("preformatted") ||
            lowerStyleName.includes("code") ||
            styleName === "Preformatted_20_Text"
        ) {
            return true
        }

        // Check if parent style is a code block style
        if (style?.parentStyleName) {
            const parentStyle = this.styles[style.parentStyleName]
            return this.isCodeBlockStyle(style.parentStyleName, parentStyle)
        }

        // Check text properties for monospace fonts
        if (style?.textProperties?.fontFamily) {
            const fontFamily = style.textProperties.fontFamily.toLowerCase()
            const monospacePatterns = [
                "courier",
                "consolas",
                "monaco",
                "menlo",
                "lucida console",
                "liberation mono",
                "dejavu sans mono",
                "bitstream vera sans mono",
                "source code pro",
                "fira code"
            ]
            return monospacePatterns.some(pattern =>
                fontFamily.includes(pattern)
            )
        }

        return false
    }

    isHeadingStyle(styleName) {
        if (!styleName) {
            return false
        }

        const style = this.styles[styleName]
        if (!style) {
            return false
        }

        // Check multiple indicators that this might be a heading style
        return (
            // Direct heading indicators
            style.isHeading ||
            styleName.toLowerCase().includes("heading") ||
            styleName.toLowerCase().includes("title") ||
            // Check outline level property
            Boolean(style.outlineLevel) ||
            // Check if it's derived from a heading style
            (style.parentStyleName &&
                this.isHeadingStyle(style.parentStyleName)) ||
            // Check specific formatting that's typical for headings
            (style.paragraphProperties &&
                // Larger margins than normal paragraphs
                (style.paragraphProperties.marginTop > 0.3 ||
                    style.paragraphProperties.marginBottom > 0.3 ||
                    // Different alignment
                    style.paragraphProperties.textAlign === "center")) ||
            // Check text properties typical for headings
            (style.textProperties &&
                // Larger font size
                (style.textProperties.fontSize > 12 ||
                    // Bold text
                    style.textProperties.bold ||
                    // Different font family
                    style.textProperties.fontFamily))
        )
    }

    convertContainer(container) {
        return container.children
            .map(node => this.convertBlockNode(node))
            .filter(node => node)
            .flat()
    }

    convertBlockNode(node) {
        const track = this.currentTracks.map(track => ({
            type: track.type,
            user: track.attrs.user,
            username: track.attrs.username,
            date: track.attrs.date
        }))

        const attrs = track.length ? {track} : {}

        switch (node.tagName) {
            case "text:p":
                if (
                    node.children.length === 1 &&
                    node.children[0].tagName === "draw:frame"
                ) {
                    // Paragraph consists of only one figure/image.
                    return this.convertImage(node.children[0], attrs)
                }
                return this.convertParagraph(node, attrs)
            case "text:h":
                return this.convertHeading(node, attrs)
            case "text:list":
                return this.convertList(node, attrs)
            case "draw:frame":
                return this.convertImage(node, attrs)
            case "draw:object":
                return this.convertObject(node, attrs)
            case "table:table":
                return this.convertTable(node, attrs)
            case "text:sequence-decls":
            case "office:forms":
            case "text:tracked-changes":
                return null
            case "text:bibliography":
                // LibreOffice native bibliography — rendered output only,
                // skip entirely in favour of Fidus Writer's own system.
                return null
            case "text:section": {
                // Skip bibliography sections inserted by citation managers
                // (Zotero: name contains "ZOTERO_BIBL"/"CSL_BIBLIOGRAPHY",
                //  JabRef: name is "JR_bib" / "JR_BIB").
                const sectionName = node.getAttribute("text:name") || ""
                if ((0,_citations__rspack_import_4.isOdtBibliographySection)(sectionName)) {
                    return null
                }
                // Other named sections are not bibliographies — fall through
                // to default handling (treat children as block content).
                return this.convertContainer(node)
            }
            default:
                console.warn(`Unsupported block node: ${node.tagName}`)
                return null
        }
    }

    convertParagraph(node, attrs = {}) {
        const styleName = node.getAttribute("text:style-name")
        const style = this.styles[styleName]

        // Check if this is a code block (preformatted text)
        if (this.isCodeBlockStyle(styleName, style)) {
            attrs = Object.assign(
                {
                    track: [],
                    language: "",
                    category: "",
                    title: "",
                    id: ""
                },
                attrs
            )
            return {
                type: "code_block",
                attrs,
                content: this.convertNodeChildren(node)
            }
        }

        // Check if this paragraph is title-like
        if (this.isTitleStyle(style)) {
            attrs = Object.assign(
                {
                    id: (0,_schema_common__rspack_import_2.randomHeadingId)()
                },
                attrs
            )
            return {
                type: "heading1",
                attrs,
                content: this.convertNodeChildren(node)
            }
        }

        if (this.isHeadingStyle(styleName)) {
            return this.convertHeading(node, attrs)
        }

        return {
            type: "paragraph",
            attrs,
            content: this.convertNodeChildren(node)
        }
    }

    convertHeading(node, attrs = {}) {
        const level =
            parseInt(node.getAttribute("text:outline-level") || 1) || 1

        // Check for bookmark
        let id = null
        const bookmarkStart = node.query("text:bookmark-start")
        if (bookmarkStart) {
            const refName = bookmarkStart.getAttribute("text:name")
            if (refName && this.referenceableObjects[refName]) {
                id = this.referenceableObjects[refName].id
            }
        }
        attrs = Object.assign(
            {
                id: id || (0,_schema_common__rspack_import_2.randomHeadingId)()
            },
            attrs
        )
        return {
            type: `heading${level}`,
            attrs,
            content: this.convertNodeChildren(node)
        }
    }

    convertNodeChildren(node, currentStyleMarks = []) {
        let insideCitationReferenceMark = false
        let insideBibliographyReferenceMark = false

        return node.children
            .map(child => {
                if (insideBibliographyReferenceMark) {
                    // Swallow all rendered bibliography content until the
                    // closing mark — we have our own bibliography system.
                    if (child.tagName === "text:reference-mark-end") {
                        const name = child.getAttribute("text:name")
                        if (name && (0,_citations__rspack_import_4.isOdtBibliographyReferenceMark)(name)) {
                            insideBibliographyReferenceMark = false
                        }
                    }
                    return null
                }

                if (insideCitationReferenceMark) {
                    if (child.tagName === "text:reference-mark-end") {
                        // Process citation when we hit the end mark
                        const name = child.getAttribute("text:name")
                        if (name && (0,_citations__rspack_import_4.isOdtCitationMark)(name)) {
                            insideCitationReferenceMark = false
                            return this.convertCitation(name, currentStyleMarks)
                        }
                    }
                    return null
                }

                switch (child.tagName) {
                    case "text:change-start": {
                        const changeId = child.getAttribute("text:change-id")
                        const track = this.tracks[changeId]
                        if (track) {
                            const trackMark = {
                                type: track.type,
                                attrs: {
                                    user: track.user,
                                    username: track.username,
                                    date: track.date
                                }
                            }
                            if (track.type === "insertion") {
                                trackMark.attrs.approved = track.approved
                            }
                            this.currentTracks.push(trackMark)
                        }
                        return null
                    }
                    case "text:change-end": {
                        const changeId = child.getAttribute("text:change-id")
                        const track = this.tracks[changeId]
                        if (track) {
                            this.currentTracks = this.currentTracks.filter(
                                mark => mark.type !== track.type
                            )
                        }
                        return null
                    }
                    case "#text":
                        return this.convertText(
                            String(child.textContent),
                            currentStyleMarks
                        )
                    case "text:s": // space
                        return this.convertText(" ", currentStyleMarks)
                    case "text:span": {
                        return this.convertSpan(child, currentStyleMarks)
                    }
                    case "text:a":
                        return this.convertLink(child, currentStyleMarks)
                    case "text:note":
                        return this.convertFootnote(child, currentStyleMarks)
                    case "office:annotation":
                        return this.convertAnnotationStart(child)
                    case "office:annotation-end":
                        return this.convertAnnotationEnd(child)
                    case "text:reference-mark-start": {
                        const name = child.getAttribute("text:name")
                        if (name && (0,_citations__rspack_import_4.isOdtCitationMark)(name)) {
                            insideCitationReferenceMark = true
                        } else if (
                            name &&
                            (0,_citations__rspack_import_4.isOdtBibliographyReferenceMark)(name)
                        ) {
                            insideBibliographyReferenceMark = true
                        }
                        return null
                    }
                    case "text:bibliography-mark":
                        return this.convertBibliographyMark(
                            child,
                            currentStyleMarks
                        )
                    case "text:bookmark-ref":
                        return this.convertHeadingReference(child)
                    case "text:sequence-ref":
                        return this.convertFigureReference(child)
                    case "text:soft-page-break":
                        return null
                    default:
                        console.warn(
                            `Unsupported inline node: ${child.tagName}`
                        )
                }
            })
            .filter(node => node)
            .flat()
    }

    getCurrentMarks(currentStyleMarks = []) {
        const commentMarks = []
        // Add comment marks for any active comment IDs
        this.currentCommentIds.forEach(commentId => {
            commentMarks.push({
                type: "comment",
                attrs: {
                    id: commentId
                }
            })
        })
        return [...currentStyleMarks, ...this.currentTracks, ...commentMarks]
    }

    convertText(text, currentStyleMarks) {
        const textNode = {
            type: "text",
            text
        }
        const marks = this.getCurrentMarks(currentStyleMarks)
        if (marks.length) {
            textNode.marks = marks
        }
        return textNode
    }

    convertSpan(node, currentStyleMarks) {
        const styleName = node.getAttribute("text:style-name")
        const style = this.styles[styleName]
        if (style?.textProperties?.bold) {
            currentStyleMarks = [...currentStyleMarks, {type: "strong"}]
        }
        if (style?.textProperties?.italic) {
            currentStyleMarks = [...currentStyleMarks, {type: "em"}]
        }
        // Handle superscript and subscript
        if (style?.textProperties?.textPosition) {
            const position = style.textProperties.textPosition
            if (position.includes("super")) {
                currentStyleMarks = [...currentStyleMarks, {type: "sup"}]
            } else if (position.includes("sub")) {
                currentStyleMarks = [...currentStyleMarks, {type: "sub"}]
            }
        }
        // Handle inline code (monospace fonts)
        if (style?.textProperties?.fontFamily) {
            const fontFamily = style.textProperties.fontFamily.toLowerCase()
            const monospacePatterns = [
                "courier",
                "consolas",
                "monaco",
                "menlo",
                "lucida console",
                "liberation mono",
                "dejavu sans mono",
                "bitstream vera sans mono",
                "source code pro",
                "fira code",
                "ubuntu mono",
                "droid sans mono",
                "monospace"
            ]
            const isMonospace = monospacePatterns.some(pattern =>
                fontFamily.includes(pattern)
            )
            if (isMonospace) {
                currentStyleMarks = [...currentStyleMarks, {type: "code"}]
            }
        }
        return this.convertNodeChildren(node, currentStyleMarks)
    }

    convertFootnote(node, currentStyleMarks) {
        const noteBody = node.query("text:note-body")
        if (!noteBody) {
            return null
        }

        // Get the first paragraph in the footnote
        const firstParagraph = noteBody.query("text:p")
        if (!firstParagraph) {
            return null
        }

        // Check if this is a citation-only footnote
        const referenceMarkStart = firstParagraph.query(
            "text:reference-mark-start"
        )
        const referenceMarkEnd = firstParagraph.query("text:reference-mark-end")

        const markName = referenceMarkStart?.getAttribute("text:name")
        if (
            referenceMarkStart &&
            referenceMarkEnd &&
            markName &&
            (0,_citations__rspack_import_4.isOdtCitationMark)(markName) &&
            // Check that there's no content outside the reference marks
            firstParagraph.children.every(
                child =>
                    child.tagName === "text:reference-mark-start" ||
                    child.tagName === "text:reference-mark-end" ||
                    (child.tagName === "text:span" &&
                        child.previousSibling?.tagName ===
                            "text:reference-mark-start" &&
                        child.nextSibling?.tagName ===
                            "text:reference-mark-end")
            )
        ) {
            // If it's a citation-only footnote, convert it directly to a citation
            return this.convertCitation(markName, currentStyleMarks)
        }

        // Otherwise, convert as regular footnote
        return {
            type: "footnote",
            attrs: {
                footnote: this.convertContainer(noteBody)
            },
            marks: this.getCurrentMarks(currentStyleMarks)
        }
    }

    convertCitation(markName, currentStyleMarks) {
        const citationNode = (0,_citations__rspack_import_4.parseOdtReferenceMark)(
            markName,
            this.bibliography,
            this.bibDB
        )
        if (citationNode) {
            citationNode.marks = this.getCurrentMarks(currentStyleMarks)
            return citationNode
        }
        return null
    }

    convertBibliographyMark(bibMarkNode, currentStyleMarks) {
        const citationNode = (0,_citations__rspack_import_4.parseOdtBibliographyMark)(
            bibMarkNode,
            this.bibliography
        )
        if (citationNode) {
            citationNode.marks = this.getCurrentMarks(currentStyleMarks)
            return citationNode
        }
        return null
    }

    convertList(node, attrs) {
        const listStyle = node.getAttribute("text:style-name")
        const isOrdered = this.isOrderedList(listStyle)

        attrs = Object.assign(
            {
                id: (0,_schema_common__rspack_import_2.randomListId)()
            },
            attrs
        )

        if (isOrdered) {
            attrs.order = 1
        }

        return {
            type: isOrdered ? "ordered_list" : "bullet_list",
            attrs,
            content: node.queryAll("text:list-item").map(item => ({
                type: "list_item",
                content: this.convertContainer(item)
            }))
        }
    }

    convertAnnotationStart(node) {
        const commentId = (node.getAttribute("office:name") || "")
            .replace(/\D/g, "")
            .slice(0, 9)
        if (commentId && this.comments[commentId]) {
            this.currentCommentIds.push(commentId)
        }
        return null
    }

    convertAnnotationEnd(node) {
        const commentId = (node.getAttribute("office:name") || "")
            .replace(/\D/g, "")
            .slice(0, 9)
        if (commentId) {
            const index = this.currentCommentIds.indexOf(commentId)
            if (index !== -1) {
                this.currentCommentIds.splice(index, 1)
            }
        }
        return null
    }

    convertHeadingReference(node) {
        const refName = node.getAttribute("text:ref-name")
        if (!refName || !this.referenceableObjects[refName]) {
            return null
        }

        const targetObject = this.referenceableObjects[refName]
        if (targetObject.type !== "heading") {
            return null
        }

        return {
            type: "cross_reference",
            attrs: {
                id: targetObject.id,
                title: targetObject.node.textContent
            }
        }
    }

    convertFigureReference(node) {
        const refName = node.getAttribute("text:ref-name")
        if (!refName || !this.referenceableObjects[refName]) {
            return null
        }

        const targetObject = this.referenceableObjects[refName]
        if (targetObject.type !== "figure") {
            return null
        }

        // Find the caption text within the figure
        const caption = targetObject.node.query("text:p")?.textContent || ""

        return {
            type: "cross_reference",
            attrs: {
                id: targetObject.id,
                title: caption
            }
        }
    }

    isOrderedList(styleName) {
        if (!this.stylesDoc) {
            return false
        }
        const listStyle = this.stylesDoc.query("text:list-style", {
            "style:name": styleName
        })
        return listStyle?.query("text:list-level-style-number") !== null
    }

    convertImage(node, attrs = {}) {
        const imageElement = node.query("draw:image")
        if (!imageElement) {
            return null
        }

        const frame = node.closest("draw:frame")
        if (!frame) {
            return null
        }

        const href = imageElement.getAttribute("xlink:href")
        if (!href || !href.startsWith("Pictures/")) {
            return null
        }

        const imageId = Math.floor(Math.random() * 1000000)
        const width = this.convertLength(node.getAttribute("svg:width"))
        const height = this.convertLength(node.getAttribute("svg:height"))

        const title = href.split("/").pop()
        this.images[imageId] = {
            id: imageId,
            title,
            copyright: {
                holder: false,
                year: false,
                freeToRead: true,
                licenses: []
            },
            image: href,
            file_type: this.getImageFileType(title),
            file: null,
            width,
            height,
            checksum: 0
        }

        // Find sequence element for figure reference
        const sequence = frame.query("text:sequence")
        let figureId = null
        if (sequence) {
            const refName = sequence.getAttribute("text:ref-name")
            if (refName && this.referenceableObjects[refName]) {
                figureId = this.referenceableObjects[refName].id
            }
        }

        const caption = node.query("text:p")
        const captionContent = caption ? this.convertNodeChildren(caption) : []

        attrs = Object.assign(
            {
                id: figureId || (0,_schema_common__rspack_import_2.randomFigureId)(),
                aligned: "center",
                width: Math.min(Math.round((width / 8.5) * 100), 100),
                caption: Boolean(captionContent.length)
            },
            attrs
        )

        const figureCaption = {type: "figure_caption"}
        if (captionContent.length) {
            figureCaption.content = captionContent
        }

        return {
            type: "figure",
            attrs,
            content: [
                {
                    type: "image",
                    attrs: {
                        image: imageId
                    }
                },
                figureCaption
            ]
        }
    }

    getImageFileType(filename) {
        const ext = filename.split(".").pop().toLowerCase()
        switch (ext) {
            case "avif":
            case "avifs":
                return "image/avif"
            case "png":
                return "image/png"
            case "jpg":
            case "jpeg":
                return "image/jpeg"
            case "gif":
                return "image/gif"
            case "svg":
                return "image/svg+xml"
            case "webp":
                return "image/webp"
            default:
                return "image/png" // Default fallback
        }
    }

    convertLength(length) {
        if (!length) {
            return 0
        }

        // Match number and unit
        const match = length.match(/^(-?\d*\.?\d+)(pt|cm|mm|in|pc|px|%)?$/)
        if (!match) {
            return 0
        }

        const [_, value, unit = "pt"] = match
        const numValue = parseFloat(value)

        // Convert to inches first (as base unit)
        switch (unit) {
            case "pt": // points
                return numValue / 72
            case "pc": // picas (1 pica = 12 points)
                return (numValue * 12) / 72
            case "cm": // centimeters
                return numValue / 2.54
            case "mm": // millimeters
                return numValue / 25.4
            case "in": // inches
                return numValue
            case "px": // pixels (assuming 96 DPI)
                return numValue / 96
            case "%": // percentage (return as is)
                return numValue
            default:
                return 0
        }
    }

    convertTable(node, attrs) {
        const width =
            node.getAttribute("style:rel-width")?.replace("%", "") || "100"
        const styleName = node.getAttribute("table:style-name")
        const style = this.styles[styleName]
        const aligned = style?.tableProperties.align || "center"

        attrs = Object.assign(
            {
                id: (0,_schema_common__rspack_import_2.randomTableId)(),
                track: (0,_schema_common_track__rspack_import_3.parseTracks)(node.getAttribute("text:change-id")),
                width,
                aligned,
                layout: "fixed",
                category: "none",
                caption: false
            },
            attrs
        )
        return {
            type: "table",
            attrs,
            content: [
                {type: "table_caption"},
                {
                    type: "table_body",
                    content: node
                        .queryAll("table:table-row")
                        .map(row => this.convertTableRow(row))
                }
            ]
        }
    }

    convertTableRow(row) {
        return {
            type: "table_row",
            content: row
                .queryAll(["table:table-cell", "table:covered-table-cell"])
                .map(cell => this.convertTableCell(cell))
        }
    }

    convertTableCell(node) {
        if (node.tagName === "table:covered-table-cell") {
            return null
        }
        return {
            type: "table_cell",
            attrs: {
                colspan:
                    parseInt(
                        node.getAttribute("table:number-columns-spanned")
                    ) || 1,
                rowspan:
                    parseInt(node.getAttribute("table:number-rows-spanned")) ||
                    1,
                track: (0,_schema_common_track__rspack_import_3.parseTracks)(node.getAttribute("text:change-id"))
            },
            content: this.convertContainer(node)
        }
    }

    convertLink(node, currentStyleMarks) {
        const href = node.getAttribute("xlink:href")
        currentStyleMarks = currentStyleMarks.concat([
            {type: "link", attrs: {href}}
        ])
        return this.convertNodeChildren(node, currentStyleMarks)
    }

    detectLanguage() {
        // Try to detect document language in following order:
        // 1. From document content
        // 2. From document styles
        // 3. Default to "en-US"

        // Check content language
        if (this.contentDoc) {
            const langAttr =
                this.contentDoc.getAttribute("office:default-language") ||
                this.contentDoc.getAttribute("dc:language")
            if (langAttr) {
                return langAttr
            }

            const firstParagraph = this.contentDoc.query("text:p")
            if (firstParagraph) {
                const paraLang = firstParagraph.getAttribute("xml:lang")
                if (paraLang) {
                    return paraLang
                }
            }
        }

        // Check styles language
        if (this.stylesDoc) {
            const defaultStyle = this.stylesDoc.query("style:default-style")
            if (defaultStyle) {
                const styleLang =
                    defaultStyle.getAttribute("fo:language") ||
                    defaultStyle.getAttribute("style:language-complex")
                if (styleLang) {
                    return styleLang
                }
            }
        }

        // Default to "en-US"
        return "en-US"
    }
}


}),
"./js/modules/importer/odt/import.js": (function (__unused_rspack_module, __webpack_exports__, __webpack_require__) {
"use strict";
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  OdtImporter: function() { return OdtImporter; }
});
/* import */ var _common__rspack_import_0 = __webpack_require__("./js/modules/common/index.js");
/* import */ var _native__rspack_import_1 = __webpack_require__("./js/modules/importer/native/index.js");
/* import */ var _convert__rspack_import_2 = __webpack_require__("./js/modules/importer/odt/convert.js");




class OdtImporter {
    constructor(file, user, path, importId, options = {}) {
        this.file = file
        this.user = user
        this.path = path
        this.importId = importId

        this.bibDB = options.bibDB

        this.template = null
        this.output = {
            ok: false,
            statusText: "",
            doc: null,
            docInfo: null
        }
    }

    init() {
        return this.getTemplate().then(() => this.importOdt())
    }

    getTemplate() {
        return (0,_common__rspack_import_0.jsonPostJson)("/api/document/get_template/", {
            import_id: this.importId
        }).then(({json}) => {
            this.template = json.template
        })
    }

    importOdt() {
        return Promise.resolve(/* import() */).then(__webpack_require__.t.bind(__webpack_require__, "./node_modules/.pnpm/jszip@3.10.1/node_modules/jszip/dist/jszip.min.js", 23)).then(({default: JSZip}) => {
            return JSZip.loadAsync(this.file).then(zip => {
                const contentPromise = zip.file("content.xml")?.async("string")
                const stylePromise = zip.file("styles.xml")?.async("string")
                const manifestPromise = zip
                    .file("META-INF/manifest.xml")
                    ?.async("string")

                if (!contentPromise) {
                    this.output.statusText = gettext(
                        "File does not contain content.xml"
                    )
                    return Promise.resolve(this.output)
                }

                // Get all images from the ODT
                const imageFiles = {}
                zip.forEach((relativePath, zipEntry) => {
                    if (relativePath.startsWith("Pictures/")) {
                        imageFiles[relativePath] = zipEntry
                    }
                })

                const imagePromises = Object.entries(imageFiles).map(
                    ([filename, zipEntry]) =>
                        zipEntry.async("blob").then(blob => ({
                            filename,
                            blob
                        }))
                )

                return Promise.all([
                    contentPromise,
                    stylePromise,
                    manifestPromise,
                    Promise.all(imagePromises)
                ]).then(([contentXml, stylesXml, manifestXml, images]) => {
                    const imageObj = {}
                    images.forEach(({filename, blob}) => {
                        imageObj[filename] = blob
                    })

                    return this.handleOdtContent(
                        contentXml,
                        stylesXml,
                        manifestXml,
                        imageObj
                    )
                })
            })
        })
    }

    handleOdtContent(contentXml, stylesXml, manifestXml, images = {}) {
        const bibliography = {} // Initial empty bibliography that will be populated during conversion

        const converter = new _convert__rspack_import_2.OdtConvert(
            contentXml,
            stylesXml,
            manifestXml,
            this.importId,
            this.template,
            bibliography,
            this.bibDB
        )

        let convertedDoc
        try {
            convertedDoc = converter.init()
        } catch (error) {
            this.output.statusText = error.message
            console.error(error)
            return this.output
        }

        const title =
            convertedDoc.content.content[0].content?.[0]?.text ||
            gettext("Untitled")

        const nativeImporter = new _native__rspack_import_1.NativeImporter(
            {
                content: convertedDoc.content,
                title,
                comments: convertedDoc.comments,
                settings: convertedDoc.settings
            },
            bibliography, // Pass the populated bibliography
            converter.images,
            Object.entries(images).map(([filename, blob]) => ({
                filename,
                content: blob
            })),
            this.user,
            this.importId,
            this.path + title
        )

        return nativeImporter
            .init()
            .then(({doc, docInfo}) => {
                this.output.ok = true
                this.output.doc = doc
                this.output.docInfo = docInfo
                this.output.statusText = `${(0,_common__rspack_import_0.escapeText)(doc.title)} ${gettext("successfully imported.")}`
                return this.output
            })
            .catch(error => {
                this.output.statusText = error.message
                console.error(error)
                return this.output
            })
    }
}


}),
"./js/modules/importer/odt/index.js": (function (__unused_rspack_module, __webpack_exports__, __webpack_require__) {
"use strict";
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  OdtImporter: function() { return /* reexport safe */ _import__rspack_import_0.OdtImporter; }
});
/* import */ var _import__rspack_import_0 = __webpack_require__("./js/modules/importer/odt/import.js");



}),
"./js/modules/importer/pandoc/convert.js": (function (__unused_rspack_module, __webpack_exports__, __webpack_require__) {
"use strict";
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  PandocConvert: function() { return PandocConvert; }
});
/* import */ var biblatex_csl_converter__rspack_import_0 = __webpack_require__("./node_modules/.pnpm/biblatex-csl-converter@3.6.0/node_modules/biblatex-csl-converter/lib/index.js");
/* import */ var _helpers__rspack_import_1 = __webpack_require__("./js/modules/importer/pandoc/helpers.js");




class PandocConvert {
    constructor(doc, importId, template, bibliography) {
        this.doc = doc
        this.importId = importId
        this.template = template
        this.bibliography = bibliography

        this.images = []

        this.language = this.doc.meta?.lang?.c?.[0]?.c || "en-US"

        this.SMALL_IMAGE_THRESHOLD = 1.0 // Smaller images will be discarded (in inches)
    }

    init() {
        try {
            this.validatePandocFormat()
        } catch (error) {
            console.error("Pandoc format validation failed:", error)
            throw new Error("Invalid Pandoc document format: " + error.message)
        }

        return {
            content: this.convert(),
            settings: {
                import_id: this.importId,
                tracked: false,
                language: this.language
            }
        }
    }

    validatePandocFormat() {
        // Check API version (Pandoc uses [major, minor, patch])
        if (
            !Array.isArray(this.doc["pandoc-api-version"]) ||
            this.doc["pandoc-api-version"].length !== 3 ||
            !this.doc["pandoc-api-version"].every(
                num => typeof num === "number"
            )
        ) {
            throw new Error("Invalid or missing Pandoc API version")
        }

        // Check for required top-level properties
        if (!this.doc.blocks || !Array.isArray(this.doc.blocks)) {
            throw new Error("Missing or invalid blocks property")
        }

        // Check meta property structure if it exists
        if (this.doc.meta && typeof this.doc.meta !== "object") {
            throw new Error("Invalid meta property")
        }

        // Basic validation of block structure
        if (
            !this.doc.blocks.every(
                block =>
                    block &&
                    typeof block === "object" &&
                    typeof block.t === "string" &&
                    ("c" in block || block.t === "Null")
            )
        ) {
            throw new Error("Invalid block structure")
        }

        return true
    }

    convert() {
        const templateParts = this.template.content.content.slice()
        templateParts.shift()
        // Create the outer document structure
        const document = {
            type: "doc",
            attrs: {
                import_id: this.importId
            },
            content: []
        }

        // Add title (required first element)
        document.content.push({
            type: "title",
            content: this.convertInlines(
                this.doc.meta?.title?.c || [{t: "Str", c: "Untitled"}]
            )
        })
        // Add subtitle if present
        if (this.doc.meta?.subtitle?.c) {
            const templatePart = templateParts.find(
                part => part.attrs.metadata === "subtitle"
            )
            document.content.push({
                type: "heading_part",
                attrs: {
                    title: templatePart ? templatePart.attrs.title : "Subtitle",
                    id: templatePart ? templatePart.attrs.id : "subtitle",
                    metadata: "subtitle"
                },
                content: [
                    {
                        type: "heading1",
                        attrs: {
                            id: "H" + Math.random().toString(36).substr(2, 7)
                        },
                        content: this.convertInlines(this.doc.meta.subtitle.c)
                    }
                ]
            })
        }

        // Add authors if present
        if (this.doc.meta?.author?.c) {
            const templatePart = templateParts.find(
                part => part.attrs.metadata === "authors"
            )
            document.content.push({
                type: "contributors_part",
                attrs: {
                    title: templatePart ? templatePart.attrs.title : "Authors",
                    id: templatePart ? templatePart.attrs.id : "authors",
                    metadata: "authors"
                },
                content: this.doc.meta.author.c.map(author => ({
                    type: "contributor",
                    attrs: this.convertContributor(author)
                }))
            })
        }

        // Add abstract if present
        if (this.doc.meta?.abstract?.c) {
            const templatePart = templateParts.find(
                part => part.attrs.metadata === "abstract"
            )
            document.content.push({
                type: "richtext_part",
                attrs: {
                    title: templatePart
                        ? templatePart.attrs.title
                        : gettext("Abstract"),
                    id: templatePart ? templatePart.attrs.id : "abstract",
                    metadata: "abstract"
                },
                content: this.convertBlocks(this.doc.meta.abstract.c)
            })
        }

        const templatePart = templateParts.find(
            part => !part.attrs.metadata && part.type === "richtext_part"
        )
        // Add main body content
        document.content.push({
            type: "richtext_part",
            attrs: {
                title: templatePart ? templatePart.attrs.title : "Body",
                id: templatePart ? templatePart.attrs.id : "body",
                marks: ["strong", "em", "link"]
            },
            content: this.convertBlocks(this.doc.blocks)
        })

        return document
    }

    convertContributor(author) {
        const attrs = {
            firstname: "",
            lastname: "",
            email: "",
            institution: ""
        }

        // Extract name components
        if (author.c) {
            const textParts = author.c
                .filter(part => part.t === "Str")
                .map(part => part.c)

            if (textParts.length > 1) {
                attrs.lastname = textParts.pop()
                attrs.firstname = textParts.join(" ")
            } else if (textParts.length === 1) {
                attrs.lastname = textParts[0]
            }

            // Extract email from notes if present
            const note = author.c.find(part => part.t === "Note")
            if (note) {
                attrs.email = this.convertInlines(note.c[0].c)
                    .map(node => node.text)
                    .join("")
            }
        }

        return attrs
    }

    convertBlocks(blocks) {
        if (!blocks) {
            return []
        }
        return blocks
            .map(block => this.convertBlock(block))
            .flat()
            .filter(block => block)
    }

    convertBlock(block) {
        switch (block.t) {
            case "CodeBlock": {
                const [attrs, code] = block.c
                // attrs structure: [id, classes, keyValuePairs]
                // Example: ["ref-label", ["python3"], [["caption", "The Caption"], ["linenos", ""]]]
                const id = attrs?.[0] || ""
                const language = attrs?.[1]?.[0] || "" // First class is language
                const keyValuePairs = attrs?.[2] || []

                // Extract caption and category from key-value pairs
                let title = ""
                let category = ""

                const captionPair = keyValuePairs.find(
                    pair => pair[0] === "caption"
                )
                if (captionPair) {
                    title = captionPair[1]
                }

                const categoryPair = keyValuePairs.find(
                    pair => pair[0] === "category"
                )
                if (categoryPair) {
                    category = categoryPair[1]
                } else if (title) {
                    // If there's a caption but no explicit category, default to 'listing'
                    // This makes the code block referenceable and properly numbered
                    category = "listing"
                }

                return [
                    {
                        type: "code_block",
                        attrs: {
                            track: [],
                            language: language,
                            category: category,
                            title: title,
                            id: id
                        },
                        content: [{type: "text", text: code}]
                    }
                ]
            }
            case "Div":
                // Handle special figure containers
                if (block.attr?.classes?.includes("figure")) {
                    return this.convertFigure(block)
                }
                // Ignore otherwise. Could be bibliography
                // or other non-content block
                return []
            case "Para":
            case "Plain": {
                // Process each inline, splitting into paragraphs and figures
                const blocks = []
                let currentInlines = []
                for (const inline of block.c) {
                    if (inline.t === "Image") {
                        // Convert accumulated inlines to a paragraph
                        if (currentInlines.length > 0) {
                            blocks.push({
                                type: "paragraph",
                                content: this.convertInlines(currentInlines)
                            })
                            currentInlines = []
                        }
                        // Convert image to figure and add as block
                        const figure = this.convertInline(inline)
                        blocks.push(figure)
                    } else {
                        currentInlines.push(inline)
                    }
                }
                // Add remaining inlines as a paragraph
                if (currentInlines.length > 0) {
                    blocks.push({
                        type: "paragraph",
                        content: this.convertInlines(currentInlines)
                    })
                }
                return blocks
            }
            case "Header":
                return [
                    {
                        type: `heading${block.c[0]}`,
                        attrs: {
                            id: block.c[1][0]
                        },
                        content: this.convertInlines(block.c[2])
                    }
                ]
            case "BlockQuote":
                return [
                    {
                        type: "blockquote",
                        content: this.convertBlocks(block.c)
                    }
                ]
            case "BulletList":
                return [
                    {
                        type: "bullet_list",
                        content: block.c.map(item => ({
                            type: "list_item",
                            content: this.convertBlocks(item)
                        }))
                    }
                ]
            case "DefinitionList": {
                return block.c.flatMap(item => [
                    {
                        type: "paragraph",
                        content: (0,_helpers__rspack_import_1.applyMarkToNodes)(
                            this.convertInlines(item.term),
                            "strong"
                        )
                    },
                    {
                        type: "bullet_list",
                        content: item.definitions.map(def => ({
                            type: "list_item",
                            content: this.convertBlocks(def)
                        }))
                    }
                ])
            }
            case "OrderedList":
                return [
                    {
                        type: "ordered_list",
                        attrs: {
                            order: block.c[0][0]
                        },
                        content: block.c[1].map(item => ({
                            type: "list_item",
                            content: this.convertBlocks(item)
                        }))
                    }
                ]
            case "Table":
                return [this.convertTable(block)]
            case "Figure":
                return [this.convertFigure(block)]
            default:
                console.warn(`Unhandled block type: ${block.t}`)
                return []
        }
    }

    convertInlines(inlines) {
        if (!inlines) {
            return []
        }
        // Convert each inline element, flatten, and merge adjacent text nodes with same marks
        const convertedNodes = inlines
            .map(inline => this.convertInline(inline))
            .filter(inline => inline)
            .flat()

        // Remove hard breaks at start and end
        const filteredNodes = convertedNodes.filter((node, index, array) => {
            if (node.type === "hard_break") {
                // Remove if first or last node
                if (index === 0 || index === array.length - 1) {
                    return false
                }
            }
            return true
        })

        return (0,_helpers__rspack_import_1.mergeTextNodes)(filteredNodes)
    }

    convertInline(inline) {
        if (!inline) {
            return null
        }

        switch (inline.t) {
            case "Cite":
                return this.convertCitation(inline)
            case "Image": {
                const imagePath = inline.c[2][0]

                const widthInfo = inline.c[0][2].find(
                    attr => attr[0] === "width"
                )

                if (widthInfo) {
                    const width = parseFloat(widthInfo[1]) // in inches
                    if (width < this.SMALL_IMAGE_THRESHOLD) {
                        console.warn(
                            `Skipping small decorative image: ${imagePath} (width: ${width}%)`
                        )
                        return null
                    }
                }

                const imageId = Math.floor(Math.random() * 1000000)
                const imageTitle = imagePath.split("/").pop()

                // Skip small decorative images

                // Store image reference
                this.images[imageId] = {
                    id: imageId,
                    title: imageTitle,
                    copyright: {
                        holder: false,
                        year: false,
                        freeToRead: true,
                        licenses: []
                    },
                    image: imagePath,
                    file_type: this.getImageFileType(imageTitle),
                    file: null,
                    checksum: 0
                }

                // Create a figure with optional caption
                const caption = inline.c[1] || []
                let category = "none"
                if (
                    caption.length &&
                    ["Figure", "Table", "Photo"].includes(caption[0].c)
                ) {
                    category = caption[0].c.toLowerCase()
                    caption.shift() // Category name, for example "Figure"
                    caption.shift() // Space
                    caption.shift() // Category number, for example "1:"
                    caption.shift() // Space
                }

                const percentageWidth = this.extractImageWidth(inline.c[0][2])
                return {
                    type: "figure",
                    attrs: {
                        aligned: "center",
                        width: percentageWidth,
                        category,
                        caption: Boolean(caption.length)
                    },
                    content: [
                        {
                            type: "image",
                            attrs: {
                                image: imageId
                            }
                        },
                        {
                            type: "figure_caption",
                            content: this.convertInlines(caption)
                        }
                    ]
                }
            }
            case "Str":
                return {
                    type: "text",
                    text: inline.c
                }
            case "Space":
                return {
                    type: "text",
                    text: " "
                }
            case "Strong": {
                const innerNodes = this.convertInlines(inline.c)
                return (0,_helpers__rspack_import_1.mergeTextNodes)((0,_helpers__rspack_import_1.applyMarkToNodes)(innerNodes, "strong"))
            }
            case "Emph": {
                const innerNodes = this.convertInlines(inline.c)
                return (0,_helpers__rspack_import_1.mergeTextNodes)((0,_helpers__rspack_import_1.applyMarkToNodes)(innerNodes, "em"))
            }
            case "Underline": {
                const innerNodes = this.convertInlines(inline.c)
                return (0,_helpers__rspack_import_1.mergeTextNodes)((0,_helpers__rspack_import_1.applyMarkToNodes)(innerNodes, "underline"))
            }
            case "Strikeout": {
                const inner = this.convertInlines(inline.c)
                return (0,_helpers__rspack_import_1.applyAnnotation)(inner, "strikeout")
            }
            case "SmallCaps": {
                const inner = this.convertInlines(inline.c)
                return (0,_helpers__rspack_import_1.applyAnnotation)(inner, "smallcaps")
            }
            case "Superscript": {
                const innerNodes = this.convertInlines(inline.c)
                return (0,_helpers__rspack_import_1.mergeTextNodes)((0,_helpers__rspack_import_1.applyMarkToNodes)(innerNodes, "sup"))
            }
            case "Subscript": {
                const innerNodes = this.convertInlines(inline.c)
                return (0,_helpers__rspack_import_1.mergeTextNodes)((0,_helpers__rspack_import_1.applyMarkToNodes)(innerNodes, "sub"))
            }
            case "Code": {
                const text = inline.c[1]
                return {
                    type: "text",
                    text: text,
                    marks: [{type: "code"}]
                }
            }
            case "Link": {
                const innerNodes = this.convertInlines(inline.c[1])
                return (0,_helpers__rspack_import_1.mergeTextNodes)(
                    (0,_helpers__rspack_import_1.applyMarkToNodes)(innerNodes, "link", {href: inline.c[2][0]})
                )
            }
            case "Note": {
                if (
                    inline.c.length === 1 &&
                    inline.c[0].t === "Para" &&
                    inline.c[0].c.length === 2 &&
                    inline.c[0].c[0].t === "Cite" &&
                    inline.c[0].c[1].t === "Str" &&
                    inline.c[0].c[1].c === "."
                ) {
                    // This is a citation note rendered as a footnote.
                    return this.convertInline(inline.c[0].c[0])
                }

                return {
                    type: "footnote",
                    attrs: {
                        footnote: this.convertBlocks(inline.c)
                    }
                }
            }
            case "Math":
                return {
                    type: "equation",
                    attrs: {
                        equation: inline.c[1]
                    }
                }
            case "Quoted": {
                const type =
                    inline.c[0].t === "SingleQuote" ? "single" : "double"
                const quoteStart = type === "single" ? "‘" : "“" // U+2018, U+201C
                const quoteEnd = type === "single" ? "’" : "”" // U+2019, U+201D
                const innerNodes = this.convertInlines(inline.c[1])
                const quotedNodes = [
                    {type: "text", text: quoteStart},
                    ...innerNodes,
                    {type: "text", text: quoteEnd}
                ]
                return (0,_helpers__rspack_import_1.mergeTextNodes)(quotedNodes)
            }
            case "RawBlock":
            case "RawInline": {
                return [
                    {
                        type: "text",
                        text: `[RAW CONTENT: ${inline.text}]`,
                        marks: [
                            {
                                type: "annotation_tag",
                                attrs: {
                                    type: "raw",
                                    key: inline.format,
                                    value: ""
                                }
                            }
                        ]
                    }
                ]
            }
            case "SoftBreak":
                return {type: "text", text: " "}
            case "LineBreak":
                return {type: "hard_break"}
            case "Span": {
                // Check if this is a Zotero CSL citation
                const attrs = inline.c[0][0]
                if (attrs && attrs.startsWith("ZOTERO_ITEM CSL_CITATION")) {
                    try {
                        // Extract just the JSON portion
                        const jsonStr = attrs.replace(
                            "ZOTERO_ITEM CSL_CITATION ",
                            ""
                        )
                        const lastBrace = jsonStr.lastIndexOf("}") + 1
                        const cslData = JSON.parse(
                            jsonStr.substring(0, lastBrace)
                        )

                        // Create citation references
                        const citations = cslData.citationItems.map(item => {
                            const id = String(item.itemData.id)

                            // find in bibliography
                            let [bibKey, _] =
                                Object.entries(this.bibliography).find(
                                    ([_key, entry]) => entry.entry_key === id
                                ) || []
                            if (!bibKey) {
                                // Not yet present in bibliography. We'll parse the CSL data and add it.
                                const parseData = (0,biblatex_csl_converter__rspack_import_0.parseCSL)({
                                    [id]: item.itemData
                                })
                                const bibEntry = parseData["1"]
                                bibKey = `${Object.keys(this.bibliography).length + 1}`
                                this.bibliography[bibKey] = bibEntry
                            }
                            return {
                                id: bibKey,
                                prefix: item.prefix || "",
                                locator: item.locator || ""
                            }
                        })

                        return {
                            type: "citation",
                            attrs: {
                                format: "cite",
                                references: citations
                            }
                        }
                    } catch (error) {
                        console.warn("Failed to parse CSL citation:", error)
                    }
                }
                // If not a citation or parsing failed, fall through to regular text
                return this.convertInlines(inline.c[1])
            }
            default:
                console.warn(`Unhandled inline type: ${inline.t}`)
                return null
        }
    }

    extractImageWidth(attrs) {
        const widthAttr = attrs.find(attr => attr[0] === "width")
        if (widthAttr) {
            // Convert inch measurement to percentage (assuming max width is 8.5 inches)
            const widthInInches = parseFloat(widthAttr[1])
            return Math.min(Math.round((widthInInches / 8.5) * 100), 100)
        }
        return 100 // default width
    }

    convertTable(table) {
        const attrs = {
            width: 100,
            aligned: "center",
            layout: "fixed"
        }

        //c[0]: Attr
        //c[0][0]: identifier
        //c[0][1]: classes
        //c[0][2]: key-value pairs
        //c[1]: Caption
        //c[1][0]: Caption
        //c[1][1]: (Maybe ShortCaption)
        //c[2]: [ColSpec] // per table column
        //c[3]: TableHead
        //c[3][0]: Attrs
        //c[3][1]: Row
        //c[4]: [TableBody]
        //c[4][X][0]: Attr
        //c[4][X][1]: RowHeadColumns
        //c[4][X][2]: [Row]
        //c[4][X][3]: [Row]
        //c[5]: TableFoot
        //c[5][0]: Attrs
        //c[5][1]: Row

        //Row
        //c[0]: Attrs
        //c[1]: [Cell]

        //Cell
        //c[0]: Attr
        //c[1]: Alignment
        //c[2]: RowSpan
        //c[3]: ColSpan
        //c[4]: [Block]

        // Extract table attributes
        const tableAttrs = table.c[0][2]
        tableAttrs.forEach(attr => {
            if (attr[0] === "width") {
                attrs.width = parseInt(attr[1])
            } else if (attr[0] === "aligned") {
                attrs.aligned = attr[1]
            } else if (attr[0] === "layout") {
                attrs.layout = attr[1]
            }
        })

        const rows = table.c[3][1]
            .concat(
                table.c[4]
                    .map(tableBody => tableBody[2].concat(tableBody[3]))
                    .flat()
            )
            .concat(table.c[5][1])

        const caption = table.c[1][0] || []
        return {
            type: "table",
            attrs,
            content: [
                {
                    type: "table_caption",
                    content: this.convertInlines(caption)
                },
                {
                    type: "table_body",
                    content: rows.map(row => ({
                        type: "table_row",
                        content: row[1].map(cell => {
                            const cellContent = this.convertBlocks(cell[4])
                            if (cellContent.length === 0) {
                                cellContent.push({type: "paragraph"})
                            }
                            return {
                                type: "table_cell",
                                attrs: {
                                    colspan: cell[3],
                                    rowspan: cell[2]
                                },
                                content: cellContent
                            }
                        })
                    }))
                }
            ]
        }
    }

    getImageFileType(filename) {
        const ext = filename.split(".").pop().toLowerCase()
        switch (ext) {
            case "avif":
            case "avifs":
                return "image/avif"
            case "png":
                return "image/png"
            case "jpg":
            case "jpeg":
                return "image/jpeg"
            case "gif":
                return "image/gif"
            case "svg":
                return "image/svg+xml"
            case "webp":
                return "image/webp"
            default:
                return "image/png" // Default fallback
        }
    }

    convertFigure(figure) {
        const caption = figure.c[1][1]
        const attrs = {
            aligned: "center",
            width: 100,
            figureCategory: "none",
            caption: Boolean(caption.length)
        }

        // Extract figure attributes
        const figureAttrs = figure.c[0][2]
        figureAttrs.forEach(attr => {
            if (attr[0] === "width") {
                attrs.width = parseInt(attr[1])
            } else if (attr[0] === "aligned") {
                attrs.aligned = attr[1]
            } else if (attr[0] === "category") {
                attrs.figureCategory = attr[1]
            }
        })

        const imagePath = figure.c[2][0].c[0].c[2][0]
        const imageId = Math.floor(Math.random() * 1000000)
        const imageTitle = imagePath.split("/").pop()

        // Store image reference
        this.images[imageId] = {
            id: imageId,
            title: imageTitle,
            copyright: {
                holder: false,
                year: false,
                freeToRead: true,
                licenses: []
            },
            image: imagePath,
            file_type: this.getImageFileType(imageTitle),
            file: null,
            checksum: 0
        }

        return {
            type: "figure",
            attrs,
            content: [
                {
                    type: "image",
                    attrs: {
                        image: imageId
                    }
                },
                {
                    type: "figure_caption",
                    content: this.convertBlocks(caption)
                        .map(block => block.content || [])
                        .flat()
                }
            ]
        }
    }

    convertCitation(cite) {
        const references = cite.c[0]
            .map(ref => {
                // Handle empty bibliography case
                if (
                    !this.bibliography ||
                    Object.keys(this.bibliography).length === 0
                ) {
                    return
                }

                const foundEntry = Object.entries(this.bibliography).find(
                    ([_id, definition]) =>
                        definition.entry_key === ref.citationId
                )

                if (!foundEntry) {
                    return
                }

                const [bibId, _bibEntry] = foundEntry
                if (!bibId) {
                    return
                }
                return {
                    id: bibId,
                    prefix: ref.citationPrefix
                        .map(prefix => prefix.c)
                        .join(" "),
                    locator: ref.citationSuffix
                        .map(suffix => suffix.c)
                        .join(" ")
                }
            })
            .filter(ref => ref)

        if (!references.length) {
            return null
        }
        return {
            type: "citation",
            attrs: {
                format:
                    cite.c[0][0].citationMode.t === "AuthorInText"
                        ? "textcite"
                        : "cite",
                references
            }
        }
    }
}


}),
"./js/modules/importer/pandoc/helpers.js": (function (__unused_rspack_module, __webpack_exports__, __webpack_require__) {
"use strict";
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  applyAnnotation: function() { return applyAnnotation; },
  applyMarkToNodes: function() { return applyMarkToNodes; },
  mergeTextNodes: function() { return mergeTextNodes; }
});
const applyMarkToNodes = (nodes, markType, attrs = null) => {
    return nodes.map(node => {
        if (node.type === "text") {
            const mark = attrs ? {type: markType, attrs} : {type: markType}
            return {
                ...node,
                marks: [...(node.marks || []), mark]
            }
        }
        return node
    })
}

const mergeTextNodes = nodes => {
    const mergedNodes = []
    let currentNode = null

    const areSameMarks = (marks1 = [], marks2 = []) => {
        if (marks1.length !== marks2.length) {
            return false
        }
        // Sort marks by type to ensure consistent comparison
        const sortedMarks1 = [...marks1].sort((a, b) =>
            a.type.localeCompare(b.type)
        )
        const sortedMarks2 = [...marks2].sort((a, b) =>
            a.type.localeCompare(b.type)
        )
        return sortedMarks1.every((mark, index) => {
            const mark2 = sortedMarks2[index]
            if (mark.type !== mark2.type) {
                return false
            }
            if (!mark.attrs && !mark2.attrs) {
                return true
            }
            return JSON.stringify(mark.attrs) === JSON.stringify(mark2.attrs)
        })
    }

    nodes.forEach(node => {
        if (node.type === "text") {
            if (
                currentNode &&
                currentNode.type === "text" &&
                areSameMarks(currentNode.marks, node.marks)
            ) {
                // Merge with previous node
                currentNode.text += node.text
            } else {
                // Start new node
                if (currentNode) {
                    mergedNodes.push(currentNode)
                }
                currentNode = {...node}
            }
        } else {
            if (currentNode) {
                mergedNodes.push(currentNode)
            }
            mergedNodes.push(node)
            currentNode = null
        }
    })

    if (currentNode) {
        mergedNodes.push(currentNode)
    }

    return mergedNodes
}

const applyAnnotation = (nodes, type) => {
    return nodes.map(node => ({
        ...node,
        marks: [
            ...(node.marks || []),
            {
                type: "annotation_tag",
                attrs: {type, key: "", value: ""}
            }
        ]
    }))
}


}),
"./js/modules/importer/pandoc/import.js": (function (__unused_rspack_module, __webpack_exports__, __webpack_require__) {
"use strict";
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  PandocImporter: function() { return PandocImporter; }
});
/* import */ var _bibliography_import__rspack_import_0 = __webpack_require__("./js/modules/bibliography/import/index.js");
/* import */ var _common__rspack_import_1 = __webpack_require__("./js/modules/common/index.js");
/* import */ var _native__rspack_import_2 = __webpack_require__("./js/modules/importer/native/index.js");
/* import */ var _convert__rspack_import_3 = __webpack_require__("./js/modules/importer/pandoc/convert.js");





class PandocImporter {
    constructor(file, user, path, importId, options) {
        this.file = file
        this.user = user
        this.path = path
        this.importId = importId
        this.additionalFiles = options.files

        this.template = null
        this.output = {
            ok: false,
            statusText: "",
            doc: null,
            docInfo: null
        }
        this.title = gettext("Untitled")
    }

    async init() {
        await this.getTemplate()
        const text = await this.file.text()
        return this.handlePandocJson(
            text,
            this.additionalFiles?.images,
            this.additionalFiles?.bibliography
        )
    }

    async getTemplate() {
        const {json} = await (0,_common__rspack_import_1.jsonPostJson)("/api/document/get_template/", {
            import_id: this.importId
        })
        this.template = json.template
    }

    importJSON() {
        const reader = new FileReader()
        return new Promise(resolve => {
            reader.onload = () =>
                resolve(this.handlePandocJson(reader.result, {}, null))
            reader.readAsText(this.file)
        })
    }

    handlePandocJson(jsonString, images = {}, bibString = "") {
        let pandocJson
        try {
            pandocJson = JSON.parse(jsonString)
        } catch (error) {
            this.output.statusText = error.message
            return this.output
        }

        // Create a promise that will resolve with the bibliography entries
        const bibPromise = new Promise(resolve => {
            if (bibString) {
                // Create a temporary bibliography database
                const tempBibDB = {
                    saveBibEntries: data => {
                        // Instead of saving, just return the data
                        return Promise.resolve(
                            Object.entries(data).map((entry, index) => [
                                entry[0],
                                index + 1
                            ])
                        )
                    }
                }

                // Create a temporary callback that will resolve with the bibliography data
                const tempCallback = () => {}

                // Create a temporary addToList function
                const tempAddToList = () => {}

                // Use BibliographyImporter to parse the bibliography
                const importer = new _bibliography_import__rspack_import_0.BibliographyImporter(
                    bibString,
                    tempBibDB,
                    tempAddToList,
                    tempCallback,
                    false // Don't show alerts
                )

                // Store the original onMessage function
                const originalOnMessage = importer.onMessage

                // Override onMessage to capture the bibliography data
                importer.onMessage = function (message) {
                    if (message.type === "data") {
                        resolve(message.data)
                    }
                    originalOnMessage.call(this, message)
                }

                importer.init()
            } else {
                resolve({})
            }
        })

        return bibPromise.then(bibliography => {
            const converter = new _convert__rspack_import_3.PandocConvert(
                pandocJson,
                this.importId,
                this.template,
                bibliography
            )

            let convertedDoc
            try {
                convertedDoc = converter.init()
            } catch (error) {
                this.output.statusText = error.message
                console.error(error)
                return this.output
            }
            if (
                ["", "Untitled"].includes(
                    convertedDoc.content.content[0].content?.[0]?.text
                )
            ) {
                convertedDoc.content.content[0].content[0].text = this.title
            } else {
                this.title =
                    convertedDoc.content.content[0].content[0].text ||
                    this.title
            }

            // Create a new NativeImporter instance
            const nativeImporter = new _native__rspack_import_2.NativeImporter(
                {
                    content: convertedDoc.content,
                    title: this.title,
                    comments: {},
                    settings: convertedDoc.settings
                },
                bibliography,
                converter.images, // Pass converted images
                Object.entries(images).map(([filename, blob]) => ({
                    filename,
                    content: blob
                })),
                this.user,
                null,
                this.path + this.title
            )

            return nativeImporter
                .init()
                .then(({doc, docInfo}) => {
                    this.output.ok = true
                    this.output.doc = doc
                    this.output.docInfo = docInfo
                    this.output.statusText = `${(0,_common__rspack_import_1.escapeText)(doc.title)} ${gettext("successfully imported.")}`
                    return this.output
                })
                .catch(error => {
                    this.output.statusText = error.message
                    console.error(error)
                    return this.output
                })
        })
    }
}


}),
"./js/modules/importer/pandoc/index.js": (function (__unused_rspack_module, __webpack_exports__, __webpack_require__) {
"use strict";
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  PandocImporter: function() { return /* reexport safe */ _import__rspack_import_0.PandocImporter; }
});
/* import */ var _import__rspack_import_0 = __webpack_require__("./js/modules/importer/pandoc/import.js");



}),
"./js/modules/importer/register.js": (function (__unused_rspack_module, __webpack_exports__, __webpack_require__) {
"use strict";
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  ImporterRegistry: function() { return ImporterRegistry; },
  importerRegistry: function() { return importerRegistry; },
  registerImporter: function() { return registerImporter; }
});
/* import */ var _zip_analyzer__rspack_import_0 = __webpack_require__("./js/modules/importer/zip_analyzer.js");
/* import */ var _docx__rspack_import_1 = __webpack_require__("./js/modules/importer/docx/index.js");
/* import */ var _odt__rspack_import_2 = __webpack_require__("./js/modules/importer/odt/index.js");
/* import */ var _pandoc__rspack_import_3 = __webpack_require__("./js/modules/importer/pandoc/index.js");


class ImporterRegistry {
    constructor() {
        this.importers = new Map()
    }

    register(fileTypes, importer) {
        fileTypes.forEach(([description, types]) => {
            types.forEach(extension =>
                this.importers.set(extension, {importer, description})
            )
        })
    }

    getZipImporter(zip) {
        const analyzer = new _zip_analyzer__rspack_import_0.ZipAnalyzer(zip, this.getAllFormats())
        const analysis = analyzer.analyze()

        if (analysis.hasConvertible) {
            return {
                importer: this.getImporter(analysis.format)["importer"],
                getContents: () => analyzer.getContents()
            }
        }

        return null
    }

    getImporter(format) {
        return this.importers.get(format)
    }

    getAllFormats() {
        return Array.from(this.importers.keys())
    }

    getAllDescriptions() {
        return Array.from(this.importers).reduce(
            (acc, [extension, {description}]) => {
                ;(acc[description] = acc[description] || []).push(extension)
                return acc
            },
            {}
        )
    }
}

const importerRegistry = new ImporterRegistry()

;

// Register built-in importers


importerRegistry.register([["Pandoc JSON", ["json"]]], _pandoc__rspack_import_3.PandocImporter)

importerRegistry.register([["ODT", ["odt"]]], _odt__rspack_import_2.OdtImporter)

importerRegistry.register([["DOCX", ["docx"]]], _docx__rspack_import_1.DocxImporter)

function registerImporter(fileTypes, importer) {
    importerRegistry.register(fileTypes, importer)
}


}),
"./js/modules/importer/zip_analyzer.js": (function (__unused_rspack_module, __webpack_exports__, __webpack_require__) {
"use strict";
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  ZipAnalyzer: function() { return ZipAnalyzer; }
});
class ZipAnalyzer {
    constructor(zip, formats = []) {
        this.zip = zip
        this.formats = formats

        this.analysis = null
    }

    analyze() {
        if (this.analysis) {
            return this.analysis
        }

        let convertibleFile = null
        const imageFiles = []
        let bibFile = null

        // Analyze all files in the ZIP
        this.zip.forEach((relativePath, zipEntry) => {
            if (!zipEntry.dir) {
                const fileName = relativePath.split("/").pop()
                const extension = fileName.split(".").pop().toLowerCase()

                if (extension === "bib") {
                    bibFile = zipEntry
                } else if (
                    [
                        "avif",
                        "avifs",
                        "png",
                        "jpg",
                        "jpeg",
                        "gif",
                        "svg",
                        "webp"
                    ].includes(extension)
                ) {
                    imageFiles.push({path: relativePath, entry: zipEntry})
                } else if (this.formats.includes(extension)) {
                    // Store the first convertible file found
                    if (!convertibleFile) {
                        convertibleFile = {
                            path: relativePath,
                            entry: zipEntry,
                            fileName,
                            format: extension
                        }
                    }
                }
            }
        })

        this.analysis = {
            hasConvertible: Boolean(convertibleFile),
            format: convertibleFile ? convertibleFile.format : null,
            convertibleFile,
            imageFiles,
            bibFile
        }

        return this.analysis
    }

    async getContents() {
        if (!this.analysis) {
            await this.analyze()
        }

        const contents = {
            images: {},
            bibliography: null,
            mainContent: null
        }

        // Load main content file
        if (this.analysis.hasConvertible) {
            const mainBlob =
                await this.analysis.convertibleFile.entry.async("blob")
            contents.mainContent = new File(
                [mainBlob],
                this.analysis.convertibleFile.fileName
            )
        }

        // Load images
        const imagePromises = this.analysis.imageFiles.map(
            async ({path, entry}) => {
                const blob = await entry.async("blob")
                contents.images[path] = blob
                return {filename: path, blob}
            }
        )
        await Promise.all(imagePromises)

        // Load bibliography if present
        if (this.analysis.bibFile) {
            contents.bibliography = await this.analysis.bibFile.async("text")
        }

        return contents
    }
}


}),
"./js/plugins/documents_overview/index.js": (function () {


}),

}]);