"use client";

import Image from "next/image";
import { Instagram, Linkedin, Github, Youtube, MapPin, Mail, Phone } from "lucide-react";
import { Separator } from "@/components/ui/separator";

const footerLinks = [
  { href: "#projetos", label: "Projetos" },
  { href: "#sobre", label: "Sobre" },
  { href: "#orcamento", label: "Orçamento" },
  { href: "#contato", label: "Contato" },
];

const socialLinks = [
  {
    href: "https://instagram.com/brunoeducafinancas",
    icon: Instagram,
    label: "Instagram",
  },
  {
    href: "https://linkedin.com/in/brunosena",
    icon: Linkedin,
    label: "LinkedIn",
  },
  {
    href: "https://github.com/brunosena",
    icon: Github,
    label: "GitHub",
  },
  {
    href: "https://youtube.com/@brunosena",
    icon: Youtube,
    label: "YouTube",
  },
];

export function Footer() {
  const scrollToSection = (href: string) => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <footer className="bg-[#1F2937] text-white py-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
          {/* Column 1: Logo + Tagline */}
          <div>
            <Image
              src="/image/logo.png"
              alt="BS Developer"
              width={150}
              height={40}
              className="h-10 w-auto mb-4 brightness-0 invert"
            />
            <p className="text-gray-400 text-sm">
              Transformando ideias em negócios digitais
            </p>
          </div>

          {/* Column 2: Links */}
          <div>
            <h4 className="font-poppins font-semibold mb-4">Links</h4>
            <ul className="space-y-2">
              {footerLinks.map((link) => (
                <li key={link.href}>
                  <button
                    onClick={() => scrollToSection(link.href)}
                    className="text-gray-400 hover:text-white transition-colors text-sm"
                  >
                    {link.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Contato */}
          <div>
            <h4 className="font-poppins font-semibold mb-4">Contato</h4>
            <ul className="space-y-3 text-sm text-gray-400">
              <li className="flex items-center gap-2">
                <Phone className="h-4 w-4" />
                <span>(48) 9999-9999</span>
              </li>
              <li className="flex items-center gap-2">
                <Mail className="h-4 w-4" />
                <span>contato@bsdeveloper.com</span>
              </li>
              <li className="flex items-center gap-2">
                <MapPin className="h-4 w-4" />
                <span>Tubarão/SC • Brasil</span>
              </li>
            </ul>
          </div>

          {/* Column 4: Redes Sociais */}
          <div>
            <h4 className="font-poppins font-semibold mb-4">Redes Sociais</h4>
            <div className="flex gap-4">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 rounded-lg bg-white/10 hover:bg-white/20 transition-colors"
                  aria-label={social.label}
                >
                  <social.icon className="h-5 w-5" />
                </a>
              ))}
            </div>
          </div>
        </div>

        <Separator className="bg-gray-700 my-6" />

        {/* Copyright */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-gray-400">
          <p>© 2025 BS Developer • Todos os direitos reservados</p>
          <p>Desenvolvido com ❤️ em Tubarão/SC</p>
        </div>
      </div>
    </footer>
  );
}
