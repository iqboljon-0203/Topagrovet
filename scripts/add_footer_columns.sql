-- ============================================
-- Agar contact_info jadvali ALLAQACHON yaratilgan bo'lsa,
-- faqat shu qo'shimcha ustunlarni qo'shish uchun ishga tushiring:
-- ============================================

ALTER TABLE public.contact_info
  ADD COLUMN IF NOT EXISTS footer_description TEXT DEFAULT '',
  ADD COLUMN IF NOT EXISTS social_telegram TEXT DEFAULT '',
  ADD COLUMN IF NOT EXISTS social_youtube TEXT DEFAULT '',
  ADD COLUMN IF NOT EXISTS social_instagram TEXT DEFAULT '',
  ADD COLUMN IF NOT EXISTS footer_copyright TEXT DEFAULT '',
  ADD COLUMN IF NOT EXISTS footer_developer TEXT DEFAULT '';

-- Mavjud yozuvni yangilash
UPDATE public.contact_info
SET
  footer_description = 'O''zbekistonda veterinariya va agro preparatlarning ishonchli yetkazib beruvchisi. 1000+ dan ortiq mahsulot, sertifikatlangan sifat va mutaxassis maslahatlar.',
  social_telegram = 'https://t.me/topagrovet',
  social_youtube = 'https://youtube.com/@topagrovet',
  social_instagram = 'https://instagram.com/topagrovet',
  footer_copyright = '© 2026 Top Agro Vet. Barcha huquqlar himoyalangan.',
  footer_developer = 'Sayt Dream Tech IT agency tomonidan ishlab chiqilgan'
WHERE id = 1;
