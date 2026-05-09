"use strict";
(self["webpackChunkfidus_writer"] = self["webpackChunkfidus_writer"] || []).push([["js_modules_bibliography_form_index_js"], {
"./js/modules/bibliography/form/cats.js": (function (__unused_rspack_module, __webpack_exports__, __webpack_require__) {
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  CatsForm: function() { return CatsForm; }
});
/* import */ var _common__rspack_import_0 = __webpack_require__("./js/modules/common/index.js");


class CatsForm {
    constructor(dom, initialValue = [], options = []) {
        this.dom = dom
        this.currentValue = initialValue
        this.options = options
    }

    init() {
        this.drawForm()
    }

    drawForm() {
        this.options.forEach(option => {
            this.dom.insertAdjacentHTML(
                "beforeend",
                `<div class="fw-checkable fw-checkable-label${this.currentValue.includes(option.id) ? " checked" : ""}" data-id="${option.id}">${(0,_common__rspack_import_0.escapeText)(option.category_title)}</div>`
            )
            this.dom.lastChild.addEventListener("click", event => {
                event.target.classList.toggle("checked")
            })
        })
    }

    get value() {
        return Array.from(
            this.dom.querySelectorAll(".fw-checkable.checked")
        ).map(el => {
            return Number.parseInt(el.getAttribute("data-id"))
        })
    }
}


}),
"./js/modules/bibliography/form/fields/date.js": (function (__unused_rspack_module, __webpack_exports__, __webpack_require__) {
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  DateFieldForm: function() { return DateFieldForm; }
});
/* import */ var biblatex_csl_converter__rspack_import_0 = __webpack_require__("./node_modules/.pnpm/biblatex-csl-converter@3.6.0/node_modules/biblatex-csl-converter/lib/index.js");


class DateFieldForm {
    constructor(dom, initialValue = "", placeHolder = "") {
        this.dom = dom
        this.initialValue = initialValue
        this.placeHolder = placeHolder
    }

    init() {
        this.dom.innerHTML = `<input class="date" type="text" value="${this.initialValue}" placeholder="${this.placeHolder}">`
    }

    get value() {
        const formValue = this.dom.querySelector("input.date").value
        // If the form has not been filled out, don't consider this form
        return formValue.length > 0 ? formValue : false
    }

    check() {
        const formValue = this.value
        if (formValue) {
            const checkValue = (0,biblatex_csl_converter__rspack_import_0.edtfParse)(formValue).valid
            if (!checkValue) {
                this.dom.classList.add("fw-fomt-error")
                return false
            }
        }
        return true
    }
}


}),
"./js/modules/bibliography/form/fields/key.js": (function (__unused_rspack_module, __webpack_exports__, __webpack_require__) {
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  KeyFieldForm: function() { return KeyFieldForm; }
});
/* import */ var _common__rspack_import_0 = __webpack_require__("./js/modules/common/index.js");
/* import */ var _strings__rspack_import_1 = __webpack_require__("./js/modules/bibliography/form/strings.js");
/* import */ var _literal__rspack_import_2 = __webpack_require__("./js/modules/bibliography/form/fields/literal.js");




class KeyFieldForm {
    constructor(dom, initialValue, _unused, fieldType = undefined) {
        this.currentValue = {}
        this.dom = dom
        this.fieldType = fieldType
        // We set the mode based on the type of value
        if (typeof initialValue === "object") {
            this.predefined = false
            this.currentValue["custom"] = initialValue
        } else {
            this.predefined = true
            this.currentValue["predefined"] = initialValue
        }
    }

    init() {
        this.prepareWrapper()
        this.drawForm()
    }

    prepareWrapper() {
        this.dom.innerHTML = (0,_common__rspack_import_0.noSpaceTmp)`
                <div class="type-switch-input-wrapper">
                    <button class="type-switch">
                        <span class="type-switch-inner">
                            <span class="type-switch-label">${gettext("From list")}</span>
                            <span class="type-switch-label">${gettext("Custom")}</span>
                        </span>
                    </button>
                    <div class="type-switch-input-inner"></div>
                </div>
            `

        this.switcher = this.dom.querySelector(".type-switch")
        this.inner = this.dom.querySelector(".type-switch-input-inner")

        if (this.fieldType.strict) {
            this.switcher.classList.add("disabled")
        } else {
            this.switcher.addEventListener("click", () => this.switchMode())
        }
    }

    switchMode() {
        const formValue = this.value
        if (formValue) {
            if (this.predefined) {
                this.currentValue["predefined"] = formValue
            } else {
                this.currentValue["custom"] = formValue
            }
        }
        this.predefined = !this.predefined
        this.drawForm(true)
    }

    drawForm(redraw = false) {
        const focusIndex = redraw ? (0,_common__rspack_import_0.getFocusIndex)() : -1
        if (this.predefined) {
            this.drawSelectionListForm()
        } else {
            this.drawCustomInputForm()
        }
        (0,_common__rspack_import_0.setFocusIndex)(focusIndex)
    }

    drawSelectionListForm() {
        this.switcher.classList.add("value1")
        this.switcher.classList.remove("value2")

        this.inner.innerHTML = (0,_common__rspack_import_0.noSpaceTmp)`
                <select class='key-selection'><option value=''></option></select>
                <div class="fw-select-arrow fa fa-caret-down"></div>
            `
        const selectEl = this.dom.querySelector(".key-selection")
        if (Array.isArray(this.fieldType.options)) {
            this.fieldType.options.forEach(option => {
                selectEl.insertAdjacentHTML(
                    "beforeend",
                    `<option value="${option}">${(0,_strings__rspack_import_1.getBibOptionTitle)(option)}</option>`
                )
            })
        } else {
            Object.keys(this.fieldType.options).forEach(option => {
                selectEl.insertAdjacentHTML(
                    "beforeend",
                    `<option value="${option}">${(0,_strings__rspack_import_1.getBibOptionTitle)(option)}</option>`
                )
            })
        }

        if (this.currentValue["predefined"]) {
            selectEl.value = this.currentValue["predefined"]
        }
    }

    drawCustomInputForm() {
        this.switcher.classList.remove("value1")
        this.switcher.classList.add("value2")

        this.fields = {}
        this.inner.innerHTML = (0,_common__rspack_import_0.noSpaceTmp)`<div class='custom-input field-part field-part-single'></div>`
        this.fields["custom"] = new _literal__rspack_import_2.LiteralFieldForm(
            this.dom.querySelector(".custom-input"),
            this.currentValue["custom"]
        )
        this.fields.custom.init()
    }

    get value() {
        if (this.predefined) {
            const selectEl = this.dom.querySelector(".key-selection")
            const selectionValue =
                selectEl.options[selectEl.selectedIndex].value
            if (selectionValue === "") {
                return false
            } else {
                return selectionValue
            }
        } else {
            if (!this.fields.custom.value) {
                return false
            }
            return this.fields.custom.value
        }
    }

    check() {
        return true
    }
}


}),
"./js/modules/bibliography/form/fields/key_list.js": (function (__unused_rspack_module, __webpack_exports__, __webpack_require__) {
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  KeyListForm: function() { return KeyListForm; }
});
/* import */ var _common__rspack_import_0 = __webpack_require__("./js/modules/common/index.js");
/* import */ var _key__rspack_import_1 = __webpack_require__("./js/modules/bibliography/form/fields/key.js");



class KeyListForm {
    constructor(dom, initialValue = [""], _unused, fieldType = undefined) {
        this.currentValue = initialValue
        this.dom = dom
        this.fieldType = fieldType
    }

    init() {
        this.drawForm()
    }

    drawForm() {
        this.fields = []
        this.dom.innerHTML =
            '<table class="input-list-wrapper"><tbody></tbody></table>'
        this.currentValue.forEach((fieldValue, index) => {
            this.addField(fieldValue, index)
        })
    }

    addField(fieldValue, index) {
        this.dom.firstChild.firstChild.insertAdjacentHTML(
            "beforeend",
            (0,_common__rspack_import_0.noSpaceTmp)`
            <tr>
                <td></td>
                <td class="input-field-list-ctrl">
                    <span class="fa fa-minus-circle" tabindex="0"></span>&nbsp;
                    <span class="fa fa-plus-circle" tabindex="0"></span>
                </td>
            </tr>`
        )
        const fieldDOM = this.dom.firstChild.firstChild.lastChild
        const fieldHandler = new _key__rspack_import_1.KeyFieldForm(
            fieldDOM.firstChild,
            fieldValue,
            false,
            this.fieldType
        )
        fieldHandler.init()
        this.fields.push(fieldHandler)

        // click on plus
        const addItemEl = fieldDOM.querySelector(".fa-plus-circle")
        addItemEl.addEventListener("click", event =>
            this.handlePlus(event, index)
        )
        addItemEl.addEventListener("keydown", event =>
            this.handlePlus(event, index)
        )

        // Click on minus
        const removeItemEl = fieldDOM.querySelector(".fa-minus-circle")
        removeItemEl.addEventListener("click", event =>
            this.handleMinus(event, index)
        )
        removeItemEl.addEventListener("keydown", event =>
            this.handleMinus(event, index)
        )
    }

