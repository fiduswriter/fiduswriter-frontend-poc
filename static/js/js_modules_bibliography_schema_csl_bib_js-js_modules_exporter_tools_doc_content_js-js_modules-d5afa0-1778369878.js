"use strict";
(self["webpackChunkfidus_writer"] = self["webpackChunkfidus_writer"] || []).push([["js_modules_bibliography_schema_csl_bib_js-js_modules_exporter_tools_doc_content_js-js_modules-d5afa0"], {
"./js/modules/bibliography/schema/common.js": (function (__unused_rspack_module, __webpack_exports__, __webpack_require__) {
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  enquote: function() { return enquote; },
  literal: function() { return literal; },
  smallcaps: function() { return smallcaps; },
  sub: function() { return sub; },
  sup: function() { return sup; },
  text: function() { return text; },
  url: function() { return url; },
  variable: function() { return variable; }
});
const text = {
    group: "inline"
}

const literal = {
    content: "inline*",
    marks: "_",
    parseDOM: [{tag: "div.literal"}],
    toDOM() {
        return [
            "div",
            {
                class: "literal"
            },
            0
        ]
    }
}

const variable = {
    inline: true,
    group: "inline",
    attrs: {
        variable: {default: ""}
    },
    parseDOM: [
        {
            tag: "span[data-variable]",
            getAttrs(dom) {
                return {
                    variable: dom.getAttribute("data-variable")
                }
            }
        }
    ],
    toDOM(node) {
        return [
            "span",
            {"data-variable": node.attrs.variable},
            node.attrs.variable
        ]
    }
}

const sup = {
    parseDOM: [
        {tag: "sup"},
        {style: "vertical-align", getAttrs: value => value == "super" && null}
    ],
    toDOM() {
        return ["sup"]
    }
}

const sub = {
    parseDOM: [
        {tag: "sub"},
        {style: "vertical-align", getAttrs: value => value == "sub" && null}
    ],
    toDOM() {
        return ["sub"]
    }
}

const smallcaps = {
    parseDOM: [
        {tag: "span.smallcaps"},
        {
            style: "font-variant",
            getAttrs: value => value == "small-caps" && null
        }
    ],
    toDOM() {
        return ["span", {class: "smallcaps"}]
    }
}

//Currently unsupported

const url = {
    parseDOM: [{tag: "span.url"}],
    toDOM() {
        return ["span", {class: "url"}]
    }
}

const enquote = {
    parseDOM: [{tag: "span.enquote"}],
    toDOM() {
        return ["span", {class: "enquote"}]
    }
}


}),
"./js/modules/bibliography/schema/csl_bib.js": (function (__unused_rspack_module, __webpack_exports__, __webpack_require__) {
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  cslBibSchema: function() { return cslBibSchema; }
});
/* import */ var prosemirror_model__rspack_import_1 = __webpack_require__("./node_modules/.pnpm/prosemirror-model@1.25.0/node_modules/prosemirror-model/dist/index.js");
/* import */ var prosemirror_schema_basic__rspack_import_2 = __webpack_require__("./node_modules/.pnpm/prosemirror-schema-basic@1.2.4/node_modules/prosemirror-schema-basic/dist/index.js");
/* import */ var _common__rspack_import_0 = __webpack_require__("./js/modules/bibliography/schema/common.js");




const doc = {content: "cslbib"}

const cslbib = {
    content: "cslentry*",
    parseDOM: [{tag: "div.csl-bib-body"}],
    toDOM(_node) {
        return [
            "div",
            {
                class: "csl-bib-body"
            },
            0
        ]
    }
}

const cslentry = {
    content: "block*",
    parseDOM: [{tag: "div.csl-entry"}],
    toDOM(_node) {
        return [
            "div",
            {
                class: "csl-entry"
            },
            0
        ]
    }
}

// This block doesn't actually appear in the HTML output, but because the schema
// system doesn't allow for the mixing of inline and block content, it "imagines"
// that this block exists. This---rather than other blocks---is chosen, because
// it's the first in the list.
const cslinline = {
    group: "block",
    content: "text*",
    marks: "_",
    parseDOM: [{tag: "div.csl-inline"}],
    toDOM(_node) {
        return [
            "div",
            {
                class: "csl-inline"
            },
            0
        ]
    }
}

const cslblock = {
    group: "block",
    content: "text*",
    marks: "_",
    parseDOM: [{tag: "div.csl-block"}],
    toDOM(_node) {
        return [
            "div",
            {
                class: "csl-block"
            },
            0
        ]
    }
}

const cslleftmargin = {
    group: "block",
    content: "text*",
    marks: "_",
    parseDOM: [{tag: "div.csl-left-margin"}],
    toDOM(_node) {
        return [
            "div",
            {
                class: "csl-left-margin"
            },
            0
        ]
    }
}

const cslrightinline = {
    group: "block",
    content: "text*",
    marks: "_",
    parseDOM: [{tag: "div.csl-right-inline"}],
    toDOM(_node) {
        return [
            "div",
            {
                class: "csl-right-inline"
            },
            0
        ]
    }
}

const cslindent = {
    group: "block",
    content: "text*",
    marks: "_",
    parseDOM: [{tag: "div.csl-indent"}],
    toDOM(_node) {
        return [
            "div",
            {
                class: "csl-indent"
            },
            0
        ]
    }
}

// A schema to express the citeproc HTML bibliography output
const cslBibSchema = new prosemirror_model__rspack_import_1.Schema({
    nodes: {
        doc,
        cslbib,
        cslentry,
        cslinline,
        cslblock,
        cslleftmargin,
        cslrightinline,
        cslindent,
        text: _common__rspack_import_0.text
    },
    marks: {
        em: prosemirror_schema_basic__rspack_import_2.marks.em,
        strong: prosemirror_schema_basic__rspack_import_2.marks.strong,
        smallcaps: _common__rspack_import_0.smallcaps,
        sup: _common__rspack_import_0.sup,
        sub: _common__rspack_import_0.sub
    }
})


}),
"./js/modules/exporter/tools/doc_content.js": (function (__unused_rspack_module, __webpack_exports__, __webpack_require__) {
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  descendantNodes: function() { return descendantNodes; },
  fixTables: function() { return fixTables; },
  removeHidden: function() { return removeHidden; },
  textContent: function() { return textContent; }
});
// Return a json that is the same as the existing json, but with all parts
// marked as hidden removed.

