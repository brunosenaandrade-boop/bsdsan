'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useState } from 'react';
import { Menu, X, Shield } from 'lucide-react';

export default function BSDSANHeader() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-[#0a0f1a]/95 backdrop-blur-md border-b border-[#1e3a5f]/30">
      <div className="max-w-7xl mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link href="/bsdsan" className="flex items-center gap-3">
            <div className="w-12 h-12 bg-gradient-to-br from-[#c9a227] to-[#8b7355] rounded-lg flex items-center justify-center">
              <Shield className="w-7 h-7 text-[#0a0f1a]" />
            </div>
            <div>
              <h1 className="text-lg font-semibold text-white tracking-wide">BSDSAN</h1>
              <p className="text-[10px] text-[#8ba3c7] tracking-widest uppercase">Softwares de Alto Nível</p>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-8">
            <Link
              href="/bsdsan"
              className="text-sm text-[#8ba3c7] hover:text-white transition-colors tracking-wide"
            >
              Início
            </Link>
            <Link
              href="/bsdsan/sobre"
              className="text-sm text-[#8ba3c7] hover:text-white transition-colors tracking-wide"
            >
              Institucional
            </Link>
            <Link
              href="/bsdsan/acesso"
              className="text-sm bg-gradient-to-r from-[#c9a227] to-[#a08520] text-[#0a0f1a] px-6 py-2.5 rounded font-semibold hover:from-[#d4af37] hover:to-[#b8960c] transition-all tracking-wide"
            >
              Área Restrita
            </Link>
          </nav>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden text-white"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            {menuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {menuOpen && (
          <nav className="md:hidden mt-4 pb-4 flex flex-col gap-4">
            <Link
              href="/bsdsan"
              className="text-sm text-[#8ba3c7] hover:text-white transition-colors"
              onClick={() => setMenuOpen(false)}
            >
              Início
            </Link>
            <Link
              href="/bsdsan/sobre"
              className="text-sm text-[#8ba3c7] hover:text-white transition-colors"
              onClick={() => setMenuOpen(false)}
            >
              Institucional
            </Link>
            <Link
              href="/bsdsan/acesso"
              className="text-sm bg-gradient-to-r from-[#c9a227] to-[#a08520] text-[#0a0f1a] px-6 py-2.5 rounded font-semibold text-center"
              onClick={() => setMenuOpen(false)}
            >
              Área Restrita
            </Link>
          </nav>
        )}
      </div>
    </header>
  );
}
