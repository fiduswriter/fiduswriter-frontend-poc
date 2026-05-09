"use strict";
(self["webpackChunkfidus_writer"] = self["webpackChunkfidus_writer"] || []).push([["js_modules_exporter_pandoc_index_js"], {
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
"./js/modules/exporter/pandoc/citations.js": (function (__unused_rspack_module, __webpack_exports__, __webpack_require__) {
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  PandocExporterCitations: function() { return PandocExporterCitations; }
});
/* import */ var prosemirror_model__rspack_import_4 = __webpack_require__("./node_modules/.pnpm/prosemirror-model@1.25.0/node_modules/prosemirror-model/dist/index.js");
/* import */ var _bibliography_schema_csl_bib__rspack_import_0 = __webpack_require__("./js/modules/bibliography/schema/csl_bib.js");
/* import */ var _citations_format__rspack_import_1 = __webpack_require__("./js/modules/citations/format.js");
/* import */ var _schema_footnotes__rspack_import_2 = __webpack_require__("./js/modules/schema/footnotes.js");
/* import */ var _tools_doc_content__rspack_import_3 = __webpack_require__("./js/modules/exporter/tools/doc_content.js");







class PandocExporterCitations {
    constructor(exporter, bibDB, csl, docContent, origCitInfos = []) {
        this.exporter = exporter
        this.bibDB = bibDB
        this.csl = csl
        this.docContent = docContent
        // If citInfos were found in a previous run, they are stored here
        // (for example: first citations in main document, then in footnotes)
        this.origCitInfos = origCitInfos
        this.citInfos = []
        this.citationTexts = []
        this.pmCits = []
        this.citFm = false
        this.pmBib = false
    }

    init() {
        return this.formatCitations()
    }

    // Citations are highly interdependent -- so we need to format them all
    // together before laying out the document.
    formatCitations() {
        if (this.origCitInfos.length) {
            // Initial citInfos are taken from a previous run to include in
            // bibliography, and they are removed before spitting out the
            // citation entries for the given document.
            // That way the bibliography should contain information from both.
            this.citInfos = this.citInfos.concat(this.origCitInfos)
        }
        (0,_tools_doc_content__rspack_import_3.descendantNodes)(this.docContent).forEach(node => {
            if (node.type === "citation") {
                this.citInfos.push(JSON.parse(JSON.stringify(node.attrs)))
            }
        })
        this.citFm = new _citations_format__rspack_import_1.FormatCitations(
            this.csl,
            this.citInfos,
            this.exporter.doc.settings.citationstyle,
            "",
            this.bibDB,
            false,
            this.exporter.doc.settings.language
        )
        return this.citFm.init().then(() => {
            this.citationTexts = this.citFm.citationTexts
            if (this.origCitInfos.length) {
                // Remove all citation texts originating from original starting citInfos
                this.citationTexts.splice(0, this.origCitInfos.length)
            }
            this.convertCitations()
            return Promise.resolve()
        })
    }

    convertCitations() {
        // There could be some formatting in the citations, so we parse them through the PM schema for final formatting.
        // We need to put the citations each in a paragraph so that it works with
        // the fiduswriter schema and so that the converter doesn't mash them together.
        if (this.citationTexts.length) {
            let citationsHTML = ""
            this.citationTexts.forEach(ct => {
                citationsHTML += `<p>${ct}</p>`
            })

            // We create a standard footnote container DOM node,
            // add the citations into it, and parse it back.
            const fnNode = _schema_footnotes__rspack_import_2.fnSchema.nodeFromJSON({type: "footnotecontainer"})
            const serializer = prosemirror_model__rspack_import_4.DOMSerializer.fromSchema(_schema_footnotes__rspack_import_2.fnSchema)
            const dom = serializer.serializeNode(fnNode)
            dom.innerHTML = citationsHTML
            this.pmCits = prosemirror_model__rspack_import_4.DOMParser.fromSchema(_schema_footnotes__rspack_import_2.fnSchema)
                .parse(dom, {topNode: fnNode})
                .toJSON().content
        } else {
            this.pmCits = []
        }

        // Now we do the same for the bibliography.
        const cslBib = this.citFm.bibliography
        if (cslBib && cslBib[1].length > 0) {
            const bibNode = _bibliography_schema_csl_bib__rspack_import_0.cslBibSchema.nodeFromJSON({type: "cslbib"})
            const serializer = prosemirror_model__rspack_import_4.DOMSerializer.fromSchema(_bibliography_schema_csl_bib__rspack_import_0.cslBibSchema)
            const dom = serializer.serializeNode(bibNode)
            dom.innerHTML = cslBib[1].join("")
            this.pmBib = prosemirror_model__rspack_import_4.DOMParser.fromSchema(_bibliography_schema_csl_bib__rspack_import_0.cslBibSchema)
                .parse(dom, {topNode: bibNode})
                .toJSON()
        }
    }
}


}),
"./js/modules/exporter/pandoc/convert.js": (function (__unused_rspack_module, __webpack_exports__, __webpack_require__) {
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  PandocExporterConvert: function() { return PandocExporterConvert; }
});
/* import */ var _tools__rspack_import_0 = __webpack_require__("./js/modules/exporter/pandoc/tools.js");


class PandocExporterConvert {
    constructor(exporter, imageDB, bibDB, settings) {
        this.exporter = exporter
        this.settings = settings
        this.imageDB = imageDB
        this.bibDB = bibDB
        this.imageIds = []
        this.usedBibDB = {}

        this.internalLinks = []
        this.categoryCounter = {} // counters for each type of figure (figure/table/photo)

        this.metaData = {
            toc: []
        }
    }

    init(doc) {
        this.preWalkJson(doc)
        const meta = {
            lang: {
                t: "MetaInlines",
                c: [{t: "Str", c: this.settings.language.split("-")[0]}]
            }
        }
        const json = {
            "pandoc-api-version": [1, 23, 1],
            meta,
            blocks: this.convertContent(doc.content, meta)
        }
        const returnObject = {
            json,
            imageIds: this.imageIds,
            usedBibDB: this.usedBibDB
        }
        return returnObject
    }

    // Find information for meta tags in header
    preWalkJson(node) {
        switch (node.type) {
            case "heading1":
            case "heading2":
            case "heading3":
            case "heading4":
            case "heading5":
            case "heading6": {
                const level = Number.parseInt(node.type.slice(-1))
                this.metaData.toc.push({
                    t: "Header",
                    c: [
                        level,
                        [node.attrs.id || "", [], []],
                        this.convertContent(node.content || [])
                    ]
                })
                break
            }
            default:
                break
        }
        if (node.content) {
            node.content.forEach(child => this.preWalkJson(child))
        }
    }

    // Function to convert Fidus Writer content to Pandoc format
    convertContent(
        docContent,
        meta,
        options = {inFootnote: false, inCode: false}
    ) {
        const pandocContent = []
        for (const node of docContent) {
            switch (node.type) {
                case "doc":
                    // We only handle doc children
                    break
                case "blockquote": {
                    pandocContent.push({
                        t: "BlockQuote",
                        c: this.convertContent(node.content, meta, options)
                    })
                    break
                }
                case "bullet_list": {
                    const c = []
                    pandocContent.push({
                        t: "BulletList",
                        c
                    })
                    if (node.content) {
                        node.content.forEach(listItem =>
                            c.push(
                                this.convertContent(
                                    listItem.content || [],
                                    meta,
                                    options
                                )
                            )
                        )
                    }
                    break
                }
                case "citation": {
                    if (options.inFootnote) {
                        // TODO: handle citations in footnotes
                        break
                    }
                    const cit = this.exporter.citations.pmCits.shift()

                    const pandocReferences = node.attrs.references
                        .map(reference => {
                            const bibDBEntry = this.bibDB.db[reference.id]
                            if (!bibDBEntry) {
                                // Not present in bibliography database, skip it.
                                return false
                            }
                            if (!this.usedBibDB[reference.id]) {
                                const citationKey =
                                    this.createUniqueCitationKey(
                                        bibDBEntry.entry_key
                                    )
                                this.usedBibDB[reference.id] = Object.assign(
                                    {},
                                    bibDBEntry
                                )
                                this.usedBibDB[reference.id].entry_key =
                                    citationKey
                            }

                            return {
                                citationId:
                                    this.usedBibDB[reference.id].entry_key,
                                citationPrefix: (0,_tools__rspack_import_0.convertText)(
                                    reference.prefix || ""
                                ),
                                citationSuffix: (0,_tools__rspack_import_0.convertText)(
                                    reference.locator || ""
                                ),
                                citationMode: {
                                    t:
                                        node.attrs.format === "textcite"
                                            ? "AuthorInText"
                                            : "NormalCitation"
                                },
                                citationNoteNum: 1,
                                citationHash: 0
                            }
                        })
                        .filter(reference => reference)
                    if (!pandocReferences.length) {
                        break
                    }
                    const pandocRendering = this.convertContent(
                        cit.content,
                        meta,
                        options
                    )
                    const pandocElement = {
                        t: "Cite",
                        c: [pandocReferences, pandocRendering]
                    }
                    if (node.content) {
                        this.convertContent(
                            node.content,
                            meta,
                            options
                        ).forEach(el => pandocElement.c.push(el))
                    }
                    pandocContent.push(pandocElement)
                    break
                }
                case "code_block": {
                    options = Object.assign({}, options)
                    options.inCode = true
                    const classes = node.attrs.language
                        ? [node.attrs.language]
                        : []
                    const keyValuePairs = []

                    // Add caption if title is present
                    if (node.attrs.title) {
                        keyValuePairs.push(["caption", node.attrs.title])
                    }

                    // Add category as custom attribute for round-trip fidelity
                    if (node.attrs.category) {
                        keyValuePairs.push(["category", node.attrs.category])
                    }

                    // Use id if present, otherwise empty string
                    const id = node.attrs.id || ""
                    const attrs = [id, classes, keyValuePairs]

                    pandocContent.push({
                        t: "CodeBlock",
                        c: [
                            attrs,
                            this.convertContent(node.content, meta, options)
                                .map(item => {
                                    if (item.t === "Str") {
                                        return item.c
                                    } else if (item.t === "Space") {
                                        return " "
                                    } else if (
                                        item.t === "SoftBreak" ||
                                        item.t === "LineBreak"
                                    ) {
                                        return "\n"
                                    }
                                    return ""
                                })
                                .join("")
                        ]
                    })
                    break
                }
                case "contributor":
                    // dealt with in contributors_part
                    break
                case "contributors_part": {
                    if (!node.content || !node.content.length) {
                        break
                    }
                    if (node.attrs.metadata === "authors") {
                        if (!meta.author) {
                            meta.author = {t: "MetaList", c: []}
                        }
                        const convertedContributors = node.content
                            .map(contributor =>
                                (0,_tools__rspack_import_0.convertContributor)(contributor.attrs)
                            )
                            .filter(
                                convertedContributor => convertedContributor
                            )
                        convertedContributors.forEach(contributor =>
                            meta.author.c.push(contributor)
                        )
                    } else {
                        pandocContent.push({
                            t: "Div",
                            c: [
                                [
                                    node.attrs.id || "",
                                    [
                                        "doc-part",
                                        "doc-contributors",
                                        node.attrs.id
                                            ? `doc-${node.attrs.id}`
                                            : "doc-div",
                                        `doc-${node.attrs.metadata || "other"}`
                                    ],
                                    []
                                ],
                                [
                                    {
                                        t: "Para",
                                        c: (0,_tools__rspack_import_0.convertText)(
                                            node.content
                                                .map(
                                                    contributor =>
                                                        `${contributor.attrs.firstname} ${contributor.attrs.lastname}, ${contributor.attrs.institution}, ${contributor.attrs.email}`
                                                )
                                                .join("; ")
                                        )
                                    }
                                ]
                            ]
                        })
                    }
                    break
                }
                case "cross_reference": {
                    // TODO: use real cross reference instead of link.
                    pandocContent.push({
                        t: "Link",
                        c: [
                            ["", ["reference"], []],
                            (0,_tools__rspack_import_0.convertText)(node.attrs.title || "MISSING TARGET"),
                            [`#${node.attrs.id || ""}`, ""]
                        ]
                    })
                    break
                }
                case "heading_part": {
                    if (!node.content || !node.content.length) {
                        break
                    }
                    if (node.attrs?.metadata === "subtitle" && !meta.subtitle) {
                        if (node.content?.length && node.content[0].content) {
                            meta.subtitle = {
                                t: "MetaInlines",
                                c: this.convertContent(
                                    node.content[0].content,
                                    meta,
                                    options
                                )
                            }
                        }
                    } else {
                        const pandocElement = {
                            t: "Header",
                            c: [2, [node.attrs?.metadata || "", [], []]]
                        }
                        if (node.content) {
                            this.convertContent(
                                node.content,
                                meta,
                                options
                            ).forEach(el => pandocElement.c.push(el))
                        }
                        pandocContent.push({
                            t: "Div",
                            c: [
                                [
                                    node.attrs.id || "",
                                    [
                                        "doc-part",
                                        "doc-heading",
                                        node.attrs.id
                                            ? `doc-${node.attrs.id}`
                                            : "doc-div",
                                        `doc-${node.attrs.metadata || "other"}`
                                    ],
                                    []
                                ],
                                [pandocElement]
                            ]
                        })
                    }
                    break
                }
                case "equation": {
                    pandocContent.push({
                        t: "Span",
                        c: [
                            ["", ["equation"], []],
                            [
                                {
                                    t: "Math",
                                    c: [{t: "InlineMath"}, node.attrs.equation]
                                }
                            ]
                        ]
                    })
                    break
                }
                case "figure": {
                    const image =
                        node.content.find(node => node.type === "image")?.attrs
                            .image || false
                    const caption = node.attrs.caption
                        ? node.content.find(
                              node => node.type === "figure_caption"
                          )?.content || []
                        : []
                    const equation = node.content.find(
                        node => node.type === "figure_equation"
                    )?.attrs.equation
                    if (image !== false) {
                        this.imageIds.push(image)
                        const imageDBEntry = this.imageDB.db[image],
                            filePathName = imageDBEntry.image
                        const copyright = imageDBEntry.copyright
                        const imageFilename = filePathName.split("/").pop()
                        if (
                            node.attrs.category === "none" &&
                            imageFilename &&
                            !caption.length &&
                            (!copyright || !copyright.holder)
                        ) {
                            pandocContent.push({
                                t: "Plain",
                                c: [
                                    {
                                        t: "Image",
                                        c: [
                                            [
                                                node.attrs.id || "",
                                                [],
                                                [
                                                    [
                                                        "data-width",
                                                        String(node.attrs.width)
                                                    ],
                                                    [
                                                        "width",
                                                        `${node.attrs.width}%`
                                                    ]
                                                ]
                                            ],
                                            [],
                                            [imageFilename, ""]
                                        ]
                                    }
                                ]
                            })
                        } else {
                            pandocContent.push({
                                t: "Figure",
                                c: [
                                    [
                                        node.attrs.id || "",
                                        [
                                            `aligned-${node.attrs.aligned}`,
                                            `image-width-${node.attrs.width}`
                                        ],
                                        [
                                            ["aligned", node.attrs.aligned],
                                            [
                                                "data-width",
                                                String(node.attrs.width)
                                            ],
                                            ["width", `${node.attrs.width}%`],
                                            ["category", node.attrs.category]
                                        ]
                                    ],
                                    [
                                        null,
                                        caption.length
                                            ? [
                                                  {
                                                      t: "Para",
                                                      c: this.convertContent(
                                                          caption,
                                                          meta,
                                                          options
                                                      )
                                                  }
                                              ]
                                            : []
                                    ],
                                    [
                                        {
                                            t: "Plain",
                                            c: [
                                                {
                                                    t: "Image",
                                                    c: [
                                                        [
                                                            "",
                                                            [],
                                                            [
                                                                [
                                                                    "width",
                                                                    `${node.attrs.width}%`
                                                                ]
                                                            ]
                                                        ],
                                                        [],
                                                        [imageFilename, ""]
                                                    ]
                                                }
                                            ]
                                        }
                                    ]
                                ]
                            })
                        }
                    } else if (equation) {
                        pandocContent.push({
                            t: "Figure",
                            c: [
                                [
                                    node.attrs.id || "",
                                    [
                                        `aligned-${node.attrs.aligned}`,
                                        `image-width-${node.attrs.width}`
                                    ],
                                    [
                                        ["aligned", node.attrs.aligned],
                                        [
                                            "data-width",
                                            String(node.attrs.width)
                                        ],
                                        ["width", `${node.attrs.width}%`],
                                        ["category", node.attrs.category]
                                    ]
                                ],
                                [
                                    null,
                                    caption.length
                                        ? [
                                              {
                                                  t: "Para",
                                                  c: this.convertContent(
                                                      caption,
                                                      meta,
                                                      options
                                                  )
                                              }
                                          ]
                                        : []
                                ],
                                [
                                    {
                                        t: "Math",
                                        c: [
                                            {t: "DisplayMath"},
                                            node.attrs.equation
                                        ]
                                    }
                                ]
                            ]
                        })
                    }
                    // TODO: figure attributes like copyright info etc.
                    break
                }
                case "figure_caption":
                case "figure_equation":
                    // Dealt with in figure
                    break
                case "footnote": {
                    options = Object.assign({}, options)
                    options.inFootnote = true
                    pandocContent.push({
                        t: "Note",
                        c: this.convertContent(
                            node.attrs.footnote,
                            meta,
                            options
                        )
                    })
                    break
                }
                case "footnotecontainer":
                    // Dealt with in footnote
                    break
                case "hard_break":
                    pandocContent.push({t: "LineBreak"})
                    break
                case "heading1":
                case "heading2":
                case "heading3":
                case "heading4":
                case "heading5":
                case "heading6": {
                    const level = Number.parseInt(node.type.slice(-1))
                    pandocContent.push({
                        t: "Header",
                        c: [
                            level,
                            [node.attrs.id || "", [], []],
                            this.convertContent(
                                node.content || [],
                                meta,
                                options
                            )
                        ]
                    })
                    break
                }
                case "image":
                    // Handled by figure
                    break
                case "list_item":
                    // handled by ordered_list and bullet_list
                    break
                case "ordered_list": {
                    const c = []
                    pandocContent.push({
                        t: "OrderedList",
                        c: [
                            [
                                node.attrs?.order || 1,
                                {t: "DefaultStyle"},
                                {t: "DefaultDelim"}
                            ], // list attributes
                            c
                        ]
                    })

                    if (node.content) {
                        node.content.forEach(listItem =>
                            c.push(
                                this.convertContent(
                                    listItem.content || [],
                                    meta,
                                    options
                                )
                            )
                        )
                    }
                    break
                }
                case "paragraph": {
                    pandocContent.push({
                        t: "Para",
                        c: node.content
                            ? this.convertContent(node.content, meta, options)
                            : []
                    })
                    break
                }
                case "richtext_part": {
                    if (!node.content || !node.content.length) {
                        break
                    }
                    if (node.attrs?.metadata === "abstract" && !meta.abstract) {
                        meta.abstract = {
                            t: "MetaBlocks",
                            c: this.convertContent(node.content, meta, options)
                        }
                    } else {
                        pandocContent.push({
                            t: "Div",
                            c: [
                                [
                                    node.attrs.id || "",
                                    [
                                        "doc-part",
                                        "doc-richtext",
                                        node.attrs.id
                                            ? `doc-${node.attrs.id}`
                                            : "doc-div",
                                        `doc-${node.attrs.metadata || "other"}`
                                    ],
                                    []
                                ],
                                this.convertContent(node.content, meta, options)
                            ]
                        })
                    }
                    break
                }
                case "separator_part":
                    pandocContent.push({
                        t: "HorizontalRule",
                        c: [
                            [
                                node.attrs.id || "",
                                [
                                    "doc-part",
                                    "doc-separator",
                                    node.attrs.id
                                        ? `doc-${node.attrs.id}`
                                        : "doc-hr",
                                    `doc-${node.attrs.metadata || "other"}`
                                ],
                                []
                            ],
                            []
                        ]
                    })
                    break
                case "tag":
                    // Handled by tags_part
                    break
                case "tags_part": {
                    if (!node.content || !node.content.length) {
                        break
                    }
                    pandocContent.push({
                        t: "Div",
                        c: [
                            [
                                node.attrs.id || "",
                                [
                                    "doc-part",
                                    "doc-tags",
                                    node.attrs.id
                                        ? `doc-${node.attrs.id}`
                                        : "doc-div",
                                    `doc-${node.attrs.metadata || "other"}`
                                ],
                                []
                            ],
                            [
                                {
                                    t: "Para",
                                    c: (0,_tools__rspack_import_0.convertText)(
                                        node.content
                                            .map(tag => tag.attrs.tag)
                                            .join("; ")
                                    )
                                }
                            ]
                        ]
                    })
                    break
                }
                case "table": {
                    // Tables seem to have this structure in pandoc json:
                    // If table has no rows with content, skip.
                    const tableBodyNode = node.content.find(
                        childNode =>
                            childNode.type === "table_body" &&
                            childNode.content &&
                            childNode.content.length
                    )
                    const tableFirstRow = tableBodyNode
                        ? tableBodyNode.content.find(
                              childNode =>
                                  childNode.type === "table_row" &&
                                  childNode.content &&
                                  childNode.content.length
                          )
                        : false
                    if (!tableFirstRow) {
                        break
                    }

                    const c = []
                    pandocContent.push({
                        t: "Table",
                        c
                    })
                    // child 0: attributes of the table.
                    c.push([
                        node.attrs.id || "",
                        [
                            `table-${node.attrs.width}`,
                            `table-${node.attrs.aligned}`,
                            `table-${node.attrs.layout}`
                        ],
                        [
                            ["data-width", String(node.attrs.width)],
                            ["width", `${node.attrs.width}%`],
                            ["aligned", node.attrs.aligned],
                            ["layout", node.attrs.layout],
                            ["category", node.attrs.category]
                        ]
                    ])
                    // child 1: table caption
                    const tableCaptionNode = node.content.find(
                        childNode =>
                            childNode.type === "table_caption" &&
                            childNode.content &&
                            childNode.content.length
                    )
                    if (tableCaptionNode) {
                        c.push([
                            null,
                            [
                                {
                                    t: "Plain",
                                    c: this.convertContent(
                                        tableCaptionNode.content,
                                        meta,
                                        options
                                    )
                                }
                            ]
                        ])
                    } else {
                        c.push([null, []])
                    }
                    // child 2: settings for each column
                    c.push(
                        tableFirstRow.content.map(_column => [
                            {t: "AlignDefault"},
                            {t: "ColWidthDefault"}
                        ])
                    )
                    // child 3: ?
                    c.push([["", [], []], []])
                    // child 4: Each child represents one table row
                    const tableHead = []
                    const tableBody = []
                    c.push([[["", [], []], 0, tableHead, tableBody]])
                    let currentTablePart = tableHead

                    this.convertContent(
                        tableBodyNode.content,
                        meta,
                        options
                    ).forEach((row, index) => {
                        if (
                            currentTablePart === tableHead &&
                            tableBodyNode.content[index].content?.find(
                                node => node.type === "table_cell"
                            )
                        ) {
                            // If at least one regular table cell is found in the row, we assume the table header hs finished.
                            currentTablePart = tableBody
                        }
                        currentTablePart.push(row)
                    })
                    // last child: Unclear meaning
                    c.push([["", [], []], []])
                    // Don't process content as we do that by calling convertContent above already.
                    //processContent = false
                    break
                }
                case "table_body":
                case "table_caption":
                    // Handled directly through table tag.
                    break
                case "table_cell":
                case "table_header": {
                    if (node.content) {
                        pandocContent.push([
                            ["", [], []],
                            {t: "AlignDefault"},
                            node.attrs?.rowspan || 1,
                            node.attrs?.colspan || 1,
                            this.convertContent(node.content, meta, options)
                        ])
                    }
                    break
                }
                case "table_part":
                    pandocContent.push({
                        t: "Div",
                        c: [
                            [
                                node.attrs.id || "",
                                [
                                    "doc-part",
                                    "doc-table",
                                    node.attrs.id
                                        ? `doc-${node.attrs.id}`
                                        : "doc-div",
                                    `doc-${node.attrs.metadata || "other"}`
                                ],
                                []
                            ],
                            this.convertContent(node.content, meta, options)
                        ]
                    })
                    break
                case "table_of_contents": {
                    pandocContent.push({
                        t: "Div",
                        c: [
                            [
                                node.attrs.id || "",
                                [
                                    "doc-part",
                                    "doc-table-of-contents",
                                    node.attrs.id
                                        ? `doc-${node.attrs.id}`
                                        : "doc-div",
                                    `doc-${node.attrs.metadata || "other"}`
                                ],
                                []
                            ],
                            [
                                {
                                    t: "Header",
                                    c: [
                                        1,
                                        ["", ["toc"], []],
                                        (0,_tools__rspack_import_0.convertText)(node.attrs.title)
                                    ]
                                }
                            ].concat(this.metaData.toc)
                        ]
                    })
                    break
                }
                case "table_row": {
                    pandocContent.push([
                        ["", [], []],
                        this.convertContent(node.content, meta, options)
                    ])
                    break
                }
                case "text": {
                    if (node.text) {
                        let containerContent = pandocContent
                        let strong,
                            em,
                            underline,
                            hyperlink,
                            anchor,
                            sup,
                            sub,
                            code
                        if (node.marks) {
                            strong = node.marks.find(
                                mark => mark.type === "strong"
                            )
                            em = node.marks.find(mark => mark.type === "em")
                            underline = node.marks.find(
                                mark => mark.type === "underline"
                            )
                            hyperlink = node.marks.find(
                                mark => mark.type === "link"
                            )
                            anchor = node.marks.find(
                                mark => mark.type === "anchor"
                            )
                            sup = node.marks.find(mark => mark.type === "sup")
                            sub = node.marks.find(mark => mark.type === "sub")
                            code = node.marks.find(mark => mark.type === "code")
                        }
                        if (em) {
                            const c = []
                            containerContent.push({
                                t: "Emph",
                                c
                            })
                            containerContent = c
                        }
                        if (strong) {
                            const c = []
                            containerContent.push({
                                t: "Strong",
                                c
                            })
                            containerContent = c
                        }
                        if (underline) {
                            const c = []
                            containerContent.push({
                                t: "Underline",
                                c
                            })
                            containerContent = c
                        }
                        if (sup) {
                            const c = []
                            containerContent.push({
                                t: "Superscript",
                                c
                            })
                            containerContent = c
                        }
                        if (sub) {
                            const c = []
                            containerContent.push({
                                t: "Subscript",
                                c
                            })
                            containerContent = c
                        }
                        if (code && !options.inCode) {
                            containerContent.push({
                                t: "Code",
                                c: [["", [], []], node.text]
                            })
                            break
                        }
                        if (hyperlink) {
                            const c = []
                            containerContent.push({
                                t: "Link",
                                c: [["", [], []], c, [hyperlink.attrs.href, ""]]
                            })
                            containerContent = c
                        }
                        if (anchor) {
                            const c = []
                            containerContent.push({
                                t: "Span",
                                c: [[anchor.attrs.id, [], []], c]
                            })
                            containerContent = c
                        }

                        if (options.inCode) {
                            containerContent.push({
                                t: "Code",
                                c: [["", [], []], node.text]
                            })
                        } else {
                            containerContent.push(
                                ...(0,_tools__rspack_import_0.convertText)(node.text || "")
                            )
                        }
                    }
                    break
                }
                case "title": {
                    if (!node.content || !node.content.length) {
                        break
                    }
                    if (!meta.title) {
                        meta.title = {
                            t: "MetaInlines",
                            c: this.convertContent(node.content, meta, options)
                        }
                    } else {
                        const pandocElement = {
                            t: "Header",
                            c: [1, ["title", [], []]]
                        }
                        if (node.content) {
                            this.convertContent(
                                node.content,
                                meta,
                                options
                            ).forEach(el => pandocElement.c.push(el))
                        }
                        pandocContent.push(pandocElement)
                    }
                    break
                }
                default: {
                    console.warn(`Not handled: ${node.type}`, {node})
                    break
                }
            }
        }
        return pandocContent
    }

    // The database doesn't ensure that citation keys are unique.
    // So here we need to make sure that the same key is not used twice in one
    // document.
    createUniqueCitationKey(suggestedKey) {
        const usedKeys = Object.keys(this.usedBibDB).map(key => {
            return this.usedBibDB[key].entry_key
        })
        if (usedKeys.includes(suggestedKey)) {
            suggestedKey += "X"
            return this.createUniqueCitationKey(suggestedKey)
        } else {
            return suggestedKey
        }
    }
}


}),
"./js/modules/exporter/pandoc/index.js": (function (__unused_rspack_module, __webpack_exports__, __webpack_require__) {
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  PandocExporter: function() { return PandocExporter; }
});
/* import */ var biblatex_csl_converter__rspack_import_0 = __webpack_require__("./node_modules/.pnpm/biblatex-csl-converter@3.6.0/node_modules/biblatex-csl-converter/lib/index.js");
/* import */ var downloadjs__rspack_import_1 = __webpack_require__("./node_modules/.pnpm/downloadjs@1.4.7/node_modules/downloadjs/download.js");
/* import */ var downloadjs__rspack_import_1_default = /*#__PURE__*/__webpack_require__.n(downloadjs__rspack_import_1);
/* import */ var _common__rspack_import_2 = __webpack_require__("./js/modules/common/index.js");
/* import */ var _tools_doc_content__rspack_import_3 = __webpack_require__("./js/modules/exporter/tools/doc_content.js");
/* import */ var _tools_file__rspack_import_4 = __webpack_require__("./js/modules/exporter/tools/file.js");
/* import */ var _tools_zip__rspack_import_5 = __webpack_require__("./js/modules/exporter/tools/zip.js");
/* import */ var _citations__rspack_import_6 = __webpack_require__("./js/modules/exporter/pandoc/citations.js");
/* import */ var _convert__rspack_import_7 = __webpack_require__("./js/modules/exporter/pandoc/convert.js");
/* import */ var _readme__rspack_import_8 = __webpack_require__("./js/modules/exporter/pandoc/readme.js");