    handlePlus(event, index) {
        if (!(0,_common__rspack_import_0.isActivationEvent)(event)) {
            return
        }
        if (!this.value) {
            return
        }
        this.currentValue = this.value
        this.currentValue.splice(index + 1, 0, "")
        const focusIndex = (0,_common__rspack_import_0.getFocusIndex)()
        this.drawForm()
        ;(0,_common__rspack_import_0.setFocusIndex)(focusIndex + 1)
    }

    handleMinus(event, index) {
        if (!(0,_common__rspack_import_0.isActivationEvent)(event)) {
            return
        }
        if (!this.value) {
            return
        }
        this.currentValue = this.value
        this.currentValue.splice(index, 1)
        if (this.currentValue.length === 0) {
            this.currentValue = [""]
        }
        const focusIndex = (0,_common__rspack_import_0.getFocusIndex)()
        this.drawForm()
        ;(0,_common__rspack_import_0.setFocusIndex)(focusIndex - 2)
    }

    get value() {
        const formValue = this.fields
            .map(field => {
                return field.value
            })
            .filter(value => {
                return value !== false
            })
        if (formValue.length === 0) {
            return false
        }
        return formValue
    }

    check() {
        return true
    }
}


}),
"./js/modules/bibliography/form/fields/literal.js": (function (__unused_rspack_module, __webpack_exports__, __webpack_require__) {
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  LiteralFieldForm: function() { return LiteralFieldForm; }
});
/* import */ var prosemirror_commands__rspack_import_6 = __webpack_require__("./node_modules/.pnpm/prosemirror-commands@1.7.0/node_modules/prosemirror-commands/dist/index.js");
/* import */ var prosemirror_history__rspack_import_4 = __webpack_require__("./node_modules/.pnpm/prosemirror-history@1.3.2/node_modules/prosemirror-history/dist/index.js");
/* import */ var prosemirror_keymap__rspack_import_5 = __webpack_require__("./node_modules/.pnpm/prosemirror-keymap@1.2.2/node_modules/prosemirror-keymap/dist/index.js");
/* import */ var prosemirror_state__rspack_import_3 = __webpack_require__("./node_modules/.pnpm/prosemirror-state@1.4.3/node_modules/prosemirror-state/dist/index.js");
/* import */ var prosemirror_view__rspack_import_2 = __webpack_require__("./node_modules/.pnpm/prosemirror-view@1.38.1/node_modules/prosemirror-view/dist/index.js");
/* import */ var _prosemirror_inline_tools__rspack_import_0 = __webpack_require__("./js/modules/prosemirror/inline_tools.js");
/* import */ var _schema_literal__rspack_import_1 = __webpack_require__("./js/modules/bibliography/schema/literal.js");









class LiteralFieldForm {
    constructor(dom, initialValue = [], placeHolder = false) {
        this.dom = dom
        this.initialValue = initialValue
        this.placeHolder = placeHolder
        this.placeHolderSet = false
    }

    init() {
        const doc = _schema_literal__rspack_import_1.litSchema.nodeFromJSON({
            type: "doc",
            content: [
                {
                    type: "literal",
                    content: this.initialValue
                }
            ]
        })

        this.view = new prosemirror_view__rspack_import_2.EditorView(this.dom, {
            state: prosemirror_state__rspack_import_3.EditorState.create({
                schema: _schema_literal__rspack_import_1.litSchema,
                doc,
                plugins: [
                    (0,prosemirror_history__rspack_import_4.history)(),
                    (0,prosemirror_keymap__rspack_import_5.keymap)(prosemirror_commands__rspack_import_6.baseKeymap),
                    (0,prosemirror_keymap__rspack_import_5.keymap)({
                        "Mod-z": prosemirror_history__rspack_import_4.undo,
                        "Mod-shift-z": prosemirror_history__rspack_import_4.undo,
                        "Mod-y": prosemirror_history__rspack_import_4.redo,
                        "Mod-b": () => {
                            const sMark = this.view.state.schema.marks["strong"]
                            const command = (0,prosemirror_commands__rspack_import_6.toggleMark)(sMark)
                            command(this.view.state, tr =>
                                this.view.dispatch(tr)
                            )
                        },
                        "Mod-i": () => {
                            const sMark = this.view.state.schema.marks["em"]
                            const command = (0,prosemirror_commands__rspack_import_6.toggleMark)(sMark)
                            command(this.view.state, tr =>
                                this.view.dispatch(tr)
                            )
                        }
                    }),
                    this.placeholderPlugin(),
                    (0,_prosemirror_inline_tools__rspack_import_0.InlineTools)([
                        {
                            command: (0,prosemirror_commands__rspack_import_6.toggleMark)(_schema_literal__rspack_import_1.litSchema.marks.strong),
                            dom: (0,_prosemirror_inline_tools__rspack_import_0.icon)("strong", gettext("Strong"))
                        },
                        {
                            command: (0,prosemirror_commands__rspack_import_6.toggleMark)(_schema_literal__rspack_import_1.litSchema.marks.em),
                            dom: (0,_prosemirror_inline_tools__rspack_import_0.icon)("em", gettext("Emphasis"))
                        },
                        {
                            command: (0,prosemirror_commands__rspack_import_6.toggleMark)(_schema_literal__rspack_import_1.litSchema.marks.smallcaps),
                            dom: (0,_prosemirror_inline_tools__rspack_import_0.icon)("smallcaps", gettext("Small caps"))
                        },
                        {
                            command: (0,prosemirror_commands__rspack_import_6.toggleMark)(_schema_literal__rspack_import_1.litSchema.marks.sub),
                            dom: (0,_prosemirror_inline_tools__rspack_import_0.icon)("sub", gettext("Subscript₊"))
                        },
                        {
                            command: (0,prosemirror_commands__rspack_import_6.toggleMark)(_schema_literal__rspack_import_1.litSchema.marks.sup),
                            dom: (0,_prosemirror_inline_tools__rspack_import_0.icon)("sup", gettext("Supscript²"))
                        }
                    ])
                ]
            }),
            dispatchTransaction: tr => {
                const newState = this.view.state.apply(tr)
                this.view.updateState(newState)
            }
        })
    }

    get value() {
        const literalContents = this.view.state.doc.firstChild.content.toJSON()
        return literalContents && literalContents.length
            ? literalContents
            : false
    }

    check() {
        return true
    }

    placeholderPlugin() {
        return new prosemirror_state__rspack_import_3.Plugin({
            props: {
                decorations: state => {
                    const doc = state.doc
                    if (
                        doc.childCount === 1 &&
                        doc.firstChild.isTextblock &&
                        doc.firstChild.content.size === 0 &&
                        this.placeHolder
                    ) {
                        const placeHolder = document.createElement("span")
                        placeHolder.classList.add("placeholder")
                        // There is only one field, so we know the selection is there
                        placeHolder.classList.add("selected")
                        placeHolder.setAttribute(
                            "data-placeholder",
                            this.placeHolder
                        )
                        return prosemirror_view__rspack_import_2.DecorationSet.create(doc, [
                            prosemirror_view__rspack_import_2.Decoration.widget(1, placeHolder)
                        ])
                    }
                }
            }
        })
    }
}


}),
"./js/modules/bibliography/form/fields/literal_list.js": (function (__unused_rspack_module, __webpack_exports__, __webpack_require__) {
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  LiteralListForm: function() { return LiteralListForm; }
});
/* import */ var _common__rspack_import_0 = __webpack_require__("./js/modules/common/index.js");
/* import */ var _literal__rspack_import_1 = __webpack_require__("./js/modules/bibliography/form/fields/literal.js");



class LiteralListForm {
    constructor(dom, initialValue = [[]]) {
        this.currentValue = initialValue
        this.dom = dom
    }

    init() {
        this.drawForm()
    }

    drawForm() {
        this.fields = []
        this.dom.innerHTML =
            '<table class="input-list-wrapper"><tbody></tbody></table>'
        this.currentValue.forEach((fieldValue, index) => {
            this.addField(fieldValue, index)
        })
    }

