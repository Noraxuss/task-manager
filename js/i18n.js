let translations = {};
let lang = "en";

async function loadTranslations() {
    const en = await fetch("i18n/en.json").then(r => r.json());
    const hu = await fetch("i18n/hu.json").then(r => r.json());
    translations = { en, hu };
}

function t(key) {
    return translations[lang][key] || translations.en[key] || key;
}

function setLang(newLang) {
    lang = newLang;
    document.documentElement.lang = lang;
}

export { loadTranslations, t, lang, setLang };
