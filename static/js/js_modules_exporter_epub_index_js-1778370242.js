"use strict";
(self["webpackChunkfidus_writer"] = self["webpackChunkfidus_writer"] || []).push([["js_modules_exporter_epub_index_js"], {
"./js/modules/exporter/epub/index.js": (function (__unused_rspack_module, __webpack_exports__, __webpack_require__) {
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  EpubExporter: function() { return EpubExporter; }
});
/* import */ var pretty__rspack_import_0 = __webpack_require__("./node_modules/.pnpm/pretty@2.0.0/node_modules/pretty/index.js");
/* import */ var pretty__rspack_import_0_default = /*#__PURE__*/__webpack_require__.n(pretty__rspack_import_0);
/* import */ var _html__rspack_import_1 = __webpack_require__("./js/modules/exporter/html/index.js");
/* import */ var _templates__rspack_import_2 = __webpack_require__("./js/modules/exporter/epub/templates.js");
/* import */ var _tools__rspack_import_3 = __webpack_require__("./js/modules/exporter/epub/tools.js");






class EpubExporter extends _html__rspack_import_1.HTMLExporter {
    constructor(doc, bibDB, imageDB, csl, updated, documentStyles) {
        super(doc, bibDB, imageDB, csl, updated, documentStyles, {
            xhtml: true,
            epub: true
        })
        // Overriden properties
        this.documentFileName = "document.xhtml"
        this.fileEnding = "epub"
        this.mimeType = "application/epub+zip"
    }

    createZip() {
        this.prefixFiles()
        this.createEPUBFiles()
        return super.createZip()
    }

    prefixFiles() {
        // prefix all files with "EPUB/"
        this.textFiles = this.textFiles.map(file =>
            Object.assign({}, file, {filename: `EPUB/${file.filename}`})
        )
        this.httpFiles = this.httpFiles.map(file =>
            Object.assign({}, file, {filename: `EPUB/${file.filename}`})
        )
        this.includeZips = this.includeZips.map(file =>
            Object.assign({}, file, {directory: `EPUB/${file.directory}`})
        )
    }

    createEPUBFiles() {
        // Generate the required EPUB-specific files using the converted content
        this.textFiles.push(
            {
                filename: "META-INF/container.xml",
                contents: pretty__rspack_import_0_default()((0,_templates__rspack_import_2.containerTemplate)(), {ocd: true})
            },
            {
                filename: "EPUB/document.opf",
                contents: pretty__rspack_import_0_default()(this.createOPF(), {ocd: true})
            },
            {
                filename: "EPUB/document.ncx",
                contents: pretty__rspack_import_0_default()(this.createNCX(), {ocd: true})
            },
            {
                filename: "EPUB/document-nav.xhtml",
                contents: pretty__rspack_import_0_default()(this.createNav(), {ocd: true})
            }
        )
    }

    createOPF() {
        const timestamp = (0,_tools__rspack_import_3.getTimestamp)(this.updated)
        const images = this.httpFiles
            .map(file =>
                Object.assign({mimeType: (0,_tools__rspack_import_3.getImageMimeType)(file.filename)}, file)
            )
            .filter(image => image.mimeType)

        const fontFiles = this.httpFiles
            .map(file =>
                Object.assign({mimeType: (0,_tools__rspack_import_3.getFontMimeType)(file.filename)}, file)
            )
            .filter(file => file.mimeType)

        const styleSheets = this.textFiles.filter(file =>
            file.filename.endsWith(".css")
        )

        // Extract authors and keywords from metaData
        const authors = this.converter.metaData.authors.map(
            ({attrs: author}) => {
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
            }
        )
        return (0,_templates__rspack_import_2.opfTemplate)({
            language: this.lang,
            title: this.docTitle,
            authors,
            keywords: this.converter.metaData.keywords,
            idType: "fidus",
            id: this.doc.id,
            date: timestamp.slice(0, 10),
            modified: timestamp,
            styleSheets,
            math: this.converter.features.math,
            images,
            fontFiles,
            copyright: this.doc.settings.copyright
        })
    }

    createNCX() {
        return (0,_templates__rspack_import_2.ncxTemplate)({
            shortLang: this.shortLang,
            title: this.docTitle,
            idType: "fidus",
            id: this.doc.id,
            toc: (0,_tools__rspack_import_3.buildHierarchy)(this.converter.metaData.toc)
        })
    }

    createNav() {
        const styleSheets = this.textFiles.filter(file =>
            file.filename.endsWith(".css")
        )
        return (0,_templates__rspack_import_2.navTemplate)({
            shortLang: this.shortLang,
            toc: (0,_tools__rspack_import_3.buildHierarchy)(this.converter.metaData.toc),
            styleSheets
        })
    }
}


}),
"./js/modules/exporter/epub/templates.js": (function (__unused_rspack_module, __webpack_exports__, __webpack_require__) {
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  containerTemplate: function() { return containerTemplate; },
  navTemplate: function() { return navTemplate; },
  ncxItemTemplate: function() { return ncxItemTemplate; },
  ncxTemplate: function() { return ncxTemplate; },
  opfTemplate: function() { return opfTemplate; }
});
/* import */ var _common__rspack_import_0 = __webpack_require__("./js/modules/common/index.js");
/* import */ var _mathlive_opf_includes__rspack_import_1 = __webpack_require__("./js/modules/mathlive/opf_includes.js");



/** A template for the OPF file of an epub. */
const opfTemplate = ({
    id,
    idType,
    title,
    language,
    authors,
    keywords,
    date,
    modified,
    images,
    fontFiles,
    styleSheets,
    math,
    copyright
}) =>
    `<?xml version="1.0" encoding="UTF-8"?>
<package xmlns="http://www.idpf.org/2007/opf" version="3.0" unique-identifier="${idType}" xml:lang="${language}" prefix="cc: http://creativecommons.org/ns#">
    <metadata xmlns:dc="http://purl.org/dc/elements/1.1/">
        <dc:identifier id="${idType}">${id}</dc:identifier>
            <dc:title>${(0,_common__rspack_import_0.escapeText)(title)}</dc:title>
${authors
    .map(author => `\t\t<dc:creator>${(0,_common__rspack_import_0.escapeText)(author)}</dc:creator>\n`)
    .join("")}${keywords
    .map(keyword => `\t\t<dc:subject>${(0,_common__rspack_import_0.escapeText)(keyword)}</dc:subject>\n`)
    .join("")}
        <dc:language>${language}</dc:language>
        <dc:date>${date}</dc:date>
        ${copyright && copyright.holder ? `<dc:rights>© ${copyright.year ? copyright.year : new Date().getFullYear()} ${(0,_common__rspack_import_0.escapeText)(copyright.holder)}</dc:rights>` : ""}
        <meta property="dcterms:modified">${modified}</meta>
    </metadata>
    <manifest>
        <item id="t1" href="document.xhtml" media-type="application/xhtml+xml" />
        <item id="nav" href="document-nav.xhtml" properties="nav" media-type="application/xhtml+xml" />
${images
    .map(
        (image, index) =>
            `\t\t\t<item ${
                image.coverImage
                    ? 'id="cover-image" properties="cover-image"'
                    : `id="img${index}"`
            } href="${image.filename}" media-type="${image.mimeType}" />\n`
    )
    .join("")}${fontFiles
    .map(
        (fontFile, index) =>
            `\t\t\t<item ${`id="font${index}"`} href="${
                fontFile.filename
            }" media-type="${fontFile.mimeType}" />\n`
    )
    .join("")}${styleSheets
    .map(
        (sheet, index) =>
            `\t\t\t<item id="css${index}" href="${sheet.filename}" media-type="text/css" />\n`
    )
    .join("")}${math ? _mathlive_opf_includes__rspack_import_1.mathliveOpfIncludes : ""}
        <!-- ncx included for 2.0 reading system compatibility: -->
        <item id="ncx" href="document.ncx" media-type="application/x-dtbncx+xml" />
    </manifest>
    <spine toc="ncx">
        <itemref idref="t1" />
    </spine>
