import { Header } from "@/components/sections/Header";
import { Hero } from "@/components/sections/Hero";
import { Authority } from "@/components/sections/Authority";
import { Results } from "@/components/sections/Results";
import { Solutions } from "@/components/sections/Solutions";
import { Qualify } from "@/components/sections/Qualify";
import { Footer } from "@/components/sections/Footer";
import { WhatsAppButton } from "@/components/shared/WhatsAppButton";
import { ChatBot } from "@/components/shared/ChatBot";

export default function Home() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <Authority />
        <Results />
        <Solutions />
        <Qualify />
      </main>
      <Footer />
      <WhatsAppButton />
      <ChatBot />
    </>
  );
}
