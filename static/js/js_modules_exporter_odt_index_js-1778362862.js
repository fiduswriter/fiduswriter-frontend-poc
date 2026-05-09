"use strict";
(self["webpackChunkfidus_writer"] = self["webpackChunkfidus_writer"] || []).push([["js_modules_exporter_odt_index_js"], {
"./js/modules/exporter/odt/citations.js": (function (__unused_rspack_module, __webpack_exports__, __webpack_require__) {
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  ODTExporterCitations: function() { return ODTExporterCitations; }
});
/* import */ var prosemirror_model__rspack_import_4 = __webpack_require__("./node_modules/.pnpm/prosemirror-model@1.25.0/node_modules/prosemirror-model/dist/index.js");
/* import */ var _bibliography_schema_csl_bib__rspack_import_0 = __webpack_require__("./js/modules/bibliography/schema/csl_bib.js");
/* import */ var _citations_format__rspack_import_1 = __webpack_require__("./js/modules/citations/format.js");
/* import */ var _schema_footnotes__rspack_import_2 = __webpack_require__("./js/modules/schema/footnotes.js");
/* import */ var _tools_doc_content__rspack_import_3 = __webpack_require__("./js/modules/exporter/tools/doc_content.js");







class ODTExporterCitations {
    constructor(docContent, settings, styles, bibDB, csl, origCitInfos = []) {
        this.docContent = docContent
        this.settings = settings
        this.styles = styles
        this.bibDB = bibDB
        this.csl = csl
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
            this.styles.addReferenceStyle(cslBib[0])
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
"./js/modules/exporter/odt/footnotes.js": (function (__unused_rspack_module, __webpack_exports__, __webpack_require__) {
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  ODTExporterFootnotes: function() { return ODTExporterFootnotes; }
});
/* import */ var _tools_doc_content__rspack_import_0 = __webpack_require__("./js/modules/exporter/tools/doc_content.js");
/* import */ var _citations__rspack_import_1 = __webpack_require__("./js/modules/exporter/odt/citations.js");
/* import */ var _images__rspack_import_2 = __webpack_require__("./js/modules/exporter/odt/images.js");




const DEFAULT_STYLE_FOOTNOTE = `
    <style:style style:name="Footnote" style:family="paragraph" style:parent-style-name="Standard" style:class="extra">
        <style:paragraph-properties fo:margin-left="0.2354in" fo:margin-right="0in" fo:text-indent="-0.2354in" style:auto-text-indent="false" text:number-lines="false" text:line-number="0" />
        <style:text-properties fo:font-size="10pt" style:font-size-asian="10pt" style:font-size-complex="10pt" />
    </style:style>
    `

const DEFAULT_STYLE_FOOTNOTE_ANCHOR = `
    <style:style style:name="Footnote_20_anchor" style:display-name="Footnote anchor" style:family="text">
        <style:text-properties style:text-position="super 58%" />
    </style:style>
    `
const DEFAULT_STYLE_FOOTNOTE_SYMBOL = `
    <style:style style:name="Footnote_20_Symbol" style:display-name="Footnote Symbol" style:family="text" />
    `

const DEFAULT_STYLE_FOOTNOTE_CONFIGURATION = `
    <text:notes-configuration text:note-class="footnote" text:citation-style-name="Footnote_20_Symbol" text:citation-body-style-name="Footnote_20_anchor" style:num-format="1" text:start-value="0" text:footnotes-position="page" text:start-numbering-at="document" />
    `

class ODTExporterFootnotes {
    constructor(
        docContent,
        settings,
        xml,
        bodyCitations,
        styles,
        bibDB,
        imageDB,
        csl
    ) {
        this.docContent = docContent
        this.settings = settings
        this.xml = xml
        this.bodyCitations = bodyCitations
        this.styles = styles
        this.bibDB = bibDB
        this.imageDB = imageDB
        this.csl = csl

        this.pmBib = false
        this.fnPmJSON = false
        this.images = false
        this.citations = false
        this.footnotes = []
        this.styleFilePath = "styles.xml"
    }

    init() {
        this.findFootnotes()
        if (
            this.footnotes.length ||
            (this.bodyCitations.citFm.citationType === "note" &&
                this.bodyCitations.citInfos.length)
        ) {
            this.convertFootnotes()
            // Include the citinfos from the main document so that they will be
            // used for calculating the bibliography as well
            this.citations = new _citations__rspack_import_1.ODTExporterCitations(
                this.fnPmJSON,
                this.settings,
                this.styles,
                this.bibDB,
                this.csl,
                this.bodyCitations.citInfos
            )
            this.images = new _images__rspack_import_2.ODTExporterImages(
                this.fnPmJSON,
                this.xml,
                this.imageDB
            )

            return this.citations
                .init()
                .then(() => {
                    // Replace the main bibliography with the new one that includes
                    // both citations in main document and in the footnotes.
                    this.pmBib = this.citations.pmBib
                    return this.images.init()
                })
                .then(() => {
                    return this.addStyles()
                })
        } else {
            // No footnotes were found.
            return Promise.resolve()
        }
    }

    addStyles() {
        return this.xml.getXml(this.styleFilePath).then(styleXml => {
            this.styleXml = styleXml
            this.addStyle("Footnote", DEFAULT_STYLE_FOOTNOTE)
            this.addStyle("Footnote_20_anchor", DEFAULT_STYLE_FOOTNOTE_ANCHOR)
            this.addStyle("Footnote_20_Symbol", DEFAULT_STYLE_FOOTNOTE_SYMBOL)
            this.setStyleConfig()
            return Promise.resolve()
        })
    }

    addStyle(styleName, xml) {
        if (!this.styleXml.query("style:style", {"style:name": styleName})) {
            const stylesEl = this.styleXml.query("office:styles")
            stylesEl.appendXML(xml)
        }
    }

    setStyleConfig() {
        const oldFnStyleConfigEl = this.styleXml.query(
            "text:notes-configuration",
            {
                "text:note-class": "footnote"
            }
        )
        if (oldFnStyleConfigEl) {
            oldFnStyleConfigEl.parentElement.removeChild(oldFnStyleConfigEl)
        }
        const stylesEl = this.styleXml.query("office:styles")
        stylesEl.appendXML(DEFAULT_STYLE_FOOTNOTE_CONFIGURATION)
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
}


}),
"./js/modules/exporter/odt/images.js": (function (__unused_rspack_module, __webpack_exports__, __webpack_require__) {
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  ODTExporterImages: function() { return ODTExporterImages; }
});
/* import */ var _common__rspack_import_0 = __webpack_require__("./js/modules/common/index.js");
/* import */ var _tools_doc_content__rspack_import_1 = __webpack_require__("./js/modules/exporter/tools/doc_content.js");
/* import */ var _tools_svg__rspack_import_2 = __webpack_require__("./js/modules/exporter/tools/svg.js");




class ODTExporterImages {
    constructor(docContent, xml, imageDB) {
        this.docContent = docContent
        this.xml = xml
        this.imageDB = imageDB
        this.images = {}
        this.manifestXml = false
    }

    init() {
        return this.xml.getXml("META-INF/manifest.xml").then(manifestXml => {
            this.manifestXml = manifestXml
            return this.exportImages()
        })
    }

    // add an image to the list of files
    addImage(imgFileName, image) {
        imgFileName = this.addFileToManifest(imgFileName)
        this.xml.addExtraFile(`Pictures/${imgFileName}`, image)
        return imgFileName
    }

    // add a an image file to the manifest
    addFileToManifest(imgFileName) {
        const fileNameParts = imgFileName.split(".")
        const fileNameEnding = fileNameParts.pop()
        const fileNameStart = fileNameParts.join(".")
        const manifestEl = this.manifestXml.query("manifest:manifest")
        let imgManifest = manifestEl.query("manifest:file-entry", {
            "manifest:full-path": `Pictures/${imgFileName}`
        })
        let counter = 0
        while (imgManifest) {
            // Name exists already, we change the name until we get a file name not yet included in manifest.
            imgFileName = `${fileNameStart}_${counter++}.${fileNameEnding}`
            imgManifest = manifestEl.query("manifest:file-entry", {
                "manifest:full-path": `Pictures/${imgFileName}`
            })
        }
        const string = `  <manifest:file-entry manifest:full-path="Pictures/${imgFileName}" manifest:media-type="image/${fileNameEnding}"/>`
        manifestEl.appendXML(string)
        return imgFileName
    }

    // Find all images used in file and add these to the export zip.
    // TODO: This will likely fail on image types odt doesn't support such as
    // SVG. Try out and fix.
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
                            const wImgId = this.addImage(
                                imgDBEntry.image.split("/").pop(),
                                blob
                            )
                            if (blob.type === "image/svg+xml") {
                                // Add PNG version in addition to SVG
                                return (0,_tools_svg__rspack_import_2.svg2png)(blob).then(
                                    ({blob: pngBlob, width, height}) => {
                                        const pngWImgId = this.addImage(
                                            imgDBEntry.image
                                                .split("/")
                                                .pop()
                                                .replace(/.svg$/g, ".png"),
                                            pngBlob
                                        )
                                        this.images[image] = {
                                            id: pngWImgId,
                                            width,
                                            height,
                                            title: imgDBEntry.title,
                                            type: blob.type,
                                            svg: wImgId
                                        }
                                    }
                                )
                            } else {
                                this.images[image] = {
                                    id: wImgId,
                                    width: imgDBEntry.width,
                                    height: imgDBEntry.height,
                                    title: imgDBEntry.title,
                                    type: blob.type,
                                    svg: false
                                }
                            }
                        })
                )
            })

            Promise.all(p).then(() => resolveExportImages())
        })
    }
}


}),
"./js/modules/exporter/odt/index.js": (function (__unused_rspack_module, __webpack_exports__, __webpack_require__) {
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  ODTExporter: function() { return ODTExporter; }
});
/* import */ var downloadjs__rspack_import_0 = __webpack_require__("./node_modules/.pnpm/downloadjs@1.4.7/node_modules/downloadjs/download.js");
/* import */ var downloadjs__rspack_import_0_default = /*#__PURE__*/__webpack_require__.n(downloadjs__rspack_import_0);
/* import */ var _common__rspack_import_1 = __webpack_require__("./js/modules/common/index.js");
/* import */ var _tools_doc_content__rspack_import_2 = __webpack_require__("./js/modules/exporter/tools/doc_content.js");
/* import */ var _tools_file__rspack_import_3 = __webpack_require__("./js/modules/exporter/tools/file.js");
/* import */ var _tools_xml_zip__rspack_import_4 = __webpack_require__("./js/modules/exporter/tools/xml_zip.js");
/* import */ var _citations__rspack_import_5 = __webpack_require__("./js/modules/exporter/odt/citations.js");
/* import */ var _footnotes__rspack_import_6 = __webpack_require__("./js/modules/exporter/odt/footnotes.js");
/* import */ var _images__rspack_import_7 = __webpack_require__("./js/modules/exporter/odt/images.js");
/* import */ var _math__rspack_import_8 = __webpack_require__("./js/modules/exporter/odt/math.js");
/* import */ var _metadata__rspack_import_9 = __webpack_require__("./js/modules/exporter/odt/metadata.js");
/* import */ var _render__rspack_import_10 = __webpack_require__("./js/modules/exporter/odt/render.js");
/* import */ var _richtext__rspack_import_11 = __webpack_require__("./js/modules/exporter/odt/richtext.js");
/* import */ var _styles__rspack_import_12 = __webpack_require__("./js/modules/exporter/odt/styles.js");
/* import */ var _track__rspack_import_13 = __webpack_require__("./js/modules/exporter/odt/track.js");


