</package>`

/** A template for the contianer XML of an epub file. */
const containerTemplate = () =>
    `<?xml version="1.0" encoding="UTF-8"?>
<container xmlns="urn:oasis:names:tc:opendocument:xmlns:container" version="1.0">
    <rootfiles>
        <rootfile full-path="EPUB/document.opf" media-type="application/oebps-package+xml"/>
    </rootfiles>
</container>`

/** A template of the NCX file of an epub. */
const ncxTemplate = ({shortLang, idType, id, title, toc}) =>
    `<?xml version="1.0" encoding="UTF-8"?>
<ncx xmlns:ncx="http://www.daisy.org/z3986/2005/ncx/" xmlns="http://www.daisy.org/z3986/2005/ncx/" version="2005-1" xml:lang="${shortLang}">
    <head>
        <meta name="dtb:${idType}" content="${id}" />
    </head>
    <docTitle>
        <text>${(0,_common__rspack_import_0.escapeText)(title)}</text>
    </docTitle>
    <navMap>
        <!-- 2.01 NCX: playOrder is optional -->
${toc.map(item => ncxItemTemplate({item})).join("")}
    </navMap>
</ncx>`

/** A template for each list item in the navMap of an epub's NCX file. */
const ncxItemTemplate = ({item}) =>
    `        <navPoint id="t${item.docNum ? `${item.id}-${item.docNum}` : item.id}">
            <navLabel><text>${(0,_common__rspack_import_0.escapeText)(item.title)}</text></navLabel>
            <content src="${item.link ? item.link : item.docNum ? `document-${item.docNum}.xhtml#${item.id}` : `document.xhtml#${item.id}`}"/>
