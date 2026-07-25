import { createClient } from '@supabase/supabase-js';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';

// Resolve __dirname in ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Load .env.local
dotenv.config({ path: path.join(__dirname, '../.env.local') });

// Use SERVICE_ROLE_KEY to have admin rights for storage & DB bypass RLS
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || '';

if (!supabaseUrl || !supabaseKey) {
  console.error("Error: Supabase URL and Service Role Key must be provided in .env.local");
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

async function uploadImage(imagePathLocal) {
  try {
    // imagePathLocal is like "/products/uploads/media__1784718743188.png"
    // the actual file is in public folder
    const actualFilePath = path.join(__dirname, '../public', imagePathLocal);
    
    if (!fs.existsSync(actualFilePath)) {
      console.warn(`File not found: ${actualFilePath}`);
      return null;
    }

    const fileName = path.basename(actualFilePath);
    const fileBuffer = fs.readFileSync(actualFilePath);
    
    // Determine content type based on extension
    const ext = path.extname(fileName).toLowerCase();
    let contentType = 'image/png';
    if (ext === '.jpg' || ext === '.jpeg') contentType = 'image/jpeg';
    else if (ext === '.gif') contentType = 'image/gif';
    else if (ext === '.webp') contentType = 'image/webp';

    const { data, error } = await supabase.storage
      .from('products')
      .upload(`uploads/${fileName}`, fileBuffer, {
        contentType: contentType,
        upsert: true
      });

    if (error) {
      console.error(`Error uploading ${fileName}:`, error);
      return null;
    }

    // Get public URL
    const { data: publicUrlData } = supabase.storage
      .from('products')
      .getPublicUrl(`uploads/${fileName}`);

    return publicUrlData.publicUrl;
  } catch (err) {
    console.error(`Error processing image ${imagePathLocal}:`, err);
    return null;
  }
}

async function seedProducts() {
  try {
    // Ensure bucket exists
    const { data: buckets } = await supabase.storage.listBuckets();
    const bucketExists = buckets?.some(b => b.name === 'products');
    
    if (!bucketExists) {
      console.log('Creating "products" bucket...');
      await supabase.storage.createBucket('products', { public: true });
    }

    // Read products.json
    const productsPath = path.join(__dirname, '../src/data/products.json');
    const rawData = fs.readFileSync(productsPath, 'utf8');
    const products = JSON.parse(rawData);

    console.log(`Found ${products.length} products to insert.`);

    // Process products and upload images
    const processedProducts = [];
    for (let i = 0; i < products.length; i++) {
      const p = { ...products[i] };
      console.log(`Processing product ${i+1}/${products.length}: ${p.name}`);
      
      if (p.images && p.images.length > 0) {
        const newImages = [];
        for (const imgLocal of p.images) {
          // If it's already a full URL, keep it
          if (imgLocal.startsWith('http')) {
            newImages.push(imgLocal);
          } else {
            const publicUrl = await uploadImage(imgLocal);
            if (publicUrl) {
              newImages.push(publicUrl);
            } else {
              newImages.push(imgLocal); // fallback
            }
          }
        }
        p.images = newImages;
      }
      processedProducts.push(p);
    }

    // Insert into DB
    const { data, error } = await supabase
      .from('products')
      .upsert(
        processedProducts,
        { onConflict: 'slug' }
      );

    if (error) {
      throw error;
    }

    console.log('Successfully seeded products and uploaded images!');
  } catch (err) {
    console.error('Seeding failed:', err);
  }
}

seedProducts();
