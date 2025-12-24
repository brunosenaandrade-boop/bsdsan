"use client";

import { motion } from "framer-motion";
import { Building2, Rocket, Zap, ArrowRight, Check, Star } from "lucide-react";
import { Button } from "@/components/ui/button";

const solutions = [
  {
    icon: Building2,
    title: "Inteligência Digital para PMEs",
    description:
      "Sistemas de automação interna, E-commerce de Alto Padrão e Automação de Vendas.",
    promise:
      "Reduzimos seu custo operacional e dobramos a capacidade do seu time sem aumentar a folha.",
    features: [
      "CRM personalizado",
      "Automação de processos",
      "E-commerce integrado",
      "Dashboard de métricas",
    ],
    ideal: "PMEs que querem escalar sem contratar",
    highlight: false,
    color: "silver",
  },
  {
    icon: Rocket,
    title: "Produto Digital (SaaS) Exclusivo",
    description:
      "Desenvolvimento completo de plataformas de assinatura e MVPs robustos prontos para investimento Seed.",
    promise:
      "Colocamos sua ideia no mercado em 30 dias com tecnologia preparada para milhões de usuários.",
    features: [
      "Arquitetura escalável",
      "Sistema de pagamentos",
      "Painel administrativo",
      "Analytics integrado",
    ],
    ideal: "Empreendedores com ideias de produto",
    highlight: true,
    color: "cyan",
  },
  {
    icon: Zap,
    title: "Validação Rápida de Ideias",
    description:
      "Landing Pages de Conversão Máxima, Calculadoras Interativas e Chatbots com IA Integrada.",
    promise:
      "Validamos seu mercado e geramos as primeiras receitas antes de você escrever a primeira linha de código complexa.",
    features: [
      "Landing pages de alta conversão",
      "Calculadoras interativas",
      "Chatbots inteligentes",
      "Funis de vendas",
    ],
    ideal: "Quem precisa validar rápido",
    highlight: false,
    color: "silver",
  },
];

export function Solutions() {
  return (
    <section id="solucoes" className="relative py-24 md:py-32 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 section-darker" />

      {/* Grid pattern */}
      <div className="absolute inset-0 bg-grid-pattern opacity-20" />

      {/* Orbs decorativos */}
      <div className="orb orb-silver w-[500px] h-[500px] -top-[200px] -left-[200px] opacity-15" />
      <div className="orb orb-cyan w-[400px] h-[400px] -bottom-[150px] -right-[150px] opacity-20" />

      {/* Linha decorativa superior */}
      <div className="absolute top-0 left-0 right-0 h-px divider-glow" />

      <div className="container mx-auto px-4 relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-2xl md:text-4xl lg:text-5xl font-bold text-white mb-4">
            <span className="text-glow">QUAL É O SEU</span>{" "}
            <span className="text-gradient-cyan">DESAFIO DE MERCADO?</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
            Três caminhos estratégicos. Um objetivo: seu crescimento.
          </p>
        </motion.div>

        {/* Solutions Grid */}
        <div className="grid md:grid-cols-3 gap-8 mb-16">
          {solutions.map((solution, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.15 }}
              className="group"
            >
              <div className={`h-full border-gradient-animated p-8 card-3d spotlight shimmer-hover flex flex-col relative ${
                solution.highlight ? 'glow-box-cyan' : 'glow-box'
              }`}>
                {/* Badge Mais Popular */}
                {solution.highlight && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                    <div className="badge-cyan px-4 py-1 rounded-full text-xs font-semibold flex items-center gap-1">
                      <Star className="h-3 w-3 fill-current" />
                      MAIS POPULAR
                    </div>
                  </div>
                )}

                {/* Icon com glow */}
                <div className={`inline-flex items-center justify-center w-16 h-16 rounded-2xl mb-6 transition-all duration-300 ${
                  solution.color === 'cyan'
                    ? 'bg-cyan-500/10 border border-cyan-500/20 group-hover:bg-cyan-500/20'
                    : 'bg-white/5 border border-white/10 group-hover:bg-white/10'
                }`}>
                  <solution.icon className={`h-8 w-8 transition-all duration-300 ${
                    solution.color === 'cyan'
                      ? 'text-cyan-400 icon-glow-cyan'
                      : 'text-white/70 group-hover:text-white icon-glow'
                  }`} />
                </div>

                {/* Title */}
                <h3 className={`text-xl font-semibold mb-4 ${
                  solution.highlight ? 'text-gradient-cyan' : 'text-white'
                }`}>
                  {solution.title}
                </h3>

                {/* Description */}
                <p className="text-muted-foreground text-sm mb-6 leading-relaxed">
                  {solution.description}
                </p>

                {/* Promise com glass effect */}
                <div className={`p-4 rounded-xl mb-6 ${
                  solution.highlight
                    ? 'bg-cyan-500/10 border border-cyan-500/20'
                    : 'glass-light'
                }`}>
                  <p className="text-white/90 text-sm leading-relaxed">
                    <span className={`font-semibold ${solution.highlight ? 'text-cyan-400' : 'text-white'}`}>
                      Promessa:
                    </span>{" "}
                    {solution.promise}
                  </p>
                </div>

                {/* Features com checkmarks */}
                <div className="mb-6 flex-grow">
                  <ul className="space-y-3">
                    {solution.features.map((feature, i) => (
                      <li
                        key={i}
                        className="flex items-center gap-3 text-sm text-muted-foreground"
                      >
                        <div className={`w-5 h-5 rounded-full flex items-center justify-center ${
                          solution.highlight
                            ? 'bg-cyan-500/20 text-cyan-400'
                            : 'bg-white/10 text-white/60'
                        }`}>
                          <Check className="h-3 w-3" />
                        </div>
                        <span className="group-hover:text-white/80 transition-colors">
                          {feature}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Ideal for */}
                <div className="pt-4 border-t border-white/10">
                  <p className="text-xs text-muted-foreground uppercase tracking-wider">
                    <span className={solution.highlight ? 'text-cyan-400' : 'text-white/50'}>
                      Ideal para:
                    </span>{" "}
                    {solution.ideal}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <p className="text-muted-foreground mb-6 text-lg">
            Não sabe qual solução é ideal? Vamos descobrir juntos.
          </p>
          <Button
            onClick={() => {
              const el = document.getElementById("qualificar");
              el?.scrollIntoView({ behavior: "smooth" });
            }}
            className="btn-cta-cyan px-8 py-6 text-base uppercase tracking-widest group rounded-lg"
          >
            Agendar Call de Qualificação
            <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
          </Button>
        </motion.div>
      </div>

      {/* Linha decorativa inferior */}
      <div className="absolute bottom-0 left-0 right-0 h-px divider-glow" />
    </section>
  );
}
