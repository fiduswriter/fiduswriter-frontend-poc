"use strict";
(self["rspackChunkfidus_writer"] = self["rspackChunkfidus_writer"] || []).push([["js_modules_exporter_jats_index_js"], {
"./js/modules/exporter/jats/bibliography.js": (function (__unused_rspack_module, __webpack_exports__, __webpack_require__) {
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  jatsBib: function() { return jatsBib; }
});
/* import */ var _common__rspack_import_0 = __webpack_require__("./js/modules/common/index.js");
/* import */ var _text__rspack_import_1 = __webpack_require__("./js/modules/exporter/jats/text.js");



// This list is based on values listed at https://jats.nlm.nih.gov/archiving/tag-library/1.2/attribute/publication-type.html
// And the advice given here: https://jats4r.org/citations/#recommendation
const PUBLICATION_TYPES = {
    article: "journal",
    "article-journal": "journal",
    "article-magazine": "journal",
    "article-newspaper": "journal",
    book: "book",
    bookinbook: "book",
    booklet: "book",
    chapter: "book",
    collection: "standard",
    dataset: "dataset",
    "entry-dictionary": "standard",
    "entry-encyclopedia": "standard",
    inbook: "book",
    incollection: "book",
    inproceedings: "standard",
    inreference: "standard",
    manual: "book",
    misc: "standard",
    mvbook: "book",
    mvcollection: "standard",
    mvproceedings: "book",
    mvreference: "standard",
    online: "standard",
    patent: "patent",
    periodical: "book",
    post: "standards",
    "post-weblog": "standard",
    proceedings: "book",
    reference: "standard",
    report: "report",
    review: "review",
    suppbook: "book",
    suppcollection: "book",
    suppperiodical: "journal",
    thesis: "standard",
    unpublished: "standard"
}

function jatsBib(bib, id) {
    let start = "",
        end = ""
    start += `<ref id="ref-${id}">`
    end = "</ref>" + end
    // Type
    const publicationType = PUBLICATION_TYPES[bib.bib_type] ?? "standard"
    start += `<element-citation publication-type="${publicationType}">`
    end = "</element-citation>" + end

    // authors
    if (bib.fields.author && bib.fields.author.length) {
        start += `<person-group person-group-type="author">${bib.fields.author
            .map(author => {
                if (author.literal) {
                    return `<collab>${(0,_text__rspack_import_1.convertTexts)(author.literal)}</collab>`
                }
                let nameStart = `<name><surname>${(0,_text__rspack_import_1.convertTexts)(author.family)}</surname> <given-names>${(0,_text__rspack_import_1.convertTexts)(author.given)}</given-names>`
                if (author.prefix && author.prefix.length) {
                    nameStart += ` <prefix>${(0,_text__rspack_import_1.convertTexts)(author.prefix)}</prefix>`
                }
                if (author.suffix && author.suffix.length) {
                    nameStart += ` <suffix>${(0,_text__rspack_import_1.convertTexts)(author.suffix)}</suffix>`
                }
                const nameEnd = "</name>"
                return nameStart + nameEnd
            })
            .join(", ")}</person-group>`
    }

    // title && container title
    if (bib.fields.title) {
        if (
            bib.fields.shortjournal ||
            bib.fields.booktitle ||
            bib.fields.journaltitle
        ) {
            start += `<source>${(0,_text__rspack_import_1.convertTexts)(bib.fields.shortjournal || bib.fields.booktitle || bib.fields.journaltitle)}</source>`
            start += `<article-title>${(0,_text__rspack_import_1.convertTexts)(bib.fields.title)}</article-title>`
        } else {
            start += `<source>${(0,_text__rspack_import_1.convertTexts)(bib.fields.title)}</source>`
        }
    }

    // editors
    if (bib.fields.editor && bib.fields.editor.length) {
        start += `<person-group person-group-type="editor">${bib.fields.editor
            .map(editor => {
                if (editor.literal) {
                    return `<collab>${(0,_text__rspack_import_1.convertTexts)(editor.literal)}</collab>`
                }
                let nameStart = `<name><surname>${(0,_text__rspack_import_1.convertTexts)(editor.family)}</surname> <given-names>${(0,_text__rspack_import_1.convertTexts)(editor.given)}</given-names>`
                const nameEnd = "</name>"
                if (editor.prefix && editor.prefix.length) {
                    nameStart = `<prefix>${(0,_text__rspack_import_1.convertTexts)(editor.prefix)}</prefix>`
                }
                if (editor.suffix && editor.suffix.length) {
                    nameStart = `<suffix>${(0,_text__rspack_import_1.convertTexts)(editor.suffix)}</suffix>`
                }
                return nameStart + nameEnd
            })
            .join(", ")}</person-group>`
    }

    // publisher
    if (bib.fields.publisher && bib.fields.publisher.length) {
        start += bib.fields.publisher
            .map(
                publisher =>
                    `<publisher-name>${(0,_text__rspack_import_1.convertTexts)(publisher)}</publisher-name>`
            )
            .join("")
    }

    // location
    if (bib.fields.location && bib.fields.location.length) {
        start += bib.fields.location
            .map(
                location =>
                    `<publisher-loc>${(0,_text__rspack_import_1.convertTexts)(location)}</publisher-loc>`
            )
            .join("")
    }

    // date
    if (bib.fields.date && bib.fields.date.length) {
        const date = bib.fields.date
        const dateParts = date.split("-")
        start += `<date iso-8601-date="${date}" date-type="published">${
            dateParts.length > 2 ? `<day>${dateParts[2]}</day>` : ""
        }${
            dateParts.length > 1 ? `<month>${dateParts[1]}</month>` : ""
        }<year>${dateParts[0]}</year></date>`
    }

    // volume
    if (bib.fields.volume && bib.fields.volume.length) {
        start += `<volume>${(0,_text__rspack_import_1.convertTexts)(bib.fields.volume)}</volume>`
    }

    // issue
    if (bib.fields.issue && bib.fields.issue.length) {
        start += `<issue>${(0,_text__rspack_import_1.convertTexts)(bib.fields.issue)}</issue>`
    }

    // pages
    if (bib.fields.pages && bib.fields.pages.length) {
        start += `<fpage>${(0,_text__rspack_import_1.convertTexts)(bib.fields.pages[0][0])}</fpage>`
        start += `<lpage>${(0,_text__rspack_import_1.convertTexts)(bib.fields.pages.slice(-1)[0].slice(-1)[0])}</lpage>`
        if (bib.fields.pages.length > 1) {
            start += `<page-range>${bib.fields.pages
                .map(pages => pages.map(page => (0,_text__rspack_import_1.convertTexts)(page)).join("-"))
                .join(", ")}</page-range>`
        }
    }

    // doi
    if (bib.fields.doi && bib.fields.doi.length) {
        start += `<pub-id pub-id-type="doi">${(0,_common__rspack_import_0.escapeText)(bib.fields.doi)}</pub-id>`
    }

    // url
    if (bib.fields.url && bib.fields.url.length) {
        start += `<ext-link ext-link-type="web" xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="${(0,_common__rspack_import_0.escapeText)(bib.fields.url)}"/>`
    }

    // url date
    if (bib.fields.urldate && bib.fields.urldate.length) {
        const date = bib.fields.urldate
        const dateParts = date.split("-")
        start += `<date-in-citation content-type="access-date" iso-8601-date="${date}">${
            dateParts.length > 2 ? `<day>${dateParts[2]}</day>` : ""
        }${
            dateParts.length > 1 ? `<month>${dateParts[1]}</month>` : ""
        }<year>${dateParts[0]}</year></date-in-citation>`
    }

    return start + end
}


}),
"./js/modules/exporter/jats/citations.js": (function (__unused_rspack_module, __webpack_exports__, __webpack_require__) {
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  JATSExporterCitations: function() { return JATSExporterCitations; }
});
/* import */ var _citations_format__rspack_import_0 = __webpack_require__("./js/modules/citations/format.js");
/* import */ var _bibliography__rspack_import_1 = __webpack_require__("./js/modules/exporter/jats/bibliography.js");




class JATSExporterCitations {
    constructor(doc, bibDB, csl) {
        this.doc = doc
        this.bibDB = bibDB
        this.csl = csl

        this.citationTexts = []
        this.citFm = false
        this.jatsBib = ""
        this.jatsIdConvert = {}
    }

    init(citInfos) {
        this.citInfos = citInfos
        if (!citInfos.length) {
            return Promise.resolve()
        }
        return this.formatCitations()
    }

    // Citations are highly interdependent -- so we need to format them all
    // together before laying out the document.
    // We disregard the styling of the bibliography and instead create our own, JATS-specific bibliography.
    formatCitations() {
        return this.csl
            .getStyle(this.doc.settings.citationstyle)
            .then(citationstyle => {
                const modStyle = JSON.parse(JSON.stringify(citationstyle))
                const citationLayout = modStyle.children
                    .find(section => section.name === "citation")
                    .children.find(section => section.name === "layout").attrs
                const origCitationLayout = JSON.parse(
                    JSON.stringify(citationLayout)
                )
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
                    this.doc.settings.language
                )
                return Promise.all([
                    Promise.resolve(origCitationLayout),
                    this.citFm.init()
                ])
            })
            .then(([origCitationLayout]) => {
                // We need to add xref-links to the bibliography items. And there may be more than one work cited
                // so we need to first split, then add the links and eventually put the citation back together
                // again.
                // The IDs used in the jats bibliography are 1 and up in this order
                this.citFm.bibliography[0].entry_ids.forEach((id, index) => {
                    this.jatsIdConvert[id] = index + 1
                    this.jatsBib += (0,_bibliography__rspack_import_1.jatsBib)(this.bibDB.db[id], index + 1)
                })
                this.citationTexts = this.citFm.citationTexts.map(
                    (ref, index) => {
                        const content = ref
                            .split("{{delimiter}}")
                            .map((citationText, conIndex) => {
                                const prefixSplit =
                                    citationText.split("{{prefix}}")
                                const prefix =
                                    prefixSplit.length > 1
                                        ? prefixSplit.shift() +
                                          (origCitationLayout.prefix || "")
                                        : ""
                                citationText = prefixSplit[0]
                                const suffixSplit =
                                    citationText.split("{{suffix}}")
                                const suffix =
                                    suffixSplit.length > 1
                                        ? (origCitationLayout.suffix || "") +
                                          suffixSplit.pop()
                                        : ""
                                citationText = suffixSplit[0]
                                const citId =
                                    this.citFm.citations[index].sortedItems[
                                        conIndex
                                    ][1].id
                                const jatsId = this.jatsIdConvert[citId]
                                return `${prefix}<xref ref-type="bibr" rid="ref-${jatsId}">${citationText}</xref>${suffix}`
                            })
                            .join(origCitationLayout.delimiter || "")
                        return content
                            .replace(/<b>/g, "<bold>")
                            .replace(/<\/b>/g, "</bold>")
                            .replace(/<i>/g, "<italic>")
                            .replace(/<\/i>/g, "</italic>")
                            .replace(
                                /<span style="font-variant:small-caps;">/g,
                                "<sc>"
                            )
                            .replace(/<\/span>/g, "</sc>")
                    }
                )
                return Promise.resolve()
            })
    }
}


}),
"./js/modules/exporter/jats/convert.js": (function (__unused_rspack_module, __webpack_exports__, __webpack_require__) {
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  JATSExporterConverter: function() { return JATSExporterConverter; }
});
/* import */ var mathlive__rspack_import_0 = __webpack_require__("./node_modules/.pnpm/mathlive@0.104.0/node_modules/mathlive/dist/mathlive.mjs");
/* import */ var _common__rspack_import_1 = __webpack_require__("./js/modules/common/index.js");
/* import */ var _schema_i18n__rspack_import_2 = __webpack_require__("./js/modules/schema/i18n.js");
/* import */ var _tools_doc_content__rspack_import_3 = __webpack_require__("./js/modules/exporter/tools/doc_content.js");
/* import */ var _citations__rspack_import_4 = __webpack_require__("./js/modules/exporter/jats/citations.js");
/* import */ var _text__rspack_import_5 = __webpack_require__("./js/modules/exporter/jats/text.js");










