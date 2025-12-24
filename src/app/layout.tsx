import type { Metadata } from "next";
import { Poppins, Inter } from "next/font/google";
import "./globals.css";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-poppins",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://bsdeveloper.com.br"),
  title: "BS Developer | Desenvolvimento Web & SaaS",
  other: {
    "facebook-domain-verification": "91kvbh8haxg364r20i3wy5akxq869c",
  },
  description:
    "Transformo ideias em negócios digitais lucrativos. Landing pages, sistemas web, SaaS e apps mobile para PMEs e empreendedores. Desenvolvimento sob demanda com entrega em 7-30 dias.",
  keywords: [
    "desenvolvimento web",
    "saas",
    "landing page",
    "sistema web",
    "aplicativo",
    "tubarão sc",
    "desenvolvedor",
    "freelancer",
    "next.js",
    "react",
  ],
  authors: [{ name: "Bruno Sena", url: "https://bsdeveloper.com.br" }],
  creator: "BS Developer",
  publisher: "BS Developer",
  robots: "index, follow",
  openGraph: {
    type: "website",
    locale: "pt_BR",
    url: "https://bsdeveloper.com.br",
    siteName: "BS Developer",
    title: "BS Developer | Transformo Ideias em Negócios Digitais",
    description:
      "Desenvolvimento sob demanda para PMEs e empreendedores. Landing pages, sistemas, SaaS e apps.",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "BS Developer - Desenvolvimento Web & SaaS",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "BS Developer | Desenvolvimento Web & SaaS",
    description:
      "Transformo ideias em negócios digitais lucrativos. Desenvolvimento sob demanda.",
    images: ["/og-image.jpg"],
  },
  icons: {
    icon: [
      { url: "/favicon.png", sizes: "32x32", type: "image/png" },
      { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
      { url: "/favicon.svg", type: "image/svg+xml" },
    ],
    apple: [
      { url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" },
    ],
  },
  manifest: "/manifest.json",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-BR" className={`${poppins.variable} ${inter.variable}`}>
      <body className="font-inter antialiased">{children}</body>
    </html>
  );
}
