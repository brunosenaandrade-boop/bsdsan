export interface Project {
  id: number;
  title: string;
  category: string;
  description: string;
  longDescription: string;
  technologies: string[];
  metrics: string;
  demoUrl: string | null;
  liveUrl: string | null;
  demoType: "live" | "iframe" | "video" | "case-study";
  testimonial: string;
  image: string;
}

export const projects: Project[] = [
  {
    id: 1,
    title: "GuardaDinheiro",
    category: "SaaS",
    description: "Plataforma de gestão financeira pessoal completa",
    longDescription:
      "Sistema completo de controle financeiro com dashboard analytics, categorização automática, metas e relatórios. Integração com Stripe para assinaturas.",
    technologies: ["Next.js", "TypeScript", "Supabase", "Stripe"],
    metrics: "5.000+ usuários ativos",
    demoUrl: "https://guardadinheiro.com.br/demo",
    liveUrl: "https://guardadinheiro.com.br",
    demoType: "live",
    testimonial:
      "Sistema completo que transformou minha gestão financeira.",
    image: "/projects/guardadinheiro.png",
  },
  {
    id: 2,
    title: "Motoristas do Sul",
    category: "Plataforma",
    description: "Sistema de transporte com calculadora automática",
    longDescription:
      "Plataforma completa para agendamento de transporte particular com cálculo de preço em tempo real, sistema de avaliações e perfis de motoristas verificados.",
    technologies: ["Next.js", "React", "Tailwind CSS"],
    metrics: "Taxa de conversão: 34%",
    demoUrl: "https://motoristasdosul.vercel.app/",
    liveUrl: "https://motoristasdosul.vercel.app/",
    demoType: "iframe",
    testimonial:
      "Plataforma intuitiva que facilitou muito nossos agendamentos.",
    image: "/projects/motoristas-sul.png",
  },
  {
    id: 3,
    title: "Prime Studio Atalaia",
    category: "Landing Page",
    description: "Investimento imobiliário com calculadora ROI",
    longDescription:
      "Landing page complexa para investimento imobiliário com calculadora de ROI interativa, galeria 3D de plantas, documentação legal e sistema de leads qualificados.",
    technologies: ["Next.js", "TypeScript", "Tailwind CSS"],
    metrics: "3 investidores na primeira semana",
    demoUrl: "https://primestudiosatalaia.vercel.app/",
    liveUrl: "https://primestudiosatalaia.vercel.app/",
    demoType: "iframe",
    testimonial:
      "Design impecável que transmite confiança. Resultado imediato.",
    image: "/projects/prime-studio.png",
  },
  {
    id: 4,
    title: "Cinthia Costa",
    category: "Landing Page",
    description: "Agendamento de serviços de beleza premium",
    longDescription:
      "Site ultra premium para lash designer com sistema de agendamento em tempo real, loja integrada de produtos e design que reflete exclusividade do serviço.",
    technologies: ["Next.js", "Tailwind CSS"],
    metrics: "+180% em agendamentos via site",
    demoUrl: "https://costa-eight.vercel.app/",
    liveUrl: "https://costa-eight.vercel.app/",
    demoType: "live",
    testimonial: "Site impecável que elevou minha marca a outro nível.",
    image: "/projects/cinthia-costa.png",
  },
  {
    id: 5,
    title: "WhatsApp Converter Premium",
    category: "Ferramenta",
    description: "Conversor de número para link WhatsApp",
    longDescription:
      "Ferramenta viral e minimalista que converte qualquer número de telefone em link direto para WhatsApp. Design clean focado em usabilidade máxima.",
    technologies: ["Next.js", "Tailwind CSS"],
    metrics: "500+ usos diários",
    demoUrl:
      "https://whatsapp-six-nu.vercel.app/whatsapp-converter-premium.html",
    liveUrl:
      "https://whatsapp-six-nu.vercel.app/whatsapp-converter-premium.html",
    demoType: "iframe",
    testimonial: "Ferramenta simples mas extremamente útil no dia a dia.",
    image: "/projects/whatsapp-converter.png",
  },
  {
    id: 6,
    title: "Neném Pneus",
    category: "E-commerce",
    description: "Loja online + agendamento de instalação",
    longDescription:
      "E-commerce completo de pneus seminovos com sistema de agendamento integrado para instalação, catálogo visual e checkout via WhatsApp.",
    technologies: ["Next.js", "Tailwind CSS"],
    metrics: "Vendas online 2x em 30 dias",
    demoUrl: "https://nenempneus.vercel.app/",
    liveUrl: "https://nenempneus.vercel.app/",
    demoType: "live",
    testimonial: "Digitalizou meu negócio e dobrou as vendas rapidamente.",
    image: "/projects/nenem-pneus.png",
  },
  {
    id: 7,
    title: "Tenha Paz",
    category: "App Mobile",
    description: "Bloqueador de chamadas spam para Android",
    longDescription:
      "Aplicativo Android com Material Design 3 que bloqueia chamadas indesejadas com 3 modos: automático, manual e whitelist. Interface intuitiva e eficiente.",
    technologies: ["Android", "Kotlin", "Material Design 3"],
    metrics: "97% funcional, em prep. Play Store",
    demoUrl: null,
    liveUrl: null,
    demoType: "video",
    testimonial: "App essencial para quem sofre com spam telefônico.",
    image: "/projects/tenha-paz.png",
  },
  {
    id: 8,
    title: "Dra. Flávia Argolo",
    category: "Site Profissional",
    description: "Site advocacia + chatbot AI integrado",
    longDescription:
      "Site institucional para advogada de direito de família com múltiplas landing pages especializadas, chatbot AI para qualificação de leads e SEO otimizado.",
    technologies: ["Next.js", "AI Chatbot", "SEO"],
    metrics: "28% taxa de conversão",
    demoUrl: null,
    liveUrl: null,
    demoType: "case-study",
    testimonial:
      "Site profissional que me posicionou como referência na região.",
    image: "/projects/dra-flavia.png",
  },
  {
    id: 9,
    title: "Seu Motorista VIP",
    category: "Landing Page",
    description: "Landing page foco máximo em conversão",
    longDescription:
      "Landing page enxuta e eficiente para motorista particular com copy persuasivo, design clean e botão WhatsApp estrategicamente posicionado.",
    technologies: ["HTML", "CSS", "Zyro"],
    metrics: "Entregue em 5 dias",
    demoUrl: "https://seumotoristavip.com.br/",
    liveUrl: "https://seumotoristavip.com.br/",
    demoType: "live",
    testimonial: "Simples, direto e funcional. Exatamente o que eu precisava.",
    image: "/projects/motorista-vip.png",
  },
];

export const getCategoryColor = (category: string): string => {
  const colors: Record<string, string> = {
    SaaS: "bg-purple-100 text-purple-700",
    Plataforma: "bg-blue-100 text-blue-700",
    "Landing Page": "bg-green-100 text-green-700",
    Ferramenta: "bg-orange-100 text-orange-700",
    "E-commerce": "bg-pink-100 text-pink-700",
    "App Mobile": "bg-cyan-100 text-cyan-700",
    "Site Profissional": "bg-indigo-100 text-indigo-700",
  };
  return colors[category] || "bg-gray-100 text-gray-700";
};
