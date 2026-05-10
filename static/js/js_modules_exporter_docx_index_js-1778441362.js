"use strict";
(self["rspackChunkfidus_writer"] = self["rspackChunkfidus_writer"] || []).push([["js_modules_exporter_docx_index_js"], {
"./js/modules/exporter/docx/citations.js": (function (__unused_rspack_module, __webpack_exports__, __webpack_require__) {
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  DOCXExporterCitations: function() { return DOCXExporterCitations; }
});
/* import */ var prosemirror_model__rspack_import_4 = __webpack_require__("./node_modules/.pnpm/prosemirror-model@1.25.0/node_modules/prosemirror-model/dist/index.js");
/* import */ var _bibliography_schema_csl_bib__rspack_import_0 = __webpack_require__("./js/modules/bibliography/schema/csl_bib.js");
/* import */ var _citations_format__rspack_import_1 = __webpack_require__("./js/modules/citations/format.js");
/* import */ var _schema_footnotes__rspack_import_2 = __webpack_require__("./js/modules/schema/footnotes.js");
/* import */ var _tools_doc_content__rspack_import_3 = __webpack_require__("./js/modules/exporter/tools/doc_content.js");







class DOCXExporterCitations {
    constructor(docContent, settings, bibDB, csl, xml, origCitInfos = []) {
        this.docContent = docContent
        this.settings = settings
        this.bibDB = bibDB
        this.csl = csl
        this.xml = xml
        this.origCitInfos = origCitInfos

        this.citInfos = []
        this.citationTexts = []
        this.pmCits = []
        this.citFm = false
        this.pmBib = false
        this.styleXML = false
        this.styleFilePath = "word/styles.xml"
    }

    init() {
        return this.xml
            .getXml(this.styleFilePath)
            .then(styleXML => {
                this.styleXML = styleXML
                return Promise.resolve()
            })
            .then(() => this.formatCitations())
    }

    // Citations are highly interdependent -- so we need to format them all
    // together before laying out the document.
    formatCitations() {
        if (this.origCitInfos.length) {
            // Initial citInfos are taken from a previous run to include in bibliography,
            // and they are removed before spitting out the citation entries for the given document.
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
            this.settings.citationstyle,
            "",
            this.bibDB,
            false,
            this.settings.language
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
        let citationsHTML = ""
        this.citationTexts.forEach(ct => {
            citationsHTML += `<p>${ct}</p>`
        })

        if (citationsHTML.length) {
            // We create a standard body footnotecontainer node, add the citations into it, and parse it back.
            const fnNode = _schema_footnotes__rspack_import_2.fnSchema.nodeFromJSON({type: "footnotecontainer"})

            const serializer = prosemirror_model__rspack_import_4.DOMSerializer.fromSchema(_schema_footnotes__rspack_import_2.fnSchema)
            const dom = serializer.serializeNode(fnNode)
            dom.innerHTML = citationsHTML
            this.pmCits = prosemirror_model__rspack_import_4.DOMParser.fromSchema(_schema_footnotes__rspack_import_2.fnSchema)
                .parse(dom, {topNode: fnNode})
                .toJSON().content
        }

        // Now we do the same for the bibliography.
        const cslBib = this.citFm.bibliography
        if (cslBib && cslBib[1].length > 0) {
            this.addReferenceStyle(cslBib[0])
            const bibNode = _bibliography_schema_csl_bib__rspack_import_0.cslBibSchema.nodeFromJSON({type: "cslbib"})
            const cslSerializer = prosemirror_model__rspack_import_4.DOMSerializer.fromSchema(_bibliography_schema_csl_bib__rspack_import_0.cslBibSchema)
            const dom = cslSerializer.serializeNode(bibNode)
            dom.innerHTML = cslBib[1].join("")
            this.pmBib = prosemirror_model__rspack_import_4.DOMParser.fromSchema(_bibliography_schema_csl_bib__rspack_import_0.cslBibSchema)
                .parse(dom, {topNode: bibNode})
                .toJSON()
        }
    }

    addReferenceStyle(bibInfo) {
        const stylesEl = this.styleXML.query("w:styles")
        if (
            !this.styleXML.query("w:style", {
                "w:styleId": "BibliographyHeading"
            })
        ) {
            // There is no style definition for the bibliography heading. We have to add it.
            const headingStyleDef = `
                <w:style w:type="paragraph" w:styleId="BibliographyHeading">
                    <w:name w:val="Bibliography Heading"/>
                    <w:basedOn w:val="Heading"/>
                    <w:pPr>
                        <w:suppressLineNumbers/>
                        <w:ind w:left="0" w:hanging="0"/>
                    </w:pPr>
                    <w:rPr>
                        <w:b/>
                        <w:bCs/>
                        <w:sz w:val="32"/>
                        <w:szCs w:val="32"/>
                    </w:rPr>
                </w:style>`
            stylesEl.appendXML(headingStyleDef)
        }
        // The style called "Bibliography" will override any previous style
        // of the same name.
        const stylesParStyle = this.styleXML.query("w:style", {
            "w:styleId": "Bibliography"
        })
        if (stylesParStyle) {
            stylesParStyle.parentElement.removeChild(stylesParStyle)
        }

        const lineHeight = 240 * bibInfo.linespacing
        const marginBottom = 240 * bibInfo.entryspacing
        let marginLeft = 0,
            hangingIndent = 0,
            tabStops = ""

        if (bibInfo.hangingindent) {
            marginLeft = 720
            hangingIndent = 720
        } else if (bibInfo["second-field-align"]) {
            // We calculate 120 as roughly equivalent to one letter width.
            const firstFieldWidth = (bibInfo.maxoffset + 1) * 120
            if (bibInfo["second-field-align"] === "margin") {
                hangingIndent = firstFieldWidth
                tabStops =
                    '<w:tabs><w:tab w:val="left" w:pos="0" w:leader="none"/></w:tabs>'
            } else {
                hangingIndent = firstFieldWidth
                marginLeft = firstFieldWidth
                tabStops = `<w:tabs><w:tab w:val="left" w:pos="${firstFieldWidth}" w:leader="none"/></w:tabs>`
            }
        }
        const styleDef = `
            <w:style w:type="paragraph" w:styleId="Bibliography">
                <w:name w:val="Bibliography"/>
                <w:basedOn w:val="Normal"/>
                <w:qFormat/>
                <w:pPr>
                    ${tabStops}
                    <w:spacing w:lineRule="atLeast" w:line="${lineHeight}" w:before="0" w:after="${marginBottom}"/>
                    <w:ind w:left="${marginLeft}" w:hanging="${hangingIndent}"/>
                </w:pPr>
                <w:rPr></w:rPr>
            </w:style>`

        stylesEl.appendXML(styleDef)
    }
}


}),
"./js/modules/exporter/docx/comments.js": (function (__unused_rspack_module, __webpack_exports__, __webpack_require__) {
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  DOCXExporterComments: function() { return DOCXExporterComments; }
});
/* import */ var _common__rspack_import_0 = __webpack_require__("./js/modules/common/index.js");
/* import */ var _tools_doc_content__rspack_import_1 = __webpack_require__("./js/modules/exporter/tools/doc_content.js");



const DEFAULT_COMMENTS_XML = `<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
    <w:comments xmlns:o="urn:schemas-microsoft-com:office:office" xmlns:r="http://schemas.openxmlformats.org/officeDocument/2006/relationships" xmlns:v="urn:schemas-microsoft-com:vml" xmlns:w="http://schemas.openxmlformats.org/wordprocessingml/2006/main" xmlns:w10="urn:schemas-microsoft-com:office:word" xmlns:wp="http://schemas.openxmlformats.org/drawingml/2006/wordprocessingDrawing" xmlns:wps="http://schemas.microsoft.com/office/word/2010/wordprocessingShape" xmlns:wpg="http://schemas.microsoft.com/office/word/2010/wordprocessingGroup" xmlns:mc="http://schemas.openxmlformats.org/markup-compatibility/2006" xmlns:wp14="http://schemas.microsoft.com/office/word/2010/wordprocessingDrawing" xmlns:w14="http://schemas.microsoft.com/office/word/2010/wordml" xmlns:w15="http://schemas.microsoft.com/office/word/2012/wordml" mc:Ignorable="w14 wp14 w15">
    </w:comments>`

const DEFAULT_COMMENTS_EXTENDED_XML = `<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
    <w15:commentsEx xmlns:mc="http://schemas.openxmlformats.org/markup-compatibility/2006" xmlns:w15="http://schemas.microsoft.com/office/word/2012/wordml" mc:Ignorable="w15">
    </w15:commentsEx>`

class DOCXExporterComments {
    constructor(docContent, commentsDB, xml, rels, richtext) {
        this.docContent = docContent
        this.commentsDB = commentsDB
        this.xml = xml
        this.rels = rels
        this.richtext = richtext

        this.usedComments = []
        this.commentsXML = false
        this.commentsExtendedXML = false
        this.commentsFilePath = "word/comments.xml"
        this.commentsExtendedFilePath = "word/commentsExtended.xml"
        this.commentIdCounter = -1
    }

    init() {
        let useExtended = false
        ;(0,_tools_doc_content__rspack_import_1.descendantNodes)(this.docContent).forEach(node => {
            if (node.marks) {
                const comments = node.marks.filter(
                    mark => mark.type === "comment"
                )
                comments.forEach(comment => {
                    if (
                        !this.usedComments.includes(comment.attrs.id) &&
                        this.commentsDB[comment.attrs.id]
                    ) {
                        this.usedComments.push(comment.attrs.id)
                        if (
                            this.commentsDB[comment.attrs.id].resolved ||
                            this.commentsDB[comment.attrs.id].answers?.length
                        ) {
                            useExtended = true
                        }
                    }
                })
            }
        })
        if (!this.usedComments.length) {
            return Promise.resolve()
        }
        this.rels.addCommentsRel()
        const addCommentXMLs = [
            this.xml
                .getXml(this.commentsFilePath, DEFAULT_COMMENTS_XML)
                .then(commentsXML => (this.commentsXML = commentsXML))
        ]
        if (useExtended) {
            this.rels.addCommentsExtendedRel()
            addCommentXMLs.push(
                this.xml
                    .getXml(
                        this.commentsExtendedFilePath,
                        DEFAULT_COMMENTS_EXTENDED_XML
                    )
                    .then(
                        commentsExtendedXML =>
                            (this.commentsExtendedXML = commentsExtendedXML)
                    )
            )
        }
        return Promise.all(addCommentXMLs).then(() => {
            this.commentsXML.queryAll("w:comment").forEach(el => {
                const id = Number.parseInt(el.getAttribute("w:id"))
                if (id > this.commentIdCounter) {
                    this.commentIdCounter = id
                }
            })
            return this.exportComments()
        })
    }

    addComment(id) {
        const commentId = ++this.commentIdCounter
        this.richtext.comments[id] = commentId
        const commentDBEntry = this.commentsDB[id]
        const comments = this.commentsXML.query("w:comments")
        let string = `<w:comment w:id="${commentId}" w:author="${(0,_common__rspack_import_0.escapeText)(commentDBEntry.username)}" w:date="${new Date(commentDBEntry.date).toISOString().split(".")[0]}Z" w:initials="${(0,_common__rspack_import_0.escapeText)(
            commentDBEntry.username
                .split(" ")
                .map(n => n[0])
                .join("")
                .toUpperCase()
        )}">`
        let parentParagraphId = ""
        string += commentDBEntry.comment
            .map((node, index) => {
                const options = {section: "CommentText"}
                if (
                    (commentDBEntry.resolved ||
                        commentDBEntry.answers?.length) &&
                    index === commentDBEntry.comment.length - 1
                ) {
                    // If comment has been resolved or there are answers, we need to add an id to the last paragraph
                    // of the comment and add an entry into commentsExtended.xml.
                    parentParagraphId = (++this.richtext.paragraphIdCounter)
                        .toString(16)
                        .padStart(8, "0")
                    options.paragraphId = parentParagraphId
                    const extendedString = `<w15:commentEx w15:paraId="${parentParagraphId}" w15:done="${commentDBEntry.resolved ? "1" : "0"}"/>`
                    const extendedComments =
                        this.commentsExtendedXML.query("w15:commentsEx")
                    extendedComments.appendXML(extendedString)
                }
                if (!index) {
                    options.commentReference = true
                }
                return this.richtext.transformRichtext(node, options)
            })
            .join("")
        string += "</w:comment>"
        commentDBEntry.answers?.forEach(answer => {
            const answerId = ++this.commentIdCounter
            string += `<w:comment w:id="${answerId}" w:author="${(0,_common__rspack_import_0.escapeText)(answer.username)}" w:date="${new Date(answer.date).toISOString().split(".")[0]}Z" w:initials="${(0,_common__rspack_import_0.escapeText)(
                answer.username
                    .split(" ")
                    .map(n => n[0])
                    .join("")
                    .toUpperCase()
            )}">`
            string += answer.answer
                .map((node, index) => {
                    const options = {section: "CommentText"}
                    if (index === answer.answer.length - 1) {
                        // We need to add an id to the last paragraph of the comment and add an entry
                        // into commentsExtended.xml pointing to the last paragraph of the parent comment.
                        const paragraphId = (++this.richtext.paragraphIdCounter)
                            .toString(16)
                            .padStart(8, "0")
                        options.paragraphId = paragraphId
                        const extendedString = `<w15:commentEx w15:paraId="${paragraphId}" w15:done="${commentDBEntry.resolved ? "1" : "0"}" w15:paraIdParent="${parentParagraphId}"/>`
                        const extendedComments =
                            this.commentsExtendedXML.query("w15:commentsEx")
                        extendedComments.appendXML(extendedString)
                    }
                    if (!index) {
                        options.commentReference = true
                    }
                    return this.richtext.transformRichtext(node, options)
                })
                .join("")
            string += "</w:comment>"
        })
        comments.appendXML(string)
    }

    exportComments() {
        this.usedComments.forEach(comment => {
            this.addComment(comment)
        })
        return Promise.resolve()
    }
}


}),
"./js/modules/exporter/docx/footnotes.js": (function (__unused_rspack_module, __webpack_exports__, __webpack_require__) {
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  DOCXExporterFootnotes: function() { return DOCXExporterFootnotes; }
});
/* import */ var _tools_doc_content__rspack_import_0 = __webpack_require__("./js/modules/exporter/tools/doc_content.js");
/* import */ var _citations__rspack_import_1 = __webpack_require__("./js/modules/exporter/docx/citations.js");
/* import */ var _images__rspack_import_2 = __webpack_require__("./js/modules/exporter/docx/images.js");
/* import */ var _lists__rspack_import_3 = __webpack_require__("./js/modules/exporter/docx/lists.js");
/* import */ var _rels__rspack_import_4 = __webpack_require__("./js/modules/exporter/docx/rels.js");
/* import */ var _richtext__rspack_import_5 = __webpack_require__("./js/modules/exporter/docx/richtext.js");







