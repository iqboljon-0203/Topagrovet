'use client';

import Image from 'next/image';
import Link from 'next/link';
import { Calendar, ArrowRight } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';
import styles from './news.module.css';

export default function NewsClient({ items }) {
  const { language } = useLanguage();
  const isRu = language === 'ru';
  const val = (uzStr, ruStr) => isRu && ruStr ? ruStr : uzStr;

  function formatDate(dateStr) {
    if (!dateStr) return '';
    return new Date(dateStr).toLocaleDateString(isRu ? 'ru-RU' : 'uz-UZ', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  }

  return (
    <div className={styles.page}>
      <div className={styles.container}>
        <div className={styles.header}>
          <h1 className={styles.title}>{isRu ? 'Последние новости' : 'So\'nggi yangiliklar'}</h1>
          <p className={styles.subtitle}>
            {isRu ? 'Будьте в курсе деятельности нашей компании и новостей отрасли.' : 'Kompaniyamiz faoliyati va sohadagi yangiliklardan xabardor bo\'ling.'}
          </p>
        </div>

        {items.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '4rem', color: '#94a3b8' }}>
            <p style={{ fontSize: '1rem' }}>{isRu ? 'Пока нет новостей.' : 'Hozircha yangiliklar yo\'q.'}</p>
          </div>
        ) : (
          <div className={styles.newsGrid}>
            {items.map((news) => (
              <article key={news.id} className={styles.newsCard}>
                <div className={styles.imageWrap}>
                  <div className={styles.imagePlaceholder}>
                    <Image
                      src={news.image_url || '/hero-bg.png'}
                      alt={val(news.title, news.title_ru)}
                      fill
                      style={{ objectFit: 'cover' }}
                      unoptimized
                    />
                  </div>
                </div>
                <div className={styles.cardContent}>
                  <div className={styles.date}>
                    <Calendar size={14} />
                    <span>{formatDate(news.published_at)}</span>
                  </div>
                  <h3 className={styles.newsTitle}>{val(news.title, news.title_ru)}</h3>
                  <p className={styles.newsExcerpt}>{val(news.excerpt, news.excerpt_ru)}</p>
                  <Link href={`/news/${news.id}`} className={styles.readMore}>
                    {isRu ? 'Читать далее' : 'Batafsil o\'qish'} <ArrowRight size={16} />
                  </Link>
                </div>
              </article>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
