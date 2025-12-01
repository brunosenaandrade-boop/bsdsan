"use client";

import Image from "next/image";
import { Instagram, Linkedin, Github, MapPin } from "lucide-react";

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
];

export function Footer() {
  return (
    <footer className="relative bg-black py-16">
      {/* Linha decorativa superior */}
      <div className="absolute top-0 left-0 right-0 h-px line-gradient" />

      <div className="container mx-auto px-4">
        {/* Main content */}
        <div className="flex flex-col items-center text-center mb-12">
          {/* Logo */}
          <Image
            src="/image/logo-dark.png"
            alt="BS Developer"
            width={180}
            height={50}
            className="h-16 w-auto mb-6"
          />

          {/* Tagline */}
          <p className="text-lg text-muted-foreground mb-2">
            Engineered for Growth.
          </p>

          {/* Location */}
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <MapPin className="h-4 w-4" />
            <span>Contato direto e remoto para todo o Brasil</span>
          </div>
        </div>

        {/* Social links */}
        <div className="flex justify-center gap-4 mb-12">
          {socialLinks.map((social) => (
            <a
              key={social.label}
              href={social.href}
              target="_blank"
              rel="noopener noreferrer"
              className="p-3 rounded-full border border-white/10 hover:border-white/30 text-muted-foreground hover:text-white transition-all"
              aria-label={social.label}
            >
              <social.icon className="h-5 w-5" />
            </a>
          ))}
        </div>

        {/* Divider */}
        <div className="h-px bg-white/10 mb-8" />

        {/* Copyright */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-muted-foreground">
          <p>© 2025 BS Developer. Todos os direitos reservados.</p>
          <p className="text-xs">
            <span className="text-white/30">v2.0</span> — Premium Edition
          </p>
        </div>
      </div>
    </footer>
  );
}
