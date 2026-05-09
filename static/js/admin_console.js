(function() {
"use strict";
var __webpack_modules__ = ({
"./js/modules/admin_console/index.js": (function (__unused_rspack_module, __webpack_exports__, __webpack_require__) {
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  AdminConsole: function() { return AdminConsole; }
});
/* import */ var _common__rspack_import_0 = __webpack_require__("./js/modules/common/index.js");


// To see how many users are currently online and send them maintenance messages

class AdminConsole {
    constructor() {}

    init() {
        (0,_common__rspack_import_0.whenReady)().then(() => {
            this.render()
            this.bind()
        })
    }

    bind() {
        document.body.addEventListener("click", event => {
            const el = {}
            switch (true) {
                case (0,_common__rspack_import_0.findTarget)(
                    event,
                    "input#submit_user_message:not(.disabled)",
                    el
                ): {
                    const message = document.querySelector(
                        "textarea#user_message"
                    ).value
                    if (!message.length) {
                        return
                    }
                    document.querySelector("textarea#user_message").disabled =
                        true
                    document.querySelector(
                        "input#submit_user_message"
                    ).disabled = true
                    document.querySelector("input#submit_user_message").value =
                        gettext("Sending...")
                    this.sendSystemMessage(message)
                    break
                }
                default:
                    break
            }
        })
    }

    sendSystemMessage(message) {
        return (0,_common__rspack_import_0.jsonPostJson)("/api/base/send_system_message/", {message}).then(
            () => {
                (0,_common__rspack_import_0.addAlert)("info", gettext("Message delivered successfully!"))
                const button = document.querySelector(
                    "input#submit_user_message"
                )
                button.value = gettext("Message delivered")
            }
        )
    }

    render() {
        return (0,_common__rspack_import_0.getJson)("/api/base/connection_info/").then(
            ({sessions, users}) => {
                const sessionCounterEl =
                    document.getElementById("session_count")
                if (sessionCounterEl) {
                    sessionCounterEl.innerHTML = String(sessions)
                }
                const userCounterEl = document.getElementById("user_count")
                if (userCounterEl) {
                    userCounterEl.innerHTML = String(users)
                }
            }
        )
    }
}


}),
"./js/modules/common/basic.js": (function (__unused_rspack_module, __webpack_exports__, __webpack_require__) {
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  activateWait: function() { return activateWait; },
  addAlert: function() { return addAlert; },
  cancelPromise: function() { return cancelPromise; },
  deactivateWait: function() { return deactivateWait; },
  dropdownSelect: function() { return dropdownSelect; },
  enableDatePicker: function() { return enableDatePicker; },
  escapeText: function() { return escapeText; },
  findTarget: function() { return findTarget; },
  infoTooltip: function() { return infoTooltip; },
  langName: function() { return langName; },
  localizeDate: function() { return localizeDate; },
  noSpaceTmp: function() { return noSpaceTmp; },
  setCheckableLabel: function() { return setCheckableLabel; },
  setDocTitle: function() { return setDocTitle; },
  showSystemMessage: function() { return showSystemMessage; },
  unescapeText: function() { return unescapeText; },
  whenReady: function() { return whenReady; }
});
/* import */ var w3c_keyname__rspack_import_0 = __webpack_require__("./node_modules/.pnpm/w3c-keyname@2.2.8/node_modules/w3c-keyname/index.js");
/* import */ var _content_menu__rspack_import_1 = __webpack_require__("./js/modules/common/content_menu.js");
/* import */ var _dialog__rspack_import_2 = __webpack_require__("./js/modules/common/dialog.js");
/* import */ var _events__rspack_import_3 = __webpack_require__("./js/modules/common/events.js");






/** Creates a styled select with a contentmenu from a select tag.
 * @param select The select-tag which is to be replaced.
 * @param options
 */

const dropdownSelect = (
    selectDOM,
    {onChange = _newValue => {}, width = false, value = false, button = false}
) => {
    if (!selectDOM.parentElement) {
        return
    }
    let buttonDOM
    if (button) {
        buttonDOM = button
        selectDOM.parentElement.removeChild(selectDOM) // Remove the <select> from the main dom.
    } else {
        buttonDOM = document.createElement("div")
        buttonDOM.innerHTML =
            '<label></label>&nbsp;<span class="fa fa-caret-down"></span>'
        buttonDOM.classList.add(
            "fw-button",
            "fw-light",
            "fw-large",
            "fw-dropdown"
        )
        if (width) {
            buttonDOM.style.width = Number.isInteger(width)
                ? `${width}px`
                : width
        }
        selectDOM.classList.forEach(className =>
            buttonDOM.classList.add(className)
        )
        if (selectDOM.id) {
            buttonDOM.id = selectDOM.id
        }
        selectDOM.parentElement.replaceChild(buttonDOM, selectDOM) // Remove the <select> from the main dom.
    }

    buttonDOM.setAttribute("role", "button")
    buttonDOM.setAttribute("tabindex", "0")
    buttonDOM.setAttribute("aria-haspopup", "true")
    buttonDOM.setAttribute("aria-expanded", "false")

    const options = Array.from(selectDOM.children)
    if (!options.length) {
        // There are no options, so we only create the button.
        return {
            setValue: () => {},
            getValue: () => false
        }
    }
    let selected
    const menu = {
        content: options.map((option, order) => {
            if (option.selected || option.value === value) {
                selected = option
            }
            return {
                title: option.innerHTML,
                type: "action",
                tooltip: option.title || "",
                order,
                action: () => {
                    if (!button) {
                        buttonDOM.firstElementChild.innerText = option.innerText
                    }
                    value = option.value || option.dataset.value
                    onChange(value)
                    menu.content.forEach(item => (item.selected = false))
                    menu.content[order].selected = true
                    return false
                },
                selected: !!(option.selected || option.dataset.selected)
            }
        })
    }
    if (!selected && !button) {
        selected = selectDOM.firstElementChild
        menu.content[0].selected = true
    }

    if (!button) {
        buttonDOM.firstElementChild.innerText = selected.innerText
    }

    value = selected ? selected.value : false

    const openMenu = event => {
        if (!(0,_events__rspack_import_3.isActivationEvent)(event)) {
            return
        }

        event.preventDefault()
        event.stopPropagation()
        if (buttonDOM.classList.contains("disabled")) {
            return
        }
        // Determine menu position
        let menuPos
        if (event.type === "click") {
            menuPos = {X: event.pageX, Y: event.pageY}
        } else {
            // Keyboard event
            const rect = buttonDOM.getBoundingClientRect()
            menuPos = {
                X: rect.left + window.pageXOffset,
                Y: rect.top + window.pageYOffset + rect.height
            }
        }

        buttonDOM.setAttribute("aria-expanded", "true")
        const contentMenu = new _content_menu__rspack_import_1.ContentMenu({
            menu,
            menuPos,
            onClose: () => buttonDOM.setAttribute("aria-expanded", "false")
        })
        contentMenu.open()
    }

    buttonDOM.addEventListener("click", openMenu)
    buttonDOM.addEventListener("keydown", openMenu)

    return {
        setValue: newValue => {
            const optionIndex = options.findIndex(
                option => option.value === newValue
            )
            if (optionIndex === undefined) {
                return
            }
            menu.content.forEach(item => (item.selected = false))
            menu.content[optionIndex].selected = true
            const option = options[optionIndex]
            if (!button) {
                buttonDOM.firstElementChild.innerText = option.innerText
            }
            value = newValue
        },
        getValue: () => value,
        enable: () => buttonDOM.classList.remove("disabled"),
        disable: () => buttonDOM.classList.add("disabled")
    }
}

/** Checks or unchecks a checkable label. This is used for example for bibliography categories when editing bibliography items.
 * @param label The node who's parent has to be checked or unchecked.
 */
const setCheckableLabel = labelEl => {
    if (labelEl.classList.contains("checked")) {
        labelEl.classList.remove("checked")
    } else {
        labelEl.classList.add("checked")
    }
}

let messageWaiter = false
let waitMessage = ""
/** Cover the page signaling to the user to wait.
 */
const activateWait = (full = false, message = "") => {
    const waitEl = document.getElementById("wait")
    if (message) {
        let messageEl = waitEl.querySelector("span.message")
        if (messageEl) {
            // Another message is already showing. We update directly.
            messageEl.innerText = message
        } else {
            waitMessage = message // We update the message if there is one waiting already
            if (!messageWaiter) {
                messageWaiter = setTimeout(() => {
                    messageEl = document.createElement("span")
                    messageEl.classList.add("message")
                    messageEl.innerText = waitMessage
                    waitEl.appendChild(messageEl)
                    messageWaiter = false
                }, 2000)
            }
        }
    }
    if (waitEl) {
        waitEl.classList.add("active")
        if (full) {
            waitEl.classList.add("full")
        }
    }
}

/** Remove the wait cover.
 */
const deactivateWait = () => {
    const waitEl = document.getElementById("wait")
    if (waitEl) {
        waitEl.classList.remove("active")
        waitEl.classList.remove("full")
    }
    const messageEl = waitEl.querySelector("span.message")
    if (messageEl) {
        messageEl.parentElement.removeChild(messageEl)
    }
    if (messageWaiter) {
        clearTimeout(messageWaiter)
        messageWaiter = false
    }
}

/** Show a message to the user.
 * @param alertType The type of message that is shown (error, warning, info or success).
 * @param alertMsg The message text.
 */
const addAlert = (alertType, alertMsg) => {
    if (!document.body) {
        return
    }
    const iconNames = {
        error: "exclamation-circle",
        warning: "exclamation-circle",
        info: "info-circle",
        success: "check-circle"
    }
    if (!document.getElementById("#alerts-outer-wrapper")) {
        document.body.insertAdjacentHTML(
            "beforeend",
            '<div id="alerts-outer-wrapper"><ul id="alerts-wrapper"></ul></div>'
        )
    }
    const alertsWrapper = document.getElementById("alerts-wrapper")
    alertsWrapper.insertAdjacentHTML(
        "beforeend",
        `<li class="alerts-${alertType} fa-before fa-${iconNames[alertType]}">${alertMsg}</li>`
    )
    const alertBox = alertsWrapper.lastElementChild
    setTimeout(() => {
        alertBox.classList.add("visible")
        setTimeout(() => {
            alertBox.classList.remove("visible")
            setTimeout(() => alertsWrapper.removeChild(alertBox), 2000)
        }, 4000)
    }, 1)
}

// Used for system mesages
const showSystemMessage = (message, buttons = [{type: "close"}]) => {
    const dialog = new _dialog__rspack_import_2.Dialog({
        title: gettext("System message"),
        body: `<p>${escapeText(message)}</p>`,
        buttons
    })
    dialog.open()
    return dialog
}

/** Turn milliseconds since epoch (UTC) into a local date string.
 * @param {number} milliseconds Number of milliseconds since epoch (1/1/1970 midnight, UTC).
 * @param {boolean} type 'full' for full date (default), 'sortable-date' for sortable date, 'minutes' for minute accuracy
 */
const CACHED_DATES = {
    "sortable-date": {},
    minutes: {},
    full: {}
}
const localizeDate = (milliseconds, type = "full") => {
    if (milliseconds === 0) {
        return ""
    } else if (CACHED_DATES[type][milliseconds]) {
        return CACHED_DATES[type][milliseconds]
    }
    const theDate = new Date(milliseconds)
    let returnValue
    switch (type) {
        case "sortable-date": {
            const yyyy = theDate.getFullYear()
            const mm = theDate.getMonth() + 1
            const dd = theDate.getDate()
            returnValue = `${yyyy}-${String(mm).padStart(2, "0")}-${String(dd).padStart(2, "0")}`
            break
        }
        case "minutes":
            returnValue = theDate.toLocaleString([], {
                year: "numeric",
                month: "2-digit",
                day: "2-digit",
                hour: "2-digit",
                minute: "2-digit"
            })
            break
        default:
            returnValue = theDate.toLocaleString()
    }
    if (Object.keys(CACHED_DATES[type]).length > 5000) {
        CACHED_DATES[type] = {}
    }
    CACHED_DATES[type][milliseconds] = returnValue
    return returnValue
}

/**
 * Turn string literals into single line, removing spaces at start of line
 */

const noSpaceTmp = (strings, ...values) => {
    const tmpStrings = Array.from(strings)

    let combined = ""
    while (tmpStrings.length > 0 || values.length > 0) {
        if (tmpStrings.length > 0) {
            combined += tmpStrings.shift()
        }
        if (values.length > 0) {
            combined += values.shift()
        }
    }

    let out = ""
    combined.split("\n").forEach(line => {
        out += line.replace(/^\s*/g, "")
    })
    return out
}

const escapeText = text => {
    return text
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")

        .replace(/[^\x09\x0A\x0D\x20-\uD7FF\uE000-\uFFFD\u10000-\u10FFFF]/g, "") // invalid in XML chars
}

/**
 * Return an inline info-icon with a hover tooltip containing the given HTML.
 * Use only with trusted HTML content.
 *
 * @param {string} html - The tooltip content (HTML string)
 * @returns {string} HTML for the info tooltip
 */
const infoTooltip = html =>
    `<span class="fw-info-tooltip"><i class="fas fa-info-circle"></i><span class="fw-info-tooltip-text">${html}</span></span>`

const unescapeText = text =>
    text
        .replace(/&lt;/g, "<")
        .replace(/&gt;/g, ">")
        .replace(/&quot;/g, '"')
        .replace(/&amp;/g, "&")
/**
 * Return a cancel promise if you need to cancel a promise chain. Import as
 * ES6 promises are not (yet) cancelable.
 */

const cancelPromise = () => new Promise(() => {})

// Check if selector matches one of the ancestors of the event target.
// Used in switch statements of document event listeners.
const findTarget = (event, selector, el = {}) => {
    el.target = event.target.closest(selector)
    if (el.target) {
        event.stopPropagation()
        return true
    }
    return false
}

// Promise when page has been loaded.
const whenReady = () => {
    if (document.readyState === "complete") {
        return Promise.resolve()
    } else {
        return new Promise(resolve => {
            document.addEventListener("readystatechange", _event => {
                if (document.readyState === "complete") {
                    resolve()
                }
            })
        })
    }
}

const setDocTitle = (title, app) => {
    const titleText = `${title} - ${app.name}`
    if (document.title !== titleText) {
        document.title = titleText
    }
}

const LANGUAGES = {
    ar: "العربية",
    bg: "Български",
    cs: "Čeština",
    da: "Dansk",
    de: "Deutsch",
    en: "English",
    es: "Español",
    fr: "Français",
    it: "Italiano",
    ja: "日本語",
    ko: "한국어",
    nb: "Norsk bokmål",
    nl: "Nederlands",
    pl: "Polski",
    "pt-br": "Português (Brasil)",
    "pt-pt": "Português (Portugal)",
    ru: "Русский",
    sv: "Svenska",
    tr: "Türkçe",
    "zh-hans": "简体中文"
}

const langName = code => {
    return LANGUAGES[code] || code
}

/** Enable ISO date picker on a text input by overlaying a native date picker.
 * The text input displays ISO format (YYYY-MM-DD) while using the native picker for selection.
 * @param {HTMLInputElement} inputEl - The text input element to enhance
 * @param {boolean} minToday - If true, sets min date to today (default: false)
 */
const enableDatePicker = (inputEl, minToday = false) => {
    const datePicker = document.createElement("input")
    datePicker.type = "date"
    if (minToday) {
        datePicker.min = new Date().toISOString().split("T")[0]
    }
    datePicker.style.position = "absolute"
    datePicker.style.opacity = "0"
    datePicker.style.pointerEvents = "none"

    const parent = inputEl.parentElement
    parent.style.position = "relative"
    parent.appendChild(datePicker)

    inputEl.addEventListener("click", () => datePicker.showPicker())
    datePicker.addEventListener("change", () => {
        inputEl.value = datePicker.value
    })

    // Validate and normalize date on blur or form submission
    const validateDate = () => {
        const value = inputEl.value
        if (!value) {
            return // Empty is valid (optional field)
        }
        const date = new Date(value)
        if (isNaN(date.getTime())) {
            inputEl.value = "" // Invalid date, clear it
            return
        }
        // Re-format to ensure consistent YYYY-MM-DD format
        const yyyy = date.getFullYear()
        const mm = String(date.getMonth() + 1).padStart(2, "0")
        const dd = String(date.getDate()).padStart(2, "0")
        inputEl.value = `${yyyy}-${mm}-${dd}`
    }

    inputEl.addEventListener("blur", validateDate)
    inputEl.addEventListener("keydown", event => {
        // Intercept Enter to validate before form submission
        if (event.key === "Enter") {
            validateDate()
            return
        }
        // Allow typing when date picker is open (it takes focus)
        if (document.activeElement === datePicker) {
            return // Let datePicker handle all keys
        }
        const key = event.key
        // Open picker on Enter
        if (key === "Enter") {
            event.preventDefault()
            datePicker.showPicker()
            return
        }
        // Allow editing: digits, dashes, backspace, delete, arrow keys
        if (
            /^\d$/.test(key) ||
            key === "-" ||
            key === "Backspace" ||
            key === "Delete" ||
            key === "ArrowLeft" ||
            key === "ArrowRight" ||
            key === "Tab"
        ) {
            return // Allow default behavior
        }
        // Block other keys
        event.preventDefault()
    })
    // Allow typing while date picker is open
    datePicker.addEventListener("keydown", event => {
        event.stopPropagation()
    })
}


}),
"./js/modules/common/blob.js": (function (__unused_rspack_module, __webpack_exports__, __webpack_require__) {
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  convertDataURIToBlob: function() { return convertDataURIToBlob; }
});
function convertDataURIToBlob(dataURI) {
    const byteString = atob(dataURI.split(",")[1])
    const mimeString = dataURI.split(",")[0].split(":")[1].split(";")[0]
    const ab = new ArrayBuffer(byteString.length)
    const ia = new Uint8Array(ab)
    for (let i = 0; i < byteString.length; i++) {
        ia[i] = byteString.charCodeAt(i)
    }
    return new Blob([ab], {type: mimeString})
}


}),
"./js/modules/common/content_menu.js": (function (__unused_rspack_module, __webpack_exports__, __webpack_require__) {
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  ContentMenu: function() { return ContentMenu; }
});
const menuTemplate = ({
    id,
    classes,
    height,
    width,
    zIndex,
    menu,
    scroll,
    page
}) =>
    `<div tabindex="-1" role="incontent_menu"
        class="ui-content-menu ui-corner-all ui-widget ui-widget-content ui-front"
        ${id ? `aria-describedby="${id}"` : ""} style="z-index: ${zIndex};">
    <div ${id ? `id="${id}"` : ""} class="ui-content-menu-content ui-widget-content${classes ? ` ${classes}` : ""}${scroll ? " ui-scrollable" : ""}" style="width: ${width}; height: ${height};">
    <div>
        <ul class="content-menu-list">
        ${menu.content
            .map((menuItem, index) => {
                switch (menuItem.type) {
                    case "header":
                        return `<li><span class="content-menu-item-header" title="${menuItem.tooltip}">${
                            typeof menuItem.title === "function"
                                ? menuItem.title(page)
                                : menuItem.title
                        }</span></li>`
                    case "separator":
                        return '<li><hr class="content-menu-item-divider"/></li>'
                    default:
                        return `<li tabindex="0" data-index="${index}" class="content-menu-item${
                            menuItem.disabled && menuItem.disabled(page)
                                ? " disabled"
                                : menuItem.selected
                                  ? " selected"
                                  : ""
                        }" title='${menuItem.tooltip}'>
                        ${
                            typeof menuItem.title === "function"
                                ? menuItem.title(page)
                                : menuItem.title
                        } ${
                            menuItem.icon
                                ? `<span class="content-menu-item-icon"><i class="fa fa-${menuItem.icon}"></i></span>`
                                : ""
                        }
                        </li>`
                }
            })
            .join("")}
        </ul>
    </div>
    </div>
</div>
<div class="ui-widget-overlay ui-front" style="z-index: ${zIndex - 1}"></div>`

class ContentMenu {
    constructor({
        id = false,
        page = false,
        classes = false,
        menu = {content: []},
        height = false,
        width = false,
        onClose = false,
        scroll = false,
        dialogEl = false,
        backdropEl = false,
        menuPos = false
    }) {
        this.id = id
        this.page = page
        this.classes = classes
        this.menu = menu
        this.height = height ? `${height}px` : "auto"
        this.width = width ? `${width}px` : "auto"
        this.onClose = onClose
        this.scroll = scroll
        this.dialogEl = dialogEl
        this.backdropEl = backdropEl
        this.menuPos = menuPos

        this.focusedIndex = 0
        this.previouslyFocusedElement = null
    }

    open() {
        if (this.dialogEl) {
            return
        }

        this.previouslyFocusedElement = document.activeElement

        document.body.insertAdjacentHTML(
            "beforeend",
            menuTemplate({
                id: this.id,
                classes: this.classes,
                height: this.height,
                width: this.width,
                zIndex: this.getHighestDialogZIndex() + 2,
                menu: this.menu,
                scroll: this.scroll,
                page: this.page
            })
        )
        this.backdropEl = document.body.lastElementChild
        this.dialogEl = this.backdropEl.previousElementSibling
        if (this.menuPos?.X && this.menuPos?.Y) {
            this.positionDialog()
        } else {
            this.centerDialog()
        }
        this.bind()
        this.focusFirstMenuItem()
    }

    centerDialog() {
        const totalWidth = window.innerWidth,
            totalHeight = window.innerHeight,
            dialogRect = this.dialogEl.getBoundingClientRect(),
            dialogWidth = dialogRect.width + 10,
            dialogHeight = dialogRect.height + 10,
            scrollTopOffset = window.pageYOffset,
            scrollLeftOffset = window.pageXOffset
        this.dialogEl.style.top = `${(totalHeight - dialogHeight) / 2 + scrollTopOffset}px`
        this.dialogEl.style.left = `${(totalWidth - dialogWidth) / 2 + scrollLeftOffset}px`
    }

    positionDialog() {
        const dialogHeight = this.dialogEl.getBoundingClientRect().height + 10,
            dialogWidth = this.dialogEl.getBoundingClientRect().width + 10,
            scrollTopOffset = window.pageYOffset,
            clientHeight = window.document.documentElement.clientHeight,
            clientWidth = window.document.documentElement.clientWidth

        // We try to ensure that the menu is seen in the browser at the preferred location.
        // Adjustments are made in case it doesn't fit.
        let top = this.menuPos.Y,
            left = this.menuPos.X

        if (top + dialogHeight > scrollTopOffset + clientHeight) {
            top -= top + dialogHeight - (scrollTopOffset + clientHeight)
        }

        if (top < scrollTopOffset) {
            top = scrollTopOffset + 10
        }

        if (left + dialogWidth > clientWidth) {
            left -= left + dialogWidth - clientWidth
        }

        this.dialogEl.style.top = `${top}px`
        this.dialogEl.style.left = `${left}px`
    }

    bind() {
        this.backdropEl.addEventListener("click", () => this.close())
        this.dialogEl.addEventListener("click", event => this.onclick(event))
        this.dialogEl.addEventListener("keydown", event =>
            this.onKeyDown(event)
        )
        this.dialogEl.focus()
    }

    getHighestDialogZIndex() {
        let zIndex = 100
        document
            .querySelectorAll("div.ui-content-menu")
            .forEach(
                dialogEl => (zIndex = Math.max(zIndex, dialogEl.style.zIndex))
            )
        document
            .querySelectorAll("div.ui-dialog")
            .forEach(
                dialogEl => (zIndex = Math.max(zIndex, dialogEl.style.zIndex))
            )
        return zIndex
    }

