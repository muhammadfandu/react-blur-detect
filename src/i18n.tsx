import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

// Importing translation files

import translationEN from './locales/translation_en.json';
import translationID from './locales/translation_id.json';

//Creating object with the variables of imported translation files
const resources = {
  en: {
    translation: translationEN,
  },
  id: {
    translation: translationID,
  },
};

//i18N Initialization

i18n.use(initReactI18next).init({
  resources,
  lng: 'en', //default language
  keySeparator: false,
  interpolation: {
    escapeValue: false,
  },
});

export default i18n;
