import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';
dotenv.config({ path: '.env.local' });

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);

async function checkRLS() {
  console.log('Testing anon key update (is_popular)...');
  const { data: prods } = await supabase.from('products').select('id, is_popular').limit(1);
  if (prods && prods.length > 0) {
    const id = prods[0].id;
    const current = prods[0].is_popular;
    
    const { data, error } = await supabase
      .from('products')
      .update({ is_popular: !current })
      .eq('id', id)
      .select();
      
    if (error) {
      console.log('Update error:', error);
    } else {
      console.log('Update success! Updated data:', data);
      
      // Revert it back
      await supabase.from('products').update({ is_popular: current }).eq('id', id);
    }
  }
}
checkRLS();
