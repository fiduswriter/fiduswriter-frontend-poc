"use strict";
(self["webpackChunkfidus_writer"] = self["webpackChunkfidus_writer"] || []).push([["js_modules_editor_e2ee_encryptor_js-js_modules_images_edit_dialog_model_js"], {
"./js/modules/copyright_dialog/index.js": (function (__unused_rspack_module, __webpack_exports__, __webpack_require__) {
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  CopyrightDialog: function() { return CopyrightDialog; },
  LICENSE_URLS: function() { return LICENSE_URLS; }
});
/* import */ var biblatex_csl_converter__rspack_import_0 = __webpack_require__("./node_modules/.pnpm/biblatex-csl-converter@3.6.0/node_modules/biblatex-csl-converter/lib/index.js");
/* import */ var fast_deep_equal__rspack_import_1 = __webpack_require__("./node_modules/.pnpm/fast-deep-equal@3.1.3/node_modules/fast-deep-equal/index.js");
/* import */ var fast_deep_equal__rspack_import_1_default = /*#__PURE__*/__webpack_require__.n(fast_deep_equal__rspack_import_1);
/* import */ var _common__rspack_import_2 = __webpack_require__("./js/modules/common/index.js");
/* import */ var _templates__rspack_import_3 = __webpack_require__("./js/modules/copyright_dialog/templates.js");





const LICENSE_URLS = [
    ["CC BY 4.0", "https://creativecommons.org/licenses/by/4.0/"],
    ["CC BY-SA 4.0", "https://creativecommons.org/licenses/by-sa/4.0/"],
    ["CC BY-ND 4.0", "https://creativecommons.org/licenses/by-nd/4.0/"],
    ["CC BY-NC 4.0", "https://creativecommons.org/licenses/by-nc/4.0/"],
    ["CC BY-NC-SA 4.0", "https://creativecommons.org/licenses/by-nc-sa/4.0/"],
    ["CC BY-NC-ND 4.0", "https://creativecommons.org/licenses/by-nc-nd/4.0/"],
    ["CC0", "https://creativecommons.org/publicdomain/zero/1.0/"]
]

function getLicenseTitle(url) {
    const license = LICENSE_URLS.find(license => license[1] === url)
    return license ? license[0] : ""
}

class CopyrightDialog {
    constructor(copyright) {
        this.copyright = copyright
        this.origCopyright = copyright
        this.dialog = false
    }

    getCurrentValue() {
        this.copyright = {}
        const holder = this.dialog.dialogEl.querySelector(".holder").value
        this.copyright.holder = holder.length ? holder : false
        const year = this.dialog.dialogEl.querySelector(".year").value
        this.copyright.year = year.length
            ? Math.max(0, Math.min(Number.parseInt(year) || 0, 2100))
            : false
        this.copyright.freeToRead = this.dialog.dialogEl.querySelector(
            ".free-to-read:checked"
        )
            ? true
            : false
        const licenseStartDates = Array.from(
            this.dialog.dialogEl.querySelectorAll(".license-start")
        ).map(el => el.value)
        this.copyright.licenses = Array.from(
            this.dialog.dialogEl.querySelectorAll(".license")
        )
            .map((el, index) => {
                if (!el.value.length) {
                    return false
                } else {
                    const url = el.value,
                        title = el.matches("select")
                            ? getLicenseTitle(url)
                            : el.parentElement.parentElement.querySelector(
                                  ".license-title"
                              ).value,
                        returnValue = {url, title},
                        startDate = (0,biblatex_csl_converter__rspack_import_0.edtfParse)(licenseStartDates[index])
                    if (
                        startDate.valid &&
                        (startDate.type === "Date" ||
                            startDate.type === "YearMonth" ||
                            startDate.type === "Year") &&
                        !startDate.uncertain &&
                        !startDate.approximate
                    ) {
                        returnValue.start = startDate.cleanedString
                    }
                    return returnValue
                }
            })
            .filter(license => license)
    }

    init() {
        return new Promise(resolve => {
            const buttons = []
            buttons.push({
                text: gettext("Change"),
                classes: "fw-dark",
                click: () => {
                    this.dialog.close()
                    this.getCurrentValue()
                    if (fast_deep_equal__rspack_import_1_default()(this.copyright, this.origCopyright)) {
                        // No change.
                        resolve(false)
                    }
                    resolve(this.copyright)
                }
            })

            buttons.push({
                type: "cancel"
            })

            this.dialog = new _common__rspack_import_2.Dialog({
                width: 940,
                height: 300,
                id: "configure-copyright",
                title: gettext("Set copyright information"),
                body: (0,_templates__rspack_import_3.copyrightTemplate)(this.copyright),
                buttons
            })

            this.dialog.open()
            this.bind()
        })
    }

    bind() {
        this.dialog.dialogEl.addEventListener("click", event =>
            this.handleActivation(event)
        )
        this.dialog.dialogEl.addEventListener("keydown", event =>
            this.handleActivation(event)
        )
    }

    handleActivation(event) {
        if (!(0,_common__rspack_import_2.isActivationEvent)(event)) {
            return
        }
        const el = {}
        switch (true) {
            case (0,_common__rspack_import_2.findTarget)(event, ".type-switch", el): {
                const url =
                    el.target.nextElementSibling.querySelector(".license").value
                if (el.target.classList.contains("value1")) {
                    el.target.classList.add("value2")
                    el.target.classList.remove("value1")
                    const title = getLicenseTitle(url)
                    el.target.nextElementSibling.innerHTML =
                        (0,_templates__rspack_import_3.licenseInputTemplate)({
                            url,
                            title
                        })
                } else {
                    el.target.classList.add("value1")
                    el.target.classList.remove("value2")
                    el.target.nextElementSibling.innerHTML =
                        (0,_templates__rspack_import_3.licenseSelectTemplate)({
                            url
                        })
                }
                break
            }
            case (0,_common__rspack_import_2.findTarget)(event, ".fa-plus-circle", el): {
                this.getCurrentValue()
                this.dialog.dialogEl.querySelector(
                    "#configure-copyright"
                ).innerHTML = (0,_templates__rspack_import_3.copyrightTemplate)(this.copyright)
                break
            }
            case (0,_common__rspack_import_2.findTarget)(event, ".fa-minus-circle", el): {
                const tr = el.target.closest("tr")
                tr.parentElement.removeChild(tr)
                this.getCurrentValue()

                this.dialog.dialogEl.querySelector(
                    "#configure-copyright"
                ).innerHTML = (0,_templates__rspack_import_3.copyrightTemplate)(this.copyright)
                break
            }
            default:
                break
        }
    }
}


}),
"./js/modules/copyright_dialog/templates.js": (function (__unused_rspack_module, __webpack_exports__, __webpack_require__) {
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  copyrightTemplate: function() { return copyrightTemplate; },
  licenseInputTemplate: function() { return licenseInputTemplate; },
  licenseSelectTemplate: function() { return licenseSelectTemplate; }
});
/* import */ var _common__rspack_import_0 = __webpack_require__("./js/modules/common/index.js");
/* import */ var _index__rspack_import_1 = __webpack_require__("./js/modules/copyright_dialog/index.js");



const licenseSelectTemplate = ({url}) =>
    `<select class="license">
        <option value=""></option>
        ${_index__rspack_import_1.LICENSE_URLS.map(
            licenseUrl =>
                `<option value="${licenseUrl[1]}"${url === licenseUrl[1] ? " selected" : ""}>${licenseUrl[0]}</option>`
        ).join("")}
    </select>
    <div class="fw-select-arrow fa fa-caret-down"></div>`

const licenseInputTemplate = ({url, title}) =>
    `<div class="field-part field-part-huge">
        <input type='text' class='license' value="${(0,_common__rspack_import_0.escapeText)(url)}" placeholder="${gettext("License URL")}">
    </div>
    <div class="field-part field-part-huge">
        <input type='text' class='license-title' value="${(0,_common__rspack_import_0.escapeText)(title)}" placeholder="${gettext("License Title")}">
    </div>`

const licenseTemplate = ({url, title, start}) => {
    const selector =
        url === "" || _index__rspack_import_1.LICENSE_URLS.find(licenseUrl => licenseUrl[1] === url)
            ? true
            : false
    return `<tr>
        <td>
            <table>
                <tr>
                    <td>
                        <div class="type-switch-input-wrapper">
                            <button class="type-switch value${selector ? "1" : "2"}">
                                <span class="type-switch-inner">
                                    <span class="type-switch-label">${gettext("From list")}</span>
                                    <span class="type-switch-label">${gettext("Custom")}</span>
                                </span>
                            </button>
                            <div class="type-switch-input-inner">${selector ? licenseSelectTemplate({url}) : licenseInputTemplate({url, title})}</div>
                        </div>
                    </td>
                </tr>
                <tr>
                    <td><input type="text" value="${start ? start : ""}" class="field-part-single license-start" placeholder="${gettext("License start date (optional)")}"></td>
                </tr>
            </table>
        </td>
        <td class="input-field-list-ctrl">
            <span class="fa fa-minus-circle" tabindex="0"></span>&nbsp;<span class="fa fa-plus-circle" tabindex="0"></span>
        </td>
    </tr>`
}

const copyrightTemplate = ({holder, year, freeToRead, licenses}) =>
    `<table class="fw-dialog-table">
        <tbody>
            <tr>
                <th><h4 class="fw-tablerow-title wtooltip">
                    ${gettext("Copyright holder")}
                    <span class="tooltip">${gettext("If the work is not in the public domain, specify who the copyright holder is.")}</span>
                </h4></th>
                <td class="entry-field"><input type="text" class="holder" value="${holder ? (0,_common__rspack_import_0.escapeText)(holder) : ""}"></td>
            </tr>
            <tr>
                <th><h4 class="fw-tablerow-title wtooltip">
                    ${gettext("Copyright year")}
                    <span class="tooltip">${gettext("If the work is not in the public domain, specify the year of the copyright.")}</span>
                </h4></th>
                <td class="entry-field"><input type="number" class="year" min=0 max=2100 value="${year ? year : ""}"></td>
            </tr>
            <tr>
                <th><h4 class="fw-tablerow-title wtooltip">
                    ${gettext("Available to read for free?")}
                    <span class="tooltip">${gettext("Specify whether the work can be accessed without paying a fee.")}</span>
                </h4></th>
                <td class="entry-field"><input type="checkbox" class="free-to-read"${freeToRead ? " checked" : ""}></td>
            </tr>
            <tr>
                <th><h4 class="fw-tablerow-title wtooltip">
                    ${gettext("License(s)")}
                    <span class="tooltip">${gettext('List any licenses the work is available under. If the license only applies from a given date, please specify the date in the ISO8601 format (such as "2012-10-15").')}</span>
                </h4></th>
                <td class="entry-field licenses">
                    <table class="input-list-wrapper">
                        <tbody>
                            ${licenses ? licenses.map(license => licenseTemplate(license)).join("") : ""}
                            ${licenseTemplate({url: "", title: "", start: false})}
                        </tbody>
                    </table>
                </td>
            </tr>
        </tbody>
    </table>`


}),
"./js/modules/editor/e2ee/encryptor.js": (function (__unused_rspack_module, __webpack_exports__, __webpack_require__) {
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  E2EEEncryptor: function() { return E2EEEncryptor; }
});
/**
 * E2EE Encryptor - Handles encryption and decryption of document content
 * for end-to-end encrypted documents.
 *
 * Uses AES-GCM (256-bit) for all encryption operations. Each encryption
 * operation generates a random 12-byte IV (initialization vector) to
 * ensure that encrypting the same plaintext twice produces different
 * ciphertext.
 *
 * Encrypted data format (Appendix A of the E2EE plan):
 *   [IV (12 bytes)][Ciphertext (variable length)][Auth Tag (16 bytes, implicit in AES-GCM)]
 *
 * When stored as a string (e.g., in JSON fields), the entire structure
 * is Base64-encoded.
 */
