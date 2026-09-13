import React, { useState } from 'react';
import { PageRoute } from '../../types';
import { saveContactLead, recordInteractionEvent } from '../../lib/databaseService';

interface ContatoViewProps {
  onNavigate: (page: PageRoute) => void;
  onOpenAnalysisModal: () => void;
}

export const ContatoView: React.FC<ContatoViewProps> = ({
  onNavigate,
  onOpenAnalysisModal,
}) => {
  const [formData, setFormData] = useState({
    nome: '',
    email: '',
    telefone: '',
    assunto: 'triagem',
    mensagem: '',
  });
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setErrorMessage(null);

    try {
      // Salvar diretamente no Firebase Firestore
      await saveContactLead({
        nome: formData.nome,
        email: formData.email,
        telefone: formData.telefone,
        assunto: formData.assunto,
        mensagem: formData.mensagem,
        origem: 'formulario_contato',
      });

      // Registrar evento de conversão
      recordInteractionEvent({
        tipo: 'button_cta',
        detalhe: `Mensagem enviada por ${formData.nome} (${formData.assunto})`,
        pagina: 'contato',
        data: new Date().toISOString()
      });

      setSubmitted(true);
    } catch (error) {
      console.error('Erro ao enviar contato para o Firebase:', error);
      setErrorMessage('Ocorreu um erro ao salvar sua mensagem. Por favor, tente novamente.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const trackWhatsAppClick = () => {
    recordInteractionEvent({
      tipo: 'whatsapp_click',
      detalhe: 'Clique no botão WhatsApp (Página Contato)',
      pagina: 'contato',
      data: new Date().toISOString()
    });
  };

  const trackEmailClick = () => {
    recordInteractionEvent({
      tipo: 'email_click',
      detalhe: 'Clique no link de e-mail (lexdocss@gmail.com)',
      pagina: 'contato',
      data: new Date().toISOString()
    });
  };

  return (
    <div className="w-full flex flex-col gap-12 sm:gap-16 pb-12">
      {/* 1. Header */}
      <section className="w-full pt-8 sm:pt-12">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col gap-3 max-w-3xl">
            <div className="inline-flex items-center gap-2 text-[12px] font-mono text-[#264191] font-semibold">
              <span>CANAIS DE ATENDIMENTO</span>
              <span className="text-[#c5c6cd]">/</span>
              <span>ATENDIMENTO NACIONAL ONLINE</span>
            </div>
            <h1 className="font-['Plus_Jakarta_Sans'] font-bold text-[32px] sm:text-[44px] text-[#191c1e] tracking-tight leading-tight">
              Fale com um analista documental especializado
            </h1>
            <p className="font-['Inter'] text-[15.5px] text-[#44474d] leading-relaxed">
              Estamos prontos para atender você, esclarecer dúvidas sobre seus registros e orientar o melhor caminho para retificação ou saneamento de certidões.
            </p>
          </div>
        </div>
      </section>

      {/* 2. Contact Grid */}
      <section className="w-full">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Form (7 cols) */}
            <div className="lg:col-span-7 bg-white rounded-2xl p-6 sm:p-8 border border-[#e0e3e5] shadow-xs">
              {submitted ? (
                <div className="p-8 text-center flex flex-col items-center gap-3">
                  <div className="w-12 h-12 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center">
                    <span className="material-symbols-outlined text-2xl">check</span>
                  </div>
                  <h3 className="font-['Plus_Jakarta_Sans'] font-bold text-[20px] text-[#191c1e]">
                    Mensagem Salva com Sucesso!
                  </h3>
                  <p className="font-['Inter'] text-[14px] text-[#44474d] max-w-md">
                    Obrigado pelo contato, <strong>{formData.nome}</strong>. Seus dados já foram registrados em nosso banco de dados. Nosso analista retornará por WhatsApp ou e-mail em até 24 horas úteis.
                  </p>
                  <button
                    type="button"
                    onClick={() => {
                      setSubmitted(false);
                      setFormData({ nome: '', email: '', telefone: '', assunto: 'triagem', mensagem: '' });
                    }}
                    className="mt-4 px-5 py-2 rounded-lg bg-[#0d1c32] text-white font-['Inter'] text-[13px] font-semibold hover:bg-[#264191]"
                  >
                    Enviar Nova Mensagem
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                  <div className="flex items-center justify-between">
                    <h2 className="font-['Plus_Jakarta_Sans'] font-bold text-[18px] text-[#191c1e]">
                      Envie sua Solicitação ou Dúvida
                    </h2>
                    <span className="text-[11px] font-mono text-emerald-700 font-semibold flex items-center gap-1">
                      <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
                      Banco de Dados Ativo
                    </span>
                  </div>

                  {errorMessage && (
                    <div className="p-3 bg-rose-50 text-rose-800 rounded-lg text-[13px] border border-rose-200">
                      {errorMessage}
                    </div>
                  )}

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="flex flex-col gap-1.5">
                      <label className="font-['Inter'] text-[13px] font-medium text-[#191c1e]">
                        Nome Completo *
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.nome}
                        onChange={(e) => setFormData({ ...formData, nome: e.target.value })}
                        placeholder="Seu nome"
                        className="h-10 px-3 rounded-lg border border-[#e0e3e5] font-['Inter'] text-[14px] focus:outline-none focus:ring-2 focus:ring-[#264191]"
                      />
                    </div>

                    <div className="flex flex-col gap-1.5">
                      <label className="font-['Inter'] text-[13px] font-medium text-[#191c1e]">
                        Telefone / WhatsApp *
                      </label>
                      <input
                        type="tel"
                        required
                        value={formData.telefone}
                        onChange={(e) => setFormData({ ...formData, telefone: e.target.value })}
                        placeholder=""
                        autoComplete="off"
                        className="h-10 px-3 rounded-lg border border-[#e0e3e5] font-['Inter'] text-[14px] focus:outline-none focus:ring-2 focus:ring-[#264191]"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="flex flex-col gap-1.5">
                      <label className="font-['Inter'] text-[13px] font-medium text-[#191c1e]">
                        E-mail *
                      </label>
                      <input
                        type="email"
                        required
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        placeholder="seu@email.com"
                        className="h-10 px-3 rounded-lg border border-[#e0e3e5] font-['Inter'] text-[14px] focus:outline-none focus:ring-2 focus:ring-[#264191]"
                      />
                    </div>

                    <div className="flex flex-col gap-1.5">
                      <label className="font-['Inter'] text-[13px] font-medium text-[#191c1e]">
                        Tipo de Assunto
                      </label>
                      <select
                        value={formData.assunto}
                        onChange={(e) => setFormData({ ...formData, assunto: e.target.value })}
                        className="h-10 px-3 rounded-lg border border-[#e0e3e5] font-['Inter'] text-[14px] focus:outline-none focus:ring-2 focus:ring-[#264191] bg-white"
                      >
                        <option value="triagem">Triagem de Certidões</option>
                        <option value="retificacao">Retificação Administrativa (Art. 110)</option>
                        <option value="cidadania">Cidadania Estrangeira</option>
                        <option value="inventario">Inventário / Imóveis</option>
                        <option value="duvidas">Dúvidas Gerais</option>
                      </select>
                    </div>
                  </div>

                  <div className="flex flex-col gap-1.5">
                    <label className="font-['Inter'] text-[13px] font-medium text-[#191c1e]">
                      Detalhes da sua situação ou dúvida *
                    </label>
                    <textarea
                      required
                      rows={4}
                      value={formData.mensagem}
                      onChange={(e) => setFormData({ ...formData, mensagem: e.target.value })}
                      placeholder="Descreva brevemente os nomes divergentes, certidões envolvidas ou o cartório de registro..."
                      className="p-3 rounded-lg border border-[#e0e3e5] font-['Inter'] text-[14px] focus:outline-none focus:ring-2 focus:ring-[#264191]"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="h-11 rounded-lg bg-[#0d1c32] text-white font-['Inter'] text-[14px] font-semibold hover:bg-[#264191] transition-all mt-2 shadow-xs flex items-center justify-center gap-2 disabled:opacity-50"
                  >
                    {isSubmitting ? (
                      <>
                        <span className="material-symbols-outlined text-[18px] animate-spin">
                          progress_activity
                        </span>
                        <span>Salvando no Banco de Dados...</span>
                      </>
                    ) : (
                      <>
                        <span className="material-symbols-outlined text-[18px]">send</span>
                        <span>Enviar Mensagem para Análise</span>
                      </>
                    )}
                  </button>
                </form>
              )}
            </div>

            {/* Direct Cards (5 cols) */}
            <div className="lg:col-span-5 flex flex-col gap-5">
              {/* WhatsApp direct card */}
              <div className="bg-[#0d1c32] text-white rounded-2xl p-6 shadow-md flex flex-col gap-3">
                <div className="flex items-center gap-2 text-[#eec14b]">
                  <span className="material-symbols-outlined text-[20px]">chat</span>
                  <span className="font-mono text-[11px] uppercase tracking-wider font-semibold">
                    Canal Prioritário
                  </span>
                </div>
                <h3 className="font-['Plus_Jakarta_Sans'] font-bold text-[18px] text-white">
                  Atendimento Instantâneo via WhatsApp
                </h3>
                <p className="font-['Inter'] text-[13px] text-white/80 leading-relaxed">
                  Envie fotos e digitalizações dos seus documentos diretamente pelo chat para retorno rápido.
                </p>
                <a
                  href="https://w.app/jeuz4i"
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={trackWhatsAppClick}
                  className="mt-2 h-10 rounded-lg bg-[#264191] hover:bg-[#1d3989] text-white font-['Inter'] text-[13px] font-semibold flex items-center justify-center gap-2 transition-colors"
                >
                  <span className="material-symbols-outlined text-[18px]">chat</span>
                  <span>Conversar Agora no WhatsApp</span>
                </a>
              </div>

              {/* Info Details */}
              <div className="bg-white rounded-2xl p-6 border border-[#e0e3e5] shadow-xs flex flex-col gap-4 text-[13px] text-[#44474d]">
                <div className="flex items-start gap-3">
                  <span className="material-symbols-outlined text-[#264191] text-[20px] mt-0.5">
                    schedule
                  </span>
                  <div>
                    <strong className="text-[#191c1e] block">Horário de Atendimento Técnico</strong>
                    <span>Segunda a Sexta-feira, das 09h às 18h (Horário de Brasília)</span>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <span className="material-symbols-outlined text-[#264191] text-[20px] mt-0.5">
                    phone_iphone
                  </span>
                  <div>
                    <strong className="text-[#191c1e] block">Telefone / WhatsApp</strong>
                    <a 
                      href="https://w.app/jeuz4i" 
                      target="_blank" 
                      rel="noopener noreferrer" 
                      onClick={trackWhatsAppClick}
                      className="text-[#264191] hover:underline font-medium"
                    >
                      (11) 95687-0620
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <span className="material-symbols-outlined text-[#264191] text-[20px] mt-0.5">
                    mail
                  </span>
                  <div>
                    <strong className="text-[#191c1e] block">E-mail de Atendimento</strong>
                    <a 
                      href="mailto:lexdocss@gmail.com" 
                      onClick={trackEmailClick}
                      className="text-[#264191] hover:underline font-medium"
                    >
                      lexdocss@gmail.com
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <span className="material-symbols-outlined text-[#264191] text-[20px] mt-0.5">
                    public
                  </span>
                  <div>
                    <strong className="text-[#191c1e] block">Abrangência</strong>
                    <span>Atendimento 100% digital em todo o território nacional e consulados no exterior.</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
