"use strict";
(self["webpackChunkfidus_writer"] = self["webpackChunkfidus_writer"] || []).push([["js_modules_user_template_manager_editor_js"], {
"./js/modules/user_template_manager/editor.js": (function (__unused_rspack_module, __webpack_exports__, __webpack_require__) {
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  DocTemplatesEditor: function() { return DocTemplatesEditor; }
});
/* import */ var _common__rspack_import_0 = __webpack_require__("./js/modules/common/index.js");
/* import */ var _document_template__rspack_import_1 = __webpack_require__("./js/modules/document_template/index.js");
/* import */ var _feedback__rspack_import_2 = __webpack_require__("./js/modules/feedback/index.js");




class DocTemplatesEditor {
    constructor({app, user}, idString) {
        this.app = app
        this.user = user
        this.id = Number.parseInt(idString)
        this.citationStyles = false
    }

    init() {
        (0,_common__rspack_import_0.ensureCSS)([
            staticUrl("css/errorlist.css"),
            staticUrl("css/editor.css"),
            staticUrl("css/user_template_manager.css")
        ])
        return this.app.csl
            .getStyles()
            .then(styles => {
                this.citationStyles = styles
                return (0,_common__rspack_import_0.jsonPostJson)("/api/user_template_manager/get/", {
                    id: this.id
                })
            })
            .then(({json}) => {
                this.template = json
                this.id = json.id // Updated if previously 0

                return (0,_common__rspack_import_0.whenReady)()
            })
            .then(() => {
                if (!this.app.page === this) {
                    // page has changed
                    return
                }
                this.render()
                this.templateDesigner = new _document_template__rspack_import_1.DocumentTemplateDesigner(
                    this.id,
                    this.template.title,
                    this.template.content,
                    this.template.document_styles,
                    this.citationStyles,
                    this.template.export_templates,
                    this.dom.querySelector("#template-editor")
                )
                this.templateDesigner.init()
                this.bind()
            })
    }

    render() {
        this.dom = document.createElement("body")
        this.dom.classList.add("scrollable")
        this.dom.innerHTML = `<div id="wait" class="">
            <i class="fa fa-spinner fa-pulse"></i>
        </div>
        <nav id="headerbar"><div>
            <div id="close-document-top" title="${gettext("Close the template without saving and return to the overview")}">
                <span class="fw-link-text close">
                    <i class="fa fa-times"></i>
                </span>
            </div>
            <div id="document-top">
                <h1>${gettext("Template Editor")}</h1>
            </div>
        </div>
        <div>
            <div class="fw-contents template-editor-wrapper">
                <div id="template-editor"></div>
                <ul class="errorlist"></ul>
                <div class="ui-dialog-buttonset">
                    <button type="button" class="fw-dark fw-button ui-button ui-corner-all ui-widget save">
                        ${gettext("Save")}
                    </button>
                    <button type="button" class="fw-dark fw-button ui-button ui-corner-all ui-widget download">
                        ${gettext("Download")}
                    </button>
                    <button type="button" class="fw-orange fw-button ui-button ui-corner-all ui-widget close">
                        ${gettext("Close")}
                    </button>
                </div>
            </div>
        </div>`
        document.body = this.dom
        ;(0,_common__rspack_import_0.setDocTitle)(gettext("Template Editor"), this.app)
        const feedbackTab = new _feedback__rspack_import_2.FeedbackTab()
        feedbackTab.init()
    }

    showErrors(errors) {
        this.dom.querySelector(".errorlist").innerHTML = Object.values(errors)
            .map(error => `<li>${error}</li>`)
            .join("")
    }

    save() {
        this.dom.querySelector(".errorlist").innerHTML = ""
        const {valid, value, errors, import_id, title} =
            this.templateDesigner.getCurrentValue()
        if (!valid) {
            this.showErrors(errors)
            return Promise.reject()
        } else {
            return (0,_common__rspack_import_0.jsonPost)("/api/user_template_manager/save/", {
                id: this.id,
                value,
                import_id,
                title
            }).then(() => (0,_common__rspack_import_0.addAlert)("info", gettext("Saved template")))
        }
    }

    download() {
        this.save().then(() => {
            const exporter = new _document_template__rspack_import_1.DocumentTemplateExporter(
                this.id,
                "/api/user_template_manager/get/"
            )
            exporter.init()
        })
    }

    bind() {
        this.dom.addEventListener("click", event => {
            const el = {}
            switch (true) {
                case (0,_common__rspack_import_0.findTarget)(event, "button.save", el):
                    event.preventDefault()
                    this.save()
                    break
                case (0,_common__rspack_import_0.findTarget)(event, "button.download", el):
                    event.preventDefault()
                    this.download()
                    break
                case (0,_common__rspack_import_0.findTarget)(event, "button.close, span.close", el):
                    event.preventDefault()
                    this.app.goTo("/templates/")
                    break
                default:
                    break
            }
        })
    }
}


}),

}]);