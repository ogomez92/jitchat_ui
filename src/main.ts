import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import TranslationsManager from '@src/managers/translations_manager'

// const translationsManager = new TranslationsManager(navigator.language.split('-')[0]);
const translationsManager = new TranslationsManager('es');

createApp(App)
.use(translationsManager.getVuePlugin())
.mount('#app')
