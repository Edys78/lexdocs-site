import React from 'react';
import { PageRoute } from '../../types';
import {
  STRATEGIC_PILLARS,
  PRACTICAL_COMMITMENTS,
} from '../../data/content';

interface HomeViewProps {
  onNavigate: (page: PageRoute) => void;
  onOpenAnalysisModal: () => void;
}

export const HomeView: React.FC<HomeViewProps> = ({
  onNavigate,
  onOpenAnalysisModal,
}) => {
  return (
    <div className="w-full flex flex-col gap-12 sm:gap-16 pb-12">
      {/* 1. Hero & Top Operational Status Section */}
      <section className="w-full pt-8 sm:pt-12">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Main Headline & Mission intro (8 cols) */}
            <div className="lg:col-span-8 flex flex-col gap-4">
              <h1 className="font-['Plus_Jakarta_Sans'] text-[32px] sm:text-[40px] lg:text-[46px] font-bold text-[#191c1e] tracking-tight leading-[1.18] max-w-3xl">
                Autoridade, precisão técnica e segurança no exame documental extrajudicial
              </h1>

              <p className="font-['Inter'] text-[15px] sm:text-[16px] text-[#44474d] leading-relaxed max-w-2xl mt-1">
                Nascemos com a missão de transformar o universo burocrático de certidões, registros públicos e exigências cartorárias em clareza analítica, segurança jurídica e caminhos práticos para cidadãos e famílias.
              </p>
            </div>

            {/* Assistência Cartorária Card (4 cols) */}
            <div className="lg:col-span-4 bg-white rounded-xl p-5 border border-[#e0e3e5] shadow-xs flex flex-col gap-3">
              <div className="flex items-center gap-2 text-[#191c1e] font-['Plus_Jakarta_Sans'] font-semibold text-[16px]">
                <span className="material-symbols-outlined text-[20px] text-[#264191]">
                  verified
                </span>
                <span>Assistência Cartorária</span>
              </div>
              <p className="font-['Inter'] text-[13px] text-[#44474d] leading-relaxed">
                Mais de 20 anos de experiência prática em cartório e análise de documentos do Registro Civil, garantindo segurança, prevenção de exigências e conformidade documental.
              </p>
            </div>
          </div>

          {/* 3 Metric / Highlight Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mt-10">
            {/* Card 1 */}
            <div className="bg-white rounded-xl p-6 border border-[#e0e3e5] shadow-xs flex flex-col gap-3 hover:shadow-md transition-shadow">
              <div className="flex items-center text-[#44474d]">
                <div className="w-10 h-10 rounded-lg bg-[#f2f4f6] flex items-center justify-center text-[#264191]">
                  <span className="material-symbols-outlined text-[22px]">balance</span>
                </div>
              </div>
              <div>
                <h3 className="font-['Plus_Jakarta_Sans'] font-bold text-[24px] text-[#191c1e] tracking-tight">
                  100%
                </h3>
                <h4 className="font-['Plus_Jakarta_Sans'] font-semibold text-[15px] text-[#191c1e] mt-0.5">
                  Imparcialidade Técnica
                </h4>
              </div>
              <p className="font-['Inter'] text-[13px] text-[#44474d] leading-relaxed">
                Em estrita conformidade com a Lei de Registros Públicos e diretrizes das Corregedorias Gerais de Justiça.
              </p>
            </div>

            {/* Card 2 */}
            <div className="bg-white rounded-xl p-6 border border-[#e0e3e5] shadow-xs flex flex-col gap-3 hover:shadow-md transition-shadow">
              <div className="flex items-center text-[#44474d]">
                <div className="w-10 h-10 rounded-lg bg-[#f2f4f6] flex items-center justify-center text-[#264191]">
                  <span className="material-symbols-outlined text-[22px]">map</span>
                </div>
              </div>
              <div>
                <h3 className="font-['Plus_Jakarta_Sans'] font-bold text-[24px] text-[#191c1e] tracking-tight">
                  Nacional
                </h3>
                <h4 className="font-['Plus_Jakarta_Sans'] font-semibold text-[15px] text-[#191c1e] mt-0.5">
                  Atuação em Comarcas
                </h4>
              </div>
              <p className="font-['Inter'] text-[13px] text-[#44474d] leading-relaxed">
                Exame abrangente de acervos cartorários, livros de assento e serventias em todas as regiões brasileiras.
              </p>
            </div>

            {/* Card 3 */}
            <div className="bg-white rounded-xl p-6 border border-[#e0e3e5] shadow-xs flex flex-col gap-3 hover:shadow-md transition-shadow">
              <div className="flex items-center text-[#44474d]">
                <div className="w-10 h-10 rounded-lg bg-[#f2f4f6] flex items-center justify-center text-[#264191]">
                  <span className="material-symbols-outlined text-[22px]">fact_check</span>
                </div>
              </div>
              <div>
                <h3 className="font-['Plus_Jakarta_Sans'] font-bold text-[24px] text-[#191c1e] tracking-tight">
                  Item a Item
                </h3>
                <h4 className="font-['Plus_Jakarta_Sans'] font-semibold text-[15px] text-[#191c1e] mt-0.5">
                  Conferência Rigorosa
                </h4>
              </div>
              <p className="font-['Inter'] text-[13px] text-[#44474d] leading-relaxed">
                Rastreamento paleográfico, validação fonética e conciliação genealógica em cadeia de certidões.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 2. Conheça a Lexdocs Section */}
      <section className="w-full bg-[#f2f4f6]/60 py-12 border-y border-[#e0e3e5]/60">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col gap-1 mb-8">
            <span className="font-mono text-[11px] font-semibold text-[#264191] uppercase tracking-wider">
              TRAJETÓRIA E PROPÓSITO
            </span>
            <h2 className="font-['Plus_Jakarta_Sans'] font-bold text-[28px] sm:text-[34px] text-[#191c1e] tracking-tight">
              Conheça a Lexdocs
            </h2>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
            {/* Left: Office visual with overlay badge */}
            <div className="lg:col-span-6 relative rounded-2xl overflow-hidden min-h-[340px] sm:min-h-[420px] bg-[#0d1c32] shadow-sm flex flex-col justify-end">
              <img
                src="/src/assets/images/lexdocs_team_1789319406578.jpg"
                alt="Consultores da Lexdocs examinando certidões em escritório"
                className="absolute inset-0 w-full h-full object-cover object-center opacity-90 transition-transform duration-500 hover:scale-105"
                onError={(e) => {
                  // Fallback to high quality unsplash if local image preview differs
                  (e.target as HTMLElement).style.display = 'none';
                }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0d1c32]/90 via-[#0d1c32]/30 to-transparent"></div>

              {/* Overlay Badge at bottom */}
              <div className="relative z-10 m-4 sm:m-6 p-4 rounded-xl bg-white/95 backdrop-blur-md border border-white/60 shadow-lg flex items-start gap-3">
                <div className="w-9 h-9 rounded-lg bg-[#0d1c32] text-white flex items-center justify-center flex-shrink-0 mt-0.5">
                  <span className="material-symbols-outlined text-[20px] text-[#eec14b]">
                    shield
                  </span>
                </div>
                <div className="flex flex-col">
                  <h4 className="font-['Plus_Jakarta_Sans'] font-bold text-[14px] text-[#191c1e]">
                    Compromisso Ético &amp; Técnico
                  </h4>
                  <p className="font-['Inter'] text-[12px] text-[#44474d] leading-normal mt-0.5">
                    Análise imparcial em estrita observância à Lei de Registros Públicos (Lei nº 6.015/73) e normativas correlatas.
                  </p>
                </div>
              </div>
            </div>

            {/* Right: Institutional text and 2 feature cards */}
            <div className="lg:col-span-6 flex flex-col justify-between gap-6">
              <div className="flex flex-col gap-4">
                <div className="inline-flex items-center gap-2 text-[11px] font-mono font-semibold text-[#264191] uppercase tracking-wider">
                  <span className="material-symbols-outlined text-[16px]">domain</span>
                  <span>AUDITORIA DOCUMENTAL DESCENTRALIZADA</span>
                </div>

                <p className="font-['Inter'] text-[15px] text-[#191c1e] leading-relaxed">
                  A <strong className="font-semibold text-[#0d1c32]">Lexdocs - Analista Documental</strong> nasceu com o propósito de tornar a análise e a organização documental mais simples, claras e acessíveis. Nosso trabalho é examinar minuciosamente documentos e certidões, identificar informações relevantes, apontar possíveis inconsistências e estruturar a via correta para procedimentos administrativos e extrajudiciais.
                </p>

                <p className="font-['Inter'] text-[14.5px] text-[#44474d] leading-relaxed">
                  Compreendemos que lidar com certidões antigas, registros civis, averbações e exigências de cartórios pode ser exaustivo, demorado e confuso. Por isso, oferecemos uma ponte técnica que traduz complexidades cartorárias em direcionamentos fundamentados, evitando retrabalho e indeferimentos.
                </p>
              </div>

              {/* 2 Feature mini-cards */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                <div className="bg-white rounded-xl p-4 border border-[#e0e3e5] shadow-xs flex flex-col gap-1.5">
                  <div className="flex items-center gap-2 text-[#264191]">
                    <span className="material-symbols-outlined text-[18px]">gavel</span>
                    <h4 className="font-['Plus_Jakarta_Sans'] font-bold text-[14px] text-[#191c1e]">
                      Rigor Preventivo
                    </h4>
                  </div>
                  <p className="font-['Inter'] text-[12.5px] text-[#44474d] leading-relaxed">
                    Antecipação de notas devolutivas antes da submissão aos Oficiais Registradores.
                  </p>
                </div>

                <div className="bg-white rounded-xl p-4 border border-[#e0e3e5] shadow-xs flex flex-col gap-1.5">
                  <div className="flex items-center gap-2 text-[#264191]">
                    <span className="material-symbols-outlined text-[18px]">translate</span>
                    <h4 className="font-['Plus_Jakarta_Sans'] font-bold text-[14px] text-[#191c1e]">
                      Clareza Verbal
                    </h4>
                  </div>
                  <p className="font-['Inter'] text-[12.5px] text-[#44474d] leading-relaxed">
                    Tradução objetiva de exigências cartorárias cifradas em instruções executáveis.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. Nossos Pilares Estratégicos & Valores Inegociáveis */}
      <section className="w-full">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 flex flex-col gap-8">
          <div className="text-center flex flex-col items-center gap-2">
            <span className="font-mono text-[11px] font-semibold text-[#264191] uppercase tracking-wider">
              FUNDAMENTOS INSTITUCIONAIS
            </span>
            <h2 className="font-['Plus_Jakarta_Sans'] font-bold text-[28px] sm:text-[34px] text-[#191c1e] tracking-tight">
              Nossos Pilares Estratégicos
            </h2>
            <p className="font-['Inter'] text-[14.5px] text-[#44474d] max-w-2xl">
              Princípios invioláveis que guiam cada certidão manuseada e cada parecer técnico emitido pela nossa equipe.
            </p>
          </div>

          {/* 2 Big Pillar Cards (Mission & Vision) */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Card 1: Missão */}
            <div className="bg-white rounded-2xl p-7 border border-[#e0e3e5] shadow-xs flex flex-col justify-between gap-6 hover:shadow-md transition-all">
              <div className="flex flex-col gap-3">
                <div className="w-11 h-11 rounded-xl bg-[#f2f4f6] text-[#264191] flex items-center justify-center">
                  <span className="material-symbols-outlined text-[24px]">flag</span>
                </div>
                <span className="font-mono text-[11px] uppercase tracking-wider font-semibold text-[#75777e]">
                  MISSÃO INSTITUCIONAL
                </span>
                <h3 className="font-['Plus_Jakarta_Sans'] font-bold text-[22px] text-[#191c1e]">
                  Clareza e salvaguarda de direitos
                </h3>
                <p className="font-['Inter'] text-[14px] text-[#44474d] leading-relaxed">
                  Conceder clareza e segurança no exame de certidões e atos registrais, resguardando os direitos das partes através de diagnósticos preliminares precisos.
                </p>
              </div>

              <div className="pt-4 border-t border-[#eceef0] flex items-center gap-2 text-[#264191] font-['Inter'] text-[13px] font-semibold cursor-pointer hover:underline" onClick={() => onNavigate('sobre')}>
                <span>&rarr; Prevenção de vícios de forma e conteúdo</span>
              </div>
            </div>

            {/* Card 2: Visão (Dark card) */}
            <div className="bg-[#0d1c32] text-white rounded-2xl p-7 shadow-md flex flex-col justify-between gap-6 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-64 h-64 bg-[#264191]/20 rounded-full blur-3xl pointer-events-none"></div>

              <div className="relative z-10 flex flex-col gap-3">
                <div className="w-11 h-11 rounded-xl bg-white/10 text-[#eec14b] flex items-center justify-center backdrop-blur-sm">
                  <span className="material-symbols-outlined text-[24px]">visibility</span>
                </div>
                <span className="font-mono text-[11px] uppercase tracking-wider font-semibold text-white/70">
                  VISÃO DE FUTURO
                </span>
                <h3 className="font-['Plus_Jakarta_Sans'] font-bold text-[22px] text-white">
                  Referência em inteligência documental
                </h3>
                <p className="font-['Inter'] text-[14px] text-white/80 leading-relaxed">
                  Ser a referência nacional em auditoria e inteligência documental extrajudicial, reconhecida pela excelência técnica, agilidade e integridade.
                </p>
              </div>

              <div className="relative z-10 pt-4 border-t border-white/10 flex items-center gap-2 text-[#eec14b] font-['Inter'] text-[13px] font-semibold">
                <span className="material-symbols-outlined text-[17px]">verified</span>
                <span>Padrão ouro em conformidade cartorária</span>
              </div>
            </div>
          </div>

          {/* Sub-block: Compromissos Práticos Inegociáveis (5 items) */}
          <div className="mt-4 p-6 sm:p-8 bg-[#f2f4f6]/80 rounded-2xl border border-[#e0e3e5]">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-6">
              <div>
                <span className="font-mono text-[11px] font-semibold text-[#264191] uppercase tracking-wider">
                  VALORES CORPORATIVOS
                </span>
                <h3 className="font-['Plus_Jakarta_Sans'] font-bold text-[20px] text-[#191c1e]">
                  Compromissos Práticos Inegociáveis
                </h3>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
              {PRACTICAL_COMMITMENTS.map((comm) => (
                <div
                  key={comm.id}
                  className="bg-white rounded-xl p-4 border border-[#e0e3e5] shadow-xs flex flex-col gap-2 hover:border-[#264191]/40 transition-colors"
                >
                  <div className="flex items-center gap-2 text-[#264191]">
                    <span className="material-symbols-outlined text-[19px]">
                      {comm.icon === 'search_check' ? 'search' : comm.icon === 'shield_check' ? 'security' : comm.icon === 'chat_paste_go' ? 'forum' : comm.icon === 'account_tree' ? 'account_tree' : 'verified_user'}
                    </span>
                    <h4 className="font-['Plus_Jakarta_Sans'] font-bold text-[13.5px] text-[#191c1e]">
                      {comm.title}
                    </h4>
                  </div>
                  <p className="font-['Inter'] text-[12px] text-[#44474d] leading-relaxed">
                    {comm.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 4. Transparência Regulamentar & Escopo Operacional */}
      <section className="w-full">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="p-5 sm:p-6 bg-[#f2f4f6] rounded-xl border border-[#e0e3e5] flex items-start gap-4">
            <div className="w-10 h-10 rounded-lg bg-white border border-[#e0e3e5] text-[#264191] flex items-center justify-center flex-shrink-0 mt-0.5">
              <span className="material-symbols-outlined text-[22px]">balance</span>
            </div>
            <div className="flex flex-col gap-1">
              <div className="flex items-center gap-2">
                <span className="font-['Plus_Jakarta_Sans'] font-bold text-[14px] text-[#191c1e]">
                  TRANSPARÊNCIA REGULAMENTAR &amp; ESCOPO OPERACIONAL
                </span>
                <span className="font-mono text-[10px] px-2 py-0.5 rounded bg-white border border-[#e0e3e5] text-[#44474d]">
                  Art. 1º Lei 8.906/94
                </span>
              </div>
              <p className="font-['Inter'] text-[13px] text-[#44474d] leading-relaxed">
                A <strong>Lexdocs</strong> é uma empresa especializada em análise e consultoria documental técnica extrajudicial e administrativa. Nossos serviços não constituem assessoria jurídica nem substituem a atuação privativa de advogados quando exigido por lei. Nosso mister restringe-se ao exame preventivo, saneamento formal de certidões e orientação procedimental registral.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 6. Dedicated CTA Dark Banner */}
      <section className="w-full">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="p-8 sm:p-10 lg:p-12 bg-[#0d1c32] rounded-2xl text-white shadow-xl relative overflow-hidden flex flex-col lg:flex-row items-center justify-between gap-8">
            <div className="absolute -top-16 -right-16 w-80 h-80 rounded-full bg-[#264191]/30 blur-3xl pointer-events-none"></div>

            <div className="relative z-10 flex flex-col gap-3 max-w-2xl">
              <div className="inline-flex items-center gap-2 text-[11px] font-mono font-semibold text-[#eec14b] uppercase tracking-wider">
                <span className="w-2 h-2 rounded-full bg-[#eec14b] animate-ping"></span>
                <span>TRIAGEM DOCUMENTAL IMEDIATA</span>
              </div>
              <h2 className="font-['Plus_Jakarta_Sans'] font-bold text-[26px] sm:text-[32px] text-white tracking-tight leading-snug">
                Precisa de segurança técnica para seus documentos?
              </h2>
              <p className="font-['Inter'] text-[14.5px] text-white/80 leading-relaxed">
                Converse com nossos analistas documentais ou envie sua certidão para uma triagem inicial sem compromisso. Evite notas devolutivas e garanta a via correta de retificação.
              </p>
            </div>

            <div className="relative z-10 flex flex-col sm:flex-row items-stretch sm:items-center gap-3 w-full lg:w-auto flex-shrink-0">
              <button
                onClick={onOpenAnalysisModal}
                className="h-12 px-6 rounded-lg bg-white text-[#0d1c32] font-['Inter'] text-[14px] font-bold hover:bg-[#dce1ff] active:scale-95 transition-all shadow-md flex items-center justify-center gap-2"
                id="home-cta-solicitar-btn"
              >
                <span className="material-symbols-outlined text-[20px]">
                  description
                </span>
                <span>Solicitar Análise Documental</span>
              </button>

              <a
                href="https://w.app/jeuz4i"
                target="_blank"
                rel="noopener noreferrer"
                className="h-12 px-6 rounded-lg bg-[#264191] hover:bg-[#1d3989] text-white font-['Inter'] text-[14px] font-semibold active:scale-95 transition-all shadow-md flex items-center justify-center gap-2 text-center"
              >
                <span className="material-symbols-outlined text-[20px]">
                  chat
                </span>
                <span>Falar pelo WhatsApp</span>
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
