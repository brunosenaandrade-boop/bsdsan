"use client";

import { motion } from "framer-motion";
import { BarChart3, MessageCircle, Heart, Quote } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

const testimonials = [
  {
    text: "Bruno, o site ficou PERFEITO! Já agendei 3 clientes hoje de manhã!",
    author: "Cliente Cinthia Costa",
  },
  {
    text: "Cara, tu é brabo demais. Sistema rodando liso, zero bug.",
    author: "Cliente GuardaDinheiro",
  },
  {
    text: "Melhor investimento que fiz esse ano. Valeu cada centavo.",
    author: "Cliente Prime Studio",
  },
];

export function TransparencySection() {
  return (
    <section id="sobre" className="py-20">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="font-poppins font-bold text-3xl md:text-4xl mb-4">
            POR QUE TRABALHAR COMIGO{" "}
            <span className="text-gradient">
              (E NÃO COM OS 500 FREELANCERS DO BRASIL)
            </span>
          </h2>
        </motion.div>

        {/* Three Columns */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Column 1: Compromisso */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
          >
            <Card className="h-full border-2 border-primary/10 hover:border-primary/30 transition-colors">
              <CardContent className="p-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className="p-3 rounded-lg bg-primary-teal/10">
                    <BarChart3 className="h-6 w-6 text-primary-teal" />
                  </div>
                  <h3 className="font-poppins font-semibold text-xl">
                    COMPROMISSO = DADOS REAIS
                  </h3>
                </div>

                <div className="space-y-4">
                  <div className="p-4 bg-muted rounded-lg">
                    <p className="text-sm text-muted-foreground mb-1">
                      Prazo médio de entrega:
                    </p>
                    <p className="font-semibold">
                      7-14 dias (simples)
                      <br />
                      14-30 dias (complexo)
                    </p>
                  </div>

                  <div className="p-4 bg-muted rounded-lg">
                    <p className="text-sm text-muted-foreground mb-1">
                      Taxa de aprovação 1ª versão:
                    </p>
                    <p className="font-semibold text-primary-teal text-xl">
                      94%
                    </p>
                    <p className="text-xs text-muted-foreground">
                      (você não fica pedindo 15 revisões)
                    </p>
                  </div>

                  <div className="p-4 bg-muted rounded-lg">
                    <p className="text-sm text-muted-foreground mb-1">
                      Projetos entregues:
                    </p>
                    <p className="font-semibold text-xl">9+ rodando em produção</p>
                    <p className="text-xs text-muted-foreground">
                      (não sou &ldquo;iniciante testando&rdquo;)
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Column 2: Honestidade */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
          >
            <Card className="h-full border-2 border-primary/10 hover:border-primary/30 transition-colors">
              <CardContent className="p-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className="p-3 rounded-lg bg-primary-blue/10">
                    <MessageCircle className="h-6 w-6 text-primary-blue" />
                  </div>
                  <h3 className="font-poppins font-semibold text-xl">
                    HONESTIDADE = CONVERSA DIRETA
                  </h3>
                </div>

                <div className="p-4 bg-muted rounded-lg space-y-4">
                  <p className="text-sm leading-relaxed">
                    &ldquo;Ó, eu NÃO sou agência gigante com 20 funcionários.
                  </p>
                  <p className="text-sm leading-relaxed">
                    Sou Bruno Sena, um cara de Tubarão/SC que AMA tecnologia e
                    resolver problemas de verdade.
                  </p>
                  <p className="text-sm leading-relaxed">
                    Se você quer alguém que vai responder teu WhatsApp às 22h
                    quando der problema, <strong>sou eu</strong>.
                  </p>
                  <p className="text-sm leading-relaxed">
                    Se quer apresentação em PowerPoint com 40 slides,{" "}
                    <strong>não sou eu</strong>.
                  </p>
                  <p className="text-sm leading-relaxed font-medium text-primary-teal">
                    Meu negócio é: você me conta o problema, eu entrego a solução
                    funcionando. Simples assim.&rdquo;
                  </p>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Column 3: Dedicação */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
          >
            <Card className="h-full border-2 border-primary/10 hover:border-primary/30 transition-colors">
              <CardContent className="p-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className="p-3 rounded-lg bg-red-100">
                    <Heart className="h-6 w-6 text-red-500" />
                  </div>
                  <h3 className="font-poppins font-semibold text-xl">
                    DEDICAÇÃO = CASES REAIS
                  </h3>
                </div>

                <div className="space-y-4">
                  {testimonials.map((testimonial, index) => (
                    <div key={index} className="p-4 bg-muted rounded-lg">
                      <Quote className="h-4 w-4 text-primary-teal mb-2" />
                      <p className="text-sm italic mb-2">
                        &ldquo;{testimonial.text}&rdquo;
                      </p>
                      <p className="text-xs text-muted-foreground font-medium">
                        — {testimonial.author}
                      </p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
