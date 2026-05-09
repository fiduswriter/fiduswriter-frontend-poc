"use strict";
(self["webpackChunkfidus_writer"] = self["webpackChunkfidus_writer"] || []).push([["js_modules_bibliography_import_index_js"], {
"./js/modules/bibliography/import/bibliography_import.js": (function (__unused_rspack_module, __webpack_exports__, __webpack_require__) {
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
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  BibliographyFileImportDialog: function() { return /* reexport safe */ _dialog__rspack_import_0.BibliographyFileImportDialog; },
  BibliographyImporter: function() { return /* reexport safe */ _bibliography_import__rspack_import_1.BibliographyImporter; }
});
/* import */ var _dialog__rspack_import_0 = __webpack_require__("./js/modules/bibliography/import/dialog.js");
/* import */ var _bibliography_import__rspack_import_1 = __webpack_require__("./js/modules/bibliography/import/bibliography_import.js");




}),
"./js/modules/bibliography/import/templates.js": (function (__unused_rspack_module, __webpack_exports__, __webpack_require__) {
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

}]);