/*
Exporter to Open Document Text (LibreOffice)
*/

/*
TODO:
* - Export tracked changes of block changes and inline format changes
*    (this feature is lacking in ODT files created with LibreOffice 7.6.7.2)
*/

class ODTExporter {
    constructor(doc, templateUrl, bibDB, imageDB, csl) {
        this.doc = doc
        this.templateUrl = templateUrl
        this.bibDB = bibDB
        this.imageDB = imageDB
        this.csl = csl

        this.pmCits = false
        this.docContent = (0,_tools_doc_content__rspack_import_2.fixTables)((0,_tools_doc_content__rspack_import_2.removeHidden)(this.doc.content))
        this.docTitle = (0,_common__rspack_import_1.shortFileTitle)(this.doc.title, this.doc.path)
        this.mimeType = "application/vnd.oasis.opendocument.text"
    }

    init() {
        const xml = new _tools_xml_zip__rspack_import_4.XmlZip(this.templateUrl, this.mimeType)
        const styles = new _styles__rspack_import_12.ODTExporterStyles(xml)
        const math = new _math__rspack_import_8.ODTExporterMath(xml)
        const tracks = new _track__rspack_import_13.ODTExporterTracks(xml)

        const metadata = new _metadata__rspack_import_9.ODTExporterMetadata(
            xml,
            styles,
            this.getBaseMetadata(),
            this.csl
        )
        const citations = new _citations__rspack_import_5.ODTExporterCitations(
            this.docContent,
            this.doc.settings,
            styles,
            this.bibDB,
            this.csl
        )
        const footnotes = new _footnotes__rspack_import_6.ODTExporterFootnotes(
            this.docContent,
            this.doc.settings,
            xml,
            citations,
            styles,
            this.bibDB,
            this.imageDB,
            this.csl
        )

        const images = new _images__rspack_import_7.ODTExporterImages(this.docContent, xml, this.imageDB)

        const richtext = new _richtext__rspack_import_11.ODTExporterRichtext(
            this.doc.comments,
            this.doc.settings,
            styles,
            tracks,
            footnotes,
            citations,
            math,
            images
        )

        const render = new _render__rspack_import_10.ODTExporterRender(xml)
        return xml
            .init()
            .then(() => styles.init())
            .then(() => tracks.init())
            .then(() => math.init())
            .then(() => metadata.init())
            .then(() => citations.init())
            .then(() => render.init())
            .then(() => images.init())
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

    download(blob) {
        return downloadjs__rspack_import_0_default()(blob, (0,_tools_file__rspack_import_3.createSlug)(this.docTitle) + ".odt", this.mimeType)
    }
}


}),
"./js/modules/exporter/odt/math.js": (function (__unused_rspack_module, __webpack_exports__, __webpack_require__) {
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  ODTExporterMath: function() { return ODTExporterMath; }
});
class ODTExporterMath {
    constructor(xml) {
        this.xml = xml
        this.objectCounter = 1
        this.manifestXml = false
        this.domParser = new DOMParser()
    }

    init() {
        return this.xml
            .getXml("META-INF/manifest.xml")
            .then(manifestXml => {
                this.manifestXml = manifestXml
                this.checkObjectCounter()
                return Promise.resolve()
            })
            .then(() => __webpack_require__.e(/* import() */ "vendors-node_modules_pnpm_mathlive_0_104_0_node_modules_mathlive_dist_mathlive_mjs").then(__webpack_require__.bind(__webpack_require__, "./node_modules/.pnpm/mathlive@0.104.0/node_modules/mathlive/dist/mathlive.mjs")))
            .then(MathLive => (this.mathLive = MathLive))
    }

    checkObjectCounter() {
        const manifestEl = this.manifestXml.query("manifest:manifest")
        const fileEntries = manifestEl.queryAll("manifest:file-entry")

        fileEntries.forEach(fileEntry => {
            const fullPath = fileEntry.getAttribute("manifest:full-path")
            const dir = fullPath.split("/")[0]
            const dirParts = dir.split(" ")
            if (dirParts.length === 2 && dirParts[0] === "Object") {
                const objectNumber = Number.parseInt(dirParts[1])
                if (objectNumber >= this.objectCounter) {
                    this.objectCounter = objectNumber + 1
                }
            }
        })
    }

    latexToMathML(latex) {
        return this.mathLive.convertLatexToMathMl(latex)
    }

    addMath(latex) {
        const objectNumber = this.objectCounter++
        this.xml.addExtraFile(
            `Object ${objectNumber}/content.xml`,
            `<math xmlns="http://www.w3.org/1998/Math/MathML">${this.latexToMathML(
                latex
            )}</math>`
        )
        const manifestEl = this.manifestXml.query("manifest:manifest")
        const stringOne = `<manifest:file-entry manifest:full-path="Object ${objectNumber}/content.xml" manifest:media-type="text/xml"/>`
        manifestEl.appendXML(stringOne)
        const stringTwo = `<manifest:file-entry manifest:full-path="Object ${objectNumber}/" manifest:version="1.2" manifest:media-type="application/vnd.oasis.opendocument.formula"/>`
        manifestEl.appendXML(stringTwo)
        return objectNumber
    }
}


}),
"./js/modules/exporter/odt/metadata.js": (function (__unused_rspack_module, __webpack_exports__, __webpack_require__) {
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  ODTExporterMetadata: function() { return ODTExporterMetadata; }
});
/* import */ var _common__rspack_import_0 = __webpack_require__("./js/modules/common/index.js");


class ODTExporterMetadata {
    constructor(xml, styles, metadata, csl = null) {
        this.xml = xml
        this.styles = styles
        this.metadata = metadata
        this.csl = csl
        this.metaXml = false
    }

