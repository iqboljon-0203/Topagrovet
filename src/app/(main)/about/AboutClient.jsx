'use client';

import Image from 'next/image';
import styles from './about.module.css';
import { useLanguage } from '@/context/LanguageContext';

export default function AboutClient({ data }) {
  const { language } = useLanguage();
  const isRu = language === 'ru';
  const val = (uzStr, ruStr) => isRu && ruStr ? ruStr : uzStr;

  return (
    <div className={styles.page}>
      {/* Hero Section */}
      <section className={styles.hero}>
        <div className={styles.container}>
          <h1 className={styles.title}>{val(data.hero_title, data.hero_title_ru)}</h1>
          <p className={styles.subtitle}>{val(data.hero_subtitle, data.hero_subtitle_ru)}</p>
        </div>
      </section>

      {/* Content Section */}
      <section className={styles.content}>
        <div className={styles.container}>
          <div className={styles.grid}>
            <div className={styles.imageWrap}>
              <div className={styles.imagePlaceholder}>
                <Image 
                  src={data.image_url || '/hero-bg.png'}
                  alt={val(data.hero_title, data.hero_title_ru) || 'Biz haqimizda'}
                  fill 
                  style={{ objectFit: 'cover' }}
                  unoptimized
                />
              </div>
            </div>
            <div className={styles.textContent}>
              <h2>{val(data.mission_title, data.mission_title_ru)}</h2>
              <p style={{ whiteSpace: 'pre-wrap' }}>{val(data.mission_text, data.mission_text_ru)}</p>
              
              <h2>{val(data.why_title, data.why_title_ru)}</h2>
              <ul className={styles.list}>
                {val(data.why_item1, data.why_item1_ru) && <li>{val(data.why_item1, data.why_item1_ru)}</li>}
                {val(data.why_item2, data.why_item2_ru) && <li>{val(data.why_item2, data.why_item2_ru)}</li>}
                {val(data.why_item3, data.why_item3_ru) && <li>{val(data.why_item3, data.why_item3_ru)}</li>}
                {val(data.why_item4, data.why_item4_ru) && <li>{val(data.why_item4, data.why_item4_ru)}</li>}
              </ul>
            </div>
          </div>
        </div>
      </section>
      {/* Hamkorlar (Partners) Section */}
      <section id="hamkorlar" className={styles.partners}>
        <div className={styles.container}>
          <h2 className={styles.partnersTitle}>
            {isRu ? 'Наши партнёры' : 'Bizning hamkorlar'}
          </h2>
          <p className={styles.partnersSubtitle}>
            {isRu 
              ? 'Мы являемся официальным дистрибьютором ведущих производителей ветеринарных и агро препаратов'
              : 'Biz yetakchi veterinariya va agro preparatlar ishlab chiqaruvchilarining rasmiy distribyutorimiz'}
          </p>
          <div className={styles.partnersGrid}>
            {/* Montajat */}
            <div className={styles.partnerCard}>
              <div className={styles.partnerLogo}>
                {data.partner1_logo && (
                  <div className={styles.partnerImgWrap}>
                    <Image
                      src={data.partner1_logo}
                      alt="Montajat"
                      fill
                      style={{ objectFit: 'contain' }}
                      unoptimized
                    />
                  </div>
                )}
                <span className={styles.partnerName}>Montajat</span>
                <span className={styles.partnerCountry}>🇸🇦 Saudiya Arabistoni</span>
              </div>
              <p className={styles.partnerDesc}>
                {isRu 
                  ? 'Ведущий производитель агрохимикатов Саудовской Аравии. Широкий ассортимент инсектицидов, фунгицидов и гербицидов.'
                  : 'Saudiya Arabistonining yetakchi agrokimyo mahsulotlari ishlab chiqaruvchisi. Insektisid, fungisid va gerbisidlarning keng assortimenti.'}
              </p>
            </div>
            {/* Veyong */}
            <div className={styles.partnerCard}>
              <div className={styles.partnerLogo}>
                {data.partner2_logo && (
                  <div className={styles.partnerImgWrap}>
                    <Image
                      src={data.partner2_logo}
                      alt="Veyong"
                      fill
                      style={{ objectFit: 'contain' }}
                      unoptimized
                    />
                  </div>
                )}
                <span className={styles.partnerName}>Veyong</span>
                <span className={styles.partnerCountry}>🇨🇳 Xitoy</span>
              </div>
              <p className={styles.partnerDesc}>
                {isRu 
                  ? 'Крупный производитель ветеринарных и агрохимических препаратов. Сертифицированная продукция международного качества.'
                  : 'Veterinariya va agrokimyo preparatlarining yirik ishlab chiqaruvchisi. Xalqaro sifat sertifikatlangan mahsulotlar.'}
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