    addField(fieldValue, index) {
        this.dom.firstChild.firstChild.insertAdjacentHTML(
            "beforeend",
            (0,_common__rspack_import_0.noSpaceTmp)`
            <tr>
                <td></td>
                <td class="input-field-list-ctrl">
                    <span class="fa fa-minus-circle" tabindex="0"></span>&nbsp;
                    <span class="fa fa-plus-circle" tabindex="0"></span>
                </td>
            </tr>`
        )
        const fieldDOM = this.dom.firstChild.firstChild.lastChild
        const fieldHandler = new _literal__rspack_import_1.LiteralFieldForm(
            fieldDOM.firstChild,
            fieldValue
        )
        fieldHandler.init()
        this.fields.push(fieldHandler)

        // click on plus
        const addItemEl = fieldDOM.querySelector(".fa-plus-circle")
        addItemEl.addEventListener("click", event =>
            this.handlePlus(event, index)
        )
        addItemEl.addEventListener("keydown", event =>
            this.handlePlus(event, index)
        )

        // Click on minus
        const removeItemEl = fieldDOM.querySelector(".fa-minus-circle")
        removeItemEl.addEventListener("click", event =>
            this.handleMinus(event, index)
        )
        removeItemEl.addEventListener("keydown", event =>
            this.handleMinus(event, index)
        )
    }

    handlePlus(event, index) {
        if (!(0,_common__rspack_import_0.isActivationEvent)(event)) {
            return
        }
        if (!this.value) {
            return
        }
        this.currentValue = this.value
        this.currentValue.splice(index + 1, 0, [])
        const focusIndex = (0,_common__rspack_import_0.getFocusIndex)()
        this.drawForm()
        ;(0,_common__rspack_import_0.setFocusIndex)(focusIndex + 1)
    }

    handleMinus(event, index) {
        if (!(0,_common__rspack_import_0.isActivationEvent)(event)) {
            return
        }
        if (!this.value) {
            return
        }
        this.currentValue = this.value
        this.currentValue.splice(index, 1)
        if (this.currentValue.length === 0) {
            this.currentValue = [[]]
        }
        const focusIndex = (0,_common__rspack_import_0.getFocusIndex)()
        this.drawForm()
        ;(0,_common__rspack_import_0.setFocusIndex)(focusIndex - 2)
    }

    get value() {
        const formValue = this.fields
            .map(field => {
                return field.value
            })
            .filter(value => {
                return value !== false
            })
        if (formValue.length === 0) {
            return false
        }
        return formValue
    }

    check() {
        return true
    }
}


}),
"./js/modules/bibliography/form/fields/literal_long.js": (function (__unused_rspack_module, __webpack_exports__, __webpack_require__) {
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  LiteralLongFieldForm: function() { return LiteralLongFieldForm; }
});
/* import */ var prosemirror_commands__rspack_import_6 = __webpack_require__("./node_modules/.pnpm/prosemirror-commands@1.7.0/node_modules/prosemirror-commands/dist/index.js");
/* import */ var prosemirror_history__rspack_import_4 = __webpack_require__("./node_modules/.pnpm/prosemirror-history@1.3.2/node_modules/prosemirror-history/dist/index.js");
/* import */ var prosemirror_keymap__rspack_import_5 = __webpack_require__("./node_modules/.pnpm/prosemirror-keymap@1.2.2/node_modules/prosemirror-keymap/dist/index.js");
/* import */ var prosemirror_state__rspack_import_3 = __webpack_require__("./node_modules/.pnpm/prosemirror-state@1.4.3/node_modules/prosemirror-state/dist/index.js");
/* import */ var prosemirror_view__rspack_import_2 = __webpack_require__("./node_modules/.pnpm/prosemirror-view@1.38.1/node_modules/prosemirror-view/dist/index.js");
/* import */ var _prosemirror_inline_tools__rspack_import_0 = __webpack_require__("./js/modules/prosemirror/inline_tools.js");
/* import */ var _schema_literal_long__rspack_import_1 = __webpack_require__("./js/modules/bibliography/schema/literal_long.js");









class LiteralLongFieldForm {
    constructor(dom, initialValue = []) {
        this.dom = dom
        this.initialValue = initialValue
    }

    init() {
        this.view = new prosemirror_view__rspack_import_2.EditorView(this.dom, {
            state: prosemirror_state__rspack_import_3.EditorState.create({
                schema: _schema_literal_long__rspack_import_1.longLitSchema,
                doc: _schema_literal_long__rspack_import_1.longLitSchema.nodeFromJSON({
                    type: "doc",
                    content: [
                        {
                            type: "longliteral",
                            content: this.initialValue
                        }
                    ]
                }),
                plugins: [
                    (0,prosemirror_history__rspack_import_4.history)(),
                    (0,prosemirror_keymap__rspack_import_5.keymap)(prosemirror_commands__rspack_import_6.baseKeymap),
                    (0,prosemirror_keymap__rspack_import_5.keymap)({
                        "Mod-z": prosemirror_history__rspack_import_4.undo,
                        "Mod-shift-z": prosemirror_history__rspack_import_4.undo,
                        "Mod-y": prosemirror_history__rspack_import_4.redo,
                        "Mod-b": () => {
                            const sMark = this.view.state.schema.marks["strong"]
                            const command = (0,prosemirror_commands__rspack_import_6.toggleMark)(sMark)
                            command(this.view.state, tr =>
                                this.view.dispatch(tr)
                            )
                        },
                        "Mod-i": () => {
                            const sMark = this.view.state.schema.marks["em"]
                            const command = (0,prosemirror_commands__rspack_import_6.toggleMark)(sMark)
                            command(this.view.state, tr =>
                                this.view.dispatch(tr)
                            )
                        }
                    }),
                    (0,_prosemirror_inline_tools__rspack_import_0.InlineTools)([
                        {
                            command: (0,prosemirror_commands__rspack_import_6.toggleMark)(_schema_literal_long__rspack_import_1.longLitSchema.marks.strong),
                            dom: (0,_prosemirror_inline_tools__rspack_import_0.icon)("strong", gettext("Strong"))
                        },
                        {
                            command: (0,prosemirror_commands__rspack_import_6.toggleMark)(_schema_literal_long__rspack_import_1.longLitSchema.marks.em),
                            dom: (0,_prosemirror_inline_tools__rspack_import_0.icon)("em", gettext("Emphasis"))
                        },
                        {
                            command: (0,prosemirror_commands__rspack_import_6.toggleMark)(_schema_literal_long__rspack_import_1.longLitSchema.marks.smallcaps),
                            dom: (0,_prosemirror_inline_tools__rspack_import_0.icon)("smallcaps", gettext("Small caps"))
                        },
                        {
                            command: (0,prosemirror_commands__rspack_import_6.toggleMark)(_schema_literal_long__rspack_import_1.longLitSchema.marks.sub),
                            dom: (0,_prosemirror_inline_tools__rspack_import_0.icon)("sub", gettext("Subscript₊"))
                        },
                        {
                            command: (0,prosemirror_commands__rspack_import_6.toggleMark)(_schema_literal_long__rspack_import_1.longLitSchema.marks.sup),
                            dom: (0,_prosemirror_inline_tools__rspack_import_0.icon)("sup", gettext("Supscript²"))
                        }
                    ])
                ]
            }),
            dispatchTransaction: tr => {
                const newState = this.view.state.apply(tr)
                this.view.updateState(newState)
            }
        })
    }

    get value() {
        const literalContents = this.view.state.doc.firstChild.content.toJSON()
        return literalContents && literalContents.length
            ? literalContents
            : false
    }

    check() {
        return true
    }
}


}),
"./js/modules/bibliography/form/fields/name.js": (function (__unused_rspack_module, __webpack_exports__, __webpack_require__) {
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  NameFieldForm: function() { return NameFieldForm; }
});
/* import */ var _common__rspack_import_0 = __webpack_require__("./js/modules/common/index.js");
/* import */ var _literal__rspack_import_1 = __webpack_require__("./js/modules/bibliography/form/fields/literal.js");



// There are only name lists, no name fields in the data format. The separation
// between NameFieldForm and NameListForm is for keeping consistency with other fields
// and lists.

class NameFieldForm {
    constructor(
        dom,
        initialValue = {
            given: [],
            family: [],
            prefix: [],
            suffix: [],
            useprefix: false,
            literal: []
        }
    ) {
        this.currentValue = initialValue
        this.dom = dom
        // We set the mode based on whether there was a literal name.
        if (initialValue.literal) {
            this.realPerson = false
        } else {
            this.realPerson = true
        }
    }

    init() {
        this.prepareWrapper()
        this.drawForm()
    }

    prepareWrapper() {
        this.dom.innerHTML = (0,_common__rspack_import_0.noSpaceTmp)`
                <div class="type-switch-input-wrapper">
                    <button class="type-switch">
                        <span class="type-switch-inner">
                            <span class="type-switch-label">${gettext("Person")}</span>
                            <span class="type-switch-label">${gettext("Organization")}</span>
                        </span>
                    </button>
                    <div class="type-switch-input-inner"></div>
                </div>
            `

        this.switcher = this.dom.querySelector(".type-switch")
        this.inner = this.dom.querySelector(".type-switch-input-inner")

        this.switcher.addEventListener("click", () => this.switchMode())
    }

