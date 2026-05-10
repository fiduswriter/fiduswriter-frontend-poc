"use strict";
(self["rspackChunkfidus_writer"] = self["rspackChunkfidus_writer"] || []).push([["js_modules_bibliography_form_strings_js"], {
"./js/modules/bibliography/form/strings.js": (function (__unused_rspack_module, __webpack_exports__, __webpack_require__) {
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  BibFieldHelp: function() { return BibFieldHelp; },
  BibFieldTitles: function() { return BibFieldTitles; },
  BibOptionTitles: function() { return BibOptionTitles; },
  BibTypeTitles: function() { return BibTypeTitles; },
  getAllFieldHelp: function() { return getAllFieldHelp; },
  getAllTypeTitles: function() { return getAllTypeTitles; },
  getBibFieldHelp: function() { return getBibFieldHelp; },
  getBibFieldTitle: function() { return getBibFieldTitle; },
  getBibLangidTitle: function() { return getBibLangidTitle; },
  getBibOptionTitle: function() { return getBibOptionTitle; },
  getBibTypeTitle: function() { return getBibTypeTitle; }
});
/* import */ var biblatex_csl_converter__rspack_import_0 = __webpack_require__("./node_modules/.pnpm/biblatex-csl-converter@3.6.0/node_modules/biblatex-csl-converter/lib/index.js");


// Cache for the current locale to avoid repeated lookups
let cachedLocale = null
let cachedLang = null

function getCachedLocale() {
    const lang = document.documentElement.lang || "en"
    if (lang !== cachedLang) {
        cachedLocale = (0,biblatex_csl_converter__rspack_import_0.getLocale)(lang)
        cachedLang = lang
    }
    return cachedLocale
}

// Dynamic field title getter that uses biblatex-csl-converter's i18n
function getBibFieldTitle(fieldKey, bibType = null) {
    const locale = getCachedLocale()
    if (bibType && biblatex_csl_converter__rspack_import_0.BibTypes[bibType]) {
        return (0,biblatex_csl_converter__rspack_import_0.getFieldTitle)(locale, bibType, fieldKey)
    }
    // Fallback to generic field title
    const fieldType = biblatex_csl_converter__rspack_import_0.BibFieldTypes[fieldKey]
    if (fieldType && fieldType.title) {
        return fieldType.title
    }
    return fieldKey
}

// Dynamic type title getter
function getBibTypeTitle(typeKey) {
    const locale = getCachedLocale()
    return (0,biblatex_csl_converter__rspack_import_0.getTypeTitle)(locale, typeKey)
}

// Dynamic field help getter
function getBibFieldHelp(fieldKey) {
    const locale = getCachedLocale()
    return (0,biblatex_csl_converter__rspack_import_0.getFieldHelp)(locale, fieldKey)
}

// Dynamic option title getter (for editortype, pagination, pubstate, etc.)
function getBibOptionTitle(optionKey) {
    const locale = getCachedLocale()
    return (0,biblatex_csl_converter__rspack_import_0.getOtherOptionTitle)(locale, optionKey)
}

// Dynamic langid title getter
function getBibLangidTitle(langidKey) {
    const locale = getCachedLocale()
    return (0,biblatex_csl_converter__rspack_import_0.getLangidTitle)(locale, langidKey)
}

// For backward compatibility, create proxy objects that dynamically return translations
// These should be used sparingly - prefer using the function versions above
const BibFieldTitles = new Proxy(
    {},
    {
        get(_target, prop) {
            return getBibFieldTitle(prop)
        }
    }
)

const BibTypeTitles = new Proxy(
    {},
    {
        get(_target, prop) {
            return getBibTypeTitle(prop)
        }
    }
)

const BibFieldHelp = new Proxy(
    {},
    {
        get(_target, prop) {
            return getBibFieldHelp(prop)
        }
    }
)

const BibOptionTitles = new Proxy(
    {},
    {
        get(_target, prop) {
            return getBibOptionTitle(prop)
        }
    }
)

// Export a function to get all type titles as an object (for templates that need to map all types)
function getAllTypeTitles() {
    const locale = getCachedLocale()
    const titles = {}
    Object.keys(biblatex_csl_converter__rspack_import_0.BibTypes).forEach(typeKey => {
        titles[typeKey] = (0,biblatex_csl_converter__rspack_import_0.getTypeTitle)(locale, typeKey)
    })
    return titles
}

// Export a function to get all field help texts
function getAllFieldHelp() {
    const locale = getCachedLocale()
    const help = {}
    Object.keys(biblatex_csl_converter__rspack_import_0.BibFieldTypes).forEach(fieldKey => {
        const helpText = (0,biblatex_csl_converter__rspack_import_0.getFieldHelp)(locale, fieldKey)
        if (helpText) {
            help[fieldKey] = helpText
        }
    })
    return help
}


}),

}]);