'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Phone, Send, ChevronRight, User, Leaf, HeartPulse } from 'lucide-react';
import { supabase } from '@/lib/supabaseClient';
import { useLanguage } from '@/context/LanguageContext';
import styles from './specialists.module.css';

export default function SpecialistsSection() {
  const { language } = useLanguage();
  const isRu = language === 'ru';
  const val = (uzStr, ruStr) => isRu && ruStr ? ruStr : uzStr;

  const [specialists, setSpecialists] = useState([]);

  useEffect(() => {
    async function fetchSpecialists() {
      const { data, error } = await supabase
        .from('specialists')
        .select('*')
        .eq('is_active', true)
        .order('sort_order', { ascending: true });

      if (!error && data) {
        setSpecialists(data);
      }
    }
    fetchSpecialists();
  }, []);

  // Fallback ma'lumotlar (agar bazadan kelmasa)
  const displaySpecialists = specialists.length > 0 ? specialists : [
    {
      id: 1,
      name: 'Mutaxassis 1',
      name_ru: 'Специалист 1',
      role: 'Agronomist',
      role_ru: 'Агроном',
      phone: '+998 90 000 00 00',
      telegram_link: '#',
      photo_url: null,
      type: 'agro',
    },
    {
      id: 2,
      name: 'Mutaxassis 2',
      name_ru: 'Специалист 2',
      role: 'Veterinar',
      role_ru: 'Ветеринар',
      phone: '+998 90 000 00 01',
      telegram_link: '#',
      photo_url: null,
      type: 'vet',
    }
  ];

  return (
    <section id="specialists" className={styles.section}>
      <div className={styles.container}>
        <div className={styles.header}>
          <h2 className={styles.title}>
            {isRu ? 'Наши специалисты' : 'Bizning mutaxassislar'}
          </h2>
          <p className={styles.subtitle}>
            {isRu 
              ? 'Наши агрономы и ветеринары готовы ответить на ваши вопросы' 
              : 'Agronomlarimiz va veterinarlarimiz savollaringizga javob berishga tayyor'}
          </p>
        </div>

        <div className={styles.grid}>
          {displaySpecialists.map((spec) => (
            <div key={spec.id} className={styles.card}>
              <div className={styles.photoWrap}>
                {spec.photo_url ? (
                  <Image
                    src={spec.photo_url}
                    alt={val(spec.name, spec.name_ru)}
                    width={120}
                    height={120}
                    className={styles.photo}
                  />
                ) : (
                  <div className={styles.photoPlaceholder}>
                    <User size={48} strokeWidth={1.2} />
                  </div>
                )}
                <div className={`${styles.typeBadge} ${spec.type === 'vet' ? styles.vetBadge : styles.agroBadge}`}>
                  {spec.type === 'vet' 
                    ? <><HeartPulse size={12} /> {isRu ? 'Ветеринар' : 'Veterinar'}</>
                    : <><Leaf size={12} /> {isRu ? 'Агроном' : 'Agronomist'}</>
                  }
                </div>
              </div>

              <div className={styles.info}>
                <h3 className={styles.name}>{val(spec.name, spec.name_ru)}</h3>
                <p className={styles.role}>{val(spec.role, spec.role_ru)}</p>

                <a href={`tel:${spec.phone}`} className={styles.phoneBtn}>
                  <Phone size={16} />
                  {spec.phone}
                </a>

                {spec.telegram_link && spec.telegram_link !== '#' && (
                  <a
                    href={spec.telegram_link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={styles.telegramBtn}
                  >
                    <Send size={16} />
                    {isRu ? 'Написать в Telegram' : "Telegram'da yozish"}
                  </a>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
