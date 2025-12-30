'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { Shield, Award, Users, BarChart3, ArrowRight, Lock, FileCheck, Globe } from 'lucide-react';
import BSDSANHeader from '@/components/bsdsan/Header';
import BSDSANFooter from '@/components/bsdsan/Footer';

export default function BSDSANHome() {
  return (
    <main className="min-h-screen bg-[#0a0f1a]">
      <BSDSANHeader />

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20">
        {/* Background Effects */}
        <div className="absolute inset-0">
          <div className="absolute top-0 left-1/4 w-96 h-96 bg-[#1e3a5f]/20 rounded-full blur-[100px]" />
          <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-[#c9a227]/10 rounded-full blur-[100px]" />
          <div className="absolute inset-0 bg-[url('/bsdsan/grid.svg')] opacity-5" />
        </div>

        <div className="relative z-10 max-w-6xl mx-auto px-6 text-center">
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 bg-[#1e3a5f]/30 border border-[#1e3a5f]/50 rounded-full px-4 py-2 mb-8"
          >
            <Shield className="w-4 h-4 text-[#c9a227]" />
            <span className="text-xs text-[#8ba3c7] tracking-widest uppercase">Programa de Certificação Oficial</span>
          </motion.div>

          {/* Title */}
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-4xl md:text-6xl lg:text-7xl font-playfair font-bold text-white mb-6 leading-tight"
          >
            BsDeveloper<br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#c9a227] to-[#f4d03f]">
              Softwares de Alto Nível
            </span>
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-lg md:text-xl text-[#8ba3c7] max-w-3xl mx-auto mb-12 leading-relaxed"
          >
            Excelência em desenvolvimento de software com padrões internacionais de qualidade.
            Nosso programa de certificação garante que cada solução entregue supere as mais
            rigorosas expectativas do mercado.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            <Link
              href="/bsdsan/acesso"
              className="inline-flex items-center justify-center gap-2 bg-gradient-to-r from-[#c9a227] to-[#a08520] text-[#0a0f1a] px-8 py-4 rounded font-semibold text-lg hover:from-[#d4af37] hover:to-[#b8960c] transition-all group"
            >
              <Lock className="w-5 h-5" />
              Acessar Área Restrita
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Link>
            <Link
              href="/bsdsan/sobre"
              className="inline-flex items-center justify-center gap-2 bg-transparent border border-[#1e3a5f] text-white px-8 py-4 rounded font-semibold text-lg hover:bg-[#1e3a5f]/20 transition-all"
            >
              Conhecer a Empresa
            </Link>
          </motion.div>
        </div>

        {/* Scroll Indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 1 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2"
        >
          <div className="w-6 h-10 border-2 border-[#1e3a5f] rounded-full flex items-start justify-center p-2">
            <motion.div
              animate={{ y: [0, 12, 0] }}
              transition={{ repeat: Infinity, duration: 1.5 }}
              className="w-1.5 h-1.5 bg-[#c9a227] rounded-full"
            />
          </div>
        </motion.div>
      </section>

      {/* Stats Section */}
      <section className="py-20 bg-[#060a12] border-y border-[#1e3a5f]/20">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { value: '+500', label: 'Projetos Certificados', icon: FileCheck },
              { value: '+50', label: 'Empresas Atendidas', icon: Globe },
              { value: '99.7%', label: 'Taxa de Satisfação', icon: Award },
              { value: '24/7', label: 'Suporte Dedicado', icon: Users },
            ].map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="text-center"
              >
                <stat.icon className="w-8 h-8 text-[#c9a227] mx-auto mb-4" />
                <div className="text-3xl md:text-4xl font-bold text-white mb-2">{stat.value}</div>
                <div className="text-sm text-[#6b7c95] tracking-wide">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-24">
        <div className="max-w-6xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-playfair font-bold text-white mb-4">
              Por que somos referência
            </h2>
            <p className="text-[#8ba3c7] max-w-2xl mx-auto">
              Nossa metodologia exclusiva garante software de altíssima qualidade
              em cada etapa do desenvolvimento.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: Shield,
                title: 'Certificação Rigorosa',
                description: 'Cada projeto passa por um processo de validação de qualidade com mais de 200 pontos de verificação.',
              },
              {
                icon: BarChart3,
                title: 'Métricas de Excelência',
                description: 'Monitoramento contínuo de performance, segurança e usabilidade com relatórios detalhados.',
              },
              {
                icon: Award,
                title: 'Padrão Internacional',
                description: 'Seguimos as melhores práticas globais de desenvolvimento, alinhadas com ISO 25010.',
              },
            ].map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="bg-[#0d1424] border border-[#1e3a5f]/30 rounded-lg p-8 hover:border-[#c9a227]/30 transition-colors"
              >
                <div className="w-14 h-14 bg-gradient-to-br from-[#c9a227]/20 to-transparent rounded-lg flex items-center justify-center mb-6">
                  <feature.icon className="w-7 h-7 text-[#c9a227]" />
                </div>
                <h3 className="text-xl font-semibold text-white mb-3">{feature.title}</h3>
                <p className="text-[#6b7c95] leading-relaxed">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="py-24 bg-[#060a12]">
        <div className="max-w-6xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-playfair font-bold text-white mb-4">
              Nosso Processo de Qualidade
            </h2>
            <p className="text-[#8ba3c7] max-w-2xl mx-auto">
              Um fluxo estruturado que garante excelência em cada entrega.
            </p>
          </motion.div>

          <div className="relative">
            {/* Connection Line */}
            <div className="hidden md:block absolute top-1/2 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-[#1e3a5f] to-transparent -translate-y-1/2" />

            <div className="grid md:grid-cols-4 gap-8 relative">
              {[
                { step: '01', title: 'Análise', description: 'Levantamento detalhado de requisitos' },
                { step: '02', title: 'Desenvolvimento', description: 'Codificação seguindo padrões rigorosos' },
                { step: '03', title: 'Validação', description: 'Testes extensivos de qualidade' },
                { step: '04', title: 'Certificação', description: 'Selo de qualidade BSDSAN' },
              ].map((item, index) => (
                <motion.div
                  key={item.step}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.15 }}
                  className="relative bg-[#0a0f1a] p-6 text-center"
                >
                  <div className="w-16 h-16 bg-gradient-to-br from-[#c9a227] to-[#8b7355] rounded-full flex items-center justify-center mx-auto mb-4 relative z-10">
                    <span className="text-xl font-bold text-[#0a0f1a]">{item.step}</span>
                  </div>
                  <h3 className="text-lg font-semibold text-white mb-2">{item.title}</h3>
                  <p className="text-sm text-[#6b7c95]">{item.description}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-gradient-to-br from-[#0d1424] to-[#0a0f1a] border border-[#1e3a5f]/30 rounded-2xl p-12"
          >
            <Shield className="w-16 h-16 text-[#c9a227] mx-auto mb-6" />
            <h2 className="text-3xl md:text-4xl font-playfair font-bold text-white mb-4">
              Área de Analistas Credenciados
            </h2>
            <p className="text-[#8ba3c7] mb-8 max-w-xl mx-auto">
              Se você recebeu um convite para integrar nosso programa de certificação,
              acesse a área restrita com seu código de credenciamento.
            </p>
            <Link
              href="/bsdsan/acesso"
              className="inline-flex items-center justify-center gap-2 bg-gradient-to-r from-[#c9a227] to-[#a08520] text-[#0a0f1a] px-8 py-4 rounded font-semibold text-lg hover:from-[#d4af37] hover:to-[#b8960c] transition-all"
            >
              <Lock className="w-5 h-5" />
              Acessar com Código
            </Link>
          </motion.div>
        </div>
      </section>

      <BSDSANFooter />
    </main>
  );
}