    switchMode() {
        const formValue = this.value
        if (formValue) {
            Object.assign(this.currentValue, formValue)
        }
        this.realPerson = !this.realPerson
        this.drawForm(true)
    }

    drawForm(redraw = false) {
        const focusIndex = redraw ? (0,_common__rspack_import_0.getFocusIndex)() : -1
        if (this.realPerson) {
            this.drawPersonForm()
        } else {
            this.drawOrganizationForm()
        }
        (0,_common__rspack_import_0.setFocusIndex)(focusIndex)
    }

    drawPersonForm() {
        this.switcher.classList.add("value1")
        this.switcher.classList.remove("value2")

        this.fields = {}
        this.inner.innerHTML = (0,_common__rspack_import_0.noSpaceTmp)`
                <div class='given field-part field-part-long'></div>
                <div class='prefix field-part field-part-short'></div>
                <div class='family field-part field-part-long'></div>
                <div class='suffix field-part field-part-short'></div>
                <div class='useprefix field-part'>
                    <input type='checkbox' class='useprefix'
                        ${this.currentValue.useprefix ? "checked" : ""}>
                    &nbsp;${gettext("Prefix used")}
                </div>
            `
        this.fields["given"] = new _literal__rspack_import_1.LiteralFieldForm(
            this.dom.querySelector(".given"),
            this.currentValue.given,
            gettext("First name")
        )
        this.fields.given.init()
        this.fields["prefix"] = new _literal__rspack_import_1.LiteralFieldForm(
            this.dom.querySelector(".prefix"),
            this.currentValue.prefix,
            gettext("Prefix")
        )
        this.fields.prefix.init()
        this.fields["family"] = new _literal__rspack_import_1.LiteralFieldForm(
            this.dom.querySelector(".family"),
            this.currentValue.family,
            gettext("Last name")
        )
        this.fields.family.init()
        this.fields["suffix"] = new _literal__rspack_import_1.LiteralFieldForm(
            this.dom.querySelector(".suffix"),
            this.currentValue.suffix,
            gettext("Suffix")
        )
        this.fields.suffix.init()
    }

    drawOrganizationForm() {
        this.switcher.classList.add("value2")
        this.switcher.classList.remove("value1")

        this.fields = {}
        this.inner.innerHTML = (0,_common__rspack_import_0.noSpaceTmp)`<div class='literal-text field-part field-part-single'></div>`
        this.fields["literal"] = new _literal__rspack_import_1.LiteralFieldForm(
            this.dom.querySelector(".literal-text"),
            this.currentValue.literal,
            gettext("Organization name")
        )
        this.fields.literal.init()
    }

    get value() {
        if (this.realPerson) {
            if (
                !this.fields.family.value &&
                !this.fields.given.value &&
                !this.fields.prefix.value &&
                !this.fields.suffix.value
            ) {
                return false
            }
            const returnObject = {
                family: this.fields.family.value
                    ? this.fields.family.value
                    : [],
                given: this.fields.given.value ? this.fields.given.value : []
            }
            if (this.fields.prefix.value) {
                returnObject["prefix"] = this.fields.prefix.value
                returnObject["useprefix"] = this.dom.querySelector(
                    "input.useprefix"
                ).checked
                    ? true
                    : false
            }
            if (this.fields.suffix.value) {
                returnObject["suffix"] = this.fields.suffix.value
            }
            return returnObject
        } else {
            if (!this.fields.literal.value) {
                return false
            }
            return {
                literal: this.fields.literal.value
            }
        }
    }

    check() {
        return true
    }
}


}),
"./js/modules/bibliography/form/fields/name_list.js": (function (__unused_rspack_module, __webpack_exports__, __webpack_require__) {
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  NameListForm: function() { return NameListForm; }
});
/* import */ var _common__rspack_import_0 = __webpack_require__("./js/modules/common/index.js");
/* import */ var _name__rspack_import_1 = __webpack_require__("./js/modules/bibliography/form/fields/name.js");



class NameListForm {
    constructor(dom, initialValue = [[]]) {
        this.currentValue = initialValue
        this.dom = dom
    }

    init() {
        this.drawForm()
    }

    drawForm() {
        this.fields = []
        this.dom.innerHTML =
            '<table class="input-list-wrapper"><tbody></tbody></table>'
        this.currentValue.forEach((fieldValue, index) => {
            this.addField(fieldValue, index)
        })
    }

    addField(fieldValue, index) {
        this.dom.firstChild.firstChild.insertAdjacentHTML(
            "beforeend",
            (0,_common__rspack_import_0.noSpaceTmp)`
            <tr>
                <td></td>
                <td class="input-field-list-ctrl">
                    <span class="fa fa-minus-circle" tabindex="0"></span>&nbsp;
                    <span class="fa fa-plus-circle" tabindex="0"></span>
                </td>
            </tr>`
        )
        const fieldDOM = this.dom.firstChild.firstChild.lastChild
        const fieldHandler = new _name__rspack_import_1.NameFieldForm(fieldDOM.firstChild, fieldValue)
        fieldHandler.init()
        this.fields.push(fieldHandler)

        // click on plus
        const addItemEl = fieldDOM.querySelector(".fa-plus-circle")
        addItemEl.addEventListener("click", event =>
            this.handlePlus(event, index)
        )
        addItemEl.addEventListener("keydown", event =>
            this.handlePlus(event, index)
        )

        // Click on minus
        const removeItemEl = fieldDOM.querySelector(".fa-minus-circle")
        removeItemEl.addEventListener("click", event =>
            this.handleMinus(event, index)
        )
        removeItemEl.addEventListener("keydown", event =>
            this.handleMinus(event, index)
        )
    }

    handlePlus(event, index) {
        if (!(0,_common__rspack_import_0.isActivationEvent)(event)) {
            return
        }
        if (!this.value) {
            return
        }
        this.currentValue = this.value
        this.currentValue.splice(index + 1, 0, [])
        const focusIndex = (0,_common__rspack_import_0.getFocusIndex)()
        this.drawForm()
        ;(0,_common__rspack_import_0.setFocusIndex)(focusIndex + 1)
    }

    handleMinus(event, index) {
        if (!(0,_common__rspack_import_0.isActivationEvent)(event)) {
            return
        }
        if (!this.value) {
            return
        }
        this.currentValue = this.value
        this.currentValue.splice(index, 1)
        if (this.currentValue.length === 0) {
            this.currentValue = [[]]
        }
        const focusIndex = (0,_common__rspack_import_0.getFocusIndex)()
        this.drawForm()
        ;(0,_common__rspack_import_0.setFocusIndex)(focusIndex - 7)
    }

    get value() {
        const formValue = this.fields
            .map(field => {
                return field.value
            })
            .filter(value => {
                return value !== false
            })
        if (formValue.length === 0) {
            return false
        }
        return formValue
    }

    check() {
        return true
    }
}


}),
"./js/modules/bibliography/form/fields/range.js": (function (__unused_rspack_module, __webpack_exports__, __webpack_require__) {
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  RangeFieldForm: function() { return RangeFieldForm; }
});
/* import */ var _common__rspack_import_0 = __webpack_require__("./js/modules/common/index.js");
/* import */ var _literal__rspack_import_1 = __webpack_require__("./js/modules/bibliography/form/fields/literal.js");



// There are only range lists, no range fields in the data format. The separation
// between RangeFieldForm and RangeListForm is for keeping consistency with other fields
// and lists.

class RangeFieldForm {
    constructor(dom, initialValue = [[]]) {
        this.currentValue = initialValue
        this.dom = dom
        // We set the mode based on whether there is one or two initial values.
        if (initialValue.length > 1) {
            this.range = true
        } else {
            this.range = false
        }
    }

    init() {
        this.prepareWrapper()
        this.drawForm()
    }

    prepareWrapper() {
        this.dom.innerHTML = (0,_common__rspack_import_0.noSpaceTmp)`
                <div class="type-switch-input-wrapper">
                    <button class="type-switch">
                        <span class="type-switch-inner">
                            <span class="type-switch-label">${gettext("Single value")}</span>
                            <span class="type-switch-label">${gettext("Range")}</span>
                        </span>
                    </button>
                    <div class="type-switch-input-inner"></div>
                </div>
            `

        this.switcher = this.dom.querySelector(".type-switch")
        this.inner = this.dom.querySelector(".type-switch-input-inner")

        this.switcher.addEventListener("click", () => this.switchMode())
    }

