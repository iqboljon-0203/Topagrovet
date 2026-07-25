-- Eski 'agro' kategoriyasini yangi 'agro-preparatlar' slug'iga o'zgartirish
UPDATE public.products 
SET category = 'agro-preparatlar' 
WHERE category = 'agro';

-- Ba'zi eski subkategoriya sluglarini yangisiga o'zgartirish (agar mavjud bo'lsa)
UPDATE public.products SET subcategory = 'parazitlarga-qarshi-vositalar' WHERE subcategory = 'parazitlarga-qarshi';
UPDATE public.products SET subcategory = 'antibakterial-va-yalliglanishga-qarshi-vositalar' WHERE subcategory = 'antibakterial';
UPDATE public.products SET subcategory = 'akusherlik-ginekologik-vositalar' WHERE subcategory = 'akusherlik';
UPDATE public.products SET subcategory = 'insektotsid' WHERE subcategory = 'insektotsid';
UPDATE public.products SET subcategory = 'fungitsid' WHERE subcategory = 'fungitsid';
UPDATE public.products SET subcategory = 'gerbitsid' WHERE subcategory = 'gerbitsid';
