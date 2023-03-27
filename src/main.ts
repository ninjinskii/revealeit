import { createApp } from "vue";
import { createPinia } from "pinia";
import "./assets/style.css";
import App from "./App.vue";
import { createI18n } from "vue-i18n";
import en from "./lang/en.js";
import fr from "./lang/fr.js";

const pinia = createPinia();
const app = createApp(App);
const locale = navigator.language;
const i18n = createI18n({ legacy: false, locale, messages: { en, fr } });

app.use(i18n);
app.use(pinia);
app.mount("#app");
