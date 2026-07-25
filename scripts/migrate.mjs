import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://kzfybmwmgfghgruxonte.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imt6ZnlibXdtZ2ZnaGdydXhvbnRlIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc4NDgwOTI5MCwiZXhwIjoyMTAwMzg1MjkwfQ.DfKi67ZZiCOhYJ9U_miFd6iIXTlWjT_atPGCH7TeNqU';

const supabase = createClient(supabaseUrl, supabaseKey);

async function runMigration() {
  console.log('Migratsiya boshlanmoqda...');

  // 1. Kategoriyalarni yaratish
  console.log('1. Kategoriyalarni yaratish');
  const mainCats = [
    { name: 'Veterinariya preparatlari', slug: 'veterinariya', icon: 'shield', type: 'veterinariya' },
    { name: 'Agro preparatlar', slug: 'agro-preparatlar', icon: 'leaf', type: 'agro' }
  ];

  for (const cat of mainCats) {
    const { data, error } = await supabase.from('product_categories').insert(cat).select().single();
    if (error && error.code !== '23505') console.error('Error inserting', cat.slug, error);
  }

  const { data: vet } = await supabase.from('product_categories').select('*').eq('slug', 'veterinariya').single();
  const { data: agro } = await supabase.from('product_categories').select('*').eq('slug', 'agro-preparatlar').single();

  if (vet) {
    const subCatsVet = [
      { name: 'Parazitlarga qarshi vositalar', slug: 'parazitlarga-qarshi-vositalar', parent_id: vet.id, icon: 'bug', type: 'veterinariya' },
      { name: 'Antibakterial va yallig\'lanishga qarshi vositalar', slug: 'antibakterial-va-yalliglanishga-qarshi-vositalar', parent_id: vet.id, icon: 'pill', type: 'veterinariya' },
      { name: 'Akusherlik-ginekologik vositalar', slug: 'akusherlik-ginekologik-vositalar', parent_id: vet.id, icon: 'heart', type: 'veterinariya' }
    ];
    for (const cat of subCatsVet) {
      const { error } = await supabase.from('product_categories').insert(cat);
      if (error && error.code !== '23505') console.error('Error inserting', cat.slug, error);
    }
  }

  if (agro) {
    const subCatsAgro = [
      { name: 'Insektotsid', slug: 'insektotsid', parent_id: agro.id, icon: 'bug', type: 'agro' },
      { name: 'Fungitsid', slug: 'fungitsid', parent_id: agro.id, icon: 'leaf', type: 'agro' },
      { name: 'Gerbitsid', slug: 'gerbitsid', parent_id: agro.id, icon: 'sprout', type: 'agro' }
    ];
    for (const cat of subCatsAgro) {
      const { error } = await supabase.from('product_categories').insert(cat);
      if (error && error.code !== '23505') console.error('Error inserting', cat.slug, error);
    }
  }

  // 2. Mahsulotlarni yangilash
  console.log('2. Mahsulotlarni yangilash');
  
  await supabase.from('products').update({ category: 'agro-preparatlar' }).eq('category', 'agro');

  const subcatMapping = {
    'parazitlarga-qarshi': 'parazitlarga-qarshi-vositalar',
    'antibakterial': 'antibakterial-va-yalliglanishga-qarshi-vositalar',
    'akusherlik': 'akusherlik-ginekologik-vositalar'
  };

  for (const [oldSlug, newSlug] of Object.entries(subcatMapping)) {
    await supabase.from('products').update({ subcategory: newSlug }).eq('subcategory', oldSlug);
  }

  console.log('Migratsiya tugadi!');
}

runMigration().catch(console.error);
