import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';
dotenv.config({ path: '.env.local' });

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);

async function testStorage() {
  console.log('Testing storage upload with anon key...');
  const { data, error } = await supabase.storage.from('products').upload('test.txt', 'Hello world');
  console.log('Upload Error:', error);
  console.log('Upload Data:', data);
  
  if (data) {
    await supabase.storage.from('products').remove(['test.txt']);
  }
}
testStorage();