class JATSExporterConverter {
    constructor(type, doc, csl, imageDB, bibDB) {
        this.type = type
        this.doc = doc
        this.csl = csl
        this.imageDB = imageDB
        this.bibDB = bibDB
        this.imageIds = []
        this.categoryCounter = {} // counters for each type of figure (figure/table/photo)
        this.affiliations = {} // affiliations of authors and editors
        this.affCounter = 0
        this.parCounter = 0
        this.headingCounter = 0
        this.currentSectionLevel = 0
        this.listCounter = 0
        this.orderedListLengths = []
        this.footnotes = []
        this.fnCounter = 0
        this.frontMatter = {
            title: {},
            subtitle: {},
            contributors: [],
            abstract: {},
            keywords: [],
            tags: [],
            copyright: {
                licenses: []
            }
        }
        this.citInfos = []
        this.citationCount = 0
        this.citations = new _citations__rspack_import_4.JATSExporterCitations(
            this.doc,
            this.bibDB,
            this.csl
        )
    }

    init() {
        const docContent = (0,_tools_doc_content__rspack_import_3.removeHidden)(this.doc.content)
        this.preWalkJson(docContent)
        this.findAllCitations(docContent)
        return this.citations.init(this.citInfos).then(() => {
            const front =
                this.type === "article"
                    ? this.assembleArticleFront()
                    : this.assembleBookPartFront()
            const body = this.assembleBody(docContent)
            const back = this.assembleBack()
            return {
                front,
                body,
                back,
                imageIds: this.imageIds
            }
        })
    }