const removeHidden = (
    node,
    // Whether to leave the outer part of the removed node.
    // True for tree-walking exporters, false for DOM-changing exporters.
    leaveStub = true,
    removeTableCaption = false,
    removeTableCaptionText = false,
    removeFigureCaption = false,
    removeFigureCaptionText = false
) => {
    const returnNode = {}

    Object.keys(node).forEach(key => {
        if (key !== "content") {
            returnNode[key] = node[key]
        }
    })
    if (node.attrs?.hidden) {
        return leaveStub ? returnNode : false
    } else if ("table_caption" === node.type) {
        if (removeTableCaption) {
            return leaveStub ? returnNode : false
        } else if (removeTableCaptionText) {
            return returnNode
        }
    } else if ("figure_caption" === node.type) {
        if (removeFigureCaption) {
            return leaveStub ? returnNode : false
        } else if (removeFigureCaptionText) {
            return returnNode
        }
    }
    if (node.attrs?.caption === false) {
        if (node.attrs.category === "none") {
            if (node.type === "figure") {
                removeFigureCaption = true
            } else {
                removeTableCaption = true
            }
        } else {
            if (node.type === "figure") {
                removeFigureCaptionText = true
            } else {
                removeTableCaptionText = true
            }
        }
    }
    if (node.content) {
        returnNode.content = []
        node.content.forEach(child => {
            const cleanedChild = removeHidden(
                child,
                leaveStub,
                removeTableCaption,
                removeTableCaptionText,
                removeFigureCaption,
                removeFigureCaptionText
            )
            if (cleanedChild) {
                returnNode.content.push(cleanedChild)
            }
        })
    }
    return returnNode
}

const descendantNodes = node => {
    let returnValue = [node]
    if (node.content) {
        node.content.forEach(childNode => {
            returnValue = returnValue.concat(descendantNodes(childNode))
        })
    }
    return returnValue
}

const textContent = node =>
    descendantNodes(node).reduce((returnString, subNode) => {
        if (subNode.text) {
            returnString += subNode.text
        }
        return returnString
    }, "")

// PM/HTML don't have cells that have been covered, but in ODT/DOCX, these cells
// need to be present. So we add them.