const DEFAULT_XML = `<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
    <w:footnotes xmlns:o="urn:schemas-microsoft-com:office:office" xmlns:r="http://schemas.openxmlformats.org/officeDocument/2006/relationships" xmlns:v="urn:schemas-microsoft-com:vml" xmlns:w="http://schemas.openxmlformats.org/wordprocessingml/2006/main" xmlns:w10="urn:schemas-microsoft-com:office:word" xmlns:wp="http://schemas.openxmlformats.org/drawingml/2006/wordprocessingDrawing" xmlns:wps="http://schemas.microsoft.com/office/word/2010/wordprocessingShape" xmlns:wpg="http://schemas.microsoft.com/office/word/2010/wordprocessingGroup" xmlns:mc="http://schemas.openxmlformats.org/markup-compatibility/2006" xmlns:wp14="http://schemas.microsoft.com/office/word/2010/wordprocessingDrawing" xmlns:w14="http://schemas.microsoft.com/office/word/2010/wordml" mc:Ignorable="w14 wp14">
        <w:footnote w:id="0" w:type="separator">
            <w:p>
                <w:r>
                    <w:separator />
                </w:r>
            </w:p>
        </w:footnote>
        <w:footnote w:id="1" w:type="continuationSeparator">
            <w:p>
                <w:r>
                    <w:continuationSeparator />
                </w:r>
            </w:p>
        </w:footnote>
    </w:footnotes>`

const DEFAULT_SETTINGS_XML = `<w:footnotePr>
        <w:numFmt w:val="decimal"/>
        <w:footnote w:id="0"/>
        <w:footnote w:id="1"/>
    </w:footnotePr>`

const DEFAULT_STYLE_FOOTNOTE = `<w:style w:type="paragraph" w:styleId="Footnote">
        <w:name w:val="Footnote Text" />
        <w:basedOn w:val="Normal" />
        <w:pPr>
            <w:suppressLineNumbers />
            <w:ind w:left="339" w:hanging="339" />
        </w:pPr>
        <w:rPr>
            <w:sz w:val="20" />
            <w:szCs w:val="20" />
        </w:rPr>
    </w:style>`

const DEFAULT_STYLE_FOOTNOTE_ANCHOR = `
    <w:style w:type="character" w:styleId="FootnoteAnchor">
        <w:name w:val="Footnote Anchor" />
        <w:rPr>
            <w:vertAlign w:val="superscript" />
        </w:rPr>
    </w:style>
    `

class DOCXExporterFootnotes {
    constructor(
        doc,
        docContent,
        settings,
        imageDB,
        bibDB,
        xml,
        citations,
        csl,
        lists,
        math,
        tables,
        rels
    ) {
        this.doc = doc
        this.docContent = docContent
        this.settings = settings
        this.imageDB = imageDB
        this.bibDB = bibDB
        this.xml = xml
        this.citations = citations
        this.csl = csl
        this.lists = lists
        this.math = math
        this.tables = tables
        this.rels = rels

        this.pmBib = false
        this.fnPmJSON = false
        this.images = false
        this.augmentedCitations = false
        this.footnotes = [] // footnotes
        this.fnXML = false
        this.ctXML = false
        this.styleXML = false
        this.filePath = "word/footnotes.xml"
        this.ctFilePath = "[Content_Types].xml"
        this.settingsFilePath = "word/settings.xml"
        this.styleFilePath = "word/styles.xml"
    }

    init() {
        this.findFootnotes()
        if (
            this.footnotes.length ||
            (this.citations.citFm.citationType === "note" &&
                this.citations.citInfos.length)
        ) {
            this.convertFootnotes()
            this.fnRels = new _rels__rspack_import_4.DOCXExporterRels(this.xml, "footnotes")
            // Include the citinfos from the main body document so that they will be
            // used for calculating the bibliography as well
            this.augmentedCitations = new _citations__rspack_import_1.DOCXExporterCitations(
                this.fnPmJSON,
                this.settings,
                this.bibDB,
                this.csl,
                this.xml,
                this.citations.citInfos
            )

            this.images = new _images__rspack_import_2.DOCXExporterImages(
                this.fnPmJSON,
                this.imageDB,
                this.xml,
                this.fnRels
            )
            this.lists = new _lists__rspack_import_3.DOCXExporterLists(
                this.fnPmJSON,
                this.xml,
                this.fnRels
            )

            return this.augmentedCitations
                .init()
                .then(() => {
                    // Replace the main bibliography with the new one that
                    // includes both citations in main document
                    // and in the footnotes.
                    this.pmBib = this.augmentedCitations.pmBib
                    return this.fnRels.init()
                })
                .then(() => this.images.init())
                .then(() => this.lists.init())
                .then(() => this.initCt())
                .then(() => this.setSettings())
                .then(() => this.addStyles())
                .then(() => this.createXml())
        } else {
            // No footnotes were found.
            return Promise.resolve()
        }
    }

    initCt() {
        return this.xml.getXml(this.ctFilePath).then(ctXML => {
            this.ctXML = ctXML
            this.addRelsToCt()
            return Promise.resolve()
        })
    }

    addRelsToCt() {
        const override = this.ctXML.query("Override", {
            PartName: `/${this.filePath}`
        })
        if (!override) {
            const types = this.ctXML.query("Types")
            types.appendXML(
                `<Override PartName="/${this.filePath}" ContentType="application/vnd.openxmlformats-officedocument.wordprocessingml.footnotes+xml"/>`
            )
        }
    }

    addStyles() {
        return this.xml.getXml(this.styleFilePath).then(styleXML => {
            this.styleXML = styleXML
            this.addStyle("Footnote", DEFAULT_STYLE_FOOTNOTE)
            this.addStyle("FootnoteAnchor", DEFAULT_STYLE_FOOTNOTE_ANCHOR)
            return Promise.resolve()
        })
    }

    addStyle(styleName, xml) {
        if (!this.styleXML.query("w:style", {"w:styleId": styleName})) {
            const stylesEl = this.styleXML.query("w:styles")
            stylesEl.appendXML(xml)
        }
    }

    findFootnotes() {
        (0,_tools_doc_content__rspack_import_0.descendantNodes)(this.docContent).forEach(node => {
            if (node.type === "footnote") {
                this.footnotes.push(node.attrs.footnote)
            }
        })
    }

    convertFootnotes() {
        const fnContent = []
        this.footnotes.forEach(footnote => {
            fnContent.push({
                type: "footnotecontainer",
                content: footnote
            })
        })
        this.fnPmJSON = {
            type: "doc",
            content: fnContent
        }
    }

    createXml() {
        this.richtext = new _richtext__rspack_import_5.DOCXExporterRichtext(
            this.doc,
            this.lists,
            this,
            this.settings,
            this.math,
            this.tables,
            this.fnRels,
            this.augmentedCitations,
            this.images
        )
        this.fnXML = this.richtext.transformRichtext(this.fnPmJSON)
        // TODO: add max dimensions
        this.rels.addFootnoteRel()
        return this.xml.getXml(this.filePath, DEFAULT_XML).then(xml => {
            const footnotesEl = xml.query("w:footnotes")
            footnotesEl.appendXML(this.fnXML)
            this.xml = xml
        })
    }

    setSettings() {
        return this.xml.getXml(this.settingsFilePath).then(settingsXML => {
            const footnotePr = settingsXML.query("w:footnotePr")
            if (!footnotePr) {
                const settingsEl = settingsXML.query("w:settings")
                settingsEl.appendXML(DEFAULT_SETTINGS_XML)
            }
            this.settingsXML = settingsXML
            return Promise.resolve()
        })
    }
}


}),
"./js/modules/exporter/docx/images.js": (function (__unused_rspack_module, __webpack_exports__, __webpack_require__) {
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  DOCXExporterImages: function() { return DOCXExporterImages; }
});
/* import */ var _common__rspack_import_0 = __webpack_require__("./js/modules/common/index.js");
/* import */ var _tools_doc_content__rspack_import_1 = __webpack_require__("./js/modules/exporter/tools/doc_content.js");
/* import */ var _tools_svg__rspack_import_2 = __webpack_require__("./js/modules/exporter/tools/svg.js");




class DOCXExporterImages {
    constructor(docContent, imageDB, xml, rels) {
        this.docContent = docContent
        this.imageDB = imageDB
        this.xml = xml
        this.rels = rels

        this.images = {}
        this.ctXML = false
    }

    init() {
        return this.xml.getXml("[Content_Types].xml").then(ctXML => {
            this.ctXML = ctXML
            return this.exportImages()
        })
    }

    // add an image to the list of files
    addImage(imgFileName, image) {
        const rId = this.rels.addImageRel(imgFileName)
        this.addContentType(imgFileName.split(".").pop())
        this.xml.addExtraFile(`word/media/${imgFileName}`, image)
        return rId
    }

    // add a global contenttype declaration for an image type (if needed)
    addContentType(fileEnding) {
        const types = this.ctXML.query("Types")
        const contentDec = types.query("Default", {Extension: fileEnding})
        if (!contentDec) {
            const string = `<Default ContentType="image/${fileEnding}" Extension="${fileEnding}"/>`
            types.appendXML(string)
        }
    }

    // Find all images used in file and add these to the export zip.
    // TODO: This will likely fail on image types docx doesn't support such as SVG.
    // Try out and fix.
    exportImages() {
        const usedImgs = []
        ;(0,_tools_doc_content__rspack_import_1.descendantNodes)(this.docContent).forEach(node => {
            if (node.type === "image" && node.attrs.image !== false) {
                if (!usedImgs.includes(node.attrs.image)) {
                    usedImgs.push(node.attrs.image)
                }
            }
        })
        return new Promise(resolveExportImages => {
            const p = []
            usedImgs.forEach(image => {
                const imgDBEntry = this.imageDB.db[image]
                p.push(
                    (0,_common__rspack_import_0.get)(imgDBEntry.image)
                        .then(response => response.blob())
                        .then(blob => {
                            if (blob.type === "image/svg+xml") {
                                // DOCX doesn't support SVG. Convert to PNG.
                                return (0,_tools_svg__rspack_import_2.svg2png)(blob).then(
                                    ({blob: pngBlob, width, height}) => {
                                        const wImgId = this.addImage(
                                            imgDBEntry.image
                                                .split("/")
                                                .pop()
                                                .replace(/.svg$/g, ".png"),
                                            pngBlob
                                        )
                                        this.images[image] = {
                                            id: wImgId,
                                            width,
                                            height,
                                            title: imgDBEntry.title
                                        }
                                    }
                                )
                            } else {
                                const wImgId = this.addImage(
                                    imgDBEntry.image.split("/").pop(),
                                    blob
                                )
                                this.images[image] = {
                                    id: wImgId,
                                    width: imgDBEntry.width,
                                    height: imgDBEntry.height,
                                    title: imgDBEntry.title
                                }
                            }
                        })
                )
            })

            Promise.all(p).then(() => {
                resolveExportImages()
            })
        })
    }
}


}),
"./js/modules/exporter/docx/index.js": (function (__unused_rspack_module, __webpack_exports__, __webpack_require__) {
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  DOCXExporter: function() { return DOCXExporter; }
});
/* import */ var downloadjs__rspack_import_0 = __webpack_require__("./node_modules/.pnpm/downloadjs@1.4.7/node_modules/downloadjs/download.js");
/* import */ var downloadjs__rspack_import_0_default = /*#__PURE__*/__webpack_require__.n(downloadjs__rspack_import_0);
/* import */ var _common__rspack_import_1 = __webpack_require__("./js/modules/common/index.js");
/* import */ var _tools_doc_content__rspack_import_2 = __webpack_require__("./js/modules/exporter/tools/doc_content.js");
/* import */ var _tools_file__rspack_import_3 = __webpack_require__("./js/modules/exporter/tools/file.js");
/* import */ var _tools_xml_zip__rspack_import_4 = __webpack_require__("./js/modules/exporter/tools/xml_zip.js");
/* import */ var _citations__rspack_import_5 = __webpack_require__("./js/modules/exporter/docx/citations.js");
/* import */ var _comments__rspack_import_6 = __webpack_require__("./js/modules/exporter/docx/comments.js");
/* import */ var _footnotes__rspack_import_7 = __webpack_require__("./js/modules/exporter/docx/footnotes.js");
/* import */ var _images__rspack_import_8 = __webpack_require__("./js/modules/exporter/docx/images.js");
/* import */ var _lists__rspack_import_9 = __webpack_require__("./js/modules/exporter/docx/lists.js");
/* import */ var _math__rspack_import_10 = __webpack_require__("./js/modules/exporter/docx/math.js");
/* import */ var _metadata__rspack_import_11 = __webpack_require__("./js/modules/exporter/docx/metadata.js");
/* import */ var _rels__rspack_import_12 = __webpack_require__("./js/modules/exporter/docx/rels.js");
/* import */ var _render__rspack_import_13 = __webpack_require__("./js/modules/exporter/docx/render.js");
/* import */ var _richtext__rspack_import_14 = __webpack_require__("./js/modules/exporter/docx/richtext.js");
/* import */ var _tables__rspack_import_15 = __webpack_require__("./js/modules/exporter/docx/tables.js");
/* import */ var _tools__rspack_import_16 = __webpack_require__("./js/modules/exporter/docx/tools.js");



















/*
Exporter to Office Open XML docx (Microsoft Word)
*/

/*
TODO:
* - Remove comments
* - Export document language
* - Templating of tag/contributor output
*/

class DOCXExporter {
    constructor(doc, templateUrl, bibDB, imageDB, csl) {
        this.doc = doc
        this.templateUrl = templateUrl
        this.bibDB = bibDB
        this.imageDB = imageDB
        this.csl = csl

        this.docTitle = (0,_common__rspack_import_1.shortFileTitle)(this.doc.title, this.doc.path)
        this.mimeType =
            "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
        this.docContent = (0,_tools__rspack_import_16.moveFootnoteComments)(
            (0,_tools_doc_content__rspack_import_2.fixTables)((0,_tools_doc_content__rspack_import_2.removeHidden)(this.doc.content))
        )
    }

