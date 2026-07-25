import { createClient } from '@supabase/supabase-js';
import NewsClient from './NewsClient';

export const metadata = {
  title: 'Yangiliklar | Top Agro Vet',
  description: 'Top Agro Vet yangiliklari va maqolalari.',
};

// Server-side Supabase client (no auth needed, public read)
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
);

export const revalidate = 60; // 60 soniyada bir qayta yuklanadi

export default async function NewsPage() {
  const { data: newsList, error } = await supabase
    .from('news')
    .select('id, title, title_ru, excerpt, excerpt_ru, image_url, published_at')
    .order('published_at', { ascending: false });

  const items = error ? [] : (newsList || []);

  return <NewsClient items={items} />;
}
