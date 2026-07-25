'use client';

import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabaseClient';
import { Package, Award, Truck, Headphones } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';
import styles from './FeaturesBar.module.css';

export default function FeaturesBar() {
  const { language } = useLanguage();
  const [data, setData] = useState(null);

  useEffect(() => {
    async function fetchFeatures() {
      const { data, error } = await supabase
        .from('hero_settings')
        .select('*')
        .limit(1)
        .single();

      if (!error && data) {
        setData(data);
      }
    }
    fetchFeatures();
  }, []);

  const d = data || {
    feature1_title: 'Keng assortiment',
    feature1_desc: '1000+ mahsulot',
    feature2_title: 'Ishonchli brendlar',
    feature2_desc: 'Dunyo bo\'ylab ishlab chiqaruvchilar',
    feature3_title: 'Tez yetkazib berish',
    feature3_desc: 'O\'zbekistonda barcha viloyatlarga',
    feature4_title: 'Mutaxassis konsultatsiyasi',
    feature4_desc: 'Veterinar va agronomlar yordami',
  };

  const isRu = language === 'ru';
  const val = (uzStr, ruStr) => isRu && ruStr ? ruStr : uzStr;

  const features = [
    {
      icon: Package,
      title: val(d.feature1_title, d.feature1_title_ru),
      desc: val(d.feature1_desc, d.feature1_desc_ru),
    },
    {
      icon: Award,
      title: val(d.feature2_title, d.feature2_title_ru),
      desc: val(d.feature2_desc, d.feature2_desc_ru),
    },
    {
      icon: Truck,
      title: val(d.feature3_title, d.feature3_title_ru),
      desc: val(d.feature3_desc, d.feature3_desc_ru),
    },
    {
      icon: Headphones,
      title: val(d.feature4_title, d.feature4_title_ru),
      desc: val(d.feature4_desc, d.feature4_desc_ru),
    },
  ];

  return (
    <section className={styles.section}>
      <div className={styles.grid}>
        {features.map((f, i) => (
          <div key={i} className={styles.featureCard}>
            <div className={styles.featureIcon}>
              <f.icon size={20} strokeWidth={1.5} />
            </div>
            <div>
              <div className={styles.featureTitle}>{f.title}</div>
              <div className={styles.featureDesc}>{f.desc}</div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