    init() {
        const xml = new _tools_xml_zip__rspack_import_4.XmlZip(this.templateUrl, this.mimeType)

        const tables = new _tables__rspack_import_15.DOCXExporterTables(xml)
        const math = new _math__rspack_import_10.DOCXExporterMath(xml)
        const render = new _render__rspack_import_13.DOCXExporterRender(xml)
        const rels = new _rels__rspack_import_12.DOCXExporterRels(xml, "document")
        const metadata = new _metadata__rspack_import_11.DOCXExporterMetadata(
            xml,
            this.getBaseMetadata(),
            this.csl
        )

        const images = new _images__rspack_import_8.DOCXExporterImages(
            this.docContent,
            this.imageDB,
            xml,
            rels
        )
        const lists = new _lists__rspack_import_9.DOCXExporterLists(this.docContent, xml, rels)
        const citations = new _citations__rspack_import_5.DOCXExporterCitations(
            this.docContent,
            this.doc.settings,
            this.bibDB,
            this.csl,
            xml
        )

        const footnotes = new _footnotes__rspack_import_7.DOCXExporterFootnotes(
            this.doc,
            this.docContent,
            this.doc.settings,
            this.imageDB,
            this.bibDB,
            xml,
            citations,
            this.csl,
            lists,
            math,
            tables,
            rels
        )

        const richtext = new _richtext__rspack_import_14.DOCXExporterRichtext(
            this.doc,
            this.doc.settings,
            lists,
            footnotes,
            math,
            tables,
            rels,
            citations,
            images
        )

        const comments = new _comments__rspack_import_6.DOCXExporterComments(
            this.docContent,
            this.doc.comments,
            xml,
            rels,
            richtext
        )

        return xml
            .init()
            .then(() => citations.init())
            .then(() => metadata.init())
            .then(() => tables.init())
            .then(() => math.init())
            .then(() => render.init())
            .then(() => rels.init())
            .then(() => images.init())
            .then(() => comments.init())
            .then(() => lists.init())
            .then(() => footnotes.init())
            .then(() => {
                const pmBib = footnotes.pmBib || citations.pmBib
                render.render(
                    this.docContent,
                    pmBib,
                    this.doc.settings,
                    richtext,
                    citations
                )
                return xml.prepareBlob()
            })
            .then(blob => this.download(blob))
    }

    download(blob) {
        return downloadjs__rspack_import_0_default()(
            blob,
            (0,_tools_file__rspack_import_3.createSlug)(this.docTitle) + ".docx",
            this.mimeType
        )
    }

    getBaseMetadata() {
        return {
            authors: this.docContent.content.reduce((authors, part) => {
                if (
                    part.type === "contributors_part" &&
                    part.attrs.metadata === "authors" &&
                    part.content
                ) {
                    return authors.concat(
                        part.content.map(authorNode => authorNode.attrs)
                    )
                } else {
                    return authors
                }
            }, []),
            keywords: this.docContent.content.reduce((keywords, part) => {
                if (
                    part.type === "tags_part" &&
                    part.attrs.metadata === "keywords" &&
                    part.content
                ) {
                    return keywords.concat(
                        part.content.map(keywordNode => keywordNode.attrs.tag)
                    )
                } else {
                    return keywords
                }
            }, []),
            title: (0,_tools_doc_content__rspack_import_2.textContent)(this.docContent.content[0]),
            language: this.doc.settings.language,
            citationStyle: this.doc.settings.citationstyle
        }
    }
}


}),
"./js/modules/exporter/docx/lists.js": (function (__unused_rspack_module, __webpack_exports__, __webpack_require__) {
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  DOCXExporterLists: function() { return DOCXExporterLists; }
});
/* import */ var _tools_doc_content__rspack_import_0 = __webpack_require__("./js/modules/exporter/tools/doc_content.js");


const DEFAULT_LISTPARAGRAPH_XML = `
    <w:style w:type="paragraph" w:styleId="ListParagraph">
    <w:name w:val="List Paragraph"/>
    <w:basedOn w:val="Normal"/>
    <w:uiPriority w:val="34"/>
    <w:qFormat/>
    <w:rsid w:val="006E68A6"/>
    <w:pPr>
      <w:ind w:left="720"/>
      <w:contextualSpacing/>
    </w:pPr>
    </w:style>
    `

const DEFAULT_NUMBERING_XML = `<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
    <w:numbering xmlns:wpc="http://schemas.microsoft.com/office/word/2010/wordprocessingCanvas" xmlns:cx="http://schemas.microsoft.com/office/drawing/2014/chartex" xmlns:cx1="http://schemas.microsoft.com/office/drawing/2015/9/8/chartex" xmlns:cx2="http://schemas.microsoft.com/office/drawing/2015/10/21/chartex" xmlns:cx3="http://schemas.microsoft.com/office/drawing/2016/5/9/chartex" xmlns:cx4="http://schemas.microsoft.com/office/drawing/2016/5/10/chartex" xmlns:cx5="http://schemas.microsoft.com/office/drawing/2016/5/11/chartex" xmlns:cx6="http://schemas.microsoft.com/office/drawing/2016/5/12/chartex" xmlns:cx7="http://schemas.microsoft.com/office/drawing/2016/5/13/chartex" xmlns:cx8="http://schemas.microsoft.com/office/drawing/2016/5/14/chartex" xmlns:mc="http://schemas.openxmlformats.org/markup-compatibility/2006" xmlns:aink="http://schemas.microsoft.com/office/drawing/2016/ink" xmlns:o="urn:schemas-microsoft-com:office:office" xmlns:r="http://schemas.openxmlformats.org/officeDocument/2006/relationships" xmlns:m="http://schemas.openxmlformats.org/officeDocument/2006/math" xmlns:v="urn:schemas-microsoft-com:vml" xmlns:wp14="http://schemas.microsoft.com/office/word/2010/wordprocessingDrawing" xmlns:wp="http://schemas.openxmlformats.org/drawingml/2006/wordprocessingDrawing" xmlns:w10="urn:schemas-microsoft-com:office:word" xmlns:w="http://schemas.openxmlformats.org/wordprocessingml/2006/main" xmlns:w14="http://schemas.microsoft.com/office/word/2010/wordml" xmlns:w15="http://schemas.microsoft.com/office/word/2012/wordml" xmlns:w16se="http://schemas.microsoft.com/office/word/2015/wordml/symex" xmlns:wpg="http://schemas.microsoft.com/office/word/2010/wordprocessingGroup" xmlns:wpi="http://schemas.microsoft.com/office/word/2010/wordprocessingInk" xmlns:wne="http://schemas.microsoft.com/office/word/2006/wordml" xmlns:wps="http://schemas.microsoft.com/office/word/2010/wordprocessingShape" mc:Ignorable="w14 w15 w16se wp14">
    </w:numbering>`

class DOCXExporterLists {
    constructor(docContent, xml, rels) {
        this.docContent = docContent
        this.xml = xml
        this.rels = rels
        this.useBulletList = false
        this.usedNumberedList = []
        this.styleXML = false
        this.numberingXML = false
        this.abstractNumIdCounter = -1
        this.numIdCounter = -1
        // We only need one bulletType for all bullet lists, but a new
        // numberedType for each numbered list so that the numbering starts in 1
        // each time.
        this.bulletType = false
        this.numberFormat = "decimal"
        this.numberedTypes = []
        this.styleFilePath = "word/styles.xml"
        this.numberingFilePath = "word/numbering.xml"
        this.ctFilePath = "[Content_Types].xml"
    }

    init() {
        this.findLists()
        if (this.usedNumberedList.length > 0 || this.useBulletList) {
            const p = []

            p.push(
                new Promise(resolve => {
                    this.initCt().then(() => resolve())
                })
            )

            p.push(
                new Promise(resolve => {
                    this.addNumberingXml().then(() => resolve())
                })
            )

            p.push(
                new Promise(resolve => {
                    this.addListParagraphStyle().then(() => resolve())
                })
            )
            return Promise.all(p)
        } else {
            return Promise.resolve()
        }
    }

    initCt() {
        return this.xml.getXml(this.ctFilePath).then(ctXML => {
            this.ctXML = ctXML
            this.addRelsToCt()
            return Promise.resolve()
        })
    }

    addRelsToCt() {
        const override = this.ctXML.query("Override", {
            PartName: `/${this.numberingFilePath}`
        })
        if (!override) {
            const types = this.ctXML.query("Types")
            types.appendXML(
                `<Override PartName="/${this.numberingFilePath}" ContentType="application/vnd.openxmlformats-officedocument.wordprocessingml.numbering+xml"/>`
            )
        }
    }

    findLists() {
        (0,_tools_doc_content__rspack_import_0.descendantNodes)(this.docContent).forEach(node => {
            if (node.type === "bullet_list") {
                this.useBulletList = true
            } else if (node.type === "ordered_list") {
                this.usedNumberedList.push(node.attrs.order)
            }
        })
    }

    addNumberingXml() {
        return this.xml
            .getXml(this.numberingFilePath, DEFAULT_NUMBERING_XML)
            .then(numberingXML => {
                this.numberingXML = numberingXML
                this.rels.addNumberingRel()
                this.addUsedListTypes()
                return Promise.resolve()
            })
    }

    addListParagraphStyle() {
        return this.xml.getXml(this.styleFilePath).then(styleXML => {
            this.styleXML = styleXML
            if (
                !this.styleXML.query("w:style", {"w:styleId": "ListParagraph"})
            ) {
                const stylesEl = this.styleXML.query("w:styles")
                stylesEl.appendXML(DEFAULT_LISTPARAGRAPH_XML)
            }
            return Promise.resolve()
        })
    }

    addUsedListTypes() {
        const allAbstractNum = this.numberingXML.queryAll("w:abstractNum")
        allAbstractNum.forEach(abstractNum => {
            // We check the format for the lowest level list and use the first
            // one we find  for 'bullet' or 'not bullet'
            // This means that if a list is defined using anything else than
            // bullets, it will be accepted as the format of
            // the numeric list.
            const levelZeroFormat = abstractNum
                .query("w:lvl", {"w:ilvl": "0"})
                .query("w:numFmt")
                .getAttribute("w:val")
            const abstractNumId = Number.parseInt(
                abstractNum.getAttribute("w:abstractNumId")
            )
            if (levelZeroFormat === "bullet" && !this.bulletAbstractType) {
                const numEl = this.numberingXML.query("w:abstractNumId", {
                    "w:val": abstractNumId
                }).parentElement
                const numId = Number.parseInt(numEl.getAttribute("w:numId"))
                this.bulletType = numId
            } else if (levelZeroFormat !== "bullet" && !this.numberFormat) {
                this.numberFormat = levelZeroFormat
            }
            if (this.abstractNumIdCounter < abstractNumId) {
                this.abstractNumIdCounter = abstractNumId
            }
        })
        const allNum = this.numberingXML.queryAll("w:num")
        allNum.forEach(numEl => {
            const numId = Number.parseInt(numEl.getAttribute("w:val"))
            if (this.numIdCounter < numId) {
                this.numIdCounter = numId
            }
        })

        if (!this.bulletType && this.useBulletList) {
            this.addBulletNumType(
                ++this.numIdCounter,
                ++this.abstractNumIdCounter
            )
            this.bulletType = this.numIdCounter
        }
        if (this.usedNumberedList.length > 0) {
            this.abstractNumIdCounter++

            this.numberedAbstractType = this.abstractNumIdCounter
        }
        for (let i = 0; i < this.usedNumberedList.length; i++) {
            const numId = ++this.numIdCounter
            this.addNumberedNumType(numId, this.usedNumberedList[i])
            this.numberedTypes.push(numId)
        }
    }

    getBulletType() {
        return this.bulletType
    }

    getNumberedType() {
        return this.numberedTypes.shift()
    }

    addBulletNumType(numId, abstractNumId) {
        const numberingEl = this.numberingXML.query("w:numbering")
        numberingEl.appendXML(`
            <w:abstractNum w:abstractNumId="${abstractNumId}" w15:restartNumberingAfterBreak="0">
                <w:nsid w:val="3620195A" />
                <w:multiLevelType w:val="hybridMultilevel" />
                <w:tmpl w:val="A74C9E6A" />
            </w:abstractNum>
            <w:num w:numId="${numId}">
                <w:abstractNumId w:val="${abstractNumId}" />
            </w:num>
        `)
        const newAbstractNum = this.numberingXML.query("w:abstractNum", {
            "w:abstractNumId": String(abstractNumId)
        })
        // Definition seem to always define 9 levels (0-8).
        for (let level = 0; level < 9; level++) {
            newAbstractNum.appendXML(`
                <w:lvl w:ilvl="${level}" w:tplc="04090001" w:tentative="1">
                    <w:start w:val="1" />
                    <w:numFmt w:val="bullet" />
                    <w:lvlText w:val="" />
                    <w:lvlJc w:val="left" />
                    <w:pPr>
                        <w:ind w:left="${(level + 1) * 720}" w:hanging="360" />
                    </w:pPr>
                    <w:rPr>
                        <w:rFonts w:ascii="Symbol" w:hAnsi="Symbol" w:hint="default" />
                    </w:rPr>
                </w:lvl>
            `)
        }
    }

    addNumberedNumType(numId, start) {
        this.abstractNumIdCounter++
        this.addNumberedAbstractNumType(this.abstractNumIdCounter, start)
        const numberingEl = this.numberingXML.query("w:numbering")
        numberingEl.appendXML(`
            <w:num w:numId="${numId}">
                <w:abstractNumId w:val="${this.abstractNumIdCounter}" />
            </w:num>
        `)
    }

    addNumberedAbstractNumType(abstractNumId, start) {
        const numberingEl = this.numberingXML.query("w:numbering")
        numberingEl.appendXML(`
            <w:abstractNum w:abstractNumId="${abstractNumId}" w15:restartNumberingAfterBreak="0">
                <w:nsid w:val="7F6635F3" />
                <w:multiLevelType w:val="hybridMultilevel" />
                <w:tmpl w:val="BFFEF214" />
            </w:abstractNum>
        `)
        const newAbstractNum = this.numberingXML.query("w:abstractNum", {
            "w:abstractNumId": String(abstractNumId)
        })
        // Definition seem to always define 9 levels (0-8).
        for (let level = 0; level < 9; level++) {
            newAbstractNum.appendXML(`
                <w:lvl w:ilvl="${level}" w:tplc="0409000F">
                    <w:start w:val="${start}" />
                    <w:numFmt w:val="${this.numberFormat}" />
                    <w:lvlText w:val="%${level + 1}." />
                    <w:lvlJc w:val="left" />
                    <w:pPr>
                        <w:ind w:left="${(level + 1) * 720}" w:hanging="360" />
                    </w:pPr>
                </w:lvl>
            `)
        }
    }
}


}),
"./js/modules/exporter/docx/math.js": (function (__unused_rspack_module, __webpack_exports__, __webpack_require__) {
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  DOCXExporterMath: function() { return DOCXExporterMath; }
});
/* import */ var mathml2omml__rspack_import_0 = __webpack_require__("./node_modules/.pnpm/mathml2omml@0.5.0/node_modules/mathml2omml/dist/index.js");


