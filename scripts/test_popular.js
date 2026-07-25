import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';
dotenv.config({ path: '.env.local' });

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);

async function testUpdate() {
  const { data: prods } = await supabase.from('products').select('id').limit(1);
  if (prods && prods.length > 0) {
    console.log('Attempting to update product:', prods[0].id);
    const { data, error } = await supabase.from('products').update({ is_popular: true }).eq('id', prods[0].id).select();
    console.log('Update Error:', error);
    console.log('Update Data:', data);
  }
}
testUpdate().catch(console.error);
