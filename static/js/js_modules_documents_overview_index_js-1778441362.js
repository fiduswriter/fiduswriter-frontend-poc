(self["rspackChunkfidus_writer"] = self["rspackChunkfidus_writer"] || []).push([["js_modules_documents_overview_index_js"], {
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
        return (0,_common__rspack_import_0.postJson)("/api/document/delete/", {id}).then(({json}) => {
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

    importDocument() {
        const documentTemplates = this.documentOverview.documentTemplates || {}
        const importIds = Object.keys(documentTemplates)
        let importId = importIds[0] // Default to first template

        const templateSelector =
            importIds.length > 1
                ? `<label for="import-template-selector">${gettext("Import as:")}</label>
                <div class="fw-select-container">
                    <select class="fw-button fw-light fw-large" id="import-template-selector">
                        ${Object.entries(documentTemplates)
                            .map(
                                ([key, template]) =>
                                    `<option value="${(0,_common__rspack_import_0.escapeText)(key)}">${(0,_common__rspack_import_0.escapeText)(template.title)}</option>`
                            )
                            .join("")}
                    </select>
                    <div class="fw-select-arrow fa-solid fa-caret-down"></div>
                </div>`
                : ""

        const e2eeMode = this.documentOverview.app.settings.E2EE_MODE
        let e2eeHtml = ""
        let forceE2EE = false
        if (e2eeMode === "required") {
            forceE2EE = true
            e2eeHtml = `<div class="e2ee-import-note" style="margin-top: 10px;">
                <em>${gettext("This document will be saved as encrypted.")}</em>
            </div>`
        } else if (e2eeMode === "enabled") {
            e2eeHtml = `<div class="e2ee-import-choice" style="margin-top: 10px;">
                <div>
                    <input type="radio" id="import-nonencrypted" name="import-encryption" value="nonencrypted" checked>
                    <label for="import-nonencrypted">${gettext("Non-encrypted")}</label>
                </div>
                <div>
                    <input type="radio" id="import-e2ee" name="import-encryption" value="e2ee">
                    <label for="import-e2ee">${gettext("Encrypted")}</label>
                </div>
            </div>`
        }

        const supportedDescriptions = Object.entries(
            _importer_register__rspack_import_5.importerRegistry.getAllDescriptions()
        )
            .map(
                ([description, extensions]) =>
                    `${description} (${extensions.join(", ")})`
            )
            .join("<br>")
        const supportedFormatsText = `${gettext("Supported formats")}:<p>FIDUS<br>${supportedDescriptions}</p><p>${gettext("You can also upload a ZIP file that contains one file in any of these formats as well as images and/or bibtex file.")}</p>`

        const importDialog = new _common__rspack_import_0.Dialog({
            id: "import_document",
            title: gettext("Import a document"),
            body: (0,_templates__rspack_import_8.importDocumentTemplate)({
                templateSelector,
                e2eeHtml,
                supportedFormatsText
            }),
            height: (importIds.length > 1 ? 260 : 210) + (e2eeHtml ? 60 : 0),
            buttons: [
                {
                    text: gettext("Import"),
                    classes: "fw-dark",
                    click: () => {
                        let file = document.getElementById("doc-uploader").files
                        if (0 === file.length) {
                            return false
                        }
                        file = file[0]
                        if (104857600 < file.size) {
                            (0,_common__rspack_import_0.addAlert)("error", gettext("File too large"))
                            return false
                        }

                        // Determine E2EE selection
                        let targetE2EE = forceE2EE
                        if (e2eeMode === "enabled") {
                            targetE2EE =
                                document.querySelector(
                                    'input[name="import-encryption"]:checked'
                                )?.value === "e2ee"
                        }

                        const doImport = async e2eeOptions => {
                            const isFidus =
                                file.name.split(".").pop().toLowerCase() ===
                                "fidus"

                            if (isFidus) {
                                const importer = new _importer_native__rspack_import_4.FidusFileImporter(
                                    file,
                                    this.documentOverview.user,
                                    this.documentOverview.path,
                                    true,
                                    this.documentOverview.contacts,
                                    e2eeOptions
                                )

                                try {
                                    const {ok, statusText, doc} =
                                        await importer.init()
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
                                } catch (_error) {
                                    (0,_common__rspack_import_0.deactivateWait)()
                                }
                                return
                            }

                            // Handle ZIP files for external formats
                            if (file.type === "application/zip") {
                                const {default: JSZip} = await Promise.resolve(/* import() */).then(__webpack_require__.t.bind(__webpack_require__, "./node_modules/.pnpm/jszip@3.10.1/node_modules/jszip/dist/jszip.min.js", 23))
                                const zip = await JSZip.loadAsync(file)
                                const importerInfo =
                                    _importer_register__rspack_import_5.importerRegistry.getZipImporter(zip)

                                if (!importerInfo) {
                                    (0,_common__rspack_import_0.addAlert)(
                                        "error",
                                        gettext(
                                            "No importable files found in ZIP"
                                        )
                                    )
                                    ;(0,_common__rspack_import_0.deactivateWait)()
                                    return
                                }

                                const files = await importerInfo.getContents()
                                const importer = new importerInfo.importer(
                                    files.mainContent,
                                    this.documentOverview.user,
                                    this.documentOverview.path,
                                    importId,
                                    {...files, e2eeOptions}
                                )

                                const {ok, statusText, doc} =
                                    await importer.init()
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
                                return
                            }

                            // Get file extension for external formats
                            const fileExtension = file.name
                                .split(".")
                                .pop()
                                .toLowerCase()
                            const importerInfo =
                                _importer_register__rspack_import_5.importerRegistry.getImporter(fileExtension)

                            if (!importerInfo) {
                                (0,_common__rspack_import_0.addAlert)(
                                    "error",
                                    gettext("Unsupported file format")
                                )
                                ;(0,_common__rspack_import_0.deactivateWait)()
                                return
                            }

                            // Get selected template if multiple templates exist
                            if (importIds.length > 1) {
                                importId = document.getElementById(
                                    "import-template-selector"
                                ).value
                            }

                            const options = {
                                bibDB: this.documentOverview.app.bibDB,
                                files: {},
                                e2eeOptions
                            }

                            const importer = new importerInfo.importer(
                                file,
                                this.documentOverview.user,
                                this.documentOverview.path,
                                importId,
                                options
                            )

                            const {ok, statusText, doc} = await importer.init()
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
                        }

                        if (targetE2EE) {
                            (0,_common__rspack_import_0.activateWait)()
                            ;(0,_editor_e2ee_password_dialog__rspack_import_2.createPasswordDialog)(async password => {
                                const salt = window.crypto.getRandomValues(
                                    new Uint8Array(16)
                                )
                                const iterations = 600000
                                try {
                                    const key = await _editor_e2ee_key_manager__rspack_import_1.E2EEKeyManager.deriveKey(
                                        password,
                                        salt,
                                        iterations
                                    )
                                    const e2eeOptions = {
                                        enabled: true,
                                        key,
                                        salt: btoa(
                                            String.fromCharCode(...salt)
                                        ),
                                        iterations
                                    }
                                    await doImport(e2eeOptions)
                                } catch (error) {
                                    (0,_common__rspack_import_0.deactivateWait)()
                                    ;(0,_common__rspack_import_0.addAlert)(
                                        "error",
                                        gettext(
                                            "Could not create encrypted document."
                                        )
                                    )
                                    console.error(error)
                                }
                            })
                        } else {
                            (0,_common__rspack_import_0.activateWait)()
                            doImport(null)
                        }
                    }
                },
                {
                    type: "cancel"
                }
            ]
        })
        importDialog.open()

        document
            .getElementById("doc-uploader")
            .addEventListener("change", () => {
                document.getElementById("import-doc-name").innerHTML = document
                    .getElementById("doc-uploader")
                    .value.replace(/C:\\fakepath\\/i, "")
            })

        document
            .getElementById("import-doc-btn")
            .addEventListener("click", event => {
                document.getElementById("doc-uploader").click()
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
            .then(() => (0,_common__rspack_import_4.postJson)("/api/document/documentlist/"))
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
            const response = await (0,_common__rspack_import_4.postJson)(
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
                                                class: "fa-solid fa-folder"
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
                    <i class="fa-solid fa-folder"></i>
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
                ${doc.e2ee ? '<i class="fa-solid fa-lock e2ee-doc-indicator" title="' + gettext("End-to-end encrypted document") + '"></i>' : '<i class="fa-regular fa-file-alt"></i>'}
                <span class="fw-searchable${doc.e2ee && !hasDecryptedTitle ? " e2ee-encrypted-title" : ""}">
                    ${(0,_common__rspack_import_4.shortFileTitle)(displayTitle, doc.path)}
                </span>
                ${doc.template ? `<small class="doc-template-name">${(0,_common__rspack_import_4.escapeText)(doc.template)}</small>` : ""}
            </a>`,
            doc.revisions.length
                ? `<span class="revisions" data-id="${doc.id}">
                <i class="fa-solid fa-history"></i>
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
                        ? '<i class="fa-solid fa-trash-alt"></i>'
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
            id: "import_document",
            title: gettext("Import document"),
            keys: "Alt-i",
            action: overview => overview.mod.actions.importDocument(),
            order: 3
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
  importDocumentTemplate: function() { return importDocumentTemplate; }
});
/* import */ var _common__rspack_import_0 = __webpack_require__("./js/modules/common/index.js");


/**
 * Template for the unified document import dialog.
 *
 * @param {Object} params
 * @param {string} params.templateSelector - HTML for template selector (or empty)
 * @param {string} params.e2eeHtml - HTML for E2EE encryption options (or empty)
 * @param {string} params.supportedFormatsText - HTML describing supported formats
 * @returns {string} Dialog body HTML
 */
const importDocumentTemplate = ({
    templateSelector = "",
    e2eeHtml = "",
    supportedFormatsText = ""
}) =>
    `<form>
        ${templateSelector}
        <div class="fw-select-container">
            <div class="fw-select-head">
                <button type="button" class="fw-button fw-light fw-large" id="import-doc-btn">
                    ${gettext("Select a file")}
                </button>
                <label id="import-doc-name" class="ajax-upload-label"></label>
            </div>
            <input id="doc-uploader" type="file" accept=".fidus,.docx,.odt,.json,.zip" style="display: none;">
        </div>
        ${e2eeHtml}
    </form>
    <div class="noteEl">${supportedFormatsText}</div>`

const deleteFolderCell = ({subdir, ids}) =>
    `<span class="delete-folder fw-link-text" data-ids="${ids.join(",")}"
        data-title="${(0,_common__rspack_import_0.escapeText)(subdir)}">
        '<i class="fa-solid fa-trash-alt"></i>
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
        return (0,_common__rspack_import_1.post)("/api/document/delete_revision/", {id})
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
                                ${rev.pk}"><i class="fa-solid fa-download"></i></span></td>
                        <td width="50"><span class="fw-inline download-revision" data-id="
                                ${rev.pk}" data-filename="${(0,_common__rspack_import_0.escapeText)(rev.file_name)}">
                            <i class="fa-solid fa-download"></i>
                        </span></td>
                        ${
                            doc.is_owner
                                ? `<td width="50">
                                <span class="fw-inline delete-revision" data-id="${rev.pk}">
                                    <i class="fa-solid fa-trash"></i>
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
        return (0,_common__rspack_import_0.postJson)("/api/document/documentlist/extra/", {
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
"./js/plugins/documents_overview/index.js": (function () {


}),

}]);