import { createClient } from '@supabase/supabase-js';
import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config({ path: path.join(__dirname, '../.env.local') });

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || '';

const supabase = createClient(supabaseUrl, supabaseKey);

async function fixNewsImages() {
  try {
    const { data: news, error: fetchError } = await supabase.from('news').select('*').order('published_at', { ascending: false });
    if (fetchError) throw fetchError;

    // Use better photos from the public folder that have clear backgrounds
    const betterImages = ['/catalog-vet-bg.png', '/catalog-agro-bg.png', '/hero-bg-v2.png'];

    for (let i = 0; i < news.length; i++) {
      const item = news[i];
      const newImage = betterImages[i % betterImages.length];
      
      const { error: updateError } = await supabase
        .from('news')
        .update({ image_url: newImage })
        .eq('id', item.id);
        
      if (updateError) throw updateError;
      console.log(`Updated news "${item.title}" with image ${newImage}`);
    }

    console.log('Successfully updated all news images with better photos!');
  } catch (err) {
    console.error('Failed to update news images:', err);
  }
}

fixNewsImages();
