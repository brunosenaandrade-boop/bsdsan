"use client";

import { useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { ExternalLink, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { openWhatsApp } from "@/lib/whatsapp";

interface CaseStudy {
  id: string;
  title: string;
  category: string;
  focus: string;
  result: string;
  resultDetail: string;
  image: string;
  metrics: {
    label: string;
    value: string;
  }[];
  description: string;
  technologies: string[];
  demoUrl?: string;
  liveUrl?: string;
}

const caseStudies: CaseStudy[] = [
  {
    id: "guardadinheiro",
    title: "GuardaDinheiro",
    category: "SaaS",
    focus: "Escalabilidade e Retenção",
    result: "+15.000 usuários ativos",
    resultDetail: "Monetização comprovada em 6 meses",
    image: "/projects/guardadinheiro.png",
    metrics: [
      { label: "Usuários Ativos", value: "15K+" },
      { label: "Retenção Mensal", value: "78%" },
      { label: "Tempo de Desenvolvimento", value: "45 dias" },
    ],
    description:
      "Plataforma SaaS de controle financeiro pessoal com gamificação. Arquitetura preparada para escala com milhares de usuários simultâneos.",
    technologies: ["Next.js", "Supabase", "Stripe", "PWA"],
    demoUrl: "https://guardadinheiro.com.br",
    liveUrl: "https://guardadinheiro.com.br",
  },
  {
    id: "prime-studio",
    title: "Prime Studio Atalaia",
    category: "Landing Page",
    focus: "Geração Imediata de Leads",
    result: "3 investidores na 1ª semana",
    resultDetail: "ROI atingido em 7 dias",
    image: "/projects/prime-studio.png",
    metrics: [
      { label: "Investidores Captados", value: "3" },
      { label: "ROI", value: "7 dias" },
      { label: "Taxa de Conversão", value: "12%" },
    ],
    description:
      "Landing page de alto impacto para empreendimento imobiliário de luxo. Design premium com foco total em conversão de leads qualificados.",
    technologies: ["Next.js", "Framer Motion", "Tailwind"],
    liveUrl: "https://primestudioatalaia.com.br",
  },
  {
    id: "motoristas-sul",
    title: "Motoristas do Sul",
    category: "Plataforma",
    focus: "Otimização de Processos",
    result: "Taxa de conversão de 34%",
    resultDetail: "No funil de cálculo de frete",
    image: "/projects/motoristas-sul.png",
    metrics: [
      { label: "Conversão", value: "34%" },
      { label: "Leads/mês", value: "200+" },
      { label: "Economia de Tempo", value: "80%" },
    ],
    description:
      "Plataforma de conexão entre motoristas e empresas de frete. Calculadora inteligente de rotas e preços com alta taxa de conversão.",
    technologies: ["React", "Node.js", "MongoDB", "API de Mapas"],
    liveUrl: "https://motoristasdosul.com.br",
  },
];

function CaseCard({
  study,
  index,
  onOpenDetails,
}: {
  study: CaseStudy;
  index: number;
  onOpenDetails: (study: CaseStudy) => void;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      className="group"
    >
      <div className="card-premium overflow-hidden card-hover">
        {/* Image */}
        <div className="relative aspect-video overflow-hidden">
          <Image
            src={study.image}
            alt={study.title}
            fill
            className="object-cover object-top transition-transform duration-700 group-hover:scale-105"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

          {/* Category badge */}
          <div className="absolute top-4 left-4">
            <span className="px-3 py-1 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full text-xs text-white uppercase tracking-wider">
              {study.category}
            </span>
          </div>

          {/* Result overlay */}
          <div className="absolute bottom-4 left-4 right-4">
            <div className="text-2xl font-bold text-white mb-1">
              {study.result}
            </div>
            <div className="text-sm text-white/70">{study.resultDetail}</div>
          </div>
        </div>

        {/* Content */}
        <div className="p-6">
          <h3 className="text-xl font-semibold text-white mb-2">
            {study.title}
          </h3>

          <p className="text-muted-foreground text-sm mb-4">
            <span className="text-white/70">Foco:</span> {study.focus}
          </p>

          {/* Quick metrics */}
          <div className="flex gap-4 mb-6">
            {study.metrics.slice(0, 2).map((metric, i) => (
              <div key={i} className="flex-1">
                <div className="text-lg font-semibold text-white">
                  {metric.value}
                </div>
                <div className="text-xs text-muted-foreground">
                  {metric.label}
                </div>
              </div>
            ))}
          </div>

          {/* Actions */}
          <div className="flex gap-3">
            <Button
              onClick={() => onOpenDetails(study)}
              variant="ghost"
              className="flex-1 text-white/70 hover:text-white hover:bg-white/5 border border-white/10"
            >
              Ver Case Completo
            </Button>
            {study.liveUrl && (
              <Button
                onClick={() => window.open(study.liveUrl, "_blank")}
                variant="ghost"
                size="icon"
                className="text-white/70 hover:text-white border border-white/10"
              >
                <ExternalLink className="h-4 w-4" />
              </Button>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  );
}

function CaseModal({
  study,
  isOpen,
  onClose,
}: {
  study: CaseStudy | null;
  isOpen: boolean;
  onClose: () => void;
}) {
  if (!study) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto bg-[#0d0d0d] border-white/10">
        <DialogHeader>
          <div className="flex items-center gap-3 mb-2">
            <span className="px-3 py-1 bg-white/10 border border-white/20 rounded-full text-xs text-white uppercase tracking-wider">
              {study.category}
            </span>
          </div>
          <DialogTitle className="text-2xl text-white">
            {study.title}
          </DialogTitle>
        </DialogHeader>

        {/* Image */}
        <div className="relative aspect-video rounded-lg overflow-hidden mb-6">
          <Image
            src={study.image}
            alt={study.title}
            fill
            className="object-cover object-top"
            sizes="800px"
          />
        </div>

        {/* Metrics grid */}
        <div className="grid grid-cols-3 gap-4 mb-6">
          {study.metrics.map((metric, i) => (
            <div
              key={i}
              className="text-center p-4 bg-white/5 border border-white/10 rounded-lg"
            >
              <div className="text-2xl font-bold text-white mb-1">
                {metric.value}
              </div>
              <div className="text-xs text-muted-foreground uppercase tracking-wider">
                {metric.label}
              </div>
            </div>
          ))}
        </div>

        {/* Description */}
        <p className="text-muted-foreground mb-6">{study.description}</p>

        {/* Technologies */}
        <div className="mb-6">
          <h4 className="text-sm font-medium text-white/70 uppercase tracking-wider mb-3">
            Stack Tecnológico
          </h4>
          <div className="flex flex-wrap gap-2">
            {study.technologies.map((tech) => (
              <span
                key={tech}
                className="px-3 py-1 bg-white/5 border border-white/10 rounded-full text-sm text-white/80"
              >
                {tech}
              </span>
            ))}
          </div>
        </div>

        {/* Actions */}
        <div className="flex gap-3">
          {study.liveUrl && (
            <Button
              onClick={() => window.open(study.liveUrl, "_blank")}
              className="btn-silver gap-2"
            >
              <ExternalLink className="h-4 w-4" />
              Ver Projeto ao Vivo
            </Button>
          )}
          <Button
            variant="ghost"
            onClick={() =>
              openWhatsApp({ type: "project", projectName: study.title })
            }
            className="text-white/70 hover:text-white border border-white/10"
          >
            Quero Algo Similar
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}

export function Results() {
  const [selectedStudy, setSelectedStudy] = useState<CaseStudy | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOpenDetails = (study: CaseStudy) => {
    setSelectedStudy(study);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setTimeout(() => setSelectedStudy(null), 200);
  };

  return (
    <section id="resultados" className="relative py-24 md:py-32 section-dark">
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
            INVESTIMENTO COM RETORNO COMPROVADO.
            <br />
            <span className="text-metallic">VEJA OS RESULTADOS.</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Cada projeto é um case de negócio, não apenas código.
          </p>
        </motion.div>

        {/* Cases Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {caseStudies.map((study, index) => (
            <CaseCard
              key={study.id}
              study={study}
              index={index}
              onOpenDetails={handleOpenDetails}
            />
          ))}
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <Button
            onClick={() => {
              const el = document.getElementById("qualificar");
              el?.scrollIntoView({ behavior: "smooth" });
            }}
            className="btn-silver px-8 py-6 text-base uppercase tracking-widest group"
          >
            Quero Resultados Assim
            <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
          </Button>
        </motion.div>
      </div>

      {/* Modal */}
      <CaseModal
        study={selectedStudy}
        isOpen={isModalOpen}
        onClose={handleCloseModal}
      />

      {/* Linha decorativa inferior */}
      <div className="absolute bottom-0 left-0 right-0 h-px line-gradient" />
    </section>
  );
}
