"use strict";
(self["webpackChunkfidus_writer"] = self["webpackChunkfidus_writer"] || []).push([["js_modules_exporter_print_index_js"], {
"./js/modules/exporter/print/index.js": (function (__unused_rspack_module, __webpack_exports__, __webpack_require__) {
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  PrintExporter: function() { return PrintExporter; }
});
/* import */ var _vivliostyle_print__rspack_import_0 = __webpack_require__("./node_modules/.pnpm/@vivliostyle+print@2.39.1/node_modules/@vivliostyle/print/dist/index.es6.js");
/* import */ var _common__rspack_import_1 = __webpack_require__("./js/modules/common/index.js");
/* import */ var _schema_const__rspack_import_2 = __webpack_require__("./js/modules/schema/const.js");
/* import */ var _html__rspack_import_3 = __webpack_require__("./js/modules/exporter/html/index.js");
/* import */ var _html_convert__rspack_import_4 = __webpack_require__("./js/modules/exporter/html/convert.js");
/* import */ var _tools_doc_content__rspack_import_5 = __webpack_require__("./js/modules/exporter/tools/doc_content.js");







class PrintExporter extends _html__rspack_import_3.HTMLExporter {
    constructor(doc, bibDB, imageDB, csl, updated, documentStyles) {
        super(doc, bibDB, imageDB, csl, updated, documentStyles, {
            relativeUrls: false
        })
    }

    async init() {
        (0,_common__rspack_import_1.addAlert)(
            "info",
            `${(0,_common__rspack_import_1.shortFileTitle)(this.doc.title, this.doc.path)}: ${gettext("Printing has been initiated.")}`
        )
        this.docContent = (0,_tools_doc_content__rspack_import_5.removeHidden)(this.doc.content)

        const styleSheets = [
            {url: staticUrl("css/document.css")},
            {
                contents: `a.footnote, a.affiliation {
                    -adapt-template: url(data:application/xml,${encodeURI(
                        '<html xmlns="http://www.w3.org/1999/xhtml" xmlns:s="http://www.pyroxy.com/ns/shadow"><head><style>.footnote-content{float:footnote}</style></head><body><s:template id="footnote"><s:content/><s:include class="footnote-content"/></s:template></body></html>#footnote'
                    )});
                    text-decoration: none;
                    color: inherit;
                    vertical-align: baseline;
                    font-size: 70%;
                    position: relative;
                    top: -0.3em;
                }
                aside.footnote label:first-child, aside.footnote *:nth-child(2),
                aside.affiliation label:first-child, aside.affiliation *:nth-child(2) {
                    display: inline;
                }
                aside.footnote label:first-child:after,
                aside.affiliation label:first-child:after  {
                    content: '. '
                }

                body, section[role=doc-footnotes] {
                    counter-reset: cat-figure cat-equation cat-photo cat-table footnote-counter footnote-marker-counter;
                }
                section#affiliations, section#footnotes  {
                    display: none;
                }
                section:footnote-content {
                    display: block;
                    font-size: small;
                    font-style: normal;
                    font-weight: normal;
                    text-decoration: none;
                    text-indent: 0;
                    text-align: initial;
                }
                .table-of-contents a {
                	display: inline-flex;
                	width: 100%;
                	text-decoration: none;
                	color: currentColor;
                	break-inside: avoid;
                	align-items: baseline;
                }
                .table-of-contents a::before {
                	margin-left: 1px;
                	margin-right: 1px;
                	border-bottom: solid 1px lightgray;
                	content: "";
                	order: 1;
                	flex: auto;
                }
                .table-of-contents a::after {
                	text-align: right;
                	content: target-counter(attr(href, url), page);
                	align-self: flex-end;
                	flex: none;
                	order: 2;
                }
                body {
                    background-color: white;
                }
                @page {
                    size: ${_schema_const__rspack_import_2.PAPER_SIZES.find(size => size[0] === this.doc.settings.papersize)[1]};
                    @top-center {
                        content: env(doc-title);
                    }
                    @bottom-center {
                        content: counter(page);
                    }
                }`
            }
        ]

        const docStyle = this.getDocStyle(this.doc)

        if (docStyle) {
            styleSheets.push(docStyle)
        }

        await Promise.all(
            styleSheets.map(async sheet => await this.loadStyle(sheet))
        )

        this.converter = new _html_convert__rspack_import_4.HTMLExporterConvert(
            this.docTitle,
            this.doc.settings,
            this.docContent,
            this.htmlExportTemplate,
            this.imageDB,
            this.bibDB,
            this.csl,
            styleSheets,
            {
                relativeUrls: false
            }
        )

        const {html, metaData} = await this.converter.init()

        const config = {title: metaData.title}

        if (navigator.userAgent.includes("Gecko/")) {
            // Firefox has issues printing images when in iframe. This workaround can be
            // removed once that has been fixed. TODO: Add gecko bug number if there is one.
            config.printCallback = iframeWin => {
                const oldBody = document.body
                document.body.parentElement.dataset.vivliostylePaginated = true
                document.body = iframeWin.document.body
                document.body
                    .querySelectorAll("figure, table")
                    .forEach(el => delete el.dataset.category)
                iframeWin.document
                    .querySelectorAll("style")
                    .forEach(el => document.body.appendChild(el))
                const backgroundStyle = document.createElement("style")
                backgroundStyle.innerHTML = "body {background-color: white;}"
                document.body.appendChild(backgroundStyle)
                window.print()
                document.body = oldBody
                delete document.body.parentElement.dataset.vivliostylePaginated
            }
        }
        return (0,_vivliostyle_print__rspack_import_0.printHTML)(html, config)
    }

    getDocStyle(doc) {
        // Override the default as we need to use the original URLs in print.
        const docStyle = this.documentStyles.find(
            docStyle => docStyle.slug === doc.settings.documentstyle
        )
        if (!docStyle) {
            return
        }

        let contents = docStyle.contents
        docStyle.documentstylefile_set.forEach(
            ([url, filename]) =>
                (contents = contents.replace(
                    new RegExp(filename, "g"),
                    new URL(url, window.location).href
                ))
        )
        return {contents}
    }

    loadStyle(sheet) {
        if (sheet.url) {
            sheet.filename = sheet.url
            delete sheet.url
        }
        return Promise.resolve()
    }
}


}),

}]);