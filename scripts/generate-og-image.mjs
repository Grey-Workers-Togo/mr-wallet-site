// Regenerates public/og-default.png (1200x630, the default Open Graph / Twitter card image).
// Run manually after a branding change: node scripts/generate-og-image.mjs
import sharp from 'sharp';
import { readFileSync } from 'node:fs';

const W = 1200;
const H = 630;
const symbol = await sharp(readFileSync('public/logo-symbol.svg'), { density: 300 })
  .resize({ height: 200 })
  .png()
  .toBuffer();

const background = Buffer.from(`
<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}">
  <defs>
    <radialGradient id="g" cx="20%" cy="0%" r="90%">
      <stop offset="0%" stop-color="#0f766e" stop-opacity="0.55"/>
      <stop offset="70%" stop-color="#0a0a0d" stop-opacity="0"/>
    </radialGradient>
  </defs>
  <rect width="${W}" height="${H}" fill="#0a0a0d"/>
  <rect width="${W}" height="${H}" fill="url(#g)"/>
  <text x="380" y="345" font-family="Arial, Helvetica, sans-serif" font-size="128" font-weight="700" fill="#f5f5f5">Mr Wallet</text>
  <text x="384" y="420" font-family="Arial, Helvetica, sans-serif" font-size="40" fill="#a3a3a3">mister-wallet.com</text>
</svg>`);

await sharp(background)
  .composite([{ input: symbol, left: 130, top: 215 }])
  .png({ compressionLevel: 9 })
  .toFile('public/og-default.png');
console.log('public/og-default.png written');
