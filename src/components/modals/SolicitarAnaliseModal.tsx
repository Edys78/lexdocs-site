import React, { useState } from 'react';
import { AnalysisRequest } from '../../types';
import { saveAnalysisRequest, recordInteractionEvent } from '../../lib/databaseService';
import { LexDocsLogo } from '../common/LexDocsLogo';

interface SolicitarAnaliseModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const SolicitarAnaliseModal: React.FC<SolicitarAnaliseModalProps> = ({
  isOpen,
  onClose,
}) => {
  const [formData, setFormData] = useState<AnalysisRequest>({
    fullName: '',
    email: '',
    phone: '',
    certType: 'nascimento',
    objective: 'retificacao_erro',
    originRegistry: '',
    details: '',
    urgency: 'padrao',
    filesCount: 0,
  });

  const [protocolCode, setProtocolCode] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setErrorMessage(null);

    const generatedProtocol = `LXP-${new Date().getFullYear()}-${Math.floor(1000 + Math.random() * 9000)}`;

    try {
      // Salvar apenas os dados de texto estruturados na coleção do Firestore
      await saveAnalysisRequest({
        fullName: formData.fullName,
        email: formData.email,
        phone: formData.phone,
        certType: formData.certType,
        objective: formData.objective,
        originRegistry: formData.originRegistry,
        details: `${formData.details} [Protocolo: ${generatedProtocol}]`,
        urgency: formData.urgency === 'prioritario' ? 'prioritaria' : 'padrao',
      });

      // Registrar evento de conversão no Firebase
      recordInteractionEvent({
        tipo: 'button_cta',
        detalhe: `Solicitação de Análise enviada: ${formData.fullName}`,
        pagina: 'modal_triagem',
        data: new Date().toISOString()
      });

      setProtocolCode(generatedProtocol);
    } catch (error) {
      console.error('Erro ao enviar solicitação para o Firebase:', error);
      setErrorMessage('Ocorreu um erro ao salvar no banco de dados. Por favor, tente novamente.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleReset = () => {
    setProtocolCode(null);
    setErrorMessage(null);
    setFormData({
      fullName: '',
      email: '',
      phone: '',
      certType: 'nascimento',
      objective: 'retificacao_erro',
      originRegistry: '',
      details: '',
      urgency: 'padrao',
      filesCount: 0,
    });
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#0d1c32]/60 backdrop-blur-sm animate-in fade-in duration-200 overflow-y-auto">
      <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[92vh] flex flex-col shadow-2xl border border-[#e0e3e5] overflow-hidden my-auto">
        {/* Modal Header */}
        <div className="p-5 sm:p-6 bg-[#f7f9fb] border-b border-[#e0e3e5] flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-[#0d1c32] flex items-center justify-center p-1 shadow-xs">
              <LexDocsLogo variant="icon" size="sm" dark={true} />
            </div>
            <div>
              <span className="font-mono text-[11px] font-bold text-[#264191] uppercase tracking-wider block">
                PROTOCOLO DE TRIAGEM PRELIMINAR
              </span>
              <h2 className="font-['Plus_Jakarta_Sans'] font-bold text-[18px] sm:text-[20px] text-[#191c1e]">
                Solicitar Análise Documental
              </h2>
            </div>
          </div>

          <button
            type="button"
            onClick={handleReset}
            className="p-2 rounded-lg text-[#75777e] hover:text-[#191c1e] hover:bg-[#eceef0] transition-colors"
            title="Fechar"
          >
            <span className="material-symbols-outlined text-2xl">close</span>
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-5 sm:p-6 overflow-y-auto flex-1">
          {protocolCode ? (
            /* Success confirmation screen */
            <div className="py-6 flex flex-col items-center text-center gap-4">
              <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center">
                <span className="material-symbols-outlined text-[32px]">
                  verified
                </span>
              </div>

              <div>
                <span className="font-mono text-[12px] font-bold text-[#264191] uppercase tracking-wider">
                  SALVO NO BANCO DE DADOS & PROTOCOLADO
                </span>
                <h3 className="font-['Plus_Jakarta_Sans'] font-bold text-[24px] text-[#191c1e] mt-1">
                  {protocolCode}
                </h3>
                <p className="font-['Inter'] text-[14px] text-[#44474d] max-w-md mt-2 leading-relaxed">
                  Recebemos seus dados com sucesso, <strong>{formData.fullName}</strong>. Sua solicitação foi salva no banco de dados Firestore para triagem inicial.
                </p>
              </div>

              <div className="w-full bg-[#f2f4f6] rounded-xl p-4 text-left font-['Inter'] text-[13px] flex flex-col gap-2 border border-[#e0e3e5]">
                <div className="flex justify-between">
                  <span className="text-[#44474d]">SLA Previsto:</span>
                  <span className="font-semibold text-[#191c1e]">
                    {formData.urgency === 'prioritario' ? 'Até 24h úteis' : 'Até 48h úteis'}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#44474d]">Tipo de Certidão:</span>
                  <span className="font-semibold text-[#191c1e] capitalize">{formData.certType.replace('_', ' ')}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#44474d]">Canal de Retorno:</span>
                  <span className="font-semibold text-[#191c1e]">{formData.phone} / {formData.email}</span>
                </div>
              </div>

              {/* Informative alert for direct document sharing via WhatsApp */}
              <div className="w-full p-3.5 bg-emerald-50 rounded-xl border border-emerald-200 text-left font-['Inter'] text-[12.5px] text-emerald-900 flex items-start gap-2.5">
                <span className="material-symbols-outlined text-emerald-700 text-[20px] flex-shrink-0 mt-0.5">
                  chat
                </span>
                <div>
                  <strong>Envio dos Documentos (PDF / Fotos):</strong>
                  <p className="text-emerald-800 text-[12px] mt-0.5 leading-relaxed">
                    Você pode enviar as fotos ou arquivos em PDF das certidões diretamente pelo WhatsApp oficial, informando o seu protocolo acima.
                  </p>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-3 w-full mt-2">
                <a
                  href={`https://wa.me/5511956870620?text=Ol%C3%A1%2C%20acabei%20de%20enviar%20uma%20solicita%C3%A7%C3%A3o%20de%20an%C3%A1lise%20pelo%20site%20(Protocolo%20${protocolCode})`}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => {
                    recordInteractionEvent({
                      tipo: 'whatsapp_click',
                      detalhe: `WhatsApp via Protocolo ${protocolCode}`,
                      pagina: 'modal_sucesso',
                      data: new Date().toISOString()
                    });
                  }}
                  className="flex-1 h-11 rounded-lg bg-[#264191] text-white font-['Inter'] text-[13.5px] font-semibold flex items-center justify-center gap-2 hover:bg-[#1d3989]"
                >
                  <span className="material-symbols-outlined text-[18px]">chat</span>
                  <span>Enviar Documentos no WhatsApp</span>
                </a>
                <button
                  type="button"
                  onClick={handleReset}
                  className="h-11 px-6 rounded-lg bg-[#0d1c32] text-white font-['Inter'] text-[13.5px] font-semibold hover:bg-[#191c1e]"
                >
                  Concluir
                </button>
              </div>
            </div>
          ) : (
            /* Analysis Request Form (Pure text data to Firestore) */
            <form onSubmit={handleSubmit} className="flex flex-col gap-5">
              {errorMessage && (
                <div className="p-3 bg-rose-50 text-rose-800 rounded-lg text-[13px] border border-rose-200">
                  {errorMessage}
                </div>
              )}

              <div className="p-3 bg-[#dce1ff]/40 rounded-lg border border-[#264191]/20 flex items-start gap-2.5 text-[12.5px] text-[#00164e]">
                <span className="material-symbols-outlined text-[18px] text-[#264191] flex-shrink-0 mt-0.5">
                  info
                </span>
                <span>
                  A triagem preliminar de viabilidade e escopo documental é <strong>sem custos</strong>. Preencha os campos com os dados do registro a ser examinado.
                </span>
              </div>

              {/* Personal Details */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div className="flex flex-col gap-1 sm:col-span-1">
                  <label className="font-['Inter'] text-[12.5px] font-medium text-[#191c1e]">
                    Nome Completo *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.fullName}
                    onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                    placeholder="Seu nome"
                    className="h-9 px-3 rounded-lg border border-[#e0e3e5] text-[13px] font-['Inter'] focus:outline-none focus:ring-2 focus:ring-[#264191]"
                  />
                </div>

                <div className="flex flex-col gap-1 sm:col-span-1">
                  <label className="font-['Inter'] text-[12.5px] font-medium text-[#191c1e]">
                    WhatsApp / Telefone *
                  </label>
                  <input
                    type="tel"
                    required
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    placeholder=""
                    autoComplete="off"
                    className="h-9 px-3 rounded-lg border border-[#e0e3e5] text-[13px] font-['Inter'] focus:outline-none focus:ring-2 focus:ring-[#264191]"
                  />
                </div>

                <div className="flex flex-col gap-1 sm:col-span-1">
                  <label className="font-['Inter'] text-[12.5px] font-medium text-[#191c1e]">
                    E-mail *
                  </label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="seu@email.com"
                    className="h-9 px-3 rounded-lg border border-[#e0e3e5] text-[13px] font-['Inter'] focus:outline-none focus:ring-2 focus:ring-[#264191]"
                  />
                </div>
              </div>

              {/* Document specifics */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="flex flex-col gap-1">
                  <label className="font-['Inter'] text-[12.5px] font-medium text-[#191c1e]">
                    Tipo de Certidão Principal *
                  </label>
                  <select
                    value={formData.certType}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        certType: e.target.value as AnalysisRequest['certType'],
                      })
                    }
                    className="h-9 px-2.5 rounded-lg border border-[#e0e3e5] text-[13px] font-['Inter'] bg-white focus:outline-none focus:ring-2 focus:ring-[#264191]"
                  >
                    <option value="nascimento">Certidão de Nascimento</option>
                    <option value="casamento">Certidão de Casamento</option>
                    <option value="obito">Certidão de Óbito</option>
                    <option value="pasta_completa">Pasta Completa (Cadeia Genealógica)</option>
                    <option value="outro">Outro Documento / Matrícula</option>
                  </select>
                </div>

                <div className="flex flex-col gap-1">
                  <label className="font-['Inter'] text-[12.5px] font-medium text-[#191c1e]">
                    Objetivo Principal *
                  </label>
                  <select
                    value={formData.objective}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        objective: e.target.value as AnalysisRequest['objective'],
                      })
                    }
                    className="h-9 px-2.5 rounded-lg border border-[#e0e3e5] text-[13px] font-['Inter'] bg-white focus:outline-none focus:ring-2 focus:ring-[#264191]"
                  >
                    <option value="retificacao_erro">Retificação de Erro de Grafia / Data</option>
                    <option value="cidadania_italiana">Cidadania Italiana</option>
                    <option value="cidadania_portuguesa">Cidadania Portuguesa / Espanhola</option>
                    <option value="inventario">Inventário ou Escritura Imobiliária</option>
                    <option value="casamento">Habilitação de Casamento</option>
                    <option value="outros">Auditoria Geral Preventiva</option>
                  </select>
                </div>
              </div>

              {/* Cartório de Origem */}
              <div className="flex flex-col gap-1">
                <label className="font-['Inter'] text-[12.5px] font-medium text-[#191c1e]">
                  Cartório / Comarca / Cidade de Registro (se souber)
                </label>
                <input
                  type="text"
                  value={formData.originRegistry}
                  onChange={(e) => setFormData({ ...formData, originRegistry: e.target.value })}
                  placeholder="Ex: 1º Registro Civil das Pessoas Naturais de Campinas/SP"
                  className="h-9 px-3 rounded-lg border border-[#e0e3e5] text-[13px] font-['Inter'] focus:outline-none focus:ring-2 focus:ring-[#264191]"
                />
              </div>

              {/* Details & Discrepancies */}
              <div className="flex flex-col gap-1">
                <label className="font-['Inter'] text-[12.5px] font-medium text-[#191c1e]">
                  Descrição dos dados divergentes ou detalhes da certidão *
                </label>
                <textarea
                  required
                  rows={3}
                  value={formData.details}
                  onChange={(e) => setFormData({ ...formData, details: e.target.value })}
                  placeholder="Ex: Nomes incorretos, datas divergentes, nomes dos pais ou bisavós grafados com erro entre certidões..."
                  className="p-2.5 rounded-lg border border-[#e0e3e5] text-[13px] font-['Inter'] focus:outline-none focus:ring-2 focus:ring-[#264191]"
                />
              </div>

              {/* Delivery notice */}
              <div className="p-3 bg-[#f2f4f6] rounded-xl border border-[#e0e3e5] flex items-center gap-3 text-[12.5px] text-[#44474d]">
                <span className="material-symbols-outlined text-[20px] text-[#264191] flex-shrink-0">
                  cloud_done
                </span>
                <span>
                  Os dados do seu registro são salvos instantaneamente no <strong>Firestore</strong>. As cópias ou fotos das certidões podem ser enviadas via WhatsApp após a abertura do chamado.
                </span>
              </div>

              {/* Priority option */}
              <div className="p-3 bg-[#f2f4f6] rounded-xl border border-[#e0e3e5] flex items-center justify-between gap-3">
                <div className="flex items-center gap-2.5">
                  <span className="material-symbols-outlined text-[20px] text-[#264191]">
                    speed
                  </span>
                  <div>
                    <span className="font-['Plus_Jakarta_Sans'] font-bold text-[13px] text-[#191c1e] block">
                      Prioridade de Atendimento
                    </span>
                    <span className="font-['Inter'] text-[11.5px] text-[#44474d]">
                      {formData.urgency === 'prioritario'
                        ? 'Prioridade Alta: Retorno em até 24h úteis'
                        : 'Padrão: Retorno em até 48h úteis'}
                    </span>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() =>
                    setFormData({
                      ...formData,
                      urgency: formData.urgency === 'padrao' ? 'prioritario' : 'padrao',
                    })
                  }
                  className={`px-3 py-1 rounded-md text-[12px] font-mono font-semibold transition-all ${
                    formData.urgency === 'prioritario'
                      ? 'bg-[#0d1c32] text-[#eec14b]'
                      : 'bg-white text-[#44474d] border border-[#e0e3e5]'
                  }`}
                >
                  {formData.urgency === 'prioritario' ? '⚡ 24H PRIORITÁRIO' : 'PADRÃO 48H'}
                </button>
              </div>

              {/* Action Buttons */}
              <div className="pt-3 border-t border-[#eceef0] flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={handleReset}
                  className="px-4 py-2 rounded-lg text-[#44474d] hover:bg-[#f2f4f6] text-[13px] font-medium transition-colors"
                >
                  Cancelar
                </button>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="px-6 py-2.5 rounded-lg bg-[#0d1c32] text-white font-['Inter'] text-[13.5px] font-semibold hover:bg-[#264191] transition-all flex items-center gap-2 shadow-xs disabled:opacity-50"
                >
                  {isSubmitting ? (
                    <>
                      <span className="material-symbols-outlined text-[16px] animate-spin">
                        progress_activity
                      </span>
                      <span>Salvando no Firestore...</span>
                    </>
                  ) : (
                    <>
                      <span className="material-symbols-outlined text-[18px]">
                        send
                      </span>
                      <span>Enviar para Triagem Gratuita</span>
                    </>
                  )}
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
