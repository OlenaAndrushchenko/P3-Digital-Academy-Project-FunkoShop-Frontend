import { createI18n } from 'vue-i18n';
import en from './json/EN.json';
import es from './json/ES.json';

const messages = {
  en: en,
  es: es,
};

const i18n = createI18n({
  locale: localStorage.getItem('lang') || 'en', 
  fallbackLocale: 'en', 
  globalInjection: true, 
  messages, 
});

export default i18n;
