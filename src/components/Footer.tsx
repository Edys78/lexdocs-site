import React from 'react';
import { PageRoute } from '../types';
import { recordInteractionEvent } from '../lib/databaseService';
import { LexDocsLogo } from './common/LexDocsLogo';

interface FooterProps {
  onNavigate: (page: PageRoute) => void;
  onOpenAnalysisModal: () => void;
}

export const Footer: React.FC<FooterProps> = ({
  onNavigate,
  onOpenAnalysisModal,
}) => {
  const handleWhatsAppClick = () => {
    recordInteractionEvent({
      tipo: 'whatsapp_click',
      detalhe: 'Clique WhatsApp (Rodapé)',
      pagina: 'rodape',
      data: new Date().toISOString()
    });
  };

  const handleEmailClick = () => {
    recordInteractionEvent({
      tipo: 'email_click',
      detalhe: 'Clique E-mail (Rodapé)',
      pagina: 'rodape',
      data: new Date().toISOString()
    });
  };

  return (
    <footer className="w-full bg-[#eceef0] border-t border-[#e0e3e5] pt-12 pb-8 text-[#191c1e]">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 flex flex-col gap-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8">
          {/* Brand Presentation */}
          <div className="lg:col-span-4 flex flex-col gap-3">
            <LexDocsLogo size="md" />
            <p className="font-['Inter'] text-[13px] text-[#44474d] max-w-sm leading-relaxed mt-1">
              Análise técnica especializada, verificação e organização de certidões e procedimentos documentais para registros civis com máxima clareza e segurança.
            </p>
            <div className="flex items-center gap-1.5 font-mono text-[12px] text-[#44474d] mt-1">
              <span className="material-symbols-outlined text-[18px] text-[#4059aa]">
                verified_user
              </span>
              <span>Protocolo e Rigor Metodológico</span>
            </div>
          </div>

          {/* Quick Nav */}
          <div className="lg:col-span-2 flex flex-col gap-3">
            <span className="font-['Inter'] text-[12px] text-[#191c1e] uppercase tracking-wider font-semibold">
              Navegação Rápida
            </span>
            <nav className="flex flex-col gap-2">
              <button
                onClick={() => { onNavigate('inicio'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                className="text-left font-['Inter'] text-[13px] text-[#44474d] hover:text-[#191c1e] transition-colors"
              >
                Início
              </button>
              <button
                onClick={() => { onNavigate('sobre'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                className="text-left font-['Inter'] text-[13px] text-[#44474d] hover:text-[#191c1e] transition-colors"
              >
                Quem Somos
              </button>
              <button
                onClick={() => { onNavigate('servicos'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                className="text-left font-['Inter'] text-[13px] text-[#44474d] hover:text-[#191c1e] transition-colors"
              >
                Serviços
              </button>
              <button
                onClick={() => { onNavigate('faq'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                className="text-left font-['Inter'] text-[13px] text-[#44474d] hover:text-[#191c1e] transition-colors"
              >
                Perguntas Frequentes
              </button>
              <button
                onClick={onOpenAnalysisModal}
                className="text-left font-['Inter'] text-[13px] text-[#44474d] hover:text-[#191c1e] transition-colors"
              >
                Solicitar Análise
              </button>
              <button
                onClick={() => { onNavigate('admin-painel'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                className="text-left font-['Inter'] text-[12px] text-[#264191] font-bold hover:underline transition-colors flex items-center gap-1 mt-1"
              >
                <span className="material-symbols-outlined text-[14px]">admin_panel_settings</span>
                <span>Painel do Banco de Dados</span>
              </button>
            </nav>
          </div>

          {/* Technical Services */}
          <div className="lg:col-span-3 flex flex-col gap-3">
            <span className="font-['Inter'] text-[12px] text-[#191c1e] uppercase tracking-wider font-semibold">
              Serviços Técnicos
            </span>
            <ul className="flex flex-col gap-2 font-['Inter'] text-[13px] text-[#44474d]">
              <li className="hover:text-[#191c1e] cursor-pointer" onClick={() => onNavigate('servicos')}>
                Análise de Certidões Civis
              </li>
              <li className="hover:text-[#191c1e] cursor-pointer" onClick={() => onNavigate('servicos')}>
                Exame e Saneamento de Documentos
              </li>
              <li className="hover:text-[#191c1e] cursor-pointer" onClick={() => onNavigate('servicos')}>
                Retificação de Certidões (Art. 110 LRP)
              </li>
              <li className="hover:text-[#191c1e] cursor-pointer" onClick={() => onNavigate('servicos')}>
                Elaboração de Requerimentos
              </li>
              <li className="hover:text-[#191c1e] cursor-pointer" onClick={() => onNavigate('servicos')}>
                Orientação Documental
              </li>
            </ul>
          </div>

          {/* Contact Channels */}
          <div className="lg:col-span-3 flex flex-col gap-3">
            <span className="font-['Inter'] text-[12px] text-[#191c1e] uppercase tracking-wider font-semibold">
              Canais de Contato
            </span>
            <div className="flex flex-col gap-2.5 font-['Inter'] text-[13px] text-[#44474d]">
              <a
                href="https://w.app/jeuz4i"
                target="_blank"
                rel="noopener noreferrer"
                onClick={handleWhatsAppClick}
                className="flex items-center gap-2 hover:text-[#191c1e] transition-colors"
              >
                <span className="material-symbols-outlined text-[17px] text-[#4059aa]">
                  phone_iphone
                </span>
                <span>WhatsApp: (11) 95687-0620</span>
              </a>
              <a
                href="mailto:lexdocss@gmail.com"
                onClick={handleEmailClick}
                className="flex items-center gap-2 hover:text-[#191c1e] transition-colors"
              >
                <span className="material-symbols-outlined text-[17px] text-[#4059aa]">
                  mail
                </span>
                <span>E-mail: lexdocss@gmail.com</span>
              </a>
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-[17px] text-[#4059aa]">
                  public
                </span>
                <span>Atendimento Nacional Online</span>
              </div>
            </div>
          </div>
        </div>

        {/* Institutional Regulatory Scope Disclaimer Card */}
        <div className="p-4 bg-white rounded-lg border border-[#e0e3e5] shadow-xs">
          <p className="font-['Inter'] text-[13px] text-[#44474d] leading-relaxed">
            <strong className="text-[#191c1e] font-semibold">Aviso Institucional:</strong> A Lexdocs atua na área de análise e organização documental técnica e administrativa. Nossos serviços não constituem assessoria jurídica nem substituem a atuação de advogados quando exigido por lei.
          </p>
        </div>

        {/* Bottom Bar */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 font-['Inter'] text-[12px] text-[#44474d] border-t border-[#e0e3e5] pt-6">
          <p>© 2026 Lexdocs - Analista Documental. Todos os direitos reservados.</p>
          <div className="flex items-center gap-6">
            <span className="hover:text-[#191c1e] cursor-pointer">Segurança da Informação</span>
            <span className="hover:text-[#191c1e] cursor-pointer">Conformidade &amp; Privacidade</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
