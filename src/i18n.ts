import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import de from './locales/de/common.json';
import en from './locales/en/common.json';

const resources = {
  en: {
    translation: {
      ...en,
    },
  },
  de: {
    translation: {
      ...de,
    },
  },
};

i18n.use(initReactI18next).init({
  resources,
  lng: 'en', // Default language
  fallbackLng: 'en',

  interpolation: {
    escapeValue: false,
  },
});

export default i18n;