    close() {
        if (!this.dialogEl || !this.dialogEl.parentElement) {
            return
        }
        this.dialogEl.parentElement.removeChild(this.dialogEl)
        this.backdropEl.parentElement.removeChild(this.backdropEl)

        // Restore focus to the previously focused element
        if (
            this.previouslyFocusedElement &&
            this.previouslyFocusedElement.focus
        ) {
            this.previouslyFocusedElement.focus()
        }

        if (this.onClose) {
            this.onClose()
        }
    }

    onclick(event) {
        event.preventDefault()
        event.stopImmediatePropagation()
        const target = event.target.closest("li.content-menu-item")
        if (target) {
            const menuNumber = target.dataset.index
            const menuItem = this.menu.content[menuNumber]
            if (menuItem.disabled?.(this.page)) {
                return
            }
            menuItem.action(this.page)
            this.close()
        }
    }

    onKeyDown(event) {
        const {key} = event
        const menuItems = this.dialogEl.querySelectorAll(
            "li.content-menu-item:not(.disabled)"
        )

        switch (key) {
            case "Escape":
                this.close()
                break
            case "ArrowUp":
                event.preventDefault()
                this.focusedIndex =
                    (this.focusedIndex - 1 + menuItems.length) %
                    menuItems.length
                this.focusMenuItem(this.focusedIndex)
                break
            case "ArrowDown":
                event.preventDefault()
                this.focusedIndex = (this.focusedIndex + 1) % menuItems.length
                this.focusMenuItem(this.focusedIndex)
                break
            case "Enter":
            case " ": {
                event.preventDefault()
                const menuItem = this.menu.content[this.focusedIndex]
                if (!menuItem.disabled?.(this.page)) {
                    menuItem.action(this.page)
                    this.close()
                }
                break
            }
        }
    }

    focusFirstMenuItem() {
        const menuItems = this.dialogEl.querySelectorAll(
            "li.content-menu-item:not(.disabled)"
        )
        if (menuItems.length > 0) {
            this.focusedIndex = 0
            this.focusMenuItem(this.focusedIndex)
        }
    }

    focusMenuItem(index) {
        const menuItems = this.dialogEl.querySelectorAll(
            "li.content-menu-item:not(.disabled)"
        )
        if (menuItems[index]) {
            menuItems[index].focus()
        }
    }
}


}),
"./js/modules/common/datatable_bulk.js": (function (__unused_rspack_module, __webpack_exports__, __webpack_require__) {
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  DatatableBulk: function() { return DatatableBulk; }
});
/* import */ var w3c_keyname__rspack_import_0 = __webpack_require__("./node_modules/.pnpm/w3c-keyname@2.2.8/node_modules/w3c-keyname/index.js");
/* import */ var _basic__rspack_import_1 = __webpack_require__("./js/modules/common/basic.js");
/* import */ var _content_menu__rspack_import_2 = __webpack_require__("./js/modules/common/content_menu.js");





let bulkId = 0

class DatatableBulk {
    constructor(page, model, checkboxColumn) {
        this.page = page
        this.model = model
        this.checkboxColumn = checkboxColumn

        this.id = `dt-bulk-${++bulkId}`
    }

    init(table) {
        this.table = table
        ;(0,_basic__rspack_import_1.whenReady)().then(() => this.bindEvents())
    }

    update() {
        this.model.content = this.model.content.sort(
            (a, b) => a.order - b.order
        )
    }

    bindEvents() {
        // Store the bound functions as instance variables so we can remove them later
        this.boundOnClick = this.onClick.bind(this)
        this.boundOnTableCheckChange = this.onTableCheckChange.bind(this)
        this.boundOnKeyDown = this.onKeyDown.bind(this)

        this.page.dom.addEventListener("click", this.boundOnClick)
        this.table.dom.addEventListener("change", this.boundOnTableCheckChange)
        this.table.dom.addEventListener("keydown", this.boundOnKeyDown)
        this.onTableCheckChange()
    }

    // The new destroy() method removes all event listeners that were added and cleans up DOM elements.
    destroy() {
        if (this.page && this.page.dom && this.boundOnClick) {
            this.page.dom.removeEventListener("click", this.boundOnClick)
        }
        if (this.table && this.table.dom) {
            if (this.boundOnTableCheckChange) {
                this.table.dom.removeEventListener(
                    "change",
                    this.boundOnTableCheckChange
                )
            }
            if (this.boundOnKeyDown) {
                this.table.dom.removeEventListener(
                    "keydown",
                    this.boundOnKeyDown
                )
            }
        }

        // Remove the bulk element from the DOM if it exists
        const el = document.getElementById(this.id)
        if (el && el.parentNode) {
            el.parentNode.removeChild(el)
        }

        // Clear any references to help garbage collection
        this.page = null
        this.table = null
        this.model = null
    }

    onKeyDown(event) {
        const key = (0,w3c_keyname__rspack_import_0.keyName)(event)
        const el = this.page.dom.querySelector(`#${this.id}`)

        if (!el) {
            return
        }

        if (key === "Enter" && this.page.getSelected().length > 0) {
            // Open the content menu when Enter is pressed and at least one row is selected
            event.preventDefault()
            event.stopImmediatePropagation()
            event.stopPropagation()

            const contentMenu = new _content_menu__rspack_import_2.ContentMenu({
                menu: this.model,
                width: 280,
                page: this.page,
                menuPos: {
                    X: Number.parseInt(el.getBoundingClientRect().left),
                    Y: Number.parseInt(el.getBoundingClientRect().bottom)
                }
            })
            contentMenu.open()
        } else if (
            key === " " &&
            event.target === el.querySelector("input[type=checkbox]")
        ) {
            // Toggle "Select All" when Space is pressed on the checkbox
            event.preventDefault()
            event.stopImmediatePropagation()
            event.stopPropagation()

            const isChecked = this.isAllChecked()
            this.toggleSelectAll(!isChecked)
        } else if ((event.ctrlKey || event.metaKey) && key === "a") {
            // Select all when Ctrl+A is pressed
            const isChecked = this.isAllChecked()
            this.toggleSelectAll(!isChecked)
            event.preventDefault()
            event.stopImmediatePropagation()
            event.stopPropagation()
        }
    }

    toggleSelectAll(checked) {
        // Update the DataTable instance
        if (this.table) {
            this.table.data.data.forEach(row => {
                if (row.cells[this.checkboxColumn]) {
                    row.cells[this.checkboxColumn].data = checked
                    row.cells[this.checkboxColumn].text = String(checked)
                }
            })
            this.table.update()
        }

        this.onTableCheckChange()
    }

    onTableCheckChange() {
        const el = this.page.dom.querySelector(`#${this.id}`)
        if (!el) {
            return
        }

        const allChecked = this.isAllChecked()
        el.querySelector("input[type=checkbox]").checked = allChecked
    }

    isAllChecked() {
        const checkboxes = Array.from(
            this.table.dom.querySelectorAll("input.entry-select[type=checkbox]")
        )
        const unchecked = checkboxes.filter(box => !box.checked)
        return !unchecked.length && checkboxes.length
    }

    onClick(event) {
        const target = event.target
        if (target.matches(`#${this.id} *`)) {
            event.preventDefault()
            event.stopImmediatePropagation()
            event.stopPropagation()

            if (target.matches(".dt-bulk-dropdown, .dt-bulk-dropdown *")) {
                // Dropdown
                const el = document.querySelector(`#${this.id}`)
                if (el) {
                    const contentMenu = new _content_menu__rspack_import_2.ContentMenu({
                        menu: this.model,
                        width: 280,
                        page: this.page,
                        menuPos: {
                            X: Number.parseInt(event.pageX),
                            Y: Number.parseInt(event.pageY)
                        }
                    })
                    contentMenu.open()
                }
            } else if (
                target.matches(".fw-check + label, .fw-check + label *")
            ) {
                // Click on bulk checkbox
                const isChecked = this.isAllChecked()
                this.toggleSelectAll(!isChecked)
                target
                    .closest("div.datatable-wrapper")
                    .querySelector("input[type=checkbox]").checked = !isChecked
                this.onTableCheckChange()
            }
        } else if (target.matches(".fw-data-table .entry-select + label")) {
            // The browser will try to scroll the checkbox into view and that will break the page layout.
            event.preventDefault()
            event.stopImmediatePropagation()
            event.stopPropagation()
            const tr = target.closest("tr")
            const index = parseInt(tr.dataset.index)
            const row = this.table.data.data[index]
            const cell = row.cells[this.checkboxColumn]
            cell.data = !cell.data
            cell.text = String(cell.data)
            this.table.update()
            this.onTableCheckChange()
        }
    }

    getHTML() {
        return `<div id="${this.id}" class="dt-bulk" role="group" aria-label="Bulk actions">
                        <input type="checkbox" id="${this.id}_check" class="fw-check" aria-label="Select all">
                        <label for="${this.id}_check"></label>
                        <span class="dt-bulk-dropdown" tabindex="0" role="button" aria-label="Open bulk actions menu">
                            <i class="fa fa-caret-down"></i>
                        </span>
                    </div>`
    }
}


}),
"./js/modules/common/dialog.js": (function (__unused_rspack_module, __webpack_exports__, __webpack_require__) {
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  Dialog: function() { return Dialog; }
});
/* import */ var w3c_keyname__rspack_import_0 = __webpack_require__("./node_modules/.pnpm/w3c-keyname@2.2.8/node_modules/w3c-keyname/index.js");
/* import */ var _basic__rspack_import_1 = __webpack_require__("./js/modules/common/basic.js");




const dialogTemplate = ({
    id,
    classes,
    title,
    height,
    width,
    icon,
    buttons,
    zIndex,
    body,
    scroll,
    help,
    canClose,
    note,
    blur
}) =>
    `<div tabindex="-1" role="dialog"
        class="ui-dialog ui-corner-all ui-widget ui-widget-content ui-front ui-dialog-buttons"
        ${id ? `aria-describedby="${id}"` : ""} style="z-index: ${zIndex};">
    <div class="ui-dialog-titlebar ui-corner-all ui-widget-header ui-helper-clearfix">
        ${icon ? `<i class="fa fa-${icon}" aria-hidden="true"></i>` : ""}
        <span id="ui-id-2" class="ui-dialog-title">${title}</span>
        ${
            help
                ? `<button type="button" class="ui-button ui-corner-all ui-widget ui-button-icon-only ui-dialog-titlebar-help" title="${gettext("Help")}">
            <span class="ui-button-icon ui-icon ui-icon-help"> </span>
            <span class="ui-button-icon-space"> </span>
            ${gettext("Help")}
        </button>`
                : ""
        }
        ${
            canClose
                ? `<button type="button" class="ui-button ui-corner-all ui-widget ui-button-icon-only ui-dialog-titlebar-close" title="${gettext("Close")}">
            <span class="ui-button-icon ui-icon ui-icon-closethick"> </span>
            <span class="ui-button-icon-space"> </span>
            ${gettext("Close")}
        </button>`
                : ""
        }

    </div>
    <div ${id ? `id="${id}"` : ""} class="ui-dialog-content ui-widget-content${classes ? ` ${classes}` : ""}${scroll ? " ui-scrollable" : ""}" style="width: ${width}; height: ${height};">
        ${note.text ? `<div class="note-container">${noteTemplate(note)}</div>` : ""}
        ${body}
    </div>
    <div class="ui-dialog-buttonpane ui-widget-content ui-helper-clearfix">
        <div class="ui-dialog-buttonset">${buttonsTemplate({buttons})}</div>
    </div>
</div>
<div class="ui-widget-overlay ui-front${blur === false ? " no-blur" : ""}" style="z-index: ${zIndex - 1}"></div>`

const noteTemplate = note => {
    return note.text
        ? `<p class="noteEl ${note.display ? "" : "hide"}">${note.text}</p>`
        : ""
}

const buttonsTemplate = ({buttons}) =>
    buttons.map(button => buttonTemplate(button)).join("")

const buttonTemplate = ({
    text,
    classes,
    icon,
    dropdown
}) => `<button type="button" class="${classes ? classes : "fw-light"} fw-button ui-button ui-corner-all ui-widget">
    ${icon ? `<i class="fa fa-${icon}" aria-hidden="true"></i>` : ""}
    ${text}
    ${dropdown ? '<i class="fa fa-caret-down" aria-hidden="true"></i>' : ""}
</button>`

const BUTTON_TYPES = {
    close: {
        text: gettext("Close"),
        classes: "fw-orange",
        click: dialog => () => dialog.close()
    },
    cancel: {
        text: gettext("Cancel"),
        classes: "fw-orange",
        click: dialog => () => dialog.close()
    },
    ok: {
        text: gettext("OK"),
        classes: "fw-dark",
        click: dialog => () => dialog.close()
    }
}

class Dialog {
    constructor(options) {
        this.id = options.id || false
        this.classes = options.classes || false
        this.title = options.title || ""
        this.body = options.body || ""
        this.restoreActiveElement = options.restoreActiveElement !== false // default is true
        this.height = options.height ? `${options.height}px` : "auto"
        this.width = options.width ? `${options.width}px` : "auto"
        this.canClose = "canClose" in options ? options.canClose : true
        this.help = "help" in options ? options.help : false
        this.note = "note" in options ? options.note : {}
        this.blur = "blur" in options ? options.blur : true
        this.buttons = []
        if (options.buttons) {
            this.setButtons(options.buttons)
        }
        this.beforeClose = options.beforeClose || false
        this.onClose = options.onClose || false
        this.icon = options.icon || false
        this.scroll = options.scroll || false
        this.canEscape =
            options.canEscape ??
            options.buttons?.find(button =>
                ["cancel", "close"].includes(button.type)
            ) ??
            false
        this.dialogEl = false
        this.backdropEl = false
        this.dragging = false
        this.hasBeenMoved = false
        this.listeners = {}
        this.fullScreen = options.fullScreen ? options.fullScreen : false
        this.initialFocus = options.initialFocus || null

        this.previousActiveElement = null // Store previously focused element
        this.firstFocusableEl = null
        this.lastFocusableEl = null
        this.focusableEls = null
    }

    setButtons(buttons) {
        this.buttons = buttons.map(button => ({
            text: button.text
                ? button.text
                : button.type
                  ? BUTTON_TYPES[button.type].text
                  : "",
            classes: button.classes
                ? button.classes
                : button.type
                  ? BUTTON_TYPES[button.type].classes
                  : false,
            click: button.click
                ? button.click
                : button.type
                  ? BUTTON_TYPES[button.type].click(this)
                  : "",
            icon: button.icon ? button.icon : false,
            dropdown: button.dropdown ? true : false
        }))
    }

    open() {
        if (this.dialogEl) {
            return
        }

        // Store currently focused element to restore later
        this.previousActiveElement = this.restoreActiveElement
            ? document.activeElement
            : null

        if (this.fullScreen) {
            this.height = "85vh"
        }

        document.body.insertAdjacentHTML(
            "beforeend",
            dialogTemplate({
                id: this.id,
                classes: this.classes,
                title: this.title,
                height: this.height,
                width: this.width,
                icon: this.icon,
                buttons: this.buttons,
                zIndex: this.nextDialogZIndex(),
                body: this.body,
                scroll: this.scroll,
                canClose: this.canClose,
                help: this.help,
                note: this.note,
                blur: this.blur
            })
        )
        this.backdropEl = document.body.lastElementChild
        this.dialogEl = this.backdropEl.previousElementSibling
        if (this.fullScreen) {
            this.dialogEl.style.width = "98%"
            this.dialogEl.style.height = "100%"
            this.dialogEl.style.position = "fixed"
            this.dialogEl.style.top = "0px"
        } else {
            this.centerDialog()
        }

        // Set dialog attributes for accessibility
        this.dialogEl.setAttribute("role", "dialog")
        this.dialogEl.setAttribute("aria-modal", "true")
        if (this.title) {
            this.dialogEl.setAttribute("aria-labelledby", "dialog-title")
            this.dialogEl.querySelector(".ui-dialog-title").id = "dialog-title"
        }

        // Get all focusable elements
        this.focusableEls = this.getFocusableElements()
        this.firstFocusableEl = this.focusableEls[0]
        this.lastFocusableEl = this.focusableEls[this.focusableEls.length - 1]

        // Set initial focus to the most appropriate element
        const initialFocusElement = this.getInitialFocusElement()
        if (initialFocusElement) {
            setTimeout(() => initialFocusElement.focus(), 0)
        } else if (this.firstFocusableEl) {
            this.firstFocusableEl.focus()
        } else {
            this.dialogEl.focus()
        }

        this.bind()
    }

    refreshButtons() {
        this.dialogEl.querySelector(".ui-dialog-buttonset").innerHTML =
            buttonsTemplate({buttons: this.buttons})
    }

    refreshNote() {
        this.dialogEl.querySelector(".note-container").innerHTML = noteTemplate(
            this.note
        )
    }

    centerDialog() {
        const totalWidth = window.innerWidth,
            totalHeight = window.innerHeight,
            dialogWidth = this.dialogEl.clientWidth,
            dialogHeight = this.dialogEl.clientHeight,
            scrollTopOffset = window.pageYOffset,
            scrollLeftOffset = window.pageXOffset

        this.dialogEl.style.top = `${(totalHeight - dialogHeight) / 2 + scrollTopOffset}px`
        this.dialogEl.style.left = `${(totalWidth - dialogWidth) / 2 + scrollLeftOffset}px`
    }

    adjustDialogToScroll() {
        this.dialogEl.style.top = `${Math.max(
            Math.min(
                this.dialogEl.offsetTop,
                this.backdropEl.scrollHeight -
                    this.dialogEl.scrollHeight +
                    window.pageYOffset
            ),
            window.pageYOffset
        )}px`
    }

    moveDialog(x, y) {
        this.dialogEl.style.top = `${Math.min(
            Math.max(y - this.dragging.y, 0),
            this.backdropEl.scrollHeight -
                this.dialogEl.scrollHeight +
                window.pageYOffset
        )}px`
        this.dialogEl.style.left = `${Math.min(
            Math.max(x - this.dragging.x, 0),
            document.body.scrollWidth - this.dialogEl.scrollWidth
        )}px`
        this.hasBeenMoved = true
    }

    onScroll(_event) {
        if (this.hasBeenMoved) {
            // The dialog has been moved manually. We just adjust the position to make it stay in the view.
            this.adjustDialogToScroll()
        } else {
            this.centerDialog()
        }
    }

    onKeydown(event) {
        let name = (0,w3c_keyname__rspack_import_0.keyName)(event)
        if (event.altKey) {
            name = "Alt-" + name
        }
        if (event.ctrlKey) {
            name = "Ctrl-" + name
        }
        if (event.metaKey) {
            name = "Meta-" + name
        }
        if (event.shiftKey) {
            name = "Shift-" + name
        }
        if (name === "Escape" && this.canEscape) {
            event.preventDefault()
            this.close()
            return
        } else if (name === "Tab") {
            if (document.activeElement === this.lastFocusableEl) {
                event.preventDefault()
                this.firstFocusableEl.focus()
            }
        } else if (name === "Shift-Tab") {
            if (document.activeElement === this.firstFocusableEl) {
                event.preventDefault()
                this.lastFocusableEl.focus()
            }
        }
    }

    bind() {
        this.listeners.onKeydown = event => this.onKeydown(event)
        document.body.addEventListener("keydown", this.listeners.onKeydown)
        this.dialogEl.addEventListener("click", event => {
            const el = {}
            switch (true) {
                case (0,_basic__rspack_import_1.findTarget)(event, ".ui-dialog-buttonpane button", el): {
                    event.preventDefault()
                    let buttonNumber = 0
                    let seekItem = el.target
                    while (seekItem.previousElementSibling) {
                        buttonNumber++
                        seekItem = seekItem.previousElementSibling
                    }
                    this.buttons[buttonNumber].click(event)
                    break
                }
                case (0,_basic__rspack_import_1.findTarget)(event, ".ui-dialog-titlebar-close", el):
                    event.preventDefault()
                    this.close()
                    break
                case (0,_basic__rspack_import_1.findTarget)(event, ".ui-dialog-titlebar-help", el):
                    event.preventDefault()
                    this.help()
                    break
                default:
                    break
            }
        })
        if (!this.fullScreen) {
            this.listeners.onScroll = event => this.onScroll(event)
            window.addEventListener("scroll", this.listeners.onScroll, false)
            this.dialogEl.addEventListener("mousedown", event => {
                const el = {}
                switch (true) {
                    case (0,_basic__rspack_import_1.findTarget)(event, ".ui-dialog-titlebar", el):
                        this.dragging = {
                            x: event.clientX - this.dialogEl.offsetLeft,
                            y: event.clientY - this.dialogEl.offsetTop
                        }
                        break
                    default:
                        break
                }
            })
            this.dialogEl.addEventListener("mouseup", event => {
                const el = {}
                switch (true) {
                    case (0,_basic__rspack_import_1.findTarget)(event, ".ui-dialog-titlebar", el):
                        this.dragging = false
                        break
                    default:
                        break
                }
            })
            this.dialogEl.addEventListener("mousemove", event => {
                if (!this.dragging) {
                    return
                }
                this.moveDialog(event.clientX, event.clientY)
            })
        }

        // Prevent clicks outside dialog from moving focus outside
        this.backdropEl.addEventListener("click", event => {
            event.preventDefault()
            if (this.canClose) {
                this.close()
            }
        })

        // Prevent focus from leaving dialog when clicking backdrop
        this.backdropEl.addEventListener("mousedown", event => {
            event.preventDefault()
        })
    }

    nextDialogZIndex() {
        let zIndex = 100
        document
            .querySelectorAll("div.ui-dialog")
            .forEach(
                dialogEl => (zIndex = Math.max(zIndex, dialogEl.style.zIndex))
            )
        zIndex += 2
        document.body.style.setProperty("--highest-dialog-z-index", zIndex)
        return zIndex
    }

    getFocusableElements() {
        // Get all focusable elements
        const focusableSelectors = [
            "button:not([disabled])",
            "[href]",
            "input:not([disabled])",
            "select:not([disabled])",
            "textarea:not([disabled])",
            '[tabindex]:not([tabindex="-1"])'
        ].join(",")

        const elements = Array.from(
            this.dialogEl.querySelectorAll(focusableSelectors)
        )

        // Filter out hidden elements
        return elements.filter(el => {
            const style = window.getComputedStyle(el)
            return style.display !== "none" && style.visibility !== "hidden"
        })
    }

    getInitialFocusElement() {
        if (this.initialFocus) {
            const customFocusElement = this.dialogEl.querySelector(
                this.initialFocus
            )
            if (customFocusElement) {
                return customFocusElement
            }
        }
        // Get all focusable elements
        const elements = this.getFocusableElements()

        // Try to find the most appropriate initial focus target
        const priorityElements = [
            // First try to find a text input
            elements.find(el => el.tagName === "INPUT" && el.type === "text"),
            // Then try to find the first button in the button pane
            elements.find(el => el.closest(".ui-dialog-buttonpane")),
            // Then try to find any input
            elements.find(el => el.tagName === "INPUT"),
            // Then try to find any button except close/help
            elements.find(
                el =>
                    el.tagName === "BUTTON" &&
                    !el.classList.contains("ui-dialog-titlebar-close") &&
                    !el.classList.contains("ui-dialog-titlebar-help")
            )
        ]

        // Return the first element that exists
        return priorityElements.find(el => el) || elements[0]
    }

