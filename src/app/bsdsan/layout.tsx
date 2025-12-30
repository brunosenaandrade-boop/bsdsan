import type { Metadata } from "next";
import { Playfair_Display, Inter } from "next/font/google";

const playfair = Playfair_Display({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-playfair",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  title: "BSDSAN | BsDeveloper Softwares de Alto Nível",
  description: "Programa de Certificação em Qualidade de Software - Área Restrita",
  robots: "noindex, nofollow",
};

export default function BSDSANLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-BR" className={`${playfair.variable} ${inter.variable}`}>
      <body className="font-inter antialiased bg-[#0a0f1a] text-white min-h-screen">
        {children}
      </body>
    </html>
  );
}
