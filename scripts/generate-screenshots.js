const puppeteer = require("puppeteer");
const path = require("path");
const fs = require("fs");

// Projetos com URLs para captura
const projects = [
  {
    id: 1,
    slug: "guardadinheiro",
    url: "https://guardadinheiro.com.br",
    filename: "guardadinheiro.png",
  },
  {
    id: 2,
    slug: "motoristas-sul",
    url: "https://motoristasdosul.vercel.app/",
    filename: "motoristas-sul.png",
  },
  {
    id: 3,
    slug: "prime-studio",
    url: "https://primestudiosatalaia.vercel.app/",
    filename: "prime-studio.png",
  },
  {
    id: 4,
    slug: "cinthia-costa",
    url: "https://costa-eight.vercel.app/",
    filename: "cinthia-costa.png",
  },
  {
    id: 5,
    slug: "whatsapp-converter",
    url: "https://whatsapp-six-nu.vercel.app/whatsapp-converter-premium.html",
    filename: "whatsapp-converter.png",
  },
  {
    id: 6,
    slug: "nenem-pneus",
    url: "https://nenempneus.vercel.app/",
    filename: "nenem-pneus.png",
  },
  {
    id: 9,
    slug: "motorista-vip",
    url: "https://seumotoristavip.com.br/",
    filename: "motorista-vip.png",
  },
];

// Projetos sem URL (vão usar placeholder estilizado)
const projectsWithoutUrl = [
  { id: 7, slug: "tenha-paz", filename: "tenha-paz.png", category: "App Mobile" },
  { id: 8, slug: "dra-flavia", filename: "dra-flavia.png", category: "Site Profissional" },
];

async function generateScreenshots() {
  const outputDir = path.join(__dirname, "..", "public", "projects");

  // Garantir que o diretório existe
  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
  }

  console.log("🚀 Iniciando captura de screenshots...\n");

  const browser = await puppeteer.launch({
    headless: true,
    args: [
      "--no-sandbox",
      "--disable-setuid-sandbox",
      "--disable-dev-shm-usage",
      "--disable-web-security",
    ],
  });

  const page = await browser.newPage();

  // Configurar viewport para screenshots consistentes (16:9 aspect ratio)
  await page.setViewport({
    width: 1280,
    height: 720,
    deviceScaleFactor: 1,
  });

  // Capturar screenshots dos projetos com URL
  for (const project of projects) {
    try {
      console.log(`📸 Capturando: ${project.slug}...`);

      await page.goto(project.url, {
        waitUntil: "networkidle2",
        timeout: 30000,
      });

      // Aguardar um pouco para animações carregarem
      await page.evaluate(() => new Promise((r) => setTimeout(r, 2000)));

      const outputPath = path.join(outputDir, project.filename);

      await page.screenshot({
        path: outputPath,
        type: "png",
        clip: {
          x: 0,
          y: 0,
          width: 1280,
          height: 720,
        },
      });

      console.log(`   ✓ Salvo: ${project.filename}`);
    } catch (error) {
      console.log(`   ✗ Erro em ${project.slug}: ${error.message}`);
    }
  }

  await browser.close();

  // Gerar placeholders estilizados para projetos sem URL
  console.log("\n🎨 Gerando placeholders para projetos sem URL...");

  const sharp = require("sharp");

  for (const project of projectsWithoutUrl) {
    try {
      const svgPlaceholder = generatePlaceholderSVG(project.slug, project.category);
      const outputPath = path.join(outputDir, project.filename);

      await sharp(Buffer.from(svgPlaceholder))
        .resize(1280, 720)
        .png()
        .toFile(outputPath);

      console.log(`   ✓ Placeholder gerado: ${project.filename}`);
    } catch (error) {
      console.log(`   ✗ Erro no placeholder ${project.slug}: ${error.message}`);
    }
  }

  console.log("\n✅ Screenshots gerados com sucesso!");
  console.log(`📁 Diretório: ${outputDir}`);
}

function generatePlaceholderSVG(slug, category) {
  const title = slug.split("-").map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(" ");

  const categoryIcons = {
    "App Mobile": `<rect x="540" y="200" width="200" height="320" rx="20" fill="white" opacity="0.2"/>
                   <rect x="560" y="220" width="160" height="260" rx="10" fill="white" opacity="0.1"/>
                   <circle cx="640" cy="500" r="15" fill="white" opacity="0.3"/>`,
    "Site Profissional": `<rect x="440" y="220" width="400" height="280" rx="10" fill="white" opacity="0.2"/>
                          <rect x="460" y="260" width="360" height="200" rx="5" fill="white" opacity="0.1"/>
                          <circle cx="480" cy="240" r="8" fill="#FF6B6B"/>
                          <circle cx="510" cy="240" r="8" fill="#FFE66D"/>
                          <circle cx="540" cy="240" r="8" fill="#4ECB71"/>`,
  };

  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1280 720">
    <defs>
      <linearGradient id="bg" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" style="stop-color:#1E3A8A"/>
        <stop offset="100%" style="stop-color:#14B8A6"/>
      </linearGradient>
    </defs>
    <rect width="1280" height="720" fill="url(#bg)"/>
    ${categoryIcons[category] || ""}
    <text x="640" y="620" font-family="Arial, sans-serif" font-size="48" font-weight="bold" fill="white" text-anchor="middle" opacity="0.9">${title}</text>
    <text x="640" y="670" font-family="Arial, sans-serif" font-size="24" fill="white" text-anchor="middle" opacity="0.6">${category}</text>
  </svg>`;
}

generateScreenshots().catch(console.error);
