const sharp = require('sharp');
const path = require('path');

async function cropImage() {
  const inputPath = path.join(__dirname, '../public/bsdsan/ceo-bruno.png');
  const outputPath = path.join(__dirname, '../public/bsdsan/ceo-bruno-clean.png');

  try {
    const metadata = await sharp(inputPath).metadata();
    console.log('Imagem original:', metadata.width, 'x', metadata.height);

    // Recorta removendo 50px da direita e 50px de baixo para remover a estrela do Gemini
    await sharp(inputPath)
      .extract({
        left: 0,
        top: 0,
        width: metadata.width - 60,
        height: metadata.height - 60
      })
      .toFile(outputPath);

    console.log('Imagem processada salva em:', outputPath);
  } catch (error) {
    console.error('Erro:', error);
  }
}

cropImage();
