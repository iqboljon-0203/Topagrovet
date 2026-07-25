import { createClient } from '@supabase/supabase-js';
import { notFound } from 'next/navigation';
import NewsDetailClient from './NewsDetailClient';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import styles from './newsDetail.module.css';

// Server-side Supabase client (no auth needed, public read)
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
);

export const revalidate = 60; // 60 soniyada bir qayta yuklanadi

export async function generateMetadata({ params }) {
  const resolvedParams = await params;
  const { data: newsItem } = await supabase
    .from('news')
    .select('title, excerpt')
    .eq('id', resolvedParams.id)
    .single();

  if (!newsItem) {
    return { title: 'Yangilik topilmadi | Top Agro Vet' };
  }
  return {
    title: `${newsItem.title} | Top Agro Vet`,
    description: newsItem.excerpt,
  };
}

export async function generateStaticParams() {
  const { data: newsList } = await supabase.from('news').select('id');
  if (!newsList) return [];
  
  return newsList.map((newsItem) => ({
    id: newsItem.id.toString(),
  }));
}

export default async function NewsDetail({ params }) {
  const resolvedParams = await params;
  
  const { data: newsItem, error } = await supabase
    .from('news')
    .select('*')
    .eq('id', resolvedParams.id)
    .single();

  if (error || !newsItem) {
    return (
      <div className={styles.notFound}>
        <h1>Kechirasiz, yangilik topilmadi</h1>
        <Link href="/news" className={styles.backLink}>
          <ArrowLeft size={20} /> Orqaga qaytish
        </Link>
      </div>
    );
  }

  return <NewsDetailClient newsItem={newsItem} />;
}
