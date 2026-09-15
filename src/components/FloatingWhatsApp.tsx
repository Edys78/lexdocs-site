import React from 'react';
import { recordInteractionEvent } from '../lib/databaseService';

export const FloatingWhatsApp: React.FC = () => {
  const handleClick = () => {
    recordInteractionEvent({
      tipo: 'whatsapp_click',
      detalhe: 'Clique no botão flutuante WhatsApp',
      pagina: 'global_flutuante',
      data: new Date().toISOString()
    });
  };

  return (
    <aside className="fixed bottom-6 right-6 z-40">
      <a
        href="https://w.app/jeuz4i"
        target="_blank"
        rel="noopener noreferrer"
        onClick={handleClick}
        aria-label="Fale Conosco pelo WhatsApp"
        className="group flex items-center gap-2.5 bg-[#0d1c32] hover:bg-[#264191] text-white px-4 py-3 rounded-full shadow-[0_4px_16px_rgba(13,28,50,0.28)] hover:shadow-[0_6px_20px_rgba(38,65,145,0.35)] transition-all transform hover:-translate-y-0.5 active:translate-y-0 focus:outline-none"
      >
        <div className="relative flex items-center justify-center">
          <span className="material-symbols-outlined text-[22px] text-[#25D366]">
            chat
          </span>
          <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-[#25D366] rounded-full ring-2 ring-[#0d1c32] animate-pulse"></span>
        </div>
        <span className="font-['Inter'] text-[13px] font-semibold tracking-wide hidden sm:inline-block pr-1">
          Atendimento WhatsApp
        </span>
      </a>
    </aside>
  );
};
