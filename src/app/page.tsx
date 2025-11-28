import { Header } from "@/components/sections/Header";
import { Hero } from "@/components/sections/Hero";
import { ProjectShowcase } from "@/components/sections/ProjectShowcase";
import { TransparencySection } from "@/components/sections/TransparencySection";
import { ClientSelector } from "@/components/sections/ClientSelector";
import { BudgetQuiz } from "@/components/sections/BudgetQuiz";
import { CTASection } from "@/components/sections/CTASection";
import { Footer } from "@/components/sections/Footer";
import { WhatsAppButton } from "@/components/shared/WhatsAppButton";
import { ChatBot } from "@/components/shared/ChatBot";

export default function Home() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <ProjectShowcase />
        <TransparencySection />
        <ClientSelector />
        <BudgetQuiz />
        <CTASection />
      </main>
      <Footer />
      <WhatsAppButton />
      <ChatBot />
    </>
  );
}