// Not entirely sure if we need this font here. This is included whenever Word
// itself adds a formula, but our ooml doesn't refer to the font, so it may be pointless.
const CAMBRIA_MATH_FONT_DECLARATION = `
    <w:font w:name="Cambria Math">
        <w:panose1 w:val="02040503050406030204" />
        <w:charset w:val="00" />
        <w:family w:val="roman" />
        <w:pitch w:val="variable" />
        <w:sig w:usb0="E00002FF" w:usb1="420024FF" w:usb2="00000000" w:usb3="00000000" w:csb0="0000019F" w:csb1="00000000" />
    </w:font>`

class DOCXExporterMath {
    constructor(xml) {
        this.xml = xml
        this.fontTableXML = false
        this.addedCambriaMath = false
        this.domParser = new DOMParser()
    }

    init() {
        return this.xml
            .getXml("word/fontTable.xml")
            .then(fontTablesXML => {
                this.fontTablesXML = fontTablesXML
                return __webpack_require__.e(/* import() */ "vendors-node_modules_pnpm_mathlive_0_104_0_node_modules_mathlive_dist_mathlive_mjs").then(__webpack_require__.bind(__webpack_require__, "./node_modules/.pnpm/mathlive@0.104.0/node_modules/mathlive/dist/mathlive.mjs"))
            })
            .then(MathLive => (this.mathLive = MathLive))
    }

    latexToMathML(latex) {
        return this.mathLive.convertLatexToMathMl(latex)
    }

    getOmml(latex) {
        if (!this.addedCambriaMath) {
            const fontsEl = this.fontTablesXML.query("w:fonts")
            fontsEl.appendXML(CAMBRIA_MATH_FONT_DECLARATION)
            this.addedCambriaMath = true
        }
        const mathmlString = `<math xmlns="http://www.w3.org/1998/Math/MathML"><semantics>${this.latexToMathML(latex)}</semantics></math>`
        const ommlString = (0,mathml2omml__rspack_import_0.mml2omml)(mathmlString)
        return ommlString
    }
}


}),
"./js/modules/exporter/docx/metadata.js": (function (__unused_rspack_module, __webpack_exports__, __webpack_require__) {
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  DOCXExporterMetadata: function() { return DOCXExporterMetadata; }
});
/* import */ var _common__rspack_import_0 = __webpack_require__("./js/modules/common/index.js");


class DOCXExporterMetadata {
    constructor(xml, metadata, csl = null) {
        this.xml = xml
        this.metadata = metadata
        this.csl = csl
        this.coreXML = false
        this.customXML = false
    }

    init() {
        return this.xml.getXml("docProps/core.xml").then(coreXML => {
            this.coreXML = coreXML
            this.addMetadata()
            return this.addCustomProperties()
        })
    }

    async hasBibliography() {
        if (!this.csl || !this.metadata.citationStyle) {
            return "0"
        }
        try {
            const style = await this.csl.getStyle(this.metadata.citationStyle)
            // Check if the style has a bibliography section
            const hasBib = style.children.some(
                section => section.name === "bibliography"
            )
            return hasBib ? "1" : "0"
        } catch (_error) {
            return "0"
        }
    }

    addMetadata() {
        const corePropertiesEl = this.coreXML.query("cp:coreProperties")

        // Title
        let titleEl = this.coreXML.query("dc:title")
        if (!titleEl) {
            corePropertiesEl.appendXML("<dc:title></dc:title>")
            titleEl = corePropertiesEl.lastElementChild
        }
        titleEl.innerXML = (0,_common__rspack_import_0.escapeText)(this.metadata.title)
        // Authors

        const authors = this.metadata.authors.map(author => {
            const nameParts = []
            if (author.firstname) {
                nameParts.push(author.firstname)
            }
            if (author.lastname) {
                nameParts.push(author.lastname)
            }
            if (!nameParts.length && author.institution) {
                // We have an institution but no names. Use institution as name.
                nameParts.push(author.institution)
            }
            return nameParts.join(" ")
        })
        const lastAuthor = authors.length
            ? (0,_common__rspack_import_0.escapeText)(authors[0])
            : gettext("Unknown")
        const allAuthors = authors.length
            ? (0,_common__rspack_import_0.escapeText)(authors.join(";"))
            : gettext("Unknown")
        let allAuthorsEl = this.coreXML.query("dc:creator")

        if (!allAuthorsEl) {
            corePropertiesEl.appendXML("<dc:creator></dc:creator>")
            allAuthorsEl = corePropertiesEl.lastElementChild
        }
        allAuthorsEl.innerXML = allAuthors
        let lastAuthorEl = this.coreXML.query("dc:lastModifiedBy")
        if (!lastAuthorEl) {
            corePropertiesEl.appendXML(
                "<dc:lastModifiedBy></dc:lastModifiedBy>"
            )
            lastAuthorEl = corePropertiesEl.lastElementChild
        }
        lastAuthorEl.innerXML = lastAuthor
        // Keywords
        if (this.metadata.keywords.length) {
            // It is not really clear how keywords should be separated in DOCX files,
            // so we use ", ".
            const keywordsString = (0,_common__rspack_import_0.escapeText)(this.metadata.keywords.join(", "))

            let keywordsEl = this.coreXML.query("cp:keywords")
            if (!keywordsEl) {
                corePropertiesEl.appendXML("<cp:keywords></cp:keywords>")
                keywordsEl = corePropertiesEl.lastElementChild
            }
            keywordsEl.innerXML = keywordsString
        }

        // time
        const date = new Date()
        const dateString = date.toISOString().split(".")[0] + "Z"
        const createdEl = this.coreXML.query("dcterms:created")
        createdEl.innerXML = dateString
        let modifiedEl = this.coreXML.query("dcterms:modified")
        if (!modifiedEl) {
            corePropertiesEl.appendXML(
                '<dcterms:modified xsi:type="dcterms:W3CDTF"></dcterms:modified>'
            )
            modifiedEl = corePropertiesEl.lastElementChild
        }
        modifiedEl.innerXML = dateString
    }

    async addCustomProperties() {
        // Create or update docProps/custom.xml with citation style information
        const customXmlContent = `<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<Properties xmlns="http://schemas.openxmlformats.org/officeDocument/2006/custom-properties" xmlns:vt="http://schemas.openxmlformats.org/officeDocument/2006/docPropsVTypes">
</Properties>`

        const customXML = await this.xml.getXml(
            "docProps/custom.xml",
            Promise.resolve(customXmlContent)
        )
        this.customXML = customXML

        // Add citation style property
        if (this.metadata.citationStyle) {
            const propertiesEl = this.customXML.query("Properties")

            // Remove any existing ZOTERO_PREF_ properties
            const existingZoteroProps = this.customXML
                .queryAll("property")
                .filter(
                    prop =>
                        prop.getAttribute("name") &&
                        prop.getAttribute("name").startsWith("ZOTERO_PREF_")
                )
            existingZoteroProps.forEach(prop =>
                prop.parentElement.removeChild(prop)
            )

            // Find the highest pid to determine the next one
            const existingProperties = this.customXML.queryAll("property")
            let maxPid = 0
            existingProperties.forEach(prop => {
                const pid = parseInt(prop.getAttribute("pid"))
                if (pid > maxPid) {
                    maxPid = pid
                }
            })

            // Determine if the citation style has a bibliography
            const hasBib = await this.hasBibliography()

            // Create the data content
            const citationStyleUrl = `http://www.zotero.org/styles/${(0,_common__rspack_import_0.escapeText)(this.metadata.citationStyle)}`
            const dataContent = `<data data-version="3" zotero-version="8.0.2"><session id=""/><style id="${citationStyleUrl}" locale="${(0,_common__rspack_import_0.escapeText)(this.metadata.language || "en-US")}" hasBibliography="${hasBib}" bibliographyStyleHasBeenSet="1"/><prefs><pref name="fieldType" value="Field"/></prefs></data>`

            // Split content into chunks of 255 characters (DOCX limit)
            const chunkSize = 255
            const chunks = []
            for (let i = 0; i < dataContent.length; i += chunkSize) {
                chunks.push(dataContent.substring(i, i + chunkSize))
            }

            // Create properties for each chunk
            chunks.forEach((chunk, index) => {
                const propName = `ZOTERO_PREF_${index + 1}`
                const propertyXML = `<property fmtid="{D5CDD505-2E9C-101B-9397-08002B2CF9AE}" pid="${maxPid + index + 1}" name="${propName}">
<vt:lpwstr></vt:lpwstr>
</property>`
                propertiesEl.appendXML(propertyXML)
                // Set the text content after appending (textContent escapes XML characters)
                const lpwstrEl =
                    propertiesEl.lastElementChild.query("vt:lpwstr")
                if (lpwstrEl) {
                    lpwstrEl.textContent = chunk
                }
            })
        }

        return Promise.resolve()
    }
}


}),
"./js/modules/exporter/docx/rels.js": (function (__unused_rspack_module, __webpack_exports__, __webpack_require__) {
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  DOCXExporterRels: function() { return DOCXExporterRels; }
});
/* import */ var _common__rspack_import_0 = __webpack_require__("./js/modules/common/index.js");
// manages the .rels files. Need to initialize one for each of document.xml and footnotes.xml


const DEFAULT_XML = `<?xml version="1.0" encoding="UTF-8"?>
<Relationships xmlns="http://schemas.openxmlformats.org/package/2006/relationships"></Relationships>`

const DEFAULT_HYPERLINK_STYLE = `<w:style w:type="character" w:styleId="InternetLink">
    <w:name w:val="Hyperlink"/>
    <w:rPr>
        <w:color w:val="000080"/>
        <w:u w:val="single"/>
    </w:rPr>
</w:style>`

class DOCXExporterRels {
    constructor(xml, docName) {
        this.xml = xml
        this.docName = docName
        this.relsXML = false
        this.ctXML = false
        this.relIdCounter = -1
        this.filePath = `word/_rels/${this.docName}.xml.rels`
        this.ctFilePath = "[Content_Types].xml"
        this.styleXML = false
        this.styleFilePath = "word/styles.xml"
        this.hyperLinkStyle = false
    }

    init() {
        return Promise.all([
            this.initCt()
                .then(() => {
                    return this.xml.getXml(this.filePath, DEFAULT_XML)
                })
                .then(xml => {
                    this.relsXML = xml
                    this.findMaxRelId()
                }),
            this.xml.getXml(this.styleFilePath).then(styleXML => {
                this.styleXML = styleXML
                return Promise.resolve()
            })
        ])
    }

    initCt() {
        return this.xml.getXml(this.ctFilePath).then(ctXML => {
            this.ctXML = ctXML
            this.addRelsToCt()
            return Promise.resolve()
        })
    }

    // Go through a rels xml file and file all the listed relations
    findMaxRelId() {
        const rels = this.relsXML.queryAll("Relationship")

        rels.forEach(rel => {
            const id = Number.parseInt(
                rel.getAttribute("Id").replace(/\D/g, "")
            )
            if (id > this.relIdCounter) {
                this.relIdCounter = id
            }
        })
    }

    addRelsToCt() {
        const override = this.ctXML.query("Overrid", {
            PartName: `/${this.filePath}`
        })
        if (!override) {
            const types = this.ctXML.query("Types")
            types.appendXML(
                `<Override PartName="/${this.filePath}" ContentType="application/vnd.openxmlformats-package.relationships+xml"/>`
            )
        }
    }

    // Add a relationship for a link
    addLinkRel(link) {
        const rels = this.relsXML.query("Relationships")
        const rId = ++this.relIdCounter
        const string = `<Relationship Id="rId${rId}" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/hyperlink" Target="${(0,_common__rspack_import_0.escapeText)(link)}" TargetMode="External"/>`
        rels.appendXML(string)
        return rId
    }

    addLinkStyle() {
        if (this.hyperLinkStyle) {
            // already added
            return
        }
        const hyperLinkEl = this.styleXML.query("w:name", {
            "w:val": "Hyperlink"
        })
        if (hyperLinkEl) {
            this.hyperLinkStyle =
                hyperLinkEl.parentElement.getAttribute("w:styleId")
        } else {
            const stylesEl = this.styleXML.query("w:styles")
            stylesEl.appendXML(DEFAULT_HYPERLINK_STYLE)
            this.hyperLinkStyle = "InternetLink"
        }
    }

    // add a relationship for an image
    addImageRel(imgFileName) {
        const rels = this.relsXML.query("Relationships")
        const rId = ++this.relIdCounter
        const string = `<Relationship Id="rId${rId}" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/image" Target="media/${(0,_common__rspack_import_0.escapeText)(imgFileName)}"/>`
        rels.appendXML(string)
        return rId
    }

    addFootnoteRel() {
        const footnotesRel = this.relsXML.query("Relationship", {
            Target: "footnotes.xml"
        })
        if (footnotesRel) {
            // Rel exists already
            const fnRId = Number.parseInt(
                footnotesRel.getAttribute("Id").replace(/\D/g, "")
            )
            return fnRId
        }
        const rels = this.relsXML.query("Relationships")
        const rId = ++this.relIdCounter
        const string = `<Relationship Id="rId${rId}" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/footnotes" Target="footnotes.xml"/>`
        rels.appendXML(string)
        return rId
    }

    addNumberingRel() {
        const numberingRel = this.relsXML.query("Relationship", {
            Target: "numbering.xml"
        })
        if (numberingRel) {
            // Rel exists already
            const nuRId = Number.parseInt(
                numberingRel.getAttribute("Id").replace(/\D/g, "")
            )
            return nuRId
        }
        const rels = this.relsXML.query("Relationships")
        const rId = ++this.relIdCounter
        const string = `<Relationship Id="rId${rId}" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/numbering" Target="numbering.xml"/>`
        rels.appendXML(string)
        return rId
    }

    addCommentsRel() {
        const commentsRel = this.relsXML.query("Relationship", {
            Target: "comments.xml"
        })
        if (commentsRel) {
            return
        }
        const rels = this.relsXML.query("Relationships")
        const string = `<Relationship Id="rId${++this.relIdCounter}" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/comments" Target="comments.xml"/>`
        rels.appendXML(string)
        const override = this.ctXML.query("Override", {
            PartName: "/word/comments.xml"
        })
        if (!override) {
            const types = this.ctXML.query("Types")
            types.appendXML(
                '<Override PartName="/word/comments.xml" ContentType="application/vnd.openxmlformats-officedocument.wordprocessingml.comments+xml"/>'
            )
        }
    }

