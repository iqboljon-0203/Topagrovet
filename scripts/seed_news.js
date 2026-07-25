import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';
dotenv.config({ path: '.env.local' });

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);

async function seedNews() {
  console.log('Seeding Russian news translations...');
  
  const { data: newsItems, error } = await supabase.from('news').select('*');
  if (error) {
    console.error('Error fetching news:', error);
    return;
  }

  for (const item of newsItems) {
    let title_ru = item.title;
    let excerpt_ru = item.excerpt;
    let content_ru = item.content;

    if (item.title.includes('Yangi veterinariya')) {
      title_ru = 'Поступили новые ветеринарные препараты';
      excerpt_ru = 'На наш склад поступили самые новые и эффективные ветеринарные препараты.';
      content_ru = 'Уважаемые партнеры! Спешим сообщить о поступлении новой партии высококачественных ветеринарных препаратов от ведущих мировых производителей. В ассортименте представлены антибиотики, витамины и противопаразитарные средства.';
    } else if (item.title.includes('Agro ko\'rgazma')) {
      title_ru = 'Результаты агровыставки 2026';
      excerpt_ru = 'Команда Top Agro Vet приняла активное участие в очередной агровыставке.';
      content_ru = 'На прошедшей в Ташкенте агровыставке команда Top Agro Vet продемонстрировала свои новые продукты. В ходе выставки было заключено множество новых партнерских соглашений, а фермерам были даны консультации по сельскому хозяйству. Благодарим всех участников!';
    } else if (item.title.includes('Chorvachilikda to\'g\'ri')) {
      title_ru = 'Секреты правильного кормления в животноводстве';
      excerpt_ru = 'Бесплатные советы и рекомендации от наших специалистов для фермеров.';
      content_ru = 'Правильное кормление — залог здоровья и высокой продуктивности животных. Наши эксперты делятся секретами составления сбалансированного рациона с использованием витаминных и минеральных добавок.';
    } else {
      title_ru = item.title + ' (RU)';
      excerpt_ru = item.excerpt + ' (RU)';
      content_ru = item.content + ' (RU)';
    }

    await supabase.from('news').update({
      title_ru,
      excerpt_ru,
      content_ru
    }).eq('id', item.id);
  }

  console.log('Successfully updated news translations');
}
seedNews().catch(console.error);
