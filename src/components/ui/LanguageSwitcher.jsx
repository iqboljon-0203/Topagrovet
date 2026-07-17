'use client';

import React, { useState, useRef, useEffect } from 'react';
import { ChevronDown } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';
import styles from './LanguageSwitcher.module.css';

const LANGUAGES = [
  { code: 'uz', name: 'O\'zbekcha', flagUrl: 'https://flagcdn.com/w20/uz.png', short: 'UZ' },
  { code: 'ru', name: 'Русский', flagUrl: 'https://flagcdn.com/w20/ru.png', short: 'RU' }
];

export default function LanguageSwitcher() {
  const { language, changeLanguage, mounted } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Prevent hydration mismatch
  if (!mounted) {
    return (
      <div className={styles.wrapper}>
        <button className={styles.triggerBtn}>
          UZ <ChevronDown size={14} />
        </button>
      </div>
    );
  }

  const currentLang = LANGUAGES.find((lang) => lang.code === language) || LANGUAGES[0];

  return (
    <div className={styles.wrapper} ref={dropdownRef}>
      <button 
        className={`${styles.triggerBtn} ${isOpen ? styles.active : ''}`}
        onClick={() => setIsOpen(!isOpen)}
        aria-label="Change Language"
      >
        <img src={currentLang.flagUrl} alt={currentLang.short} width="16" className={styles.flagImg} />
        <span className={styles.shortName}>{currentLang.short}</span>
        <ChevronDown size={14} className={styles.chevron} />
      </button>

      {isOpen && (
        <div className={styles.dropdown}>
          {LANGUAGES.map((lang) => (
            <button
              key={lang.code}
              className={`${styles.optionBtn} ${language === lang.code ? styles.selected : ''}`}
              onClick={() => {
                changeLanguage(lang.code);
                setIsOpen(false);
              }}
            >
              <img src={lang.flagUrl} alt={lang.short} width="16" className={styles.flagImg} />
              <span className={styles.name}>{lang.name}</span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