    close() {
        if (!this.dialogEl) {
            return
        }
        if (!this.fullScreen) {
            window.removeEventListener("scroll", this.listeners.onScroll, false)
        }
        document.body.removeEventListener("keydown", this.listeners.onKeydown)
        if (this.beforeClose) {
            this.beforeClose()
        }
        this.dialogEl.parentElement.removeChild(this.dialogEl)
        this.backdropEl.parentElement.removeChild(this.backdropEl)

        // Restore focus to previous element
        if (this.previousActiveElement && this.previousActiveElement.focus) {
            this.previousActiveElement.focus()
        }

        if (this.onClose) {
            this.onClose()
        }
    }
}


}),
"./js/modules/common/events.js": (function (__unused_rspack_module, __webpack_exports__, __webpack_require__) {
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  isActivationEvent: function() { return isActivationEvent; }
});
const isActivationEvent = event => {
    if (event.type === "click") {
        return true
    }
    if (event.type === "keydown") {
        return event.key === "Enter" || event.key === " "
    }
    return false
}


}),
"./js/modules/common/faq_dialog.js": (function (__unused_rspack_module, __webpack_exports__, __webpack_require__) {
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  faqDialog: function() { return faqDialog; }
});
/* import */ var _basic__rspack_import_0 = __webpack_require__("./js/modules/common/basic.js");
/* import */ var _dialog__rspack_import_1 = __webpack_require__("./js/modules/common/dialog.js");
/* import */ var _network__rspack_import_2 = __webpack_require__("./js/modules/common/network.js");




const faqTemplate = ({escapedQuestions}) =>
    `<div class="faq">
    <ol class="faq-list">
        ${escapedQuestions
            .map(
                question => `<li class="faq-item">
                <div>
                    <div class="faq-question fw-button fw-light"><i class="fas fa-plus-circle"></i>${question[0]}</div>
                    <div class="faq-answer" style="display: none;">${question[1]}</div>
                </div>
            </li>`
            )
            .join("")}
    </ol>
</div>`

class faqDialog {
    constructor({title = "", questions = []}) {
        ;(0,_network__rspack_import_2.ensureCSS)(staticUrl("css/faq_dialog.css"))
        const escapedQuestions = []

        questions.forEach(q => {
            const question = (0,_basic__rspack_import_0.escapeText)(q[0])
            let answer
            q[1] = (0,_basic__rspack_import_0.escapeText)(q[1])
            if (q[q.length - 1].hasImage) {
                answer = interpolate(...q.slice(1, q.length), true)
            } else {
                answer = q[1]
            }
            escapedQuestions.push([question, answer])
        })

        this.faqDialog = new _dialog__rspack_import_1.Dialog({
            title: title,
            body: faqTemplate({escapedQuestions}),
            height: 600,
            width: 900,
            buttons: []
        })
    }

    open() {
        this.faqDialog.open()
        this.faqDialog.dialogEl
            .querySelectorAll(".faq-question")
            .forEach(element => {
                element.addEventListener("click", () => {
                    const iconEle = element.firstElementChild
                    const answerEle = element.nextElementSibling
                    if (answerEle.style.display == "") {
                        iconEle.classList.remove("fa-minus-circle")
                        iconEle.classList.add("fa-plus-circle")
                        answerEle.style.display = "none"
                    } else if (answerEle.style.display == "none") {
                        iconEle.classList.remove("fa-plus-circle")
                        iconEle.classList.add("fa-minus-circle")
                        answerEle.style.display = ""
                    }
                })
            })
    }
}


}),
"./js/modules/common/file/dialog.js": (function (__unused_rspack_module, __webpack_exports__, __webpack_require__) {
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  FileDialog: function() { return FileDialog; }
});
/* import */ var _common__rspack_import_0 = __webpack_require__("./js/modules/common/index.js");
/* import */ var _new_folder_dialog__rspack_import_1 = __webpack_require__("./js/modules/common/file/new_folder_dialog.js");
/* import */ var _templates__rspack_import_2 = __webpack_require__("./js/modules/common/file/templates.js");
/* import */ var _tools__rspack_import_3 = __webpack_require__("./js/modules/common/file/tools.js");




/**
 * Functions for the document move dialog.
 */

class FileDialog {
    constructor({
        title = "", // Dialog title
        movingFiles = [], // Array of all files that are to be moved.
        allFiles = [], // Array of all existing files.
        moveUrl = "", // URL to use for moving files
        successMessage = "", // Message for success
        errorMessage = "", // Message for failure
        succcessCallback = (_file, _path) => {}, // Callback on success
        fileIcon = "far fa-file-alt"
    }) {
        this.title = title
        this.movingFiles = movingFiles
        this.allFiles = allFiles
        this.moveUrl = moveUrl
        this.successMessage = successMessage
        this.errorMessage = errorMessage
        this.succcessCallback = succcessCallback
        this.fileIcon = fileIcon

        this.path = this.getPath()
        this.fileSelector = false
    }

    getPath() {
        if (this.movingFiles.length === 1) {
            let path = this.movingFiles[0].path
            if (path.endsWith("/")) {
                path +=
                    this.movingFiles[0].title.replace(/\//g, "") ||
                    gettext("Untitled")
            }
            return path
        }
        // We are moving several files. We assume they are all in the same directory
        // so we only need to take the file of the first file.
        return this.movingFiles[0].path.split("/").slice(0, -1).join("/") + "/"
    }

    updatePathDir(path) {
        const fileName = this.dialog.dialogEl
            .querySelector("#path")
            .value.split("/")
            .pop()
        this.dialog.dialogEl.querySelector("#path").value = path + fileName
    }

    init() {
        this.dialog = new _common__rspack_import_0.Dialog({
            title: this.title,
            id: "move-dialog",
            width: 820,
            height: 440,
            body: (0,_templates__rspack_import_2.moveTemplate)({
                path: this.path
            }),
            buttons: [
                {
                    text: gettext("New folder"),
                    classes: "fw-dark",
                    click: () => {
                        const dialog = new _new_folder_dialog__rspack_import_1.NewFolderDialog(folderName => {
                            if (!this.fileSelector) {
                                return
                            }
                            this.fileSelector.addFolder(folderName)
                        })
                        dialog.open()
                    }
                },
                {type: "cancel"},
                {
                    text: gettext("Submit"),
                    classes: "fw-dark",
                    click: () => {
                        //apply the current state to server
                        let path =
                            this.dialog.dialogEl.querySelector("#path").value
                        this.dialog.close()

                        if (path === this.path) {
                            // No change
                            return
                        }
                        if (this.movingFiles.length > 1) {
                            if (!path.endsWith("/")) {
                                path += "/"
                            }
                            this.movingFiles.forEach(doc => {
                                this.moveFile(
                                    doc,
                                    doc.path.endsWith("/")
                                        ? path
                                        : path + doc.path.split("/").pop()
                                )
                            })
                        } else {
                            this.moveFile(this.movingFiles[0], path)
                        }
                    }
                }
            ]
        })
        this.dialog.open()

        this.fileSelector = new _common__rspack_import_0.FileSelector({
            dom: this.dialog.dialogEl.querySelector(".file-selector"),
            files: this.allFiles,
            showFiles: false,
            selectDir: path => this.updatePathDir(path),
            fileIcon: this.fileIcon
        })
        this.fileSelector.init()
    }

    moveFile(file, requestedPath) {
        return (0,_tools__rspack_import_3.moveFile)(file.id, file.title, requestedPath, this.moveUrl)
            .then(path => {
                (0,_common__rspack_import_0.addAlert)(
                    "success",
                    `${this.successMessage}: '${(0,_tools__rspack_import_3.shortFileTitle)(file.title, path)}'`
                )
                this.succcessCallback(file, path)
            })
            .catch(() => {
                (0,_common__rspack_import_0.addAlert)(
                    "error",
                    `${this.errorMessage}: '${(0,_tools__rspack_import_3.shortFileTitle)(file.title, file.path)}'`
                )
            })
    }
}


}),
"./js/modules/common/file/index.js": (function (__unused_rspack_module, __webpack_exports__, __webpack_require__) {
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  FileDialog: function() { return /* reexport safe */ _dialog__rspack_import_0.FileDialog; },
  FileSelector: function() { return /* reexport safe */ _selector__rspack_import_1.FileSelector; },
  NewFolderDialog: function() { return /* reexport safe */ _new_folder_dialog__rspack_import_3.NewFolderDialog; },
  cleanPath: function() { return /* reexport safe */ _tools__rspack_import_2.cleanPath; },
  longFilePath: function() { return /* reexport safe */ _tools__rspack_import_2.longFilePath; },
  moveFile: function() { return /* reexport safe */ _tools__rspack_import_2.moveFile; },
  shortFileTitle: function() { return /* reexport safe */ _tools__rspack_import_2.shortFileTitle; }
});
/* import */ var _dialog__rspack_import_0 = __webpack_require__("./js/modules/common/file/dialog.js");
/* import */ var _selector__rspack_import_1 = __webpack_require__("./js/modules/common/file/selector.js");
/* import */ var _tools__rspack_import_2 = __webpack_require__("./js/modules/common/file/tools.js");
/* import */ var _new_folder_dialog__rspack_import_3 = __webpack_require__("./js/modules/common/file/new_folder_dialog.js");






}),
"./js/modules/common/file/new_folder_dialog.js": (function (__unused_rspack_module, __webpack_exports__, __webpack_require__) {
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  NewFolderDialog: function() { return NewFolderDialog; }
});
/* import */ var _common__rspack_import_0 = __webpack_require__("./js/modules/common/index.js");
/* import */ var _templates__rspack_import_1 = __webpack_require__("./js/modules/common/file/templates.js");



class NewFolderDialog {
    constructor(callback = _foldername => {}) {
        this.callback = callback
        this.dialog = new _common__rspack_import_0.Dialog({
            title: gettext("New folder"),
            id: "new-folder",
            width: 400,
            height: 150,
            body: (0,_templates__rspack_import_1.newFolderTemplate)(),
            buttons: [
                {type: "cancel"},
                {
                    text: gettext("Create folder"),
                    classes: "fw-dark",
                    click: () => {
                        const folderName =
                            this.dialog.dialogEl.querySelector(
                                "#new-folder-name"
                            ).value
                        this.dialog.close()
                        if (!folderName.length) {
                            return
                        }
                        this.callback(folderName)
                    }
                }
            ]
        })
    }

    open() {
        return this.dialog.open()
    }
}


}),
"./js/modules/common/file/selector.js": (function (__unused_rspack_module, __webpack_exports__, __webpack_require__) {
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  FileSelector: function() { return FileSelector; }
});
/* import */ var _basic__rspack_import_0 = __webpack_require__("./js/modules/common/basic.js");
/* import */ var _network__rspack_import_1 = __webpack_require__("./js/modules/common/network.js");



class FileSelector {
    constructor({
        dom,
        files,
        showFiles = true,
        selectFolders = true,
        multiSelect = false,
        selectDir = _path => {},
        selectFile = _path => {},
        fileIcon = "far fa-file-alt"
    }) {
        this.dom = dom
        this.files = files
        this.showFiles = showFiles // Whether to show existing files or only folders
        this.selectFolders = selectFolders // Whether to allow the selection of folders
        this.multiSelect = multiSelect // Whether to allow the selectioj of multiple entries
        this.selectDir = selectDir
        this.selectFile = selectFile
        this.fileIcon = fileIcon // File icon to use
        this.root = {
            name: "/",
            type: "folder",
            open: true,
            selected: false,
            path: "/",
            children: []
        }
        this.selected = []
        if (this.selectFolders && !this.multiSelect) {
            this.root.selected = true
            this.selected.push(this.root)
        }
    }

    init() {
        this.readDirStructure()
        this.sortDirStructure()
        ;(0,_network__rspack_import_1.ensureCSS)(staticUrl("css/file_selector.css"))
        this.dom.classList.add("fw-file-selector")
        this.render()
        this.bind()
    }

    readDirStructure() {
        // Read directory structure from existing file paths
        this.files.forEach(file => {
            let treeWalker = this.root.children
            let path = file.path
            if (!path.length || path.endsWith("/")) {
                path += file.title || gettext("Untitled")
            }
            const pathParts = path.split("/")
            pathParts.forEach((pathPart, pathIndex) => {
                if (!pathPart.length) {
                    return
                }
                if (pathIndex === pathParts.length - 1) {
                    if (this.showFiles) {
                        treeWalker.push({
                            name: pathPart,
                            type: "file",
                            path: pathParts.slice(0, pathIndex + 1).join("/"),
                            file
                        })
                    }
                    return
                }
                let folder = treeWalker.find(
                    item => item.name === pathPart && item.type === "folder"
                )
                if (!folder) {
                    folder = {
                        name: pathPart,
                        type: "folder",
                        open: false,
                        selected: false,
                        path: pathParts.slice(0, pathIndex + 1).join("/") + "/",
                        children: []
                    }
                    treeWalker.push(folder)
                }
                treeWalker = folder.children
            })
        })
    }

    sortDirStructure(entries = this.root.children) {
        entries.sort((a, b) => {
            if (a.type !== b.type) {
                return a.type === "folder" ? -1 : 1
            }
            return a.name > b.name ? 1 : -1
        })
        entries.forEach(entry => {
            if (entry.type === "folder" && entry.children.length) {
                this.sortDirStructure(entry.children)
            }
        })
    }

    addFolder(rawName) {
        const name = rawName.replace(/\//g, "")
        // Add a new folder as a subfolder to the currently selected folder
        if (
            !this.selected.length ||
            this.selected[0].type !== "folder" ||
            this.selected[0].children.find(
                child => child.type === "folder" && child.name === name
            )
        ) {
            // A file is selected. Give up.
            return
        }
        const newFolder = {
            name,
            type: "folder",
            open: true,
            selected: true,
            path: this.selected[0].path + name + "/",
            children: []
        }
        this.selected[0].children.push(newFolder)
        this.sortDirStructure(this.selected[0].children)
        this.selected[0].open = true
        if (!this.multiSelect) {
            this.selected[0].selected = false
            this.selected = []
        }
        this.selected.push(newFolder)
        this.selectDir(newFolder.path)
        this.render()
    }

    deselectAll() {
        this.selected.forEach(entry => (entry.selected = false))
        this.selected = []
        this.render()
    }

    render() {
        this.dom.innerHTML = this.renderFolder(this.root)
    }

    renderFolder(folder, indentLevel = 0) {
        let returnString = ""
        returnString += `<div class="folder${folder.open ? "" : " closed"}">`
        returnString += `<p style="margin-left:${indentLevel * 10}px;">${
            folder.children.length
                ? `<i class="far fa-${folder.open ? "minus" : "plus"}-square"></i>&nbsp;`
                : ""
        }<span class="folder-name${folder.selected ? " selected" : ""}"><i class="fas fa-folder"></i>&nbsp;${(0,_basic__rspack_import_0.escapeText)(folder.name)}</span></p>`
        if (folder.open) {
            returnString += '<div class="folder-content">'
            returnString += folder.children
                .map(child => {
                    if (child.type === "folder") {
                        return this.renderFolder(child, indentLevel + 1)
                    } else {
                        return `<p class="file" style="margin-left:${(indentLevel + 1) * 10 + 20}px;"><span class="file-name${child.selected ? " selected" : ""}"><i class="${this.fileIcon}"></i>&nbsp;${(0,_basic__rspack_import_0.escapeText)(child.name)}</span></p>`
                    }
                })
                .join("")
            returnString += "</div>"
        }
        returnString += "</div>"
        return returnString
    }

    findEntry(dom) {
        const searchPath = []
        let seekItem = dom
        while (seekItem.closest("div.folder, p.file")) {
            let itemNumber = 0
            seekItem = seekItem.closest("div.folder, p.file")
            while (seekItem.previousElementSibling) {
                itemNumber++
                seekItem = seekItem.previousElementSibling
            }
            searchPath.push(itemNumber)
            seekItem = seekItem.parentElement
        }
        let entry = this.root
        searchPath.pop()
        while (searchPath.length) {
            entry = entry.children[searchPath.pop()]
        }
        return entry
    }

    bind() {
        this.dom.addEventListener("click", event => {
            const el = {}
            switch (true) {
                case (0,_basic__rspack_import_0.findTarget)(event, ".fa-plus-square", el): {
                    event.preventDefault()
                    const entry = this.findEntry(el.target)
                    entry.open = true
                    this.render()
                    break
                }
                case (0,_basic__rspack_import_0.findTarget)(event, ".fa-minus-square", el): {
                    event.preventDefault()
                    const entry = this.findEntry(el.target)
                    entry.open = false
                    this.render()
                    break
                }
                case (0,_basic__rspack_import_0.findTarget)(event, ".folder-name", el): {
                    event.preventDefault()
                    if (!this.selectFolders) {
                        // Folders cannot be selected
                        return
                    }
                    const entry = this.findEntry(el.target)
                    if (this.selected.includes(entry)) {
                        entry.selected = false
                        this.selected = this.selected.filter(e => e !== entry)
                        this.render()
                    } else {
                        entry.selected = true
                        if (!this.multiSelect && this.selected.length) {
                            this.selected[0].selected = false
                        }
                        this.selected.push(entry)
                        this.render()
                        this.selectDir(entry.path)
                    }
                    break
                }
                case (0,_basic__rspack_import_0.findTarget)(event, ".file-name", el): {
                    event.preventDefault()
                    const entry = this.findEntry(el.target)
                    if (this.selected.includes(entry)) {
                        entry.selected = false
                        this.selected = this.selected.filter(e => e !== entry)
                        this.render()
                    } else {
                        entry.selected = true
                        if (!this.multiSelect && this.selected.length) {
                            this.selected[0].selected = false
                        }
                        this.selected.push(entry)
                        this.render()
                        this.selectFile(entry.path)
                    }
                    break
                }
            }
        })
    }
}


}),
"./js/modules/common/file/templates.js": (function (__unused_rspack_module, __webpack_exports__, __webpack_require__) {
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  moveTemplate: function() { return moveTemplate; },
  newFolderTemplate: function() { return newFolderTemplate; }
});
/* import */ var ___rspack_import_0 = __webpack_require__("./js/modules/common/index.js");


const moveTemplate = ({path}) =>
    `<div>
    <span>${gettext("Path")}:</span>
    <input type="text" value="${(0,___rspack_import_0.escapeText)(path)}" id="path" placeholder="${gettext("Insert path")}">
    <div class="file-selector"></div>
    </div>`

const newFolderTemplate = () =>
    `<div><input type="text" id="new-folder-name" placeholder="${gettext("Insert folder name")}"></div>`


}),
"./js/modules/common/file/tools.js": (function (__unused_rspack_module, __webpack_exports__, __webpack_require__) {
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  cleanPath: function() { return cleanPath; },
  longFilePath: function() { return longFilePath; },
  moveFile: function() { return moveFile; },
  shortFileTitle: function() { return shortFileTitle; }
});
/* import */ var _basic__rspack_import_0 = __webpack_require__("./js/modules/common/basic.js");
/* import */ var _network__rspack_import_1 = __webpack_require__("./js/modules/common/network.js");



const shortFileTitle = (title, path) => {
    if (!path.length || path.endsWith("/")) {
        return (0,_basic__rspack_import_0.escapeText)(title || gettext("Untitled"))
    }
    return (0,_basic__rspack_import_0.escapeText)(path.split("/").pop())
}

const longFilePath = (title, path, prefix = "") => {
    if (!path.length) {
        path = "/"
    }
    if (path.endsWith("/")) {
        path += title.replace(/\//g, "") || gettext("Untitled")
    }
    if (prefix.length) {
        const pathParts = path.split("/")
        const fileName = pathParts.pop()
        pathParts.push(prefix + fileName)
        path = pathParts.join("/")
    }

    return path
}

const cleanPath = (title, path) => {
    if (!path.startsWith("/")) {
        path = "/" + path
    }
    path = path.replace(/\/{2,}/g, "/") // replace multiple backslashes

    if (
        path.endsWith(
            `/${title.replace(/\//g, "")}` || `/${gettext("Untitled")}`
        )
    ) {
        path = path.split("/").slice(0, -1).join("/") + "/"
    }
    if (path === "/") {
        path = ""
    }
    return path
}

const moveFile = (fileId, title, path, moveUrl) => {
    path = cleanPath(title, path)
    return new Promise((resolve, reject) => {
        ;(0,_network__rspack_import_1.jsonPostJson)(moveUrl, {id: fileId, path}).then(({json}) => {
            if (json.done) {
                resolve(path)
            } else {
                reject()
            }
        })
    })
}


}),
"./js/modules/common/focus.js": (function (__unused_rspack_module, __webpack_exports__, __webpack_require__) {
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  getFocusIndex: function() { return getFocusIndex; },
  setFocusIndex: function() { return setFocusIndex; }
});
// Get the index number of currently focused selement. This it to set tyhe focus close by after doing some dom changes.

const getFocusIndex = () => {
    return Array.from(
        document.querySelectorAll(
            "a[href], area[href], input:not([disabled]), select:not([disabled]), textarea:not([disabled]), button:not([disabled]), iframe, object, embed, [tabindex], [contenteditable]"
        )
    ).findIndex(el => el === document.activeElement)
}

