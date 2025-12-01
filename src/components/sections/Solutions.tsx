"use client";

import { motion } from "framer-motion";
import { Building2, Rocket, Zap, ArrowRight } from "lucide-react";
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
  },
];

export function Solutions() {
  return (
    <section id="solucoes" className="relative py-24 md:py-32 section-darker">
      {/* Linha decorativa superior */}
      <div className="absolute top-0 left-0 right-0 h-px line-gradient" />

      <div className="container mx-auto px-4">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-2xl md:text-4xl font-bold text-white mb-4">
            QUAL É O SEU{" "}
            <span className="text-metallic">DESAFIO DE MERCADO?</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
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
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="group"
            >
              <div className="h-full card-premium p-8 card-hover flex flex-col">
                {/* Icon */}
                <div className="inline-flex items-center justify-center w-14 h-14 rounded-lg border border-white/10 mb-6 group-hover:border-white/20 transition-colors">
                  <solution.icon className="h-7 w-7 text-white/70 group-hover:text-white transition-colors" />
                </div>

                {/* Title */}
                <h3 className="text-xl font-semibold text-white mb-4">
                  {solution.title}
                </h3>

                {/* Description */}
                <p className="text-muted-foreground text-sm mb-6">
                  {solution.description}
                </p>

                {/* Promise */}
                <div className="p-4 bg-white/5 border border-white/10 rounded-lg mb-6">
                  <p className="text-white/90 text-sm leading-relaxed">
                    <span className="text-white font-medium">Promessa:</span>{" "}
                    {solution.promise}
                  </p>
                </div>

                {/* Features */}
                <div className="mb-6 flex-grow">
                  <ul className="space-y-2">
                    {solution.features.map((feature, i) => (
                      <li
                        key={i}
                        className="flex items-center gap-2 text-sm text-muted-foreground"
                      >
                        <div className="w-1.5 h-1.5 rounded-full bg-white/30" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Ideal for */}
                <div className="pt-4 border-t border-white/10">
                  <p className="text-xs text-muted-foreground uppercase tracking-wider">
                    Ideal para: {solution.ideal}
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
          <p className="text-muted-foreground mb-6">
            Não sabe qual solução é ideal? Vamos descobrir juntos.
          </p>
          <Button
            onClick={() => {
              const el = document.getElementById("qualificar");
              el?.scrollIntoView({ behavior: "smooth" });
            }}
            className="btn-silver px-8 py-6 text-base uppercase tracking-widest group"
          >
            Agendar Call de Qualificação
            <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
          </Button>
        </motion.div>
      </div>

      {/* Linha decorativa inferior */}
      <div className="absolute bottom-0 left-0 right-0 h-px line-gradient" />
    </section>
  );
}
