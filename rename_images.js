const fs = require('fs');
const path = require('path');

const dir = path.join(__dirname, 'public', 'products');
const files = fs.readdirSync(dir).filter(f => f.endsWith('.png'));

// The files match the order based on their sizes or identifiable names.
// 1440798 -> Agro Zellek 5 litr
// 2637639 -> agrostar 0.5 kg
// 1920835 -> Top Obguron Ekstra
// 1844336 -> Dufaron
// 1740262 -> Agro Nurell
// 1508356 -> Agro Ciperfos

const renameMap = {
  '1440798': 'agro-zellek.png',
  '2637639': 'agrostar.png',
  '1920835': 'top-obguron-ekstra.png',
  '1844336': 'dufaron.png',
  '1740262': 'agro-nurell.png',
  '1508356': 'agro-ciperfos.png'
};

const imagePaths = {};

files.forEach(f => {
  const filePath = path.join(dir, f);
  const stats = fs.statSync(filePath);
  const size = stats.size.toString();
  
  if (renameMap[size]) {
    const newName = renameMap[size];
    const newPath = path.join(dir, newName);
    if (filePath !== newPath) {
      fs.renameSync(filePath, newPath);
    }
    imagePaths[newName.split('.')[0]] = `/products/${newName}`;
  }
});

// Now update products.json
const productsPath = path.join(__dirname, 'src', 'data', 'products.json');
const products = JSON.parse(fs.readFileSync(productsPath, 'utf8'));

products.forEach(p => {
  if (imagePaths[p.slug]) {
    p.images = [imagePaths[p.slug]];
  }
});

fs.writeFileSync(productsPath, JSON.stringify(products, null, 2), 'utf8');
console.log('Images renamed and products.json updated successfully.');
