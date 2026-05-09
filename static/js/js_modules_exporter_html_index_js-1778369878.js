"use strict";
(self["webpackChunkfidus_writer"] = self["webpackChunkfidus_writer"] || []).push([["js_modules_exporter_html_index_js"], {
"./js/modules/exporter/html/citations.js": (function (__unused_rspack_module, __webpack_exports__, __webpack_require__) {
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  HTMLExporterCitations: function() { return HTMLExporterCitations; }
});
/* import */ var _citations_format__rspack_import_0 = __webpack_require__("./js/modules/citations/format.js");
/* import */ var _common__rspack_import_1 = __webpack_require__("./js/modules/common/index.js");
/* import */ var _schema_i18n__rspack_import_2 = __webpack_require__("./js/modules/schema/i18n.js");




class HTMLExporterCitations {
    constructor(docSettings, bibDB, csl) {
        this.docSettings = docSettings
        this.bibDB = bibDB
        this.csl = csl

        this.citationTexts = []
        this.citFm = false
        this.bibHTML = ""
        this.bibCSS = ""
        this.htmlIdConvert = {}
    }

    async init(citInfos) {
        this.citInfos = citInfos
        if (!citInfos.length) {
            return this.getOutput()
        }
        await this.formatCitations()
        return this.getOutput()
    }

    getOutput() {
        return {
            type: this.citFm ? this.citFm.citationType : "",
            bibCSS: this.bibCSS,
            bibHTML: this.bibHTML,
            citationTexts: this.citationTexts
        }
    }

    // Citations are highly interdependent -- so we need to format them all
    // together before laying out the document.
    async formatCitations() {
        const citationstyle = await this.csl.getStyle(
            this.docSettings.citationstyle
        )

        const modStyle = JSON.parse(JSON.stringify(citationstyle))
        const citationLayout = modStyle.children
            .find(section => section.name === "citation")
            .children.find(section => section.name === "layout").attrs
        const origCitationLayout = JSON.parse(JSON.stringify(citationLayout))
        citationLayout.prefix = "{{prefix}}"
        citationLayout.suffix = "{{suffix}}"
        citationLayout.delimiter = "{{delimiter}}"
        this.citFm = new _citations_format__rspack_import_0.FormatCitations(
            this.csl,
            this.citInfos,
            modStyle,
            "",
            this.bibDB,
            false,
            this.docSettings.language
        )

        await this.citFm.init()

        // We need to add links to the bibliography items. And there may be more than one work cited
        // so we need to first split, then add the links and eventually put the citation back together
        // again.
        // The IDs used in the html bibliography are 1 and up in this order
        this.citFm.bibliography[0].entry_ids.forEach(
            (id, index) => (this.htmlIdConvert[id] = index + 1)
        )
        this.citationTexts = this.citFm.citationTexts.map((ref, index) => {
            const content = ref
                .split("{{delimiter}}")
                .map((citationText, conIndex) => {
                    const prefixSplit = citationText.split("{{prefix}}")
                    const prefix =
                        prefixSplit.length > 1
                            ? prefixSplit.shift() +
                              (origCitationLayout.prefix || "")
                            : ""
                    citationText = prefixSplit[0]
                    const suffixSplit = citationText.split("{{suffix}}")
                    const suffix =
                        suffixSplit.length > 1
                            ? (origCitationLayout.suffix || "") +
                              suffixSplit.pop()
                            : ""
                    citationText = suffixSplit[0]
                    const citId =
                        this.citFm.citations[index].sortedItems[conIndex][1].id
                    const htmlId = this.htmlIdConvert[citId]
                    return `${prefix}<a class="bibliography" href="#ref-${htmlId}">${citationText}</a>${suffix}`
                })
                .join(origCitationLayout.delimiter || "")
            return content
        })

        if (
            this.citFm.bibliography?.length &&
            this.citFm.bibliography[0].entry_ids.length
        ) {
            this.assembleBib()
        }
    }

    assembleBib() {
        const bibliographyHeader =
            this.docSettings.bibliography_header[this.docSettings.language] ||
            _schema_i18n__rspack_import_2.BIBLIOGRAPHY_HEADERS[this.docSettings.language]
        let bibHTML = `<h1 class="doc-bibliography-header">${(0,_common__rspack_import_1.escapeText)(bibliographyHeader)}</h1>`
        bibHTML += this.citFm.bibliography[0].bibstart
        bibHTML += this.citFm.bibliography[1]
            .map(
                (reference, index) =>
                    `<div id="ref-${index + 1}">${reference}</div>`
            )
            .join("")
        bibHTML += this.citFm.bibliography[0].bibend
        this.bibHTML = bibHTML
        this.bibCSS = this.citFm.bibCSS
    }
}


}),
"./js/modules/exporter/html/convert.js": (function (__unused_rspack_module, __webpack_exports__, __webpack_require__) {
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  HTMLExporterConvert: function() { return HTMLExporterConvert; }
});
/* import */ var mathlive__rspack_import_0 = __webpack_require__("./node_modules/.pnpm/mathlive@0.104.0/node_modules/mathlive/dist/mathlive.mjs");
/* import */ var pretty__rspack_import_1 = __webpack_require__("./node_modules/.pnpm/pretty@2.0.0/node_modules/pretty/index.js");
/* import */ var pretty__rspack_import_1_default = /*#__PURE__*/__webpack_require__.n(pretty__rspack_import_1);
/* import */ var _common__rspack_import_2 = __webpack_require__("./js/modules/common/index.js");
/* import */ var _schema_i18n__rspack_import_3 = __webpack_require__("./js/modules/schema/i18n.js");
/* import */ var _citations__rspack_import_4 = __webpack_require__("./js/modules/exporter/html/citations.js");
/* import */ var _tools__rspack_import_5 = __webpack_require__("./js/modules/exporter/html/tools.js");








class HTMLExporterConvert {
    constructor(
        docTitle,
        docSettings,
        docContent,
        htmlExportTemplate,
        imageDB,
        bibDB,
        csl,
        styleSheets,
        {
            xhtml = false,
            epub = false,
            relativeUrls = true, // Whether to use relative urls for images, css files, etc. Is used when bundled in HTML. Not in print.
            footnoteNumbering = "decimal",
            affiliationNumbering = "alpha",
            idPrefix = "",
            footnoteOffset = 0,
            affiliationOffset = 0,
            figureOffset = {}
        } = {}
    ) {
        this.docTitle = docTitle
        this.docSettings = docSettings
        this.docContent = docContent
        this.htmlExportTemplate = htmlExportTemplate
        this.imageDB = imageDB
        this.bibDB = bibDB
        this.csl = csl
        this.styleSheets = styleSheets
        this.xhtml = xhtml
        this.epub = epub
        this.relativeUrls = relativeUrls
        this.footnoteNumbering = footnoteNumbering
        this.affiliationNumbering = affiliationNumbering

        this.endSlash = this.xhtml ? "/" : ""
        this.imageIds = []
        this.categoryCounter = {} // counters for each type of figure (figure/table/photo)
        this.affiliations = {} // affiliations of authors and editors
        this.parCounter = 0
        this.headingCounter = 0
        this.currentSectionLevel = 0
        this.listCounter = 0
        this.orderedListLengths = []
        this.footnotes = []
        this.fnCounter = footnoteOffset
        this.affCounter = affiliationOffset
        this.metaData = {
            title: this.docTitle,
            authors: [],
            abstract: false,
            keywords: [],
            copyright: {
                licenses: []
            },
            toc: []
        }
        this.features = {
            math: false,
            bibliography: false
        }
        this.citations = {
            type: "",
            bibCSS: "",
            bibHTML: "",
            citationTexts: []
        }
        this.citInfos = []
        this.citationCount = 0
        this.extraStyleSheets = []
        this.idPrefix = idPrefix
        this.categoryCounter = Object.assign({}, figureOffset)
    }

    init() {
        this.analyze(this.docContent)
        return this.process()
    }

    async processCitInfos() {
        const citationProcessor = new _citations__rspack_import_4.HTMLExporterCitations(
            this.docSettings,
            this.bibDB,
            this.csl
        )
        const citations = await citationProcessor.init(this.citInfos)
        this.citations = citations
    }

    async process() {
        if (this.citInfos.length) {
            await this.processCitInfos()
        }

        if (this.citations.bibCSS.length) {
            this.extraStyleSheets.push({
                filename: this.relativeUrls ? "css/bibliography.css" : null,
                contents: pretty__rspack_import_1_default()(this.citations.bibCSS, {
                    ocd: true
                })
            })
        }
        if (this.features.math) {
            this.extraStyleSheets.push({
                filename: this.relativeUrls
                    ? "css/mathlive.css"
                    : staticUrl("css/libs/mathlive/mathlive.css")
            })
        }
        const body = this.assembleBody()
        const back = this.assembleBack()
        const head = this.assembleHead()
        const html = this.htmlExportTemplate({
            head,
            body,
            back,
            settings: this.docSettings,
            lang: this.docSettings.language.split("-")[0],
            xhtml: this.xhtml,
            epub: this.epub
        })
        return {
            html,
            imageIds: this.imageIds,
            extraStyleSheets: this.extraStyleSheets,
            metaData: this.metaData
        }
    }

    // Find information for meta tags in header
    analyze(node) {
        switch (node.type) {
            case "citation":
                this.citInfos.push(JSON.parse(JSON.stringify(node.attrs)))
                break
            case "contributors_part":
                if (node.attrs.metadata === "authors" && node.content) {
                    node.content.forEach(author => {
                        this.metaData.authors.push(author)
                    })
                }
                break
            case "doc":
                this.metaData.copyright = node.attrs.copyright
                break
            case "heading1":
            case "heading2":
            case "heading3":
            case "heading4":
            case "heading5":
            case "heading6": {
                const level = Number.parseInt(node.type.slice(-1))
                this.metaData.toc.push({
                    level,
                    id: node.attrs.id,
                    title: (node.content || [])
                        .map(subNode => this.walkJson(subNode))
                        .join("")
                })
                break
            }
            case "equation":
            case "figure_equation":
                this.features.math = true
                break
            case "footnote":
                node.attrs.footnote.forEach(child => this.analyze(child))
                break
            case "richtext_part":
                if (
                    node.attrs.metadata === "abstract" &&
                    !node.attrs.language &&
                    this.metaData.abstract
                ) {
                    this.metaData.abstract = this.walkJson(node)
                }
                break
            case "tags_part":
                if (node.attrs.metadata === "keywords" && node.content) {
                    node.content.forEach(tag => {
                        this.metaData.keywords.push(tag.attrs.tag)
                    })
                }
                break
            case "title": {
                const title = this.textWalkJson(node)
                if (title.length) {
                    this.metaData.title = title
                }
                this.metaData.toc.push({
                    docTitle: true,
                    level: 1,
                    id: "title",
                    title: title
                })
                break
            }

            default:
                break
        }
        if (node.content) {
            node.content.forEach(child => this.analyze(child))
        }
    }

    assembleHead() {
        let head = `<title>${(0,_common__rspack_import_2.escapeText)(this.metaData.title)}</title>`
        if (this.metaData.authors.length) {
            const authorString = this.metaData.authors
                .map(author => {
                    if (author.firstname || author.lastname) {
                        const nameParts = []
                        if (author.firstname) {
                            nameParts.push(author.firstname)
                        }
                        if (author.lastname) {
                            nameParts.push(author.lastname)
                        }
                        return nameParts.join(" ")
                    } else if (author.institution) {
                        return author.institution
                    }
                })
                .join(", ")
            if (authorString.length) {
                head += `<meta name="author" content="${(0,_common__rspack_import_2.escapeText)(authorString)}"${this.endSlash}>`
            }
        }
        if (this.metaData.copyright.holder) {
            head += `<link rel="schema.dcterms" href="http://purl.org/dc/terms/"${this.endSlash}>`
            const year = this.metaData.copyright.year
                ? this.metaData.copyright.year
                : new Date().getFullYear()
            head += `<meta name="dcterms.dateCopyrighted" content="${year}"${this.endSlash}>`
            head += `<meta name="dcterms.rightsHolder" content="${(0,_common__rspack_import_2.escapeText)(this.metaData.copyright.holder)}"${this.endSlash}>`
            // TODO: Add this.metaData.copyright.freeToRead if present

            head += this.metaData.copyright.licenses
                .map(
                    license =>
                        `<link rel="license" href="${(0,_common__rspack_import_2.escapeText)(license.url)}"${this.endSlash}>` // TODO: Add this.metaData.copyright.license.start info if present
                )
                .join("")
        }
        if (this.metaData.abstract.default) {
            head += this.walkJson(this.metaData.abstract.default)
        }
        Object.keys(this.metaData.abstract)
            .filter(language => language !== "default")
            .forEach(language => {
                head += this.walkJson(this.metaData.abstract[language])
            })
        if (this.metaData.keywords.length) {
            head += `<meta name="keywords" content="${(0,_common__rspack_import_2.escapeText)(this.metaData.keywords.join(", "))}"${this.endSlash}>`
        }
        head += this.styleSheets
            .concat(this.extraStyleSheets)
            .map(sheet => {
                if (!sheet.filename && !sheet.contents) {
                    console.warn(
                        "No filename or contents for stylesheet.",
                        sheet
                    )
                    return ""
                }
                return sheet.filename
                    ? `<link rel="stylesheet" type="text/css" href="${sheet.filename}"${this.endSlash}>`
                    : `<style>${sheet.contents}</style>`
            })
            .join("")
        return head
    }

    // Only allow for text output
    textWalkJson(node) {
        let content = ""
        if (node.type === "text") {
            content += (0,_common__rspack_import_2.escapeText)(node.text).normalize("NFC")
        } else if (node.content) {
            node.content.forEach(child => {
                content += this.textWalkJson(child)
            })
        }
        return content
    }

    walkJson(node, options = {}) {
        let start = "",
            content = "",
            end = ""
        switch (node.type) {
            case "doc":
                break
            case "title":
                start += `<div class="doc-part doc-title" id="${this.idPrefix}title">`
                end = "</div>" + end
                break
            case "heading_part":
                start += `<div class="doc-part doc-heading doc-${node.attrs.id} ${node.attrs.metadata || "other"}" id="${this.idPrefix}${node.attrs.id}"${node.attrs.language ? ` lang="${node.attrs.language}"` : ""}>`
                end = "</div>" + end
                break
            case "contributor":
                // Ignore - we deal with contributors_part instead.
                break
            case "contributors_part":
                if (node.content) {
                    start += `<div class="doc-part doc-contributors doc-${node.attrs.id} ${node.attrs.metadata || "other"}" id="${this.idPrefix}${node.attrs.id}"${node.attrs.language ? ` lang="${node.attrs.language}"` : ""}>`
                    end = "</div>" + end
                    let counter = 0
                    const contributorOutputs = []
                    node.content.forEach(childNode => {
                        const contributor = childNode.attrs
                        let output = ""
                        if (contributor.firstname || contributor.lastname) {
                            output += `<span id="${this.idPrefix}${node.attrs.id}-${counter++}" class="person">`
                            const nameParts = []
                            if (contributor.firstname) {
                                nameParts.push(
                                    `<span class="firstname">${(0,_common__rspack_import_2.escapeText)(contributor.firstname)}</span>`
                                )
                            }
                            if (contributor.lastname) {
                                nameParts.push(
                                    `<span class="lastname">${(0,_common__rspack_import_2.escapeText)(contributor.lastname)}</span>`
                                )
                            }
                            if (nameParts.length) {
                                output += `<span class="name">${nameParts.join(" ")}</span>`
                            }
                            if (contributor.institution) {
                                let affNumber
                                if (
                                    this.affiliations[contributor.institution]
                                ) {
                                    affNumber =
                                        this.affiliations[
                                            contributor.institution
                                        ]
                                } else {
                                    affNumber = ++this.affCounter
                                    this.affiliations[contributor.institution] =
                                        affNumber
                                }
                                const affNumberDisplay = (0,_tools__rspack_import_5.displayNumber)(
                                    affNumber,
                                    this.affiliationNumbering
                                )
                                output += `<a class="affiliation" href="#aff-${affNumber}"${this.epub ? ' epub:type="noteref"' : ""}>${affNumberDisplay}</a>`
                            }
                            output += "</span>"
                        } else if (contributor.institution) {
                            // There is an affiliation but no first/last name. We take this
                            // as a group collaboration.
                            output += `<span id="${this.idPrefix}${node.attrs.id}-${counter++}" class="group">`
                            output += `<span class="name">${(0,_common__rspack_import_2.escapeText)(contributor.institution)}</span>`
                            output += "</span>"
                        }
                        contributorOutputs.push(output)
                    })
                    content += contributorOutputs.join(", ")
                }
                break
            case "tags_part":
                if (node.content) {
                    start += `<div class="doc-part doc-tags doc-${node.attrs.id} doc-${node.attrs.metadata || "other"}" id="${this.idPrefix}${node.attrs.id}"${node.attrs.language ? ` lang="${node.attrs.language}"` : ""}>`
                    end = "</div>" + end
                }
                break
            case "tag":
                content += `<span class='tag'>${(0,_common__rspack_import_2.escapeText)(node.attrs.tag)}</span>`
                break
            case "richtext_part":
                if (node.content) {
                    start += `<div class="doc-part doc-richtext doc-${node.attrs.id} doc-${node.attrs.metadata || "other"}" id="${this.idPrefix}${node.attrs.id}"${node.attrs.language ? ` lang="${node.attrs.language}"` : ""}>`
                    end = "</div>" + end
                }
                break
            case "table_of_contents":
                start += `<div class="doc-part table-of-contents"><h1>${(0,_common__rspack_import_2.escapeText)(node.attrs.title)}</h1>`
                content += this.metaData.toc
                    .map(
                        item =>
                            `<h${item.level}><a href="#${item.id}">${item.title}</a></h${item.level}>`
                    )
                    .join("")
                end += "</div>"
                break
            case "separator_part":
                content += `<hr class="doc-part doc-separator doc-${node.attrs.id} doc-${node.attrs.metadata || "other"}" id="${this.idPrefix}${node.attrs.id}">`
                break
            case "table_part":
                if (node.content) {
                    start += `<div class="doc-part doc-table doc-${node.attrs.id} doc-${node.attrs.metadata || "other"}" id="${this.idPrefix}${node.attrs.id}"${node.attrs.language ? ` lang="${node.attrs.language}"` : ""}>`
                    end = "</div>" + end
                }
                break
            case "paragraph":
                start += `<p id="${this.idPrefix}p-${++this.parCounter}">`
                end = "</p>" + end
                break
            case "heading1":
            case "heading2":
            case "heading3":
            case "heading4":
            case "heading5":
            case "heading6": {
                const level = Number.parseInt(node.type.slice(-1))
                start += `<h${level} id="${this.idPrefix}${node.attrs.id}">`
                end = `</h${level}>` + end
                break
            }
            case "code_block": {
                const attrs = []
                if (node.attrs.language) {
                    attrs.push(
                        `data-language="${(0,_common__rspack_import_2.escapeText)(node.attrs.language)}"`
                    )
                }
                if (node.attrs.category) {
                    attrs.push(`data-category="${node.attrs.category}"`)
                }
                if (node.attrs.title) {
                    attrs.push(`data-title="${(0,_common__rspack_import_2.escapeText)(node.attrs.title)}"`)
                }
                if (node.attrs.id) {
                    attrs.push(`data-id="${node.attrs.id}"`)
                }
                const attrString = attrs.length ? ` ${attrs.join(" ")}` : ""

                // If there's a category, wrap in figure for proper numbering
                if (node.attrs.category && node.attrs.id) {
                    const language = this.doc.attrs.language || "en-US"
                    const {CATS} = __webpack_require__("./js/modules/schema/i18n.js")
                    const categoryLabel =
                        CATS[node.attrs.category]?.[language] ||
                        node.attrs.category

                    // Count code blocks to get the number
                    const categories = {}
                    this.doc.descendants(n => {
                        if (
                            n.type === "code_block" &&
                            n.attrs.category &&
                            n.attrs.id
                        ) {
                            if (!categories[n.attrs.category]) {
                                categories[n.attrs.category] = 0
                            }
                            categories[n.attrs.category]++
                            if (n.attrs.id === node.attrs.id) {
                                return false
                            }
                        }
                    })
                    const number = categories[node.attrs.category] || 1
                    const label = node.attrs.title
                        ? `${categoryLabel} ${number}: ${(0,_common__rspack_import_2.escapeText)(node.attrs.title)}`
                        : `${categoryLabel} ${number}`

                    start += `<figure class="code-block-figure" id="${this.idPrefix}${node.attrs.id}"><figcaption><span class="label">${label}</span></figcaption><pre${attrString}><code>`
                    end = `</code></pre></figure>` + end
                } else {
                    start += `<code${attrString}>`
                    end = "</code>" + end
                }
                break
            }
            case "blockquote":
                start += "<blockquote>"
                end = "</blockquote>" + end
                break
            case "ordered_list": {
                if (node.attrs.order == 1) {
                    start += `<ol id="${this.idPrefix}list-${++this.listCounter}">`
                } else {
                    start += `<ol id="${this.idPrefix}list-${++this.listCounter}" start="${node.attrs.order}">`
                }
                end = "</ol>" + end
                break
            }
            case "bullet_list":
                start += `<ul id="${this.idPrefix}list-${++this.listCounter}">`
                end = "</ul>" + end
                break
            case "list_item":
                start += "<li>"
                end = "</li>" + end
                break
            case "footnote": {
                const footnoteNumber = ++this.fnCounter
                const footnoteNumberDisplay = (0,_tools__rspack_import_5.displayNumber)(
                    footnoteNumber,
                    this.footnoteNumbering
                )
                content += `<a class="footnote"${this.epub ? ' epub:type="noteref"' : ""} href="#fn-${footnoteNumber}">${footnoteNumberDisplay}</a>`
                options = Object.assign({}, options)
                options.inFootnote = true
                this.footnotes.push(
                    this.walkJson(
                        {
                            type: "footnotecontainer",
                            attrs: {
                                id: `fn-${footnoteNumber}`,
                                label: footnoteNumberDisplay // Note: it's unclear whether the footnote number is required as a label
                            },
                            content: node.attrs.footnote
                        },
                        options
                    )
                )
                break
            }
            case "footnotecontainer":
                start += `<aside class="footnote"${this.epub ? ' epub:type="footnote"' : ""} role="doc-footnote" id="${this.idPrefix}${node.attrs.id}"><label>${node.attrs.label}</label>`
                end = "</aside>" + end
                break
            case "text": {
                let strong, em, underline, hyperlink, anchor, sup, sub, code
                // Check for hyperlink, bold/strong, italic/em and underline
                if (node.marks) {
                    strong = node.marks.find(mark => mark.type === "strong")
                    em = node.marks.find(mark => mark.type === "em")
                    underline = node.marks.find(
                        mark => mark.type === "underline"
                    )
                    hyperlink = node.marks.find(mark => mark.type === "link")
                    anchor = node.marks.find(mark => mark.type === "anchor")
                    sup = node.marks.find(mark => mark.type === "sup")
                    sub = node.marks.find(mark => mark.type === "sub")
                    code = node.marks.find(mark => mark.type === "code")
                }
                if (em) {
                    start += "<em>"
                    end = "</em>" + end
                }
                if (strong) {
                    start += "<strong>"
                    end = "</strong>" + end
                }
                if (underline) {
                    start += '<span class="underline">'
                    end = "</span>" + end
                }
                if (sup) {
                    start += "<sup>"
                    end = "</sup>" + end
                }
                if (sub) {
                    start += "<sub>"
                    end = "</sub>" + end
                }
                if (code) {
                    start += "<code>"
                    end = "</code>" + end
                }
                if (hyperlink) {
                    const href = hyperlink.attrs.href
                    const link = href.startsWith("#")
                        ? `#${this.idPrefix}${href.slice(1)}`
                        : href
                    start += `<a href="${link}">`
                    end = "</a>" + end
                }
                if (anchor) {
                    const id = anchor.attrs.id
                    start += `<span class="anchor" id="${this.idPrefix}${id}" data-id="${this.idPrefix}${id}">`
                    end = "</span>" + end
                }
                content += (0,_common__rspack_import_2.escapeText)(node.text).normalize("NFC")
                break
            }
            case "cross_reference": {
                start += `<a class="reference" href="#${this.idPrefix}${node.attrs.id}">`
                content += (0,_common__rspack_import_2.escapeText)(node.attrs.title || "MISSING TARGET")
                end = "</a>" + end
                break
            }
            case "citation": {
                if (!this.citations.citationTexts.length) {
                    // There are no citations. This may happen while analyzing.
                    return ""
                }
                const citationText =
                    this.citations.citationTexts[this.citationCount++]
                if (
                    options.inFootnote ||
                    this.citations.citationType !== "note"
                ) {
                    content += citationText
                } else {
                    content += `<a class="footnote"${this.epub ? 'epub:type="noteref" ' : ""} href="#fn-${++this.fnCounter}">${this.fnCounter}</a>`
                    this.footnotes.push(
                        `<aside class="footnote"${this.epub ? 'epub:type="footnote" ' : ""} id="fn-${this.fnCounter}"><label>${this.fnCounter}</label><p id="${this.idPrefix}p-${++this.parCounter}">${citationText}</p></aside>`
                    )
                }
                break
            }
            case "figure": {
                let imageUrl, copyright
                const image =
                    node.content.find(node => node.type === "image")?.attrs
                        .image || false
                if (image !== false) {
                    this.imageIds.push(image)
                    const imageDBEntry = this.imageDB.db[image],
                        filePathName = imageDBEntry.image
                    copyright = imageDBEntry.copyright
                    imageUrl = this.relativeUrls
                        ? `images/${filePathName.split("/").pop()}`
                        : filePathName
                }
                const caption = node.attrs.caption
                    ? node.content.find(node => node.type === "figure_caption")
                          ?.content || []
                    : []
                if (
                    node.attrs.category === "none" &&
                    imageUrl &&
                    !caption.length &&
                    (!copyright || !copyright.holder)
                ) {
                    content += `<img id="${this.idPrefix}${node.attrs.id}" class="aligned-${node.attrs.aligned} image-width-${node.attrs.width}" src="${imageUrl}"${this.endSlash}>`
                } else {
                    start += `<figure
                        id="${this.idPrefix}${node.attrs.id}"
                        class="aligned-${node.attrs.aligned} image-width-${node.attrs.width}"
                        data-aligned="${node.attrs.aligned}"
                        data-width="${node.attrs.width}"
                        data-category="${node.attrs.category}"
                    >`
                    end = "</figure>" + end

                    const equation = node.content.find(
                        node => node.type === "figure_equation"
                    )?.attrs.equation

                    if (image && copyright?.holder) {
                        let figureFooter = `<footer class="copyright ${copyright.freeToRead ? "free-to-read" : "not-free-to-read"}"><small>`
                        figureFooter += "© "
                        const year = copyright.year
                            ? copyright.year
                            : new Date().getFullYear()
                        figureFooter += `<span class="copyright-year">${year}</span> `
                        figureFooter += `<span class="copyright-holder">${(0,_common__rspack_import_2.escapeText)(copyright.holder)}</span> `
                        figureFooter += copyright.licenses
                            .map(
                                license =>
                                    `<span class="license"><a rel="license"${license.start ? ` data-start="${license.start}"` : ""}>${(0,_common__rspack_import_2.escapeText)(license.url)}</a></span>`
                            )
                            .join("")
                        figureFooter += "</small></footer>"
                        end = figureFooter + end
                    }

                    const category = node.attrs.category
                    if (caption.length || category !== "none") {
                        let figcaption = "<figcaption>"
                        if (category !== "none") {
                            if (!this.categoryCounter[category]) {
                                this.categoryCounter[category] = 0
                            }
                            const catCount = ++this.categoryCounter[category]
                            const catLabel = `${_schema_i18n__rspack_import_3.CATS[category][this.docSettings.language]} ${catCount}`
                            figcaption += `<label>${(0,_common__rspack_import_2.escapeText)(catLabel)}</label>`
                        }
                        if (caption.length) {
                            figcaption += `<p>${caption.map(node => this.walkJson(node)).join("")}</p>`
                        }
                        figcaption += "</figcaption>"
                        if (category === "table") {
                            start += figcaption
                        } else {
                            end = figcaption + end
                        }
                    }

                    if (equation) {
                        start += `<div class="figure-equation" data-equation="${(0,_common__rspack_import_2.escapeText)(equation)}"><math display="block">`
                        end = "</math></div>" + end
                        content = (0,mathlive__rspack_import_0.convertLatexToMathMl)(equation)
                    } else {
                        if (imageUrl) {
                            content += `<img src="${imageUrl}"${this.endSlash}>`
                        }
                    }
                }
                break
            }
            case "figure_caption":
                // We are already dealing with this in the figure. Prevent content from being added a second time.
                return ""
            case "figure_equation":
                // We are already dealing with this in the figure.
                break
            case "image":
                // We are already dealing with this in the figure.
                break
            case "table": {
                start += `<table
                id="${this.idPrefix}${node.attrs.id}"
                class="table-${node.attrs.width}
                table-${node.attrs.aligned}
                table-${node.attrs.layout}"
                data-width="${node.attrs.width}"
                data-aligned="${node.attrs.aligned}"
                data-layout="${node.attrs.layout}"
                data-category="${node.attrs.category}"
            >`
                end = "</table>" + end
                const category = node.attrs.category
                if (category !== "none") {
                    if (!this.categoryCounter[category]) {
                        this.categoryCounter[category] = 0
                    }
                    const catCount = ++this.categoryCounter[category]
                    const catLabel = `${_schema_i18n__rspack_import_3.CATS[category][this.docSettings.language]} ${catCount}`
                    start += `<label>${(0,_common__rspack_import_2.escapeText)(catLabel)}</label>`
                }
                const caption = node.attrs.caption
                    ? node.content[0].content || []
                    : []
                if (caption.length) {
                    start += `<caption><p>${caption.map(node => this.walkJson(node)).join("")}</p></caption>`
                }
                start += "<tbody>"
                end = "</tbody>" + end
                break
            }
            case "table_body":
                // Pass through to table.
                break
            case "table_caption":
                // We already deal with this in 'table'.
                return ""
            case "table_row":
                start += "<tr>"
                end = "</tr>" + end
                break
            case "table_cell":
                start += `<td${node.attrs.colspan === 1 ? "" : ` colspan="${node.attrs.colspan}"`}${node.attrs.rowspan === 1 ? "" : ` rowspan="${node.attrs.rowspan}"`}>`
                end = "</td>" + end
                break
            case "table_header":
                start += `<th${node.attrs.colspan === 1 ? "" : ` colspan="${node.attrs.colspan}"`}${node.attrs.rowspan === 1 ? "" : ` rowspan="${node.attrs.rowspan}"`}>`
                end = "</th>" + end
                break
            case "equation":
                start += '<span class="equation"><math>'
                end = "</math></span>" + end
                content = (0,mathlive__rspack_import_0.convertLatexToMathMl)(node.attrs.equation)
                break
            case "hard_break":
                content += `<br${this.endSlash}>`
                break
            default:
                break
        }

        if (!content.length && node.content) {
            node.content.forEach(child => {
                content += this.walkJson(child, options)
            })
        }

        return start + content + end
    }

    assembleBody() {
        return `<div id="${this.idPrefix}body">${this.walkJson(this.docContent)}</div>`
    }

    assembleBack() {
        let back = ""
        if (
            this.footnotes.length ||
            this.citations.bibHTML.length ||
            Object.keys(this.affiliations).length
        ) {
            back += `<div id="${this.idPrefix}back">`
            if (Object.keys(this.affiliations).length) {
                back += `<section id="${this.idPrefix}affiliations" class="affiliations">${Object.entries(
                    this.affiliations
                )
                    .map(
                        ([name, id]) =>
                            `<aside class="affiliation" id="aff-${id}"${this.epub ? 'epub:type="footnote"' : ""}><label>${(0,_tools__rspack_import_5.displayNumber)(id, this.affiliationNumbering)}</label> <div>${(0,_common__rspack_import_2.escapeText)(name)}</div></aside>`
                    )
                    .join("")}</section>`
            }
            if (this.footnotes.length) {
                back += `<section class="fnlist footnotes" role="doc-footnotes" id="${this.idPrefix}footnotes">${this.footnotes.join("")}</section>`
            }
            if (this.citations.bibHTML.length) {
                back += `<div id="${this.idPrefix}references" class="references">${this.citations.bibHTML}</div>`
            }
            back += "</div>"
        }
        return back
    }
}


}),
"./js/modules/exporter/html/index.js": (function (__unused_rspack_module, __webpack_exports__, __webpack_require__) {
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  HTMLExporter: function() { return HTMLExporter; }
});
/* import */ var downloadjs__rspack_import_0 = __webpack_require__("./node_modules/.pnpm/downloadjs@1.4.7/node_modules/downloadjs/download.js");
/* import */ var downloadjs__rspack_import_0_default = /*#__PURE__*/__webpack_require__.n(downloadjs__rspack_import_0);
/* import */ var pretty__rspack_import_1 = __webpack_require__("./node_modules/.pnpm/pretty@2.0.0/node_modules/pretty/index.js");
/* import */ var pretty__rspack_import_1_default = /*#__PURE__*/__webpack_require__.n(pretty__rspack_import_1);
/* import */ var _common__rspack_import_2 = __webpack_require__("./js/modules/common/index.js");
/* import */ var _tools_doc_content__rspack_import_3 = __webpack_require__("./js/modules/exporter/tools/doc_content.js");
/* import */ var _tools_file__rspack_import_4 = __webpack_require__("./js/modules/exporter/tools/file.js");
/* import */ var _tools_zip__rspack_import_5 = __webpack_require__("./js/modules/exporter/tools/zip.js");
/* import */ var _convert__rspack_import_6 = __webpack_require__("./js/modules/exporter/html/convert.js");
/* import */ var _templates__rspack_import_7 = __webpack_require__("./js/modules/exporter/html/templates.js");










