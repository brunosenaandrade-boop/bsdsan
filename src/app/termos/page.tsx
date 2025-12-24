import { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, FileText, Scale, AlertTriangle, CheckCircle, XCircle, Mail, Phone, MapPin } from "lucide-react";

export const metadata: Metadata = {
  title: "Termos de Uso | BS Developer",
  description: "Termos de Uso da BS Developer. Conheça as condições para utilização dos nossos serviços de desenvolvimento web e SaaS.",
};

const companyInfo = {
  razaoSocial: "Bruno Sena de Andrade",
  nomeFantasia: "BS Developer",
  cnpj: "26.630.862/0001-91",
  endereco: "Av. Marcolino Martins Cabral, 2040 - Vila Moema, Tubarão/SC - CEP: 88.705-001",
  email: "sac@bsdeveloper.com.br",
  telefone: "(79) 99883-8881",
  site: "https://www.bsdeveloper.com.br",
};

export default function TermosPage() {
  return (
    <main className="min-h-screen bg-black text-white">
      {/* Header */}
      <header className="border-b border-white/10">
        <div className="container mx-auto px-4 py-6">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-muted-foreground hover:text-white transition-colors"
          >
            <ArrowLeft className="h-4 w-4" />
            Voltar ao site
          </Link>
        </div>
      </header>

      {/* Content */}
      <div className="container mx-auto px-4 py-12 max-w-4xl">
        {/* Title */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-br from-primary-blue to-primary-teal mb-6">
            <FileText className="h-8 w-8 text-white" />
          </div>
          <h1 className="text-3xl md:text-4xl font-bold mb-4">Termos de Uso</h1>
          <p className="text-muted-foreground">
            Última atualização: {new Date().toLocaleDateString("pt-BR", { day: "2-digit", month: "long", year: "numeric" })}
          </p>
        </div>

        {/* Company Info Card */}
        <div className="bg-white/5 rounded-lg p-6 mb-12 border border-white/10">
          <h2 className="text-lg font-semibold mb-4">Identificação da Empresa</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-muted-foreground">
            <div>
              <p><span className="text-white/70">Razão Social:</span> {companyInfo.razaoSocial}</p>
              <p><span className="text-white/70">Nome Fantasia:</span> {companyInfo.nomeFantasia}</p>
              <p><span className="text-white/70">CNPJ:</span> {companyInfo.cnpj}</p>
            </div>
            <div>
              <p className="flex items-start gap-2">
                <MapPin className="h-4 w-4 mt-0.5 flex-shrink-0" />
                {companyInfo.endereco}
              </p>
              <p className="flex items-center gap-2">
                <Mail className="h-4 w-4" />
                {companyInfo.email}
              </p>
              <p className="flex items-center gap-2">
                <Phone className="h-4 w-4" />
                {companyInfo.telefone}
              </p>
            </div>
          </div>
        </div>

        {/* Sections */}
        <div className="space-y-10">
          {/* Section 1 */}
          <section>
            <div className="flex items-center gap-3 mb-4">
              <FileText className="h-5 w-5 text-primary-teal" />
              <h2 className="text-xl font-semibold">1. Aceitação dos Termos</h2>
            </div>
            <div className="text-muted-foreground space-y-4 pl-8">
              <p>
                Ao acessar e utilizar o site <strong className="text-white">{companyInfo.site}</strong> e os serviços oferecidos pela <strong className="text-white">{companyInfo.nomeFantasia}</strong>, você concorda integralmente com estes Termos de Uso.
              </p>
              <p>
                Se você não concordar com qualquer parte destes termos, solicitamos que não utilize nossos serviços. O uso continuado do site após alterações nos termos constitui aceitação das modificações.
              </p>
            </div>
          </section>

          {/* Section 2 */}
          <section>
            <div className="flex items-center gap-3 mb-4">
              <CheckCircle className="h-5 w-5 text-primary-teal" />
              <h2 className="text-xl font-semibold">2. Serviços Oferecidos</h2>
            </div>
            <div className="text-muted-foreground space-y-4 pl-8">
              <p>A {companyInfo.nomeFantasia} oferece os seguintes serviços:</p>
              <ul className="list-disc pl-6 space-y-2">
                <li><strong className="text-white/70">Desenvolvimento Web:</strong> criação de sites, landing pages, sistemas web e aplicações personalizadas.</li>
                <li><strong className="text-white/70">Desenvolvimento SaaS:</strong> plataformas de software como serviço sob demanda.</li>
                <li><strong className="text-white/70">Aplicativos Mobile:</strong> desenvolvimento de aplicativos para Android e iOS.</li>
                <li><strong className="text-white/70">Consultoria:</strong> assessoria técnica em projetos de tecnologia.</li>
                <li><strong className="text-white/70">Treinamento:</strong> capacitação em informática e tecnologias web.</li>
              </ul>
              <p>
                Os serviços específicos, prazos, valores e condições são definidos em propostas comerciais ou contratos individuais firmados com cada cliente.
              </p>
            </div>
          </section>

          {/* Section 3 */}
          <section>
            <div className="flex items-center gap-3 mb-4">
              <Scale className="h-5 w-5 text-primary-teal" />
              <h2 className="text-xl font-semibold">3. Obrigações do Usuário</h2>
            </div>
            <div className="text-muted-foreground space-y-4 pl-8">
              <p>Ao utilizar nossos serviços, você se compromete a:</p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Fornecer informações verdadeiras, precisas e atualizadas.</li>
                <li>Não utilizar o site para fins ilegais ou não autorizados.</li>
                <li>Não tentar acessar áreas restritas do sistema sem autorização.</li>
                <li>Não transmitir vírus, malware ou qualquer código malicioso.</li>
                <li>Respeitar os direitos de propriedade intelectual.</li>
                <li>Manter a confidencialidade de credenciais de acesso quando fornecidas.</li>
                <li>Cumprir todas as leis e regulamentos aplicáveis.</li>
              </ul>
            </div>
          </section>

          {/* Section 4 */}
          <section>
            <div className="flex items-center gap-3 mb-4">
              <FileText className="h-5 w-5 text-primary-teal" />
              <h2 className="text-xl font-semibold">4. Propriedade Intelectual</h2>
            </div>
            <div className="text-muted-foreground space-y-4 pl-8">
              <p>
                Todo o conteúdo do site, incluindo mas não se limitando a textos, imagens, logotipos, ícones, código-fonte e design, é de propriedade da {companyInfo.nomeFantasia} ou está licenciado para nosso uso.
              </p>
              <p>
                É proibido reproduzir, distribuir, modificar ou utilizar comercialmente qualquer conteúdo sem autorização prévia por escrito.
              </p>
              <p>
                <strong className="text-white">Projetos desenvolvidos para clientes:</strong> A propriedade intelectual dos projetos desenvolvidos sob contrato é transferida ao cliente após a conclusão e pagamento integral, conforme especificado em cada contrato.
              </p>
            </div>
          </section>

          {/* Section 5 */}
          <section>
            <div className="flex items-center gap-3 mb-4">
              <AlertTriangle className="h-5 w-5 text-primary-teal" />
              <h2 className="text-xl font-semibold">5. Limitação de Responsabilidade</h2>
            </div>
            <div className="text-muted-foreground space-y-4 pl-8">
              <p>A {companyInfo.nomeFantasia} não se responsabiliza por:</p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Danos indiretos, incidentais ou consequenciais decorrentes do uso do site.</li>
                <li>Interrupções temporárias no acesso ao site por manutenção ou problemas técnicos.</li>
                <li>Conteúdo de sites de terceiros acessados através de links em nosso site.</li>
                <li>Perdas decorrentes de uso indevido de credenciais pelo usuário.</li>
                <li>Decisões tomadas com base em informações disponibilizadas no site.</li>
              </ul>
              <p>
                Nossa responsabilidade total está limitada ao valor efetivamente pago pelo serviço contratado, quando aplicável.
              </p>
            </div>
          </section>

          {/* Section 6 */}
          <section>
            <div className="flex items-center gap-3 mb-4">
              <XCircle className="h-5 w-5 text-primary-teal" />
              <h2 className="text-xl font-semibold">6. Cancelamentos e Reembolsos</h2>
            </div>
            <div className="text-muted-foreground space-y-4 pl-8">
              <p>
                As políticas de cancelamento e reembolso são definidas individualmente em cada proposta comercial ou contrato de prestação de serviços.
              </p>
              <p>
                De forma geral:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Projetos podem ser cancelados antes do início da execução, com devolução integral de valores pagos.</li>
                <li>Após início da execução, o reembolso será proporcional ao trabalho não realizado.</li>
                <li>Trabalhos já entregues e aprovados não são passíveis de reembolso.</li>
              </ul>
              <p>
                Consulte seu contrato específico para condições detalhadas.
              </p>
            </div>
          </section>

          {/* Section 7 */}
          <section>
            <div className="flex items-center gap-3 mb-4">
              <FileText className="h-5 w-5 text-primary-teal" />
              <h2 className="text-xl font-semibold">7. Comunicações</h2>
            </div>
            <div className="text-muted-foreground space-y-4 pl-8">
              <p>
                Ao fornecer seus dados de contato, você concorda em receber comunicações relacionadas aos serviços contratados ou solicitados, incluindo:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Respostas a solicitações de orçamento.</li>
                <li>Atualizações sobre projetos em andamento.</li>
                <li>Informações importantes sobre nossos serviços.</li>
              </ul>
              <p>
                Comunicações de marketing serão enviadas apenas mediante consentimento prévio e você pode cancelar o recebimento a qualquer momento.
              </p>
            </div>
          </section>

          {/* Section 8 */}
          <section>
            <div className="flex items-center gap-3 mb-4">
              <Scale className="h-5 w-5 text-primary-teal" />
              <h2 className="text-xl font-semibold">8. Lei Aplicável e Foro</h2>
            </div>
            <div className="text-muted-foreground space-y-4 pl-8">
              <p>
                Estes Termos de Uso são regidos pelas leis da República Federativa do Brasil.
              </p>
              <p>
                Fica eleito o foro da Comarca de Tubarão, Estado de Santa Catarina, para dirimir quaisquer questões oriundas destes termos, com renúncia expressa a qualquer outro, por mais privilegiado que seja.
              </p>
            </div>
          </section>

          {/* Section 9 */}
          <section>
            <div className="flex items-center gap-3 mb-4">
              <FileText className="h-5 w-5 text-primary-teal" />
              <h2 className="text-xl font-semibold">9. Alterações nos Termos</h2>
            </div>
            <div className="text-muted-foreground space-y-4 pl-8">
              <p>
                A {companyInfo.nomeFantasia} reserva-se o direito de modificar estes Termos de Uso a qualquer momento. As alterações entram em vigor imediatamente após sua publicação no site.
              </p>
              <p>
                Recomendamos que você revise esta página periodicamente para estar ciente de quaisquer mudanças.
              </p>
            </div>
          </section>

          {/* Section 10 */}
          <section>
            <div className="flex items-center gap-3 mb-4">
              <Mail className="h-5 w-5 text-primary-teal" />
              <h2 className="text-xl font-semibold">10. Contato</h2>
            </div>
            <div className="text-muted-foreground space-y-4 pl-8">
              <p>
                Para dúvidas, sugestões ou esclarecimentos sobre estes Termos de Uso, entre em contato conosco:
              </p>
              <div className="bg-white/5 rounded-lg p-4 border border-white/10">
                <p className="font-semibold text-white mb-2">{companyInfo.nomeFantasia}</p>
                <p>E-mail: <a href={`mailto:${companyInfo.email}`} className="text-primary-teal hover:underline">{companyInfo.email}</a></p>
                <p>Telefone/WhatsApp: <a href={`tel:${companyInfo.telefone.replace(/\D/g, '')}`} className="text-primary-teal hover:underline">{companyInfo.telefone}</a></p>
                <p>Endereço: {companyInfo.endereco}</p>
              </div>
            </div>
          </section>
        </div>

        {/* Back to home */}
        <div className="mt-16 pt-8 border-t border-white/10 text-center">
          <Link
            href="/"
            className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-primary-blue to-primary-teal rounded-lg text-white font-medium hover:opacity-90 transition-opacity"
          >
            <ArrowLeft className="h-4 w-4" />
            Voltar ao site
          </Link>
        </div>
      </div>
    </main>
  );
}
