'use client';
import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabaseClient';
import Link from 'next/link';
import Image from 'next/image';
import { Phone, Mail, MapPin, Send, Play, Camera } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';
import styles from './Footer.module.css';

export default function Footer() {
  const { language } = useLanguage();
  const isRu = language === 'ru';
  const val = (uzStr, ruStr) => isRu && ruStr ? ruStr : uzStr;

  const [info, setInfo] = useState(null);

  useEffect(() => {
    async function fetchFooterInfo() {
      const { data, error } = await supabase
        .from('contact_info')
        .select('*')
        .limit(1)
        .single();

      if (!error && data) {
        setInfo(data);
      }
    }
    fetchFooterInfo();
  }, []);

  // Fallback qiymatlar
  const d = info || {
    phone1: '+998 90 123 45 67',
    work_hours: 'Har kuni 08:00 - 18:00',
    email1: 'info@topagrovet.uz',
    address_line1: 'Toshkent shahri, Yakkasaroy tumani,',
    address_line2: 'Bobur ko\'chasi 42',
    footer_description: 'O\'zbekistonda veterinariya va agro preparatlarning ishonchli yetkazib beruvchisi. 1000+ dan ortiq mahsulot, sertifikatlangan sifat va mutaxassis maslahatlar.',
    social_telegram: '#',
    social_youtube: '#',
    social_instagram: '#',
    footer_copyright: '© 2026 Top Agro Vet. Barcha huquqlar himoyalangan.',
    footer_developer: 'Sayt Dream Tech IT agency tomonidan ishlab chiqilgan',
  };

  return (
    <footer className={styles.footer}>
      <div className={styles.footerGrid}>
        {/* Column 1: About */}
        <div>
          <div className={styles.footerLogo}>
            <Image src="/logo.png" alt="Top Agro Vet logo" width={230} height={65} unoptimized style={{ borderRadius: '10px', objectFit: 'contain' }} />
          </div>
          <p className={styles.footerDesc}>
            {val(d.footer_description, d.footer_description_ru)}
          </p>
          <div className={styles.footerSocials}>
            <a href={d.social_telegram || '#'} target="_blank" rel="noopener noreferrer" className={styles.footerSocialBtn}><Send size={16} /></a>
            <a href={d.social_youtube || '#'} target="_blank" rel="noopener noreferrer" className={styles.footerSocialBtn}><Play size={16} /></a>
            <a href={d.social_instagram || '#'} target="_blank" rel="noopener noreferrer" className={styles.footerSocialBtn}><Camera size={16} /></a>
          </div>
        </div>

        {/* Column 2: Quick Links */}
        <div>
          <h4 className={styles.footerTitle}>{isRu ? 'Быстрые ссылки' : 'Tezkor havolalar'}</h4>
          <div className={styles.footerLinks}>
            <Link href="/" className={styles.footerLink}>{isRu ? 'Главная' : 'Bosh sahifa'}</Link>
            <Link href="/catalog/veterinariya" className={styles.footerLink}>{isRu ? 'Ветеринарные препараты' : 'Veterinariya preparatlari'}</Link>
            <Link href="/catalog/agro-preparatlar" className={styles.footerLink}>{isRu ? 'Агро препараты' : 'Agro preparatlar'}</Link>
            <Link href="/catalog/barchasi" className={styles.footerLink}>{isRu ? 'Все продукты' : 'Barcha mahsulotlar'}</Link>
            <Link href="/news" className={styles.footerLink}>{isRu ? 'Новости' : 'Yangiliklar'}</Link>
            <Link href="/about" className={styles.footerLink}>{isRu ? 'О нас' : 'Biz haqimizda'}</Link>
          </div>
        </div>

        {/* Column 3: Categories */}
        <div>
          <h4 className={styles.footerTitle}>{isRu ? 'Категории' : 'Kategoriyalar'}</h4>
          <div className={styles.footerLinks}>
            <Link href="/catalog/agro-preparatlar?sub=insektisidlar" className={styles.footerLink}>{isRu ? 'Инсектициды' : 'Insektisidlar'}</Link>
            <Link href="/catalog/agro-preparatlar?sub=fungisidlar" className={styles.footerLink}>{isRu ? 'Фунгициды' : 'Fungisidlar'}</Link>
            <Link href="/catalog/agro-preparatlar?sub=gerbisidlar" className={styles.footerLink}>{isRu ? 'Гербициды' : 'Gerbisidlar'}</Link>
            <Link href="/catalog/veterinariya?sub=antibiotiklar" className={styles.footerLink}>{isRu ? 'Антибиотики' : 'Antibiotiklar'}</Link>
            <Link href="/catalog/veterinariya?sub=vitaminlar" className={styles.footerLink}>{isRu ? 'Витамины' : 'Vitaminlar'}</Link>
            <Link href="/catalog/veterinariya?sub=antiparazitar" className={styles.footerLink}>{isRu ? 'Антипаразитарные' : 'Antiparazitar'}</Link>
          </div>
        </div>

        {/* Column 4: Contact */}
        <div>
          <h4 className={styles.footerTitle}>{isRu ? 'Контакты' : 'Bog\'lanish'}</h4>
          <div className={styles.footerContact}>
            <div className={styles.footerContactItem}>
              <Phone size={16} />
              <div>
                <div style={{ color: 'white', fontWeight: 600 }}>{d.phone1}</div>
                <div>{val(d.work_hours, d.work_hours_ru)}</div>
              </div>
            </div>
            <div className={styles.footerContactItem}>
              <Mail size={16} />
              <span>{d.email1}</span>
            </div>
            <div className={styles.footerContactItem}>
              <MapPin size={16} />
              <span>{val(d.address_line1, d.address_line1_ru)}{val(d.address_line2, d.address_line2_ru) ? ` ${val(d.address_line2, d.address_line2_ru)}` : ''}</span>
            </div>
          </div>
        </div>
      </div>

      <div className={styles.footerBottom}>
        <span>{val(d.footer_copyright, d.footer_copyright_ru)}</span>
        <span>{val(d.footer_developer, d.footer_developer_ru)}</span>
      </div>
    </footer>
  );
}