${item.children?.map(item => ncxItemTemplate({item})).join("") || ""}
        </navPoint>\n`

/** A template for each item in an epub's navigation document. */
const navItemTemplate = ({item}) =>
    `\t\t\t\t<li><a href="${
        item.link
            ? item.link
            : item.docNum
              ? `document-${item.docNum}.xhtml#${item.id}`
              : `document.xhtml#${item.id}`
    }">${(0,_common__rspack_import_0.escapeText)(item.title)}</a>
${
    item.children.length
        ? `<ol>
        ${item.children.map(item => navItemTemplate({item})).join("")}
    </ol>`
        : ""
}
</li>`

/** A template for an epub's navigation document. */
const navTemplate = ({shortLang, toc, styleSheets}) =>
    `<?xml version="1.0" encoding="UTF-8"?>
<html xmlns="http://www.w3.org/1999/xhtml" xml:lang="${shortLang}" lang="${shortLang}" xmlns:epub="http://www.idpf.org/2007/ops">
    <head>
        <meta charset="utf-8" />
        <title>Navigation</title>
        ${styleSheets
            .map(
                sheet =>
                    `<link rel="stylesheet" type="text/css" href="${sheet.filename}" />\n`
            )
            .join("")}
    </head>
    <body class="epub navigation">
        <nav epub:type="toc" id="toc">
            <ol>
${toc.map(item => navItemTemplate({item})).join("")}
            </ol>
        </nav>
    </body>