const setFocusIndex = index => {
    const focusableElements = Array.from(
        document.querySelectorAll(
            "a[href], area[href], input:not([disabled]), select:not([disabled]), textarea:not([disabled]), button:not([disabled]), iframe, object, embed, [tabindex], [contenteditable]"
        )
    )
    if (index >= 0 && index < focusableElements.length) {
        focusableElements[index].focus()
    }
}


}),
"./js/modules/common/index.js": (function (__unused_rspack_module, __webpack_exports__, __webpack_require__) {
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  ContentMenu: function() { return /* reexport safe */ _content_menu__rspack_import_8.ContentMenu; },
  DatatableBulk: function() { return /* reexport safe */ _datatable_bulk__rspack_import_13.DatatableBulk; },
  Dialog: function() { return /* reexport safe */ _dialog__rspack_import_7.Dialog; },
  FileDialog: function() { return /* reexport safe */ _file__rspack_import_15.FileDialog; },
  FileSelector: function() { return /* reexport safe */ _file__rspack_import_15.FileSelector; },
  NewFolderDialog: function() { return /* reexport safe */ _file__rspack_import_15.NewFolderDialog; },
  OverviewMenuView: function() { return /* reexport safe */ _overview_menu__rspack_import_0.OverviewMenuView; },
  WebSocketConnector: function() { return /* reexport safe */ _ws__rspack_import_11.WebSocketConnector; },
  activateWait: function() { return /* reexport safe */ _basic__rspack_import_1.activateWait; },
  addAlert: function() { return /* reexport safe */ _basic__rspack_import_1.addAlert; },
  avatarTemplate: function() { return /* reexport safe */ _user__rspack_import_6.avatarTemplate; },
  baseBodyTemplate: function() { return /* reexport safe */ _templates__rspack_import_10.baseBodyTemplate; },
  cancelPromise: function() { return /* reexport safe */ _basic__rspack_import_1.cancelPromise; },
  cleanPath: function() { return /* reexport safe */ _file__rspack_import_15.cleanPath; },
  convertDataURIToBlob: function() { return /* reexport safe */ _blob__rspack_import_2.convertDataURIToBlob; },
  deactivateWait: function() { return /* reexport safe */ _basic__rspack_import_1.deactivateWait; },
  dropdownSelect: function() { return /* reexport safe */ _basic__rspack_import_1.dropdownSelect; },
  enableDatePicker: function() { return /* reexport safe */ _basic__rspack_import_1.enableDatePicker; },
  ensureCSS: function() { return /* reexport safe */ _network__rspack_import_5.ensureCSS; },
  escapeText: function() { return /* reexport safe */ _basic__rspack_import_1.escapeText; },
  faqDialog: function() { return /* reexport safe */ _faq_dialog__rspack_import_14.faqDialog; },
  filterPrimaryEmail: function() { return /* reexport safe */ _user_util__rspack_import_12.filterPrimaryEmail; },
  findTarget: function() { return /* reexport safe */ _basic__rspack_import_1.findTarget; },
  get: function() { return /* reexport safe */ _network__rspack_import_5.get; },
  getCookie: function() { return /* reexport safe */ _network__rspack_import_5.getCookie; },
  getFocusIndex: function() { return /* reexport safe */ _focus__rspack_import_4.getFocusIndex; },
  getJson: function() { return /* reexport safe */ _network__rspack_import_5.getJson; },
  getSettings: function() { return /* reexport safe */ _settings__rspack_import_16.getSettings; },
  infoTooltip: function() { return /* reexport safe */ _basic__rspack_import_1.infoTooltip; },
  initSettings: function() { return /* reexport safe */ _settings__rspack_import_16.initSettings; },
  isActivationEvent: function() { return /* reexport safe */ _events__rspack_import_3.isActivationEvent; },
  jsonPost: function() { return /* reexport safe */ _network__rspack_import_5.jsonPost; },
  jsonPostBare: function() { return /* reexport safe */ _network__rspack_import_5.jsonPostBare; },
  jsonPostJson: function() { return /* reexport safe */ _network__rspack_import_5.jsonPostJson; },
  langName: function() { return /* reexport safe */ _basic__rspack_import_1.langName; },
  localizeDate: function() { return /* reexport safe */ _basic__rspack_import_1.localizeDate; },
  longFilePath: function() { return /* reexport safe */ _file__rspack_import_15.longFilePath; },
  makeWorker: function() { return /* reexport safe */ _worker__rspack_import_9.makeWorker; },
  moveFile: function() { return /* reexport safe */ _file__rspack_import_15.moveFile; },
  noSpaceTmp: function() { return /* reexport safe */ _basic__rspack_import_1.noSpaceTmp; },
  post: function() { return /* reexport safe */ _network__rspack_import_5.post; },
  postBare: function() { return /* reexport safe */ _network__rspack_import_5.postBare; },
  postJson: function() { return /* reexport safe */ _network__rspack_import_5.postJson; },
  setCheckableLabel: function() { return /* reexport safe */ _basic__rspack_import_1.setCheckableLabel; },
  setDocTitle: function() { return /* reexport safe */ _basic__rspack_import_1.setDocTitle; },
  setFocusIndex: function() { return /* reexport safe */ _focus__rspack_import_4.setFocusIndex; },
  setLanguage: function() { return /* reexport safe */ _user__rspack_import_6.setLanguage; },
  shortFileTitle: function() { return /* reexport safe */ _file__rspack_import_15.shortFileTitle; },
  showSystemMessage: function() { return /* reexport safe */ _basic__rspack_import_1.showSystemMessage; },
  unescapeText: function() { return /* reexport safe */ _basic__rspack_import_1.unescapeText; },
  whenReady: function() { return /* reexport safe */ _basic__rspack_import_1.whenReady; }
});
/* import */ var _overview_menu__rspack_import_0 = __webpack_require__("./js/modules/common/overview_menu.js");
/* import */ var _basic__rspack_import_1 = __webpack_require__("./js/modules/common/basic.js");
/* import */ var _blob__rspack_import_2 = __webpack_require__("./js/modules/common/blob.js");
/* import */ var _events__rspack_import_3 = __webpack_require__("./js/modules/common/events.js");
/* import */ var _focus__rspack_import_4 = __webpack_require__("./js/modules/common/focus.js");
/* import */ var _network__rspack_import_5 = __webpack_require__("./js/modules/common/network.js");
/* import */ var _user__rspack_import_6 = __webpack_require__("./js/modules/common/user.js");
/* import */ var _dialog__rspack_import_7 = __webpack_require__("./js/modules/common/dialog.js");
/* import */ var _content_menu__rspack_import_8 = __webpack_require__("./js/modules/common/content_menu.js");
/* import */ var _worker__rspack_import_9 = __webpack_require__("./js/modules/common/worker.js");
/* import */ var _templates__rspack_import_10 = __webpack_require__("./js/modules/common/templates.js");
/* import */ var _ws__rspack_import_11 = __webpack_require__("./js/modules/common/ws.js");
/* import */ var _user_util__rspack_import_12 = __webpack_require__("./js/modules/common/user_util.js");
/* import */ var _datatable_bulk__rspack_import_13 = __webpack_require__("./js/modules/common/datatable_bulk.js");
/* import */ var _faq_dialog__rspack_import_14 = __webpack_require__("./js/modules/common/faq_dialog.js");
/* import */ var _file__rspack_import_15 = __webpack_require__("./js/modules/common/file/index.js");
/* import */ var _settings__rspack_import_16 = __webpack_require__("./js/modules/common/settings.js");























}),
"./js/modules/common/network.js": (function (__unused_rspack_module, __webpack_exports__, __webpack_require__) {
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  ensureCSS: function() { return ensureCSS; },
  get: function() { return get; },
  getCookie: function() { return getCookie; },
  getJson: function() { return getJson; },
  jsonPost: function() { return jsonPost; },
  jsonPostBare: function() { return jsonPostBare; },
  jsonPostJson: function() { return jsonPostJson; },
  post: function() { return post; },
  postBare: function() { return postBare; },
  postJson: function() { return postJson; }
});
/* import */ var _settings__rspack_import_0 = __webpack_require__("./js/modules/common/settings.js");


/** Get cookie to set as part of the request header of all AJAX requests to the server.
 * @param name The name of the token to look for in the cookie.
 */
const getCookie = name => {
    if (!document.cookie || document.cookie === "") {
        return null
    }
    const cookie = document.cookie
        .split(";")
        .map(cookie => cookie.trim())
        .find(cookie => {
            if (cookie.substring(0, name.length + 1) == name + "=") {
                return true
            } else {
                return false
            }
        })
    if (cookie) {
        return decodeURIComponent(cookie.substring(name.length + 1))
    }
    return null
}

/* from https://www.tjvantoll.com/2015/09/13/fetch-and-errors/ */
const handleFetchErrors = response => {
    if (!response.ok) {
        throw response
    }
    return response
}

const get = (url, params = {}, csrfToken = false) => {
    const settings = (0,_settings__rspack_import_0.getSettings)()
    if (!csrfToken) {
        csrfToken = settings.getCsrfToken() // Won't work in web worker.
    }
    const queryString = Object.keys(params)
        .map(
            key =>
                `${encodeURIComponent(key)}=${encodeURIComponent(params[key])}`
        )
        .join("&")
    if (queryString.length) {
        url = `${url}?${queryString}`
    }
    return fetch(settings.apiUrl(url), {
        method: "GET",
        headers: {
            "X-CSRFToken": csrfToken,
            Accept: "application/json",
            "X-Requested-With": "XMLHttpRequest"
        },
        credentials: "include"
    })
        .then(settings.postResponseHook)
        .then(handleFetchErrors)
}

const getJson = (url, params = {}, csrfToken = false) =>
    get(url, params, csrfToken).then(response => response.json())

const postBare = (url, params = {}, csrfToken = false) => {
    const settings = (0,_settings__rspack_import_0.getSettings)()
    console.warn(
        `postBare("${url}") is deprecated and will be removed in a future version. ` +
            "Use jsonPostBare() instead."
    )
    if (!csrfToken) {
        csrfToken = settings.getCsrfToken() // Won't work in web worker.
    }
    const body = new FormData()
    body.append("csrfmiddlewaretoken", csrfToken)
    Object.keys(params).forEach(key => {
        const value = params[key]
        if (typeof value === "object" && value.file && value.filename) {
            body.append(key, value.file, value.filename)
        } else if (Array.isArray(value)) {
            value.forEach(item => body.append(`${key}[]`, item))
        } else if (
            typeof value === "object" &&
            (value.constructor === undefined ||
                value.constructor.name !== "File")
        ) {
            body.append(key, JSON.stringify(value))
        } else {
            body.append(key, value)
        }
    })

    return fetch(settings.apiUrl(url), {
        method: "POST",
        headers: {
            "X-CSRFToken": csrfToken,
            Accept: "application/json",
            "X-Requested-With": "XMLHttpRequest"
        },
        credentials: "include",
        body
    })
}

const post = (url, params = {}, csrfToken = false) => {
    const settings = (0,_settings__rspack_import_0.getSettings)()
    return postBare(url, params, csrfToken)
        .then(settings.postResponseHook)
        .then(handleFetchErrors)
}
// post and then return json and status
const postJson = (url, params = {}, csrfToken = false) =>
    post(url, params, csrfToken).then(response =>
        response.json().then(json => ({json, status: response.status}))
    )

const jsonPostBare = (
    url,
    object = {},
    csrfToken = false,
    files = {},
    keepalive = false
) => {
    const settings = (0,_settings__rspack_import_0.getSettings)()

    // post json object rather than form data.
    if (!csrfToken) {
        csrfToken = settings.getCsrfToken() // Won't work in web worker.
    }

    const fetchOptions = {
        method: "POST",
        headers: {
            "X-CSRFToken": csrfToken,
            Accept: "application/json",
            "X-Requested-With": "XMLHttpRequest"
        },
        credentials: "include",
        keepalive
    }

    if (Object.keys(files).length) {
        const body = new FormData()
        body.append("csrfmiddlewaretoken", csrfToken)
        body.append("json", JSON.stringify(object))
        Object.keys(files).forEach(key => {
            const value = files[key]
            if (typeof value === "object" && value.file && value.filename) {
                body.append(key, value.file, value.filename)
            } else if (Array.isArray(value)) {
                value.forEach(item => body.append(`${key}[]`, item))
            } else {
                body.append(key, value)
            }
        })
        fetchOptions.body = body
    } else {
        fetchOptions.headers["Content-Type"] = "application/json"
        fetchOptions.body = JSON.stringify(object)
    }

    return fetch(settings.apiUrl(url), fetchOptions)
}

const jsonPost = (
    url,
    object = {},
    csrfToken = false,
    files = {},
    keepalive = false
) => {
    const settings = (0,_settings__rspack_import_0.getSettings)()
    return jsonPostBare(url, object, csrfToken, files, keepalive)
        .then(settings.postResponseHook)
        .then(handleFetchErrors)
}

// post json object and return json and status
const jsonPostJson = (
    url,
    object = {},
    csrfToken = false,
    files = {},
    keepalive = false
) =>
    jsonPost(url, object, csrfToken, files, keepalive).then(response =>
        response.json().then(json => ({json, status: response.status}))
    )

const ensureCSS = cssUrl => {
    if (typeof cssUrl === "object") {
        cssUrl.forEach(url => ensureCSS(url))
        return
    }
    const link = document.createElement("link")
    link.rel = "stylesheet"
    link.href = cssUrl
    const styleSheet = Array.from(document.styleSheets).find(
        styleSheet => styleSheet.href === link.href
    )
    if (!styleSheet) {
        document.head.appendChild(link)
        return true
    }
    return false
}


}),
"./js/modules/common/overview_menu.js": (function (__unused_rspack_module, __webpack_exports__, __webpack_require__) {
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  OverviewMenuView: function() { return OverviewMenuView; }
});
/* import */ var diff_dom__rspack_import_0 = __webpack_require__("./node_modules/.pnpm/diff-dom@5.2.1/node_modules/diff-dom/dist/module.js");
/* import */ var w3c_keyname__rspack_import_1 = __webpack_require__("./node_modules/.pnpm/w3c-keyname@2.2.8/node_modules/w3c-keyname/index.js");
/* import */ var _basic__rspack_import_2 = __webpack_require__("./js/modules/common/basic.js");




class OverviewMenuView {
    constructor(overview, model) {
        this.overview = overview
        this.model = model()
        this.dd = new diff_dom__rspack_import_0.DiffDOM({
            valueDiffing: false
        })
        this.openedMenu = false
        this.listeners = {}
        this.keyboardShortcuts = new Map()
    }

    init() {
        (0,_basic__rspack_import_2.whenReady)().then(() => {
            this.addMissingIds(this.model)
            this.bindEvents()
            this.setupKeyboardShortcuts()
        })
    }

    addMissingIds(menu) {
        // Add missing ids to menu items that don't have an ID.
        menu.content.forEach(item => {
            if (!item.id) {
                item.id = Math.random().toString(36).substring(2)
            }
            if (item.type === "dropdown") {
                this.addMissingIds(item)
            }
        })
    }

    bindEvents() {
        this.menuEl = document.getElementById("fw-overview-menu")
        this.listeners.onclick = event => this.onclick(event)
        document.body.addEventListener("click", this.listeners.onclick)
        this.listeners.oninput = event => this.oninput(event)
        document.body.addEventListener("input", this.listeners.oninput)
        this.listeners.onKeydown = event => this.onKeydown(event)
        document.body.addEventListener("keydown", this.listeners.onKeydown)
        this.listeners.onFocus = event => this.onFocus(event)
        document.body.addEventListener("focus", this.listeners.onFocus, true)
        this.update()
    }

    setupKeyboardShortcuts() {
        // Map all keyboard shortcuts from the menu model
        this.model.content.forEach(menuItem => {
            if (menuItem.keys) {
                this.keyboardShortcuts.set(
                    menuItem.keys.toLowerCase(),
                    menuItem
                )
            }
        })
    }

    onKeydown(event) {
        let name = (0,w3c_keyname__rspack_import_1.keyName)(event)
        if (event.altKey) {
            name = "alt-" + name.toLowerCase()
            const menuItem = this.keyboardShortcuts.get(name)
            if (menuItem) {
                event.preventDefault()
                event.stopPropagation()
                event.stopImmediatePropagation()

                if (menuItem.type === "search") {
                    const inputEl = document.getElementById(
                        `${menuItem.id}-input`
                    )
                    if (inputEl) {
                        inputEl.focus()
                    }
                } else if (menuItem.type === "dropdown") {
                    // Toggle dropdown menu
                    // If the menu is already open, close it
                    if (
                        this.openedMenu === this.model.content.indexOf(menuItem)
                    ) {
                        menuItem.open = false
                        this.openedMenu = false
                        this.update()
                    } else {
                        if (this.openedMenu !== false) {
                            this.model.content[this.openedMenu].open = false
                        }
                        menuItem.open = true
                        this.openedMenu = this.model.content.indexOf(menuItem)
                        this.update()
                        const firstDropdownItem = this.menuEl.querySelector(
                            `.fw-pulldown-item.selected`
                        )
                        if (firstDropdownItem) {
                            firstDropdownItem.focus()
                        }
                    }
                } else if (menuItem.action) {
                    menuItem.action(this.overview)
                }
                return
            }
        }

        // Handle horizontal navigation between menu items
        if (name === "ArrowLeft" || name === "ArrowRight") {
            const menuItems = Array.from(
                this.menuEl.querySelectorAll("#fw-overview-menu > li")
            )
            const focusedElement = document.activeElement
            const currentMenuItem = focusedElement.closest("li")

            if (currentMenuItem) {
                event.preventDefault()
                const currentIndex = menuItems.indexOf(currentMenuItem)
                let newIndex

                if (name === "ArrowLeft") {
                    newIndex =
                        currentIndex > 0
                            ? currentIndex - 1
                            : menuItems.length - 1
                } else {
                    newIndex =
                        currentIndex < menuItems.length - 1
                            ? currentIndex + 1
                            : 0
                }

                const nextMenuItem = menuItems[newIndex].querySelector(
                    ".fw-dropdown-menu, .fw-text-menu, button, input"
                )
                if (nextMenuItem) {
                    nextMenuItem.focus()
                }
            }
            return
        }

        // Handle Enter and Space to open dropdown menus
        if (name === "Enter" || name === " ") {
            const focusedElement = document.activeElement
            if (focusedElement.matches(".fw-dropdown-menu")) {
                event.preventDefault()
                const menuItem = this.findMenuItemFromElement(focusedElement)
                if (menuItem && menuItem.type === "dropdown") {
                    if (this.openedMenu !== false) {
                        this.model.content[this.openedMenu].open = false
                    }
                    menuItem.open = true
                    this.openedMenu = this.model.content.indexOf(menuItem)
                    menuItem.selectedIndex = 0
                    this.update()

                    const firstDropdownItem = this.menuEl.querySelector(
                        `.fw-pulldown-item.selected`
                    )
                    if (firstDropdownItem) {
                        firstDropdownItem.focus()
                    }
                }
                return
            }
        }

        if (this.openedMenu !== false) {
            const menuItem = this.model.content[this.openedMenu]

            if (menuItem.type === "dropdown") {
                if (name === "ArrowDown" || name === "ArrowUp") {
                    event.preventDefault()
                    event.stopPropagation()

                    // Find currently selected item
                    let selectedIndex = -1
                    if (menuItem.selectedIndex !== undefined) {
                        selectedIndex = menuItem.selectedIndex
                    }

                    // Calculate new index
                    if (name === "ArrowDown") {
                        selectedIndex =
                            selectedIndex < menuItem.content.length - 1
                                ? selectedIndex + 1
                                : 0
                    } else {
                        selectedIndex -= 1
                        if (selectedIndex < 0) {
                            // Close menu
                            menuItem.open = false
                            this.openedMenu = false
                            delete menuItem.selectedIndex
                            this.update()
                            const dropdownButton = this.menuEl.querySelector(
                                `#${menuItem.id}-button`
                            )
                            if (dropdownButton) {
                                dropdownButton.focus()
                            }
                        }
                    }

                    menuItem.selectedIndex = selectedIndex
                    this.update()
                    const selectedEl = this.menuEl.querySelector(
                        `.fw-pulldown-item.selected`
                    )
                    if (selectedEl) {
                        selectedEl.focus()
                    }
                } else if (name === "Enter" || name === " ") {
                    event.preventDefault()
                    event.stopPropagation()

                    if (
                        menuItem.selectedIndex !== undefined &&
                        menuItem.content[menuItem.selectedIndex]
                    ) {
                        const selectedItem =
                            menuItem.content[menuItem.selectedIndex]
                        if (selectedItem.action) {
                            selectedItem.action(this.overview)
                            menuItem.open = false
                            this.openedMenu = false
                            delete menuItem.selectedIndex
                            this.update()
                        }
                    }
                } else if (name === "Escape") {
                    event.preventDefault()
                    event.stopPropagation()

                    menuItem.open = false
                    this.openedMenu = false
                    delete menuItem.selectedIndex
                    this.update()
                    const dropdownButton = document.getElementById(
                        `${menuItem.id}-button`
                    )
                    if (dropdownButton) {
                        dropdownButton.focus()
                    }
                }
            }
        }
    }

    onFocus(event) {
        // Ignore if the focus event is triggered by JavaScript
        if (event.isTrusted === false) {
            return
        }
        const target = event.target
        if (this.openedMenu !== false) {
            if (target.matches("#fw-overview-menu li .fw-pulldown-item")) {
                const menuItem = this.model.content[this.openedMenu]
                if (menuItem) {
                    const itemNumber = Array.from(
                        target.parentElement.parentElement.children
                    ).indexOf(target.parentElement)
                    menuItem.selectedIndex = itemNumber
                    this.update()
                }
            } else {
                // Close dropdown menu if focus is outside of the dropdown
                const menuItem = this.model.content[this.openedMenu]
                if (menuItem) {
                    menuItem.open = false
                    delete menuItem.selectedIndex
                    this.openedMenu = false
                    this.update()
                }
            }
        }
    }

    findMenuItemFromElement(element) {
        const menuItem = element.closest("li")
        if (!menuItem) {
            return null
        }

        let menuNumber = 0
        let seekItem = menuItem
        while (seekItem.previousElementSibling) {
            menuNumber++
            seekItem = seekItem.previousElementSibling
        }
        return this.model.content[menuNumber]
    }

    focusMenuItem(menuItem) {
        const menuEl = this.menuEl.querySelector(`#${menuItem.id}`)
        if (menuEl) {
            menuEl.focus()
        }
    }

    oninput(event) {
        const target = event.target
        if (target.matches("#fw-overview-menu > li > .fw-button > input")) {
            // A text was entered in a top entry. we find which one.
            let menuNumber = 0
            let seekItem = target.closest("li")
            while (seekItem.previousElementSibling) {
                menuNumber++
                seekItem = seekItem.previousElementSibling
            }
            const menuItem = this.model.content[menuNumber]
            if (menuItem.input) {
                menuItem.input(this.overview, target.value)
                target.focus()
            }
        }
    }

    onclick(event) {
        const target = event.target
        if (
            target.matches("#fw-overview-menu li li, #fw-overview-menu li li *")
        ) {
            event.preventDefault()
            let itemNumber = 0
            let seekItem = target.closest("li")
            while (seekItem.previousElementSibling) {
                itemNumber++
                seekItem = seekItem.previousElementSibling
            }
            let menuNumber = 0
            seekItem = seekItem.parentElement.parentElement.parentElement
            while (seekItem.previousElementSibling) {
                menuNumber++
                seekItem = seekItem.previousElementSibling
            }
            this.model.content[menuNumber].content[itemNumber].action(
                this.overview
            )
            this.model.content[menuNumber].open = false

            if (this.model.content[menuNumber].type === "dropdown") {
                this.model.content[menuNumber].title =
                    this.model.content[menuNumber].content[itemNumber].title
                this.openedMenu = false
                this.update()
            }
            return false
        } else if (
            target.matches(
                "#fw-overview-menu li .select-action input[type=checkbox]"
            )
        ) {
            event.preventDefault()
            event.stopImmediatePropagation()
            event.stopPropagation()
            // A toolbar dropdown menu item was clicked. We just need to
            // find out which one
            let menuNumber = 0
            let seekItem = target.closest("li")
            while (seekItem.previousElementSibling) {
                menuNumber++
                seekItem = seekItem.previousElementSibling
            }
            const menuItem = this.model.content[menuNumber]

            if (menuItem.checked === true) {
                menuItem.checked = false
                menuItem.uncheckAction(this.overview)
            } else {
                menuItem.checked = true
                menuItem.checkAction(this.overview)
            }
            return true
        } else if (
            target.matches("#fw-overview-menu li, #fw-overview-menu li *")
        ) {
            // A toolbar dropdown menu item was clicked. We just need to
            // find out which one
            let menuNumber = 0
            let seekItem = target.closest("li")
            while (seekItem.previousElementSibling) {
                menuNumber++
                seekItem = seekItem.previousElementSibling
            }
            const menuItem = this.model.content[menuNumber]
            // if it is a dropdown menu, open it. Otherwise execute an
            // associated action.
            if (
                ["dropdown", "select-action-dropdown"].includes(menuItem.type)
            ) {
                event.preventDefault()
                if (this.openedMenu === menuNumber) {
                    this.model.content[this.openedMenu].open = false
                    this.openedMenu = false
                } else {
                    if (this.openedMenu !== false) {
                        this.model.content[this.openedMenu].open = false
                    }
                    menuItem.open = true
                    this.openedMenu = menuNumber
                }
                this.update()
            } else if (menuItem.action) {
                event.preventDefault()
                menuItem.action(this.overview)
                this.announceForScreenReader(gettext("Action completed"))
                if (this.openedMenu !== false) {
                    this.model.content[this.openedMenu].open = false
                    this.openedMenu = false
                }
                this.update()
            }
            return false
        } else if (this.openedMenu !== false) {
            this.model.content[this.openedMenu].open = false
            this.openedMenu = false
            this.update()
        }
    }

    update() {
        if (!this.menuEl) {
            // page has not yet been loaded. abort
            return
        }
        const diff = this.dd.diff(this.menuEl, this.getMenuHTML())
        this.dd.apply(this.menuEl, diff)
    }

    getMenuHTML() {
        return `<ul id="fw-overview-menu">${this.model.content
            .map(
                menuItem =>
                    `<li class="fw-overview-menu-item${menuItem.id ? ` ${menuItem.id}` : ""} ${menuItem.type}">${this.getMenuItemHTML(
                        menuItem
                    )}</li>`
            )
            .join("")}</ul>`
    }

