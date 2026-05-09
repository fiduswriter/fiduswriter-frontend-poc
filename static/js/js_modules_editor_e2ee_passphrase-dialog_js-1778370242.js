"use strict";
(self["webpackChunkfidus_writer"] = self["webpackChunkfidus_writer"] || []).push([["js_modules_editor_e2ee_passphrase-dialog_js"], {
"./js/modules/editor/e2ee/passphrase-dialog.js": (function (__unused_rspack_module, __webpack_exports__, __webpack_require__) {
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  changePassphraseDialog: function() { return changePassphraseDialog; },
  enterPassphraseDialog: function() { return enterPassphraseDialog; },
  recoverWithKeyDialog: function() { return recoverWithKeyDialog; },
  setupPassphraseDialog: function() { return setupPassphraseDialog; },
  showRecoveryKeyDialog: function() { return showRecoveryKeyDialog; }
});
/* import */ var _common__rspack_import_0 = __webpack_require__("./js/modules/common/index.js");
/* import */ var _password_dialog__rspack_import_1 = __webpack_require__("./js/modules/editor/e2ee/password-dialog.js");
/**
 * Passphrase Dialog - UI for the Personal Passphrase system.
 *
 * Provides dialogs for:
 * 1. Setup passphrase - first-time key generation
 * 2. Enter passphrase - unlock keys from sessionStorage
 * 3. Display recovery key - show recovery key after setup
 * 4. Recover with key - use recovery key to reset passphrase
 */




/**
 * Show a dialog to set up the personal passphrase for the first time.
 *
 * @param {Function} onSetup - Callback called with the passphrase string
 * @returns {Promise<void>}
 */
function setupPassphraseDialog(onSetup) {
    return new Promise(resolve => {
        const dialogId = "e2ee-setup-passphrase"

        const body = `
            <div class="e2ee-password-dialog">
                <p>${gettext("Set up a personal encryption passphrase. This passphrase will unlock all your encrypted documents — you will not need separate passwords for each document.")}</p>
                <p class="e2ee-password-hint"><strong>${gettext("Important:")}</strong> ${gettext("This passphrase is separate from your login password. If you lose it, your encrypted documents cannot be recovered.")}</p>
                <div class="e2ee-password-field">
                    <label for="e2ee-passphrase-input">${gettext("Passphrase")}</label>
                    <input type="password" id="e2ee-passphrase-input" class="e2ee-password-input"
                           autocomplete="off" data-1p-ignore data-lp-ignore data-lpignore="true" data-bwignore data-form-type="other" autofocus />
                    <button type="button" class="e2ee-toggle-visibility" title="${gettext("Show passphrase")}">
                        <i class="fas fa-eye"></i>
                    </button>
                </div>
                <div class="e2ee-strength-meter">
                    <div class="e2ee-strength-bar" id="e2ee-strength-bar"></div>
                    <span class="e2ee-strength-label" id="e2ee-strength-label"></span>
                </div>
                <div class="e2ee-password-field">
                    <label for="e2ee-confirm-passphrase-input">${gettext("Confirm passphrase")}</label>
                    <input type="password" id="e2ee-confirm-passphrase-input" class="e2ee-password-input"
                           autocomplete="off" data-1p-ignore data-lp-ignore data-lpignore="true" data-bwignore data-form-type="other" />
                </div>
                <div class="e2ee-password-error" id="e2ee-passphrase-error"></div>
            </div>
        `

        const buttons = [
            {
                text: gettext("Set Up Encryption"),
                classes: "fw-button fw-dark",
                click: () => {
                    const input = document.getElementById(
                        "e2ee-passphrase-input"
                    )
                    const confirmInput = document.getElementById(
                        "e2ee-confirm-passphrase-input"
                    )
                    const errorEl = document.getElementById(
                        "e2ee-passphrase-error"
                    )
                    const passphrase = input ? input.value : ""
                    const confirmPassphrase = confirmInput
                        ? confirmInput.value
                        : ""

                    if (passphrase.length < 8) {
                        if (errorEl) {
                            errorEl.textContent = gettext(
                                "Passphrase must be at least 8 characters long."
                            )
                        }
                        return
                    }

                    if (passphrase !== confirmPassphrase) {
                        if (errorEl) {
                            errorEl.textContent = gettext(
                                "Passphrases do not match."
                            )
                        }
                        return
                    }

                    dialogInstance.close()
                    onSetup(passphrase)
                    resolve()
                }
            }
        ]

        const dialog = {
            title: gettext("Set Up Personal Encryption"),
            id: dialogId,
            body: body,
            buttons: buttons,
            canClose: true
        }

        const dialogInstance = new _common__rspack_import_0.Dialog(dialog)
        dialogInstance.open()

        setTimeout(() => {
            const toggleBtns = document.querySelectorAll(
                `#${dialogId} .e2ee-toggle-visibility`
            )
            toggleBtns.forEach(btn => {
                btn.addEventListener("click", () => {
                    const input = btn.parentElement.querySelector("input")
                    if (input) {
                        if (input.type === "password") {
                            input.type = "text"
                            btn.innerHTML = '<i class="fas fa-eye-slash"></i>'
                        } else {
                            input.type = "password"
                            btn.innerHTML = '<i class="fas fa-eye"></i>'
                        }
                    }
                })
            })

            const passphraseInput = document.getElementById(
                "e2ee-passphrase-input"
            )
            if (passphraseInput) {
                passphraseInput.addEventListener("input", () => {
                    const score = (0,_password_dialog__rspack_import_1.passwordStrength)(passphraseInput.value)
                    const info = (0,_password_dialog__rspack_import_1.strengthInfo)(score)
                    const bar = document.getElementById("e2ee-strength-bar")
                    const label = document.getElementById("e2ee-strength-label")
                    if (bar) {
                        bar.className = `e2ee-strength-bar ${info.cssClass}`
                        bar.style.width = `${(score + 1) * 25}%`
                    }
                    if (label) {
                        label.textContent = info.label
                        label.className = `e2ee-strength-label ${info.cssClass}`
                    }
                })
                passphraseInput.dispatchEvent(new Event("input"))
                passphraseInput.focus()
            }

            const confirmInput = document.getElementById(
                "e2ee-confirm-passphrase-input"
            )
            if (confirmInput) {
                confirmInput.addEventListener("keypress", event => {
                    if (event.key === "Enter") {
                        event.preventDefault()
                        buttons[0].click()
                    }
                })
            }
        }, 100)
    })
}

/**
 * Show a dialog to enter the personal passphrase to unlock encryption keys.
 *
 * @param {Function} onUnlock - Callback called with the passphrase string
 * @param {Function} onRecover - Callback when user clicks "Recover with key"
 * @param {Object} [options] - Optional settings
 * @param {string} [options.errorMessage] - Inline error to display
 * @returns {Promise<void>}
 */
function enterPassphraseDialog(
    onUnlock,
    onRecover = null,
    options = {}
) {
    return new Promise(resolve => {
        const dialogId = "e2ee-enter-passphrase"
        const errorMessage = options.errorMessage || ""

        const body = `
            <div class="e2ee-password-dialog">
                <p>${gettext("Enter your personal encryption passphrase to unlock your documents.")}</p>
                <div class="e2ee-password-field">
                    <label for="e2ee-passphrase-input">${gettext("Passphrase")}</label>
                    <input type="password" id="e2ee-passphrase-input" class="e2ee-password-input"
                           autocomplete="off" data-1p-ignore data-lp-ignore data-lpignore="true" data-bwignore data-form-type="other" autofocus />
                    <button type="button" class="e2ee-toggle-visibility" title="${gettext("Show passphrase")}">
                        <i class="fas fa-eye"></i>
                    </button>
                </div>
                <div class="e2ee-password-error" id="e2ee-passphrase-error">${(0,_common__rspack_import_0.escapeText)(errorMessage)}</div>
            </div>
        `

        const buttons = [
            {
                text: gettext("Unlock"),
                classes: "fw-button fw-dark",
                click: () => {
                    const input = document.getElementById(
                        "e2ee-passphrase-input"
                    )
                    const passphrase = input ? input.value : ""
                    if (passphrase.length === 0) {
                        const errorEl = document.getElementById(
                            "e2ee-passphrase-error"
                        )
                        if (errorEl) {
                            errorEl.textContent = gettext(
                                "Please enter your passphrase."
                            )
                        }
                        return
                    }
                    dialogInstance.close()
                    onUnlock(passphrase)
                    resolve()
                }
            },
            {
                text: gettext("Cancel"),
                classes: "fw-button fw-light",
                click: () => {
                    dialogInstance.close()
                    resolve()
                }
            }
        ]

        if (onRecover) {
            buttons.push({
                text: gettext("Recover with key"),
                classes: "fw-button fw-orange",
                click: () => {
                    dialogInstance.close()
                    onRecover()
                    resolve()
                }
            })
        }

        const dialog = {
            title: gettext("Unlock Encryption"),
            id: dialogId,
            body: body,
            buttons: buttons,
            canClose: true
        }

        const dialogInstance = new _common__rspack_import_0.Dialog(dialog)
        dialogInstance.open()

        setTimeout(() => {
            const toggleBtn = document.querySelector(
                `#${dialogId} .e2ee-toggle-visibility`
            )
            const input = document.getElementById("e2ee-passphrase-input")
            if (toggleBtn && input) {
                toggleBtn.addEventListener("click", () => {
                    if (input.type === "password") {
                        input.type = "text"
                        toggleBtn.innerHTML = '<i class="fas fa-eye-slash"></i>'
                        toggleBtn.title = gettext("Hide passphrase")
                    } else {
                        input.type = "password"
                        toggleBtn.innerHTML = '<i class="fas fa-eye"></i>'
                        toggleBtn.title = gettext("Show passphrase")
                    }
                })
            }

            if (input) {
                input.addEventListener("keypress", event => {
                    if (event.key === "Enter") {
                        event.preventDefault()
                        buttons[0].click()
                    }
                })
                input.focus()
            }
        }, 100)
    })
}

/**
 * Show a dialog displaying the recovery key to the user.
 *
 * @param {string} recoveryKey - The recovery key to display
 * @param {Function} onContinue - Callback when user clicks Continue
 * @returns {Promise<void>}
 */
function showRecoveryKeyDialog(recoveryKey, onContinue) {
    return new Promise(resolve => {
        const dialogId = "e2ee-recovery-key"

        const body = `
            <div class="e2ee-password-dialog">
                <p><strong>${gettext("This is your recovery key.")}</strong></p>
                <p>${gettext("Store it somewhere safe (e.g., a password manager, printed copy). If you forget your passphrase, this is the ONLY way to recover your encrypted documents. We cannot recover it for you.")}</p>
                <div class="e2ee-recovery-key-box">
                    <code id="e2ee-recovery-key-value">${recoveryKey}</code>
                    <button type="button" class="fw-button fw-light" id="e2ee-copy-recovery-key">
                        <i class="fas fa-copy"></i> ${gettext("Copy")}
                    </button>
                </div>
                <p class="e2ee-password-hint"><strong>${gettext("Copy it now — it will not be shown again.")}</strong></p>
            </div>
        `

        const buttons = [
            {
                text: gettext("I have saved it"),
                classes: "fw-button fw-dark",
                click: () => {
                    dialogInstance.close()
                    if (typeof onContinue === "function") {
                        onContinue()
                    }
                    resolve()
                }
            }
        ]

        const dialog = {
            title: gettext("Recovery Key"),
            id: dialogId,
            body: body,
            buttons: buttons,
            canClose: false
        }

        const dialogInstance = new _common__rspack_import_0.Dialog(dialog)
        dialogInstance.open()

        setTimeout(() => {
            const copyBtn = document.getElementById("e2ee-copy-recovery-key")
            if (copyBtn) {
                copyBtn.addEventListener("click", () => {
                    navigator.clipboard.writeText(recoveryKey).then(() => {
                        copyBtn.innerHTML = `<i class="fas fa-check"></i> ${gettext("Copied!")}`
                        setTimeout(() => {
                            copyBtn.innerHTML = `<i class="fas fa-copy"></i> ${gettext("Copy")}`
                        }, 2000)
                    })
                })
            }
        }, 100)
    })
}

/**
 * Show a dialog to recover encryption keys using the recovery key.
 *
 * @param {Function} onRecover - Callback called with {recoveryKey: string, newPassphrase: string}
 * @returns {Promise<void>}
 */
function recoverWithKeyDialog(onRecover) {
    return new Promise(resolve => {
        const dialogId = "e2ee-recover-with-key"

        const body = `
            <div class="e2ee-password-dialog">
                <p>${gettext("Enter your recovery key and a new passphrase to regain access to your encrypted documents.")}</p>
                <div class="e2ee-password-field">
                    <label for="e2ee-recovery-key-input">${gettext("Recovery key")}</label>
                    <input type="text" id="e2ee-recovery-key-input" class="e2ee-password-input"
                           autocomplete="off" data-1p-ignore data-lp-ignore data-lpignore="true" data-bwignore data-form-type="other" autofocus />
                </div>
                <div class="e2ee-password-field">
                    <label for="e2ee-new-passphrase-input">${gettext("New passphrase")}</label>
                    <input type="password" id="e2ee-new-passphrase-input" class="e2ee-password-input"
                           autocomplete="off" data-1p-ignore data-lp-ignore data-lpignore="true" data-bwignore data-form-type="other" />
                    <button type="button" class="e2ee-toggle-visibility" title="${gettext("Show passphrase")}">
                        <i class="fas fa-eye"></i>
                    </button>
                </div>
                <div class="e2ee-password-field">
                    <label for="e2ee-confirm-passphrase-input">${gettext("Confirm new passphrase")}</label>
                    <input type="password" id="e2ee-confirm-passphrase-input" class="e2ee-password-input"
                           autocomplete="off" data-1p-ignore data-lp-ignore data-lpignore="true" data-bwignore data-form-type="other" />
                </div>
                <div class="e2ee-password-error" id="e2ee-recover-error"></div>
            </div>
        `

        const buttons = [
            {
                text: gettext("Recover"),
                classes: "fw-button fw-dark",
                click: () => {
                    const recoveryInput = document.getElementById(
                        "e2ee-recovery-key-input"
                    )
                    const newInput = document.getElementById(
                        "e2ee-new-passphrase-input"
                    )
                    const confirmInput = document.getElementById(
                        "e2ee-confirm-passphrase-input"
                    )
                    const errorEl =
                        document.getElementById("e2ee-recover-error")

                    const recoveryKey = recoveryInput
                        ? recoveryInput.value.trim()
                        : ""
                    const newPassphrase = newInput ? newInput.value : ""
                    const confirmPassphrase = confirmInput
                        ? confirmInput.value
                        : ""

                    if (recoveryKey.length === 0) {
                        if (errorEl) {
                            errorEl.textContent = gettext(
                                "Please enter your recovery key."
                            )
                        }
                        return
                    }

                    if (newPassphrase.length < 8) {
                        if (errorEl) {
                            errorEl.textContent = gettext(
                                "Passphrase must be at least 8 characters long."
                            )
                        }
                        return
                    }

                    if (newPassphrase !== confirmPassphrase) {
                        if (errorEl) {
                            errorEl.textContent = gettext(
                                "Passphrases do not match."
                            )
                        }
                        return
                    }

                    dialogInstance.close()
                    onRecover({recoveryKey, newPassphrase})
                    resolve()
                }
            },
            {
                text: gettext("Cancel"),
                classes: "fw-button fw-light",
                click: () => {
                    dialogInstance.close()
                    resolve()
                }
            }
        ]

        const dialog = {
            title: gettext("Recover Encryption"),
            id: dialogId,
            body: body,
            buttons: buttons,
            canClose: true
        }

        const dialogInstance = new _common__rspack_import_0.Dialog(dialog)
        dialogInstance.open()

        setTimeout(() => {
            const toggleBtns = document.querySelectorAll(
                `#${dialogId} .e2ee-toggle-visibility`
            )
            toggleBtns.forEach(btn => {
                btn.addEventListener("click", () => {
                    const input = btn.parentElement.querySelector("input")
                    if (input) {
                        if (input.type === "password") {
                            input.type = "text"
                            btn.innerHTML = '<i class="fas fa-eye-slash"></i>'
                        } else {
                            input.type = "password"
                            btn.innerHTML = '<i class="fas fa-eye"></i>'
                        }
                    }
                })
            })

            const confirmInput = document.getElementById(
                "e2ee-confirm-passphrase-input"
            )
            if (confirmInput) {
                confirmInput.addEventListener("keypress", event => {
                    if (event.key === "Enter") {
                        event.preventDefault()
                        buttons[0].click()
                    }
                })
            }
        }, 100)
    })
}

/**
 * Show a dialog to change the encryption passphrase.
 *
 * @param {Function} onChange - Callback called with {oldPassphrase: string, newPassphrase: string}
 * @returns {Promise<void>}
 */
function changePassphraseDialog(onChange) {
    return new Promise(resolve => {
        const dialogId = "e2ee-change-passphrase"

        const body = `
            <div class="e2ee-password-dialog">
                <p>${gettext("Enter your current passphrase and a new passphrase to change your encryption password.")}</p>
                <div class="e2ee-password-field">
                    <label for="e2ee-old-passphrase-input">${gettext("Current passphrase")}</label>
                    <input type="password" id="e2ee-old-passphrase-input" class="e2ee-password-input"
                           autocomplete="off" data-1p-ignore data-lp-ignore data-lpignore="true" data-bwignore data-form-type="other" autofocus />
                    <button type="button" class="e2ee-toggle-visibility" title="${gettext("Show passphrase")}">
                        <i class="fas fa-eye"></i>
                    </button>
                </div>
                <div class="e2ee-password-field">
                    <label for="e2ee-new-passphrase-input">${gettext("New passphrase")}</label>
                    <input type="password" id="e2ee-new-passphrase-input" class="e2ee-password-input"
                           autocomplete="off" data-1p-ignore data-lp-ignore data-lpignore="true" data-bwignore data-form-type="other" />
                    <button type="button" class="e2ee-toggle-visibility" title="${gettext("Show passphrase")}">
                        <i class="fas fa-eye"></i>
                    </button>
                </div>
                <div class="e2ee-password-field">
                    <label for="e2ee-confirm-new-passphrase-input">${gettext("Confirm new passphrase")}</label>
                    <input type="password" id="e2ee-confirm-new-passphrase-input" class="e2ee-password-input"
                           autocomplete="off" data-1p-ignore data-lp-ignore data-lpignore="true" data-bwignore data-form-type="other" />
                </div>
                <div class="e2ee-password-error" id="e2ee-change-error"></div>
            </div>
        `

        const buttons = [
            {
                text: gettext("Change Passphrase"),
                classes: "fw-button fw-dark",
                click: () => {
                    const oldInput = document.getElementById(
                        "e2ee-old-passphrase-input"
                    )
                    const newInput = document.getElementById(
                        "e2ee-new-passphrase-input"
                    )
                    const confirmInput = document.getElementById(
                        "e2ee-confirm-new-passphrase-input"
                    )
                    const errorEl = document.getElementById("e2ee-change-error")

                    const oldPassphrase = oldInput ? oldInput.value : ""
                    const newPassphrase = newInput ? newInput.value : ""
                    const confirmPassphrase = confirmInput
                        ? confirmInput.value
                        : ""

                    if (oldPassphrase.length === 0) {
                        if (errorEl) {
                            errorEl.textContent = gettext(
                                "Please enter your current passphrase."
                            )
                        }
                        return
                    }

                    if (newPassphrase.length < 8) {
                        if (errorEl) {
                            errorEl.textContent = gettext(
                                "Passphrase must be at least 8 characters long."
                            )
                        }
                        return
                    }

                    if (newPassphrase !== confirmPassphrase) {
                        if (errorEl) {
                            errorEl.textContent = gettext(
                                "Passphrases do not match."
                            )
                        }
                        return
                    }

                    dialogInstance.close()
                    onChange({oldPassphrase, newPassphrase})
                    resolve()
                }
            },
            {
                text: gettext("Cancel"),
                classes: "fw-button fw-light",
                click: () => {
                    dialogInstance.close()
                    resolve()
                }
            }
        ]

        const dialog = {
            title: gettext("Change Encryption Passphrase"),
            id: dialogId,
            body: body,
            buttons: buttons,
            canClose: true
        }

        const dialogInstance = new _common__rspack_import_0.Dialog(dialog)
        dialogInstance.open()

        setTimeout(() => {
            const toggleBtns = document.querySelectorAll(
                `#${dialogId} .e2ee-toggle-visibility`
            )
            toggleBtns.forEach(btn => {
                btn.addEventListener("click", () => {
                    const input = btn.parentElement.querySelector("input")
                    if (input) {
                        if (input.type === "password") {
                            input.type = "text"
                            btn.innerHTML = '<i class="fas fa-eye-slash"></i>'
                        } else {
                            input.type = "password"
                            btn.innerHTML = '<i class="fas fa-eye"></i>'
                        }
                    }
                })
            })

            const confirmInput = document.getElementById(
                "e2ee-confirm-new-passphrase-input"
            )
            if (confirmInput) {
                confirmInput.addEventListener("keypress", event => {
                    if (event.key === "Enter") {
                        event.preventDefault()
                        buttons[0].click()
                    }
                })
            }
        }, 100)
    })
}


}),
"./js/modules/editor/e2ee/password-dialog.js": (function (__unused_rspack_module, __webpack_exports__, __webpack_require__) {
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  changePasswordDialog: function() { return changePasswordDialog; },
  createPasswordDialog: function() { return createPasswordDialog; },
  enterPasswordDialog: function() { return enterPasswordDialog; },
  passwordStrength: function() { return passwordStrength; },
  strengthInfo: function() { return strengthInfo; },
  validatePassword: function() { return validatePassword; }
});
/* import */ var _common__rspack_import_0 = __webpack_require__("./js/modules/common/index.js");
/**
 * E2EE Password Dialog - UI for entering, creating, and changing
 * document passwords for end-to-end encrypted documents.
 *
 * Provides three dialog types:
 * 1. Enter password - when opening an encrypted document
 * 2. Create password - when creating a new encrypted document
 * 3. Change password - when changing the password of an existing encrypted document
 *
 * Password requirements:
 * - Minimum 5 characters
 * While the requirements are not satisfactory for security,
 * the user is shown a degree of weakness and is therefore encouraged to use a stronger password.
 */



/**
 * Validate a password against the minimum requirements.
 *
 * @param {string} password - The password to validate
 * @returns {{valid: boolean, message: string}} Validation result
 */
function validatePassword(password) {
    if (!password || password.length < 5) {
        return {
            valid: false,
            message: gettext("Password must be at least 5 characters long.")
        }
    }
    return {valid: true, message: ""}
}

/**
 * Calculate a rough password strength score (0-4).
 *
 * Based on length, character variety, and common patterns.
 * This is a simple heuristic — not a substitute for a proper
 * password strength estimator like zxcvbn, but sufficient for
 * a basic strength meter.
 *
 * @param {string} password - The password to evaluate
 * @returns {number} Strength score from 0 (very weak) to 4 (very strong)
 */
function passwordStrength(password) {
    if (!password) {
        return 0
    }

    let score = 0

    // Length contributions
    if (password.length >= 12) {
        score++
    }
    if (password.length >= 16) {
        score++
    }
    if (password.length >= 20) {
        score++
    }

    // Character variety contributions
    const hasLower = /[a-z]/.test(password)
    const hasUpper = /[A-Z]/.test(password)
    const hasDigit = /[0-9]/.test(password)
    const hasSpecial = /[^a-zA-Z0-9]/.test(password)

    const varietyCount = [hasLower, hasUpper, hasDigit, hasSpecial].filter(
        Boolean
    ).length
    if (varietyCount >= 3) {
        score++
    }

    // Penalize very common patterns
    const commonPatterns = [
        /^123456/,
        /^123123/,
        /^password/i,
        /^qwerty/i,
        /^abc123/i,
        /(.)\1{3,}/ // Repeated characters (4+ in a row)
    ]
    for (const pattern of commonPatterns) {
        if (pattern.test(password)) {
            score = Math.max(0, score - 2)
            break
        }
    }

    return Math.min(4, Math.max(0, score))
}

/**
 * Get a CSS class and label for a password strength score.
 *
 * @param {number} score - Strength score from passwordStrength()
 * @returns {{cssClass: string, label: string}}
 */
function strengthInfo(score) {
    const levels = [
        {cssClass: "very-weak", label: gettext("Very weak")},
        {cssClass: "weak", label: gettext("Weak")},
        {cssClass: "fair", label: gettext("Fair")},
        {cssClass: "strong", label: gettext("Strong")},
        {cssClass: "very-strong", label: gettext("Very strong")}
    ]
    return levels[score] || levels[0]
}

/**
 * Show a dialog for entering the password to decrypt an E2EE document.
 *
 * This dialog is shown when a user opens an encrypted document.
 * The user must enter the password to derive the decryption key.
 *
 * If the URL contains a fragment (e.g., #PASSWORD from a share link),
 * the password field is pre-filled and the dialog can be auto-submitted.
 *
 * @param {Function} onPassword - Callback called with the entered password string
 * @param {string} [urlFragment] - Password from URL fragment (share link), if available
 * @returns {Promise<void>}
 */
function enterPasswordDialog(
    onPassword,
    urlFragment = "",
    onCancel = null
) {
    return new Promise(resolve => {
        const dialogId = "e2ee-enter-password"

        // If password was provided via URL fragment, use it directly
        if (urlFragment && urlFragment.length > 0) {
            onPassword(urlFragment)
            resolve()
            return
        }

        const body = `
            <div class="e2ee-password-dialog">
                <p>${gettext("This document is end-to-end encrypted. Enter the password to decrypt it.")}</p>
                <div class="e2ee-password-field">
                    <label for="e2ee-password-input">${gettext("Password")}</label>
                    <input type="password" id="e2ee-password-input" class="e2ee-password-input"
                           autocomplete="off" data-1p-ignore data-lp-ignore data-lpignore="true" data-bwignore data-form-type="other" autofocus />
                    <button type="button" class="e2ee-toggle-visibility" title="${gettext("Show password")}">
                        <i class="fas fa-eye"></i>
                    </button>
                </div>
                <div class="e2ee-password-error" id="e2ee-password-error"></div>
            </div>
        `

        // Declare dialogInstance before buttons so the click handler
        // can call dialogInstance.close().
        let dialogInstance

        const buttons = [
            {
                text: gettext("Decrypt"),
                classes: "fw-button fw-dark",
                click: () => {
                    const input = document.getElementById("e2ee-password-input")
                    const password = input ? input.value : ""
                    if (password.length === 0) {
                        const errorEl = document.getElementById(
                            "e2ee-password-error"
                        )
                        if (errorEl) {
                            errorEl.textContent = gettext(
                                "Please enter the password."
                            )
                        }
                        return
                    }
                    dialogInstance.close()
                    onPassword(password)
                    resolve()
                }
            },
            {
                text: gettext("Cancel"),
                classes: "fw-button fw-light",
                click: () => {
                    dialogInstance.close()
                    if (typeof onCancel === "function") {
                        onCancel()
                    }
                    resolve()
                }
            }
        ]

        const dialog = {
            title: gettext("Encrypted Document"),
            id: dialogId,
            body: body,
            buttons: buttons,
            canClose: true
        }

        // Use the Fidus Writer dialog system
        dialogInstance = new _common__rspack_import_0.Dialog(dialog)
        dialogInstance.open()

        // Set up toggle visibility button
        setTimeout(() => {
            const toggleBtn = document.querySelector(
                `#${dialogId} .e2ee-toggle-visibility`
            )
            const input = document.getElementById("e2ee-password-input")
            if (toggleBtn && input) {
                toggleBtn.addEventListener("click", () => {
                    if (input.type === "password") {
                        input.type = "text"
                        toggleBtn.innerHTML = '<i class="fas fa-eye-slash"></i>'
                        toggleBtn.title = gettext("Hide password")
                    } else {
                        input.type = "password"
                        toggleBtn.innerHTML = '<i class="fas fa-eye"></i>'
                        toggleBtn.title = gettext("Show password")
                    }
                })
            }

            // Submit on Enter key
            if (input) {
                input.addEventListener("keypress", event => {
                    if (event.key === "Enter") {
                        event.preventDefault()
                        buttons[0].click()
                    }
                })
                input.focus()
            }
        }, 100)
    })
}

/**
 * Show a dialog for creating a password for a new E2EE document.
 *
 * This dialog is shown when a user creates a new encrypted document.
 * The user must enter and confirm a password. The password must meet
 * the minimum requirements (12+ characters, at least one letter and
 * one number).
 *
 * @param {Function} onPassword - Callback called with the entered password string
 * @returns {Promise<void>}
 */
function createPasswordDialog(onPassword) {
    return new Promise(resolve => {
        const dialogId = "e2ee-create-password"

        const body = `
            <div class="e2ee-password-dialog">
                <p>${gettext("Set a password to encrypt this document. You will need this password to open the document in the future.")}</p>
                <p class="e2ee-password-hint">${gettext('Tip: Use a passphrase with multiple words, e.g. "correct-horse-battery-staple". This is both secure and easy to remember.')}</p>
                <div class="e2ee-password-field">
                    <label for="e2ee-new-password-input">${gettext("Password")}</label>
                    <input type="password" id="e2ee-new-password-input" class="e2ee-password-input"
                           autocomplete="off" data-1p-ignore data-lp-ignore data-lpignore="true" data-bwignore data-form-type="other" autofocus />
                    <button type="button" class="e2ee-toggle-visibility" title="${gettext("Show password")}">
                        <i class="fas fa-eye"></i>
                    </button>
                </div>
                <div class="e2ee-strength-meter">
                    <div class="e2ee-strength-bar" id="e2ee-strength-bar"></div>
                    <span class="e2ee-strength-label" id="e2ee-strength-label"></span>
                </div>
                <div class="e2ee-password-field">
                    <label for="e2ee-confirm-password-input">${gettext("Confirm password")}</label>
                    <input type="password" id="e2ee-confirm-password-input" class="e2ee-password-input"
                           autocomplete="off" data-1p-ignore data-lp-ignore data-lpignore="true" data-bwignore data-form-type="other" />
                </div>
                <div class="e2ee-password-error" id="e2ee-password-error"></div>
            </div>
        `

        const buttons = [
            {
                text: gettext("Create Encrypted Document"),
                classes: "fw-button fw-dark",
                click: () => {
                    const input = document.getElementById(
                        "e2ee-new-password-input"
                    )
                    const confirmInput = document.getElementById(
                        "e2ee-confirm-password-input"
                    )
                    const errorEl = document.getElementById(
                        "e2ee-password-error"
                    )
                    const password = input ? input.value : ""
                    const confirmPassword = confirmInput
                        ? confirmInput.value
                        : ""

                    // Validate password
                    const validation = validatePassword(password)
                    if (!validation.valid) {
                        if (errorEl) {
                            errorEl.textContent = validation.message
                        }
                        return
                    }

                    // Check confirmation
                    if (password !== confirmPassword) {
                        if (errorEl) {
                            errorEl.textContent = gettext(
                                "Passwords do not match."
                            )
                        }
                        return
                    }

                    dialogInstance.close()
                    onPassword(password)
                    resolve()
                }
            }
        ]

        const dialog = {
            title: gettext("Set Document Password"),
            id: dialogId,
            body: body,
            buttons: buttons,
            canClose: true
        }

        const dialogInstance = new _common__rspack_import_0.Dialog(dialog)
        dialogInstance.open()

        setTimeout(() => {
            // Set up toggle visibility buttons
            const toggleBtns = document.querySelectorAll(
                `#${dialogId} .e2ee-toggle-visibility`
            )
            toggleBtns.forEach(btn => {
                btn.addEventListener("click", () => {
                    const input = btn.parentElement.querySelector("input")
                    if (input) {
                        if (input.type === "password") {
                            input.type = "text"
                            btn.innerHTML = '<i class="fas fa-eye-slash"></i>'
                        } else {
                            input.type = "password"
                            btn.innerHTML = '<i class="fas fa-eye"></i>'
                        }
                    }
                })
            })

            // Set up strength meter
            const passwordInput = document.getElementById(
                "e2ee-new-password-input"
            )
            if (passwordInput) {
                passwordInput.addEventListener("input", () => {
                    const score = passwordStrength(passwordInput.value)
                    const info = strengthInfo(score)
                    const bar = document.getElementById("e2ee-strength-bar")
                    const label = document.getElementById("e2ee-strength-label")
                    if (bar) {
                        bar.className = `e2ee-strength-bar ${info.cssClass}`
                        bar.style.width = `${(score + 1) * 25}%`
                    }
                    if (label) {
                        label.textContent = info.label
                        label.className = `e2ee-strength-label ${info.cssClass}`
                    }
                })
                // Initialize strength meter
                passwordInput.dispatchEvent(new Event("input"))
                passwordInput.focus()
            }

            // Submit on Enter key in confirm field
            const confirmInput = document.getElementById(
                "e2ee-confirm-password-input"
            )
            if (confirmInput) {
                confirmInput.addEventListener("keypress", event => {
                    if (event.key === "Enter") {
                        event.preventDefault()
                        buttons[0].click()
                    }
                })
            }
        }, 100)
    })
}

/**
 * Show a dialog for changing the password of an existing E2EE document.
 *
 * The user must enter their current password (to verify identity),
 * then enter and confirm a new password.
 *
 * @param {Function} onPasswordChange - Callback called with
 *   {currentPassword: string, newPassword: string}
 * @param {Object} [options] - Optional settings
 * @param {string} [options.currentPassword] - Prefill current password field
 * @param {string} [options.suggestedNewPassword] - Prefill new password field
 * @param {boolean} [options.hideCurrentPassword] - Hide the current password field
 * @param {boolean} [options.showNewPasswordPlaintext] - Show new password as plain text
 * @param {string} [options.infoText] - Additional explanatory HTML paragraph
 * @returns {Promise<void>}
 */
function changePasswordDialog(onPasswordChange, options = {}) {
    return new Promise(resolve => {
        const dialogId = "e2ee-change-password"
        const currentPassword = options.currentPassword || ""
        const suggestedNewPassword = options.suggestedNewPassword || ""
        const hasPrefilledNew = suggestedNewPassword.length > 0
        const hideCurrentPassword = options.hideCurrentPassword || false
        const showNewPasswordPlaintext =
            options.showNewPasswordPlaintext || false
        const infoText = options.infoText || ""

        const currentPasswordField = hideCurrentPassword
            ? `<input type="hidden" id="e2ee-current-password-input" value="${(0,_common__rspack_import_0.escapeText)(currentPassword)}" />`
            : `<div class="e2ee-password-field">
                    <label for="e2ee-current-password-input">${gettext("Current password")}</label>
                    <input type="password" id="e2ee-current-password-input" class="e2ee-password-input"
                           value="${(0,_common__rspack_import_0.escapeText)(currentPassword)}"
                           autocomplete="off" data-1p-ignore data-lp-ignore data-lpignore="true" data-bwignore data-form-type="other" autofocus />
                </div>
                <hr />`

        const newPasswordInputType = showNewPasswordPlaintext
            ? "text"
            : "password"

        const body = `
            <div class="e2ee-password-dialog">
                <p>${gettext("Change the document password. After changing, you must share the new password with all collaborators.")}</p>
                ${infoText ? `<p class="e2ee-password-hint">${infoText}</p>` : ""}
                ${currentPasswordField}
                <div class="e2ee-password-field">
                    <label for="e2ee-new-password-input">${gettext("New password")}</label>
                    <input type="${newPasswordInputType}" id="e2ee-new-password-input" class="e2ee-password-input"
                           value="${(0,_common__rspack_import_0.escapeText)(suggestedNewPassword)}"
                           autocomplete="off" data-1p-ignore data-lp-ignore data-lpignore="true" data-bwignore data-form-type="other" ${hideCurrentPassword ? "autofocus" : ""} />
                    ${
                        showNewPasswordPlaintext
                            ? ""
                            : `<button type="button" class="e2ee-toggle-visibility" title="${gettext("Show password")}">
                               <i class="fas fa-eye"></i>
                           </button>`
                    }
                </div>
                <div class="e2ee-strength-meter" style="display: ${showNewPasswordPlaintext && hasPrefilledNew ? "none" : ""}">
                    <div class="e2ee-strength-bar" id="e2ee-strength-bar"></div>
                    <span class="e2ee-strength-label" id="e2ee-strength-label"></span>
                </div>
                <div class="e2ee-password-field" id="e2ee-confirm-field" style="display: ${hasPrefilledNew ? "none" : ""}">
                    <label for="e2ee-confirm-password-input">${gettext("Confirm new password")}</label>
                    <input type="password" id="e2ee-confirm-password-input" class="e2ee-password-input"
                           autocomplete="off" data-1p-ignore data-lp-ignore data-lpignore="true" data-bwignore data-form-type="other" />
                </div>
                <div class="e2ee-password-error" id="e2ee-password-error"></div>
            </div>
        `

        let newPasswordChanged = !hasPrefilledNew

        const buttons = [
            {
                text: gettext("Change Password"),
                classes: "fw-button fw-dark",
                click: () => {
                    const currentInput = document.getElementById(
                        "e2ee-current-password-input"
                    )
                    const newInput = document.getElementById(
                        "e2ee-new-password-input"
                    )
                    const confirmInput = document.getElementById(
                        "e2ee-confirm-password-input"
                    )
                    const errorEl = document.getElementById(
                        "e2ee-password-error"
                    )

                    const currentPasswordValue = currentInput
                        ? currentInput.value
                        : ""
                    const newPassword = newInput ? newInput.value : ""
                    const confirmPassword = confirmInput
                        ? confirmInput.value
                        : ""

                    // Validate current password
                    if (currentPasswordValue.length === 0) {
                        if (errorEl) {
                            errorEl.textContent = gettext(
                                "Please enter the current password."
                            )
                        }
                        return
                    }

                    // Validate new password
                    const validation = validatePassword(newPassword)
                    if (!validation.valid) {
                        if (errorEl) {
                            errorEl.textContent = validation.message
                        }
                        return
                    }

                    // Check confirmation only if user changed the prefilled value
                    if (newPasswordChanged && newPassword !== confirmPassword) {
                        if (errorEl) {
                            errorEl.textContent = gettext(
                                "Passwords do not match."
                            )
                        }
                        return
                    }

                    // Check that new password is different
                    if (currentPasswordValue === newPassword) {
                        if (errorEl) {
                            errorEl.textContent = gettext(
                                "New password must be different from the current password."
                            )
                        }
                        return
                    }

                    dialogInstance.close()
                    onPasswordChange({
                        currentPassword: currentPasswordValue,
                        newPassword
                    })
                    resolve()
                }
            }
        ]

        const dialog = {
            title: gettext("Change Document Password"),
            id: dialogId,
            body: body,
            buttons: buttons,
            canClose: true
        }

        const dialogInstance = new _common__rspack_import_0.Dialog(dialog)
        dialogInstance.open()

        setTimeout(() => {
            // Set up toggle visibility buttons (only if new password is not plaintext)
            if (!showNewPasswordPlaintext) {
                const toggleBtns = document.querySelectorAll(
                    `#${dialogId} .e2ee-toggle-visibility`
                )
                toggleBtns.forEach(btn => {
                    btn.addEventListener("click", () => {
                        const input = btn.parentElement.querySelector("input")
                        if (input) {
                            if (input.type === "password") {
                                input.type = "text"
                                btn.innerHTML =
                                    '<i class="fas fa-eye-slash"></i>'
                            } else {
                                input.type = "password"
                                btn.innerHTML = '<i class="fas fa-eye"></i>'
                            }
                        }
                    })
                })
            }

            // Set up strength meter
            const passwordInput = document.getElementById(
                "e2ee-new-password-input"
            )
            if (
                passwordInput &&
                !(showNewPasswordPlaintext && hasPrefilledNew)
            ) {
                passwordInput.addEventListener("input", () => {
                    const score = passwordStrength(passwordInput.value)
                    const info = strengthInfo(score)
                    const bar = document.getElementById("e2ee-strength-bar")
                    const label = document.getElementById("e2ee-strength-label")
                    if (bar) {
                        bar.className = `e2ee-strength-bar ${info.cssClass}`
                        bar.style.width = `${(score + 1) * 25}%`
                    }
                    if (label) {
                        label.textContent = info.label
                        label.className = `e2ee-strength-label ${info.cssClass}`
                    }
                })
                passwordInput.dispatchEvent(new Event("input"))
            }

            // Track changes to new password field
            if (passwordInput && hasPrefilledNew) {
                passwordInput.addEventListener("input", () => {
                    if (passwordInput.value !== suggestedNewPassword) {
                        newPasswordChanged = true
                        const confirmField =
                            document.getElementById("e2ee-confirm-field")
                        if (confirmField) {
                            confirmField.style.display = ""
                        }
                        // Show strength meter again if user edits the prefilled value
                        const strengthMeter = document.querySelector(
                            `#${dialogId} .e2ee-strength-meter`
                        )
                        if (strengthMeter) {
                            strengthMeter.style.display = ""
                        }
                    }
                })
            }

            // Submit on Enter key
            const confirmInput = document.getElementById(
                "e2ee-confirm-password-input"
            )
            if (confirmInput) {
                confirmInput.addEventListener("keypress", event => {
                    if (event.key === "Enter") {
                        event.preventDefault()
                        buttons[0].click()
                    }
                })
            }

            const currentInput = document.getElementById(
                "e2ee-current-password-input"
            )
            if (currentInput && !hideCurrentPassword) {
                currentInput.focus()
            } else if (passwordInput) {
                passwordInput.focus()
            }
        }, 100)
    })
}


}),

}]);