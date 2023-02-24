import { createI18n } from 'vue-i18n';
import messages from '@src/assets/translations.json';

export default class TranslationsManager {
  private messages: object;
  private locale: string;

  constructor(locale: string) {
    this.messages = messages;
    this.locale = locale;
  }

  public getVuePlugin = () => createI18n({
    legacy: false,
    locale: this.locale, // set locale
    fallbackLocale: 'en', // set fallback locale
    messages,
  })
}
