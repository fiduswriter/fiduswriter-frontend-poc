(self["webpackChunkfidus_writer"] = self["webpackChunkfidus_writer"] || []).push([["js_modules_bibliography_overview_index_js"], {
"./js/modules/bibliography/export/index.js": (function (__unused_rspack_module, __webpack_exports__, __webpack_require__) {
"use strict";
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  BibLatexFileExporter: function() { return BibLatexFileExporter; }
});
/* import */ var downloadjs__rspack_import_0 = __webpack_require__("./node_modules/.pnpm/downloadjs@1.4.7/node_modules/downloadjs/download.js");
/* import */ var downloadjs__rspack_import_0_default = /*#__PURE__*/__webpack_require__.n(downloadjs__rspack_import_0);
/* import */ var _exporter_tools_zip__rspack_import_1 = __webpack_require__("./js/modules/exporter/tools/zip.js");



class BibLatexFileExporter {
    constructor(bibDB, pks) {
        this.pks = pks // A list of pk values of the bibliography items to be exported.
        this.bibDB = bibDB // The bibliography database to export from.
    }

    init() {
        Promise.resolve(/* import() */).then(__webpack_require__.bind(__webpack_require__, "./node_modules/.pnpm/biblatex-csl-converter@3.6.0/node_modules/biblatex-csl-converter/lib/index.js")).then(({BibLatexExporter}) => {
            const exporter = new BibLatexExporter(this.bibDB.db, this.pks)

            const zipper = new _exporter_tools_zip__rspack_import_1.ZipFileCreator([
                {
                    filename: "bibliography.bib",
                    contents: exporter.output
                }
            ])
            zipper
                .init()
                .then(blob =>
                    downloadjs__rspack_import_0_default()(blob, "bibliography.zip", "application/zip")
                )
        })
    }
}


}),
"./js/modules/bibliography/form/strings.js": (function (__unused_rspack_module, __webpack_exports__, __webpack_require__) {
"use strict";
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  BibFieldHelp: function() { return BibFieldHelp; },
  BibFieldTitles: function() { return BibFieldTitles; },
  BibOptionTitles: function() { return BibOptionTitles; },
  BibTypeTitles: function() { return BibTypeTitles; },
  getAllFieldHelp: function() { return getAllFieldHelp; },
  getAllTypeTitles: function() { return getAllTypeTitles; },
  getBibFieldHelp: function() { return getBibFieldHelp; },
  getBibFieldTitle: function() { return getBibFieldTitle; },
  getBibLangidTitle: function() { return getBibLangidTitle; },
  getBibOptionTitle: function() { return getBibOptionTitle; },
  getBibTypeTitle: function() { return getBibTypeTitle; }
});
/* import */ var biblatex_csl_converter__rspack_import_0 = __webpack_require__("./node_modules/.pnpm/biblatex-csl-converter@3.6.0/node_modules/biblatex-csl-converter/lib/index.js");


// Cache for the current locale to avoid repeated lookups
let cachedLocale = null
let cachedLang = null

function getCachedLocale() {
    const lang = document.documentElement.lang || "en"
    if (lang !== cachedLang) {
        cachedLocale = (0,biblatex_csl_converter__rspack_import_0.getLocale)(lang)
        cachedLang = lang
    }
    return cachedLocale
}

// Dynamic field title getter that uses biblatex-csl-converter's i18n
function getBibFieldTitle(fieldKey, bibType = null) {
    const locale = getCachedLocale()
    if (bibType && biblatex_csl_converter__rspack_import_0.BibTypes[bibType]) {
        return (0,biblatex_csl_converter__rspack_import_0.getFieldTitle)(locale, bibType, fieldKey)
    }
    // Fallback to generic field title
    const fieldType = biblatex_csl_converter__rspack_import_0.BibFieldTypes[fieldKey]
    if (fieldType && fieldType.title) {
        return fieldType.title
    }
    return fieldKey
}

// Dynamic type title getter
function getBibTypeTitle(typeKey) {
    const locale = getCachedLocale()
    return (0,biblatex_csl_converter__rspack_import_0.getTypeTitle)(locale, typeKey)
}

// Dynamic field help getter
function getBibFieldHelp(fieldKey) {
    const locale = getCachedLocale()
    return (0,biblatex_csl_converter__rspack_import_0.getFieldHelp)(locale, fieldKey)
}

// Dynamic option title getter (for editortype, pagination, pubstate, etc.)
function getBibOptionTitle(optionKey) {
    const locale = getCachedLocale()
    return (0,biblatex_csl_converter__rspack_import_0.getOtherOptionTitle)(locale, optionKey)
}

// Dynamic langid title getter
function getBibLangidTitle(langidKey) {
    const locale = getCachedLocale()
    return (0,biblatex_csl_converter__rspack_import_0.getLangidTitle)(locale, langidKey)
}

// For backward compatibility, create proxy objects that dynamically return translations
// These should be used sparingly - prefer using the function versions above
const BibFieldTitles = new Proxy(
    {},
    {
        get(_target, prop) {
            return getBibFieldTitle(prop)
        }
    }
)

const BibTypeTitles = new Proxy(
    {},
    {
        get(_target, prop) {
            return getBibTypeTitle(prop)
        }
    }
)

const BibFieldHelp = new Proxy(
    {},
    {
        get(_target, prop) {
            return getBibFieldHelp(prop)
        }
    }
)

const BibOptionTitles = new Proxy(
    {},
    {
        get(_target, prop) {
            return getBibOptionTitle(prop)
        }
    }
)

// Export a function to get all type titles as an object (for templates that need to map all types)
function getAllTypeTitles() {
    const locale = getCachedLocale()
    const titles = {}
    Object.keys(biblatex_csl_converter__rspack_import_0.BibTypes).forEach(typeKey => {
        titles[typeKey] = (0,biblatex_csl_converter__rspack_import_0.getTypeTitle)(locale, typeKey)
    })
    return titles
}

// Export a function to get all field help texts
function getAllFieldHelp() {
    const locale = getCachedLocale()
    const help = {}
    Object.keys(biblatex_csl_converter__rspack_import_0.BibFieldTypes).forEach(fieldKey => {
        const helpText = (0,biblatex_csl_converter__rspack_import_0.getFieldHelp)(locale, fieldKey)
        if (helpText) {
            help[fieldKey] = helpText
        }
    })
    return help
}


}),
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
"./js/modules/bibliography/overview/index.js": (function (__unused_rspack_module, __webpack_exports__, __webpack_require__) {
"use strict";
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  BibliographyOverview: function() { return BibliographyOverview; }
});
/* import */ var fix_utf8__rspack_import_0 = __webpack_require__("./node_modules/.pnpm/fix-utf8@2.0.1/node_modules/fix-utf8/index.js");
/* import */ var simple_datatables__rspack_import_1 = __webpack_require__("./node_modules/.pnpm/simple-datatables@10.2.0/node_modules/simple-datatables/dist/module.js");
/* import */ var w3c_keyname__rspack_import_2 = __webpack_require__("./node_modules/.pnpm/w3c-keyname@2.2.8/node_modules/w3c-keyname/index.js");
/* import */ var _plugins_bibliography_overview__rspack_import_3 = __webpack_require__("./js/plugins/bibliography_overview/index.js");
/* import */ var _plugins_bibliography_overview__rspack_import_3_default = /*#__PURE__*/__webpack_require__.n(_plugins_bibliography_overview__rspack_import_3);
/* import */ var _common__rspack_import_4 = __webpack_require__("./js/modules/common/index.js");
/* import */ var _feedback__rspack_import_5 = __webpack_require__("./js/modules/feedback/index.js");
/* import */ var _menu__rspack_import_6 = __webpack_require__("./js/modules/menu/index.js");
/* import */ var _form_strings__rspack_import_7 = __webpack_require__("./js/modules/bibliography/form/strings.js");
/* import */ var _tools__rspack_import_8 = __webpack_require__("./js/modules/bibliography/tools.js");
/* import */ var _menu__rspack_import_9 = __webpack_require__("./js/modules/bibliography/overview/menu.js");
/* import */ var _templates__rspack_import_10 = __webpack_require__("./js/modules/bibliography/overview/templates.js");













