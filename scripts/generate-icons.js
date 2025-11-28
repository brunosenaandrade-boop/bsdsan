const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

// SVG content for the icon
const svgContent = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
  <defs>
    <linearGradient id="brandGradient" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" style="stop-color:#1E3A8A"/>
      <stop offset="100%" style="stop-color:#14B8A6"/>
    </linearGradient>
  </defs>
  <rect width="512" height="512" rx="96" fill="url(#brandGradient)"/>
  <text x="256" y="340" font-family="Arial, sans-serif" font-size="260" font-weight="700" fill="white" text-anchor="middle" letter-spacing="-10">BS</text>
</svg>`;

async function generateIcons() {
  const publicDir = path.join(__dirname, '..', 'public');

  // Ensure public directory exists
  if (!fs.existsSync(publicDir)) {
    fs.mkdirSync(publicDir, { recursive: true });
  }

  const sizes = [
    { size: 192, name: 'icon-192.png' },
    { size: 512, name: 'icon-512.png' },
    { size: 180, name: 'apple-touch-icon.png' },
    { size: 32, name: 'favicon-32x32.png' },
    { size: 16, name: 'favicon-16x16.png' },
  ];

  console.log('Generating icons...\n');

  for (const { size, name } of sizes) {
    try {
      await sharp(Buffer.from(svgContent))
        .resize(size, size)
        .png()
        .toFile(path.join(publicDir, name));

      console.log(`✓ Generated ${name} (${size}x${size})`);
    } catch (error) {
      console.error(`✗ Failed to generate ${name}:`, error.message);
    }
  }

  // Generate favicon.ico (multi-size ICO file)
  try {
    // For ICO, we'll create a 32x32 PNG that can serve as favicon
    await sharp(Buffer.from(svgContent))
      .resize(32, 32)
      .png()
      .toFile(path.join(publicDir, 'favicon.png'));

    console.log(`✓ Generated favicon.png (32x32)`);
  } catch (error) {
    console.error(`✗ Failed to generate favicon.png:`, error.message);
  }

  console.log('\n✅ Icon generation complete!');
  console.log('\nGenerated files in /public:');
  sizes.forEach(({ name }) => console.log(`  - ${name}`));
  console.log('  - favicon.png');
}

generateIcons().catch(console.error);