    // Underline access keys
    getAccessKeyHTML(title, accessKey) {
        if (!accessKey) {
            return (0,_basic__rspack_import_2.escapeText)(title)
        }
        const index = title.toLowerCase().indexOf(accessKey.toLowerCase())
        if (index === -1) {
            return (0,_basic__rspack_import_2.escapeText)(title)
        }
        return `${(0,_basic__rspack_import_2.escapeText)(title.substring(0, index))}<span class="access-key">${(0,_basic__rspack_import_2.escapeText)(
            title.charAt(index)
        )}</span>${(0,_basic__rspack_import_2.escapeText)(title.substring(index + 1))}`
    }

    getMenuItemHTML(menuItem) {
        let returnValue
        switch (menuItem.type) {
            case "dropdown":
                returnValue = this.getDropdownHTML(menuItem)
                break
            case "select-action-dropdown":
                returnValue = this.getSelectionActionDropdownHTML(menuItem)
                break
            case "text":
                returnValue = this.getTextHTML(menuItem)
                break
            case "button":
                returnValue = this.getButtonHTML(menuItem)
                break
            case "search":
                returnValue = this.getSearchHTML(menuItem)
                break
            default:
                returnValue = ""
                break
        }
        return returnValue
    }

    getSelectionActionDropdownHTML(menuItem) {
        return `
        <div class="select-action fw-button fw-light fw-large">
            <input type="checkbox" ${menuItem.checked ? "checked" : ""}>
            <span class="select-action-dropdown"><i class="fa fa-caret-down"></i></span>
        </div>
        ${this.getDropdownListHTML(menuItem)}
        `
    }

    getDropdownHTML(menuItem) {
        const accessKey = menuItem.keys?.split("-")[1]
        return `
        <div class="dropdown fw-dropdown-menu"
          role="button"
          aria-haspopup="true"
          aria-expanded="${menuItem.open ? "true" : "false"}"
          tabindex="0"
          id="${menuItem.id}-button">
            <label id="${menuItem.id}-label">
                ${this.getAccessKeyHTML(
                    menuItem.title
                        ? menuItem.title
                        : menuItem.content.length
                          ? menuItem.content[0].title
                          : "",
                    accessKey
                )}
            </label>
            <span class="dropdown" aria-hidden="true">
                <i class="fa fa-caret-down"></i>
            </span>
        </div>
        ${this.getDropdownListHTML(menuItem)}
        `
    }

    getDropdownListHTML(menuItem) {
        if (menuItem.open) {
            return `<div class="fw-pulldown fw-left"
                        role="menu"
                        style="display: block;"
                        aria-labelledby="${menuItem.id}-button"
                        >
                <ul role="presentation">${menuItem.content
                    .map((menuOption, index) =>
                        this.getDropdownOptionHTML(menuOption, index)
                    )
                    .join("")}</ul></div>`
        } else {
            return ""
        }
    }

    getDropdownOptionHTML(menuOption, index) {
        const menuItem = this.model.content[this.openedMenu]
        const isSelected = menuItem.selectedIndex === index
        return `
      <li role="none">
          <span class="fw-pulldown-item${isSelected ? " selected" : ""}"
                role="menuitem" tabindex="0">
              ${(0,_basic__rspack_import_2.escapeText)(menuOption.title)}
          </span>
      </li>
      `
    }

    getButtonHTML(menuItem) {
        return `
        <button class="fw-button fw-light fw-large"
                title="${menuItem.title}"
                tabindex="0"
                role="menuitem">
            ${menuItem.title}
            ${menuItem.icon ? `<i class="fa fa-${menuItem.icon}" aria-hidden="true"></i>` : ""}
        </button>`
    }

    announceForScreenReader(message) {
        const announcement = document.createElement("div")
        announcement.setAttribute("aria-live", "polite")
        announcement.classList.add("sr-only") // CSS to visually hide but keep available to screen readers
        announcement.textContent = message
        document.body.appendChild(announcement)
        setTimeout(() => announcement.remove(), 1000)
    }

    getTextHTML(menuItem) {
        const accessKey = menuItem.keys?.split("-")[1]
        return `
        <button class="fw-text-menu"
            title="${menuItem.title}${menuItem.keys ? ` (${menuItem.keys})` : ""}"
              >
              ${this.getAccessKeyHTML(menuItem.title, accessKey)}
        </button>`
    }

    getSearchHTML(menuItem) {
        const accessKey = menuItem.keys?.split("-")[1]
        return `
        <div class="fw-button fw-light fw-large disabled fw-search-field-container">
            <label for="${menuItem.id}-input" class="fw-search-label">
                ${this.getAccessKeyHTML(menuItem.title, accessKey)}
            </label>
            <input type="search"
                class="fw-search-field"
                id="${menuItem.id}-input"
                aria-description="${gettext("Type to search")}"
                placeholder="${menuItem.title}"
                aria-label="${menuItem.title}"
                >
            ${menuItem.icon ? `<i class="fa fa-${menuItem.icon}" aria-hidden="true"></i>` : ""}
        </div>`
    }

    destroy() {
        // Remove all event listeners
        document.body.removeEventListener("click", this.listeners.onclick)
        document.body.removeEventListener("input", this.listeners.oninput)
        document.body.removeEventListener("keydown", this.listeners.onKeydown)
        document.body.removeEventListener("focus", this.listeners.onFocus)

        // Clear references
        this.listeners = {}
        this.keyboardShortcuts.clear()
        this.menuEl = null
        this.openedMenu = false
    }
}


}),
"./js/modules/common/settings.js": (function (__unused_rspack_module, __webpack_exports__, __webpack_require__) {
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  getSettings: function() { return getSettings; },
  initSettings: function() { return initSettings; }
});
let _settings = null

function initSettings(rawSettings) {
    if (_settings) {
        throw new Error("Settings already initialized")
    }
    // Freeze to prevent accidental mutation at runtime
    _settings = Object.freeze({...rawSettings})
}

function getSettings() {
    if (!_settings) {
        throw new Error(
            "App settings not initialized. Call initSettings() first."
        )
    }
    return _settings
}


}),
"./js/modules/common/templates.js": (function (__unused_rspack_module, __webpack_exports__, __webpack_require__) {
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  baseBodyTemplate: function() { return baseBodyTemplate; }
});
/* import */ var _user__rspack_import_0 = __webpack_require__("./js/modules/common/user.js");
/* import */ var _user_util__rspack_import_1 = __webpack_require__("./js/modules/common/user_util.js");



const baseBodyTemplate = ({user, contents, hasOverview, app}) => `
<div id="wait">
    <i class="fa fa-spinner fa-pulse"></i>
</div>
<header class="fw-header" role="banner">
    <div class="fw-container">
        <a href="${app && app.routes[""].app === "document" ? "/" : "/documents/"}">
            <h1 class="fw-logo">
                <span class="fw-logo-text"></span>
                <img src="${staticUrl("svg/icon.svg")}" alt="Logo" />
            </h1>
        </a>
        <nav id="header-nav" role="navigation" aria-label="${gettext("Site navigation")}"></nav>
        <div id="user-preferences" class="fw-user-preferences fw-header-text">
            <div id="preferences-btn" class="fw-button">
                ${(0,_user__rspack_import_0.avatarTemplate)({user})}
            </div>
            <div id="user-preferences-pulldown" class="fw-pulldown fw-right">
                <div data-value="profile">
                    <span class='fw-avatar-card'>
                        <span class='fw-avatar-card-avatar'>${(0,_user__rspack_import_0.avatarTemplate)({user})}</span>
                        <span class='fw-avatar-card-name'>
                            ${user.username}
                            <span class='fw-avatar-card-email'>${(0,_user_util__rspack_import_1.filterPrimaryEmail)(user.emails)}</span>
                        </span>
                    </span>
                </div>
                <div data-value="contacts">${gettext("Contacts")}</div>
                <div data-value="logout">${gettext("Log out")}</div>
            </div>
        </div><!-- end user preference -->
    </div><!-- end container -->
</header>
<div class="fw-contents-outer">
    ${hasOverview ? '<div class="fw-overview-menu-wrapper"><ul id="fw-overview-menu"></ul></div>' : ""}
    <div class="fw-contents">
        ${contents}
    </div>
</div>`


}),
"./js/modules/common/user.js": (function (__unused_rspack_module, __webpack_exports__, __webpack_require__) {
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  avatarTemplate: function() { return avatarTemplate; },
  setLanguage: function() { return setLanguage; }
});
/* import */ var _network__rspack_import_0 = __webpack_require__("./js/modules/common/network.js");


const setLanguage = (_config, language) =>
    (0,_network__rspack_import_0.jsonPost)("/api/i18n/setlang/", {language}).then(() => {
        // We delete the network cache as this contains the JS
        // translations.
        caches.keys().then(names => {
            for (const name of names) {
                caches.delete(name)
            }
            window.location.reload()
        })
    })

const COLOR_CACHE = {}

const userColor = string => {
    // Source https://gist.github.com/0x263b/2bdd90886c2036a1ad5bcf06d6e6fb37
    if (string.length === 0) {
        return "rgb(0,0,0)"
    } else if (COLOR_CACHE[string]) {
        return COLOR_CACHE[string]
    }
    let hash = 0
    for (let i = 0; i < string.length; i++) {
        hash = string.charCodeAt(i) + ((hash << 5) - hash)
        hash = hash & hash
    }
    const rgb = [0, 0, 0]
    for (let i = 0; i < 3; i++) {
        rgb[i] = (hash >> (i * 8)) & 255
    }
    COLOR_CACHE[string] = `rgb(${rgb[0]}, ${rgb[1]}, ${rgb[2]})`
    return COLOR_CACHE[string]
}

/** A template for the default round avatar view. */
const avatarTemplate = ({user}) => {
    const name = user.username || user.name || "A"
    if (user.avatar) {
        return `<img class="fw-avatar" src="${user.avatar}" alt="${name}">`
    } else {
        const color = userColor(name)
        return `<span class="fw-string-avatar" style="background-color: ${color};"><span>${name[0]}</span></span>`
    }
}


}),
"./js/modules/common/user_util.js": (function (__unused_rspack_module, __webpack_exports__, __webpack_require__) {
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  filterPrimaryEmail: function() { return filterPrimaryEmail; }
});
/** Creates a dropdown box.
 * @param btn The button to open and close the dropdown box.
 * @param box The node containing the contents of the dropdown box.
 * @param preopen An optional function to be called before opening the dropdown box. Used to position dropdown box.
 */
const filterPrimaryEmail = emails => {
    const primaryEmails = emails.filter(email => email.primary)
    if (!primaryEmails.length) {
        if (emails.length) {
            return emails[0].address
        } else {
            return ""
        }
    }
    return primaryEmails[0].address
}


}),
"./js/modules/common/worker.js": (function (__unused_rspack_module, __webpack_exports__, __webpack_require__) {
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  makeWorker: function() { return makeWorker; }
});
/* allows cross domain web workers */
/* Taken from https://benohead.com/cross-domain-cross-browser-web-workers/ */
const makeWorker = workerUrl => {
    const a = document.createElement("a")
    a.href = workerUrl // turn into absolute URL if needed.
    const blob = new Blob([`importScripts("${a.href}")`], {
            type: "application/javascript"
        }),
        blobUrl = window.URL.createObjectURL(blob),
        worker = new Worker(blobUrl)
    return worker
}


}),
"./js/modules/common/ws.js": (function (__unused_rspack_module, __webpack_exports__, __webpack_require__) {
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  WebSocketConnector: function() { return WebSocketConnector; }
});
/* Sets up communicating with server (retrieving document, saving, collaboration, etc.).
 */
class WebSocketConnector {
    constructor({
        base = "", // needs to be specified
        path = "", // needs to be specified
        appLoaded = () => false, // required argument
        anythingToSend = () => false, // required argument
        messagesElement = () => false, // element in which to show connection messages
        initialMessage = () => ({type: "subscribe"}),
        resubScribed = () => {}, // Cleanup when the client connects a second or subsequent time
        restartMessage = () => ({type: "restart"}), // Too many messages have been lost and we need to restart
        warningNotAllSent = gettext("Warning! Some data is unsaved"), // Info to show while disconnected WITH unsaved data
        infoDisconnected = gettext("Disconnected. Attempting to reconnect..."), // Info to show while disconnected WITHOUT unsaved data
        receiveData = _data => {},
        failedAuth = () => {
            window.location.href = "/"
        }
    }) {
        this.base = base
        this.path = path
        this.appLoaded = appLoaded
        this.anythingToSend = anythingToSend
        this.messagesElement = messagesElement
        this.initialMessage = initialMessage
        this.resubScribed = resubScribed
        this.restartMessage = restartMessage
        this.warningNotAllSent = warningNotAllSent
        this.infoDisconnected = infoDisconnected
        this.receiveData = receiveData
        this.failedAuth = failedAuth
        /* A list of messages to be sent. Only used when temporarily offline.
            Messages will be sent when returning back online. */
        this.messagesToSend = []
        /* A list of messages from a previous connection */
        this.oldMessages = []

        this.online = true
        this.connected = false
        /* Increases when connection has to be reestablished */
        /* 0 = before first connection. */
        /* 1 = first connection established, etc. */
        this.connectionCount = 0
        this.recentlySent = false
        this.listeners = {}

        //heartbeat
        this.pingTimer = false
        this.pongTimer = false
    }

    init() {
        this.createWSConnection()

        // Close the socket manually for now when the connection is lost. Sometimes the socket isn't closed on disconnection.
        this.listeners.onOffline = _event => this.ws.close()
        window.addEventListener("offline", this.listeners.onOffline)
    }

    goOffline() {
        // Simulate offline mode due to lack of ways of doing this in Chrome/Firefox
        // https://bugzilla.mozilla.org/show_bug.cgi?id=1421357
        // https://bugs.chromium.org/p/chromium/issues/detail?id=423246
        this.online = false
        this.connected = false
        this.ws.close()
    }

    goOnline() {
        // Reconnect from offline mode
        this.online = true
    }

    close() {
        if (this.ws) {
            this.ws.onclose = () => {}
            this.ws.close()
        }
        window.removeEventListener("offline", this.listeners.onOffline)
    }

    createWSConnection() {
        // Messages object used to ensure that data is received in right order.
        this.messages = {
            server: 0,
            client: 0,
            lastTen: []
        }
        let url
        if (this.online) {
            if (this.base.startsWith("/")) {
                url = this.base + this.path
            } else if (location.protocol === "https:") {
                url = `wss://${this.base}${this.path}`
            } else {
                url = `ws://${this.base}${this.path}`
            }
        } else {
            if (location.protocol === "https:") {
                url = "wss://offline"
            } else {
                url = "ws://offline"
            }
        }
        if (this.ws) {
            this.ws.onmessage = () => {}
            this.ws.onclose = () => {}
            this.ws.close()
        }
        this.ws = new window.WebSocket(url)
        this.ws.onmessage = event => this.onmessage(event)
        this.ws.onclose = () => this.onclose()
    }

    waitForWS() {
        return new Promise((resolve, reject) => {
            const checkState = () => {
                if (!this.ws) {
                    // WebSocket doesn't exist
                    return setTimeout(() => checkState(), 100)
                }

                if (this.ws.readyState === this.ws.OPEN) {
                    // WebSocket is open and ready
                    return resolve()
                } else if (this.ws.readyState === this.ws.CONNECTING) {
                    // WebSocket is still connecting, wait
                    return setTimeout(() => checkState(), 100)
                } else {
                    // WebSocket is in CLOSING or CLOSED state
                    // We should not try to send on this socket
                    return reject(new Error("WebSocket is not in OPEN state"))
                }
            }

            checkState()
        })
    }

    onmessage(event) {
        const data = JSON.parse(event.data)
        const expectedServer = this.messages.server + 1
        if (data.type === "request_resend") {
            this.resend_messages(data.from)
        } else if (data.type === "pong") {
            this.heartbeat()
        } else if (data.s < expectedServer) {
            // Receive a message already received at least once. Ignore.
            return
        } else if (data.s > expectedServer) {
            // Messages from the server have been lost.
            // Request resend.
            this.waitForWS()
                .then(() =>
                    this.ws.send(
                        JSON.stringify({
                            type: "request_resend",
                            from: this.messages.server
                        })
                    )
                )
                .catch(() => {
                    // Connection not ready, we will handle this on reconnection
                })
        } else {
            this.messages.server = expectedServer
            if (data.c === this.messages.client) {
                this.receive(data)
            } else if (data.c < this.messages.client) {
                // We have received all server messages, but the server seems
                // to have missed some of the client's messages. They could
                // have been sent simultaneously.
                // The server wins over the client in this case.
                this.waitForWS().then(() => {
                    const clientDifference = this.messages.client - data.c
                    this.messages.client = data.c
                    if (clientDifference > this.messages.lastTen.length) {
                        // We cannot fix the situation
                        this.send(this.restartMessage)
                        return
                    }
                    this.messages["lastTen"]
                        .slice(0 - clientDifference)
                        .forEach(data => {
                            this.messages.client += 1
                            data.c = this.messages.client
                            data.s = this.messages.server

                            this.ws.send(JSON.stringify(data))
                        })
                    this.receive(data)
                })
            }
        }
    }

    onclose() {
        this.connected = false
        window.setTimeout(() => {
            this.createWSConnection()
        }, 2000)
        if (!this.appLoaded()) {
            // doc not initiated
            return
        }

        const messagesElement = this.messagesElement()
        if (messagesElement) {
            if (this.anythingToSend()) {
                messagesElement.innerHTML = `<span class="warn">${this.warningNotAllSent}</span>`
            } else {
                messagesElement.innerHTML = this.infoDisconnected
            }
        }
    }

    open() {
        const messagesElement = this.messagesElement()
        if (messagesElement) {
            messagesElement.innerHTML = ""
        }
        this.connected = true

        const message = this.initialMessage()
        this.connectionCount++
        this.oldMessages = this.messagesToSend
        this.messagesToSend = []

        this.send(() => message)
    }

    subscribed() {
        if (this.connectionCount > 1) {
            this.resubScribed()
        }
        while (this.oldMessages.length > 0) {
            this.send(this.oldMessages.shift())
        }
    }

    /** Sends data to server or keeps it in a list if currently offline. */
    send(getData, timer = 80) {
        if (this.connected && this.ws.readyState !== this.ws.OPEN) {
            this.ws.close()
            return
        }
        if (this.connected && !this.recentlySent) {
            const data = getData()
            if (!data) {
                // message is empty
                return
            }
            this.messages.client += 1
            data.c = this.messages.client
            data.s = this.messages.server
            this.messages.lastTen.push(data)
            this.messages.lastTen = this.messages["lastTen"].slice(-10)

            this.waitForWS()
                .then(() => {
                    this.ws.send(JSON.stringify(data))
                    this.setRecentlySentTimer(timer)
                })
                .catch(() => {
                    // Failed to send - likely WebSocket is not open
                    // Put the message back into the queue
                    this.messages.client -= 1
                    this.messagesToSend.unshift(getData)
                    // Remove from lastTen to avoid duplicates
                    this.messages.lastTen = this.messages.lastTen.slice(0, -1)
                })
        } else {
            this.messagesToSend.push(getData)
        }
    }

    setRecentlySentTimer(timer) {
        this.recentlySent = true
        window.setTimeout(() => {
            this.recentlySent = false
            const oldMessages = this.messagesToSend
            this.messagesToSend = []
            while (oldMessages.length > 0) {
                const getData = oldMessages.shift()
                this.send(getData, Math.min(timer * 1.2, 10000))
            }
        }, timer)
    }

    resend_messages(from) {
        return this.waitForWS()
            .then(() => {
                const toSend = this.messages.client - from
                this.messages.client = from
                if (toSend > this.messages.lastTen.length) {
                    // Too many messages requested. Abort.
                    this.send(this.restartMessage)
                    return
                }
                this.messages.lastTen.slice(0 - toSend).forEach(data => {
                    this.messages.client += 1
                    data.c = this.messages.client
                    data.s = this.messages.server
                    this.ws.send(JSON.stringify(data))
                })
            })
            .catch(() => {
                // Could not send messages - WebSocket not ready
                // Will try again when WebSocket is ready
            })
    }

    receive(data) {
        switch (data.type) {
            case "redirect":
                this.base = data.base
                break
            case "welcome":
                this.open()
                break
            case "subscribed":
                this.subscribed()
                this.heartbeat()
                break
            case "access_denied":
                this.failedAuth()
                break
            default:
                this.receiveData(data)
                break
        }
    }

    heartbeat() {
        clearTimeout(this.pingTimer)
        clearTimeout(this.pongTimer)
        this.pingTimer = setTimeout(() => {
            // Don't send ping if WebSocket is not open
            if (this.ws.readyState === this.ws.OPEN) {
                this.ws.send('{"type": "ping"}')
                this.pongTimer = setTimeout(() => {
                    this.listeners.onOffline()
                }, 10000)
            }
        }, 60000)
    }
}


}),
"./node_modules/.pnpm/diff-dom@5.2.1/node_modules/diff-dom/dist/module.js": (function (__unused_rspack_module, __webpack_exports__, __webpack_require__) {
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  DiffDOM: function() { return DiffDOM; },
  TraceLogger: function() { return TraceLogger; },
  nodeToObj: function() { return nodeToObj; },
  stringToObj: function() { return stringToObj; }
});
/******************************************************************************
Copyright (c) Microsoft Corporation.

Permission to use, copy, modify, and/or distribute this software for any
purpose with or without fee is hereby granted.

THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
PERFORMANCE OF THIS SOFTWARE.
***************************************************************************** */
/* global Reflect, Promise, SuppressedError, Symbol */


var __assign = function() {
    __assign = Object.assign || function __assign(t) {
        var arguments$1 = arguments;

        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments$1[i];
            for (var p in s) { if (Object.prototype.hasOwnProperty.call(s, p)) { t[p] = s[p]; } }
        }
        return t;
    };
    return __assign.apply(this, arguments);
};

function __spreadArray(to, from, pack) {
    if (pack || arguments.length === 2) { for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) { ar = Array.prototype.slice.call(from, 0, i); }
            ar[i] = from[i];
        }
    } }
    return to.concat(ar || Array.prototype.slice.call(from));
}

typeof SuppressedError === "function" ? SuppressedError : function (error, suppressed, message) {
    var e = new Error(message);
    return e.name = "SuppressedError", e.error = error, e.suppressed = suppressed, e;
};

var Diff = /** @class */ (function () {
    function Diff(options) {
        if (options === void 0) { options = {}; }
        var _this = this;
        Object.entries(options).forEach(function (_a) {
            var key = _a[0], value = _a[1];
            return (_this[key] = value);
        });
    }
    Diff.prototype.toString = function () {
        return JSON.stringify(this);
    };
    Diff.prototype.setValue = function (aKey, aValue) {
        this[aKey] = aValue;
        return this;
    };
    return Diff;
}());
/**
 * Checks if an element is of a certain type using direct property checking or DOM instanceof
 *
 * @param element The element to check
 * @param elementTypeNames The element type names to check against
 * @param simplifiedCheck If true, uses simplified checking based on nodeName/nodeType
 * @returns boolean indicating if the element matches any of the specified types
 */