class BibliographyOverview {
    constructor({app, user}) {
        this.app = app
        this.user = user

        this.lastSort = {column: 0, dir: "asc"}
    }

    /** Bind the init function to doc loading.
     * @function bind
     */
    init() {
        return (0,_common__rspack_import_4.whenReady)().then(() => {
            this.render()
            const smenu = new _menu__rspack_import_6.SiteMenu(this.app, "bibliography")
            smenu.init()
            this.menu = new _common__rspack_import_4.OverviewMenuView(this, _menu__rspack_import_9.menuModel)
            this.menu.init()
            this.setBibCategoryList(this.app.bibDB.cats)
            this.initTable(Object.keys(this.app.bibDB.db))
            // Reset scroll position to top to prevent Safari from auto-scrolling
            // to the focused table element, which would hide the header/menu
            window.scrollTo(0, 0)
            this.activatePlugins()
            this.bindEvents()
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
        document.body = this.dom
        ;(0,_common__rspack_import_4.ensureCSS)([
            staticUrl("css/bibliography.css"),
            staticUrl("css/prosemirror.css"),
            staticUrl("css/inline_tools.css")
        ])
        ;(0,_common__rspack_import_4.setDocTitle)(gettext("Bibliography Manager"), this.app)
        const feedbackTab = new _feedback__rspack_import_5.FeedbackTab()
        feedbackTab.init()
    }

    onResize() {
        if (!this.table) {
            return
        }
        this.initTable(Object.keys(this.app.bibDB.db))
    }

    /* Initialize the overview table */
    initTable(ids) {
        const tableEl = document.createElement("table")
        tableEl.id = "bibliography"
        tableEl.classList.add("fw-data-table")
        tableEl.classList.add("fw-large")
        this.dom.querySelector(".fw-contents").innerHTML = ""
        this.dom.querySelector(".fw-contents").appendChild(tableEl)

        this.dtBulk = new _common__rspack_import_4.DatatableBulk(this, (0,_menu__rspack_import_9.bulkMenuModel)(), 1)

        const hiddenCols = [0]

        if (window.innerWidth < 500) {
            hiddenCols.push(1)
            if (window.innerWidth < 450) {
                hiddenCols.push(3)
            }
        }

        this.table = new simple_datatables__rspack_import_1.DataTable(tableEl, {
            searchable: true,
            paging: false,
            scrollY: `${Math.max(window.innerHeight - 360, 100)}px`,
            rowNavigation: true,
            rowSelectionKeys: ["Enter", "Delete", " "],
            tabIndex: 1,
            labels: {
                noRows: gettext("No sources registered"),
                noResults: gettext("No sources found") // Message shown when there are no search results
            },
            template: (options, _dom) =>
                `<div class='${options.classes.container}'${options.scrollY.length ? ` style='height: ${options.scrollY}; overflow-Y: auto;'` : ""}></div>`,
            data: {
                headings: [
                    "",
                    this.dtBulk.getHTML(),
                    gettext("Title"),
                    gettext("Sourcetype"),
                    gettext("Author"),
                    gettext("Published"),
                    ""
                ],
                data: ids.map(id => this.createTableRow(id))
            },
            columns: [
                {
                    select: 0,
                    type: "number"
                },
                {
                    select: 1,
                    type: "boolean",
                    sortable: false
                },
                {
                    select: hiddenCols,
                    hidden: true
                },
                {
                    select: 6,
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
                        "data-id": id,
                        id: `bib-${id}`
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
                            for: `bib-${id}`
                        }
                    }
                ]
            }
        })

        this.table.on("datatable.selectrow", (rowIndex, event, focused) => {
            event.preventDefault()
            if (event.type === "keydown") {
                const key = (0,w3c_keyname__rspack_import_2.keyName)(event)
                if (key === "Enter") {
                    if (this.getSelected().length > 0) {
                        // Don't open. Let the bulk menu handle it.
                        return
                    }
                    const editButton = this.table.dom.querySelector(
                        `tr[data-index="${rowIndex}"] span.edit-bib`
                    )
                    if (editButton) {
                        editButton.click()
                    }
                } else if (key === " ") {
                    const cell = this.table.data.data[rowIndex].cells[1]
                    cell.data = !cell.data
                    cell.text = String(cell.data)
                    this.table.update()
                } else if (key === "Delete") {
                    const cell = this.table.data.data[rowIndex].cells[0]
                    const bibId = cell.data
                    this.deleteBibEntryDialog([bibId])
                }
            } else {
                if (
                    event.target.closest(
                        "span.edit-bib, span.delete-bib, label"
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

    /** Adds a list of bibliography categories to current list of bibliography categories.
     * @function setBibCategoryList
     * @param newBibCategories The new categories which will be added to the existing ones.
     */
    setBibCategoryList(bibCategories) {
        const catSelector = this.menu.model.content.find(
            menuItem => menuItem.id === "cat_selector"
        )
        catSelector.content = catSelector.content.filter(
            cat => cat.type !== "category"
        )

        catSelector.content = catSelector.content.concat(
            bibCategories.map(cat => ({
                title: cat.category_title,
                type: "category",
                action: _overview => {
                    const trs = this.dom.querySelectorAll(
                        "#bibliography > tbody > tr"
                    )
                    trs.forEach(tr => {
                        if (
                            tr
                                .querySelector(".fw-data-table-title")
                                .classList.contains(`cat_${cat.id}`)
                        ) {
                            tr.style.display = ""
                        } else {
                            tr.style.display = "none"
                        }
                    })
                }
            }))
        )
        this.menu.update()
    }

    /** This takes a list of new bib entries and adds them to BibDB and the bibliography table
     * @function updateTable
     */
    updateTable(ids) {
        // Remove items that already exist
        this.removeTableRows(ids)
        this.table.insert({data: ids.map(id => this.createTableRow(id))})
        // Redo last sort
        this.table.columns.sort(this.lastSort.column, this.lastSort.dir)
    }

    createTableRow(id) {
        const bibInfo = this.app.bibDB.db[id]
        const bibauthors = bibInfo.fields.author || bibInfo.fields.editor
        const cats = bibInfo.cats.map(cat => `cat_${cat}`)
        return [
            id,
            false, // checkbox
            `<span class="fw-data-table-title ${cats.join(" ")}">
                <i class="fa fa-book"></i>
                <span class="edit-bib fw-link-text fw-searchable" data-id="${id}">
                    ${bibInfo.fields.title?.length ? (0,_common__rspack_import_4.escapeText)((0,_tools__rspack_import_8.litToText)(bibInfo.fields.title)) : gettext("Untitled")}
                </span>
            </span>`, // title
            (0,_form_strings__rspack_import_7.getBibTypeTitle)(bibInfo.bib_type), // sourcetype
            bibauthors ? (0,_tools__rspack_import_8.nameToText)(bibauthors) : "", // author
            `<span class="date">${bibInfo.fields.date ? bibInfo.fields.date.replace("/", " ") : ""}</span>`, // published,
            `<span class="delete-bib fw-link-text" data-id="${id}"><i class="fa fa-trash-alt">  </i></span>` // delete icon
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

    /** Opens a dialog for editing categories.
     * @function editCategoriesDialog
     */
    editCategoriesDialog() {
        if (this.app.isOffline()) {
            (0,_common__rspack_import_4.addAlert)(
                "info",
                gettext(
                    "You are currently offline. Please try again when you are back online."
                )
            )
            return
        }
        const buttons = [
            {
                text: gettext("Submit"),
                classes: "fw-dark",
                click: () => {
                    const cats = {ids: [], titles: []}
                    this.dom
                        .querySelectorAll("#edit-categories .category-form")
                        .forEach(el => {
                            const title = el.value.trim()
                            if (title.length) {
                                cats.ids.push(
                                    Number.parseInt(
                                        el.getAttribute("data-id") || 0
                                    )
                                )
                                cats.titles.push(title)
                            }
                        })
                    if (this.app.isOffline()) {
                        (0,_common__rspack_import_4.addAlert)(
                            "info",
                            gettext(
                                "You are currently offline. Please try again when you are back online."
                            )
                        )
                    } else {
                        this.saveCategories(cats)
                    }
                    dialog.close()
                }
            },
            {
                type: "cancel"
            }
        ]

        const dialog = new _common__rspack_import_4.Dialog({
            id: "edit-categories",
            width: 350,
            height: 350,
            title: gettext("Edit Categories"),
            body: (0,_templates__rspack_import_10.editCategoriesTemplate)({
                categories: this.app.bibDB.cats
            }),
            buttons
        })
        dialog.open()
    }

    /** Dialog to confirm deletion of bibliography items.
     * @function deleteBibEntryDialog
     * @param ids Ids of items that are to be deleted.
     */
    deleteBibEntryDialog(ids) {
        const buttons = [
            {
                text: gettext("Delete"),
                classes: "fw-dark",
                click: () => {
                    this.deleteBibEntries(ids)
                    dialog.close()
                }
            },
            {
                type: "cancel"
            }
        ]

        const dialog = new _common__rspack_import_4.Dialog({
            id: "confirmdeletion",
            title: gettext("Confirm deletion"),
            body: `<p>${gettext("Delete the bibliography item(s)")}?</p>`,
            buttons,
            icon: "exclamation-triangle"
        })
        dialog.open()
    }

    // get IDs of selected bib entries
    getSelected() {
        return Array.from(
            this.dom.querySelectorAll(".entry-select:checked:not(:disabled)")
        ).map(el => Number.parseInt(el.getAttribute("data-id")))
    }

    activatePlugins() {
        // Add plugins
        this.plugins = {}

        Object.keys(_plugins_bibliography_overview__rspack_import_3).forEach(plugin => {
            if (typeof _plugins_bibliography_overview__rspack_import_3[plugin] === "function") {
                this.plugins[plugin] = new _plugins_bibliography_overview__rspack_import_3[plugin](this)
                this.plugins[plugin].init()
            }
        })
    }

    /** Initialize the bibliography table and bind interactive parts.
     * @function bibEvents
     */
    bindEvents() {
        this.dom.addEventListener("click", event =>
            this.handleActivation(event)
        )
        this.dom.addEventListener("keydown", event =>
            this.handleActivation(event)
        )

        // Allow pasting of bibtex data.
        this.dom.addEventListener("paste", event => {
            if (event.target.nodeName === "INPUT") {
                // We are inside of an input element, cancel.
                return false
            }
            const text = event.clipboardData.getData("text")
            return this.getBibtex(text)
        })

        // The two drag events are needed to allow dropping
        this.dom.addEventListener("dragover", event => {
            if (event.dataTransfer.types.includes("text/plain")) {
                event.preventDefault()
            }
        })

        this.dom.addEventListener("dragenter", event => {
            if (event.dataTransfer.types.includes("text/plain")) {
                event.preventDefault()
            }
        })

        // Allow dropping of bibtex data
        this.dom.addEventListener("drop", event => {
            if (event.target.nodeName === "INPUT") {
                // We are inside of an input element, cancel.
                return false
            }
            const text = (0,fix_utf8__rspack_import_0["default"])(event.dataTransfer.getData("text"))
            return this.getBibtex(text)
        })
    }

    handleActivation(event) {
        if (!(0,_common__rspack_import_4.isActivationEvent)(event)) {
            return
        }
        const el = {}
        switch (true) {
            case (0,_common__rspack_import_4.findTarget)(event, ".delete-bib", el): {
                const bibId = Number.parseInt(el.target.dataset.id)
                this.deleteBibEntryDialog([bibId])
                break
            }
            case (0,_common__rspack_import_4.findTarget)(event, ".edit-bib", el): {
                const bibId = Number.parseInt(el.target.dataset.id)
                Promise.all(/* import() */ [__webpack_require__.e("vendors-node_modules_pnpm_prosemirror-commands_1_7_0_node_modules_prosemirror-commands_dist_i-9c513b"), __webpack_require__.e("vendors-node_modules_pnpm_tokenfield_1_5_2_node_modules_tokenfield_lib_tokenfield_js"), __webpack_require__.e("js_modules_bibliography_form_index_js")]).then(__webpack_require__.bind(__webpack_require__, "./js/modules/bibliography/form/index.js")).then(({BibEntryForm}) => {
                    const form = new BibEntryForm(
                        this.app.bibDB,
                        this.app,
                        bibId
                    )
                    form.init().then(idTranslations => {
                        const ids = idTranslations.map(idTrans => idTrans[1])
                        return this.updateTable(ids)
                    })
                })
                break
            }
            case (0,_common__rspack_import_4.findTarget)(event, ".fw-add-input", el): {
                const itemEl = el.target.closest(".fw-list-input")
                if (!itemEl.nextElementSibling) {
                    itemEl.insertAdjacentHTML(
                        "afterend",
                        `<tr class="fw-list-input">
                            <td>
                                <input type="text" class="category-form">
                                <span class="fw-add-input icon-addremove" tabindex="0"></span>
                            </td>
                        </tr>`
                    )
                } else {
                    itemEl.parentElement.removeChild(itemEl)
                }
                break
            }
            default:
                break
        }
    }

    // find bibtex in pasted or dropped data.
    getBibtex(text) {
        Promise.resolve(/* import() */).then(__webpack_require__.bind(__webpack_require__, "./js/modules/bibliography/import/index.js")).then(({BibliographyImporter}) => {
            const importer = new BibliographyImporter(
                text,
                this.app.bibDB,
                newIds => this.updateTable(newIds),
                false
            )
            importer.init()
        })
        return true
    }

    saveCategories(cats) {
        this.app.bibDB
            .saveCategories(cats)
            .then(bibCats => this.setBibCategoryList(bibCats))
    }

    deleteBibEntries(ids) {
        this.app.bibDB
            .deleteBibEntries(ids)
            .then(ids => this.removeTableRows(ids))
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
"./js/modules/bibliography/overview/menu.js": (function (__unused_rspack_module, __webpack_exports__, __webpack_require__) {
"use strict";
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  bulkMenuModel: function() { return bulkMenuModel; },
  menuModel: function() { return menuModel; }
});
/* import */ var _export__rspack_import_0 = __webpack_require__("./js/modules/bibliography/export/index.js");
/* import */ var _import__rspack_import_1 = __webpack_require__("./js/modules/bibliography/import/index.js");



const bulkMenuModel = () => ({
    content: [
        {
            title: gettext("Delete selected"),
            tooltip: gettext("Delete selected bibliography entries."),
            action: overview => {
                const ids = overview
                    .getSelected()
                    .map(id => Number.parseInt(id))
                if (ids.length) {
                    overview.deleteBibEntryDialog(ids)
                }
            },
            disabled: overview =>
                !overview.getSelected().length || overview.app.isOffline()
        },
        {
            title: gettext("Export selected"),
            tooltip: gettext("Export selected bibliography entries."),
            action: overview => {
                const ids = overview.getSelected()
                if (ids.length) {
                    const exporter = new _export__rspack_import_0.BibLatexFileExporter(
                        overview.app.bibDB,
                        ids
                    )
                    exporter.init()
                }
            },
            disabled: overview =>
                !overview.getSelected().length || overview.app.isOffline()
        }
    ]
})

const menuModel = () => ({
    content: [
        {
            type: "dropdown",
            id: "cat_selector",
            keys: "Alt-c",
            content: [
                {
                    title: gettext("All categories"),
                    action: _overview => {
                        const trs = document.querySelectorAll(
                            "#bibliography > tbody > tr"
                        )
                        trs.forEach(tr => (tr.style.display = ""))
                    }
                }
            ],
            order: 1
        },
        {
            type: "text",
            title: gettext("Edit categories"),
            keys: "Alt-e",
            action: overview => overview.editCategoriesDialog(),
            order: 2
        },
        {
            type: "text",
            title: gettext("Register new source"),
            keys: "Alt-n",
            action: overview => {
                Promise.all(/* import() */ [__webpack_require__.e("vendors-node_modules_pnpm_prosemirror-commands_1_7_0_node_modules_prosemirror-commands_dist_i-9c513b"), __webpack_require__.e("vendors-node_modules_pnpm_tokenfield_1_5_2_node_modules_tokenfield_lib_tokenfield_js"), __webpack_require__.e("js_modules_bibliography_form_index_js")]).then(__webpack_require__.bind(__webpack_require__, "./js/modules/bibliography/form/index.js")).then(({BibEntryForm}) => {
                    const form = new BibEntryForm(
                        overview.app.bibDB,
                        overview.app
                    )
                    form.init().then(idTranslations => {
                        const ids = idTranslations.map(idTrans => idTrans[1])
                        return overview.updateTable(ids)
                    })
                })
            },
            order: 3
        },
        {
            type: "text",
            title: gettext("Import bibliography"),
            keys: "Alt-u",
            action: overview => {
                const fileImporter = new _import__rspack_import_1.BibliographyFileImportDialog(
                    overview.app.bibDB,
                    ids => overview.updateTable(ids),
                    overview.app
                )
                fileImporter.init()
            },
            order: 4
        },
        {
            type: "search",
            icon: "search",
            title: gettext("Search bibliography"),
            keys: "Alt-s",
            input: (overview, text) => overview.table.search(text),
            order: 5
        }
    ]
})


}),
"./js/modules/bibliography/overview/templates.js": (function (__unused_rspack_module, __webpack_exports__, __webpack_require__) {
"use strict";
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  editCategoriesTemplate: function() { return editCategoriesTemplate; }
});
/* import */ var _common__rspack_import_0 = __webpack_require__("./js/modules/common/index.js");


/** A template for each category in the category list edit of the bibliography categories list. */
const categoryFormsTemplate = ({categories}) =>
    `${categories
        .map(
            cat =>
                `<tr id="categoryTr_${cat.id}" class="fw-list-input">
                <td>
                    <input type="text" class="category-form" id="categoryTitle_${cat.id}"
                            value="${(0,_common__rspack_import_0.escapeText)(cat.category_title)}" data-id="${cat.id}" />
                    <span class="fw-add-input icon-addremove" tabindex="0"></span>
                </td>
            </tr>`
        )
        .join("")}
    <tr class="fw-list-input">
        <td>
            <input type="text" class="category-form" />
            <span class="fw-add-input icon-addremove" tabindex="0"></span>
        </td>
    </tr>`

/** A template for the editing of bibliography categories list. */
const editCategoriesTemplate = ({categories}) =>
    `<table id="editCategoryList" class="fw-dialog-table">
        <tbody>
            ${categoryFormsTemplate({categories})}
        </tbody>
    </table>`


}),
"./js/modules/bibliography/tools.js": (function (__unused_rspack_module, __webpack_exports__, __webpack_require__) {
"use strict";
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  dateToYear: function() { return dateToYear; },
  litToText: function() { return litToText; },
  nameToText: function() { return nameToText; }
});
// Extract a display year from an EDTF date string.
// Handles simple years, ranges (2023/2024), uncertainty (?, *, u), and open-ended dates.
function dateToYear(dateStr) {
    if (!dateStr) {
        return ""
    }
    // Take the first date component (before "/" for ranges or open-ended dates)
    const firstPart = dateStr.split("/")[0]
    // Strip uncertainty/wildcard characters to get a clean year
    return firstPart.replace(/[?*u~]/g, "")
}

// Takes any richtext text field as used in bibliography and returns the text contents
function litToText(litStringArray) {
    let outText = ""
    litStringArray.forEach(litString => {
        if (litString.type === "text") {
            outText += litString.text
        }
    })
    return outText
}

function nameListItemToString(nameListItem) {
    let nameString = ""
    if (nameListItem["family"]) {
        nameString += litToText(nameListItem["family"])
        if (nameListItem["given"]) {
            nameString += `, ${litToText(nameListItem["given"])}`
        }
    } else if (nameListItem["literal"]) {
        nameString += litToText(nameListItem["literal"])
    }
    return nameString
}

function nameToText(nameList) {
    let nameString
    switch (nameList.length) {
        case 0:
            nameString = ""
            break
        case 1:
            nameString = nameListItemToString(nameList[0])
            break
        case 2:
            nameString = `${nameListItemToString(nameList[0])} ${gettext(
                "and"
            )} ${nameListItemToString(nameList[1])}`
            break
        default:
            nameString = `${nameListItemToString(nameList[0])} ${gettext(
                "and others"
            )}`
            break
    }
    return nameString
}


}),
"./js/modules/exporter/tools/zip.js": (function (__unused_rspack_module, __webpack_exports__, __webpack_require__) {
"use strict";
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  ZipFileCreator: function() { return ZipFileCreator; }
});
/* import */ var _common__rspack_import_0 = __webpack_require__("./js/modules/common/index.js");


/** Creates a zip file.
 * @function zipFileCreator
 * @param {list} textFiles A list of files in plain text format.
 * @param {list} binaryFiles A list fo files that have to be downloaded from the internet before being included.
 * @param {list} includeZips A list of zip files to be merged into the output zip file.
 * @param {string} [mimeType=application/zip] The mimetype of the file that is to be created.
 */

class ZipFileCreator {
    constructor(
        textFiles = [],
        binaryFiles = [],
        zipFiles = [],
        mimeType = "application/zip",
        date = new Date()
    ) {
        this.textFiles = textFiles
        this.binaryFiles = binaryFiles
        this.zipFiles = zipFiles
        this.mimeType = mimeType
        this.date = date
    }

    init() {
        return __webpack_require__.e(/* import() */ "vendors-node_modules_pnpm_jszip_3_10_1_node_modules_jszip_dist_jszip_min_js").then(__webpack_require__.t.bind(__webpack_require__, "./node_modules/.pnpm/jszip@3.10.1/node_modules/jszip/dist/jszip.min.js", 23)).then(({default: JSZip}) => {
            JSZip.defaults.date = this.date
            this.zipFs = new JSZip()
            if (this.mimeType !== "application/zip") {
                this.zipFs.file("mimetype", this.mimeType, {
                    compression: "STORE"
                })
            }

            return this.includeZips()
        })
    }

    includeZips() {
        const getZipBlobs = this.zipFiles.map(zipFile => {
            return (0,_common__rspack_import_0.get)(zipFile.url)
                .then(response => response.blob())
                .then(blob => (zipFile.blob = blob))
        })
        return Promise.all(getZipBlobs)
            .then(() => {
                return this.zipFiles.map(zipFile => {
                    const zipDir =
                        zipFile.directory === ""
                            ? this.zipFs
                            : this.zipFs.folder(zipFile.directory)
                    return zipDir.loadAsync(zipFile.blob)
                })
            })
            .then(() => this.createZip())
    }

    createZip() {
        this.textFiles.forEach(textFile => {
            this.zipFs.file(textFile.filename, textFile.contents, {
                compression: "DEFLATE"
            })
        })
        const blobPromises = this.binaryFiles.map(binaryFile =>
            (0,_common__rspack_import_0.get)(binaryFile.url)
                .then(response => response.blob())
                .then(blob =>
                    Promise.resolve({blob, filename: binaryFile.filename})
                )
        )
        return Promise.all(blobPromises).then(promises => {
            promises.forEach(promise =>
                this.zipFs.file(promise.filename, promise.blob, {
                    binary: true,
                    compression: "DEFLATE"
                })
            )
            return this.zipFs.generateAsync({
                type: "blob",
                mimeType: this.mimeType
            })
        })
    }

    // Legacy - remove in 3.12. Can be sued directly from function in common/blob.js
    convertDataURIToBlob(dataURI) {
        return (0,_common__rspack_import_0.convertDataURIToBlob)(dataURI)
    }
}


}),
"./js/plugins/bibliography_overview/index.js": (function () {


}),

}]);