/*
 Exporter to Pandoc JSON
*/

class PandocExporter {
    constructor(doc, bibDB, imageDB, csl, updated) {
        this.doc = doc
        this.docTitle = (0,_common__rspack_import_2.shortFileTitle)(this.doc.title, this.doc.path)
        this.bibDB = bibDB
        this.imageDB = imageDB
        this.csl = csl
        this.updated = updated

        this.docContent = false
        this.zipFileName = ""
        this.textFiles = []
        this.httpFiles = []
    }

    init() {
        //this.docContent = removeHidden(this.doc.content) //
        this.docContent = (0,_tools_doc_content__rspack_import_3.fixTables)((0,_tools_doc_content__rspack_import_3.removeHidden)(this.doc.content))
        this.citations = new _citations__rspack_import_6.PandocExporterCitations(
            this,
            this.bibDB,
            this.csl,
            this.docContent
        )
        this.converter = new _convert__rspack_import_7.PandocExporterConvert(
            this,
            this.imageDB,
            this.bibDB,
            this.doc.settings
        )
        return this.citations.init().then(() => {
            this.conversion = this.converter.init(this.docContent)
            if (Object.keys(this.conversion.usedBibDB).length > 0) {
                const bibExport = new biblatex_csl_converter__rspack_import_0.BibLatexExporter(
                    this.conversion.usedBibDB
                )
                this.textFiles.push({
                    filename: "bibliography.bib",
                    contents: bibExport.parse()
                })
            }

            this.conversion.imageIds.forEach(id => {
                this.httpFiles.push({
                    filename: this.imageDB.db[id].image.split("/").pop(),
                    url: this.imageDB.db[id].image
                })
            })
            return this.createExport()
        })
    }