    switchMode() {
        const formValue = this.value
        if (formValue) {
            Object.assign(this.currentValue, formValue)
        }
        this.range = !this.range
        this.drawForm(true)
    }

    drawForm(redraw = false) {
        const focusIndex = redraw ? (0,_common__rspack_import_0.getFocusIndex)() : -1
        if (this.range) {
            this.drawRangeForm()
        } else {
            this.drawSingleValueForm()
        }
        (0,_common__rspack_import_0.setFocusIndex)(focusIndex)
    }

    drawSingleValueForm() {
        this.switcher.classList.add("value1")
        this.switcher.classList.remove("value2")

        this.fields = {}
        this.inner.innerHTML = (0,_common__rspack_import_0.noSpaceTmp)`<div class='single-value field-part field-part-single'></div>`
        this.fields["single"] = new _literal__rspack_import_1.LiteralFieldForm(
            this.dom.querySelector(".single-value"),
            this.currentValue[0]
        )
        this.fields.single.init()
    }

    drawRangeForm() {
        this.switcher.classList.remove("value1")
        this.switcher.classList.add("value2")

        this.fields = {}
        this.inner.innerHTML = (0,_common__rspack_import_0.noSpaceTmp)`
                <div class='range-from field-part field-part-huge'></div>
                <div class='range-to field-part field-part-huge'></div>
            `
        this.fields["from"] = new _literal__rspack_import_1.LiteralFieldForm(
            this.dom.querySelector(".range-from"),
            this.currentValue[0],
            gettext("From")
        )
        this.fields.from.init()
        this.fields["to"] = new _literal__rspack_import_1.LiteralFieldForm(
            this.dom.querySelector(".range-to"),
            this.currentValue[1],
            gettext("To")
        )
        this.fields.to.init()
    }

    get value() {
        if (this.range) {
            if (!this.fields.from.value && !this.fields.to.value) {
                return false
            }
            return [
                this.fields.from.value
                    ? this.fields.from.value
                    : [{type: "text", text: ""}],
                this.fields.to.value
                    ? this.fields.to.value
                    : [{type: "text", text: ""}]
            ]
        } else {
            if (!this.fields.single.value) {
                return false
            }
            return [this.fields.single.value]
        }
    }

    check() {
        return true
    }
}


}),
"./js/modules/bibliography/form/fields/range_list.js": (function (__unused_rspack_module, __webpack_exports__, __webpack_require__) {
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  RangeListForm: function() { return RangeListForm; }
});
/* import */ var _common__rspack_import_0 = __webpack_require__("./js/modules/common/index.js");
/* import */ var _range__rspack_import_1 = __webpack_require__("./js/modules/bibliography/form/fields/range.js");



class RangeListForm {
    constructor(dom, initialValue = [[]]) {
        this.currentValue = initialValue
        this.dom = dom
    }

    init() {
        this.drawForm()
    }

    drawForm() {
        this.fields = []
        this.dom.innerHTML =
            '<table class="input-list-wrapper"><tbody></tbody></table>'
        this.currentValue.forEach((fieldValue, index) => {
            this.addField(fieldValue, index)
        })
    }

    addField(fieldValue, index) {
        this.dom.firstChild.firstChild.insertAdjacentHTML(
            "beforeend",
            (0,_common__rspack_import_0.noSpaceTmp)`
            <tr>
                <td></td>
                <td class="input-field-list-ctrl">
                    <span class="fa fa-minus-circle" tabindex="0"></span>&nbsp;
                    <span class="fa fa-plus-circle" tabindex="0"></span>
                </td>
            </tr>`
        )
        const fieldDOM = this.dom.firstChild.firstChild.lastChild
        const fieldHandler = new _range__rspack_import_1.RangeFieldForm(fieldDOM.firstChild, fieldValue)
        fieldHandler.init()
        this.fields.push(fieldHandler)

        // click on plus
        const addItemEl = fieldDOM.querySelector(".fa-plus-circle")
        addItemEl.addEventListener("click", event =>
            this.handlePlus(event, index)
        )
        addItemEl.addEventListener("keydown", event =>
            this.handlePlus(event, index)
        )

        // Click on minus
        const removeItemEl = fieldDOM.querySelector(".fa-minus-circle")
        removeItemEl.addEventListener("click", event =>
            this.handleMinus(event, index)
        )
        removeItemEl.addEventListener("keydown", event =>
            this.handleMinus(event, index)
        )
    }

    handlePlus(event, index) {
        if (!(0,_common__rspack_import_0.isActivationEvent)(event)) {
            return
        }
        if (!this.value) {
            return
        }
        this.currentValue = this.value
        this.currentValue.splice(index + 1, 0, [])
        const focusIndex = (0,_common__rspack_import_0.getFocusIndex)()
        this.drawForm()
        ;(0,_common__rspack_import_0.setFocusIndex)(focusIndex + 1)
    }

    handleMinus(event, index) {
        if (!(0,_common__rspack_import_0.isActivationEvent)(event)) {
            return
        }
        if (!this.value) {
            return
        }
        this.currentValue = this.value
        this.currentValue.splice(index, 1)
        if (this.currentValue.length === 0) {
            this.currentValue = [[]]
        }
        const focusIndex = (0,_common__rspack_import_0.getFocusIndex)()
        this.drawForm()
        ;(0,_common__rspack_import_0.setFocusIndex)(focusIndex - 1)
    }

    get value() {
        const formValue = this.fields
            .map(field => {
                return field.value
            })
            .filter(value => {
                return value !== false
            })
        if (formValue.length === 0) {
            return false
        }
        return formValue
    }

    check() {
        return true
    }
}


}),
"./js/modules/bibliography/form/fields/tag_list.js": (function (__unused_rspack_module, __webpack_exports__, __webpack_require__) {
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  TagListForm: function() { return TagListForm; }
});
/* import */ var tokenfield__rspack_import_0 = __webpack_require__("./node_modules/.pnpm/tokenfield@1.5.2/node_modules/tokenfield/lib/tokenfield.js");


class TagListForm {
    constructor(dom, initialValue = []) {
        this.dom = dom
        this.initialValue = initialValue
    }

    init() {
        this.dom.innerHTML = '<input class="tags" type="text">'
        this.tokenInput = new tokenfield__rspack_import_0["default"]({
            el: this.dom.querySelector(".tags"),
            setItems: this.initialValue.map((key, index) => {
                return {id: index, name: key}
            }),
            keys: {
                188: "delimiter"
            }
        })
    }

    get value() {
        const formValue = this.tokenInput.getItems().map(item => {
            return item.name
        })
        // If the form has not been filled out, don't consider this form
        return formValue.length > 0 ? formValue : false
    }

    check() {
        return true
    }
}


}),
"./js/modules/bibliography/form/fields/title.js": (function (__unused_rspack_module, __webpack_exports__, __webpack_require__) {
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  TitleFieldForm: function() { return TitleFieldForm; }
});
/* import */ var prosemirror_commands__rspack_import_6 = __webpack_require__("./node_modules/.pnpm/prosemirror-commands@1.7.0/node_modules/prosemirror-commands/dist/index.js");
/* import */ var prosemirror_history__rspack_import_4 = __webpack_require__("./node_modules/.pnpm/prosemirror-history@1.3.2/node_modules/prosemirror-history/dist/index.js");
/* import */ var prosemirror_keymap__rspack_import_5 = __webpack_require__("./node_modules/.pnpm/prosemirror-keymap@1.2.2/node_modules/prosemirror-keymap/dist/index.js");
/* import */ var prosemirror_state__rspack_import_3 = __webpack_require__("./node_modules/.pnpm/prosemirror-state@1.4.3/node_modules/prosemirror-state/dist/index.js");
/* import */ var prosemirror_view__rspack_import_2 = __webpack_require__("./node_modules/.pnpm/prosemirror-view@1.38.1/node_modules/prosemirror-view/dist/index.js");
/* import */ var _prosemirror_inline_tools__rspack_import_0 = __webpack_require__("./js/modules/prosemirror/inline_tools.js");
/* import */ var _schema_title__rspack_import_1 = __webpack_require__("./js/modules/bibliography/schema/title.js");









class TitleFieldForm {
    constructor(dom, initialValue) {
        this.initialValue = initialValue
        this.dom = dom
    }

