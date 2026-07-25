import { supabase } from '@/lib/supabaseClient';

export async function generateStaticParams() {
  const { data } = await supabase.from('products').select('slug');
  return data?.map((product) => ({
    slug: product.slug,
  })) || [];
}

export default function Layout({ children }) {
  return children;
}
