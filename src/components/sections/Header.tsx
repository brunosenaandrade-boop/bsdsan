"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { Menu, LogIn } from "lucide-react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";

const navItems = [
  { href: "#resultados", label: "Resultados" },
  { href: "#solucoes", label: "Soluções" },
  { href: "#qualificar", label: "Qualificar" },
];

export function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (href: string) => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
    setIsMobileMenuOpen(false);
  };

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-500 ${
        isScrolled
          ? "bg-black/90 backdrop-blur-md border-b border-white/5"
          : "bg-transparent"
      }`}
    >
      <div className="container mx-auto px-4">
        <nav className="flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center">
            <Image
              src="/image/logo-dark.png"
              alt="BS Developer"
              width={160}
              height={45}
              className="h-10 md:h-12 w-auto"
              priority
            />
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-10">
            {navItems.map((item) => (
              <button
                key={item.href}
                onClick={() => scrollToSection(item.href)}
                className="text-sm font-medium text-muted-foreground hover:text-white transition-colors uppercase tracking-wider"
              >
                {item.label}
              </button>
            ))}

            <Button
              onClick={() => scrollToSection("#qualificar")}
              className="btn-silver px-6 py-2 text-sm uppercase tracking-widest"
            >
              Qualificar Projeto
            </Button>

            {/* Botão Admin discreto */}
            <Link href="/login">
              <Button
                variant="ghost"
                size="icon"
                className="opacity-30 hover:opacity-100 transition-opacity"
                title="Área Admin"
              >
                <LogIn className="h-4 w-4" />
              </Button>
            </Link>
          </div>

          {/* Mobile Menu */}
          <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
            <SheetTrigger asChild className="md:hidden">
              <Button variant="ghost" size="icon" className="text-white">
                <Menu className="h-6 w-6" />
                <span className="sr-only">Menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent
              side="right"
              className="w-[300px] bg-black/95 border-l border-white/10"
            >
              <nav className="flex flex-col gap-6 mt-12">
                {navItems.map((item) => (
                  <button
                    key={item.href}
                    onClick={() => scrollToSection(item.href)}
                    className="text-lg font-medium text-white/70 hover:text-white transition-colors text-left uppercase tracking-wider"
                  >
                    {item.label}
                  </button>
                ))}

                <div className="h-px bg-white/10 my-4" />

                <Button
                  onClick={() => scrollToSection("#qualificar")}
                  className="btn-silver w-full py-6 text-sm uppercase tracking-widest"
                >
                  Qualificar Projeto
                </Button>

                {/* Link Admin no mobile */}
                <Link href="/login" className="mt-4">
                  <Button
                    variant="ghost"
                    className="w-full text-white/50 hover:text-white"
                  >
                    <LogIn className="h-4 w-4 mr-2" />
                    Área Admin
                  </Button>
                </Link>
              </nav>
            </SheetContent>
          </Sheet>
        </nav>
      </div>
    </motion.header>
  );
}