</html>`


}),
"./js/modules/exporter/epub/tools.js": (function (__unused_rspack_module, __webpack_exports__, __webpack_require__) {
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  buildHierarchy: function() { return buildHierarchy; },
  getFontMimeType: function() { return getFontMimeType; },
  getImageMimeType: function() { return getImageMimeType; },
  getTimestamp: function() { return getTimestamp; }
});
function getTimestamp(date) {
    let second = date.getUTCSeconds()
    let minute = date.getUTCMinutes()
    let hour = date.getUTCHours()
    let day = date.getUTCDate()
    let month = date.getUTCMonth() + 1 //January is 0!
    const year = date.getUTCFullYear()

    if (second < 10) {
        second = "0" + second
    }
    if (minute < 10) {
        minute = "0" + minute
    }
    if (hour < 10) {
        hour = "0" + hour
    }
    if (day < 10) {
        day = "0" + day
    }
    if (month < 10) {
        month = "0" + month
    }

    return `${year}-${month}-${day}T${hour}:${minute}:${second}Z`
}

function getFontMimeType(filename) {
    // Define a mapping of font file extensions to MIME types
    const fontMimeTypes = {
        ttf: "font/ttf",
        otf: "font/otf",
        woff: "font/woff",
        woff2: "font/woff2",
        eot: "application/vnd.ms-fontobject"
    }

    // Extract the file extension from the filename
    const extension = filename.split(".").pop().toLowerCase()

    // Check if the extension matches a known font type and return the MIME type
    return fontMimeTypes[extension] || null // Return null if it's not a font file
}

function getImageMimeType(filename) {
    // Define a mapping of image file extensions to MIME types
    const imageMimeTypes = {
        jpg: "image/jpeg",
        jpeg: "image/jpeg",
        png: "image/png",
        gif: "image/gif",
        bmp: "image/bmp",
        tiff: "image/tiff",
        webp: "image/webp",
        svg: "image/svg+xml",
        ico: "image/vnd.microsoft.icon",
        avif: "image/avif"
    }

    // Extract the file extension from the filename
    const extension = filename.split(".").pop().toLowerCase()

    // Check if the extension matches a known image type and return the MIME type
    return imageMimeTypes[extension] || null // Return null if it's not an image file
}

function buildHierarchy(flatList) {
    const hierarchy = []
    const levelMap = {}

    flatList.forEach(item => {
        // Ensure there's an array for the current level in the map
        levelMap[item.level] = levelMap[item.level] || []

        // Add the current item to its level in the map
        levelMap[item.level].push({...item, children: []})

        if (item.level === 0) {
            // Top-level items are added directly to the hierarchy
            hierarchy.push(
                levelMap[item.level][levelMap[item.level].length - 1]
            )
        } else {
            // Non-top-level items are added as children of the last item at the previous level
            const parentLevel = levelMap[item.level - 1]
            if (parentLevel) {
                const parent = parentLevel[parentLevel.length - 1]
                parent.children.push(
                    levelMap[item.level][levelMap[item.level].length - 1]
                )
            }
        }
    })

    return hierarchy
}


}),
"./js/modules/mathlive/opf_includes.js": (function (__unused_rspack_module, __webpack_exports__, __webpack_require__) {
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  mathliveOpfIncludes: function() { return mathliveOpfIncludes; }
});
// This file is auto-generated. CHANGES WILL BE OVERWRITTEN! Re-generate by running ./manage.py bundle_mathlive.
const mathliveOpfIncludes = `
<item id="mathlive-0" href="css/mathlive.css" media-type="text/css" />
<item id="mathlive-1" href="css/media/KaTeX_Caligraphic-Bold.woff2" media-type="font/woff2" />
<item id="mathlive-2" href="css/media/KaTeX_Fraktur-Bold.woff2" media-type="font/woff2" />
<item id="mathlive-3" href="css/media/KaTeX_SansSerif-Bold.woff2" media-type="font/woff2" />
<item id="mathlive-4" href="css/media/KaTeX_Size1-Regular.woff2" media-type="font/woff2" />
<item id="mathlive-5" href="css/media/KaTeX_Fraktur-Regular.woff2" media-type="font/woff2" />
<item id="mathlive-6" href="css/media/KaTeX_SansSerif-Regular.woff2" media-type="font/woff2" />
<item id="mathlive-7" href="css/media/KaTeX_Main-Italic.woff2" media-type="font/woff2" />
<item id="mathlive-8" href="css/media/KaTeX_Size4-Regular.woff2" media-type="font/woff2" />
<item id="mathlive-9" href="css/media/KaTeX_Caligraphic-Regular.woff2" media-type="font/woff2" />
<item id="mathlive-10" href="css/media/KaTeX_AMS-Regular.woff2" media-type="font/woff2" />
<item id="mathlive-11" href="css/media/KaTeX_SansSerif-Italic.woff2" media-type="font/woff2" />
<item id="mathlive-12" href="css/media/KaTeX_Size3-Regular.woff2" media-type="font/woff2" />
<item id="mathlive-13" href="css/media/KaTeX_Size2-Regular.woff2" media-type="font/woff2" />
<item id="mathlive-14" href="css/media/KaTeX_Script-Regular.woff2" media-type="font/woff2" />
<item id="mathlive-15" href="css/media/KaTeX_Main-Bold.woff2" media-type="font/woff2" />
<item id="mathlive-16" href="css/media/KaTeX_Math-BoldItalic.woff2" media-type="font/woff2" />
<item id="mathlive-17" href="css/media/KaTeX_Main-BoldItalic.woff2" media-type="font/woff2" />
<item id="mathlive-18" href="css/media/KaTeX_Main-Regular.woff2" media-type="font/woff2" />
<item id="mathlive-19" href="css/media/KaTeX_Math-Italic.woff2" media-type="font/woff2" />
<item id="mathlive-20" href="css/media/KaTeX_Typewriter-Regular.woff2" media-type="font/woff2" />
`

}),

}]);