'use client';

import { Send, Play, Camera } from 'lucide-react';
import LanguageSwitcher from '../ui/LanguageSwitcher';
import { useLanguage } from '@/context/LanguageContext';
import styles from './TopBar.module.css';

export default function TopBar() {
  const { t } = useLanguage();
  const marqueeText = t('header.marquee');

  return (
    <div className={styles.topbar}>
      <div className={styles.topbarInner}>
        {/* Text */}
        <div className={styles.textWrap}>
          <div className={styles.textContent}>
            <span className={styles.textItem}>{marqueeText}</span>
          </div>
        </div>

        {/* Social links */}
        <div className={styles.socialLinks}>
          <a href="https://t.me/topagrovet" className={styles.socialLink} target="_blank" rel="noopener noreferrer">
            <Send size={12} />
            <span>Telegram kanal</span>
          </a>
          <a href="https://youtube.com/@topagrovet" className={styles.socialLink} target="_blank" rel="noopener noreferrer">
            <Play size={12} fill="currentColor" />
            <span>YouTube</span>
          </a>
          <a href="https://instagram.com/topagrovet" className={styles.socialLink} target="_blank" rel="noopener noreferrer">
            <Camera size={12} />
            <span>Instagram</span>
          </a>

          <div className={styles.divider}></div>
          <LanguageSwitcher />
        </div>
      </div>
    </div>
  );
}