/*
 Exporter to HTML
*/

class HTMLExporter {
    constructor(
        doc,
        bibDB,
        imageDB,
        csl,
        updated,
        documentStyles,
        converterOptions = {},
        template = _templates__rspack_import_7.htmlExportTemplate
    ) {
        this.doc = doc
        this.bibDB = bibDB
        this.imageDB = imageDB
        this.csl = csl
        this.updated = updated
        this.documentStyles = documentStyles
        this.converterOptions = converterOptions

        this.docTitle = (0,_common__rspack_import_2.shortFileTitle)(this.doc.title, this.doc.path)

        this.docContent = false
        this.zipFileName = false
        this.textFiles = []
        this.httpFiles = []
        this.includeZips = []
        this.metaData = {} // Information to be used in sub classes.
        // To override in subclasses
        this.htmlExportTemplate = template
        this.contentFileName = "document.html"
        this.fileEnding = "html.zip"
        this.mimeType = "application/zip"

        // Stylesheets will have one of:
        // * a url - which means they will be fetched before they are included as a separate file
        // * a filename and contents - which means they will be included as a separate file
        // * only contents - which means they will be incldued inside <style></style> tags in the document header
        // * only filename - which means they will be referenced as a separate file. You need to add the file yourself.
        this.styleSheets = [{url: staticUrl("css/document.css")}]
    }

