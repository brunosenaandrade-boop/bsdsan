import { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, Shield, Lock, Eye, Database, UserCheck, Mail, Phone, MapPin } from "lucide-react";

export const metadata: Metadata = {
  title: "Política de Privacidade | BS Developer",
  description: "Política de Privacidade da BS Developer. Saiba como coletamos, usamos e protegemos seus dados pessoais em conformidade com a LGPD.",
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

export default function PrivacidadePage() {
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
            <Shield className="h-8 w-8 text-white" />
          </div>
          <h1 className="text-3xl md:text-4xl font-bold mb-4">Política de Privacidade</h1>
          <p className="text-muted-foreground">
            Última atualização: {new Date().toLocaleDateString("pt-BR", { day: "2-digit", month: "long", year: "numeric" })}
          </p>
        </div>

        {/* Company Info Card */}
        <div className="bg-white/5 rounded-lg p-6 mb-12 border border-white/10">
          <h2 className="text-lg font-semibold mb-4">Identificação do Controlador</h2>
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
              <Eye className="h-5 w-5 text-primary-teal" />
              <h2 className="text-xl font-semibold">1. Introdução</h2>
            </div>
            <div className="text-muted-foreground space-y-4 pl-8">
              <p>
                A <strong className="text-white">{companyInfo.nomeFantasia}</strong> está comprometida em proteger a privacidade e os dados pessoais de seus usuários, clientes e visitantes. Esta Política de Privacidade descreve como coletamos, usamos, armazenamos e protegemos suas informações pessoais em conformidade com a Lei Geral de Proteção de Dados (LGPD - Lei nº 13.709/2018).
              </p>
              <p>
                Ao utilizar nossos serviços, acessar nosso site ou interagir conosco por qualquer meio, você concorda com as práticas descritas nesta política.
              </p>
            </div>
          </section>

          {/* Section 2 */}
          <section>
            <div className="flex items-center gap-3 mb-4">
              <Database className="h-5 w-5 text-primary-teal" />
              <h2 className="text-xl font-semibold">2. Dados que Coletamos</h2>
            </div>
            <div className="text-muted-foreground space-y-4 pl-8">
              <p>Podemos coletar os seguintes tipos de dados:</p>
              <ul className="list-disc pl-6 space-y-2">
                <li><strong className="text-white/70">Dados de identificação:</strong> nome, e-mail, telefone, CPF/CNPJ quando necessário para prestação de serviços.</li>
                <li><strong className="text-white/70">Dados de contato:</strong> informações fornecidas através de formulários, WhatsApp, chat ou e-mail.</li>
                <li><strong className="text-white/70">Dados de navegação:</strong> endereço IP, tipo de navegador, páginas visitadas, tempo de permanência e dados de cookies.</li>
                <li><strong className="text-white/70">Dados profissionais:</strong> informações sobre sua empresa ou projeto quando solicita orçamento.</li>
                <li><strong className="text-white/70">Dados de comunicação:</strong> histórico de conversas com nosso chatbot e equipe de atendimento.</li>
              </ul>
            </div>
          </section>

          {/* Section 3 */}
          <section>
            <div className="flex items-center gap-3 mb-4">
              <UserCheck className="h-5 w-5 text-primary-teal" />
              <h2 className="text-xl font-semibold">3. Como Utilizamos seus Dados</h2>
            </div>
            <div className="text-muted-foreground space-y-4 pl-8">
              <p>Utilizamos seus dados pessoais para:</p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Prestar os serviços de desenvolvimento web, SaaS e consultoria contratados.</li>
                <li>Responder a solicitações de orçamento e dúvidas.</li>
                <li>Entrar em contato sobre projetos e serviços.</li>
                <li>Enviar comunicações relevantes sobre nossos serviços (mediante consentimento).</li>
                <li>Melhorar a experiência de navegação em nosso site.</li>
                <li>Cumprir obrigações legais e regulatórias.</li>
                <li>Proteger nossos direitos e prevenir fraudes.</li>
              </ul>
            </div>
          </section>

          {/* Section 4 */}
          <section>
            <div className="flex items-center gap-3 mb-4">
              <Lock className="h-5 w-5 text-primary-teal" />
              <h2 className="text-xl font-semibold">4. Compartilhamento de Dados</h2>
            </div>
            <div className="text-muted-foreground space-y-4 pl-8">
              <p>
                Não vendemos, alugamos ou compartilhamos seus dados pessoais com terceiros para fins de marketing. Podemos compartilhar seus dados apenas nas seguintes situações:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li><strong className="text-white/70">Prestadores de serviço:</strong> empresas que nos auxiliam na operação (hospedagem, e-mail, pagamentos), sempre sob contratos de confidencialidade.</li>
                <li><strong className="text-white/70">Obrigações legais:</strong> quando exigido por lei, ordem judicial ou autoridade competente.</li>
                <li><strong className="text-white/70">Proteção de direitos:</strong> para proteger nossos direitos, propriedade ou segurança.</li>
              </ul>
            </div>
          </section>

          {/* Section 5 */}
          <section>
            <div className="flex items-center gap-3 mb-4">
              <Shield className="h-5 w-5 text-primary-teal" />
              <h2 className="text-xl font-semibold">5. Segurança dos Dados</h2>
            </div>
            <div className="text-muted-foreground space-y-4 pl-8">
              <p>
                Implementamos medidas técnicas e organizacionais para proteger seus dados pessoais contra acesso não autorizado, alteração, divulgação ou destruição. Isso inclui:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Criptografia SSL/TLS em todas as comunicações.</li>
                <li>Acesso restrito aos dados apenas a colaboradores autorizados.</li>
                <li>Monitoramento contínuo de segurança.</li>
                <li>Backups regulares e seguros.</li>
              </ul>
            </div>
          </section>

          {/* Section 6 */}
          <section>
            <div className="flex items-center gap-3 mb-4">
              <UserCheck className="h-5 w-5 text-primary-teal" />
              <h2 className="text-xl font-semibold">6. Seus Direitos (LGPD)</h2>
            </div>
            <div className="text-muted-foreground space-y-4 pl-8">
              <p>
                De acordo com a LGPD, você tem os seguintes direitos sobre seus dados pessoais:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li><strong className="text-white/70">Confirmação e acesso:</strong> saber se tratamos seus dados e obter cópia deles.</li>
                <li><strong className="text-white/70">Correção:</strong> solicitar a correção de dados incompletos ou desatualizados.</li>
                <li><strong className="text-white/70">Anonimização ou exclusão:</strong> solicitar a anonimização ou exclusão de dados desnecessários.</li>
                <li><strong className="text-white/70">Portabilidade:</strong> solicitar a transferência de seus dados para outro fornecedor.</li>
                <li><strong className="text-white/70">Revogação do consentimento:</strong> retirar seu consentimento a qualquer momento.</li>
                <li><strong className="text-white/70">Oposição:</strong> se opor ao tratamento de dados em determinadas situações.</li>
              </ul>
              <p>
                Para exercer qualquer um desses direitos, entre em contato conosco através do e-mail: <a href={`mailto:${companyInfo.email}`} className="text-primary-teal hover:underline">{companyInfo.email}</a>
              </p>
            </div>
          </section>

          {/* Section 7 */}
          <section>
            <div className="flex items-center gap-3 mb-4">
              <Database className="h-5 w-5 text-primary-teal" />
              <h2 className="text-xl font-semibold">7. Cookies</h2>
            </div>
            <div className="text-muted-foreground space-y-4 pl-8">
              <p>
                Nosso site utiliza cookies para melhorar sua experiência de navegação. Cookies são pequenos arquivos armazenados em seu dispositivo que nos ajudam a:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Lembrar suas preferências.</li>
                <li>Entender como você utiliza nosso site.</li>
                <li>Melhorar nossos serviços.</li>
              </ul>
              <p>
                Você pode configurar seu navegador para recusar cookies, mas isso pode afetar algumas funcionalidades do site.
              </p>
            </div>
          </section>

          {/* Section 8 */}
          <section>
            <div className="flex items-center gap-3 mb-4">
              <Eye className="h-5 w-5 text-primary-teal" />
              <h2 className="text-xl font-semibold">8. Retenção de Dados</h2>
            </div>
            <div className="text-muted-foreground space-y-4 pl-8">
              <p>
                Mantemos seus dados pessoais pelo tempo necessário para cumprir as finalidades descritas nesta política, ou conforme exigido por lei. Após esse período, os dados serão excluídos ou anonimizados de forma segura.
              </p>
            </div>
          </section>

          {/* Section 9 */}
          <section>
            <div className="flex items-center gap-3 mb-4">
              <Shield className="h-5 w-5 text-primary-teal" />
              <h2 className="text-xl font-semibold">9. Alterações nesta Política</h2>
            </div>
            <div className="text-muted-foreground space-y-4 pl-8">
              <p>
                Podemos atualizar esta Política de Privacidade periodicamente. Quaisquer alterações serão publicadas nesta página com a data de atualização. Recomendamos que você revise esta política regularmente.
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
                Se você tiver dúvidas sobre esta Política de Privacidade ou sobre o tratamento de seus dados pessoais, entre em contato conosco:
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