    // Remove items from the body that should be in the front.
    preWalkJson(node, parentNode = false) {
        switch (node.type) {
            case "doc":
                this.frontMatter.copyright = node.attrs.copyright
                break
            case "title":
                this.frontMatter.title["default"] = node
                parentNode.content = parentNode.content.filter(
                    child => child !== node
                )
                break
            case "heading_part":
                if (
                    ["title", "subtitle"].includes(node.attrs.metadata) &&
                    !this.frontMatter[node.attrs.metadata][
                        node.attrs.language || "default"
                    ] &&
                    node.content &&
                    node.content.length
                ) {
                    // We only take the first instance of title/subtitle per language
                    this.frontMatter[node.attrs.metadata][
                        node.attrs.language || "default"
                    ] = {
                        type: node.attrs.language
                            ? `trans_${node.attrs.metadata}`
                            : node.attrs.metadata,
                        attrs: {
                            id: node.content[0].attrs.id,
                            language: node.attrs.language
                        },
                        content: node.content[0].content
                    }
                    parentNode.content = parentNode.content.filter(
                        child => child !== node
                    )
                }
                break
            case "richtext_part":
                if (
                    node.attrs.metadata === "abstract" &&
                    !this.frontMatter.abstract[node.attrs.language || "default"]
                ) {
                    // We only take the first instance of abstract per language
                    this.frontMatter.abstract[
                        node.attrs.language || "default"
                    ] = {
                        type: node.attrs.language
                            ? "trans_abstract"
                            : "abstract",
                        attrs: {
                            id: node.attrs.id,
                            language: node.attrs.language
                        },
                        content: node.content
                    }
                    parentNode.content = parentNode.content.filter(
                        child => child !== node
                    )
                }
                break
            case "tags_part":
                if (node.attrs.metadata === "keywords" && node.content) {
                    this.frontMatter.keywords.push({
                        type: "keywords",
                        attrs: {
                            language: node.attrs.language
                        },
                        content: node.content
                    })
                } else {
                    this.frontMatter.tags.push(node)
                }
                parentNode.content = parentNode.content.filter(
                    child => child !== node
                )
                break
            case "contributors_part":
                this.frontMatter.contributors.push(node)
                parentNode.content = parentNode.content.filter(
                    child => child !== node
                )
                break
            default:
                break
        }
        if (node.content) {
            node.content.forEach(child => this.preWalkJson(child, node))
        }
    }

    findAllCitations(docContent) {
        // We need to look for citations in the same order they will be found in front + body
        // to get the formatting right.
        if (this.frontMatter.subtitle.default) {
            this.findCitations(this.frontMatter.subtitle.default)
        }
        Object.keys(this.frontMatter.title)
            .filter(language => language !== "default")
            .forEach(language => {
                this.findCitations(this.frontMatter.title[language])
                if (this.frontMatter.subtitle[language]) {
                    this.findCitations(this.frontMatter.subtitle[language])
                }
            })
        if (this.frontMatter.abstract.default) {
            this.findCitations(this.frontMatter.abstract.default)
        }
        Object.keys(this.frontMatter.abstract)
            .filter(language => language !== "default")
            .forEach(language => {
                this.findCitations(this.frontMatter.abstract[language])
            })
        this.findCitations(docContent)
    }

    findCitations(node) {
        switch (node.type) {
            case "citation":
                this.citInfos.push(JSON.parse(JSON.stringify(node.attrs)))
                break
            case "footnote":
                node.attrs.footnote.forEach(child => this.findCitations(child))
                break
            default:
                break
        }
        if (node.content) {
            node.content.forEach(child => this.findCitations(child))
        }
    }