    createExport() {
        // Override this function if adding a conversion-through-pandoc step.
        this.textFiles.push({
            filename: "document.json",
            contents: JSON.stringify(this.conversion.json, null, 4)
        })
        this.textFiles.push({filename: "README.txt", contents: _readme__rspack_import_8.readMe})
        this.zipFileName = `${(0,_tools_file__rspack_import_4.createSlug)(this.docTitle)}.pandoc.json.zip`
        return this.createDownload()
    }

    createDownload() {
        // This creates a ZIP file with JSON sources included and then returns a promise for the download of the file.
        const zipper = new _tools_zip__rspack_import_5.ZipFileCreator(
            this.textFiles,
            this.httpFiles,
            undefined,
            undefined,
            this.updated
        )

        return zipper
            .init()
            .then(blob => downloadjs__rspack_import_1_default()(blob, this.zipFileName, "application/zip"))
    }
}


}),
"./js/modules/exporter/pandoc/readme.js": (function (__unused_rspack_module, __webpack_exports__, __webpack_require__) {
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  readMe: function() { return readMe; }
});
const readMe = `Unzip the contents of this file to a folder and convert it then to another format
using pandoc like this:

pandoc document.json -o document.html

Replace "document.html" with other formats you may want.

`


}),
"./js/modules/exporter/pandoc/tools.js": (function (__unused_rspack_module, __webpack_exports__, __webpack_require__) {
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  convertContributor: function() { return convertContributor; },
  convertText: function() { return convertText; }
});
const convertText = text => {
    const textContent = []
    if (!text.length) {
        return []
    }
    const words = text.split(" ")
    words.forEach((c, index) => {
        if (c) {
            textContent.push({
                t: "Str",
                c
            })
        }
        if (index < words.length - 1) {
            textContent.push({
                t: "Space"
            })
        }
    })
    return textContent
}

const convertContributor = contributor => {
    const contributorContent = []
    if (contributor.firstname || contributor.lastname) {
        const nameParts = []
        if (contributor.lastname) {
            nameParts.push(contributor.lastname)
        }
        if (contributor.firstname) {
            nameParts.push(contributor.firstname)
        }
        contributorContent.push(...convertText(nameParts.join(" ")))
    } else if (contributor.institution) {
        contributorContent.push(...convertText(contributor.institution))
    }
    if (contributor.email) {
        contributorContent.push({
            t: "Note",
            c: [
                {
                    t: "Para",
                    c: convertText(contributor.email)
                }
            ]
        })
    }
    return contributorContent.length
        ? {t: "MetaInlines", c: contributorContent}
        : false
}


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

}]);