const addCoveredTableCells = node => {
    const columns = node.content[0].content.reduce(
        (columns, cell) => columns + cell.attrs.colspan,
        0
    )
    const rows = node.content.length
    // Add empty cells for col/rowspan
    const fixedTableMatrix = Array.apply(0, {length: rows}).map(_item => ({
        type: "table_row",
        content: Array.apply(0, {length: columns})
    }))
    let rowIndex = -1
    node.content.forEach(row => {
        let columnIndex = 0
        rowIndex++
        if (!row.content) {
            return
        }
        row.content.forEach(cell => {
            while (fixedTableMatrix[rowIndex].content[columnIndex]) {
                columnIndex++
            }
            for (let i = 0; i < cell.attrs.rowspan; i++) {
                for (let j = 0; j < cell.attrs.colspan; j++) {
                    let fixedCell
                    if (i === 0 && j === 0) {
                        fixedCell = cell
                    } else {
                        fixedCell = {
                            type: "table_cell",
                            attrs: {
                                rowspan: cell.attrs.rowspan > 1 ? 0 : 1,
                                colspan: cell.attrs.colspan > 1 ? 0 : 1
                            }
                        }
                    }
                    fixedTableMatrix[rowIndex + i].content[columnIndex + j] =
                        fixedCell
                }
            }
        })
    })
    node.content = fixedTableMatrix
}

const fixTables = node => {
    if (node.type === "table_body") {
        addCoveredTableCells(node)
    }
    if (node.content) {
        node.content.forEach(child => fixTables(child))
    }
    return node
}


}),
"./js/modules/exporter/tools/svg.js": (function (__unused_rspack_module, __webpack_exports__, __webpack_require__) {
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  svg2png: function() { return svg2png; }
});
/* import */ var _common__rspack_import_0 = __webpack_require__("./js/modules/common/index.js");


function svg2png(blob) {
    const img = document.createElement("img")
    const src = URL.createObjectURL(blob)
    img.src = src
    img.setAttribute("style", "position:fixed;left:-200vw;")
    return new Promise(resolve => {
        img.onload = function onload() {
            const canvas = document.createElement("canvas")
            const ctx = canvas.getContext("2d")
            const ratio = Math.min(
                Math.min(img.width, img.height) / img.width,
                Math.min(img.width, img.height) / img.height
            )
            const width = img.width * ratio
            const height = img.height * ratio
            canvas.width = width
            canvas.height = height
            ctx.drawImage(img, 0, 0, width, height)
            const src = canvas.toDataURL("image/png")
            img.parentElement.removeChild(img)
            URL.revokeObjectURL(src)
            const pngBlob = (0,_common__rspack_import_0.convertDataURIToBlob)(src)
            resolve({blob: pngBlob, width, height})
        }
        document.body.appendChild(img)
    })
}


}),
"./js/modules/exporter/tools/xml_zip.js": (function (__unused_rspack_module, __webpack_exports__, __webpack_require__) {
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  XmlZip: function() { return XmlZip; }
});
/* import */ var _xml__rspack_import_0 = __webpack_require__("./js/modules/exporter/tools/xml.js");
/* import */ var _common__rspack_import_1 = __webpack_require__("./js/modules/common/index.js");



// Handle a zip file containing XML files. Make sure files are only opened once,
// and provide a mechanism to save the file.

class XmlZip {
    constructor(url, mimeType) {
        this.url = url
        this.mimeType = mimeType
        this.docs = {}
        this.extraFiles = {}
        this.rawFile = false
    }

    init() {
        return Promise.resolve(/* import() */).then(__webpack_require__.t.bind(__webpack_require__, "./node_modules/.pnpm/jszip@3.10.1/node_modules/jszip/dist/jszip.min.js", 23))
            .then(({default: JSZip}) => {
                this.zip = new JSZip()
                return this.downloadZip()
            })
            .then(() => this.loadZip())
    }

    downloadZip() {
        return (0,_common__rspack_import_1.get)(this.url)
            .then(response => response.blob())
            .then(blob => (this.rawFile = blob))
    }

    loadZip() {
        return this.zip.loadAsync(this.rawFile)
    }