    init() {
        return this.xml.getXml("meta.xml").then(metaXml => {
            this.metaXml = metaXml
            this.addMetadata()
            return this.addZoteroPrefs()
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
        const metaEl = this.metaXml.query("office:meta")

        // Title
        const titleEl = this.metaXml.query("dc:title")
        if (titleEl) {
            titleEl.innerXML = (0,_common__rspack_import_0.escapeText)(this.metadata.title)
        } else {
            metaEl.appendXML(
                `<dc:title>${(0,_common__rspack_import_0.escapeText)(this.metadata.title)}</dc:title>`
            )
        }

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

        const initialAuthor = authors.length
            ? (0,_common__rspack_import_0.escapeText)(authors[0])
            : gettext("Unknown")
        // TODO: We likely want to differentiate between first and last author.
        const lastAuthor = initialAuthor

        const lastAuthorEl = this.metaXml.query("dc:creator")
        if (lastAuthorEl) {
            lastAuthorEl.innerXML = lastAuthor
        } else {
            metaEl.appendXML(`<dc:creator>${lastAuthor}</dc:creator>`)
        }
        const initialAuthorEl = this.metaXml.query("meta:initial-creator")
        if (initialAuthorEl) {
            initialAuthorEl.innerXML = initialAuthor
        } else {
            metaEl.appendXML(
                `<meta:initial-creator>${initialAuthor}</meta:initial-creator>`
            )
        }

        // Keywords
        // Remove all existing keywords
        const keywordEls = this.metaXml.queryAll("meta:keywords")
        keywordEls.forEach(keywordEl =>
            keywordEl.parentElement.removeChild(keywordEl)
        )
        // Add new keywords
        const keywords = this.metadata.keywords
        keywords.forEach(keyword =>
            metaEl.appendXML(
                `<meta:keyword>${(0,_common__rspack_import_0.escapeText)(keyword)}</meta:keyword>`
            )
        )

        // language
        // LibreOffice seems to ignore the value set in metadata and instead uses
        // the one set in default styles. So we set both.
        this.styles.setLanguage(this.metadata.language)
        const languageEl = this.metaXml.query("dc:language")
        if (languageEl) {
            languageEl.innerXML = this.metadata.language
        } else {
            metaEl.appendXML(
                `<dc:language>${this.metadata.language}</dc:language>`
            )
        }
        // time
        const date = new Date()
        const dateString = date.toISOString().split(".")[0]
        const createdEl = metaEl.query("meta:creation-date")
        createdEl.innerXML = dateString
        const dateEl = this.metaXml.query("dc:date")
        if (dateEl) {
            dateEl.innerXML = `${dateString}.000000000`
        } else {
            metaEl.appendXML(`<dc:date>${dateString}.000000000</dc:date>`)
        }
    }

    async addZoteroPrefs() {
        // Add citation style property to meta.xml
        if (!this.metadata.citationStyle) {
            return Promise.resolve()
        }

        const metaEl = this.metaXml.query("office:meta")

        // Remove any existing ZOTERO_PREF_ properties
        const existingZoteroProps = this.metaXml
            .queryAll("meta:user-defined")
            .filter(
                prop =>
                    prop.getAttribute("meta:name") &&
                    prop.getAttribute("meta:name").startsWith("ZOTERO_PREF_")
            )
        existingZoteroProps.forEach(prop =>
            prop.parentElement.removeChild(prop)
        )

        // Determine if the citation style has a bibliography
        const hasBib = await this.hasBibliography()

        // Create the data content
        const citationStyleUrl = `http://www.zotero.org/styles/${(0,_common__rspack_import_0.escapeText)(this.metadata.citationStyle)}`
        const dataContent = (0,_common__rspack_import_0.escapeText)(
            `<data data-version="3" zotero-version="8.0.2"><session id=""/><style id="${citationStyleUrl}" locale="${(0,_common__rspack_import_0.escapeText)(this.metadata.language || "en-US")}" hasBibliography="${hasBib}" bibliographyStyleHasBeenSet="1"/><prefs><pref name="fieldType" value="ReferenceMark"/><pref name="automaticJournalAbbreviations" value="true"/></prefs></data>`
        )

        // Split content into chunks of 378 characters (ODT limit)
        const chunkSize = 378
        const chunks = []
        for (let i = 0; i < dataContent.length; i += chunkSize) {
            chunks.push(dataContent.substring(i, i + chunkSize))
        }

        // Create meta:user-defined elements for each chunk
        chunks.forEach((chunk, index) => {
            const propName = `ZOTERO_PREF_${index + 1}`
            const userDefinedEl = `<meta:user-defined meta:name="${propName}">${chunk}</meta:user-defined>`
            metaEl.appendXML(userDefinedEl)
        })

        return Promise.resolve()
    }
}


}),
"./js/modules/exporter/odt/render.js": (function (__unused_rspack_module, __webpack_exports__, __webpack_require__) {
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  ODTExporterRender: function() { return ODTExporterRender; },
  createOdtBibliographyMark: function() { return createOdtBibliographyMark; }
});
/* import */ var _common__rspack_import_0 = __webpack_require__("./js/modules/common/index.js");
/* import */ var _schema_i18n__rspack_import_1 = __webpack_require__("./js/modules/schema/i18n.js");
/* import */ var _tools_doc_content__rspack_import_2 = __webpack_require__("./js/modules/exporter/tools/doc_content.js");
/* import */ var _tools_xml__rspack_import_3 = __webpack_require__("./js/modules/exporter/tools/xml.js");





/**
 * Create Zotero bibliography reference mark name for ODT.
 * @returns {string} Reference mark name
 */
function createOdtBibliographyMark() {
    return "ZOTERO_BIBL CSL_BIBLIOGRAPHY"
}

class ODTExporterRender {
    constructor(xml) {
        this.xml = xml

        this.filePath = "content.xml"
        this.text = false
    }