class E2EEEncryptor {
    /**
     * Encrypt a string with AES-GCM.
     *
     * @param {string} plaintext - The plaintext string to encrypt
     * @param {CryptoKey} key - An AES-GCM key (from E2EEKeyManager.deriveKey)
     * @returns {Promise<string>} Base64-encoded string (iv + ciphertext + auth tag)
     */
    static async encrypt(plaintext, key) {
        const iv = crypto.getRandomValues(new Uint8Array(12))
        const encoded = new TextEncoder().encode(plaintext)
        const ciphertext = await crypto.subtle.encrypt(
            {name: "AES-GCM", iv: iv},
            key,
            encoded
        )
        // Prepend IV to ciphertext for storage
        const combined = new Uint8Array(iv.length + ciphertext.byteLength)
        combined.set(iv, 0)
        combined.set(new Uint8Array(ciphertext), iv.length)
        return E2EEEncryptor._uint8ArrayToBase64(combined)
    }

    /**
     * Decrypt a Base64-encoded AES-GCM ciphertext.
     *
     * @param {string} ciphertextBase64 - Base64-encoded (iv + ciphertext + auth tag)
     * @param {CryptoKey} key - An AES-GCM key (from E2EEKeyManager.deriveKey)
     * @returns {Promise<string>} The decrypted plaintext string
     */
    static async decrypt(ciphertextBase64, key) {
        const combined = E2EEEncryptor._base64ToUint8Array(ciphertextBase64)
        const iv = combined.slice(0, 12)
        const ciphertext = combined.slice(12)
        const decrypted = await crypto.subtle.decrypt(
            {name: "AES-GCM", iv: iv},
            key,
            ciphertext
        )
        return new TextDecoder().decode(decrypted)
    }

