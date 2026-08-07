const fs = require('fs');
const path = require('path');

const productsPath = path.join(__dirname, 'src', 'data', 'products.json');
const products = JSON.parse(fs.readFileSync(productsPath, 'utf8'));

let maxId = products.reduce((max, p) => Math.max(max, p.id || 0), 0);

const newProduct = {
  "slug": "agro-zellek",
  "name": "AgroZellek",
  "category": "agro-preparatlar",
  "subcategory": "gerbitsid",
  "categoryLabel": "Agro preparatlar",
  "subcategoryLabel": "Gerbitsid",
  "activeIngredient": "Haloxyfop-R-metil 104 g/l",
  "description": "Bir yillik va ko'p yillik boshoqli begona o'tlarga qarshi samarali gerbitsid",
  "shortDesc": "Begona o'tlarga qarshi ta'sir etuvchi tizimli gerbitsid",
  "price": 0,
  "volumes": ["5 L"],
  "selectedVolume": "5 L",
  "inStock": true,
  "rating": 5.0,
  "reviewCount": 0,
  "manufacturer": "Noma'lum",
  "country": "Noma'lum",
  "preparatForm": "Emulsiya konsentrati",
  "classification": "Gerbitsid",
  "images": [],
  "specifications": {
    "Faol moddasi": "Haloxyfop-R-metil 104 g/l",
    "Preparat shakli": "Emulsiya konsentrati",
    "Tasnifi": "Gerbitsid"
  },
  "tabContent": {
    "description": "Bir yillik va ko'p yillik boshoqli begona o'tlarga qarshi tanlab ta'sir etuvchi tizimli gerbitsid.",
    "usage": "Ko'rsatmalarga asosan qo'llaniladi."
  }
};

maxId++;
newProduct.id = maxId;
products.push(newProduct);

fs.writeFileSync(productsPath, JSON.stringify(products, null, 2), 'utf8');
console.log('Added AgroZellek successfully.');