    async init() {
        await this.process()
        return await this.createZip()
    }

    async process() {
        // Process the document and prepare files
        this.zipFileName = `${(0,_tools_file__rspack_import_4.createSlug)(this.docTitle)}.${this.fileEnding}`
        this.docContent = (0,_tools_doc_content__rspack_import_3.removeHidden)(this.doc.content)

        const docStyle = this.getDocStyle(this.doc)

        if (docStyle) {
            this.styleSheets.push(docStyle)
        }
        await Promise.all(
            this.styleSheets.map(async sheet => await this.loadStyle(sheet))
        )

        this.converter = new _convert__rspack_import_6.HTMLExporterConvert(
            this.docTitle,
            this.doc.settings,
            this.docContent,
            this.htmlExportTemplate,
            this.imageDB,
            this.bibDB,
            this.csl,
            this.styleSheets,
            this.converterOptions
        )
        const {html, imageIds, metaData, extraStyleSheets} =
            await this.converter.init()
        this.metaData = metaData
        if (this.converter.features.math) {
            this.includeZips.push({
                directory: "css",
                url: staticUrl("zip/mathlive_style.zip")
            })
        }
        this.addDoc(html)
        this.addImages(imageIds)
        await Promise.all(
            extraStyleSheets.map(async sheet => await this.loadStyle(sheet))
        )
    }

