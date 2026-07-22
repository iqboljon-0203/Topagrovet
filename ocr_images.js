const fs = require('fs');
const Tesseract = require('tesseract.js');
const path = require('path');

const uploadDir = path.join(__dirname, 'public/products/uploads');
const files = fs.readdirSync(uploadDir).filter(f => f.startsWith('media__')).sort();

async function runOCR() {
  console.log('Starting OCR for ' + files.length + ' images...');
  const results = {};
  for(let i=0; i<files.length; i++) {
    const file = files[i];
    const filePath = path.join(uploadDir, file);
    try {
      const { data: { text } } = await Tesseract.recognize(filePath, 'eng+rus');
      console.log(`Processed ${i+1}/${files.length}: ${file} -> ${text.slice(0, 30).replace(/\n/g, ' ')}...`);
      results[file] = text;
    } catch(err) {
      console.error('Error on', file, err);
    }
  }
  fs.writeFileSync('image_texts.json', JSON.stringify(results, null, 2));
  console.log('Finished OCR.');
}

runOCR();
