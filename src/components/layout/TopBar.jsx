'use client';

import { Send, Youtube, Instagram, Star } from 'lucide-react';
import styles from './TopBar.module.css';

export default function TopBar() {
  const marqueeText = "⭐ Sifatli mahsulotlar – sog'lom hayvon va mo'l hosil garovi!";

  return (
    <div className={styles.topbar}>
      <div className={styles.topbarInner}>
        <div className={styles.marqueeWrap}>
          <div className={styles.marquee}>
            <span className={styles.marqueeText}>{marqueeText}</span>
            <span className={styles.marqueeText}>{marqueeText}</span>
            <span className={styles.marqueeText}>{marqueeText}</span>
            <span className={styles.marqueeText}>{marqueeText}</span>
          </div>
        </div>

        <div className={styles.socialLinks}>
          <a href="https://t.me/topagrovet" className={styles.socialLink} target="_blank" rel="noopener noreferrer">
            <Send size={14} />
            <span>Telegram kanal</span>
          </a>
          <a href="https://youtube.com/@topagrovet" className={styles.socialLink} target="_blank" rel="noopener noreferrer">
            <Youtube size={14} />
            <span>YouTube</span>
          </a>
          <a href="https://instagram.com/topagrovet" className={styles.socialLink} target="_blank" rel="noopener noreferrer">
            <Instagram size={14} />
            <span>Instagram</span>
          </a>
        </div>
      </div>
    </div>
  );
}
