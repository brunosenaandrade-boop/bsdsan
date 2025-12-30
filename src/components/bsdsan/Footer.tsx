'use client';

import Link from 'next/link';
import { Shield, Mail, Phone, MapPin } from 'lucide-react';

export default function BSDSANFooter() {
  const anoAtual = new Date().getFullYear();

  return (
    <footer className="bg-[#060a12] border-t border-[#1e3a5f]/30">
      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="grid md:grid-cols-4 gap-8">
          {/* Logo e Descrição */}
          <div className="md:col-span-2">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 bg-gradient-to-br from-[#c9a227] to-[#8b7355] rounded-lg flex items-center justify-center">
                <Shield className="w-5 h-5 text-[#0a0f1a]" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-white">BSDSAN</h3>
                <p className="text-[10px] text-[#8ba3c7] tracking-widest uppercase">BsDeveloper Softwares de Alto Nível</p>
              </div>
            </div>
            <p className="text-sm text-[#6b7c95] leading-relaxed max-w-md">
              Comprometidos com a excelência em qualidade de software, desenvolvemos soluções
              que transformam negócios e elevam o padrão tecnológico brasileiro.
            </p>
          </div>

          {/* Links */}
          <div>
            <h4 className="text-sm font-semibold text-white mb-4 tracking-wide">NAVEGAÇÃO</h4>
            <ul className="space-y-2">
              <li>
                <Link href="/bsdsan" className="text-sm text-[#6b7c95] hover:text-[#c9a227] transition-colors">
                  Início
                </Link>
              </li>
              <li>
                <Link href="/bsdsan/sobre" className="text-sm text-[#6b7c95] hover:text-[#c9a227] transition-colors">
                  Institucional
                </Link>
              </li>
              <li>
                <Link href="/bsdsan/acesso" className="text-sm text-[#6b7c95] hover:text-[#c9a227] transition-colors">
                  Área Restrita
                </Link>
              </li>
            </ul>
          </div>

          {/* Contato */}
          <div>
            <h4 className="text-sm font-semibold text-white mb-4 tracking-wide">CONTATO</h4>
            <ul className="space-y-3">
              <li className="flex items-center gap-2 text-sm text-[#6b7c95]">
                <Mail className="w-4 h-4 text-[#c9a227]" />
                contato@bsdeveloper.com.br
              </li>
              <li className="flex items-center gap-2 text-sm text-[#6b7c95]">
                <Phone className="w-4 h-4 text-[#c9a227]" />
                (48) 99999-9999
              </li>
              <li className="flex items-start gap-2 text-sm text-[#6b7c95]">
                <MapPin className="w-4 h-4 text-[#c9a227] mt-0.5" />
                <span>Tubarão, SC<br />Brasil</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Copyright */}
        <div className="mt-12 pt-8 border-t border-[#1e3a5f]/20">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-xs text-[#4a5568]">
              {anoAtual} BSDSAN - BsDeveloper Softwares de Alto Nível. Todos os direitos reservados.
            </p>
            <p className="text-xs text-[#4a5568]">
              CNPJ: 00.000.000/0001-00 | Registro INPI: BR000000000
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
