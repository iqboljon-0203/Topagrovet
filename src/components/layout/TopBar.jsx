'use client';

import { Send, Play, Camera } from 'lucide-react';
import LanguageSwitcher from '../ui/LanguageSwitcher';
import { useLanguage } from '@/context/LanguageContext';
import { supabase } from '@/lib/supabaseClient';
import { useEffect, useState } from 'react';
import styles from './TopBar.module.css';

export default function TopBar() {
  const { language, t } = useLanguage();
  const isRu = language === 'ru';
  const val = (uzStr, ruStr) => isRu && ruStr ? ruStr : uzStr;
  const [contactInfo, setContactInfo] = useState(null);

  useEffect(() => {
    async function fetchContact() {
      const { data } = await supabase.from('contact_info').select('*').limit(1).single();
      if (data) setContactInfo(data);
    }
    fetchContact();
  }, []);

  const marqueeText = val(contactInfo?.topbar_marquee, contactInfo?.topbar_marquee_ru) || t('header.marquee');

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
          {contactInfo?.social_telegram && (
            <a href={contactInfo.social_telegram} className={styles.socialLink} target="_blank" rel="noopener noreferrer">
              <Send size={12} />
              <span>Telegram kanal</span>
            </a>
          )}
          {contactInfo?.social_youtube && (
            <a href={contactInfo.social_youtube} className={styles.socialLink} target="_blank" rel="noopener noreferrer">
              <Play size={12} fill="currentColor" />
              <span>YouTube</span>
            </a>
          )}
          {contactInfo?.social_instagram && (
            <a href={contactInfo.social_instagram} className={styles.socialLink} target="_blank" rel="noopener noreferrer">
              <Camera size={12} />
              <span>Instagram</span>
            </a>
          )}

          <div className={styles.divider}></div>
          <LanguageSwitcher />
        </div>
      </div>
    </div>
  );
}
