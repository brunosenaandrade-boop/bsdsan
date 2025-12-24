"use client";

import { motion } from "framer-motion";
import { ArrowRight, ChevronDown, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";

const scrollToSection = (id: string) => {
  const element = document.getElementById(id);
  if (element) {
    element.scrollIntoView({ behavior: "smooth" });
  }
};

export function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background com gradient animado */}
      <div className="absolute inset-0 bg-gradient-animated" />

      {/* Grid pattern overlay */}
      <div className="absolute inset-0 bg-grid-pattern opacity-30" />

      {/* Orbs decorativos */}
      <div className="orb orb-cyan w-[600px] h-[600px] -top-[200px] -right-[200px] animate-pulse-slow" />
      <div className="orb orb-silver w-[500px] h-[500px] -bottom-[150px] -left-[150px] animate-pulse-slow" />
      <div className="orb orb-cyan w-[300px] h-[300px] top-1/2 left-1/4 opacity-20" />

      {/* Radial glow central */}
      <div className="absolute inset-0 bg-radial-glow-cyan" />

      {/* Noise texture overlay */}
      <div className="absolute inset-0 noise-overlay opacity-40" />

      {/* Linha decorativa superior com glow */}
      <div className="absolute top-0 left-0 right-0 h-px divider-glow" />

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-5xl mx-auto text-center pt-20">
          {/* Badge Premium */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="flex justify-center mb-8"
          >
            <div className="badge-cyan px-4 py-2 rounded-full text-sm font-medium flex items-center gap-2">
              <Sparkles className="h-4 w-4" />
              Desenvolvimento Premium para Empresas
            </div>
          </motion.div>

          {/* Main Headline com glow */}
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="font-bold text-3xl md:text-5xl lg:text-7xl leading-tight mb-8 tracking-tight"
          >
            <span className="text-white text-glow">NÃO TRANSFORMAMOS IDEIAS EM CÓDIGO.</span>
            <br />
            <span className="text-gradient-cyan">TRANSFORMAMOS DADOS EM LUCRO.</span>
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto mb-12 leading-relaxed"
          >
            Arquitetura Digital Estratégica para Líderes, PMEs e Empreendedores
            que buscam <span className="text-white font-medium">Performance</span> e{" "}
            <span className="text-white font-medium">Retorno Mensurável</span>.
          </motion.p>

          {/* CTA Buttons com efeitos premium */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-20"
          >
            <Button
              onClick={() => scrollToSection("qualificar")}
              className="btn-cta-cyan px-8 py-6 text-base uppercase tracking-widest group rounded-lg"
              size="lg"
            >
              Qualificar Meu Projeto
              <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
            </Button>

            <Button
              onClick={() => scrollToSection("resultados")}
              variant="ghost"
              className="btn-premium-glow px-8 py-6 text-base tracking-wide text-white rounded-lg"
              size="lg"
            >
              Ver Casos de Sucesso
            </Button>
          </motion.div>

          {/* Métricas com cards premium */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="flex flex-wrap justify-center gap-6 md:gap-8"
          >
            {[
              { value: "7-30", label: "dias de entrega" },
              { value: "94%", label: "aprovação na 1ª versão" },
              { value: "+9", label: "projetos em produção" },
            ].map((metric, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: 0.9 + index * 0.1 }}
                className="glass px-8 py-6 rounded-xl glow-box hover-scale text-center min-w-[140px]"
              >
                <div className="metric-value text-3xl md:text-4xl mb-2">
                  {metric.value}
                </div>
                <div className="text-xs text-muted-foreground uppercase tracking-wider">
                  {metric.label}
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>

      {/* Scroll indicator com glow */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 1.2 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
      >
        <button
          onClick={() => scrollToSection("autoridade")}
          className="text-muted-foreground hover:text-cyan-400 transition-colors p-2 rounded-full hover:bg-white/5"
        >
          <ChevronDown className="h-8 w-8 animate-bounce icon-glow-cyan" />
        </button>
      </motion.div>

      {/* Linha decorativa inferior com glow */}
      <div className="absolute bottom-0 left-0 right-0 h-px divider-glow" />
    </section>
  );
}
