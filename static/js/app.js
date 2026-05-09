(function() {
var __webpack_modules__ = ({
"./js/modules/404/index.js": (function (__unused_rspack_module, __webpack_exports__, __webpack_require__) {
"use strict";
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  Page404: function() { return Page404; }
});
/* import */ var _prelogin__rspack_import_0 = __webpack_require__("./js/modules/prelogin/index.js");


class Page404 extends _prelogin__rspack_import_0.PreloginPage {
    constructor({app, language}) {
        super({app, language})
        this.title = gettext("Page not found")
        this.contents = `<div class="fw-login-left">
            <h1 class="fw-login-title">${gettext("Error 404")}</h1>
            <p>${gettext("The page you are looking for cannot be found.")}</p>
        </div>`
    }
}


}),
"./js/modules/app/index.js": (function (__unused_rspack_module, __webpack_exports__, __webpack_require__) {
"use strict";
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  App: function() { return App; }
});
/* import */ var citeproc_plus__rspack_import_0 = __webpack_require__("./node_modules/.pnpm/citeproc-plus@0.3.6/node_modules/citeproc-plus/dist/index.js");
/* import */ var _plugins_app__rspack_import_1 = __webpack_require__("./js/plugins/app/index.js");
/* import */ var _404__rspack_import_2 = __webpack_require__("./js/modules/404/index.js");
/* import */ var _bibliography_database__rspack_import_3 = __webpack_require__("./js/modules/bibliography/database/index.js");
/* import */ var _common__rspack_import_4 = __webpack_require__("./js/modules/common/index.js");
/* import */ var _common_settings__rspack_import_5 = __webpack_require__("./js/modules/common/settings.js");
/* import */ var _contacts__rspack_import_6 = __webpack_require__("./js/modules/contacts/index.js");
/* import */ var _contacts_invite__rspack_import_7 = __webpack_require__("./js/modules/contacts/invite.js");
/* import */ var _email_confirm__rspack_import_8 = __webpack_require__("./js/modules/email_confirm/index.js");
/* import */ var _flatpage__rspack_import_9 = __webpack_require__("./js/modules/flatpage/index.js");
/* import */ var _images_database__rspack_import_10 = __webpack_require__("./js/modules/images/database.js");
/* import */ var _images_overview__rspack_import_11 = __webpack_require__("./js/modules/images/overview/index.js");
/* import */ var _indexed_db__rspack_import_12 = __webpack_require__("./js/modules/indexed_db/index.js");
/* import */ var _login__rspack_import_13 = __webpack_require__("./js/modules/login/index.js");
/* import */ var _offline__rspack_import_14 = __webpack_require__("./js/modules/offline/index.js");
/* import */ var _password_reset__rspack_import_15 = __webpack_require__("./js/modules/password_reset/index.js");
/* import */ var _profile__rspack_import_16 = __webpack_require__("./js/modules/profile/index.js");
/* import */ var _setup__rspack_import_17 = __webpack_require__("./js/modules/setup/index.js");
/* import */ var _signup__rspack_import_18 = __webpack_require__("./js/modules/signup/index.js");

//import * as OfflinePluginRuntime from "@lcdp/offline-plugin/runtime"




















class App {
    constructor(settings = {}) {
        (0,_common_settings__rspack_import_5.initSettings)(settings)
        this.settings = (0,_common_settings__rspack_import_5.getSettings)()
        this.config = {}
        this.name = "Fidus Writer"
        this.config.app = this
        this.routes = {
            "": {
                app: "document",
                requireLogin: true,
                open: () =>
                    Promise.all(/* import() */ [__webpack_require__.e("vendors-node_modules_pnpm_biblatex-csl-converter_3_6_0_node_modules_biblatex-csl-converter_li-d3812c"), __webpack_require__.e("vendors-node_modules_pnpm_prosemirror-commands_1_7_0_node_modules_prosemirror-commands_dist_i-9c513b"), __webpack_require__.e("vendors-node_modules_pnpm_cropperjs_1_6_2_node_modules_cropperjs_dist_cropper_js"), __webpack_require__.e("vendors-node_modules_pnpm_jszip_3_10_1_node_modules_jszip_dist_jszip_min_js"), __webpack_require__.e("vendors-node_modules_pnpm_downloadjs_1_4_7_node_modules_downloadjs_download_js-node_modules_p-484d68"), __webpack_require__.e("vendors-node_modules_pnpm_fastdom_1_0_11_node_modules_fastdom_fastdom_js-node_modules_pnpm_pr-cb5a3c"), __webpack_require__.e("vendors-node_modules_pnpm_fast-xml-parser_4_5_0_node_modules_fast-xml-parser_src_fxp_js"), __webpack_require__.e("vendors-node_modules_pnpm_mathml-to-latex_1_4_3_node_modules_mathml-to-latex_dist_bundle_min_js"), __webpack_require__.e("js_modules_editor_e2ee_passphrase-dialog_js"), __webpack_require__.e("js_modules_editor_e2ee_passphrase-manager_js"), __webpack_require__.e("js_modules_editor_e2ee_encryptor_js-js_modules_images_edit_dialog_model_js"), __webpack_require__.e("editor"), __webpack_require__.e("js_modules_exporter_tools_xml_js"), __webpack_require__.e("js_modules_documents_overview_index_js")]).then(__webpack_require__.bind(__webpack_require__, "./js/modules/documents/overview/index.js")).then(
                        ({DocumentOverview}) =>
                            new DocumentOverview(this.config)
                    )
            },
            account: {
                app: "user",
                requireLogin: false,
                open: pathnameParts => {
                    let returnValue
                    switch (pathnameParts[2]) {
                        case "confirm-email": {
                            const key = pathnameParts[3]
                            returnValue = new _email_confirm__rspack_import_8.EmailConfirm(this.config, key)
                            break
                        }
                        case "password-reset":
                            returnValue = new _password_reset__rspack_import_15.PasswordResetRequest(this.config)
                            break
                        case "change-password": {
                            const key = pathnameParts[3]
                            returnValue = new _password_reset__rspack_import_15.PasswordResetChangePassword(
                                this.config,
                                key
                            )
                            break
                        }
                        case "sign-up":
                            returnValue = new _signup__rspack_import_18.Signup(this.config)
                            break
                        default:
                            returnValue = false
                    }
                    return returnValue
                }
            },
            bibliography: {
                app: "bibliography",
                requireLogin: true,
                open: () =>
                    Promise.all(/* import() */ [__webpack_require__.e("vendors-node_modules_pnpm_biblatex-csl-converter_3_6_0_node_modules_biblatex-csl-converter_li-d3812c"), __webpack_require__.e("vendors-node_modules_pnpm_downloadjs_1_4_7_node_modules_downloadjs_download_js-node_modules_p-484d68"), __webpack_require__.e("js_modules_bibliography_overview_index_js")]).then(__webpack_require__.bind(__webpack_require__, "./js/modules/bibliography/overview/index.js")).then(
                        ({BibliographyOverview}) =>
                            new BibliographyOverview(this.config)
                    )
            },
            document: {
                app: "document",
                requireLogin: true,
                open: pathnameParts => {
                    let id = pathnameParts.pop()
                    if (!id.length) {
                        id = pathnameParts.pop()
                    }
                    const path = (
                        "/" + pathnameParts.slice(2).join("/")
                    ).replace(/\/?$/, "/")
                    return Promise.all(/* import() | editor */ [__webpack_require__.e("vendors-node_modules_pnpm_biblatex-csl-converter_3_6_0_node_modules_biblatex-csl-converter_li-d3812c"), __webpack_require__.e("vendors-node_modules_pnpm_prosemirror-commands_1_7_0_node_modules_prosemirror-commands_dist_i-9c513b"), __webpack_require__.e("vendors-node_modules_pnpm_cropperjs_1_6_2_node_modules_cropperjs_dist_cropper_js"), __webpack_require__.e("vendors-node_modules_pnpm_jszip_3_10_1_node_modules_jszip_dist_jszip_min_js"), __webpack_require__.e("vendors-node_modules_pnpm_downloadjs_1_4_7_node_modules_downloadjs_download_js-node_modules_p-484d68"), __webpack_require__.e("vendors-node_modules_pnpm_fastdom_1_0_11_node_modules_fastdom_fastdom_js-node_modules_pnpm_pr-cb5a3c"), __webpack_require__.e("js_modules_editor_e2ee_passphrase-dialog_js"), __webpack_require__.e("js_modules_editor_e2ee_passphrase-manager_js"), __webpack_require__.e("js_modules_editor_e2ee_encryptor_js-js_modules_images_edit_dialog_model_js"), __webpack_require__.e("editor")]).then(__webpack_require__.bind(__webpack_require__, "./js/modules/editor/index.js")).then(({Editor}) => new Editor(this.config, path, id))
                },
                dbTables: {
                    data: {
                        keyPath: "id"
                    }
                }
            },
            share: {
                // Document shared via document link
                app: "document",
                requireLogin: false,
                open: pathnameParts => {
                    let token = pathnameParts.pop()
                    if (!token.length) {
                        token = pathnameParts.pop()
                    }
                    const path = "/"
                    return Promise.all(/* import() | editor */ [__webpack_require__.e("vendors-node_modules_pnpm_biblatex-csl-converter_3_6_0_node_modules_biblatex-csl-converter_li-d3812c"), __webpack_require__.e("vendors-node_modules_pnpm_prosemirror-commands_1_7_0_node_modules_prosemirror-commands_dist_i-9c513b"), __webpack_require__.e("vendors-node_modules_pnpm_cropperjs_1_6_2_node_modules_cropperjs_dist_cropper_js"), __webpack_require__.e("vendors-node_modules_pnpm_jszip_3_10_1_node_modules_jszip_dist_jszip_min_js"), __webpack_require__.e("vendors-node_modules_pnpm_downloadjs_1_4_7_node_modules_downloadjs_download_js-node_modules_p-484d68"), __webpack_require__.e("vendors-node_modules_pnpm_fastdom_1_0_11_node_modules_fastdom_fastdom_js-node_modules_pnpm_pr-cb5a3c"), __webpack_require__.e("js_modules_editor_e2ee_passphrase-dialog_js"), __webpack_require__.e("js_modules_editor_e2ee_passphrase-manager_js"), __webpack_require__.e("js_modules_editor_e2ee_encryptor_js-js_modules_images_edit_dialog_model_js"), __webpack_require__.e("editor")]).then(__webpack_require__.bind(__webpack_require__, "./js/modules/editor/index.js")).then(({Editor}) => new Editor(this.config, path, token))
                }
            },
            documents: {
                app: "document",
                requireLogin: true,
                open: pathnameParts => {
                    const path = (
                        "/" + pathnameParts.slice(2).join("/")
                    ).replace(/\/?$/, "/")
                    return Promise.all(/* import() */ [__webpack_require__.e("vendors-node_modules_pnpm_biblatex-csl-converter_3_6_0_node_modules_biblatex-csl-converter_li-d3812c"), __webpack_require__.e("vendors-node_modules_pnpm_prosemirror-commands_1_7_0_node_modules_prosemirror-commands_dist_i-9c513b"), __webpack_require__.e("vendors-node_modules_pnpm_cropperjs_1_6_2_node_modules_cropperjs_dist_cropper_js"), __webpack_require__.e("vendors-node_modules_pnpm_jszip_3_10_1_node_modules_jszip_dist_jszip_min_js"), __webpack_require__.e("vendors-node_modules_pnpm_downloadjs_1_4_7_node_modules_downloadjs_download_js-node_modules_p-484d68"), __webpack_require__.e("vendors-node_modules_pnpm_fastdom_1_0_11_node_modules_fastdom_fastdom_js-node_modules_pnpm_pr-cb5a3c"), __webpack_require__.e("vendors-node_modules_pnpm_fast-xml-parser_4_5_0_node_modules_fast-xml-parser_src_fxp_js"), __webpack_require__.e("vendors-node_modules_pnpm_mathml-to-latex_1_4_3_node_modules_mathml-to-latex_dist_bundle_min_js"), __webpack_require__.e("js_modules_editor_e2ee_passphrase-dialog_js"), __webpack_require__.e("js_modules_editor_e2ee_passphrase-manager_js"), __webpack_require__.e("js_modules_editor_e2ee_encryptor_js-js_modules_images_edit_dialog_model_js"), __webpack_require__.e("editor"), __webpack_require__.e("js_modules_exporter_tools_xml_js"), __webpack_require__.e("js_modules_documents_overview_index_js")]).then(__webpack_require__.bind(__webpack_require__, "./js/modules/documents/overview/index.js")).then(
                        ({DocumentOverview}) =>
                            new DocumentOverview(this.config, path)
                    )
                }
            },
            pages: {
                app: "base",
                open: pathnameParts => {
                    const url = `/${pathnameParts[2]}/`
                    return new _flatpage__rspack_import_9.FlatPage(this.config, url)
                }
            },
            user: {
                app: "user",
                requireLogin: true,
                open: pathnameParts => {
                    let returnValue
                    switch (pathnameParts[2]) {
                        case "profile":
                            returnValue = new _profile__rspack_import_16.Profile(this.config)
                            break
                        case "contacts":
                            returnValue = new _contacts__rspack_import_6.ContactsOverview(this.config)
                            break
                        default:
                            returnValue = false
                    }
                    return returnValue
                },
                dbTables: {
                    data: {
                        keyPath: "id"
                    }
                }
            },
            invite: {
                app: "user",
                open: pathnameParts => {
                    const id = pathnameParts[2]
                    return new _contacts_invite__rspack_import_7.ContactInvite(this.config, id)
                }
            },
            usermedia: {
                app: "usermedia",
                requireLogin: true,
                open: () => new _images_overview__rspack_import_11.ImageOverview(this.config)
            }
        }
        this.openLoginPage = () => new _login__rspack_import_13.LoginPage(this.config)
        this.openOfflinePage = () => new _offline__rspack_import_14.OfflinePage(this.config)
        this.openSetupPage = () => new _setup__rspack_import_17.SetupPage(this.config)
        this.open404Page = () => new _404__rspack_import_2.Page404(this.config)
        this.handleSWUpdate = () => window.location.reload()
    }

    isOffline() {
        return (
            !navigator.onLine ||
            (this.ws?.connectionCount > 0 && !this.ws?.connected)
        )
    }

    alertCached() {
        (0,_common__rspack_import_4.addAlert)(
            "info",
            gettext("You are viewing a cached version of this page.")
        )
    }

    installServiceWorker() {
        /* This function is used for testing SW with Django tests */
        if ("serviceWorker" in navigator) {
            navigator.serviceWorker
                .register("/sw.js")
                .then(registration => {
                    console.log("SW registered: ", registration)
                })
                .catch(registrationError => {
                    console.log("SW registration failed: ", registrationError)
                })
        }
    }

    init() {
        if (
            !this.settings.DEBUG &&
            this.settings.USE_SERVICE_WORKER &&
            "serviceWorker" in navigator
        ) {
            navigator.serviceWorker
                .register("/sw.js")
                .then(registration => {
                    console.log("SW registered: ", registration)
                })
                .catch(registrationError => {
                    console.log("SW registration failed: ", registrationError)
                })
        }
        (0,_common__rspack_import_4.ensureCSS)([staticUrl("css/fontawesome/css/all.css")])
        // Disable automatic scroll restoration to prevent Safari from
        // auto-scrolling to focused elements (like the document table)
        // which causes the header/menu to be hidden on page load
        if ("scrollRestoration" in history) {
            history.scrollRestoration = "manual"
        }
        // Ensure we start at the top of the page
        window.scrollTo(0, 0)
        if (this.isOffline()) {
            this.page = this.openOfflinePage()
            return this.page.init()
        } else {
            return this.getConfiguration()
                .catch(error => {
                    if (error instanceof TypeError) {
                        // We could not fetch user info from server, so let's
                        // assume we are disconnected.
                        this.page = this.openOfflinePage()
                        this.page.init()
                    } else if (error.status === 405) {
                        // 405 indicates that the server is running but the
                        // method is not allowed. This must be the setup server.
                        // We show a setup message instead.
                        this.page = this.openSetupPage()
                        this.page.init()
                    } else if (this.settings.DEBUG) {
                        throw error
                    } else {
                        // We don't know what is going on, but we are in production
                        // mode. Hopefully the app will update soon.
                        this.page = this.openOfflinePage()
                        this.page.init()
                    }
                    return Promise.reject(false)
                })
                .then(() => this.setup())
                .catch(error => {
                    if (error === false) {
                        return
                    }
                    throw error
                })
        }
    }

    setup() {
        this.csl = new citeproc_plus__rspack_import_0.CSL()
        if (!this.config.user.is_authenticated) {
            this.activateFidusPlugins()
            return this.selectPage().then(() => this.bind())
        }
        this.bibDB = new _bibliography_database__rspack_import_3.BibliographyDB(this)
        this.imageDB = new _images_database__rspack_import_10.ImageDB(this)
        this.connectWs()
        return Promise.all([this.bibDB.getDB(), this.imageDB.getDB()])
            .then(() => {
                this.activateFidusPlugins()
                // Initialize the indexedDB after the plugins have loaded.
                this.indexedDB = new _indexed_db__rspack_import_12.IndexedDB(this)
                return this.indexedDB.init()
            })
            .then(() => this.selectPage())
            .then(() => this.bind())
            .then(() => this.showNews())
    }

    bind() {
        window.onpopstate = () => this.selectPage()
        document.addEventListener("click", event => {
            const el = {}
            switch (true) {
                case (0,_common__rspack_import_4.findTarget)(event, "a", el):
                    if (
                        el.target.hostname === window.location.hostname &&
                        el.target.getAttribute("href")[0] === "/" &&
                        el.target.getAttribute("href").slice(0, 7) !==
                            "/media/" &&
                        el.target.getAttribute("href").slice(0, 5) !== "/api/"
                    ) {
                        event.preventDefault()
                        event.stopImmediatePropagation()
                        this.goTo(decodeURI(el.target.href))
                    }
                    break
            }
        })
        let resizeDone
        window.addEventListener("resize", () => {
            clearTimeout(resizeDone)
            resizeDone = setTimeout(() => {
                if (this.page && this.page.onResize) {
                    this.page.onResize()
                }
            }, 250)
        })
        window.addEventListener("beforeunload", event => {
            if (this.page && this.page.onBeforeUnload) {
                if (this.page.onBeforeUnload()) {
                    event.preventDefault()
                    // To stop the event for chrome and safari
                    event.returnValue = ""
                    return ""
                }
            }
        })
    }

    showNews() {
        if (
            window.location.pathname !== "/user/contacts/" &&
            this.config.user.waiting_invites
        ) {
            (0,_common__rspack_import_4.showSystemMessage)(
                gettext(
                    "Other users have requested to connect with you. Go to the contacts page to accept their invites."
                ),
                [
                    {
                        text: gettext("Go to contacts"),
                        classes: "fw-dark",
                        click: _event => {
                            return this.goTo("/user/contacts/")
                        }
                    },
                    {type: "close"}
                ]
            )
        }
    }

    connectWs() {
        if (!this.config.ws_url_base) {
            return
        }
        this.ws = new _common__rspack_import_4.WebSocketConnector({
            base: this.config.ws_url_base,
            path: "/base/",
            appLoaded: () => true,
            receiveData: data => {
                switch (data.type) {
                    case "system_message":
                        (0,_common__rspack_import_4.showSystemMessage)(data.message)
                        break
                    default:
                        break
                }
            }
        })
        this.ws.init()
    }

    activateFidusPlugins() {
        if (this.plugins) {
            // Plugins have been activated already
            return
        }
        // Add plugins.
        this.plugins = {}

        Object.keys(_plugins_app__rspack_import_1).forEach(plugin => {
            if (typeof _plugins_app__rspack_import_1[plugin] === "function") {
                this.plugins[plugin] = new _plugins_app__rspack_import_1[plugin](this)
                this.plugins[plugin].init()
            }
        })
    }

    selectPage() {
        if (this.page && this.page.close) {
            this.page.close()
        }
        // Disable automatic scroll restoration to prevent Safari from
        // auto-scrolling to focused elements (like the document table)
        // which causes the header/menu to be hidden on page load
        if ("scrollRestoration" in history) {
            history.scrollRestoration = "manual"
        }
        // Ensure we start at the top of the page
        window.scrollTo(0, 0)
        const pathnameParts = decodeURI(window.location.pathname).split("/")
        const route = this.routes[pathnameParts[1]]
        if (route) {
            if (
                route.requireLogin &&
                !(this.config.user || {}).is_authenticated
            ) {
                this.page = this.openLoginPage()
                return this.page.init()
            }
            const page = route.open(pathnameParts)
            if (page.then) {
                return page.then(thisPage => {
                    this.page = thisPage
                    return this.page.init().then(() => {
                        if (this.isOffline()) {
                            this.alertCached()
                        }
                    })
                })
            } else if (page) {
                this.page = page
                return this.page.init().then(() => {
                    if (this.isOffline()) {
                        this.alertCached()
                    }
                })
            }
        }
        this.page = this.open404Page()
        return this.page.init()
    }

    getConfiguration() {
        return (0,_common__rspack_import_4.jsonPostJson)("/api/base/configuration/")
            .then(({json}) =>
                Object.entries(json).forEach(
                    ([key, value]) => (this.config[key] = value)
                )
            )
            .catch(error => {
                if (error instanceof Response && error.status === 403) {
                    // We could not fetch user info from server, so let's
                    // assume we are disconnected and delete all cookies.
                    // This will force the user to log in again.
                    //
                    // This is a bit of a hack, but it is the only way to make sure
                    // that the user is logged out when the server is not reachable.
                    document.cookie.split(";").forEach(cookie => {
                        const eqPos = cookie.indexOf("=")
                        const name =
                            eqPos > -1 ? cookie.substring(0, eqPos) : cookie
                        document.cookie =
                            name + "=;expires=Thu, 01 Jan 1970 00:00:00 GMT"
                    })
                    return Promise.reject(error)
                }
                throw error
            })
    }

    goTo(url) {
        window.history.pushState({}, "", encodeURI(url))
        return this.selectPage()
    }
}


}),
"./js/modules/bibliography/database/index.js": (function (__unused_rspack_module, __webpack_exports__, __webpack_require__) {
"use strict";
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  BibliographyDB: function() { return BibliographyDB; }
});
/* import */ var _common__rspack_import_0 = __webpack_require__("./js/modules/common/index.js");
/* import */ var _server_connector__rspack_import_1 = __webpack_require__("./js/modules/bibliography/database/server_connector.js");



const FW_LOCALSTORAGE_VERSION = "1.2"

class BibliographyDB {
    constructor(app) {
        this.app = app
        this.db = {}
        this.cats = []
        this.sc = new _server_connector__rspack_import_1.BibliographyDBServerConnector()
    }

    /** Get the bibliography from the server and create as this.db.
     * @function getDB
     */

    getDB() {
        const localStorageVersion = window.localStorage.getItem("version")
        let lastModified = Number.parseInt(
                window.localStorage.getItem("last_modified_biblist")
            ),
            numberOfEntries = Number.parseInt(
                window.localStorage.getItem("number_of_entries")
            ),
            localStorageOwnerId = Number.parseInt(
                window.localStorage.getItem("owner_id")
            )

        // A dictionary to look up bib fields by their fw type name.
        // Needed for translation to CSL and Biblatex.
        //Fill BibDB

        if (Number.isNaN(lastModified)) {
            lastModified = -1
        }

        if (Number.isNaN(numberOfEntries)) {
            numberOfEntries = -1
        }

        if (Number.isNaN(localStorageOwnerId)) {
            localStorageOwnerId = -1
        }

        if (localStorageVersion != FW_LOCALSTORAGE_VERSION) {
            lastModified = -1
            numberOfEntries = -1
            localStorageOwnerId = -1
        }
        (0,_common__rspack_import_0.activateWait)()
        return this.sc
            .getDB(lastModified, numberOfEntries, localStorageOwnerId)
            .then(
                ({bibCats, bibList, lastModified, numberOfEntries, userId}) => {
                    bibCats.forEach(bibCat => this.cats.push(bibCat))
                    if (bibList) {
                        try {
                            window.localStorage.setItem(
                                "biblist",
                                JSON.stringify(bibList)
                            )
                            window.localStorage.setItem(
                                "last_modified_biblist",
                                lastModified
                            )
                            window.localStorage.setItem(
                                "number_of_entries",
                                numberOfEntries
                            )
                            window.localStorage.setItem("owner_id", userId)
                            window.localStorage.setItem(
                                "version",
                                FW_LOCALSTORAGE_VERSION
                            )
                        } catch (error) {
                            // The local storage was likely too small
                            throw error
                        }
                    } else {
                        bibList = JSON.parse(
                            window.localStorage.getItem("biblist")
                        )
                    }
                    bibList.forEach(({id, bibDBEntry}) => {
                        this.db[id] = bibDBEntry
                    })
                    ;(0,_common__rspack_import_0.deactivateWait)()
                    return
                }
            )
            .catch(error => {
                (0,_common__rspack_import_0.addAlert)("error", gettext("Could not obtain bibliography data"))
                ;(0,_common__rspack_import_0.deactivateWait)()
                throw error
            })
    }

    /** Saves a bibliography entry to the database on the server.
     * @function saveBibEntries
     * @param tmpDB The bibliography DB with temporary IDs to be send to the server.
     */
    saveBibEntries(tmpDB, isNew) {
        return this.sc
            .saveBibEntries(tmpDB, isNew)
            .then(idTranslations =>
                this.updateLocalBibEntries(tmpDB, idTranslations)
            )
            .catch(error => {
                (0,_common__rspack_import_0.addAlert)(
                    "error",
                    gettext("The bibliography could not be updated")
                )
                if (this.app.isOffline()) {
                    (0,_common__rspack_import_0.addAlert)(
                        "info",
                        gettext(
                            "You are currently offline. Please try again when you are back online."
                        )
                    )
                } else {
                    throw error
                }
            })
    }

    updateLocalBibEntries(tmpDB, idTranslations) {
        idTranslations.forEach(bibTrans => {
            this.db[bibTrans[1]] = tmpDB[bibTrans[0]]
        })
        ;(0,_common__rspack_import_0.addAlert)("success", gettext("The bibliography has been updated."))
        return idTranslations
    }

    /** Update or create new category
     * @function saveCategories
     * @param cats The category objects to add.
     */
    saveCategories(cats) {
        (0,_common__rspack_import_0.activateWait)()

        return this.sc
            .saveCategories(cats)
            .then(bibCats => {
                // Replace the old with the new categories, but don't lose the link to the array (so delete each, then add each).
                while (this.cats.length > 0) {
                    this.cats.pop()
                }
                while (bibCats.length > 0) {
                    this.cats.push(bibCats.pop())
                }
                (0,_common__rspack_import_0.addAlert)("success", gettext("The categories have been updated"))
                ;(0,_common__rspack_import_0.deactivateWait)()
                return this.cats
            })
            .catch(error => {
                (0,_common__rspack_import_0.addAlert)(
                    "error",
                    gettext("The categories could not be updated")
                )
                ;(0,_common__rspack_import_0.deactivateWait)()
                if (this.app.isOffline()) {
                    (0,_common__rspack_import_0.addAlert)(
                        "info",
                        gettext(
                            "You are currently offline. Please try again when you are back online."
                        )
                    )
                } else {
                    throw error
                }
            })
    }

    /** Delete a categories
     * @function deleteCategory
     * @param ids A list of ids to delete.
     */
    deleteCategory(ids) {
        return this.sc.deleteCategory(ids).then(() => {
            const deletedPks = ids.slice()
            const deletedBibCats = []
            this.cats.forEach(bibCat => {
                if (ids.indexOf(bibCat.id) !== -1) {
                    deletedBibCats.push(bibCat)
                }
            })
            deletedBibCats.forEach(bibCat => {
                const index = this.cats.indexOf(bibCat)
                this.cats.splice(index, 1)
            })
            return deletedPks
        })
    }

    /** Delete a list of bibliography items both locally and on the server.
     * @function deleteBibEntries
     * @param ids A list of bibliography item ids that are to be deleted.
     */
    deleteBibEntries(ids) {
        (0,_common__rspack_import_0.activateWait)()
        ids = ids.map(id => Number.parseInt(id))
        return this.sc
            .deleteBibEntries(ids)
            .then(() => {
                ids.forEach(id => {
                    delete this.db[id]
                })
                ;(0,_common__rspack_import_0.addAlert)(
                    "success",
                    gettext("The bibliography item(s) have been deleted")
                )
                ;(0,_common__rspack_import_0.deactivateWait)()
                return ids
            })
            .catch(error => {
                (0,_common__rspack_import_0.addAlert)(
                    "error",
                    "The bibliography item(s) could not be deleted"
                )
                ;(0,_common__rspack_import_0.deactivateWait)()
                if (this.app.isOffline()) {
                    (0,_common__rspack_import_0.addAlert)(
                        "info",
                        gettext(
                            "You are currently offline. Please try again when you are back online."
                        )
                    )
                } else {
                    throw error
                }
            })
    }
}


}),
"./js/modules/bibliography/database/server_connector.js": (function (__unused_rspack_module, __webpack_exports__, __webpack_require__) {
"use strict";
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  BibliographyDBServerConnector: function() { return BibliographyDBServerConnector; }
});
/* import */ var _common_network__rspack_import_0 = __webpack_require__("./js/modules/common/network.js");


// class for server calls of BibliographyDB.
class BibliographyDBServerConnector {
    constructor() {}

    getDB(lastModified, numberOfEntries, localStorageOwnerId) {
        return (0,_common_network__rspack_import_0.jsonPostJson)("/api/bibliography/biblist/", {
            last_modified: lastModified,
            number_of_entries: numberOfEntries,
            user_id: localStorageOwnerId
        }).then(({json}) => {
            return {
                bibCats: json["bib_categories"],
                bibList: json.hasOwnProperty("bib_list")
                    ? json["bib_list"].map(item =>
                          this.serverBibItemToBibDB(item)
                      )
                    : false,
                lastModified: json["last_modified"],
                numberOfEntries: json["number_of_entries"],
                userId: json["user_id"]
            }
        })
    }

    /** Converts a bibliography item as it arrives from the server to a BibDB object.
     * @function serverBibItemToBibDB
     * @param item The bibliography item from the server.
     */
    serverBibItemToBibDB(bibDBEntry) {
        return {id: bibDBEntry["id"], bibDBEntry}
    }

    saveBibEntries(tmpDB, isNew) {
        return (0,_common_network__rspack_import_0.jsonPostJson)("/api/bibliography/save/", {
            is_new: isNew,
            bibs: tmpDB
        }).then(({json}) => json["id_translations"])
    }

    saveCategories(cats) {
        return (0,_common_network__rspack_import_0.jsonPostJson)("/api/bibliography/save_category/", cats).then(
            ({json}) => {
                return json.entries
            }
        )
    }

    deleteCategory(ids) {
        return (0,_common_network__rspack_import_0.jsonPost)("/api/bibliography/delete_category/", {ids})
    }

    deleteBibEntries(ids) {
        return (0,_common_network__rspack_import_0.jsonPost)("/api/bibliography/delete/", {ids})
    }
}


}),
"./js/modules/common/basic.js": (function (__unused_rspack_module, __webpack_exports__, __webpack_require__) {
"use strict";
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
"use strict";
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
"use strict";
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
"use strict";
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
"use strict";
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
"use strict";
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
"use strict";
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
"use strict";
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
"use strict";
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
"use strict";
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
"use strict";
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
"use strict";
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
"use strict";
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
"use strict";
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
"use strict";
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
"use strict";
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
"use strict";
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
"use strict";
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
"use strict";
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
"use strict";
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
"use strict";
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
"use strict";
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
"use strict";
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
"./js/modules/contacts/add_dialog.js": (function (__unused_rspack_module, __webpack_exports__, __webpack_require__) {
"use strict";
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  AddContactDialog: function() { return AddContactDialog; }
});
/* import */ var _common__rspack_import_0 = __webpack_require__("./js/modules/common/index.js");
/* import */ var _templates__rspack_import_1 = __webpack_require__("./js/modules/contacts/templates.js");



//dialog for adding a user to contacts
class AddContactDialog {
    constructor(settings) {
        this.settings = settings
    }

    init() {
        return new Promise(resolve => {
            const buttons = [
                {
                    text: gettext("Submit"),
                    classes: "fw-dark",
                    click: () => {
                        const userString = document.getElementById(
                            "new-contact-user-string"
                        ).value
                        document
                            .querySelectorAll("#add-new-contact .warning")
                            .forEach(el => el.parentElement.removeChild(el))
                        const userStrings = userString.split(/[\s,;]+/)
                        let chain = Promise.resolve([])

                        userStrings
                            .filter(singleUserString => singleUserString.length)
                            .forEach(
                                singleUserString =>
                                    (chain = chain.then(responses =>
                                        this.addContact(singleUserString).then(
                                            data => [...responses, data]
                                        )
                                    ))
                            )
                        Promise.resolve(chain).then(contactData => {
                            if (contactData.length) {
                                dialog.close()
                                resolve(contactData)
                            }
                        })
                    }
                },
                {
                    type: "cancel"
                }
            ]

            const dialog = new _common__rspack_import_0.Dialog({
                id: "add-new-contact",
                title:
                    this.settings?.REGISTRATION_OPEN ||
                    this.settings?.SOCIALACCOUNT_OPEN
                        ? gettext("Add contact or invite new user")
                        : gettext("Add contact"),
                body: (0,_templates__rspack_import_1.addContactTemplate)(),
                width: 350,
                height: 250,
                buttons
            })

            dialog.open()

            document.getElementById("new-contact-user-string").style.width =
                "340"
        })
    }

    addContact(userString) {
        //add a user to contact per ajax
        if (null === userString || "undefined" == typeof userString) {
            return (0,_common__rspack_import_0.cancelPromise)()
        }

        userString = userString.trim()
        if ("" === userString) {
            return (0,_common__rspack_import_0.cancelPromise)()
        }

        return (0,_common__rspack_import_0.jsonPostJson)("/api/user/invites/add/", {
            user_string: userString
        }).then(({json, status}) => {
            if (status == 201) {
                //user added to the contacts
                return json.contact
            } else {
                //user not found
                let responseHtml
                if (json.error === 1) {
                    responseHtml = gettext(
                        "You cannot add yourself to your contacts!"
                    )
                } else if (json.error === 2) {
                    responseHtml = gettext(
                        "This person is already in your contacts!"
                    )
                } else if (json.error === 3) {
                    responseHtml = gettext("Invalid email!")
                }
                document
                    .getElementById("add-new-contact")
                    .insertAdjacentHTML(
                        "beforeend",
                        `<div class="warning" style="padding: 8px;">${(0,_common__rspack_import_0.escapeText)(userString)}: ${responseHtml}</div>`
                    )
                return (0,_common__rspack_import_0.cancelPromise)()
            }
        })
    }
}


}),
"./js/modules/contacts/delete_dialog.js": (function (__unused_rspack_module, __webpack_exports__, __webpack_require__) {
"use strict";
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  DeleteContactDialog: function() { return DeleteContactDialog; }
});
/* import */ var _common__rspack_import_0 = __webpack_require__("./js/modules/common/index.js");


//dialog for removing a user from contacts
class DeleteContactDialog {
    constructor(contacts) {
        this.contacts = contacts
    }

    init() {
        return new Promise((resolve, reject) => {
            const buttons = [
                {
                    text: gettext("Delete"),
                    classes: "fw-dark",
                    click: () => {
                        (0,_common__rspack_import_0.jsonPostJson)("/api/user/contacts/delete/", {
                            contacts: this.contacts
                        }).then(({status}) => {
                            dialog.close()
                            if (status == 200) {
                                //user removed from contacts
                                return resolve()
                            }
                            return reject()
                        })
                    }
                },
                {
                    type: "cancel"
                }
            ]
            const dialog = new _common__rspack_import_0.Dialog({
                title: gettext("Confirm deletion"),
                id: "confirmdeletion",
                body: `<p>${gettext("Remove from contacts")}?</p>`,
                height: 60,
                buttons
            })
            dialog.open()
        })
    }
}


}),
"./js/modules/contacts/index.js": (function (__unused_rspack_module, __webpack_exports__, __webpack_require__) {
"use strict";
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  ContactsOverview: function() { return ContactsOverview; }
});
/* import */ var fast_deep_equal__rspack_import_0 = __webpack_require__("./node_modules/.pnpm/fast-deep-equal@3.1.3/node_modules/fast-deep-equal/index.js");
/* import */ var fast_deep_equal__rspack_import_0_default = /*#__PURE__*/__webpack_require__.n(fast_deep_equal__rspack_import_0);
/* import */ var simple_datatables__rspack_import_1 = __webpack_require__("./node_modules/.pnpm/simple-datatables@10.2.0/node_modules/simple-datatables/dist/module.js");
/* import */ var w3c_keyname__rspack_import_2 = __webpack_require__("./node_modules/.pnpm/w3c-keyname@2.2.8/node_modules/w3c-keyname/index.js");
/* import */ var _common__rspack_import_3 = __webpack_require__("./js/modules/common/index.js");
/* import */ var _feedback__rspack_import_4 = __webpack_require__("./js/modules/feedback/index.js");
/* import */ var _menu__rspack_import_5 = __webpack_require__("./js/modules/menu/index.js");
/* import */ var _delete_dialog__rspack_import_6 = __webpack_require__("./js/modules/contacts/delete_dialog.js");
/* import */ var _menu__rspack_import_7 = __webpack_require__("./js/modules/contacts/menu.js");
/* import */ var _respond_invite__rspack_import_8 = __webpack_require__("./js/modules/contacts/respond_invite.js");
/* import */ var _templates__rspack_import_9 = __webpack_require__("./js/modules/contacts/templates.js");












class ContactsOverview {
    constructor({app, user}) {
        this.app = app
        this.user = user

        this.contacts = []
    }

    init() {
        return (0,_common__rspack_import_3.whenReady)().then(() => {
            this.render()
            const smenu = new _menu__rspack_import_5.SiteMenu(this.app, "") // Nothing highlighted.
            smenu.init()
            this.menu = new _common__rspack_import_3.OverviewMenuView(this, _menu__rspack_import_7.menuModel)
            this.menu.init()
            this.bind()
            this.getList()
        })
    }

    render() {
        this.dom = document.createElement("body")
        this.dom.innerHTML = (0,_common__rspack_import_3.baseBodyTemplate)({
            contents: "",
            user: this.user,
            hasOverview: true,
            app: this.app
        })
        document.body = this.dom
        ;(0,_common__rspack_import_3.setDocTitle)(gettext("Contacts"), this.app)
        const feedbackTab = new _feedback__rspack_import_4.FeedbackTab()
        feedbackTab.init()
    }

    /* Initialize the overview table */
    initTable() {
        if (this.table) {
            this.table.destroy()
            this.table = null
        }
        if (this.dtBulk) {
            this.dtBulk.destroy()
            this.dtBulk = null
        }
        const tableEl = document.createElement("table")
        tableEl.classList.add("fw-data-table")
        tableEl.classList.add("fw-large")
        tableEl.classList.add("contacts-table")
        const contentsEl = document.querySelector(".fw-contents")
        contentsEl.innerHTML = "" // Delete any old table
        contentsEl.appendChild(tableEl)

        this.dtBulk = new _common__rspack_import_3.DatatableBulk(this, (0,_menu__rspack_import_7.bulkMenuModel)(), 2)

        this.table = new simple_datatables__rspack_import_1.DataTable(tableEl, {
            paging: false,
            scrollY: `${Math.max(window.innerHeight - 360, 100)}px`,
            labels: {
                noRows: gettext("No contacts available"),
                noResults: gettext("No contacts found") // Message shown when there are no search results
            },
            template: (options, _dom) =>
                `<div class='${options.classes.container}'style='height: ${options.scrollY}; overflow-Y: auto;'></div>`,
            data: {
                headings: [
                    "",
                    "",
                    this.dtBulk.getHTML(),
                    gettext("Name"),
                    gettext("Type"),
                    gettext("Email address"),
                    ""
                ],
                data: this.contacts.map(contact => this.createTableRow(contact))
            },
            columns: [
                {
                    select: 0,
                    hidden: true,
                    type: "number"
                },
                {
                    select: 1,
                    hidden: true,
                    type: "string"
                },
                {
                    select: 2,
                    type: "boolean"
                },
                {
                    select: [2, 6],
                    sortable: false
                }
            ],
            rowNavigation: true,
            rowSelectionKeys: ["Enter", "Delete", " "],
            tabIndex: 1,
            rowRender: (row, tr, _index) => {
                const id = row.cells[0].data
                const contactType = row.cells[1].data
                const inputNode = {
                    nodeName: "input",
                    attributes: {
                        type: "checkbox",
                        class: `entry-select fw-check ${contactType}`,
                        "data-id": id,
                        "data-type": contactType,
                        id: `contact-${contactType}-${id}`
                    }
                }
                if (row.cells[2].data) {
                    inputNode.attributes.checked = true
                }
                tr.childNodes[0].childNodes = [
                    inputNode,
                    {
                        nodeName: "label",
                        attributes: {
                            for: `contact-${contactType}-${id}`
                        }
                    }
                ]
            }
        })

        this.dtBulk.init(this.table)

        this.table.on("datatable.selectrow", (rowIndex, event, focused) => {
            event.preventDefault()
            if (event.type === "keydown") {
                const key = (0,w3c_keyname__rspack_import_2.keyName)(event)
                if (key === " ") {
                    const cell = this.table.data.data[rowIndex].cells[2]
                    cell.data = !cell.data
                    cell.text = String(cell.data)
                    this.table.update()
                } else if (key === "Delete") {
                    const id = this.table.data.data[rowIndex].cells[0].data
                    const type = this.table.data.data[rowIndex].cells[1].data
                    this.deleteContact(id, type)
                }
            } else {
                if (
                    event.target.closest(
                        "span.delete-single-contact, button.respond-invite, label"
                    )
                ) {
                    return
                }
                if (!focused) {
                    this.table.dom.focus()
                }
                this.table.rows.setCursor(rowIndex)
            }
        })

        this.table.dom.focus()
    }

    createTableRow(contact) {
        return [
            contact.id,
            contact.type,
            false, // checkbox
            `${(0,_common__rspack_import_3.avatarTemplate)({user: contact})} ${(0,_common__rspack_import_3.escapeText)(contact.name)}`,
            (0,_templates__rspack_import_9.displayContactType)(contact),
            contact.email,
            contact.type === "to_userinvite"
                ? (0,_templates__rspack_import_9.respondInviteCell)(contact)
                : (0,_templates__rspack_import_9.deleteContactCell)(contact)
        ]
    }

    getList() {
        const cachedPromise = this.showCached()
        if (this.app.isOffline()) {
            return cachedPromise
        }
        return (0,_common__rspack_import_3.jsonPostJson)("/api/user/contacts/list/")
            .then(({json}) => {
                return cachedPromise.then(oldJson => {
                    if (!fast_deep_equal__rspack_import_0_default()(json, oldJson)) {
                        this.updateIndexedDB(json)
                        this.loadData(json)
                        this.initializeView()
                    }
                })
            })
            .catch(error => {
                if (!this.app.isOffline()) {
                    (0,_common__rspack_import_3.addAlert)("error", gettext("Could not obtain contacts list"))
                    throw error
                }
            })
    }

    loadData(json) {
        this.contacts = json.contacts
    }

    initializeView() {
        if (this.app.page === this) {
            this.initTable()
            // Reset scroll position to top to prevent Safari from auto-scrolling
            // to the focused table element, which would hide the header/menu
            window.scrollTo(0, 0)
        }
    }

    showCached() {
        return this.loaddatafromIndexedDB().then(json => {
            if (!json) {
                return Promise.resolve(false)
            }
            this.loadData(json)
            this.initializeView(json)
            return json
        })
    }

    loaddatafromIndexedDB() {
        return this.app.indexedDB.readAllData("user_data").then(response => {
            if (!response.length) {
                return false
            }
            const data = response[0]
            delete data.id
            return data
        })
    }

    updateIndexedDB(json) {
        json.id = 1
        // Clear data if any present
        return this.app.indexedDB
            .clearData("user_data")
            .then(() => this.app.indexedDB.insertData("user_data", [json]))
    }

    bind() {
        this.dom.addEventListener("click", event => {
            const el = {}
            switch (true) {
                case (0,_common__rspack_import_3.findTarget)(event, ".delete-single-contact", el): {
                    //delete single user
                    const id = Number.parseInt(el.target.dataset.id)
                    const type = el.target.dataset.type

                    this.deleteContact(id, type)
                    break
                }
                case (0,_common__rspack_import_3.findTarget)(event, ".respond-invite", el): {
                    const id = Number.parseInt(el.target.dataset.id)
                    const invite = this.contacts.find(
                        contact =>
                            contact.id === id &&
                            contact.type === "to_userinvite"
                    )
                    const dialog = new _respond_invite__rspack_import_8.RespondInviteDialog(
                        [invite],
                        contacts =>
                            (this.contacts = this.contacts.concat(contacts)),
                        invites =>
                            (this.contacts = this.contacts.filter(
                                contact =>
                                    !invites.find(
                                        invite =>
                                            invite.type === contact.type &&
                                            invite.id === contact.id
                                    )
                            )),
                        () => this.initializeView()
                    )
                    dialog.init()
                    break
                }
                default:
                    break
            }
        })
    }

    // get IDs of selected contacts
    getSelected() {
        return Array.from(
            this.dom.querySelectorAll(".entry-select:checked:not(:disabled)")
        ).map(el => ({
            id: Number.parseInt(el.dataset.id),
            type: el.dataset.type
        }))
    }

    deleteContact(id, type) {
        const dialog = new _delete_dialog__rspack_import_6.DeleteContactDialog([{id, type}])
        dialog.init().then(() => {
            this.contacts = this.contacts.filter(
                ocontact => ocontact.id !== id || ocontact.type !== type
            )
            this.initializeView()
        })
    }
}


}),
"./js/modules/contacts/invite.js": (function (__unused_rspack_module, __webpack_exports__, __webpack_require__) {
"use strict";
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  ContactInvite: function() { return ContactInvite; }
});
/* import */ var _common__rspack_import_0 = __webpack_require__("./js/modules/common/index.js");


class ContactInvite {
    constructor({app}, key) {
        this.app = app
        this.key = key
    }

    init() {
        if (!this.app.config.user.is_authenticated) {
            // The user is not logged in and will possibly click around on the
            // outer pages for a while before signing up.
            // We store the invite id in the app so that it can be found there
            // and used if the user ends up signing up later during this
            // browsing session.
            this.app.inviteKey = this.key
            this.app.page = this.app.openLoginPage()
            return this.app.page.init()
        }

        return (0,_common__rspack_import_0.jsonPostJson)("/api/user/invite/", {key: this.key}).then(
            ({json}) => {
                window.history.replaceState({}, "", json.redirect)
                return this.app.selectPage()
            }
        )
    }
}


}),
"./js/modules/contacts/menu.js": (function (__unused_rspack_module, __webpack_exports__, __webpack_require__) {
"use strict";
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  bulkMenuModel: function() { return bulkMenuModel; },
  menuModel: function() { return menuModel; }
});
/* import */ var _add_dialog__rspack_import_0 = __webpack_require__("./js/modules/contacts/add_dialog.js");
/* import */ var _delete_dialog__rspack_import_1 = __webpack_require__("./js/modules/contacts/delete_dialog.js");



const bulkMenuModel = () => ({
    content: [
        {
            title: gettext("Delete selected"),
            tooltip: gettext("Delete selected contacts."),
            action: overview => {
                const selected = overview.getSelected()
                if (selected.length) {
                    const dialog = new _delete_dialog__rspack_import_1.DeleteContactDialog(selected)
                    dialog.init().then(() => {
                        overview.contacts = overview.contacts.filter(
                            ocontact =>
                                !selected.some(
                                    scontact =>
                                        scontact.id == ocontact.id &&
                                        scontact.type == ocontact.type
                                )
                        )
                        overview.initializeView()
                    })
                }
            },
            disabled: overview => !overview.getSelected().length
        }
    ]
})

let currentlySearching = false

const menuModel = () => ({
    content: [
        {
            type: "text",
            title: gettext("Invite contact"),
            keys: "Alt-i",
            action: overview => {
                const dialog = new _add_dialog__rspack_import_0.AddContactDialog(overview.app.settings)
                dialog.init().then(contacts => {
                    contacts.forEach(contact => overview.contacts.push(contact))
                    overview.initializeView()
                })
            },
            order: 0
        },
        {
            type: "search",
            icon: "search",
            title: gettext("Search contacts"),
            keys: "Alt-s",
            input: (overview, text) => {
                if (text.length && !currentlySearching) {
                    overview.initTable(true)
                    currentlySearching = true
                    overview.table.on("datatable.init", () =>
                        overview.table.search(text)
                    )
                } else if (!text.length && currentlySearching) {
                    overview.initTable(false)
                    currentlySearching = false
                } else if (text.length) {
                    overview.table.search(text)
                }
            },
            order: 1
        }
    ]
})


}),
"./js/modules/contacts/respond_invite.js": (function (__unused_rspack_module, __webpack_exports__, __webpack_require__) {
"use strict";
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  RespondInviteDialog: function() { return RespondInviteDialog; }
});
/* import */ var _common__rspack_import_0 = __webpack_require__("./js/modules/common/index.js");


class RespondInviteDialog {
    constructor(
        invites,
        addCallback = _contacts => {},
        deleteCallback = _invites => {},
        doneCallback = () => {}
    ) {
        this.invites = invites
        this.addCallback = addCallback
        this.deleteCallback = deleteCallback
        this.doneCallback = doneCallback
    }

    init() {
        const buttons = [
            {
                text:
                    this.invites.length > 1
                        ? gettext("Accept all invites")
                        : gettext("Accept invite"),
                classes: "fw-dark",
                click: () => {
                    (0,_common__rspack_import_0.jsonPostJson)("/api/user/invites/accept/", {
                        invites: this.invites
                    }).then(({json, status}) => {
                        dialog.close()
                        if (status == 200) {
                            //user removed from contacts
                            this.deleteCallback(this.invites)
                            this.addCallback(json.contacts)
                            this.doneCallback()
                        }
                    })
                }
            },
            {
                text:
                    this.invites.length > 1
                        ? gettext("Decline all invites")
                        : gettext("Decline invite"),
                classes: "fw-dark",
                click: () => {
                    (0,_common__rspack_import_0.jsonPostJson)("/api/user/invites/decline/", {
                        invites: this.invites
                    }).then(({status}) => {
                        dialog.close()
                        if (status == 200) {
                            //user removed from contacts
                            this.deleteCallback(this.invites)
                            this.doneCallback()
                        }
                    })
                }
            },
            {
                type: "cancel"
            }
        ]
        const dialog = new _common__rspack_import_0.Dialog({
            title: gettext("Accept of invite"),
            id: "confirmaccept",
            body: `<p>${
                this.invites.length > 1
                    ? gettext("Do you want to accept the below invites?")
                    : gettext("Do you want to accept the below invite?")
            }</p>
            ${this.invites.map(invite => `<p>${(0,_common__rspack_import_0.escapeText)(invite.name)} (${(0,_common__rspack_import_0.escapeText)(invite.email)})</p>`).join("")}`,
            height: 60,
            buttons
        })
        dialog.open()
    }
}


}),
"./js/modules/contacts/templates.js": (function (__unused_rspack_module, __webpack_exports__, __webpack_require__) {
"use strict";
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  addContactTemplate: function() { return addContactTemplate; },
  deleteContactCell: function() { return deleteContactCell; },
  displayContactType: function() { return displayContactType; },
  respondInviteCell: function() { return respondInviteCell; }
});
const deleteContactCell = contact =>
    `<span class="fw-link-text delete-single-contact"
            data-type="${contact.type}" data-id="${contact.id}">
        <i class="fa fa-trash-alt"></i>
    </span>`

//template for contact adding dialog
const addContactTemplate = () =>
    `<table class="ui-dialog-content-table"><tbody><tr><td>
        <input type="text" name="user_string" id="new-contact-user-string"
                placeholder="${gettext("E-mail address or username")}" />
    </td></tr></tbody></table>`

const displayContactType = ({type}) => {
    switch (type) {
        case "user":
            return gettext("User")
        case "userinvite":
            return gettext("Invite you sent")
        case "to_userinvite":
            return gettext("Invite you received")
    }
}

const respondInviteCell = contact =>
    `<button class="fw-button fw-small fw-dark respond-invite" data-id="${contact.id}">
    ${gettext("Respond")}
</button>`


}),
"./js/modules/email_confirm/index.js": (function (__unused_rspack_module, __webpack_exports__, __webpack_require__) {
"use strict";
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  EmailConfirm: function() { return EmailConfirm; }
});
/* import */ var _plugins_confirm_account__rspack_import_0 = __webpack_require__("./js/plugins/confirm_account/index.js");
/* import */ var _plugins_confirm_account__rspack_import_0_default = /*#__PURE__*/__webpack_require__.n(_plugins_confirm_account__rspack_import_0);
/* import */ var _common__rspack_import_1 = __webpack_require__("./js/modules/common/index.js");
/* import */ var _prelogin__rspack_import_2 = __webpack_require__("./js/modules/prelogin/index.js");
/* import */ var _templates__rspack_import_3 = __webpack_require__("./js/modules/email_confirm/templates.js");





class EmailConfirm extends _prelogin__rspack_import_2.PreloginPage {
    constructor({app, language}, key) {
        super({app, language})

        this.title = gettext("Confirm Email")
        this.pluginLoaders = _plugins_confirm_account__rspack_import_0

        this.key = key

        this.validKey = false
        this.loggedIn = false
        this.verified = false
        this.username = ""
        this.email = ""

        this.submissionReady = false
        this.formChecks = []
        this.confirmQuestionsTemplates = []
        this.confirmMethods = [
            () => (0,_common__rspack_import_1.jsonPost)(`/api/user/confirm-email/${this.key}/`)
        ]
    }

    init() {
        return Promise.all([(0,_common__rspack_import_1.whenReady)(), this.getConfirmData()]).then(() => {
            this.activateFidusPlugins()
            this.render()
            this.bind()
        })
    }

    getConfirmData() {
        return (0,_common__rspack_import_1.jsonPostJson)("/api/user/get_confirmkey_data/", {key: this.key})
            .then(({json}) => {
                this.username = json.username
                this.email = json.email
                this.validKey = true
                this.verified = json.verified
                this.firstVerification = !json.verified
                if (json.logout) {
                    this.app.config.user = {is_authenticated: false}
                }
            })
            .catch(() => {})
    }

    render() {
        if (!this.verified) {
            if (this.app.settings?.TEST_SERVER) {
                this.formChecks.push(() =>
                    document.getElementById("test-check").matches(":checked")
                )
                this.confirmQuestionsTemplates.unshift(
                    _templates__rspack_import_3.testServerQuestionTemplate
                )
            }
            this.formChecks.push(() =>
                document.getElementById("terms-check").matches(":checked")
            )
            this.confirmQuestionsTemplates.unshift(_templates__rspack_import_3.checkTermsTemplate)
        }
        this.contents = (0,_templates__rspack_import_3.confirmAccountTemplate)({
            validKey: this.validKey,
            username: this.username,
            verified: this.verified,
            email: this.email,
            confirmQuestionsTemplates: this.confirmQuestionsTemplates
        })
        super.render()
    }

    bind() {
        super.bind()
        if (!this.formChecks.length) {
            document.getElementById("submit").removeAttribute("disabled")
            this.submissionReady = true
        }
        document.querySelectorAll(".checker").forEach(el =>
            el.addEventListener("click", () => {
                if (this.formChecks.every(check => check())) {
                    document
                        .getElementById("submit")
                        .removeAttribute("disabled")
                    this.submissionReady = true
                } else {
                    document
                        .getElementById("submit")
                        .setAttribute("disabled", "disabled")
                    this.submissionReady = false
                }
            })
        )
        const submissionButton = document.getElementById("submit")
        if (submissionButton) {
            submissionButton.addEventListener("click", () => {
                if (!this.submissionReady) {
                    return
                }
                (0,_common__rspack_import_1.activateWait)()
                Promise.all(this.confirmMethods.map(method => method())).then(
                    () => {
                        ;(0,_common__rspack_import_1.deactivateWait)()
                        if (this.app.config.user.is_authenticated) {
                            const emailObject =
                                this.app.config.user.emails.find(
                                    email => email.address === this.email
                                )
                            if (emailObject) {
                                emailObject.verified = true
                            }
                            return this.app
                                .goTo("/user/profile/")
                                .then(() =>
                                    (0,_common__rspack_import_1.addAlert)("info", gettext("Email verified!"))
                                )
                        } else {
                            const contentsDOM =
                                document.querySelector(".fw-contents")
                            contentsDOM.innerHTML = (0,_templates__rspack_import_3.verifiedAccountTemplate)()
                        }
                    }
                )
            })
        }
    }
}


}),
"./js/modules/email_confirm/templates.js": (function (__unused_rspack_module, __webpack_exports__, __webpack_require__) {
"use strict";
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  checkTermsTemplate: function() { return checkTermsTemplate; },
  confirmAccountTemplate: function() { return confirmAccountTemplate; },
  testServerQuestionTemplate: function() { return testServerQuestionTemplate; },
  verifiedAccountTemplate: function() { return verifiedAccountTemplate; }
});
/** A template for the confirm email/agree to terms page */
const confirmAccountTemplate = ({
    username,
    email,
    verified,
    validKey,
    confirmQuestionsTemplates
}) =>
    `<h1 class="fw-login-title">${verified ? gettext("Confirm E-mail Address") : gettext("Confirm E-mail Address and Agree to Terms and Conditions")}</h1>
    ${validKey ? confirmAccountFormTemplate({username, email, verified, confirmQuestionsTemplates}) : expiredConfirmationLinkTemplate()}
    `

const confirmAccountFormTemplate = ({
    username,
    email,
    verified,
    confirmQuestionsTemplates
}) =>
    `<p>${
        verified
            ? interpolate(
                  gettext(
                      'Please confirm that you own the email <a href="mailto:%(email)s">%(email)s</a>.'
                  ),
                  {email},
                  true
              )
            : interpolate(
                  gettext(
                      'Please confirm that you own the email <a href="mailto:%(email)s">%(email)s</a>, that you apply for the username %(username)s, and that you have read and agree to our <a href="/pages/terms/" target="_blank">Terms and Conditions</a> and <a href="/pages/privacy/" target="_blank">Privacy Policy</a>.'
                  ),
                  {email, username},
                  true
              )
    }</p>
    <table>
    ${confirmQuestionsTemplates.map(template => `<tr>${template()}</tr>`).join("")}
    </table>
    <p class="submit-wrapper">
        <button type="submit" id="submit" disabled class="fw-button fw-orange fw-uppercase">${gettext("Confirm")}</button>
    </p>
    `

const checkTermsTemplate = () =>
    `<td>
        <input type="checkbox" class="checker" id="terms-check">
    </td><td>
        ${gettext('I have read and agree to the <a href="/pages/terms/" target="_blank">Terms and Conditions</a>.')}
    </td>`

const testServerQuestionTemplate = () =>
    `<td>
        <input type="checkbox" class="checker" id="test-check">
    </td><td>
        ${gettext("I am aware that I am signing up for a test account and that service may be ended abruptly and without notice, leaving me without my files.")}
    </td>`

const expiredConfirmationLinkTemplate = () =>
    `<p>
        ${gettext("This e-mail confirmation link expired or is invalid. Please try to open another account.")}
    </p>`

const verifiedAccountTemplate = () =>
    `<h1>${gettext("Thanks for verifying!")}</h1>
    <p>${gettext("You can now log in.")}</p>`


}),
"./js/modules/feedback/index.js": (function (__unused_rspack_module, __webpack_exports__, __webpack_require__) {
"use strict";
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  FeedbackTab: function() { return FeedbackTab; }
});
/* import */ var _common__rspack_import_0 = __webpack_require__("./js/modules/common/index.js");


// Creates the feedback tab. The tab is meant for user feedback to the developers while FW is still in
// a somewhat early stage. It is included in a way so it's easy to remove from all the templates.
// This is also where browser sniffing happens to prevent still unsupported browsers from logging in.

class FeedbackTab {
    constructor() {
        this.previousActiveElement = null
    }

    init() {
        this.render()
        this.bind()
    }

    render() {
        document.body.insertAdjacentHTML(
            "beforeend",
            `<div class="feedback-panel" tole="dialog" aria-modal="true" aria-labelledby="feedback-title">
              <div id="feedback-wrapper">
                <div id="feedback-title">${gettext("Tech support")}</div>
                <p>${gettext("Did you encounter an error or bug?")}<br>
                    ${gettext("Give a brief description of what has happened.")}</p>
                <div id="feedback-form">
                  <form>
                    <textarea id="message" name="message" rows="10" cols="30"></textarea>
                    <input type="button" value='${gettext("submit")}' id="feedbackbutton" class="fw-button fw-orange" />
                  </form>
                </div>
                <div id="response-message">
                  ${gettext("Thank you for your report!")}
                </div>
                <button id="close-feedback" aria-label="${gettext("Close technical support")}"><i class="fa fa-times-circle"></i></button>
              </div>
            </div>`
        )

        let headerNavWrapper = document.querySelector(
            "#footer-menu.prelogin .fw-container"
        )

        if (null === headerNavWrapper) {
            headerNavWrapper = document.querySelector(
                ".fw-header .fw-container"
            )
        }

        if (null === headerNavWrapper) {
            headerNavWrapper = document.querySelector("#headerbar")
        }

        if (null === headerNavWrapper) {
            headerNavWrapper = document.body
        }

        headerNavWrapper.insertAdjacentHTML(
            "beforeend",
            `<a class="feedback-tab" aria-label="${gettext("Technical support")}" href="#"></a>`
        )
        ;(0,_common__rspack_import_0.ensureCSS)(staticUrl("css/feedback/feedback.css"))
    }

    bind() {
        document
            .querySelector("a.feedback-tab")
            .addEventListener("click", event => {
                event.preventDefault()
                this.openFeedbackPanel()
            })

        document
            .querySelector("#close-feedback")
            .addEventListener("click", event => {
                event.preventDefault()
                this.closeFeedbackPanel()
            })

        document
            .querySelector("#feedbackbutton")
            .addEventListener("click", () => this.sendFeedback())
    }

    openFeedbackPanel() {
        this.previousActiveElement = document.activeElement
        const panelEl = document.querySelector(".feedback-panel")
        panelEl.style.display = "block"
        document.querySelector("textarea#message").focus()
        panelEl.addEventListener("keydown", this.handleKeyDown)
    }

    sendFeedback() {
        const messageEl = document.querySelector("textarea#message"),
            closeFeedbackEl = document.querySelector("#close-feedback"),
            feedbackFormEl = document.querySelector("#feedback-form"),
            responseEl = document.querySelector("#response-message")
        if (!messageEl.value.length) {
            return
        }

        closeFeedbackEl.style.display = "none"
        feedbackFormEl.style.visibility = "hidden"

        ;(0,_common__rspack_import_0.jsonPost)("/api/feedback/feedback/", {message: messageEl.value})
            .then(() => {
                messageEl.value = ""
                closeFeedbackEl.style.display = "block"
                responseEl.style.display = "block"
            })
            .catch(_error => {
                messageEl.value = ""
                closeFeedbackEl.style.display = "block"
            })
        return false
    }

    handleKeyDown(event) {
        // Trap Tab key within the feedback panel.
        const FOCUSABLE_SELECTORS = "button, textarea"
        if (event.key !== "Tab") {
            return
        }
        const focusableEls = Array.from(
            document
                .querySelector(".feedback-panel")
                .querySelectorAll(FOCUSABLE_SELECTORS)
        )
            // Filter only visible elements
            .filter(el => el.offsetParent !== null)

        if (focusableEls.length === 0) {
            return
        }
        const firstEl = focusableEls[0]
        const lastEl = focusableEls[focusableEls.length - 1]

        if (event.shiftKey) {
            // If Shift+Tab and the first element is active, move focus to the last element.
            if (document.activeElement === firstEl) {
                event.preventDefault()
                lastEl.focus()
            }
        } else {
            // Tab: if focus is on the last element, cycle back to first.
            if (document.activeElement === lastEl) {
                event.preventDefault()
                firstEl.focus()
            }
        }
    }

    closeFeedbackPanel() {
        const panelEl = document.querySelector(".feedback-panel")
        panelEl.style.display = "none"
        document.querySelector("#feedback-form").style.visibility = "visible"
        document.querySelector("#response-message").style.display = "none"

        // Remove the keydown event listener that was added for focus trapping.
        panelEl.removeEventListener("keydown", this.handleKeyDown)

        // Restore focus to the previously active element, if any.
        if (
            this.previousActiveElement &&
            typeof this.previousActiveElement.focus === "function"
        ) {
            this.previousActiveElement.focus()
        }
    }
}


}),
"./js/modules/flatpage/index.js": (function (__unused_rspack_module, __webpack_exports__, __webpack_require__) {
"use strict";
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  FlatPage: function() { return FlatPage; }
});
/* import */ var _common__rspack_import_0 = __webpack_require__("./js/modules/common/index.js");
/* import */ var _prelogin__rspack_import_1 = __webpack_require__("./js/modules/prelogin/index.js");



class FlatPage extends _prelogin__rspack_import_1.PreloginPage {
    constructor({app, language}, url) {
        super({app, language})
        this.url = url
    }

    init() {
        return Promise.all([
            (0,_common__rspack_import_0.whenReady)(),
            this.getPageData(),
            (0,_common__rspack_import_0.ensureCSS)([staticUrl("css/flatpage.css")])
        ]).then(() => {
            this.activateFidusPlugins()
            this.render()
            this.bind()
        })
    }

    getPageData() {
        return (0,_common__rspack_import_0.jsonPostJson)("/api/base/flatpage/", {url: this.url})
            .then(({json}) => {
                this.title = json.title
                this.contents = `<div class="fw-flatpage">
                    <h1 class="fw-login-title">${json.title}</h1>
                    ${json.content}
                </div>`
            })
            .catch(() => {
                this.title = gettext("Page not found")
                this.contents = `<div>
                    <h1 class="fw-login-title">${gettext("Error 404")}</h1>
                    <p>${gettext("The page you are looking for cannot be found.")}</p>
                </div>`
            })
    }
}


}),
"./js/modules/images/database.js": (function (__unused_rspack_module, __webpack_exports__, __webpack_require__) {
"use strict";
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  ImageDB: function() { return ImageDB; }
});
/* import */ var _common__rspack_import_0 = __webpack_require__("./js/modules/common/index.js");


/* A class that holds information about images uploaded by the user. */

class ImageDB {
    constructor(app) {
        this.app = app
        this.db = {}
        this.cats = []
    }

    getDB() {
        this.db = {}
        this.cats = []

        ;(0,_common__rspack_import_0.activateWait)()

        return (0,_common__rspack_import_0.jsonPostJson)("/api/usermedia/images/").then(({json}) => {
            this.cats = json.imageCategories
            json.images.forEach(image => {
                this.db[image.id] = image
            })
            ;(0,_common__rspack_import_0.deactivateWait)()
            return
        })
    }

    saveImage(imageData) {
        (0,_common__rspack_import_0.activateWait)()
        const {image, ...jsonData} = imageData

        return (0,_common__rspack_import_0.jsonPostJson)(
            "/api/usermedia/save/",
            jsonData,
            false,
            image ? {image} : {}
        )
            .then(({json}) => {
                ;(0,_common__rspack_import_0.deactivateWait)()
                if (Object.keys(json.errormsg).length) {
                    return Promise.reject(new Error(json.errormsg.error))
                } else {
                    this.db[json.values.id] = json.values
                    return json.values.id
                }
            })
            .catch(error => {
                if (error.status === 413) {
                    (0,_common__rspack_import_0.addAlert)(
                        "error",
                        `${gettext("Image is larger than the maximum permitted size")}${this.app.settings?.MEDIA_MAX_SIZE ? `: ${Number.parseInt(this.app.settings.MEDIA_MAX_SIZE / 1000000)}MB` : "."}`
                    )
                } else if (error.message) {
                    (0,_common__rspack_import_0.addAlert)("error", gettext(error.message))
                } else {
                    (0,_common__rspack_import_0.addAlert)("error", gettext(error.statusText))
                }
                (0,_common__rspack_import_0.deactivateWait)()
                throw error
            })
    }
}


}),
"./js/modules/images/overview/categories.js": (function (__unused_rspack_module, __webpack_exports__, __webpack_require__) {
"use strict";
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  ImageOverviewCategories: function() { return ImageOverviewCategories; }
});
/* import */ var _common__rspack_import_0 = __webpack_require__("./js/modules/common/index.js");
/* import */ var _templates__rspack_import_1 = __webpack_require__("./js/modules/images/overview/templates.js");



class ImageOverviewCategories {
    constructor(imageOverview) {
        this.imageOverview = imageOverview
        imageOverview.mod.categories = this
    }

    //save changes or create a new category
    saveCategories(cats) {
        (0,_common__rspack_import_0.activateWait)()

        ;(0,_common__rspack_import_0.jsonPostJson)("/api/usermedia/save_category/", {
            ids: cats.ids,
            titles: cats.titles
        })
            .catch(error => {
                ;(0,_common__rspack_import_0.addAlert)("error", gettext("Could not update categories"))
                ;(0,_common__rspack_import_0.deactivateWait)()
                throw error
            })
            .then(({json}) => {
                this.imageOverview.app.imageDB.cats = json.entries
                this.setImageCategoryList(json.entries)
                ;(0,_common__rspack_import_0.addAlert)("success", gettext("The categories have been updated"))
                ;(0,_common__rspack_import_0.deactivateWait)()
            })
    }

    setImageCategoryList(imageCategories) {
        const catSelector = this.imageOverview.menu.model.content.find(
            menuItem => menuItem.id === "cat_selector"
        )
        catSelector.content = catSelector.content.filter(
            cat => cat.type !== "category"
        )
        catSelector.content = catSelector.content.concat(
            imageCategories.map(cat => ({
                type: "category",
                title: cat.category_title,
                action: _overview => {
                    const trs = document.querySelectorAll(
                        "#imagelist > tbody > tr"
                    )
                    trs.forEach(tr => {
                        if (
                            tr
                                .querySelector(".fw-usermedia-image")
                                .classList.contains(`cat_${cat.id}`)
                        ) {
                            tr.style.display = ""
                        } else {
                            tr.style.display = "none"
                        }
                    })
                }
            }))
        )
        this.imageOverview.menu.update()
    }

    //open a dialog for editing categories
    editCategoryDialog() {
        const buttons = [
            {
                text: gettext("Submit"),
                classes: "fw-dark",
                click: () => {
                    const cats = {
                        ids: [],
                        titles: []
                    }
                    document
                        .querySelectorAll("#edit-categories .category-form")
                        .forEach(el => {
                            const thisVal = el.value.trim()
                            let thisId = el.dataset.id
                            if ("undefined" == typeof thisId) {
                                thisId = 0
                            }
                            if ("" !== thisVal) {
                                cats.ids.push(thisId)
                                cats.titles.push(thisVal)
                            }
                        })
                    this.saveCategories(cats)
                    dialog.close()
                }
            },
            {
                type: "cancel"
            }
        ]

        const dialog = new _common__rspack_import_0.Dialog({
            id: "edit-categories",
            title: gettext("Edit Categories"),
            body: (0,_templates__rspack_import_1.usermediaEditcategoriesTemplate)({
                categories: this.imageOverview.app.imageDB.cats
            }),
            width: 350,
            height: 350,
            buttons
        })
        dialog.open()
    }
}


}),
"./js/modules/images/overview/index.js": (function (__unused_rspack_module, __webpack_exports__, __webpack_require__) {
"use strict";
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  ImageOverview: function() { return ImageOverview; }
});
/* import */ var simple_datatables__rspack_import_0 = __webpack_require__("./node_modules/.pnpm/simple-datatables@10.2.0/node_modules/simple-datatables/dist/module.js");
/* import */ var w3c_keyname__rspack_import_1 = __webpack_require__("./node_modules/.pnpm/w3c-keyname@2.2.8/node_modules/w3c-keyname/index.js");
/* import */ var _plugins_images_overview__rspack_import_2 = __webpack_require__("./js/plugins/images_overview/index.js");
/* import */ var _plugins_images_overview__rspack_import_2_default = /*#__PURE__*/__webpack_require__.n(_plugins_images_overview__rspack_import_2);
/* import */ var _common__rspack_import_3 = __webpack_require__("./js/modules/common/index.js");
/* import */ var _feedback__rspack_import_4 = __webpack_require__("./js/modules/feedback/index.js");
/* import */ var _menu__rspack_import_5 = __webpack_require__("./js/modules/menu/index.js");
/* import */ var _categories__rspack_import_6 = __webpack_require__("./js/modules/images/overview/categories.js");
/* import */ var _menu__rspack_import_7 = __webpack_require__("./js/modules/images/overview/menu.js");









/** Helper functions for user added images/SVGs.*/

class ImageOverview {
    constructor({app, user}) {
        this.app = app
        this.user = user
        this.mod = {}

        this.lastSort = {column: 0, dir: "asc"}
    }

    init() {
        (0,_common__rspack_import_3.ensureCSS)([
            staticUrl("css/dialog_usermedia.css"),
            staticUrl("css/dot_menu.css")
        ])

        return (0,_common__rspack_import_3.whenReady)().then(() => {
            this.render()
            new _categories__rspack_import_6.ImageOverviewCategories(this)
            const smenu = new _menu__rspack_import_5.SiteMenu(this.app, "images")
            smenu.init()
            this.menu = new _common__rspack_import_3.OverviewMenuView(this, _menu__rspack_import_7.menuModel)
            this.menu.init()
            this.activatePlugins()
            this.bindEvents()
            this.mod.categories.setImageCategoryList(this.app.imageDB.cats)
            this.initTable(Object.keys(this.app.imageDB.db))
            // Reset scroll position to top to prevent Safari from auto-scrolling
            // to the focused table element, which would hide the header/menu
            window.scrollTo(0, 0)
        })
    }

    render() {
        this.dom = document.createElement("body")
        this.dom.innerHTML = (0,_common__rspack_import_3.baseBodyTemplate)({
            contents: "",
            user: this.user,
            hasOverview: true,
            app: this.app
        })
        document.body = this.dom
        ;(0,_common__rspack_import_3.ensureCSS)([staticUrl("css/cropper.min.css")])
        ;(0,_common__rspack_import_3.setDocTitle)(gettext("Media Manager"), this.app)
        const feedbackTab = new _feedback__rspack_import_4.FeedbackTab()
        feedbackTab.init()
    }

    activatePlugins() {
        // Add plugins
        this.plugins = {}

        Object.keys(_plugins_images_overview__rspack_import_2).forEach(plugin => {
            if (typeof _plugins_images_overview__rspack_import_2[plugin] === "function") {
                this.plugins[plugin] = new _plugins_images_overview__rspack_import_2[plugin](this)
                this.plugins[plugin].init()
            }
        })
    }

    //delete image
    deleteImage(ids) {
        ids = ids.map(id => Number.parseInt(id))
        if (this.app.isOffline()) {
            (0,_common__rspack_import_3.addAlert)(
                "error",
                gettext(
                    "You are currently offline. Please try again when you are back online."
                )
            )
            return
        }
        (0,_common__rspack_import_3.activateWait)()
        ;(0,_common__rspack_import_3.jsonPost)("/api/usermedia/delete/", {ids})
            .catch(error => {
                ;(0,_common__rspack_import_3.addAlert)("error", gettext("The image(s) could not be deleted"))
                ;(0,_common__rspack_import_3.deactivateWait)()
                if (this.app.isOffline()) {
                    (0,_common__rspack_import_3.addAlert)(
                        "error",
                        gettext(
                            "You are currently offline. Please try again when you are back online."
                        )
                    )
                } else {
                    throw error
                }
            })
            .then(() => {
                ids.forEach(id => delete this.app.imageDB.db[id])
                this.removeTableRows(ids)
                ;(0,_common__rspack_import_3.addAlert)("success", gettext("The image(s) have been deleted"))
            })
            .then(() => (0,_common__rspack_import_3.deactivateWait)())
    }

    deleteImageDialog(ids) {
        const buttons = [
            {
                text: gettext("Delete"),
                classes: "fw-dark",
                click: () => {
                    this.deleteImage(ids)
                    dialog.close()
                }
            },
            {
                type: "cancel"
            }
        ]
        const dialog = new _common__rspack_import_3.Dialog({
            id: "confirmdeletion",
            icon: "exclamation-triangle",
            title: gettext("Confirm deletion"),
            body: `<p>${gettext("Delete the image(s)")}?</p>`,
            buttons
        })
        dialog.open()
    }

    updateTable(ids) {
        // Remove items that already exist
        this.removeTableRows(ids)
        this.table.insert({data: ids.map(id => this.createTableRow(id))})
        // Redo last sort
        this.table.columns.sort(this.lastSort.column, this.lastSort.dir)
    }

    createTableRow(id) {
        const image = this.app.imageDB.db[id]
        const cats = image.cats.map(cat => `cat_${cat}`)

        let fileType = image.file_type.split("/")

        if (1 < fileType.length) {
            fileType = fileType[1].toUpperCase()
        } else {
            fileType = fileType[0].toUpperCase()
        }

        return [
            id,
            false, // checkbox
            `<span class="fw-usermedia-image ${cats.join(" ")}">
                <img src="${image.thumbnail ? image.thumbnail : image.image}">
            </span>
            <span class="fw-usermedia-title">
                <span class="edit-image fw-link-text fw-searchable" data-id="${id}">
                    ${image.title.length ? (0,_common__rspack_import_3.escapeText)(image.title) : gettext("Untitled")}
                </span>
                <span class="fw-usermedia-type">${fileType}</span>
            </span>`,
            `<span>${image.width} x ${image.height}</span>`,
            `<span class="date">${(0,_common__rspack_import_3.localizeDate)(image.added, "sortable-date")}</span>`,
            `<span class="delete-image fw-link-text" data-id="${id}">
                <i class="fa fa-trash-alt"></i>
            </span>`
        ]
    }

    removeTableRows(ids) {
        ids = ids.map(id => Number.parseInt(id))

        const existingRows = this.table.data.data
            .map((row, index) => {
                const id = row.cells[0].data
                if (ids.includes(id)) {
                    return index
                } else {
                    return false
                }
            })
            .filter(rowIndex => rowIndex !== false)

        if (existingRows.length) {
            this.table.rows.remove(existingRows)
        }
    }

    onResize() {
        if (!this.table) {
            return
        }
        this.initTable(Object.keys(this.app.imageDB.db))
    }

    /* Initialize the overview table */
    initTable(ids) {
        const tableEl = document.createElement("table")
        tableEl.id = "imagelist"
        tableEl.classList.add("fw-data-table")
        tableEl.classList.add("fw-large")
        this.dom.querySelector(".fw-contents").innerHTML = ""
        this.dom.querySelector(".fw-contents").appendChild(tableEl)

        this.dtBulk = new _common__rspack_import_3.DatatableBulk(this, (0,_menu__rspack_import_7.bulkMenuModel)(), 1)

        const hiddenCols = [0]

        if (window.innerWidth < 500) {
            hiddenCols.push(1)
        }

        this.table = new simple_datatables__rspack_import_0.DataTable(tableEl, {
            searchable: true,
            paging: false,
            scrollY: `${Math.max(window.innerHeight - 360, 100)}px`,
            labels: {
                noRows: gettext("No images available"), // Message shown when there are no images
                noResults: gettext("No images found") // Message shown when no images are found after search
            },
            rowNavigation: true,
            rowSelectionKeys: ["Enter", "Delete", " "],
            tabIndex: 1,
            template: (options, _dom) =>
                `<div class='${options.classes.container}'${options.scrollY.length ? ` style='height: ${options.scrollY}; overflow-Y: auto;'` : ""}></div>
            <div class='${options.classes.bottom}'>
                ${
                    options.paging
                        ? `<div class='${options.classes.info}'></div>`
                        : ""
                }
                <nav class='${options.classes.pagination}'></nav>
            </div>`,
            data: {
                headings: [
                    "",
                    this.dtBulk.getHTML(),
                    gettext("File"),
                    gettext("Size (px)"),
                    gettext("Added"),
                    ""
                ],
                data: ids.map(id => this.createTableRow(id))
            },
            columns: [
                {
                    select: 0,
                    type: "number"
                },
                {
                    select: 1,
                    type: "boolean"
                },
                {
                    select: hiddenCols,
                    hidden: true
                },
                {
                    select: [1, 3, 5],
                    sortable: false
                }
            ],
            rowRender: (row, tr, _index) => {
                const id = row.cells[0].data
                const inputNode = {
                    nodeName: "input",
                    attributes: {
                        type: "checkbox",
                        class: "entry-select fw-check",
                        "data-id": id,
                        id: `doc-img-${id}`
                    }
                }
                if (row.cells[1].data) {
                    inputNode.attributes.checked = true
                }
                tr.childNodes[0].childNodes = [
                    inputNode,
                    {
                        nodeName: "label",
                        attributes: {
                            for: `doc-img-${id}`
                        }
                    }
                ]
            }
        })

        this.table.on("datatable.sort", (column, dir) => {
            this.lastSort = {column, dir}
        })

        this.table.on("datatable.selectrow", (rowIndex, event, focused) => {
            event.preventDefault()
            if (event.type === "keydown") {
                const key = (0,w3c_keyname__rspack_import_1.keyName)(event)
                if (key === "Enter") {
                    if (this.getSelected().length > 0) {
                        // Don't open. Let the bulk menu handle it.
                        return
                    }

                    const button = this.table.dom.querySelector(
                        `tr[data-index="${rowIndex}"] span.edit-image`
                    )
                    if (button) {
                        button.click()
                    }
                } else if (key === " ") {
                    const cell = this.table.data.data[rowIndex].cells[1]
                    cell.data = !cell.data
                    cell.text = String(cell.data)
                    this.table.update()
                } else if (key === "Delete") {
                    const cell = this.table.data.data[rowIndex].cells[0]
                    const imageId = cell.data
                    this.deleteImageDialog([imageId])
                }
            } else {
                if (
                    event.target.closest(
                        "span.edit-image, span.delete-image, label"
                    )
                ) {
                    return
                }
                if (!focused) {
                    this.table.dom.focus()
                }
                this.table.rows.setCursor(rowIndex)
            }
        })

        this.dtBulk.init(this.table)

        this.table.dom.focus()
    }

    // get IDs of selected bib entries
    getSelected() {
        return Array.from(
            this.dom.querySelectorAll(".entry-select:checked:not(:disabled)")
        ).map(el => Number.parseInt(el.getAttribute("data-id")))
    }

    bindEvents() {
        this.dom.addEventListener("click", event =>
            this.handleActivation(event)
        )
        this.dom.addEventListener("keydown", event =>
            this.handleActivation(event)
        )
    }

    handleActivation(event) {
        if (!(0,_common__rspack_import_3.isActivationEvent)(event)) {
            return
        }
        const el = {}
        switch (true) {
            case (0,_common__rspack_import_3.findTarget)(event, ".delete-image", el): {
                const imageId = el.target.dataset.id
                this.deleteImageDialog([imageId])
                break
            }
            case (0,_common__rspack_import_3.findTarget)(event, ".edit-image", el): {
                const imageId = el.target.dataset.id
                Promise.all(/* import() */ [__webpack_require__.e("vendors-node_modules_pnpm_biblatex-csl-converter_3_6_0_node_modules_biblatex-csl-converter_li-d3812c"), __webpack_require__.e("vendors-node_modules_pnpm_cropperjs_1_6_2_node_modules_cropperjs_dist_cropper_js"), __webpack_require__.e("js_modules_editor_e2ee_encryptor_js-js_modules_images_edit_dialog_model_js"), __webpack_require__.e("js_modules_images_edit_dialog_index_js-_2e940")]).then(__webpack_require__.bind(__webpack_require__, "./js/modules/images/edit_dialog/index.js")).then(({ImageEditDialog}) => {
                    const dialog = new ImageEditDialog(
                        this.app.imageDB,
                        imageId,
                        this
                    )
                    dialog.init().then(() => {
                        this.updateTable([imageId])
                    })
                })
                break
            }
            case (0,_common__rspack_import_3.findTarget)(event, ".fw-add-input", el): {
                const itemEl = el.target.closest(".fw-list-input")
                if (!itemEl.nextElementSibling) {
                    itemEl.insertAdjacentHTML(
                        "afterend",
                        `<tr class="fw-list-input">
                            <td>
                                <input type="text" class="category-form">
                                <span class="fw-add-input icon-addremove" tabindex="0"></span>
                            </td>
                        </tr>`
                    )
                } else {
                    itemEl.parentElement.removeChild(itemEl)
                }
                break
            }
            default:
                break
        }
    }

    close() {
        if (this.table) {
            this.table.destroy()
            this.table = null
        }
        if (this.dtBulk) {
            this.dtBulk.destroy()
            this.dtBulk = null
        }
        if (this.menu) {
            this.menu.destroy()
            this.menu = null
        }
    }
}


}),
"./js/modules/images/overview/menu.js": (function (__unused_rspack_module, __webpack_exports__, __webpack_require__) {
"use strict";
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  bulkMenuModel: function() { return bulkMenuModel; },
  menuModel: function() { return menuModel; }
});
const bulkMenuModel = () => ({
    content: [
        {
            title: gettext("Delete selected"),
            tooltip: gettext("Delete selected images."),
            action: overview => {
                const ids = overview.getSelected()
                if (ids.length) {
                    overview.deleteImageDialog(ids)
                }
            },
            disabled: overview =>
                !overview.getSelected().length || overview.app.isOffline()
        }
    ]
})

const menuModel = () => ({
    content: [
        {
            type: "dropdown",
            id: "cat_selector",
            keys: "Alt-c",
            content: [
                {
                    title: gettext("All categories"),
                    action: _overview => {
                        const trs = document.querySelectorAll(
                            "#imagelist > tbody > tr"
                        )
                        trs.forEach(tr => (tr.style.display = ""))
                    }
                }
            ],
            order: 1
        },
        {
            type: "text",
            title: gettext("Edit categories"),
            keys: "Alt-e",
            action: overview => overview.mod.categories.editCategoryDialog(),
            order: 2,
            disabled: overview => overview.app.isOffline()
        },
        {
            type: "text",
            title: gettext("Upload new image"),
            keys: "Alt-u",
            action: overview => {
                Promise.all(/* import() */ [__webpack_require__.e("vendors-node_modules_pnpm_biblatex-csl-converter_3_6_0_node_modules_biblatex-csl-converter_li-d3812c"), __webpack_require__.e("vendors-node_modules_pnpm_cropperjs_1_6_2_node_modules_cropperjs_dist_cropper_js"), __webpack_require__.e("js_modules_editor_e2ee_encryptor_js-js_modules_images_edit_dialog_model_js"), __webpack_require__.e("js_modules_images_edit_dialog_index_js-_2e940")]).then(__webpack_require__.bind(__webpack_require__, "./js/modules/images/edit_dialog/index.js")).then(({ImageEditDialog}) => {
                    const imageUpload = new ImageEditDialog(
                        overview.app.imageDB,
                        false,
                        overview
                    )
                    imageUpload.init().then(imageId => {
                        overview.updateTable([imageId])
                    })
                })
            },
            order: 3,
            disabled: overview => overview.app.isOffline()
        },
        {
            type: "search",
            icon: "search",
            title: gettext("Search images"),
            keys: "Alt-s",
            input: (overview, text) => overview.table.search(text),
            order: 4
        }
    ]
})


}),
"./js/modules/images/overview/templates.js": (function (__unused_rspack_module, __webpack_exports__, __webpack_require__) {
"use strict";
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  usermediaEditcategoriesTemplate: function() { return usermediaEditcategoriesTemplate; }
});
/* import */ var _common__rspack_import_0 = __webpack_require__("./js/modules/common/index.js");


/** A template for the image category edit form. */
const usermediaCategoryformsTemplate = ({categories}) =>
    `${categories
        .map(
            cat =>
                `<tr id="categoryTr_${cat.id}" class="fw-list-input">
                <td>
                    <input type="text" class="category-form" id="categoryTitle_${cat.id}"
                            value="${(0,_common__rspack_import_0.escapeText)(cat.category_title)}" data-id="${cat.id}" />
                    <span class="fw-add-input icon-addremove" tabindex="0"></span>
                </td>
            </tr>`
        )
        .join("")}
    <tr class="fw-list-input">
        <td>
            <input type="text" class="category-form" />
            <span class="fw-add-input icon-addremove" tabindex="0"></span>
        </td>
    </tr>`

/** A template to edit image categories. */
const usermediaEditcategoriesTemplate = ({categories}) =>
    `<table id="editCategoryList" class="fw-dialog-table">
        <tbody>
            ${usermediaCategoryformsTemplate({categories})}
        </tbody>
    </table>`


}),
"./js/modules/indexed_db/index.js": (function (__unused_rspack_module, __webpack_exports__, __webpack_require__) {
"use strict";
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  IndexedDB: function() { return IndexedDB; }
});
// Changing this number will make clients flush their database.
const DB_VERSION = 4

class IndexedDB {
    constructor(app) {
        this.app = app
    }

    init() {
        this.app["db_config"] = {
            db_name: this.app.config.user.username
        }
        // Open/Create db if it doesn't exist
        const request = window.indexedDB.open(
            this.app.db_config.db_name,
            DB_VERSION
        )

        request.onerror = event => this.reset(event)
        return new Promise(resolve => {
            request.onsuccess = event => {
                const database = event.target.result
                database.close()
                resolve()
            }

            request.onupgradeneeded = event => this.onUpgradeNeeded(event)
        })
    }

    onUpgradeNeeded(event) {
        const db = event.target.result
        Array.from(db.objectStoreNames).forEach(name =>
            db.deleteObjectStore(name)
        )
        Object.entries(this.app.routes).forEach(([route, props]) => {
            if (props.dbTables) {
                Object.entries(props.dbTables).forEach(
                    ([tableName, tableProperties]) =>
                        db.createObjectStore(
                            `${route}_${tableName}`,
                            tableProperties
                        )
                )
            }
        })
    }

    updateData(objectStoreName, data) {
        const request = window.indexedDB.open(
            this.app.db_config.db_name,
            DB_VERSION
        )
        request.onerror = event => {
            this.reset(event).then(() => this.updateData(objectStoreName, data))
        }

        request.onsuccess = event => {
            const db = event.target.result
            const objectStore = db
                .transaction(objectStoreName, "readwrite")
                .objectStore(objectStoreName)
            for (const d in data) {
                objectStore.put(d)
            }
        }

        request.onupgradeneeded = event => this.onUpgradeNeeded(event)
    }

    insertData(objectStoreName, data, retry = true) {
        const request = window.indexedDB.open(
            this.app.db_config.db_name,
            DB_VERSION
        )
        request.onerror = function (event) {
            return this.reset(event).then(() =>
                this.insertData(objectStoreName, data, false)
            )
        }
        request.onsuccess = event => {
            const db = event.target.result
            try {
                const transaction = db.transaction(objectStoreName, "readwrite")
                const objectStore = transaction.objectStore(objectStoreName)
                if (data !== undefined) {
                    data.forEach(document => {
                        objectStore.put(document)
                    })
                }
            } catch (error) {
                if (retry) {
                    // Before resetting IndexedDB make sure to close connections to avoid blocking the
                    // delete IndexedDB process
                    db.close()
                    this.reset().then(() =>
                        this.insertData(objectStoreName, data, false)
                    )
                    return
                } else {
                    throw error
                }
            }
        }

        request.onupgradeneeded = event => this.onUpgradeNeeded(event)
    }

    reset(event = false) {
        if (event) {
            const database = event.target?.result
            if (database) {
                database.close()
            }
        }
        return new Promise(resolve => {
            const delRequest = window.indexedDB.deleteDatabase(
                this.app.db_config.db_name
            )
            delRequest.onerror = () => {
                this.init().then(() => resolve())
            }
            delRequest.onsuccess = () => {
                // Resolve the promise after the indexedDB is set up.
                this.init().then(() => resolve())
            }
        })
    }

    clearData(objectStoreName) {
        return new Promise(resolve => {
            const request = window.indexedDB.open(
                this.app.db_config.db_name,
                DB_VERSION
            )
            request.onerror = () => {}
            request.onsuccess = event => {
                const db = event.target.result
                try {
                    const objectStore = db
                        .transaction(objectStoreName, "readwrite")
                        .objectStore(objectStoreName)
                    const objectStoreReq = objectStore.clear()
                    objectStoreReq.onsuccess = () => {
                        db.close()
                        // Resolve the promise after the ObjectStore has been cleared.
                        resolve()
                    }
                } catch (error) {
                    // Before resetting IndexedDB make sure to close connections to avoid blocking the
                    // delete IndexedDB process
                    db.close()
                    if (error.name === "NotFoundError") {
                        // Resolve the promise after indexed DB is set up.
                        this.reset().then(() => resolve())
                    } else {
                        throw error
                    }
                }
            }
            request.onupgradeneeded = event => this.onUpgradeNeeded(event)
        })
    }

    readAllData(objectStoreName) {
        return new Promise((resolve, reject) => {
            const request = window.indexedDB.open(
                this.app.db_config.db_name,
                DB_VERSION
            )
            request.onerror = event => {
                reject(event)
            }
            request.onsuccess = event => {
                const db = event.target.result
                if (
                    !Array.from(db.objectStoreNames).includes(objectStoreName)
                ) {
                    db.close()
                    return this.reset()
                        .then(() => this.readAllData(objectStoreName))
                        .then(readPromise => resolve(readPromise))
                }
                const objectStore = db
                    .transaction(objectStoreName, "readwrite")
                    .objectStore(objectStoreName)
                const readAllRequest = objectStore.getAll()
                readAllRequest.onerror = event => {
                    reject(event)
                }
                readAllRequest.onsuccess = _event => {
                    // Do something with the request.result!
                    resolve(readAllRequest.result)
                }
            }
            request.onupgradeneeded = event => this.onUpgradeNeeded(event)
        })
    }
}


}),
"./js/modules/login/index.js": (function (__unused_rspack_module, __webpack_exports__, __webpack_require__) {
"use strict";
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  LoginPage: function() { return LoginPage; }
});
/* import */ var _plugins_login__rspack_import_0 = __webpack_require__("./js/plugins/login/index.js");
/* import */ var _plugins_login__rspack_import_0_default = /*#__PURE__*/__webpack_require__.n(_plugins_login__rspack_import_0);
/* import */ var _common__rspack_import_1 = __webpack_require__("./js/modules/common/index.js");
/* import */ var _prelogin__rspack_import_2 = __webpack_require__("./js/modules/prelogin/index.js");
/* import */ var _two_factor__rspack_import_3 = __webpack_require__("./js/modules/two_factor/index.js");





class LoginPage extends _prelogin__rspack_import_2.PreloginPage {
    constructor({app, language, socialaccount_providers}) {
        super({app, language})
        this.socialaccount_providers = socialaccount_providers
        this.title = gettext("Login")
        this.pluginLoaders = _plugins_login__rspack_import_0
        this.headerLinks =
            this.app.settings?.REGISTRATION_OPEN &&
            this.app.settings?.PASSWORD_LOGIN
                ? [
                      {
                          type: "label",
                          text: gettext("New here?")
                      },
                      {
                          type: "button",
                          text: gettext("Sign up"),
                          link: "/account/sign-up/"
                      }
                  ]
                : []
    }

    render() {
        this.contents = `<div class="fw-login-left">
            <h1 class="fw-login-title">${gettext("Log in")}</h1>
            ${
                this.app.settings?.SOCIALACCOUNT_OPEN
                    ? this.socialaccount_providers.length
                        ? `<div class="socialaccount_ballot">
                    <ul class="socialaccount_providers">
                        ${this.socialaccount_providers
                            .map(
                                provider => `<li>
                                <a title="${provider.name}" class="fw-button fw-socialaccount fw-${provider.id}"
                                    href="${provider.login_url}">
                                        <span class="fab fa-${provider.id}"></span>
                                            ${gettext("Login with")} ${provider.name}
                                </a>
                            </li>`
                            )
                            .join("")}
                    </ul>
                </div>`
                        : ""
                    : ""
            }
        </div>
            ${
                this.app.settings?.PASSWORD_LOGIN
                    ? `<div class="fw-login-right">
            <form>
                    <ul id="non-field-errors" class="errorlist"></ul>
                    <div class="input-wrapper">
                        <label for="id-login">${gettext("Username")}</label>
                        <input type="text" name="login" placeholder="${gettext("Username or e-mail")}" autofocus="autofocus" required="" id="id-login" autocomplete="username">
                        <ul id="id-login-errors" class="errorlist"></ul>
                    </div>
                    <div class="input-wrapper">
                        <label for="id-password">${gettext("Password")}</label>
                        <input type="password" name="password" placeholder="${gettext("Password")}" required="" id="id-password" autocomplete="current-password">
                        <ul id="id-password-errors" class="errorlist"></ul>
                    </div>
                    <div class="submit-wrapper">
                        <button class="fw-button fw-dark fw-uppercase" type="submit" id="login-submit">${gettext("Log in")}</button>
                        <br>
                        <input type="checkbox" name="remember" id="id-remember">
                        <label for="id-remember">${gettext("Remember me")}</label>
                    </div>
                    <a id="lost-passwd" href="/account/password-reset/">${gettext("Forgot Password?")}</a>
                </form>
            </div>`
                    : ""
            }`
        super.render()
    }

    bind() {
        super.bind()
        const socialButtons = document.body.querySelectorAll(
            ".fw-button.fw-socialaccount"
        )
        let btnWidth = 1

        socialButtons.forEach(button => {
            const theWidth = button.clientWidth
            if (btnWidth < theWidth) {
                btnWidth = theWidth
            }
        })
        btnWidth += 15
        socialButtons.forEach(button => (button.style.width = `${btnWidth}px`))

        const loginSubmit = document.querySelector("#login-submit")
        if (!loginSubmit) {
            return
        }

        loginSubmit.addEventListener("click", event => {
            event.preventDefault()

            const nonFieldErrors = document.querySelector("#non-field-errors"),
                idLogin = document.querySelector("#id-login"),
                idLoginErrors = document.querySelector("#id-login-errors"),
                idPassword = document.querySelector("#id-password"),
                idPasswordErrors = document.querySelector(
                    "#id-password-errors"
                ),
                idRemember = document.querySelector("#id-remember"),
                fwContents = document.querySelector(".fw-contents")

            if (
                !idLogin ||
                !idLoginErrors ||
                !idPassword ||
                !idPasswordErrors ||
                !idRemember ||
                !fwContents
            ) {
                return
            }

            nonFieldErrors.innerHTML = ""
            idLoginErrors.innerHTML = ""
            idPasswordErrors.innerHTML = ""

            const login = idLogin.value,
                password = idPassword.value,
                remember = idRemember.checked
            let errors = false
            if (!login.length) {
                idLoginErrors.innerHTML = `<li>${gettext("This field is required.")}</li>`
                errors = true
            }
            if (!password.length) {
                idPasswordErrors.innerHTML = `<li>${gettext("This field is required.")}</li>`
                errors = true
            }
            if (errors) {
                return
            }
            return (0,_common__rspack_import_1.jsonPostJson)("/api/user/login/", {login, password, remember})
                .catch(response => {
                    if (
                        !(response instanceof Response) ||
                        response.status !== 400
                    ) {
                        return Promise.reject(response)
                    }
                    return response.json().then(json => {
                        const needCode =
                            json.form.fields.twofactor.errors.includes(
                                "required"
                            )
                        if (
                            needCode &&
                            !json.form.errors.length &&
                            !json.form.fields.login.errors.length &&
                            !json.form.fields.password.errors.length
                        ) {
                            // User needs to complete 2FA verification
                            (0,_two_factor__rspack_import_3.twoFactorLoginDialog)({
                                login,
                                password,
                                remember,
                                loginPage: this
                            })
                        } else {
                            json.form.errors.forEach(
                                error =>
                                    (nonFieldErrors.innerHTML += `<li>${(0,_common__rspack_import_1.escapeText)(error)}</li>`)
                            )
                            json.form.fields.login.errors.forEach(
                                error =>
                                    (idLoginErrors.innerHTML += `<li>${(0,_common__rspack_import_1.escapeText)(error)}</li>`)
                            )
                            json.form.fields.password.errors.forEach(
                                error =>
                                    (idPasswordErrors.innerHTML += `<li>${(0,_common__rspack_import_1.escapeText)(error)}</li>`)
                            )
                        }

                        return {json, status: response.status}
                    })
                })
                .then(({json, status}) => {
                    if (status === 400) {
                        return
                    }
                    this.afterLogin(json)
                })
        })
    }

    afterLogin(json) {
        // Check if user's language preference differs from current language
        const currentLang = document.documentElement.lang
        if (json.html && json.html.length > 0) {
            const htmlValues = JSON.parse(json.html)

            if (htmlValues.Location === "/api/account/confirm-email/") {
                // Email has not yet been confirmed.
                document.querySelector(".fw-contents").innerHTML = `<div class="fw-login-left">
                        <h1 class="fw-login-title">${gettext("Verify Your E-mail Address")}</h1>
                        <p>
                            ${gettext(
                                "We have sent an e-mail to your email address for verification. Follow the link provided to finalize the signup process."
                            )}
                            <br />
                            ${gettext(
                                "Please contact us if you do not receive it within a few minutes."
                            )}
                        </p>
                    </div>`
            } else if (
                htmlValues.user?.language &&
                htmlValues.user?.language !== currentLang
            ) {
                // Language preference differs, reload the page to apply it
                window.location.reload()
            } else {
                // No language change needed, proceed with normal init
                this.app.init()
            }
        } else {
            this.app.init()
        }
    }
}


}),
"./js/modules/menu/index.js": (function (__unused_rspack_module, __webpack_exports__, __webpack_require__) {
"use strict";
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  SiteMenu: function() { return SiteMenu; }
});
/* import */ var w3c_keyname__rspack_import_0 = __webpack_require__("./node_modules/.pnpm/w3c-keyname@2.2.8/node_modules/w3c-keyname/index.js");
/* import */ var _plugins_menu__rspack_import_1 = __webpack_require__("./js/plugins/menu/index.js");
/* import */ var _common__rspack_import_2 = __webpack_require__("./js/modules/common/index.js");
/* import */ var _templates__rspack_import_3 = __webpack_require__("./js/modules/menu/templates.js");






// Bindings for the top menu on overview pages

class SiteMenu {
    constructor(app, activeItem) {
        this.app = app
        this.activeItem = activeItem
        this.navItems = [
            {
                text: gettext("Documents"),
                url: "/",
                title: gettext("edit documents"),
                id: "documents",
                order: 0,
                keys: "Alt-d"
            },
            {
                text: gettext("Bibliography"),
                url: "/bibliography/",
                title: gettext("manage bibliography library"),
                id: "bibliography",
                order: 1,
                keys: "Alt-b"
            },
            {
                text: gettext("Images"),
                url: "/usermedia/",
                title: gettext("manage image files"),
                id: "images",
                order: 2,
                keys: "Alt-m"
            }
        ]
        this.listeners = {}
        this.keyboardShortcuts = new Map()
    }

    init() {
        this.activatePlugins()
        this.setupKeyboardShortcuts()
        const currentActive = this.navItems.find(
            item => item.id === this.activeItem
        )
        if (currentActive) {
            currentActive.active = true
        }

        (0,_common__rspack_import_2.whenReady)().then(() => {
            this.sortMenu()
            this.renderMenu()
            this.bindPreferencePullDown()
            this.bindKeyboardNavigation()
        })
    }

    setupKeyboardShortcuts() {
        this.navItems.forEach(navItem => {
            if (navItem.keys) {
                this.keyboardShortcuts.set(navItem.keys.toLowerCase(), navItem)
            }
        })
    }

    bindKeyboardNavigation() {
        this.listeners.onKeydown = event => this.onKeydown(event)
        document.body.addEventListener("keydown", this.listeners.onKeydown)
    }

    onKeydown(event) {
        const name = (0,w3c_keyname__rspack_import_0.keyName)(event)

        if (event.altKey) {
            const shortcut = "alt-" + name.toLowerCase()
            const navItem = this.keyboardShortcuts.get(shortcut)
            if (navItem) {
                event.preventDefault()
                event.stopPropagation()
                this.app.goTo(navItem.url)
                return
            }
        }
        const headerNav = document.getElementById("header-nav")
        const siteMenuItems = headerNav.querySelectorAll(".fw-nav-item a")
        const currentFocus = document.activeElement
        const overviewMenu = document.getElementById("fw-overview-menu")
        const isInSiteMenu = headerNav.contains(currentFocus)
        const isInOverviewDropdown = overviewMenu
            ?.querySelector(".fw-pulldown.fw-left")
            ?.contains(currentFocus)

        if (!isInSiteMenu && !overviewMenu?.contains(currentFocus)) {
            return
        }

        let currentIndex = -1
        if (isInSiteMenu) {
            currentIndex = parseInt(currentFocus.dataset.index)
        }
        switch (name) {
            case "ArrowLeft": {
                if (isInSiteMenu) {
                    event.preventDefault()
                    const prevIndex =
                        currentIndex > 0
                            ? currentIndex - 1
                            : siteMenuItems.length - 1
                    siteMenuItems[prevIndex].focus()
                }
                break
            }
            case "ArrowRight": {
                if (isInSiteMenu) {
                    event.preventDefault()
                    const nextIndex =
                        currentIndex < siteMenuItems.length - 1
                            ? currentIndex + 1
                            : 0
                    siteMenuItems[nextIndex].focus()
                }
                break
            }
            case "ArrowDown": {
                if (isInSiteMenu && overviewMenu) {
                    event.preventDefault()
                    // Focus first overview menu item
                    const firstOverviewItem = overviewMenu.querySelector(
                        "button, div.dropdown"
                    )

                    if (firstOverviewItem) {
                        firstOverviewItem.focus()
                    }
                }
                break
            }
            case "ArrowUp": {
                if (
                    overviewMenu?.contains(currentFocus) &&
                    !isInOverviewDropdown
                ) {
                    event.preventDefault()
                    // Focus the site menu item that's above the current overview menu item
                    const siteMenuItem = siteMenuItems[0]
                    if (siteMenuItem) {
                        siteMenuItem.focus()
                    }
                }
                break
            }
            case "Enter":
            case " ": {
                if (isInSiteMenu) {
                    event.preventDefault()
                    currentFocus.click()
                }
                break
            }
        }
    }

    sortMenu() {
        this.navItems.sort((a, b) => a.order - b.order)
    }

    renderMenu() {
        const headerNav = document.getElementById("header-nav")
        headerNav.innerHTML = (0,_templates__rspack_import_3.headerNavTemplate)({
            navItems: this.navItems,
            getAccessKeyHTML: (text, keys) => this.getAccessKeyHTML(text, keys)
        })
    }

    bindPreferencePullDown() {
        (0,_common__rspack_import_2.dropdownSelect)(document.getElementById("user-preferences-pulldown"), {
            button: document.getElementById("preferences-btn"),
            onChange: value => {
                switch (value) {
                    case "profile":
                        this.app.goTo("/user/profile/")
                        break
                    case "contacts":
                        this.app.goTo("/user/contacts/")
                        break
                    case "logout":
                        // Clear all E2EE data from sessionStorage (document keys,
                        // passwords, decrypted titles, and passphrase keys).
                        for (let i = sessionStorage.length - 1; i >= 0; i--) {
                            const key = sessionStorage.key(i)
                            if (key && key.startsWith("e2ee_")) {
                                sessionStorage.removeItem(key)
                            }
                        }
                        (0,_common__rspack_import_2.jsonPost)("/api/user/logout/").then(
                            () =>
                                (window.location =
                                    this.app.routes[""].app === "document"
                                        ? "/"
                                        : "/documents/")
                        )
                        break
                }
            }
        })
    }

    activatePlugins() {
        // Add plugins, but only once.
        if (!this.plugins) {
            this.plugins = {}

            Object.keys(_plugins_menu__rspack_import_1).forEach(plugin => {
                if (typeof _plugins_menu__rspack_import_1[plugin] === "function") {
                    this.plugins[plugin] = new _plugins_menu__rspack_import_1[plugin](this)
                    this.plugins[plugin].init()
                }
            })
        }
    }

    destroy() {
        document.body.removeEventListener("keydown", this.listeners.onKeydown)
        this.listeners = {}
    }

    getAccessKeyHTML(text, accessKey) {
        if (!accessKey) {
            return text
        }
        const key = accessKey.split("-")[1] // Get the key part after "Alt-"
        const index = text.toLowerCase().indexOf(key.toLowerCase())
        if (index === -1) {
            return text
        }
        return `${text.substring(0, index)}<span class="access-key">${text.charAt(index)}</span>${text.substring(index + 1)}`
    }
}


}),
"./js/modules/menu/templates.js": (function (__unused_rspack_module, __webpack_exports__, __webpack_require__) {
"use strict";
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  headerNavTemplate: function() { return headerNavTemplate; }
});
const headerNavTemplate = ({navItems, getAccessKeyHTML}) =>
    `<div class="fw-container fw-nav-container">
    ${navItems
        .map(
            (navItem, index) =>
                `<p class="fw-nav-item ${navItem.active ? "active-menu-wrapper" : ""}" role="presentation">
                <a class="fw-header-navigation-text" href="${navItem.url}" title="${navItem.title}" role="menuitem" data-index=${index}>
                    ${getAccessKeyHTML(navItem.text, navItem.keys)}
                </a>
            </p>`
        )
        .join("")}
    </div>`


}),
"./js/modules/offline/index.js": (function (__unused_rspack_module, __webpack_exports__, __webpack_require__) {
"use strict";
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  OfflinePage: function() { return OfflinePage; }
});
/* import */ var _prelogin__rspack_import_0 = __webpack_require__("./js/modules/prelogin/index.js");


class OfflinePage extends _prelogin__rspack_import_0.PreloginPage {
    constructor({app, language}) {
        super({app, language})
        this.title = gettext("Disconnected")
        this.contents = `<div class="fw-login-left">
            <h1 class="fw-login-title">${gettext("Disconnected")}</h1>
            <p>${interpolate(
                gettext(
                    "You are currently disconnected from the %(appName)s server."
                ),
                {appName: this.app.name},
                true
            )}</p>
        </div>`

        this.footerLinks = this.footerLinks.filter(link => link.external) // We only show external links as internal links will not work

        this.headerLinks = [
            {
                type: "button",
                text: gettext("Reload page"),
                link: window.location.pathname
            }
        ]
    }

    init() {
        return super
            .init()
            .then(() =>
                document
                    .querySelectorAll("#lang-selection,.feedback-tab")
                    .forEach(el => (el.style.visibility = "hidden"))
            )
    }
}


}),
"./js/modules/password_reset/change_password.js": (function (__unused_rspack_module, __webpack_exports__, __webpack_require__) {
"use strict";
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  PasswordResetChangePassword: function() { return PasswordResetChangePassword; }
});
/* import */ var _common__rspack_import_0 = __webpack_require__("./js/modules/common/index.js");
/* import */ var _prelogin__rspack_import_1 = __webpack_require__("./js/modules/prelogin/index.js");



class PasswordResetChangePassword extends _prelogin__rspack_import_1.PreloginPage {
    constructor({app, language}, key = false) {
        super({app, language})
        this.title = gettext("Change Password")
        this.key = key
        // Note: We do not currently support plugins targetting only the reset password page
    }

    render() {
        this.contents = `<div class="fw-login-left">
            <h1 class="fw-login-title">${gettext("Change password")}</h1>
            <p>${gettext("You have indicated that you have forgotten your password. Please enter your new password in the form twice.")}</p>
        </div>
        <div class="fw-login-right">
            <form>
                <ul id="non-field-errors" class="errorlist"></ul>
                <div class="input-wrapper">
                    <label for="id-password1">${gettext("Create a password")}</label>
                    <input type="password" name="password1" placeholder="${gettext("Password")}" required="" id="id-password1" autocomplete="new-password">
                    <ul id="id-password1-errors" class="errorlist"></ul>
                </div>
                <div class="input-wrapper">
                    <label for="id-password2">${gettext("Confirm your password")}</label>
                    <input type="password" name="password2" placeholder="${gettext("Password (again)")}" required="" id="id-password2" autocomplete="new-password">
                    <ul id="id-password2-errors" class="errorlist"></ul>
                </div>
                <div class="submit-wrapper">
                    <button class="fw-button fw-dark fw-uppercase" id="change-password-submit" type="submit">${gettext("Change My Password")}</button>
                </div>
            </form>
        </div>`
        super.render()
    }

    bind() {
        super.bind()

        // We remove the key from the URL to prevent leakage.
        window.history.replaceState({}, "", "/account/change-password/")

        const passwordInput = document.getElementById("id-password1")
        if (passwordInput) {
            passwordInput.focus()
        }

        document
            .getElementById("change-password-submit")
            .addEventListener("click", event => {
                event.preventDefault()
                document.querySelector("#non-field-errors").innerHTML = ""
                document.querySelector("#id-password1-errors").innerHTML = ""
                document.querySelector("#id-password2-errors").innerHTML = ""

                const password1 = document.getElementById("id-password1").value,
                    password2 = document.getElementById("id-password2").value
                let errors = false
                if (!password1.length) {
                    document.querySelector("#id-password1-errors").innerHTML =
                        `<li>${gettext("This field is required.")}</li>`
                    errors = true
                }
                if (!password2.length) {
                    document.querySelector("#id-password2-errors").innerHTML =
                        `<li>${gettext("This field is required.")}</li>`
                    errors = true
                }
                if (password1 !== password2) {
                    document.querySelector("#id-password2-errors").innerHTML =
                        `<li>${gettext("You must type the same password each time.")}</li>`
                    errors = true
                }

                if (errors) {
                    return
                }
                (0,_common__rspack_import_0.get)(`/api/account/password/reset/key/${this.key}/`)
                    .then(response => {
                        return (0,_common__rspack_import_0.jsonPost)(response.url, {password1, password2})
                    })
                    .then(() => {
                        if (document.body !== this.dom) {
                            return
                        }
                        document.querySelector(".fw-contents").innerHTML = `<div class="fw-login-left">
                        <h1 class="fw-login-title">${gettext("Password reset")}</h1>
                        <p>
                            ${gettext(
                                "Your password has been reset and you can now log in with the new password."
                            )}
                        </p>
                    </div>`
                    })
                    .catch(response =>
                        response.json().then(json => {
                            json.form.errors.forEach(
                                error =>
                                    (document.querySelector(
                                        "#non-field-errors"
                                    ).innerHTML +=
                                        `<li>${(0,_common__rspack_import_0.escapeText)(error)}</li>`)
                            )
                            if (json.form.fields.password1) {
                                json.form.fields.password1.errors.forEach(
                                    error =>
                                        (document.querySelector(
                                            "#id-password1-errors"
                                        ).innerHTML +=
                                            `<li>${(0,_common__rspack_import_0.escapeText)(error)}</li>`)
                                )
                            }
                            if (json.form.fields.password2) {
                                json.form.fields.password2.errors.forEach(
                                    error =>
                                        (document.querySelector(
                                            "#id-password2-errors"
                                        ).innerHTML +=
                                            `<li>${(0,_common__rspack_import_0.escapeText)(error)}</li>`)
                                )
                            }
                        })
                    )
            })
    }
}


}),
"./js/modules/password_reset/index.js": (function (__unused_rspack_module, __webpack_exports__, __webpack_require__) {
"use strict";
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  PasswordResetChangePassword: function() { return /* reexport safe */ _change_password__rspack_import_1.PasswordResetChangePassword; },
  PasswordResetRequest: function() { return /* reexport safe */ _request_email__rspack_import_0.PasswordResetRequest; }
});
/* import */ var _request_email__rspack_import_0 = __webpack_require__("./js/modules/password_reset/request_email.js");
/* import */ var _change_password__rspack_import_1 = __webpack_require__("./js/modules/password_reset/change_password.js");




}),
"./js/modules/password_reset/request_email.js": (function (__unused_rspack_module, __webpack_exports__, __webpack_require__) {
"use strict";
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  PasswordResetRequest: function() { return PasswordResetRequest; }
});
/* import */ var _common__rspack_import_0 = __webpack_require__("./js/modules/common/index.js");
/* import */ var _prelogin__rspack_import_1 = __webpack_require__("./js/modules/prelogin/index.js");



class PasswordResetRequest extends _prelogin__rspack_import_1.PreloginPage {
    constructor({app, language}) {
        super({app, language})
        this.title = gettext("Reset Password")
        // Note: We do not currently support plugins targetting only the reset password page
    }

    render() {
        this.contents = `<div class="fw-login-left">
            <h1 class="fw-login-title">${gettext("Password reset")}</h1>
            <p>${gettext("Forgotten your password? Enter your e-mail address in the form, and we'll send you an e-mail allowing you to reset it.")}</p>
            <p>${interpolate(
                gettext(
                    'If you have any trouble resetting your password, please <a href="mailto:%(contactEmail)s">contact us</a>.'
                ),
                {contactEmail: this.app.settings?.CONTACT_EMAIL},
                true
            )}</p>
        </div>
        <div class="fw-login-right">
            <form>
                <ul id="non-field-errors" class="errorlist"></ul>
                <div class="input-wrapper">
                    <label for="id-email">${gettext("E-mail address")}</label>
                    <input type="email" name="email" size="30" placeholder="${gettext("E-mail address")}" required="" id="id-email" autocomplete="email">
                    <ul id="id-email-errors" class="errorlist"></ul>
                </div>
                <div class="submit-wrapper">
                    <button class="fw-button fw-dark fw-uppercase" id="email-submit" type="submit">${gettext("Reset My Password")}</button>
                </div>
            </form>
        </div>`
        super.render()
    }

    bind() {
        super.bind()

        const emailInput = document.getElementById("id-email")
        if (emailInput) {
            emailInput.focus()
        }

        document
            .getElementById("email-submit")
            .addEventListener("click", event => {
                event.preventDefault()
                document.querySelector("#non-field-errors").innerHTML = ""
                document.querySelector("#id-email-errors").innerHTML = ""

                const emailEl = document.getElementById("id-email"),
                    email = emailEl.value
                let errors = false
                if (!emailEl.checkValidity()) {
                    document.querySelector("#id-email-errors").innerHTML =
                        `<li>${gettext("This is not a valid email.")}</li>`
                    errors = true
                } else if (!email.length) {
                    document.querySelector("#id-email-errors").innerHTML =
                        `<li>${gettext("This field is required.")}</li>`
                    errors = true
                }
                if (errors) {
                    return
                }

                (0,_common__rspack_import_0.jsonPost)("/api/user/password/reset/", {email})
                    .then(() => {
                        if (document.body !== this.dom) {
                            return
                        }
                        document.querySelector(".fw-contents").innerHTML = `<div class="fw-login-left">
                        <h1 class="fw-login-title">${gettext("Instructions emailed")}</h1>
                        <p>
                            ${interpolate(
                                gettext(
                                    'We have sent an e-mail to <a href="mailto:%(email)s">%(email)s</a> with instructions on how to reset your password.'
                                ),
                                {email},
                                true
                            )}
                            <br />
                            ${gettext(
                                "Please contact us if you do not receive it within a few minutes."
                            )}
                        </p>
                    </div>`
                    })
                    .catch(response =>
                        response.json().then(json => {
                            json.form.errors.forEach(
                                error =>
                                    (document.querySelector(
                                        "#non-field-errors"
                                    ).innerHTML +=
                                        `<li>${(0,_common__rspack_import_0.escapeText)(error)}</li>`)
                            )
                            json.form.fields.email.errors.forEach(
                                error =>
                                    (document.querySelector(
                                        "#id-email-errors"
                                    ).innerHTML +=
                                        `<li>${(0,_common__rspack_import_0.escapeText)(error)}</li>`)
                            )
                        })
                    )
            })
    }
}


}),
"./js/modules/prelogin/index.js": (function (__unused_rspack_module, __webpack_exports__, __webpack_require__) {
"use strict";
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  PreloginPage: function() { return PreloginPage; }
});
/* import */ var _plugins_prelogin__rspack_import_0 = __webpack_require__("./js/plugins/prelogin/index.js");
/* import */ var _plugins_prelogin__rspack_import_0_default = /*#__PURE__*/__webpack_require__.n(_plugins_prelogin__rspack_import_0);
/* import */ var _common__rspack_import_1 = __webpack_require__("./js/modules/common/index.js");
/* import */ var _feedback__rspack_import_2 = __webpack_require__("./js/modules/feedback/index.js");
/* import */ var _templates__rspack_import_3 = __webpack_require__("./js/modules/prelogin/templates.js");






class PreloginPage {
    constructor({app, language}) {
        this.app = app
        this.language = language
        this.pluginLoaders = {}
        this.title = ""
        this.contents = ""
        this.footerLinks = this.app.settings?.FOOTER_LINKS?.length
            ? this.app.settings.FOOTER_LINKS
            : [
                  {
                      text: gettext("Terms and Conditions"),
                      link: "/pages/terms/"
                  },
                  {
                      text: gettext("Privacy policy"),
                      link: "/pages/privacy/"
                  },
                  {
                      text: gettext("Equations and Math with MathLive"),
                      link: "https://github.com/arnog/mathlive#readme",
                      external: true
                  },
                  {
                      text: gettext("Citations with Citation Style Language"),
                      link: "https://citationstyles.org/",
                      external: true
                  },
                  {
                      text: gettext("Editing with ProseMirror"),
                      link: "https://prosemirror.net/",
                      external: true
                  }
              ]
        this.headerLinks = [
            {
                type: "button",
                text: gettext("Log in"),
                link:
                    this.app.routes[""].app === "document" ? "/" : "/documents/"
            }
        ]
    }

    activateFidusPlugins() {
        // Add plugins.
        this.plugins = {}

        // Plugins for the specific page
        Object.keys(this.pluginLoaders).forEach(plugin => {
            if (typeof this.pluginLoaders[plugin] === "function") {
                this.plugins[plugin] = new this.pluginLoaders[plugin]({
                    page: this
                })
                this.plugins[plugin].init()
            }
        })

        // General plugins for all prelogin pages
        Object.keys(_plugins_prelogin__rspack_import_0).forEach(plugin => {
            if (typeof _plugins_prelogin__rspack_import_0[plugin] === "function") {
                this.plugins[plugin] = new _plugins_prelogin__rspack_import_0[plugin]({page: this})
                this.plugins[plugin].init()
            }
        })
    }

    init() {
        return (0,_common__rspack_import_1.whenReady)().then(() => {
            this.activateFidusPlugins()
            this.render()
            this.bind()
        })
    }

    bind() {
        this.dom
            .querySelector(".fw-login-logo")
            .addEventListener("click", () => this.app.goTo("/"))
        this.dom
            .querySelector("#lang-selection")
            .addEventListener("change", event => {
                this.language = event.target.value
                return (0,_common__rspack_import_1.setLanguage)(this.app.config, this.language)
            })
    }

    render() {
        this.dom = document.createElement("body")
        this.dom.classList.add("prelogin")
        this.dom.classList.add("scrollable")
        this.dom.innerHTML = (0,_templates__rspack_import_3.basePreloginTemplate)({
            language: this.language,
            headerLinks: this.headerLinks,
            footerLinks: this.footerLinks,
            contents: this.contents,
            settings: this.app.settings
        })
        document.body = this.dom
        ;(0,_common__rspack_import_1.ensureCSS)([staticUrl("css/prelogin.css")])
        ;(0,_common__rspack_import_1.setDocTitle)(this.title, this.app)
        const feedbackTab = new _feedback__rspack_import_2.FeedbackTab()
        feedbackTab.init()
    }
}


}),
"./js/modules/prelogin/templates.js": (function (__unused_rspack_module, __webpack_exports__, __webpack_require__) {
"use strict";
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  basePreloginTemplate: function() { return basePreloginTemplate; }
});
/* import */ var _common__rspack_import_0 = __webpack_require__("./js/modules/common/index.js");


const basePreloginTemplate = ({
    contents,
    language,
    headerLinks = [],
    footerLinks = [],
    settings = {}
}) => `
<div id="wait">
   <i class="fa fa-spinner fa-pulse"></i>
</div>
<header class="fw-header prelogin" role="banner">
   <div class="fw-container">
      <h1 class="fw-login-logo"><span class="fw-logo-text"></span><img src="${staticUrl("svg/icon.svg")}" alt="Logo"/></h1>
      <nav id="header-nav" role="navigation" aria-label="${gettext("Site navigation")}">${headerLinks
          .map(hLink => {
              let returnValue
              switch (hLink.type) {
                  case "label":
                      returnValue = `<label>${hLink.text}</label>`
                      break
                  case "button":
                      returnValue = `<a class="fw-button fw-orange fw-uppercase" href="${hLink.link}" title="${hLink.text}">${hLink.text}</a>`
                      break
                  default:
                      returnValue = ""
              }
              return returnValue
          })
          .join("")}</nav>
${
    settings?.BRANDING_LOGO
        ? `<div class="fw-login-branding-logo"><img src="${staticUrl(settings.BRANDING_LOGO)}" alt="Brand logo" /></div>`
        : ""
}
   </div>
   ${
       settings?.IS_FREE
           ? `<div class="star"><img src="${staticUrl("img/free_star.avif")}" alt="Free"></div>`
           : ""
   }
</header>
<div class="fw-contents prelogin">
    ${contents}
</div>
<footer id="footer-menu" class="prelogin">
    <div class="fw-container">
        <ul class="fw-footer-links">
            ${footerLinks
                .map(
                    fLink =>
                        `<li><a href="${fLink.link}" target="_blank"${fLink.external ? ' rel="noreferrer"' : ""}>${fLink.text}</a></li>`
                )
                .join("")}
        </ul>
        <select id="lang-selection" aria-label="${gettext("Select language")}">
            ${(settings?.LANGUAGES || [])
                .map(
                    ([code, _name]) =>
                        `<option value="${code}" ${language === code ? "selected" : ""}>${(0,_common__rspack_import_0.langName)(code)}</option>`
                )
                .join("")}
        </select>
    </div>
</footer>`


}),
"./js/modules/profile/delete_user.js": (function (__unused_rspack_module, __webpack_exports__, __webpack_require__) {
"use strict";
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  DeleteUserDialog: function() { return DeleteUserDialog; }
});
/* import */ var _common__rspack_import_0 = __webpack_require__("./js/modules/common/index.js");
/* import */ var _templates__rspack_import_1 = __webpack_require__("./js/modules/profile/templates.js");



class DeleteUserDialog {
    constructor(username) {
        this.username = username
    }

    init() {
        const buttons = [
            {
                text: gettext("Delete"),
                classes: "fw-dark",
                click: () => {
                    const usernamefieldValue = document.getElementById(
                        "username-confirmation"
                    ).value
                    const passwordfieldValue =
                        document.getElementById("password").value
                    if (
                        usernamefieldValue === this.username &&
                        passwordfieldValue.length
                    ) {
                        this.deleteCurrentUser(passwordfieldValue)
                    }
                }
            },
            {
                type: "cancel"
            }
        ]
        this.dialog = new _common__rspack_import_0.Dialog({
            id: "confirmaccountdeletion",
            title: gettext("Confirm deletion"),
            body: (0,_templates__rspack_import_1.deleteUserDialogTemplate)(),
            icon: "exclamation-triangle",
            buttons,
            height: 250
        })
        this.dialog.open()
    }

    deleteCurrentUser(password) {
        (0,_common__rspack_import_0.activateWait)()

        ;(0,_common__rspack_import_0.jsonPostBare)("/api/user/delete/", {password}).then(response => {
            switch (response.status) {
                case 200:
                    window.location = "/"
                    break
                case 403:
                    ;(0,_common__rspack_import_0.addAlert)(
                        "error",
                        gettext(
                            "Staff accounts have to be deleted through the admin interface."
                        )
                    )
                    break
                case 401:
                    ;(0,_common__rspack_import_0.addAlert)("error", gettext("Password incorrect."))
                    break
                default:
                    ;(0,_common__rspack_import_0.addAlert)("error", gettext("Could not delete user account."))
                    break
            }
            (0,_common__rspack_import_0.deactivateWait)()
        })
    }
}


}),
"./js/modules/profile/dialogs.js": (function (__unused_rspack_module, __webpack_exports__, __webpack_require__) {
"use strict";
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  addEmailDialog: function() { return addEmailDialog; },
  changeAvatarDialog: function() { return changeAvatarDialog; },
  changePrimaryEmailDialog: function() { return changePrimaryEmailDialog; },
  changePwdDialog: function() { return changePwdDialog; },
  deleteAvatarDialog: function() { return deleteAvatarDialog; },
  deleteEmailDialog: function() { return deleteEmailDialog; },
  deleteSocialaccountDialog: function() { return deleteSocialaccountDialog; }
});
/* import */ var _common__rspack_import_0 = __webpack_require__("./js/modules/common/index.js");
/* import */ var _templates__rspack_import_1 = __webpack_require__("./js/modules/profile/templates.js");



const changeAvatarDialog = app => {
    const buttons = [
        {
            text: gettext("Upload"),
            classes: "fw-dark",
            click: () => {
                if (!avatarUploader.files.length) {
                    // No file selected
                    return
                }

                (0,_common__rspack_import_0.activateWait)()

                const file = avatarUploader.files[0]

                ;(0,_common__rspack_import_0.jsonPost)("/api/user/avatar/upload/", {}, null, {
                    avatar: {
                        file,
                        filename: file.name
                    }
                })
                    .then(() => (0,_common__rspack_import_0.deactivateWait)())
                    .then(() => app.getConfiguration())
                    .then(() => app.selectPage())
                    .catch(() => {
                        ;(0,_common__rspack_import_0.deactivateWait)()
                        ;(0,_common__rspack_import_0.addAlert)(
                            "error",
                            gettext("Could not update profile avatar")
                        )
                    })
                dialog.close()
            }
        },
        {
            type: "cancel"
        }
    ]

    const avatarUploader = document.createElement("input")
    avatarUploader.type = "file"
    avatarUploader.accept = ".png, .jpg, .jpeg"
    avatarUploader.style.display = "none"

    const dialog = new _common__rspack_import_0.Dialog({
        id: "change-avatar-dialog",
        title: gettext("Upload your profile picture"),
        body: (0,_templates__rspack_import_1.changeAvatarDialogTemplate)(),
        buttons
    })
    dialog.open()
    dialog.dialogEl.appendChild(avatarUploader)

    avatarUploader.addEventListener("change", () => {
        document.getElementById("uploaded-avatar-name").innerHTML =
            avatarUploader.value.replace(/C:\\fakepath\\/i, "")
    })
    document
        .getElementById("upload-avatar-btn")
        .addEventListener("click", event => {
            event.preventDefault()
            avatarUploader.click()
        })
}

const deleteAvatar = app => {
    ;(0,_common__rspack_import_0.activateWait)()

    ;(0,_common__rspack_import_0.jsonPost)("/api/user/avatar/delete/")
        .then(() => (0,_common__rspack_import_0.deactivateWait)())
        .then(() => app.getConfiguration())
        .then(() => app.selectPage())
        .catch(() => {
            ;(0,_common__rspack_import_0.deactivateWait)()
            ;(0,_common__rspack_import_0.addAlert)("error", gettext("Could not delete avatar"))
        })
}

const deleteAvatarDialog = app => {
    const buttons = [
        {
            text: gettext("Delete"),
            classes: "fw-dark",
            click: () => {
                deleteAvatar(app)
                dialog.close()
            }
        },
        {
            type: "cancel"
        }
    ]
    const dialog = new _common__rspack_import_0.Dialog({
        title: gettext("Confirm deletion"),
        id: "confirmdeletion",
        icon: "exclamation-triangle",
        body: (0,_templates__rspack_import_1.confirmDeleteAvatarTemplate)(),
        buttons
    })
    dialog.open()
}

const changePwdDialog = ({username}) => {
    const buttons = [
        {
            text: gettext("Submit"),
            classes: "fw-dark",
            click: () => {
                const oldPwd =
                        document.getElementById("old-password-input").value,
                    newPwd1 = document.getElementById(
                        "new-password-input1"
                    ).value,
                    newPwd2 = document.getElementById(
                        "new-password-input2"
                    ).value

                document.getElementById("fw-password-change-error").innerHTML =
                    ""

                if ("" === oldPwd || "" === newPwd1 || "" === newPwd2) {
                    document.getElementById(
                        "fw-password-change-error"
                    ).innerHTML = gettext("All fields are required!")
                    return
                }

                if (newPwd1 !== newPwd2) {
                    document.getElementById(
                        "fw-password-change-error"
                    ).innerHTML = gettext("Please confirm the new password!")
                    return
                }

                (0,_common__rspack_import_0.activateWait)()

                ;(0,_common__rspack_import_0.jsonPostJson)("/api/user/passwordchange/", {
                    old_password: oldPwd,
                    new_password1: newPwd1,
                    new_password2: newPwd2
                })
                    .then(({json, status}) => {
                        if (200 === status) {
                            dialog.close()
                            ;(0,_common__rspack_import_0.addAlert)(
                                "info",
                                gettext("The password has been changed.")
                            )
                        } else {
                            let eMsg
                            if (json.msg.hasOwnProperty("old_password")) {
                                eMsg = json.msg["old_password"][0]
                            } else if (
                                json.msg.hasOwnProperty("new_password1")
                            ) {
                                eMsg = json.msg["new_password1"][0]
                            } else if (
                                json.msg.hasOwnProperty("new_password2")
                            ) {
                                eMsg = json.msg["new_password2"][0]
                            } else {
                                eMsg = gettext(
                                    "The password could not be changed!"
                                )
                            }
                            document.getElementById(
                                "fw-password-change-error"
                            ).innerHTML = eMsg
                        }
                    })
                    .catch(() =>
                        (0,_common__rspack_import_0.addAlert)(
                            "error",
                            gettext("The password could not be changed")
                        )
                    )
                    .then(() => (0,_common__rspack_import_0.deactivateWait)())
            }
        },
        {
            type: "cancel"
        }
    ]
    const dialog = new _common__rspack_import_0.Dialog({
        id: "fw-change-pwd-dialog",
        title: gettext("Change Password"),
        body: (0,_templates__rspack_import_1.changePwdDialogTemplate)({username}),
        buttons
    })

    dialog.open()
}

const addEmailDialog = app => {
    const buttons = [
        {
            text: gettext("Submit"),
            classes: "fw-dark",
            click: () => {
                const email = document
                    .getElementById("new-profile-email")
                    .value.replace(/(^\s+)|(\s+$)/g, "")

                document.getElementById("fw-add-email-error").innerHTML = ""

                if ("" === email) {
                    document.getElementById("fw-add-email-error").innerHTML =
                        gettext("New email address is required!")
                    return
                }

                document.getElementById("new-profile-email").value = email

                ;(0,_common__rspack_import_0.jsonPostJson)("/api/user/email/add/", {
                    email
                })
                    .then(({json, status}) => {
                        ;(0,_common__rspack_import_0.deactivateWait)()
                        if (200 === status) {
                            dialog.close()
                            return app
                                .getConfiguration()
                                .then(() => app.selectPage())
                                .then(() =>
                                    (0,_common__rspack_import_0.addAlert)(
                                        "info",
                                        `${gettext("Confirmation e-mail sent to")}: ${email}`
                                    )
                                )
                        } else {
                            document.getElementById(
                                "fw-add-email-error"
                            ).innerHTML = json.msg["email"][0]
                        }
                    })
                    .catch(() => {
                        (0,_common__rspack_import_0.deactivateWait)()
                        ;(0,_common__rspack_import_0.addAlert)(
                            "error",
                            gettext("The email could not be added!")
                        )
                    })
            }
        },
        {
            type: "cancel"
        }
    ]

    const dialog = new _common__rspack_import_0.Dialog({
        id: "fw-add-email-dialog",
        title: gettext("Add Email"),
        body: (0,_templates__rspack_import_1.changeEmailDialogTemplate)(),
        buttons,
        width: 400
    })
    dialog.open()
}

const deleteEmailDialog = (target, app) => {
    const email = target.dataset.email

    const buttons = [
        {
            text: gettext("Remove"),
            classes: "fw-dark",
            click: () => {
                ;(0,_common__rspack_import_0.activateWait)()

                ;(0,_common__rspack_import_0.jsonPost)("/api/user/email/delete/", {
                    email
                })
                    .then(() => {
                        dialog.close()
                        ;(0,_common__rspack_import_0.deactivateWait)()
                    })
                    .then(() => app.getConfiguration())
                    .then(() => app.selectPage())
                    .then(() =>
                        (0,_common__rspack_import_0.addAlert)("info", gettext("Email successfully deleted!"))
                    )
                    .catch(() => {
                        (0,_common__rspack_import_0.deactivateWait)()
                        ;(0,_common__rspack_import_0.addAlert)(
                            "error",
                            gettext("The email could not be deleted!")
                        )
                    })
            }
        },
        {
            type: "cancel"
        }
    ]

    const dialog = new _common__rspack_import_0.Dialog({
        id: "fw-confirm-email-dialog",
        title: gettext("Confirm remove"),
        body: (0,_templates__rspack_import_1.deleteEmailDialogTemplate)({
            text: `${gettext("Remove the email address")}: ${(0,_common__rspack_import_0.escapeText)(email)}?`
        }),
        buttons,
        icon: "exclamation-triangle"
    })
    dialog.open()
}

const deleteSocialaccountDialog = (target, app) => {
    const socialaccount = Number.parseInt(target.dataset.socialaccount)
    const provider = target.dataset.provider

    const buttons = [
        {
            text: gettext("Remove"),
            classes: "fw-dark",
            click: () => {
                ;(0,_common__rspack_import_0.activateWait)()

                ;(0,_common__rspack_import_0.jsonPost)("/api/user/socialaccountdelete/", {
                    socialaccount
                })
                    .then(() => {
                        dialog.close()
                        ;(0,_common__rspack_import_0.deactivateWait)()
                    })
                    .then(() => app.getConfiguration())
                    .then(() => app.selectPage())
                    .then(() =>
                        (0,_common__rspack_import_0.addAlert)(
                            "info",
                            `${(0,_common__rspack_import_0.escapeText)(provider)} ${gettext("account successfully deleted!")}`
                        )
                    )
                    .catch(() => {
                        (0,_common__rspack_import_0.deactivateWait)()
                        ;(0,_common__rspack_import_0.addAlert)(
                            "error",
                            gettext("The account could not be deleted!")
                        )
                    })
            }
        },
        {
            type: "cancel"
        }
    ]

    const dialog = new _common__rspack_import_0.Dialog({
        id: "fw-confirm-email-dialog",
        title: gettext("Confirm remove"),
        body: (0,_templates__rspack_import_1.deleteEmailDialogTemplate)({
            text: `${gettext("Remove the link to the account at")} ${(0,_common__rspack_import_0.escapeText)(provider)}?`
        }),
        buttons,
        icon: "exclamation-triangle"
    })
    dialog.open()
}

const changePrimaryEmailDialog = app => {
    const primEmailRadio = document.querySelector(
            ".primary-email-radio:checked"
        ),
        email = primEmailRadio.value
    const buttons = [
        {
            text: gettext("Submit"),
            classes: "fw-dark",
            click: () => {
                ;(0,_common__rspack_import_0.activateWait)()

                ;(0,_common__rspack_import_0.jsonPost)("/api/user/email/primary/", {
                    email
                })
                    .then(() => {
                        dialog.close()
                        ;(0,_common__rspack_import_0.deactivateWait)()
                        return app.getConfiguration()
                    })
                    .then(() => app.selectPage())
                    .then(() =>
                        (0,_common__rspack_import_0.addAlert)(
                            "info",
                            gettext("The primary email has been updated.")
                        )
                    )
                    .catch(_error => {
                        (0,_common__rspack_import_0.deactivateWait)()
                        ;(0,_common__rspack_import_0.addAlert)(
                            "error",
                            gettext(
                                "The email could not be set to be primary email."
                            )
                        )
                    })
            }
        },
        {
            type: "cancel"
        }
    ]

    const dialog = new _common__rspack_import_0.Dialog({
        id: "change-primary-email",
        title: gettext("Confirm set primary"),
        body: (0,_templates__rspack_import_1.changePrimaryEmailDialogTemplate)({
            text: `${gettext("Set this email as the address primary")}: ${email}?`
        }),
        buttons
    })
    dialog.open()
}


}),
"./js/modules/profile/index.js": (function (__unused_rspack_module, __webpack_exports__, __webpack_require__) {
"use strict";
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  Profile: function() { return Profile; }
});
/* import */ var _common__rspack_import_0 = __webpack_require__("./js/modules/common/index.js");
/* import */ var _feedback__rspack_import_1 = __webpack_require__("./js/modules/feedback/index.js");
/* import */ var _menu__rspack_import_2 = __webpack_require__("./js/modules/menu/index.js");
/* import */ var _two_factor__rspack_import_3 = __webpack_require__("./js/modules/two_factor/index.js");
/* import */ var _delete_user__rspack_import_4 = __webpack_require__("./js/modules/profile/delete_user.js");
/* import */ var _dialogs__rspack_import_5 = __webpack_require__("./js/modules/profile/dialogs.js");
/* import */ var _templates__rspack_import_6 = __webpack_require__("./js/modules/profile/templates.js");








class Profile {
    constructor({app, user, socialaccount_providers}) {
        this.app = app
        this.user = user
        this.socialaccount_providers = socialaccount_providers
    }

    init() {
        return (0,_common__rspack_import_0.whenReady)().then(() => {
            this.render()
            const smenu = new _menu__rspack_import_2.SiteMenu(this.app, "") // Nothing highlighted
            smenu.init()
            ;(0,_common__rspack_import_0.dropdownSelect)(this.dom.querySelector("#edit-avatar-pulldown"), {
                onChange: value => {
                    switch (value) {
                        case "change":
                            ;(0,_dialogs__rspack_import_5.changeAvatarDialog)(this.app)
                            break
                        case "delete":
                            ;(0,_dialogs__rspack_import_5.deleteAvatarDialog)(this.app)
                            break
                    }
                },
                button: this.dom.querySelector("#edit-avatar-btn")
            })
            this.dom.addEventListener("click", event => {
                const el = {}
                let dialog
                switch (true) {
                    case (0,_common__rspack_import_0.findTarget)(event, "#add-profile-email", el):
                        ;(0,_dialogs__rspack_import_5.addEmailDialog)(this.app)
                        break
                    case (0,_common__rspack_import_0.findTarget)(event, "#fw-edit-profile-pwd", el):
                        ;(0,_dialogs__rspack_import_5.changePwdDialog)({username: this.user.username})
                        break
                    case (0,_common__rspack_import_0.findTarget)(event, "#delete-account", el):
                        dialog = new _delete_user__rspack_import_4.DeleteUserDialog(
                            this.dom.querySelector("#delete-account").dataset
                                .username
                        )
                        dialog.init()
                        break
                    case (0,_common__rspack_import_0.findTarget)(event, "#submit-profile", el):
                        this.save()
                        break
                    case (0,_common__rspack_import_0.findTarget)(event, ".delete-email", el):
                        ;(0,_dialogs__rspack_import_5.deleteEmailDialog)(el.target, this.app)
                        break
                    case (0,_common__rspack_import_0.findTarget)(event, ".delete-socialaccount", el):
                        ;(0,_dialogs__rspack_import_5.deleteSocialaccountDialog)(el.target, this.app)
                        break
                    case this.app.settings.TWO_FACTOR_ENABLED &&
                        (0,_common__rspack_import_0.findTarget)(event, "#setup-two-factor", el):
                        dialog = (0,_two_factor__rspack_import_3.twoFactorSetupDialog)()
                        break
                    case this.app.settings.TWO_FACTOR_ENABLED &&
                        (0,_common__rspack_import_0.findTarget)(event, "#disable-two-factor", el):
                        dialog = (0,_two_factor__rspack_import_3.twoFactorDisableDialog)()
                        break
                    case this.app.settings.E2EE_MODE !== "disabled" &&
                        (0,_common__rspack_import_0.findTarget)(event, "#setup-e2ee-passphrase", el):
                        this.setupE2EEPassphrase()
                        break
                    case this.app.settings.E2EE_MODE !== "disabled" &&
                        (0,_common__rspack_import_0.findTarget)(event, "#change-e2ee-passphrase", el):
                        this.changeE2EEPassphrase()
                        break
                    case this.app.settings.E2EE_MODE !== "disabled" &&
                        (0,_common__rspack_import_0.findTarget)(event, "#recover-e2ee-passphrase", el):
                        this.recoverE2EEPassphrase()
                        break
                    default:
                        break
                }
            })
            this.dom
                .querySelectorAll(".primary-email-radio")
                .forEach(el =>
                    el.addEventListener("change", () =>
                        (0,_dialogs__rspack_import_5.changePrimaryEmailDialog)(this.app)
                    )
                )
            // Check and display two-factor authentication status
            if (this.app.settings.TWO_FACTOR_ENABLED) {
                this.updateTwoFactorStatus()
            }
            // Check and display E2EE passphrase status
            if (this.app.settings.E2EE_MODE !== "disabled") {
                this.updateE2EEPassphraseStatus()
            }
        })
    }

    render() {
        this.dom = document.createElement("body")
        this.dom.classList.add("scrollable")
        this.dom.innerHTML = (0,_common__rspack_import_0.baseBodyTemplate)({
            contents: (0,_templates__rspack_import_6.profileContents)(
                this.user,
                this.socialaccount_providers,
                this.app.settings
            ),
            user: this.user,
            app: this.app
        })
        document.body = this.dom

        ;(0,_common__rspack_import_0.ensureCSS)([
            staticUrl("css/show_profile.css"),
            staticUrl("css/two_factor.css")
        ])

        ;(0,_common__rspack_import_0.setDocTitle)(gettext("Configure profile"), this.app)
        const feedbackTab = new _feedback__rspack_import_1.FeedbackTab()
        feedbackTab.init()
    }

    updateTwoFactorStatus() {
        (0,_two_factor__rspack_import_3.checkTwoFactorStatus)().then(enabled => {
            const enabledStatus = this.dom.querySelector(
                "#two-factor-enabled-status"
            )
            const disabledStatus = this.dom.querySelector(
                "#two-factor-disabled-status"
            )
            const setupBtn = this.dom.querySelector("#setup-two-factor")
            const disableBtn = this.dom.querySelector("#disable-two-factor")

            if (enabled) {
                enabledStatus.style.display = "inline"
                disabledStatus.style.display = "none"
                setupBtn.style.display = "none"
                disableBtn.style.display = "inline"
            } else {
                enabledStatus.style.display = "none"
                disabledStatus.style.display = "inline"
                setupBtn.style.display = "inline"
                disableBtn.style.display = "none"
            }
        })
    }

    updateE2EEPassphraseStatus() {
        __webpack_require__.e(/* import() */ "js_modules_editor_e2ee_passphrase-manager_js").then(__webpack_require__.bind(__webpack_require__, "./js/modules/editor/e2ee/passphrase-manager.js")).then(
            ({PassphraseManager}) => {
                PassphraseManager.hasEncryptionKeys().then(hasKeys => {
                    const enabledStatus = this.dom.querySelector(
                        "#e2ee-passphrase-enabled-status"
                    )
                    const disabledStatus = this.dom.querySelector(
                        "#e2ee-passphrase-disabled-status"
                    )
                    const setupBtn = this.dom.querySelector(
                        "#setup-e2ee-passphrase"
                    )
                    const changeBtn = this.dom.querySelector(
                        "#change-e2ee-passphrase"
                    )
                    const recoverBtn = this.dom.querySelector(
                        "#recover-e2ee-passphrase"
                    )

                    if (hasKeys) {
                        enabledStatus.style.display = "inline"
                        disabledStatus.style.display = "none"
                        setupBtn.style.display = "none"
                        changeBtn.style.display = "inline"
                        recoverBtn.style.display = "inline"
                    } else {
                        enabledStatus.style.display = "none"
                        disabledStatus.style.display = "inline"
                        setupBtn.style.display = "inline"
                        changeBtn.style.display = "none"
                        recoverBtn.style.display = "none"
                    }
                })
            }
        )
    }

    async setupE2EEPassphrase() {
        const {PassphraseManager} = await __webpack_require__.e(/* import() */ "js_modules_editor_e2ee_passphrase-manager_js").then(__webpack_require__.bind(__webpack_require__, "./js/modules/editor/e2ee/passphrase-manager.js"))
        const {setupPassphraseDialog} = await __webpack_require__.e(/* import() */ "js_modules_editor_e2ee_passphrase-dialog_js").then(__webpack_require__.bind(__webpack_require__, "./js/modules/editor/e2ee/passphrase-dialog.js"))

        setupPassphraseDialog(async passphrase => {
            try {
                const {recoveryKey} =
                    await PassphraseManager.setupEncryption(passphrase)
                const {showRecoveryKeyDialog} = await __webpack_require__.e(/* import() */ "js_modules_editor_e2ee_passphrase-dialog_js").then(__webpack_require__.bind(__webpack_require__, "./js/modules/editor/e2ee/passphrase-dialog.js"))
                await showRecoveryKeyDialog(recoveryKey)
                this.updateE2EEPassphraseStatus()
            } catch (e) {
                (0,_common__rspack_import_0.addAlert)(
                    "error",
                    gettext("Failed to set up passphrase: ") + e.message
                )
            }
        })
    }

    async recoverE2EEPassphrase() {
        const {PassphraseManager} = await __webpack_require__.e(/* import() */ "js_modules_editor_e2ee_passphrase-manager_js").then(__webpack_require__.bind(__webpack_require__, "./js/modules/editor/e2ee/passphrase-manager.js"))
        const {recoverWithKeyDialog, showRecoveryKeyDialog} = await __webpack_require__.e(/* import() */ "js_modules_editor_e2ee_passphrase-dialog_js").then(__webpack_require__.bind(__webpack_require__, "./js/modules/editor/e2ee/passphrase-dialog.js"))

        const recoverResult = await new Promise(resolve => {
            recoverWithKeyDialog(resolve)
        })
        if (!recoverResult) {
            return
        }
        try {
            const {newRecoveryKey} =
                await PassphraseManager.recoverWithRecoveryKey(
                    recoverResult.recoveryKey,
                    recoverResult.newPassphrase
                )
            await new Promise(resolve => {
                showRecoveryKeyDialog(newRecoveryKey, resolve)
            })
            this.updateE2EEPassphraseStatus()
        } catch (e) {
            (0,_common__rspack_import_0.addAlert)("error", gettext("Recovery failed: ") + e.message)
        }
    }

    async changeE2EEPassphrase() {
        const {PassphraseManager} = await __webpack_require__.e(/* import() */ "js_modules_editor_e2ee_passphrase-manager_js").then(__webpack_require__.bind(__webpack_require__, "./js/modules/editor/e2ee/passphrase-manager.js"))
        const {changePassphraseDialog} = await __webpack_require__.e(/* import() */ "js_modules_editor_e2ee_passphrase-dialog_js").then(__webpack_require__.bind(__webpack_require__, "./js/modules/editor/e2ee/passphrase-dialog.js"))

        const changeResult = await new Promise(resolve => {
            changePassphraseDialog(resolve)
        })
        if (!changeResult) {
            return
        }
        try {
            await PassphraseManager.changePassphrase(
                changeResult.oldPassphrase,
                changeResult.newPassphrase
            )
            ;(0,_common__rspack_import_0.addAlert)("success", gettext("Passphrase changed successfully."))
        } catch (e) {
            (0,_common__rspack_import_0.addAlert)(
                "error",
                gettext("Failed to change passphrase: ") + e.message
            )
        }
    }

    save() {
        (0,_common__rspack_import_0.activateWait)()
        const newLang = this.dom.querySelector("#language").value
        return (0,_common__rspack_import_0.jsonPost)("/api/user/save/", {
            form_data: {
                user: {
                    username: this.dom.querySelector("#username").value,
                    first_name: this.dom.querySelector("#first_name").value,
                    last_name: this.dom.querySelector("#last_name").value,
                    language: newLang
                }
            }
        })
            .catch(() =>
                (0,_common__rspack_import_0.addAlert)("error", gettext("Could not save profile data"))
            )
            .then(() => {
                ;(0,_common__rspack_import_0.deactivateWait)()
                return this.app.getConfiguration()
            })
            .then(() => {
                const currentLang = document.documentElement.lang

                if (currentLang !== newLang) {
                    // Refresh the page to use the new language
                    window.location.reload()
                }
            })
    }
}


}),
"./js/modules/profile/templates.js": (function (__unused_rspack_module, __webpack_exports__, __webpack_require__) {
"use strict";
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  changeAvatarDialogTemplate: function() { return changeAvatarDialogTemplate; },
  changeEmailDialogTemplate: function() { return changeEmailDialogTemplate; },
  changePrimaryEmailDialogTemplate: function() { return changePrimaryEmailDialogTemplate; },
  changePwdDialogTemplate: function() { return changePwdDialogTemplate; },
  confirmDeleteAvatarTemplate: function() { return confirmDeleteAvatarTemplate; },
  deleteEmailDialogTemplate: function() { return deleteEmailDialogTemplate; },
  deleteUserDialogTemplate: function() { return deleteUserDialogTemplate; },
  profileContents: function() { return profileContents; }
});
/* import */ var _common__rspack_import_0 = __webpack_require__("./js/modules/common/index.js");


/** A template to confirm the deletion of a user avatar. */
const confirmDeleteAvatarTemplate = () =>
    `<p>${gettext("Delete the avatar?")}</p>`

/** A template to change the user avatar. */
const changeAvatarDialogTemplate = () =>
    `<span id="upload-avatar-btn" class="fw-button fw-light fw-large">
        ${gettext("Select a file")}
    </span>
    <label id="uploaded-avatar-name" class="ajax-upload-label"></label>`

/** A template for the confirmation dialog to delete a user account. */
const deleteUserDialogTemplate = () =>
    `<h3>
        ${gettext("NOTICE: ALL OF YOUR INFORMATION WILL DISAPPEAR FROM OUR SYSTEM!")}
    </h3>
    <p>
        ${gettext("Really delete your account? Type in your username and password below to confirm deletion.")}
    </p>
    <p>
        ${gettext("We cannot reverse an account deletion.")}
    </p>
    <p>
        ${gettext("Some copies of your files may temporarily be kept in our backup system, but also these will disappear automatically in due time.")}
    </p>
    <form>
        <input type="text" id="username-confirmation" placeholder="${gettext("Username")}">
        <input type="password" id="password" autocomplete="new-password" placeholder="${gettext("Password")}">
    </form>`

/** A template for the change email dialog of the user account. */
const changeEmailDialogTemplate = () =>
    `<table class="ui-dialog-content-table"><tbody>
        <tr><td>
            <form id="fw-add-email-form" action="" method="post" onsubmit="return false;">
                <input type="text" name="email" id="new-profile-email"
                        class="fw-profile-dialog-input"
                        placeholder="${gettext("Enter the new E-mail address")}" />
            </form>
        </td></tr>
        <tr><td><span id="fw-add-email-error" class="warning"></span></td></tr>
    </tbody></table>`

/** A template for the delete email dialog of the user account. */
const deleteEmailDialogTemplate = ({text}) =>
    `<p>${(0,_common__rspack_import_0.escapeText)(text)}</p>`

/** A template for the change primary email dialog of the user account. */
const changePrimaryEmailDialogTemplate = ({text}) =>
    `<p>${(0,_common__rspack_import_0.escapeText)(text)}</p>`

/** A template for the change password dialog of the user account. */
const changePwdDialogTemplate = ({username}) =>
    `<table class="ui-dialog-content-table"><tbody>
        <tr><td><form id="fw-password-change-form" action="" method="post"
                onsubmit="return false;">
            <input type="text" id="current-username" autocomplete="username" value="${(0,_common__rspack_import_0.escapeText)(username)}" style="display: none;">
            <input type="password" id="old-password-input" name="old_password" autocomplete="current-password"
                    class="fw-profile-dialog-input" placeholder="${gettext("Old password")}" /><br />
            <input type="password" id="new-password-input1" name="new_password1" autocomplete="new-password"
                    class="fw-profile-dialog-input" placeholder="${gettext("New password")}" /><br />
            <input type="password" id="new-password-input2" name="new_password2" autocomplete="new-password"
                    class="fw-profile-dialog-input"
                    placeholder="${gettext("Confirm the new password")}" />
        </form></td></tr>
        <tr><td><span id="fw-password-change-error" class="warning"></span></td></tr>
    </tbody></table>`

const profileContents = (user, socialaccount_providers, settings = {}) =>
    `<div id="profile-wrapper" class="clearfix ui-dialog ui-dialog-fullpage">
        <div id="profile-avatar">
            ${(0,_common__rspack_import_0.avatarTemplate)({user})}
            <div id="avatar-pulldown-wrapper">
                <span id="edit-avatar-btn" class="fw-link-text">
                    ${gettext("Edit profile picture")}
                </span>
                <select id="edit-avatar-pulldown">
                    <option value="change">${gettext("Change picture")}</option>
                    ${user.avatar ? `<option value="delete">${gettext("Delete picture")}</option>` : ""}
                </select>
            </div>
        </div>
        <div id="profile-data">
            <form>
                <div class="profile-data-row">
                    <label class="form-label">${gettext("Username")}</label>
                    <input type="text" name="username" id="username" autocomplete="username" value="${(0,_common__rspack_import_0.escapeText)(user.username)}" />
                </div>
                <div class="profile-data-row">
                    <label class="form-label">${gettext("First name")}</label>
                    <input type="text" name="firstname" id="first_name" autocomplete="given-name" value="${(0,_common__rspack_import_0.escapeText)(user.first_name)}" />
                </div>
                <div class="profile-data-row">
                    <label class="form-label">${gettext("Last name")}</label>
                    <input type="text" name="lastname" id="last_name" autocomplete="family-name" value="${(0,_common__rspack_import_0.escapeText)(user.last_name)}" />
                </div>
                <div class="profile-data-row">
                    <label class="form-label">${gettext("Password")}</label>
                    <input type="password" value="******" autocomplete="new-password" readonly disabled />
                    <span id="fw-edit-profile-pwd" class="fw-link-text"><i class="fa fa-pencil-alt"></i></span>
                </div>
            </form>
            ${
                settings.TWO_FACTOR_ENABLED
                    ? `<div class="profile-data-row">
                <label class="form-label">${gettext("Two-Factor Authentication")}</label>
                <div id="two-factor-status">
                    <span id="two-factor-enabled-status" style="display: none;">
                        <i class="fa fa-check"></i>
                        ${gettext("Enabled")}
                    </span>
                    <span id="two-factor-disabled-status" style="display: none;">
                        <i class="fa fa-times"></i>
                        ${gettext("Disabled")}
                    </span>
                </div>
                <span id="setup-two-factor" class="fw-link-text" style="display: none;">
                    <i class="fa fa-shield-alt"></i>
                    ${gettext("Enable 2FA")}
                </span>
                <span id="disable-two-factor" class="fw-link-text" style="display: none;">
                    <i class="fa fa-shield-alt"></i>
                    ${gettext("Disable 2FA")}
                </span>
            </div>`
                    : ""
            }
            ${
                settings.E2EE_MODE && settings.E2EE_MODE !== "disabled"
                    ? `<div class="profile-data-row">
                <label class="form-label">${gettext("End-to-End Encryption")}</label>
                <div id="e2ee-passphrase-status">
                    <span id="e2ee-passphrase-enabled-status" style="display: none;">
                        <i class="fa fa-check"></i>
                        ${gettext("Personal passphrase set up")}
                    </span>
                    <span id="e2ee-passphrase-disabled-status" style="display: none;">
                        <i class="fa fa-times"></i>
                        ${gettext("Not set up")}
                    </span>
                </div>
                <span id="setup-e2ee-passphrase" class="fw-link-text" style="display: none;">
                    <i class="fa fa-lock"></i>
                    ${gettext("Set up encryption passphrase")}
                </span>
                <span id="change-e2ee-passphrase" class="fw-link-text" style="display: none;">
                    <i class="fa fa-pencil-alt"></i>
                    ${gettext("Change passphrase")}
                </span>
                <span id="recover-e2ee-passphrase" class="fw-link-text" style="display: none;">
                    <i class="fa fa-key"></i>
                    ${gettext("Recover with recovery key")}
                </span>
            </div>`
                    : ""
            }
            <div class="profile-data-row">
                <table class="fw-data-table profile-email-table">
                    <thead class="fw-data-table-header">
                        <tr>
                            <th>${gettext("Email")}</th>
                            <th>${gettext("Primary address")}</th>
                            <th>${gettext("Verified")}</th>
                            <th>&nbsp;&nbsp;&nbsp;&nbsp;</th>
                        </tr>
                    </thead>
                    <tbody>
                        ${user.emails
                            .map(
                                email => `<tr${email.primary ? ' class="primary-email-tr"' : ""}>
                                    <td class="emailaddress">${email.address}</td>
                                    <td>
                                        ${
                                            email.verified
                                                ? `<input type="radio" class="primary-email-radio" value="${email.address}"
                                                    name="primaryemail"${email.primary ? " checked" : ""} />`
                                                : ""
                                        }
                                    </td>
                                    <td>
                                        ${email.verified ? '<i class="fa fa-check"></i>' : ""}
                                    </td>
                                    <td class="profile-email-action">
                                        ${
                                            email.primary
                                                ? "&nbsp;"
                                                : `<span class="delete-email fw-link-text" data-email="${email.address}">` +
                                                  '<i class="fa fa-trash-alt"></i>' +
                                                  "</span>"
                                        }
                                    </td>
                                </tr>`
                            )
                            .join("")}
                        <tr>
                            <td colspan="3"></td>
                            <td class="profile-email-action">
                                <span class="fw-link-text" id="add-profile-email">
                                    <i class="fa fa-plus-circle"></i>
                                </span>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
            <div class="profile-data-row">
                <label class="form-label">${gettext("Language")}</label>
                <select name="language" id="language" class="entry-form dk fw-button fw-large">
                <option value="">${gettext("Default language")}</option>
                ${settings.LANGUAGES.map(
                    ([code, _name]) =>
                        `<option value="${code}" ${user.language === code ? "selected" : ""}>${(0,_common__rspack_import_0.langName)(code)}</option>`
                ).join("")}
                </select>
                <div class="fw-select-arrow fa fa-caret-down"></div>
            </div>
            ${
                socialaccount_providers.length
                    ? `<div class="profile-data-row">
                        <table class="fw-data-table profile-social-accounts-table">
                            <thead class="fw-data-table-header">
                                <tr>
                                    <th>${gettext("Social Account Provider")}</th>
                                    <th>${gettext("Username")}</th>
                                    <th>&nbsp;&nbsp;&nbsp;&nbsp;</th>
                                </tr>
                            </thead>
                            <tbody>
                                ${socialaccount_providers
                                    .map(provider => {
                                        const account =
                                            user.socialaccounts.find(
                                                saccount =>
                                                    saccount.provider ===
                                                    provider.id
                                            )
                                        if (account) {
                                            return `<tr>
                                                    <td>${(0,_common__rspack_import_0.escapeText)(provider.name)}</td>
                                                    <td>${(0,_common__rspack_import_0.escapeText)(account.name)}</td>
                                                    <td>
                                                        <span class="delete-socialaccount fw-link-text" data-socialaccount="${account.id}" data-provider="${(0,_common__rspack_import_0.escapeText)(provider.name)}">
                                                        <i class="fa fa-trash-alt"></i>
                                                        </span>
                                                    </td>
                                                </tr>`
                                        } else {
                                            return `<tr>
                                                    <td>${(0,_common__rspack_import_0.escapeText)(provider.name)}</td>
                                                    <td>&nbsp;</td>
                                                    <td><a href="${provider.login_url}?process=connect">${gettext("Connect")}</a></td>
                                                </tr>`
                                        }
                                    })
                                    .join("")}
                            </tbody>
                        </table>
                    </div>`
                    : ""
            }
            <div id="profile-submit-wrapper">
                <span id="submit-profile" class="fw-button fw-dark">
                    ${gettext("Submit")}
                </span>
                <span id="delete-account" data-username="${user.username}" class="fw-button fw-orange">
                    ${gettext("Delete account")}
                </span>
            </div>
    </div>`


}),
"./js/modules/setup/index.js": (function (__unused_rspack_module, __webpack_exports__, __webpack_require__) {
"use strict";
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  SetupPage: function() { return SetupPage; }
});
/* import */ var _prelogin__rspack_import_0 = __webpack_require__("./js/modules/prelogin/index.js");


class SetupPage extends _prelogin__rspack_import_0.PreloginPage {
    constructor({app, language}) {
        super({app, language})
        this.title = gettext("Update")
        this.contents = `<div class="fw-login-left">
            <h1 class="fw-login-title">${gettext("Update")}</h1>
            <p>${interpolate(
                gettext(
                    "The %(appName)s server is currently being updated. Please wait."
                ),
                {appName: this.app.name},
                true
            )}</p>
        </div>`

        this.footerLinks = this.footerLinks.filter(link => link.external) // We only show external links as internal links will not work

        this.headerLinks = []
    }

    init() {
        setTimeout(() => this.app.init(), 5000)
        return super
            .init()
            .then(() =>
                document
                    .querySelectorAll("#lang-selection,.feedback-tab")
                    .forEach(el => (el.style.visibility = "hidden"))
            )
    }
}


}),
"./js/modules/signup/index.js": (function (__unused_rspack_module, __webpack_exports__, __webpack_require__) {
"use strict";
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  Signup: function() { return Signup; }
});
/* import */ var _common__rspack_import_0 = __webpack_require__("./js/modules/common/index.js");
/* import */ var _prelogin__rspack_import_1 = __webpack_require__("./js/modules/prelogin/index.js");



class Signup extends _prelogin__rspack_import_1.PreloginPage {
    constructor({app, language}) {
        super({app, language})
        this.title = gettext("Signup")
        if (this.app.settings?.REGISTRATION_OPEN) {
            this.contents = `<div class="fw-login-left">
                <h1 class="fw-login-title">${gettext("Sign up")}</h1>
                <p>
                    ${gettext(
                        'Already have an account? Then please <a href="/" title="Login">login</a>.'
                    )}
                </p>
            </div>
            <div class="fw-login-right">
                <form>
                    <ul id="non-field-errors" class="errorlist"></ul>
                    <div class="input-wrapper">
                        <label for="id-username">${gettext("Choose your username")}</label>
                        <input type="text" name="username" placeholder="${gettext("Username")}" autofocus="autofocus" minlength="1" maxlength="150" required="" id="id-username" autocomplete="username">
                        <ul id="id-username-errors" class="errorlist"></ul>
                    </div>
                    <div class="input-wrapper">
                        <label for="id-password1">${gettext("Create a password")}</label>
                        <input type="password" name="password1" placeholder="${gettext("Password")}" required="" id="id-password1" autocomplete="new-password">
                        <ul id="id-password1-errors" class="errorlist"></ul>
                    </div>
                    <div class="input-wrapper">
                        <label for="id-password2">${gettext("Confirm your password")}</label>
                        <input type="password" name="password2" placeholder="${gettext("Password (again)")}" required="" id="id-password2" autocomplete="new-password">
                        <ul id="id-password2-errors" class="errorlist"></ul>
                    </div>
                    <div class="input-wrapper">
                        <label for="id-email">${gettext("E-mail address")}</label>
                        <input type="email" name="email" placeholder="${gettext("E-mail address")}" required="" id="id-email" autocomplete="email">
                        <ul id="id-email-errors" class="errorlist"></ul>
                    </div>
                    <div class="submit-wrapper">
                        <button class="fw-button fw-dark fw-uppercase" id="signup-submit" type="submit">${gettext("Sign up")}</button>
                    </div>
                </form>
            </div>`
        } else {
            this.contents = `<div class="fw-login-left">
                <h1 class="fw-login-title">${gettext("Sign Up Closed")}</h1>
                <p>${gettext("We are sorry, but the sign up is currently closed.")}</p>
            </div>`
        }

        // Note: We do not currently support plugins targetting only the signup page
    }

    bind() {
        super.bind()

        const signupSubmit = document.querySelector("#signup-submit")

        if (!this.app.settings?.REGISTRATION_OPEN || !signupSubmit) {
            return
        }

        signupSubmit.addEventListener("click", event => {
            event.preventDefault()

            const nonFieldErrors = document.querySelector("#non-field-errors"),
                idUsername = document.querySelector("#id-username"),
                idUsernameErrors = document.querySelector(
                    "#id-username-errors"
                ),
                idPassword1 = document.querySelector("#id-password1"),
                idPassword1Errors = document.querySelector(
                    "#id-password1-errors"
                ),
                idPassword2 = document.querySelector("#id-password2"),
                idPassword2Errors = document.querySelector(
                    "#id-password2-errors"
                ),
                idEmail = document.querySelector("#id-email"),
                idEmailErrors = document.querySelector("#id-email-errors"),
                fwContents = document.querySelector(".fw-contents")

            if (
                !nonFieldErrors ||
                !idUsername ||
                !idUsernameErrors ||
                !idPassword1 ||
                !idPassword1Errors ||
                !idPassword2 ||
                !idPassword2Errors ||
                !idEmail ||
                !idEmailErrors ||
                !fwContents
            ) {
                return
            }

            nonFieldErrors.innerHTML = ""
            idUsernameErrors.innerHTML = ""
            idPassword1Errors.innerHTML = ""
            idPassword2Errors.innerHTML = ""
            idEmailErrors.innerHTML = ""

            const username = idUsername.value,
                password1 = idPassword1.value,
                password2 = idPassword2.value,
                email = idEmail.value
            let errors = false
            if (!username.length) {
                idUsernameErrors.innerHTML = `<li>${gettext("This field is required.")}</li>`
                errors = true
            }
            if (!password1.length) {
                idPassword1Errors.innerHTML = `<li>${gettext("This field is required.")}</li>`
                errors = true
            }
            if (!password2.length) {
                idPassword2Errors.innerHTML = `<li>${gettext("This field is required.")}</li>`
                errors = true
            }
            if (password1 !== password2) {
                idPassword2Errors.innerHTML = `<li>${gettext("You must type the same password each time.")}</li>`
                errors = true
            }
            if (!idEmail.checkValidity()) {
                idEmailErrors.innerHTML = `<li>${gettext("This is not a valid email.")}</li>`
                errors = true
            } else if (!email.length) {
                idEmailErrors.innerHTML = `<li>${gettext("This field is required.")}</li>`
                errors = true
            }
            if (errors) {
                return
            }
            const sendData = {username, password1, password2, email}
            if (this.app.inviteKey) {
                sendData["invite_key"] = this.app.inviteKey
            }
            (0,_common__rspack_import_0.jsonPostJson)("/api/user/signup/", sendData)
                .then(({json}) => {
                    if (json.location === "/api/account/confirm-email/") {
                        fwContents.innerHTML = `<div class="fw-login-left">
                            <h1 class="fw-login-title">${gettext("Verify Your E-mail Address")}</h1>
                            <p>
                                ${interpolate(
                                    gettext(
                                        'We have sent an e-mail to <a href="mailto:%(email)s">%(email)s</a> for verification. Follow the link provided to finalize the signup process.'
                                    ),
                                    {email},
                                    true
                                )}
                                <br />
                                ${gettext(
                                    "Please contact us if you do not receive it within a few minutes."
                                )}
                            </p>
                        </div>`
                    } else {
                        window.history.pushState({}, "", "/")
                        this.app.init()
                    }
                })
                .catch(response =>
                    response.json().then(json => {
                        json.form.errors.forEach(
                            error =>
                                (nonFieldErrors.innerHTML += `<li>${(0,_common__rspack_import_0.escapeText)(error)}</li>`)
                        )
                        json.form.fields.username.errors.forEach(
                            error =>
                                (idUsernameErrors.innerHTML += `<li>${(0,_common__rspack_import_0.escapeText)(error)}</li>`)
                        )
                        json.form.fields.password1.errors.forEach(
                            error =>
                                (idPassword1Errors.innerHTML += `<li>${(0,_common__rspack_import_0.escapeText)(error)}</li>`)
                        )
                        json.form.fields.password2.errors.forEach(
                            error =>
                                (idPassword2Errors.innerHTML += `<li>${(0,_common__rspack_import_0.escapeText)(error)}</li>`)
                        )
                        json.form.fields.email.errors.forEach(
                            error =>
                                (idEmailErrors.innerHTML += `<li>${(0,_common__rspack_import_0.escapeText)(error)}</li>`)
                        )
                    })
                )
        })
    }
}


}),
"./js/modules/two_factor/index.js": (function (__unused_rspack_module, __webpack_exports__, __webpack_require__) {
"use strict";
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  checkTwoFactorStatus: function() { return checkTwoFactorStatus; },
  twoFactorDisableDialog: function() { return twoFactorDisableDialog; },
  twoFactorLoginDialog: function() { return twoFactorLoginDialog; },
  twoFactorSetupDialog: function() { return twoFactorSetupDialog; }
});
/* import */ var qrcode__rspack_import_0 = __webpack_require__("./node_modules/.pnpm/qrcode@1.5.4/node_modules/qrcode/lib/browser.js");
/* import */ var _common__rspack_import_1 = __webpack_require__("./js/modules/common/index.js");



const twoFactorSetupDialog = () => {
    let secretKey = null
    let deviceId = null

    // Load setup data
    ;(0,_common__rspack_import_1.activateWait)()
    return (0,_common__rspack_import_1.jsonPostJson)("/api/user/two-factor/setup/").then(({json}) => {
        ;(0,_common__rspack_import_1.deactivateWait)()

        if (json.status !== "success") {
            (0,_common__rspack_import_1.addAlert)("error", json.message)
            return Promise.reject(json.message)
        }

        secretKey = json.secret_key
        deviceId = json.device_id
        const provisioningUri = json.provisioning_uri

        const qrContainer = document.createElement("div")
        qrContainer.className = "two-factor-qr-container"

        qrcode__rspack_import_0.toCanvas(
            provisioningUri,
            {
                width: 200,
                margin: 2,
                color: {
                    dark: "#000000",
                    light: "#ffffff"
                }
            },
            function (error, canvas) {
                if (error) {
                    console.error("QR Code generation error:", error)
                    qrContainer.innerHTML = `<p style="color: red;">${gettext("Could not generate QR code. Please use the secret key below.")}</p>`
                } else {
                    qrContainer.appendChild(canvas)
                }
            }
        )

        const buttons = [
            {
                text: gettext("Verify"),
                classes: "fw-dark",
                click: () => {
                    const codeInput = document.querySelector("#two-factor-code")
                    const code = codeInput.value.trim()

                    if (code.length !== 6) {
                        (0,_common__rspack_import_1.addAlert)(
                            "error",
                            gettext("Please enter a 6-digit code.")
                        )
                        return
                    }

                    (0,_common__rspack_import_1.jsonPostJson)("/api/user/two-factor/verify/", {
                        code,
                        device_id: deviceId
                    })
                        .then(({json}) => {
                            if (json.status === "success") {
                                (0,_common__rspack_import_1.addAlert)("success", json.message)
                                dialog.close()
                                window.location.reload()
                            } else {
                                (0,_common__rspack_import_1.addAlert)("error", json.message)
                            }
                        })
                        .catch(() => {
                            (0,_common__rspack_import_1.addAlert)(
                                "error",
                                gettext("Could not verify the code.")
                            )
                        })
                }
            },
            {
                type: "cancel"
            }
        ]

        const dialog = new _common__rspack_import_1.Dialog({
            id: "two-factor-setup-dialog",
            title: gettext("Set Up Two-Factor Authentication"),
            body: `
                    <p>${gettext("Scan this QR code with your authenticator app (Google Authenticator, Authy, etc.)")}</p>
                    <div class="two-factor-qr-wrapper"></div>
                    <p><strong>${gettext("Or enter this code manually:")}</strong></p>
                    <code class="two-factor-secret">${secretKey}</code>
                    <div class="two-factor-verify-section">
                        <p>${gettext("Enter the 6-digit code from your authenticator app to verify:")}</p>
                        <input type="text" id="two-factor-code" placeholder="123456" maxlength="6" class="fw-button fw-large" autocomplete="one-time-code" />
                    </div>
                `,
            buttons,
            icon: "shield-alt",
            width: 500
        })

        dialog.open()

        const qrWrapper = dialog.dialogEl.querySelector(
            ".two-factor-qr-wrapper"
        )
        if (qrWrapper && qrContainer) {
            qrWrapper.appendChild(qrContainer)
        }

        const codeInput = dialog.dialogEl.querySelector("#two-factor-code")
        if (codeInput) {
            codeInput.addEventListener("keypress", event => {
                if (event.key === "Enter") {
                    event.preventDefault()
                    buttons[0].click()
                }
            })
        }
    })
}

const twoFactorDisableDialog = () => {
    const buttons = [
        {
            text: gettext("Disable 2FA"),
            classes: "fw-orange",
            click: () => {
                ;(0,_common__rspack_import_1.activateWait)()
                ;(0,_common__rspack_import_1.jsonPostJson)("/api/user/two-factor/disable/", {})
                    .then(({json}) => {
                        if (json.status === "success") {
                            (0,_common__rspack_import_1.addAlert)("success", json.message)
                            dialog.close()
                            window.location.reload()
                        } else {
                            (0,_common__rspack_import_1.addAlert)("error", json.message)
                        }
                    })
                    .catch(() => {
                        (0,_common__rspack_import_1.addAlert)(
                            "error",
                            gettext(
                                "Could not disable two-factor authentication."
                            )
                        )
                    })
                    .then(() => {
                        (0,_common__rspack_import_1.deactivateWait)()
                    })
            }
        },
        {
            type: "cancel"
        }
    ]

    const dialog = new _common__rspack_import_1.Dialog({
        id: "two-factor-disable-dialog",
        title: gettext("Disable Two-Factor Authentication"),
        body: `<p>${gettext("Are you sure you want to disable two-factor authentication? This will reduce the security of your account.")}</p>`,
        buttons,
        icon: "exclamation-triangle"
    })

    dialog.open()
    return dialog
}

const twoFactorLoginDialog = ({
    login,
    password,
    remember,
    loginPage
}) => {
    const buttons = [
        {
            text: gettext("Verify"),
            classes: "fw-dark",
            click: () => {
                const twofactorInput =
                    dialog.dialogEl.querySelector("#two-factor-code")
                const twofactor = twofactorInput
                    ? twofactorInput.value.trim()
                    : ""

                if (twofactor.length !== 6) {
                    (0,_common__rspack_import_1.addAlert)("error", gettext("Please enter a 6-digit code."))
                    return
                }

                (0,_common__rspack_import_1.activateWait)()
                ;(0,_common__rspack_import_1.jsonPostJson)("/api/user/login/", {
                    login,
                    password,
                    remember,
                    twofactor
                })
                    .then(({json}) => {
                        ;(0,_common__rspack_import_1.deactivateWait)()
                        dialog.close()
                        loginPage.afterLogin(json)
                    })
                    .catch(() => {
                        (0,_common__rspack_import_1.addAlert)("error", gettext("Could not verify the code."))
                        ;(0,_common__rspack_import_1.deactivateWait)()
                    })
            }
        }
    ]

    const dialog = new _common__rspack_import_1.Dialog({
        id: "two-factor-login-dialog",
        title: gettext("Two-Factor Authentication"),
        body: `<p>${gettext("Enter the 6-digit code from your authenticator app:")}</p>
            <input type="text" id="two-factor-code" placeholder="123456" maxlength="6" class="fw-button fw-large" autocomplete="one-time-code" autofocus />`,
        buttons,
        icon: "shield-alt",
        width: 500
    })

    dialog.open()
    const codeInput = dialog.dialogEl.querySelector("#two-factor-code")
    if (codeInput) {
        codeInput.addEventListener("keypress", event => {
            if (event.key === "Enter") {
                event.preventDefault()
                buttons[0].click()
            }
        })
    }
    return dialog
}

const checkTwoFactorStatus = () => {
    return (0,_common__rspack_import_1.jsonPostJson)("/api/user/two-factor/status/")
        .then(({json}) => {
            if (json.status === "success") {
                return json.enabled
            }
            return false
        })
        .catch(() => false)
}


}),
"./js/plugins/app/index.js": (function (__unused_rspack_module, __webpack_exports__, __webpack_require__) {
"use strict";
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  DocTemplatesAppItem: function() { return /* reexport safe */ _user_template_manager__rspack_import_0.DocTemplatesAppItem; }
});
/* import */ var _user_template_manager__rspack_import_0 = __webpack_require__("./js/plugins/app/user_template_manager.js");



}),
"./js/plugins/app/user_template_manager.js": (function (__unused_rspack_module, __webpack_exports__, __webpack_require__) {
"use strict";
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  DocTemplatesAppItem: function() { return DocTemplatesAppItem; }
});
// Adds the templates overview page to the app routing table
class DocTemplatesAppItem {
    constructor(app) {
        this.app = app
    }

    init() {
        this.app.routes["templates"] = {
            requireLogin: true,
            open: pathnameParts => {
                if (pathnameParts.length < 4) {
                    return Promise.all(/* import() */ [__webpack_require__.e("vendors-node_modules_pnpm_biblatex-csl-converter_3_6_0_node_modules_biblatex-csl-converter_li-d3812c"), __webpack_require__.e("vendors-node_modules_pnpm_prosemirror-commands_1_7_0_node_modules_prosemirror-commands_dist_i-9c513b"), __webpack_require__.e("vendors-node_modules_pnpm_cropperjs_1_6_2_node_modules_cropperjs_dist_cropper_js"), __webpack_require__.e("vendors-node_modules_pnpm_jszip_3_10_1_node_modules_jszip_dist_jszip_min_js"), __webpack_require__.e("vendors-node_modules_pnpm_downloadjs_1_4_7_node_modules_downloadjs_download_js-node_modules_p-484d68"), __webpack_require__.e("vendors-node_modules_pnpm_fastdom_1_0_11_node_modules_fastdom_fastdom_js-node_modules_pnpm_pr-cb5a3c"), __webpack_require__.e("js_modules_editor_e2ee_passphrase-dialog_js"), __webpack_require__.e("js_modules_editor_e2ee_passphrase-manager_js"), __webpack_require__.e("js_modules_editor_e2ee_encryptor_js-js_modules_images_edit_dialog_model_js"), __webpack_require__.e("editor"), __webpack_require__.e("js_modules_user_template_manager_overview_js")]).then(__webpack_require__.bind(__webpack_require__, "./js/modules/user_template_manager/overview.js")).then(
                        ({DocTemplatesOverview}) =>
                            new DocTemplatesOverview(this.app.config)
                    )
                } else {
                    const id = pathnameParts[2]
                    return Promise.all(/* import() */ [__webpack_require__.e("vendors-node_modules_pnpm_biblatex-csl-converter_3_6_0_node_modules_biblatex-csl-converter_li-d3812c"), __webpack_require__.e("vendors-node_modules_pnpm_prosemirror-commands_1_7_0_node_modules_prosemirror-commands_dist_i-9c513b"), __webpack_require__.e("vendors-node_modules_pnpm_cropperjs_1_6_2_node_modules_cropperjs_dist_cropper_js"), __webpack_require__.e("vendors-node_modules_pnpm_jszip_3_10_1_node_modules_jszip_dist_jszip_min_js"), __webpack_require__.e("vendors-node_modules_pnpm_downloadjs_1_4_7_node_modules_downloadjs_download_js-node_modules_p-484d68"), __webpack_require__.e("vendors-node_modules_pnpm_fastdom_1_0_11_node_modules_fastdom_fastdom_js-node_modules_pnpm_pr-cb5a3c"), __webpack_require__.e("js_modules_editor_e2ee_passphrase-dialog_js"), __webpack_require__.e("js_modules_editor_e2ee_passphrase-manager_js"), __webpack_require__.e("js_modules_editor_e2ee_encryptor_js-js_modules_images_edit_dialog_model_js"), __webpack_require__.e("editor"), __webpack_require__.e("js_modules_user_template_manager_editor_js")]).then(__webpack_require__.bind(__webpack_require__, "./js/modules/user_template_manager/editor.js")).then(
                        ({DocTemplatesEditor}) =>
                            new DocTemplatesEditor(this.app.config, id)
                    )
                }
            },
            dbTables: {
                list: {
                    keyPath: "id"
                }
            }
        }
    }
}


}),
"./js/plugins/confirm_account/index.js": (function () {


}),
"./js/plugins/images_overview/index.js": (function () {


}),
"./js/plugins/login/index.js": (function () {


}),
"./js/plugins/menu/index.js": (function (__unused_rspack_module, __webpack_exports__, __webpack_require__) {
"use strict";
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  DocTemplatesMenuItem: function() { return /* reexport safe */ _user_template_manager__rspack_import_0.DocTemplatesMenuItem; }
});
/* import */ var _user_template_manager__rspack_import_0 = __webpack_require__("./js/plugins/menu/user_template_manager.js");



}),
"./js/plugins/menu/user_template_manager.js": (function (__unused_rspack_module, __webpack_exports__, __webpack_require__) {
"use strict";
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  DocTemplatesMenuItem: function() { return DocTemplatesMenuItem; }
});
// Adds a link to the book creator to the main menu on the overview pages.

class DocTemplatesMenuItem {
    constructor(menu) {
        this.menu = menu
    }

    init() {
        this.menu.navItems.push({
            id: "templates",
            title: gettext("Document Templates"),
            url: "/templates/",
            text: gettext("Templates"),
            order: 4,
            keys: "Alt-t"
        })
    }
}


}),
"./js/plugins/prelogin/index.js": (function () {


}),
"./node_modules/.pnpm/diff-dom@5.2.1/node_modules/diff-dom/dist/module.js": (function (__unused_rspack_module, __webpack_exports__, __webpack_require__) {
"use strict";
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
"./node_modules/.pnpm/dijkstrajs@1.0.3/node_modules/dijkstrajs/dijkstra.js": (function (module) {
"use strict";


/******************************************************************************
 * Created 2008-08-19.
 *
 * Dijkstra path-finding functions. Adapted from the Dijkstar Python project.
 *
 * Copyright (C) 2008
 *   Wyatt Baldwin <self@wyattbaldwin.com>
 *   All rights reserved
 *
 * Licensed under the MIT license.
 *
 *   http://www.opensource.org/licenses/mit-license.php
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 * THE SOFTWARE.
 *****************************************************************************/
var dijkstra = {
  single_source_shortest_paths: function(graph, s, d) {
    // Predecessor map for each node that has been encountered.
    // node ID => predecessor node ID
    var predecessors = {};

    // Costs of shortest paths from s to all nodes encountered.
    // node ID => cost
    var costs = {};
    costs[s] = 0;

    // Costs of shortest paths from s to all nodes encountered; differs from
    // `costs` in that it provides easy access to the node that currently has
    // the known shortest path from s.
    // XXX: Do we actually need both `costs` and `open`?
    var open = dijkstra.PriorityQueue.make();
    open.push(s, 0);

    var closest,
        u, v,
        cost_of_s_to_u,
        adjacent_nodes,
        cost_of_e,
        cost_of_s_to_u_plus_cost_of_e,
        cost_of_s_to_v,
        first_visit;
    while (!open.empty()) {
      // In the nodes remaining in graph that have a known cost from s,
      // find the node, u, that currently has the shortest path from s.
      closest = open.pop();
      u = closest.value;
      cost_of_s_to_u = closest.cost;

      // Get nodes adjacent to u...
      adjacent_nodes = graph[u] || {};

      // ...and explore the edges that connect u to those nodes, updating
      // the cost of the shortest paths to any or all of those nodes as
      // necessary. v is the node across the current edge from u.
      for (v in adjacent_nodes) {
        if (adjacent_nodes.hasOwnProperty(v)) {
          // Get the cost of the edge running from u to v.
          cost_of_e = adjacent_nodes[v];

          // Cost of s to u plus the cost of u to v across e--this is *a*
          // cost from s to v that may or may not be less than the current
          // known cost to v.
          cost_of_s_to_u_plus_cost_of_e = cost_of_s_to_u + cost_of_e;

          // If we haven't visited v yet OR if the current known cost from s to
          // v is greater than the new cost we just found (cost of s to u plus
          // cost of u to v across e), update v's cost in the cost list and
          // update v's predecessor in the predecessor list (it's now u).
          cost_of_s_to_v = costs[v];
          first_visit = (typeof costs[v] === 'undefined');
          if (first_visit || cost_of_s_to_v > cost_of_s_to_u_plus_cost_of_e) {
            costs[v] = cost_of_s_to_u_plus_cost_of_e;
            open.push(v, cost_of_s_to_u_plus_cost_of_e);
            predecessors[v] = u;
          }
        }
      }
    }

    if (typeof d !== 'undefined' && typeof costs[d] === 'undefined') {
      var msg = ['Could not find a path from ', s, ' to ', d, '.'].join('');
      throw new Error(msg);
    }

    return predecessors;
  },

  extract_shortest_path_from_predecessor_list: function(predecessors, d) {
    var nodes = [];
    var u = d;
    var predecessor;
    while (u) {
      nodes.push(u);
      predecessor = predecessors[u];
      u = predecessors[u];
    }
    nodes.reverse();
    return nodes;
  },

  find_path: function(graph, s, d) {
    var predecessors = dijkstra.single_source_shortest_paths(graph, s, d);
    return dijkstra.extract_shortest_path_from_predecessor_list(
      predecessors, d);
  },

  /**
   * A very naive priority queue implementation.
   */
  PriorityQueue: {
    make: function (opts) {
      var T = dijkstra.PriorityQueue,
          t = {},
          key;
      opts = opts || {};
      for (key in T) {
        if (T.hasOwnProperty(key)) {
          t[key] = T[key];
        }
      }
      t.queue = [];
      t.sorter = opts.sorter || T.default_sorter;
      return t;
    },

    default_sorter: function (a, b) {
      return a.cost - b.cost;
    },

    /**
     * Add a new item to the queue and ensure the highest priority element
     * is at the front of the queue.
     */
    push: function (value, cost) {
      var item = {value: value, cost: cost};
      this.queue.push(item);
      this.queue.sort(this.sorter);
    },

    /**
     * Return the highest priority element in the queue.
     */
    pop: function () {
      return this.queue.shift();
    },

    empty: function () {
      return this.queue.length === 0;
    }
  }
};


// node.js module exports
if (true) {
  module.exports = dijkstra;
}


}),
"./node_modules/.pnpm/fast-deep-equal@3.1.3/node_modules/fast-deep-equal/index.js": (function (module) {
"use strict";


// do not edit .js files directly - edit src/index.jst



module.exports = function equal(a, b) {
  if (a === b) return true;

  if (a && b && typeof a == 'object' && typeof b == 'object') {
    if (a.constructor !== b.constructor) return false;

    var length, i, keys;
    if (Array.isArray(a)) {
      length = a.length;
      if (length != b.length) return false;
      for (i = length; i-- !== 0;)
        if (!equal(a[i], b[i])) return false;
      return true;
    }



    if (a.constructor === RegExp) return a.source === b.source && a.flags === b.flags;
    if (a.valueOf !== Object.prototype.valueOf) return a.valueOf() === b.valueOf();
    if (a.toString !== Object.prototype.toString) return a.toString() === b.toString();

    keys = Object.keys(a);
    length = keys.length;
    if (length !== Object.keys(b).length) return false;

    for (i = length; i-- !== 0;)
      if (!Object.prototype.hasOwnProperty.call(b, keys[i])) return false;

    for (i = length; i-- !== 0;) {
      var key = keys[i];

      if (!equal(a[key], b[key])) return false;
    }

    return true;
  }

  // true if both NaN, false otherwise
  return a!==a && b!==b;
};


}),
"./node_modules/.pnpm/qrcode@1.5.4/node_modules/qrcode/lib/browser.js": (function (__unused_rspack_module, exports, __webpack_require__) {

const canPromise = __webpack_require__("./node_modules/.pnpm/qrcode@1.5.4/node_modules/qrcode/lib/can-promise.js")

const QRCode = __webpack_require__("./node_modules/.pnpm/qrcode@1.5.4/node_modules/qrcode/lib/core/qrcode.js")
const CanvasRenderer = __webpack_require__("./node_modules/.pnpm/qrcode@1.5.4/node_modules/qrcode/lib/renderer/canvas.js")
const SvgRenderer = __webpack_require__("./node_modules/.pnpm/qrcode@1.5.4/node_modules/qrcode/lib/renderer/svg-tag.js")

function renderCanvas (renderFunc, canvas, text, opts, cb) {
  const args = [].slice.call(arguments, 1)
  const argsNum = args.length
  const isLastArgCb = typeof args[argsNum - 1] === 'function'

  if (!isLastArgCb && !canPromise()) {
    throw new Error('Callback required as last argument')
  }

  if (isLastArgCb) {
    if (argsNum < 2) {
      throw new Error('Too few arguments provided')
    }

    if (argsNum === 2) {
      cb = text
      text = canvas
      canvas = opts = undefined
    } else if (argsNum === 3) {
      if (canvas.getContext && typeof cb === 'undefined') {
        cb = opts
        opts = undefined
      } else {
        cb = opts
        opts = text
        text = canvas
        canvas = undefined
      }
    }
  } else {
    if (argsNum < 1) {
      throw new Error('Too few arguments provided')
    }

    if (argsNum === 1) {
      text = canvas
      canvas = opts = undefined
    } else if (argsNum === 2 && !canvas.getContext) {
      opts = text
      text = canvas
      canvas = undefined
    }

    return new Promise(function (resolve, reject) {
      try {
        const data = QRCode.create(text, opts)
        resolve(renderFunc(data, canvas, opts))
      } catch (e) {
        reject(e)
      }
    })
  }

  try {
    const data = QRCode.create(text, opts)
    cb(null, renderFunc(data, canvas, opts))
  } catch (e) {
    cb(e)
  }
}

exports.create = QRCode.create
exports.toCanvas = renderCanvas.bind(null, CanvasRenderer.render)
exports.toDataURL = renderCanvas.bind(null, CanvasRenderer.renderToDataURL)

// only svg for now.
exports.toString = renderCanvas.bind(null, function (data, _, opts) {
  return SvgRenderer.render(data, opts)
})


}),
"./node_modules/.pnpm/qrcode@1.5.4/node_modules/qrcode/lib/can-promise.js": (function (module) {
// can-promise has a crash in some versions of react native that dont have
// standard global objects
// https://github.com/soldair/node-qrcode/issues/157

module.exports = function () {
  return typeof Promise === 'function' && Promise.prototype && Promise.prototype.then
}


}),
"./node_modules/.pnpm/qrcode@1.5.4/node_modules/qrcode/lib/core/alignment-pattern.js": (function (__unused_rspack_module, exports, __webpack_require__) {
/**
 * Alignment pattern are fixed reference pattern in defined positions
 * in a matrix symbology, which enables the decode software to re-synchronise
 * the coordinate mapping of the image modules in the event of moderate amounts
 * of distortion of the image.
 *
 * Alignment patterns are present only in QR Code symbols of version 2 or larger
 * and their number depends on the symbol version.
 */

const getSymbolSize = (__webpack_require__("./node_modules/.pnpm/qrcode@1.5.4/node_modules/qrcode/lib/core/utils.js")/* .getSymbolSize */.getSymbolSize)

/**
 * Calculate the row/column coordinates of the center module of each alignment pattern
 * for the specified QR Code version.
 *
 * The alignment patterns are positioned symmetrically on either side of the diagonal
 * running from the top left corner of the symbol to the bottom right corner.
 *
 * Since positions are simmetrical only half of the coordinates are returned.
 * Each item of the array will represent in turn the x and y coordinate.
 * @see {@link getPositions}
 *
 * @param  {Number} version QR Code version
 * @return {Array}          Array of coordinate
 */
exports.getRowColCoords = function getRowColCoords (version) {
  if (version === 1) return []

  const posCount = Math.floor(version / 7) + 2
  const size = getSymbolSize(version)
  const intervals = size === 145 ? 26 : Math.ceil((size - 13) / (2 * posCount - 2)) * 2
  const positions = [size - 7] // Last coord is always (size - 7)

  for (let i = 1; i < posCount - 1; i++) {
    positions[i] = positions[i - 1] - intervals
  }

  positions.push(6) // First coord is always 6

  return positions.reverse()
}

/**
 * Returns an array containing the positions of each alignment pattern.
 * Each array's element represent the center point of the pattern as (x, y) coordinates
 *
 * Coordinates are calculated expanding the row/column coordinates returned by {@link getRowColCoords}
 * and filtering out the items that overlaps with finder pattern
 *
 * @example
 * For a Version 7 symbol {@link getRowColCoords} returns values 6, 22 and 38.
 * The alignment patterns, therefore, are to be centered on (row, column)
 * positions (6,22), (22,6), (22,22), (22,38), (38,22), (38,38).
 * Note that the coordinates (6,6), (6,38), (38,6) are occupied by finder patterns
 * and are not therefore used for alignment patterns.
 *
 * let pos = getPositions(7)
 * // [[6,22], [22,6], [22,22], [22,38], [38,22], [38,38]]
 *
 * @param  {Number} version QR Code version
 * @return {Array}          Array of coordinates
 */
exports.getPositions = function getPositions (version) {
  const coords = []
  const pos = exports.getRowColCoords(version)
  const posLength = pos.length

  for (let i = 0; i < posLength; i++) {
    for (let j = 0; j < posLength; j++) {
      // Skip if position is occupied by finder patterns
      if ((i === 0 && j === 0) || // top-left
          (i === 0 && j === posLength - 1) || // bottom-left
          (i === posLength - 1 && j === 0)) { // top-right
        continue
      }

      coords.push([pos[i], pos[j]])
    }
  }

  return coords
}


}),
"./node_modules/.pnpm/qrcode@1.5.4/node_modules/qrcode/lib/core/alphanumeric-data.js": (function (module, __unused_rspack_exports, __webpack_require__) {
const Mode = __webpack_require__("./node_modules/.pnpm/qrcode@1.5.4/node_modules/qrcode/lib/core/mode.js")

/**
 * Array of characters available in alphanumeric mode
 *
 * As per QR Code specification, to each character
 * is assigned a value from 0 to 44 which in this case coincides
 * with the array index
 *
 * @type {Array}
 */
const ALPHA_NUM_CHARS = [
  '0', '1', '2', '3', '4', '5', '6', '7', '8', '9',
  'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M',
  'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z',
  ' ', '$', '%', '*', '+', '-', '.', '/', ':'
]

function AlphanumericData (data) {
  this.mode = Mode.ALPHANUMERIC
  this.data = data
}

AlphanumericData.getBitsLength = function getBitsLength (length) {
  return 11 * Math.floor(length / 2) + 6 * (length % 2)
}

AlphanumericData.prototype.getLength = function getLength () {
  return this.data.length
}

AlphanumericData.prototype.getBitsLength = function getBitsLength () {
  return AlphanumericData.getBitsLength(this.data.length)
}

AlphanumericData.prototype.write = function write (bitBuffer) {
  let i

  // Input data characters are divided into groups of two characters
  // and encoded as 11-bit binary codes.
  for (i = 0; i + 2 <= this.data.length; i += 2) {
    // The character value of the first character is multiplied by 45
    let value = ALPHA_NUM_CHARS.indexOf(this.data[i]) * 45

    // The character value of the second digit is added to the product
    value += ALPHA_NUM_CHARS.indexOf(this.data[i + 1])

    // The sum is then stored as 11-bit binary number
    bitBuffer.put(value, 11)
  }

  // If the number of input data characters is not a multiple of two,
  // the character value of the final character is encoded as a 6-bit binary number.
  if (this.data.length % 2) {
    bitBuffer.put(ALPHA_NUM_CHARS.indexOf(this.data[i]), 6)
  }
}

module.exports = AlphanumericData


}),
"./node_modules/.pnpm/qrcode@1.5.4/node_modules/qrcode/lib/core/bit-buffer.js": (function (module) {
function BitBuffer () {
  this.buffer = []
  this.length = 0
}

BitBuffer.prototype = {

  get: function (index) {
    const bufIndex = Math.floor(index / 8)
    return ((this.buffer[bufIndex] >>> (7 - index % 8)) & 1) === 1
  },

  put: function (num, length) {
    for (let i = 0; i < length; i++) {
      this.putBit(((num >>> (length - i - 1)) & 1) === 1)
    }
  },

  getLengthInBits: function () {
    return this.length
  },

  putBit: function (bit) {
    const bufIndex = Math.floor(this.length / 8)
    if (this.buffer.length <= bufIndex) {
      this.buffer.push(0)
    }

    if (bit) {
      this.buffer[bufIndex] |= (0x80 >>> (this.length % 8))
    }

    this.length++
  }
}

module.exports = BitBuffer


}),
"./node_modules/.pnpm/qrcode@1.5.4/node_modules/qrcode/lib/core/bit-matrix.js": (function (module) {
/**
 * Helper class to handle QR Code symbol modules
 *
 * @param {Number} size Symbol size
 */
function BitMatrix (size) {
  if (!size || size < 1) {
    throw new Error('BitMatrix size must be defined and greater than 0')
  }

  this.size = size
  this.data = new Uint8Array(size * size)
  this.reservedBit = new Uint8Array(size * size)
}

/**
 * Set bit value at specified location
 * If reserved flag is set, this bit will be ignored during masking process
 *
 * @param {Number}  row
 * @param {Number}  col
 * @param {Boolean} value
 * @param {Boolean} reserved
 */
BitMatrix.prototype.set = function (row, col, value, reserved) {
  const index = row * this.size + col
  this.data[index] = value
  if (reserved) this.reservedBit[index] = true
}

/**
 * Returns bit value at specified location
 *
 * @param  {Number}  row
 * @param  {Number}  col
 * @return {Boolean}
 */
BitMatrix.prototype.get = function (row, col) {
  return this.data[row * this.size + col]
}

/**
 * Applies xor operator at specified location
 * (used during masking process)
 *
 * @param {Number}  row
 * @param {Number}  col
 * @param {Boolean} value
 */
BitMatrix.prototype.xor = function (row, col, value) {
  this.data[row * this.size + col] ^= value
}

/**
 * Check if bit at specified location is reserved
 *
 * @param {Number}   row
 * @param {Number}   col
 * @return {Boolean}
 */
BitMatrix.prototype.isReserved = function (row, col) {
  return this.reservedBit[row * this.size + col]
}

module.exports = BitMatrix


}),
"./node_modules/.pnpm/qrcode@1.5.4/node_modules/qrcode/lib/core/byte-data.js": (function (module, __unused_rspack_exports, __webpack_require__) {
const Mode = __webpack_require__("./node_modules/.pnpm/qrcode@1.5.4/node_modules/qrcode/lib/core/mode.js")

function ByteData (data) {
  this.mode = Mode.BYTE
  if (typeof (data) === 'string') {
    this.data = new TextEncoder().encode(data)
  } else {
    this.data = new Uint8Array(data)
  }
}

ByteData.getBitsLength = function getBitsLength (length) {
  return length * 8
}

ByteData.prototype.getLength = function getLength () {
  return this.data.length
}

ByteData.prototype.getBitsLength = function getBitsLength () {
  return ByteData.getBitsLength(this.data.length)
}

ByteData.prototype.write = function (bitBuffer) {
  for (let i = 0, l = this.data.length; i < l; i++) {
    bitBuffer.put(this.data[i], 8)
  }
}

module.exports = ByteData


}),
"./node_modules/.pnpm/qrcode@1.5.4/node_modules/qrcode/lib/core/error-correction-code.js": (function (__unused_rspack_module, exports, __webpack_require__) {
const ECLevel = __webpack_require__("./node_modules/.pnpm/qrcode@1.5.4/node_modules/qrcode/lib/core/error-correction-level.js")

const EC_BLOCKS_TABLE = [
// L  M  Q  H
  1, 1, 1, 1,
  1, 1, 1, 1,
  1, 1, 2, 2,
  1, 2, 2, 4,
  1, 2, 4, 4,
  2, 4, 4, 4,
  2, 4, 6, 5,
  2, 4, 6, 6,
  2, 5, 8, 8,
  4, 5, 8, 8,
  4, 5, 8, 11,
  4, 8, 10, 11,
  4, 9, 12, 16,
  4, 9, 16, 16,
  6, 10, 12, 18,
  6, 10, 17, 16,
  6, 11, 16, 19,
  6, 13, 18, 21,
  7, 14, 21, 25,
  8, 16, 20, 25,
  8, 17, 23, 25,
  9, 17, 23, 34,
  9, 18, 25, 30,
  10, 20, 27, 32,
  12, 21, 29, 35,
  12, 23, 34, 37,
  12, 25, 34, 40,
  13, 26, 35, 42,
  14, 28, 38, 45,
  15, 29, 40, 48,
  16, 31, 43, 51,
  17, 33, 45, 54,
  18, 35, 48, 57,
  19, 37, 51, 60,
  19, 38, 53, 63,
  20, 40, 56, 66,
  21, 43, 59, 70,
  22, 45, 62, 74,
  24, 47, 65, 77,
  25, 49, 68, 81
]

const EC_CODEWORDS_TABLE = [
// L  M  Q  H
  7, 10, 13, 17,
  10, 16, 22, 28,
  15, 26, 36, 44,
  20, 36, 52, 64,
  26, 48, 72, 88,
  36, 64, 96, 112,
  40, 72, 108, 130,
  48, 88, 132, 156,
  60, 110, 160, 192,
  72, 130, 192, 224,
  80, 150, 224, 264,
  96, 176, 260, 308,
  104, 198, 288, 352,
  120, 216, 320, 384,
  132, 240, 360, 432,
  144, 280, 408, 480,
  168, 308, 448, 532,
  180, 338, 504, 588,
  196, 364, 546, 650,
  224, 416, 600, 700,
  224, 442, 644, 750,
  252, 476, 690, 816,
  270, 504, 750, 900,
  300, 560, 810, 960,
  312, 588, 870, 1050,
  336, 644, 952, 1110,
  360, 700, 1020, 1200,
  390, 728, 1050, 1260,
  420, 784, 1140, 1350,
  450, 812, 1200, 1440,
  480, 868, 1290, 1530,
  510, 924, 1350, 1620,
  540, 980, 1440, 1710,
  570, 1036, 1530, 1800,
  570, 1064, 1590, 1890,
  600, 1120, 1680, 1980,
  630, 1204, 1770, 2100,
  660, 1260, 1860, 2220,
  720, 1316, 1950, 2310,
  750, 1372, 2040, 2430
]

/**
 * Returns the number of error correction block that the QR Code should contain
 * for the specified version and error correction level.
 *
 * @param  {Number} version              QR Code version
 * @param  {Number} errorCorrectionLevel Error correction level
 * @return {Number}                      Number of error correction blocks
 */
exports.getBlocksCount = function getBlocksCount (version, errorCorrectionLevel) {
  switch (errorCorrectionLevel) {
    case ECLevel.L:
      return EC_BLOCKS_TABLE[(version - 1) * 4 + 0]
    case ECLevel.M:
      return EC_BLOCKS_TABLE[(version - 1) * 4 + 1]
    case ECLevel.Q:
      return EC_BLOCKS_TABLE[(version - 1) * 4 + 2]
    case ECLevel.H:
      return EC_BLOCKS_TABLE[(version - 1) * 4 + 3]
    default:
      return undefined
  }
}

/**
 * Returns the number of error correction codewords to use for the specified
 * version and error correction level.
 *
 * @param  {Number} version              QR Code version
 * @param  {Number} errorCorrectionLevel Error correction level
 * @return {Number}                      Number of error correction codewords
 */
exports.getTotalCodewordsCount = function getTotalCodewordsCount (version, errorCorrectionLevel) {
  switch (errorCorrectionLevel) {
    case ECLevel.L:
      return EC_CODEWORDS_TABLE[(version - 1) * 4 + 0]
    case ECLevel.M:
      return EC_CODEWORDS_TABLE[(version - 1) * 4 + 1]
    case ECLevel.Q:
      return EC_CODEWORDS_TABLE[(version - 1) * 4 + 2]
    case ECLevel.H:
      return EC_CODEWORDS_TABLE[(version - 1) * 4 + 3]
    default:
      return undefined
  }
}


}),
"./node_modules/.pnpm/qrcode@1.5.4/node_modules/qrcode/lib/core/error-correction-level.js": (function (__unused_rspack_module, exports) {
exports.L = { bit: 1 }
exports.M = { bit: 0 }
exports.Q = { bit: 3 }
exports.H = { bit: 2 }

function fromString (string) {
  if (typeof string !== 'string') {
    throw new Error('Param is not a string')
  }

  const lcStr = string.toLowerCase()

  switch (lcStr) {
    case 'l':
    case 'low':
      return exports.L

    case 'm':
    case 'medium':
      return exports.M

    case 'q':
    case 'quartile':
      return exports.Q

    case 'h':
    case 'high':
      return exports.H

    default:
      throw new Error('Unknown EC Level: ' + string)
  }
}

exports.isValid = function isValid (level) {
  return level && typeof level.bit !== 'undefined' &&
    level.bit >= 0 && level.bit < 4
}

exports.from = function from (value, defaultValue) {
  if (exports.isValid(value)) {
    return value
  }

  try {
    return fromString(value)
  } catch (e) {
    return defaultValue
  }
}


}),
"./node_modules/.pnpm/qrcode@1.5.4/node_modules/qrcode/lib/core/finder-pattern.js": (function (__unused_rspack_module, exports, __webpack_require__) {
const getSymbolSize = (__webpack_require__("./node_modules/.pnpm/qrcode@1.5.4/node_modules/qrcode/lib/core/utils.js")/* .getSymbolSize */.getSymbolSize)
const FINDER_PATTERN_SIZE = 7

/**
 * Returns an array containing the positions of each finder pattern.
 * Each array's element represent the top-left point of the pattern as (x, y) coordinates
 *
 * @param  {Number} version QR Code version
 * @return {Array}          Array of coordinates
 */
exports.getPositions = function getPositions (version) {
  const size = getSymbolSize(version)

  return [
    // top-left
    [0, 0],
    // top-right
    [size - FINDER_PATTERN_SIZE, 0],
    // bottom-left
    [0, size - FINDER_PATTERN_SIZE]
  ]
}


}),
"./node_modules/.pnpm/qrcode@1.5.4/node_modules/qrcode/lib/core/format-info.js": (function (__unused_rspack_module, exports, __webpack_require__) {
const Utils = __webpack_require__("./node_modules/.pnpm/qrcode@1.5.4/node_modules/qrcode/lib/core/utils.js")

const G15 = (1 << 10) | (1 << 8) | (1 << 5) | (1 << 4) | (1 << 2) | (1 << 1) | (1 << 0)
const G15_MASK = (1 << 14) | (1 << 12) | (1 << 10) | (1 << 4) | (1 << 1)
const G15_BCH = Utils.getBCHDigit(G15)

/**
 * Returns format information with relative error correction bits
 *
 * The format information is a 15-bit sequence containing 5 data bits,
 * with 10 error correction bits calculated using the (15, 5) BCH code.
 *
 * @param  {Number} errorCorrectionLevel Error correction level
 * @param  {Number} mask                 Mask pattern
 * @return {Number}                      Encoded format information bits
 */
exports.getEncodedBits = function getEncodedBits (errorCorrectionLevel, mask) {
  const data = ((errorCorrectionLevel.bit << 3) | mask)
  let d = data << 10

  while (Utils.getBCHDigit(d) - G15_BCH >= 0) {
    d ^= (G15 << (Utils.getBCHDigit(d) - G15_BCH))
  }

  // xor final data with mask pattern in order to ensure that
  // no combination of Error Correction Level and data mask pattern
  // will result in an all-zero data string
  return ((data << 10) | d) ^ G15_MASK
}


}),
"./node_modules/.pnpm/qrcode@1.5.4/node_modules/qrcode/lib/core/galois-field.js": (function (__unused_rspack_module, exports) {
const EXP_TABLE = new Uint8Array(512)
const LOG_TABLE = new Uint8Array(256)
/**
 * Precompute the log and anti-log tables for faster computation later
 *
 * For each possible value in the galois field 2^8, we will pre-compute
 * the logarithm and anti-logarithm (exponential) of this value
 *
 * ref {@link https://en.wikiversity.org/wiki/Reed%E2%80%93Solomon_codes_for_coders#Introduction_to_mathematical_fields}
 */
;(function initTables () {
  let x = 1
  for (let i = 0; i < 255; i++) {
    EXP_TABLE[i] = x
    LOG_TABLE[x] = i

    x <<= 1 // multiply by 2

    // The QR code specification says to use byte-wise modulo 100011101 arithmetic.
    // This means that when a number is 256 or larger, it should be XORed with 0x11D.
    if (x & 0x100) { // similar to x >= 256, but a lot faster (because 0x100 == 256)
      x ^= 0x11D
    }
  }

  // Optimization: double the size of the anti-log table so that we don't need to mod 255 to
  // stay inside the bounds (because we will mainly use this table for the multiplication of
  // two GF numbers, no more).
  // @see {@link mul}
  for (let i = 255; i < 512; i++) {
    EXP_TABLE[i] = EXP_TABLE[i - 255]
  }
}())

/**
 * Returns log value of n inside Galois Field
 *
 * @param  {Number} n
 * @return {Number}
 */
exports.log = function log (n) {
  if (n < 1) throw new Error('log(' + n + ')')
  return LOG_TABLE[n]
}

/**
 * Returns anti-log value of n inside Galois Field
 *
 * @param  {Number} n
 * @return {Number}
 */
exports.exp = function exp (n) {
  return EXP_TABLE[n]
}

/**
 * Multiplies two number inside Galois Field
 *
 * @param  {Number} x
 * @param  {Number} y
 * @return {Number}
 */
exports.mul = function mul (x, y) {
  if (x === 0 || y === 0) return 0

  // should be EXP_TABLE[(LOG_TABLE[x] + LOG_TABLE[y]) % 255] if EXP_TABLE wasn't oversized
  // @see {@link initTables}
  return EXP_TABLE[LOG_TABLE[x] + LOG_TABLE[y]]
}


}),
"./node_modules/.pnpm/qrcode@1.5.4/node_modules/qrcode/lib/core/kanji-data.js": (function (module, __unused_rspack_exports, __webpack_require__) {
const Mode = __webpack_require__("./node_modules/.pnpm/qrcode@1.5.4/node_modules/qrcode/lib/core/mode.js")
const Utils = __webpack_require__("./node_modules/.pnpm/qrcode@1.5.4/node_modules/qrcode/lib/core/utils.js")

function KanjiData (data) {
  this.mode = Mode.KANJI
  this.data = data
}

KanjiData.getBitsLength = function getBitsLength (length) {
  return length * 13
}

KanjiData.prototype.getLength = function getLength () {
  return this.data.length
}

KanjiData.prototype.getBitsLength = function getBitsLength () {
  return KanjiData.getBitsLength(this.data.length)
}

KanjiData.prototype.write = function (bitBuffer) {
  let i

  // In the Shift JIS system, Kanji characters are represented by a two byte combination.
  // These byte values are shifted from the JIS X 0208 values.
  // JIS X 0208 gives details of the shift coded representation.
  for (i = 0; i < this.data.length; i++) {
    let value = Utils.toSJIS(this.data[i])

    // For characters with Shift JIS values from 0x8140 to 0x9FFC:
    if (value >= 0x8140 && value <= 0x9FFC) {
      // Subtract 0x8140 from Shift JIS value
      value -= 0x8140

    // For characters with Shift JIS values from 0xE040 to 0xEBBF
    } else if (value >= 0xE040 && value <= 0xEBBF) {
      // Subtract 0xC140 from Shift JIS value
      value -= 0xC140
    } else {
      throw new Error(
        'Invalid SJIS character: ' + this.data[i] + '\n' +
        'Make sure your charset is UTF-8')
    }

    // Multiply most significant byte of result by 0xC0
    // and add least significant byte to product
    value = (((value >>> 8) & 0xff) * 0xC0) + (value & 0xff)

    // Convert result to a 13-bit binary string
    bitBuffer.put(value, 13)
  }
}

module.exports = KanjiData


}),
"./node_modules/.pnpm/qrcode@1.5.4/node_modules/qrcode/lib/core/mask-pattern.js": (function (__unused_rspack_module, exports) {
/**
 * Data mask pattern reference
 * @type {Object}
 */
exports.Patterns = {
  PATTERN000: 0,
  PATTERN001: 1,
  PATTERN010: 2,
  PATTERN011: 3,
  PATTERN100: 4,
  PATTERN101: 5,
  PATTERN110: 6,
  PATTERN111: 7
}

/**
 * Weighted penalty scores for the undesirable features
 * @type {Object}
 */
const PenaltyScores = {
  N1: 3,
  N2: 3,
  N3: 40,
  N4: 10
}

/**
 * Check if mask pattern value is valid
 *
 * @param  {Number}  mask    Mask pattern
 * @return {Boolean}         true if valid, false otherwise
 */
exports.isValid = function isValid (mask) {
  return mask != null && mask !== '' && !isNaN(mask) && mask >= 0 && mask <= 7
}

/**
 * Returns mask pattern from a value.
 * If value is not valid, returns undefined
 *
 * @param  {Number|String} value        Mask pattern value
 * @return {Number}                     Valid mask pattern or undefined
 */
exports.from = function from (value) {
  return exports.isValid(value) ? parseInt(value, 10) : undefined
}

/**
* Find adjacent modules in row/column with the same color
* and assign a penalty value.
*
* Points: N1 + i
* i is the amount by which the number of adjacent modules of the same color exceeds 5
*/
exports.getPenaltyN1 = function getPenaltyN1 (data) {
  const size = data.size
  let points = 0
  let sameCountCol = 0
  let sameCountRow = 0
  let lastCol = null
  let lastRow = null

  for (let row = 0; row < size; row++) {
    sameCountCol = sameCountRow = 0
    lastCol = lastRow = null

    for (let col = 0; col < size; col++) {
      let module = data.get(row, col)
      if (module === lastCol) {
        sameCountCol++
      } else {
        if (sameCountCol >= 5) points += PenaltyScores.N1 + (sameCountCol - 5)
        lastCol = module
        sameCountCol = 1
      }

      module = data.get(col, row)
      if (module === lastRow) {
        sameCountRow++
      } else {
        if (sameCountRow >= 5) points += PenaltyScores.N1 + (sameCountRow - 5)
        lastRow = module
        sameCountRow = 1
      }
    }

    if (sameCountCol >= 5) points += PenaltyScores.N1 + (sameCountCol - 5)
    if (sameCountRow >= 5) points += PenaltyScores.N1 + (sameCountRow - 5)
  }

  return points
}

/**
 * Find 2x2 blocks with the same color and assign a penalty value
 *
 * Points: N2 * (m - 1) * (n - 1)
 */
exports.getPenaltyN2 = function getPenaltyN2 (data) {
  const size = data.size
  let points = 0

  for (let row = 0; row < size - 1; row++) {
    for (let col = 0; col < size - 1; col++) {
      const last = data.get(row, col) +
        data.get(row, col + 1) +
        data.get(row + 1, col) +
        data.get(row + 1, col + 1)

      if (last === 4 || last === 0) points++
    }
  }

  return points * PenaltyScores.N2
}

/**
 * Find 1:1:3:1:1 ratio (dark:light:dark:light:dark) pattern in row/column,
 * preceded or followed by light area 4 modules wide
 *
 * Points: N3 * number of pattern found
 */
exports.getPenaltyN3 = function getPenaltyN3 (data) {
  const size = data.size
  let points = 0
  let bitsCol = 0
  let bitsRow = 0

  for (let row = 0; row < size; row++) {
    bitsCol = bitsRow = 0
    for (let col = 0; col < size; col++) {
      bitsCol = ((bitsCol << 1) & 0x7FF) | data.get(row, col)
      if (col >= 10 && (bitsCol === 0x5D0 || bitsCol === 0x05D)) points++

      bitsRow = ((bitsRow << 1) & 0x7FF) | data.get(col, row)
      if (col >= 10 && (bitsRow === 0x5D0 || bitsRow === 0x05D)) points++
    }
  }

  return points * PenaltyScores.N3
}

/**
 * Calculate proportion of dark modules in entire symbol
 *
 * Points: N4 * k
 *
 * k is the rating of the deviation of the proportion of dark modules
 * in the symbol from 50% in steps of 5%
 */
exports.getPenaltyN4 = function getPenaltyN4 (data) {
  let darkCount = 0
  const modulesCount = data.data.length

  for (let i = 0; i < modulesCount; i++) darkCount += data.data[i]

  const k = Math.abs(Math.ceil((darkCount * 100 / modulesCount) / 5) - 10)

  return k * PenaltyScores.N4
}

/**
 * Return mask value at given position
 *
 * @param  {Number} maskPattern Pattern reference value
 * @param  {Number} i           Row
 * @param  {Number} j           Column
 * @return {Boolean}            Mask value
 */
function getMaskAt (maskPattern, i, j) {
  switch (maskPattern) {
    case exports.Patterns.PATTERN000: return (i + j) % 2 === 0
    case exports.Patterns.PATTERN001: return i % 2 === 0
    case exports.Patterns.PATTERN010: return j % 3 === 0
    case exports.Patterns.PATTERN011: return (i + j) % 3 === 0
    case exports.Patterns.PATTERN100: return (Math.floor(i / 2) + Math.floor(j / 3)) % 2 === 0
    case exports.Patterns.PATTERN101: return (i * j) % 2 + (i * j) % 3 === 0
    case exports.Patterns.PATTERN110: return ((i * j) % 2 + (i * j) % 3) % 2 === 0
    case exports.Patterns.PATTERN111: return ((i * j) % 3 + (i + j) % 2) % 2 === 0

    default: throw new Error('bad maskPattern:' + maskPattern)
  }
}

/**
 * Apply a mask pattern to a BitMatrix
 *
 * @param  {Number}    pattern Pattern reference number
 * @param  {BitMatrix} data    BitMatrix data
 */
exports.applyMask = function applyMask (pattern, data) {
  const size = data.size

  for (let col = 0; col < size; col++) {
    for (let row = 0; row < size; row++) {
      if (data.isReserved(row, col)) continue
      data.xor(row, col, getMaskAt(pattern, row, col))
    }
  }
}

/**
 * Returns the best mask pattern for data
 *
 * @param  {BitMatrix} data
 * @return {Number} Mask pattern reference number
 */
exports.getBestMask = function getBestMask (data, setupFormatFunc) {
  const numPatterns = Object.keys(exports.Patterns).length
  let bestPattern = 0
  let lowerPenalty = Infinity

  for (let p = 0; p < numPatterns; p++) {
    setupFormatFunc(p)
    exports.applyMask(p, data)

    // Calculate penalty
    const penalty =
      exports.getPenaltyN1(data) +
      exports.getPenaltyN2(data) +
      exports.getPenaltyN3(data) +
      exports.getPenaltyN4(data)

    // Undo previously applied mask
    exports.applyMask(p, data)

    if (penalty < lowerPenalty) {
      lowerPenalty = penalty
      bestPattern = p
    }
  }

  return bestPattern
}


}),
"./node_modules/.pnpm/qrcode@1.5.4/node_modules/qrcode/lib/core/mode.js": (function (__unused_rspack_module, exports, __webpack_require__) {
const VersionCheck = __webpack_require__("./node_modules/.pnpm/qrcode@1.5.4/node_modules/qrcode/lib/core/version-check.js")
const Regex = __webpack_require__("./node_modules/.pnpm/qrcode@1.5.4/node_modules/qrcode/lib/core/regex.js")

/**
 * Numeric mode encodes data from the decimal digit set (0 - 9)
 * (byte values 30HEX to 39HEX).
 * Normally, 3 data characters are represented by 10 bits.
 *
 * @type {Object}
 */
exports.NUMERIC = {
  id: 'Numeric',
  bit: 1 << 0,
  ccBits: [10, 12, 14]
}

/**
 * Alphanumeric mode encodes data from a set of 45 characters,
 * i.e. 10 numeric digits (0 - 9),
 *      26 alphabetic characters (A - Z),
 *   and 9 symbols (SP, $, %, *, +, -, ., /, :).
 * Normally, two input characters are represented by 11 bits.
 *
 * @type {Object}
 */
exports.ALPHANUMERIC = {
  id: 'Alphanumeric',
  bit: 1 << 1,
  ccBits: [9, 11, 13]
}

/**
 * In byte mode, data is encoded at 8 bits per character.
 *
 * @type {Object}
 */
exports.BYTE = {
  id: 'Byte',
  bit: 1 << 2,
  ccBits: [8, 16, 16]
}

/**
 * The Kanji mode efficiently encodes Kanji characters in accordance with
 * the Shift JIS system based on JIS X 0208.
 * The Shift JIS values are shifted from the JIS X 0208 values.
 * JIS X 0208 gives details of the shift coded representation.
 * Each two-byte character value is compacted to a 13-bit binary codeword.
 *
 * @type {Object}
 */
exports.KANJI = {
  id: 'Kanji',
  bit: 1 << 3,
  ccBits: [8, 10, 12]
}

/**
 * Mixed mode will contain a sequences of data in a combination of any of
 * the modes described above
 *
 * @type {Object}
 */
exports.MIXED = {
  bit: -1
}

/**
 * Returns the number of bits needed to store the data length
 * according to QR Code specifications.
 *
 * @param  {Mode}   mode    Data mode
 * @param  {Number} version QR Code version
 * @return {Number}         Number of bits
 */
exports.getCharCountIndicator = function getCharCountIndicator (mode, version) {
  if (!mode.ccBits) throw new Error('Invalid mode: ' + mode)

  if (!VersionCheck.isValid(version)) {
    throw new Error('Invalid version: ' + version)
  }

  if (version >= 1 && version < 10) return mode.ccBits[0]
  else if (version < 27) return mode.ccBits[1]
  return mode.ccBits[2]
}

/**
 * Returns the most efficient mode to store the specified data
 *
 * @param  {String} dataStr Input data string
 * @return {Mode}           Best mode
 */
exports.getBestModeForData = function getBestModeForData (dataStr) {
  if (Regex.testNumeric(dataStr)) return exports.NUMERIC
  else if (Regex.testAlphanumeric(dataStr)) return exports.ALPHANUMERIC
  else if (Regex.testKanji(dataStr)) return exports.KANJI
  else return exports.BYTE
}

/**
 * Return mode name as string
 *
 * @param {Mode} mode Mode object
 * @returns {String}  Mode name
 */
exports.toString = function toString (mode) {
  if (mode && mode.id) return mode.id
  throw new Error('Invalid mode')
}

/**
 * Check if input param is a valid mode object
 *
 * @param   {Mode}    mode Mode object
 * @returns {Boolean} True if valid mode, false otherwise
 */
exports.isValid = function isValid (mode) {
  return mode && mode.bit && mode.ccBits
}

/**
 * Get mode object from its name
 *
 * @param   {String} string Mode name
 * @returns {Mode}          Mode object
 */
function fromString (string) {
  if (typeof string !== 'string') {
    throw new Error('Param is not a string')
  }

  const lcStr = string.toLowerCase()

  switch (lcStr) {
    case 'numeric':
      return exports.NUMERIC
    case 'alphanumeric':
      return exports.ALPHANUMERIC
    case 'kanji':
      return exports.KANJI
    case 'byte':
      return exports.BYTE
    default:
      throw new Error('Unknown mode: ' + string)
  }
}

/**
 * Returns mode from a value.
 * If value is not a valid mode, returns defaultValue
 *
 * @param  {Mode|String} value        Encoding mode
 * @param  {Mode}        defaultValue Fallback value
 * @return {Mode}                     Encoding mode
 */
exports.from = function from (value, defaultValue) {
  if (exports.isValid(value)) {
    return value
  }

  try {
    return fromString(value)
  } catch (e) {
    return defaultValue
  }
}


}),
"./node_modules/.pnpm/qrcode@1.5.4/node_modules/qrcode/lib/core/numeric-data.js": (function (module, __unused_rspack_exports, __webpack_require__) {
const Mode = __webpack_require__("./node_modules/.pnpm/qrcode@1.5.4/node_modules/qrcode/lib/core/mode.js")

function NumericData (data) {
  this.mode = Mode.NUMERIC
  this.data = data.toString()
}

NumericData.getBitsLength = function getBitsLength (length) {
  return 10 * Math.floor(length / 3) + ((length % 3) ? ((length % 3) * 3 + 1) : 0)
}

NumericData.prototype.getLength = function getLength () {
  return this.data.length
}

NumericData.prototype.getBitsLength = function getBitsLength () {
  return NumericData.getBitsLength(this.data.length)
}

NumericData.prototype.write = function write (bitBuffer) {
  let i, group, value

  // The input data string is divided into groups of three digits,
  // and each group is converted to its 10-bit binary equivalent.
  for (i = 0; i + 3 <= this.data.length; i += 3) {
    group = this.data.substr(i, 3)
    value = parseInt(group, 10)

    bitBuffer.put(value, 10)
  }

  // If the number of input digits is not an exact multiple of three,
  // the final one or two digits are converted to 4 or 7 bits respectively.
  const remainingNum = this.data.length - i
  if (remainingNum > 0) {
    group = this.data.substr(i)
    value = parseInt(group, 10)

    bitBuffer.put(value, remainingNum * 3 + 1)
  }
}

module.exports = NumericData


}),
"./node_modules/.pnpm/qrcode@1.5.4/node_modules/qrcode/lib/core/polynomial.js": (function (__unused_rspack_module, exports, __webpack_require__) {
const GF = __webpack_require__("./node_modules/.pnpm/qrcode@1.5.4/node_modules/qrcode/lib/core/galois-field.js")

/**
 * Multiplies two polynomials inside Galois Field
 *
 * @param  {Uint8Array} p1 Polynomial
 * @param  {Uint8Array} p2 Polynomial
 * @return {Uint8Array}    Product of p1 and p2
 */
exports.mul = function mul (p1, p2) {
  const coeff = new Uint8Array(p1.length + p2.length - 1)

  for (let i = 0; i < p1.length; i++) {
    for (let j = 0; j < p2.length; j++) {
      coeff[i + j] ^= GF.mul(p1[i], p2[j])
    }
  }

  return coeff
}

/**
 * Calculate the remainder of polynomials division
 *
 * @param  {Uint8Array} divident Polynomial
 * @param  {Uint8Array} divisor  Polynomial
 * @return {Uint8Array}          Remainder
 */
exports.mod = function mod (divident, divisor) {
  let result = new Uint8Array(divident)

  while ((result.length - divisor.length) >= 0) {
    const coeff = result[0]

    for (let i = 0; i < divisor.length; i++) {
      result[i] ^= GF.mul(divisor[i], coeff)
    }

    // remove all zeros from buffer head
    let offset = 0
    while (offset < result.length && result[offset] === 0) offset++
    result = result.slice(offset)
  }

  return result
}

/**
 * Generate an irreducible generator polynomial of specified degree
 * (used by Reed-Solomon encoder)
 *
 * @param  {Number} degree Degree of the generator polynomial
 * @return {Uint8Array}    Buffer containing polynomial coefficients
 */
exports.generateECPolynomial = function generateECPolynomial (degree) {
  let poly = new Uint8Array([1])
  for (let i = 0; i < degree; i++) {
    poly = exports.mul(poly, new Uint8Array([1, GF.exp(i)]))
  }

  return poly
}


}),
"./node_modules/.pnpm/qrcode@1.5.4/node_modules/qrcode/lib/core/qrcode.js": (function (__unused_rspack_module, exports, __webpack_require__) {
const Utils = __webpack_require__("./node_modules/.pnpm/qrcode@1.5.4/node_modules/qrcode/lib/core/utils.js")
const ECLevel = __webpack_require__("./node_modules/.pnpm/qrcode@1.5.4/node_modules/qrcode/lib/core/error-correction-level.js")
const BitBuffer = __webpack_require__("./node_modules/.pnpm/qrcode@1.5.4/node_modules/qrcode/lib/core/bit-buffer.js")
const BitMatrix = __webpack_require__("./node_modules/.pnpm/qrcode@1.5.4/node_modules/qrcode/lib/core/bit-matrix.js")
const AlignmentPattern = __webpack_require__("./node_modules/.pnpm/qrcode@1.5.4/node_modules/qrcode/lib/core/alignment-pattern.js")
const FinderPattern = __webpack_require__("./node_modules/.pnpm/qrcode@1.5.4/node_modules/qrcode/lib/core/finder-pattern.js")
const MaskPattern = __webpack_require__("./node_modules/.pnpm/qrcode@1.5.4/node_modules/qrcode/lib/core/mask-pattern.js")
const ECCode = __webpack_require__("./node_modules/.pnpm/qrcode@1.5.4/node_modules/qrcode/lib/core/error-correction-code.js")
const ReedSolomonEncoder = __webpack_require__("./node_modules/.pnpm/qrcode@1.5.4/node_modules/qrcode/lib/core/reed-solomon-encoder.js")
const Version = __webpack_require__("./node_modules/.pnpm/qrcode@1.5.4/node_modules/qrcode/lib/core/version.js")
const FormatInfo = __webpack_require__("./node_modules/.pnpm/qrcode@1.5.4/node_modules/qrcode/lib/core/format-info.js")
const Mode = __webpack_require__("./node_modules/.pnpm/qrcode@1.5.4/node_modules/qrcode/lib/core/mode.js")
const Segments = __webpack_require__("./node_modules/.pnpm/qrcode@1.5.4/node_modules/qrcode/lib/core/segments.js")

/**
 * QRCode for JavaScript
 *
 * modified by Ryan Day for nodejs support
 * Copyright (c) 2011 Ryan Day
 *
 * Licensed under the MIT license:
 *   http://www.opensource.org/licenses/mit-license.php
 *
//---------------------------------------------------------------------
// QRCode for JavaScript
//
// Copyright (c) 2009 Kazuhiko Arase
//
// URL: http://www.d-project.com/
//
// Licensed under the MIT license:
//   http://www.opensource.org/licenses/mit-license.php
//
// The word "QR Code" is registered trademark of
// DENSO WAVE INCORPORATED
//   http://www.denso-wave.com/qrcode/faqpatent-e.html
//
//---------------------------------------------------------------------
*/

/**
 * Add finder patterns bits to matrix
 *
 * @param  {BitMatrix} matrix  Modules matrix
 * @param  {Number}    version QR Code version
 */
function setupFinderPattern (matrix, version) {
  const size = matrix.size
  const pos = FinderPattern.getPositions(version)

  for (let i = 0; i < pos.length; i++) {
    const row = pos[i][0]
    const col = pos[i][1]

    for (let r = -1; r <= 7; r++) {
      if (row + r <= -1 || size <= row + r) continue

      for (let c = -1; c <= 7; c++) {
        if (col + c <= -1 || size <= col + c) continue

        if ((r >= 0 && r <= 6 && (c === 0 || c === 6)) ||
          (c >= 0 && c <= 6 && (r === 0 || r === 6)) ||
          (r >= 2 && r <= 4 && c >= 2 && c <= 4)) {
          matrix.set(row + r, col + c, true, true)
        } else {
          matrix.set(row + r, col + c, false, true)
        }
      }
    }
  }
}

/**
 * Add timing pattern bits to matrix
 *
 * Note: this function must be called before {@link setupAlignmentPattern}
 *
 * @param  {BitMatrix} matrix Modules matrix
 */
function setupTimingPattern (matrix) {
  const size = matrix.size

  for (let r = 8; r < size - 8; r++) {
    const value = r % 2 === 0
    matrix.set(r, 6, value, true)
    matrix.set(6, r, value, true)
  }
}

/**
 * Add alignment patterns bits to matrix
 *
 * Note: this function must be called after {@link setupTimingPattern}
 *
 * @param  {BitMatrix} matrix  Modules matrix
 * @param  {Number}    version QR Code version
 */
function setupAlignmentPattern (matrix, version) {
  const pos = AlignmentPattern.getPositions(version)

  for (let i = 0; i < pos.length; i++) {
    const row = pos[i][0]
    const col = pos[i][1]

    for (let r = -2; r <= 2; r++) {
      for (let c = -2; c <= 2; c++) {
        if (r === -2 || r === 2 || c === -2 || c === 2 ||
          (r === 0 && c === 0)) {
          matrix.set(row + r, col + c, true, true)
        } else {
          matrix.set(row + r, col + c, false, true)
        }
      }
    }
  }
}

/**
 * Add version info bits to matrix
 *
 * @param  {BitMatrix} matrix  Modules matrix
 * @param  {Number}    version QR Code version
 */
function setupVersionInfo (matrix, version) {
  const size = matrix.size
  const bits = Version.getEncodedBits(version)
  let row, col, mod

  for (let i = 0; i < 18; i++) {
    row = Math.floor(i / 3)
    col = i % 3 + size - 8 - 3
    mod = ((bits >> i) & 1) === 1

    matrix.set(row, col, mod, true)
    matrix.set(col, row, mod, true)
  }
}

/**
 * Add format info bits to matrix
 *
 * @param  {BitMatrix} matrix               Modules matrix
 * @param  {ErrorCorrectionLevel}    errorCorrectionLevel Error correction level
 * @param  {Number}    maskPattern          Mask pattern reference value
 */
function setupFormatInfo (matrix, errorCorrectionLevel, maskPattern) {
  const size = matrix.size
  const bits = FormatInfo.getEncodedBits(errorCorrectionLevel, maskPattern)
  let i, mod

  for (i = 0; i < 15; i++) {
    mod = ((bits >> i) & 1) === 1

    // vertical
    if (i < 6) {
      matrix.set(i, 8, mod, true)
    } else if (i < 8) {
      matrix.set(i + 1, 8, mod, true)
    } else {
      matrix.set(size - 15 + i, 8, mod, true)
    }

    // horizontal
    if (i < 8) {
      matrix.set(8, size - i - 1, mod, true)
    } else if (i < 9) {
      matrix.set(8, 15 - i - 1 + 1, mod, true)
    } else {
      matrix.set(8, 15 - i - 1, mod, true)
    }
  }

  // fixed module
  matrix.set(size - 8, 8, 1, true)
}

/**
 * Add encoded data bits to matrix
 *
 * @param  {BitMatrix}  matrix Modules matrix
 * @param  {Uint8Array} data   Data codewords
 */
function setupData (matrix, data) {
  const size = matrix.size
  let inc = -1
  let row = size - 1
  let bitIndex = 7
  let byteIndex = 0

  for (let col = size - 1; col > 0; col -= 2) {
    if (col === 6) col--

    while (true) {
      for (let c = 0; c < 2; c++) {
        if (!matrix.isReserved(row, col - c)) {
          let dark = false

          if (byteIndex < data.length) {
            dark = (((data[byteIndex] >>> bitIndex) & 1) === 1)
          }

          matrix.set(row, col - c, dark)
          bitIndex--

          if (bitIndex === -1) {
            byteIndex++
            bitIndex = 7
          }
        }
      }

      row += inc

      if (row < 0 || size <= row) {
        row -= inc
        inc = -inc
        break
      }
    }
  }
}

/**
 * Create encoded codewords from data input
 *
 * @param  {Number}   version              QR Code version
 * @param  {ErrorCorrectionLevel}   errorCorrectionLevel Error correction level
 * @param  {ByteData} data                 Data input
 * @return {Uint8Array}                    Buffer containing encoded codewords
 */
function createData (version, errorCorrectionLevel, segments) {
  // Prepare data buffer
  const buffer = new BitBuffer()

  segments.forEach(function (data) {
    // prefix data with mode indicator (4 bits)
    buffer.put(data.mode.bit, 4)

    // Prefix data with character count indicator.
    // The character count indicator is a string of bits that represents the
    // number of characters that are being encoded.
    // The character count indicator must be placed after the mode indicator
    // and must be a certain number of bits long, depending on the QR version
    // and data mode
    // @see {@link Mode.getCharCountIndicator}.
    buffer.put(data.getLength(), Mode.getCharCountIndicator(data.mode, version))

    // add binary data sequence to buffer
    data.write(buffer)
  })

  // Calculate required number of bits
  const totalCodewords = Utils.getSymbolTotalCodewords(version)
  const ecTotalCodewords = ECCode.getTotalCodewordsCount(version, errorCorrectionLevel)
  const dataTotalCodewordsBits = (totalCodewords - ecTotalCodewords) * 8

  // Add a terminator.
  // If the bit string is shorter than the total number of required bits,
  // a terminator of up to four 0s must be added to the right side of the string.
  // If the bit string is more than four bits shorter than the required number of bits,
  // add four 0s to the end.
  if (buffer.getLengthInBits() + 4 <= dataTotalCodewordsBits) {
    buffer.put(0, 4)
  }

  // If the bit string is fewer than four bits shorter, add only the number of 0s that
  // are needed to reach the required number of bits.

  // After adding the terminator, if the number of bits in the string is not a multiple of 8,
  // pad the string on the right with 0s to make the string's length a multiple of 8.
  while (buffer.getLengthInBits() % 8 !== 0) {
    buffer.putBit(0)
  }

  // Add pad bytes if the string is still shorter than the total number of required bits.
  // Extend the buffer to fill the data capacity of the symbol corresponding to
  // the Version and Error Correction Level by adding the Pad Codewords 11101100 (0xEC)
  // and 00010001 (0x11) alternately.
  const remainingByte = (dataTotalCodewordsBits - buffer.getLengthInBits()) / 8
  for (let i = 0; i < remainingByte; i++) {
    buffer.put(i % 2 ? 0x11 : 0xEC, 8)
  }

  return createCodewords(buffer, version, errorCorrectionLevel)
}

/**
 * Encode input data with Reed-Solomon and return codewords with
 * relative error correction bits
 *
 * @param  {BitBuffer} bitBuffer            Data to encode
 * @param  {Number}    version              QR Code version
 * @param  {ErrorCorrectionLevel} errorCorrectionLevel Error correction level
 * @return {Uint8Array}                     Buffer containing encoded codewords
 */
function createCodewords (bitBuffer, version, errorCorrectionLevel) {
  // Total codewords for this QR code version (Data + Error correction)
  const totalCodewords = Utils.getSymbolTotalCodewords(version)

  // Total number of error correction codewords
  const ecTotalCodewords = ECCode.getTotalCodewordsCount(version, errorCorrectionLevel)

  // Total number of data codewords
  const dataTotalCodewords = totalCodewords - ecTotalCodewords

  // Total number of blocks
  const ecTotalBlocks = ECCode.getBlocksCount(version, errorCorrectionLevel)

  // Calculate how many blocks each group should contain
  const blocksInGroup2 = totalCodewords % ecTotalBlocks
  const blocksInGroup1 = ecTotalBlocks - blocksInGroup2

  const totalCodewordsInGroup1 = Math.floor(totalCodewords / ecTotalBlocks)

  const dataCodewordsInGroup1 = Math.floor(dataTotalCodewords / ecTotalBlocks)
  const dataCodewordsInGroup2 = dataCodewordsInGroup1 + 1

  // Number of EC codewords is the same for both groups
  const ecCount = totalCodewordsInGroup1 - dataCodewordsInGroup1

  // Initialize a Reed-Solomon encoder with a generator polynomial of degree ecCount
  const rs = new ReedSolomonEncoder(ecCount)

  let offset = 0
  const dcData = new Array(ecTotalBlocks)
  const ecData = new Array(ecTotalBlocks)
  let maxDataSize = 0
  const buffer = new Uint8Array(bitBuffer.buffer)

  // Divide the buffer into the required number of blocks
  for (let b = 0; b < ecTotalBlocks; b++) {
    const dataSize = b < blocksInGroup1 ? dataCodewordsInGroup1 : dataCodewordsInGroup2

    // extract a block of data from buffer
    dcData[b] = buffer.slice(offset, offset + dataSize)

    // Calculate EC codewords for this data block
    ecData[b] = rs.encode(dcData[b])

    offset += dataSize
    maxDataSize = Math.max(maxDataSize, dataSize)
  }

  // Create final data
  // Interleave the data and error correction codewords from each block
  const data = new Uint8Array(totalCodewords)
  let index = 0
  let i, r

  // Add data codewords
  for (i = 0; i < maxDataSize; i++) {
    for (r = 0; r < ecTotalBlocks; r++) {
      if (i < dcData[r].length) {
        data[index++] = dcData[r][i]
      }
    }
  }

  // Apped EC codewords
  for (i = 0; i < ecCount; i++) {
    for (r = 0; r < ecTotalBlocks; r++) {
      data[index++] = ecData[r][i]
    }
  }

  return data
}

/**
 * Build QR Code symbol
 *
 * @param  {String} data                 Input string
 * @param  {Number} version              QR Code version
 * @param  {ErrorCorretionLevel} errorCorrectionLevel Error level
 * @param  {MaskPattern} maskPattern     Mask pattern
 * @return {Object}                      Object containing symbol data
 */
function createSymbol (data, version, errorCorrectionLevel, maskPattern) {
  let segments

  if (Array.isArray(data)) {
    segments = Segments.fromArray(data)
  } else if (typeof data === 'string') {
    let estimatedVersion = version

    if (!estimatedVersion) {
      const rawSegments = Segments.rawSplit(data)

      // Estimate best version that can contain raw splitted segments
      estimatedVersion = Version.getBestVersionForData(rawSegments, errorCorrectionLevel)
    }

    // Build optimized segments
    // If estimated version is undefined, try with the highest version
    segments = Segments.fromString(data, estimatedVersion || 40)
  } else {
    throw new Error('Invalid data')
  }

  // Get the min version that can contain data
  const bestVersion = Version.getBestVersionForData(segments, errorCorrectionLevel)

  // If no version is found, data cannot be stored
  if (!bestVersion) {
    throw new Error('The amount of data is too big to be stored in a QR Code')
  }

  // If not specified, use min version as default
  if (!version) {
    version = bestVersion

  // Check if the specified version can contain the data
  } else if (version < bestVersion) {
    throw new Error('\n' +
      'The chosen QR Code version cannot contain this amount of data.\n' +
      'Minimum version required to store current data is: ' + bestVersion + '.\n'
    )
  }

  const dataBits = createData(version, errorCorrectionLevel, segments)

  // Allocate matrix buffer
  const moduleCount = Utils.getSymbolSize(version)
  const modules = new BitMatrix(moduleCount)

  // Add function modules
  setupFinderPattern(modules, version)
  setupTimingPattern(modules)
  setupAlignmentPattern(modules, version)

  // Add temporary dummy bits for format info just to set them as reserved.
  // This is needed to prevent these bits from being masked by {@link MaskPattern.applyMask}
  // since the masking operation must be performed only on the encoding region.
  // These blocks will be replaced with correct values later in code.
  setupFormatInfo(modules, errorCorrectionLevel, 0)

  if (version >= 7) {
    setupVersionInfo(modules, version)
  }

  // Add data codewords
  setupData(modules, dataBits)

  if (isNaN(maskPattern)) {
    // Find best mask pattern
    maskPattern = MaskPattern.getBestMask(modules,
      setupFormatInfo.bind(null, modules, errorCorrectionLevel))
  }

  // Apply mask pattern
  MaskPattern.applyMask(maskPattern, modules)

  // Replace format info bits with correct values
  setupFormatInfo(modules, errorCorrectionLevel, maskPattern)

  return {
    modules: modules,
    version: version,
    errorCorrectionLevel: errorCorrectionLevel,
    maskPattern: maskPattern,
    segments: segments
  }
}

/**
 * QR Code
 *
 * @param {String | Array} data                 Input data
 * @param {Object} options                      Optional configurations
 * @param {Number} options.version              QR Code version
 * @param {String} options.errorCorrectionLevel Error correction level
 * @param {Function} options.toSJISFunc         Helper func to convert utf8 to sjis
 */
exports.create = function create (data, options) {
  if (typeof data === 'undefined' || data === '') {
    throw new Error('No input text')
  }

  let errorCorrectionLevel = ECLevel.M
  let version
  let mask

  if (typeof options !== 'undefined') {
    // Use higher error correction level as default
    errorCorrectionLevel = ECLevel.from(options.errorCorrectionLevel, ECLevel.M)
    version = Version.from(options.version)
    mask = MaskPattern.from(options.maskPattern)

    if (options.toSJISFunc) {
      Utils.setToSJISFunction(options.toSJISFunc)
    }
  }

  return createSymbol(data, version, errorCorrectionLevel, mask)
}


}),
"./node_modules/.pnpm/qrcode@1.5.4/node_modules/qrcode/lib/core/reed-solomon-encoder.js": (function (module, __unused_rspack_exports, __webpack_require__) {
const Polynomial = __webpack_require__("./node_modules/.pnpm/qrcode@1.5.4/node_modules/qrcode/lib/core/polynomial.js")

function ReedSolomonEncoder (degree) {
  this.genPoly = undefined
  this.degree = degree

  if (this.degree) this.initialize(this.degree)
}

/**
 * Initialize the encoder.
 * The input param should correspond to the number of error correction codewords.
 *
 * @param  {Number} degree
 */
ReedSolomonEncoder.prototype.initialize = function initialize (degree) {
  // create an irreducible generator polynomial
  this.degree = degree
  this.genPoly = Polynomial.generateECPolynomial(this.degree)
}

/**
 * Encodes a chunk of data
 *
 * @param  {Uint8Array} data Buffer containing input data
 * @return {Uint8Array}      Buffer containing encoded data
 */
ReedSolomonEncoder.prototype.encode = function encode (data) {
  if (!this.genPoly) {
    throw new Error('Encoder not initialized')
  }

  // Calculate EC for this data block
  // extends data size to data+genPoly size
  const paddedData = new Uint8Array(data.length + this.degree)
  paddedData.set(data)

  // The error correction codewords are the remainder after dividing the data codewords
  // by a generator polynomial
  const remainder = Polynomial.mod(paddedData, this.genPoly)

  // return EC data blocks (last n byte, where n is the degree of genPoly)
  // If coefficients number in remainder are less than genPoly degree,
  // pad with 0s to the left to reach the needed number of coefficients
  const start = this.degree - remainder.length
  if (start > 0) {
    const buff = new Uint8Array(this.degree)
    buff.set(remainder, start)

    return buff
  }

  return remainder
}

module.exports = ReedSolomonEncoder


}),
"./node_modules/.pnpm/qrcode@1.5.4/node_modules/qrcode/lib/core/regex.js": (function (__unused_rspack_module, exports) {
const numeric = '[0-9]+'
const alphanumeric = '[A-Z $%*+\\-./:]+'
let kanji = '(?:[u3000-u303F]|[u3040-u309F]|[u30A0-u30FF]|' +
  '[uFF00-uFFEF]|[u4E00-u9FAF]|[u2605-u2606]|[u2190-u2195]|u203B|' +
  '[u2010u2015u2018u2019u2025u2026u201Cu201Du2225u2260]|' +
  '[u0391-u0451]|[u00A7u00A8u00B1u00B4u00D7u00F7])+'
kanji = kanji.replace(/u/g, '\\u')

const byte = '(?:(?![A-Z0-9 $%*+\\-./:]|' + kanji + ')(?:.|[\r\n]))+'

exports.KANJI = new RegExp(kanji, 'g')
exports.BYTE_KANJI = new RegExp('[^A-Z0-9 $%*+\\-./:]+', 'g')
exports.BYTE = new RegExp(byte, 'g')
exports.NUMERIC = new RegExp(numeric, 'g')
exports.ALPHANUMERIC = new RegExp(alphanumeric, 'g')

const TEST_KANJI = new RegExp('^' + kanji + '$')
const TEST_NUMERIC = new RegExp('^' + numeric + '$')
const TEST_ALPHANUMERIC = new RegExp('^[A-Z0-9 $%*+\\-./:]+$')

exports.testKanji = function testKanji (str) {
  return TEST_KANJI.test(str)
}

exports.testNumeric = function testNumeric (str) {
  return TEST_NUMERIC.test(str)
}

exports.testAlphanumeric = function testAlphanumeric (str) {
  return TEST_ALPHANUMERIC.test(str)
}


}),
"./node_modules/.pnpm/qrcode@1.5.4/node_modules/qrcode/lib/core/segments.js": (function (__unused_rspack_module, exports, __webpack_require__) {
const Mode = __webpack_require__("./node_modules/.pnpm/qrcode@1.5.4/node_modules/qrcode/lib/core/mode.js")
const NumericData = __webpack_require__("./node_modules/.pnpm/qrcode@1.5.4/node_modules/qrcode/lib/core/numeric-data.js")
const AlphanumericData = __webpack_require__("./node_modules/.pnpm/qrcode@1.5.4/node_modules/qrcode/lib/core/alphanumeric-data.js")
const ByteData = __webpack_require__("./node_modules/.pnpm/qrcode@1.5.4/node_modules/qrcode/lib/core/byte-data.js")
const KanjiData = __webpack_require__("./node_modules/.pnpm/qrcode@1.5.4/node_modules/qrcode/lib/core/kanji-data.js")
const Regex = __webpack_require__("./node_modules/.pnpm/qrcode@1.5.4/node_modules/qrcode/lib/core/regex.js")
const Utils = __webpack_require__("./node_modules/.pnpm/qrcode@1.5.4/node_modules/qrcode/lib/core/utils.js")
const dijkstra = __webpack_require__("./node_modules/.pnpm/dijkstrajs@1.0.3/node_modules/dijkstrajs/dijkstra.js")

/**
 * Returns UTF8 byte length
 *
 * @param  {String} str Input string
 * @return {Number}     Number of byte
 */
function getStringByteLength (str) {
  return unescape(encodeURIComponent(str)).length
}

/**
 * Get a list of segments of the specified mode
 * from a string
 *
 * @param  {Mode}   mode Segment mode
 * @param  {String} str  String to process
 * @return {Array}       Array of object with segments data
 */
function getSegments (regex, mode, str) {
  const segments = []
  let result

  while ((result = regex.exec(str)) !== null) {
    segments.push({
      data: result[0],
      index: result.index,
      mode: mode,
      length: result[0].length
    })
  }

  return segments
}

/**
 * Extracts a series of segments with the appropriate
 * modes from a string
 *
 * @param  {String} dataStr Input string
 * @return {Array}          Array of object with segments data
 */
function getSegmentsFromString (dataStr) {
  const numSegs = getSegments(Regex.NUMERIC, Mode.NUMERIC, dataStr)
  const alphaNumSegs = getSegments(Regex.ALPHANUMERIC, Mode.ALPHANUMERIC, dataStr)
  let byteSegs
  let kanjiSegs

  if (Utils.isKanjiModeEnabled()) {
    byteSegs = getSegments(Regex.BYTE, Mode.BYTE, dataStr)
    kanjiSegs = getSegments(Regex.KANJI, Mode.KANJI, dataStr)
  } else {
    byteSegs = getSegments(Regex.BYTE_KANJI, Mode.BYTE, dataStr)
    kanjiSegs = []
  }

  const segs = numSegs.concat(alphaNumSegs, byteSegs, kanjiSegs)

  return segs
    .sort(function (s1, s2) {
      return s1.index - s2.index
    })
    .map(function (obj) {
      return {
        data: obj.data,
        mode: obj.mode,
        length: obj.length
      }
    })
}

/**
 * Returns how many bits are needed to encode a string of
 * specified length with the specified mode
 *
 * @param  {Number} length String length
 * @param  {Mode} mode     Segment mode
 * @return {Number}        Bit length
 */
function getSegmentBitsLength (length, mode) {
  switch (mode) {
    case Mode.NUMERIC:
      return NumericData.getBitsLength(length)
    case Mode.ALPHANUMERIC:
      return AlphanumericData.getBitsLength(length)
    case Mode.KANJI:
      return KanjiData.getBitsLength(length)
    case Mode.BYTE:
      return ByteData.getBitsLength(length)
  }
}

/**
 * Merges adjacent segments which have the same mode
 *
 * @param  {Array} segs Array of object with segments data
 * @return {Array}      Array of object with segments data
 */
function mergeSegments (segs) {
  return segs.reduce(function (acc, curr) {
    const prevSeg = acc.length - 1 >= 0 ? acc[acc.length - 1] : null
    if (prevSeg && prevSeg.mode === curr.mode) {
      acc[acc.length - 1].data += curr.data
      return acc
    }

    acc.push(curr)
    return acc
  }, [])
}

/**
 * Generates a list of all possible nodes combination which
 * will be used to build a segments graph.
 *
 * Nodes are divided by groups. Each group will contain a list of all the modes
 * in which is possible to encode the given text.
 *
 * For example the text '12345' can be encoded as Numeric, Alphanumeric or Byte.
 * The group for '12345' will contain then 3 objects, one for each
 * possible encoding mode.
 *
 * Each node represents a possible segment.
 *
 * @param  {Array} segs Array of object with segments data
 * @return {Array}      Array of object with segments data
 */
function buildNodes (segs) {
  const nodes = []
  for (let i = 0; i < segs.length; i++) {
    const seg = segs[i]

    switch (seg.mode) {
      case Mode.NUMERIC:
        nodes.push([seg,
          { data: seg.data, mode: Mode.ALPHANUMERIC, length: seg.length },
          { data: seg.data, mode: Mode.BYTE, length: seg.length }
        ])
        break
      case Mode.ALPHANUMERIC:
        nodes.push([seg,
          { data: seg.data, mode: Mode.BYTE, length: seg.length }
        ])
        break
      case Mode.KANJI:
        nodes.push([seg,
          { data: seg.data, mode: Mode.BYTE, length: getStringByteLength(seg.data) }
        ])
        break
      case Mode.BYTE:
        nodes.push([
          { data: seg.data, mode: Mode.BYTE, length: getStringByteLength(seg.data) }
        ])
    }
  }

  return nodes
}

/**
 * Builds a graph from a list of nodes.
 * All segments in each node group will be connected with all the segments of
 * the next group and so on.
 *
 * At each connection will be assigned a weight depending on the
 * segment's byte length.
 *
 * @param  {Array} nodes    Array of object with segments data
 * @param  {Number} version QR Code version
 * @return {Object}         Graph of all possible segments
 */
function buildGraph (nodes, version) {
  const table = {}
  const graph = { start: {} }
  let prevNodeIds = ['start']

  for (let i = 0; i < nodes.length; i++) {
    const nodeGroup = nodes[i]
    const currentNodeIds = []

    for (let j = 0; j < nodeGroup.length; j++) {
      const node = nodeGroup[j]
      const key = '' + i + j

      currentNodeIds.push(key)
      table[key] = { node: node, lastCount: 0 }
      graph[key] = {}

      for (let n = 0; n < prevNodeIds.length; n++) {
        const prevNodeId = prevNodeIds[n]

        if (table[prevNodeId] && table[prevNodeId].node.mode === node.mode) {
          graph[prevNodeId][key] =
            getSegmentBitsLength(table[prevNodeId].lastCount + node.length, node.mode) -
            getSegmentBitsLength(table[prevNodeId].lastCount, node.mode)

          table[prevNodeId].lastCount += node.length
        } else {
          if (table[prevNodeId]) table[prevNodeId].lastCount = node.length

          graph[prevNodeId][key] = getSegmentBitsLength(node.length, node.mode) +
            4 + Mode.getCharCountIndicator(node.mode, version) // switch cost
        }
      }
    }

    prevNodeIds = currentNodeIds
  }

  for (let n = 0; n < prevNodeIds.length; n++) {
    graph[prevNodeIds[n]].end = 0
  }

  return { map: graph, table: table }
}

/**
 * Builds a segment from a specified data and mode.
 * If a mode is not specified, the more suitable will be used.
 *
 * @param  {String} data             Input data
 * @param  {Mode | String} modesHint Data mode
 * @return {Segment}                 Segment
 */
function buildSingleSegment (data, modesHint) {
  let mode
  const bestMode = Mode.getBestModeForData(data)

  mode = Mode.from(modesHint, bestMode)

  // Make sure data can be encoded
  if (mode !== Mode.BYTE && mode.bit < bestMode.bit) {
    throw new Error('"' + data + '"' +
      ' cannot be encoded with mode ' + Mode.toString(mode) +
      '.\n Suggested mode is: ' + Mode.toString(bestMode))
  }

  // Use Mode.BYTE if Kanji support is disabled
  if (mode === Mode.KANJI && !Utils.isKanjiModeEnabled()) {
    mode = Mode.BYTE
  }

  switch (mode) {
    case Mode.NUMERIC:
      return new NumericData(data)

    case Mode.ALPHANUMERIC:
      return new AlphanumericData(data)

    case Mode.KANJI:
      return new KanjiData(data)

    case Mode.BYTE:
      return new ByteData(data)
  }
}

/**
 * Builds a list of segments from an array.
 * Array can contain Strings or Objects with segment's info.
 *
 * For each item which is a string, will be generated a segment with the given
 * string and the more appropriate encoding mode.
 *
 * For each item which is an object, will be generated a segment with the given
 * data and mode.
 * Objects must contain at least the property "data".
 * If property "mode" is not present, the more suitable mode will be used.
 *
 * @param  {Array} array Array of objects with segments data
 * @return {Array}       Array of Segments
 */
exports.fromArray = function fromArray (array) {
  return array.reduce(function (acc, seg) {
    if (typeof seg === 'string') {
      acc.push(buildSingleSegment(seg, null))
    } else if (seg.data) {
      acc.push(buildSingleSegment(seg.data, seg.mode))
    }

    return acc
  }, [])
}

/**
 * Builds an optimized sequence of segments from a string,
 * which will produce the shortest possible bitstream.
 *
 * @param  {String} data    Input string
 * @param  {Number} version QR Code version
 * @return {Array}          Array of segments
 */
exports.fromString = function fromString (data, version) {
  const segs = getSegmentsFromString(data, Utils.isKanjiModeEnabled())

  const nodes = buildNodes(segs)
  const graph = buildGraph(nodes, version)
  const path = dijkstra.find_path(graph.map, 'start', 'end')

  const optimizedSegs = []
  for (let i = 1; i < path.length - 1; i++) {
    optimizedSegs.push(graph.table[path[i]].node)
  }

  return exports.fromArray(mergeSegments(optimizedSegs))
}

/**
 * Splits a string in various segments with the modes which
 * best represent their content.
 * The produced segments are far from being optimized.
 * The output of this function is only used to estimate a QR Code version
 * which may contain the data.
 *
 * @param  {string} data Input string
 * @return {Array}       Array of segments
 */
exports.rawSplit = function rawSplit (data) {
  return exports.fromArray(
    getSegmentsFromString(data, Utils.isKanjiModeEnabled())
  )
}


}),
"./node_modules/.pnpm/qrcode@1.5.4/node_modules/qrcode/lib/core/utils.js": (function (__unused_rspack_module, exports) {
let toSJISFunction
const CODEWORDS_COUNT = [
  0, // Not used
  26, 44, 70, 100, 134, 172, 196, 242, 292, 346,
  404, 466, 532, 581, 655, 733, 815, 901, 991, 1085,
  1156, 1258, 1364, 1474, 1588, 1706, 1828, 1921, 2051, 2185,
  2323, 2465, 2611, 2761, 2876, 3034, 3196, 3362, 3532, 3706
]

/**
 * Returns the QR Code size for the specified version
 *
 * @param  {Number} version QR Code version
 * @return {Number}         size of QR code
 */
exports.getSymbolSize = function getSymbolSize (version) {
  if (!version) throw new Error('"version" cannot be null or undefined')
  if (version < 1 || version > 40) throw new Error('"version" should be in range from 1 to 40')
  return version * 4 + 17
}

/**
 * Returns the total number of codewords used to store data and EC information.
 *
 * @param  {Number} version QR Code version
 * @return {Number}         Data length in bits
 */
exports.getSymbolTotalCodewords = function getSymbolTotalCodewords (version) {
  return CODEWORDS_COUNT[version]
}

/**
 * Encode data with Bose-Chaudhuri-Hocquenghem
 *
 * @param  {Number} data Value to encode
 * @return {Number}      Encoded value
 */
exports.getBCHDigit = function (data) {
  let digit = 0

  while (data !== 0) {
    digit++
    data >>>= 1
  }

  return digit
}

exports.setToSJISFunction = function setToSJISFunction (f) {
  if (typeof f !== 'function') {
    throw new Error('"toSJISFunc" is not a valid function.')
  }

  toSJISFunction = f
}

exports.isKanjiModeEnabled = function () {
  return typeof toSJISFunction !== 'undefined'
}

exports.toSJIS = function toSJIS (kanji) {
  return toSJISFunction(kanji)
}


}),
"./node_modules/.pnpm/qrcode@1.5.4/node_modules/qrcode/lib/core/version-check.js": (function (__unused_rspack_module, exports) {
/**
 * Check if QR Code version is valid
 *
 * @param  {Number}  version QR Code version
 * @return {Boolean}         true if valid version, false otherwise
 */
exports.isValid = function isValid (version) {
  return !isNaN(version) && version >= 1 && version <= 40
}


}),
"./node_modules/.pnpm/qrcode@1.5.4/node_modules/qrcode/lib/core/version.js": (function (__unused_rspack_module, exports, __webpack_require__) {
const Utils = __webpack_require__("./node_modules/.pnpm/qrcode@1.5.4/node_modules/qrcode/lib/core/utils.js")
const ECCode = __webpack_require__("./node_modules/.pnpm/qrcode@1.5.4/node_modules/qrcode/lib/core/error-correction-code.js")
const ECLevel = __webpack_require__("./node_modules/.pnpm/qrcode@1.5.4/node_modules/qrcode/lib/core/error-correction-level.js")
const Mode = __webpack_require__("./node_modules/.pnpm/qrcode@1.5.4/node_modules/qrcode/lib/core/mode.js")
const VersionCheck = __webpack_require__("./node_modules/.pnpm/qrcode@1.5.4/node_modules/qrcode/lib/core/version-check.js")

// Generator polynomial used to encode version information
const G18 = (1 << 12) | (1 << 11) | (1 << 10) | (1 << 9) | (1 << 8) | (1 << 5) | (1 << 2) | (1 << 0)
const G18_BCH = Utils.getBCHDigit(G18)

function getBestVersionForDataLength (mode, length, errorCorrectionLevel) {
  for (let currentVersion = 1; currentVersion <= 40; currentVersion++) {
    if (length <= exports.getCapacity(currentVersion, errorCorrectionLevel, mode)) {
      return currentVersion
    }
  }

  return undefined
}

function getReservedBitsCount (mode, version) {
  // Character count indicator + mode indicator bits
  return Mode.getCharCountIndicator(mode, version) + 4
}

function getTotalBitsFromDataArray (segments, version) {
  let totalBits = 0

  segments.forEach(function (data) {
    const reservedBits = getReservedBitsCount(data.mode, version)
    totalBits += reservedBits + data.getBitsLength()
  })

  return totalBits
}

function getBestVersionForMixedData (segments, errorCorrectionLevel) {
  for (let currentVersion = 1; currentVersion <= 40; currentVersion++) {
    const length = getTotalBitsFromDataArray(segments, currentVersion)
    if (length <= exports.getCapacity(currentVersion, errorCorrectionLevel, Mode.MIXED)) {
      return currentVersion
    }
  }

  return undefined
}

/**
 * Returns version number from a value.
 * If value is not a valid version, returns defaultValue
 *
 * @param  {Number|String} value        QR Code version
 * @param  {Number}        defaultValue Fallback value
 * @return {Number}                     QR Code version number
 */
exports.from = function from (value, defaultValue) {
  if (VersionCheck.isValid(value)) {
    return parseInt(value, 10)
  }

  return defaultValue
}

/**
 * Returns how much data can be stored with the specified QR code version
 * and error correction level
 *
 * @param  {Number} version              QR Code version (1-40)
 * @param  {Number} errorCorrectionLevel Error correction level
 * @param  {Mode}   mode                 Data mode
 * @return {Number}                      Quantity of storable data
 */
exports.getCapacity = function getCapacity (version, errorCorrectionLevel, mode) {
  if (!VersionCheck.isValid(version)) {
    throw new Error('Invalid QR Code version')
  }

  // Use Byte mode as default
  if (typeof mode === 'undefined') mode = Mode.BYTE

  // Total codewords for this QR code version (Data + Error correction)
  const totalCodewords = Utils.getSymbolTotalCodewords(version)

  // Total number of error correction codewords
  const ecTotalCodewords = ECCode.getTotalCodewordsCount(version, errorCorrectionLevel)

  // Total number of data codewords
  const dataTotalCodewordsBits = (totalCodewords - ecTotalCodewords) * 8

  if (mode === Mode.MIXED) return dataTotalCodewordsBits

  const usableBits = dataTotalCodewordsBits - getReservedBitsCount(mode, version)

  // Return max number of storable codewords
  switch (mode) {
    case Mode.NUMERIC:
      return Math.floor((usableBits / 10) * 3)

    case Mode.ALPHANUMERIC:
      return Math.floor((usableBits / 11) * 2)

    case Mode.KANJI:
      return Math.floor(usableBits / 13)

    case Mode.BYTE:
    default:
      return Math.floor(usableBits / 8)
  }
}

/**
 * Returns the minimum version needed to contain the amount of data
 *
 * @param  {Segment} data                    Segment of data
 * @param  {Number} [errorCorrectionLevel=H] Error correction level
 * @param  {Mode} mode                       Data mode
 * @return {Number}                          QR Code version
 */
exports.getBestVersionForData = function getBestVersionForData (data, errorCorrectionLevel) {
  let seg

  const ecl = ECLevel.from(errorCorrectionLevel, ECLevel.M)

  if (Array.isArray(data)) {
    if (data.length > 1) {
      return getBestVersionForMixedData(data, ecl)
    }

    if (data.length === 0) {
      return 1
    }

    seg = data[0]
  } else {
    seg = data
  }

  return getBestVersionForDataLength(seg.mode, seg.getLength(), ecl)
}

/**
 * Returns version information with relative error correction bits
 *
 * The version information is included in QR Code symbols of version 7 or larger.
 * It consists of an 18-bit sequence containing 6 data bits,
 * with 12 error correction bits calculated using the (18, 6) Golay code.
 *
 * @param  {Number} version QR Code version
 * @return {Number}         Encoded version info bits
 */
exports.getEncodedBits = function getEncodedBits (version) {
  if (!VersionCheck.isValid(version) || version < 7) {
    throw new Error('Invalid QR Code version')
  }

  let d = version << 12

  while (Utils.getBCHDigit(d) - G18_BCH >= 0) {
    d ^= (G18 << (Utils.getBCHDigit(d) - G18_BCH))
  }

  return (version << 12) | d
}


}),
"./node_modules/.pnpm/qrcode@1.5.4/node_modules/qrcode/lib/renderer/canvas.js": (function (__unused_rspack_module, exports, __webpack_require__) {
const Utils = __webpack_require__("./node_modules/.pnpm/qrcode@1.5.4/node_modules/qrcode/lib/renderer/utils.js")

function clearCanvas (ctx, canvas, size) {
  ctx.clearRect(0, 0, canvas.width, canvas.height)

  if (!canvas.style) canvas.style = {}
  canvas.height = size
  canvas.width = size
  canvas.style.height = size + 'px'
  canvas.style.width = size + 'px'
}

function getCanvasElement () {
  try {
    return document.createElement('canvas')
  } catch (e) {
    throw new Error('You need to specify a canvas element')
  }
}

exports.render = function render (qrData, canvas, options) {
  let opts = options
  let canvasEl = canvas

  if (typeof opts === 'undefined' && (!canvas || !canvas.getContext)) {
    opts = canvas
    canvas = undefined
  }

  if (!canvas) {
    canvasEl = getCanvasElement()
  }

  opts = Utils.getOptions(opts)
  const size = Utils.getImageWidth(qrData.modules.size, opts)

  const ctx = canvasEl.getContext('2d')
  const image = ctx.createImageData(size, size)
  Utils.qrToImageData(image.data, qrData, opts)

  clearCanvas(ctx, canvasEl, size)
  ctx.putImageData(image, 0, 0)

  return canvasEl
}

exports.renderToDataURL = function renderToDataURL (qrData, canvas, options) {
  let opts = options

  if (typeof opts === 'undefined' && (!canvas || !canvas.getContext)) {
    opts = canvas
    canvas = undefined
  }

  if (!opts) opts = {}

  const canvasEl = exports.render(qrData, canvas, opts)

  const type = opts.type || 'image/png'
  const rendererOpts = opts.rendererOpts || {}

  return canvasEl.toDataURL(type, rendererOpts.quality)
}


}),
"./node_modules/.pnpm/qrcode@1.5.4/node_modules/qrcode/lib/renderer/svg-tag.js": (function (__unused_rspack_module, exports, __webpack_require__) {
const Utils = __webpack_require__("./node_modules/.pnpm/qrcode@1.5.4/node_modules/qrcode/lib/renderer/utils.js")

function getColorAttrib (color, attrib) {
  const alpha = color.a / 255
  const str = attrib + '="' + color.hex + '"'

  return alpha < 1
    ? str + ' ' + attrib + '-opacity="' + alpha.toFixed(2).slice(1) + '"'
    : str
}

function svgCmd (cmd, x, y) {
  let str = cmd + x
  if (typeof y !== 'undefined') str += ' ' + y

  return str
}

function qrToPath (data, size, margin) {
  let path = ''
  let moveBy = 0
  let newRow = false
  let lineLength = 0

  for (let i = 0; i < data.length; i++) {
    const col = Math.floor(i % size)
    const row = Math.floor(i / size)

    if (!col && !newRow) newRow = true

    if (data[i]) {
      lineLength++

      if (!(i > 0 && col > 0 && data[i - 1])) {
        path += newRow
          ? svgCmd('M', col + margin, 0.5 + row + margin)
          : svgCmd('m', moveBy, 0)

        moveBy = 0
        newRow = false
      }

      if (!(col + 1 < size && data[i + 1])) {
        path += svgCmd('h', lineLength)
        lineLength = 0
      }
    } else {
      moveBy++
    }
  }

  return path
}

exports.render = function render (qrData, options, cb) {
  const opts = Utils.getOptions(options)
  const size = qrData.modules.size
  const data = qrData.modules.data
  const qrcodesize = size + opts.margin * 2

  const bg = !opts.color.light.a
    ? ''
    : '<path ' + getColorAttrib(opts.color.light, 'fill') +
      ' d="M0 0h' + qrcodesize + 'v' + qrcodesize + 'H0z"/>'

  const path =
    '<path ' + getColorAttrib(opts.color.dark, 'stroke') +
    ' d="' + qrToPath(data, size, opts.margin) + '"/>'

  const viewBox = 'viewBox="' + '0 0 ' + qrcodesize + ' ' + qrcodesize + '"'

  const width = !opts.width ? '' : 'width="' + opts.width + '" height="' + opts.width + '" '

  const svgTag = '<svg xmlns="http://www.w3.org/2000/svg" ' + width + viewBox + ' shape-rendering="crispEdges">' + bg + path + '</svg>\n'

  if (typeof cb === 'function') {
    cb(null, svgTag)
  }

  return svgTag
}


}),
"./node_modules/.pnpm/qrcode@1.5.4/node_modules/qrcode/lib/renderer/utils.js": (function (__unused_rspack_module, exports) {
function hex2rgba (hex) {
  if (typeof hex === 'number') {
    hex = hex.toString()
  }

  if (typeof hex !== 'string') {
    throw new Error('Color should be defined as hex string')
  }

  let hexCode = hex.slice().replace('#', '').split('')
  if (hexCode.length < 3 || hexCode.length === 5 || hexCode.length > 8) {
    throw new Error('Invalid hex color: ' + hex)
  }

  // Convert from short to long form (fff -> ffffff)
  if (hexCode.length === 3 || hexCode.length === 4) {
    hexCode = Array.prototype.concat.apply([], hexCode.map(function (c) {
      return [c, c]
    }))
  }

  // Add default alpha value
  if (hexCode.length === 6) hexCode.push('F', 'F')

  const hexValue = parseInt(hexCode.join(''), 16)

  return {
    r: (hexValue >> 24) & 255,
    g: (hexValue >> 16) & 255,
    b: (hexValue >> 8) & 255,
    a: hexValue & 255,
    hex: '#' + hexCode.slice(0, 6).join('')
  }
}

exports.getOptions = function getOptions (options) {
  if (!options) options = {}
  if (!options.color) options.color = {}

  const margin = typeof options.margin === 'undefined' ||
    options.margin === null ||
    options.margin < 0
    ? 4
    : options.margin

  const width = options.width && options.width >= 21 ? options.width : undefined
  const scale = options.scale || 4

  return {
    width: width,
    scale: width ? 4 : scale,
    margin: margin,
    color: {
      dark: hex2rgba(options.color.dark || '#000000ff'),
      light: hex2rgba(options.color.light || '#ffffffff')
    },
    type: options.type,
    rendererOpts: options.rendererOpts || {}
  }
}

exports.getScale = function getScale (qrSize, opts) {
  return opts.width && opts.width >= qrSize + opts.margin * 2
    ? opts.width / (qrSize + opts.margin * 2)
    : opts.scale
}

exports.getImageWidth = function getImageWidth (qrSize, opts) {
  const scale = exports.getScale(qrSize, opts)
  return Math.floor((qrSize + opts.margin * 2) * scale)
}

exports.qrToImageData = function qrToImageData (imgData, qr, opts) {
  const size = qr.modules.size
  const data = qr.modules.data
  const scale = exports.getScale(size, opts)
  const symbolSize = Math.floor((size + opts.margin * 2) * scale)
  const scaledMargin = opts.margin * scale
  const palette = [opts.color.light, opts.color.dark]

  for (let i = 0; i < symbolSize; i++) {
    for (let j = 0; j < symbolSize; j++) {
      let posDst = (i * symbolSize + j) * 4
      let pxColor = opts.color.light

      if (i >= scaledMargin && j >= scaledMargin &&
        i < symbolSize - scaledMargin && j < symbolSize - scaledMargin) {
        const iSrc = Math.floor((i - scaledMargin) / scale)
        const jSrc = Math.floor((j - scaledMargin) / scale)
        pxColor = palette[data[iSrc * size + jSrc] ? 1 : 0]
      }

      imgData[posDst++] = pxColor.r
      imgData[posDst++] = pxColor.g
      imgData[posDst++] = pxColor.b
      imgData[posDst] = pxColor.a
    }
  }
}


}),
"./node_modules/.pnpm/regenerator-runtime@0.14.0/node_modules/regenerator-runtime/runtime.js": (function (module) {
/**
 * Copyright (c) 2014-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

var runtime = (function (exports) {
  "use strict";

  var Op = Object.prototype;
  var hasOwn = Op.hasOwnProperty;
  var defineProperty = Object.defineProperty || function (obj, key, desc) { obj[key] = desc.value; };
  var undefined; // More compressible than void 0.
  var $Symbol = typeof Symbol === "function" ? Symbol : {};
  var iteratorSymbol = $Symbol.iterator || "@@iterator";
  var asyncIteratorSymbol = $Symbol.asyncIterator || "@@asyncIterator";
  var toStringTagSymbol = $Symbol.toStringTag || "@@toStringTag";

  function define(obj, key, value) {
    Object.defineProperty(obj, key, {
      value: value,
      enumerable: true,
      configurable: true,
      writable: true
    });
    return obj[key];
  }
  try {
    // IE 8 has a broken Object.defineProperty that only works on DOM objects.
    define({}, "");
  } catch (err) {
    define = function(obj, key, value) {
      return obj[key] = value;
    };
  }

  function wrap(innerFn, outerFn, self, tryLocsList) {
    // If outerFn provided and outerFn.prototype is a Generator, then outerFn.prototype instanceof Generator.
    var protoGenerator = outerFn && outerFn.prototype instanceof Generator ? outerFn : Generator;
    var generator = Object.create(protoGenerator.prototype);
    var context = new Context(tryLocsList || []);

    // The ._invoke method unifies the implementations of the .next,
    // .throw, and .return methods.
    defineProperty(generator, "_invoke", { value: makeInvokeMethod(innerFn, self, context) });

    return generator;
  }
  exports.wrap = wrap;

  // Try/catch helper to minimize deoptimizations. Returns a completion
  // record like context.tryEntries[i].completion. This interface could
  // have been (and was previously) designed to take a closure to be
  // invoked without arguments, but in all the cases we care about we
  // already have an existing method we want to call, so there's no need
  // to create a new function object. We can even get away with assuming
  // the method takes exactly one argument, since that happens to be true
  // in every case, so we don't have to touch the arguments object. The
  // only additional allocation required is the completion record, which
  // has a stable shape and so hopefully should be cheap to allocate.
  function tryCatch(fn, obj, arg) {
    try {
      return { type: "normal", arg: fn.call(obj, arg) };
    } catch (err) {
      return { type: "throw", arg: err };
    }
  }

  var GenStateSuspendedStart = "suspendedStart";
  var GenStateSuspendedYield = "suspendedYield";
  var GenStateExecuting = "executing";
  var GenStateCompleted = "completed";

  // Returning this object from the innerFn has the same effect as
  // breaking out of the dispatch switch statement.
  var ContinueSentinel = {};

  // Dummy constructor functions that we use as the .constructor and
  // .constructor.prototype properties for functions that return Generator
  // objects. For full spec compliance, you may wish to configure your
  // minifier not to mangle the names of these two functions.
  function Generator() {}
  function GeneratorFunction() {}
  function GeneratorFunctionPrototype() {}

  // This is a polyfill for %IteratorPrototype% for environments that
  // don't natively support it.
  var IteratorPrototype = {};
  define(IteratorPrototype, iteratorSymbol, function () {
    return this;
  });

  var getProto = Object.getPrototypeOf;
  var NativeIteratorPrototype = getProto && getProto(getProto(values([])));
  if (NativeIteratorPrototype &&
      NativeIteratorPrototype !== Op &&
      hasOwn.call(NativeIteratorPrototype, iteratorSymbol)) {
    // This environment has a native %IteratorPrototype%; use it instead
    // of the polyfill.
    IteratorPrototype = NativeIteratorPrototype;
  }

  var Gp = GeneratorFunctionPrototype.prototype =
    Generator.prototype = Object.create(IteratorPrototype);
  GeneratorFunction.prototype = GeneratorFunctionPrototype;
  defineProperty(Gp, "constructor", { value: GeneratorFunctionPrototype, configurable: true });
  defineProperty(
    GeneratorFunctionPrototype,
    "constructor",
    { value: GeneratorFunction, configurable: true }
  );
  GeneratorFunction.displayName = define(
    GeneratorFunctionPrototype,
    toStringTagSymbol,
    "GeneratorFunction"
  );

  // Helper for defining the .next, .throw, and .return methods of the
  // Iterator interface in terms of a single ._invoke method.
  function defineIteratorMethods(prototype) {
    ["next", "throw", "return"].forEach(function(method) {
      define(prototype, method, function(arg) {
        return this._invoke(method, arg);
      });
    });
  }

  exports.isGeneratorFunction = function(genFun) {
    var ctor = typeof genFun === "function" && genFun.constructor;
    return ctor
      ? ctor === GeneratorFunction ||
        // For the native GeneratorFunction constructor, the best we can
        // do is to check its .name property.
        (ctor.displayName || ctor.name) === "GeneratorFunction"
      : false;
  };

  exports.mark = function(genFun) {
    if (Object.setPrototypeOf) {
      Object.setPrototypeOf(genFun, GeneratorFunctionPrototype);
    } else {
      genFun.__proto__ = GeneratorFunctionPrototype;
      define(genFun, toStringTagSymbol, "GeneratorFunction");
    }
    genFun.prototype = Object.create(Gp);
    return genFun;
  };

  // Within the body of any async function, `await x` is transformed to
  // `yield regeneratorRuntime.awrap(x)`, so that the runtime can test
  // `hasOwn.call(value, "__await")` to determine if the yielded value is
  // meant to be awaited.
  exports.awrap = function(arg) {
    return { __await: arg };
  };

  function AsyncIterator(generator, PromiseImpl) {
    function invoke(method, arg, resolve, reject) {
      var record = tryCatch(generator[method], generator, arg);
      if (record.type === "throw") {
        reject(record.arg);
      } else {
        var result = record.arg;
        var value = result.value;
        if (value &&
            typeof value === "object" &&
            hasOwn.call(value, "__await")) {
          return PromiseImpl.resolve(value.__await).then(function(value) {
            invoke("next", value, resolve, reject);
          }, function(err) {
            invoke("throw", err, resolve, reject);
          });
        }

        return PromiseImpl.resolve(value).then(function(unwrapped) {
          // When a yielded Promise is resolved, its final value becomes
          // the .value of the Promise<{value,done}> result for the
          // current iteration.
          result.value = unwrapped;
          resolve(result);
        }, function(error) {
          // If a rejected Promise was yielded, throw the rejection back
          // into the async generator function so it can be handled there.
          return invoke("throw", error, resolve, reject);
        });
      }
    }

    var previousPromise;

    function enqueue(method, arg) {
      function callInvokeWithMethodAndArg() {
        return new PromiseImpl(function(resolve, reject) {
          invoke(method, arg, resolve, reject);
        });
      }

      return previousPromise =
        // If enqueue has been called before, then we want to wait until
        // all previous Promises have been resolved before calling invoke,
        // so that results are always delivered in the correct order. If
        // enqueue has not been called before, then it is important to
        // call invoke immediately, without waiting on a callback to fire,
        // so that the async generator function has the opportunity to do
        // any necessary setup in a predictable way. This predictability
        // is why the Promise constructor synchronously invokes its
        // executor callback, and why async functions synchronously
        // execute code before the first await. Since we implement simple
        // async functions in terms of async generators, it is especially
        // important to get this right, even though it requires care.
        previousPromise ? previousPromise.then(
          callInvokeWithMethodAndArg,
          // Avoid propagating failures to Promises returned by later
          // invocations of the iterator.
          callInvokeWithMethodAndArg
        ) : callInvokeWithMethodAndArg();
    }

    // Define the unified helper method that is used to implement .next,
    // .throw, and .return (see defineIteratorMethods).
    defineProperty(this, "_invoke", { value: enqueue });
  }

  defineIteratorMethods(AsyncIterator.prototype);
  define(AsyncIterator.prototype, asyncIteratorSymbol, function () {
    return this;
  });
  exports.AsyncIterator = AsyncIterator;

  // Note that simple async functions are implemented on top of
  // AsyncIterator objects; they just return a Promise for the value of
  // the final result produced by the iterator.
  exports.async = function(innerFn, outerFn, self, tryLocsList, PromiseImpl) {
    if (PromiseImpl === void 0) PromiseImpl = Promise;

    var iter = new AsyncIterator(
      wrap(innerFn, outerFn, self, tryLocsList),
      PromiseImpl
    );

    return exports.isGeneratorFunction(outerFn)
      ? iter // If outerFn is a generator, return the full iterator.
      : iter.next().then(function(result) {
          return result.done ? result.value : iter.next();
        });
  };

  function makeInvokeMethod(innerFn, self, context) {
    var state = GenStateSuspendedStart;

    return function invoke(method, arg) {
      if (state === GenStateExecuting) {
        throw new Error("Generator is already running");
      }

      if (state === GenStateCompleted) {
        if (method === "throw") {
          throw arg;
        }

        // Be forgiving, per 25.3.3.3.3 of the spec:
        // https://people.mozilla.org/~jorendorff/es6-draft.html#sec-generatorresume
        return doneResult();
      }

      context.method = method;
      context.arg = arg;

      while (true) {
        var delegate = context.delegate;
        if (delegate) {
          var delegateResult = maybeInvokeDelegate(delegate, context);
          if (delegateResult) {
            if (delegateResult === ContinueSentinel) continue;
            return delegateResult;
          }
        }

        if (context.method === "next") {
          // Setting context._sent for legacy support of Babel's
          // function.sent implementation.
          context.sent = context._sent = context.arg;

        } else if (context.method === "throw") {
          if (state === GenStateSuspendedStart) {
            state = GenStateCompleted;
            throw context.arg;
          }

          context.dispatchException(context.arg);

        } else if (context.method === "return") {
          context.abrupt("return", context.arg);
        }

        state = GenStateExecuting;

        var record = tryCatch(innerFn, self, context);
        if (record.type === "normal") {
          // If an exception is thrown from innerFn, we leave state ===
          // GenStateExecuting and loop back for another invocation.
          state = context.done
            ? GenStateCompleted
            : GenStateSuspendedYield;

          if (record.arg === ContinueSentinel) {
            continue;
          }

          return {
            value: record.arg,
            done: context.done
          };

        } else if (record.type === "throw") {
          state = GenStateCompleted;
          // Dispatch the exception by looping back around to the
          // context.dispatchException(context.arg) call above.
          context.method = "throw";
          context.arg = record.arg;
        }
      }
    };
  }

  // Call delegate.iterator[context.method](context.arg) and handle the
  // result, either by returning a { value, done } result from the
  // delegate iterator, or by modifying context.method and context.arg,
  // setting context.delegate to null, and returning the ContinueSentinel.
  function maybeInvokeDelegate(delegate, context) {
    var methodName = context.method;
    var method = delegate.iterator[methodName];
    if (method === undefined) {
      // A .throw or .return when the delegate iterator has no .throw
      // method, or a missing .next mehtod, always terminate the
      // yield* loop.
      context.delegate = null;

      // Note: ["return"] must be used for ES3 parsing compatibility.
      if (methodName === "throw" && delegate.iterator["return"]) {
        // If the delegate iterator has a return method, give it a
        // chance to clean up.
        context.method = "return";
        context.arg = undefined;
        maybeInvokeDelegate(delegate, context);

        if (context.method === "throw") {
          // If maybeInvokeDelegate(context) changed context.method from
          // "return" to "throw", let that override the TypeError below.
          return ContinueSentinel;
        }
      }
      if (methodName !== "return") {
        context.method = "throw";
        context.arg = new TypeError(
          "The iterator does not provide a '" + methodName + "' method");
      }

      return ContinueSentinel;
    }

    var record = tryCatch(method, delegate.iterator, context.arg);

    if (record.type === "throw") {
      context.method = "throw";
      context.arg = record.arg;
      context.delegate = null;
      return ContinueSentinel;
    }

    var info = record.arg;

    if (! info) {
      context.method = "throw";
      context.arg = new TypeError("iterator result is not an object");
      context.delegate = null;
      return ContinueSentinel;
    }

    if (info.done) {
      // Assign the result of the finished delegate to the temporary
      // variable specified by delegate.resultName (see delegateYield).
      context[delegate.resultName] = info.value;

      // Resume execution at the desired location (see delegateYield).
      context.next = delegate.nextLoc;

      // If context.method was "throw" but the delegate handled the
      // exception, let the outer generator proceed normally. If
      // context.method was "next", forget context.arg since it has been
      // "consumed" by the delegate iterator. If context.method was
      // "return", allow the original .return call to continue in the
      // outer generator.
      if (context.method !== "return") {
        context.method = "next";
        context.arg = undefined;
      }

    } else {
      // Re-yield the result returned by the delegate method.
      return info;
    }

    // The delegate iterator is finished, so forget it and continue with
    // the outer generator.
    context.delegate = null;
    return ContinueSentinel;
  }

  // Define Generator.prototype.{next,throw,return} in terms of the
  // unified ._invoke helper method.
  defineIteratorMethods(Gp);

  define(Gp, toStringTagSymbol, "Generator");

  // A Generator should always return itself as the iterator object when the
  // @@iterator function is called on it. Some browsers' implementations of the
  // iterator prototype chain incorrectly implement this, causing the Generator
  // object to not be returned from this call. This ensures that doesn't happen.
  // See https://github.com/facebook/regenerator/issues/274 for more details.
  define(Gp, iteratorSymbol, function() {
    return this;
  });

  define(Gp, "toString", function() {
    return "[object Generator]";
  });

  function pushTryEntry(locs) {
    var entry = { tryLoc: locs[0] };

    if (1 in locs) {
      entry.catchLoc = locs[1];
    }

    if (2 in locs) {
      entry.finallyLoc = locs[2];
      entry.afterLoc = locs[3];
    }

    this.tryEntries.push(entry);
  }

  function resetTryEntry(entry) {
    var record = entry.completion || {};
    record.type = "normal";
    delete record.arg;
    entry.completion = record;
  }

  function Context(tryLocsList) {
    // The root entry object (effectively a try statement without a catch
    // or a finally block) gives us a place to store values thrown from
    // locations where there is no enclosing try statement.
    this.tryEntries = [{ tryLoc: "root" }];
    tryLocsList.forEach(pushTryEntry, this);
    this.reset(true);
  }

  exports.keys = function(val) {
    var object = Object(val);
    var keys = [];
    for (var key in object) {
      keys.push(key);
    }
    keys.reverse();

    // Rather than returning an object with a next method, we keep
    // things simple and return the next function itself.
    return function next() {
      while (keys.length) {
        var key = keys.pop();
        if (key in object) {
          next.value = key;
          next.done = false;
          return next;
        }
      }

      // To avoid creating an additional object, we just hang the .value
      // and .done properties off the next function object itself. This
      // also ensures that the minifier will not anonymize the function.
      next.done = true;
      return next;
    };
  };

  function values(iterable) {
    if (iterable || iterable === "") {
      var iteratorMethod = iterable[iteratorSymbol];
      if (iteratorMethod) {
        return iteratorMethod.call(iterable);
      }

      if (typeof iterable.next === "function") {
        return iterable;
      }

      if (!isNaN(iterable.length)) {
        var i = -1, next = function next() {
          while (++i < iterable.length) {
            if (hasOwn.call(iterable, i)) {
              next.value = iterable[i];
              next.done = false;
              return next;
            }
          }

          next.value = undefined;
          next.done = true;

          return next;
        };

        return next.next = next;
      }
    }

    throw new TypeError(typeof iterable + " is not iterable");
  }
  exports.values = values;

  function doneResult() {
    return { value: undefined, done: true };
  }

  Context.prototype = {
    constructor: Context,

    reset: function(skipTempReset) {
      this.prev = 0;
      this.next = 0;
      // Resetting context._sent for legacy support of Babel's
      // function.sent implementation.
      this.sent = this._sent = undefined;
      this.done = false;
      this.delegate = null;

      this.method = "next";
      this.arg = undefined;

      this.tryEntries.forEach(resetTryEntry);

      if (!skipTempReset) {
        for (var name in this) {
          // Not sure about the optimal order of these conditions:
          if (name.charAt(0) === "t" &&
              hasOwn.call(this, name) &&
              !isNaN(+name.slice(1))) {
            this[name] = undefined;
          }
        }
      }
    },

    stop: function() {
      this.done = true;

      var rootEntry = this.tryEntries[0];
      var rootRecord = rootEntry.completion;
      if (rootRecord.type === "throw") {
        throw rootRecord.arg;
      }

      return this.rval;
    },

    dispatchException: function(exception) {
      if (this.done) {
        throw exception;
      }

      var context = this;
      function handle(loc, caught) {
        record.type = "throw";
        record.arg = exception;
        context.next = loc;

        if (caught) {
          // If the dispatched exception was caught by a catch block,
          // then let that catch block handle the exception normally.
          context.method = "next";
          context.arg = undefined;
        }

        return !! caught;
      }

      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        var record = entry.completion;

        if (entry.tryLoc === "root") {
          // Exception thrown outside of any try block that could handle
          // it, so set the completion value of the entire function to
          // throw the exception.
          return handle("end");
        }

        if (entry.tryLoc <= this.prev) {
          var hasCatch = hasOwn.call(entry, "catchLoc");
          var hasFinally = hasOwn.call(entry, "finallyLoc");

          if (hasCatch && hasFinally) {
            if (this.prev < entry.catchLoc) {
              return handle(entry.catchLoc, true);
            } else if (this.prev < entry.finallyLoc) {
              return handle(entry.finallyLoc);
            }

          } else if (hasCatch) {
            if (this.prev < entry.catchLoc) {
              return handle(entry.catchLoc, true);
            }

          } else if (hasFinally) {
            if (this.prev < entry.finallyLoc) {
              return handle(entry.finallyLoc);
            }

          } else {
            throw new Error("try statement without catch or finally");
          }
        }
      }
    },

    abrupt: function(type, arg) {
      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        if (entry.tryLoc <= this.prev &&
            hasOwn.call(entry, "finallyLoc") &&
            this.prev < entry.finallyLoc) {
          var finallyEntry = entry;
          break;
        }
      }

      if (finallyEntry &&
          (type === "break" ||
           type === "continue") &&
          finallyEntry.tryLoc <= arg &&
          arg <= finallyEntry.finallyLoc) {
        // Ignore the finally entry if control is not jumping to a
        // location outside the try/catch block.
        finallyEntry = null;
      }

      var record = finallyEntry ? finallyEntry.completion : {};
      record.type = type;
      record.arg = arg;

      if (finallyEntry) {
        this.method = "next";
        this.next = finallyEntry.finallyLoc;
        return ContinueSentinel;
      }

      return this.complete(record);
    },

    complete: function(record, afterLoc) {
      if (record.type === "throw") {
        throw record.arg;
      }

      if (record.type === "break" ||
          record.type === "continue") {
        this.next = record.arg;
      } else if (record.type === "return") {
        this.rval = this.arg = record.arg;
        this.method = "return";
        this.next = "end";
      } else if (record.type === "normal" && afterLoc) {
        this.next = afterLoc;
      }

      return ContinueSentinel;
    },

    finish: function(finallyLoc) {
      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        if (entry.finallyLoc === finallyLoc) {
          this.complete(entry.completion, entry.afterLoc);
          resetTryEntry(entry);
          return ContinueSentinel;
        }
      }
    },

    "catch": function(tryLoc) {
      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        if (entry.tryLoc === tryLoc) {
          var record = entry.completion;
          if (record.type === "throw") {
            var thrown = record.arg;
            resetTryEntry(entry);
          }
          return thrown;
        }
      }

      // The context.catch method must only be called with a location
      // argument that corresponds to a known catch block.
      throw new Error("illegal catch attempt");
    },

    delegateYield: function(iterable, resultName, nextLoc) {
      this.delegate = {
        iterator: values(iterable),
        resultName: resultName,
        nextLoc: nextLoc
      };

      if (this.method === "next") {
        // Deliberately forget the last sent value so that we don't
        // accidentally pass it on to the delegate.
        this.arg = undefined;
      }

      return ContinueSentinel;
    }
  };

  // Regardless of whether this script is executing as a CommonJS module
  // or not, return the runtime object so that we can declare the variable
  // regeneratorRuntime in the outer scope, which allows this module to be
  // injected easily by `bin/regenerator --include-runtime script.js`.
  return exports;

}(
  // If this script is executing as a CommonJS module, use module.exports
  // as the regeneratorRuntime namespace. Otherwise create a new empty
  // object. Either way, the resulting object will be used to initialize
  // the regeneratorRuntime variable at the top of this file.
   true ? module.exports : 0
));

try {
  regeneratorRuntime = runtime;
} catch (accidentalStrictMode) {
  // This module should not be running in strict mode, so the above
  // assignment should always work unless something is misconfigured. Just
  // in case runtime.js accidentally runs in strict mode, in modern engines
  // we can explicitly access globalThis. In older engines we can escape
  // strict mode using a global Function call. This could conceivably fail
  // if a Content Security Policy forbids using Function, but in that case
  // the proper solution is to fix the accidental strict mode problem. If
  // you've misconfigured your bundler to force strict mode and applied a
  // CSP to forbid Function, and you're not willing to fix either of those
  // problems, please detail your unique predicament in a GitHub issue.
  if (typeof globalThis === "object") {
    globalThis.regeneratorRuntime = runtime;
  } else {
    Function("r", "regeneratorRuntime = r")(runtime);
  }
}


}),
"./node_modules/.pnpm/simple-datatables@10.2.0/node_modules/simple-datatables/dist/module.js": (function (__unused_rspack_module, __webpack_exports__, __webpack_require__) {
"use strict";
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  DataTable: function() { return ot; },
  addColumnFilter: function() { return vt; },
  convertCSV: function() { return rt; },
  convertJSON: function() { return lt; },
  createElement: function() { return s; },
  exportCSV: function() { return dt; },
  exportJSON: function() { return ct; },
  exportSQL: function() { return ht; },
  exportTXT: function() { return ut; },
  isJson: function() { return e; },
  isObject: function() { return t; },
  makeEditable: function() { return mt; }
});
const t=t=>"[object Object]"===Object.prototype.toString.call(t),e=e=>{let s=!1;try{s=JSON.parse(e)}catch{return!1}return!(null===s||!Array.isArray(s)&&!t(s))&&s},s=(t,e)=>{const s=document.createElement(t);if(e&&"object"==typeof e)for(const t in e)"html"===t?s.innerHTML=e[t]:s.setAttribute(t,e[t]);return s},i=t=>["#text","#comment"].includes(t.nodeName)?t.data:t.childNodes?t.childNodes.map(t=>i(t)).join(""):"",n=t=>{if(null==t)return"";if(t.hasOwnProperty("text")||t.hasOwnProperty("data")){const e=t;return e.text??n(e.data)}return t.hasOwnProperty("nodeName")?i(t):String(t)},a=function(t){return t.replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;")},o=function(t,e){let s=0,i=0;for(;s<t+1;){e[i].hidden||(s+=1),i+=1}return i-1},r=function(t){const e={};if(t)for(const s of t)e[s.name]=s.value;return e},l=t=>t?t.trim().split(" ").map(t=>`.${t}`).join(""):null,d=(t,e)=>{const s=e?.split(" ").some(e=>!t.classList.contains(e));return!s},c=(t,e)=>t?e?`${t} ${e}`:t:e||"",h=function(t,e=300){let s;return(...i)=>{clearTimeout(s),s=window.setTimeout(()=>t(),e)}};var u=function(){return u=Object.assign||function(t){for(var e,s=arguments,i=1,n=arguments.length;i<n;i++)for(var a in e=s[i])Object.prototype.hasOwnProperty.call(e,a)&&(t[a]=e[a]);return t},u.apply(this,arguments)};function p(t,e,s){for(var i,n=0,a=e.length;n<a;n++)!i&&n in e||(i||(i=Array.prototype.slice.call(e,0,n)),i[n]=e[n]);return t.concat(i||Array.prototype.slice.call(e))}"function"==typeof SuppressedError&&SuppressedError;var f=function(){function t(t){void 0===t&&(t={});var e=this;Object.entries(t).forEach(function(t){var s=t[0],i=t[1];return e[s]=i})}return t.prototype.toString=function(){return JSON.stringify(this)},t.prototype.setValue=function(t,e){return this[t]=e,this},t}();function m(t,e){var s=arguments;void 0===e&&(e=!1);for(var i=[],n=2;n<arguments.length;n++)i[n-2]=s[n];return null!=t&&(e?!!i.some(function(e){if("Element"===e)return 1===t.nodeType||"string"==typeof t.nodeName&&"#text"!==t.nodeName&&"#comment"!==t.nodeName||t.tagName&&"string"==typeof t.tagName||t.setAttribute&&"function"==typeof t.setAttribute;if("Text"===e)return 3===t.nodeType||"#text"===t.nodeName;if("Comment"===e)return 8===t.nodeType||"#comment"===t.nodeName;if(e.startsWith("HTML")&&e.endsWith("Element")){var s=e.slice(4,-7).toLowerCase();return t.nodeName&&t.nodeName.toLowerCase()===s||t.tagName&&t.tagName.toLowerCase()===s}return!1})||!!t.ownerDocument&&i.some(function(e){var s,i;return"function"==typeof(null===(i=null===(s=null==t?void 0:t.ownerDocument)||void 0===s?void 0:s.defaultView)||void 0===i?void 0:i[e])&&t instanceof t.ownerDocument.defaultView[e]}):i.some(function(e){var s,i;return"function"==typeof(null===(i=null===(s=null==t?void 0:t.ownerDocument)||void 0===s?void 0:s.defaultView)||void 0===i?void 0:i[e])&&t instanceof t.ownerDocument.defaultView[e]}))}function g(t,e,s){var i;return"#text"===t.nodeName?i=s.document.createTextNode(t.data):"#comment"===t.nodeName?i=s.document.createComment(t.data):(e?(i=s.document.createElementNS("http://www.w3.org/2000/svg",t.nodeName),"foreignObject"===t.nodeName&&(e=!1)):"svg"===t.nodeName.toLowerCase()?(i=s.document.createElementNS("http://www.w3.org/2000/svg","svg"),e=!0):i=s.document.createElement(t.nodeName),t.attributes&&Object.entries(t.attributes).forEach(function(t){var e=t[0],s=t[1];return i.setAttribute(e,s)}),t.childNodes&&t.childNodes.forEach(function(t){return i.appendChild(g(t,e,s))}),s.valueDiffing&&(t.value&&m(i,s.simplifiedElementCheck,"HTMLButtonElement","HTMLDataElement","HTMLInputElement","HTMLLIElement","HTMLMeterElement","HTMLOptionElement","HTMLProgressElement","HTMLParamElement")&&(i.value=t.value),t.checked&&m(i,s.simplifiedElementCheck,"HTMLInputElement")&&(i.checked=t.checked),t.selected&&m(i,s.simplifiedElementCheck,"HTMLOptionElement")&&(i.selected=t.selected))),i}var b=function(t,e){for(e=e.slice();e.length>0;){var s=e.splice(0,1)[0];t=t.childNodes[s]}return t};function v(t,e,s){var i,n,a,o=e[s._const.action],r=e[s._const.route];[s._const.addElement,s._const.addTextElement].includes(o)||(i=b(t,r));var l={diff:e,node:i};if(s.preDiffApply(l))return!0;switch(o){case s._const.addAttribute:if(!i||!m(i,s.simplifiedElementCheck,"Element"))return!1;i.setAttribute(e[s._const.name],e[s._const.value]);break;case s._const.modifyAttribute:if(!i||!m(i,s.simplifiedElementCheck,"Element"))return!1;i.setAttribute(e[s._const.name],e[s._const.newValue]),m(i,s.simplifiedElementCheck,"HTMLInputElement")&&"value"===e[s._const.name]&&(i.value=e[s._const.newValue]);break;case s._const.removeAttribute:if(!i||!m(i,s.simplifiedElementCheck,"Element"))return!1;i.removeAttribute(e[s._const.name]);break;case s._const.modifyTextElement:if(!i||!m(i,s.simplifiedElementCheck,"Text"))return!1;s.textDiff(i,i.data,e[s._const.oldValue],e[s._const.newValue]),m(i.parentNode,s.simplifiedElementCheck,"HTMLTextAreaElement")&&(i.parentNode.value=e[s._const.newValue]);break;case s._const.modifyValue:if(!i||void 0===i.value)return!1;i.value=e[s._const.newValue];break;case s._const.modifyComment:if(!i||!m(i,s.simplifiedElementCheck,"Comment"))return!1;s.textDiff(i,i.data,e[s._const.oldValue],e[s._const.newValue]);break;case s._const.modifyChecked:if(!i||void 0===i.checked)return!1;i.checked=e[s._const.newValue];break;case s._const.modifySelected:if(!i||void 0===i.selected)return!1;i.selected=e[s._const.newValue];break;case s._const.replaceElement:var d="svg"===e[s._const.newValue].nodeName.toLowerCase()||"http://www.w3.org/2000/svg"===i.parentNode.namespaceURI;i.parentNode.replaceChild(g(e[s._const.newValue],d,s),i);break;case s._const.relocateGroup:p([],new Array(e[s._const.groupLength])).map(function(){return i.removeChild(i.childNodes[e[s._const.from]])}).forEach(function(t,n){0===n&&(a=i.childNodes[e[s._const.to]]),i.insertBefore(t,a||null)});break;case s._const.removeElement:i.parentNode.removeChild(i);break;case s._const.addElement:var c=(u=r.slice()).splice(u.length-1,1)[0];if(!m(i=b(t,u),s.simplifiedElementCheck,"Element"))return!1;i.insertBefore(g(e[s._const.element],"http://www.w3.org/2000/svg"===i.namespaceURI,s),i.childNodes[c]||null);break;case s._const.removeTextElement:if(!i||3!==i.nodeType)return!1;var h=i.parentNode;h.removeChild(i),m(h,s.simplifiedElementCheck,"HTMLTextAreaElement")&&(h.value="");break;case s._const.addTextElement:var u;c=(u=r.slice()).splice(u.length-1,1)[0];if(n=s.document.createTextNode(e[s._const.value]),!(i=b(t,u)).childNodes)return!1;i.insertBefore(n,i.childNodes[c]||null),m(i.parentNode,s.simplifiedElementCheck,"HTMLTextAreaElement")&&(i.parentNode.value=e[s._const.value]);break;default:console.log("unknown action")}return s.postDiffApply({diff:l.diff,node:l.node,newNode:n}),!0}function w(t,e,s){var i=t[e];t[e]=t[s],t[s]=i}function _(t,e,s){(e=e.slice()).reverse(),e.forEach(function(e){!function(t,e,s){switch(e[s._const.action]){case s._const.addAttribute:e[s._const.action]=s._const.removeAttribute,v(t,e,s);break;case s._const.modifyAttribute:w(e,s._const.oldValue,s._const.newValue),v(t,e,s);break;case s._const.removeAttribute:e[s._const.action]=s._const.addAttribute,v(t,e,s);break;case s._const.modifyTextElement:case s._const.modifyValue:case s._const.modifyComment:case s._const.modifyChecked:case s._const.modifySelected:case s._const.replaceElement:w(e,s._const.oldValue,s._const.newValue),v(t,e,s);break;case s._const.relocateGroup:w(e,s._const.from,s._const.to),v(t,e,s);break;case s._const.removeElement:e[s._const.action]=s._const.addElement,v(t,e,s);break;case s._const.addElement:e[s._const.action]=s._const.removeElement,v(t,e,s);break;case s._const.removeTextElement:e[s._const.action]=s._const.addTextElement,v(t,e,s);break;case s._const.addTextElement:e[s._const.action]=s._const.removeTextElement,v(t,e,s);break;default:console.log("unknown action")}}(t,e,s)})}var y=function(t){var e=[];return e.push(t.nodeName),"#text"!==t.nodeName&&"#comment"!==t.nodeName&&t.attributes&&(t.attributes.class&&e.push("".concat(t.nodeName,".").concat(t.attributes.class.replace(/ /g,"."))),t.attributes.id&&e.push("".concat(t.nodeName,"#").concat(t.attributes.id))),e},M=function(t){var e={},s={};return t.forEach(function(t){y(t).forEach(function(t){var i=t in e;i||t in s?i&&(delete e[t],s[t]=!0):e[t]=!0})}),e},D=function(t,e){var s=M(t),i=M(e),n={};return Object.keys(s).forEach(function(t){i[t]&&(n[t]=!0)}),n},N=function(t){return delete t.outerDone,delete t.innerDone,delete t.valueDone,!t.childNodes||t.childNodes.every(N)},x=function(t){if(Object.prototype.hasOwnProperty.call(t,"data"))return{nodeName:"#text"===t.nodeName?"#text":"#comment",data:t.data};var e={nodeName:t.nodeName};return Object.prototype.hasOwnProperty.call(t,"attributes")&&(e.attributes=u({},t.attributes)),Object.prototype.hasOwnProperty.call(t,"checked")&&(e.checked=t.checked),Object.prototype.hasOwnProperty.call(t,"value")&&(e.value=t.value),Object.prototype.hasOwnProperty.call(t,"selected")&&(e.selected=t.selected),Object.prototype.hasOwnProperty.call(t,"childNodes")&&(e.childNodes=t.childNodes.map(function(t){return x(t)})),e},E=function(t,e){if(!["nodeName","value","checked","selected","data"].every(function(s){return t[s]===e[s]}))return!1;if(Object.prototype.hasOwnProperty.call(t,"data"))return!0;if(Boolean(t.attributes)!==Boolean(e.attributes))return!1;if(Boolean(t.childNodes)!==Boolean(e.childNodes))return!1;if(t.attributes){var s=Object.keys(t.attributes),i=Object.keys(e.attributes);if(s.length!==i.length)return!1;if(!s.every(function(s){return t.attributes[s]===e.attributes[s]}))return!1}if(t.childNodes){if(t.childNodes.length!==e.childNodes.length)return!1;if(!t.childNodes.every(function(t,s){return E(t,e.childNodes[s])}))return!1}return!0},O=function(t,e,s,i,n){if(void 0===n&&(n=!1),!t||!e)return!1;if(t.nodeName!==e.nodeName)return!1;if(["#text","#comment"].includes(t.nodeName))return!!n||t.data===e.data;if(t.nodeName in s)return!0;if(t.attributes&&e.attributes){if(t.attributes.id){if(t.attributes.id!==e.attributes.id)return!1;if("".concat(t.nodeName,"#").concat(t.attributes.id)in s)return!0}if(t.attributes.class&&t.attributes.class===e.attributes.class)if("".concat(t.nodeName,".").concat(t.attributes.class.replace(/ /g,"."))in s)return!0}if(i)return!0;var a=t.childNodes?t.childNodes.slice().reverse():[],o=e.childNodes?e.childNodes.slice().reverse():[];if(a.length!==o.length)return!1;if(n)return a.every(function(t,e){return t.nodeName===o[e].nodeName});var r=D(a,o);return a.every(function(t,e){return O(t,o[e],r,!0,!0)})},V=function(t,e){return p([],new Array(t)).map(function(){return e})},C=function(t,e){for(var s=t.childNodes?t.childNodes:[],i=e.childNodes?e.childNodes:[],n=V(s.length,!1),a=V(i.length,!1),o=[],r=function(){return arguments[1]},l=!1,d=function(){var t=function(t,e,s,i){var n=0,a=[],o=t.length,r=e.length,l=p([],new Array(o+1)).map(function(){return[]}),d=D(t,e),c=o===r;c&&t.some(function(t,s){var i=y(t),n=y(e[s]);return i.length!==n.length?(c=!1,!0):(i.some(function(t,e){if(t!==n[e])return c=!1,!0}),!c||void 0)});for(var h=0;h<o;h++)for(var u=t[h],f=0;f<r;f++){var m=e[f];s[h]||i[f]||!O(u,m,d,c)?l[h+1][f+1]=0:(l[h+1][f+1]=l[h][f]?l[h][f]+1:1,l[h+1][f+1]>=n&&(n=l[h+1][f+1],a=[h+1,f+1]))}return 0!==n&&{oldValue:a[0]-n,newValue:a[1]-n,length:n}}(s,i,n,a);t?(o.push(t),p([],new Array(t.length)).map(r).forEach(function(e){return function(t,e,s,i){t[s.oldValue+i]=!0,e[s.newValue+i]=!0}(n,a,t,e)})):l=!0};!l;)d();return t.subsets=o,t.subsetsAge=100,o},k=function(){function t(){this.list=[]}return t.prototype.add=function(t){var e;(e=this.list).push.apply(e,t)},t.prototype.forEach=function(t){this.list.forEach(function(e){return t(e)})},t}();function $(t,e){var s,i,n=t;for(e=e.slice();e.length>0;)i=e.splice(0,1)[0],s=n,n=n.childNodes?n.childNodes[i]:void 0;return{node:n,parentNode:s,nodeIndex:i}}function S(t,e,s){return e.forEach(function(e){!function(t,e,s){var i,n,a,o;if(![s._const.addElement,s._const.addTextElement].includes(e[s._const.action])){var r=$(t,e[s._const.route]);n=r.node,a=r.parentNode,o=r.nodeIndex}var l,d,c=[],h={diff:e,node:n};if(s.preVirtualDiffApply(h))return!0;switch(e[s._const.action]){case s._const.addAttribute:n.attributes||(n.attributes={}),n.attributes[e[s._const.name]]=e[s._const.value],"checked"===e[s._const.name]?n.checked=!0:"selected"===e[s._const.name]?n.selected=!0:"INPUT"===n.nodeName&&"value"===e[s._const.name]&&(n.value=e[s._const.value]);break;case s._const.modifyAttribute:n.attributes[e[s._const.name]]=e[s._const.newValue];break;case s._const.removeAttribute:delete n.attributes[e[s._const.name]],0===Object.keys(n.attributes).length&&delete n.attributes,"checked"===e[s._const.name]?n.checked=!1:"selected"===e[s._const.name]?delete n.selected:"INPUT"===n.nodeName&&"value"===e[s._const.name]&&delete n.value;break;case s._const.modifyTextElement:n.data=e[s._const.newValue],"TEXTAREA"===a.nodeName&&(a.value=e[s._const.newValue]);break;case s._const.modifyValue:n.value=e[s._const.newValue];break;case s._const.modifyComment:n.data=e[s._const.newValue];break;case s._const.modifyChecked:n.checked=e[s._const.newValue];break;case s._const.modifySelected:n.selected=e[s._const.newValue];break;case s._const.replaceElement:l=x(e[s._const.newValue]),a.childNodes[o]=l;break;case s._const.relocateGroup:n.childNodes.splice(e[s._const.from],e[s._const.groupLength]).reverse().forEach(function(t){return n.childNodes.splice(e[s._const.to],0,t)}),n.subsets&&n.subsets.forEach(function(t){if(e[s._const.from]<e[s._const.to]&&t.oldValue<=e[s._const.to]&&t.oldValue>e[s._const.from])t.oldValue-=e[s._const.groupLength],(i=t.oldValue+t.length-e[s._const.to])>0&&(c.push({oldValue:e[s._const.to]+e[s._const.groupLength],newValue:t.newValue+t.length-i,length:i}),t.length-=i);else if(e[s._const.from]>e[s._const.to]&&t.oldValue>e[s._const.to]&&t.oldValue<e[s._const.from]){var i;t.oldValue+=e[s._const.groupLength],(i=t.oldValue+t.length-e[s._const.to])>0&&(c.push({oldValue:e[s._const.to]+e[s._const.groupLength],newValue:t.newValue+t.length-i,length:i}),t.length-=i)}else t.oldValue===e[s._const.from]&&(t.oldValue=e[s._const.to])});break;case s._const.removeElement:a.childNodes.splice(o,1),a.subsets&&a.subsets.forEach(function(t){t.oldValue>o?t.oldValue-=1:t.oldValue===o?t.delete=!0:t.oldValue<o&&t.oldValue+t.length>o&&(t.oldValue+t.length-1===o?t.length--:(c.push({newValue:t.newValue+o-t.oldValue,oldValue:o,length:t.length-o+t.oldValue-1}),t.length=o-t.oldValue))}),n=a;break;case s._const.addElement:var u=(d=e[s._const.route].slice()).splice(d.length-1,1)[0];n=null===(i=$(t,d))||void 0===i?void 0:i.node,l=x(e[s._const.element]),n.childNodes||(n.childNodes=[]),u>=n.childNodes.length?n.childNodes.push(l):n.childNodes.splice(u,0,l),n.subsets&&n.subsets.forEach(function(t){if(t.oldValue>=u)t.oldValue+=1;else if(t.oldValue<u&&t.oldValue+t.length>u){var e=t.oldValue+t.length-u;c.push({newValue:t.newValue+t.length-e,oldValue:u+1,length:e}),t.length-=e}});break;case s._const.removeTextElement:a.childNodes.splice(o,1),"TEXTAREA"===a.nodeName&&delete a.value,a.subsets&&a.subsets.forEach(function(t){t.oldValue>o?t.oldValue-=1:t.oldValue===o?t.delete=!0:t.oldValue<o&&t.oldValue+t.length>o&&(t.oldValue+t.length-1===o?t.length--:(c.push({newValue:t.newValue+o-t.oldValue,oldValue:o,length:t.length-o+t.oldValue-1}),t.length=o-t.oldValue))}),n=a;break;case s._const.addTextElement:var p=(d=e[s._const.route].slice()).splice(d.length-1,1)[0];l={nodeName:"#text",data:e[s._const.value]},(n=$(t,d).node).childNodes||(n.childNodes=[]),p>=n.childNodes.length?n.childNodes.push(l):n.childNodes.splice(p,0,l),"TEXTAREA"===n.nodeName&&(n.value=e[s._const.newValue]),n.subsets&&n.subsets.forEach(function(t){if(t.oldValue>=p&&(t.oldValue+=1),t.oldValue<p&&t.oldValue+t.length>p){var e=t.oldValue+t.length-p;c.push({newValue:t.newValue+t.length-e,oldValue:p+1,length:e}),t.length-=e}});break;default:console.log("unknown action")}n.subsets&&(n.subsets=n.subsets.filter(function(t){return!t.delete&&t.oldValue!==t.newValue}),c.length&&(n.subsets=n.subsets.concat(c))),s.postVirtualDiffApply({node:h.node,diff:h.diff,newNode:l})}(t,e,s)}),!0}function T(t,e){void 0===e&&(e={valueDiffing:!0,simplifiedElementCheck:!0});var s={nodeName:t.nodeName};if(m(t,e.simplifiedElementCheck,"Text","Comment"))s.data=t.data;else{if(t.attributes&&t.attributes.length>0)s.attributes={},Array.prototype.slice.call(t.attributes).forEach(function(t){return s.attributes[t.name]=t.value});if(t.childNodes&&t.childNodes.length>0)s.childNodes=[],Array.prototype.slice.call(t.childNodes).forEach(function(t){return s.childNodes.push(T(t,e))});e.valueDiffing&&(m(t,e.simplifiedElementCheck,"HTMLTextAreaElement")&&(s.value=t.value),m(t,e.simplifiedElementCheck,"HTMLInputElement")&&["radio","checkbox"].includes(t.type.toLowerCase())&&void 0!==t.checked?s.checked=t.checked:m(t,e.simplifiedElementCheck,"HTMLButtonElement","HTMLDataElement","HTMLInputElement","HTMLLIElement","HTMLMeterElement","HTMLOptionElement","HTMLProgressElement","HTMLParamElement")&&(s.value=t.value),m(t,e.simplifiedElementCheck,"HTMLOptionElement")&&(s.selected=t.selected))}return s}var A=/<\s*\/*[a-zA-Z:_][a-zA-Z0-9:_\-.]*\s*(?:"[^"]*"['"]*|'[^']*'['"]*|[^'"/>])*\/*\s*>|<!--(?:.|\n|\r)*?-->/g,L=/\s([^'"/\s><]+?)[\s/>]|([^\s=]+)=\s?("[^"]*"|'[^']*')/g;function P(t){return t.replace(/&lt;/g,"<").replace(/&gt;/g,">").replace(/&amp;/g,"&")}var R={area:!0,base:!0,br:!0,col:!0,embed:!0,hr:!0,img:!0,input:!0,keygen:!0,link:!0,menuItem:!0,meta:!0,param:!0,source:!0,track:!0,wbr:!0},H=function(t,e){var s={nodeName:"",attributes:{}},i=!1,n=t.match(/<\/?([^\s]+?)[/\s>]/);if(n&&(s.nodeName=e||"svg"===n[1]?n[1]:n[1].toUpperCase(),(R[n[1]]||"/"===t.charAt(t.length-2))&&(i=!0),s.nodeName.startsWith("!--"))){var a=t.indexOf("--\x3e");return{type:"comment",node:{nodeName:"#comment",data:-1!==a?t.slice(4,a):""},voidElement:i}}for(var o=new RegExp(L),r=null,l=!1;!l;)if(null===(r=o.exec(t)))l=!0;else if(r[0].trim())if(r[1]){var d=r[1].trim(),c=[d,""];d.indexOf("=")>-1&&(c=d.split("=")),s.attributes[c[0]]=c[1],o.lastIndex--}else r[2]&&(s.attributes[r[2]]=r[3].trim().substring(1,r[3].length-1));return{type:"tag",node:s,voidElement:i}},I=function(t,e){void 0===e&&(e={valueDiffing:!0,caseSensitive:!1});var s,i=[],n=-1,a=[],o=!1;if(0!==t.indexOf("<")){var r=t.indexOf("<");i.push({nodeName:"#text",data:-1===r?t:t.substring(0,r)})}return t.replace(A,function(r,l){var d="/"!==r.charAt(1),c=r.startsWith("\x3c!--"),h=l+r.length,u=t.charAt(h);if(c){var p=H(r,e.caseSensitive).node;if(n<0)return i.push(p),"";var f=a[n];return f&&p.nodeName&&(f.node.childNodes||(f.node.childNodes=[]),f.node.childNodes.push(p)),""}if(d){if("svg"===(s=H(r,e.caseSensitive||o)).node.nodeName&&(o=!0),n++,!s.voidElement&&u&&"<"!==u){s.node.childNodes||(s.node.childNodes=[]);var m=P(t.slice(h,t.indexOf("<",h)));s.node.childNodes.push({nodeName:"#text",data:m}),e.valueDiffing&&"TEXTAREA"===s.node.nodeName&&(s.node.value=m)}0===n&&s.node.nodeName&&i.push(s.node);var g=a[n-1];g&&s.node.nodeName&&(g.node.childNodes||(g.node.childNodes=[]),g.node.childNodes.push(s.node)),a[n]=s}if((!d||s.voidElement)&&(n>-1&&(s.voidElement||e.caseSensitive&&s.node.nodeName===r.slice(2,-1)||!e.caseSensitive&&s.node.nodeName.toUpperCase()===r.slice(2,-1).toUpperCase())&&--n>-1&&("svg"===s.node.nodeName&&(o=!1),s=a[n]),"<"!==u&&u)){var b=-1===n?i:a[n].node.childNodes||[],v=t.indexOf("<",h);m=P(t.slice(h,-1===v?void 0:v));b.push({nodeName:"#text",data:m})}return""}),i[0]},Y=function(){function t(t,e,s){this.options=s,this.t1="undefined"!=typeof Element&&m(t,this.options.simplifiedElementCheck,"Element")?T(t,this.options):"string"==typeof t?I(t,this.options):JSON.parse(JSON.stringify(t)),this.t2="undefined"!=typeof Element&&m(e,this.options.simplifiedElementCheck,"Element")?T(e,this.options):"string"==typeof e?I(e,this.options):JSON.parse(JSON.stringify(e)),this.diffcount=0,this.foundAll=!1,this.debug&&(this.t1Orig="undefined"!=typeof Element&&m(t,this.options.simplifiedElementCheck,"Element")?T(t,this.options):"string"==typeof t?I(t,this.options):JSON.parse(JSON.stringify(t)),this.t2Orig="undefined"!=typeof Element&&m(e,this.options.simplifiedElementCheck,"Element")?T(e,this.options):"string"==typeof e?I(e,this.options):JSON.parse(JSON.stringify(e))),this.tracker=new k}return t.prototype.init=function(){return this.findDiffs(this.t1,this.t2)},t.prototype.findDiffs=function(t,e){var s;do{if(this.options.debug&&(this.diffcount+=1,this.diffcount>this.options.diffcap))throw new Error("surpassed diffcap:".concat(JSON.stringify(this.t1Orig)," -> ").concat(JSON.stringify(this.t2Orig)));0===(s=this.findNextDiff(t,e,[])).length&&(E(t,e)||(this.foundAll?console.error("Could not find remaining diffs!"):(this.foundAll=!0,N(t),s=this.findNextDiff(t,e,[])))),s.length>0&&(this.foundAll=!1,this.tracker.add(s),S(t,s,this.options))}while(s.length>0);return this.tracker.list},t.prototype.findNextDiff=function(t,e,s){var i,n;if(this.options.maxDepth&&s.length>this.options.maxDepth)return[];if(!t.outerDone){if(i=this.findOuterDiff(t,e,s),this.options.filterOuterDiff&&(n=this.options.filterOuterDiff(t,e,i))&&(i=n),i.length>0)return t.outerDone=!0,i;t.outerDone=!0}if(Object.prototype.hasOwnProperty.call(t,"data"))return[];if(!t.innerDone){if((i=this.findInnerDiff(t,e,s)).length>0)return i;t.innerDone=!0}if(this.options.valueDiffing&&!t.valueDone){if((i=this.findValueDiff(t,e,s)).length>0)return t.valueDone=!0,i;t.valueDone=!0}return[]},t.prototype.findOuterDiff=function(t,e,s){var i,n,a,o,r,l,d=[];if(t.nodeName!==e.nodeName){if(!s.length)throw new Error("Top level nodes have to be of the same kind.");return[(new f).setValue(this.options._const.action,this.options._const.replaceElement).setValue(this.options._const.oldValue,x(t)).setValue(this.options._const.newValue,x(e)).setValue(this.options._const.route,s)]}if(s.length&&this.options.diffcap<Math.abs((t.childNodes||[]).length-(e.childNodes||[]).length))return[(new f).setValue(this.options._const.action,this.options._const.replaceElement).setValue(this.options._const.oldValue,x(t)).setValue(this.options._const.newValue,x(e)).setValue(this.options._const.route,s)];if(Object.prototype.hasOwnProperty.call(t,"data")&&t.data!==e.data)return"#text"===t.nodeName?[(new f).setValue(this.options._const.action,this.options._const.modifyTextElement).setValue(this.options._const.route,s).setValue(this.options._const.oldValue,t.data).setValue(this.options._const.newValue,e.data)]:[(new f).setValue(this.options._const.action,this.options._const.modifyComment).setValue(this.options._const.route,s).setValue(this.options._const.oldValue,t.data).setValue(this.options._const.newValue,e.data)];for(n=t.attributes?Object.keys(t.attributes).sort():[],a=e.attributes?Object.keys(e.attributes).sort():[],o=n.length,l=0;l<o;l++)i=n[l],-1===(r=a.indexOf(i))?d.push((new f).setValue(this.options._const.action,this.options._const.removeAttribute).setValue(this.options._const.route,s).setValue(this.options._const.name,i).setValue(this.options._const.value,t.attributes[i])):(a.splice(r,1),t.attributes[i]!==e.attributes[i]&&d.push((new f).setValue(this.options._const.action,this.options._const.modifyAttribute).setValue(this.options._const.route,s).setValue(this.options._const.name,i).setValue(this.options._const.oldValue,t.attributes[i]).setValue(this.options._const.newValue,e.attributes[i])));for(o=a.length,l=0;l<o;l++)i=a[l],d.push((new f).setValue(this.options._const.action,this.options._const.addAttribute).setValue(this.options._const.route,s).setValue(this.options._const.name,i).setValue(this.options._const.value,e.attributes[i]));return d},t.prototype.findInnerDiff=function(t,e,s){var i=t.childNodes?t.childNodes.slice():[],n=e.childNodes?e.childNodes.slice():[],a=Math.max(i.length,n.length),o=Math.abs(i.length-n.length),r=[],l=0;if(!this.options.maxChildCount||a<this.options.maxChildCount){var d=Boolean(t.subsets&&t.subsetsAge--),c=d?t.subsets:t.childNodes&&e.childNodes?C(t,e):[];if(c.length>0&&(r=this.attemptGroupRelocation(t,e,c,s,d)).length>0)return r}for(var h=0;h<a;h+=1){var u=i[h],p=n[h];o&&(u&&!p?"#text"===u.nodeName?(r.push((new f).setValue(this.options._const.action,this.options._const.removeTextElement).setValue(this.options._const.route,s.concat(l)).setValue(this.options._const.value,u.data)),l-=1):(r.push((new f).setValue(this.options._const.action,this.options._const.removeElement).setValue(this.options._const.route,s.concat(l)).setValue(this.options._const.element,x(u))),l-=1):p&&!u&&("#text"===p.nodeName?r.push((new f).setValue(this.options._const.action,this.options._const.addTextElement).setValue(this.options._const.route,s.concat(l)).setValue(this.options._const.value,p.data)):r.push((new f).setValue(this.options._const.action,this.options._const.addElement).setValue(this.options._const.route,s.concat(l)).setValue(this.options._const.element,x(p))))),u&&p&&(!this.options.maxChildCount||a<this.options.maxChildCount?r=r.concat(this.findNextDiff(u,p,s.concat(l))):E(u,p)||(i.length>n.length?("#text"===u.nodeName?r.push((new f).setValue(this.options._const.action,this.options._const.removeTextElement).setValue(this.options._const.route,s.concat(l)).setValue(this.options._const.value,u.data)):r.push((new f).setValue(this.options._const.action,this.options._const.removeElement).setValue(this.options._const.element,x(u)).setValue(this.options._const.route,s.concat(l))),i.splice(h,1),h-=1,l-=1,o-=1):i.length<n.length?(r=r.concat([(new f).setValue(this.options._const.action,this.options._const.addElement).setValue(this.options._const.element,x(p)).setValue(this.options._const.route,s.concat(l))]),i.splice(h,0,x(p)),o-=1):r=r.concat([(new f).setValue(this.options._const.action,this.options._const.replaceElement).setValue(this.options._const.oldValue,x(u)).setValue(this.options._const.newValue,x(p)).setValue(this.options._const.route,s.concat(l))]))),l+=1}return t.innerDone=!0,r},t.prototype.attemptGroupRelocation=function(t,e,s,i,n){for(var a,o,r,l,d,c=function(t,e,s){var i=t.childNodes?V(t.childNodes.length,!0):[],n=e.childNodes?V(e.childNodes.length,!0):[],a=0;return s.forEach(function(t){for(var e=t.oldValue+t.length,s=t.newValue+t.length,o=t.oldValue;o<e;o+=1)i[o]=a;for(o=t.newValue;o<s;o+=1)n[o]=a;a+=1}),{gaps1:i,gaps2:n}}(t,e,s),h=c.gaps1,u=c.gaps2,p=t.childNodes.slice(),m=e.childNodes.slice(),g=Math.min(h.length,u.length),b=[],v=0,w=0;v<g;w+=1,v+=1)if(!n||!0!==h[v]&&!0!==u[v]){if(!0===h[w])if("#text"===(l=p[w]).nodeName)if("#text"===m[v].nodeName){if(l.data!==m[v].data){for(var _=w;p.length>_+1&&"#text"===p[_+1].nodeName;)if(_+=1,m[v].data===p[_].data){d=!0;break}d||b.push((new f).setValue(this.options._const.action,this.options._const.modifyTextElement).setValue(this.options._const.route,i.concat(w)).setValue(this.options._const.oldValue,l.data).setValue(this.options._const.newValue,m[v].data))}}else b.push((new f).setValue(this.options._const.action,this.options._const.removeTextElement).setValue(this.options._const.route,i.concat(w)).setValue(this.options._const.value,l.data)),h.splice(w,1),p.splice(w,1),g=Math.min(h.length,u.length),w-=1,v-=1;else!0===u[v]?b.push((new f).setValue(this.options._const.action,this.options._const.replaceElement).setValue(this.options._const.oldValue,x(l)).setValue(this.options._const.newValue,x(m[v])).setValue(this.options._const.route,i.concat(w))):(b.push((new f).setValue(this.options._const.action,this.options._const.removeElement).setValue(this.options._const.route,i.concat(w)).setValue(this.options._const.element,x(l))),h.splice(w,1),p.splice(w,1),g=Math.min(h.length,u.length),w-=1,v-=1);else if(!0===u[v])"#text"===(l=m[v]).nodeName?(b.push((new f).setValue(this.options._const.action,this.options._const.addTextElement).setValue(this.options._const.route,i.concat(w)).setValue(this.options._const.value,l.data)),h.splice(w,0,!0),p.splice(w,0,{nodeName:"#text",data:l.data}),g=Math.min(h.length,u.length)):(b.push((new f).setValue(this.options._const.action,this.options._const.addElement).setValue(this.options._const.route,i.concat(w)).setValue(this.options._const.element,x(l))),h.splice(w,0,!0),p.splice(w,0,x(l)),g=Math.min(h.length,u.length));else if(h[w]!==u[v]){if(b.length>0)return b;if(r=s[h[w]],(o=Math.min(r.newValue,p.length-r.length))!==r.oldValue&&o>-1){a=!1;for(var y=0;y<r.length;y+=1)O(p[o+y],p[r.oldValue+y],{},!1,!0)||(a=!0);if(a)return[(new f).setValue(this.options._const.action,this.options._const.relocateGroup).setValue(this.options._const.groupLength,r.length).setValue(this.options._const.from,r.oldValue).setValue(this.options._const.to,o).setValue(this.options._const.route,i)]}}}else;return b},t.prototype.findValueDiff=function(t,e,s){var i=[];return t.selected!==e.selected&&i.push((new f).setValue(this.options._const.action,this.options._const.modifySelected).setValue(this.options._const.oldValue,t.selected).setValue(this.options._const.newValue,e.selected).setValue(this.options._const.route,s)),(t.value||e.value)&&t.value!==e.value&&"OPTION"!==t.nodeName&&i.push((new f).setValue(this.options._const.action,this.options._const.modifyValue).setValue(this.options._const.oldValue,t.value||"").setValue(this.options._const.newValue,e.value||"").setValue(this.options._const.route,s)),t.checked!==e.checked&&i.push((new f).setValue(this.options._const.action,this.options._const.modifyChecked).setValue(this.options._const.oldValue,t.checked).setValue(this.options._const.newValue,e.checked).setValue(this.options._const.route,s)),i},t}(),j={debug:!1,diffcap:10,maxDepth:!1,maxChildCount:50,valueDiffing:!0,simplifiedElementCheck:!1,textDiff:function(t,e,s,i){t.data=i},preVirtualDiffApply:function(){},postVirtualDiffApply:function(){},preDiffApply:function(){},postDiffApply:function(){},filterOuterDiff:null,compress:!1,_const:!1,document:!("undefined"==typeof window||!window.document)&&window.document,components:[]},q=function(){function t(t){if(void 0===t&&(t={}),Object.entries(j).forEach(function(e){var s=e[0],i=e[1];Object.prototype.hasOwnProperty.call(t,s)||(t[s]=i)}),!t._const){var e=["addAttribute","modifyAttribute","removeAttribute","modifyTextElement","relocateGroup","removeElement","addElement","removeTextElement","addTextElement","replaceElement","modifyValue","modifyChecked","modifySelected","modifyComment","action","route","oldValue","newValue","element","group","groupLength","from","to","name","value","data","attributes","nodeName","childNodes","checked","selected"],s={};t.compress?e.forEach(function(t,e){return s[t]=e}):e.forEach(function(t){return s[t]=t}),t._const=s}this.options=t}return t.prototype.apply=function(t,e){return function(t,e,s){return e.every(function(e){return v(t,e,s)})}(t,e,this.options)},t.prototype.undo=function(t,e){return _(t,e,this.options)},t.prototype.diff=function(t,e){return new Y(t,e,this.options).init()},t}();const F=(t,e,s,{classes:i,format:n,hiddenHeader:a,sortable:o,scrollY:r,type:l},{noColumnWidths:d,unhideHeader:h})=>({nodeName:"TR",childNodes:t.map((t,n)=>{const l=e[n]||{sortable:!0};if(l.hidden||"true"===t.attributes?.["data-colspan-placeholder"])return;const u=t.attributes?{...t.attributes}:{};if(l.sortable&&o&&(!r.length||h)&&(l.filter?u["data-filterable"]="true":u["data-sortable"]="true"),l.headerClass&&(u.class=c(u.class,l.headerClass)),s.sort&&s.sort.column===n){const t="asc"===s.sort.dir?i.ascending:i.descending;u.class=c(u.class,t),u["aria-sort"]="asc"===s.sort.dir?"ascending":"descending"}else s.filters[n]&&(u.class=c(u.class,i.filterActive));if(s.widths[n]&&!d){const t=`width: ${s.widths[n]}%;`;u.style=c(u.style,t)}if(r.length&&!h){const t="padding-bottom: 0;padding-top: 0;border: 0;";u.style=c(u.style,t)}const p="html"===t.type?t.data:[{nodeName:"#text",data:t.text??String(t.data)}];return{nodeName:"TH",attributes:u,childNodes:!a&&!r.length||h?l.sortable&&o?[{nodeName:"BUTTON",attributes:{class:l.filter?i.filter:i.sorter},childNodes:p}]:p:[{nodeName:"#text",data:""}]}}).filter(t=>t)}),B=(t,e,s,i,a,o,{classes:r,hiddenHeader:l,header:d,footer:h,format:u,sortable:p,scrollY:f,type:m,rowRender:g,tabIndex:b},{noColumnWidths:v,unhideHeader:w,renderHeader:_},y,M)=>{const D={nodeName:"TABLE",attributes:{...t},childNodes:[{nodeName:"TBODY",childNodes:s.map(({row:t,index:e})=>{const s={nodeName:"TR",attributes:{...t.attributes,"data-index":String(e)},childNodes:t.cells.map((t,s)=>{const o=i[s]||{type:m,format:u,sortable:!0,searchable:!0};if(o.hidden||"true"===t.attributes?.["data-colspan-placeholder"])return;if("true"===t.attributes?.["data-rowspan-placeholder"])return;const r={nodeName:"TD",attributes:t.attributes?{...t.attributes}:{},childNodes:"html"===o.type?t.data:[{nodeName:"#text",data:n(t)}]};if(d||h||!a.widths[s]||v||(r.attributes.style=c(r.attributes.style,`width: ${a.widths[s]}%;`)),o.cellClass&&(r.attributes.class=c(r.attributes.class,o.cellClass)),o.render){const i=o.render(t.data,r,e,s);if(i){if("string"!=typeof i)return i;{const t=I(`<td>${i}</td>`);1===t.childNodes.length&&["#text","#comment"].includes(t.childNodes[0].nodeName)?r.childNodes[0].data=i:r.childNodes=t.childNodes}}}return r}).filter(t=>t)};if(e===o&&(s.attributes.class=c(s.attributes.class,r.cursor)),g){const i=g(t,s,e);if(i){if("string"!=typeof i)return i;{const t=I(`<tr>${i}</tr>`);!t.childNodes||1===t.childNodes.length&&["#text","#comment"].includes(t.childNodes[0].nodeName)?s.childNodes[0].data=i:s.childNodes=t.childNodes}}}return s})}]};if(D.attributes.class=c(D.attributes.class,r.table),d||h||_){const t=F(e,i,a,{classes:r,hiddenHeader:l,sortable:p,scrollY:f},{noColumnWidths:v,unhideHeader:w});if(d||_){const e={nodeName:"THEAD",childNodes:[t]};!f.length&&!l||w||(e.attributes={style:"height: 0px;"}),D.childNodes.unshift(e)}if(h){const e={nodeName:"TFOOT",childNodes:[d?structuredClone(t):t]};!f.length&&!l||w||(e.attributes={style:"height: 0px;"}),D.childNodes.push(e)}}return y.forEach(t=>D.childNodes.push(t)),M.forEach(t=>D.childNodes.push(t)),!1!==b&&(D.attributes.tabindex=String(b)),D};"undefined"!=typeof globalThis?globalThis:"undefined"!=typeof window?window:"undefined"!=typeof __webpack_require__.g?__webpack_require__.g:"undefined"!=typeof self&&self;function z(t){return t&&t.__esModule&&Object.prototype.hasOwnProperty.call(t,"default")?t.default:t}var U={exports:{}},W=z(U.exports=function(){var t=1e3,e=6e4,s=36e5,i="millisecond",n="second",a="minute",o="hour",r="day",l="week",d="month",c="quarter",h="year",u="date",p="Invalid Date",f=/^(\d{4})[-/]?(\d{1,2})?[-/]?(\d{0,2})[Tt\s]*(\d{1,2})?:?(\d{1,2})?:?(\d{1,2})?[.:]?(\d+)?$/,m=/\[([^\]]+)]|Y{1,4}|M{1,4}|D{1,2}|d{1,4}|H{1,2}|h{1,2}|a|A|m{1,2}|s{1,2}|Z{1,2}|SSS/g,g={name:"en",weekdays:"Sunday_Monday_Tuesday_Wednesday_Thursday_Friday_Saturday".split("_"),months:"January_February_March_April_May_June_July_August_September_October_November_December".split("_"),ordinal:function(t){var e=["th","st","nd","rd"],s=t%100;return"["+t+(e[(s-20)%10]||e[s]||e[0])+"]"}},b=function(t,e,s){var i=String(t);return!i||i.length>=e?t:""+Array(e+1-i.length).join(s)+t},v={s:b,z:function(t){var e=-t.utcOffset(),s=Math.abs(e),i=Math.floor(s/60),n=s%60;return(e<=0?"+":"-")+b(i,2,"0")+":"+b(n,2,"0")},m:function t(e,s){if(e.date()<s.date())return-t(s,e);var i=12*(s.year()-e.year())+(s.month()-e.month()),n=e.clone().add(i,d),a=s-n<0,o=e.clone().add(i+(a?-1:1),d);return+(-(i+(s-n)/(a?n-o:o-n))||0)},a:function(t){return t<0?Math.ceil(t)||0:Math.floor(t)},p:function(t){return{M:d,y:h,w:l,d:r,D:u,h:o,m:a,s:n,ms:i,Q:c}[t]||String(t||"").toLowerCase().replace(/s$/,"")},u:function(t){return void 0===t}},w="en",_={};_[w]=g;var y="$isDayjsObject",M=function(t){return t instanceof E||!(!t||!t[y])},D=function t(e,s,i){var n;if(!e)return w;if("string"==typeof e){var a=e.toLowerCase();_[a]&&(n=a),s&&(_[a]=s,n=a);var o=e.split("-");if(!n&&o.length>1)return t(o[0])}else{var r=e.name;_[r]=e,n=r}return!i&&n&&(w=n),n||!i&&w},N=function(t,e){if(M(t))return t.clone();var s="object"==typeof e?e:{};return s.date=t,s.args=arguments,new E(s)},x=v;x.l=D,x.i=M,x.w=function(t,e){return N(t,{locale:e.$L,utc:e.$u,x:e.$x,$offset:e.$offset})};var E=function(){function g(t){this.$L=D(t.locale,null,!0),this.parse(t),this.$x=this.$x||t.x||{},this[y]=!0}var b=g.prototype;return b.parse=function(t){this.$d=function(t){var e=t.date,s=t.utc;if(null===e)return new Date(NaN);if(x.u(e))return new Date;if(e instanceof Date)return new Date(e);if("string"==typeof e&&!/Z$/i.test(e)){var i=e.match(f);if(i){var n=i[2]-1||0,a=(i[7]||"0").substring(0,3);return s?new Date(Date.UTC(i[1],n,i[3]||1,i[4]||0,i[5]||0,i[6]||0,a)):new Date(i[1],n,i[3]||1,i[4]||0,i[5]||0,i[6]||0,a)}}return new Date(e)}(t),this.init()},b.init=function(){var t=this.$d;this.$y=t.getFullYear(),this.$M=t.getMonth(),this.$D=t.getDate(),this.$W=t.getDay(),this.$H=t.getHours(),this.$m=t.getMinutes(),this.$s=t.getSeconds(),this.$ms=t.getMilliseconds()},b.$utils=function(){return x},b.isValid=function(){return!(this.$d.toString()===p)},b.isSame=function(t,e){var s=N(t);return this.startOf(e)<=s&&s<=this.endOf(e)},b.isAfter=function(t,e){return N(t)<this.startOf(e)},b.isBefore=function(t,e){return this.endOf(e)<N(t)},b.$g=function(t,e,s){return x.u(t)?this[e]:this.set(s,t)},b.unix=function(){return Math.floor(this.valueOf()/1e3)},b.valueOf=function(){return this.$d.getTime()},b.startOf=function(t,e){var s=this,i=!!x.u(e)||e,c=x.p(t),p=function(t,e){var n=x.w(s.$u?Date.UTC(s.$y,e,t):new Date(s.$y,e,t),s);return i?n:n.endOf(r)},f=function(t,e){return x.w(s.toDate()[t].apply(s.toDate("s"),(i?[0,0,0,0]:[23,59,59,999]).slice(e)),s)},m=this.$W,g=this.$M,b=this.$D,v="set"+(this.$u?"UTC":"");switch(c){case h:return i?p(1,0):p(31,11);case d:return i?p(1,g):p(0,g+1);case l:var w=this.$locale().weekStart||0,_=(m<w?m+7:m)-w;return p(i?b-_:b+(6-_),g);case r:case u:return f(v+"Hours",0);case o:return f(v+"Minutes",1);case a:return f(v+"Seconds",2);case n:return f(v+"Milliseconds",3);default:return this.clone()}},b.endOf=function(t){return this.startOf(t,!1)},b.$set=function(t,e){var s,l=x.p(t),c="set"+(this.$u?"UTC":""),p=(s={},s[r]=c+"Date",s[u]=c+"Date",s[d]=c+"Month",s[h]=c+"FullYear",s[o]=c+"Hours",s[a]=c+"Minutes",s[n]=c+"Seconds",s[i]=c+"Milliseconds",s)[l],f=l===r?this.$D+(e-this.$W):e;if(l===d||l===h){var m=this.clone().set(u,1);m.$d[p](f),m.init(),this.$d=m.set(u,Math.min(this.$D,m.daysInMonth())).$d}else p&&this.$d[p](f);return this.init(),this},b.set=function(t,e){return this.clone().$set(t,e)},b.get=function(t){return this[x.p(t)]()},b.add=function(i,c){var u,p=this;i=Number(i);var f=x.p(c),m=function(t){var e=N(p);return x.w(e.date(e.date()+Math.round(t*i)),p)};if(f===d)return this.set(d,this.$M+i);if(f===h)return this.set(h,this.$y+i);if(f===r)return m(1);if(f===l)return m(7);var g=(u={},u[a]=e,u[o]=s,u[n]=t,u)[f]||1,b=this.$d.getTime()+i*g;return x.w(b,this)},b.subtract=function(t,e){return this.add(-1*t,e)},b.format=function(t){var e=this,s=this.$locale();if(!this.isValid())return s.invalidDate||p;var i=t||"YYYY-MM-DDTHH:mm:ssZ",n=x.z(this),a=this.$H,o=this.$m,r=this.$M,l=s.weekdays,d=s.months,c=s.meridiem,h=function(t,s,n,a){return t&&(t[s]||t(e,i))||n[s].slice(0,a)},u=function(t){return x.s(a%12||12,t,"0")},f=c||function(t,e,s){var i=t<12?"AM":"PM";return s?i.toLowerCase():i};return i.replace(m,function(t,i){return i||function(t){switch(t){case"YY":return String(e.$y).slice(-2);case"YYYY":return x.s(e.$y,4,"0");case"M":return r+1;case"MM":return x.s(r+1,2,"0");case"MMM":return h(s.monthsShort,r,d,3);case"MMMM":return h(d,r);case"D":return e.$D;case"DD":return x.s(e.$D,2,"0");case"d":return String(e.$W);case"dd":return h(s.weekdaysMin,e.$W,l,2);case"ddd":return h(s.weekdaysShort,e.$W,l,3);case"dddd":return l[e.$W];case"H":return String(a);case"HH":return x.s(a,2,"0");case"h":return u(1);case"hh":return u(2);case"a":return f(a,o,!0);case"A":return f(a,o,!1);case"m":return String(o);case"mm":return x.s(o,2,"0");case"s":return String(e.$s);case"ss":return x.s(e.$s,2,"0");case"SSS":return x.s(e.$ms,3,"0");case"Z":return n}return null}(t)||n.replace(":","")})},b.utcOffset=function(){return 15*-Math.round(this.$d.getTimezoneOffset()/15)},b.diff=function(i,u,p){var f,m=this,g=x.p(u),b=N(i),v=(b.utcOffset()-this.utcOffset())*e,w=this-b,_=function(){return x.m(m,b)};switch(g){case h:f=_()/12;break;case d:f=_();break;case c:f=_()/3;break;case l:f=(w-v)/6048e5;break;case r:f=(w-v)/864e5;break;case o:f=w/s;break;case a:f=w/e;break;case n:f=w/t;break;default:f=w}return p?f:x.a(f)},b.daysInMonth=function(){return this.endOf(d).$D},b.$locale=function(){return _[this.$L]},b.locale=function(t,e){if(!t)return this.$L;var s=this.clone(),i=D(t,e,!0);return i&&(s.$L=i),s},b.clone=function(){return x.w(this.$d,this)},b.toDate=function(){return new Date(this.valueOf())},b.toJSON=function(){return this.isValid()?this.toISOString():null},b.toISOString=function(){return this.$d.toISOString()},b.toString=function(){return this.$d.toUTCString()},g}(),O=E.prototype;return N.prototype=O,[["$ms",i],["$s",n],["$m",a],["$H",o],["$W",r],["$M",d],["$y",h],["$D",u]].forEach(function(t){O[t[1]]=function(e){return this.$g(e,t[0],t[1])}}),N.extend=function(t,e){return t.$i||(t(e,E,N),t.$i=!0),N},N.locale=D,N.isDayjs=M,N.unix=function(t){return N(1e3*t)},N.en=_[w],N.Ls=_,N.p={},N}()),J={exports:{}},Q=z(J.exports=function(){var t={LTS:"h:mm:ss A",LT:"h:mm A",L:"MM/DD/YYYY",LL:"MMMM D, YYYY",LLL:"MMMM D, YYYY h:mm A",LLLL:"dddd, MMMM D, YYYY h:mm A"},e=/(\[[^[]*\])|([-_:/.,()\s]+)|(A|a|Q|YYYY|YY?|ww?|MM?M?M?|Do|DD?|hh?|HH?|mm?|ss?|S{1,3}|z|ZZ?)/g,s=/\d/,i=/\d\d/,n=/\d\d?/,a=/\d*[^-_:/,()\s\d]+/,o={},r=function(t){return(t=+t)+(t>68?1900:2e3)},l=function(t){return function(e){this[t]=+e}},d=[/[+-]\d\d:?(\d\d)?|Z/,function(t){(this.zone||(this.zone={})).offset=function(t){if(!t)return 0;if("Z"===t)return 0;var e=t.match(/([+-]|\d\d)/g),s=60*e[1]+(+e[2]||0);return 0===s?0:"+"===e[0]?-s:s}(t)}],c=function(t){var e=o[t];return e&&(e.indexOf?e:e.s.concat(e.f))},h=function(t,e){var s,i=o.meridiem;if(i){for(var n=1;n<=24;n+=1)if(t.indexOf(i(n,0,e))>-1){s=n>12;break}}else s=t===(e?"pm":"PM");return s},u={A:[a,function(t){this.afternoon=h(t,!1)}],a:[a,function(t){this.afternoon=h(t,!0)}],Q:[s,function(t){this.month=3*(t-1)+1}],S:[s,function(t){this.milliseconds=100*+t}],SS:[i,function(t){this.milliseconds=10*+t}],SSS:[/\d{3}/,function(t){this.milliseconds=+t}],s:[n,l("seconds")],ss:[n,l("seconds")],m:[n,l("minutes")],mm:[n,l("minutes")],H:[n,l("hours")],h:[n,l("hours")],HH:[n,l("hours")],hh:[n,l("hours")],D:[n,l("day")],DD:[i,l("day")],Do:[a,function(t){var e=o.ordinal,s=t.match(/\d+/);if(this.day=s[0],e)for(var i=1;i<=31;i+=1)e(i).replace(/\[|\]/g,"")===t&&(this.day=i)}],w:[n,l("week")],ww:[i,l("week")],M:[n,l("month")],MM:[i,l("month")],MMM:[a,function(t){var e=c("months"),s=(c("monthsShort")||e.map(function(t){return t.slice(0,3)})).indexOf(t)+1;if(s<1)throw new Error;this.month=s%12||s}],MMMM:[a,function(t){var e=c("months").indexOf(t)+1;if(e<1)throw new Error;this.month=e%12||e}],Y:[/[+-]?\d+/,l("year")],YY:[i,function(t){this.year=r(t)}],YYYY:[/\d{4}/,l("year")],Z:d,ZZ:d};function p(s){var i,n;i=s,n=o&&o.formats;for(var a=(s=i.replace(/(\[[^\]]+])|(LTS?|l{1,4}|L{1,4})/g,function(e,s,i){var a=i&&i.toUpperCase();return s||n[i]||t[i]||n[a].replace(/(\[[^\]]+])|(MMMM|MM|DD|dddd)/g,function(t,e,s){return e||s.slice(1)})})).match(e),r=a.length,l=0;l<r;l+=1){var d=a[l],c=u[d],h=c&&c[0],p=c&&c[1];a[l]=p?{regex:h,parser:p}:d.replace(/^\[|\]$/g,"")}return function(t){for(var e={},s=0,i=0;s<r;s+=1){var n=a[s];if("string"==typeof n)i+=n.length;else{var o=n.regex,l=n.parser,d=t.slice(i),c=o.exec(d)[0];l.call(e,c),t=t.replace(c,"")}}return function(t){var e=t.afternoon;if(void 0!==e){var s=t.hours;e?s<12&&(t.hours+=12):12===s&&(t.hours=0),delete t.afternoon}}(e),e}}return function(t,e,s){s.p.customParseFormat=!0,t&&t.parseTwoDigitYear&&(r=t.parseTwoDigitYear);var i=e.prototype,n=i.parse;i.parse=function(t){var e=t.date,i=t.utc,a=t.args;this.$u=i;var r=a[1];if("string"==typeof r){var l=!0===a[2],d=!0===a[3],c=l||d,h=a[2];d&&(h=a[2]),o=this.$locale(),!l&&h&&(o=s.Ls[h]),this.$d=function(t,e,s,i){try{if(["x","X"].indexOf(e)>-1)return new Date(("X"===e?1e3:1)*t);var n=p(e)(t),a=n.year,o=n.month,r=n.day,l=n.hours,d=n.minutes,c=n.seconds,h=n.milliseconds,u=n.zone,f=n.week,m=new Date,g=r||(a||o?1:m.getDate()),b=a||m.getFullYear(),v=0;a&&!o||(v=o>0?o-1:m.getMonth());var w,_=l||0,y=d||0,M=c||0,D=h||0;return u?new Date(Date.UTC(b,v,g,_,y,M,D+60*u.offset*1e3)):s?new Date(Date.UTC(b,v,g,_,y,M,D)):(w=new Date(b,v,g,_,y,M,D),f&&(w=i(w).week(f).toDate()),w)}catch(t){return new Date("")}}(e,r,i,s),this.init(),h&&!0!==h&&(this.$L=this.locale(h).$L),c&&e!=this.format(r)&&(this.$d=new Date("")),o={}}else if(r instanceof Array)for(var u=r.length,f=1;f<=u;f+=1){a[1]=r[f-1];var m=s.apply(this,a);if(m.isValid()){this.$d=m.$d,this.$L=m.$L,this.init();break}f===u&&(this.$d=new Date(""))}else n.call(this,t)}}}());W.extend(Q);const X=(t,e)=>{let s;if(e)switch(e){case"ISO_8601":s=t;break;case"RFC_2822":s=W(t.slice(5),"DD MMM YYYY HH:mm:ss ZZ").unix();break;case"MYSQL":s=W(t,"YYYY-MM-DD hh:mm:ss").unix();break;case"UNIX":s=W(t).unix();break;default:s=W(t,e,!0).valueOf()}return s},Z=(t,e)=>{let s,n,a;if(t?.constructor===Object&&Object.prototype.hasOwnProperty.call(t,"data")&&!Object.keys(t).find(t=>!["text","order","data","attributes"].includes(t))){const e=t;if(n=e.data,a=e.attributes,void 0!==e.text&&void 0!==e.order)return e;s={data:e.data,text:e.text,order:e.order,attributes:e.attributes}}else n=t,s={data:t};if(void 0===s.text||void 0===s.order)switch(e.type){case"string":"string"!=typeof n&&(s.text=s.text??String(s.data),s.order=s.order??s.text);break;case"date":e.format&&(s.order=s.order??X(String(s.data),e.format));break;case"number":s.text=s.text??String(s.data),s.data=parseFloat(s.data),s.order=s.order??s.data;break;case"html":{const t=Array.isArray(s.data)?{nodeName:"TD",childNodes:s.data}:I(`<td>${String(s.data)}</td>`);s.data=t.childNodes||[];const e=i(t);s.text=s.text??e,s.order=s.order??e;break}case"boolean":"string"==typeof s.data&&(s.data=s.data.toLowerCase().trim()),s.data=!["false",!1,null,void 0,0].includes(s.data),s.order=s.order??(s.data?1:0),s.text=s.text??String(s.data);break;case"other":s.text=s.text??"",s.order=s.order??0;break;default:s.text=s.text??JSON.stringify(s.data)}return a&&(s.attributes=a),s},G=(t,e)=>{let s;switch(e.type){case"string":s={data:t.innerText};break;case"date":{const i=t.innerText;s={data:i,order:X(i,e.format)};break}case"number":{const e=parseFloat(t.innerText);s={data:e,order:e,text:t.innerText};break}case"boolean":{const e=!["false","0","null","undefined"].includes(t.innerText.toLowerCase().trim());s={data:e,text:e?"1":"0",order:e?1:0};break}default:s={data:T(t,{valueDiffing:!1}).childNodes||[],text:t.innerText,order:t.innerText};break}return s.attributes=r(t.attributes),s},K=t=>{if(t instanceof Object&&t.constructor===Object&&t.hasOwnProperty("data")){const e=t;return"string"==typeof e.data&&(e.text||(e.text=e.data),e.type||(e.type="string")),e}const e={data:t};if("string"==typeof t){if(t.length){const s=I(`<th>${t}</th>`);if(s.childNodes&&(1!==s.childNodes.length||"#text"!==s.childNodes[0].nodeName)){e.data=s.childNodes,e.type="html";const t=i(s);e.text=t}}}else[null,void 0].includes(t)?e.text="":e.text=JSON.stringify(t);return e},tt=(t,e=void 0,s,n,a)=>{const o={data:[],headings:[]};if(t.headings){const e=[];t.headings.forEach(t=>{const s=K(t),i=parseInt(s.attributes?.colspan||"1",10);e.push(s);for(let t=1;t<i;t++)e.push({data:"",text:"",attributes:{"data-colspan-placeholder":"true"}})}),o.headings=e}else if(e?.tHead){const t=[];Array.from(e.tHead.querySelectorAll("th")).forEach(e=>{const s=parseInt(e.getAttribute("colspan")||"1",10),n=(t=>{const e=T(t,{valueDiffing:!1});let s;return s=!e.childNodes||1===e.childNodes.length&&"#text"===e.childNodes[0].nodeName?{data:t.innerText,type:"string"}:{data:e.childNodes,type:"html",text:i(e)},s.attributes=e.attributes,s})(e);t.push(n);for(let e=1;e<s;e++)t.push({data:"",text:"",attributes:{"data-colspan-placeholder":"true"}})}),o.headings=t;let r=0;Array.from(e.tHead.querySelectorAll("th")).forEach(t=>{const e=parseInt(t.getAttribute("colspan")||"1",10);for(let i=0;i<e;i++){s[r]||(s[r]={type:n,format:a,searchable:!0,sortable:!0});const e=s[r];0===i&&("false"!==t.dataset.sortable?.trim().toLowerCase()&&"false"!==t.dataset.sort?.trim().toLowerCase()||(e.sortable=!1),"false"===t.dataset.searchable?.trim().toLowerCase()&&(e.searchable=!1),"true"!==t.dataset.hidden?.trim().toLowerCase()&&"true"!==t.getAttribute("hidden")?.trim().toLowerCase()||(e.hidden=!0),t.dataset.type&&["number","string","html","date","boolean","other"].includes(t.dataset.type)&&(e.type=t.dataset.type,"date"===e.type&&t.dataset.format&&(e.format=t.dataset.format))),r++}})}else if(t.data?.length){const e=t.data[0],s=Array.isArray(e)?e:e.cells;o.headings=s.map(t=>K(""))}else e?.tBodies.length&&(o.headings=Array.from(e.tBodies[0].rows[0].cells).map(t=>K("")));for(let t=0;t<o.headings.length;t++)s[t]||(s[t]={type:n,format:a,sortable:!0,searchable:!0});if(t.data){const e=o.headings.map(t=>t.data?String(t.data):t.text),i=new Map;o.data=t.data.map((t,n)=>{let a,r;Array.isArray(t)?(a={},r=t):t.hasOwnProperty("cells")&&Object.keys(t).every(t=>["cells","attributes"].includes(t))?(a=t.attributes,r=t.cells):(a={},r=[],Object.entries(t).forEach(([t,s])=>{const i=e.indexOf(t);i>-1&&(r[i]=s)}));const l=[];let d=0,c=0;for(;d<o.headings.length;)if(i.has(d)){const t=i.get(d);l.push({data:"",text:"",order:"",attributes:{"data-rowspan-placeholder":"true"}}),t.remainingRows--,t.remainingRows<=0&&i.delete(d),d++}else{if(!(c<r.length))break;{const t=r[c],e=Z(t,s[d]),n=parseInt(e.attributes?.colspan||"1",10),a=parseInt(e.attributes?.rowspan||"1",10);l.push(e),a>1&&i.set(d,{remainingRows:a-1,cellData:e}),d++,c++;for(let t=1;t<n;t++)l.push({data:"",text:"",order:"",attributes:{"data-colspan-placeholder":"true"}}),d++}}return{attributes:a,cells:l}})}else if(e?.tBodies?.length){const t=new Map;o.data=Array.from(e.tBodies[0].rows).map(e=>{const i=[];let n=0,a=0;const l=Array.from(e.cells);for(;n<o.headings.length;)if(t.has(n)){const e=t.get(n);i.push({data:"",text:"",order:"",attributes:{"data-rowspan-placeholder":"true"}}),e.remainingRows--,e.remainingRows<=0&&t.delete(n),n++}else{if(!(a<l.length))break;{const e=l[a],o=parseInt(e.getAttribute("colspan")||"1",10),r=parseInt(e.getAttribute("rowspan")||"1",10),d=e.dataset.content?Z(e.dataset.content,s[n]):G(e,s[n]);e.dataset.order&&(d.order=isNaN(parseFloat(e.dataset.order))?e.dataset.order:parseFloat(e.dataset.order)),i.push(d),r>1&&t.set(n,{remainingRows:r-1,cellData:d}),n++,a++;for(let t=1;t<o;t++)i.push({data:"",text:"",order:"",attributes:{"data-colspan-placeholder":"true"}}),n++}}return{attributes:r(e.attributes),cells:i}})}if(o.data.length&&o.data[0].cells.length!==o.headings.length)throw new Error("Data heading length mismatch.");return o};class et{cursor;dt;constructor(t){this.dt=t,this.cursor=!1}setCursor(t=!1){if(t===this.cursor)return;const e=this.cursor;if(this.cursor=t,this.dt._renderTable(),!1!==t&&this.dt.options.scrollY){const t=l(this.dt.options.classes.cursor),e=this.dt.dom.querySelector(`tr${t}`);e&&e.scrollIntoView({block:"nearest"})}this.dt.emit("datatable.cursormove",this.cursor,e)}add(t){if(!Array.isArray(t)||t.length<1)return;const e={cells:t.map((t,e)=>{const s=this.dt.columns.settings[e];return Z(t,s)})};this.dt.data.data.push(e),this.dt.hasRows=!0,this.dt.update(!0)}remove(t){if(!Array.isArray(t))return this.remove([t]);this.dt.data.data=this.dt.data.data.filter((e,s)=>!t.includes(s)),this.dt.data.data.length||(this.dt.hasRows=!1),this.dt.update(!0)}findRowIndex(t,e){return this.dt.data.data.findIndex(s=>{const i=s.cells[t];return n(i).toLowerCase().includes(String(e).toLowerCase())})}findRow(t,e){const s=this.findRowIndex(t,e);if(s<0)return{index:-1,row:null,cols:[]};const i=this.dt.data.data[s],n=i.cells.map(t=>t.data);return{index:s,row:i,cols:n}}updateRow(t,e){const s={cells:e.map((t,e)=>{const s=this.dt.columns.settings[e];return Z(t,s)})};this.dt.data.data.splice(t,1,s),this.dt.update(!0)}}class st{dt;settings;_state;constructor(t){this.dt=t,this.init()}init(){[this.settings,this._state]=((t=[],e,s)=>{let i=[],n=!1;const a=[];return t.forEach(t=>{(Array.isArray(t.select)?t.select:[t.select]).forEach(o=>{i[o]?t.type&&(i[o].type=t.type):i[o]={type:t.type||e,sortable:!0,searchable:!0};const r=i[o];t.render&&(r.render=t.render),t.format?r.format=t.format:"date"===t.type&&(r.format=s),t.cellClass&&(r.cellClass=t.cellClass),t.headerClass&&(r.headerClass=t.headerClass),t.locale&&(r.locale=t.locale),!1===t.sortable?r.sortable=!1:(t.numeric&&(r.numeric=t.numeric),t.caseFirst&&(r.caseFirst=t.caseFirst)),!1===t.searchable?r.searchable=!1:t.sensitivity&&(r.sensitivity=t.sensitivity),(r.searchable||r.sortable)&&void 0!==t.ignorePunctuation&&(r.ignorePunctuation=t.ignorePunctuation),t.searchMethod&&(r.searchMethod=t.searchMethod),t.hidden&&(r.hidden=!0),t.filter&&(r.filter=t.filter),t.sortSequence&&(r.sortSequence=t.sortSequence),t.sort&&(t.filter?a[o]=t.sort:n={column:o,dir:t.sort}),void 0!==t.searchItemSeparator&&(r.searchItemSeparator=t.searchItemSeparator)})}),i=i.map(t=>t||{type:e,format:"date"===e?s:void 0,sortable:!0,searchable:!0}),[i,{filters:a,sort:n,widths:[]}]})(this.dt.options.columns,this.dt.options.type,this.dt.options.format)}get(t){return t<0||t>=this.size()?null:{...this.settings[t]}}size(){return this.settings.length}swap(t){if(2===t.length){const e=this.dt.data.headings.map((t,e)=>e),s=t[0],i=t[1],n=e[i];return e[i]=e[s],e[s]=n,this.order(e)}}order(t){this.dt.data.headings=t.map(t=>this.dt.data.headings[t]),this.dt.data.data.forEach(e=>e.cells=t.map(t=>e.cells[t])),this.settings=t.map(t=>this.settings[t]),this.dt.update()}hide(t){Array.isArray(t)||(t=[t]),t.length&&(t.forEach(t=>{this.settings[t]||(this.settings[t]={type:"string"});this.settings[t].hidden=!0}),this.dt.update())}show(t){Array.isArray(t)||(t=[t]),t.length&&(t.forEach(t=>{this.settings[t]||(this.settings[t]={type:"string",sortable:!0});delete this.settings[t].hidden}),this.dt.update())}visible(t){return void 0===t&&(t=[...Array(this.dt.data.headings.length).keys()]),Array.isArray(t)?t.map(t=>!this.settings[t]?.hidden):!this.settings[t]?.hidden}add(t){const e=this.dt.data.headings.length;if(this.dt.data.headings=this.dt.data.headings.concat([K(t.heading)]),this.dt.data.data.forEach((e,s)=>{e.cells=e.cells.concat([Z(t.data[s],t)])}),this.settings[e]={type:t.type||"string",sortable:!0,searchable:!0},t.type||t.format||t.sortable||t.render||t.filter){const s=this.settings[e];t.render&&(s.render=t.render),t.format&&(s.format=t.format),t.cellClass&&(s.cellClass=t.cellClass),t.headerClass&&(s.headerClass=t.headerClass),t.locale&&(s.locale=t.locale),!1===t.sortable?s.sortable=!1:(t.numeric&&(s.numeric=t.numeric),t.caseFirst&&(s.caseFirst=t.caseFirst)),!1===t.searchable?s.searchable=!1:t.sensitivity&&(s.sensitivity=t.sensitivity),(s.searchable||s.sortable)&&t.ignorePunctuation&&(s.ignorePunctuation=t.ignorePunctuation),t.hidden&&(s.hidden=!0),t.filter&&(s.filter=t.filter),t.sortSequence&&(s.sortSequence=t.sortSequence)}this.dt.update(!0)}remove(t){Array.isArray(t)||(t=[t]),this.dt.data.headings=this.dt.data.headings.filter((e,s)=>!t.includes(s)),this.dt.data.data.forEach(e=>e.cells=e.cells.filter((e,s)=>!t.includes(s))),this.dt.update(!0)}filter(t,e=!1){if(!this.settings[t]?.filter?.length)return;const s=this._state.filters[t];let i;if(s){let e=!1;i=this.settings[t].filter.find(t=>!!e||(t===s&&(e=!0),!1))}else{const e=this.settings[t].filter;i=e?e[0]:void 0}i?this._state.filters[t]=i:s&&(this._state.filters[t]=void 0),this.dt._currentPage=1,this.dt.update(),e||this.dt.emit("datatable.filter",t,i)}sort(t,e=void 0,s=!1){const i=this.settings[t];if(s||this.dt.emit("datatable.sorting",t,e),!e){const s=!(!this._state.sort||this._state.sort.column!==t)&&this._state.sort?.dir,n=i?.sortSequence||["asc","desc"];if(s){const t=n.indexOf(s);e=-1===t?n[0]||"asc":t===n.length-1?n[0]:n[t+1]}else e=n.length?n[0]:"asc"}const a=!(!i||!["string","html"].includes(i.type))&&new Intl.Collator(i.locale||this.dt.options.locale,{usage:"sort",numeric:i.numeric||this.dt.options.numeric,caseFirst:i.caseFirst||this.dt.options.caseFirst,ignorePunctuation:i.ignorePunctuation||this.dt.options.ignorePunctuation}),o=[],r=new Map;this.dt.data.data.forEach((t,e)=>{if(t.cells.some(t=>"true"===t.attributes?.["data-rowspan-placeholder"])){for(let t=e-1;t>=0;t--)if(r.has(t)){const s=r.get(t);return o[s].push(e),void r.set(e,s)}const t=o.length;o.push([e]),r.set(e,t)}else{if(t.cells.some(t=>t.attributes?.rowspan&&parseInt(t.attributes.rowspan,10)>1)){const t=o.length;o.push([e]),r.set(e,t)}else{const t=o.length;o.push([e]),r.set(e,t)}}}),o.sort((s,i)=>{const o=(t,e)=>{const s=this.dt.data.data[t].cells[e];if("true"===s.attributes?.["data-rowspan-placeholder"]){for(let s=t-1;s>=0;s--){const t=this.dt.data.data[s].cells[e];if("true"!==t.attributes?.["data-rowspan-placeholder"])return t.order??n(t)}return""}return s.order??n(s)};let r=o(s[0],t),l=o(i[0],t);if("desc"===e){const t=r;r=l,l=t}return a&&"number"!=typeof r&&"number"!=typeof l?a.compare(String(r),String(l)):r<l?-1:r>l?1:0});const l=[];o.forEach(t=>{t.forEach(t=>{l.push(this.dt.data.data[t])})}),this.dt.data.data=l,this._state.sort={column:t,dir:e},this.dt._searchQueries.length?(this.dt.multiSearch(this.dt._searchQueries),this.dt.emit("datatable.sort",t,e)):s||(this.dt._currentPage=1,this.dt.update(),this.dt.emit("datatable.sort",t,e))}_measureWidths(){const t=this.dt.data.headings.filter((t,e)=>!this.settings[e]?.hidden);if((this.dt.options.scrollY.length||this.dt.options.fixedColumns)&&t?.length){this._state.widths=[];const t={noPaging:!0};if(this.dt.options.header||this.dt.options.footer){this.dt.options.scrollY.length&&(t.unhideHeader=!0),this.dt.headerDOM&&this.dt.headerDOM.parentElement.removeChild(this.dt.headerDOM),t.noColumnWidths=!0,this.dt._renderTable(t);const e=Array.from(this.dt.dom.querySelector("thead, tfoot")?.firstElementChild?.querySelectorAll("th")||[]);let s=0;const i=this.dt.data.headings.map((t,i)=>{if(this.settings[i]?.hidden)return 0;const n=e[s].offsetWidth;return s+=1,n}),n=i.reduce((t,e)=>t+e,0);this._state.widths=i.map(t=>t/n*100)}else{t.renderHeader=!0,this.dt._renderTable(t);const e=Array.from(this.dt.dom.querySelector("thead, tfoot")?.firstElementChild?.querySelectorAll("th")||[]);let s=0;const i=this.dt.data.headings.map((t,i)=>{if(this.settings[i]?.hidden)return 0;const n=e[s].offsetWidth;return s+=1,n}),n=i.reduce((t,e)=>t+e,0);this._state.widths=i.map(t=>t/n*100)}this.dt._renderTable()}}}const it={sortable:!0,locale:"en",numeric:!0,caseFirst:"false",searchable:!0,sensitivity:"base",ignorePunctuation:!0,destroyable:!0,searchItemSeparator:"",searchQuerySeparator:" ",searchAnd:!1,searchMethod:!1,data:{},type:"html",format:"YYYY-MM-DD",columns:[],paging:!0,perPage:10,perPageSelect:[5,10,15,20,25],nextPrev:!0,firstLast:!1,prevText:"‹",nextText:"›",firstText:"«",lastText:"»",ellipsisText:"…",truncatePager:!0,pagerDelta:2,scrollY:"",fixedColumns:!0,fixedHeight:!1,footer:!1,header:!0,hiddenHeader:!1,caption:void 0,rowNavigation:!1,rowSelectionKeys:["Enter"," "],tabIndex:!1,pagerRender:!1,rowRender:!1,tableRender:!1,diffDomOptions:{valueDiffing:!1,simplifiedElementCheck:!1},labels:{placeholder:"Search...",searchTitle:"Search within table",perPage:"entries per page",pageTitle:"Page {page}",noRows:"No entries found",noResults:"No results match your search query",info:"Showing {start} to {end} of {rows} entries"},template:(t,e)=>`<div class='${t.classes.top}'>\n    ${t.paging&&t.perPageSelect?`<div class='${t.classes.dropdown}'>\n            <label>\n                <select class='${t.classes.selector}' name="per-page"></select> ${t.labels.perPage}\n            </label>\n        </div>`:""}\n    ${t.searchable?`<div class='${t.classes.search}'>\n            <input class='${t.classes.input}' placeholder='${t.labels.placeholder}' type='search' name="search" title='${t.labels.searchTitle}'${e.id?` aria-controls="${e.id}"`:""}>\n        </div>`:""}\n</div>\n<div class='${t.classes.container}'${t.scrollY.length?` style='height: ${t.scrollY}; overflow-Y: auto;'`:""}></div>\n<div class='${t.classes.bottom}'>\n    ${t.paging?`<div class='${t.classes.info}'></div>`:""}\n    <nav class='${t.classes.pagination}'></nav>\n</div>`,classes:{active:"datatable-active",ascending:"datatable-ascending",bottom:"datatable-bottom",container:"datatable-container",cursor:"datatable-cursor",descending:"datatable-descending",disabled:"datatable-disabled",dropdown:"datatable-dropdown",ellipsis:"datatable-ellipsis",filter:"datatable-filter",filterActive:"datatable-filter-active",empty:"datatable-empty",headercontainer:"datatable-headercontainer",hidden:"datatable-hidden",info:"datatable-info",input:"datatable-input",loading:"datatable-loading",pagination:"datatable-pagination",paginationList:"datatable-pagination-list",paginationListItem:"datatable-pagination-list-item",paginationListItemLink:"datatable-pagination-list-item-link",search:"datatable-search",selector:"datatable-selector",sorter:"datatable-sorter",table:"datatable-table",top:"datatable-top",wrapper:"datatable-wrapper"}},nt=(t,e,s,i={})=>({nodeName:"LI",attributes:{class:i.active&&!i.hidden?`${s.classes.paginationListItem} ${s.classes.active}`:i.hidden?`${s.classes.paginationListItem} ${s.classes.hidden} ${s.classes.disabled}`:s.classes.paginationListItem},childNodes:[{nodeName:"BUTTON",attributes:{"data-page":String(t),class:s.classes.paginationListItemLink,"aria-label":s.labels.pageTitle.replace("{page}",String(t))},childNodes:[{nodeName:"#text",data:e}]}]}),at=(t,e,s,i,n)=>{let a=[];if(n.firstLast&&a.push(nt(1,n.firstText,n)),n.nextPrev){const e=t?1:s-1;a.push(nt(e,n.prevText,n,{hidden:t}))}let o=[...Array(i).keys()].map(t=>nt(t+1,String(t+1),n,{active:t===s-1}));if(n.truncatePager&&(o=((t,e,s,i)=>{const n=i.pagerDelta,a=i.classes,o=i.ellipsisText,r=2*n;let l=e-n,d=e+n;e<4-n+r?d=3+r:e>s-(3-n+r)&&(l=s-(2+r));const c=[];for(let e=1;e<=s;e++)if(1==e||e==s||e>=l&&e<=d){const s=t[e-1];c.push(s)}let h;const u=[];return c.forEach(e=>{const s=parseInt(e.childNodes[0].attributes["data-page"],10);if(h){const e=parseInt(h.childNodes[0].attributes["data-page"],10);if(s-e==2)u.push(t[e]);else if(s-e!=1){const t={nodeName:"LI",attributes:{class:`${a.paginationListItem} ${a.ellipsis} ${a.disabled}`},childNodes:[{nodeName:"BUTTON",attributes:{class:a.paginationListItemLink},childNodes:[{nodeName:"#text",data:o}]}]};u.push(t)}}u.push(e),h=e}),u})(o,s,i,n)),a=a.concat(o),n.nextPrev){const t=e?i:s+1;a.push(nt(t,n.nextText,n,{hidden:e}))}n.firstLast&&a.push(nt(i,n.lastText,n));return{nodeName:"UL",attributes:{class:n.classes.paginationList},childNodes:o.length>1?a:[]}};class ot{columns;containerDOM;_currentPage;data;_dd;dom;_events;hasHeadings;hasRows;headerDOM;_initialHTML;initialized;_label;lastPage;_listeners;onFirstPage;onLastPage;options;_pagerDOMs;_virtualPagerDOM;pages;_rect;rows;_searchData;_searchQueries;_tableAttributes;_tableFooters;_tableCaptions;totalPages;_virtualDOM;_virtualHeaderDOM;wrapperDOM;constructor(t,e={}){const s="string"==typeof t?document.querySelector(t):t;s instanceof HTMLTableElement?this.dom=s:(this.dom=document.createElement("table"),s.appendChild(this.dom));const i={...it.diffDomOptions,...e.diffDomOptions},n={...it.labels,...e.labels},a={...it.classes,...e.classes};this.options={...it,...e,diffDomOptions:i,labels:n,classes:a},this._initialHTML=this.options.destroyable?s.outerHTML:"",this.options.tabIndex?this.dom.tabIndex=this.options.tabIndex:this.options.rowNavigation&&-1===this.dom.tabIndex&&(this.dom.tabIndex=0),this._listeners={onResize:()=>this._onResize()},this._dd=new q(this.options.diffDomOptions||{}),this.initialized=!1,this._events={},this._currentPage=0,this.onFirstPage=!0,this.hasHeadings=!1,this.hasRows=!1,this._searchQueries=[],this.init()}init(){if(this.initialized||d(this.dom,this.options.classes.table))return!1;this._virtualDOM=T(this.dom,this.options.diffDomOptions||{}),this._tableAttributes={...this._virtualDOM.attributes},this._tableFooters=this._virtualDOM.childNodes?.filter(t=>"TFOOT"===t.nodeName)??[],this._tableCaptions=this._virtualDOM.childNodes?.filter(t=>"CAPTION"===t.nodeName)??[],void 0!==this.options.caption&&this._tableCaptions.push({nodeName:"CAPTION",childNodes:[{nodeName:"#text",data:this.options.caption}]}),this.rows=new et(this),this.columns=new st(this),this.data=tt(this.options.data,this.dom,this.columns.settings,this.options.type,this.options.format),this._render(),setTimeout(()=>{this.emit("datatable.init"),this.initialized=!0},10)}_render(){this.wrapperDOM=s("div",{class:`${this.options.classes.wrapper} ${this.options.classes.loading}`}),this.wrapperDOM.innerHTML=this.options.template(this.options,this.dom);const t=l(this.options.classes.selector),e=this.wrapperDOM.querySelector(`select${t}`);e&&this.options.paging&&this.options.perPageSelect?this.options.perPageSelect.forEach(t=>{const[s,i]=Array.isArray(t)?[t[0],t[1]]:[String(t),t],n=i===this.options.perPage,a=new Option(s,String(i),n,n);e.appendChild(a)}):e&&e.parentElement.removeChild(e);const i=l(this.options.classes.container);this.containerDOM=this.wrapperDOM.querySelector(i),this._pagerDOMs=[];const n=l(this.options.classes.pagination);Array.from(this.wrapperDOM.querySelectorAll(n)).forEach(t=>{t instanceof HTMLElement&&(t.innerHTML=`<ul class="${this.options.classes.paginationList}"></ul>`,this._pagerDOMs.push(t.firstElementChild))}),this._virtualPagerDOM={nodeName:"UL",attributes:{class:this.options.classes.paginationList}};const a=l(this.options.classes.info);this._label=this.wrapperDOM.querySelector(a),this.dom.parentElement.replaceChild(this.wrapperDOM,this.dom),this.containerDOM.appendChild(this.dom),this._rect=this.dom.getBoundingClientRect(),this._fixHeight(),this.options.header||this.wrapperDOM.classList.add("no-header"),this.options.footer||this.wrapperDOM.classList.add("no-footer"),this.options.sortable&&this.wrapperDOM.classList.add("sortable"),this.options.searchable&&this.wrapperDOM.classList.add("searchable"),this.options.fixedHeight&&this.wrapperDOM.classList.add("fixed-height"),this.options.fixedColumns&&this.wrapperDOM.classList.add("fixed-columns"),this._bindEvents(),this.columns._state.sort&&this.columns.sort(this.columns._state.sort.column,this.columns._state.sort.dir,!0),this.update(!0)}_renderTable(t={}){let e;e=(this.options.paging||this._searchQueries.length||this.columns._state.filters.length)&&this._currentPage&&this.pages.length&&!t.noPaging?this.pages[this._currentPage-1]:this.data.data.map((t,e)=>({row:t,index:e}));let s=B(this._tableAttributes,this.data.headings,e,this.columns.settings,this.columns._state,this.rows.cursor,this.options,t,this._tableFooters,this._tableCaptions);if(this.options.tableRender){const t=this.options.tableRender(this.data,s,"main");t&&(s=t)}const i=this._dd.diff(this._virtualDOM,s);this._dd.apply(this.dom,i),this._virtualDOM=s}_renderPage(t=!1){this.hasRows&&this.totalPages?(this._currentPage>this.totalPages&&(this._currentPage=1),this._renderTable(),this.onFirstPage=1===this._currentPage,this.onLastPage=this._currentPage===this.lastPage):this.setMessage(this.options.labels.noRows);let e,s=0,i=0,n=0;if(this.totalPages&&(s=this._currentPage-1,i=s*this.options.perPage,n=i+this.pages[s].length,i+=1,e=this._searchQueries.length?this._searchData.length:this.data.data.length),this._label&&this.options.labels.info.length){const t=this.options.labels.info.replace("{start}",String(i)).replace("{end}",String(n)).replace("{page}",String(this._currentPage)).replace("{pages}",String(this.totalPages)).replace("{rows}",String(e));this._label.innerHTML=e?t:""}if(1==this._currentPage&&this._fixHeight(),this.options.rowNavigation&&this._currentPage&&(!this.rows.cursor||!this.pages[this._currentPage-1].find(t=>t.index===this.rows.cursor))){const e=this.pages[this._currentPage-1];e.length&&(t?this.rows.setCursor(e[e.length-1].index):this.rows.setCursor(e[0].index))}}_renderPagers(){if(!this.options.paging)return;let t=at(this.onFirstPage,this.onLastPage,this._currentPage,this.totalPages,this.options);if(this.options.pagerRender){const e=this.options.pagerRender([this.onFirstPage,this.onLastPage,this._currentPage,this.totalPages],t);e&&(t=e)}const e=this._dd.diff(this._virtualPagerDOM,t);this._pagerDOMs.forEach(t=>{this._dd.apply(t,e)}),this._virtualPagerDOM=t}_renderSeparateHeader(){const t=this.dom.parentElement;this.headerDOM||(this.headerDOM=document.createElement("div"),this._virtualHeaderDOM={nodeName:"DIV"}),t.parentElement.insertBefore(this.headerDOM,t);let e={nodeName:"TABLE",attributes:this._tableAttributes,childNodes:[{nodeName:"THEAD",childNodes:[F(this.data.headings,this.columns.settings,this.columns._state,this.options,{unhideHeader:!0})]}]};if(e.attributes.class?.includes(this.options.classes.table)||(e.attributes.class=c(e.attributes.class,this.options.classes.table)),this.options.tableRender){const t=this.options.tableRender(this.data,e,"header");t&&(e=t)}const s={nodeName:"DIV",attributes:{class:this.options.classes.headercontainer},childNodes:[e]},i=this._dd.diff(this._virtualHeaderDOM,s);this._dd.apply(this.headerDOM,i),this._virtualHeaderDOM=s;const n=this.headerDOM.firstElementChild.clientWidth-this.dom.clientWidth;if(n){const t=structuredClone(this._virtualHeaderDOM);t.attributes.style=`padding-right: ${n}px;`;const e=this._dd.diff(this._virtualHeaderDOM,t);this._dd.apply(this.headerDOM,e),this._virtualHeaderDOM=t}t.scrollHeight>t.clientHeight&&(t.style.overflowY="scroll")}_bindEvents(){if(this.options.perPageSelect){const t=l(this.options.classes.selector),e=this.wrapperDOM.querySelector(t);e&&e instanceof HTMLSelectElement&&e.addEventListener("change",()=>{this.emit("datatable.perpage:before",this.options.perPage),this.options.perPage=parseInt(e.value,10),this.update(),this._fixHeight(),this.emit("datatable.perpage",this.options.perPage)},!1)}this.options.searchable&&this.wrapperDOM.addEventListener("input",t=>{const e=l(this.options.classes.input),s=t.target;if(!(s instanceof HTMLInputElement&&s.matches(e)))return;t.preventDefault();const i=[];if(Array.from(this.wrapperDOM.querySelectorAll(e)).filter(t=>t.value.length).forEach(t=>{const e=t.dataset.and||this.options.searchAnd,s=t.dataset.querySeparator||this.options.searchQuerySeparator?t.value.split(this.options.searchQuerySeparator):[t.value];e?s.forEach(e=>{t.dataset.columns?i.push({terms:[e],columns:JSON.parse(t.dataset.columns)}):i.push({terms:[e],columns:void 0})}):t.dataset.columns?i.push({terms:s,columns:JSON.parse(t.dataset.columns)}):i.push({terms:s,columns:void 0})}),1===i.length&&1===i[0].terms.length){const t=i[0];this.search(t.terms[0],t.columns)}else this.multiSearch(i)}),this.wrapperDOM.addEventListener("click",t=>{const e=t.target.closest("a, button");if(e)if(e.hasAttribute("data-page"))this.page(parseInt(e.getAttribute("data-page"),10)),t.preventDefault();else if(d(e,this.options.classes.sorter)){const s=Array.from(e.parentElement.parentElement.children).indexOf(e.parentElement),i=o(s,this.columns.settings);this.columns.sort(i),t.preventDefault()}else if(d(e,this.options.classes.filter)){const s=Array.from(e.parentElement.parentElement.children).indexOf(e.parentElement),i=o(s,this.columns.settings);this.columns.filter(i),t.preventDefault()}},!1),this.options.rowNavigation&&this.dom.addEventListener("keydown",t=>{if("ArrowUp"===t.key){let e;t.preventDefault(),t.stopPropagation(),this.pages[this._currentPage-1].find(t=>t.index===this.rows.cursor||(e=t,!1)),e?this.rows.setCursor(e.index):this.onFirstPage||this.page(this._currentPage-1,!0)}else if("ArrowDown"===t.key){let e;t.preventDefault(),t.stopPropagation();const s=this.pages[this._currentPage-1].find(t=>!!e||(t.index===this.rows.cursor&&(e=!0),!1));s?this.rows.setCursor(s.index):this.onLastPage||this.page(this._currentPage+1)}else this.options.rowSelectionKeys.includes(t.key)&&this.emit("datatable.selectrow",this.rows.cursor,t,!0)}),this.dom.addEventListener("mousedown",t=>{const e=t.target;if(!(e instanceof Element))return;const s=Array.from(this.dom.querySelectorAll("tbody > tr")).find(t=>t.contains(e));s&&s instanceof HTMLElement&&this.emit("datatable.selectrow",parseInt(s.dataset.index,10),t,this.dom.matches(":focus"))}),window.addEventListener("resize",this._listeners.onResize)}_onResize=h(()=>{this._rect=this.containerDOM.getBoundingClientRect(),this._rect.width&&this.update(!0)},250);destroy(){if(this.options.destroyable){if(this.emit("datatable.destroy:before"),this.wrapperDOM){const t=this.wrapperDOM.parentElement;if(t){const e=s("div");e.innerHTML=this._initialHTML;const i=e.firstElementChild;t.replaceChild(i,this.wrapperDOM),this.dom=i}else this.options.classes.table?.split(" ").forEach(t=>this.wrapperDOM.classList.remove(t))}window.removeEventListener("resize",this._listeners.onResize),this.initialized=!1,this.emit("datatable.destroy")}}update(t=!1){this.emit("datatable.update:before"),t&&(this.columns._measureWidths(),this.hasRows=Boolean(this.data.data.length),this.hasHeadings=Boolean(this.data.headings.length)),this.options.classes.empty?.split(" ").forEach(t=>this.wrapperDOM.classList.remove(t)),this._paginate(),this._renderPage(),this._renderPagers(),this.options.scrollY.length&&this._renderSeparateHeader(),this.emit("datatable.update")}_paginate(){let t=this.data.data.map((t,e)=>({row:t,index:e}));return this._searchQueries.length&&(t=[],this._searchData.forEach(e=>t.push({index:e,row:this.data.data[e]}))),this.columns._state.filters.length&&this.columns._state.filters.forEach((e,s)=>{e&&(t=t.filter(t=>{const i=t.row.cells[s];return"function"==typeof e?e(i.data):n(i)===e}))}),this.options.paging&&this.options.perPage>0?this.pages=t.map((e,s)=>s%this.options.perPage===0?t.slice(s,s+this.options.perPage):null).filter(t=>t):this.pages=[t],this.totalPages=this.lastPage=this.pages.length,this._currentPage||(this._currentPage=1),this.totalPages}_fixHeight(){this.options.fixedHeight&&(this.containerDOM.style.height=null,this._rect=this.containerDOM.getBoundingClientRect(),this.containerDOM.style.height=`${this._rect.height}px`)}search(t,e=void 0,s="search"){if(this.emit("datatable.search:before",t,this._searchData),!t.length)return this._currentPage=1,this._searchQueries=[],this._searchData=[],this.update(),this.emit("datatable.search","",[]),this.wrapperDOM.classList.remove("search-results"),!1;this.multiSearch([{terms:[t],columns:e||void 0}],s),this.emit("datatable.search",t,this._searchData)}multiSearch(t,e="search"){if(!this.hasRows)return!1;this._currentPage=1,this._searchData=[];let s=t.map(t=>({columns:t.columns,terms:t.terms.map(t=>t.trim()).filter(t=>t),source:e})).filter(t=>t.terms.length);if(this.emit("datatable.multisearch:before",s,this._searchData),e.length&&(s=s.concat(this._searchQueries.filter(t=>t.source!==e))),this._searchQueries=s,!s.length)return this.update(),this.emit("datatable.multisearch",s,this._searchData),this.wrapperDOM.classList.remove("search-results"),!1;const i=s.map(t=>this.columns.settings.map((e,s)=>{if(!e||e.hidden||!e.searchable||t.columns&&!t.columns.includes(s))return!1;let i=t.terms;const n=e.sensitivity||this.options.sensitivity;["base","accent"].includes(n)&&(i=i.map(t=>t.toLowerCase())),["base","case"].includes(n)&&(i=i.map(t=>t.normalize("NFD").replace(/\p{Diacritic}/gu,"")));return(e.ignorePunctuation??this.options.ignorePunctuation)&&(i=i.map(t=>t.replace(/[.,/#!$%^&*;:{}=-_`~()]/g,""))),i}));this.data.data.forEach((t,e)=>{const a=t.cells.map((t,s)=>{const i=this.columns.settings[s],a=i?.searchMethod||this.options.searchMethod;let o=t;if("true"===t.attributes?.["data-rowspan-placeholder"])for(let t=e-1;t>=0;t--){const e=this.data.data[t].cells[s];if("true"!==e.attributes?.["data-rowspan-placeholder"]){o=e;break}}if(a)return o;let r=n(o).trim();if(r.length){const t=i?.sensitivity||this.options.sensitivity;["base","accent"].includes(t)&&(r=r.toLowerCase()),["base","case"].includes(t)&&(r=r.normalize("NFD").replace(/\p{Diacritic}/gu,""));(i?.ignorePunctuation??this.options.ignorePunctuation)&&(r=r.replace(/[.,/#!$%^&*;:{}=-_`~()]/g,""))}const l=i?.searchItemSeparator||this.options.searchItemSeparator;return l?r.split(l):[r]});i.every((e,i)=>e.find((e,n)=>{if(!e)return!1;const o=this.columns.settings[n],r=o?.searchMethod||this.options.searchMethod;return r?r(e,a[n],t,n,s[i].source):e.find(t=>a[n]?.find(e=>e?.includes(t)))}))&&this._searchData.push(e)}),this.wrapperDOM.classList.add("search-results"),this._searchData.length?this.update():(this.wrapperDOM.classList.remove("search-results"),this.setMessage(this.options.labels.noResults)),this.emit("datatable.multisearch",s,this._searchData)}page(t,e=!1){return this.emit("datatable.page:before",t),t!==this._currentPage&&(isNaN(t)||(this._currentPage=t),!(t>this.pages.length||t<0)&&(this._renderPage(e),this._renderPagers(),void this.emit("datatable.page",t)))}insert(e){let s=[];if(Array.isArray(e)){const t=this.data.headings.map(t=>t.data?String(t.data):t.text);e.forEach((e,i)=>{const n=[];Object.entries(e).forEach(([e,s])=>{const a=t.indexOf(e);a>-1?n[a]=Z(s,this.columns.settings[a]):this.hasHeadings||this.hasRows||0!==i||(n[t.length]=Z(s,this.columns.settings[t.length]),t.push(e),this.data.headings.push(K(e)))}),s.push({cells:n})})}else t(e)&&(!e.headings||this.hasHeadings||this.hasRows?e.data&&Array.isArray(e.data)&&(s=e.data.map(t=>{let e,s;return Array.isArray(t)?(e={},s=t):(e=t.attributes,s=t.cells),{attributes:e,cells:s.map((t,e)=>Z(t,this.columns.settings[e]))}})):this.data=tt(e,void 0,this.columns.settings,this.options.type,this.options.format));s.length&&s.forEach(t=>this.data.data.push(t)),this.hasHeadings=Boolean(this.data.headings.length),this.columns._state.sort&&this.columns.sort(this.columns._state.sort.column,this.columns._state.sort.dir,!0),this.update(!0)}refresh(){if(this.emit("datatable.refresh:before"),this.options.searchable){const t=l(this.options.classes.input);Array.from(this.wrapperDOM.querySelectorAll(t)).forEach(t=>t.value=""),this._searchQueries=[]}this._currentPage=1,this.onFirstPage=!0,this.update(!0),this.emit("datatable.refresh")}print(){const t=s("table");let e=B(this._tableAttributes,this.data.headings,this.data.data.map((t,e)=>({row:t,index:e})),this.columns.settings,this.columns._state,!1,this.options,{noColumnWidths:!0,unhideHeader:!0},this._tableFooters,this._tableCaptions);if(this.options.tableRender){const t=this.options.tableRender(this.data,e,"print");t&&(e=t)}const i=this._dd.diff({nodeName:"TABLE"},e);this._dd.apply(t,i);const n=window.open();n.document.body.appendChild(t),n.print()}setMessage(t){const e=this.data.headings.filter((t,e)=>!this.columns.settings[e]?.hidden).length||1;this.options.classes.empty?.split(" ").forEach(t=>this.wrapperDOM.classList.add(t)),this._label&&(this._label.innerHTML=""),this.totalPages=0,this._renderPagers();let s={nodeName:"TABLE",attributes:this._tableAttributes,childNodes:[{nodeName:"THEAD",childNodes:[F(this.data.headings,this.columns.settings,this.columns._state,this.options,{})]},{nodeName:"TBODY",childNodes:[{nodeName:"TR",childNodes:[{nodeName:"TD",attributes:{class:this.options.classes.empty,colspan:String(e)},childNodes:[{nodeName:"#text",data:t}]}]}]}]};if(this._tableFooters.forEach(t=>s.childNodes.push(t)),this._tableCaptions.forEach(t=>s.childNodes.push(t)),s.attributes.class?.includes(this.options.classes.table)||(s.attributes.class=c(s.attributes.class,this.options.classes.table)),this.options.tableRender){const t=this.options.tableRender(this.data,s,"message");t&&(s=t)}const i=this._dd.diff(this._virtualDOM,s);this._dd.apply(this.dom,i),this._virtualDOM=s}on(t,e){this._events[t]=this._events[t]||[],this._events[t].push(e)}off(t,e){t in this._events!=!1&&this._events[t].splice(this._events[t].indexOf(e),1)}emit(t,...e){if(t in this._events!=!1)for(let s=0;s<this._events[t].length;s++)this._events[t][s](...e)}}const rt=function(e){let s;if(!t(e))return!1;const i={lineDelimiter:"\n",columnDelimiter:",",removeDoubleQuotes:!1,...e};if(i.data.length){s={data:[]};const t=i.data.split(i.lineDelimiter);if(t.length&&(i.headings&&(s.headings=t[0].split(i.columnDelimiter),i.removeDoubleQuotes&&(s.headings=s.headings.map(t=>t.trim().replace(/(^"|"$)/g,""))),t.shift()),t.forEach((t,e)=>{s.data[e]=[];const n=t.split(i.columnDelimiter);n.length&&n.forEach(t=>{i.removeDoubleQuotes&&(t=t.trim().replace(/(^"|"$)/g,"")),s.data[e].push(t)})})),s)return s}return!1},lt=function(s){let i;if(!t(s))return!1;const n={data:"",...s};if(n.data.length||t(n.data)){const t=!!e(n.data)&&JSON.parse(n.data);if(t?(i={headings:[],data:[]},t.forEach((t,e)=>{i.data[e]=[],Object.entries(t).forEach(([t,s])=>{i.headings.includes(t)||i.headings.push(t),i.data[e].push(s)})})):console.warn("That's not valid JSON!"),i)return i}return!1},dt=function(e,s={}){if(!e.hasHeadings&&!e.hasRows)return!1;if(!t(s))return!1;const i={download:!0,skipColumn:[],lineDelimiter:"\n",columnDelimiter:",",...s},a=t=>!i.skipColumn.includes(t)&&!e.columns.settings[t]?.hidden,o=e.data.headings.filter((t,e)=>a(e)).map(t=>{const e=Number(t.attributes?.colspan||1);return[t.text??t.data,...Array(e-1).fill("")]}).flat(),r=new Map;let l;if(i.selection)if(Array.isArray(i.selection)){l=[];for(let t=0;t<i.selection.length;t++)l=l.concat(e.pages[i.selection[t]-1].map(t=>t.row))}else l=e.pages[i.selection-1].map(t=>t.row);else l=e.data.data;let d=[];if(d[0]=o,d=d.concat(l.map(t=>{const e=[];let s=0,i=0;for(;i<t.cells.length;){const o=t.cells[i];if(a(i))if(r.has(s)){const t=r.get(s);e.push(t.cellText),t.remainingRows--,t.remainingRows<=0&&r.delete(s),s++,i++}else if("true"===o.attributes?.["data-rowspan-placeholder"])i++;else if("true"===o.attributes?.["data-colspan-placeholder"])e.push(""),s++,i++;else{const t=Number(o.attributes?.colspan||1),a=Number(o.attributes?.rowspan||1),l=n(o);e.push(l);for(let s=1;s<t;s++)e.push("");a>1&&r.set(s,{remainingRows:a-1,cellText:l}),s++,i++}else i++}return e})),d.length){let t="";if(d.forEach(e=>{e.forEach(e=>{"string"==typeof e&&(e=(e=(e=(e=(e=e.trim()).replace(/\s{2,}/g," ")).replace(/\n/g,"  ")).replace(/"/g,'""')).replace(/#/g,"%23")).includes(",")&&(e=`"${e}"`),t+=e+i.columnDelimiter}),t=t.trim().substring(0,t.length-1),t+=i.lineDelimiter}),t=t.trim().substring(0,t.length-1),i.download){const e=document.createElement("a");e.href=encodeURI(`data:text/csv;charset=utf-8,${t}`),e.download=`${i.filename||"datatable_export"}.csv`,document.body.appendChild(e),e.click(),document.body.removeChild(e)}return t}return!1},ct=function(e,s={}){if(!e.hasHeadings&&!e.hasRows)return!1;if(!t(s))return!1;const i={download:!0,skipColumn:[],replacer:null,space:4,...s},a=t=>!i.skipColumn.includes(t)&&!e.columns.settings[t]?.hidden;let o;if(i.selection)if(Array.isArray(i.selection)){o=[];for(let t=0;t<i.selection.length;t++)o=o.concat(e.pages[i.selection[t]-1].map(t=>t.row))}else o=e.pages[i.selection-1].map(t=>t.row);else o=e.data.data;const r=o.map(t=>t.cells.filter((t,e)=>a(e)).map(t=>n(t))),l=e.data.headings.filter((t,e)=>a(e)).map(t=>t.text??String(t.data));if(r.length){const t=[];r.forEach((e,s)=>{t[s]=t[s]||{},e.forEach((e,i)=>{t[s][l[i]]=e})});const e=JSON.stringify(t,i.replacer,i.space);if(i.download){const t=new Blob([e],{type:"data:application/json;charset=utf-8"}),s=URL.createObjectURL(t),n=document.createElement("a");n.href=s,n.download=`${i.filename||"datatable_export"}.json`,document.body.appendChild(n),n.click(),document.body.removeChild(n),URL.revokeObjectURL(s)}return e}return!1},ht=function(e,s={}){if(!e.hasHeadings&&!e.hasRows)return!1;if(!t(s))return!1;const i={download:!0,skipColumn:[],tableName:"myTable",...s},a=t=>!i.skipColumn.includes(t)&&!e.columns.settings[t]?.hidden;let o=[];if(i.selection)if(Array.isArray(i.selection))for(let t=0;t<i.selection.length;t++)o=o.concat(e.pages[i.selection[t]-1].map(t=>t.row));else o=e.pages[i.selection-1].map(t=>t.row);else o=e.data.data;const r=o.map(t=>t.cells.filter((t,e)=>a(e)).map(t=>n(t))),l=e.data.headings.filter((t,e)=>a(e)).map(t=>t.text??String(t.data));if(r.length){let t=`INSERT INTO \`${i.tableName}\` (`;if(l.forEach(e=>{t+=`\`${e}\`,`}),t=t.trim().substring(0,t.length-1),t+=") VALUES ",r.forEach(e=>{t+="(",e.forEach(e=>{t+="string"==typeof e?`"${e}",`:`${e},`}),t=t.trim().substring(0,t.length-1),t+="),"}),t=t.trim().substring(0,t.length-1),t+=";",i.download&&(t=`data:application/sql;charset=utf-8,${t}`),i.download){const e=document.createElement("a");e.href=encodeURI(t),e.download=`${i.filename||"datatable_export"}.sql`,document.body.appendChild(e),e.click(),document.body.removeChild(e)}return t}return!1},ut=function(e,s={}){if(!e.hasHeadings&&!e.hasRows)return!1;if(!t(s))return!1;const i={download:!0,skipColumn:[],lineDelimiter:"\n",columnDelimiter:",",...s},a=t=>!i.skipColumn.includes(t)&&!e.columns.settings[t]?.hidden,o=e.data.headings.filter((t,e)=>a(e)).map(t=>t.text??t.data);let r;if(i.selection)if(Array.isArray(i.selection)){r=[];for(let t=0;t<i.selection.length;t++)r=r.concat(e.pages[i.selection[t]-1].map(t=>t.row))}else r=e.pages[i.selection-1].map(t=>t.row);else r=e.data.data;let l=[];if(l[0]=o,l=l.concat(r.map(t=>t.cells.filter((t,e)=>a(e)).map(t=>n(t)))),l.length){let t="";if(l.forEach(e=>{e.forEach(e=>{"string"==typeof e&&(e=(e=(e=(e=(e=e.trim()).replace(/\s{2,}/g," ")).replace(/\n/g,"  ")).replace(/"/g,'""')).replace(/#/g,"%23")).includes(",")&&(e=`"${e}"`),t+=e+i.columnDelimiter}),t=t.trim().substring(0,t.length-1),t+=i.lineDelimiter}),t=t.trim().substring(0,t.length-1),i.download&&(t=`data:text/csv;charset=utf-8,${t}`),i.download){const e=document.createElement("a");e.href=encodeURI(t),e.download=`${i.filename||"datatable_export"}.txt`,document.body.appendChild(e),e.click(),document.body.removeChild(e)}return t}return!1},pt={classes:{row:"datatable-editor-row",form:"datatable-editor-form",item:"datatable-editor-item",menu:"datatable-editor-menu",save:"datatable-editor-save",block:"datatable-editor-block",cancel:"datatable-editor-cancel",close:"datatable-editor-close",inner:"datatable-editor-inner",input:"datatable-editor-input",label:"datatable-editor-label",modal:"datatable-editor-modal",action:"datatable-editor-action",header:"datatable-editor-header",wrapper:"datatable-editor-wrapper",editable:"datatable-editor-editable",container:"datatable-editor-container",separator:"datatable-editor-separator"},labels:{closeX:"x",editCell:"Edit Cell",editRow:"Edit Row",removeRow:"Remove Row",reallyRemove:"Are you sure?",reallyCancel:"Do you really want to cancel?",save:"Save",cancel:"Cancel"},cancelModal:t=>confirm(t.options.labels.reallyCancel),inline:!0,hiddenColumns:!1,contextMenu:!0,clickEvent:"dblclick",excludeColumns:[],menuItems:[{text:t=>t.options.labels.editCell,action:(t,e)=>{if(!(t.event.target instanceof Element))return;const s=t.event.target.closest("td");return t.editCell(s)}},{text:t=>t.options.labels.editRow,action:(t,e)=>{if(!(t.event.target instanceof Element))return;const s=t.event.target.closest("tr");return t.editRow(s)}},{separator:!0},{text:t=>t.options.labels.removeRow,action:(t,e)=>{if(t.event.target instanceof Element&&confirm(t.options.labels.reallyRemove)){const e=t.event.target.closest("tr");t.removeRow(e)}}}]};class ft{menuOpen;containerDOM;data;disabled;dt;editing;editingCell;editingRow;event;events;initialized;limits;menuDOM;modalDOM;options;originalRowRender;rect;wrapperDOM;constructor(t,e={}){this.dt=t,this.options={...pt,...e}}init(){this.initialized||(this.options.classes.editable?.split(" ").forEach(t=>this.dt.wrapperDOM.classList.add(t)),this.options.inline&&(this.originalRowRender=this.dt.options.rowRender,this.dt.options.rowRender=(t,e,s)=>{let i=this.rowRender(t,e,s);return this.originalRowRender&&(i=this.originalRowRender(t,i,s)),i}),this.options.contextMenu&&(this.containerDOM=s("div",{id:this.options.classes.container}),this.wrapperDOM=s("div",{class:this.options.classes.wrapper}),this.menuDOM=s("ul",{class:this.options.classes.menu}),this.options.menuItems&&this.options.menuItems.length&&this.options.menuItems.forEach(t=>{const e=s("li",{class:t.separator?this.options.classes.separator:this.options.classes.item});if(!t.separator){const i=s("a",{class:this.options.classes.action,href:t.url||"#",html:"function"==typeof t.text?t.text(this):t.text});e.appendChild(i),t.action&&"function"==typeof t.action&&i.addEventListener("click",e=>{e.preventDefault(),t.action(this,e)})}this.menuDOM.appendChild(e)}),this.wrapperDOM.appendChild(this.menuDOM),this.containerDOM.appendChild(this.wrapperDOM),this.updateMenu()),this.data={},this.menuOpen=!1,this.editing=!1,this.editingRow=!1,this.editingCell=!1,this.bindEvents(),setTimeout(()=>{this.initialized=!0,this.dt.emit("editable.init")},10))}bindEvents(){this.events={keydown:this.keydown.bind(this),click:this.click.bind(this)},this.dt.dom.addEventListener(this.options.clickEvent,this.events.click),document.addEventListener("keydown",this.events.keydown),this.options.contextMenu&&(this.events.context=this.context.bind(this),this.events.updateMenu=this.updateMenu.bind(this),this.events.dismissMenu=this.dismissMenu.bind(this),this.events.reset=h(()=>this.events.updateMenu(),50),this.dt.dom.addEventListener("contextmenu",this.events.context),document.addEventListener("click",this.events.dismissMenu),window.addEventListener("resize",this.events.reset),window.addEventListener("scroll",this.events.reset))}context(t){const e=t.target;if(!(e instanceof Element))return;this.event=t;const s=e.closest("tbody td");if(!this.disabled&&s){t.preventDefault();let e=t.pageX,s=t.pageY;e>this.limits.x&&(e-=this.rect.width),s>this.limits.y&&(s-=this.rect.height),this.wrapperDOM.style.top=`${s}px`,this.wrapperDOM.style.left=`${e}px`,this.openMenu(),this.updateMenu()}}click(t){const e=t.target;if(e instanceof Element)if(this.editing&&this.data&&this.editingCell){const t=l(this.options.classes.input),e=this.modalDOM?this.modalDOM.querySelector(`input${t}[type=text]`):this.dt.wrapperDOM.querySelector(`input${t}[type=text]`);this.saveCell(e.value)}else if(!this.editing){const s=e.closest("tbody td");s&&(this.editCell(s),t.preventDefault())}}keydown(t){const e=l(this.options.classes.input);if(this.modalDOM){if("Escape"===t.key)this.options.cancelModal(this)&&this.closeModal();else if("Enter"===t.key)if(this.editingCell){const t=this.modalDOM.querySelector(`input${e}[type=text]`);this.saveCell(t.value)}else{const t=Array.from(this.modalDOM.querySelectorAll(`input${e}[type=text]`)).map(t=>t.value.trim());this.saveRow(t,this.data.row)}}else if(this.editing&&this.data)if("Enter"===t.key){if(this.editingCell){const t=this.dt.wrapperDOM.querySelector(`input${e}[type=text]`);this.saveCell(t.value)}else if(this.editingRow){const t=Array.from(this.dt.wrapperDOM.querySelectorAll(`input${e}[type=text]`)).map(t=>t.value.trim());this.saveRow(t,this.data.row)}}else"Escape"===t.key&&(this.editingCell?this.saveCell(this.data.content):this.editingRow&&this.saveRow(null,this.data.row))}editCell(t){const e=o(t.cellIndex,this.dt.columns.settings);if(this.options.excludeColumns.includes(e))return void this.closeMenu();const s=parseInt(t.parentElement.dataset.index,10),i=this.dt.data.data[s].cells[e];this.data={cell:i,rowIndex:s,columnIndex:e,content:n(i)},this.editing=!0,this.editingCell=!0,this.options.inline?this.dt.update():this.editCellModal(),this.closeMenu()}editCellModal(){const t=this.data.cell,e=this.data.columnIndex,i=this.dt.data.headings[e].text||String(this.dt.data.headings[e].data),o=[`<div class='${this.options.classes.inner}'>`,`<div class='${this.options.classes.header}'>`,`<h4>${this.options.labels.editCell}</h4>`,`<button class='${this.options.classes.close}' type='button' data-editor-cancel>${this.options.labels.closeX}</button>`," </div>",`<div class='${this.options.classes.block}'>`,`<form class='${this.options.classes.form}'>`,`<div class='${this.options.classes.row}'>`,`<label class='${this.options.classes.label}'>${a(i)}</label>`,`<input class='${this.options.classes.input}' value='${a(n(t))}' type='text'>`,"</div>",`<div class='${this.options.classes.row}'>`,`<button class='${this.options.classes.cancel}' type='button' data-editor-cancel>${this.options.labels.cancel}</button>`,`<button class='${this.options.classes.save}' type='button' data-editor-save>${this.options.labels.save}</button>`,"</div>","</form>","</div>","</div>"].join(""),r=s("div",{class:this.options.classes.modal,html:o});this.modalDOM=r,this.openModal();const d=l(this.options.classes.input),c=r.querySelector(`input${d}[type=text]`);c.focus(),c.selectionStart=c.selectionEnd=c.value.length,r.addEventListener("click",t=>{const e=t.target;e instanceof Element&&(e.hasAttribute("data-editor-cancel")?(t.preventDefault(),this.options.cancelModal(this)&&this.closeModal()):e.hasAttribute("data-editor-save")&&(t.preventDefault(),this.saveCell(c.value)))})}saveCell(t){const e=this.data.content,s=this.dt.columns.settings[this.data.columnIndex].type||this.dt.options.type,i=t.trim();let n;if("number"===s)n={data:parseFloat(i)};else if("boolean"===s)n=["","false","0"].includes(i)?{data:!1,text:"false",order:0}:{data:!0,text:"true",order:1};else if("html"===s)n={data:[{nodeName:"#text",data:t}],text:t,order:t};else if("string"===s)n={data:t};else if("date"===s){const e=this.dt.columns.settings[this.data.columnIndex].format||this.dt.options.format;n={data:t,order:X(String(t),e)}}else n={data:t};this.dt.data.data[this.data.rowIndex].cells[this.data.columnIndex]=n,this.closeModal();const a=this.data.rowIndex,o=this.data.columnIndex;this.data={},this.dt.update(!0),this.editing=!1,this.editingCell=!1,this.dt.emit("editable.save.cell",t,e,a,o)}editRow(t){if(!t||"TR"!==t.nodeName||this.editing)return;const e=parseInt(t.dataset.index,10),s=this.dt.data.data[e];this.data={row:s.cells,rowIndex:e},this.editing=!0,this.editingRow=!0,this.options.inline?this.dt.update():this.editRowModal(),this.closeMenu()}editRowModal(){const t=this.data.row,e=[`<div class='${this.options.classes.inner}'>`,`<div class='${this.options.classes.header}'>`,`<h4>${this.options.labels.editRow}</h4>`,`<button class='${this.options.classes.close}' type='button' data-editor-cancel>${this.options.labels.closeX}</button>`," </div>",`<div class='${this.options.classes.block}'>`,`<form class='${this.options.classes.form}'>`,`<div class='${this.options.classes.row}'>`,`<button class='${this.options.classes.cancel}' type='button' data-editor-cancel>${this.options.labels.cancel}</button>`,`<button class='${this.options.classes.save}' type='button' data-editor-save>${this.options.labels.save}</button>`,"</div>","</form>","</div>","</div>"].join(""),i=s("div",{class:this.options.classes.modal,html:e}),o=i.firstElementChild;if(!o)return;const r=o.lastElementChild?.firstElementChild;if(!r)return;t.forEach((t,e)=>{const i=this.dt.columns.settings[e];if((!i.hidden||i.hidden&&this.options.hiddenColumns)&&!this.options.excludeColumns.includes(e)){const i=this.dt.data.headings[e].text||String(this.dt.data.headings[e].data);r.insertBefore(s("div",{class:this.options.classes.row,html:[`<div class='${this.options.classes.row}'>`,`<label class='${this.options.classes.label}'>${a(i)}</label>`,`<input class='${this.options.classes.input}' value='${a(n(t))}' type='text'>`,"</div>"].join("")}),r.lastElementChild)}}),this.modalDOM=i,this.openModal();const d=l(this.options.classes.input),c=Array.from(r.querySelectorAll(`input${d}[type=text]`));i.addEventListener("click",t=>{const e=t.target;if(e instanceof Element)if(e.hasAttribute("data-editor-cancel"))this.options.cancelModal(this)&&this.closeModal();else if(e.hasAttribute("data-editor-save")){const t=c.map(t=>t.value.trim());this.saveRow(t,this.data.row)}})}saveRow(t,e){const s=e.map(t=>n(t)),i=this.dt.data.data[this.data.rowIndex];if(t){let s=0;i.cells=e.map((e,i)=>{if(this.options.excludeColumns.includes(i)||this.dt.columns.settings[i].hidden)return e;const n=this.dt.columns.settings[i].type||this.dt.options.type,a=t[s++];let o;if("number"===n)o={data:parseFloat(a)};else if("boolean"===n)o=["","false","0"].includes(a)?{data:!1,text:"false",order:0}:{data:!0,text:"true",order:1};else if("html"===n)o={data:[{nodeName:"#text",data:a}],text:a,order:a};else if("string"===n)o={data:a};else if("date"===n){const t=this.dt.columns.settings[i].format||this.dt.options.format;o={data:a,order:X(String(a),t)}}else o={data:a};return o})}const a=i.cells.map(t=>n(t));this.data={},this.dt.update(!0),this.closeModal(),this.editing=!1,this.dt.emit("editable.save.row",a,s,e)}openModal(){this.modalDOM&&document.body.appendChild(this.modalDOM)}closeModal(){this.editing&&this.modalDOM&&(document.body.removeChild(this.modalDOM),this.modalDOM=this.editing=this.editingRow=this.editingCell=!1)}removeRow(t){if(!t||"TR"!==t.nodeName||this.editing)return;const e=parseInt(t.dataset.index,10);this.dt.rows.remove(e),this.closeMenu()}updateMenu(){const t=window.scrollX||window.pageXOffset,e=window.scrollY||window.pageYOffset;this.rect=this.wrapperDOM.getBoundingClientRect(),this.limits={x:window.innerWidth+t-this.rect.width,y:window.innerHeight+e-this.rect.height}}dismissMenu(t){const e=t.target;if(!(e instanceof Element)||this.wrapperDOM.contains(e))return;let s=!0;if(this.editing){const t=l(this.options.classes.input);s=!e.matches(`input${t}[type=text]`)}s&&this.closeMenu()}openMenu(){if(this.editing&&this.data&&this.editingCell){const t=l(this.options.classes.input),e=this.modalDOM?this.modalDOM.querySelector(`input${t}[type=text]`):this.dt.wrapperDOM.querySelector(`input${t}[type=text]`);this.saveCell(e.value)}document.body.appendChild(this.containerDOM),this.menuOpen=!0,this.dt.emit("editable.context.open")}closeMenu(){this.menuOpen&&(this.menuOpen=!1,document.body.removeChild(this.containerDOM),this.dt.emit("editable.context.close"))}destroy(){this.dt.dom.removeEventListener(this.options.clickEvent,this.events.click),this.dt.dom.removeEventListener("contextmenu",this.events.context),document.removeEventListener("click",this.events.dismissMenu),document.removeEventListener("keydown",this.events.keydown),window.removeEventListener("resize",this.events.reset),window.removeEventListener("scroll",this.events.reset),document.body.contains(this.containerDOM)&&document.body.removeChild(this.containerDOM),this.options.inline&&(this.dt.options.rowRender=this.originalRowRender),this.initialized=!1}rowRender(t,e,s){if(!this.data||this.data.rowIndex!==s)return e;if(this.editingCell){e.childNodes[function(t,e){let s=t,i=0;for(;i<t;)e[i].hidden&&(s-=1),i++;return s}(this.data.columnIndex,this.dt.columns.settings)].childNodes=[{nodeName:"INPUT",attributes:{type:"text",value:this.data.content,class:this.options.classes.input}}]}else e.childNodes.forEach((s,i)=>{const n=o(i,this.dt.columns.settings),r=t[n];if(!this.options.excludeColumns.includes(n)){e.childNodes[i].childNodes=[{nodeName:"INPUT",attributes:{type:"text",value:a(r.text||String(r.data)||""),class:this.options.classes.input}}]}});return e}}const mt=function(t,e={}){const s=new ft(t,e);return t.initialized?s.init():t.on("datatable.init",()=>s.init()),s},gt={classes:{button:"datatable-column-filter-button",menu:"datatable-column-filter-menu",container:"datatable-column-filter-container",wrapper:"datatable-column-filter-wrapper"},labels:{button:"Filter columns within the table"},hiddenColumns:[]};class bt{addedButtonDOM;menuOpen;buttonDOM;dt;events;initialized;options;menuDOM;containerDOM;wrapperDOM;limits;rect;event;constructor(t,e={}){this.dt=t,this.options={...gt,...e}}init(){if(this.initialized)return;const t=l(this.options.classes.button);let e=this.dt.wrapperDOM.querySelector(t);if(!e){e=s("button",{class:this.options.classes.button,html:"▦"});const t=l(this.dt.options.classes.search),i=this.dt.wrapperDOM.querySelector(t);i?i.appendChild(e):this.dt.wrapperDOM.appendChild(e),this.addedButtonDOM=!0}this.buttonDOM=e,this.containerDOM=s("div",{id:this.options.classes.container}),this.wrapperDOM=s("div",{class:this.options.classes.wrapper}),this.menuDOM=s("ul",{class:this.options.classes.menu,html:this.dt.data.headings.map((t,e)=>{const s=this.dt.columns.settings[e];return this.options.hiddenColumns.includes(e)?"":`<li data-column="${e}">\n                        <input type="checkbox" value="${t.text||t.data}" ${s.hidden?"":"checked=''"}>\n                        <label>\n                            ${t.text||t.data}\n                        </label>\n                    </li>`}).join("")}),this.wrapperDOM.appendChild(this.menuDOM),this.containerDOM.appendChild(this.wrapperDOM),this._measureSpace(),this._bind(),this.initialized=!0}dismiss(){this.addedButtonDOM&&this.buttonDOM.parentElement&&this.buttonDOM.parentElement.removeChild(this.buttonDOM),document.removeEventListener("click",this.events.click)}_bind(){this.events={click:this._click.bind(this)},document.addEventListener("click",this.events.click)}_openMenu(){document.body.appendChild(this.containerDOM),this._measureSpace(),this.menuOpen=!0,this.dt.emit("columnFilter.menu.open")}_closeMenu(){this.menuOpen&&(this.menuOpen=!1,document.body.removeChild(this.containerDOM),this.dt.emit("columnFilter.menu.close"))}_measureSpace(){const t=window.scrollX||window.pageXOffset,e=window.scrollY||window.pageYOffset;this.rect=this.wrapperDOM.getBoundingClientRect(),this.limits={x:window.innerWidth+t-this.rect.width,y:window.innerHeight+e-this.rect.height}}_click(t){const e=t.target;if(e instanceof Element)if(this.event=t,this.buttonDOM.contains(e)){if(t.preventDefault(),this.menuOpen)return void this._closeMenu();this._openMenu();let e=t.pageX,s=t.pageY;e>this.limits.x&&(e-=this.rect.width),s>this.limits.y&&(s-=this.rect.height),this.wrapperDOM.style.top=`${s}px`,this.wrapperDOM.style.left=`${e}px`}else if(this.menuDOM.contains(e)){const t=l(this.options.classes.menu),s=e.closest(`${t} > li`);if(!s)return;const i=s.querySelector("input[type=checkbox]");i.contains(e)||(i.checked=!i.checked);const n=Number(s.dataset.column);i.checked?this.dt.columns.show([n]):this.dt.columns.hide([n])}else this.menuOpen&&this._closeMenu()}}const vt=function(t,e={}){const s=new bt(t,e);return t.initialized?s.init():t.on("datatable.init",()=>s.init()),s};


}),
"./node_modules/.pnpm/citeproc-plus@0.3.6/node_modules/citeproc-plus/dist/index.js": (function (__unused_rspack___webpack_module__, __webpack_exports__, __webpack_require__) {
"use strict";
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  CSL: function() { return t; }
});
function e(t){if(t.name)return t;const s={};return s.name=t.n,t.a?s.attrs=t.a:s.attrs={},s.children=[],t.c?t.c.forEach((t=>{"string"==typeof t?s.children.push(t):s.children.push(e(t))})):"term"===t.n&&s.children.push(""),s}class t{constructor(){this.styles={},this.locales={},this.citeproc=!1}getStyles(){return __webpack_require__.e(/* import() */ "vendors-node_modules_pnpm_citeproc-plus_0_3_6_node_modules_citeproc-plus_dist_styles-7dfdde96_js").then(__webpack_require__.bind(__webpack_require__, "./node_modules/.pnpm/citeproc-plus@0.3.6/node_modules/citeproc-plus/dist/styles-7dfdde96.js")).then((({styles:e})=>e))}getEngine(e,t,s,r){let l,i;return Promise.all([this.getCiteproc(),this.getStyle(t).then((e=>i=e))]).then((()=>this.getLocale(i,s,r).then((e=>l=e)))).then((()=>{const t=Object.assign(Object.create(e),e);return t.retrieveLocale=()=>l,new this.citeproc.Engine(t,i,s,r)}))}getEngineSync(e,t,s,r){if(!this.citeproc||!this.styles[t])return!1;const l=this.styles[t];let i=r||(l.attrs["default-locale"]?l.attrs["default-locale"]:s||"en-US");if(this.locales[i]||(i="en-US"),!this.locales[i])return!1;const n=this.locales[i],o=Object.assign(Object.create(e),e);return o.retrieveLocale=()=>n,new this.citeproc.Engine(o,l,s,r)}getCiteproc(){return this.citeproc?Promise.resolve():__webpack_require__.e(/* import() */ "vendors-node_modules_pnpm_citeproc-plus_0_3_6_node_modules_citeproc-plus_dist_citeproc_common-e48852").then(__webpack_require__.bind(__webpack_require__, "./node_modules/.pnpm/citeproc-plus@0.3.6/node_modules/citeproc-plus/dist/citeproc_commonjs-2c93c43e.js")).then((function(e){return e.c})).then((e=>this.citeproc=e.default))}getStyle(t){return"object"==typeof t?Promise.resolve(t):__webpack_require__.e(/* import() */ "vendors-node_modules_pnpm_citeproc-plus_0_3_6_node_modules_citeproc-plus_dist_styles-7dfdde96_js").then(__webpack_require__.bind(__webpack_require__, "./node_modules/.pnpm/citeproc-plus@0.3.6/node_modules/citeproc-plus/dist/styles-7dfdde96.js")).then((({styleLocations:s})=>{let r;return s[t]||(t=Object.keys(s).find((()=>!0))),this.styles[s[t]]?(this.styles[s[t]][t]=e(this.styles[s[t]][t]),r=Promise.resolve(this.styles[s[t]][t])):r=fetch(s[t],{method:"GET"}).then((e=>e.json())).then((r=>(this.styles[s[t]]=r,this.styles[s[t]][t]=e(this.styles[s[t]][t]),Promise.resolve(this.styles[s[t]][t])))),r}))}getLocale(t,s,r){let l=r||(t.attrs["default-locale"]?t.attrs["default-locale"]:s||"en-US");return this.locales[l]?Promise.resolve(this.locales[l]):__webpack_require__.e(/* import() */ "node_modules_pnpm_citeproc-plus_0_3_6_node_modules_citeproc-plus_dist_locales-8466b763_js").then(__webpack_require__.bind(__webpack_require__, "./node_modules/.pnpm/citeproc-plus@0.3.6/node_modules/citeproc-plus/dist/locales-8466b763.js")).then((({locales:e})=>(e[l]||(l="en-US"),fetch(e[l],{method:"GET"})))).then((e=>e.json())).then((t=>(this.locales[l]=e(t),Promise.resolve(this.locales[l]))))}}


}),
"./node_modules/.pnpm/w3c-keyname@2.2.8/node_modules/w3c-keyname/index.js": (function (__unused_rspack___webpack_module__, __webpack_exports__, __webpack_require__) {
"use strict";
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
id: moduleId,
loaded: false,
exports: {}
});
// Execute the module function
__webpack_modules__[moduleId].call(module.exports, module, module.exports, __webpack_require__);

// Flag the module as loaded
module.loaded = true;
// Return the exports of the module
return module.exports;

}

// expose the modules object (__webpack_modules__)
__webpack_require__.m = __webpack_modules__;

// webpack/runtime/chunk_prefetch_function/prefetch
!function() {
__webpack_require__.F = {};
__webpack_require__.E = function(chunkId) {
  Object.keys(__webpack_require__.F).map(function(key) {
    __webpack_require__.F[key](chunkId);
  });
}
}();
// webpack/runtime/compat_get_default_export
!function() {
// getDefaultExport function for compatibility with non-ESM modules
__webpack_require__.n = function(module) {
	var getter = module && module.__esModule ?
		function() { return module['default']; } :
		function() { return module; };
	__webpack_require__.d(getter, { a: getter });
	return getter;
};

}();
// webpack/runtime/create_fake_namespace_object
!function() {
var getProto = Object.getPrototypeOf ? function(obj) { return Object.getPrototypeOf(obj); } : function(obj) { return obj.__proto__; };
var leafPrototypes;
// create a fake namespace object
// mode & 1: value is a module id, require it
// mode & 2: merge all properties of value into the ns
// mode & 4: return value when already ns object
// mode & 16: return value when it's Promise-like
// mode & 8|1: behave like require
__webpack_require__.t = function(value, mode) {
	if(mode & 1) value = this(value);
	if(mode & 8) return value;
	if(typeof value === 'object' && value) {
		if((mode & 4) && value.__esModule) return value;
		if((mode & 16) && typeof value.then === 'function') return value;
	}
	var ns = Object.create(null);
  __webpack_require__.r(ns);
	var def = {};
	leafPrototypes = leafPrototypes || [null, getProto({}), getProto([]), getProto(getProto)];
	for(var current = mode & 2 && value; (typeof current == 'object' || typeof current == 'function') && !~leafPrototypes.indexOf(current); current = getProto(current)) {
		Object.getOwnPropertyNames(current).forEach(function(key) { def[key] = function() { return value[key]; } });
	}
	def['default'] = function() { return value; };
	__webpack_require__.d(ns, def);
	return ns;
};
}();
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
// webpack/runtime/ensure_chunk
!function() {
__webpack_require__.f = {};
// This file contains only the entry chunk.
// The chunk loading function for additional chunks
__webpack_require__.e = function(chunkId) {
	return Promise.all(
		Object.keys(__webpack_require__.f).reduce(function(promises, key) {
			__webpack_require__.f[key](chunkId, promises);
			return promises;
		}, [])
	);
};
}();
// webpack/runtime/get javascript chunk filename
!function() {
// This function allow to reference chunks
__webpack_require__.u = function(chunkId) {
  // return url for filenames not based on template
  
  // return url for filenames based on template
  return "" + chunkId + "-1778370242.js"
}
}();
// webpack/runtime/global
!function() {
__webpack_require__.g = (function() {
	if (typeof globalThis === 'object') return globalThis;
	try {
		return this || new Function('return this')();
	} catch (e) {
		if (typeof window === 'object') return window;
	}
})();
}();
// webpack/runtime/has_own_property
!function() {
__webpack_require__.o = function(obj, prop) { return Object.prototype.hasOwnProperty.call(obj, prop); }
}();
// webpack/runtime/load_script
!function() {
var inProgress = {};

var uniqueName = "fidus-writer:";
// loadScript function to load a script via script tag
__webpack_require__.l = function (url, done, key, chunkId) {
	if (inProgress[url]) {
		inProgress[url].push(done);
		return;
	}
	var script, needAttach;
	if (key !== undefined) {
		var scripts = document.getElementsByTagName("script");
		for (var i = 0; i < scripts.length; i++) {
			var s = scripts[i];
			if (s.getAttribute("src") == url || s.getAttribute("data-rspack") == uniqueName + key) {
				script = s;
				break;
			}
		}
	}
	if (!script) {
		needAttach = true;
		script = document.createElement('script');


script.timeout = 120;
if (__webpack_require__.nc) {
  script.setAttribute("nonce", __webpack_require__.nc);
}

script.setAttribute("data-rspack", uniqueName + key);



script.src = url;


if (script.src.indexOf(window.location.origin + '/') !== 0) {
 script.crossOrigin = 'anonymous';
}

	}
	inProgress[url] = [done];
	var onScriptComplete = function (prev, event) {
		script.onerror = script.onload = null;
		clearTimeout(timeout);
		var doneFns = inProgress[url];
		delete inProgress[url];
		script.parentNode && script.parentNode.removeChild(script);
		doneFns &&
			doneFns.forEach(function (fn) {
				return fn(event);
			});
		if (prev) return prev(event);
	};
	var timeout = setTimeout(
		onScriptComplete.bind(null, undefined, {
			type: 'timeout',
			target: script
		}),
		120000
	);
	script.onerror = onScriptComplete.bind(null, script.onerror);
	script.onload = onScriptComplete.bind(null, script.onload);
	needAttach && document.head.appendChild(script);
};

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
// webpack/runtime/node_module_decorator
!function() {
__webpack_require__.nmd = function(module) {
  module.paths = [];
  if (!module.children) module.children = [];
  return module;
};
}();
// webpack/runtime/on_chunk_loaded
!function() {
var deferred = [];
__webpack_require__.O = function(result, chunkIds, fn, priority) {
	if (chunkIds) {
		priority = priority || 0;
		for (var i = deferred.length; i > 0 && deferred[i - 1][2] > priority; i--)
			deferred[i] = deferred[i - 1];
		deferred[i] = [chunkIds, fn, priority];
		return;
	}
	var notFulfilled = Infinity;
	for (var i = 0; i < deferred.length; i++) {
		var chunkIds = deferred[i][0];
var fn = deferred[i][1];
var priority = deferred[i][2];
		var fulfilled = true;
		for (var j = 0; j < chunkIds.length; j++) {
			if (
				(priority & (1 === 0) || notFulfilled >= priority) &&
				Object.keys(__webpack_require__.O).every(function(key) { return __webpack_require__.O[key](chunkIds[j]); })
			) {
				chunkIds.splice(j--, 1);
			} else {
				fulfilled = false;
				if (priority < notFulfilled) notFulfilled = priority;
			}
		}
		if (fulfilled) {
			deferred.splice(i--, 1);
			var r = fn();
			if (r !== undefined) result = r;
		}
	}
	return result;
};

}();
// webpack/runtime/public_path
!function() {
__webpack_require__.p = "/static/js/";
}();
// webpack/runtime/rspack_version
!function() {
__webpack_require__.rv = function() { return "1.6.7"; }
}();
// webpack/runtime/jsonp_chunk_loading
!function() {

      // object to store loaded and loading chunks
      // undefined = chunk not loaded, null = chunk preloaded/prefetched
      // [resolve, reject, Promise] = chunk loading, 0 = chunk loaded
      var installedChunks = {"app": 0,};
      
        __webpack_require__.f.j = function (chunkId, promises) {
          // JSONP chunk loading for javascript
var installedChunkData = __webpack_require__.o(installedChunks, chunkId)
	? installedChunks[chunkId]
	: undefined;
if (installedChunkData !== 0) {
	// 0 means "already installed".

	// a Promise means "currently loading".
	if (installedChunkData) {
		promises.push(installedChunkData[2]);
	} else {
		if (true) {
			// setup Promise in chunk cache
			var promise = new Promise(function(resolve, reject) { installedChunkData = installedChunks[chunkId] = [resolve, reject]; });
			promises.push((installedChunkData[2] = promise));

			// start chunk loading
			var url = __webpack_require__.p + __webpack_require__.u(chunkId);
			// create error before stack unwound to get useful stacktrace later
			var error = new Error();
			var loadingEnded = function (event) {
				if (__webpack_require__.o(installedChunks, chunkId)) {
					installedChunkData = installedChunks[chunkId];
					if (installedChunkData !== 0) installedChunks[chunkId] = undefined;
					if (installedChunkData) {
						var errorType =
							event && (event.type === 'load' ? 'missing' : event.type);
						var realSrc = event && event.target && event.target.src;
						error.message =
							'Loading chunk ' +
							chunkId +
							' failed.\n(' +
							errorType +
							': ' +
							realSrc +
							')';
						error.name = 'ChunkLoadError';
						error.type = errorType;
						error.request = realSrc;
						installedChunkData[1](error);
					}
				}
			};
			__webpack_require__.l(url, loadingEnded, "chunk-" + chunkId, chunkId);
		} 
	}
}

        }
        __webpack_require__.F.j = function(chunkId) {
  if ((!__webpack_require__.o(installedChunks, chunkId) || installedChunks[chunkId] === undefined) && true) {
    installedChunks[chunkId] = null;
    var link = document.createElement('link');


link.crossOrigin = 'anonymous';

if (__webpack_require__.nc) {
  link.setAttribute("nonce", __webpack_require__.nc);
}
link.rel = 'prefetch';
link.as = 'script';
link.href = __webpack_require__.p + __webpack_require__.u(chunkId);
    document.head.appendChild(link);
  }
};
__webpack_require__.O.j = function(chunkId) { return installedChunks[chunkId] === 0; };
// install a JSONP callback for chunk loading
var __rspack_jsonp = function(parentChunkLoadingFunction, data) {
	var chunkIds = data[0];
var moreModules = data[1];
var runtime = data[2];
	// add "moreModules" to the modules object,
	// then flag all "chunkIds" as loaded and fire callback
	var moduleId, chunkId, i = 0;
	if (chunkIds.some(function(id) { return installedChunks[id] !== 0; })) {
		for (moduleId in moreModules) {
			if (__webpack_require__.o(moreModules, moduleId)) {
				__webpack_require__.m[moduleId] = moreModules[moduleId];
			}
		}
		if (runtime) var result = runtime(__webpack_require__);
	}
	if (parentChunkLoadingFunction) parentChunkLoadingFunction(data);
	for (; i < chunkIds.length; i++) {
		chunkId = chunkIds[i];
		if (
			__webpack_require__.o(installedChunks, chunkId) &&
			installedChunks[chunkId]
		) {
			installedChunks[chunkId][0]();
		}
		installedChunks[chunkId] = 0;
	}
	
	return __webpack_require__.O(result);
	
};

var chunkLoadingGlobal = self["webpackChunkfidus_writer"] = self["webpackChunkfidus_writer"] || [];
chunkLoadingGlobal.forEach(__rspack_jsonp.bind(null, 0));
chunkLoadingGlobal.push = __rspack_jsonp.bind(null, chunkLoadingGlobal.push.bind(chunkLoadingGlobal));

}();
// webpack/runtime/rspack_unique_id
!function() {
__webpack_require__.ruid = "bundler=rspack@1.6.7";
}();
// webpack/runtime/chunk_prefetch_startup
!function() {
__webpack_require__.O(0, ["app"], function() {
  ["vendors-node_modules_pnpm_biblatex-csl-converter_3_6_0_node_modules_biblatex-csl-converter_li-d3812c","vendors-node_modules_pnpm_prosemirror-commands_1_7_0_node_modules_prosemirror-commands_dist_i-9c513b","vendors-node_modules_pnpm_cropperjs_1_6_2_node_modules_cropperjs_dist_cropper_js","vendors-node_modules_pnpm_jszip_3_10_1_node_modules_jszip_dist_jszip_min_js","vendors-node_modules_pnpm_downloadjs_1_4_7_node_modules_downloadjs_download_js-node_modules_p-484d68","vendors-node_modules_pnpm_fastdom_1_0_11_node_modules_fastdom_fastdom_js-node_modules_pnpm_pr-cb5a3c","vendors-node_modules_pnpm_fast-xml-parser_4_5_0_node_modules_fast-xml-parser_src_fxp_js","vendors-node_modules_pnpm_mathml-to-latex_1_4_3_node_modules_mathml-to-latex_dist_bundle_min_js","js_modules_editor_e2ee_passphrase-dialog_js","js_modules_editor_e2ee_passphrase-manager_js","js_modules_editor_e2ee_encryptor_js-js_modules_images_edit_dialog_model_js","editor","js_modules_exporter_tools_xml_js","js_modules_documents_overview_index_js"].map(__webpack_require__.E);
}, 5);
}();
var __webpack_exports__ = {};
// This entry needs to be wrapped in an IIFE because it needs to be in strict mode.
!function() {
"use strict";
__webpack_require__.r(__webpack_exports__);
/* import */ var regenerator_runtime_runtime_js__rspack_import_0 = __webpack_require__("./node_modules/.pnpm/regenerator-runtime@0.14.0/node_modules/regenerator-runtime/runtime.js");
/* import */ var _modules_app_index_js__rspack_import_1 = __webpack_require__("./js/modules/app/index.js");
 // For older browsers


const theApp = new _modules_app_index_js__rspack_import_1.App(window.settings)
theApp.init()
window.theApp = theApp

}();
__webpack_exports__ = __webpack_require__.O(__webpack_exports__);
})()
;