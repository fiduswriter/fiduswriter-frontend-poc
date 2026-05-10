"use strict";
(self["rspackChunkfidus_writer"] = self["rspackChunkfidus_writer"] || []).push([["js_modules_images_edit_dialog_index_js"], {
"./js/modules/images/edit_dialog/index.js": (function (__unused_rspack_module, __webpack_exports__, __webpack_require__) {
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  ImageEditDialog: function() { return ImageEditDialog; }
});
/* import */ var _common__rspack_import_0 = __webpack_require__("./js/modules/common/index.js");
/* import */ var _editor_e2ee_encryptor__rspack_import_1 = __webpack_require__("./js/modules/editor/e2ee/encryptor.js");
/* import */ var _model__rspack_import_2 = __webpack_require__("./js/modules/images/edit_dialog/model.js");
/* import */ var _templates__rspack_import_3 = __webpack_require__("./js/modules/images/edit_dialog/templates.js");




class ImageEditDialog {
    constructor(imageDB, imageId = false, page) {
        this.imageDB = imageDB
        this.page = page
        this.imageId = imageId
        this.dialog = false
        this.copyright = this.imageId
            ? this.imageDB.db[this.imageId].copyright
            : {
                  holder: false,
                  year: false,
                  freeToRead: true,
                  licenses: []
              }
        this.menu = this.page.menu?.imageEditModel || (0,_model__rspack_import_2.imageEditModel)()
    }

    //open a dialog for uploading an image
    init() {
        if (this.page.app.isOffline()) {
            this.showOffline()
            return Promise.resolve()
        }
        const returnPromise = new Promise(resolve => {
            this.dialog = new _common__rspack_import_0.Dialog({
                title: this.imageId
                    ? gettext("Update Image Information")
                    : gettext("Upload Image"),
                id: "editimage",
                classes: "fw-media-uploader",
                body: (0,_templates__rspack_import_3.imageEditTemplate)({
                    image: this.imageId ? this.imageDB.db[this.imageId] : false,
                    cats: this.imageDB.cats
                }),
                buttons: [
                    {
                        text: this.imageId
                            ? gettext("Update")
                            : gettext("Upload"),
                        click: () => resolve(this.saveImage()),
                        classes: "fw-dark"
                    },
                    {
                        type: "cancel",
                        classes: "fw-orange",
                        click: () => this.dialog.close()
                    }
                ]
            })
            this.dialog.open()
        })

        document
            .querySelectorAll(".fw-checkable-label")
            .forEach(el =>
                el.addEventListener("click", () => (0,_common__rspack_import_0.setCheckableLabel)(el))
            )

        if (!this.imageId) {
            this.bindMediaUploadEvents()
        }

        document
            .querySelector(".figure-edit-menu")
            .addEventListener("click", event => {
                event.preventDefault()
                event.stopImmediatePropagation()

                const contentMenu = new _common__rspack_import_0.ContentMenu({
                    menu: this.menu,
                    width: 220,
                    page: this,
                    menuPos: {X: event.pageX - 50, Y: event.pageY + 50}
                })
                contentMenu.open()
            })

        return returnPromise
    }

    //add image upload events
    bindMediaUploadEvents() {
        const selectButton = document.querySelector(
                "#editimage .fw-media-select-button"
            ),
            mediaInputSelector = document.querySelector(
                "#editimage .fw-media-file-input"
            )
        this.mediaPreviewerDiv = document.querySelector(
            "#editimage .figure-preview > div"
        )
        this.rotation = 0
        this.cropped = false

        selectButton.addEventListener("click", () => {
            mediaInputSelector.click()
        })

        mediaInputSelector.addEventListener("change", () => {
            this.mediaInput = mediaInputSelector.files[0]
            const fr = new window.FileReader()
            fr.onload = () => {
                this.mediaPreviewerDiv.innerHTML = `<div class="img" style="background-image: url(${fr.result});" />`
                this.mediaPreviewer =
                    this.mediaPreviewerDiv.querySelector(".img")
                this.mediaPreviewerDiv.classList.remove("crop-mode")
                this.dialog.centerDialog()
            }
            fr.readAsDataURL(this.mediaInput)
        })
    }

    displayCreateImageError(errors) {
        Object.keys(errors).forEach(eKey => {
            const eMsg = `<div class="warning">${errors[eKey]}</div>`
            if ("error" == eKey) {
                document
                    .getElementById("editimage")
                    .insertAdjacentHTML("afterbegin", eMsg)
            } else {
                document
                    .getElementById(`id_${eKey}`)
                    .insertAdjacentHTML("afterend", eMsg)
            }
        })
    }

    async saveImage() {
        const imageData = {
            title: document.querySelector("#editimage .fw-media-title").value,
            copyright: this.copyright,
            cats: Array.from(
                document.querySelectorAll("#editimage .entry-cat:checked")
            ).map(el => Number.parseInt(el.value))
        }
        if (this.imageId) {
            imageData.id = this.imageId
        } else if (!this.rotation && !this.cropped) {
            imageData.image = this.mediaInput
        } else {
            const mediaPreviewerStyle =
                this.mediaPreviewer.currentStyle ||
                window.getComputedStyle(this.mediaPreviewer, false)
            const base64data = mediaPreviewerStyle.backgroundImage
                .slice(4, -1)
                .replace(/"/g, "")
            const bstr = atob(base64data.split(",")[1])
            let n = bstr.length
            const u8arr = new Uint8Array(n)
            while (n--) {
                u8arr[n] = bstr.charCodeAt(n)
            }
            imageData.image = new File([u8arr], this.mediaInput.name, {
                type: this.mediaInput.type
            })
        }

        // For E2EE documents, encrypt the image and copyright before uploading
        const isE2EE = this.page.e2ee?.encrypted === true
        if (isE2EE && imageData.image) {
            imageData.image = await _editor_e2ee_encryptor__rspack_import_1.E2EEEncryptor.encryptImage(
                imageData.image,
                this.page.e2ee.key
            )
            imageData.original_file_type = this.mediaInput?.type || "image/png"
            // Encrypt copyright metadata so the server cannot read it
            imageData.copyright = await _editor_e2ee_encryptor__rspack_import_1.E2EEEncryptor.encryptObject(
                imageData.copyright,
                this.page.e2ee.key
            )
        }

        // Remove old warning messages
        document
            .querySelectorAll("#editimage .warning")
            .forEach(el => el.parentElement.removeChild(el))
        return new Promise(resolve => {
            this.imageDB.saveImage(imageData).then(
                imageId => {
                    this.dialog.close()
                    ;(0,_common__rspack_import_0.addAlert)("success", gettext("The image has been updated."))
                    this.imageId = imageId
                    resolve(imageId)
                },
                errors => {
                    if (this.page.app.isOffline()) {
                        this.showOffline()
                        return
                    }
                    this.displayCreateImageError(errors)
                    ;(0,_common__rspack_import_0.addAlert)(
                        "error",
                        gettext(
                            "Some errors were found. Please examine the form."
                        )
                    )
                }
            )
        })
    }

    showOffline() {
        (0,_common__rspack_import_0.addAlert)(
            "info",
            gettext(
                "You are currently offline. Please try again after going online."
            )
        )
    }
}


}),
"./js/modules/images/edit_dialog/templates.js": (function (__unused_rspack_module, __webpack_exports__, __webpack_require__) {
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  imageEditTemplate: function() { return imageEditTemplate; }
});
/* import */ var _common__rspack_import_0 = __webpack_require__("./js/modules/common/index.js");


/* A template for the image category selection of the image selection dialog. */
const imageEditCategoryTemplate = ({image, cats}) => {
    if (!cats.length) {
        return ""
    }
    return `<div class="fw-media-category">
            <div>${gettext("Select categories")}</div>
            ${cats
                .map(
                    cat =>
                        `<label class="fw-checkable fw-checkable-label${
                            image && image.cats.includes(cat.id)
                                ? " checked"
                                : ""
                        }"
                        for="imageCat${cat.id}">
                    ${(0,_common__rspack_import_0.escapeText)(cat.category_title)}
                </label>
                <input class="fw-checkable-input fw-media-form entry-cat" type="checkbox"
                        id="imageCat${cat.id}" name="imageCat" value="${cat.id}" ${
                            image && image.cats.includes(cat.id)
                                ? " checked"
                                : ""
                        }>`
                )
                .join("")}
        </div>`
}

/* A template for the form for the image upload dialog. */
const imageEditTemplate = ({image, cats}) =>
    `<div>
        <input name="title" class="fw-media-title" type="text"
                placeholder="${gettext("Insert a title")}" value="${
                    image ? (0,_common__rspack_import_0.escapeText)(image.title) : ""
                }" />
        ${
            image
                ? ""
                : `<button type="button" class="fw-media-select-button fw-button fw-light">
                ${gettext("Select a file")}
            </button>
            <input name="image" type="file" class="fw-media-file-input">`
        }
    </div>
    <div class="figure-preview">
        <button class="figure-edit-menu" title="${gettext("Edit Image")}">
            <span class="dot-menu-icon"><i class="fa fa-ellipsis-v"></i></span>
        </button>
    <div>
        ${
            image && image.image
                ? `<div class="img" style="background-image: url(${image.image});"></div>`
                : ""
        }
    </div></div>
    ${imageEditCategoryTemplate({image, cats})}`


}),

}]);