    /**
     * Encrypt a JSON-serializable object.
     *
     * Serializes the object to JSON, then encrypts the JSON string.
     *
     * @param {Object} obj - A JSON-serializable object
     * @param {CryptoKey} key - An AES-GCM key
     * @returns {Promise<string>} Base64-encoded encrypted data
     */
    static encryptObject(obj, key) {
        return E2EEEncryptor.encrypt(JSON.stringify(obj), key)
    }

    /**
     * Decrypt to a JSON-serializable object.
     *
     * Decrypts the Base64-encoded ciphertext, then parses the result as JSON.
     *
     * @param {string} ciphertextBase64 - Base64-encoded encrypted data
     * @param {CryptoKey} key - An AES-GCM key
     * @returns {Promise<Object>} The decrypted and parsed object
     */
    static async decryptObject(ciphertextBase64, key) {
        const plaintext = await E2EEEncryptor.decrypt(ciphertextBase64, key)
        return JSON.parse(plaintext)
    }

    /**
     * Encrypt an ArrayBuffer (for images and other binary data).
     *
     * @param {ArrayBuffer} buffer - The binary data to encrypt
     * @param {CryptoKey} key - An AES-GCM key
     * @returns {Promise<string>} Base64-encoded encrypted data (iv + ciphertext)
     */
    static async encryptBuffer(buffer, key) {
        const iv = crypto.getRandomValues(new Uint8Array(12))
        const ciphertext = await crypto.subtle.encrypt(
            {name: "AES-GCM", iv: iv},
            key,
            buffer
        )
        // Prepend IV to ciphertext
        const combined = new Uint8Array(iv.length + ciphertext.byteLength)
        combined.set(iv, 0)
        combined.set(new Uint8Array(ciphertext), iv.length)
        return E2EEEncryptor._uint8ArrayToBase64(combined)
    }