function checkElementType(element, simplifiedCheck) {
    var arguments$1 = arguments;

    if (simplifiedCheck === void 0) { simplifiedCheck = false; }
    var elementTypeNames = [];
    for (var _i = 2; _i < arguments.length; _i++) {
        elementTypeNames[_i - 2] = arguments$1[_i];
    }
    if (typeof element === "undefined" || element === null) {
        return false;
    }
    // Simplified check for primitive virtual DOMs without ownerDocument
    if (simplifiedCheck) {
        var simplifiedResult = elementTypeNames.some(function (elementTypeName) {
            // Special case for basic element types
            if (elementTypeName === "Element") {
                // Enhanced check that handles both virtual DOM objects and real DOM elements
                return (element.nodeType === 1 ||
                    (typeof element.nodeName === "string" &&
                        element.nodeName !== "#text" &&
                        element.nodeName !== "#comment") ||
                    // Additional check for real DOM elements that might not have nodeType
                    (element.tagName && typeof element.tagName === "string") ||
                    // Check if it has DOM element-like properties (fallback)
                    (element.setAttribute &&
                        typeof element.setAttribute === "function"));
            }
            if (elementTypeName === "Text") {
                return element.nodeType === 3 || element.nodeName === "#text";
            }
            if (elementTypeName === "Comment") {
                return element.nodeType === 8 || element.nodeName === "#comment";
            }
            // For HTML element types, check nodeName or tagName
            if (elementTypeName.startsWith("HTML") &&
                elementTypeName.endsWith("Element")) {
                var tagName = elementTypeName.slice(4, -7).toLowerCase();
                return ((element.nodeName &&
                    element.nodeName.toLowerCase() === tagName) ||
                    (element.tagName &&
                        element.tagName.toLowerCase() === tagName));
            }
            return false;
        });
        // If simplified check succeeds, return true
        if (simplifiedResult) {
            return true;
        }
        // Fallback to DOM-based check if simplified check fails and element has ownerDocument
        if (element.ownerDocument) {
            return elementTypeNames.some(function (elementTypeName) {
                var _a, _b;
                return typeof ((_b = (_a = element === null || element === void 0 ? void 0 : element.ownerDocument) === null || _a === void 0 ? void 0 : _a.defaultView) === null || _b === void 0 ? void 0 : _b[elementTypeName]) === "function" &&
                    element instanceof
                        element.ownerDocument.defaultView[elementTypeName];
            });
        }
        return false;
    }
    // DOM-based check
    return elementTypeNames.some(function (elementTypeName) {
        var _a, _b;
        // We need to check if the specified type is defined
        // because otherwise instanceof throws an exception.
        return typeof ((_b = (_a = element === null || element === void 0 ? void 0 : element.ownerDocument) === null || _a === void 0 ? void 0 : _a.defaultView) === null || _b === void 0 ? void 0 : _b[elementTypeName]) ===
            "function" &&
            element instanceof
                element.ownerDocument.defaultView[elementTypeName];
    });
}

function objToNode(objNode, insideSvg, options) {
    var node;
    if (objNode.nodeName === "#text") {
        node = options.document.createTextNode(objNode.data);
    }
    else if (objNode.nodeName === "#comment") {
        node = options.document.createComment(objNode.data);
    }
    else {
        if (insideSvg) {
            node = options.document.createElementNS("http://www.w3.org/2000/svg", objNode.nodeName);
            if (objNode.nodeName === "foreignObject") {
                insideSvg = false;
            }
        }
        else if (objNode.nodeName.toLowerCase() === "svg") {
            node = options.document.createElementNS("http://www.w3.org/2000/svg", "svg");
            insideSvg = true;
        }
        else {
            node = options.document.createElement(objNode.nodeName);
        }
        if (objNode.attributes) {
            Object.entries(objNode.attributes).forEach(function (_a) {
                var key = _a[0], value = _a[1];
                return node.setAttribute(key, value);
            });
        }
        if (objNode.childNodes) {
            node = node;
            objNode.childNodes.forEach(function (childNode) {
                return node.appendChild(objToNode(childNode, insideSvg, options));
            });
        }
        if (options.valueDiffing) {
            if (objNode.value &&
                checkElementType(node, options.simplifiedElementCheck, "HTMLButtonElement", "HTMLDataElement", "HTMLInputElement", "HTMLLIElement", "HTMLMeterElement", "HTMLOptionElement", "HTMLProgressElement", "HTMLParamElement")) {
                node.value = objNode.value;
            }
            if (objNode.checked &&
                checkElementType(node, options.simplifiedElementCheck, "HTMLInputElement")) {
                node.checked = objNode.checked;
            }
            if (objNode.selected &&
                checkElementType(node, options.simplifiedElementCheck, "HTMLOptionElement")) {
                node.selected = objNode.selected;
            }
        }
    }
    return node;
}

// ===== Apply a diff =====
var getFromRoute = function (node, route) {
    route = route.slice();
    while (route.length > 0) {
        var c = route.splice(0, 1)[0];
        node = node.childNodes[c];
    }
    return node;
};
function applyDiff(tree, diff, options) {
    var action = diff[options._const.action];
    var route = diff[options._const.route];
    var node;
    if (![options._const.addElement, options._const.addTextElement].includes(action)) {
        // For adding nodes, we calculate the route later on. It's different because it includes the position of the newly added item.
        node = getFromRoute(tree, route);
    }
    var newNode;
    var reference;
    var nodeArray;
    // pre-diff hook
    var info = {
        diff: diff,
        node: node
    };
    if (options.preDiffApply(info)) {
        return true;
    }
    switch (action) {
        case options._const.addAttribute:
            if (!node ||
                !checkElementType(node, options.simplifiedElementCheck, "Element")) {
                return false;
            }
            node.setAttribute(diff[options._const.name], diff[options._const.value]);
            break;
        case options._const.modifyAttribute:
            if (!node ||
                !checkElementType(node, options.simplifiedElementCheck, "Element")) {
                return false;
            }
            node.setAttribute(diff[options._const.name], diff[options._const.newValue]);
            if (checkElementType(node, options.simplifiedElementCheck, "HTMLInputElement") &&
                diff[options._const.name] === "value") {
                node.value = diff[options._const.newValue];
            }
            break;
        case options._const.removeAttribute:
            if (!node ||
                !checkElementType(node, options.simplifiedElementCheck, "Element")) {
                return false;
            }
            node.removeAttribute(diff[options._const.name]);
            break;
        case options._const.modifyTextElement:
            if (!node ||
                !checkElementType(node, options.simplifiedElementCheck, "Text")) {
                return false;
            }
            options.textDiff(node, node.data, diff[options._const.oldValue], diff[options._const.newValue]);
            if (checkElementType(node.parentNode, options.simplifiedElementCheck, "HTMLTextAreaElement")) {
                node.parentNode.value = diff[options._const.newValue];
            }
            break;
        case options._const.modifyValue:
            if (!node || typeof node.value === "undefined") {
                return false;
            }
            node.value = diff[options._const.newValue];
            break;
        case options._const.modifyComment:
            if (!node ||
                !checkElementType(node, options.simplifiedElementCheck, "Comment")) {
                return false;
            }
            options.textDiff(node, node.data, diff[options._const.oldValue], diff[options._const.newValue]);
            break;
        case options._const.modifyChecked:
            if (!node || typeof node.checked === "undefined") {
                return false;
            }
            node.checked = diff[options._const.newValue];
            break;
        case options._const.modifySelected:
            if (!node || typeof node.selected === "undefined") {
                return false;
            }
            node.selected = diff[options._const.newValue];
            break;
        case options._const.replaceElement: {
            var insideSvg = diff[options._const.newValue].nodeName.toLowerCase() === "svg" ||
                node.parentNode.namespaceURI === "http://www.w3.org/2000/svg";
            node.parentNode.replaceChild(objToNode(diff[options._const.newValue], insideSvg, options), node);
            break;
        }
        case options._const.relocateGroup:
            nodeArray = __spreadArray([], new Array(diff[options._const.groupLength]), true).map(function () {
                return node.removeChild(node.childNodes[diff[options._const.from]]);
            });
            nodeArray.forEach(function (childNode, index) {
                if (index === 0) {
                    reference =
                        node.childNodes[diff[options._const.to]];
                }
                node.insertBefore(childNode, reference || null);
            });
            break;
        case options._const.removeElement:
            node.parentNode.removeChild(node);
            break;
        case options._const.addElement: {
            var parentRoute = route.slice();
            var c = parentRoute.splice(parentRoute.length - 1, 1)[0];
            node = getFromRoute(tree, parentRoute);
            if (!checkElementType(node, options.simplifiedElementCheck, "Element")) {
                return false;
            }
            node.insertBefore(objToNode(diff[options._const.element], node.namespaceURI === "http://www.w3.org/2000/svg", options), node.childNodes[c] || null);
            break;
        }
        case options._const.removeTextElement: {
            if (!node || node.nodeType !== 3) {
                return false;
            }
            var parentNode = node.parentNode;
            parentNode.removeChild(node);
            if (checkElementType(parentNode, options.simplifiedElementCheck, "HTMLTextAreaElement")) {
                parentNode.value = "";
            }
            break;
        }
        case options._const.addTextElement: {
            var parentRoute = route.slice();
            var c = parentRoute.splice(parentRoute.length - 1, 1)[0];
            newNode = options.document.createTextNode(diff[options._const.value]);
            node = getFromRoute(tree, parentRoute);
            if (!node.childNodes) {
                return false;
            }
            node.insertBefore(newNode, node.childNodes[c] || null);
            if (checkElementType(node.parentNode, options.simplifiedElementCheck, "HTMLTextAreaElement")) {
                node.parentNode.value = diff[options._const.value];
            }
            break;
        }
        default:
            console.log("unknown action");
    }
    // if a new node was created, we might be interested in its
    // post diff hook
    options.postDiffApply({
        diff: info.diff,
        node: info.node,
        newNode: newNode
    });
    return true;
}
function applyDOM(tree, diffs, options) {
    return diffs.every(function (diff) {
        return applyDiff(tree, diff, options);
    });
}

// ===== Undo a diff =====
function swap(obj, p1, p2) {
    var tmp = obj[p1];
    obj[p1] = obj[p2];
    obj[p2] = tmp;
}
function undoDiff(tree, diff, options) {
    switch (diff[options._const.action]) {
        case options._const.addAttribute:
            diff[options._const.action] = options._const.removeAttribute;
            applyDiff(tree, diff, options);
            break;
        case options._const.modifyAttribute:
            swap(diff, options._const.oldValue, options._const.newValue);
            applyDiff(tree, diff, options);
            break;
        case options._const.removeAttribute:
            diff[options._const.action] = options._const.addAttribute;
            applyDiff(tree, diff, options);
            break;
        case options._const.modifyTextElement:
            swap(diff, options._const.oldValue, options._const.newValue);
            applyDiff(tree, diff, options);
            break;
        case options._const.modifyValue:
            swap(diff, options._const.oldValue, options._const.newValue);
            applyDiff(tree, diff, options);
            break;
        case options._const.modifyComment:
            swap(diff, options._const.oldValue, options._const.newValue);
            applyDiff(tree, diff, options);
            break;
        case options._const.modifyChecked:
            swap(diff, options._const.oldValue, options._const.newValue);
            applyDiff(tree, diff, options);
            break;
        case options._const.modifySelected:
            swap(diff, options._const.oldValue, options._const.newValue);
            applyDiff(tree, diff, options);
            break;
        case options._const.replaceElement:
            swap(diff, options._const.oldValue, options._const.newValue);
            applyDiff(tree, diff, options);
            break;
        case options._const.relocateGroup:
            swap(diff, options._const.from, options._const.to);
            applyDiff(tree, diff, options);
            break;
        case options._const.removeElement:
            diff[options._const.action] = options._const.addElement;
            applyDiff(tree, diff, options);
            break;
        case options._const.addElement:
            diff[options._const.action] = options._const.removeElement;
            applyDiff(tree, diff, options);
            break;
        case options._const.removeTextElement:
            diff[options._const.action] = options._const.addTextElement;
            applyDiff(tree, diff, options);
            break;
        case options._const.addTextElement:
            diff[options._const.action] = options._const.removeTextElement;
            applyDiff(tree, diff, options);
            break;
        default:
            console.log("unknown action");
    }
}
function undoDOM(tree, diffs, options) {
    diffs = diffs.slice();
    diffs.reverse();
    diffs.forEach(function (diff) {
        undoDiff(tree, diff, options);
    });
}

var elementDescriptors = function (el) {
    var output = [];
    output.push(el.nodeName);
    if (el.nodeName !== "#text" && el.nodeName !== "#comment") {
        el = el;
        if (el.attributes) {
            if (el.attributes["class"]) {
                output.push("".concat(el.nodeName, ".").concat(el.attributes["class"].replace(/ /g, ".")));
            }
            if (el.attributes.id) {
                output.push("".concat(el.nodeName, "#").concat(el.attributes.id));
            }
        }
    }
    return output;
};
var findUniqueDescriptors = function (li) {
    var uniqueDescriptors = {};
    var duplicateDescriptors = {};
    li.forEach(function (node) {
        elementDescriptors(node).forEach(function (descriptor) {
            var inUnique = descriptor in uniqueDescriptors;
            var inDupes = descriptor in duplicateDescriptors;
            if (!inUnique && !inDupes) {
                uniqueDescriptors[descriptor] = true;
            }
            else if (inUnique) {
                delete uniqueDescriptors[descriptor];
                duplicateDescriptors[descriptor] = true;
            }
        });
    });
    return uniqueDescriptors;
};
var uniqueInBoth = function (l1, l2) {
    var l1Unique = findUniqueDescriptors(l1);
    var l2Unique = findUniqueDescriptors(l2);
    var inBoth = {};
    Object.keys(l1Unique).forEach(function (key) {
        if (l2Unique[key]) {
            inBoth[key] = true;
        }
    });
    return inBoth;
};
var removeDone = function (tree) {
    delete tree.outerDone;
    delete tree.innerDone;
    delete tree.valueDone;
    if (tree.childNodes) {
        return tree.childNodes.every(removeDone);
    }
    else {
        return true;
    }
};
var cleanNode = function (diffNode) {
    if (Object.prototype.hasOwnProperty.call(diffNode, "data")) {
        var textNode = {
            nodeName: diffNode.nodeName === "#text" ? "#text" : "#comment",
            data: diffNode.data
        };
        return textNode;
    }
    else {
        var elementNode = {
            nodeName: diffNode.nodeName
        };
        diffNode = diffNode;
        if (Object.prototype.hasOwnProperty.call(diffNode, "attributes")) {
            elementNode.attributes = __assign({}, diffNode.attributes);
        }
        if (Object.prototype.hasOwnProperty.call(diffNode, "checked")) {
            elementNode.checked = diffNode.checked;
        }
        if (Object.prototype.hasOwnProperty.call(diffNode, "value")) {
            elementNode.value = diffNode.value;
        }
        if (Object.prototype.hasOwnProperty.call(diffNode, "selected")) {
            elementNode.selected = diffNode.selected;
        }
        if (Object.prototype.hasOwnProperty.call(diffNode, "childNodes")) {
            elementNode.childNodes = diffNode.childNodes.map(function (diffChildNode) {
                return cleanNode(diffChildNode);
            });
        }
        return elementNode;
    }
};
var isEqual = function (e1, e2) {
    if (!["nodeName", "value", "checked", "selected", "data"].every(function (element) {
        if (e1[element] !== e2[element]) {
            return false;
        }
        return true;
    })) {
        return false;
    }
    if (Object.prototype.hasOwnProperty.call(e1, "data")) {
        // Comment or Text
        return true;
    }
    e1 = e1;
    e2 = e2;
    if (Boolean(e1.attributes) !== Boolean(e2.attributes)) {
        return false;
    }
    if (Boolean(e1.childNodes) !== Boolean(e2.childNodes)) {
        return false;
    }
    if (e1.attributes) {
        var e1Attributes = Object.keys(e1.attributes);
        var e2Attributes = Object.keys(e2.attributes);
        if (e1Attributes.length !== e2Attributes.length) {
            return false;
        }
        if (!e1Attributes.every(function (attribute) {
            if (e1.attributes[attribute] !==
                e2.attributes[attribute]) {
                return false;
            }
            return true;
        })) {
            return false;
        }
    }
    if (e1.childNodes) {
        if (e1.childNodes.length !== e2.childNodes.length) {
            return false;
        }
        if (!e1.childNodes.every(function (childNode, index) {
            return isEqual(childNode, e2.childNodes[index]);
        })) {
            return false;
        }
    }
    return true;
};
var roughlyEqual = function (e1, e2, uniqueDescriptors, sameSiblings, preventRecursion) {
    if (preventRecursion === void 0) { preventRecursion = false; }
    if (!e1 || !e2) {
        return false;
    }
    if (e1.nodeName !== e2.nodeName) {
        return false;
    }
    if (["#text", "#comment"].includes(e1.nodeName)) {
        // Note that we initially don't care what the text content of a node is,
        // the mere fact that it's the same tag and "has text" means it's roughly
        // equal, and then we can find out the true text difference later.
        return preventRecursion
            ? true
            : e1.data === e2.data;
    }
    e1 = e1;
    e2 = e2;
    if (e1.nodeName in uniqueDescriptors) {
        return true;
    }
    if (e1.attributes && e2.attributes) {
        if (e1.attributes.id) {
            if (e1.attributes.id !== e2.attributes.id) {
                return false;
            }
            else {
                var idDescriptor = "".concat(e1.nodeName, "#").concat(e1.attributes.id);
                if (idDescriptor in uniqueDescriptors) {
                    return true;
                }
            }
        }
        if (e1.attributes["class"] &&
            e1.attributes["class"] === e2.attributes["class"]) {
            var classDescriptor = "".concat(e1.nodeName, ".").concat(e1.attributes["class"].replace(/ /g, "."));
            if (classDescriptor in uniqueDescriptors) {
                return true;
            }
        }
    }
    if (sameSiblings) {
        return true;
    }
    var nodeList1 = e1.childNodes ? e1.childNodes.slice().reverse() : [];
    var nodeList2 = e2.childNodes ? e2.childNodes.slice().reverse() : [];
    if (nodeList1.length !== nodeList2.length) {
        return false;
    }
    if (preventRecursion) {
        return nodeList1.every(function (element, index) {
            return element.nodeName === nodeList2[index].nodeName;
        });
    }
    else {
        // note: we only allow one level of recursion at any depth. If 'preventRecursion'
        // was not set, we must explicitly force it to true for child iterations.
        var childUniqueDescriptors_1 = uniqueInBoth(nodeList1, nodeList2);
        return nodeList1.every(function (element, index) {
            return roughlyEqual(element, nodeList2[index], childUniqueDescriptors_1, true, true);
        });
    }
};
/**
 * based on https://en.wikibooks.org/wiki/Algorithm_implementation/Strings/Longest_common_substring#JavaScript
 */
var findCommonSubsets = function (c1, c2, marked1, marked2) {
    var lcsSize = 0;
    var index = [];
    var c1Length = c1.length;
    var c2Length = c2.length;
    var // set up the matching table
    matches = __spreadArray([], new Array(c1Length + 1), true).map(function () { return []; });
    var uniqueDescriptors = uniqueInBoth(c1, c2);
    var // If all of the elements are the same tag, id and class, then we can
    // consider them roughly the same even if they have a different number of
    // children. This will reduce removing and re-adding similar elements.
    subsetsSame = c1Length === c2Length;
    if (subsetsSame) {
        c1.some(function (element, i) {
            var c1Desc = elementDescriptors(element);
            var c2Desc = elementDescriptors(c2[i]);
            if (c1Desc.length !== c2Desc.length) {
                subsetsSame = false;
                return true;
            }
            c1Desc.some(function (description, i) {
                if (description !== c2Desc[i]) {
                    subsetsSame = false;
                    return true;
                }
            });
            if (!subsetsSame) {
                return true;
            }
        });
    }
    // fill the matches with distance values
    for (var c1Index = 0; c1Index < c1Length; c1Index++) {
        var c1Element = c1[c1Index];
        for (var c2Index = 0; c2Index < c2Length; c2Index++) {
            var c2Element = c2[c2Index];
            if (!marked1[c1Index] &&
                !marked2[c2Index] &&
                roughlyEqual(c1Element, c2Element, uniqueDescriptors, subsetsSame)) {
                matches[c1Index + 1][c2Index + 1] = matches[c1Index][c2Index]
                    ? matches[c1Index][c2Index] + 1
                    : 1;
                if (matches[c1Index + 1][c2Index + 1] >= lcsSize) {
                    lcsSize = matches[c1Index + 1][c2Index + 1];
                    index = [c1Index + 1, c2Index + 1];
                }
            }
            else {
                matches[c1Index + 1][c2Index + 1] = 0;
            }
        }
    }
    if (lcsSize === 0) {
        return false;
    }
    return {
        oldValue: index[0] - lcsSize,
        newValue: index[1] - lcsSize,
        length: lcsSize
    };
};
var makeBooleanArray = function (n, v) {
    return __spreadArray([], new Array(n), true).map(function () { return v; });
};
/**
 * Generate arrays that indicate which node belongs to which subset,
 * or whether it's actually an orphan node, existing in only one
 * of the two trees, rather than somewhere in both.
 *
 * So if t1 = <img><canvas><br>, t2 = <canvas><br><img>.
 * The longest subset is "<canvas><br>" (length 2), so it will group 0.
 * The second longest is "<img>" (length 1), so it will be group 1.
 * gaps1 will therefore be [1,0,0] and gaps2 [0,0,1].
 *
 * If an element is not part of any group, it will stay being 'true', which
 * is the initial value. For example:
 * t1 = <img><p></p><br><canvas>, t2 = <b></b><br><canvas><img>
 *
 * The "<p></p>" and "<b></b>" do only show up in one of the two and will
 * therefore be marked by "true". The remaining parts are parts of the
 * groups 0 and 1:
 * gaps1 = [1, true, 0, 0], gaps2 = [true, 0, 0, 1]
 *
 */
var getGapInformation = function (t1, t2, stable) {
    var gaps1 = t1.childNodes
        ? makeBooleanArray(t1.childNodes.length, true)
        : [];
    var gaps2 = t2.childNodes
        ? makeBooleanArray(t2.childNodes.length, true)
        : [];
    var group = 0;
    // give elements from the same subset the same group number
    stable.forEach(function (subset) {
        var endOld = subset.oldValue + subset.length;
        var endNew = subset.newValue + subset.length;
        for (var j = subset.oldValue; j < endOld; j += 1) {
            gaps1[j] = group;
        }
        for (var j = subset.newValue; j < endNew; j += 1) {
            gaps2[j] = group;
        }
        group += 1;
    });
    return {
        gaps1: gaps1,
        gaps2: gaps2
    };
};
/**
 * Find all matching subsets, based on immediate child differences only.
 */
var markBoth = function (marked1, marked2, subset, i) {
    marked1[subset.oldValue + i] = true;
    marked2[subset.newValue + i] = true;
};
var markSubTrees = function (oldTree, newTree) {
    // note: the child lists are views, and so update as we update old/newTree
    var oldChildren = oldTree.childNodes ? oldTree.childNodes : [];
    var newChildren = newTree.childNodes ? newTree.childNodes : [];
    var marked1 = makeBooleanArray(oldChildren.length, false);
    var marked2 = makeBooleanArray(newChildren.length, false);
    var subsets = [];
    var returnIndex = function () {
        return arguments[1];
    };
    var foundAllSubsets = false;
    var _loop_1 = function () {
        var subset = findCommonSubsets(oldChildren, newChildren, marked1, marked2);
        if (subset) {
            subsets.push(subset);
            var subsetArray = __spreadArray([], new Array(subset.length), true).map(returnIndex);
            subsetArray.forEach(function (item) {
                return markBoth(marked1, marked2, subset, item);
            });
        }
        else {
            foundAllSubsets = true;
        }
    };
    while (!foundAllSubsets) {
        _loop_1();
    }
    oldTree.subsets = subsets;
    oldTree.subsetsAge = 100;
    return subsets;
};
var DiffTracker = /** @class */ (function () {
    function DiffTracker() {
        this.list = [];
    }
    DiffTracker.prototype.add = function (diffs) {
        var _a;
        (_a = this.list).push.apply(_a, diffs);
    };
    DiffTracker.prototype.forEach = function (fn) {
        this.list.forEach(function (li) { return fn(li); });
    };
    return DiffTracker;
}());

