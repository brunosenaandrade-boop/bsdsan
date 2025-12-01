"use client";

import { motion } from "framer-motion";
import { Clock, Target, Rocket, Quote } from "lucide-react";

const metrics = [
  {
    icon: Clock,
    value: "7-30 Dias",
    title: "Prazo de Implementação",
    description:
      "Seu tempo é o seu ativo mais caro, nós respeitamos isso. Entregas rápidas sem comprometer qualidade.",
  },
  {
    icon: Target,
    value: "94%",
    title: "Aprovação na 1ª Versão",
    description:
      "Não fazemos revisões infinitas. Fazemos CERTO da primeira vez. A metodologia elimina o retrabalho.",
  },
  {
    icon: Rocket,
    value: "+9",
    title: "Projetos em Produção",
    description:
      "Soluções rodando em escala. Não somos um portfólio de testes, somos um motor de crescimento.",
  },
];

export function Authority() {
  return (
    <section id="autoridade" className="relative py-24 md:py-32 section-darker">
      {/* Linha decorativa superior */}
      <div className="absolute top-0 left-0 right-0 h-px line-gradient" />

      <div className="container mx-auto px-4">
        {/* Título da seção */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-2xl md:text-4xl font-bold text-white mb-4">
            POR QUE BS DEVELOPER NÃO É UM FREELANCER,
            <br />
            <span className="text-metallic">É UM PARCEIRO DE INTELIGÊNCIA.</span>
          </h2>
        </motion.div>

        {/* Métricas */}
        <div className="grid md:grid-cols-3 gap-8 mb-20">
          {metrics.map((metric, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="card-premium p-8 card-hover text-center"
            >
              <div className="inline-flex items-center justify-center w-14 h-14 rounded-full border border-white/10 mb-6">
                <metric.icon className="h-7 w-7 text-white/70" />
              </div>

              <div className="text-4xl md:text-5xl font-bold text-white mb-2">
                {metric.value}
              </div>

              <h3 className="text-lg font-semibold text-white mb-3">
                {metric.title}
              </h3>

              <p className="text-muted-foreground text-sm leading-relaxed">
                {metric.description}
              </p>
            </motion.div>
          ))}
        </div>

        {/* Citação */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="max-w-4xl mx-auto"
        >
          <div className="relative card-premium p-10 md:p-14">
            {/* Quote icon */}
            <Quote className="absolute top-6 left-6 h-10 w-10 text-white/10" />

            <blockquote className="text-xl md:text-2xl text-white/90 font-light leading-relaxed text-center mb-8 relative z-10">
              &ldquo;Eu não quero 100 clientes médios. Quero{" "}
              <span className="text-white font-medium">5 parceiros que dominam o mercado</span>.
              Meu foco não é <em>serviço</em>, é{" "}
              <span className="text-metallic font-medium">performance</span>.&rdquo;
            </blockquote>

            <div className="flex items-center justify-center gap-4">
              <div className="w-12 h-12 rounded-full bg-gradient-to-br from-white/20 to-white/5 flex items-center justify-center">
                <span className="text-white font-bold text-lg">BS</span>
              </div>
              <div>
                <div className="text-white font-semibold">Bruno Sena</div>
                <div className="text-muted-foreground text-sm">
                  Fundador, BS Developer
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Linha decorativa inferior */}
      <div className="absolute bottom-0 left-0 right-0 h-px line-gradient" />
    </section>
  );
}