    /**
     * Decrypt to an ArrayBuffer.
     *
     * @param {string} ciphertextBase64 - Base64-encoded encrypted data
     * @param {CryptoKey} key - An AES-GCM key
     * @returns {Promise<ArrayBuffer>} The decrypted binary data
     */
    static decryptBuffer(ciphertextBase64, key) {
        const combined = E2EEEncryptor._base64ToUint8Array(ciphertextBase64)
        const iv = combined.slice(0, 12)
        const ciphertext = combined.slice(12)
        return crypto.subtle.decrypt({name: "AES-GCM", iv: iv}, key, ciphertext)
    }

    /**
     * Encrypt an image File/Blob for upload.
     *
     * Reads the file as an ArrayBuffer, encrypts it, and returns
     * a Blob with application/octet-stream type (since the encrypted
     * data is opaque binary).
     *
     * @param {File|Blob} file - The image file to encrypt
     * @param {CryptoKey} key - An AES-GCM key
     * @returns {Promise<Blob>} An encrypted Blob with type application/octet-stream
     */
    static async encryptImage(file, key) {
        const buffer = await file.arrayBuffer()
        const iv = crypto.getRandomValues(new Uint8Array(12))
        const ciphertext = await crypto.subtle.encrypt(
            {name: "AES-GCM", iv: iv},
            key,
            buffer
        )
        // Prepend IV to ciphertext
        const combined = new Uint8Array(iv.length + ciphertext.byteLength)
        combined.set(iv, 0)
        combined.set(new Uint8Array(ciphertext), iv.length)
        return new Blob([combined], {type: "application/octet-stream"})
    }

    /**
     * Decrypt an encrypted image back to an ArrayBuffer.
     *
     * @param {string} ciphertextBase64 - Base64-encoded encrypted image data
     * @param {CryptoKey} key - An AES-GCM key
     * @returns {Promise<ArrayBuffer>} The decrypted image data
     */
    static decryptImage(ciphertextBase64, key) {
        return E2EEEncryptor.decryptBuffer(ciphertextBase64, key)
    }

