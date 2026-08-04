'use client';

import Image from 'next/image';
import Link from 'next/link';
import { ArrowLeft, Calendar } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';
import styles from './newsDetail.module.css';

export default function NewsDetailClient({ newsItem }) {
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

  const title = val(newsItem.title, newsItem.title_ru);
  const contentStr = val(newsItem.content, newsItem.content_ru);
  const excerptStr = val(newsItem.excerpt, newsItem.excerpt_ru);

  return (
    <div className={styles.page}>
      <div className={styles.container}>
        <Link href="/news" className={styles.backLink}>
          <ArrowLeft size={18} /> {isRu ? 'Все новости' : 'Barcha yangiliklar'}
        </Link>
        
        <article className={styles.article}>
          <div className={styles.header}>
            <div className={styles.date}>
              <Calendar size={16} />
              <span>{formatDate(newsItem.published_at)}</span>
            </div>
            <h1 className={styles.title}>{title}</h1>
          </div>
          
          <div className={styles.heroImage}>
            <Image 
              src={newsItem.image_url || '/hero-bg.png'} 
              alt={title} 
              fill 
              style={{ objectFit: 'cover' }}
              unoptimized
            />
          </div>
          
          <div className={styles.content}>
            {contentStr ? (
              contentStr.split('\n\n').map((paragraph, index) => (
                <p key={index}>{paragraph.trim()}</p>
              ))
            ) : (
              <p>{excerptStr}</p>
            )}
          </div>
        </article>
      </div>
    </div>
  );
}
