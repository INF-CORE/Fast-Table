import React from 'react';
import { useLocale } from './LocaleContext'; // Импортируем хук

const LanguageSwitcher = () => {
  const { locale, changeLocale } = useLocale(); // Используем хук для доступа к контексту

  const handleChange = (event) => {
    changeLocale(event.target.value); // Обновляем язык при изменении
  };

  return (
    <select value={locale} onChange={handleChange}>
      <option value="en">English</option>
      <option value="es">Spanish</option>
      <option value="fr">French</option>
      {/* Добавьте другие языки по мере необходимости */}
    </select>
  );
};

export default LanguageSwitcher;