    addCommentsExtendedRel() {
        const commentsExtendedRel = this.relsXML.query("Relationship", {
            Target: "commentsExtended.xml"
        })
        if (commentsExtendedRel) {
            return
        }
        const rels = this.relsXML.query("Relationships")
        const string = `<Relationship Id="rId${++this.relIdCounter}" Type="http://schemas.microsoft.com/office/2011/relationships/commentsExtended" Target="commentsExtended.xml"/>`
        rels.appendXML(string)
        const override = this.ctXML.query("Override", {
            PartName: "/word/commentsExtended.xml"
        })
        if (!override) {
            const types = this.ctXML.query("Types")
            types.appendXML(
                '<Override PartName="/word/commentsExtended.xml" ContentType="application/vnd.openxmlformats-officedocument.wordprocessingml.commentsExtended+xml"/>'
            )
        }
    }
}


}),
"./js/modules/exporter/docx/render.js": (function (__unused_rspack_module, __webpack_exports__, __webpack_require__) {
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  DOCXExporterRender: function() { return DOCXExporterRender; }
});
/* import */ var _common__rspack_import_0 = __webpack_require__("./js/modules/common/index.js");
/* import */ var _schema_i18n__rspack_import_1 = __webpack_require__("./js/modules/schema/i18n.js");
/* import */ var _tools_doc_content__rspack_import_2 = __webpack_require__("./js/modules/exporter/tools/doc_content.js");
/* import */ var _tools_xml__rspack_import_3 = __webpack_require__("./js/modules/exporter/tools/xml.js");





class DOCXExporterRender {
    constructor(xml) {
        this.xml = xml

        this.filePath = false // "word/document.xml" or "word/document2.xml" in some cases
        this.ctXML = false
        this.text = false
    }

    init() {
        return this.xml
            .getXml("[Content_Types].xml")
            .then(ctXML => {
                this.ctXML = ctXML
                const documentOverride = this.ctXML.query("Override", {
                    ContentType:
                        "application/vnd.openxmlformats-officedocument.wordprocessingml.document.main+xml"
                })
                this.filePath = documentOverride
                    .getAttribute("PartName")
                    .slice(1)
                return this.xml.getXml(this.filePath)
            })
            .then(xml => {
                this.text = xml
                // Ensure we support the three latest docx feature sets:
                // wp14 (drawing 2010), w14 (word 2010), w15 (word 2012)
                const documentEl = this.text.query("w:document")
                if (!documentEl.getAttribute("xmlns:wp14")) {
                    documentEl.setAttribute(
                        "xmlns:wp14",
                        "http://schemas.microsoft.com/office/word/2010/wordprocessingDrawing"
                    )
                }
                if (!documentEl.getAttribute("xmlns:w14")) {
                    documentEl.setAttribute(
                        "xmlns:w14",
                        "http://schemas.microsoft.com/office/word/2010/wordml"
                    )
                }
                if (!documentEl.getAttribute("xmlns:w15")) {
                    documentEl.setAttribute(
                        "xmlns:w15",
                        "http://schemas.microsoft.com/office/word/2012/wordml"
                    )
                }
                const ignorable = [
                    ...new Set(
                        ["w14", "wp14", "w15"].concat(
                            documentEl
                                .getAttribute("mc:Ignorable", "")
                                .split(" ")
                                .filter(item => item.length)
                        )
                    )
                ]
                documentEl.setAttribute("mc:Ignorable", ignorable.join(" "))
                return Promise.resolve()
            })
    }

    // Define the tags that are to be looked for in the document
    getTagData(docContent, pmBib, settings) {
        const tags = docContent.content.map(node => {
            const tag = {}
            switch (node.type) {
                case "title":
                    tag.title = "title"
                    tag.content = (0,_tools_doc_content__rspack_import_2.textContent)(node)
                    break
                case "heading_part":
                    tag.title = node.attrs.id
                    tag.content = (0,_tools_doc_content__rspack_import_2.textContent)(node)
                    break
                case "table_part":
                case "richtext_part":
                    tag.title = `@${node.attrs.id}`
                    tag.content = node.content
                    break
                case "contributors_part":
                    tag.title = node.attrs.id
                    // TODO: This is a very basic reduction of the author info into
                    // a simple string. We should expand the templating system so
                    // that one can specify more about the output.
                    tag.content = node.content
                        ? node.content
                              .map(node => {
                                  const contributor = node.attrs,
                                      nameParts = []
                                  let affiliation = false
                                  if (contributor.firstname) {
                                      nameParts.push(contributor.firstname)
                                  }
                                  if (contributor.lastname) {
                                      nameParts.push(contributor.lastname)
                                  }
                                  if (contributor.institution) {
                                      if (nameParts.length) {
                                          affiliation = contributor.institution
                                      } else {
                                          // We have an institution but no names. Use institution as name.
                                          nameParts.push(
                                              contributor.institution
                                          )
                                      }
                                  }
                                  const parts = [nameParts.join(" ")]
                                  if (affiliation) {
                                      parts.push(affiliation)
                                  }
                                  if (contributor.email) {
                                      parts.push(contributor.email)
                                  }
                                  return parts.join(", ")
                              })
                              .join("; ")
                        : ""
                    break
                case "tags_part":
                    tag.title = node.attrs.id
                    tag.content = node.content
                        ? node.content.map(node => node.attrs.tag).join(", ")
                        : ""
                    break
            }
            return tag
        })

        let bibliographyContent
        if (pmBib && pmBib.content && pmBib.content.length > 0) {
            // Add bibliography heading and mark first/last items
            const firstPmBib = pmBib.content[0]
            const lastPmBib = pmBib.content[pmBib.content.length - 1]
            firstPmBib.attrs = firstPmBib.attrs || {}
            firstPmBib.attrs.first = true
            lastPmBib.attrs = lastPmBib.attrs || {}
            lastPmBib.attrs.last = true
            const bibliographyHeader =
                settings.bibliography_header[settings.language] ||
                _schema_i18n__rspack_import_1.BIBLIOGRAPHY_HEADERS[settings.language]
            bibliographyContent = [
                {
                    type: "bibliography_heading",
                    content: [{type: "text", text: bibliographyHeader}]
                },
                pmBib
            ]
        } else {
            // No bibliography content, add a placeholder paragraph
            bibliographyContent = [
                {type: "paragraph", content: [{type: "text", text: " "}]}
            ]
        }

        // Add bibliography content
        tags.push({
            title: "@bibliography", // The '@' triggers handling as block
            content: bibliographyContent
        })

        tags.push({
            title: "@copyright", // The '@' triggers handling as block
            content:
                settings.copyright && settings.copyright.holder
                    ? [
                          {
                              type: "paragraph",
                              content: [
                                  {
                                      type: "text",
                                      text: `© ${settings.copyright.year ? settings.copyright.year : new Date().getFullYear()} ${settings.copyright.holder}`
                                  }
                              ]
                          }
                      ]
                    : [
                          {
                              type: "paragraph",
                              content: [{type: "text", text: " "}]
                          }
                      ]
        })
        tags.push({
            title: "@licenses", // The '@' triggers handling as block
            content:
                settings.copyright && settings.copyright.licenses.length
                    ? settings.copyright.licenses.map(license => ({
                          type: "paragraph",
                          content: [
                              {
                                  type: "text",
                                  marks: [
                                      {
                                          type: "link",
                                          attrs: {
                                              href: license.url,
                                              title: license.title
                                          }
                                      }
                                  ],
                                  text: license.title
                              },
                              {
                                  type: "text",
                                  text: license.start
                                      ? ` (${license.start})`
                                      : ""
                              }
                          ]
                      }))
                    : [
                          {
                              type: "paragraph",
                              content: [{type: "text", text: " "}]
                          }
                      ]
        })

        return tags
    }

    // go through document.xml looking for tags and replace them with the given
    // replacements.
    render(docContent, pmBib, settings, richtext, citations) {
        const tags = this.getTagData(docContent, pmBib, settings)

        // Including global page definition at end
        const blocks = this.text.queryAll(["w:p", "w:sectPr"])

        const currentTags = []
        blocks.forEach(block => {
            // Assuming there is nothing outside of <w:t>...</w:t>
            const text = block.textContent
            tags.forEach(tag => {
                const tagString = tag.title
                if (text.includes(`{${tagString}}`)) {
                    currentTags.push(tag)
                    tag.block = block
                    // We don't worry about the same tag appearing twice in the document,
                    // as that would make no sense.
                }
            })
            const pageSize = block.query("w:pgSz")
            const pageMargins = block.query("w:pgMar")
            const cols = block.query("w:cols")
            if (pageSize && pageMargins) {
                // Not sure if these all need to come together
                let width =
                    Number.parseInt(pageSize.getAttribute("w:w")) -
                    Number.parseInt(pageMargins.getAttribute("w:right")) -
                    Number.parseInt(pageMargins.getAttribute("w:left"))
                const height =
                    Number.parseInt(pageSize.getAttribute("w:h")) -
                    Number.parseInt(pageMargins.getAttribute("w:bottom")) -
                    Number.parseInt(pageMargins.getAttribute("w:top")) -
                    Number.parseInt(pageMargins.getAttribute("w:header")) -
                    Number.parseInt(pageMargins.getAttribute("w:footer"))

                const colCount = cols
                    ? Number.parseInt(cols.getAttribute("w:num"))
                    : 1
                if (colCount > 1) {
                    const colSpace = Number.parseInt(
                        cols.getAttribute("w:space")
                    )
                    width = width - colSpace * (colCount - 1)
                    width = width / colCount
                }
                while (currentTags.length) {
                    const tag = currentTags.pop()
                    tag.dimensions = {
                        width: width * 635, // convert to EMU
                        height: height * 635 // convert to EMU
                    }
                }
            }
        })
        tags.forEach(tag => {
            if (!tag.title) {
                return
            } else if (tag.title[0] === "@") {
                this.blockRender(tag, citations, richtext)
            } else {
                this.inlineRender(tag)
            }
        })
    }

    // Render Tags that only exchange inline content
    inlineRender(tag) {
        if (!tag.block) {
            return
        }
        const texts = tag.block.textContent.split(`{${tag.title}}`)
        const fullText = texts[0] + (0,_common__rspack_import_0.escapeText)(tag.content) + texts[1]
        const rs = tag.block.queryAll("w:r").reverse()
        let lastR
        // Remove all <w:r> with text in them (<w:t>).
        // Exclude <w:r> used for other things, like page breaks.
        rs.forEach(r => {
            if (r.query("w:t")) {
                if (lastR) {
                    r.parentElement.removeChild(r)
                } else {
                    lastR = r
                }
            }
        })
        if (!lastR) {
            // This should not be possible. Error.
            return
        }
        if (fullText.length) {
            let textAttr = ""
            if (fullText[0] === " " || fullText[fullText.length - 1] === " ") {
                textAttr += 'xml:space="preserve"'
            }
            lastR.innerXML = `<w:t ${textAttr}>${fullText}</w:t>`
        } else {
            lastR.parentElement.removeChild(lastR)
        }
    }

    // Render tags that exchange paragraphs
    blockRender(tag, citations, richtext) {
        if (!tag.block) {
            return
        }
        const pStyle = tag.block.query("w:pStyle")
        const options = {
            dimensions: tag.dimensions,
            citationType: citations.citFm.citationType,
            section: pStyle ? pStyle.getAttribute("w:val") : "Normal",
            tag: tag.title.slice(1)
        }
        const outXML = tag.content
            ? tag.content
                  .map((content, i) =>
                      richtext.run(content, options, tag.content[i + 1])
                  )
                  .join("")
            : ""
        if (!outXML.length) {
            // If there is no content, we need to put in a space to prevent the
            // tag from being removed.
            tag.block.innerXML = '<w:r><w:t xml:space="preserve"> </w:t></w:r>'
            return
        }
        const parentElement = tag.block.parentElement
        const dom = (0,_tools_xml__rspack_import_3.xmlDOM)(outXML)
        const domPars = dom.node["#document"]?.slice() || [dom]
        domPars.forEach(node => parentElement.insertBefore(node, tag.block))
        // sectPr contains information about columns, etc. We need to move this
        // to the last paragraph we will be adding.
        const sectPr = tag.block.query("w:sectPr")
        if (sectPr) {
            const pPr = tag.block.previousSibling.query("w:pPr")
            pPr.appendChild(sectPr)
        }
        parentElement.removeChild(tag.block)
    }
}


}),
"./js/modules/exporter/docx/richtext.js": (function (__unused_rspack_module, __webpack_exports__, __webpack_require__) {
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  DOCXExporterRichtext: function() { return DOCXExporterRichtext; }
});
/* import */ var _common__rspack_import_0 = __webpack_require__("./js/modules/common/index.js");
/* import */ var _schema_i18n__rspack_import_1 = __webpack_require__("./js/modules/schema/i18n.js");
/* import */ var _tools_xml__rspack_import_2 = __webpack_require__("./js/modules/exporter/tools/xml.js");
/* import */ var _tools_zotero_csl__rspack_import_3 = __webpack_require__("./js/modules/exporter/tools/zotero_csl.js");
/* import */ var _tools__rspack_import_4 = __webpack_require__("./js/modules/exporter/docx/tools.js");








const TEXT_BLOCK_TYPES = [
    "heading1",
    "heading2",
    "heading3",
    "heading4",
    "heading5",
    "heading6",
    "paragraph",
    "code_block"
]

const INLINE_TYPES = [
    "citation",
    "cross_reference",
    "cslbib",
    "cslblock",
    "cslindent",
    "cslinline",
    "cslleftmargin",
    "cslrightinline",
    "equation",
    "footnote",
    "hard_break",
    "image",
    "text"
]

/**
 * Create Zotero citation field instruction for DOCX.
 * @param {Array} references - Array of {id, prefix?, locator?} from citation node
 * @param {Object} bibDB - Bibliography database
 * @param {string} formattedCitation - Pre-formatted citation text from citeproc
 * @param {string} citationId - Optional citation ID (generated if not provided)
 * @returns {string} Field instruction text
 */

function createZoteroCitationField(
    references,
    bibDB,
    formattedCitation,
    citationId = null
) {
    const zoteroCitation = (0,_tools_zotero_csl__rspack_import_3.createZoteroCitation)(
        references,
        bibDB,
        formattedCitation,
        citationId
    )
    if (!zoteroCitation) {
        return null
    }
    const jsonStr = JSON.stringify(zoteroCitation)
    return ` ADDIN ZOTERO_ITEM CSL_CITATION${jsonStr} `
}

class DOCXExporterRichtext {
    constructor(
        doc,
        settings,
        lists,
        footnotes,
        math,
        tables,
        rels,
        citations,
        images
    ) {
        this.doc = doc
        this.settings = settings
        this.lists = lists
        this.footnotes = footnotes
        this.math = math
        this.tables = tables
        this.rels = rels
        this.citations = citations
        this.images = images

        this.comments = {}
        this.commentRangeCounter = -1
        this.changeCounter = 0
        this.fnCounter = 1 // footnotes 0 and 1 are occupied by separators by default.
        this.bookmarkCounter = -1
        this.categoryCounter = {} // counters for each type of figure (figure/table/photo)
        this.fncategoryCounter = {}
        this.docPrCount = -1
        this.citationCounter = 0 // Track which citation we're processing
    }

    run(node, options = {}, nextNode = null) {
        options.comments = this.findComments(node) // Data related to comments. We need to mark the first and last occurence of comment
        return this.transformRichtext(node, options, nextNode)
    }

