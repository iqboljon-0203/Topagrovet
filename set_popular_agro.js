const { createClient } = require('@supabase/supabase-js');
require('dotenv').config({ path: '.env.local' });

const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL, process.env.SUPABASE_SERVICE_ROLE_KEY);

async function main() {
  // Barcha agro-preparat mahsulotlarini olish
  const { data: agroProducts, error: fetchErr } = await supabase
    .from('products')
    .select('id, name')
    .eq('category', 'agro-preparatlar')
    .limit(5);

  if (fetchErr) {
    console.error('Fetch error:', fetchErr);
    return;
  }

  if (agroProducts.length === 0) {
    console.log('Bazada agro preparatlar yo\'q!');
    return;
  }

  const ids = agroProducts.map(p => p.id);
  console.log('Ommabop qilinayotgan mahsulotlar:', agroProducts.map(p => p.name).join(', '));

  const { error: updateErr } = await supabase
    .from('products')
    .update({ is_popular: true })
    .in('id', ids);

  if (updateErr) {
    console.error('Update error:', updateErr);
  } else {
    console.log('Muvaffaqiyatli yangilandi!');
  }
}
main();
