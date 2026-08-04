'use client';

import { Package, Award, Truck, Headphones } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';
import Link from 'next/link';
import styles from './FeaturesBar.module.css';

const DEFAULT_FEATURES = [
  {
    icon: Package,
    titleUz: 'Keng assortiment',
    titleRu: 'Широкий ассортимент',
    descUz: '1000+ mahsulot',
    descRu: '1000+ продуктов',
    href: '/catalog/barchasi',
  },
  {
    icon: Award,
    titleUz: 'Ishonchli brendlar',
    titleRu: 'Надёжные бренды',
    descUz: 'Montajat va Veyong',
    descRu: 'Montajat и Veyong',
    href: '/about#hamkorlar',
  },
  {
    icon: Truck,
    titleUz: "Tez yetkazib berish",
    titleRu: 'Быстрая доставка',
    descUz: "O'zbekistonda barcha viloyatlarga",
    descRu: 'По всем регионам Узбекистана',
    href: '/contact',
  },
  {
    icon: Headphones,
    titleUz: 'Mutaxassis konsultatsiyasi',
    titleRu: 'Консультация специалиста',
    descUz: 'Veterinar va agronomlar yordami',
    descRu: 'Помощь ветеринаров и агрономов',
    href: '/#specialists',
  },
];

export default function FeaturesBar() {
  const { language } = useLanguage();
  const isRu = language === 'ru';

  return (
    <section className={styles.section}>
      <div className={styles.grid}>
        {DEFAULT_FEATURES.map((f, i) => (
          <Link key={i} href={f.href} className={styles.featureCard}>
            <div className={styles.featureIcon}>
              <f.icon size={20} strokeWidth={1.5} />
            </div>
            <div>
              <div className={styles.featureTitle}>{isRu ? f.titleRu : f.titleUz}</div>
              <div className={styles.featureDesc}>{isRu ? f.descRu : f.descUz}</div>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