    /**
     * Decrypt a Base64-encoded ciphertext and return as a Base64 string.
     *
     * Useful for decrypting encrypted images that need to be stored
     * as Base64 data URLs or re-exported.
     *
     * @param {string} ciphertextBase64 - Base64-encoded encrypted data
     * @param {CryptoKey} key - An AES-GCM key
     * @returns {Promise<string>} Base64-encoded decrypted data
     */
    static async decryptBufferToBase64(ciphertextBase64, key) {
        const buffer = await E2EEEncryptor.decryptBuffer(ciphertextBase64, key)
        const bytes = new Uint8Array(buffer)
        let binary = ""
        for (let i = 0; i < bytes.length; i++) {
            binary += String.fromCharCode(bytes[i])
        }
        return btoa(binary)
    }

    /**
     * Decrypt an encrypted image and return a blob URL for display.
     *
     * Fetches the encrypted image file from the given URL, decrypts it,
     * and creates a temporary object URL that can be used as an img src.
     *
     * @param {string} imageUrl - The URL of the encrypted image file
     * @param {CryptoKey} key - An AES-GCM key
     * @param {string} mimeType - The MIME type of the decrypted image
     * @returns {Promise<string>} A blob URL for the decrypted image
     */
    static async decryptImageToUrl(imageUrl, key, mimeType = "image/png") {
        const response = await fetch(imageUrl)
        const arrayBuffer = await response.arrayBuffer()
        const bytes = new Uint8Array(arrayBuffer)
        let binary = ""
        for (let i = 0; i < bytes.length; i++) {
            binary += String.fromCharCode(bytes[i])
        }
        const base64 = btoa(binary)
        const decrypted = await E2EEEncryptor.decryptBuffer(base64, key)
        const blob = new Blob([decrypted], {type: mimeType})
        return URL.createObjectURL(blob)
    }

    // --- Private helper methods ---

    /**
     * Convert a Uint8Array to a Base64-encoded string.
     * @private
     */
    static _uint8ArrayToBase64(bytes) {
        let binary = ""
        for (let i = 0; i < bytes.length; i++) {
            binary += String.fromCharCode(bytes[i])
        }
        return btoa(binary)
    }

    /**
     * Convert a Base64-encoded string to a Uint8Array.
     * @private
     */
    static _base64ToUint8Array(base64) {
        const binary = atob(base64)
        const bytes = new Uint8Array(binary.length)
        for (let i = 0; i < binary.length; i++) {
            bytes[i] = binary.charCodeAt(i)
        }
        return bytes
    }
}


}),
"./js/modules/images/edit_dialog/model.js": (function (__unused_rspack_module, __webpack_exports__, __webpack_require__) {
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  imageEditModel: function() { return imageEditModel; }
});
/* import */ var cropperjs__rspack_import_0 = __webpack_require__("./node_modules/.pnpm/cropperjs@1.6.2/node_modules/cropperjs/dist/cropper.js");
/* import */ var cropperjs__rspack_import_0_default = /*#__PURE__*/__webpack_require__.n(cropperjs__rspack_import_0);
/* import */ var _copyright_dialog__rspack_import_1 = __webpack_require__("./js/modules/copyright_dialog/index.js");




let mediaPreviewerImg = false