    init() {
        this.view = new prosemirror_view__rspack_import_2.EditorView(this.dom, {
            state: prosemirror_state__rspack_import_3.EditorState.create({
                schema: _schema_title__rspack_import_1.titleSchema,
                doc: _schema_title__rspack_import_1.titleSchema.nodeFromJSON({
                    type: "doc",
                    content: [
                        {
                            type: "literal",
                            content: this.initialValue
                        }
                    ]
                }),
                plugins: [
                    (0,prosemirror_history__rspack_import_4.history)(),
                    (0,prosemirror_keymap__rspack_import_5.keymap)(prosemirror_commands__rspack_import_6.baseKeymap),
                    (0,prosemirror_keymap__rspack_import_5.keymap)({
                        "Mod-z": prosemirror_history__rspack_import_4.undo,
                        "Mod-shift-z": prosemirror_history__rspack_import_4.undo,
                        "Mod-y": prosemirror_history__rspack_import_4.redo,
                        "Mod-b": () => {
                            const sMark = this.view.state.schema.marks["strong"]
                            const command = (0,prosemirror_commands__rspack_import_6.toggleMark)(sMark)
                            command(this.view.state, tr =>
                                this.view.dispatch(tr)
                            )
                        },
                        "Mod-i": () => {
                            const sMark = this.view.state.schema.marks["em"]
                            const command = (0,prosemirror_commands__rspack_import_6.toggleMark)(sMark)
                            command(this.view.state, tr =>
                                this.view.dispatch(tr)
                            )
                        }
                    }),
                    (0,_prosemirror_inline_tools__rspack_import_0.InlineTools)([
                        {
                            command: (0,prosemirror_commands__rspack_import_6.toggleMark)(_schema_title__rspack_import_1.titleSchema.marks.strong),
                            dom: (0,_prosemirror_inline_tools__rspack_import_0.icon)("strong", gettext("Strong"))
                        },
                        {
                            command: (0,prosemirror_commands__rspack_import_6.toggleMark)(_schema_title__rspack_import_1.titleSchema.marks.em),
                            dom: (0,_prosemirror_inline_tools__rspack_import_0.icon)("em", gettext("Emphasis"))
                        },
                        {
                            command: (0,prosemirror_commands__rspack_import_6.toggleMark)(_schema_title__rspack_import_1.titleSchema.marks.smallcaps),
                            dom: (0,_prosemirror_inline_tools__rspack_import_0.icon)("smallcaps", gettext("Small caps"))
                        },
                        {
                            command: (0,prosemirror_commands__rspack_import_6.toggleMark)(_schema_title__rspack_import_1.titleSchema.marks.sub),
                            dom: (0,_prosemirror_inline_tools__rspack_import_0.icon)("sub", gettext("Subscript₊"))
                        },
                        {
                            command: (0,prosemirror_commands__rspack_import_6.toggleMark)(_schema_title__rspack_import_1.titleSchema.marks.sup),
                            dom: (0,_prosemirror_inline_tools__rspack_import_0.icon)("sup", gettext("Supscript²"))
                        },
                        {
                            command: (0,prosemirror_commands__rspack_import_6.toggleMark)(_schema_title__rspack_import_1.titleSchema.marks.nocase),
                            dom: (0,_prosemirror_inline_tools__rspack_import_0.icon)("nocase", gettext("CasE ProTecT"))
                        }
                    ])
                ]
            }),
            dispatchTransaction: tr => {
                const newState = this.view.state.apply(tr)
                this.view.updateState(newState)
            }
        })
    }

    get value() {
        const titleContents = this.view.state.doc.firstChild.content.toJSON()
        return titleContents && titleContents.length ? titleContents : false
    }

    check() {
        return true
    }
}


}),
"./js/modules/bibliography/form/fields/uri.js": (function (__unused_rspack_module, __webpack_exports__, __webpack_require__) {
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  URIFieldForm: function() { return URIFieldForm; }
});
// Simple regex to check for a basic URL structure
const simpleUrlRegex = /^(https?:\/\/)?[\w.-]+\.[a-z]{2,}(\/\S*)?$/i

function isValidUrl(string) {
    if (simpleUrlRegex.test(string)) {
        try {
            new URL(string)
            return true
        } catch (_e) {
            return false
        }
    }
    return false
}

class URIFieldForm {
    constructor(dom, initialValue = "", placeHolder = "") {
        this.dom = dom
        this.initialValue = initialValue
        this.placeHolder = placeHolder
    }

    init() {
        this.dom.innerHTML = `<input class="uri" type="text" value="${this.initialValue}" placeholder="${this.placeHolder}">`
    }

    get value() {
        const formValue = this.dom.querySelector("input.uri").value
        // If the form has not been filled out, don't consider this form
        return formValue.length > 0 ? formValue : false
    }

    check() {
        const formValue = this.value
        if (formValue) {
            if (!isValidUrl(formValue)) {
                this.dom.classList.add("fw-fomt-error")
                return false
            }
        }
        return true
    }
}


}),
"./js/modules/bibliography/form/fields/verbatim.js": (function (__unused_rspack_module, __webpack_exports__, __webpack_require__) {
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  VerbatimFieldForm: function() { return VerbatimFieldForm; }
});
class VerbatimFieldForm {
    constructor(dom, initialValue = "", placeHolder = "") {
        this.dom = dom
        this.initialValue = initialValue
        this.placeHolder = placeHolder
    }

    init() {
        this.dom.innerHTML = `<input class="verbatim" type="text" value="${this.initialValue}" placeholder="${this.placeHolder}">`
    }

    get value() {
        const formValue = this.dom.querySelector("input.verbatim").value
        // If the form has not been filled out, don't consider this form
        return formValue.length > 0 ? formValue : false
    }

    check() {
        return true
    }
}


}),
"./js/modules/bibliography/form/index.js": (function (__unused_rspack_module, __webpack_exports__, __webpack_require__) {
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  BibEntryForm: function() { return BibEntryForm; }
});
/* import */ var biblatex_csl_converter__rspack_import_0 = __webpack_require__("./node_modules/.pnpm/biblatex-csl-converter@3.6.0/node_modules/biblatex-csl-converter/lib/index.js");
/* import */ var _common__rspack_import_1 = __webpack_require__("./js/modules/common/index.js");
/* import */ var _tools__rspack_import_2 = __webpack_require__("./js/modules/bibliography/tools.js");
/* import */ var _cats__rspack_import_3 = __webpack_require__("./js/modules/bibliography/form/cats.js");
/* import */ var _fields_date__rspack_import_4 = __webpack_require__("./js/modules/bibliography/form/fields/date.js");
/* import */ var _fields_key__rspack_import_5 = __webpack_require__("./js/modules/bibliography/form/fields/key.js");
/* import */ var _fields_key_list__rspack_import_6 = __webpack_require__("./js/modules/bibliography/form/fields/key_list.js");
/* import */ var _fields_literal__rspack_import_7 = __webpack_require__("./js/modules/bibliography/form/fields/literal.js");
/* import */ var _fields_literal_list__rspack_import_8 = __webpack_require__("./js/modules/bibliography/form/fields/literal_list.js");
/* import */ var _fields_literal_long__rspack_import_9 = __webpack_require__("./js/modules/bibliography/form/fields/literal_long.js");
/* import */ var _fields_name_list__rspack_import_10 = __webpack_require__("./js/modules/bibliography/form/fields/name_list.js");
/* import */ var _fields_range_list__rspack_import_11 = __webpack_require__("./js/modules/bibliography/form/fields/range_list.js");
/* import */ var _fields_tag_list__rspack_import_12 = __webpack_require__("./js/modules/bibliography/form/fields/tag_list.js");
/* import */ var _fields_title__rspack_import_13 = __webpack_require__("./js/modules/bibliography/form/fields/title.js");
/* import */ var _fields_uri__rspack_import_14 = __webpack_require__("./js/modules/bibliography/form/fields/uri.js");
/* import */ var _fields_verbatim__rspack_import_15 = __webpack_require__("./js/modules/bibliography/form/fields/verbatim.js");
/* import */ var _strings__rspack_import_16 = __webpack_require__("./js/modules/bibliography/form/strings.js");
/* import */ var _templates__rspack_import_17 = __webpack_require__("./js/modules/bibliography/form/templates.js");



















const FIELD_FORMS = {
    f_date: _fields_date__rspack_import_4.DateFieldForm,
    f_integer: _fields_literal__rspack_import_7.LiteralFieldForm,
    f_literal: _fields_literal__rspack_import_7.LiteralFieldForm,
    l_literal: _fields_literal_list__rspack_import_8.LiteralListForm,
    f_long_literal: _fields_literal_long__rspack_import_9.LiteralLongFieldForm,
    f_key: _fields_key__rspack_import_5.KeyFieldForm,
    l_key: _fields_key_list__rspack_import_6.KeyListForm,
    l_name: _fields_name_list__rspack_import_10.NameListForm,
    l_range: _fields_range_list__rspack_import_11.RangeListForm,
    l_tag: _fields_tag_list__rspack_import_12.TagListForm,
    f_title: _fields_title__rspack_import_13.TitleFieldForm,
    f_uri: _fields_uri__rspack_import_14.URIFieldForm,
    f_verbatim: _fields_verbatim__rspack_import_15.VerbatimFieldForm
}

