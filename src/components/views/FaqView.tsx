import React, { useState, useMemo } from 'react';
import { PageRoute, FaqCategory, FaqItem } from '../../types';
import { FAQ_DATA } from '../../data/content';

interface FaqViewProps {
  onNavigate: (page: PageRoute) => void;
  onOpenAnalysisModal: () => void;
}

export const FaqView: React.FC<FaqViewProps> = ({
  onNavigate,
  onOpenAnalysisModal,
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<FaqCategory>('all');
  const [expandedIds, setExpandedIds] = useState<Record<string, boolean>>({
    'faq-1': true, // Keep first open by default
  });

  const toggleAccordion = (id: string) => {
    setExpandedIds((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  const categories: { id: FaqCategory; label: string; icon: string }[] = [
    { id: 'all', label: 'Todas as Perguntas', icon: 'apps' },
    { id: 'triagem', label: 'Triagem & Prazos', icon: 'schedule' },
    { id: 'certidoes', label: 'Certidões & Documentos', icon: 'description' },
    { id: 'retificacoes', label: 'Retificações & Erros', icon: 'edit_document' },
    { id: 'seguranca', label: 'Segurança & Sigilo (LGPD)', icon: 'lock' },
    { id: 'institucional', label: 'Institucional & Escopo Legal', icon: 'gavel' },
  ];

  const filteredFaqs = useMemo(() => {
    const term = searchTerm.toLowerCase().trim();
    return FAQ_DATA.filter((faq) => {
      const matchesCategory =
        selectedCategory === 'all' || faq.category === selectedCategory;
      const matchesSearch =
        !term ||
        faq.question.toLowerCase().includes(term) ||
        faq.answer.toLowerCase().includes(term) ||
        faq.keywords.some((kw) => kw.toLowerCase().includes(term));

      return matchesCategory && matchesSearch;
    });
  }, [searchTerm, selectedCategory]);

  const handleQuickSearch = (term: string) => {
    setSearchTerm(term);
  };

  const handleResetFilters = () => {
    setSearchTerm('');
    setSelectedCategory('all');
  };

  return (
    <div className="w-full flex flex-col">
      {/* 1. Top Status Banner / Breadcrumb */}
      <section className="w-full bg-[#f2f4f6] py-2.5 border-b border-[#e0e3e5]">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 flex flex-wrap items-center justify-between gap-3 text-[#44474d] text-[12px] font-mono">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-[16px] text-[#264191]">
              verified
            </span>
            <span className="tracking-wide uppercase">BASE DE CONHECIMENTO TÉCNICO-REGISTRAL</span>
            <span className="opacity-40">/</span>
            <span className="text-[#191c1e] font-semibold">DIRETRIZES &amp; FAQ 2026</span>
          </div>

          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1.5 text-[#191c1e]">
              <span className="w-2 h-2 rounded-full bg-emerald-600 animate-pulse"></span>
              <span className="font-sans text-[13px] font-medium">Analistas Online para Triagem</span>
            </span>
            <span className="px-2 py-0.5 rounded bg-[#e0e3e5] text-[#191c1e] text-[11px] font-semibold">
              SLA Médio: 24h
            </span>
          </div>
        </div>
      </section>

      {/* 2. Hero & Search Section */}
      <section className="w-full relative overflow-hidden bg-gradient-to-b from-white to-[#f7f9fb] py-12 sm:py-16 border-b border-[#e0e3e5]">
        <div className="absolute -right-20 -top-20 w-96 h-96 rounded-full bg-[#dce1ff] opacity-40 blur-3xl pointer-events-none"></div>
        <div className="absolute -left-20 bottom-0 w-80 h-80 rounded-full bg-[#e6e8ea] opacity-60 blur-2xl pointer-events-none"></div>

        <div className="relative max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 flex flex-col items-center text-center">
          {/* Institutional Category Chip */}
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#e6e8ea] text-[#1d3989] text-[11px] font-mono font-semibold uppercase tracking-wider shadow-xs">
            <span className="material-symbols-outlined text-[15px] text-[#264191]">
              help_outline
            </span>
            <span>CENTRAL DE DÚVIDAS &amp; DIRETRIZES</span>
          </div>

          {/* Main Headline */}
          <h1 className="mt-4 font-['Plus_Jakarta_Sans'] font-bold text-[32px] sm:text-[42px] lg:text-[46px] text-[#191c1e] tracking-tight max-w-3xl leading-tight">
            Perguntas Frequentes
          </h1>

          {/* Subtitle */}
          <p className="mt-3 font-['Inter'] text-[15px] sm:text-[16px] text-[#44474d] max-w-2xl leading-relaxed">
            Tire suas dúvidas sobre análise de certidões, retificação extrajudicial, prazos, custos, envio seguro de documentos e como funciona nossa consultoria técnica registral.
          </p>

          {/* Search Input */}
          <div className="mt-8 w-full max-w-2xl">
            <div className="relative flex items-center bg-white rounded-xl shadow-[0_2px_12px_rgba(0,0,0,0.06)] border border-[#e0e3e5] p-1.5 focus-within:ring-2 focus-within:ring-[#264191] focus-within:border-transparent transition-all">
              <div className="flex items-center justify-center pl-3 text-[#75777e]">
                <span className="material-symbols-outlined text-[22px] text-[#264191]">
                  search
                </span>
              </div>
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Buscar dúvida ou palavra-chave (ex: retificação, prazos, certidão de nascimento, custos)..."
                className="w-full py-2.5 px-3 bg-transparent font-['Inter'] text-[14px] text-[#191c1e] placeholder:text-[#75777e] focus:outline-none"
                aria-label="Buscar nas perguntas frequentes"
              />
              {searchTerm && (
                <button
                  type="button"
                  onClick={() => setSearchTerm('')}
                  className="p-1.5 mr-1 text-[#75777e] hover:text-[#191c1e] rounded-lg transition-colors"
                  title="Limpar busca"
                >
                  <span className="material-symbols-outlined text-[18px]">close</span>
                </button>
              )}
            </div>

            {/* Quick Search Terms */}
            <div className="mt-3 flex flex-wrap items-center justify-center gap-2 font-['Inter'] text-[12px] text-[#44474d]">
              <span className="font-semibold text-[#191c1e]">Termos frequentes:</span>
              {['Prazos', 'Sigilo & LGPD', 'Certidões Civis', 'Custos da Triagem', 'Retificação de Nomes'].map((term) => (
                <button
                  key={term}
                  type="button"
                  onClick={() => handleQuickSearch(term)}
                  className="px-2.5 py-1 rounded-full bg-white border border-[#e0e3e5] hover:bg-[#dce1ff] hover:text-[#00164e] hover:border-[#264191]/30 transition-all shadow-xs"
                >
                  {term}
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 3. Category Tabs Navigation & Content Grid */}
      <section className="w-full max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 py-10">
        {/* Category Tabs */}
        <div className="w-full overflow-x-auto pb-3 scrollbar-none">
          <div className="inline-flex min-w-full lg:min-w-0 p-1.5 bg-[#f2f4f6] rounded-xl gap-1 border border-[#e0e3e5] shadow-xs" role="tablist">
            {categories.map((cat) => {
              const isActive = selectedCategory === cat.id;
              return (
                <button
                  key={cat.id}
                  type="button"
                  onClick={() => setSelectedCategory(cat.id)}
                  className={`px-4 py-2.5 rounded-lg font-['Inter'] text-[13px] transition-all flex items-center gap-2 whitespace-nowrap ${
                    isActive
                      ? 'bg-[#0d1c32] text-white font-semibold shadow-xs'
                      : 'text-[#44474d] hover:text-[#191c1e] hover:bg-white'
                  }`}
                >
                  <span className="material-symbols-outlined text-[16px]">
                    {cat.icon}
                  </span>
                  <span>{cat.label}</span>
                  {cat.id === 'all' && (
                    <span className="ml-0.5 px-1.5 py-0.2 rounded-full bg-white/20 text-[11px] font-mono">
                      {FAQ_DATA.length}
                    </span>
                  )}
                </button>
              );
            })}
          </div>
        </div>

        {/* Main Grid: 8 Cols FAQ stream + 4 Cols Right Rail */}
        <div className="mt-8 grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* FAQ Accordion List (8 cols) */}
          <div className="lg:col-span-8 flex flex-col gap-4" id="faq-stream">
            {filteredFaqs.map((faq) => {
              const isExpanded = !!expandedIds[faq.id];
              return (
                <article
                  key={faq.id}
                  className="bg-white rounded-xl p-5 border border-[#e0e3e5] shadow-xs hover:border-[#264191]/30 transition-all"
                >
                  <button
                    type="button"
                    onClick={() => toggleAccordion(faq.id)}
                    aria-expanded={isExpanded}
                    className="w-full flex items-start justify-between gap-4 text-left focus:outline-none group cursor-pointer"
                  >
                    <div className="flex items-start gap-3 min-w-0">
                      <div className="mt-0.5 p-1.5 rounded-lg bg-[#f2f4f6] text-[#264191] flex-shrink-0 group-hover:bg-[#dce1ff] transition-colors">
                        <span className="material-symbols-outlined text-[18px]">
                          {faq.category === 'certidoes'
                            ? 'policy'
                            : faq.category === 'institucional'
                            ? 'balance'
                            : faq.category === 'triagem'
                            ? 'payments'
                            : faq.category === 'seguranca'
                            ? 'shield'
                            : 'history_edu'}
                        </span>
                      </div>
                      <div className="flex flex-col">
                        <span className="font-mono text-[11px] text-[#75777e] uppercase tracking-wider font-semibold">
                          {faq.tag}
                        </span>
                        <h3 className="font-['Plus_Jakarta_Sans'] font-semibold text-[16px] sm:text-[17px] text-[#191c1e] group-hover:text-[#264191] transition-colors leading-snug mt-0.5">
                          {faq.question}
                        </h3>
                      </div>
                    </div>
                    <span
                      className={`material-symbols-outlined text-[22px] text-[#75777e] group-hover:text-[#264191] transition-transform duration-200 flex-shrink-0 ${
                        isExpanded ? 'rotate-180 text-[#264191]' : ''
                      }`}
                    >
                      expand_more
                    </span>
                  </button>

                  {isExpanded && (
                    <div className="mt-4 pt-3 border-t border-[#eceef0] pl-0 sm:pl-10 flex flex-col gap-3 animate-in fade-in duration-200">
                      <p className="font-['Inter'] text-[14px] text-[#44474d] leading-relaxed">
                        {faq.answer}
                      </p>

                      {/* Highlight Box */}
                      {faq.highlight && (
                        <div className="p-3.5 rounded-lg bg-[#f2f4f6] border-l-3 border-[#264191] flex items-start gap-2.5 text-[#191c1e] font-['Inter'] text-[13px]">
                          <span className="material-symbols-outlined text-[#264191] text-[18px] flex-shrink-0 mt-0.5">
                            verified
                          </span>
                          <span className="leading-relaxed">{faq.highlight}</span>
                        </div>
                      )}

                      {/* Item list */}
                      {faq.items && (
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mt-1">
                          {faq.items.map((item, idx) => (
                            <div
                              key={idx}
                              className="flex items-start gap-2 p-2.5 rounded bg-[#f2f4f6] text-[#191c1e] text-[13px]"
                            >
                              <span className="material-symbols-outlined text-[16px] text-[#264191] flex-shrink-0 mt-0.5">
                                check_circle
                              </span>
                              <span>{item}</span>
                            </div>
                          ))}
                        </div>
                      )}

                      {/* Cards list (e.g. deadlines) */}
                      {faq.cards && (
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-1">
                          {faq.cards.map((card, idx) => (
                            <div
                              key={idx}
                              className="p-3.5 bg-[#f2f4f6] rounded-lg border border-[#e0e3e5]"
                            >
                              <span className="font-mono text-[11px] text-[#264191] font-bold uppercase">
                                {card.title}
                              </span>
                              <p className="font-['Plus_Jakarta_Sans'] font-bold text-[17px] text-[#191c1e] mt-0.5">
                                {card.subtitle}
                              </p>
                              <p className="font-['Inter'] text-[12.5px] text-[#44474d] mt-1 leading-snug">
                                {card.desc}
                              </p>
                            </div>
                          ))}
                        </div>
                      )}

                      {/* Steps list */}
                      {faq.steps && (
                        <div className="flex flex-col gap-2 mt-1">
                          {faq.steps.map((st) => (
                            <div
                              key={st.num}
                              className="flex items-start gap-3 p-2.5 bg-[#f2f4f6] rounded-lg text-[13px]"
                            >
                              <span className="w-6 h-6 rounded-full bg-[#0d1c32] text-white flex items-center justify-center font-bold text-[12px] flex-shrink-0">
                                {st.num}
                              </span>
                              <div className="leading-snug">
                                <strong className="text-[#191c1e]">{st.title}: </strong>
                                <span className="text-[#44474d]">{st.desc}</span>
                              </div>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  )}
                </article>
              );
            })}

            {/* Empty state */}
            {filteredFaqs.length === 0 && (
              <div className="p-12 bg-white rounded-xl border border-[#e0e3e5] text-center flex flex-col items-center justify-center gap-3">
                <span className="material-symbols-outlined text-4xl text-[#75777e] opacity-60">
                  search_off
                </span>
                <h4 className="font-['Plus_Jakarta_Sans'] font-bold text-[18px] text-[#191c1e]">
                  Nenhuma pergunta encontrada
                </h4>
                <p className="font-['Inter'] text-[14px] text-[#44474d] max-w-md">
                  Não encontramos resultados correspondentes ao termo digitado. Experimente outras palavras-chave ou contate diretamente nossos analistas.
                </p>
                <button
                  type="button"
                  onClick={handleResetFilters}
                  className="mt-2 px-4 py-2 rounded-lg bg-[#0d1c32] text-white font-['Inter'] text-[13px] font-semibold hover:bg-[#264191] transition-colors"
                >
                  Redefinir Filtros de Busca
                </button>
              </div>
            )}
          </div>

          {/* Right Visual & Contextual Rail (4 cols) */}
          <aside className="lg:col-span-4 flex flex-col gap-5">
            {/* Quick Dossier Verification Card with Circular Metric */}
            <div className="bg-white rounded-xl p-5 border border-[#e0e3e5] shadow-xs flex flex-col gap-3">
              <div className="flex items-center justify-between">
                <span className="font-mono text-[11px] text-[#264191] font-bold uppercase tracking-wider">
                  PROTOCOLO PREVENTIVO
                </span>
                <span className="px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700 font-mono text-[11px] font-semibold border border-emerald-200">
                  Ativo
                </span>
              </div>
              <div>
                <h4 className="font-['Plus_Jakarta_Sans'] font-bold text-[17px] text-[#191c1e]">
                  Índice de Efetividade
                </h4>
                <p className="font-['Inter'] text-[12.5px] text-[#44474d] mt-0.5">
                  Métricas históricas de certidões saneadas administrativamente.
                </p>
              </div>

              {/* Circular SVG Metric */}
              <div className="p-3 bg-[#f7f9fb] rounded-lg border border-[#e0e3e5] flex items-center gap-4">
                <div className="relative w-16 h-16 flex-shrink-0 flex items-center justify-center">
                  <svg className="w-16 h-16 -rotate-90" viewBox="0 0 36 36">
                    <path
                      className="text-[#e0e3e5]"
                      d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="3.5"
                    />
                    <path
                      className="text-[#264191]"
                      d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                      fill="none"
                      stroke="currentColor"
                      strokeDasharray="94, 100"
                      strokeLinecap="round"
                      strokeWidth="3.5"
                    />
                  </svg>
                  <span className="absolute font-['Plus_Jakarta_Sans'] font-bold text-[16px] text-[#191c1e]">
                    94%
                  </span>
                </div>
                <div className="flex flex-col min-w-0">
                  <span className="font-['Inter'] font-semibold text-[13px] text-[#191c1e]">
                    Resolução em Serventia
                  </span>
                  <span className="font-['Inter'] text-[12px] text-[#44474d] leading-snug">
                    Minutas aceitas sem exigência suplementar no primeiro protocolo.
                  </span>
                </div>
              </div>

              {/* Protocol status micro-check */}
              <div className="flex flex-col gap-1.5 font-mono text-[11.5px] text-[#44474d] mt-1">
                <div className="flex items-center justify-between p-2 rounded bg-[#f2f4f6]">
                  <span>Auditoria de Grafias &amp; Onomástica</span>
                  <span className="text-[#264191] font-bold">100% Rigor</span>
                </div>
                <div className="flex items-center justify-between p-2 rounded bg-[#f2f4f6]">
                  <span>Cotejo de Datas &amp; Sucessão</span>
                  <span className="text-[#264191] font-bold">Auditado</span>
                </div>
                <div className="flex items-center justify-between p-2 rounded bg-[#f2f4f6]">
                  <span>Enquadramento Art. 110 LRP</span>
                  <span className="text-[#264191] font-bold">Conforme</span>
                </div>
              </div>
            </div>

            {/* Direct Technical Contact Card (Dark) */}
            <div className="bg-[#0d1c32] text-white rounded-xl p-5 shadow-md relative overflow-hidden flex flex-col gap-3">
              <div className="absolute -bottom-10 -right-10 w-32 h-32 rounded-full bg-[#264191] opacity-30 blur-2xl pointer-events-none"></div>

              <div className="flex items-center gap-1.5 text-[#eec14b]">
                <span className="material-symbols-outlined text-[20px]">
                  support_agent
                </span>
                <span className="font-mono text-[11px] uppercase tracking-wider font-semibold">
                  Atendimento Técnico
                </span>
              </div>

              <h3 className="font-['Plus_Jakarta_Sans'] font-bold text-[17px] text-white leading-snug">
                Dúvida específica sobre sua certidão?
              </h3>

              <p className="font-['Inter'] text-[13px] text-white/80 leading-relaxed">
                Envie sua pergunta diretamente a um especialista em registros públicos para uma avaliação preliminar.
              </p>

              <div className="mt-2 flex flex-col gap-2">
                <a
                  href="https://w.app/jeuz4i"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 h-10 px-4 rounded-lg bg-white text-[#0d1c32] font-['Inter'] text-[13px] font-bold hover:bg-[#dce1ff] transition-colors shadow-xs"
                >
                  <span className="material-symbols-outlined text-[18px]">chat</span>
                  <span>Falar no WhatsApp</span>
                </a>

                <button
                  type="button"
                  onClick={onOpenAnalysisModal}
                  className="flex items-center justify-center gap-2 h-10 px-4 rounded-lg bg-white/10 hover:bg-white/20 text-white border border-white/20 font-['Inter'] text-[13px] font-semibold transition-colors"
                >
                  <span className="material-symbols-outlined text-[18px]">upload_file</span>
                  <span>Enviar Arquivos para Triagem</span>
                </button>
              </div>
            </div>

            {/* Statutory Note */}
            <div className="p-4 bg-[#f2f4f6] rounded-xl border border-[#e0e3e5]">
              <div className="flex items-center gap-1.5 font-mono text-[11px] text-[#191c1e] uppercase tracking-wider font-semibold">
                <span className="material-symbols-outlined text-[16px] text-[#264191]">
                  gavel
                </span>
                <span>Nota de Enquadramento</span>
              </div>
              <p className="mt-1.5 font-['Inter'] text-[12px] text-[#44474d] leading-relaxed">
                As respostas fornecidas nesta central baseiam-se na legislação federal (Lei 6.015/73, Lei 13.484/17 e Código de Normas do CNJ). Nossos serviços têm cunho estritamente técnico e procedimental de apoio extrajudicial.
              </p>
            </div>
          </aside>
        </div>
      </section>

      {/* 4. Large Dedicated CTA & Triagem Submission Section */}
      <section className="w-full bg-white py-12 border-t border-[#e0e3e5] mt-6">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="p-6 sm:p-10 bg-gradient-to-r from-[#f2f4f6] to-[#e6e8ea] rounded-2xl border border-[#e0e3e5] flex flex-col lg:flex-row items-center justify-between gap-8">
            <div className="flex flex-col max-w-2xl gap-2">
              <span className="font-mono text-[11px] text-[#264191] font-semibold uppercase tracking-wider">
                TRIAGEM PRÉVIA SEM TAXA INICIAL
              </span>
              <h2 className="font-['Plus_Jakarta_Sans'] font-bold text-[24px] sm:text-[28px] text-[#191c1e] tracking-tight">
                Ainda ficou com alguma dúvida sobre o seu caso?
              </h2>
              <p className="font-['Inter'] text-[14px] text-[#44474d] leading-relaxed">
                Nossa equipe de analistas documentais está à disposição para examinar a situação do seu registro civil sem compromisso. Receba um diagnóstico inicial de viabilidade em até 48 horas.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row items-center gap-3 w-full lg:w-auto flex-shrink-0">
              <a
                href="https://w.app/jeuz4i"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto h-11 px-5 rounded-lg bg-[#0d1c32] text-white font-['Inter'] text-[13.5px] font-semibold flex items-center justify-center gap-2 hover:bg-[#264191] transition-all shadow-xs"
              >
                <span className="material-symbols-outlined text-[18px]">chat</span>
                <span>Falar com um Analista no WhatsApp</span>
              </a>

              <button
                type="button"
                onClick={onOpenAnalysisModal}
                className="w-full sm:w-auto h-11 px-5 rounded-lg bg-white text-[#191c1e] border border-[#e0e3e5] font-['Inter'] text-[13.5px] font-semibold flex items-center justify-center gap-2 hover:bg-[#f2f4f6] transition-all shadow-xs"
              >
                <span className="material-symbols-outlined text-[18px]">file_upload</span>
                <span>Enviar Documentos para Triagem</span>
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* 5. Institutional Compliance Bar */}
      <section className="w-full bg-[#f2f4f6] py-4 border-t border-[#e0e3e5]">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="p-4 bg-white rounded-lg border border-[#e0e3e5] flex flex-col md:flex-row items-start md:items-center justify-between gap-3 text-[12px] text-[#44474d]">
            <div className="flex items-start md:items-center gap-2">
              <span className="material-symbols-outlined text-[#264191] text-[18px] flex-shrink-0">
                shield_lock
              </span>
              <p className="leading-relaxed">
                <strong className="text-[#191c1e]">Fundamentação de Procedimento:</strong> Análises fundadas na Lei de Registros Públicos (Lei nº 6.015/1973) e atos regulamentares do CNJ. Atividade técnica para-cartorária sem intervenção judicial privativa (Lei nº 8.906/1994).
              </p>
            </div>
            <div className="font-mono text-[11px] text-[#75777e] flex-shrink-0">
              Rev. Técnica: 2026.01-BR
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
