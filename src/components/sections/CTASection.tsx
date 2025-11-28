"use client";

import { motion } from "framer-motion";
import { MessageCircle, Mail, Instagram, Linkedin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { openWhatsApp } from "@/lib/whatsapp";

export function CTASection() {
  return (
    <section
      id="contato"
      className="py-20 gradient-primary-135 relative overflow-hidden"
    >
      {/* Background pattern */}
      <div className="absolute inset-0 circuit-pattern opacity-10" />

      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-3xl mx-auto text-center text-white"
        >
          <h2 className="font-poppins font-bold text-3xl md:text-4xl lg:text-5xl mb-4">
            PRONTO PRA TIRAR SEU PROJETO DO PAPEL?
          </h2>

          <p className="text-lg md:text-xl opacity-90 mb-8">
            Respondo em até 2 horas (geralmente em minutos).
            <br />
            Desenvolvimento remoto. Atendo todo Brasil.
          </p>

          {/* Main CTA Button */}
          <motion.div
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="mb-8"
          >
            <Button
              size="lg"
              onClick={() => openWhatsApp({ type: "generic" })}
              className="bg-white text-primary-blue hover:bg-white/90 text-lg px-8 py-6 h-auto gap-3 animate-pulse-slow"
            >
              <MessageCircle className="h-6 w-6" />
              FALAR NO WHATSAPP AGORA
            </Button>
          </motion.div>

          {/* Alternative contacts */}
          <div className="space-y-2 opacity-80">
            <p className="text-sm">Ou se preferir:</p>
            <div className="flex flex-wrap justify-center gap-4 text-sm">
              <a
                href="mailto:contato@bsdeveloper.com"
                className="flex items-center gap-2 hover:opacity-100 transition-opacity"
              >
                <Mail className="h-4 w-4" />
                contato@bsdeveloper.com
              </a>
              <a
                href="https://instagram.com/brunoeducafinancas"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 hover:opacity-100 transition-opacity"
              >
                <Instagram className="h-4 w-4" />
                @brunoeducafinancas
              </a>
              <a
                href="https://linkedin.com/in/brunosena"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 hover:opacity-100 transition-opacity"
              >
                <Linkedin className="h-4 w-4" />
                linkedin.com/in/brunosena
              </a>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