    getProcessedFiles() {
        // Return the processed files and metadata. Used when using the
        // exporter in a different context than creating a zip file.
        return {
            textFiles: this.textFiles,
            httpFiles: this.httpFiles,
            includeZips: this.includeZips,
            metaData: this.metaData,
            converter: this.converter
        }
    }

    addDoc(html) {
        this.textFiles.push({
            filename: this.contentFileName,
            contents: pretty__rspack_import_1_default()(html, {ocd: true})
        })
    }

    addImages(imageIds) {
        imageIds.forEach(id => {
            const image = this.imageDB.db[id]
            this.httpFiles.push({
                filename: `images/${image.image.split("/").pop()}`,
                url: image.image
            })
        })
    }

    getDocStyle(doc) {
        const docStyle = this.documentStyles.find(
            docStyle => docStyle.slug === doc.settings.documentstyle
        )

        // The files will be in the base directory. The filenames of
        // DocumentStyleFiles will therefore not need to replaced with their URLs.
        if (!docStyle) {
            return false
        }
        let contents = docStyle.contents
        docStyle.documentstylefile_set.forEach(
            ([_url, filename]) =>
                (contents = contents.replace(
                    new RegExp(filename, "g"),
                    `media/${filename}`
                ))
        )
        this.httpFiles = this.httpFiles.concat(
            docStyle.documentstylefile_set.map(([url, filename]) => ({
                filename: `css/media/${filename}`,
                url
            }))
        )
        return {contents, filename: `css/${docStyle.slug}.css`}
    }