    assembleArticleFront() {
        let front = "<front>"
        front +=
            "<journal-meta><journal-id></journal-id><issn></issn></journal-meta>" // Required by DTD
        front += "<article-meta>"
        if (this.frontMatter.tags.length) {
            front += `<article-categories>${this.frontMatter.tags.map(node => this.walkJson(node)).join("")}</article-categories>`
        }
        Object.keys(this.frontMatter.subtitle)
            .filter(language => language !== "default")
            .forEach(language => {
                // Making sure there is a title for each subtitle
                if (!this.frontMatter.title[language]) {
                    this.frontMatter.title[language] = {
                        type: "trans_title",
                        attrs: {language}
                    }
                }
            })
        front += "<title-group>"
        front += this.walkJson(this.frontMatter.title.default)
        if (this.frontMatter.subtitle.default) {
            front += this.walkJson(this.frontMatter.subtitle.default)
        }
        Object.keys(this.frontMatter.title)
            .filter(language => language !== "default")
            .forEach(language => {
                front += `<trans-title-group @xml:lang="${language}">`
                front += this.walkJson(this.frontMatter.title[language])
                if (this.frontMatter.subtitle[language]) {
                    front += this.walkJson(this.frontMatter.subtitle[language])
                }
                front += "</trans-title-group>"
            })
        front += "</title-group>"
        this.frontMatter.contributors.forEach(contributors => {
            front += this.walkJson(contributors)
        })
        Object.entries(this.affiliations).forEach(
            ([institution, index]) =>
                (front += `<aff id="aff${index}"><institution>${(0,_common__rspack_import_1.escapeText)(institution)}</institution></aff>`)
        )
        // https://validator.jats4r.org/ requires a <permissions> element here, but is OK with it being empty.
        if (this.frontMatter.copyright.holder) {
            front += "<permissions>"
            const year = this.frontMatter.copyright.year
                ? this.frontMatter.copyright.year
                : new Date().getFullYear()
            front += `<copyright-year>${year}</copyright-year>`
            front += `<copyright-holder>${(0,_common__rspack_import_1.escapeText)(this.frontMatter.copyright.holder)}</copyright-holder>`
            if (this.frontMatter.copyright.freeToRead) {
                front += "<ali:free_to_read/>"
            }
            front += this.frontMatter.copyright.licenses
                .map(
                    license =>
                        `<license><ali:license_ref${license.start ? ` start_date="${license.start}"` : ""}>${(0,_common__rspack_import_1.escapeText)(license.url)}</ali:license_ref></license>`
                )
                .join("")
            front += "</permissions>"
        } else {
            front += "<permissions/>"
        }
        if (this.frontMatter.abstract.default) {
            front += this.walkJson(this.frontMatter.abstract.default)
            front += this.closeSections(0)
        }
        Object.keys(this.frontMatter.abstract)
            .filter(language => language !== "default")
            .forEach(language => {
                front += this.walkJson(this.frontMatter.abstract[language])
                front += this.closeSections(0)
            })
        this.frontMatter.keywords.forEach(keywords => {
            front += this.walkJson(keywords)
        })
        front += "</article-meta></front>"
        return front
    }

    assembleBookPartFront() {
        let front = "<front-matter><book-part-meta>"
        if (this.frontMatter.tags.length) {
            front += `<subj-group>${this.frontMatter.tags.map(node => this.walkJson(node)).join("")}</subj-group>`
        }
        Object.keys(this.frontMatter.subtitle)
            .filter(language => language !== "default")
            .forEach(language => {
                // Making sure there is a title for each subtitle
                if (!this.frontMatter.title[language]) {
                    this.frontMatter.title[language] = {
                        type: "trans_title",
                        attrs: {language}
                    }
                }
            })
        front += "<title-group>"
        front += this.walkJson(this.frontMatter.title.default)
        if (this.frontMatter.subtitle.default) {
            front += this.walkJson(this.frontMatter.subtitle.default)
        }
        Object.keys(this.frontMatter.title)
            .filter(language => language !== "default")
            .forEach(language => {
                front += `<trans-title-group @xml:lang="${language}">`
                front += this.walkJson(this.frontMatter.title[language])
                if (this.frontMatter.subtitle[language]) {
                    front += this.walkJson(this.frontMatter.subtitle[language])
                }
                front += "</trans-title-group>"
            })
        front += "</title-group>"
        this.frontMatter.contributors.forEach(contributors => {
            front += this.walkJson(contributors)
        })
        Object.entries(this.affiliations).forEach(
            ([institution, index]) =>
                (front += `<aff id="aff${index}"><institution>${(0,_common__rspack_import_1.escapeText)(institution)}</institution></aff>`)
        )
        // https://validator.jats4r.org/ requires a <permissions> element here, but is OK with it being empty.
        if (this.frontMatter.copyright.holder) {
            front += "<permissions>"
            const year = this.frontMatter.copyright.year
                ? this.frontMatter.copyright.year
                : new Date().getFullYear()
            front += `<copyright-year>${year}</copyright-year>`
            front += `<copyright-holder>${(0,_common__rspack_import_1.escapeText)(this.frontMatter.copyright.holder)}</copyright-holder>`
            if (this.frontMatter.copyright.freeToRead) {
                front += "<ali:free_to_read/>"
            }
            front += this.frontMatter.copyright.licenses
                .map(
                    license =>
                        `<license><ali:license_ref${license.start ? ` start_date="${license.start}"` : ""}>${(0,_common__rspack_import_1.escapeText)(license.url)}</ali:license_ref></license>`
                )
                .join("")
            front += "</permissions>"
        } else {
            front += "<permissions/>"
        }
        if (this.frontMatter.abstract.default) {
            front += this.walkJson(this.frontMatter.abstract.default)
            front += this.closeSections(0)
        }
        Object.keys(this.frontMatter.abstract)
            .filter(language => language !== "default")
            .forEach(language => {
                front += this.walkJson(this.frontMatter.abstract[language])
                front += this.closeSections(0)
            })
        this.frontMatter.keywords.forEach(keywords => {
            front += this.walkJson(keywords)
        })
        front += "</book-part-meta></front-matter>"
        return front
    }

