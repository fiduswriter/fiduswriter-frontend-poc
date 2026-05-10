"use strict";
(self["rspackChunkfidus_writer"] = self["rspackChunkfidus_writer"] || []).push([["js_modules_pandoc_exporter_js"], {
"./js/modules/pandoc/exporter.js": (function (module, __webpack_exports__, __webpack_require__) {
__webpack_require__.a(module, async function (__rspack_load_async_deps, __rspack_async_done) { try {
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  PandocConversionExporter: function() { return PandocConversionExporter; }
});
/* import */ var downloadjs__rspack_import_0 = __webpack_require__("./node_modules/.pnpm/downloadjs@1.4.7/node_modules/downloadjs/download.js");
/* import */ var downloadjs__rspack_import_0_default = /*#__PURE__*/__webpack_require__.n(downloadjs__rspack_import_0);
/* import */ var pandoc_wasm__rspack_import_1 = __webpack_require__("./node_modules/.pnpm/pandoc-wasm@1.0.1/node_modules/pandoc-wasm/src/index.browser.js");
/* import */ var _common__rspack_import_2 = __webpack_require__("./js/modules/common/index.js");
/* import */ var _exporter_pandoc__rspack_import_3 = __webpack_require__("./js/modules/exporter/pandoc/index.js");
/* import */ var _exporter_tools_file__rspack_import_4 = __webpack_require__("./js/modules/exporter/tools/file.js");
var __rspack_async_deps = __rspack_load_async_deps([pandoc_wasm__rspack_import_1]);
pandoc_wasm__rspack_import_1 = (__rspack_async_deps.then ? (await __rspack_async_deps)() : __rspack_async_deps)[0];






class PandocConversionExporter extends _exporter_pandoc__rspack_import_3.PandocExporter {
    constructor(
        format,
        fileExtension,
        mimeType,
        options = {fullFileExport: false, includeBibliography: false},
        ...args
    ) {
        super(...args)
        this.format = format
        this.fileExtension = fileExtension
        this.mimeType = mimeType
        this.options = options
    }

    createExport() {
        // convert with pandoc wasm, then send converted file to user.

        return Promise.all(
            this.httpFiles.map(binaryFile =>
                (0,_common__rspack_import_2.get)(binaryFile.url)
                    .then(response => response.blob())
                    .then(blob =>
                        Promise.resolve({
                            contents: blob,
                            filename: binaryFile.filename
                        })
                    )
            )
        )
            .then(binaryFiles => {
                const files = {}
                this.textFiles.forEach(file => {
                    files[file.filename] = file.contents
                })
                binaryFiles.forEach(file => {
                    files[file.filename] = file.contents
                })
                const options = {
                    from: "json",
                    to: this.format,
                    standalone: true
                }
                if (files["bibliography.bib"]) {
                    options.bibliography = "bibliography.bib"
                    options.citeproc = true
                }
                const content = JSON.stringify(this.conversion.json)
                return (0,pandoc_wasm__rspack_import_1.convert)(options, content, files)
            })
            .then(({stdout: out}) => {
                if (this.options.fullFileExport) {
                    const fileName = `${(0,_exporter_tools_file__rspack_import_4.createSlug)(this.docTitle)}.${this.fileExtension}`
                    if (out instanceof Blob) {
                        return downloadjs__rspack_import_0_default()(out, fileName, this.mimeType)
                    }
                    const blob = new window.Blob([out], {
                        type: this.mimeType
                    })
                    return downloadjs__rspack_import_0_default()(blob, fileName, this.mimeType)
                }
                this.zipFileName = `${(0,_exporter_tools_file__rspack_import_4.createSlug)(this.docTitle)}.${this.format}.zip`
                this.textFiles.push({
                    filename: `document.${this.fileExtension}`,
                    contents: out
                })
                if (!this.options.includeBibliography) {
                    this.textFiles = this.textFiles.filter(
                        file => file.filename !== "bibliography.bib"
                    )
                }
                return this.createDownload()
            })
    }
}

__rspack_async_done();
} catch(e) { __rspack_async_done(e); } });

}),

}]);