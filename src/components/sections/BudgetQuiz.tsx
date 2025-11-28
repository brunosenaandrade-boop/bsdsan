"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowRight,
  ArrowLeft,
  FileText,
  Building,
  ShoppingCart,
  Layout,
  Smartphone,
  Cloud,
  Clock,
  Zap,
  Calendar,
  CheckCircle2,
  MessageCircle,
  CreditCard,
  BarChart3,
  User,
  BookOpen,
  Bot,
  Loader2,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Checkbox } from "@/components/ui/checkbox";
import { calculateBudget, formatCurrency, BudgetAnswers } from "@/lib/budget-calculator";
import { openWhatsApp } from "@/lib/whatsapp";

const projectTypes = [
  { id: "landing", label: "Landing Page", icon: FileText },
  { id: "website", label: "Site Institucional (5-10 páginas)", icon: Building },
  { id: "ecommerce", label: "E-commerce", icon: ShoppingCart },
  { id: "system", label: "Sistema Web (dashboard/painel)", icon: Layout },
  { id: "mobile", label: "App Mobile", icon: Smartphone },
  { id: "saas", label: "SaaS Completo", icon: Cloud },
];

const deadlines = [
  { id: "urgent", label: "Urgente (7-10 dias)", icon: Zap, note: "+30% urgência" },
  { id: "normal", label: "Normal (14-21 dias)", icon: Clock, note: "Valor base" },
  { id: "relaxed", label: "Tranquilo (30+ dias)", icon: Calendar, note: "-15% desconto" },
];

const complexities = [
  { id: "simple", label: "Simples", description: "Portfólio, site básico" },
  { id: "medium", label: "Médio", description: "E-commerce, agendamento" },
  { id: "advanced", label: "Avançado", description: "SaaS, pagamento, dashboard" },
];

const features = [
  { id: "whatsapp", label: "Integração WhatsApp", price: 300, icon: MessageCircle },
  { id: "payment", label: "Sistema de pagamento", price: 800, icon: CreditCard },
  { id: "dashboard", label: "Dashboard analytics", price: 1200, icon: BarChart3 },
  { id: "auth", label: "Login/cadastro", price: 600, icon: User },
  { id: "blog", label: "Blog/CMS", price: 500, icon: BookOpen },
  { id: "chatbot", label: "Chatbot AI", price: 1500, icon: Bot },
  { id: "mobile_extra", label: "App Mobile além do web", price: 3000, icon: Smartphone },
];

type Step = 1 | 2 | 3 | 4 | 5;

