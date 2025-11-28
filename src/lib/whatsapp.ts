const WHATSAPP_NUMBER = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || "5548999999999";

export interface WhatsAppMessage {
  type: "generic" | "budget" | "project" | "custom";
  projectName?: string;
  budgetData?: {
    type: string;
    complexity: string;
    deadline: string;
    features: string[];
    minValue: number;
    maxValue: number;
  };
  customMessage?: string;
  painPoints?: string[];
}

export const generateWhatsAppLink = (messageData: WhatsAppMessage): string => {
  let message = "";

  switch (messageData.type) {
    case "generic":
      message = `Olá Bruno! Vim pelo seu site e gostaria de saber mais sobre seus serviços de desenvolvimento.`;
      break;

    case "budget":
      if (messageData.budgetData) {
        const { type, complexity, deadline, features, minValue, maxValue } =
          messageData.budgetData;
        message = `Oi Bruno! Fiz a simulação no seu site:

- Tipo: ${type}
- Complexidade: ${complexity}
- Prazo: ${deadline}
- Features: ${features.join(", ") || "Nenhuma extra"}
- Investimento estimado: R$ ${minValue.toLocaleString("pt-BR")} - R$ ${maxValue.toLocaleString("pt-BR")}

Quero conversar sobre fazer esse projeto.`;
      }
      break;

    case "project":
      message = `Olá Bruno! Vi o projeto "${messageData.projectName}" no seu portfólio e fiquei interessado. Gostaria de conversar sobre um projeto similar.`;
      break;

    case "custom":
      if (messageData.painPoints && messageData.painPoints.length > 0) {
        message = `Olá Bruno! Conversei com a assistente do site e identifiquei algumas necessidades:

${messageData.painPoints.map((p) => `- ${p}`).join("\n")}

${messageData.customMessage || "Gostaria de conversar sobre como você pode me ajudar."}`;
      } else {
        message = messageData.customMessage || "Olá Bruno! Gostaria de conversar sobre um projeto.";
      }
      break;
  }

  const encodedMessage = encodeURIComponent(message);
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodedMessage}`;
};

export const openWhatsApp = (messageData: WhatsAppMessage): void => {
  const link = generateWhatsAppLink(messageData);
  window.open(link, "_blank");
};
