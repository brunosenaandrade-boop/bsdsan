"use client";

import { motion } from "framer-motion";
import { ArrowRight, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import Image from "next/image";

const scrollToSection = (id: string) => {
  const element = document.getElementById(id);
  if (element) {
    element.scrollIntoView({ behavior: "smooth" });
  }
};

export function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background com gradient sutil */}
      <div className="absolute inset-0 bg-gradient-to-b from-black via-[#0a0a0a] to-[#0d0d0d]" />

      {/* Noise texture overlay */}
      <div className="absolute inset-0 noise-overlay opacity-50" />

      {/* Linha decorativa superior */}
      <div className="absolute top-0 left-0 right-0 h-px line-gradient" />

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-5xl mx-auto text-center">
          {/* Logo */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="mb-12"
          >
            <Image
              src="/image/logo-dark.png"
              alt="BS Developer"
              width={280}
              height={90}
              className="mx-auto h-24 md:h-32 w-auto"
              priority
            />
          </motion.div>

          {/* Main Headline */}
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="font-bold text-3xl md:text-5xl lg:text-6xl leading-tight mb-8 tracking-tight"
          >
            <span className="text-white">NÃO TRANSFORMAMOS IDEIAS EM CÓDIGO.</span>
            <br />
            <span className="text-metallic">TRANSFORMAMOS DADOS EM LUCRO.</span>
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto mb-12 leading-relaxed"
          >
            Arquitetura Digital Estratégica para Líderes, PMEs e Empreendedores
            que buscam <span className="text-white">Performance</span> e{" "}
            <span className="text-white">Retorno Mensurável</span>.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-16"
          >
            <Button
              onClick={() => scrollToSection("qualificar")}
              className="btn-silver px-8 py-6 text-base uppercase tracking-widest group"
              size="lg"
            >
              Qualificar Meu Projeto
              <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
            </Button>

            <Button
              onClick={() => scrollToSection("resultados")}
              variant="ghost"
              className="text-muted-foreground hover:text-white px-8 py-6 text-base tracking-wide"
              size="lg"
            >
              Ver Casos de Sucesso
            </Button>
          </motion.div>

          {/* Métricas rápidas */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="flex flex-wrap justify-center gap-8 md:gap-16"
          >
            {[
              { value: "7-30", label: "dias de entrega" },
              { value: "94%", label: "aprovação na 1ª versão" },
              { value: "+9", label: "projetos em produção" },
            ].map((metric, index) => (
              <div key={index} className="text-center">
                <div className="text-2xl md:text-3xl font-bold text-white mb-1">
                  {metric.value}
                </div>
                <div className="text-sm text-muted-foreground uppercase tracking-wider">
                  {metric.label}
                </div>
              </div>
            ))}
          </motion.div>
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 1.2 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
      >
        <button
          onClick={() => scrollToSection("autoridade")}
          className="text-muted-foreground hover:text-white transition-colors"
        >
          <ChevronDown className="h-8 w-8 animate-bounce" />
        </button>
      </motion.div>

      {/* Linha decorativa inferior */}
      <div className="absolute bottom-0 left-0 right-0 h-px line-gradient" />
    </section>
  );
}