    findComments(node, comments = {}) {
        if (node.marks) {
            node.marks
                .filter(mark => mark.type === "comment")
                .forEach(comment => {
                    if (!this.doc.comments[comment.attrs.id]) {
                        return
                    }
                    if (!comments[comment.attrs.id]) {
                        comments[comment.attrs.id] = {
                            start: node,
                            end: node,
                            content: this.doc.comments[comment.attrs.id]
                        }
                    } else {
                        comments[comment.attrs.id]["end"] = node
                    }
                })
        }
        if (node.content) {
            for (let i = 0; i < node.content.length; i++) {
                this.findComments(node.content[i], comments)
            }
        }
        return comments
    }

    transformRichtext(node, options = {}, nextNode = null) {
        let start = "",
            content = "",
            end = ""

        if (node.marks && options.comments) {
            // Footnotes don't allow comments in DOCX
            node.marks
                .filter(mark => mark.type === "comment")
                .forEach(comment => {
                    const commentData = options.comments[comment.attrs.id]
                    if (!commentData) {
                        return
                    }
                    if (commentData.start === node) {
                        let commentId = this.comments[comment.attrs.id]
                        start += `<w:commentRangeStart w:id="${commentId}"/>`
                        commentData.content.answers?.forEach(
                            _answer =>
                                (start += `<w:commentRangeStart w:id="${++commentId}"/>`)
                        )
                    }

                    if (commentData.end === node) {
                        let commentId = this.comments[comment.attrs.id]
                        end =
                            `<w:commentRangeEnd w:id="${commentId}"/><w:r><w:commentReference w:id="${
                                commentId
                            }"/></w:r>${(commentData.content.answers || [])
                                .map(
                                    _answer =>
                                        `<w:commentRangeEnd w:id="${++commentId}"/><w:r><w:commentReference w:id="${commentId}"/></w:r>`
                                )
                                .join("")}` + end
                    }
                })
        }

        const inlineType = INLINE_TYPES.includes(node.type)

        let inlineDelete,
            nextBlockDelete,
            nextBlockInsert,
            blockChange,
            blockDelete,
            blockInsert
        if (inlineType) {
            const inlineInsert =
                inlineType &&
                (node.marks?.find(
                    mark =>
                        mark.type === "insertion" &&
                        mark.attrs.approved === false
                )?.attrs ||
                    options.blockInsert)
            inlineDelete =
                inlineType &&
                (node.marks?.find(mark => mark.type === "deletion")?.attrs ||
                    options.blockDelete)
            if (
                inlineInsert &&
                inlineDelete &&
                inlineInsert.username === inlineDelete.username
            ) {
                // In DOCX, the same user cannot both have a pending insertion and deletion of the same inline content. We remove it.
                return ""
            } else {
                if (inlineInsert) {
                    start += `<w:ins w:id="${++this.changeCounter}" w:author="${(0,_common__rspack_import_0.escapeText)(inlineInsert.username)}" w:date="${new Date(inlineInsert.date * 60000).toISOString().split(".")[0]}Z">`
                    end = "</w:ins>" + end
                }
                if (inlineDelete) {
                    start += `<w:del w:id="${++this.changeCounter}" w:author="${(0,_common__rspack_import_0.escapeText)(inlineDelete.username)}" w:date="${new Date(inlineDelete.date * 60000).toISOString().split(".")[0]}Z">`
                    end = "</w:del>" + end
                }
            }
        } else if (TEXT_BLOCK_TYPES.includes(node.type)) {
            blockChange = node.attrs?.track?.find(
                mark => mark.type === "block_change"
            )

            if (nextNode && TEXT_BLOCK_TYPES.includes(nextNode.type)) {
                nextBlockDelete = nextNode.attrs?.track?.find(
                    mark => mark.type === "deletion"
                )
                nextBlockInsert = nextNode.attrs?.track?.find(
                    mark => mark.type === "insertion"
                )
            }
        } else {
            blockDelete = node.attrs?.track?.find(
                mark => mark.type === "deletion"
            )
            if (blockDelete) {
                options = Object.assign({}, options)
                options.blockDelete = blockDelete
            }
            blockInsert = node.attrs?.track?.find(
                mark => mark.type === "insertion"
            )
            if (blockInsert) {
                options = Object.assign({}, options)
                options.blockInsert = blockInsert
            }
        }
        switch (node.type) {
            case "paragraph":
                if (!options.section) {
                    options.section = "Normal"
                }
                // This should really be something like
                // '<w:p w:rsidR="A437D321" w:rsidRDefault="2B935ADC">'
                // See: https://blogs.msdn.microsoft.com/brian_jones/2006/12/11/whats-up-with-all-those-rsids/
                // But tests with Word 2016/LibreOffice seem to indicate that it
                // doesn't care if the attributes are missing.
                // We may need to add them later, if it turns out this is a problem
                // for other versions of Word. In that case we should also add
                // it to settings.xml as described in above link.
                if (
                    options.section === "Normal" &&
                    !options.list_type &&
                    !node.content?.length
                ) {
                    start += "<w:p/>"
                } else {
                    start += `
                        <w:p${options.paragraphId ? ` w14:paraId="${options.paragraphId}"` : ""}>
                            <w:pPr><w:pStyle w:val="${options.section}"/>`
                    if (options.list_type) {
                        start += `<w:numPr><w:ilvl w:val="${options.list_depth}"/>`
                        start += `<w:numId w:val="${options.list_type}"/></w:numPr>`
                    } else {
                        start += `
                        <w:rPr>
                        ${
                            nextBlockInsert
                                ? `<w:ins w:id="${++this.changeCounter}" w:author="${(0,_common__rspack_import_0.escapeText)(nextBlockInsert.username)}" w:date="${new Date(nextBlockInsert.date * 60000).toISOString().split(".")[0]}Z"/>`
                                : ""
                        }
                        ${
                            nextBlockDelete
                                ? `<w:del w:id="${++this.changeCounter}" w:author="${(0,_common__rspack_import_0.escapeText)(nextBlockDelete.username)}" w:date="${new Date(nextBlockDelete.date * 60000).toISOString().split(".")[0]}Z"/>`
                                : ""
                        }
                        </w:rPr>`
                    }
                    if (blockChange) {
                        start += `
                        <w:pPrChange w:id="${++this.changeCounter}" w:author="${(0,_common__rspack_import_0.escapeText)(blockChange.username)}" w:date="${new Date(blockChange.date * 60000).toISOString().split(".")[0]}Z">
                            <w:pPr>
                                <w:pStyle w:val="${(0,_tools__rspack_import_4.translateBlockType)(blockChange.before.type)}"/>
                            </w:pPr>
                        </w:pPrChange>`
                    }
                    start += "</w:pPr>"
                    end = "</w:p>" + end
                    if (!node.content?.length) {
                        start += "<w:r><w:rPr></w:rPr></w:r>"
                    }
                }
                if (options.commentReference) {
                    end =
                        '<w:r><w:rPr><w:rStyle w:val="CommentReference"/></w:rPr><w:annotationRef/></w:r>' +
                        end
                    options = Object.assign({}, options)
                    options.commentReference = false
                }
                break
            case "bibliography_heading":
                start += `
                    <w:p>
                        <w:pPr>
                            <w:pStyle w:val="BibliographyHeading"/>
                            <w:rPr></w:rPr>
                        </w:pPr>`
                end = "</w:p>" + end
                break
            case "heading1":
            case "heading2":
            case "heading3":
            case "heading4":
            case "heading5":
            case "heading6":
                start += `
                    <w:p>
                        <w:pPr>
                            <w:pStyle w:val="${(0,_tools__rspack_import_4.translateBlockType)(node.type)}"/>
                            <w:rPr>
                            ${
                                nextBlockInsert
                                    ? `<w:ins w:id="${++this.changeCounter}" w:author="${(0,_common__rspack_import_0.escapeText)(nextBlockInsert.username)}" w:date="${new Date(nextBlockInsert.date * 60000).toISOString().split(".")[0]}Z"/>`
                                    : ""
                            }
                            ${
                                nextBlockDelete
                                    ? `<w:del w:id="${++this.changeCounter}" w:author="${(0,_common__rspack_import_0.escapeText)(nextBlockDelete.username)}" w:date="${new Date(nextBlockDelete.date * 60000).toISOString().split(".")[0]}Z"/>`
                                    : ""
                            }
                            </w:rPr>
                            ${
                                blockChange
                                    ? blockChange.before.type === "paragraph"
                                        ? `<w:pPrChange w:id="${++this.changeCounter}" w:author="${(0,_common__rspack_import_0.escapeText)(blockChange.username)}" w:date="${new Date(blockChange.date * 60000).toISOString().split(".")[0]}Z"/>`
                                        : `<w:pPrChange w:id="${++this.changeCounter}" w:author="${(0,_common__rspack_import_0.escapeText)(blockChange.username)}" w:date="${new Date(blockChange.date * 60000).toISOString().split(".")[0]}Z">
                <w:pPr>
                    <w:pStyle w:val="${(0,_tools__rspack_import_4.translateBlockType)(blockChange.before.type)}"/>
                </w:pPr>
            </w:pPrChange>`
                                    : ""
                            }
                        </w:pPr>
                        <w:bookmarkStart w:name="${node.attrs.id}" w:id="${++this.bookmarkCounter}"/>
                        <w:bookmarkEnd w:id="${this.bookmarkCounter}"/>`
                end = "</w:p>" + end
                break
            case "blockquote":
                // This is imperfect, but Word doesn't seem to provide section/quotation nesting
                // Also, track information on wrapping into blockquote is not exported.
                options = Object.assign({}, options)
                options.section = "Quote"
                break
            case "code_block": {
                // Handle code blocks with category support
                const category = node.attrs.category
                let categoryLabel = ""

                if (category && node.attrs.id) {
                    const categoryCounter = options.inFootnote
                        ? this.fnCategoryCounter
                        : this.categoryCounter
                    if (!categoryCounter[category]) {
                        categoryCounter[category] = 1
                    }
                    const catCount = categoryCounter[category]++
                    const {CATS} = __webpack_require__("./js/modules/schema/i18n.js")
                    const categoryLabelText =
                        CATS[category]?.[this.settings.language] || category
                    const title = node.attrs.title
                        ? `: ${(0,_common__rspack_import_0.escapeText)(node.attrs.title)}`
                        : ""

                    // Create category label paragraph with SEQ field for numbering
                    categoryLabel = `
                        <w:p>
                            <w:pPr><w:pStyle w:val="Caption"/></w:pPr>
                            <w:bookmarkStart w:name="${node.attrs.id}" w:id="${++this.bookmarkCounter}"/>
                            <w:r>
                                <w:t xml:space="preserve">${categoryLabelText} </w:t>
                            </w:r>
                            <w:fldSimple w:instr=" SEQ ${category} \\* ARABIC ">
                                <w:r>
                                    <w:t>${catCount}${options.inFootnote ? "A" : ""}</w:t>
                                </w:r>
                            </w:fldSimple>
                            <w:r>
                                <w:t xml:space="preserve">${title}</w:t>
                            </w:r>
                            <w:bookmarkEnd w:id="${this.bookmarkCounter}"/>
                        </w:p>`
                }

                if (!node.content?.length) {
                    start += categoryLabel + "<w:p/>"
                } else {
                    options = Object.assign({}, options)
                    options.section = "Code"
                    start +=
                        categoryLabel +
                        `
                        <w:p${options.paragraphId ? ` w14:paraId="${options.paragraphId}"` : ""}>
                            <w:pPr><w:pStyle w:val="${options.section}"/>`
                    if (options.list_type) {
                        start += `<w:numPr><w:ilvl w:val="${options.list_depth}"/>`
                        start += `<w:numId w:val="${options.list_type}"/></w:numPr>`
                    } else {
                        start += `
                        <w:rPr>
                        ${
                            nextBlockInsert
                                ? `<w:ins w:id="${++this.changeCounter}" w:author="${(0,_common__rspack_import_0.escapeText)(nextBlockInsert.username)}" w:date="${new Date(nextBlockInsert.date * 60000).toISOString().split(".")[0]}Z"/>`
                                : ""
                        }
                        ${
                            nextBlockDelete
                                ? `<w:del w:id="${++this.changeCounter}" w:author="${(0,_common__rspack_import_0.escapeText)(nextBlockDelete.username)}" w:date="${new Date(nextBlockDelete.date * 60000).toISOString().split(".")[0]}Z"/>`
                                : ""
                        }
                        </w:rPr>`
                    }
                    if (blockChange) {
                        start += `
                        <w:pPrChange w:id="${++this.changeCounter}" w:author="${(0,_common__rspack_import_0.escapeText)(blockChange.username)}" w:date="${new Date(blockChange.date * 60000).toISOString().split(".")[0]}Z">
                            <w:pPr>
                                <w:pStyle w:val="${(0,_tools__rspack_import_4.translateBlockType)(blockChange.before.type)}"/>
                            </w:pPr>
                        </w:pPrChange>`
                    }
                    start += "</w:pPr>"
                    end = "</w:p>" + end
                    if (!node.content?.length) {
                        start += "<w:r><w:rPr></w:rPr></w:r>"
                    }
                }
                if (options.commentReference) {
                    end =
                        '<w:r><w:rPr><w:rStyle w:val="CommentReference"/></w:rPr><w:annotationRef/></w:r>' +
                        end
                    options.commentReference = false
                }
                break
            }
            case "ordered_list": {
                options = Object.assign({}, options)
                options.section = "ListParagraph"
                if (options.list_depth === undefined) {
                    options.list_depth = 0
                } else {
                    options.list_depth += 1
                }
                options.list_type = this.lists.getNumberedType()
                break
            }
            case "bullet_list":
                options = Object.assign({}, options)
                options.section = "ListParagraph"
                options.list_type = this.lists.getBulletType()
                if (options.list_depth === undefined) {
                    options.list_depth = 0
                } else {
                    options.list_depth += 1
                }
                break
            case "list_item":
                // Word seems to lack complex nesting options. The styling is applied
                // to child paragraphs. This will deliver correct results in most
                // cases.
                break
            case "footnotecontainer":
                options = Object.assign({}, options)
                options.section = "Footnote"
                options.inFootnote = true
                start += `<w:footnote w:id="${++this.fnCounter}">`
                end = "</w:footnote>" + end
                options.footnoteRefMissing = true
                break
            case "footnote":
                content += `
                    <w:r>
                        <w:rPr>
                            <w:rStyle w:val="FootnoteAnchor"/>
                        </w:rPr>
                        <w:footnoteReference w:id="${++this.fnCounter}"/>
                    </w:r>`
                break
            case "text": {
                let hyperlink,
                    anchor,
                    em,
                    strong,
                    underline,
                    smallcaps,
                    sup,
                    sub,
                    code,
                    formatChange
                // Check for hyperlink, anchor, bold/strong and italic/em
                if (node.marks) {
                    hyperlink = node.marks.find(mark => mark.type === "link")
                    anchor = node.marks.find(mark => mark.type === "anchor")
                    em = node.marks.find(mark => mark.type === "em")
                    strong = node.marks.find(mark => mark.type === "strong")
                    underline = node.marks.find(
                        mark => mark.type === "underline"
                    )
                    smallcaps = node.marks.find(
                        mark => mark.type === "smallcaps"
                    )
                    sup = node.marks.find(mark => mark.type === "sup")
                    sub = node.marks.find(mark => mark.type === "sub")
                    code = node.marks.find(mark => mark.type === "code")
                    formatChange = node.marks.find(
                        mark => mark.type === "format_change"
                    )
                }
                if (anchor) {
                    start += `<w:bookmarkStart w:name="${anchor.attrs.id}" w:id="${++this.bookmarkCounter}"/><w:bookmarkEnd w:id="${this.bookmarkCounter}"/>`
                    end =
                        `<w:bookmarkStart w:name="${anchor.attrs.id}" w:id="${++this.bookmarkCounter}"/><w:bookmarkEnd w:id="${this.bookmarkCounter}"/>` +
                        end
                }
                if (hyperlink) {
                    const href = hyperlink.attrs.href
                    if (href[0] === "#") {
                        // Internal link
                        start += `<w:hyperlink w:anchor="${href.slice(1)}">`
                    } else {
                        // External link
                        const refId = this.rels.addLinkRel(href)
                        start += `<w:hyperlink r:id="rId${refId}">`
                    }
                    start += "<w:r>"
                    end = "</w:r></w:hyperlink>" + end
                } else {
                    start += "<w:r>"
                    end = "</w:r>" + end
                }
                start += "<w:rPr>"
                if (
                    hyperlink ||
                    em ||
                    strong ||
                    underline ||
                    smallcaps ||
                    sup ||
                    sub ||
                    code
                ) {
                    if (hyperlink) {
                        this.rels.addLinkStyle()
                        start += `<w:rStyle w:val="${this.rels.hyperLinkStyle}"/>`
                    }
                    if (em) {
                        start += "<w:i/><w:iCs/>"
                    }
                    if (strong) {
                        start += "<w:b/><w:bCs/>"
                    }
                    if (underline) {
                        start += '<w:u w:val="single"/>'
                    }
                    if (smallcaps) {
                        start += "<w:smallCaps/>"
                    }
                    if (sup) {
                        start += '<w:vertAlign w:val="superscript"/>'
                    } else if (sub) {
                        start += '<w:vertAlign w:val="subscript"/>'
                    }
                    if (code) {
                        start +=
                            '<w:rFonts w:ascii="Courier New" w:hAnsi="Courier New"/>'
                    }
                }
                if (formatChange) {
                    const beforeStyle = formatChange.attrs.before
                    start += `<w:rPrChange w:id="${++this.changeCounter}" w:author="${(0,_common__rspack_import_0.escapeText)(formatChange.attrs.username)}" w:date="${new Date(formatChange.attrs.date * 60000).toISOString().split(".")[0]}Z"><w:rPr>`
                    if (beforeStyle.includes("em")) {
                        start += "<w:i/><w:iCs/>"
                    }
                    if (beforeStyle.includes("strong")) {
                        start += "<w:b/><w:bCs/>"
                    }
                    if (beforeStyle.includes("underline")) {
                        start += '<w:u w:val="single"/>'
                    }
                    start += "</w:rPr></w:rPrChange>"
                }
                start += "</w:rPr>"
                if (options.footnoteRefMissing) {
                    start += "<w:footnoteRef /><w:tab />"
                    options.footnoteRefMissing = false
                }
                let textAttr = ""
                if (
                    node.text[0] === " " ||
                    node.text[node.text.length - 1] === " "
                ) {
                    textAttr += ' xml:space="preserve"'
                }
                if (inlineDelete) {
                    start += `<w:delText${textAttr}>`
                    end = "</w:delText>" + end
                } else {
                    start += `<w:t${textAttr}>`
                    end = "</w:t>" + end
                }
                content += (0,_common__rspack_import_0.escapeText)(node.text)
                break
            }
            case "cross_reference": {
                const title = node.attrs.title
                const id = node.attrs.id
                let marks = node.marks.slice()
                if (title && id) {
                    const hyperlink = {
                        type: "link",
                        attrs: {href: `#${id}`, title}
                    }
                    marks = marks.filter(mark => mark.type !== "link")
                    marks.push(hyperlink)
                }
                content += this.transformRichtext(
                    {
                        type: "text",
                        text: title || "MISSING TARGET",
                        marks
                    },
                    options,
                    nextNode
                )
                break
            }
            case "citation": {
                // We take the first citation from the stack and remove it.
                const cit = this.citations.pmCits.shift()

                // Get citation info and formatted text for Zotero export
                const citInfo = this.citations.citInfos[this.citationCounter]
                const formattedText =
                    this.citations.citationTexts[this.citationCounter]
                this.citationCounter++

                // Create Zotero citation data on-the-fly
                const fieldInstruction =
                    citInfo && formattedText
                        ? createZoteroCitationField(
                              citInfo.references,
                              this.citations.bibDB,
                              formattedText
                          )
                        : null

                if (options.citationType === "note" && !options.inFootnote) {
                    // If the citations are in notes (footnotes), we need to
                    // put the content of this citation in a footnote.
                    // We then add the footnote to the footnote file and
                    // adjust the ids of all subsequent footnotes to be one higher
                    // than what they were until now.
                    content += `
                        <w:r>
                            <w:rPr>
                                <w:rStyle w:val="FootnoteAnchor"/>
                            </w:rPr>
                            <w:footnoteReference w:id="${this.fnCounter}"/>
                        </w:r>`

                    // Create footnote with Zotero field if available
                    let fnXML
                    if (fieldInstruction && formattedText) {
                        fnXML = `<w:footnote w:id="${this.fnCounter}">
                            <w:p>
                                <w:r>
                                    <w:fldChar w:fldCharType="begin"/>
                                </w:r>
                                <w:r>
                                    <w:instrText xml:space="preserve">${fieldInstruction}</w:instrText>
                                </w:r>
                                <w:r>
                                    <w:fldChar w:fldCharType="separate"/>
                                </w:r>
                                <w:r>
                                    <w:t>${formattedText}</w:t>
                                </w:r>
                                <w:r>
                                    <w:fldChar w:fldCharType="end"/>
                                </w:r>
                            </w:p>
                        </w:footnote>`
                    } else {
                        const fnContents = this.transformRichtext(cit, {
                            footnoteRefMissing: true,
                            section: "Footnote"
                        })
                        fnXML = `<w:footnote w:id="${this.fnCounter}">${fnContents}</w:footnote>`
                    }

                    const xml = this.footnotes.xml
                    const lastId = this.fnCounter - 1
                    const footnotes = xml.queryAll("w:footnote")
                    footnotes.forEach(footnote => {
                        const id = Number.parseInt(
                            footnote.getAttribute("w:id")
                        )
                        if (id >= this.fnCounter) {
                            footnote.setAttribute("w:id", id + 1)
                        }
                        if (id === lastId) {
                            footnote.parentElement.insertBefore(
                                (0,_tools_xml__rspack_import_2.xmlDOM)(fnXML),
                                footnote.nextSibling
                            )
                        }
                    })
                    this.fnCounter++
                } else {
                    // In-text citation - create Zotero field if available
                    if (fieldInstruction && formattedText) {
                        content += `
                            <w:r>
                                <w:fldChar w:fldCharType="begin"/>
                            </w:r>
                            <w:r>
                                <w:instrText xml:space="preserve">${fieldInstruction}</w:instrText>
                            </w:r>
                            <w:r>
                                <w:fldChar w:fldCharType="separate"/>
                            </w:r>
                            <w:r>
                                <w:t>${formattedText}</w:t>
                            </w:r>
                            <w:r>
                                <w:fldChar w:fldCharType="end"/>
                            </w:r>`
                    } else {
                        // Fallback to formatted text only
                        for (let i = 0; i < cit.content.length; i++) {
                            content += this.transformRichtext(
                                cit.content[i],
                                options,
                                cit.content[i + 1]
                            )
                        }
                    }
                }
                break
            }
            case "figure": {
                const category = node.attrs.category
                let caption = node.attrs.caption
                    ? node.content.find(node => node.type === "figure_caption")
                          ?.content || []
                    : []
                let catCountXML = ""
                if (category !== "none") {
                    const categoryCounter = options.inFootnote
                        ? this.fncategoryCounter
                        : this.categoryCounter
                    if (!categoryCounter[category]) {
                        categoryCounter[category] = 1
                    }
                    catCountXML = `<w:r>
                        <w:t xml:space="preserve">${_schema_i18n__rspack_import_1.CATS[category][this.settings.language]} </w:t>
                    </w:r>
                    <w:r>
                        <w:rPr></w:rPr>
                        <w:fldChar w:fldCharType="begin"></w:fldChar>
                    </w:r>
                    <w:r>
                        <w:rPr></w:rPr>
                        <w:instrText> SEQ ${category} \\* ARABIC </w:instrText>
                    </w:r>
                    <w:r>
                        <w:rPr></w:rPr>
                        <w:fldChar w:fldCharType="separate" />
                    </w:r>
                    <w:r>
                        <w:rPr></w:rPr>
                        <w:t>${categoryCounter[category]++}${options.inFootnote ? "A" : ""}</w:t>
                    </w:r>
                    <w:r>
                        <w:rPr></w:rPr>
                        <w:fldChar w:fldCharType="end" />
                    </w:r>`
                    if (caption.length) {
                        caption = [{type: "text", text: ": "}].concat(caption)
                    }
                }
                let cx, cy
                const image =
                    node.content.find(node => node.type === "image")?.attrs
                        .image || false
                if (image !== false) {
                    const imageEntry = this.images.images[image]
                    cx = imageEntry.width * 9525 // width in EMU
                    cy = imageEntry.height * 9525 // height in EMU
                    const imgTitle = imageEntry.title
                    // Shrink image if too large for paper.
                    if (options.dimensions) {
                        let width = options.dimensions.width
                        if (options.tableSideMargins) {
                            width = width - options.tableSideMargins
                        }
                        width =
                            (width * Number.parseInt(node.attrs.width)) / 100
                        if (cx > width) {
                            const rel = cy / cx
                            cx = width
                            cy = cx * rel
                        }
                        if (cy > options.dimensions.height) {
                            const rel = cx / cy
                            cy = options.dimensions.height
                            cx = cy * rel
                        }
                    }
                    cy = Math.round(cy)
                    cx = Math.round(cx)
                    const rId = imageEntry.id
                    content += `<w:r>
                      <w:rPr></w:rPr>
                      <w:drawing>
                        <wp:inline distT="0" distB="0" distL="0" distR="0">
                          <wp:extent cx="${cx}" cy="${cy}"/>
                          <wp:docPr id="${++this.docPrCount}" name="Picture${this.docPrCount}" descr=""/>
                          <a:graphic xmlns:a="http://schemas.openxmlformats.org/drawingml/2006/main">
                            <a:graphicData uri="http://schemas.openxmlformats.org/drawingml/2006/picture">
                              <pic:pic xmlns:pic="http://schemas.openxmlformats.org/drawingml/2006/picture">
                                <pic:nvPicPr>
                                  <pic:cNvPr id="0" name="${imgTitle}" descr=""/>
                                  <pic:cNvPicPr>
                                    <a:picLocks noChangeAspect="1" noChangeArrowheads="1"/>
                                  </pic:cNvPicPr>
                                </pic:nvPicPr>
                                <pic:blipFill>
                                  <a:blip r:embed="rId${rId}"/>
                                  <a:stretch>
                                    <a:fillRect/>
                                  </a:stretch>
                                </pic:blipFill>
                                <pic:spPr bwMode="auto">
                                  <a:xfrm>
                                    <a:off x="0" y="0"/>
                                    <a:ext cx="${cx}" cy="${cy}"/>
                                  </a:xfrm>
                                  <a:prstGeom prst="rect">
                                    <a:avLst/>
                                  </a:prstGeom>
                                  <a:noFill/>
                                  <a:ln w="9525">
                                    <a:noFill/>
                                    <a:miter lim="800000"/>
                                    <a:headEnd/>
                                    <a:tailEnd/>
                                  </a:ln>
                                </pic:spPr>
                              </pic:pic>
                            </a:graphicData>
                          </a:graphic>
                        </wp:inline>
                      </w:drawing>
                    </w:r>`
                } else {
                    cx = 9525 * 100 // We pick a random size of 100x100. We hope this will fit the formula
                    cy = 9525 * 100
                    const latex =
                        node.content.find(
                            node => node.type === "figure_equation"
                        )?.attrs.equation || ""
                    content += this.math.getOmml(latex)
                }
                const captionSpace = !!(catCountXML.length || caption.length)
                if (node.attrs.aligned === "center") {
                    start += `
                    <w:p>
                      <w:pPr>
                        <w:jc w:val="center"/>
                      </w:pPr>`
                    content =
                        `<w:bookmarkStart w:name="${node.attrs.id}" w:id="${++this.bookmarkCounter}"/><w:bookmarkEnd w:id="${this.bookmarkCounter}"/>` +
                        content
                    end =
                        `
                    </w:p>
                    ${
                        captionSpace
                            ? `<w:p>
                          <w:pPr><w:pStyle w:val="Caption"/><w:rPr></w:rPr></w:pPr>
                          ${catCountXML}
                          ${caption.map((node, i) => this.transformRichtext(node, options, caption[i + 1])).join("")}
                    </w:p>`
                            : ""
                    }` + end
                } else {
                    start += `
                    <w:p>
                      <w:pPr>
                        <w:jc w:val="center"/>
                      </w:pPr>
                      <w:r>
                        <w:rPr></w:rPr>
                          <w:drawing>
                            <wp:anchor behindDoc="0" distT="95250" distB="95250" distL="95250" distR="95250" simplePos="0" locked="0" layoutInCell="1" allowOverlap="0" relativeHeight="2">
                                <wp:simplePos x="0" y="0" />
                                <wp:positionH relativeFrom="column">
                                    <wp:align>${node.attrs.aligned}</wp:align>
                                </wp:positionH>
                                <wp:positionV relativeFrom="paragraph">
                                    <wp:posOffset>0</wp:posOffset>
                                </wp:positionV>
                                <wp:extent cx="${cx}" cy="${captionSpace ? cy + 350520 : cy}" />
                                <wp:effectExtent l="0" t="0" r="0" b="0" />
                                <wp:wrapSquare wrapText="largest" />
                                <wp:docPr id="${++this.docPrCount}" name="Frame${this.docPrCount}" />
                                <a:graphic xmlns:a="http://schemas.openxmlformats.org/drawingml/2006/main">
                                    <a:graphicData uri="http://schemas.microsoft.com/office/word/2010/wordprocessingShape">
                                        <wps:wsp>
                                            <wps:cNvSpPr txBox="1" />
                                            <wps:spPr>
                                                <a:xfrm>
                                                    <a:off x="0" y="0" />
                                                    <a:ext cx="${cx}" cy="${captionSpace ? cy + 350520 : cy}" />
                                                </a:xfrm>
                                                <a:prstGeom prst="rect" />
                                            </wps:spPr>
                                            <wps:txbx>
                                                <w:txbxContent>
                                                    <w:p>
                                                        <w:pPr>
                                                            <w:pStyle w:val="Caption" />
                                                            <w:spacing w:before="20" w:after="220" />
                                                            <w:rPr></w:rPr>
                                                        </w:pPr>`
                    content =
                        `<w:bookmarkStart w:name="${node.attrs.id}" w:id="${++this.bookmarkCounter}"/><w:bookmarkEnd w:id="${this.bookmarkCounter}"/>` +
                        content
                    end =
                        `
                                                        ${catCountXML}
                                                        ${caption.map((node, i) => this.transformRichtext(node, options, caption[i + 1])).join("")}
                                                    </w:p>
                                                </w:txbxContent>
                                            </wps:txbx>
                                            <wps:bodyPr anchor="t" lIns="0" tIns="0" rIns="0" bIns="0">
                                                <a:noAutofit />
                                            </wps:bodyPr>
                                        </wps:wsp>
                                    </a:graphicData>
                                </a:graphic>
                                  <wp14:sizeRelH relativeFrom="margin">
                                    <wp14:pctWidth>${node.attrs.width}000</wp14:pctWidth>
                                </wp14:sizeRelH>
                            </wp:anchor>
                        </w:drawing>
                      </w:r>
                    </w:p>` + end
                }
                if (blockInsert) {
                    start += `<w:ins w:id="${++this.changeCounter}" w:author="${(0,_common__rspack_import_0.escapeText)(blockInsert.username)}" w:date="${new Date(blockInsert.date * 60000).toISOString().split(".")[0]}Z">`
                    end = "</w:ins>" + end
                }
                if (blockDelete) {
                    start += `<w:del w:id="${++this.changeCounter}" w:author="${(0,_common__rspack_import_0.escapeText)(blockDelete.username)}" w:date="${new Date(blockDelete.date * 60000).toISOString().split(".")[0]}Z">`
                    end = "</w:del>" + end
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
                const category = node.attrs.category
                let caption = node.attrs.caption
                    ? node.content[0].content || []
                    : []
                let catCountXML = ""
                if (category !== "none") {
                    const categoryCounter = options.inFootnote
                        ? this.fncategoryCounter
                        : this.categoryCounter
                    if (!categoryCounter[category]) {
                        categoryCounter[category] = 1
                    }
                    catCountXML = `<w:r>
                        <w:t xml:space="preserve">${_schema_i18n__rspack_import_1.CATS[category][this.settings.language]} </w:t>
                    </w:r>
                    <w:r>
                        <w:rPr></w:rPr>
                        <w:fldChar w:fldCharType="begin"></w:fldChar>
                    </w:r>
                    <w:r>
                        <w:rPr></w:rPr>
                        <w:instrText> SEQ ${category} \\* ARABIC </w:instrText>
                    </w:r>
                    <w:r>
                        <w:rPr></w:rPr>
                        <w:fldChar w:fldCharType="separate" />
                    </w:r>
                    <w:r>
                        <w:rPr></w:rPr>
                        <w:t>${categoryCounter[category]++}${options.inFootnote ? "A" : ""}</w:t>
                    </w:r>
                    <w:r>
                        <w:rPr></w:rPr>
                        <w:fldChar w:fldCharType="end" />
                    </w:r>`
                    if (caption.length) {
                        caption = [{type: "text", text: ": "}].concat(caption)
                    }
                }
                const captionSpace = !!(catCountXML.length || caption.length)
                if (captionSpace) {
                    start += `
                    <w:p>
                        <w:pPr>
                            <w:pStyle w:val="Caption"/>
                            <w:keepNext/>
                        </w:pPr>
                        <w:bookmarkStart w:name="${node.attrs.id}" w:id="${++this.bookmarkCounter}"/>
                        <w:bookmarkEnd w:id="${this.bookmarkCounter}"/>
                        ${catCountXML}
                        ${caption.map((node, i) => this.transformRichtext(node, options, caption[i + 1])).join("")}
                    </w:p>`
                }
                this.tables.addTableGridStyle()
                start += `
                    <w:tbl>
                        <w:tblPr>
                            <w:tblStyle w:val="${this.tables.tableGridStyle}" />
                            ${
                                node.attrs.width === "100"
                                    ? '<w:tblW w:w="0" w:type="auto" />'
                                    : `<w:tblW w:w="${50 * Number.parseInt(node.attrs.width)}" w:type="pct" />
                                    <w:jc w:val="${node.attrs.aligned}" />`
                            }
                            <w:tblLook w:val="04A0" w:firstRow="1" w:lastRow="0" w:firstColumn="1" w:lastColumn="0" w:noHBand="0" w:noVBand="1" />
                        </w:tblPr>
                        <w:tblGrid>`
                const columns = node.content[1].content[0].content.length
                let cellWidth = 63500 // standard width
                options = Object.assign({}, options)
                if (options.dimensions?.width) {
                    cellWidth =
                        Number.parseInt(options.dimensions.width / columns) -
                        2540 // subtracting for border width
                } else if (!options.dimensions) {
                    options.dimensions = {}
                }
                options.section = "Normal"
                options.list_type = null
                options.dimensions = Object.assign({}, options.dimensions)
                options.dimensions.width = cellWidth
                options.tableSideMargins = this.tables.getSideMargins()
                for (let i = 0; i < columns; i++) {
                    start += `<w:gridCol w:w="${Number.parseInt(cellWidth / 635)}" />`
                }
                start += "</w:tblGrid>"
                end = "</w:tbl>" + end

                break
            }
            case "table_body":
                // Pass through to table.
                break
            case "table_caption":
                // We already deal with this in 'table'.
                return ""
            case "table_row":
                start += "<w:tr>"
                end = "</w:tr>" + end
                break
            case "table_cell":
            case "table_header":
                start += `
                    <w:tc>
                        <w:tcPr>
                            ${
                                node.attrs.rowspan && node.attrs.colspan
                                    ? `<w:tcW w:w="${Number.parseInt((options.dimensions?.width || 0) / 635)}" w:type="dxa" />`
                                    : '<w:tcW w:w="0" w:type="auto" />'
                            }
                            ${
                                node.attrs.rowspan
                                    ? node.attrs.rowspan > 1
                                        ? '<w:vMerge w:val="restart" />'
                                        : ""
                                    : "<w:vMerge/>"
                            }
                            ${
                                node.attrs.colspan
                                    ? node.attrs.colspan > 1
                                        ? '<w:hMerge w:val="restart" />'
                                        : ""
                                    : "<w:hMerge/>"
                            }
                        </w:tcPr>
                        ${node.content ? "" : "<w:p/>"}`
                end = "</w:tc>" + end

                break
            case "equation": {
                const latex = node.attrs.equation
                content += this.math.getOmml(latex)
                break
            }
            case "hard_break":
                content += "<w:r><w:br/></w:r>"
                break
            // CSL bib entries
            case "cslbib":
                options = Object.assign({}, options)
                options.section = "Bibliography"
                break
            case "cslblock":
                end = "<w:r><w:br/></w:r>" + end
                break
            case "cslleftmargin":
                end = "<w:r><w:tab/></w:r>" + end
                break
            case "cslindent":
                start += "<w:r><w:tab/></w:r>"
                end = "<w:r><w:br/></w:r>" + end
                break
            case "cslentry":
                start += `
                    <w:p>
                        <w:pPr>
                            <w:pStyle w:val="${options.section}"/>
                            <w:rPr></w:rPr>
                        </w:pPr>`
                // Note - beginning is in same par as first item, whereas end is in its own par
                if (node.attrs?.first) {
                    start += `<w:r>
                        <w:fldChar w:fldCharType="begin"/>
                    </w:r>
                    <w:r>
                        <w:instrText xml:space="preserve"> ADDIN ZOTERO_BIBL CSL_BIBLIOGRAPHY </w:instrText>
                    </w:r>
                    <w:r>
                        <w:fldChar w:fldCharType="separate"/>
                    </w:r>`
                }
                end = "</w:p>" + end
                if (node.attrs?.last) {
                    end =
                        end +
                        `<w:p>
                        <w:pPr>
                            <w:rPr/>
                        </w:pPr>
                        <w:r>
                            <w:fldChar w:fldCharType="end"/>
                        </w:r>
                    </w:p>`
                }
                break
            case "cslinline":
            case "cslrightinline":
                break
            default:
                console.warn("Unknown node type:", node.type, node)
                break
        }

        if (node.content) {
            for (let i = 0; i < node.content.length; i++) {
                content += this.transformRichtext(
                    node.content[i],
                    options,
                    node.content[i + 1]
                )
            }
        }
        return start + content + end
    }
}


}),
"./js/modules/exporter/docx/tables.js": (function (__unused_rspack_module, __webpack_exports__, __webpack_require__) {
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  DOCXExporterTables: function() { return DOCXExporterTables; }
});
const DEFAULT_TABLENORMAL_XML = `
    <w:style w:type="table" w:default="1" w:styleId="TableNormal">
        <w:name w:val="Normal Table"/>
        <w:uiPriority w:val="99"/>
        <w:semiHidden/>
        <w:unhideWhenUsed/>
        <w:tblPr>
          <w:tblInd w:w="0" w:type="dxa"/>
          <w:tblCellMar>
            <w:top w:w="0" w:type="dxa"/>
            <w:left w:w="108" w:type="dxa"/>
            <w:bottom w:w="0" w:type="dxa"/>
            <w:right w:w="108" w:type="dxa"/>
          </w:tblCellMar>
        </w:tblPr>
    </w:style>
    `

