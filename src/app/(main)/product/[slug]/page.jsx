import { createClient } from '@supabase/supabase-js';
import { notFound } from 'next/navigation';
import ProductClient from './ProductClient';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
);

export const revalidate = 60; // 60s cache

export async function generateMetadata({ params }) {
  const resolvedParams = await params;
  const { data: product } = await supabase
    .from('products')
    .select('name, name_ru, description, description_ru, images')
    .eq('slug', resolvedParams.slug)
    .single();

  if (!product) {
    return { title: 'Mahsulot topilmadi | Top Agro Vet' };
  }

  return {
    title: `${product.name} | Top Agro Vet`,
    description: (product.description || product.description_ru || '').substring(0, 160),
    openGraph: {
      title: `${product.name} | Top Agro Vet`,
      description: (product.description || product.description_ru || '').substring(0, 160),
      images: product.images && product.images.length > 0 ? [product.images[0]] : [],
    },
  };
}

export async function generateStaticParams() {
  const { data: products } = await supabase.from('products').select('slug');
  if (!products) return [];
  
  return products.map((p) => ({
    slug: p.slug,
  }));
}

export default async function ProductPage({ params }) {
  const resolvedParams = await params;
  
  const { data, error } = await supabase
    .from('products')
    .select('*')
    .eq('slug', resolvedParams.slug)
    .single();

  if (error || !data) {
    notFound();
  }

  // Format data
  const product = {
    ...data,
    volumes: data.volumes || [],
    specifications: data.specifications || {},
    specifications_ru: data.specifications_ru || {},
    tabContent: data.tabContent || { description: data.description || '', usage: '', dosage: '', safety: '', docs: '', crops: [] },
    tabContent_ru: data.tabContent_ru || { description: data.description_ru || '', usage: '', dosage: '', safety: '', docs: '', crops: [] },
  };

  // Fetch similar products
  const { data: similarData } = await supabase
    .from('products')
    .select('*')
    .eq('category', data.category)
    .neq('id', data.id)
    .limit(4);

  return <ProductClient initialProduct={product} initialSimilar={similarData || []} />;
}