// ===== Apply a virtual diff =====
function getFromVirtualRoute(tree, route) {
    var node = tree;
    var parentNode;
    var nodeIndex;
    route = route.slice();
    while (route.length > 0) {
        nodeIndex = route.splice(0, 1)[0];
        parentNode = node;
        node = node.childNodes ? node.childNodes[nodeIndex] : undefined;
    }
    return {
        node: node,
        parentNode: parentNode,
        nodeIndex: nodeIndex
    };
}
function applyVirtualDiff(tree, diff, options) {
    var _a;
    var node, parentNode, nodeIndex;
    if (![options._const.addElement, options._const.addTextElement].includes(diff[options._const.action])) {
        // For adding nodes, we calculate the route later on. It's different because it includes the position of the newly added item.
        var routeInfo = getFromVirtualRoute(tree, diff[options._const.route]);
        node = routeInfo.node;
        parentNode = routeInfo.parentNode;
        nodeIndex = routeInfo.nodeIndex;
    }
    var newSubsets = [];
    // pre-diff hook
    var info = {
        diff: diff,
        node: node
    };
    if (options.preVirtualDiffApply(info)) {
        return true;
    }
    var newNode;
    var nodeArray;
    var route;
    switch (diff[options._const.action]) {
        case options._const.addAttribute:
            if (!node.attributes) {
                node.attributes = {};
            }
            node.attributes[diff[options._const.name]] =
                diff[options._const.value];
            if (diff[options._const.name] === "checked") {
                node.checked = true;
            }
            else if (diff[options._const.name] === "selected") {
                node.selected = true;
            }
            else if (node.nodeName === "INPUT" &&
                diff[options._const.name] === "value") {
                node.value = diff[options._const.value];
            }
            break;
        case options._const.modifyAttribute:
            node.attributes[diff[options._const.name]] =
                diff[options._const.newValue];
            break;
        case options._const.removeAttribute:
            delete node.attributes[diff[options._const.name]];
            if (Object.keys(node.attributes).length === 0) {
                delete node.attributes;
            }
            if (diff[options._const.name] === "checked") {
                node.checked = false;
            }
            else if (diff[options._const.name] === "selected") {
                delete node.selected;
            }
            else if (node.nodeName === "INPUT" &&
                diff[options._const.name] === "value") {
                delete node.value;
            }
            break;
        case options._const.modifyTextElement:
            node.data = diff[options._const.newValue];
            if (parentNode.nodeName === "TEXTAREA") {
                parentNode.value = diff[options._const.newValue];
            }
            break;
        case options._const.modifyValue:
            node.value = diff[options._const.newValue];
            break;
        case options._const.modifyComment:
            node.data = diff[options._const.newValue];
            break;
        case options._const.modifyChecked:
            node.checked = diff[options._const.newValue];
            break;
        case options._const.modifySelected:
            node.selected = diff[options._const.newValue];
            break;
        case options._const.replaceElement:
            newNode = cleanNode(diff[options._const.newValue]);
            parentNode.childNodes[nodeIndex] = newNode;
            break;
        case options._const.relocateGroup:
            nodeArray = node.childNodes
                .splice(diff[options._const.from], diff[options._const.groupLength])
                .reverse();
            nodeArray.forEach(function (movedNode) {
                return node.childNodes.splice(diff[options._const.to], 0, movedNode);
            });
            if (node.subsets) {
                node.subsets.forEach(function (map) {
                    if (diff[options._const.from] < diff[options._const.to] &&
                        map.oldValue <= diff[options._const.to] &&
                        map.oldValue > diff[options._const.from]) {
                        map.oldValue -= diff[options._const.groupLength];
                        var splitLength = map.oldValue + map.length - diff[options._const.to];
                        if (splitLength > 0) {
                            // new insertion splits map.
                            newSubsets.push({
                                oldValue: diff[options._const.to] +
                                    diff[options._const.groupLength],
                                newValue: map.newValue + map.length - splitLength,
                                length: splitLength
                            });
                            map.length -= splitLength;
                        }
                    }
                    else if (diff[options._const.from] > diff[options._const.to] &&
                        map.oldValue > diff[options._const.to] &&
                        map.oldValue < diff[options._const.from]) {
                        map.oldValue += diff[options._const.groupLength];
                        var splitLength = map.oldValue + map.length - diff[options._const.to];
                        if (splitLength > 0) {
                            // new insertion splits map.
                            newSubsets.push({
                                oldValue: diff[options._const.to] +
                                    diff[options._const.groupLength],
                                newValue: map.newValue + map.length - splitLength,
                                length: splitLength
                            });
                            map.length -= splitLength;
                        }
                    }
                    else if (map.oldValue === diff[options._const.from]) {
                        map.oldValue = diff[options._const.to];
                    }
                });
            }
            break;
        case options._const.removeElement:
            parentNode.childNodes.splice(nodeIndex, 1);
            if (parentNode.subsets) {
                parentNode.subsets.forEach(function (map) {
                    if (map.oldValue > nodeIndex) {
                        map.oldValue -= 1;
                    }
                    else if (map.oldValue === nodeIndex) {
                        map["delete"] = true;
                    }
                    else if (map.oldValue < nodeIndex &&
                        map.oldValue + map.length > nodeIndex) {
                        if (map.oldValue + map.length - 1 === nodeIndex) {
                            map.length--;
                        }
                        else {
                            newSubsets.push({
                                newValue: map.newValue + nodeIndex - map.oldValue,
                                oldValue: nodeIndex,
                                length: map.length - nodeIndex + map.oldValue - 1
                            });
                            map.length = nodeIndex - map.oldValue;
                        }
                    }
                });
            }
            node = parentNode;
            break;
        case options._const.addElement: {
            route = diff[options._const.route].slice();
            var c_1 = route.splice(route.length - 1, 1)[0];
            node = (_a = getFromVirtualRoute(tree, route)) === null || _a === void 0 ? void 0 : _a.node;
            newNode = cleanNode(diff[options._const.element]);
            if (!node.childNodes) {
                node.childNodes = [];
            }
            if (c_1 >= node.childNodes.length) {
                node.childNodes.push(newNode);
            }
            else {
                node.childNodes.splice(c_1, 0, newNode);
            }
            if (node.subsets) {
                node.subsets.forEach(function (map) {
                    if (map.oldValue >= c_1) {
                        map.oldValue += 1;
                    }
                    else if (map.oldValue < c_1 &&
                        map.oldValue + map.length > c_1) {
                        var splitLength = map.oldValue + map.length - c_1;
                        newSubsets.push({
                            newValue: map.newValue + map.length - splitLength,
                            oldValue: c_1 + 1,
                            length: splitLength
                        });
                        map.length -= splitLength;
                    }
                });
            }
            break;
        }
        case options._const.removeTextElement:
            parentNode.childNodes.splice(nodeIndex, 1);
            if (parentNode.nodeName === "TEXTAREA") {
                delete parentNode.value;
            }
            if (parentNode.subsets) {
                parentNode.subsets.forEach(function (map) {
                    if (map.oldValue > nodeIndex) {
                        map.oldValue -= 1;
                    }
                    else if (map.oldValue === nodeIndex) {
                        map["delete"] = true;
                    }
                    else if (map.oldValue < nodeIndex &&
                        map.oldValue + map.length > nodeIndex) {
                        if (map.oldValue + map.length - 1 === nodeIndex) {
                            map.length--;
                        }
                        else {
                            newSubsets.push({
                                newValue: map.newValue + nodeIndex - map.oldValue,
                                oldValue: nodeIndex,
                                length: map.length - nodeIndex + map.oldValue - 1
                            });
                            map.length = nodeIndex - map.oldValue;
                        }
                    }
                });
            }
            node = parentNode;
            break;
        case options._const.addTextElement: {
            route = diff[options._const.route].slice();
            var c_2 = route.splice(route.length - 1, 1)[0];
            newNode = {
                nodeName: "#text",
                data: diff[options._const.value]
            };
            node = getFromVirtualRoute(tree, route).node;
            if (!node.childNodes) {
                node.childNodes = [];
            }
            if (c_2 >= node.childNodes.length) {
                node.childNodes.push(newNode);
            }
            else {
                node.childNodes.splice(c_2, 0, newNode);
            }
            if (node.nodeName === "TEXTAREA") {
                node.value = diff[options._const.newValue];
            }
            if (node.subsets) {
                node.subsets.forEach(function (map) {
                    if (map.oldValue >= c_2) {
                        map.oldValue += 1;
                    }
                    if (map.oldValue < c_2 && map.oldValue + map.length > c_2) {
                        var splitLength = map.oldValue + map.length - c_2;
                        newSubsets.push({
                            newValue: map.newValue + map.length - splitLength,
                            oldValue: c_2 + 1,
                            length: splitLength
                        });
                        map.length -= splitLength;
                    }
                });
            }
            break;
        }
        default:
            console.log("unknown action");
    }
    if (node.subsets) {
        node.subsets = node.subsets.filter(function (map) { return !map["delete"] && map.oldValue !== map.newValue; });
        if (newSubsets.length) {
            node.subsets = node.subsets.concat(newSubsets);
        }
    }
    options.postVirtualDiffApply({
        node: info.node,
        diff: info.diff,
        newNode: newNode
    });
    return;
}
function applyVirtual(tree, diffs, options) {
    diffs.forEach(function (diff) {
        applyVirtualDiff(tree, diff, options);
    });
    return true;
}

function nodeToObj(aNode, options) {
    if (options === void 0) { options = {
        valueDiffing: true,
        simplifiedElementCheck: true
    }; }
    var objNode = {
        nodeName: aNode.nodeName
    };
    if (checkElementType(aNode, options.simplifiedElementCheck, "Text", "Comment")) {
        objNode.data = aNode.data;
    }
    else {
        if (aNode.attributes && aNode.attributes.length > 0) {
            objNode.attributes = {};
            var nodeArray = Array.prototype.slice.call(aNode.attributes);
            nodeArray.forEach(function (attribute) {
                return (objNode.attributes[attribute.name] = attribute.value);
            });
        }
        if (aNode.childNodes && aNode.childNodes.length > 0) {
            objNode.childNodes = [];
            var nodeArray = Array.prototype.slice.call(aNode.childNodes);
            nodeArray.forEach(function (childNode) {
                return objNode.childNodes.push(nodeToObj(childNode, options));
            });
        }
        if (options.valueDiffing) {
            if (checkElementType(aNode, options.simplifiedElementCheck, "HTMLTextAreaElement")) {
                objNode.value = aNode.value;
            }
            if (checkElementType(aNode, options.simplifiedElementCheck, "HTMLInputElement") &&
                ["radio", "checkbox"].includes(aNode.type.toLowerCase()) &&
                aNode.checked !== undefined) {
                objNode.checked = aNode.checked;
            }
            else if (checkElementType(aNode, options.simplifiedElementCheck, "HTMLButtonElement", "HTMLDataElement", "HTMLInputElement", "HTMLLIElement", "HTMLMeterElement", "HTMLOptionElement", "HTMLProgressElement", "HTMLParamElement")) {
                objNode.value = aNode.value;
            }
            if (checkElementType(aNode, options.simplifiedElementCheck, "HTMLOptionElement")) {
                objNode.selected = aNode.selected;
            }
        }
    }
    return objNode;
}

// from html-parse-stringify (MIT)
var tagRE = /<\s*\/*[a-zA-Z:_][a-zA-Z0-9:_\-.]*\s*(?:"[^"]*"['"]*|'[^']*'['"]*|[^'"/>])*\/*\s*>|<!--(?:.|\n|\r)*?-->/g;
var attrRE = /\s([^'"/\s><]+?)[\s/>]|([^\s=]+)=\s?("[^"]*"|'[^']*')/g;
function unescape(string) {
    return string
        .replace(/&lt;/g, "<")
        .replace(/&gt;/g, ">")
        .replace(/&amp;/g, "&");
}
// create optimized lookup object for
// void elements as listed here:
// https://www.w3.org/html/wg/drafts/html/master/syntax.html#void-elements
var lookup = {
    area: true,
    base: true,
    br: true,
    col: true,
    embed: true,
    hr: true,
    img: true,
    input: true,
    keygen: true,
    link: true,
    menuItem: true,
    meta: true,
    param: true,
    source: true,
    track: true,
    wbr: true
};
var parseTag = function (tag, caseSensitive) {
    var res = {
        nodeName: "",
        attributes: {}
    };
    var voidElement = false;
    var type = "tag";
    var tagMatch = tag.match(/<\/?([^\s]+?)[/\s>]/);
    if (tagMatch) {
        res.nodeName =
            caseSensitive || tagMatch[1] === "svg"
                ? tagMatch[1]
                : tagMatch[1].toUpperCase();
        if (lookup[tagMatch[1]] || tag.charAt(tag.length - 2) === "/") {
            voidElement = true;
        }
        // handle comment tag
        if (res.nodeName.startsWith("!--")) {
            var endIndex = tag.indexOf("-->");
            return {
                type: "comment",
                node: {
                    nodeName: "#comment",
                    data: endIndex !== -1 ? tag.slice(4, endIndex) : ""
                },
                voidElement: voidElement
            };
        }
    }
    var reg = new RegExp(attrRE);
    var result = null;
    var done = false;
    while (!done) {
        result = reg.exec(tag);
        if (result === null) {
            done = true;
        }
        else if (result[0].trim()) {
            if (result[1]) {
                var attr = result[1].trim();
                var arr = [attr, ""];
                if (attr.indexOf("=") > -1)
                    { arr = attr.split("="); }
                res.attributes[arr[0]] = arr[1];
                reg.lastIndex--;
            }
            else if (result[2])
                { res.attributes[result[2]] = result[3]
                    .trim()
                    .substring(1, result[3].length - 1); }
        }
    }
    return {
        type: type,
        node: res,
        voidElement: voidElement
    };
};
var stringToObj = function (html, options) {
    if (options === void 0) { options = {
        valueDiffing: true,
        caseSensitive: false
    }; }
    var result = [];
    var current;
    var level = -1;
    var arr = [];
    var inComponent = false, insideSvg = false;
    // handle text at top level
    if (html.indexOf("<") !== 0) {
        var end = html.indexOf("<");
        result.push({
            nodeName: "#text",
            data: end === -1 ? html : html.substring(0, end)
        });
    }
    html.replace(tagRE, function (tag, index) {
        var isOpen = tag.charAt(1) !== "/";
        var isComment = tag.startsWith("<!--");
        var start = index + tag.length;
        var nextChar = html.charAt(start);
        if (isComment) {
            var comment = parseTag(tag, options.caseSensitive).node;
            // if we're at root, push new base node
            if (level < 0) {
                result.push(comment);
                return "";
            }
            var parent_1 = arr[level];
            if (parent_1 && comment.nodeName) {
                if (!parent_1.node.childNodes) {
                    parent_1.node.childNodes = [];
                }
                parent_1.node.childNodes.push(comment);
            }
            return "";
        }
        if (isOpen) {
            current = parseTag(tag, options.caseSensitive || insideSvg);
            if (current.node.nodeName === "svg") {
                insideSvg = true;
            }
            level++;
            if (!current.voidElement &&
                !inComponent &&
                nextChar &&
                nextChar !== "<") {
                if (!current.node.childNodes) {
                    current.node.childNodes = [];
                }
                var data = unescape(html.slice(start, html.indexOf("<", start)));
                current.node.childNodes.push({
                    nodeName: "#text",
                    data: data
                });
                if (options.valueDiffing &&
                    current.node.nodeName === "TEXTAREA") {
                    current.node.value = data;
                }
            }
            // if we're at root, push new base node
            if (level === 0 && current.node.nodeName) {
                result.push(current.node);
            }
            var parent_2 = arr[level - 1];
            if (parent_2 && current.node.nodeName) {
                if (!parent_2.node.childNodes) {
                    parent_2.node.childNodes = [];
                }
                parent_2.node.childNodes.push(current.node);
            }
            arr[level] = current;
        }
        if (!isOpen || current.voidElement) {
            if (level > -1 &&
                (current.voidElement ||
                    (options.caseSensitive &&
                        current.node.nodeName === tag.slice(2, -1)) ||
                    (!options.caseSensitive &&
                        current.node.nodeName.toUpperCase() ===
                            tag.slice(2, -1).toUpperCase()))) {
                level--;
                // move current up a level to match the end tag
                if (level > -1) {
                    if (current.node.nodeName === "svg") {
                        insideSvg = false;
                    }
                    current = arr[level];
                }
            }
            if (nextChar !== "<" && nextChar) {
                // trailing text node
                // if we're at the root, push a base text node. otherwise add as
                // a child to the current node.
                var childNodes = level === -1 ? result : arr[level].node.childNodes || [];
                // calculate correct end of the data slice in case there's
                // no tag after the text node.
                var end = html.indexOf("<", start);
                var data = unescape(html.slice(start, end === -1 ? undefined : end));
                childNodes.push({
                    nodeName: "#text",
                    data: data
                });
            }
        }
        return "";
    });
    return result[0];
};

// ===== Create a diff =====
var DiffFinder = /** @class */ (function () {
    function DiffFinder(t1Node, t2Node, options) {
        this.options = options;
        this.t1 = (typeof Element !== "undefined" &&
            checkElementType(t1Node, this.options.simplifiedElementCheck, "Element")
            ? nodeToObj(t1Node, this.options)
            : typeof t1Node === "string"
                ? stringToObj(t1Node, this.options)
                : JSON.parse(JSON.stringify(t1Node)));
        this.t2 = (typeof Element !== "undefined" &&
            checkElementType(t2Node, this.options.simplifiedElementCheck, "Element")
            ? nodeToObj(t2Node, this.options)
            : typeof t2Node === "string"
                ? stringToObj(t2Node, this.options)
                : JSON.parse(JSON.stringify(t2Node)));
        this.diffcount = 0;
        this.foundAll = false;
        if (this.debug) {
            this.t1Orig =
                typeof Element !== "undefined" &&
                    checkElementType(t1Node, this.options.simplifiedElementCheck, "Element")
                    ? nodeToObj(t1Node, this.options)
                    : typeof t1Node === "string"
                        ? stringToObj(t1Node, this.options)
                        : JSON.parse(JSON.stringify(t1Node));
            this.t2Orig =
                typeof Element !== "undefined" &&
                    checkElementType(t2Node, this.options.simplifiedElementCheck, "Element")
                    ? nodeToObj(t2Node, this.options)
                    : typeof t2Node === "string"
                        ? stringToObj(t2Node, this.options)
                        : JSON.parse(JSON.stringify(t2Node));
        }
        this.tracker = new DiffTracker();
    }
    DiffFinder.prototype.init = function () {
        return this.findDiffs(this.t1, this.t2);
    };
    DiffFinder.prototype.findDiffs = function (t1, t2) {
        var diffs;
        do {
            if (this.options.debug) {
                this.diffcount += 1;
                if (this.diffcount > this.options.diffcap) {
                    throw new Error("surpassed diffcap:".concat(JSON.stringify(this.t1Orig), " -> ").concat(JSON.stringify(this.t2Orig)));
                }
            }
            diffs = this.findNextDiff(t1, t2, []);
            if (diffs.length === 0) {
                // Last check if the elements really are the same now.
                // If not, remove all info about being done and start over.
                // Sometimes a node can be marked as done, but the creation of subsequent diffs means that it has to be changed again.
                if (!isEqual(t1, t2)) {
                    if (this.foundAll) {
                        console.error("Could not find remaining diffs!");
                    }
                    else {
                        this.foundAll = true;
                        removeDone(t1);
                        diffs = this.findNextDiff(t1, t2, []);
                    }
                }
            }
            if (diffs.length > 0) {
                this.foundAll = false;
                this.tracker.add(diffs);
                applyVirtual(t1, diffs, this.options);
            }
        } while (diffs.length > 0);
        return this.tracker.list;
    };
    DiffFinder.prototype.findNextDiff = function (t1, t2, route) {
        var diffs;
        var fdiffs;
        if (this.options.maxDepth && route.length > this.options.maxDepth) {
            return [];
        }
        // outer differences?
        if (!t1.outerDone) {
            diffs = this.findOuterDiff(t1, t2, route);
            if (this.options.filterOuterDiff) {
                fdiffs = this.options.filterOuterDiff(t1, t2, diffs);
                if (fdiffs)
                    { diffs = fdiffs; }
            }
            if (diffs.length > 0) {
                t1.outerDone = true;
                return diffs;
            }
            else {
                t1.outerDone = true;
            }
        }
        if (Object.prototype.hasOwnProperty.call(t1, "data")) {
            // Comment or Text
            return [];
        }
        t1 = t1;
        t2 = t2;
        // inner differences?
        if (!t1.innerDone) {
            diffs = this.findInnerDiff(t1, t2, route);
            if (diffs.length > 0) {
                return diffs;
            }
            else {
                t1.innerDone = true;
            }
        }
        if (this.options.valueDiffing && !t1.valueDone) {
            // value differences?
            diffs = this.findValueDiff(t1, t2, route);
            if (diffs.length > 0) {
                t1.valueDone = true;
                return diffs;
            }
            else {
                t1.valueDone = true;
            }
        }
        // no differences
        return [];
    };
    DiffFinder.prototype.findOuterDiff = function (t1, t2, route) {
        var diffs = [];
        var attr;
        var attr1;
        var attr2;
        var attrLength;
        var pos;
        var i;
        if (t1.nodeName !== t2.nodeName) {
            if (!route.length) {
                throw new Error("Top level nodes have to be of the same kind.");
            }
            return [
                new Diff()
                    .setValue(this.options._const.action, this.options._const.replaceElement)
                    .setValue(this.options._const.oldValue, cleanNode(t1))
                    .setValue(this.options._const.newValue, cleanNode(t2))
                    .setValue(this.options._const.route, route) ];
        }
        if (route.length &&
            this.options.diffcap <
                Math.abs((t1.childNodes || []).length - (t2.childNodes || []).length)) {
            return [
                new Diff()
                    .setValue(this.options._const.action, this.options._const.replaceElement)
                    .setValue(this.options._const.oldValue, cleanNode(t1))
                    .setValue(this.options._const.newValue, cleanNode(t2))
                    .setValue(this.options._const.route, route) ];
        }
        if (Object.prototype.hasOwnProperty.call(t1, "data") &&
            t1.data !== t2.data) {
            // Comment or text node.
            if (t1.nodeName === "#text") {
                return [
                    new Diff()
                        .setValue(this.options._const.action, this.options._const.modifyTextElement)
                        .setValue(this.options._const.route, route)
                        .setValue(this.options._const.oldValue, t1.data)
                        .setValue(this.options._const.newValue, t2.data) ];
            }
            else {
                return [
                    new Diff()
                        .setValue(this.options._const.action, this.options._const.modifyComment)
                        .setValue(this.options._const.route, route)
                        .setValue(this.options._const.oldValue, t1.data)
                        .setValue(this.options._const.newValue, t2.data) ];
            }
        }
        t1 = t1;
        t2 = t2;
        attr1 = t1.attributes ? Object.keys(t1.attributes).sort() : [];
        attr2 = t2.attributes ? Object.keys(t2.attributes).sort() : [];
        attrLength = attr1.length;
        for (i = 0; i < attrLength; i++) {
            attr = attr1[i];
            pos = attr2.indexOf(attr);
            if (pos === -1) {
                diffs.push(new Diff()
                    .setValue(this.options._const.action, this.options._const.removeAttribute)
                    .setValue(this.options._const.route, route)
                    .setValue(this.options._const.name, attr)
                    .setValue(this.options._const.value, t1.attributes[attr]));
            }
            else {
                attr2.splice(pos, 1);
                if (t1.attributes[attr] !== t2.attributes[attr]) {
                    diffs.push(new Diff()
                        .setValue(this.options._const.action, this.options._const.modifyAttribute)
                        .setValue(this.options._const.route, route)
                        .setValue(this.options._const.name, attr)
                        .setValue(this.options._const.oldValue, t1.attributes[attr])
                        .setValue(this.options._const.newValue, t2.attributes[attr]));
                }
            }
        }
        attrLength = attr2.length;
        for (i = 0; i < attrLength; i++) {
            attr = attr2[i];
            diffs.push(new Diff()
                .setValue(this.options._const.action, this.options._const.addAttribute)
                .setValue(this.options._const.route, route)
                .setValue(this.options._const.name, attr)
                .setValue(this.options._const.value, t2.attributes[attr]));
        }
        return diffs;
    };
    DiffFinder.prototype.findInnerDiff = function (t1, t2, route) {
        var t1ChildNodes = t1.childNodes ? t1.childNodes.slice() : [];
        var t2ChildNodes = t2.childNodes ? t2.childNodes.slice() : [];
        var last = Math.max(t1ChildNodes.length, t2ChildNodes.length);
        var childNodesLengthDifference = Math.abs(t1ChildNodes.length - t2ChildNodes.length);
        var diffs = [];
        var index = 0;
        if (!this.options.maxChildCount || last < this.options.maxChildCount) {
            var cachedSubtrees = Boolean(t1.subsets && t1.subsetsAge--);
            var subtrees = cachedSubtrees
                ? t1.subsets
                : t1.childNodes && t2.childNodes
                    ? markSubTrees(t1, t2)
                    : [];
            if (subtrees.length > 0) {
                /* One or more groups have been identified among the childnodes of t1
                 * and t2.
                 */
                diffs = this.attemptGroupRelocation(t1, t2, subtrees, route, cachedSubtrees);
                if (diffs.length > 0) {
                    return diffs;
                }
            }
        }
        /* 0 or 1 groups of similar child nodes have been found
         * for t1 and t2. 1 If there is 1, it could be a sign that the
         * contents are the same. When the number of groups is below 2,
         * t1 and t2 are made to have the same length and each of the
         * pairs of child nodes are diffed.
         */
        for (var i = 0; i < last; i += 1) {
            var e1 = t1ChildNodes[i];
            var e2 = t2ChildNodes[i];
            if (childNodesLengthDifference) {
                /* t1 and t2 have different amounts of childNodes. Add
                 * and remove as necessary to obtain the same length */
                if (e1 && !e2) {
                    if (e1.nodeName === "#text") {
                        diffs.push(new Diff()
                            .setValue(this.options._const.action, this.options._const.removeTextElement)
                            .setValue(this.options._const.route, route.concat(index))
                            .setValue(this.options._const.value, e1.data));
                        index -= 1;
                    }
                    else {
                        diffs.push(new Diff()
                            .setValue(this.options._const.action, this.options._const.removeElement)
                            .setValue(this.options._const.route, route.concat(index))
                            .setValue(this.options._const.element, cleanNode(e1)));
                        index -= 1;
                    }
                }
                else if (e2 && !e1) {
                    if (e2.nodeName === "#text") {
                        diffs.push(new Diff()
                            .setValue(this.options._const.action, this.options._const.addTextElement)
                            .setValue(this.options._const.route, route.concat(index))
                            .setValue(this.options._const.value, e2.data));
                    }
                    else {
                        diffs.push(new Diff()
                            .setValue(this.options._const.action, this.options._const.addElement)
                            .setValue(this.options._const.route, route.concat(index))
                            .setValue(this.options._const.element, cleanNode(e2)));
                    }
                }
            }
            /* We are now guaranteed that childNodes e1 and e2 exist,
             * and that they can be diffed.
             */
            /* Diffs in child nodes should not affect the parent node,
             * so we let these diffs be submitted together with other
             * diffs.
             */
            if (e1 && e2) {
                if (!this.options.maxChildCount ||
                    last < this.options.maxChildCount) {
                    diffs = diffs.concat(this.findNextDiff(e1, e2, route.concat(index)));
                }
                else if (!isEqual(e1, e2)) {
                    if (t1ChildNodes.length > t2ChildNodes.length) {
                        if (e1.nodeName === "#text") {
                            diffs.push(new Diff()
                                .setValue(this.options._const.action, this.options._const.removeTextElement)
                                .setValue(this.options._const.route, route.concat(index))
                                .setValue(this.options._const.value, e1.data));
                        }
                        else {
                            diffs.push(new Diff()
                                .setValue(this.options._const.action, this.options._const.removeElement)
                                .setValue(this.options._const.element, cleanNode(e1))
                                .setValue(this.options._const.route, route.concat(index)));
                        }
                        t1ChildNodes.splice(i, 1);
                        i -= 1;
                        index -= 1;
                        childNodesLengthDifference -= 1;
                    }
                    else if (t1ChildNodes.length < t2ChildNodes.length) {
                        diffs = diffs.concat([
                            new Diff()
                                .setValue(this.options._const.action, this.options._const.addElement)
                                .setValue(this.options._const.element, cleanNode(e2))
                                .setValue(this.options._const.route, route.concat(index)) ]);
                        t1ChildNodes.splice(i, 0, cleanNode(e2));
                        childNodesLengthDifference -= 1;
                    }
                    else {
                        diffs = diffs.concat([
                            new Diff()
                                .setValue(this.options._const.action, this.options._const.replaceElement)
                                .setValue(this.options._const.oldValue, cleanNode(e1))
                                .setValue(this.options._const.newValue, cleanNode(e2))
                                .setValue(this.options._const.route, route.concat(index)) ]);
                    }
                }
            }
            index += 1;
        }
        t1.innerDone = true;
        return diffs;
    };
    DiffFinder.prototype.attemptGroupRelocation = function (t1, t2, subtrees, route, cachedSubtrees) {
        /* Either t1.childNodes and t2.childNodes have the same length, or
         * there are at least two groups of similar elements can be found.
         * attempts are made at equalizing t1 with t2. First all initial
         * elements with no group affiliation (gaps=true) are removed (if
         * only in t1) or added (if only in t2). Then the creation of a group
         * relocation diff is attempted.
         */
        var gapInformation = getGapInformation(t1, t2, subtrees);
        var gaps1 = gapInformation.gaps1;
        var gaps2 = gapInformation.gaps2;
        var t1ChildNodes = t1.childNodes.slice();
        var t2ChildNodes = t2.childNodes.slice();
        var shortest = Math.min(gaps1.length, gaps2.length);
        var destinationDifferent;
        var toGroup;
        var group;
        var node;
        var similarNode;
        var diffs = [];
        for (var index2 = 0, index1 = 0; index2 < shortest; index1 += 1, index2 += 1) {
            if (cachedSubtrees &&
                (gaps1[index2] === true || gaps2[index2] === true)) ;
            else if (gaps1[index1] === true) {
                node = t1ChildNodes[index1];
                if (node.nodeName === "#text") {
                    if (t2ChildNodes[index2].nodeName === "#text") {
                        if (node.data !==
                            t2ChildNodes[index2].data) {
                            // Check whether a text node with the same value follows later on.
                            var testI = index1;
                            while (t1ChildNodes.length > testI + 1 &&
                                t1ChildNodes[testI + 1].nodeName === "#text") {
                                testI += 1;
                                if (t2ChildNodes[index2]
                                    .data ===
                                    t1ChildNodes[testI]
                                        .data) {
                                    similarNode = true;
                                    break;
                                }
                            }
                            if (!similarNode) {
                                diffs.push(new Diff()
                                    .setValue(this.options._const.action, this.options._const
                                    .modifyTextElement)
                                    .setValue(this.options._const.route, route.concat(index1))
                                    .setValue(this.options._const.oldValue, node.data)
                                    .setValue(this.options._const.newValue, t2ChildNodes[index2].data));
                            }
                        }
                    }
                    else {
                        diffs.push(new Diff()
                            .setValue(this.options._const.action, this.options._const.removeTextElement)
                            .setValue(this.options._const.route, route.concat(index1))
                            .setValue(this.options._const.value, node.data));
                        gaps1.splice(index1, 1);
                        t1ChildNodes.splice(index1, 1);
                        shortest = Math.min(gaps1.length, gaps2.length);
                        index1 -= 1;
                        index2 -= 1;
                    }
                }
                else if (gaps2[index2] === true) {
                    // both gaps1[index1] and gaps2[index2]  are true.
                    // We replace one element with another.
                    diffs.push(new Diff()
                        .setValue(this.options._const.action, this.options._const.replaceElement)
                        .setValue(this.options._const.oldValue, cleanNode(node))
                        .setValue(this.options._const.newValue, cleanNode(t2ChildNodes[index2]))
                        .setValue(this.options._const.route, route.concat(index1)));
                    // t1ChildNodes at position index1 is not up-to-date, but that does not matter as
                    // index1 will increase +1
                }
                else {
                    diffs.push(new Diff()
                        .setValue(this.options._const.action, this.options._const.removeElement)
                        .setValue(this.options._const.route, route.concat(index1))
                        .setValue(this.options._const.element, cleanNode(node)));
                    gaps1.splice(index1, 1);
                    t1ChildNodes.splice(index1, 1);
                    shortest = Math.min(gaps1.length, gaps2.length);
                    index1 -= 1;
                    index2 -= 1;
                }
            }
            else if (gaps2[index2] === true) {
                node = t2ChildNodes[index2];
                if (node.nodeName === "#text") {
                    diffs.push(new Diff()
                        .setValue(this.options._const.action, this.options._const.addTextElement)
                        .setValue(this.options._const.route, route.concat(index1))
                        .setValue(this.options._const.value, node.data));
                    gaps1.splice(index1, 0, true);
                    t1ChildNodes.splice(index1, 0, {
                        nodeName: "#text",
                        data: node.data
                    });
                    shortest = Math.min(gaps1.length, gaps2.length);
                    //index1 += 1
                }
                else {
                    diffs.push(new Diff()
                        .setValue(this.options._const.action, this.options._const.addElement)
                        .setValue(this.options._const.route, route.concat(index1))
                        .setValue(this.options._const.element, cleanNode(node)));
                    gaps1.splice(index1, 0, true);
                    t1ChildNodes.splice(index1, 0, cleanNode(node));
                    shortest = Math.min(gaps1.length, gaps2.length);
                    //index1 += 1
                }
            }
            else if (gaps1[index1] !== gaps2[index2]) {
                if (diffs.length > 0) {
                    return diffs;
                }
                // group relocation
                group = subtrees[gaps1[index1]];
                toGroup = Math.min(group.newValue, t1ChildNodes.length - group.length);
                if (toGroup !== group.oldValue && toGroup > -1) {
                    // Check whether destination nodes are different than originating ones.
                    destinationDifferent = false;
                    for (var j = 0; j < group.length; j += 1) {
                        if (!roughlyEqual(t1ChildNodes[toGroup + j], t1ChildNodes[group.oldValue + j], {}, false, true)) {
                            destinationDifferent = true;
                        }
                    }
                    if (destinationDifferent) {
                        return [
                            new Diff()
                                .setValue(this.options._const.action, this.options._const.relocateGroup)
                                .setValue(this.options._const.groupLength, group.length)
                                .setValue(this.options._const.from, group.oldValue)
                                .setValue(this.options._const.to, toGroup)
                                .setValue(this.options._const.route, route) ];
                    }
                }
            }
        }
        return diffs;
    };
    DiffFinder.prototype.findValueDiff = function (t1, t2, route) {
        // Differences of value. Only useful if the value/selection/checked value
        // differs from what is represented in the DOM. For example in the case
        // of filled out forms, etc.
        var diffs = [];
        if (t1.selected !== t2.selected) {
            diffs.push(new Diff()
                .setValue(this.options._const.action, this.options._const.modifySelected)
                .setValue(this.options._const.oldValue, t1.selected)
                .setValue(this.options._const.newValue, t2.selected)
                .setValue(this.options._const.route, route));
        }
        if ((t1.value || t2.value) &&
            t1.value !== t2.value &&
            t1.nodeName !== "OPTION") {
            diffs.push(new Diff()
                .setValue(this.options._const.action, this.options._const.modifyValue)
                .setValue(this.options._const.oldValue, t1.value || "")
                .setValue(this.options._const.newValue, t2.value || "")
                .setValue(this.options._const.route, route));
        }
        if (t1.checked !== t2.checked) {
            diffs.push(new Diff()
                .setValue(this.options._const.action, this.options._const.modifyChecked)
                .setValue(this.options._const.oldValue, t1.checked)
                .setValue(this.options._const.newValue, t2.checked)
                .setValue(this.options._const.route, route));
        }
        return diffs;
    };
    return DiffFinder;
}());

