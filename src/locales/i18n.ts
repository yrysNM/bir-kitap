import i18next from "i18next"
import { initReactI18next } from "react-i18next"
import en from "./lang/en.json"
import kk from "./lang/kk.json"

export const languageResources = {
    en: { translation: en },
    kk: { translation: kk },
}

i18next.use(initReactI18next).init({
    compatibilityJSON: "v3",
    lng: "en",
    fallbackLng: "en",
    debug: false,
    resources: languageResources,
})

export default i18next
