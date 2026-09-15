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
        title="Fale Conosco pelo WhatsApp"
        className="group relative flex items-center justify-center w-14 h-14 sm:w-15 sm:h-15 bg-[#25D366] hover:bg-[#20bd5a] text-white rounded-full shadow-[0_6px_22px_rgba(37,211,102,0.48)] hover:shadow-[0_8px_28px_rgba(37,211,102,0.65)] transition-all duration-300 transform hover:scale-110 active:scale-95 focus:outline-none"
      >
        {/* Pulsing online indicator ring */}
        <span className="absolute -inset-0.5 rounded-full bg-[#25D366] opacity-30 group-hover:opacity-60 animate-ping pointer-events-none"></span>

        {/* WhatsApp Icon matching official branding */}
        <svg
          viewBox="0 0 32 32"
          className="w-8 h-8 sm:w-9 sm:h-9 fill-current relative z-10"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M16 2C8.27 2 2 8.27 2 16c0 2.68.75 5.18 2.05 7.32L2.3 29.7l6.61-1.73C11.01 29.17 13.43 30 16 30c7.73 0 14-6.27 14-14S23.73 2 16 2zm0 25.5c-2.3 0-4.47-.69-6.3-1.87l-.45-.29-4.36 1.14 1.16-4.25-.32-.47C4.47 19.88 3.8 17.98 3.8 16c0-6.73 5.47-12.2 12.2-12.2s12.2 5.47 12.2 12.2c0 6.73-5.47 12.2-12.2 12.2zm6.69-9.13c-.37-.18-2.17-1.07-2.51-1.19-.34-.12-.58-.18-.83.18-.25.37-.96 1.19-1.17 1.44-.22.25-.43.28-.79.09-.37-.18-1.55-.57-2.95-1.82-1.09-.97-1.83-2.18-2.04-2.54-.22-.37-.02-.56.16-.74.16-.16.37-.43.55-.64.19-.21.25-.37.37-.61.12-.25.06-.46-.03-.64-.09-.18-.83-2-1.14-2.74-.3-.72-.61-.62-.83-.64-.22-.01-.46-.01-.71-.01-.25 0-.64.09-.98.46-.34.37-1.29 1.26-1.29 3.07s1.32 3.56 1.5 3.8c.19.25 2.6 3.97 6.29 5.56.88.38 1.57.61 2.1.78.88.28 1.68.24 2.32.14.71-.11 2.17-.89 2.48-1.74.31-.86.31-1.59.22-1.74-.09-.16-.34-.25-.71-.43z" />
        </svg>
      </a>
    </aside>
  );
};
