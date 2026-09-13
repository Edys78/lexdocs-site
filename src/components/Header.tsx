import React, { useState } from 'react';
import { PageRoute } from '../types';
import { LexDocsLogo } from './common/LexDocsLogo';

interface HeaderProps {
  currentPage: PageRoute;
  onNavigate: (page: PageRoute) => void;
  onOpenAnalysisModal: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  currentPage,
  onNavigate,
  onOpenAnalysisModal,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks: { id: PageRoute; label: string }[] = [
    { id: 'inicio', label: 'Início' },
    { id: 'sobre', label: 'Sobre' },
    { id: 'servicos', label: 'Serviços' },
    { id: 'faq', label: 'FAQ' },
    { id: 'contato', label: 'Contato' },
  ];

  const handleNavClick = (page: PageRoute) => {
    onNavigate(page);
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-[#f7f9fb]/95 backdrop-blur-xl border-b border-[#e0e3e5]/70 shadow-[0_1px_8px_rgba(0,0,0,0.03)]">
      <div className="h-20 max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between gap-4">
        {/* Brand Logo Oficial */}
        <div className="flex items-center gap-4">
          <button
            onClick={() => handleNavClick('inicio')}
            className="flex items-center text-left group focus:outline-none transition-transform active:scale-[0.99]"
            id="brand-logo-btn"
          >
            <LexDocsLogo size="md" />
          </button>
        </div>

        {/* Desktop Navigation Links */}
        <nav className="hidden lg:flex items-center gap-6" id="desktop-nav">
          {navLinks.map((link) => {
            const isActive = currentPage === link.id;
            return (
              <button
                key={link.id}
                onClick={() => handleNavClick(link.id)}
                className={`font-['Inter'] text-[14px] transition-colors py-1.5 px-1 relative ${
                  isActive
                    ? 'text-[#191c1e] font-semibold'
                    : 'text-[#44474d] font-normal hover:text-[#191c1e]'
                }`}
              >
                {link.label}
                {isActive && (
                  <span className="absolute bottom-0 left-0 right-0 h-[2px] bg-[#264191] rounded-full" />
                )}
              </button>
            );
          })}
        </nav>

        {/* Actions */}
        <div className="flex items-center gap-3">
          <button
            onClick={onOpenAnalysisModal}
            className="hidden sm:inline-flex items-center justify-center h-10 px-5 rounded-lg bg-[#0d1c32] text-white font-['Inter'] text-[14px] font-semibold hover:bg-[#264191] active:scale-95 transition-all shadow-[0_1px_3px_rgba(15,23,42,0.1)] focus:outline-none"
            id="header-cta-solicitar"
          >
            Solicitar Análise
          </button>

          {/* Database Admin Icon Button */}
          <button
            onClick={() => handleNavClick('admin-painel')}
            className={`w-9 h-9 rounded-full flex items-center justify-center flex-shrink-0 transition-colors focus:outline-none ${
              currentPage === 'admin-painel'
                ? 'bg-[#264191] text-[#eec14b] ring-2 ring-[#eec14b]'
                : 'bg-[#0d1c32] text-white hover:bg-[#264191]'
            }`}
            title="Painel do Banco de Dados (Firebase)"
            aria-label="Painel de Administração e Banco de Dados"
          >
            <span className="material-symbols-outlined text-[19px]">database</span>
          </button>

          {/* Mobile hamburger toggle */}
          <button
            aria-label="Abrir Menu de Navegação"
            className="lg:hidden p-2 text-[#191c1e] hover:text-[#264191] focus:outline-none rounded-lg hover:bg-[#eceef0]"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            type="button"
            id="mobile-menu-toggle"
          >
            <span className="material-symbols-outlined text-2xl">
              {mobileMenuOpen ? 'close' : 'menu'}
            </span>
          </button>
        </div>
      </div>

      {/* Mobile drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden fixed inset-x-0 top-20 bg-white border-b border-[#e0e3e5] shadow-xl p-5 animate-in slide-in-from-top-2 duration-200">
          <nav className="flex flex-col gap-1.5">
            {navLinks.map((link) => {
              const isActive = currentPage === link.id;
              return (
                <button
                  key={link.id}
                  onClick={() => handleNavClick(link.id)}
                  className={`text-left px-4 py-2.5 rounded-lg font-['Inter'] text-[15px] transition-colors ${
                    isActive
                      ? 'bg-[#eceef0] text-[#191c1e] font-semibold'
                      : 'text-[#44474d] hover:bg-[#f2f4f6] hover:text-[#191c1e]'
                  }`}
                >
                  {link.label}
                </button>
              );
            })}
            <div className="mt-2 pt-3 border-t border-[#eceef0] flex flex-col gap-2">
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenAnalysisModal();
                }}
                className="flex items-center justify-center w-full h-11 rounded-lg bg-[#0d1c32] text-white font-['Inter'] text-[15px] font-semibold hover:bg-[#264191] transition-all shadow-sm"
              >
                Solicitar Análise
              </button>
              <button
                onClick={() => handleNavClick('admin-painel')}
                className="flex items-center justify-center gap-2 w-full h-10 rounded-lg bg-[#f2f4f6] text-[#0d1c32] font-['Inter'] text-[14px] font-semibold hover:bg-[#eceef0] transition-all"
              >
                <span className="material-symbols-outlined text-[18px]">database</span>
                <span>Painel do Banco de Dados</span>
              </button>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
};
