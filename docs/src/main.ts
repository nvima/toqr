import { createApp } from 'vue'
import './tailwind.css'
import App from './App.vue'
import { createI18n } from 'vue-i18n'
import { messages } from './translations.js'
import { createHead } from "@vueuse/head"

let lang = "en"
if (typeof (Storage) !== "undefined") {
    let lLang = localStorage.getItem("lang")
    if (lLang) lang = lLang;
}

const i18n = createI18n({
    legacy: false,
    globalInjection: true,
    locale: lang,
    fallbackLocale: 'de',
    messages,
})


const app = createApp(App)
const head = createHead({
    htmlAttrs: { lang: lang || 'en' },
})
app.use(i18n)
app.use(head)
app.mount('#app')

export { i18n }
