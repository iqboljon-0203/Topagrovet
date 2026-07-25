import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';
dotenv.config({ path: '.env.local' });

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);

async function setPopular() {
  console.log('Setting some products as popular...');
  
  // Get first 6 products to mark as popular
  const { data: products, error } = await supabase.from('products').select('id').limit(6);
  if (error) {
    console.error('Error fetching products:', error);
    return;
  }

  for (const p of products) {
    await supabase.from('products').update({ is_popular: true }).eq('id', p.id);
  }

  console.log('Successfully set popular products');
}
setPopular().catch(console.error);