var DEFAULT_OPTIONS = {
    debug: false,
    diffcap: 10,
    maxDepth: false,
    maxChildCount: 50,
    valueDiffing: true,
    simplifiedElementCheck: false,
    // syntax: textDiff: function (node, currentValue, expectedValue, newValue)
    textDiff: function (node, currentValue, expectedValue, newValue) {
        node.data = newValue;
        return;
    },
    // empty functions were benchmarked as running faster than both
    // `f && f()` and `if (f) { f(); }`
    preVirtualDiffApply: function () { },
    postVirtualDiffApply: function () { },
    preDiffApply: function () { },
    postDiffApply: function () { },
    filterOuterDiff: null,
    compress: false,
    _const: false,
    document: typeof window !== "undefined" && window.document
        ? window.document
        : false,
    components: []
};
var DiffDOM = /** @class */ (function () {
    function DiffDOM(options) {
        if (options === void 0) { options = {}; }
        // IE11 doesn't have Object.assign and buble doesn't translate object spreaders
        // by default, so this is the safest way of doing it currently.
        Object.entries(DEFAULT_OPTIONS).forEach(function (_a) {
            var key = _a[0], value = _a[1];
            if (!Object.prototype.hasOwnProperty.call(options, key)) {
                options[key] = value;
            }
        });
        if (!options._const) {
            var varNames = [
                "addAttribute",
                "modifyAttribute",
                "removeAttribute",
                "modifyTextElement",
                "relocateGroup",
                "removeElement",
                "addElement",
                "removeTextElement",
                "addTextElement",
                "replaceElement",
                "modifyValue",
                "modifyChecked",
                "modifySelected",
                "modifyComment",
                "action",
                "route",
                "oldValue",
                "newValue",
                "element",
                "group",
                "groupLength",
                "from",
                "to",
                "name",
                "value",
                "data",
                "attributes",
                "nodeName",
                "childNodes",
                "checked",
                "selected" ];
            var constNames_1 = {};
            if (options.compress) {
                varNames.forEach(function (varName, index) { return (constNames_1[varName] = index); });
            }
            else {
                varNames.forEach(function (varName) { return (constNames_1[varName] = varName); });
            }
            options._const = constNames_1;
        }
        this.options = options;
    }
    DiffDOM.prototype.apply = function (tree, diffs) {
        return applyDOM(tree, diffs, this.options);
    };
    DiffDOM.prototype.undo = function (tree, diffs) {
        return undoDOM(tree, diffs, this.options);
    };
    DiffDOM.prototype.diff = function (t1Node, t2Node) {
        var finder = new DiffFinder(t1Node, t2Node, this.options);
        return finder.init();
    };
    return DiffDOM;
}());

/**
 * Use TraceLogger to figure out function calls inside
 * JS objects by wrapping an object with a TraceLogger
 * instance.
 *
 * Pretty-prints the call trace (using unicode box code)
 * when tracelogger.toString() is called.
 */
/**
 * Wrap an object by calling new TraceLogger(obj)
 *
 * If you're familiar with Python decorators, this
 * does roughly the same thing, adding pre/post
 * call hook logging calls so that you can see
 * what's going on.
 */
var TraceLogger = /** @class */ (function () {
    function TraceLogger(obj) {
        if (obj === void 0) { obj = {}; }
        var _this = this;
        this.pad = "│   ";
        this.padding = "";
        this.tick = 1;
        this.messages = [];
        var wrapkey = function (obj, key) {
            // trace this function
            var oldfn = obj[key];
            obj[key] = function () {
                var arguments$1 = arguments;

                var args = [];
                for (var _i = 0; _i < arguments.length; _i++) {
                    args[_i] = arguments$1[_i];
                }
                _this.fin(key, Array.prototype.slice.call(args));
                var result = oldfn.apply(obj, args);
                _this.fout(key, result);
                return result;
            };
        };
        // can't use Object.keys for prototype walking
        for (var key in obj) {
            if (typeof obj[key] === "function") {
                wrapkey(obj, key);
            }
        }
        this.log("┌ TRACELOG START");
    }
    // called when entering a function
    TraceLogger.prototype.fin = function (fn, args) {
        this.padding += this.pad;
        this.log("\u251C\u2500> entering ".concat(fn), args);
    };
    // called when exiting a function
    TraceLogger.prototype.fout = function (fn, result) {
        this.log("│<──┘ generated return value", result);
        this.padding = this.padding.substring(0, this.padding.length - this.pad.length);
    };
    // log message formatting
    TraceLogger.prototype.format = function (s, tick) {
        var nf = function (t) {
            var tStr = "".concat(t);
            while (tStr.length < 4) {
                tStr = "0".concat(t);
            }
            return tStr;
        };
        return "".concat(nf(tick), "> ").concat(this.padding).concat(s);
    };
    // log a trace message
    TraceLogger.prototype.log = function () {
        var arguments$1 = arguments;

        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments$1[_i];
        }
        var stringCollapse = function (v) {
            if (!v) {
                return "<falsey>";
            }
            if (typeof v === "string") {
                return v;
            }
            // Use simplified check for HTMLElement since this is outside the main diff process
            if (checkElementType(v, true, "HTMLElement")) {
                return v.outerHTML || "<empty>";
            }
            if (v instanceof Array) {
                return "[".concat(v.map(stringCollapse).join(","), "]");
            }
            return v.toString() || v.valueOf() || "<unknown>";
        };
        var s = args.map(stringCollapse).join(", ");
        this.messages.push(this.format(s, this.tick++));
    };
    // turn the log into a structured string with
    // unicode box codes to make it a sensible trace.
    TraceLogger.prototype.toString = function () {
        var cap = "×   ";
        var terminator = "└───";
        while (terminator.length <= this.padding.length + this.pad.length) {
            terminator += cap;
        }
        var _ = this.padding;
        this.padding = "";
        terminator = this.format(terminator, this.tick);
        this.padding = _;
        return "".concat(this.messages.join("\n"), "\n").concat(terminator);
    };
    return TraceLogger;
}());




}),
"./node_modules/.pnpm/w3c-keyname@2.2.8/node_modules/w3c-keyname/index.js": (function (__unused_rspack___webpack_module__, __webpack_exports__, __webpack_require__) {
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  base: function() { return base; },
  keyName: function() { return keyName; },
  shift: function() { return shift; }
});
var base = {
  8: "Backspace",
  9: "Tab",
  10: "Enter",
  12: "NumLock",
  13: "Enter",
  16: "Shift",
  17: "Control",
  18: "Alt",
  20: "CapsLock",
  27: "Escape",
  32: " ",
  33: "PageUp",
  34: "PageDown",
  35: "End",
  36: "Home",
  37: "ArrowLeft",
  38: "ArrowUp",
  39: "ArrowRight",
  40: "ArrowDown",
  44: "PrintScreen",
  45: "Insert",
  46: "Delete",
  59: ";",
  61: "=",
  91: "Meta",
  92: "Meta",
  106: "*",
  107: "+",
  108: ",",
  109: "-",
  110: ".",
  111: "/",
  144: "NumLock",
  145: "ScrollLock",
  160: "Shift",
  161: "Shift",
  162: "Control",
  163: "Control",
  164: "Alt",
  165: "Alt",
  173: "-",
  186: ";",
  187: "=",
  188: ",",
  189: "-",
  190: ".",
  191: "/",
  192: "`",
  219: "[",
  220: "\\",
  221: "]",
  222: "'"
}

var shift = {
  48: ")",
  49: "!",
  50: "@",
  51: "#",
  52: "$",
  53: "%",
  54: "^",
  55: "&",
  56: "*",
  57: "(",
  59: ":",
  61: "+",
  173: "_",
  186: ":",
  187: "+",
  188: "<",
  189: "_",
  190: ">",
  191: "?",
  192: "~",
  219: "{",
  220: "|",
  221: "}",
  222: "\""
}

var mac = typeof navigator != "undefined" && /Mac/.test(navigator.platform)
var ie = typeof navigator != "undefined" && /MSIE \d|Trident\/(?:[7-9]|\d{2,})\..*rv:(\d+)/.exec(navigator.userAgent)

// Fill in the digit keys
for (var i = 0; i < 10; i++) base[48 + i] = base[96 + i] = String(i)

// The function keys
for (var i = 1; i <= 24; i++) base[i + 111] = "F" + i

// And the alphabetic keys
for (var i = 65; i <= 90; i++) {
  base[i] = String.fromCharCode(i + 32)
  shift[i] = String.fromCharCode(i)
}

// For each code that doesn't have a shift-equivalent, copy the base name
for (var code in base) if (!shift.hasOwnProperty(code)) shift[code] = base[code]

function keyName(event) {
  // On macOS, keys held with Shift and Cmd don't reflect the effect of Shift in `.key`.
  // On IE, shift effect is never included in `.key`.
  var ignoreKey = mac && event.metaKey && event.shiftKey && !event.ctrlKey && !event.altKey ||
      ie && event.shiftKey && event.key && event.key.length == 1 ||
      event.key == "Unidentified"
  var name = (!ignoreKey && event.key) ||
    (event.shiftKey ? shift : base)[event.keyCode] ||
    event.key || "Unidentified"
  // Edge sometimes produces wrong names (Issue #3)
  if (name == "Esc") name = "Escape"
  if (name == "Del") name = "Delete"
  // https://developer.microsoft.com/en-us/microsoft-edge/platform/issues/8860571/
  if (name == "Left") name = "ArrowLeft"
  if (name == "Up") name = "ArrowUp"
  if (name == "Right") name = "ArrowRight"
  if (name == "Down") name = "ArrowDown"
  return name
}


}),

});
// The module cache
var __webpack_module_cache__ = {};

// The require function
function __webpack_require__(moduleId) {

// Check if module is in cache
var cachedModule = __webpack_module_cache__[moduleId];
if (cachedModule !== undefined) {
return cachedModule.exports;
}
// Create a new module (and put it into the cache)
var module = (__webpack_module_cache__[moduleId] = {
exports: {}
});
// Execute the module function
__webpack_modules__[moduleId](module, module.exports, __webpack_require__);

// Return the exports of the module
return module.exports;

}

// webpack/runtime/define_property_getters
!function() {
__webpack_require__.d = function(exports, definition) {
	for(var key in definition) {
        if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
            Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
        }
    }
};
}();
// webpack/runtime/has_own_property
!function() {
__webpack_require__.o = function(obj, prop) { return Object.prototype.hasOwnProperty.call(obj, prop); }
}();
// webpack/runtime/make_namespace_object
!function() {
// define __esModule on exports
__webpack_require__.r = function(exports) {
	if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
		Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
	}
	Object.defineProperty(exports, '__esModule', { value: true });
};
}();
// webpack/runtime/rspack_version
!function() {
__webpack_require__.rv = function() { return "1.6.7"; }
}();
// webpack/runtime/rspack_unique_id
!function() {
__webpack_require__.ruid = "bundler=rspack@1.6.7";
}();
var __webpack_exports__ = {};
// This entry needs to be wrapped in an IIFE because it needs to be isolated against other modules in the chunk.
!function() {
__webpack_require__.r(__webpack_exports__);
/* import */ var _modules_admin_console_index_js__rspack_import_0 = __webpack_require__("./js/modules/admin_console/index.js");
/* import */ var _modules_common_settings_js__rspack_import_1 = __webpack_require__("./js/modules/common/settings.js");



(0,_modules_common_settings_js__rspack_import_1.initSettings)(window.settings)

const theAdminConsole = new _modules_admin_console_index_js__rspack_import_0.AdminConsole()

theAdminConsole.init()

window.theAdminConsole = theAdminConsole

}();
})()
;