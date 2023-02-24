import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import TranslationsManager from '@src/managers/translations_manager'

const translationsManager = new TranslationsManager('en');

createApp(App)
.use(translationsManager.getVuePlugin())
.mount('#app')
