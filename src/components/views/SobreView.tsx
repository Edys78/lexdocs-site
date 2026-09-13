import React from 'react';
import { PageRoute } from '../../types';
import { STRATEGIC_PILLARS, PRACTICAL_COMMITMENTS } from '../../data/content';

interface SobreViewProps {
  onNavigate: (page: PageRoute) => void;
  onOpenAnalysisModal: () => void;
}

export const SobreView: React.FC<SobreViewProps> = ({
  onNavigate,
  onOpenAnalysisModal,
}) => {
  return (
    <div className="w-full flex flex-col gap-12 sm:gap-16 pb-12">
      {/* 1. Page Header */}
      <section className="w-full pt-8 sm:pt-12">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col gap-3 max-w-3xl">
            <div className="inline-flex items-center gap-2 text-[12px] font-mono text-[#264191] font-semibold">
              <span>QUEM SOMOS</span>
              <span className="text-[#c5c6cd]">/</span>
              <span>HISTÓRIA, ÉTICA &amp; RIGOR REGISTRAL</span>
            </div>
            <h1 className="font-['Plus_Jakarta_Sans'] font-bold text-[32px] sm:text-[44px] text-[#191c1e] tracking-tight leading-tight">
              Uma ponte técnica entre os cidadãos e as Serventias Extrajudiciais
            </h1>
            <p className="font-['Inter'] text-[15.5px] text-[#44474d] leading-relaxed">
              A Lexdocs nasceu da constatação de que a burocracia cartorária não precisa ser um labirinto impenetrável. Com sólida expertise em paleografia, onomástica e direito registral brasileiro, atuamos para blindar seus documentos contra exigências e notas devolutivas.
            </p>
          </div>
        </div>
      </section>

      {/* 2. Image & Institutional Story */}
      <section className="w-full">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-6 relative rounded-2xl overflow-hidden min-h-[360px] bg-[#0d1c32] shadow-sm">
              <img
                src="/src/assets/images/lexdocs_team_1789319406578.jpg"
                alt="Equipe técnica da Lexdocs"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0d1c32]/80 via-transparent to-transparent"></div>
              <div className="absolute bottom-4 left-4 right-4 p-4 rounded-xl bg-white/95 backdrop-blur-md border border-white/60">
                <div className="flex items-center justify-between text-[#191c1e]">
                  <span className="font-mono text-[11px] font-bold text-[#264191] uppercase">
                    CORPO TÉCNICO ESPECIALIZADO
                  </span>
                  <span className="text-[12px] font-mono text-[#75777e]">Desde 2018</span>
                </div>
                <p className="font-['Inter'] text-[12.5px] text-[#44474d] mt-1">
                  Analistas certificados em transcrição paleográfica e qualificação registral de certidões seculares.
                </p>
              </div>
            </div>

            <div className="lg:col-span-6 flex flex-col gap-4">
              <span className="font-mono text-[11px] font-semibold text-[#264191] uppercase tracking-wider">
                ORIGEM E PROPÓSITO
              </span>
              <h2 className="font-['Plus_Jakarta_Sans'] font-bold text-[26px] sm:text-[30px] text-[#191c1e] tracking-tight">
                Transformando a complexidade registral em segurança documentada
              </h2>
              <p className="font-['Inter'] text-[14.5px] text-[#44474d] leading-relaxed">
                Ao longo dos anos, identificamos que mais de 80% das recusas e notas devolutivas emitidas por cartórios de Registro Civil decorrem de erros formais sanáveis: discrepâncias de uma única letra em sobrenomes italianos ou portugueses, incoerências cronológicas entre certidões de casamento e óbito, ou averbações marginais incompletas.
              </p>
              <p className="font-['Inter'] text-[14.5px] text-[#44474d] leading-relaxed">
                A atuação da Lexdocs consiste em realizar o escrutínio cirúrgico antes que qualquer protocolo formal seja iniciado. Estruturamos o dossiê probatório, redigimos a fundamentação administrativa apropriada e entregamos um roteiro detalhado para que o requerente tenha total tranquilidade.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 3. Pilares e Valores */}
      <section className="w-full bg-[#f2f4f6] py-12 border-y border-[#e0e3e5]">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 flex flex-col gap-8">
          <div className="text-center flex flex-col items-center gap-2">
            <span className="font-mono text-[11px] font-semibold text-[#264191] uppercase tracking-wider">
              FUNDAMENTAÇÃO DE VALORES
            </span>
            <h2 className="font-['Plus_Jakarta_Sans'] font-bold text-[28px] text-[#191c1e]">
              Pilares e Código de Conduta
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {STRATEGIC_PILLARS.map((pillar) => (
              <div
                key={pillar.id}
                className={`rounded-2xl p-7 flex flex-col justify-between gap-4 ${
                  pillar.isDark
                    ? 'bg-[#0d1c32] text-white shadow-md'
                    : 'bg-white text-[#191c1e] border border-[#e0e3e5] shadow-xs'
                }`}
              >
                <div className="flex flex-col gap-2">
                  <span className="font-mono text-[11px] uppercase tracking-wider font-semibold opacity-70">
                    {pillar.badge}
                  </span>
                  <h3 className="font-['Plus_Jakarta_Sans'] font-bold text-[20px]">
                    {pillar.title}
                  </h3>
                  <p className="font-['Inter'] text-[14px] opacity-85 leading-relaxed">
                    {pillar.description}
                  </p>
                </div>
                <div className="pt-3 border-t border-current/10 font-mono text-[12px] font-semibold">
                  {pillar.subLinkText}
                </div>
              </div>
            ))}
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 mt-4">
            {PRACTICAL_COMMITMENTS.map((c) => (
              <div
                key={c.id}
                className="bg-white rounded-xl p-4 border border-[#e0e3e5] shadow-xs flex flex-col gap-2"
              >
                <h4 className="font-['Plus_Jakarta_Sans'] font-bold text-[14px] text-[#191c1e]">
                  {c.title}
                </h4>
                <p className="font-['Inter'] text-[12px] text-[#44474d] leading-relaxed">
                  {c.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. CTA */}
      <section className="w-full">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 text-center flex flex-col items-center gap-4">
          <h2 className="font-['Plus_Jakarta_Sans'] font-bold text-[26px] text-[#191c1e]">
            Pronto para submeter sua certidão para triagem técnica?
          </h2>
          <p className="font-['Inter'] text-[14.5px] text-[#44474d] max-w-xl">
            Nossa equipe realiza a análise de viabilidade inicial sem nenhum custo de abertura.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-3 mt-2">
            <button
              onClick={onOpenAnalysisModal}
              className="h-11 px-6 rounded-lg bg-[#0d1c32] text-white font-['Inter'] text-[14px] font-semibold hover:bg-[#264191] transition-all shadow-xs"
            >
              Iniciar Triagem Documental
            </button>
            <button
              onClick={() => onNavigate('faq')}
              className="h-11 px-6 rounded-lg bg-white border border-[#e0e3e5] text-[#191c1e] font-['Inter'] text-[14px] font-semibold hover:bg-[#f2f4f6] transition-all shadow-xs"
            >
              Consultar Perguntas Frequentes
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};
