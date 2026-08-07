const fs = require('fs');
const path = require('path');

const productsPath = path.join(__dirname, 'src', 'data', 'products.json');
const products = JSON.parse(fs.readFileSync(productsPath, 'utf8'));

let maxId = products.reduce((max, p) => Math.max(max, p.id || 0), 0);

const newProducts = [
  {
    "slug": "top-obguron-ekstra",
    "name": "Top Obguron Ekstra",
    "category": "agro-preparatlar",
    "subcategory": "defoliant",
    "categoryLabel": "Agro preparatlar",
    "subcategoryLabel": "Defoliant",
    "activeIngredient": "Tidiazuron 360 g/L + Diuron 180 g/L",
    "description": "Yuqori samaraga ega defoliant",
    "shortDesc": "G'o'za va boshqa ekinlar uchun yuqori samarali defoliant.",
    "price": 0,
    "volumes": ["1 L"],
    "selectedVolume": "1 L",
    "inStock": true,
    "rating": 5.0,
    "reviewCount": 0,
    "manufacturer": "Noma'lum",
    "country": "Noma'lum",
    "preparatForm": "Emulsiya konsentrati",
    "classification": "Defoliant",
    "images": [],
    "specifications": {
      "Faol moddasi": "Tidiazuron 360 g/L + Diuron 180 g/L",
      "Preparat shakli": "Emulsiya konsentrati",
      "Tasnifi": "Defoliant"
    },
    "tabContent": {
      "description": "Yuqori samaraga ega defoliant.",
      "usage": "Ko'rsatmalarga asosan qo'llaniladi."
    }
  },
  {
    "slug": "dufaron",
    "name": "Dufaron",
    "category": "agro-preparatlar",
    "subcategory": "fungisid",
    "categoryLabel": "Agro preparatlar",
    "subcategoryLabel": "Fungisid",
    "activeIngredient": "Propikonazol 200 g/L + Tebukonazol 200 g/L",
    "description": "Zamburug' kasalliklariga qarshi yuqori samaraga ega tizimli fungisid",
    "shortDesc": "Zamburug'larga qarshi tizimli fungisid",
    "price": 0,
    "volumes": ["1 L"],
    "selectedVolume": "1 L",
    "inStock": true,
    "rating": 5.0,
    "reviewCount": 0,
    "manufacturer": "Noma'lum",
    "country": "Noma'lum",
    "preparatForm": "Emulsiya konsentrati",
    "classification": "Tizimli fungisid",
    "images": [],
    "specifications": {
      "Faol moddasi": "Propikonazol 200 g/L + Tebukonazol 200 g/L",
      "Preparat shakli": "Emulsiya konsentrati",
      "Tasnifi": "Tizimli fungisid"
    },
    "tabContent": {
      "description": "Zamburug' kasalliklariga qarshi yuqori samaraga ega tizimli fungisid.",
      "usage": "O'simliklarga purkaladi."
    }
  },
  {
    "slug": "agro-nurell",
    "name": "Agro Nurell",
    "category": "agro-preparatlar",
    "subcategory": "insektisid",
    "categoryLabel": "Agro preparatlar",
    "subcategoryLabel": "Insektisid/Akarisid",
    "activeIngredient": "40% em.k",
    "description": "Insektisid/Akarisid",
    "shortDesc": "Zararkunandalarga qarshi kompleks insektisid va akarisid",
    "price": 0,
    "volumes": ["1 L"],
    "selectedVolume": "1 L",
    "inStock": true,
    "rating": 5.0,
    "reviewCount": 0,
    "manufacturer": "Noma'lum",
    "country": "Noma'lum",
    "preparatForm": "Emulsiya konsentrati",
    "classification": "Insektisid/Akarisid",
    "images": [],
    "specifications": {
      "Faol moddasi": "40% em.k",
      "Preparat shakli": "Emulsiya konsentrati",
      "Tasnifi": "Insektisid/Akarisid"
    },
    "tabContent": {
      "description": "Zararkunandalar va kanalar (akarisid) ga qarshi samarali insektisid.",
      "usage": "Ko'rsatmalarga asosan qo'llaniladi."
    }
  },
  {
    "slug": "agro-ciperfos",
    "name": "AgroCiperfos",
    "category": "agro-preparatlar",
    "subcategory": "insektisid",
    "categoryLabel": "Agro preparatlar",
    "subcategoryLabel": "Insektisid/Akarisid",
    "activeIngredient": "Cipermetrin 40 g/l + Profenofos 400 g/l",
    "description": "Insektisid/Akarisid",
    "shortDesc": "Zararkunandalarga qarshi samarali vosita",
    "price": 0,
    "volumes": ["1 L"],
    "selectedVolume": "1 L",
    "inStock": true,
    "rating": 5.0,
    "reviewCount": 0,
    "manufacturer": "Noma'lum",
    "country": "Noma'lum",
    "preparatForm": "Emulsiya konsentrati",
    "classification": "Insektisid/Akarisid",
    "images": [],
    "specifications": {
      "Faol moddasi": "Cipermetrin 40 g/l + Profenofos 400 g/l",
      "Preparat shakli": "Emulsiya konsentrati",
      "Tasnifi": "Insektisid/Akarisid"
    },
    "tabContent": {
      "description": "G'o'za va boshqa ekinlardagi hasharotlar hamda kanalarni yo'q qiluvchi ta'sirli insektisid-akarisid.",
      "usage": "Ko'rsatmalarga asosan qo'llaniladi."
    }
  },
  {
    "slug": "agrostar",
    "name": "Agrostar",
    "category": "agro-preparatlar",
    "subcategory": "gerbitsid",
    "categoryLabel": "Agro preparatlar",
    "subcategoryLabel": "Gerbitsid",
    "activeIngredient": "Tribenuron-metil 750 g/kg",
    "description": "Ikki pallali va boshoqli don ekinlarida begona o'tlarni keng nazorat qilish uchun yuqori samarali gerbitsid",
    "shortDesc": "Begona o'tlarga qarshi samarali gerbitsid",
    "price": 0,
    "volumes": ["0.5 kg"],
    "selectedVolume": "0.5 kg",
    "inStock": true,
    "rating": 5.0,
    "reviewCount": 0,
    "manufacturer": "Noma'lum",
    "country": "Noma'lum",
    "preparatForm": "Suvda destirlangan granula",
    "classification": "Gerbitsid",
    "images": [],
    "specifications": {
      "Faol moddasi": "Tribenuron-metil 750 g/kg",
      "Preparat shakli": "Suvda destirlangan granula",
      "Tasnifi": "Gerbitsid",
      "Qadoqlash": "0.5 kg"
    },
    "tabContent": {
      "description": "Ikki pallali va boshoqli don ekinlarida begona o'tlarni keng nazorat qilish uchun yuqori samarali gerbitsid.",
      "usage": "Begona o'tlarga qarshi purkaladi."
    }
  }
];

newProducts.forEach((p) => {
  maxId++;
  p.id = maxId;
  products.push(p);
});

fs.writeFileSync(productsPath, JSON.stringify(products, null, 2), 'utf8');
console.log('Added 5 products successfully.');
