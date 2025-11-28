export interface BudgetAnswers {
  type: string;
  deadline: string;
  complexity: string;
  features: string[];
}

export interface BudgetResult {
  min: number;
  max: number;
  estimatedDays: { min: number; max: number };
  projectType: string;
  complexityLevel: string;
}

const projectTypePrices: Record<string, number> = {
  landing: 1500,
  website: 2500,
  ecommerce: 4000,
  system: 5000,
  mobile: 6000,
  saas: 8000,
};

const projectTypeLabels: Record<string, string> = {
  landing: "Landing Page",
  website: "Site Institucional",
  ecommerce: "E-commerce",
  system: "Sistema Web",
  mobile: "App Mobile",
  saas: "SaaS Completo",
};

const complexityMultipliers: Record<string, number> = {
  simple: 1,
  medium: 1.5,
  advanced: 2,
};

const complexityLabels: Record<string, string> = {
  simple: "Simples",
  medium: "Médio",
  advanced: "Avançado",
};

const deadlineMultipliers: Record<string, number> = {
  urgent: 1.3,
  normal: 1,
  relaxed: 0.85,
};

const featurePrices: Record<string, number> = {
  whatsapp: 300,
  payment: 800,
  dashboard: 1200,
  auth: 600,
  blog: 500,
  chatbot: 1500,
  mobile_extra: 3000,
};

const baseDays: Record<string, { min: number; max: number }> = {
  landing: { min: 5, max: 10 },
  website: { min: 10, max: 15 },
  ecommerce: { min: 14, max: 21 },
  system: { min: 14, max: 28 },
  mobile: { min: 21, max: 35 },
  saas: { min: 30, max: 60 },
};

export const calculateBudget = (answers: BudgetAnswers): BudgetResult => {
  const basePrice = projectTypePrices[answers.type] || 2500;
  const complexityMult = complexityMultipliers[answers.complexity] || 1;
  const deadlineMult = deadlineMultipliers[answers.deadline] || 1;

  let extrasCost = 0;
  answers.features.forEach((feature) => {
    extrasCost += featurePrices[feature] || 0;
  });

  const calculatedPrice = basePrice * complexityMult * deadlineMult + extrasCost;

  const totalMin = Math.round(calculatedPrice);
  const totalMax = Math.round(calculatedPrice * 1.3);

  // Calcular dias
  const baseDaysRange = baseDays[answers.type] || { min: 14, max: 21 };
  let daysMin = baseDaysRange.min;
  let daysMax = baseDaysRange.max;

  // Ajustar por complexidade
  if (answers.complexity === "medium") {
    daysMin = Math.round(daysMin * 1.3);
    daysMax = Math.round(daysMax * 1.3);
  } else if (answers.complexity === "advanced") {
    daysMin = Math.round(daysMin * 1.6);
    daysMax = Math.round(daysMax * 1.6);
  }

  // Ajustar por prazo
  if (answers.deadline === "urgent") {
    daysMin = Math.max(5, Math.round(daysMin * 0.7));
    daysMax = Math.round(daysMax * 0.7);
  } else if (answers.deadline === "relaxed") {
    daysMin = Math.round(daysMin * 1.2);
    daysMax = Math.round(daysMax * 1.5);
  }

  return {
    min: totalMin,
    max: totalMax,
    estimatedDays: { min: daysMin, max: daysMax },
    projectType: projectTypeLabels[answers.type] || answers.type,
    complexityLevel: complexityLabels[answers.complexity] || answers.complexity,
  };
};

export const formatCurrency = (value: number): string => {
  return value.toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  });
};
