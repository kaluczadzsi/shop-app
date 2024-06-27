import { DEFAULT_LANGUAGE } from '@/constants/languages'
import i18next from 'i18next'
import LanguageDetector from 'i18next-browser-languagedetector'
import { initReactI18next } from 'react-i18next'
import { english } from './languages/en'
import { ukraine } from './languages/uk'

i18next
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    lng: DEFAULT_LANGUAGE,
    fallbackLng: 'en',
    interpolation: {},
    resources: {
      en: english,
      uk: ukraine
    }
  })

export default i18next
