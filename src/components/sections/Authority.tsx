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
    color: "cyan",
  },
  {
    icon: Target,
    value: "94%",
    title: "Aprovação na 1ª Versão",
    description:
      "Não fazemos revisões infinitas. Fazemos CERTO da primeira vez. A metodologia elimina o retrabalho.",
    color: "silver",
  },
  {
    icon: Rocket,
    value: "+9",
    title: "Projetos em Produção",
    description:
      "Soluções rodando em escala. Não somos um portfólio de testes, somos um motor de crescimento.",
    color: "cyan",
  },
];

export function Authority() {
  return (
    <section id="autoridade" className="relative py-24 md:py-32 overflow-hidden">
      {/* Background com gradient */}
      <div className="absolute inset-0 section-darker" />

      {/* Grid pattern sutil */}
      <div className="absolute inset-0 bg-grid-pattern opacity-20" />

      {/* Orb decorativo */}
      <div className="orb orb-cyan w-[400px] h-[400px] top-0 right-0 opacity-20" />

      {/* Linha decorativa superior */}
      <div className="absolute top-0 left-0 right-0 h-px divider-glow" />

      <div className="container mx-auto px-4 relative z-10">
        {/* Título da seção */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-2xl md:text-4xl lg:text-5xl font-bold text-white mb-4">
            <span className="text-glow">POR QUE BS DEVELOPER NÃO É UM FREELANCER,</span>
            <br />
            <span className="text-gradient-cyan">É UM PARCEIRO DE INTELIGÊNCIA.</span>
          </h2>
        </motion.div>

        {/* Métricas com cards 3D */}
        <div className="grid md:grid-cols-3 gap-8 mb-20">
          {metrics.map((metric, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.15 }}
              className="border-gradient-animated p-8 card-3d spotlight shimmer-hover text-center"
            >
              {/* Icon com glow */}
              <div className={`inline-flex items-center justify-center w-16 h-16 rounded-2xl mb-6 ${
                metric.color === 'cyan'
                  ? 'bg-cyan-500/10 border border-cyan-500/20'
                  : 'bg-white/5 border border-white/10'
              }`}>
                <metric.icon className={`h-8 w-8 ${
                  metric.color === 'cyan'
                    ? 'text-cyan-400 icon-glow-cyan'
                    : 'text-white/80 icon-glow'
                }`} />
              </div>

              {/* Valor com gradiente */}
              <div className={`text-4xl md:text-5xl font-bold mb-3 ${
                metric.color === 'cyan' ? 'text-gradient-cyan' : 'metric-value'
              }`}>
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

        {/* Citação com glass effect */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="max-w-4xl mx-auto"
        >
          <div className="relative glass rounded-2xl p-10 md:p-14 glow-box animate-pulse-glow">
            {/* Quote icon com glow */}
            <Quote className="absolute top-6 left-6 h-12 w-12 text-cyan-500/20 icon-glow-cyan" />

            {/* Orb interno */}
            <div className="absolute -top-20 -right-20 w-40 h-40 bg-cyan-500/10 rounded-full blur-3xl" />

            <blockquote className="text-xl md:text-2xl text-white/90 font-light leading-relaxed text-center mb-8 relative z-10">
              &ldquo;Eu não quero 100 clientes médios. Quero{" "}
              <span className="text-white font-medium">5 parceiros que dominam o mercado</span>.
              Meu foco não é <em>serviço</em>, é{" "}
              <span className="text-gradient-cyan font-medium">performance</span>.&rdquo;
            </blockquote>

            <div className="flex items-center justify-center gap-4 relative z-10">
              <div className="w-14 h-14 rounded-full bg-gradient-to-br from-cyan-500/30 to-cyan-500/5 flex items-center justify-center border border-cyan-500/20 animate-pulse-glow-cyan">
                <span className="text-white font-bold text-lg">BS</span>
              </div>
              <div className="text-left">
                <div className="text-white font-semibold text-lg">Bruno Sena</div>
                <div className="text-cyan-400/80 text-sm">
                  Fundador, BS Developer
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Linha decorativa inferior */}
      <div className="absolute bottom-0 left-0 right-0 h-px divider-glow" />
    </section>
  );
}
