import React, { useState, useRef } from 'react';
import emailjs from '@emailjs/browser';
import { PageRoute } from '../../types';
import { saveContactLead, recordInteractionEvent } from '../../lib/databaseService';
import { processUploadFile, ProcessedDocument } from '../../utils/fileUtils';

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
    assunto: 'duvidas',
    mensagem: '',
  });
  const [attachedFiles, setAttachedFiles] = useState<ProcessedDocument[]>([]);
  const [isProcessingFiles, setIsProcessingFiles] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [fileStatusMessage, setFileStatusMessage] = useState<string | null>(null);
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const formatFileSize = (bytes: number) => {
    if (bytes < 1024) return `${bytes} B`;
    if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
    return `${(bytes / (1024 * 1024)).toFixed(2)} MB`;
  };

  const processFiles = async (files: FileList | File[]) => {
    setFileStatusMessage(null);
    const newFiles: File[] = Array.from(files);
    if (newFiles.length === 0) return;

    setIsProcessingFiles(true);
    try {
      const processedList: ProcessedDocument[] = [];
      for (const file of newFiles) {
        const processed = await processUploadFile(file);
        processedList.push(processed);
      }
      setAttachedFiles((prev) => [...prev, ...processedList]);
      setFileStatusMessage(`${processedList.length} documento(s) adicionado(s) com sucesso.`);
      setTimeout(() => setFileStatusMessage(null), 4000);
    } catch (err) {
      console.error('Erro ao processar arquivos:', err);
      setFileStatusMessage('Houve uma falha ao ler algum dos arquivos anexados. Tente novamente.');
    } finally {
      setIsProcessingFiles(false);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      processFiles(e.target.files);
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      processFiles(e.dataTransfer.files);
    }
  };

  const removeFile = (id: string) => {
    setAttachedFiles((prev) => prev.filter((f) => f.id !== id));
  };

  const handleSubmit = async (evento: React.FormEvent) => {
    evento.preventDefault();
    setIsSubmitting(true);
    setErrorMessage(null);

    // Coleta as variáveis em letra minúscula para casar perfeitamente com o EmailJS
    const nomeVal = (document.getElementById('nome') as HTMLInputElement)?.value ?? formData.nome;
    const telefoneVal = (document.getElementById('telefone') as HTMLInputElement)?.value ?? formData.telefone;
    const emailVal = (document.getElementById('email') as HTMLInputElement)?.value ?? formData.email;
    const mensagemVal = (document.getElementById('mensagem') as HTMLTextAreaElement)?.value ?? formData.mensagem;

    const dadosFormulario = {
      nome: nomeVal,
      telefone: telefoneVal,
      email: emailVal,
      mensagem: mensagemVal
    };

    try {
      // 1. Mantém gravando no Firebase Cloud Firestore normalmente (com documentos/certidões anexadas)
      await saveContactLead({
        nome: dadosFormulario.nome.trim() || 'Cliente / Interessado',
        email: dadosFormulario.email.trim(),
        telefone: dadosFormulario.telefone.trim(),
        duvida: dadosFormulario.mensagem,
        assunto: formData.assunto,
        mensagem: dadosFormulario.mensagem,
        origem: 'formulario_contato',
        documentos: attachedFiles,
      });
      console.log("Firebase: Dados salvos com sucesso.");

      // 2. Dispara a notificação definitiva via EmailJS para o celular apitar
      await emailjs.send(
        "service_lyfzjvw",
        "template_3enlq2b",
        dadosFormulario,
        "QVWGT40NfdgslL4du"
      );
      console.log("EmailJS: Alerta enviado para o Gmail.");

      // Registrar evento de conversão
      recordInteractionEvent({
        tipo: 'button_cta',
        detalhe: `Mensagem enviada por ${dadosFormulario.nome || dadosFormulario.email} (${formData.assunto}) com ${attachedFiles.length} anexo(s)`,
        pagina: 'contato',
        data: new Date().toISOString()
      });

      alert("Sua mensagem foi enviada com sucesso! Entraremos em contato em breve.");
      
      const formEl = document.getElementById('form-contato') as HTMLFormElement;
      if (formEl) {
        formEl.reset();
      }
      setFormData({ nome: '', email: '', telefone: '', assunto: 'duvidas', mensagem: '' });
      setAttachedFiles([]);
      setSubmitted(true);
    } catch (erro) {
      console.error("Erro completo no envio:", erro);
      setErrorMessage("Ocorreu um erro ao processar seu envio. Tente novamente.");
      alert("Ocorreu um erro ao processar seu envio. Tente novamente.");
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
                <form id="form-contato" onSubmit={handleSubmit} className="flex flex-col gap-4">
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
                      <label htmlFor="nome" className="font-['Inter'] text-[13px] font-medium text-[#191c1e]">
                        Nome Completo *
                      </label>
                      <input
                        id="nome"
                        name="nome"
                        type="text"
                        required
                        value={formData.nome}
                        onChange={(e) => setFormData({ ...formData, nome: e.target.value })}
                        placeholder="Seu nome"
                        className="h-10 px-3 rounded-lg border border-[#e0e3e5] font-['Inter'] text-[14px] focus:outline-none focus:ring-2 focus:ring-[#264191]"
                      />
                    </div>

                    <div className="flex flex-col gap-1.5">
                      <label htmlFor="telefone" className="font-['Inter'] text-[13px] font-medium text-[#191c1e] flex items-center justify-between">
                        <span>Telefone / WhatsApp</span>
                        <span className="text-[11px] text-[#75777e] font-normal">(Opcional)</span>
                      </label>
                      <input
                        id="telefone"
                        name="telefone"
                        type="tel"
                        value={formData.telefone}
                        onChange={(e) => setFormData({ ...formData, telefone: e.target.value })}
                        placeholder="(DDD) 99999-9999 (opcional)"
                        autoComplete="off"
                        className="h-10 px-3 rounded-lg border border-[#e0e3e5] font-['Inter'] text-[14px] focus:outline-none focus:ring-2 focus:ring-[#264191]"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="flex flex-col gap-1.5">
                      <label htmlFor="email" className="font-['Inter'] text-[13px] font-medium text-[#191c1e]">
                        E-mail para Retorno *
                      </label>
                      <input
                        id="email"
                        name="email"
                        type="email"
                        required
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        placeholder="seu@email.com"
                        className="h-10 px-3 rounded-lg border border-[#e0e3e5] font-['Inter'] text-[14px] focus:outline-none focus:ring-2 focus:ring-[#264191]"
                      />
                    </div>

                    <div className="flex flex-col gap-1.5">
                      <label htmlFor="assunto" className="font-['Inter'] text-[13px] font-medium text-[#191c1e]">
                        Tipo de Assunto
                      </label>
                      <select
                        id="assunto"
                        name="assunto"
                        value={formData.assunto}
                        onChange={(e) => setFormData({ ...formData, assunto: e.target.value })}
                        className="h-10 px-3 rounded-lg border border-[#e0e3e5] font-['Inter'] text-[14px] focus:outline-none focus:ring-2 focus:ring-[#264191] bg-white"
                      >
                        <option value="duvidas">Tirar Dúvidas / Consulta Preliminar</option>
                        <option value="triagem">Triagem de Certidões</option>
                        <option value="retificacao">Retificação Administrativa (Art. 110 LRP)</option>
                        <option value="cidadania">Cidadania Italiana / Portuguesa</option>
                        <option value="inventario">Inventário / Escritura Imobiliária</option>
                      </select>
                    </div>
                  </div>

                  <div className="flex flex-col gap-1.5">
                    <label htmlFor="mensagem" className="font-['Inter'] text-[13px] font-medium text-[#191c1e]">
                      Detalhes da sua dúvida ou situação *
                    </label>
                    <textarea
                      id="mensagem"
                      name="mensagem"
                      required
                      rows={4}
                      value={formData.mensagem}
                      onChange={(e) => setFormData({ ...formData, mensagem: e.target.value })}
                      placeholder="Escreva sua dúvida, detalhes sobre nomes grafados incorretamente, certidões ou procedimentos que deseja esclarecer..."
                      className="p-3 rounded-lg border border-[#e0e3e5] font-['Inter'] text-[14px] focus:outline-none focus:ring-2 focus:ring-[#264191]"
                    />
                  </div>

                  {/* Campo de Upload de Imagens e PDF Sem Limites */}
                  <div className="flex flex-col gap-2 pt-1">
                    <div className="flex items-center justify-between">
                      <label className="font-['Inter'] text-[13px] font-medium text-[#191c1e] flex items-center gap-1.5">
                        <span className="material-symbols-outlined text-[18px] text-[#264191]">
                          attach_file
                        </span>
                        <span>Anexar Certidões, Imagens ou PDFs</span>
                        <span className="text-[11px] text-[#75777e] font-normal">(Sem limite de arquivos)</span>
                      </label>
                      <span className="text-[11px] font-mono text-[#264191] bg-[#eef2ff] px-2 py-0.5 rounded font-semibold">
                        Sem Limite de Tamanho
                      </span>
                    </div>

                    <input
                      type="file"
                      ref={fileInputRef}
                      onChange={handleFileChange}
                      accept=".pdf,application/pdf,image/*"
                      multiple
                      className="hidden"
                      id="pdf-upload-input"
                    />

                    {/* Dropzone Area */}
                    <div
                      onDragOver={(e) => {
                        e.preventDefault();
                        setIsDragging(true);
                      }}
                      onDragLeave={() => setIsDragging(false)}
                      onDrop={handleDrop}
                      onClick={() => fileInputRef.current?.click()}
                      className={`border-2 border-dashed rounded-xl p-4 sm:p-5 text-center cursor-pointer transition-all flex flex-col items-center justify-center gap-2 ${
                        isDragging
                          ? 'border-[#264191] bg-[#264191]/5 scale-[0.99]'
                          : 'border-[#c5c6cd] hover:border-[#264191] bg-[#fcfdfe] hover:bg-[#f7f9fb]'
                      }`}
                    >
                      <div className="w-10 h-10 rounded-full bg-[#eef2ff] text-[#264191] flex items-center justify-center">
                        <span className="material-symbols-outlined text-[24px]">
                          {isProcessingFiles ? 'hourglass_top' : 'add_photo_alternate'}
                        </span>
                      </div>
                      <div className="flex flex-col gap-0.5">
                        <p className="font-['Inter'] text-[13.5px] font-semibold text-[#191c1e]">
                          {isProcessingFiles 
                            ? 'Otimizando e carregando arquivos...' 
                            : 'Clique para anexar ou arraste imagens e PDFs aqui'}
                        </p>
                        <p className="font-['Inter'] text-[11.5px] text-[#75777e]">
                          Você pode anexar quantas fotos, cópias e PDFs desejar. Tudo é salvo com segurança no banco de dados.
                        </p>
                      </div>
                    </div>

                    {fileStatusMessage && (
                      <div className="p-2.5 bg-emerald-50 text-emerald-800 text-[12px] rounded-lg border border-emerald-200 flex items-center gap-1.5">
                        <span className="material-symbols-outlined text-[16px]">check_circle</span>
                        <span>{fileStatusMessage}</span>
                      </div>
                    )}

                    {/* Lista de Arquivos Anexados */}
                    {attachedFiles.length > 0 && (
                      <div className="flex flex-col gap-2 mt-1">
                        <div className="flex items-center justify-between">
                          <span className="text-[12px] font-semibold text-[#191c1e]">
                            Arquivos anexados ({attachedFiles.length}):
                          </span>
                          <button
                            type="button"
                            onClick={() => fileInputRef.current?.click()}
                            className="text-[11.5px] text-[#264191] font-semibold hover:underline flex items-center gap-1"
                          >
                            <span className="material-symbols-outlined text-[14px]">add</span>
                            <span>Adicionar mais</span>
                          </button>
                        </div>
                        
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 max-h-56 overflow-y-auto pr-1">
                          {attachedFiles.map((file) => {
                            const isPdf = file.type.includes('pdf') || file.name.toLowerCase().endsWith('.pdf');
                            return (
                              <div
                                key={file.id}
                                className="flex items-center justify-between p-2.5 bg-[#f7f9fb] rounded-lg border border-[#e0e3e5] text-[13px]"
                              >
                                <div className="flex items-center gap-2.5 min-w-0">
                                  <span className={`material-symbols-outlined text-[22px] shrink-0 ${isPdf ? 'text-rose-600' : 'text-blue-600'}`}>
                                    {isPdf ? 'picture_as_pdf' : 'image'}
                                  </span>
                                  <div className="min-w-0">
                                    <p className="font-medium text-[#191c1e] truncate max-w-[140px] sm:max-w-[170px]">
                                      {file.name}
                                    </p>
                                    <p className="text-[11px] text-[#75777e]">
                                      {formatFileSize(file.size)} • {isPdf ? 'PDF' : 'Imagem'}
                                    </p>
                                  </div>
                                </div>

                                <button
                                  type="button"
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    removeFile(file.id);
                                  }}
                                  className="p-1 rounded text-[#75777e] hover:text-rose-600 hover:bg-rose-50 transition-colors"
                                  title="Remover anexo"
                                >
                                  <span className="material-symbols-outlined text-[18px]">
                                    delete
                                  </span>
                                </button>
                              </div>
                            );
                          })}
                        </div>
                      </div>
                    )}
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting || isProcessingFiles}
                    className="h-11 rounded-lg bg-[#0d1c32] text-white font-['Inter'] text-[14px] font-semibold hover:bg-[#264191] transition-all mt-2 shadow-xs flex items-center justify-center gap-2 disabled:opacity-50"
                  >
                    {isSubmitting ? (
                      <>
                        <span className="material-symbols-outlined text-[18px] animate-spin">
                          progress_activity
                        </span>
                        <span>Salvando no Firebase...</span>
                      </>
                    ) : (
                      <>
                        <span className="material-symbols-outlined text-[18px]">send</span>
                        <span>
                          Enviar {formData.assunto === 'duvidas' ? 'Dúvida' : 'Solicitação'}
                          {attachedFiles.length > 0 ? ` com ${attachedFiles.length} anexo(s)` : ''}
                        </span>
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
                <div className="flex items-center gap-2">
                  <span className="material-symbols-outlined text-[20px] text-[#25D366]">chat</span>
                  <span className="font-mono text-[11px] uppercase tracking-wider font-semibold text-[#eec14b]">
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
