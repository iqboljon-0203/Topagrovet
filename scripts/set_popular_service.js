import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';
dotenv.config({ path: '.env.local' });

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY; // Using service role key
const supabase = createClient(supabaseUrl, supabaseKey);

async function setPopular() {
  console.log('Setting some products as popular using service role key...');
  
  // Get first 6 products to mark as popular
  const { data: products, error } = await supabase.from('products').select('id').limit(6);
  if (error) {
    console.error('Error fetching products:', error);
    return;
  }

  for (const p of products) {
    const { data, error: updateError } = await supabase.from('products').update({ is_popular: true }).eq('id', p.id).select();
    if (updateError) {
      console.error('Error updating product:', p.id, updateError);
    } else {
      console.log('Updated product:', p.id);
    }
  }

  console.log('Successfully set popular products');
}
setPopular().catch(console.error);
