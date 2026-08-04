import { createClient } from '@supabase/supabase-js';
import CatalogClient from './CatalogClient';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
);

export const revalidate = 60;

export async function generateMetadata({ params }) {
  const resolvedParams = await params;
  if (resolvedParams.category === 'barchasi') {
    return { title: 'Katalog | Top Agro Vet', description: 'Barcha mahsulotlar' };
  }

  const { data: category } = await supabase
    .from('product_categories')
    .select('name, name_ru, description')
    .eq('slug', resolvedParams.category)
    .single();

  if (!category) return { title: 'Katalog | Top Agro Vet' };

  return {
    title: `${category.name} | Top Agro Vet`,
    description: category.description || `${category.name} katalogi`,
  };
}

export async function generateStaticParams() {
  const { data: cats } = await supabase.from('product_categories').select('slug').is('parent_id', null);
  const paths = (cats || []).map(c => ({ category: c.slug }));
  paths.push({ category: 'barchasi' });
  return paths;
}

export default async function CatalogServerPage({ params }) {
  const resolvedParams = await params;
  
  // Parallel fetch using Promise.all for faster response
  const [catsResponse, prodsResponse] = await Promise.all([
    supabase.from('product_categories').select('*'),
    supabase.from('products').select('*').order('created_at', { ascending: false })
  ]);

  return (
    <CatalogClient 
      initialCategories={catsResponse.data || []} 
      initialProducts={prodsResponse.data || []} 
      categorySlug={resolvedParams.category} 
    />
  );
}