    init() {
        return this.xml.getXml(this.filePath).then(xml => {
            this.text = xml.query("office:text")
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
        const bibliographyHeader =
            settings.bibliography_header[settings.language] ||
            _schema_i18n__rspack_import_1.BIBLIOGRAPHY_HEADERS[settings.language]
        tags.push({
            title: "@bibliography", // The '@' triggers handling as block
            content: pmBib
                ? [
                      {
                          type: "bibliography_heading",
                          content: [{type: "text", text: bibliographyHeader}]
                      },
                      pmBib
                  ]
                : [{type: "paragraph", content: [{type: "text", text: " "}]}]
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
                                              title: license.url
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

    // go through content.xml looking for tags and replace them with the given
    // replacements.
    render(docContent, pmBib, settings, richtext, citations) {
        const tags = this.getTagData(docContent, pmBib, settings)
        const textBlocks = this.text.queryAll(["text:p", "text:h"])
        textBlocks.forEach(block => {
            if (block.parentElement.nodeName === "text:deletion") {
                // Inside of tracked changes deletion, don't do anything
                return
            }
            const text = block.textContent
            tags.forEach(tag => {
                const tagString = tag.title
                if (text.includes(`{${tagString}}`)) {
                    tag.block = block
                    if (tag.title[0] === "@") {
                        this.blockRender(tag, richtext, citations)
                    } else {
                        this.inlineRender(tag)
                    }
                }
            })
        })
    }

    // Render Tags that only exchange inline content
    inlineRender(tag) {
        const texts = tag.block.textContent.split(`{${tag.title}}`)
        const fullText = texts[0] + (tag.content ? tag.content : "") + texts[1]
        tag.block.innerXML = (0,_common__rspack_import_0.escapeText)(fullText).replace(/^\s+|\s+$/g, match =>
            "<text:s/>".repeat(match.length)
        )
    }

    // Render tags that exchange text blocks
    blockRender(tag, richtext, citations) {
        const section = tag.block.hasAttribute("text:style-name")
            ? tag.block.getAttribute("text:style-name")
            : "Text_20_body"
        const outXML = tag.content
            ? tag.content
                  .map((content, contentIndex) =>
                      richtext.run(
                          content,
                          {
                              citationType: citations.citFm.citationType,
                              section,
                              tag: tag.title.slice(1)
                          },
                          tag,
                          contentIndex
                      )
                  )
                  .join("")
            : ""

        if (!outXML.length) {
            // If there is no content, we need to put in a space to prevent the
            // tag from being removed by LibreOffice.
            tag.block.innerXML = "<text:s/>"
            return
        }
        const parentElement = tag.block.parentElement
        const dom = (0,_tools_xml__rspack_import_3.xmlDOM)(outXML)
        const domPars = dom.node["#document"]?.slice() || [dom]
        domPars.forEach(node => parentElement.insertBefore(node, tag.block))

        parentElement.removeChild(tag.block)
    }
}


}),
"./js/modules/exporter/odt/richtext.js": (function (__unused_rspack_module, __webpack_exports__, __webpack_require__) {
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  ODTExporterRichtext: function() { return ODTExporterRichtext; }
});
/* import */ var _common__rspack_import_0 = __webpack_require__("./js/modules/common/index.js");
/* import */ var _schema_i18n__rspack_import_1 = __webpack_require__("./js/modules/schema/i18n.js");
/* import */ var _tools_zotero_csl__rspack_import_2 = __webpack_require__("./js/modules/exporter/tools/zotero_csl.js");




const TEXT_TYPES = {
    heading1: {tag: "text:h", attrs: _options => 'text:outline-level="1"'},
    heading2: {tag: "text:h", attrs: _options => 'text:outline-level="2"'},
    heading3: {tag: "text:h", attrs: _options => 'text:outline-level="3"'},
    heading4: {tag: "text:h", attrs: _options => 'text:outline-level="4"'},
    heading5: {tag: "text:h", attrs: _options => 'text:outline-level="5"'},
    heading6: {tag: "text:h", attrs: _options => 'text:outline-level="6"'},
    paragraph: {
        tag: "text:p",
        attrs: options => `text:style-name="${options.section}"`
    },
    code_block: {
        tag: "text:p",
        attrs: _options => 'text:style-name="Preformatted_20_Text"'
    }
}

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
 * Create Zotero reference mark name for ODT.
 * @param {Array} references - Array of {id, prefix?, locator?} from citation node
 * @param {Object} bibDB - Bibliography database
 * @param {string} formattedCitation - Pre-formatted citation text from citeproc
 * @param {string} citationId - Optional citation ID (generated if not provided)
 * @returns {string} Reference mark name with JSON encoded
 */

// Generate a random ID for Zotero bibliography section + Zotero citations
// Format: RND + random alphanumeric string (10 characters)
function generateZoteroId() {
    const chars =
        "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789"
    const length = 10
    let result = "RND"
    for (let i = 0; i < length; i++) {
        result += chars.charAt(Math.floor(Math.random() * chars.length))
    }
    return result
}

function createZoteroCitationMark(
    references,
    bibDB,
    formattedCitation,
    citationId = null
) {
    const zoteroCitation = (0,_tools_zotero_csl__rspack_import_2.createZoteroCitation)(
        references,
        bibDB,
        formattedCitation,
        citationId
    )
    if (!zoteroCitation) {
        return null
    }

    const jsonStr = JSON.stringify(zoteroCitation)
    // In ODT, quotes must be encoded as &quot; in attribute values
    const encodedJson = jsonStr.replace(/"/g, "&quot;")
    const zoteroId = generateZoteroId()
    return `ZOTERO_ITEM CSL_CITATION ${encodedJson} ${zoteroId}`
}

class ODTExporterRichtext {
    constructor(
        comments,
        settings,
        styles,
        tracks,
        footnotes,
        citations,
        math,
        images
    ) {
        this.comments = comments
        this.styles = styles
        this.tracks = tracks
        this.footnotes = footnotes
        this.citations = citations
        this.settings = settings
        this.math = math
        this.images = images

        this.imgCounter = 1
        this.fnCounter = 0 // real footnotes
        this.fnAlikeCounter = 0 // real footnotes and citations as footnotes
        this.categoryCounter = {} // counters for each type of table/figure category (figure/table/photo)
        this.fnCategoryCounter = {} // counters for each type of table/figure category (figure/table/photo)
        this.zIndex = 0
        this.citationCounter = 0 // Track which citation we're processing
    }

    run(node, options = {}, parent = null, siblingIndex = 0) {
        options.comments = this.findComments(node) // Data related to comments. We need to mark the first and last occurence of comment
        return this.transformRichtext(node, options, parent, siblingIndex)
    }

    findComments(node, comments = {}) {
        if (node.marks) {
            node.marks
                .filter(mark => mark.type === "comment")
                .forEach(comment => {
                    if (!comments[comment.attrs.id]) {
                        comments[comment.attrs.id] = {
                            start: node,
                            end: node,
                            content: this.comments[comment.attrs.id]
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

    transformRichtext(node, options = {}, parent = null, siblingIndex = 0) {
        let start = "",
            content = "",
            end = ""
        const siblings = parent?.content || []
        const previousSibling = siblings[siblingIndex - 1]
        const nextSibling = siblings[siblingIndex + 1]

        const inlineNode = INLINE_TYPES.includes(node.type)

        let blockDelete, blockInsert

        if (!inlineNode && node.attrs?.track) {
            blockDelete = node.attrs.track.find(
                mark => mark.type === "deletion"
            )
            if (blockDelete) {
                options = Object.assign({}, options)
                options.blockDelete = blockDelete
            }
            blockInsert = node.attrs.track.find(
                mark => mark.type === "insertion"
            )
            if (blockInsert) {
                options = Object.assign({}, options)
                options.blockInsert = blockInsert
            }
        }

        if (node.marks) {
            node.marks
                .filter(mark => mark.type === "comment")
                .forEach(comment => {
                    const commentData = options.comments[comment.attrs.id]
                    if (!commentData || !commentData.content) {
                        return
                    }
                    if (commentData.start === node) {
                        start += `<office:annotation office:name="comment_${options.tag}_${comment.attrs.id}" loext:resolved="${commentData.content.resolved}">
                                     <dc:creator>${(0,_common__rspack_import_0.escapeText)(commentData.content.username)}</dc:creator>
                                        <dc:date>${new Date(commentData.content.date).toISOString().slice(0, -1)}000000</dc:date>
                                        ${commentData.content.comment.map(node => this.transformRichtext(node, options)).join("")}
                                    </office:annotation>`
                    }
                    if (commentData.end === node) {
                        end =
                            `<office:annotation-end office:name="comment_${options.tag}_${comment.attrs.id}"/>` +
                            (commentData.content.answers || [])
                                .map(
                                    answer =>
                                        `<office:annotation loext:resolved="${commentData.content.resolved}">
                                    <dc:creator>${(0,_common__rspack_import_0.escapeText)(answer.username)}</dc:creator>
                                    <dc:date>${new Date(answer.date).toISOString().slice(0, -1)}000000</dc:date>
                                    ${answer.answer.map(node => this.transformRichtext(node, options)).join("")}
                                </office:annotation>`
                                )
                                .join("") +
                            end
                    }
                })
        }

        switch (node.type) {
            case "bibliography_heading":
                this.styles.checkParStyle("Bibliography_20_Heading")
                start += '<text:p text:style-name="Bibliography_20_Heading">'
                end = "</text:p>" + end
                break
            case "code_block":
            case "heading1":
            case "heading2":
            case "heading3":
            case "heading4":
            case "heading5":
            case "heading6":
            case "paragraph": {
                // Handles all types of text blocks.
                if (node.type === "code_block") {
                    this.styles.checkParStyle("Preformatted_20_Text")
                } else if (node.type === "paragraph") {
                    if (!options.section) {
                        options.section = "Text_20_body"
                    }
                    this.styles.checkParStyle(options.section)
                }
                const nextBlockDelete = nextSibling?.attrs?.track?.find(
                    mark => mark.type === "deletion"
                )
                const nextBlockInsert = nextSibling?.attrs?.track?.find(
                    mark => mark.type === "insertion"
                )
                let lastNonMergedBlock
                if (blockDelete) {
                    // This block has been deleted, so we need to check which text block
                    // it is being merged in to. If it has, we need to merge the
                    // two blocks.
                    if (!previousSibling || !TEXT_TYPES[previousSibling.type]) {
                        // We cannot merge into previous block. Therefore, we don't consider
                        // this text block as merged.
                        blockDelete = false
                    } else {
                        let searchNode = previousSibling
                        while (searchNode && TEXT_TYPES[searchNode.type]) {
                            lastNonMergedBlock = searchNode
                            if (
                                searchNode?.attrs?.track?.find(
                                    mark => mark.type === "deletion"
                                )
                            ) {
                                searchNode =
                                    siblings[siblings.indexOf(searchNode) - 1]
                            } else {
                                searchNode = false
                            }
                        }
                    }
                }
                if (blockDelete) {
                    // This block has been deleted, so instead we just add a text
                    // change marker.
                    if (previousSibling.type === "paragraph") {
                        if (!options.section) {
                            options.section = "Text_20_body"
                        }
                        this.styles.checkParStyle(options.section)
                    }
                    const trackId = this.tracks.addChange(
                        blockDelete,
                        `
                        <${TEXT_TYPES[previousSibling.type].tag} ${TEXT_TYPES[previousSibling.type].attrs(options)}/>
                        <${TEXT_TYPES[node.type].tag} ${TEXT_TYPES[node.type].attrs(options)}/>`
                    )
                    start += `<text:change text:change-id="${trackId}"/>`
                } else {
                    start += `<${TEXT_TYPES[node.type].tag} ${TEXT_TYPES[node.type].attrs(options)}>`
                }
                if (blockInsert && blockInsert.trackId) {
                    // The previous block node is a text node , so the insertion is a textblock split.
                    // We need to put change track marks in both this and the previous text block.
                    start += `<text:change-end text:change-id="${blockInsert.trackId}"/>`
                }
                const nextBlockDeleteTextType =
                    nextBlockDelete && TEXT_TYPES[nextSibling.type]
                if (!nextBlockDeleteTextType) {
                    const lastNonMergedBlockTextType =
                        lastNonMergedBlock &&
                        TEXT_TYPES[lastNonMergedBlock.type]
                    if (lastNonMergedBlockTextType) {
                        // This block has been deleted and the next block is not.
                        // So we end it here as the last known non-deleted block type.
                        end = `</${lastNonMergedBlockTextType.tag}>` + end
                    } else {
                        // The next block is not deleted, so we close this block.
                        end = `</${TEXT_TYPES[node.type].tag}>` + end
                    }
                }
                if (nextBlockInsert && TEXT_TYPES[nextSibling.type]) {
                    // The following block node is a text node , so the insertion is a textblock split.
                    // We need to put change track marks in both this and the next text block.
                    const trackId = this.tracks.addChange(nextBlockInsert)
                    end =
                        `<text:change-start text:change-id="${trackId}"/>` + end
                    // Adding the track id here so that we can add find it at the beginning of the next text block.
                    nextBlockInsert.trackId = trackId
                }
                if (TEXT_TYPES[node.type].tag === "text:h") {
                    start += `<text:bookmark-start text:name="${node.attrs.id}"/>`
                    end =
                        `<text:bookmark-end text:name="${node.attrs.id}"/>` +
                        end
                }
                // Handle code block category labels
                if (node.type === "code_block") {
                    const category = node.attrs.category
                    if (category && node.attrs.id) {
                        const categoryCounter = options.inFootnote
                            ? this.fnCategoryCounter
                            : this.categoryCounter
                        if (!categoryCounter[category]) {
                            categoryCounter[category] = 1
                        }
                        const catCount = categoryCounter[category]++
                        const catCountXml = `<text:sequence text:ref-name="ref${category}${catCount - 1}${options.inFootnote ? "A" : ""}" text:name="${category}" text:formula="ooow:${category}+1" style:num-format="1">${catCount}${options.inFootnote ? "A" : ""}</text:sequence>`
                        const title = node.attrs.title
                            ? `: ${(0,_common__rspack_import_0.escapeText)(node.attrs.title)}`
                            : ""
                        const categoryLabel = `<text:bookmark-start text:name="${node.attrs.id}"/>${_schema_i18n__rspack_import_1.CATS[category][this.settings.language]} ${catCountXml}${title}<text:bookmark-end text:name="${node.attrs.id}"/><text:line-break/>`
                        start += categoryLabel
                    }
                }
                break
            }
            case "blockquote":
                // This is imperfect, but Word doesn't seem to provide section/quotation nesting
                options = Object.assign({}, options)
                options.section = "Quote"
                break
            case "ordered_list": {
                const olId = this.styles.getOrderedListStyleId(node.attrs.order)
                start += `<text:list text:style-name="L${olId[0]}">`
                end = "</text:list>" + end
                options = Object.assign({}, options)
                options.section = `P${olId[1]}`
                options.listStyles = (options.listStyles || []).concat([
                    `L${olId[0]}`
                ])
                break
            }
            case "bullet_list": {
                const ulId = this.styles.getBulletListStyleId()
                start += `<text:list text:style-name="L${ulId[0]}">`
                end = "</text:list>" + end
                options = Object.assign({}, options)
                options.section = `P${ulId[1]}`
                options.listStyles = (options.listStyles || []).concat([
                    `L${ulId[0]}`
                ])
                break
            }
            case "list_item":
                start += "<text:list-item>"
                end = "</text:list-item>" + end
                break
            case "footnotecontainer":
                break
            case "footnote": {
                const fnCounter = this.fnAlikeCounter++
                const fnOptions = Object.assign({}, options)
                fnOptions.section = "Footnote"
                fnOptions.tag = `footnote${fnCounter}`
                fnOptions.inFootnote = true
                const fnNode = {
                    type: "footnotecontainer",
                    content: node.attrs.footnote
                }
                fnOptions.comments = this.findComments(fnNode)
                content += this.transformRichtext(fnNode, fnOptions)
                start += `
                <text:note text:id="ftn${fnCounter}" text:note-class="footnote">
                    <text:note-citation>${fnCounter}</text:note-citation>
                    <text:note-body>`
                end =
                    `
                    </text:note-body>
                </text:note>` + end
                break
            }
            case "text": {
                let hyperlink,
                    strong,
                    em,
                    underline,
                    sup,
                    sub,
                    smallcaps,
                    code,
                    anchor
                // Check for hyperlink, bold/strong and italic/em
                if (node.marks) {
                    hyperlink = node.marks.find(mark => mark.type === "link")
                    anchor = node.marks.find(mark => mark.type === "anchor")
                    strong = node.marks.find(mark => mark.type === "strong")
                    em = node.marks.find(mark => mark.type === "em")
                    underline = node.marks.find(
                        mark => mark.type === "underline"
                    )
                    smallcaps = node.marks.find(
                        mark => mark.type === "smallcaps"
                    )
                    sup = node.marks.find(mark => mark.type === "sup")
                    sub = node.marks.find(mark => mark.type === "sub")
                    code = node.marks.find(mark => mark.type === "code")
                }

                if (hyperlink) {
                    start += `<text:a xlink:type="simple" xlink:href="${(0,_common__rspack_import_0.escapeText)(hyperlink.attrs.href)}">`
                    end = "</text:a>" + end
                }
                if (anchor) {
                    start += `<text:reference-mark-start text:name="${anchor.attrs.id}"/>`
                    end =
                        `<text:reference-mark-end text:name="${anchor.attrs.id}"/>` +
                        end

                    start += `<text:bookmark-start text:name="${anchor.attrs.id}"/>`
                    end =
                        `<text:bookmark-end text:name="${anchor.attrs.id}"/>` +
                        end
                }

                let attributes = ""

                if (em) {
                    attributes += "e"
                }
                if (strong) {
                    attributes += "s"
                }
                if (underline) {
                    attributes += "u"
                }
                if (smallcaps) {
                    attributes += "c"
                }
                if (sup) {
                    attributes += "p"
                } else if (sub) {
                    attributes += "b"
                }
                if (code) {
                    attributes += "t"
                }

                if (attributes.length) {
                    const styleId = this.styles.getInlineStyleId(attributes)
                    start += `<text:span text:style-name="T${styleId}">`
                    end = "</text:span>" + end
                }

                content += (0,_common__rspack_import_0.escapeText)(node.text).replace(/^\s+|\s+$/g, match =>
                    "<text:s/>".repeat(match.length)
                )
                break
            }
            case "citation": {
                let cit
                // We take the first citation from the stack and remove it.
                if (options.inFootnote) {
                    cit = this.footnotes.citations.pmCits.shift()
                } else {
                    cit = this.citations.pmCits.shift()
                }

                // Get citation info and formatted text for Zotero export
                const citInfo = this.citations.citInfos[this.citationCounter]
                const formattedText =
                    this.citations.citationTexts[this.citationCounter]
                this.citationCounter++

                // Create Zotero citation data on-the-fly
                const markName =
                    citInfo && formattedText
                        ? createZoteroCitationMark(
                              citInfo.references,
                              this.citations.bibDB,
                              formattedText
                          )
                        : null

                if (options.citationType === "note" && !options.inFootnote) {
                    // If the citations are in notes (footnotes), we need to
                    // put the contents of this citation in a footnote.

                    if (markName && formattedText) {
                        // Create Zotero reference mark for footnote citation
                        start += `
                    <text:note text:id="ftn${this.fnAlikeCounter++}" text:note-class="footnote">
                        <text:note-citation>${this.fnAlikeCounter}</text:note-citation>
                        <text:note-body>
                            <text:p text:style-name="Footnote">
                                <text:reference-mark-start text:name="${markName}"/>`
                        content = formattedText
                        end =
                            `<text:reference-mark-end text:name="${markName}"/></text:p>
                            </text:note-body>
                    </text:note>` + end
                    } else {
                        // Fallback to non-Zotero format
                        start += `
                    <text:note text:id="ftn${this.fnAlikeCounter++}" text:note-class="footnote">
                        <text:note-citation>${this.fnAlikeCounter}</text:note-citation>
                        <text:note-body>`
                        end =
                            `
                        </text:note-body>
                    </text:note>` + end
                        options = Object.assign({}, options)
                        options.section = "Footnote"
                        content += this.transformRichtext(
                            {type: "paragraph", content: cit.content},
                            options
                        )
                    }
                } else {
                    // For in-text citations, create Zotero reference mark
                    if (markName && formattedText) {
                        start += `<text:reference-mark-start text:name="${markName}"/>`
                        content = formattedText
                        end =
                            `<text:reference-mark-end text:name="${markName}"/>` +
                            end
                    } else {
                        // Fallback to formatted text only
                        cit.content.forEach(citContent => {
                            content += this.transformRichtext(
                                citContent,
                                options
                            )
                        })
                    }
                }

                break
            }
            case "figure": {
                // NOTE: The difficulty is to make several images with different
                // alignments/widths not overlap one-another. The below code
                // makes a reasonable attempt at that, but it seems there is no
                // way to guarantee it from happening.
                options = Object.assign({}, options)
                options.section = "Standard"
                this.styles.checkParStyle(options.section)
                start += `<text:p text:style-name="${options.section}">`
                end = "</text:p>" + end

                if (node.attrs.aligned === "center") {
                    // Needed to prevent subsequent image from overlapping
                    end = end + '<text:p text:style-name="Standard"></text:p>'
                }
                const figureCaption = node.content.find(
                    node => node.type === "figure_caption"
                )
                let caption = node.attrs.caption
                    ? figureCaption?.content
                          ?.map((node, index) =>
                              this.transformRichtext(
                                  node,
                                  options,
                                  figureCaption,
                                  index
                              )
                          )
                          .join("") || ""
                    : ""
                // The figure category should not be in the
                // user's language but rather the document language
                const category = node.attrs.category
                if (category !== "none") {
                    const categoryCounter = options.inFootnote
                        ? this.fnCategoryCounter
                        : this.categoryCounter
                    if (!categoryCounter[category]) {
                        categoryCounter[category] = 1
                    }
                    const catCount = categoryCounter[category]++
                    const catCountXml = `<text:sequence text:ref-name="ref${category}${catCount - 1}${options.inFootnote ? "A" : ""}" text:name="${category}" text:formula="ooow:${category}+1" style:num-format="1">${catCount}${options.inFootnote ? "A" : ""}</text:sequence>`
                    if (caption.length) {
                        caption = `<text:bookmark-start text:name="${node.attrs.id}"/>${_schema_i18n__rspack_import_1.CATS[category][this.settings.language]} ${catCountXml}<text:bookmark-end text:name="${node.attrs.id}"/>: ${caption}`
                    } else {
                        caption = `<text:bookmark-start text:name="${node.attrs.id}"/>${_schema_i18n__rspack_import_1.CATS[category][this.settings.language]} ${catCountXml}<text:bookmark-end text:name="${node.attrs.id}"/>`
                    }
                }
                let relWidth = node.attrs.width
                let aligned = node.attrs.aligned
                let frame
                const image =
                    node.content.find(node => node.type === "image")?.attrs
                        .image || false
                if (caption.length || image === false) {
                    frame = true
                    this.styles.checkParStyle("Caption")
                    this.styles.checkParStyle("Figure")
                    const graphicStyleId = this.styles.getGraphicStyleId(
                        "Frame",
                        aligned
                    )
                    start += `<draw:frame draw:style-name="fr${graphicStyleId}" draw:name="Frame${graphicStyleId}" text:anchor-type="paragraph" svg:width="0.0161in" style:rel-width="${relWidth}%" draw:z-index="${this.zIndex++}">
                        <draw:text-box fo:min-height="0in">
                            <text:p text:style-name="Figure">`
                    relWidth = "100" // percentage width of image inside of frame is always 100
                    aligned = "center" // Aligned inside of frame is always 'center'
                    end =
                        `
                            </text:p>
                        </draw:text-box>
                    </draw:frame>` + end
                    if (caption.length) {
                        end = `<text:line-break />${caption}` + end
                    }
                }
                if (image !== false) {
                    const imageEntry = this.images.images[image]

                    const height = (imageEntry.height * 3) / 4 // more or less px to point
                    const width = (imageEntry.width * 3) / 4 // more or less px to point
                    const graphicStyleId = this.styles.getGraphicStyleId(
                        "Graphics",
                        aligned
                    )
                    content += `
                        <draw:frame draw:style-name="${graphicStyleId}" draw:name="Image${this.imgCounter++}" text:anchor-type="${frame && !blockInsert ? "char" : "as-char"}" style:rel-width="${relWidth}%" style:rel-height="scale" svg:width="${width}pt" svg:height="${height}pt" draw:z-index="${this.zIndex++}">
                            ${
                                imageEntry.svg
                                    ? `<draw:image xlink:href="Pictures/${imageEntry.svg}" xlink:type="simple" xlink:show="embed" xlink:actuate="onLoad" draw:mime-type="image/svg+xml"/>`
                                    : ""
                            }
                            <draw:image xlink:href="Pictures/${imageEntry.id}" xlink:type="simple" xlink:show="embed" xlink:actuate="onLoad" draw:mime-type="${imageEntry.type}"/>
                        </draw:frame>`
                } else {
                    const latex = node.content.find(
                        node => node.type === "figure_equation"
                    )?.attrs.equation
                    const objectNumber = this.math.addMath(latex)
                    const graphicStyleId =
                        this.styles.getGraphicStyleId("Formula")
                    content += `
                        <draw:frame draw:style-name="${graphicStyleId}" draw:name="Object${objectNumber}" text:anchor-type="as-char" draw:z-index="${this.zIndex++}">
                            <draw:object xlink:href="./Object ${objectNumber}" xlink:type="simple" xlink:show="embed" xlink:actuate="onLoad"/>
                            <svg:desc>formula</svg:desc>
                        </draw:frame>`
                }
                if (category === "none") {
                    content = `<text:bookmark-start text:name="${node.attrs.id}"/>${content}<text:bookmark-end text:name="${node.attrs.id}"/>`
                }
                if (blockDelete) {
                    const trackId = this.tracks.addChange(
                        blockDelete,
                        `<text:p text:style-name="Figure">${content}<text:span>‍‍</text:span></text:p>`
                    )
                    content = `<text:change text:change-id="${trackId}"/>`
                }
                if (blockInsert) {
                    const trackId = this.tracks.addChange(blockInsert)
                    start += `<text:change-start text:change-id="${trackId}"/>`
                    end = `<text:change-end text:change-id="${trackId}"/>` + end
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
                if (options.listStyles) {
                    options.listStyles.forEach(listStyle => {
                        end =
                            `<text:list text:continue-numbering="true" text:style-name="${listStyle}"><text:list-item>` +
                            end
                        start += "</text:list-item></text:list>"
                    })
                }
                const tableCaption = node.content[0]
                let caption = node.attrs.caption
                    ? tableCaption?.content
                          ?.map((node, index) =>
                              this.transformRichtext(
                                  node,
                                  options,
                                  tableCaption,
                                  index
                              )
                          )
                          .join("") || ""
                    : ""
                // The table category should not be in the
                // user's language but rather the document language
                const category = node.attrs.category
                if (category !== "none") {
                    const categoryCounter = options.inFootnote
                        ? this.fnCategoryCounter
                        : this.categoryCounter
                    if (!categoryCounter[category]) {
                        categoryCounter[category] = 1
                    }
                    const catCount = categoryCounter[category]++
                    const catCountXml = `<text:sequence text:ref-name="ref${category}${catCount - 1}${options.inFootnote ? "A" : ""}" text:name="${category}" text:formula="ooow:${category}+1" style:num-format="1">${catCount}${options.inFootnote ? "A" : ""}</text:sequence>`
                    if (caption.length) {
                        caption = `<text:bookmark-start text:name="${node.attrs.id}"/>${_schema_i18n__rspack_import_1.CATS[category][this.settings.language]} ${catCountXml}<text:bookmark-end text:name="${node.attrs.id}"/>: ${caption}`
                    } else {
                        caption = `<text:bookmark-start text:name="${node.attrs.id}"/>${_schema_i18n__rspack_import_1.CATS[category][this.settings.language]} ${catCountXml}<text:bookmark-end text:name="${node.attrs.id}"/>`
                    }
                }
                if (caption.length) {
                    if (!options.section) {
                        options.section = "Text_20_body"
                    }
                    this.styles.checkParStyle(options.section)
                    start += `<text:p text:style-name="${options.section}">${caption}</text:p>`
                }
                const columns = node.content[1].content[0].content.length
                const styleId = this.styles.getTableStyleId(
                    node.attrs.aligned,
                    node.attrs.width
                )
                start += `<table:table table:name="Table${styleId}" table:style-name="Table${styleId}">`
                start += `<table:table-column table:number-columns-repeated="${columns}" />`
                end = "</table:table>" + end
                break
            }
            case "table_body":
                // Pass through to table.
                break
            case "table_caption":
                // We already deal with this in 'table'.
                return ""
            case "table_row":
                start += "<table:table-row>"
                end = "</table:table-row>" + end
                break
            case "table_cell":
            case "table_header":
                if (node.attrs.rowspan && node.attrs.colspan) {
                    start += `<table:table-cell${
                        node.attrs.rowspan > 1
                            ? ` table:number-rows-spanned="${node.attrs.rowspan}"`
                            : ""
                    }${
                        node.attrs.colspan > 1
                            ? ` table:number-columns-spanned="${node.attrs.colspan}"`
                            : ""
                    } office:value-type="string">`
                    end = "</table:table-cell>" + end
                } else {
                    start += "<table:covered-table-cell/>"
                }
                break
            case "equation": {
                const latex = node.attrs.equation
                const objectNumber = this.math.addMath(latex)
                const styleId = this.styles.getGraphicStyleId("Formula")
                content += `<draw:frame draw:style-name="${styleId}" draw:name="Object${objectNumber}" text:anchor-type="as-char" draw:z-index="${this.zIndex++}">
                        <draw:object xlink:href="./Object ${objectNumber}" xlink:type="simple" xlink:show="embed" xlink:actuate="onLoad"/>
                        <svg:desc>formula</svg:desc>
                    </draw:frame>`
                break
            }
            case "cross_reference": {
                const title = node.attrs.title
                const id = node.attrs.id
                if (title) {
                    start += `<text:bookmark-ref text:reference-format="text" text:ref-name="${id}">`
                    end = "</text:bookmark-ref>" + end
                }
                content += (0,_common__rspack_import_0.escapeText)(title || "MISSING TARGET")
                break
            }
            case "hard_break":
                content += "<text:line-break/>"
                break
            // CSL bib entries
            case "cslbib": {
                options = Object.assign({}, options)
                options.section = "Bibliography_20_1"
                // Ensure Sect1 section style exists
                this.styles.checkSectionStyle("Sect1")
                // Generate a unique bibliography ID for this document
                const bibId = generateZoteroId()
                start += `<text:section text:style-name="Sect1" text:name="ZOTERO_BIBL CSL_BIBLIOGRAPHY ${bibId}">`
                end = "</text:section>" + end
                break
            }
            case "cslblock":
                end = "<text:line-break/>" + end
                break
            case "cslleftmargin":
                end = "<text:tab/>" + end
                break
            case "cslindent":
                start += "<text:tab/>"
                end = "<text:line-break/>" + end
                break
            case "cslentry":
                this.styles.checkParStyle(options.section)
                start += `<text:p text:style-name="${options.section}">`
                end = "</text:p>" + end
                break
            case "cslinline":
            case "cslrightinline":
                break
            default:
                break
        }

        if (node.content) {
            for (let i = 0; i < node.content.length; i++) {
                content += this.transformRichtext(
                    node.content[i],
                    options,
                    node,
                    i
                )
            }
        }

        if (inlineNode) {
            const inlineInsert =
                node.marks?.find(
                    mark =>
                        mark.type === "insertion" &&
                        mark.attrs.approved === false
                )?.attrs || blockInsert
            const inlineDelete =
                node.marks?.find(mark => mark.type === "deletion")?.attrs ||
                options.blockDelete
            if (inlineDelete) {
                if (parent) {
                    const trackId = this.tracks.addChange(
                        Object.assign({type: "deletion"}, inlineDelete),
                        `<${TEXT_TYPES[parent.type]?.tag || "text:p"} ${TEXT_TYPES[parent.type]?.attrs(options) || `text:style-name="${options.section}"`}>${
                            start + content + end
                        }</${TEXT_TYPES[parent.type]?.tag || "text:p"}>`
                    )
                    content = `<text:change text:change-id="${trackId}"/>`
                } else {
                    content = ""
                }
                start = ""
                end = ""
            }
            if (inlineInsert) {
                const trackId = this.tracks.addChange(
                    Object.assign({type: "insertion"}, inlineInsert)
                )
                start += `<text:change-start text:change-id="${trackId}"/>`
                end = `<text:change-end text:change-id="${trackId}"/>` + end
            }
        }
        return start + content + end
    }
}


}),
"./js/modules/exporter/odt/styles.js": (function (__unused_rspack_module, __webpack_exports__, __webpack_require__) {
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  ODTExporterStyles: function() { return ODTExporterStyles; }
});
const GRAPHIC_STYLES = {
    Formula: `
        <style:style style:name="Formula" style:family="graphic">
            <style:graphic-properties text:anchor-type="as-char" svg:y="0in" fo:margin-left="0.0791in" fo:margin-right="0.0791in" style:vertical-pos="middle" style:vertical-rel="text"/>
        </style:style>`,
    Graphics: `
        <style:style style:name="Graphics" style:family="graphic">
            <style:graphic-properties text:anchor-type="paragraph" svg:x="0in" svg:y="0in" style:wrap="dynamic" style:number-wrapped-paragraphs="no-limit" style:wrap-contour="false" style:vertical-pos="top" style:vertical-rel="paragraph" style:horizontal-pos="center" style:horizontal-rel="paragraph"/>
        </style:style>`,
    Frame: `
        <style:style style:name="Frame" style:family="graphic">
            <style:graphic-properties text:anchor-type="paragraph" svg:x="0in" svg:y="0in" style:wrap="dynamic" style:number-wrapped-paragraphs="no-limit" style:wrap-contour="false" style:vertical-pos="top" style:vertical-rel="paragraph" style:horizontal-pos="center" style:horizontal-rel="paragraph"/>
        </style:style>`
}

const PAR_STYLES = {
    Bibliography_20_Heading: `<style:style style:name="Bibliography_20_Heading" style:display-name="Bibliography Heading" style:family="paragraph" style:parent-style-name="Heading" style:class="index">
        <style:paragraph-properties fo:margin-left="0in" fo:margin-right="0in" fo:text-indent="0in" style:auto-text-indent="false" text:number-lines="false" text:line-number="0"/>
        <style:text-properties fo:font-size="16pt" fo:font-weight="bold" style:font-size-asian="16pt" style:font-weight-asian="bold" style:font-size-complex="16pt" style:font-weight-complex="bold"/>
    </style:style>`,
    Caption: `<style:style style:name="Caption" style:family="paragraph" style:parent-style-name="Standard" style:class="extra">
            <style:paragraph-properties fo:margin-top="0.0835in" fo:margin-bottom="0.0835in" loext:contextual-spacing="false" text:number-lines="false" text:line-number="0" />
            <style:text-properties fo:font-style="italic" style:font-style-asian="italic" style:font-style-complex="italic" />
        </style:style>`,
    Figure: '<style:style style:name="Figure" style:family="paragraph" style:parent-style-name="Caption" style:class="extra" />',
    Standard:
        '<style:style style:name="Standard" style:family="paragraph" style:class="text" />'
}

class ODTExporterStyles {
    constructor(xml) {
        this.xml = xml

        this.contentXml = false
        this.stylesXml = false
        this.boldStyleId = false
        this.italicStyleId = false
        this.boldItalicStyleId = false
        this.inlineStyleIds = {}
        this.tableStyleIds = {}
        this.graphicStyleIds = {}
        this.bulletListStyleId = [false, false]
        this.inlineStyleCounter = 0
        this.tableStyleCounter = 0
        this.blockStyleCounter = 0
        this.listStyleCounter = 0
        this.graphicStyleCounter = 0
    }

    init() {
        return this.xml
            .getXml("styles.xml")
            .then(stylesXml => {
                this.stylesXml = stylesXml
                return this.xml.getXml("content.xml")
            })
            .then(contentXml => {
                this.contentXml = contentXml
                this.getStyleCounters()
                return Promise.resolve()
            })
    }

    getStyleCounters() {
        const autoStylesEl = this.contentXml.query("office:automatic-styles")
        const styles = autoStylesEl.queryAll("style:style")
        styles.forEach(style => {
            const styleNumber = Number.parseInt(
                style.getAttribute("style:name").replace(/\D/g, "")
            )
            const styleFamily = style.getAttribute("style:family")
            if (styleFamily === "text") {
                if (styleNumber > this.inlineStyleCounter) {
                    this.inlineStyleCounter = styleNumber
                }
            } else if (styleFamily === "table") {
                if (styleNumber > this.tableStyleCounter) {
                    this.tableStyleCounter = styleNumber
                }
            } else if (styleFamily === "paragraph") {
                if (styleNumber > this.blockStyleCounter) {
                    this.blockStyleCounter = styleNumber
                }
            } else if (styleFamily === "graphic") {
                if (styleNumber > this.graphicStyleCounter) {
                    this.graphicStyleCounter = styleNumber
                }
            }
        })
        const listStyles = autoStylesEl.queryAll("text:list-style")
        listStyles.forEach(style => {
            const styleNumber = Number.parseInt(
                style.getAttribute("style:name").replace(/\D/g, "")
            )
            if (styleNumber > this.listStyleCounter) {
                this.listStyleCounter = styleNumber
            }
        })
    }

    /*
    attributes is a string that consists of these characters (in this order).
    Only one of super/sub possible.
    e = italic/em
    s = bold/strong
    u = underline
    c = small caps
    p = super
    b = sub
    t = code (monospace)
    */
    getInlineStyleId(attributes) {
        if (this.inlineStyleIds[attributes]) {
            return this.inlineStyleIds[attributes]
        }

        let styleProperties = ""
        if (attributes.includes("e")) {
            styleProperties +=
                ' fo:font-style="italic" style:font-style-asian="italic" style:font-style-complex="italic"'
        }
        if (attributes.includes("s")) {
            styleProperties +=
                ' fo:font-weight="bold" style:font-weight-asian="bold" style:font-weight-complex="bold"'
        }
        if (attributes.includes("u")) {
            styleProperties +=
                ' style:text-underline-style="solid" style:text-underline-width="auto" style:text-underline-color="font-color"'
        }
        if (attributes.includes("c")) {
            styleProperties += ' fo:font-variant="small-caps"'
        }
        if (attributes.includes("p")) {
            styleProperties += ' style:text-position="super 58%"'
        } else if (attributes.includes("b")) {
            styleProperties += ' style:text-position="sub 58%"'
        }
        if (attributes.includes("t")) {
            styleProperties +=
                ' style:font-name="Courier New" fo:font-family="Courier New"'
        }
        const styleCounter = ++this.inlineStyleCounter
        this.inlineStyleIds[attributes] = styleCounter
        const autoStylesEl = this.contentXml.query("office:automatic-styles")
        autoStylesEl.appendXML(`
            <style:style style:name="T${styleCounter}" style:family="text">
                <style:text-properties${styleProperties}/>
            </style:style>
        `)
        return styleCounter
    }

    /*
    aligned: left/center/right
    width: '75'/'50'/'25' = percentage width - 100% doesn't need any style
    */
    getTableStyleId(aligned, width) {
        if (this.tableStyleIds[aligned + width]) {
            return this.tableStyleIds[aligned + width]
        }
        const styleCounter = ++this.tableStyleCounter
        this.tableStyleIds[aligned + width] = styleCounter
        const autoStylesEl = this.contentXml.query("office:automatic-styles")
        autoStylesEl.appendXML(`
            <style:style style:name="Table${styleCounter}" style:family="table">
                <style:table-properties style:rel-width="${width}%" table:align="${aligned}"/>
            </style:style>
        `)
        return styleCounter
    }

    checkParStyle(styleName) {
        const stylesParStyle = this.stylesXml.query("style:style", {
            "style:name": styleName
        })
        const contentParStyle = this.contentXml.query("style:style", {
            "style:name": styleName
        })
        if (!stylesParStyle && !contentParStyle) {
            const stylesEl = this.stylesXml.query("office:styles")
            const displayName = styleName.split("_20_").join(" ")
            stylesEl.appendXML(
                PAR_STYLES[styleName] ||
                    `<style:style style:name="${styleName}" style:display-name="${displayName}" style:family="paragraph" style:parent-style-name="Standard" style:class="text" />`
            )
        }
    }

    checkGraphicStyle(styleName) {
        const stylesParStyle = this.stylesXml.query("style:style", {
            "style:name": styleName
        })
        const contentParStyle = this.contentXml.query("style:style", {
            "style:name": styleName
        })
        if (!stylesParStyle && !contentParStyle) {
            const stylesEl = this.stylesXml.query("office:styles")
            stylesEl.appendXML(GRAPHIC_STYLES[styleName])
        }
    }

    checkSectionStyle(styleName) {
        const stylesSection = this.stylesXml.query("style:style", {
            "style:name": styleName,
            "style:family": "section"
        })
        const contentSection = this.contentXml.query("style:style", {
            "style:name": styleName,
            "style:family": "section"
        })
        if (!stylesSection && !contentSection) {
            const stylesEl = this.stylesXml.query("office:styles")
            // Add a basic section style if it doesn't exist
            stylesEl.appendXML(
                `<style:style style:name="${styleName}" style:family="section">
                    <style:section-properties text:dont-balance-text-columns="false" fo:background-color="transparent">
                        <style:columns fo:column-count="1" fo:column-gap="0in"/>
                    </style:section-properties>
                </style:style>`
            )
        }
    }

    /*
    styleName: Frame/Formula/Graphics
    aligned: left/center/right (not used for Formula)
    */
    getGraphicStyleId(styleName, aligned = "") {
        if (this.graphicStyleIds[styleName + aligned]) {
            return this.graphicStyleIds[styleName + aligned]
        }
        this.checkGraphicStyle(styleName)

        const styleCounter = ++this.graphicStyleCounter
        this.graphicStyleIds[styleName + aligned] = styleCounter
        const autoStylesEl = this.contentXml.query("office:automatic-styles")
        autoStylesEl.appendXML(`
            <style:style style:name="fr${styleCounter}" style:family="graphic" style:parent-style-name="${styleName}">
                ${
                    styleName === "Formula"
                        ? '<style:graphic-properties style:vertical-pos="from-top" style:horizontal-pos="from-left" style:horizontal-rel="paragraph-content" draw:ole-draw-aspect="1" />'
                        : `<style:graphic-properties fo:margin-left="0in" fo:margin-right="0in" fo:margin-top="0in" fo:margin-bottom="0in" ${aligned === "center" ? 'style:wrap="none"' : 'style:wrap="dynamic"  style:number-wrapped-paragraphs="no-limit"'} style:vertical-pos="top" style:vertical-rel="paragraph" style:horizontal-pos="${aligned}" style:horizontal-rel="paragraph" fo:padding="0in" fo:border="none" loext:rel-width-rel="paragraph" />`
                } style:number-wrapped-paragraphs="no-limit"
            </style:style>`)
        return styleCounter
    }

    addReferenceStyle(bibInfo) {
        // The style called "Bibliography_20_1" will override any previous style
        // of the same name.
        const stylesParStyle = this.stylesXml.query("style:style", {
            "style:name": "Bibliography_20_1"
        })
        if (stylesParStyle) {
            stylesParStyle.parentElement.removeChild(stylesParStyle)
        }
        const contentParStyle = this.contentXml.query("style:style", {
            "style:name": "Bibliography_20_1"
        })
        if (contentParStyle) {
            contentParStyle.parentElement.removeChild(contentParStyle)
        }

        this.checkParStyle("Index")

        const lineHeight = `${0.1665 * bibInfo.linespacing}in`
        const marginBottom = `${0.1667 * bibInfo.entryspacing}in`
        let marginLeft = "0in",
            textIndent = "0in",
            tabStops = "<style:tab-stops/>"

        if (bibInfo.hangingindent) {
            marginLeft = "0.5in"
            textIndent = "-0.5in"
        } else if (bibInfo["second-field-align"]) {
            // We calculate 0.55em as roughly equivalent to one letter width.
            const firstFieldWidth = `${(bibInfo.maxoffset + 1) * 0.55}em`
            if (bibInfo["second-field-align"] === "margin") {
                textIndent = `-${firstFieldWidth}`
                tabStops =
                    '<style:tab-stops><style:tab-stop style:position="0in"/></style:tab-stops>'
            } else {
                textIndent = `-${firstFieldWidth}`
                marginLeft = `${firstFieldWidth}`
                tabStops = `<style:tab-stops><style:tab-stop style:position="${firstFieldWidth}"/></style:tab-stops>`
            }
        }
        const styleDef = `
            <style:style style:name="Bibliography_20_1" style:display-name="Bibliography 1" style:family="paragraph" style:parent-style-name="Index" style:class="index">
                <style:paragraph-properties fo:margin-left="${marginLeft}" fo:margin-right="0in" fo:margin-top="0in" fo:margin-bottom="${marginBottom}" loext:contextual-spacing="false" fo:text-indent="${textIndent}" style:line-height-at-least="${lineHeight}" style:auto-text-indent="false">
                    ${tabStops}
                </style:paragraph-properties>
            </style:style>`
        const stylesEl = this.stylesXml.query("office:styles")
        stylesEl.appendXML(styleDef)
    }

    getBulletListStyleId() {
        if (this.bulletListStyleId[0]) {
            return this.bulletListStyleId
        }
        this.bulletListStyleId[0] = ++this.listStyleCounter
        const autoStylesEl = this.contentXml.query("office:automatic-styles")
        autoStylesEl.appendXML(`
            <text:list-style style:name="L${this.bulletListStyleId[0]}">
            </text:list-style>
        `)
        const listStyleEl =
            autoStylesEl.children[autoStylesEl.children.length - 1]
        // ODT files seem to contain ten levels of lists (1-10)
        for (let level = 1; level < 11; level++) {
            listStyleEl.appendXML(`
                <text:list-level-style-bullet text:level="${level}" text:style-name="Bullet_20_Symbols" text:bullet-char="•">
                    <style:list-level-properties text:list-level-position-and-space-mode="label-alignment">
                        <style:list-level-label-alignment text:label-followed-by="listtab" text:list-tab-stop-position="${(level + 1) * 0.25}in" fo:text-indent="-0.25in" fo:margin-left="${(level + 1) * 0.25}in" />
                    </style:list-level-properties>
                </text:list-level-style-bullet>
            `)
        }
        this.bulletListStyleId[1] = this.addListParStyle(
            this.bulletListStyleId[0]
        )
        return this.bulletListStyleId
    }

    getOrderedListStyleId(start) {
        const orderedListStyleId = ++this.listStyleCounter
        const autoStylesEl = this.contentXml.query("office:automatic-styles")
        autoStylesEl.appendXML(`
            <text:list-style style:name="L${orderedListStyleId}">
            </text:list-style>
        `)
        const listStyleEl =
            autoStylesEl.children[autoStylesEl.children.length - 1]
        // ODT files seem to contain ten levels of lists (1-10)
        for (let level = 1; level < 11; level++) {
            listStyleEl.appendXML(`
                <text:list-level-style-number text:level="${level}" text:style-name="Numbering_20_Symbols" style:num-suffix="." style:num-format="1"${start > 1 ? ` text:start-value="${start}"` : ""}>
                    <style:list-level-properties text:list-level-position-and-space-mode="label-alignment">
                        <style:list-level-label-alignment text:label-followed-by="listtab" text:list-tab-stop-position="${(level + 1) * 0.25}in" fo:text-indent="-0.25in" fo:margin-left="${(level + 1) * 0.25}in" />
                    </style:list-level-properties>
                </text:list-level-style-number>
            `)
        }
        return [orderedListStyleId, this.addListParStyle(orderedListStyleId)]
    }

    // Add a paragraph style for either paragraph in bullet or numeric list
    addListParStyle(_listId) {
        const parStyleId = ++this.blockStyleCounter
        const autoStylesEl = this.contentXml.query("office:automatic-styles")
        autoStylesEl.appendXML(
            `<style:style style:name="P${parStyleId}" style:family="paragraph" style:parent-style-name="Standard" text:list-style-name="L1" />`
        )
        return parStyleId
    }

    addPageBreakStyle() {
        const stylesEl = this.stylesXml.query("office:styles")
        stylesEl.queryAll("style:style").forEach(style => {
            if (style.getAttribute("style:name") === "PageBreak") {
                return
            }
        })
        stylesEl.appendXML(
            '<style:style style:name="PageBreak" style:family="paragraph" style:parent-style-name="Standard" style:class="extra"><style:paragraph-properties fo:break-before="page"/></style:style>'
        )
    }

    setLanguage(langCode) {
        const langCodes = langCode.split("-"),
            [language] = langCodes

        let [, country] = langCodes

        if (!country) {
            country = "none"
        }
        const stylesEl = this.stylesXml.query("office:styles")
        stylesEl.queryAll("style:default-style").forEach(el => {
            el.queryAll("style:text-properties").forEach(el => {
                el.setAttribute("fo:language", language)
                el.setAttribute("fo:country", country)
            })
        })
    }
}


}),
"./js/modules/exporter/odt/track.js": (function (__unused_rspack_module, __webpack_exports__, __webpack_require__) {
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  ODTExporterTracks: function() { return ODTExporterTracks; }
});
/* import */ var _common__rspack_import_0 = __webpack_require__("./js/modules/common/index.js");


class ODTExporterTracks {
    constructor(xml) {
        this.xml = xml

        this.contentXml = false
        this.trackChangesSection = false
        this.counter = 0
    }

    init() {
        return this.xml.getXml("content.xml").then(contentXml => {
            this.contentXml = contentXml
        })
    }

    checkTrackedChangesSection() {
        if (this.trackChangesSection) {
            return
        }
        const trackChangesSection = this.contentXml.query(
            "text:tracked-changes"
        )
        if (trackChangesSection) {
            this.trackChangesSection = trackChangesSection
        } else {
            const textElement = this.contentXml.query("office:text")
            if (!textElement) {
                throw new Error("No text element found in content.xml")
            }
            textElement.prependXML(
                "<text:tracked-changes></text:tracked-changes>"
            )
            this.trackChangesSection = textElement.firstElementChild
        }
    }

    addChange(trackInfo, deletionString = "") {
        if (!this.trackChangesSection) {
            this.checkTrackedChangesSection()
        }
        const trackId = `ct${Date.now() + this.counter++}`
        const changeXml = `
        <text:changed-region xml:id="${trackId}" text:id="${trackId}">
            ${
                trackInfo.type === "deletion"
                    ? `<text:deletion>
                    <office:change-info>
                        <dc:creator>${(0,_common__rspack_import_0.escapeText)(trackInfo.username)}</dc:creator>
                        <dc:date>${new Date(trackInfo.date * 60000).toISOString().slice(0, 19)}</dc:date>
                    </office:change-info>
                    ${deletionString}
                </text:deletion>`
                    : trackInfo.type === "insertion"
                      ? `<text:insertion>
        <office:change-info>
            <dc:creator>${(0,_common__rspack_import_0.escapeText)(trackInfo.username)}</dc:creator>
            <dc:date>${new Date(trackInfo.date * 60000).toISOString().slice(0, 19)}</dc:date>
        </office:change-info>
    </text:insertion>`
                      : ""
            }
        </text:changed-region>`
        this.trackChangesSection.appendXML(changeXml)
        return trackId
    }
}


}),

}]);