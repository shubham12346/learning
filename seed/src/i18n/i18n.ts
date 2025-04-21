import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import allFr from './fr';
import allEn from './en';

i18n.use(initReactI18next).init({
  resources: {
    english: allEn,
    french: allFr
  },
  fallbackLng: localStorage.getItem('language')?.toLowerCase() || 'english',
  debug: false,
  interpolation: {
    escapeValue: false
  }
});

export default i18n;
