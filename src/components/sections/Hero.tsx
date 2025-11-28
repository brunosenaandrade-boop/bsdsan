"use client";

import { motion } from "framer-motion";
import { Building2, Rocket, FileText, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import Image from "next/image";

const scrollToSection = (id: string) => {
  const element = document.getElementById(id);
  if (element) {
    element.scrollIntoView({ behavior: "smooth" });
  }
};

const clientTypes = [
  {
    icon: Building2,
    label: "Preciso Digitalizar Minha Empresa",
    filter: "pme",
  },
  {
    icon: Rocket,
    label: "Quero Um SaaS Pronto pra Vender",
    filter: "saas",
  },
  {
    icon: FileText,
    label: "Só Preciso de Uma Landing que Converte",
    filter: "landing",
  },
];

const badges = [
  "Atendimento direto via WhatsApp",
  "Desenvolvimento remoto pra todo Brasil",
  "Entrega em 7-30 dias (depende do projeto)",
];

export function Hero() {
  return (
    <section className="relative min-h-screen flex items-center pt-20 pb-16 overflow-hidden circuit-pattern">
      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-white via-white to-primary-teal/5 pointer-events-none" />

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-5xl mx-auto text-center">
          {/* Logo Animation */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mb-8"
          >
            <Image
              src="/image/logo.png"
              alt="BS Developer"
              width={250}
              height={80}
              className="mx-auto h-20 md:h-28 w-auto animate-float"
              priority
            />
          </motion.div>

          {/* Main Title */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="font-poppins font-bold text-4xl md:text-5xl lg:text-6xl text-foreground leading-tight mb-6"
          >
            TRANSFORMO IDEIAS EM{" "}
            <span className="text-gradient">NEGÓCIOS DIGITAIS LUCRATIVOS</span>
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto mb-10"
          >
            Desenvolvimento sob demanda pra PMEs, empreendedores e empresários
            que querem sair do papel (ou do Excel).
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="flex flex-col sm:flex-row gap-4 justify-center mb-12"
          >
            {clientTypes.map((type, index) => (
              <Button
                key={index}
                onClick={() => scrollToSection("seletor")}
                variant="outline"
                size="lg"
                className="group flex items-center gap-3 text-left border-2 border-primary/20 hover:border-primary hover:bg-primary/5 transition-all py-6 px-6"
              >
                <type.icon className="h-6 w-6 text-primary-teal group-hover:scale-110 transition-transform" />
                <span className="font-medium">{type.label}</span>
              </Button>
            ))}
          </motion.div>

          {/* Badges */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.8 }}
            className="flex flex-wrap justify-center gap-4 md:gap-6"
          >
            {badges.map((badge, index) => (
              <div
                key={index}
                className="flex items-center gap-2 text-sm md:text-base text-muted-foreground"
              >
                <Check className="h-5 w-5 text-primary-teal" />
                <span>{badge}</span>
              </div>
            ))}
          </motion.div>
        </div>
      </div>

      {/* Decorative elements */}
      <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-white to-transparent pointer-events-none" />
    </section>
  );
}
