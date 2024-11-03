import en from '../../public/locales/en.json';
import ru from '../../public/locales/ru.json';

const translations = { en, ru };

export const getTranslations = (locale) => {
  return translations[locale] || translations.en;
};
