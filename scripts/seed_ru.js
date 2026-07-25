import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';
dotenv.config({ path: '.env.local' });

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);

async function seed() {
  console.log('Seeding Russian translations...');
  
  // 1. hero_settings
  const { error: heroErr } = await supabase.from('hero_settings').update({
    title_line1_ru: 'Надежный выбор для',
    title_line2_ru: 'здоровых животных',
    title_highlight_ru: 'и богатого урожая!',
    subtitle_ru: 'Широкий ассортимент ветеринарных и агро препаратов только в Top Agro Vet.',
    btn1_text_ru: 'Ветеринарные препараты',
    btn2_text_ru: 'Агро препараты',
    trust1_ru: '100% оригинальная продукция',
    trust2_ru: 'Сертифицированное качество',
    trust3_ru: 'Помощь специалистов',
    feature1_title_ru: 'Высокое качество',
    feature1_desc_ru: 'Вся продукция сертифицирована',
    feature2_title_ru: 'Широкий ассортимент',
    feature2_desc_ru: 'Более 1000 наименований',
    feature3_title_ru: 'Быстрая доставка',
    feature3_desc_ru: 'По всей республике',
    feature4_title_ru: 'Консультация специалистов',
    feature4_desc_ru: 'Помощь ветеринаров и агрономов'
  }).eq('id', 1);
  if (heroErr) console.error('Hero Error:', heroErr);

  // 2. categories_settings
  const { error: catErr } = await supabase.from('categories_settings').update({
    vet_title_ru: 'Ветеринарные препараты',
    vet_desc_ru: 'Здоровье животных - наша забота',
    vet_btn_text_ru: 'Смотреть каталог',
    vet_item1_ru: 'Антибиотики',
    vet_item2_ru: 'Витамины',
    vet_item3_ru: 'Антипаразитарные средства',
    vet_item4_ru: 'Вакцины и сыворотки',
    vet_item5_ru: 'Дезинфицирующие средства',
    vet_item6_ru: 'Кормовые добавки',
    
    agro_title_ru: 'Агро препараты',
    agro_desc_ru: 'Лучшие решения для богатого урожая',
    agro_btn_text_ru: 'Смотреть каталог',
    agro_item1_ru: 'Инсектициды',
    agro_item2_ru: 'Фунгициды',
    agro_item3_ru: 'Гербициды',
    agro_item4_ru: 'Стимуляторы роста',
    agro_item5_ru: 'Микроэлементы',
    agro_item6_ru: 'Биологические препараты'
  }).eq('id', 1);
  if (catErr) console.error('Categories Error:', catErr);

  // 3. contact_info
  const { error: contactErr } = await supabase.from('contact_info').update({
    footer_description_ru: 'ООО «Top Agro Vet» — надежный поставщик качественных и доступных препаратов для сельского хозяйства и ветеринарии Узбекистана.',
    topbar_marquee_ru: '⭐ Качественная продукция – залог здоровых животных и богатого урожая!',
    address_line1_ru: 'г. Ташкент, Чиланзарский р-н',
    address_line2_ru: 'проспект Бунёдкор 42',
    work_hours_ru: 'Ежедневно 08:00 - 18:00',
    day_off_ru: 'Воскресенье',
    footer_copyright_ru: '© 2026 ООО «Top Agro Vet». Все права защищены.',
    footer_developer_ru: 'Разработано IT-агентством Dream Tech'
  }).eq('id', 1);
  if (contactErr) console.error('Contact Error:', contactErr);

  // 4. about_settings
  const { error: aboutErr } = await supabase.from('about_settings').update({
    hero_title_ru: 'О нас',
    hero_subtitle_ru: 'ООО «Top Agro Vet» — ваш надежный партнер в сфере сельского хозяйства и ветеринарии.',
    mission_title_ru: 'Наша Миссия',
    mission_text_ru: 'Внедрение передовых зарубежных и отечественных технологий для выращивания здорового скота и получения богатого урожая.',
    why_title_ru: 'Почему выбирают нас?',
    why_item1_ru: 'Высокое качество: Вся наша продукция сертифицирована и протестирована.',
    why_item2_ru: 'Широкий ассортимент: Более 100 видов ветеринарных и агро препаратов.',
    why_item3_ru: 'Консультация специалистов: Наши опытные агрономы и ветеринары дадут вам бесплатную консультацию.',
    why_item4_ru: 'Быстрая доставка: Служба доставки по всей республике.'
  }).eq('id', 1);
  if (aboutErr) console.error('About Error:', aboutErr);

  console.log('Successfully updated translations');
}
seed().catch(console.error);