class BibEntryForm {
    constructor(bibDB, app = false, itemId = false) {
        this.bibDB = bibDB
        this.itemId = itemId
        this.app = app
        this.fields = {}
        this.currentValues = {}
    }

    init() {
        if (this.app && this.app.isOffline()) {
            // Diable the editing of main user bibliography , since Document bibliography is stored in Editor/Document.
            (0,_common__rspack_import_1.addAlert)(
                "info",
                gettext(
                    "You are currently offline. Please try again when you are back online."
                )
            )
            return Promise.resolve()
        }
        if (this.itemId !== false) {
            this.dialogHeader = gettext("Edit Source")
            const bibEntry = this.bibDB.db[this.itemId]
            this.currentValues = JSON.parse(JSON.stringify(bibEntry)) // copy current values
        } else {
            this.dialogHeader = gettext("Register New Source")
            this.currentValues = {
                bib_type: false,
                cats: [],
                entry_key: "FidusWriter",
                fields: {}
            }
        }
        return this.createForm()
    }

    addDialogToDOM() {
        // Add form to DOM
        const buttons = [
            {
                type: "close"
            }
        ]

        return new Promise(resolve => {
            buttons.push({
                classes: "fw-dark",
                text: gettext("Submit"),
                click: () => {
                    if (this.check()) {
                        const returnValue = this.save()
                        this.dialog.close()
                        resolve(returnValue)
                    }
                }
            })

            this.dialog = new _common__rspack_import_1.Dialog({
                title: this.dialogHeader,
                id: "bib-dialog",
                width: 940,
                body: (0,_templates__rspack_import_17.bibDialog)({
                    bib_type: this.currentValues.bib_type,
                    BibTypes: biblatex_csl_converter__rspack_import_0.BibTypes
                }),
                buttons
            })

            this.dialog.open()

            // init ui tabs

            // Hide all but first tab
            this.dialog.dialogEl
                .querySelectorAll("#bib-dialog-tabs .tab-content")
                .forEach((el, index) => {
                    if (index) {
                        el.style.display = "none"
                    }
                })

            this.dialog.dialogEl
                .querySelector("#bib-dialog-tabs .tab-link")
                .classList.add("current-tab")

            // Handle tab link clicking
            this.dialog.dialogEl
                .querySelectorAll("#bib-dialog-tabs .tab-link a")
                .forEach(el =>
                    el.addEventListener("click", event => {
                        event.preventDefault()

                        el.parentNode.parentNode
                            .querySelectorAll(".tab-link.current-tab")
                            .forEach(el => el.classList.remove("current-tab"))
                        el.parentNode.classList.add("current-tab")

                        const link = el.getAttribute("href")
                        this.dialog.dialogEl
                            .querySelectorAll("#bib-dialog-tabs .tab-content")
                            .forEach(el => {
                                if (el.matches(link)) {
                                    el.style.display = ""
                                } else {
                                    el.style.display = "none"
                                }
                            })
                    })
                )

            document
                .getElementById("select-bibtype")
                .addEventListener("change", () => resolve(this.changeBibType()))
        })
    }

    addField(fieldName, dom) {
        const fieldType = biblatex_csl_converter__rspack_import_0.BibFieldTypes[fieldName]
        let fieldTitle
        const fieldTitleText = (0,_strings__rspack_import_16.getBibFieldTitle)(
            fieldName,
            this.currentValues.bib_type
        )
        if (_strings__rspack_import_16.BibFieldHelp[fieldName]) {
            fieldTitle = (0,_common__rspack_import_1.noSpaceTmp)`
                <h4 class="fw-tablerow-title wtooltip">
                    ${fieldTitleText}
                    <span class="tooltip">${_strings__rspack_import_16.BibFieldHelp[fieldName]}</span>
                </h4>
            `
        } else {
            fieldTitle = (0,_common__rspack_import_1.noSpaceTmp)`
                <h4 class="fw-tablerow-title">
                    ${fieldTitleText}
                </h4>
            `
        }

        dom.insertAdjacentHTML(
            "beforeend",
            (0,_common__rspack_import_1.noSpaceTmp)`
                <tr>
                    <th>${fieldTitle}</th>
                    <td class="entry-field ${fieldName}"></td>
                </tr>`
        )
        const fieldDOM = dom.lastChild.lastChild
        const FieldClass = FIELD_FORMS[fieldType.type]
        if (FieldClass) {
            const fieldHandler = new FieldClass(
                fieldDOM,
                this.currentValues.fields[fieldName],
                undefined,
                fieldType
            )
            fieldHandler.init()
            this.fields[fieldName] = fieldHandler
        }
    }

    createForm() {
        const dialogPromise = this.addDialogToDOM()
        if (this.currentValues.bib_type !== false) {
            const eitherOrFields = document.getElementById("eo-fields")
            biblatex_csl_converter__rspack_import_0.BibTypes[this.currentValues.bib_type].eitheror.forEach(
                fieldName => {
                    this.addField(fieldName, eitherOrFields)
                }
            )
            const reqFields = document.getElementById("req-fields")
            biblatex_csl_converter__rspack_import_0.BibTypes[this.currentValues.bib_type].required.forEach(
                fieldName => {
                    this.addField(fieldName, reqFields)
                }
            )
            const optFields = document.getElementById("opt-fields")
            biblatex_csl_converter__rspack_import_0.BibTypes[this.currentValues.bib_type].optional.forEach(
                fieldName => {
                    this.addField(fieldName, optFields)
                }
            )
            const catsField = document.getElementById("categories-field")
            this.catsForm = new _cats__rspack_import_3.CatsForm(
                catsField,
                this.currentValues.cats,
                this.bibDB.cats
            )
            this.catsForm.init()

            if (!this.bibDB.cats.length) {
                // There are no ctaegories to select from, so remove the categories tab.
                document
                    .querySelectorAll("#categories-tab, #categories-link")
                    .forEach(el => el.parentElement.removeChild(el))
            }
        }
        return dialogPromise
    }

    changeBibType() {
        // Add all current values into temporary currentValues, in case the
        // user still wants them.
        const formValue = this.value
        Object.assign(this.currentValues.fields, formValue.fields)
        this.currentValues.cats = formValue.cats
        this.currentValues.bib_type = formValue.bib_type
        // Reset fields and close dialog.
        this.fields = {}
        this.dialog.close()
        return this.createForm()
    }

    createEntryKey(bibItem) {
        // We attempt to create a biblatex compatible entry key if there is no entry
        // key so far.
        let entryKey = ""
        if (bibItem.fields.author) {
            entryKey += (0,_tools__rspack_import_2.nameToText)(bibItem.fields.author).replace(
                /\s|,|=|;|:|{|}/g,
                ""
            )
        } else if (bibItem.fields.editor) {
            entryKey += (0,_tools__rspack_import_2.nameToText)(bibItem.fields.editor).replace(
                /\s|,|=|;|:|{|}/g,
                ""
            )
        }
        if (bibItem.fields.date) {
            entryKey += bibItem.fields.date
                .split("/")[0]
                .replace(/\?|\*|u|~|-/g, "")
        }
        if (entryKey.length) {
            bibItem.entry_key = entryKey
        }
    }

    get value() {
        const returnObj = {
            bib_type: document.querySelector("#select-bibtype").value,
            cats: this.catsForm ? this.catsForm.value : [],
            entry_key: this.currentValues.entry_key, // is never updated.
            fields: {}
        }
        Object.keys(this.fields).forEach(fieldName => {
            const fieldValue = this.fields[fieldName].value
            if (fieldValue !== false) {
                returnObj["fields"][fieldName] = fieldValue
            }
        })
        return returnObj
    }

    save() {
        const isNew = this.itemId === false ? true : false,
            itemId = this.itemId === false ? 0 : this.itemId,
            item = this.value

        if (item.entry_key === "FidusWriter") {
            this.createEntryKey(item)
        }
        const saveObj = {}
        saveObj[itemId] = item
        return this.bibDB.saveBibEntries(saveObj, isNew)
    }

    check() {
        let passed = true
        if (!this.currentValues.bib_type) {
            return false
        }
        Object.keys(this.fields).forEach(fieldName => {
            if (this.fields[fieldName].check() !== true) {
                passed = false
            }
        })
        if (!passed) {
            (0,_common__rspack_import_1.addAlert)(
                "error",
                gettext("Error in form, check highlighted values!")
            )
        }
        return passed
    }
}


}),
"./js/modules/bibliography/form/templates.js": (function (__unused_rspack_module, __webpack_exports__, __webpack_require__) {
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  bibDialog: function() { return bibDialog; }
});
/* import */ var _strings__rspack_import_0 = __webpack_require__("./js/modules/bibliography/form/strings.js");
/** A template for the bibliography item edit dialog. */