    walkJson(node, options = {}) {
        let start = "",
            content = "",
            end = ""
        switch (node.type) {
            case "doc":
                break
            case "title":
                if (this.type === "article") {
                    start += "<article-title>"
                    end = "</article-title>" + end
                } else {
                    start += "<title>"
                    end = "</title>" + end
                }
                options = Object.assign({}, options)
                options.breakAllowed = true
                break
            case "trans_title":
                start += "<trans-title>"
                end = "</trans-title>" + end
                options = Object.assign({}, options)
                options.breakAllowed = true
                break
            case "subtitle":
                if (node.content) {
                    start += "<subtitle>"
                    end = "</subtitle>" + end
                    options = Object.assign({}, options)
                    options.breakAllowed = true
                }
                break
            case "trans_subtitle":
                if (node.content) {
                    start += "<trans-subtitle>"
                    end = "</trans-subtitle>" + end
                    options = Object.assign({}, options)
                    options.breakAllowed = true
                }
                break
            case "heading_part":
                // Ignore - we deal with the heading inside
                break
            case "contributor":
                // Ignore - we deal with contributors_part instead.
                break
            case "contributors_part":
                if (node.content) {
                    const contributorTypes = {
                        authors: "author",
                        editors: "editor"
                    }
                    const contributorType =
                        contributorTypes[node.attrs.metadata] || "other" // TODO: Figure out if 'other' is legal
                    start += `<contrib-group content-type="${contributorType}">`
                    end = "</contrib-group>" + end
                    const contributorTypeId = node.attrs.id
                    let counter = 1
                    node.content.forEach(childNode => {
                        const contributor = childNode.attrs
                        if (contributor.firstname || contributor.lastname) {
                            content += `<contrib id="${contributorTypeId}-${counter++}" contrib-type="person">`
                            content += "<name>"
                            if (contributor.lastname) {
                                content += `<surname>${(0,_common__rspack_import_1.escapeText)(contributor.lastname)}</surname>`
                            }
                            if (contributor.firstname) {
                                content += `<given-names>${(0,_common__rspack_import_1.escapeText)(contributor.firstname)}</given-names>`
                            }
                            content += "</name>"
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
                                content += `<xref ref-type="aff" rid="aff${affNumber}" />`
                            }
                            content += "</contrib>"
                        } else if (contributor.institution) {
                            // There is an affiliation but no first/last name. We take this
                            // as a group collaboration.
                            content += `<contrib id="${contributorTypeId}-${counter++}" contrib-type="group">`
                            content += `<collab><named-content content-type="name">${(0,_common__rspack_import_1.escapeText)(contributor.institution)}</named-content></collab>`
                            content += "</contrib>"
                        }
                    })
                }
                break
            case "tags_part":
                if (node.content) {
                    start += `<subj-group subj-group-type="${node.attrs.id}"${node.attrs.language ? ` xml:lang="${node.attrs.language}"` : ""}>`
                    end = "</subj-group>" + end
                }
                break
            case "keywords":
                if (node.content) {
                    start += `<kwd-group${node.attrs.language ? ` xml:lang="${node.attrs.language}"` : ""}>`
                    end = "</kwd-group>" + end
                    options = Object.assign({}, options)
                    options.inKeywords = true
                }
                break
            case "tag":
                if (options.inKeywords) {
                    content += `<kwd>${node.attrs.tag}</kwd>`
                } else {
                    content += `<subject>${node.attrs.tag}</subject>`
                }
                break
            case "abstract":
                if (node.content) {
                    start += "<abstract>"
                    end = "</abstract>" + end
                }
                break
            case "trans_abstract":
                if (node.content) {
                    start += `<trans-abstract xml:lang="${node.attrs.language}">`
                    end = "</trans-abstract>" + end
                }
                break
            case "richtext_part":
                if (node.attrs.metadata) {
                    options = Object.assign({}, options)
                    options.partMetadata = node.attrs.metadata
                }
                break
            case "table_of_contents":
                // TODO: Not sure what to use here.
                break
            case "separator_part":
            case "table_part":
                // part separators as in page breaks should usually already be handled
                // by JATS renderer and table parts will simply show the table inside of them.
                break
            case "paragraph":
                start += `<p id="p-${++this.parCounter}">`
                end = "</p>" + end
                break
            case "heading1":
            case "heading2":
            case "heading3":
            case "heading4":
            case "heading5":
            case "heading6": {
                if (options.ignoreHeading) {
                    break
                } else if (options.inFootnote) {
                    // only allows <p> block level elements https://jats.nlm.nih.gov/archiving/tag-library/1.2/element/fn.html
                    start += `<p id="p-${++this.parCounter}">`
                    end = "</p>" + end
                    break
                }
                const metadata = options.partMetadata
                if (metadata) {
                    // the metadata should only be applied once within a part.
                    delete options.partMetadata
                }
                const level = Number.parseInt(node.type.slice(-1))
                if (this.currentSectionLevel > level - 1) {
                    start += this.closeSections(level - 1)
                }
                while (this.currentSectionLevel < level) {
                    this.currentSectionLevel++
                    if (this.currentSectionLevel === level) {
                        start += `<sec id="${node.attrs.id}"${metadata ? ` sec-type="${metadata}"` : ""}>`
                    } else {
                        start += `<sec id="h-${++this.headingCounter}">`
                    }
                }
                start += "<title>"
                end = "</title>" + end
                options = Object.assign({}, options)
                options.breakAllowed = true
                break
            }
            case "code_block":
                if (options.inFootnote) {
                    // only allows <p> block level elements https://jats.nlm.nih.gov/archiving/tag-library/1.2/element/fn.html
                    start += `<p id="p-${++this.parCounter}">`
                    end = "</p>" + end
                    break
                }
                start += "<code>"
                end = "</code>" + end
                break
            case "blockquote":
                start += "<disp-quote>"
                end = "</disp-quote>" + end
                break
            case "ordered_list": {
                if (options.inFootnote) {
                    // only allows <p> block level elements https://jats.nlm.nih.gov/archiving/tag-library/1.2/element/fn.html
                    break
                }
                const continuedListEndNumber = node.attrs.order - 1
                let lastListIndex
                // TODO: deal with lists that have an order number other than 1 that do not continue previous lists. Currently not possible in JATS
                if (continuedListEndNumber) {
                    lastListIndex = this.orderedListLengths.lastIndexOf(
                        continuedListEndNumber
                    )
                    // const lastListReverseIndex = this.orderedListLengths.slice().reverse().findIndex(length => length === continuedListEndNumber)
                    // if (lastListReverseIndex !== undefined) {
                    //     lastListIndex = this.orderedListLengths.length-lastListReverseIndex
                    // }
                }
                if (lastListIndex > -1) {
                    start += `<list list-type="order" id="list-${++this.listCounter}" continued-from="list-${lastListIndex}">`
                } else {
                    start += `<list list-type="order" id="list-${++this.listCounter}">`
                }
                options = Object.assign({}, options)
                options.inOrderedList = this.listCounter
                this.orderedListLengths[options.inOrderedList] =
                    continuedListEndNumber
                end = "</list>" + end
                break
            }
            case "bullet_list":
                if (options.inFootnote) {
                    // only allows <p> block level elements https://jats.nlm.nih.gov/archiving/tag-library/1.2/element/fn.html
                    break
                }
                start += `<list list-type="bullet" id="list-${++this.listCounter}">`
                end = "</list>" + end
                options = Object.assign({}, options)
                delete options.inOrderedList
                break
            case "list_item":
                if (options.inFootnote) {
                    // only allows <p> block level elements https://jats.nlm.nih.gov/archiving/tag-library/1.2/element/fn.html
                    break
                }
                if (options.inOrderedList !== undefined) {
                    this.orderedListLengths[options.inOrderedList] += 1
                }
                start += "<list-item>"
                end = "</list-item>" + end
                break
            case "footnote":
                content += `<xref ref-type="fn" rid="fn-${++this.fnCounter}">${this.fnCounter}</xref>`
                options = Object.assign({}, options)
                options.inFootnote = true
                this.footnotes.push(
                    this.walkJson(
                        {
                            type: "footnotecontainer",
                            attrs: {
                                id: `fn-${this.fnCounter}`,
                                label: this.fnCounter // Note: it's unclear whether the footnote number is required as a label
                            },
                            content: node.attrs.footnote
                        },
                        options
                    )
                )
                break
            case "footnotecontainer":
                start += `<fn id="${node.attrs.id}"><label>${node.attrs.label}</label>`
                end = "</fn>" + end
                break
            case "text": {
                content += (0,_text__rspack_import_5.convertText)(node)
                break
            }
            case "cross_reference": {
                start += `<xref rid="${node.attrs.id}">`
                content += (0,_common__rspack_import_1.escapeText)(node.attrs.title || "MISSING TARGET")
                end = "</xref>" + end
                break
            }
            case "citation": {
                const citationText =
                    this.citations.citationTexts[this.citationCount++]
                if (
                    options.inFootnote ||
                    this.citations.citFm.citationType !== "note"
                ) {
                    content += citationText
                } else {
                    content += `<xref ref-type="fn" rid="fn-${++this.fnCounter}">${this.fnCounter}</xref>`
                    this.footnotes.push(
                        `<fn id="fn-${this.fnCounter}"><label>${this.fnCounter}</label><p id="p-${++this.parCounter}">${citationText}</p></fn>`
                    )
                }
                break
            }
            case "figure": {
                // Note: width and alignment are not stored due to lack of corresponding attributes in JATS.
                if (options.inFootnote) {
                    // only allows <p> block level elements https://jats.nlm.nih.gov/archiving/tag-library/1.2/element/fn.html
                    break
                }
                let imageFilename, copyright
                const image =
                    node.content.find(node => node.type === "image")?.attrs
                        .image || false
                if (image !== false) {
                    this.imageIds.push(image)
                    const imageDBEntry = this.imageDB.db[image],
                        filePathName = imageDBEntry.image
                    copyright = imageDBEntry.copyright
                    imageFilename = filePathName.split("/").pop()
                }
                const caption = node.attrs.caption
                    ? node.content.find(node => node.type === "figure_caption")
                          ?.content || []
                    : []
                if (
                    node.attrs.category === "none" &&
                    imageFilename &&
                    !caption.length &&
                    (!copyright || !copyright.holder)
                ) {
                    content += `<graphic id="${node.attrs.id}" position="anchor" xlink:href="${imageFilename}">`
                    content += `<alt-text>${(0,_common__rspack_import_1.escapeText)(caption.map(node => node.text || "").join("") || imageFilename)}</alt-text>`
                    content += "</graphic>"
                } else {
                    start += `<fig id="${node.attrs.id}">`
                    end = "</fig>" + end

                    const category = node.attrs.category
                    if (category !== "none") {
                        if (!this.categoryCounter[category]) {
                            this.categoryCounter[category] = 0
                        }
                        const catCount = ++this.categoryCounter[category]
                        const catLabel = `${_schema_i18n__rspack_import_2.CATS[category][this.doc.settings.language]} ${catCount}`
                        start += `<label>${(0,_common__rspack_import_1.escapeText)(catLabel)}</label>`
                    }
                    if (caption.length) {
                        start += `<caption><p>${caption.map(node => this.walkJson(node)).join("")}</p></caption>`
                    }
                    const equation = node.content.find(
                        node => node.type === "figure_equation"
                    )?.attrs.equation
                    if (equation) {
                        start += "<disp-formula>"
                        end = "</disp-formula>" + end
                        const equationML = (0,mathlive__rspack_import_0.convertLatexToMathMl)(equation)
                        content = `
                            <alternatives>
                                <tex-math><![CDATA[${equation}]]></tex-math>
                                <mml:math>${equationML}</mml:math>
                            </alternatives>
                        `
                    } else {
                        if (copyright?.holder) {
                            start += "<permissions>"
                            const year = copyright.year
                                ? copyright.year
                                : new Date().getFullYear()
                            start += `<copyright-year>${year}</copyright-year>`
                            start += `<copyright-holder>${(0,_common__rspack_import_1.escapeText)(copyright.holder)}</copyright-holder>`
                            if (copyright.freeToRead) {
                                start += "<ali:free_to_read/>"
                            }
                            start += copyright.licenses
                                .map(
                                    license =>
                                        `<license><ali:license_ref${license.start ? ` start_date="${license.start}"` : ""}>${(0,_common__rspack_import_1.escapeText)(license.url)}</ali:license_ref></license>`
                                )
                                .join("")
                            start += "</permissions>"
                        }
                        if (imageFilename) {
                            content += `<graphic position="anchor" xlink:href="${imageFilename}">`
                            content += `<alt-text>${(0,_common__rspack_import_1.escapeText)(caption.map(node => node.text || "").join("") || imageFilename)}</alt-text>`
                            content += "</graphic>"
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
                // Note: We ignore right/left/center aligned and table layout
                if (options.inFootnote) {
                    // only allows <p> block level elements https://jats.nlm.nih.gov/archiving/tag-library/1.2/element/fn.html
                    break
                }
                start += `<table-wrap id="${node.attrs.id}">`
                end = "</table-wrap>" + end
                const category = node.attrs.category
                if (category !== "none") {
                    if (!this.categoryCounter[category]) {
                        this.categoryCounter[category] = 0
                    }
                    const catCount = ++this.categoryCounter[category]
                    const catLabel = `${_schema_i18n__rspack_import_2.CATS[category][this.doc.settings.language]} ${catCount}`
                    start += `<label>${(0,_common__rspack_import_1.escapeText)(catLabel)}</label>`
                }
                const caption = node.attrs.caption
                    ? node.content[0].content || []
                    : []
                if (caption.length) {
                    start += `<caption><p>${caption.map(node => this.walkJson(node)).join("")}</p></caption>`
                }
                start += `<table width="${node.attrs.width}%"><tbody>`
                end = "</tbody></table>" + end
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
            case "equation": {
                start += "<inline-formula>"
                end = "</inline-formula>" + end
                const equationML = (0,mathlive__rspack_import_0.convertLatexToMathMl)(node.attrs.equation)
                content = `
                    <alternatives>
                        <tex-math><![CDATA[${node.attrs.equation}]]></tex-math>
                        <mml:math>${equationML}</mml:math>
                    </alternatives>
                `
                break
            }
            case "hard_break":
                // Forbidden inside of most elements. We only render it if explicitly allowed.
                // https://jats.nlm.nih.gov/publishing/tag-library/1.3/element/break.html
                if (options.breakAllowed) {
                    content += "<break />"
                } else {
                    content += " "
                }
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

    closeSections(targetLevel) {
        let returnValue = ""
        while (this.currentSectionLevel > targetLevel) {
            returnValue += "</sec>"
            this.currentSectionLevel--
        }

        return returnValue
    }

    assembleBody(docContent) {
        return `<body id="body">${this.walkJson(docContent) + this.closeSections(0)}</body>`
    }

    assembleBack() {
        let back = "<back>"
        if (this.footnotes.length) {
            back += `<fn-group>${this.footnotes.join("")}</fn-group>`
        }
        if (this.citations.jatsBib.length) {
            back += `<ref-list>${this.citations.jatsBib}</ref-list>`
        }
        back += "</back>"
        return back
    }
}


}),
"./js/modules/exporter/jats/index.js": (function (__unused_rspack_module, __webpack_exports__, __webpack_require__) {
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  JATSExporter: function() { return JATSExporter; }
});
/* import */ var downloadjs__rspack_import_0 = __webpack_require__("./node_modules/.pnpm/downloadjs@1.4.7/node_modules/downloadjs/download.js");
/* import */ var downloadjs__rspack_import_0_default = /*#__PURE__*/__webpack_require__.n(downloadjs__rspack_import_0);
/* import */ var pretty__rspack_import_1 = __webpack_require__("./node_modules/.pnpm/pretty@2.0.0/node_modules/pretty/index.js");
/* import */ var pretty__rspack_import_1_default = /*#__PURE__*/__webpack_require__.n(pretty__rspack_import_1);
/* import */ var _common__rspack_import_2 = __webpack_require__("./js/modules/common/index.js");
/* import */ var _tools_file__rspack_import_3 = __webpack_require__("./js/modules/exporter/tools/file.js");
/* import */ var _tools_zip__rspack_import_4 = __webpack_require__("./js/modules/exporter/tools/zip.js");
/* import */ var _convert__rspack_import_5 = __webpack_require__("./js/modules/exporter/jats/convert.js");
/* import */ var _templates__rspack_import_6 = __webpack_require__("./js/modules/exporter/jats/templates.js");








/*
 Exporter to JATS
*/

class JATSExporter {
    constructor(doc, bibDB, imageDB, csl, updated, type) {
        this.doc = doc
        this.docTitle = (0,_common__rspack_import_2.shortFileTitle)(this.doc.title, this.doc.path)
        this.bibDB = bibDB
        this.imageDB = imageDB
        this.csl = csl
        this.updated = updated
        this.type = type // "article", "book-part-wrapper" (for documents) or "book" (for document collections)

        this.zipFileName = false
        this.textFiles = []
        this.httpFiles = []
    }

    init() {
        const fileFormat = this.type === "article" ? "jats" : "bits"
        this.zipFileName = `${(0,_tools_file__rspack_import_3.createSlug)(this.docTitle)}.${fileFormat}.zip`
        this.converter = new _convert__rspack_import_5.JATSExporterConverter(
            this.type,
            this.doc,
            this.csl,
            this.imageDB,
            this.bibDB
        )
        return this.converter.init().then(({front, body, back, imageIds}) => {
            const jats =
                this.type === "article"
                    ? (0,_templates__rspack_import_6.articleTemplate)({front, body, back})
                    : (0,_templates__rspack_import_6.bookPartWrapperTemplate)({front, body, back})
            this.textFiles.push({
                filename: "manuscript.xml",
                contents: pretty__rspack_import_1_default()(jats, {ocd: true})
            })
            const images = imageIds.map(id => {
                const imageEntry = this.imageDB.db[id]
                return {
                    title: imageEntry.title,
                    filename: imageEntry.image.split("/").pop(),
                    url: imageEntry.image
                }
            })
            this.textFiles.push({
                filename: "manifest.xml",
                contents: pretty__rspack_import_1_default()(
                    (0,_templates__rspack_import_6.darManifest)({
                        title: this.docTitle,
                        type: this.type,
                        images
                    }),
                    {ocd: true}
                )
            })
            images.forEach(image => {
                this.httpFiles.push({filename: image.filename, url: image.url})
            })

            return this.createZip()
        })
    }

    createZip() {
        const zipper = new _tools_zip__rspack_import_4.ZipFileCreator(
            this.textFiles,
            this.httpFiles,
            undefined,
            undefined,
            this.updated
        )
        return zipper.init().then(blob => this.download(blob))
    }

    download(blob) {
        return downloadjs__rspack_import_0_default()(blob, this.zipFileName, "application/zip")
    }
}


}),
"./js/modules/exporter/jats/templates.js": (function (__unused_rspack_module, __webpack_exports__, __webpack_require__) {
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  articleTemplate: function() { return articleTemplate; },
  bookPartWrapperTemplate: function() { return bookPartWrapperTemplate; },
  darManifest: function() { return darManifest; }
});
/* import */ var _common__rspack_import_0 = __webpack_require__("./js/modules/common/index.js");


const articleTemplate = ({front, body, back}) =>
    `<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE article PUBLIC "-//NLM//DTD JATS (Z39.96) Journal Publishing DTD v1.3 20210610//EN" "https://jats.nlm.nih.gov/archiving/1.3/JATS-archivearticle1-3.dtd">
<article xmlns:xlink="http://www.w3.org/1999/xlink" xmlns:ali="http://www.niso.org/schemas/ali/1.0/" xmlns:mml="http://www.w3.org/1998/Math/MathML">${front}${body}${back}</article>`

const bookPartWrapperTemplate = ({front, body, back}) =>
    `<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE book-part-wrapper PUBLIC "-//NLM//DTD BITS Book Interchange DTD v2.1 20220202//EN" "https://jats.nlm.nih.gov/extensions/bits/2.1/BITS-book2-1.dtd">
<book-part-wrapper dtd-version="2.1" xmlns:xlink="http://www.w3.org/1999/xlink" xmlns:ali="http://www.niso.org/schemas/ali/1.0/">
    <book-part book-part-type="chapter" xmlns:xlink="http://www.w3.org/1999/xlink" xmlns:ali="http://www.niso.org/schemas/ali/1.0/" xmlns:mml="http://www.w3.org/1998/Math/MathML">${front}${body}${back}</book-part>
</book-part-wrapper>`

const darManifest = ({images, title, type}) =>
    (0,_common__rspack_import_0.noSpaceTmp)`<?xml version="1.0" encoding="UTF-8"?>
	<!DOCTYPE manifest PUBLIC "DarManifest 0.1.0" "http://darformat.org/DarManifest-0.1.0.dtd">
<dar>
    <!-- Generated by Fidus Writer -->
    <documents>
        <document id="manuscript" name="${(0,_common__rspack_import_0.escapeText)(title)}" type="${type}" path="manuscript.xml" />
    </documents>
    <assets>${images
        .map(
            image =>
                `<asset id="${image.filename.split(".")[0]}" mime-type="image/${
                    image.filename.split(".")[1] === "png"
                        ? "png"
                        : image.filename.split(".")[1] === "svg"
                          ? "svg+xml"
                          : "jpeg"
                }" name="${image.title}" path="${image.filename}"/>`
        )
        .join("")}</assets>
