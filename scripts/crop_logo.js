import sharp from 'sharp';
import fs from 'fs';
import path from 'path';

async function cropLogo() {
  const inputPath = path.join(process.cwd(), 'public', 'logo.png');
  const outputPath = path.join(process.cwd(), 'src', 'app', 'icon.png');
  
  if (!fs.existsSync(inputPath)) {
    console.error('logo.png not found in public directory');
    return;
  }

  try {
    // Read image metadata
    const metadata = await sharp(inputPath).metadata();
    
    // We assume it's a horizontal logo where the icon is on the left.
    // Let's extract a square from the left side.
    const height = metadata.height;
    // Assuming the icon is roughly square, we take a square of size 'height' from x=0.
    // If there's padding, trim() first.
    
    const image = sharp(inputPath);
    
    // First, trim transparency
    const { info, data } = await image.trim().toBuffer({ resolveWithObject: true });
    
    const trimmedHeight = info.height;
    const trimmedWidth = info.width;
    
    // The icon is likely the leftmost part, forming a square of height x height
    const size = Math.min(trimmedHeight, trimmedWidth); // Usually trimmedHeight is smaller for a horizontal logo
    
    await sharp(data)
      .extract({ left: 0, top: 0, width: size, height: size })
      .resize(192, 192)
      .png()
      .toFile(outputPath);
      
    console.log('Successfully created src/app/icon.png from the logo!');
    
    // Also copy to public/favicon.ico as a fallback
    fs.copyFileSync(outputPath, path.join(process.cwd(), 'public', 'favicon.ico'));
    console.log('Successfully copied to public/favicon.ico');
  } catch (err) {
    console.error('Error cropping logo:', err);
  }
}

cropLogo();
