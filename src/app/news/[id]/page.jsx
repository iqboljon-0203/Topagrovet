import Image from 'next/image';
import Link from 'next/link';
import { ArrowLeft, Calendar } from 'lucide-react';
import styles from './newsDetail.module.css';

// Reusing the DUMMY_NEWS data for now
const DUMMY_NEWS = [
  {
    id: 1,
    title: 'Yangi "Agro Gaucho" preparati sotuvga chiqdi',
    excerpt: 'Dehqonlarimiz uchun maxsus zararkunandalarga qarshi yangi samarali vosita endi omborlarimizda mavjud.',
    content: `
      So'nggi yillarda qishloq xo'jaligida hasharotlarga qarshi kurashish eng dolzarb muammolardan biriga aylanib ulgurdi. 
      Shu munosabat bilan, Top Agro Vet kompaniyasi mamnuniyat bilan o'zining yangi mahsuloti — "Agro Gaucho 70%" 
      preparatining sotuvga chiqqanligini e'lon qiladi.

      Ushbu vosita o'simliklarni ildiz orqali himoya qiluvchi sistemali insektitsid bo'lib, zararkunandalarga qarshi uzoq muddatli himoyani ta'minlaydi. 
      Preparat nafaqat samarali, balki iqtisodiy jihatdan ham fermerlarimizga qulaydir.

      Batafsil ma'lumot olish uchun mutaxassislarimizga murojaat qilishingiz mumkin.
    `,
    date: '2026-07-15',
    image: '/catalog-agro-bg.png',
  },
  {
    id: 2,
    title: 'Chorvachilik fermalarida profilaktika ahamiyati',
    excerpt: 'Kuz-qish mavsumi oldidan chorva mollarini kasalliklardan asrash bo`yicha mutaxassislar maslahati.',
    content: `
      Qish mavsumiga tayyorgarlik jarayonida chorva mollarini turli kasalliklardan asrash fermerlikdagi asosiy vazifa hisoblanadi. 
      Kompaniyamizning yetakchi veterinar shifokorlari bu borada kerakli va zarur chora-tadbirlar ro'yxatini shakllantirishdi.

      Eng avvalo mollarga o'z vaqtida kerakli vaksinalarni qildirish va ularni yuqori sifatli ozuqa qo'shimchalari bilan ta'minlash zarur.
      Bu ularning immunitetini oshirib, sovuq haroratga chidamliligini kafolatlaydi.
    `,
    date: '2026-07-10',
    image: '/catalog-vet-bg.png',
  },
  {
    id: 3,
    title: 'Toshkentda yirik agro ko`rgazma bo`lib o`tdi',
    excerpt: 'Bizning kompaniyamiz xalqaro qishloq xo`jaligi ko`rgazmasida o`zining yangi mahsulotlarini namoyish etdi.',
    content: `
      Yaqinda Toshkent shahrida o'tkazilgan xalqaro qishloq xo'jaligi va agro-texnologiyalar ko'rgazmasi 
      "Top Agro Vet" uchun juda muvaffaqiyatli bo'ldi. 
      
      Stendimiz minglab fermerlar va xorijiy hamkorlar e'tiborini tortdi. Ko'rgazma davomida bizning eng yangi 
      preparatlarimiz namoyish etildi hamda ko'plab yangi shartnomalar imzolandi.
      Sifat va ishonch - muvaffaqiyatimiz garovi!
    `,
    date: '2026-07-02',
    image: '/hero-bg.png',
  }
];

export async function generateMetadata({ params }) {
  // Await the params before accessing its properties
  const resolvedParams = await params;
  const newsItem = DUMMY_NEWS.find(n => n.id.toString() === resolvedParams.id);
  if (!newsItem) {
    return { title: 'Yangilik topilmadi | Top Agro Vet' };
  }
  return {
    title: `${newsItem.title} | Top Agro Vet`,
    description: newsItem.excerpt,
  };
}

export async function generateStaticParams() {
  return DUMMY_NEWS.map((newsItem) => ({
    id: newsItem.id.toString(),
  }));
}

export default async function NewsDetail({ params }) {
  // Await params object for dynamic routing compatibility
  const resolvedParams = await params;
  const newsItem = DUMMY_NEWS.find(n => n.id.toString() === resolvedParams.id);

  if (!newsItem) {
    return (
      <div className={styles.notFound}>
        <h1>Kechirasiz, yangilik topilmadi</h1>
        <Link href="/news" className={styles.backLink}>
          <ArrowLeft size={20} /> Orqaga qaytish
        </Link>
      </div>
    );
  }

  return (
    <div className={styles.page}>
      <div className={styles.container}>
        <Link href="/news" className={styles.backLink}>
          <ArrowLeft size={18} /> Barcha yangiliklar
        </Link>
        
        <article className={styles.article}>
          <div className={styles.header}>
            <div className={styles.date}>
              <Calendar size={16} />
              <span>{newsItem.date}</span>
            </div>
            <h1 className={styles.title}>{newsItem.title}</h1>
          </div>
          
          <div className={styles.heroImage}>
            <Image 
              src={newsItem.image} 
              alt={newsItem.title} 
              fill 
              style={{ objectFit: 'cover' }}
              unoptimized
            />
          </div>
          
          <div className={styles.content}>
            {newsItem.content.split('\n\n').map((paragraph, index) => (
              <p key={index}>{paragraph.trim()}</p>
            ))}
          </div>
        </article>
      </div>
    </div>
  );
}