export function BudgetQuiz() {
  const [currentStep, setCurrentStep] = useState<Step>(1);
  const [isCalculating, setIsCalculating] = useState(false);
  const [answers, setAnswers] = useState<BudgetAnswers>({
    type: "",
    deadline: "",
    complexity: "",
    features: [],
  });

  const totalSteps = 4;
  const progress = ((currentStep - 1) / totalSteps) * 100;

  const canProceed = () => {
    switch (currentStep) {
      case 1:
        return answers.type !== "";
      case 2:
        return answers.deadline !== "";
      case 3:
        return answers.complexity !== "";
      case 4:
        return true; // Features are optional
      default:
        return false;
    }
  };

  const handleNext = () => {
    if (currentStep === 4) {
      setIsCalculating(true);
      setTimeout(() => {
        setIsCalculating(false);
        setCurrentStep(5);
      }, 2000);
    } else {
      setCurrentStep((prev) => (prev + 1) as Step);
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep((prev) => (prev - 1) as Step);
    }
  };

  const handleFeatureToggle = (featureId: string) => {
    setAnswers((prev) => ({
      ...prev,
      features: prev.features.includes(featureId)
        ? prev.features.filter((f) => f !== featureId)
        : [...prev.features, featureId],
    }));
  };

  const result = currentStep === 5 ? calculateBudget(answers) : null;

  const handleWhatsApp = () => {
    if (result) {
      openWhatsApp({
        type: "budget",
        budgetData: {
          type: result.projectType,
          complexity: result.complexityLevel,
          deadline:
            answers.deadline === "urgent"
              ? "Urgente"
              : answers.deadline === "normal"
              ? "Normal"
              : "Tranquilo",
          features: answers.features.map(
            (f) => features.find((feat) => feat.id === f)?.label || f
          ),
          minValue: result.min,
          maxValue: result.max,
        },
      });
    }
  };

  return (
    <section id="orcamento" className="py-20">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="font-poppins font-bold text-3xl md:text-4xl mb-4">
            DESCUBRA SE SEU PROJETO É{" "}
            <span className="text-gradient">VIÁVEL</span>
          </h2>
          <p className="text-muted-foreground">
            (SEM COMPROMISSO, LEVA 2 MINUTOS)
          </p>
        </motion.div>

        {/* Quiz Card */}
        <div className="max-w-3xl mx-auto">
          <Card className="border-2">
            <CardContent className="p-6 md:p-8">
              {/* Progress */}
              {currentStep < 5 && (
                <div className="mb-8">
                  <div className="flex justify-between text-sm text-muted-foreground mb-2">
                    <span>Passo {currentStep} de {totalSteps}</span>
                    <span>{Math.round(progress)}%</span>
                  </div>
                  <Progress value={progress} className="h-2" />
                </div>
              )}

              <AnimatePresence mode="wait">
                {/* Step 1: Project Type */}
                {currentStep === 1 && (
                  <motion.div
                    key="step1"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                  >
                    <h3 className="font-poppins font-semibold text-xl mb-6">
                      Que tipo de projeto você precisa?
                    </h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {projectTypes.map((type) => (
                        <button
                          key={type.id}
                          onClick={() =>
                            setAnswers((prev) => ({ ...prev, type: type.id }))
                          }
                          className={`p-4 rounded-lg border-2 text-left transition-all flex items-center gap-3 ${
                            answers.type === type.id
                              ? "border-primary bg-primary/5"
                              : "border-border hover:border-primary/50"
                          }`}
                        >
                          <type.icon
                            className={`h-5 w-5 ${
                              answers.type === type.id
                                ? "text-primary"
                                : "text-muted-foreground"
                            }`}
                          />
                          <span className="font-medium">{type.label}</span>
                        </button>
                      ))}
                    </div>
                  </motion.div>
                )}

                {/* Step 2: Deadline */}
                {currentStep === 2 && (
                  <motion.div
                    key="step2"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                  >
                    <h3 className="font-poppins font-semibold text-xl mb-6">
                      Qual é o seu prazo?
                    </h3>
                    <div className="space-y-3">
                      {deadlines.map((deadline) => (
                        <button
                          key={deadline.id}
                          onClick={() =>
                            setAnswers((prev) => ({
                              ...prev,
                              deadline: deadline.id,
                            }))
                          }
                          className={`w-full p-4 rounded-lg border-2 text-left transition-all flex items-center justify-between ${
                            answers.deadline === deadline.id
                              ? "border-primary bg-primary/5"
                              : "border-border hover:border-primary/50"
                          }`}
                        >
                          <div className="flex items-center gap-3">
                            <deadline.icon
                              className={`h-5 w-5 ${
                                answers.deadline === deadline.id
                                  ? "text-primary"
                                  : "text-muted-foreground"
                              }`}
                            />
                            <span className="font-medium">{deadline.label}</span>
                          </div>
                          <span className="text-sm text-muted-foreground">
                            {deadline.note}
                          </span>
                        </button>
                      ))}
                    </div>
                  </motion.div>
                )}

                {/* Step 3: Complexity */}
                {currentStep === 3 && (
                  <motion.div
                    key="step3"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                  >
                    <h3 className="font-poppins font-semibold text-xl mb-6">
                      Qual a complexidade do projeto?
                    </h3>
                    <div className="space-y-3">
                      {complexities.map((complexity) => (
                        <button
                          key={complexity.id}
                          onClick={() =>
                            setAnswers((prev) => ({
                              ...prev,
                              complexity: complexity.id,
                            }))
                          }
                          className={`w-full p-4 rounded-lg border-2 text-left transition-all ${
                            answers.complexity === complexity.id
                              ? "border-primary bg-primary/5"
                              : "border-border hover:border-primary/50"
                          }`}
                        >
                          <span className="font-medium block">
                            {complexity.label}
                          </span>
                          <span className="text-sm text-muted-foreground">
                            {complexity.description}
                          </span>
                        </button>
                      ))}
                    </div>
                  </motion.div>
                )}

                {/* Step 4: Features */}
                {currentStep === 4 && (
                  <motion.div
                    key="step4"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                  >
                    <h3 className="font-poppins font-semibold text-xl mb-2">
                      Features extras (opcional)
                    </h3>
                    <p className="text-muted-foreground mb-6">
                      Selecione funcionalidades adicionais que você precisa
                    </p>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {features.map((feature) => (
                        <label
                          key={feature.id}
                          className={`p-4 rounded-lg border-2 cursor-pointer transition-all flex items-start gap-3 ${
                            answers.features.includes(feature.id)
                              ? "border-primary bg-primary/5"
                              : "border-border hover:border-primary/50"
                          }`}
                        >
                          <Checkbox
                            checked={answers.features.includes(feature.id)}
                            onCheckedChange={() => handleFeatureToggle(feature.id)}
                          />
                          <div className="flex-1">
                            <div className="flex items-center gap-2">
                              <feature.icon className="h-4 w-4 text-muted-foreground" />
                              <span className="font-medium">{feature.label}</span>
                            </div>
                            <span className="text-sm text-primary-teal">
                              +R$ {feature.price}
                            </span>
                          </div>
                        </label>
                      ))}
                    </div>
                  </motion.div>
                )}

                {/* Calculating */}
                {isCalculating && (
                  <motion.div
                    key="calculating"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="py-12 text-center"
                  >
                    <Loader2 className="h-12 w-12 animate-spin mx-auto text-primary mb-4" />
                    <p className="text-lg font-medium">Calculando seu orçamento...</p>
                  </motion.div>
                )}

                {/* Step 5: Result */}
                {currentStep === 5 && result && !isCalculating && (
                  <motion.div
                    key="step5"
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="text-center"
                  >
                    <CheckCircle2 className="h-16 w-16 text-primary-teal mx-auto mb-4" />

                    <div className="space-y-4 mb-8">
                      <div className="p-4 bg-muted rounded-lg">
                        <p className="text-sm text-muted-foreground">SEU PROJETO:</p>
                        <p className="font-semibold text-lg">{result.projectType}</p>
                      </div>

                      <div className="p-4 bg-muted rounded-lg">
                        <p className="text-sm text-muted-foreground">COMPLEXIDADE:</p>
                        <p className="font-semibold text-lg">{result.complexityLevel}</p>
                      </div>

                      <div className="p-4 bg-muted rounded-lg">
                        <p className="text-sm text-muted-foreground">PRAZO ESTIMADO:</p>
                        <p className="font-semibold text-lg">
                          {result.estimatedDays.min}-{result.estimatedDays.max} dias
                        </p>
                      </div>
                    </div>

                    <div className="p-6 bg-gradient-to-r from-primary-blue/10 to-primary-teal/10 rounded-xl mb-6">
                      <p className="text-sm text-muted-foreground mb-2">
                        INVESTIMENTO APROXIMADO:
                      </p>
                      <p className="font-poppins font-bold text-3xl md:text-4xl text-gradient">
                        {formatCurrency(result.min)} - {formatCurrency(result.max)}
                      </p>
                      <p className="text-xs text-muted-foreground mt-2">
                        *Valor varia conforme detalhamento. Projetos similares já
                        entregues nessa faixa.
                      </p>
                    </div>

                    <Button
                      size="lg"
                      onClick={handleWhatsApp}
                      className="w-full sm:w-auto bg-green-500 hover:bg-green-600 text-white gap-2"
                    >
                      <MessageCircle className="h-5 w-5" />
                      FALAR COM BRUNO AGORA
                    </Button>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Navigation */}
              {currentStep < 5 && !isCalculating && (
                <div className="flex justify-between mt-8 pt-6 border-t">
                  <Button
                    variant="ghost"
                    onClick={handleBack}
                    disabled={currentStep === 1}
                    className="gap-2"
                  >
                    <ArrowLeft className="h-4 w-4" />
                    Voltar
                  </Button>
                  <Button
                    onClick={handleNext}
                    disabled={!canProceed()}
                    className="gradient-primary-135 text-white gap-2"
                  >
                    {currentStep === 4 ? "Ver Resultado" : "Próximo"}
                    <ArrowRight className="h-4 w-4" />
                  </Button>
                </div>
              )}

              {/* Restart */}
              {currentStep === 5 && (
                <div className="mt-6 text-center">
                  <Button
                    variant="ghost"
                    onClick={() => {
                      setCurrentStep(1);
                      setAnswers({ type: "", deadline: "", complexity: "", features: [] });
                    }}
                  >
                    Fazer nova simulação
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
}
