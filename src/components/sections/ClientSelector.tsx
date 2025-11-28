"use client";

import { motion } from "framer-motion";
import { Building2, Rocket, Lightbulb, ArrowRight } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const scrollToSection = (id: string) => {
  const element = document.getElementById(id);
  if (element) {
    element.scrollIntoView({ behavior: "smooth" });
  }
};

const clientTypes = [
  {
    icon: Building2,
    title: "SOU PME/EMPRESÁRIO LOCAL",
    subtitle: "Preciso de:",
    needs: [
      "Site profissional",
      "Sistema interno",
      "Loja online",
      "Automação WhatsApp",
    ],
    examples: [
      "Neném Pneus (e-commerce)",
      "Cinthia Costa (agendamento)",
      "Motorista VIP (landing)",
    ],
    buttonText: "VER SOLUÇÕES PRA PME",
    filter: "pme",
    color: "blue",
  },
  {
    icon: Rocket,
    title: "SOU EMPREENDEDOR DIGITAL",
    subtitle: "Quero:",
    needs: [
      "SaaS pronto pra revender",
      "Sistema de assinatura",
      "Dashboard analytics",
      "Integração pagamento",
    ],
    examples: [
      "GuardaDinheiro (5k usuários)",
      "WhatsApp Converter (viral)",
      "Tenha Paz (app Android)",
    ],
    buttonText: "VER SOLUÇÕES SAAS",
    filter: "saas",
    color: "teal",
  },
  {
    icon: Lightbulb,
    title: "TENHO IDEIA, ZERO CÓDIGO",
    subtitle: "Preciso validar rápido:",
    needs: [
      "MVP em 7-14 dias",
      "Landing + formulário",
      "Integração pagamento",
      "Suporte pós-lançamento",
    ],
    examples: [
      "Prime Studio (ROI em 1 sem)",
      "Dra. Flávia (28% conversão)",
      "Motoristas Sul (calc interativa)",
    ],
    buttonText: "VALIDAR MINHA IDEIA",
    filter: "mvp",
    color: "purple",
  },
];

export function ClientSelector() {
  return (
    <section id="seletor" className="py-20 bg-muted/30">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="font-poppins font-bold text-3xl md:text-4xl mb-4">
            QUAL DESSES É <span className="text-gradient">SEU CENÁRIO?</span>
          </h2>
        </motion.div>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {clientTypes.map((type, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
            >
              <Card className="h-full group card-hover border-2 border-transparent hover:border-primary/20 cursor-pointer">
                <CardContent className="p-6">
                  {/* Icon */}
                  <div
                    className={`inline-flex p-4 rounded-xl mb-4 ${
                      type.color === "blue"
                        ? "bg-primary-blue/10"
                        : type.color === "teal"
                        ? "bg-primary-teal/10"
                        : "bg-purple-100"
                    }`}
                  >
                    <type.icon
                      className={`h-8 w-8 ${
                        type.color === "blue"
                          ? "text-primary-blue"
                          : type.color === "teal"
                          ? "text-primary-teal"
                          : "text-purple-600"
                      }`}
                    />
                  </div>

                  {/* Title */}
                  <h3 className="font-poppins font-bold text-xl mb-4">
                    {type.title}
                  </h3>

                  {/* Needs */}
                  <p className="text-muted-foreground font-medium mb-2">
                    {type.subtitle}
                  </p>
                  <ul className="space-y-1 mb-4">
                    {type.needs.map((need, i) => (
                      <li key={i} className="text-sm flex items-center gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-primary-teal" />
                        {need}
                      </li>
                    ))}
                  </ul>

                  {/* Examples */}
                  <p className="text-sm text-muted-foreground font-medium mb-2">
                    Exemplos do que já fiz:
                  </p>
                  <ul className="space-y-1 mb-6">
                    {type.examples.map((example, i) => (
                      <li
                        key={i}
                        className="text-sm text-primary-teal flex items-center gap-2"
                      >
                        <ArrowRight className="h-3 w-3" />
                        {example}
                      </li>
                    ))}
                  </ul>

                  {/* Button */}
                  <Button
                    onClick={() => scrollToSection("orcamento")}
                    className="w-full gradient-primary-135 text-white group-hover:opacity-90"
                  >
                    {type.buttonText}
                  </Button>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
