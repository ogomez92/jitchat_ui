import VueI18n from 'vue-i18n'
import messages from '@src/assets/translations.json';

export default class TranslationsManager {
  private messages: object;
  private locale: string;

  constructor(locale: string) {
    this.messages = messages;
    this.locale = locale;
  }

  public getVuePlugin = () => VueI18n.createI18n({
    legacy: false, // you must set `false`, to use Composition API
    locale: this.locale, // set locale
    fallbackLocale: 'en', // set fallback locale
    messages,
  })
}