</dar>`


}),
"./js/modules/exporter/jats/text.js": (function (__unused_rspack_module, __webpack_exports__, __webpack_require__) {
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  convertText: function() { return convertText; },
  convertTexts: function() { return convertTexts; }
});
/* import */ var _common__rspack_import_0 = __webpack_require__("./js/modules/common/index.js");


function convertTexts(nodeList) {
    return nodeList.map(node => convertText(node)).join("")
}

function convertText(node) {
    let start = ""
    let end = ""
    let strong, em, underline, hyperlink, anchor, sup, sub, code
    // Check for hyperlink, bold/strong, italic/em and underline
    if (node.marks) {
        strong = node.marks.find(mark => mark.type === "strong")
        em = node.marks.find(mark => mark.type === "em")
        underline = node.marks.find(mark => mark.type === "underline")
        hyperlink = node.marks.find(mark => mark.type === "link")
        anchor = node.marks.find(mark => mark.type === "anchor")
        sup = node.marks.find(mark => mark.type === "sup")
        sub = node.marks.find(mark => mark.type === "sub")
        code = node.marks.find(mark => mark.type === "code")
    }
    let attrs = anchor ? ` id="${anchor.attrs.id}"` : ""
    if (em) {
        start += `<italic${attrs}>`
        end = "</italic>" + end
        attrs = ""
    }
    if (strong) {
        start += `<bold${attrs}>`
        end = "</bold>" + end
        attrs = ""
    }
    if (underline) {
        start += `<underline${attrs}>`
        end = "</underline>" + end
        attrs = ""
    }
    if (sup) {
        start += `<sup${attrs}>`
        end = "</sup>" + end
        attrs = ""
    }
    if (sub) {
        start += `<sub${attrs}>`
        end = "</sub>" + end
        attrs = ""
    }
    if (code) {
        start += `<monospace${attrs}>`
        end = "</monospace>" + end
        attrs = ""
    }
    if (hyperlink) {
        const href = hyperlink.attrs.href
        if (href[0] === "#") {
            // Internal link
            start += `<xref rid="${href.substring(1)}"${attrs}>`
            end = "</xref>" + end
        } else {
            // External link
            start += `<ext-link xlink:href="${(0,_common__rspack_import_0.escapeText)(href)}" ext-link-type="uri" xlink:title="${(0,_common__rspack_import_0.escapeText)(hyperlink.attrs.title)}"${attrs}>`
            end = "</ext-link>" + end
        }
        attrs = ""
    }
    if (attrs) {
        start += `<named-content${attrs}>`
        end = "</named-content>" + end
        attrs = ""
    }
    return start + (0,_common__rspack_import_0.escapeText)(node.text) + end
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