    async loadStyle(sheet) {
        if (sheet.url) {
            // Use simple fetch without X-Requested-With header and credentials
            // to avoid CORS preflight redirect issues with CDNs
            const response = await fetch(sheet.url)
            if (!response.ok) {
                throw response
            }
            const text = await response.text()
            sheet.contents = text
            sheet.filename = `css/${sheet.url.split("/").pop().split("?")[0]}`
            delete sheet.url
        }
        if (sheet.filename) {
            this.textFiles.push(sheet)
        }
        return Promise.resolve(sheet)
    }

    async createZip() {
        const zipper = new _tools_zip__rspack_import_5.ZipFileCreator(
            this.textFiles,
            this.httpFiles,
            this.includeZips,
            this.mimeType,
            this.updated
        )
        const blob = await zipper.init()
        return this.download(blob)
    }

    download(blob) {
        return downloadjs__rspack_import_0_default()(blob, this.zipFileName, this.mimeType)
    }
}


}),
"./js/modules/exporter/html/templates.js": (function (__unused_rspack_module, __webpack_exports__, __webpack_require__) {
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  htmlExportTemplate: function() { return htmlExportTemplate; }
});
/* import */ var _common__rspack_import_0 = __webpack_require__("./js/modules/common/index.js");


/** A template for HTML export of a document. */
const htmlExportTemplate = ({
    head,
    body,
    back,
    settings,
    lang,
    xhtml,
    epub
}) =>
    `${xhtml ? '<?xml version="1.0" encoding="UTF-8"?>' : "<!DOCTYPE html>"}
    <html ${xhtml ? `xmlns="http://www.w3.org/1999/xhtml" ${epub ? 'xmlns:epub="http://www.idpf.org/2007/ops"' : ""}` : ""} lang="${lang}"${xhtml ? ` xml:lang="${lang}"` : ""}>
    <head>
        <meta charset="UTF-8"${xhtml ? " /" : ""}>
        ${settings.copyright && settings.copyright.holder ? `<meta name="copyright" content="© ${settings.copyright.year ? settings.copyright.year : new Date().getFullYear()} ${(0,_common__rspack_import_0.escapeText)(settings.copyright.holder)}"${xhtml ? " /" : ""}>` : ""}
        ${head}
    </head>
    <body class="doc user-contents">
        ${body}
        ${back}
        ${
            settings.copyright && settings.copyright.holder
                ? `<div>© ${settings.copyright.year ? settings.copyright.year : new Date().getFullYear()} ${(0,_common__rspack_import_0.escapeText)(settings.copyright.holder)}</div>`
                : ""
        }
        ${
            settings.copyright && settings.copyright.licenses.length
                ? `<div>${settings.copyright.licenses.map(license => `<a rel="license" href="${(0,_common__rspack_import_0.escapeText)(license.url)}">${(0,_common__rspack_import_0.escapeText)(license.title)}${license.start ? ` (${license.start})` : ""}</a>`).join("</div><div>")}</div>`
                : ""
        }
    </body>
</html>`


}),
"./js/modules/exporter/html/tools.js": (function (__unused_rspack_module, __webpack_exports__, __webpack_require__) {
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  displayNumber: function() { return displayNumber; }
});
const numberToRoman = number => {
    let roman = ""
    const romanNumList = {
        M: 1000,
        CM: 900,
        D: 500,
        CD: 400,
        C: 100,
        XC: 90,
        L: 50,
        XL: 40,
        X: 10,
        IX: 9,
        V: 5,
        IV: 4,
        I: 1
    }
    let a
    for (const key in romanNumList) {
        a = Math.floor(number / romanNumList[key])
        if (a >= 0) {
            for (let i = 0; i < a; i++) {
                roman += key
            }
        }
        number = number % romanNumList[key]
    }
    return roman
}

const numberToAlpha = number => {
    const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ"
    let alpha = ""
    let a
    for (let i = 0; i < number; i++) {
        a = i % 26
        alpha += alphabet[a]
    }
    return alpha
}

const displayNumber = (number, system) => {
    if (system === "roman") {
        return numberToRoman(number)
    }
    if (system === "alpha") {
        return numberToAlpha(number)
    }
    return number
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