    // Open file at filePath from zip file and parse it as XML.
    getXml(filePath, defaultContents) {
        if (this.docs[filePath]) {
            // file has been loaded already.
            return Promise.resolve(this.docs[filePath])
        } else if (this.zip.files[filePath]) {
            return this.zip
                .file(filePath)
                .async("string")
                .then(string => {
                    this.docs[filePath] = (0,_xml__rspack_import_0.xmlDOM)(string)
                    return Promise.resolve(this.docs[filePath])
                })
        } else if (defaultContents) {
            return Promise.resolve(defaultContents).then(string => {
                this.docs[filePath] = (0,_xml__rspack_import_0.xmlDOM)(string)
                return Promise.resolve(this.docs[filePath])
            })
        } else {
            // File couldn't be found and there was no default value.
            return Promise.reject(new Error("File not found"))
        }
    }

    // Add an xml file at filepath without checking for previous version
    addXmlFile(filePath, xmlContents) {
        this.docs[filePath] = xmlContents
    }

    // Add extra file to be saved in zip later.
    addExtraFile(filePath, fileContents) {
        this.extraFiles[filePath] = fileContents
    }

    // Put all currently open XML files into zip.
    allXMLToZip() {
        for (const fileName in this.docs) {
            this.xmlToZip(fileName)
        }
    }

    // Put all extra files into zip.
    allExtraToZip() {
        for (const fileName in this.extraFiles) {
            this.zip.file(fileName, this.extraFiles[fileName])
        }
    }

    // Put the xml identified by filePath into zip.
    xmlToZip(filePath) {
        const string = this.docs[filePath].toString()
        this.zip.file(filePath, string)
    }

    prepareBlob() {
        this.allXMLToZip()
        this.allExtraToZip()

        return this.zip.generateAsync({type: "blob", mimeType: this.mimeType})
    }
}


}),
"./js/modules/exporter/tools/zotero_csl.js": (function (__unused_rspack_module, __webpack_exports__, __webpack_require__) {
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  createZoteroCitation: function() { return createZoteroCitation; }
});
/* import */ var biblatex_csl_converter__rspack_import_0 = __webpack_require__("./node_modules/.pnpm/biblatex-csl-converter@3.6.0/node_modules/biblatex-csl-converter/lib/index.js");
/**
 * Helper functions for creating Zotero-compatible citation data.
 * Uses CSLExporter from biblatex-csl-converter to convert Fidus Writer's
 * internal BibLaTeX format to CSL-JSON.
 */



/**
 * Generate a random citation ID similar to Zotero's format.
 * Zotero uses 8-10 character alphanumeric IDs.
 */
function generateCitationId() {
    const chars = "abcdefghijklmnopqrstuvwxyz0123456789"
    let id = ""
    for (let i = 0; i < 8; i++) {
        id += chars.charAt(Math.floor(Math.random() * chars.length))
    }
    return id
}

/**
 * Convert bibliography entries to CSL-JSON format.
 * @param {Object} bibDB - The bibliography database
 * @param {Array} ids - Array of entry IDs to convert
 * @returns {Object} Object mapping IDs to CSL-JSON entries
 */
function convertToCSL(bibDB, ids) {
    const exporter = new biblatex_csl_converter__rspack_import_0.CSLExporter(bibDB.db, ids)
    return exporter.parse()
}

/**
 * Create a Zotero citation JSON object.
 * @param {Array} references - Array of {id, prefix?, locator?} from citation node
 * @param {Object} bibDB - Bibliography database
 * @param {string} formattedCitation - Pre-formatted citation text from citeproc
 * @param {string} citationId - Optional citation ID (generated if not provided)
 * @returns {Object} Zotero citation JSON object
 */
function createZoteroCitation(
    references,
    bibDB,
    formattedCitation,
    citationId = null
) {
    const citationID = citationId || generateCitationId()

    // Get the IDs of all referenced items
    const ids = references.map(ref => ref.id)

    // Convert to CSL-JSON
    const _cslData = convertToCSL(bibDB, ids)
    const citationItems = references
        .map(ref => {
            const entry = bibDB.db[ref.id]

            if (!entry) {
                return null
            }
            const citationKey = entry.entry_key || String(ref.id)
            const item = {
                id: ref.id,
                uris: [],
                itemData: {
                    ...ref.item,
                    id: citationKey
                }
            }

            if (ref.locator) {
                item.locator = ref.locator
            }

            if (ref.prefix) {
                item.prefix = ref.prefix
            }

            return item
        })
        .filter(item => item !== null)

    return {
        citationID,
        properties: {
            formattedCitation,
            plainCitation: formattedCitation,
            noteIndex: 0
        },
        citationItems,
        schema: "https://github.com/citation-style-language/schema/raw/master/csl-citation.json"
    }
}


}),

}]);