const bibDialog = ({bib_type, BibTypes}) => {
    const typeTitles = (0,_strings__rspack_import_0.getAllTypeTitles)()
    return `<div id="bib-dialog-tabs">
        <div class="bib-dialog-header">
            <div class="fw-select-container">
                <select id="select-bibtype" class="fw-button fw-light fw-large" required>
                    ${
                        bib_type === false
                            ? `<option class="placeholder" selected disabled value="">${gettext("Select source type")}</option>`
                            : ""
                    }
                    ${Object.keys(BibTypes)
                        .map(
                            key =>
                                `<option value="${key}"
                                    ${key === bib_type ? "selected" : ""}>
                                ${typeTitles[key]}
                            </option>`
                        )
                        .join("")}
                </select>
                <div class="fw-select-arrow fa fa-caret-down"></div>
            </div>
            <ul class="ui-tabs-nav">
                <li class="tab-link"><a href="#req-fields-tab" class="tab-link-inner">
                    ${gettext("Required Fields")}
                </a></li>
                <li class="tab-link"><a href="#opt-fields-tab" class="tab-link-inner">
                    ${gettext("Optional Fields")}
                </a></li>
                <li class="tab-link" id="categories-link"><a href="#categories-tab" class="tab-link-inner">
                    ${gettext("Categories")}
                </a></li>
            </ul>
        </div>
        <div class="tab-content ui-tabs-panel" id="req-fields-tab">
            <table class="fw-dialog-table"><tbody id="eo-fields"></tbody></table>
            <table class="fw-dialog-table"><tbody id="req-fields"></tbody></table>
        </div>
        <div class="tab-content ui-tabs-panel" id="opt-fields-tab">
            <table class="fw-dialog-table"><tbody id="opt-fields"></tbody></table>
        </div>
        <div class="tab-content ui-tabs-panel" id="categories-tab">
            <table class="fw-dialog-table">
                <tbody>
                    <tr>
                        <th><h4 class="fw-tablerow-title">${gettext("Categories")}</h4></th>
                        <td id="categories-field"></td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>`
}


}),
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
"./js/modules/bibliography/schema/literal.js": (function (__unused_rspack_module, __webpack_exports__, __webpack_require__) {
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  litSchema: function() { return litSchema; }
});
/* import */ var prosemirror_model__rspack_import_1 = __webpack_require__("./node_modules/.pnpm/prosemirror-model@1.25.0/node_modules/prosemirror-model/dist/index.js");
/* import */ var prosemirror_schema_basic__rspack_import_2 = __webpack_require__("./node_modules/.pnpm/prosemirror-schema-basic@1.2.4/node_modules/prosemirror-schema-basic/dist/index.js");
/* import */ var _common__rspack_import_0 = __webpack_require__("./js/modules/bibliography/schema/common.js");




const doc = {
    content: "literal"
}

const litSchema = new prosemirror_model__rspack_import_1.Schema({
    nodes: {
        doc,
        literal: _common__rspack_import_0.literal,
        text: _common__rspack_import_0.text,
        variable: _common__rspack_import_0.variable
    },
    marks: {
        em: prosemirror_schema_basic__rspack_import_2.marks.em,
        enquote: _common__rspack_import_0.enquote,
        smallcaps: _common__rspack_import_0.smallcaps,
        strong: prosemirror_schema_basic__rspack_import_2.marks.strong,
        sup: _common__rspack_import_0.sup,
        sub: _common__rspack_import_0.sub,
        url: _common__rspack_import_0.url
    }
})


}),
"./js/modules/bibliography/schema/literal_long.js": (function (__unused_rspack_module, __webpack_exports__, __webpack_require__) {
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  longLitSchema: function() { return longLitSchema; }
});
/* import */ var prosemirror_model__rspack_import_1 = __webpack_require__("./node_modules/.pnpm/prosemirror-model@1.25.0/node_modules/prosemirror-model/dist/index.js");
/* import */ var prosemirror_schema_basic__rspack_import_2 = __webpack_require__("./node_modules/.pnpm/prosemirror-schema-basic@1.2.4/node_modules/prosemirror-schema-basic/dist/index.js");
/* import */ var _common__rspack_import_0 = __webpack_require__("./js/modules/bibliography/schema/common.js");




const longliteral = {
    content: "inline*",
    marks: "_",
    code: true,
    defining: true,
    parseDOM: [{tag: "pre.long-literal"}],
    toDOM(_node) {
        return [
            "pre",
            {
                class: "long-literal"
            },
            0
        ]
    }
}

const doc = {
    content: "longliteral"
}

const longLitSchema = new prosemirror_model__rspack_import_1.Schema({
    nodes: {
        doc,
        longliteral,
        text: _common__rspack_import_0.text,
        variable: _common__rspack_import_0.variable
    },
    marks: {
        em: prosemirror_schema_basic__rspack_import_2.marks.em,
        enquote: _common__rspack_import_0.enquote,
        smallcaps: _common__rspack_import_0.smallcaps,
        strong: prosemirror_schema_basic__rspack_import_2.marks.strong,
        sup: _common__rspack_import_0.sup,
        sub: _common__rspack_import_0.sub,
        url: _common__rspack_import_0.url
    }
})


}),
"./js/modules/bibliography/schema/title.js": (function (__unused_rspack_module, __webpack_exports__, __webpack_require__) {
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  titleSchema: function() { return titleSchema; }
});
/* import */ var prosemirror_model__rspack_import_1 = __webpack_require__("./node_modules/.pnpm/prosemirror-model@1.25.0/node_modules/prosemirror-model/dist/index.js");
/* import */ var prosemirror_schema_basic__rspack_import_2 = __webpack_require__("./node_modules/.pnpm/prosemirror-schema-basic@1.2.4/node_modules/prosemirror-schema-basic/dist/index.js");
/* import */ var _common__rspack_import_0 = __webpack_require__("./js/modules/bibliography/schema/common.js");




const nocase = {
    parseDOM: [{tag: "span.nocase"}],
    toDOM() {
        return ["span", {class: "nocase"}]
    }
}

const doc = {
    content: "literal"
}

const titleSchema = new prosemirror_model__rspack_import_1.Schema({
    nodes: {
        doc,
        literal: _common__rspack_import_0.literal,
        text: _common__rspack_import_0.text,
        variable: _common__rspack_import_0.variable
    },
    marks: {
        em: prosemirror_schema_basic__rspack_import_2.marks.em,
        enquote: _common__rspack_import_0.enquote,
        nocase,
        smallcaps: _common__rspack_import_0.smallcaps,
        strong: prosemirror_schema_basic__rspack_import_2.marks.strong,
        sup: _common__rspack_import_0.sup,
        sub: _common__rspack_import_0.sub,
        url: _common__rspack_import_0.url
    }
})


}),
"./js/modules/prosemirror/inline_tools.js": (function (__unused_rspack_module, __webpack_exports__, __webpack_require__) {
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  InlineTools: function() { return InlineTools; },
  icon: function() { return icon; }
});
/* import */ var prosemirror_state__rspack_import_0 = __webpack_require__("./node_modules/.pnpm/prosemirror-state@1.4.3/node_modules/prosemirror-state/dist/index.js");


const icon = (text, name) => {
    const span = document.createElement("span")
    span.className = "menuicon " + text
    span.title = name
    span.textContent = text
    span.setAttribute("data-type", text)
    return span
}

class MenuView {
    constructor(items, view) {
        this.items = items
        this.editorView = view

        this.dom = document.createElement("div")
        this.dom.className = "inline-tools"
        items.forEach(({dom}) => this.dom.appendChild(dom))

        this.dom.addEventListener("mousedown", e => {
            e.preventDefault()
            view.focus()
            items.forEach(({command, dom}) => {
                if (dom.contains(e.target)) {
                    command(view.state, view.dispatch, view)
                }
            })
        })

        this.update(view)
    }

    update(view) {
        const activeMarks = []

        const storedMarks =
            view.state?.storedMarks || view.state?.selection.$head.marks()
        if (storedMarks) {
            for (const mark of storedMarks) {
                activeMarks[mark.type.name] = true
            }
        }

        this.items.forEach(({dom}) => {
            if (activeMarks[dom.getAttribute("data-type")]) {
                dom.classList.add("active")
            } else {
                dom.classList.remove("active")
            }
        })
    }

    destroy() {
        this.dom.remove()
    }
}

const InlineTools = tools => {
    return new prosemirror_state__rspack_import_0.Plugin({
        view(view) {
            const menuView = new MenuView(tools, view)
            view.dom.parentNode.appendChild(menuView.dom)
            return menuView
        }
    })
}


}),

}]);