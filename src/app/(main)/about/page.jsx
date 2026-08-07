import { createClient } from '@supabase/supabase-js';
import AboutClient from './AboutClient';

export const metadata = {
  title: 'Biz haqimizda | Top Agro Vet',
  description: 'Top Agro Vet kompaniyasi haqida ma`lumot.',
};

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
);

export const dynamic = 'force-dynamic';

export default async function AboutPage() {
  const { data: aboutSettings } = await supabase
    .from('about_settings')
    .select('*')
    .limit(1)
    .single();

  const data = aboutSettings || {
    hero_title: 'Biz haqimizda',
    hero_subtitle: '"Top Agro Vet" — O\'zbekiston qishloq xo\'jaligi va veterinariya sohasida ishonchli hamkoringiz. Bizning maqsadimiz fermer va dehqonlarimizga eng sifatli dori vositalari hamda ozuqa qo\'shimchalarini yetkazib berishdir.',
    mission_title: 'Bizning missiyamiz',
    mission_text: 'Sog\'lom chorva va mo\'l hosil yetishtirishda eng ilg\'or xorijiy va mahalliy texnologiyalarni yurtimizga olib kirish. Sifat, ishonch va halollik — bizning asosiy tamoyillarimiz.',
    why_title: 'Nima uchun bizni tanlashadi?',
    why_item1: 'Yuqori sifat: Barcha mahsulotlarimiz sertifikatlangan va sinovdan o\'tgan.',
    why_item2: 'Keng assortiment: 100 dan ortiq turdagi veterinariya va agro preparatlar.',
    why_item3: 'Mutaxassis maslahati: Tajribali agronom va veterinar shifokorlarimiz sizga bepul maslahat beradi.',
    why_item4: 'Tezkor yetkazib berish: Respublika bo\'ylab yetkazib berish xizmati.',
    image_url: '/hero-bg.png',
    partner1_logo: '',
    partner2_logo: '',
  };

  return <AboutClient data={data} />;
}