const imageEditModel = () => ({
    content: [
        {
            title: gettext("Rotate Left"),
            type: "action",
            tooltip: gettext("Rotate-left"),
            order: 0,
            action: dialog => {
                const mediaPreviewerStyle =
                    dialog.mediaPreviewer.currentStyle ||
                    window.getComputedStyle(dialog.mediaPreviewer, false)
                rotateBase64Image(
                    mediaPreviewerStyle.backgroundImage
                        .slice(4, -1)
                        .replace(/"/g, ""),
                    dialog.mediaInput.type,
                    "left"
                ).then(response =>
                    dialog.mediaPreviewer.setAttribute(
                        "style",
                        `background-image: url(${response});`
                    )
                )
                if (dialog.rotation === 0) {
                    dialog.rotation = 270
                } else {
                    dialog.rotation -= 90
                }
            },
            disabled: dialog => dialog.imageId,
            icon: "redo fa-rotate-180"
        },
        {
            title: gettext("Rotate Right"),
            type: "action",
            tooltip: gettext("Rotate-right"),
            order: 1,
            action: dialog => {
                const mediaPreviewerStyle =
                    dialog.mediaPreviewer.currentStyle ||
                    window.getComputedStyle(dialog.mediaPreviewer, false)
                rotateBase64Image(
                    mediaPreviewerStyle.backgroundImage
                        .slice(4, -1)
                        .replace(/"/g, ""),
                    dialog.mediaInput.type,
                    "right"
                ).then(response =>
                    dialog.mediaPreviewer.setAttribute(
                        "style",
                        `background-image: url(${response});`
                    )
                )
                if (dialog.rotation === 270) {
                    dialog.rotation = 0
                } else {
                    dialog.rotation += 90
                }
            },
            disabled: dialog => dialog.imageId,
            icon: "undo"
        },
        {
            title: gettext("Crop"),
            type: "action",
            tooltip: gettext("Crop image"),
            order: 2,
            action: dialog => {
                const mediaPreviewerStyle =
                    dialog.mediaPreviewer.currentStyle ||
                    window.getComputedStyle(dialog.mediaPreviewer, false)
                //const base64data = mediaPreviewerStyle.backgroundImage.slice(4, -1).replace(/"/g, "")
                mediaPreviewerImg = document.createElement("img")
                //img.src = `url(${base64data})`
                mediaPreviewerImg.src = mediaPreviewerStyle.backgroundImage
                    .slice(4, -1)
                    .replace(/"/g, "")
                dialog.mediaPreviewer.parentElement.replaceChild(
                    mediaPreviewerImg,
                    dialog.mediaPreviewer
                )
                const cropper = new (cropperjs__rspack_import_0_default())(mediaPreviewerImg, {
                    viewMode: 1,
                    responsive: true
                })
                toggleCropMode(true, dialog, cropper)
            },
            disabled: dialog => dialog.imageId,
            icon: "crop"
        },
        {
            title: gettext("Set Copyright"),
            type: "action",
            tooltip: gettext("Specify copyright information"),
            order: 3,
            action: dialog => {
                const crDialog = new _copyright_dialog__rspack_import_1.CopyrightDialog(dialog.copyright)
                crDialog.init().then(copyright => {
                    if (copyright) {
                        dialog.copyright = copyright
                    }
                })
            }
        }
    ]
})

let oldButtons = false

const toggleCropMode = (val, dialog, cropper) => {
    if (val && !oldButtons) {
        dialog.mediaPreviewerDiv.classList.add("crop-mode")
        oldButtons = dialog.dialog.buttons
        dialog.dialog.setButtons([
            {
                text: gettext("Crop"),
                click: () => {
                    dialog.mediaPreviewer.setAttribute(
                        "style",
                        `background-image: url(${cropper
                            .getCroppedCanvas()
                            .toDataURL(dialog.mediaInput.type)});`
                    )
                    dialog.cropped = true
                    cropper.destroy()
                    toggleCropMode(false, dialog, cropper)
                },
                classes: "fw-dark"
            },
            {
                type: "cancel",
                classes: "fw-orange",
                click: () => {
                    cropper.destroy()
                    toggleCropMode(false, dialog, cropper)
                }
            }
        ])
    } else {
        dialog.mediaPreviewerDiv.classList.remove("crop-mode")
        if (mediaPreviewerImg) {
            mediaPreviewerImg.parentElement.replaceChild(
                dialog.mediaPreviewer,
                mediaPreviewerImg
            )
            mediaPreviewerImg = false
        }
        if (oldButtons) {
            dialog.dialog.buttons = oldButtons
            oldButtons = false
        }
    }
    dialog.dialog.refreshButtons()
    dialog.dialog.centerDialog()
}

const rotateBase64Image = (base64data, type, direction) => {
    return new Promise(resolve => {
        const canvas = document.createElement("canvas")
        const ctx = canvas.getContext("2d")
        const image = new Image()
        image.src = base64data
        image.onload = () => {
            canvas.height = image.width
            canvas.width = image.height
            if (direction == "left") {
                ctx.rotate((90 * Math.PI) / 180)
                ctx.translate(0, -canvas.width)
            } else {
                ctx.rotate((-90 * Math.PI) / 180)
                ctx.translate(-canvas.height, 0)
            }
            ctx.drawImage(image, 0, 0)
            resolve(canvas.toDataURL(type))
        }
    })
}


}),

}]);