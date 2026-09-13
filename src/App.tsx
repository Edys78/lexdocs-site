/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { PageRoute } from './types';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { FloatingWhatsApp } from './components/FloatingWhatsApp';
import { HomeView } from './components/views/HomeView';
import { FaqView } from './components/views/FaqView';
import { SobreView } from './components/views/SobreView';
import { ServicosView } from './components/views/ServicosView';
import { ContatoView } from './components/views/ContatoView';
import { AdminPainelView } from './components/views/AdminPainelView';
import { SolicitarAnaliseModal } from './components/modals/SolicitarAnaliseModal';

export default function App() {
  const [currentPage, setCurrentPage] = useState<PageRoute>('inicio');
  const [isAnalysisModalOpen, setIsAnalysisModalOpen] = useState(false);

  // Sync scroll to top upon page navigation
  const handleNavigate = (page: PageRoute) => {
    if (page === 'solicitar-analise') {
      setIsAnalysisModalOpen(true);
      return;
    }
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Se estiver na tela de administração do banco de dados
  if (currentPage === 'admin-painel') {
    return (
      <div className="min-h-screen bg-[#f7f9fb] text-[#191c1e] font-['Inter']">
        <AdminPainelView onBackToSite={() => handleNavigate('inicio')} />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#f7f9fb] text-[#191c1e] flex flex-col font-['Inter'] selection:bg-[#dce1ff] selection:text-[#00164e]">
      {/* Header */}
      <Header
        currentPage={currentPage}
        onNavigate={handleNavigate}
        onOpenAnalysisModal={() => setIsAnalysisModalOpen(true)}
      />

      {/* Main Content View with top offset for fixed header */}
      <main className="flex-1 w-full pt-20">
        {currentPage === 'inicio' && (
          <HomeView
            onNavigate={handleNavigate}
            onOpenAnalysisModal={() => setIsAnalysisModalOpen(true)}
          />
        )}
        {currentPage === 'sobre' && (
          <SobreView
            onNavigate={handleNavigate}
            onOpenAnalysisModal={() => setIsAnalysisModalOpen(true)}
          />
        )}
        {currentPage === 'servicos' && (
          <ServicosView
            onNavigate={handleNavigate}
            onOpenAnalysisModal={() => setIsAnalysisModalOpen(true)}
          />
        )}
        {currentPage === 'faq' && (
          <FaqView
            onNavigate={handleNavigate}
            onOpenAnalysisModal={() => setIsAnalysisModalOpen(true)}
          />
        )}
        {currentPage === 'contato' && (
          <ContatoView
            onNavigate={handleNavigate}
            onOpenAnalysisModal={() => setIsAnalysisModalOpen(true)}
          />
        )}
      </main>

      {/* Footer */}
      <Footer
        onNavigate={handleNavigate}
        onOpenAnalysisModal={() => setIsAnalysisModalOpen(true)}
      />

      {/* Floating Action WhatsApp */}
      <FloatingWhatsApp />

      {/* Analysis & Triagem Request Modal */}
      <SolicitarAnaliseModal
        isOpen={isAnalysisModalOpen}
        onClose={() => setIsAnalysisModalOpen(false)}
      />
    </div>
  );
}