const DEFAULT_TABLEGRID_XML = tableNormalStyle => `
    <w:style w:type="table" w:styleId="TableGrid">
        <w:name w:val="Table Grid"/>
        <w:basedOn w:val="${tableNormalStyle}"/>
        <w:uiPriority w:val="39"/>
        <w:pPr>
            <w:spacing w:after="0" w:line="240" w:lineRule="auto"/>
        </w:pPr>
        <w:tblPr>
            <w:hMerge/>
            <w:vMerge/>
            <w:tblBorders>
                <w:top w:val="single" w:sz="4" w:space="0" w:color="auto"/>
                <w:left w:val="single" w:sz="4" w:space="0" w:color="auto"/>
                <w:bottom w:val="single" w:sz="4" w:space="0" w:color="auto"/>
                <w:right w:val="single" w:sz="4" w:space="0" w:color="auto"/>
                <w:insideH w:val="single" w:sz="4" w:space="0" w:color="auto"/>
                <w:insideV w:val="single" w:sz="4" w:space="0" w:color="auto"/>

            </w:tblBorders>
        </w:tblPr>


    </w:style>
    `

class DOCXExporterTables {
    constructor(xml) {
        this.xml = xml
        this.sideMargins = false
        this.tableGridStyle = false
        this.tableNormalStyle = false
        this.styleXML = false
        this.styleFilePath = "word/styles.xml"
    }

