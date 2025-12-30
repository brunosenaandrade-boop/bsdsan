'use client';

import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Shield, Award, Target, Eye, Heart, Linkedin, Mail, Building2, Calendar, Users, Globe, CheckCircle } from 'lucide-react';
import BSDSANHeader from '@/components/bsdsan/Header';
import BSDSANFooter from '@/components/bsdsan/Footer';

export default function SobrePage() {
  return (
    <main className="min-h-screen bg-[#0a0f1a]">
      <BSDSANHeader />

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 overflow-hidden">
        {/* Background */}
        <div className="absolute inset-0">
          <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-[#c9a227]/5 rounded-full blur-[150px]" />
          <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-[#1e3a5f]/20 rounded-full blur-[100px]" />
        </div>

        <div className="relative z-10 max-w-6xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-16"
          >
            <div className="inline-flex items-center gap-2 bg-[#1e3a5f]/30 border border-[#1e3a5f]/50 rounded-full px-4 py-2 mb-6">
              <Building2 className="w-4 h-4 text-[#c9a227]" />
              <span className="text-xs text-[#8ba3c7] tracking-widest uppercase">Institucional</span>
            </div>
            <h1 className="text-4xl md:text-5xl font-playfair font-bold text-white mb-6">
              Conheça a <span className="text-[#c9a227]">BSDSAN</span>
            </h1>
            <p className="text-lg text-[#8ba3c7] max-w-3xl mx-auto">
              BsDeveloper Softwares de Alto Nível — comprometidos com a excelência
              em cada linha de código desde 2020.
            </p>
          </motion.div>
        </div>
      </section>

      {/* História */}
      <section className="py-20 bg-[#060a12]">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="text-3xl font-playfair font-bold text-white mb-6">
                Nossa História
              </h2>
              <div className="space-y-4 text-[#8ba3c7] leading-relaxed">
                <p>
                  A <strong className="text-white">BSDSAN</strong> nasceu em 2020 da visão de transformar
                  o desenvolvimento de software no Brasil. Com sede em Santa Catarina, iniciamos
                  nossa jornada com um propósito claro: entregar soluções digitais que superem
                  expectativas e estabeleçam novos padrões de qualidade.
                </p>
                <p>
                  Ao longo dos anos, consolidamos nossa metodologia exclusiva de certificação,
                  que hoje é referência no mercado. Cada projeto que passa por nossas mãos
                  recebe atenção meticulosa, desde a concepção até a entrega final.
                </p>
                <p>
                  Hoje, orgulhamo-nos de ter impactado mais de 500 projetos e auxiliado
                  dezenas de empresas a alcançarem seus objetivos digitais com software
                  de altíssimo nível.
                </p>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="grid grid-cols-2 gap-4"
            >
              {[
                { icon: Calendar, label: 'Fundação', value: '2020' },
                { icon: Users, label: 'Colaboradores', value: '+25' },
                { icon: Globe, label: 'Estados Atendidos', value: '15' },
                { icon: Award, label: 'Certificações', value: '+500' },
              ].map((item) => (
                <div
                  key={item.label}
                  className="bg-[#0a0f1a] border border-[#1e3a5f]/30 rounded-lg p-6 text-center"
                >
                  <item.icon className="w-8 h-8 text-[#c9a227] mx-auto mb-3" />
                  <div className="text-2xl font-bold text-white mb-1">{item.value}</div>
                  <div className="text-xs text-[#6b7c95] uppercase tracking-wide">{item.label}</div>
                </div>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      {/* Missão, Visão, Valores */}
      <section className="py-20">
        <div className="max-w-6xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl font-playfair font-bold text-white mb-4">
              Nossos Pilares
            </h2>
            <p className="text-[#8ba3c7]">
              Os fundamentos que guiam cada decisão e entrega.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: Target,
                title: 'Missão',
                description: 'Desenvolver soluções de software de alto nível que transformem negócios e superem expectativas, contribuindo para a evolução tecnológica do Brasil.',
                color: 'from-blue-500/20',
              },
              {
                icon: Eye,
                title: 'Visão',
                description: 'Ser reconhecida como a principal referência em qualidade de software na América Latina, estabelecendo padrões que inspirem toda a indústria.',
                color: 'from-[#c9a227]/20',
              },
              {
                icon: Heart,
                title: 'Valores',
                description: 'Excelência inquestionável, integridade em cada ação, inovação contínua, compromisso com resultados e respeito às pessoas.',
                color: 'from-emerald-500/20',
              },
            ].map((item, index) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="relative bg-[#0d1424] border border-[#1e3a5f]/30 rounded-lg p-8 overflow-hidden"
              >
                <div className={`absolute top-0 right-0 w-32 h-32 bg-gradient-to-br ${item.color} to-transparent rounded-full blur-[60px]`} />
                <div className="relative">
                  <item.icon className="w-12 h-12 text-[#c9a227] mb-6" />
                  <h3 className="text-xl font-semibold text-white mb-4">{item.title}</h3>
                  <p className="text-[#8ba3c7] leading-relaxed">{item.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Diretoria */}
      <section className="py-20 bg-[#060a12]">
        <div className="max-w-6xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl font-playfair font-bold text-white mb-4">
              Diretoria Executiva
            </h2>
            <p className="text-[#8ba3c7]">
              Liderança comprometida com a excelência e inovação.
            </p>
          </motion.div>

          {/* CEO Card - Destaque Principal */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-4xl mx-auto"
          >
            <div className="bg-gradient-to-br from-[#0d1424] to-[#0a0f1a] border border-[#c9a227]/30 rounded-2xl overflow-hidden">
              <div className="grid md:grid-cols-2 gap-0">
                {/* Foto */}
                <div className="relative h-[400px] md:h-auto">
                  <Image
                    src="/bsdsan/ceo-bruno-clean.png"
                    alt="Bruno Sena - Fundador e CEO"
                    fill
                    className="object-cover object-top"
                    priority
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0a0f1a] via-transparent to-transparent md:bg-gradient-to-r" />
                </div>

                {/* Info */}
                <div className="p-8 md:p-12 flex flex-col justify-center">
                  <div className="inline-flex items-center gap-2 bg-[#c9a227]/10 border border-[#c9a227]/30 rounded-full px-3 py-1 w-fit mb-4">
                    <span className="text-xs text-[#c9a227] font-medium tracking-wider uppercase">Fundador & CEO</span>
                  </div>

                  <h3 className="text-3xl font-playfair font-bold text-white mb-2">
                    Bruno Sena
                  </h3>

                  <p className="text-[#c9a227] text-sm font-medium mb-6">
                    Diretor-Presidente
                  </p>

                  <blockquote className="text-[#8ba3c7] leading-relaxed italic border-l-2 border-[#c9a227]/50 pl-4 mb-6">
                    &quot;Nossa missão é clara: garantir que cada sistema digital desenvolvido
                    sob nossa certificação não apenas funcione, mas supere todas as
                    expectativas de qualidade e performance. Excelência não é um
                    objetivo — é nosso padrão mínimo.&quot;
                  </blockquote>

                  <div className="space-y-3 text-sm text-[#6b7c95] mb-8">
                    <div className="flex items-center gap-2">
                      <CheckCircle className="w-4 h-4 text-[#c9a227]" />
                      <span>+10 anos de experiência em desenvolvimento de software</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckCircle className="w-4 h-4 text-[#c9a227]" />
                      <span>Especialista em arquitetura de sistemas escaláveis</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckCircle className="w-4 h-4 text-[#c9a227]" />
                      <span>Mentor de mais de 50 desenvolvedores</span>
                    </div>
                  </div>

                  <div className="flex items-center gap-4">
                    <a
                      href="mailto:bruno@bsdeveloper.com.br"
                      className="flex items-center gap-2 text-[#8ba3c7] hover:text-[#c9a227] transition-colors"
                    >
                      <Mail className="w-5 h-5" />
                      <span className="text-sm">Contato</span>
                    </a>
                    <a
                      href="#"
                      className="flex items-center gap-2 text-[#8ba3c7] hover:text-[#c9a227] transition-colors"
                    >
                      <Linkedin className="w-5 h-5" />
                      <span className="text-sm">LinkedIn</span>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Parceiros/Clientes */}
      <section className="py-20">
        <div className="max-w-6xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-2xl font-playfair font-bold text-white mb-4">
              Empresas que Confiam na BSDSAN
            </h2>
            <p className="text-[#6b7c95] text-sm">
              Parcerias estratégicas com organizações líderes em seus segmentos.
            </p>
          </motion.div>

          <div className="grid grid-cols-2 md:grid-cols-5 gap-8 items-center opacity-50">
            {[1, 2, 3, 4, 5].map((i) => (
              <div
                key={i}
                className="h-12 bg-[#1e3a5f]/20 rounded flex items-center justify-center"
              >
                <span className="text-[#4a5568] text-xs font-medium">PARCEIRO {i}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-[#060a12]">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <Shield className="w-16 h-16 text-[#c9a227] mx-auto mb-6" />
            <h2 className="text-3xl font-playfair font-bold text-white mb-4">
              Faça Parte do Nosso Programa
            </h2>
            <p className="text-[#8ba3c7] mb-8 max-w-xl mx-auto">
              Analistas credenciados têm acesso exclusivo às nossas ferramentas
              e metodologias de certificação de qualidade.
            </p>
            <Link
              href="/bsdsan/acesso"
              className="inline-flex items-center justify-center gap-2 bg-gradient-to-r from-[#c9a227] to-[#a08520] text-[#0a0f1a] px-8 py-4 rounded font-semibold text-lg hover:from-[#d4af37] hover:to-[#b8960c] transition-all"
            >
              Acessar Área Restrita
            </Link>
          </motion.div>
        </div>
      </section>

      <BSDSANFooter />
    </main>
  );
}
