/** @type {import('next').NextConfig} */
const nextConfig = {
  // Configuração para excluir whatsapp-web.js e puppeteer do bundling do webpack
  // Estas bibliotecas devem rodar apenas no servidor Node.js
  webpack: (config, { isServer }) => {
    if (isServer) {
      // Excluir do bundling - usar require nativo do Node
      config.externals = config.externals || [];
      config.externals.push({
        "whatsapp-web.js": "commonjs whatsapp-web.js",
        puppeteer: "commonjs puppeteer",
        "puppeteer-core": "commonjs puppeteer-core",
      });
    }
    return config;
  },
  // Configurações experimentais para o servidor
  experimental: {
    serverComponentsExternalPackages: [
      "whatsapp-web.js",
      "puppeteer",
      "puppeteer-core",
    ],
  },
};

export default nextConfig;
