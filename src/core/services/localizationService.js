import i18n from 'i18next';
import Backend from 'i18next-fetch-backend';
import LanguageDetector from 'i18next-browser-languagedetector';
import {reactI18nextModule} from 'react-i18next';

i18n
    .use(Backend)
    .use(LanguageDetector)
    .use(reactI18nextModule)
    .init({
        defaultNS: 'translation',
        fallbackLng: 'en-US',
        debug: false,
        load: 'currentOnly',
        react: {
            wait: true
        },
        preload: ['en-US'],
        backend: {
            loadPath: '/locales/{{lng}}/{{ns}}.json',
        },
        whitelist: ApplicationSettings.availableLanguages
    });

export default i18n;
