'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import uz from '../locales/uz.json';
import ru from '../locales/ru.json';

const LanguageContext = createContext();

export const dictionaries = { uz, ru };

export function LanguageProvider({ children }) {
  const [language, setLanguage] = useState('uz');
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    // Check localStorage on load
    const savedLang = localStorage.getItem('topagrovet_lang');
    if (savedLang && ['uz', 'ru'].includes(savedLang)) {
      setLanguage(prev => prev !== savedLang ? savedLang : prev);
    }
    setMounted(true);
  }, []);

  const changeLanguage = (lang) => {
    setLanguage(lang);
    localStorage.setItem('topagrovet_lang', lang);
  };

  // The 't' function translates a key like 'header.about' -> 'Biz haqimizda'
  const t = (key) => {
    if (!mounted) {
      // During SSR, default to 'uz' dictionary to prevent hydration mismatch for static export
      const keys = key.split('.');
      let val = dictionaries['uz'];
      for (const k of keys) {
        if (val[k] === undefined) return key;
        val = val[k];
      }
      return val;
    }

    const keys = key.split('.');
    let val = dictionaries[language];
    for (const k of keys) {
      if (val[k] === undefined) return key; // Fallback to key if missing
      val = val[k];
    }
    return val;
  };

  return (
    <LanguageContext.Provider value={{ language, changeLanguage, t, mounted }}>
      {children}
    </LanguageContext.Provider>
  );
}

export const useLanguage = () => useContext(LanguageContext);
