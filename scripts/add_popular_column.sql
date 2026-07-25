-- ============================================
-- products jadvaliga is_popular ustunini qo'shish
-- Agar mahsulotlar allaqachon bo'lsa ishga tushiring
-- ============================================

ALTER TABLE public.products
  ADD COLUMN IF NOT EXISTS is_popular BOOLEAN DEFAULT false;

-- Eng yuqori ratingga ega bo'lgan dastlabki 8ta mahsulotni popular qilib belgilab qo'yish (ixtiyoriy)
-- UPDATE public.products SET is_popular = true WHERE id IN (
--   SELECT id FROM public.products ORDER BY rating DESC NULLS LAST LIMIT 8
-- );
