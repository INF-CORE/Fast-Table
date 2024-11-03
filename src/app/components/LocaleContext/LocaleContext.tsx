import React, { createContext, useState, useContext, useEffect } from 'react';

// Определяем контекст
const LocaleContext = createContext();

// Хук для использования контекста
export const useLocale = () => useContext(LocaleContext);

// Провайдер контекста
export const LocaleProvider = ({ children }) => {
  const [locale, setLocale] = useState(localStorage.getItem('locale') || 'en'); // Используем localStorage для сохранения языка

  // Обновляем localStorage при изменении языка
  useEffect(() => {
    localStorage.setItem('locale', locale);
  }, [locale]);

  // Функция для смены языка
  const changeLocale = (newLocale) => {
    setLocale(newLocale);
  };

  // Передаем значения через контекст
  return (
    <LocaleContext.Provider value={{ locale, changeLocale }}>
      {children}
    </LocaleContext.Provider>
  );
};
