import React from 'react';
import { PageRoute } from '../../types';
import { SERVICES_DATA } from '../../data/content';

interface ServicosViewProps {
  onNavigate: (page: PageRoute) => void;
  onOpenAnalysisModal: () => void;
}

export const ServicosView: React.FC<ServicosViewProps> = ({
  onNavigate,
  onOpenAnalysisModal,
}) => {
  return (
    <div className="w-full flex flex-col gap-12 sm:gap-16 pb-12">
      {/* 1. Header */}
      <section className="w-full pt-8 sm:pt-12">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col gap-3 max-w-3xl">
            <div className="inline-flex items-center gap-2 text-[12px] font-mono text-[#264191] font-semibold">
              <span>SERVIÇOS TÉCNICOS</span>
              <span className="text-[#c5c6cd]">/</span>
              <span>AUDITORIA, SANEAMENTO &amp; MINUTAS EXTRAJUDICIAIS</span>
            </div>
            <h1 className="font-['Plus_Jakarta_Sans'] font-bold text-[32px] sm:text-[44px] text-[#191c1e] tracking-tight leading-tight">
              Soluções especializadas para cada etapa do seu procedimento registral
            </h1>
            <p className="font-['Inter'] text-[15.5px] text-[#44474d] leading-relaxed">
              Exames técnicos aprofundados, conferência registral e redação de requerimentos fundamentados nos termos da legislação federal e normas das Corregedorias.
            </p>
          </div>
        </div>
      </section>

      {/* 2. Services Grid */}
      <section className="w-full">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {SERVICES_DATA.map((service) => (
              <div
                key={service.id}
                className="bg-white rounded-2xl p-7 border border-[#e0e3e5] shadow-xs flex flex-col justify-between gap-6 hover:border-[#264191]/40 hover:shadow-md transition-all"
              >
                <div className="flex flex-col gap-4">
                  <div className="flex items-start">
                    <div className="w-12 h-12 rounded-xl bg-[#f2f4f6] text-[#264191] flex items-center justify-center">
                      <span className="material-symbols-outlined text-[26px]">
                        {service.icon}
                      </span>
                    </div>
                  </div>

                  <div>
                    <h3 className="font-['Plus_Jakarta_Sans'] font-bold text-[20px] text-[#191c1e] leading-snug">
                      {service.title}
                    </h3>
                    <p className="font-['Inter'] text-[13px] text-[#264191] font-semibold mt-0.5">
                      {service.subtitle}
                    </p>
                  </div>

                  <p className="font-['Inter'] text-[14px] text-[#44474d] leading-relaxed">
                    {service.description}
                  </p>

                  {/* Deliverables List */}
                  <div className="p-4 bg-[#f7f9fb] rounded-xl border border-[#e0e3e5]">
                    <span className="font-mono text-[11px] uppercase font-bold text-[#191c1e] tracking-wider block mb-2">
                      Entregáveis Técnicos:
                    </span>
                    <ul className="flex flex-col gap-2 font-['Inter'] text-[12.5px] text-[#44474d]">
                      {service.deliverables.map((d, i) => (
                        <li key={i} className="flex items-start gap-2">
                          <span className="material-symbols-outlined text-[15px] text-[#264191] flex-shrink-0 mt-0.5">
                            check_circle
                          </span>
                          <span>{d}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div className="pt-4 border-t border-[#eceef0] flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-[12px]">
                  <div className="flex flex-col">
                    <span className="font-mono text-[10.5px] text-[#75777e] uppercase">
                      Prazo Médio: {service.sla}
                    </span>
                    <span className="font-mono text-[10.5px] text-[#44474d]">
                      Base: {service.normativeBase}
                    </span>
                  </div>

                  <button
                    type="button"
                    onClick={onOpenAnalysisModal}
                    className="h-9 px-4 rounded-lg bg-[#0d1c32] text-white font-['Inter'] text-[13px] font-semibold hover:bg-[#264191] transition-all flex items-center justify-center gap-1.5 self-start sm:self-auto"
                  >
                    <span>Solicitar Este Serviço</span>
                    <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 3. Bottom Guidance */}
      <section className="w-full bg-[#f2f4f6] py-10 border-t border-[#e0e3e5]">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex flex-col gap-1 max-w-xl">
            <h3 className="font-['Plus_Jakarta_Sans'] font-bold text-[20px] text-[#191c1e]">
              Dúvidas sobre qual serviço se adequa ao seu caso?
            </h3>
            <p className="font-['Inter'] text-[13.5px] text-[#44474d]">
              Nossos analistas avaliam gratuitamente seus documentos na triagem inicial e indicam o caminho registral com menor custo e menor tempo.
            </p>
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={onOpenAnalysisModal}
              className="h-11 px-5 rounded-lg bg-[#0d1c32] text-white font-['Inter'] text-[13.5px] font-semibold hover:bg-[#264191] transition-all shadow-xs"
            >
              Enviar para Triagem
            </button>
            <a
              href="https://w.app/jeuz4i"
              target="_blank"
              rel="noopener noreferrer"
              className="h-11 px-5 rounded-lg bg-white border border-[#e0e3e5] text-[#191c1e] font-['Inter'] text-[13.5px] font-semibold hover:bg-[#eceef0] transition-all flex items-center gap-2 shadow-xs"
            >
              <span className="material-symbols-outlined text-[18px] text-[#264191]">chat</span>
              <span>Falar no WhatsApp</span>
            </a>
          </div>
        </div>
      </section>
    </div>
  );
};
