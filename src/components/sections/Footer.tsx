"use client";

import Image from "next/image";
import Link from "next/link";
import { Instagram, Linkedin, Github, MapPin, Mail, Phone, Building2 } from "lucide-react";

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

const companyInfo = {
  razaoSocial: "Bruno Sena de Andrade",
  nomeFantasia: "BS Developer",
  cnpj: "26.630.862/0001-91",
  cnae: "85.99-6-03 - Treinamento em informática",
  endereco: {
    logradouro: "Av. Marcolino Martins Cabral",
    numero: "2040",
    bairro: "Vila Moema",
    cidade: "Tubarão",
    uf: "SC",
    cep: "88.705-001",
  },
  contato: {
    telefone: "(79) 99883-8881",
    email: "sac@bsdeveloper.com.br",
  },
  desde: 2016,
};

export function Footer() {
  const enderecoCompleto = `${companyInfo.endereco.logradouro}, ${companyInfo.endereco.numero} - ${companyInfo.endereco.bairro}, ${companyInfo.endereco.cidade}/${companyInfo.endereco.uf} - CEP: ${companyInfo.endereco.cep}`;

  return (
    <footer className="relative bg-black py-16">
      {/* Linha decorativa superior */}
      <div className="absolute top-0 left-0 right-0 h-px line-gradient" />

      <div className="container mx-auto px-4">
        {/* Grid principal */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          {/* Coluna 1 - Logo e Tagline */}
          <div className="flex flex-col items-center md:items-start">
            <Image
              src="/image/logo-dark.png"
              alt="BS Developer"
              width={180}
              height={50}
              className="h-14 w-auto mb-4"
            />
            <p className="text-sm text-muted-foreground mb-4">
              Engineered for Growth.
            </p>
            {/* Social links */}
            <div className="flex gap-3">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 rounded-full border border-white/10 hover:border-white/30 text-muted-foreground hover:text-white transition-all"
                  aria-label={social.label}
                >
                  <social.icon className="h-4 w-4" />
                </a>
              ))}
            </div>
          </div>

          {/* Coluna 2 - Dados da Empresa */}
          <div className="text-center md:text-left">
            <h3 className="text-white font-semibold mb-4 flex items-center justify-center md:justify-start gap-2">
              <Building2 className="h-4 w-4" />
              Dados da Empresa
            </h3>
            <div className="space-y-2 text-sm text-muted-foreground">
              <p><span className="text-white/70">Razão Social:</span> {companyInfo.razaoSocial}</p>
              <p><span className="text-white/70">CNPJ:</span> {companyInfo.cnpj}</p>
              <p><span className="text-white/70">Atividade:</span> {companyInfo.cnae}</p>
              <p><span className="text-white/70">Desde:</span> {companyInfo.desde}</p>
            </div>
          </div>

          {/* Coluna 3 - Contato */}
          <div className="text-center md:text-left">
            <h3 className="text-white font-semibold mb-4">Contato</h3>
            <div className="space-y-3 text-sm text-muted-foreground">
              <a
                href={`tel:${companyInfo.contato.telefone.replace(/\D/g, '')}`}
                className="flex items-center justify-center md:justify-start gap-2 hover:text-white transition-colors"
              >
                <Phone className="h-4 w-4" />
                {companyInfo.contato.telefone}
              </a>
              <a
                href={`mailto:${companyInfo.contato.email}`}
                className="flex items-center justify-center md:justify-start gap-2 hover:text-white transition-colors"
              >
                <Mail className="h-4 w-4" />
                {companyInfo.contato.email}
              </a>
              <div className="flex items-start justify-center md:justify-start gap-2">
                <MapPin className="h-4 w-4 mt-0.5 flex-shrink-0" />
                <span className="text-xs">{enderecoCompleto}</span>
              </div>
            </div>
          </div>

          {/* Coluna 4 - Links Legais */}
          <div className="text-center md:text-left">
            <h3 className="text-white font-semibold mb-4">Legal</h3>
            <div className="space-y-2 text-sm">
              <Link
                href="/privacidade"
                className="block text-muted-foreground hover:text-white transition-colors"
              >
                Política de Privacidade
              </Link>
              <Link
                href="/termos"
                className="block text-muted-foreground hover:text-white transition-colors"
              >
                Termos de Uso
              </Link>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="h-px bg-white/10 mb-6" />

        {/* Copyright e informações finais */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-muted-foreground">
          <p>© {new Date().getFullYear()} {companyInfo.nomeFantasia}. Todos os direitos reservados.</p>
          <p className="text-center">
            CNPJ: {companyInfo.cnpj} | {companyInfo.endereco.cidade}/{companyInfo.endereco.uf}
          </p>
        </div>
      </div>
    </footer>
  );
}
