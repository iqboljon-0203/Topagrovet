import { createClient } from '@supabase/supabase-js';
import HeroSection from '@/components/home/HeroSection';
import CategoriesSection from '@/components/home/CategoriesSection';
import FeaturesBar from '@/components/home/FeaturesBar';
import PopularProducts from '@/components/home/PopularProducts';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
);

export const revalidate = 60; // 60 seconds

export default async function Home() {
  // Parallel fetch for all home page data to minimize LCP delay
  const [heroRes, catRes, popRes] = await Promise.all([
    supabase.from('hero_settings').select('*').limit(1).single(),
    supabase.from('categories_settings').select('*').limit(1).single(),
    supabase.from('products').select('*').eq('is_popular', true).order('rating', { ascending: false }).limit(10)
  ]);

  return (
    <>
      <HeroSection heroData={heroRes.data} />
      <CategoriesSection categoriesData={catRes.data} />
      <FeaturesBar />
      <PopularProducts initialProducts={popRes.data || []} />
    </>
  );
}
