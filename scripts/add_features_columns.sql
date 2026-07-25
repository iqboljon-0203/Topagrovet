-- ============================================
-- hero_settings jadvaliga Features Bar ustunlarini qo'shish
-- Agar hero_settings jadvali ALLAQACHON yaratilgan bo'lsa ishga tushiring
-- ============================================

ALTER TABLE public.hero_settings
  ADD COLUMN IF NOT EXISTS feature1_title TEXT DEFAULT 'Keng assortiment',
  ADD COLUMN IF NOT EXISTS feature1_desc TEXT DEFAULT '1000+ mahsulot',
  ADD COLUMN IF NOT EXISTS feature2_title TEXT DEFAULT 'Ishonchli brendlar',
  ADD COLUMN IF NOT EXISTS feature2_desc TEXT DEFAULT 'Dunyo bo''ylab ishlab chiqaruvchilar',
  ADD COLUMN IF NOT EXISTS feature3_title TEXT DEFAULT 'Tez yetkazib berish',
  ADD COLUMN IF NOT EXISTS feature3_desc TEXT DEFAULT 'O''zbekistonda barcha viloyatlarga',
  ADD COLUMN IF NOT EXISTS feature4_title TEXT DEFAULT 'Mutaxassis konsultatsiyasi',
  ADD COLUMN IF NOT EXISTS feature4_desc TEXT DEFAULT 'Veterinar va agronomlar yordami';

-- Mavjud yozuvni yangilash
UPDATE public.hero_settings
SET
  feature1_title = 'Keng assortiment',
  feature1_desc = '1000+ mahsulot',
  feature2_title = 'Ishonchli brendlar',
  feature2_desc = 'Dunyo bo''ylab ishlab chiqaruvchilar',
  feature3_title = 'Tez yetkazib berish',
  feature3_desc = 'O''zbekistonda barcha viloyatlarga',
  feature4_title = 'Mutaxassis konsultatsiyasi',
  feature4_desc = 'Veterinar va agronomlar yordami'
WHERE id = 1;