    init() {
        return this.xml.getXml(this.styleFilePath).then(styleXML => {
            this.styleXML = styleXML
            return Promise.resolve()
        })
    }

    addTableNormalStyle() {
        if (this.tableNormalStyle) {
            // already added
            return
        }
        const tableNormalEl = this.styleXML.query("w:style", {
            "w:type": "table",
            "w:default": "1"
        })
        if (tableNormalEl) {
            this.tableNormalStyle = tableNormalEl.getAttribute("w:styleId")
        } else {
            const stylesEl = this.styleXML.query("w:styles")
            stylesEl.appendXML(DEFAULT_TABLENORMAL_XML)
            this.tableNormalStyle = "TableNormal"
        }
    }

    addTableGridStyle() {
        if (this.tableGridStyle) {
            // already added
            return
        }
        this.addTableNormalStyle()
        const tableGridEl = this.styleXML.query("w:style", {
            "w:type": "table",
            "w:customStyle": "1"
        })
        if (tableGridEl) {
            this.tableGridStyle = tableGridEl.getAttribute("w:styleId")
        } else {
            const stylesEl = this.styleXML.query("w:styles")
            stylesEl.appendXML(DEFAULT_TABLEGRID_XML(this.tableNormalStyle))
            this.tableGridStyle = "TableGrid"
        }
    }

    getSideMargins() {
        if (!this.sideMargins) {
            const marginsEl = this.styleXML.query("w:style", {
                "w:styleId": this.tableGridStyle
            })
            const leftEl = marginsEl.query("w:left")
            const rightEl = marginsEl.query("w:right")
            const left = Number.parseInt(leftEl.getAttribute("w:w"))
            const right = Number.parseInt(rightEl.getAttribute("w:w"))
            this.sideMargins = (left + right) * 635
        }
        return this.sideMargins
    }
}


}),
"./js/modules/exporter/docx/tools.js": (function (__unused_rspack_module, __webpack_exports__, __webpack_require__) {
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  moveFootnoteComments: function() { return moveFootnoteComments; },
  translateBlockType: function() { return translateBlockType; }
});
/* import */ var _tools_doc_content__rspack_import_0 = __webpack_require__("./js/modules/exporter/tools/doc_content.js");


const moveFootnoteComments = topNode => {
    // DOCX doesn't support comments in footnotes. So we copy all comment marks from footnote
    // to parent node.
    (0,_tools_doc_content__rspack_import_0.descendantNodes)(topNode).forEach(node => {
        if (node.type === "footnote") {
            (0,_tools_doc_content__rspack_import_0.descendantNodes)({
                type: "footnotecontainer",
                content: node.attrs.footnote
            }).forEach(fnNode => {
                if (fnNode.marks) {
                    fnNode.marks
                        .filter(mark => mark.type === "comment")
                        .forEach(mark => {
                            if (!node.marks) {
                                node.marks = []
                            }
                            node.marks.push(mark)
                        })
                }
            })
        }
    })

    return topNode
}

const translateBlockType = blockType => {
    switch (blockType) {
        case "heading1":
            return "Heading1"
        case "heading2":
            return "Heading2"
        case "heading3":
            return "Heading3"
        case "heading4":
            return "Heading4"
        case "heading5":
            return "Heading5"
        case "heading6":
            return "Heading6"
        case "code_block":
            return "Code"
        case "blockquote":
            return "Quote"
        default:
            return "Normal"
    }
}


}),

}]);