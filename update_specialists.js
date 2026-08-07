const { createClient } = require('@supabase/supabase-js');
require('dotenv').config({ path: '.env.local' });
const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL, process.env.SUPABASE_SERVICE_ROLE_KEY);

async function run() {
  await supabase.from('specialists').delete().neq('id', 0);
  
  const specialists = [
    {
      name: 'Mamatov Sohibjon',
      name_ru: 'Маматов Сохибжон',
      role: 'Bosh agranom',
      role_ru: 'Главный агроном',
      phone: '+998 99 761 80 00',
      telegram_link: 'https://t.me/Sokhibjon_Mamatov',
      photo_url: '/specialists/photo1.jpg',
      type: 'agro',
      is_active: true,
      sort_order: 1
    },
    {
      name: 'Dilfuza',
      name_ru: 'Дилфуза',
      role: 'Buxgalter',
      role_ru: 'Бухгалтер',
      phone: '+998 99 764 80 00',
      telegram_link: 'https://t.me/topagrovet',
      photo_url: '/specialists/photo2.jpg',
      type: 'agro',
      is_active: true,
      sort_order: 2
    },
    {
      name: 'Muattar',
      name_ru: 'Муаттар',
      role: 'Sotuv manageri',
      role_ru: 'Менеджер по продажам',
      phone: '+998 88 544 80 00',
      telegram_link: 'https://t.me/Muattarr89',
      photo_url: '/specialists/photo3.jpg',
      type: 'agro',
      is_active: true,
      sort_order: 3
    },
    {
      name: 'Asatullayev Muzaffarxon',
      name_ru: 'Асатуллаев Музаффархон',
      role: 'Bosh veterinar',
      role_ru: 'Главный ветеринар',
      phone: '+998 99 786 80 00',
      telegram_link: 'https://t.me/Muzaffarxon098',
      photo_url: '/specialists/photo4.jpg',
      type: 'vet',
      is_active: true,
      sort_order: 4
    }
  ];
  
  const { error } = await supabase.from('specialists').insert(specialists);
  if (error) console.error(error);
  else console.log('Done');
}
run();
