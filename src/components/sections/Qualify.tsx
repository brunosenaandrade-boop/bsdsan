"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Send, ArrowRight, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { openWhatsApp } from "@/lib/whatsapp";

const projectTypes = [
  { id: "saas", label: "SaaS / Produto Digital" },
  { id: "pme", label: "Sistema para Empresa" },
  { id: "landing", label: "Landing Page" },
  { id: "ecommerce", label: "E-commerce" },
  { id: "outro", label: "Outro" },
];

const budgetRanges = [
  { id: "3k-5k", label: "R$ 3.000 - R$ 5.000" },
  { id: "5k-10k", label: "R$ 5.000 - R$ 10.000" },
  { id: "10k-20k", label: "R$ 10.000 - R$ 20.000" },
  { id: "20k+", label: "R$ 20.000+" },
  { id: "aberto", label: "Orçamento aberto" },
];

export function Qualify() {
  const [selectedType, setSelectedType] = useState<string>("");
  const [selectedBudget, setSelectedBudget] = useState<string>("");
  const [description, setDescription] = useState("");

  const handleSubmit = () => {
    const typeLabel = projectTypes.find((t) => t.id === selectedType)?.label || "";
    const budgetLabel = budgetRanges.find((b) => b.id === selectedBudget)?.label || "";

    const message = `*Qualificação de Projeto*

📋 *Tipo:* ${typeLabel}
💰 *Investimento:* ${budgetLabel}

📝 *Descrição:*
${description}`;

    openWhatsApp({ type: "custom", customMessage: message });
  };

  const isValid = selectedType && selectedBudget && description.length > 10;

  return (
    <section id="qualificar" className="relative py-24 md:py-32 section-dark">
      {/* Linha decorativa superior */}
      <div className="absolute top-0 left-0 right-0 h-px line-gradient" />

      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto">
          {/* Section Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-2xl md:text-4xl font-bold text-white mb-4">
              A PRÓXIMA CONVERSÃO{" "}
              <span className="text-metallic">PODE SER A SUA.</span>
            </h2>
            <p className="text-muted-foreground">
              Preencha o formulário para qualificar seu projeto. Retorno em até 24h.
            </p>
          </motion.div>

          {/* Form */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="card-premium p-8 md:p-10"
          >
            {/* Project Type */}
            <div className="mb-8">
              <label className="block text-sm font-medium text-white/70 uppercase tracking-wider mb-4">
                Tipo de Projeto
              </label>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                {projectTypes.map((type) => (
                  <button
                    key={type.id}
                    onClick={() => setSelectedType(type.id)}
                    className={`p-4 rounded-lg border text-sm transition-all ${
                      selectedType === type.id
                        ? "border-white/50 bg-white/10 text-white"
                        : "border-white/10 text-muted-foreground hover:border-white/20 hover:text-white"
                    }`}
                  >
                    <div className="flex items-center gap-2">
                      {selectedType === type.id && (
                        <Check className="h-4 w-4 text-white" />
                      )}
                      {type.label}
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Budget Range */}
            <div className="mb-8">
              <label className="block text-sm font-medium text-white/70 uppercase tracking-wider mb-4">
                Faixa de Investimento
              </label>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                {budgetRanges.map((budget) => (
                  <button
                    key={budget.id}
                    onClick={() => setSelectedBudget(budget.id)}
                    className={`p-4 rounded-lg border text-sm transition-all ${
                      selectedBudget === budget.id
                        ? "border-white/50 bg-white/10 text-white"
                        : "border-white/10 text-muted-foreground hover:border-white/20 hover:text-white"
                    }`}
                  >
                    <div className="flex items-center gap-2">
                      {selectedBudget === budget.id && (
                        <Check className="h-4 w-4 text-white" />
                      )}
                      {budget.label}
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Description */}
            <div className="mb-8">
              <label className="block text-sm font-medium text-white/70 uppercase tracking-wider mb-4">
                Descreva seu projeto
              </label>
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Conte um pouco sobre o que você precisa, qual problema quer resolver e qual resultado espera..."
                rows={4}
                className="w-full p-4 bg-white/5 border border-white/10 rounded-lg text-white placeholder:text-muted-foreground focus:outline-none focus:border-white/30 resize-none transition-colors"
              />
            </div>

            {/* Submit */}
            <Button
              onClick={handleSubmit}
              disabled={!isValid}
              className={`w-full py-6 text-base uppercase tracking-widest group ${
                isValid ? "btn-silver" : "bg-white/10 text-white/50 cursor-not-allowed"
              }`}
            >
              <Send className="mr-2 h-5 w-5" />
              Enviar para Qualificação
              {isValid && (
                <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
              )}
            </Button>

            {/* Note */}
            <p className="text-center text-xs text-muted-foreground mt-4">
              Ao enviar, você será direcionado para o WhatsApp para continuar a conversa.
            </p>
          </motion.div>
        </div>
      </div>

      {/* Linha decorativa inferior */}
      <div className="absolute bottom-0 left-0 right-0 h-px line-gradient" />
    </section>
  );
}
