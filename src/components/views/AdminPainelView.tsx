import React, { useState, useEffect } from 'react';
import { 
  fetchAllAnalysisRequests, 
  fetchAllContacts, 
  updateAnalysisStatus, 
  updateContactStatus, 
  deleteAnalysisRequest,
  deleteContactLead,
  DocumentAnalysisRequest,
  LeadContact
} from '../../lib/databaseService';
import { PdfPreviewModal } from '../modals/PdfPreviewModal';

interface AdminPainelViewProps {
  onBackToSite: () => void;
}

export const AdminPainelView: React.FC<AdminPainelViewProps> = ({ onBackToSite }) => {
  const [activeTab, setActiveTab] = useState<'analises' | 'contatos'>('analises');
  const [analises, setAnalises] = useState<DocumentAnalysisRequest[]>([]);
  const [contatos, setContatos] = useState<LeadContact[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedAnalysis, setSelectedAnalysis] = useState<DocumentAnalysisRequest | null>(null);
  const [adminNotes, setAdminNotes] = useState('');
  const [filterStatus, setFilterStatus] = useState<string>('todos');
  const [searchTerm, setSearchTerm] = useState('');
  const [isSaving, setIsSaving] = useState(false);
  const [previewDoc, setPreviewDoc] = useState<{
    name: string;
    size?: number;
    type?: string;
    dataUrl?: string;
  } | null>(null);

  const loadData = async () => {
    setLoading(true);
    try {
      const [fetchedAnalises, fetchedContatos] = await Promise.all([
        fetchAllAnalysisRequests(),
        fetchAllContacts()
      ]);
      setAnalises(fetchedAnalises);
      setContatos(fetchedContatos);
    } catch (err) {
      console.error('Erro ao carregar dados do Firebase:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const handleStatusChange = async (id: string, newStatus: DocumentAnalysisRequest['status']) => {
    try {
      await updateAnalysisStatus(id, newStatus);
      setAnalises(prev => prev.map(a => a.id === id ? { ...a, status: newStatus } : a));
      if (selectedAnalysis && selectedAnalysis.id === id) {
        setSelectedAnalysis(prev => prev ? { ...prev, status: newStatus } : null);
      }
    } catch (error) {
      alert('Erro ao atualizar status.');
    }
  };

  const handleSaveNotes = async () => {
    if (!selectedAnalysis?.id) return;
    setIsSaving(true);
    try {
      await updateAnalysisStatus(selectedAnalysis.id, selectedAnalysis.status, adminNotes);
      setAnalises(prev => prev.map(a => a.id === selectedAnalysis.id ? { ...a, adminNotes } : a));
      setSelectedAnalysis(prev => prev ? { ...prev, adminNotes } : null);
      alert('Notas do analista salvas com sucesso!');
    } catch (error) {
      alert('Erro ao salvar anotações.');
    } finally {
      setIsSaving(false);
    }
  };

  const handleContactStatusChange = async (id: string, newStatus: LeadContact['status']) => {
    try {
      await updateContactStatus(id, newStatus);
      setContatos(prev => prev.map(c => c.id === id ? { ...c, status: newStatus } : c));
    } catch (error) {
      alert('Erro ao atualizar contato.');
    }
  };

  const handleDeleteContact = async (id: string) => {
    if (!window.confirm('Tem certeza que deseja remover esta mensagem do banco de dados?')) return;
    try {
      await deleteContactLead(id);
      setContatos(prev => prev.filter(c => c.id !== id));
    } catch (error) {
      alert('Erro ao excluir contato.');
    }
  };

  const handleDeleteAnalysis = async (id: string) => {
    if (!window.confirm('Tem certeza que deseja remover esta solicitação do banco de dados?')) return;
    try {
      await deleteAnalysisRequest(id);
      setAnalises(prev => prev.filter(a => a.id !== id));
      if (selectedAnalysis?.id === id) {
        setSelectedAnalysis(null);
      }
    } catch (error) {
      alert('Erro ao excluir registro.');
    }
  };

  const formatFileSize = (bytes?: number) => {
    if (!bytes) return '';
    if (bytes < 1024) return `${bytes} B`;
    if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
    return `${(bytes / (1024 * 1024)).toFixed(2)} MB`;
  };

  const triggerDownload = (docItem: { name: string; dataUrl?: string }) => {
    if (!docItem.dataUrl) return;
    const a = document.createElement('a');
    a.href = docItem.dataUrl;
    a.download = docItem.name || 'documento.pdf';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };

  const formatDate = (timestamp: any) => {
    if (!timestamp) return 'Recente';
    try {
      if (timestamp.toDate) {
        return timestamp.toDate().toLocaleString('pt-BR');
      }
      if (timestamp.seconds) {
        return new Date(timestamp.seconds * 1000).toLocaleString('pt-BR');
      }
      return new Date(timestamp).toLocaleString('pt-BR');
    } catch {
      return 'Recente';
    }
  };

  const filteredAnalises = analises.filter(item => {
    const matchesStatus = filterStatus === 'todos' || item.status === filterStatus;
    const term = searchTerm.toLowerCase();
    const matchesSearch = 
      item.fullName?.toLowerCase().includes(term) ||
      item.email?.toLowerCase().includes(term) ||
      item.phone?.toLowerCase().includes(term) ||
      item.details?.toLowerCase().includes(term);
    return matchesStatus && matchesSearch;
  });

  const filteredContatos = contatos.filter(item => {
    const term = searchTerm.toLowerCase();
    return (
      item.nome?.toLowerCase().includes(term) ||
      item.email?.toLowerCase().includes(term) ||
      item.telefone?.toLowerCase().includes(term) ||
      item.mensagem?.toLowerCase().includes(term)
    );
  });

  return (
    <div className="w-full min-h-screen bg-[#f7f9fb] pb-16">
      {/* Top Header */}
      <header className="bg-[#0d1c32] text-white border-b border-[#264191]/40 px-4 sm:px-8 py-4 sticky top-0 z-30 shadow-md">
        <div className="max-w-[1500px] mx-auto flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-[#264191] text-[#eec14b] flex items-center justify-center font-bold">
              <span className="material-symbols-outlined text-[24px]">database</span>
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-['Plus_Jakarta_Sans'] font-bold text-[18px]">
                  Lexdocs • Painel do Banco de Dados
                </span>
                <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                  Firestore Conectado
                </span>
              </div>
              <span className="text-[12px] text-white/70 font-['Inter']">
                Gerenciamento de Leads e Solicitações Registrais no Firestore
              </span>
            </div>
          </div>

          <div className="flex items-center gap-3 w-full sm:w-auto justify-between sm:justify-end">
            <button
              onClick={loadData}
              disabled={loading}
              className="px-3 py-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-white font-['Inter'] text-[13px] flex items-center gap-1.5 transition-colors"
            >
              <span className={`material-symbols-outlined text-[16px] ${loading ? 'animate-spin' : ''}`}>
                refresh
              </span>
              <span>Atualizar</span>
            </button>

            <button
              onClick={onBackToSite}
              className="px-4 py-1.5 rounded-lg bg-[#264191] hover:bg-[#1d3989] text-white font-['Inter'] text-[13px] font-semibold flex items-center gap-1.5 transition-colors shadow-sm"
            >
              <span className="material-symbols-outlined text-[16px]">arrow_back</span>
              <span>Voltar ao Site</span>
            </button>
          </div>
        </div>
      </header>

      {/* Main Container */}
      <div className="max-w-[1500px] mx-auto px-4 sm:px-8 pt-8 flex flex-col gap-6">
        {/* Metric Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="bg-white p-5 rounded-2xl border border-[#e0e3e5] shadow-xs flex items-center justify-between">
            <div>
              <span className="font-['Inter'] text-[12px] text-[#75777e] uppercase font-semibold">
                Total de Análises
              </span>
              <h4 className="font-['Plus_Jakarta_Sans'] font-bold text-[24px] text-[#191c1e] mt-1">
                {analises.length}
              </h4>
            </div>
            <div className="w-11 h-11 rounded-xl bg-blue-50 text-[#264191] flex items-center justify-center">
              <span className="material-symbols-outlined text-[24px]">assignment</span>
            </div>
          </div>

          <div className="bg-white p-5 rounded-2xl border border-[#e0e3e5] shadow-xs flex items-center justify-between">
            <div>
              <span className="font-['Inter'] text-[12px] text-[#75777e] uppercase font-semibold">
                Pendentes de Triagem
              </span>
              <h4 className="font-['Plus_Jakarta_Sans'] font-bold text-[24px] text-amber-600 mt-1">
                {analises.filter(a => a.status === 'pendente').length}
              </h4>
            </div>
            <div className="w-11 h-11 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center">
              <span className="material-symbols-outlined text-[24px]">pending_actions</span>
            </div>
          </div>

          <div className="bg-white p-5 rounded-2xl border border-[#e0e3e5] shadow-xs flex items-center justify-between">
            <div>
              <span className="font-['Inter'] text-[12px] text-[#75777e] uppercase font-semibold">
                Contatos / Mensagens
              </span>
              <h4 className="font-['Plus_Jakarta_Sans'] font-bold text-[24px] text-[#191c1e] mt-1">
                {contatos.length}
              </h4>
            </div>
            <div className="w-11 h-11 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center">
              <span className="material-symbols-outlined text-[24px]">chat</span>
            </div>
          </div>

          <div className="bg-white p-5 rounded-2xl border border-[#e0e3e5] shadow-xs flex items-center justify-between">
            <div>
              <span className="font-['Inter'] text-[12px] text-[#75777e] uppercase font-semibold">
                Status da Base
              </span>
              <h4 className="font-['Plus_Jakarta_Sans'] font-bold text-[16px] text-emerald-700 mt-1 flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse"></span>
                Firestore Ativo
              </h4>
            </div>
            <div className="w-11 h-11 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center">
              <span className="material-symbols-outlined text-[24px]">cloud_sync</span>
            </div>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="flex items-center gap-3 border-b border-[#e0e3e5] pb-2">
          <button
            onClick={() => {
              setActiveTab('analises');
              setSelectedAnalysis(null);
            }}
            className={`px-4 py-2 rounded-lg font-['Inter'] text-[14px] font-semibold flex items-center gap-2 transition-all ${
              activeTab === 'analises'
                ? 'bg-[#0d1c32] text-white shadow-xs'
                : 'bg-white text-[#44474d] hover:bg-[#eceef0] border border-[#e0e3e5]'
            }`}
          >
            <span className="material-symbols-outlined text-[18px]">policy</span>
            <span>Solicitações de Análise Documental ({analises.length})</span>
          </button>

          <button
            onClick={() => {
              setActiveTab('contatos');
              setSelectedAnalysis(null);
            }}
            className={`px-4 py-2 rounded-lg font-['Inter'] text-[14px] font-semibold flex items-center gap-2 transition-all ${
              activeTab === 'contatos'
                ? 'bg-[#0d1c32] text-white shadow-xs'
                : 'bg-white text-[#44474d] hover:bg-[#eceef0] border border-[#e0e3e5]'
            }`}
          >
            <span className="material-symbols-outlined text-[18px]">mail</span>
            <span>Mensagens do Formulário de Contato ({contatos.length})</span>
          </button>
        </div>

        {/* Filter & Search Bar */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 bg-white p-4 rounded-2xl border border-[#e0e3e5] shadow-xs">
          <div className="relative flex-1">
            <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-[#75777e] text-[18px]">
              search
            </span>
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Buscar por nome, e-mail, telefone ou detalhes..."
              className="w-full pl-9 pr-3 py-2 rounded-xl border border-[#e0e3e5] font-['Inter'] text-[13px] focus:outline-none focus:ring-2 focus:ring-[#264191]"
            />
          </div>

          {activeTab === 'analises' && (
            <div className="flex items-center gap-2">
              <span className="font-['Inter'] text-[12.5px] text-[#75777e] font-medium whitespace-nowrap">
                Filtrar Status:
              </span>
              <select
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
                className="py-2 px-3 rounded-xl border border-[#e0e3e5] font-['Inter'] text-[13px] bg-white focus:outline-none focus:ring-2 focus:ring-[#264191]"
              >
                <option value="todos">Todos os Status</option>
                <option value="pendente">Pendente de Triagem</option>
                <option value="em_analise">Em Análise Técnica</option>
                <option value="retificacao_necessaria">Retificação Necessária</option>
                <option value="aprovado">Documento Consistente</option>
                <option value="concluido">Concluído</option>
              </select>
            </div>
          )}
        </div>

        {/* Tab 1: Analysis Requests */}
        {activeTab === 'analises' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
            {/* List (7 cols) */}
            <div className="lg:col-span-7 flex flex-col gap-3">
              {filteredAnalises.length === 0 ? (
                <div className="bg-white rounded-2xl p-12 text-center border border-[#e0e3e5] text-[#75777e]">
                  <span className="material-symbols-outlined text-[40px] text-[#c5c6cd] mb-2">
                    inbox
                  </span>
                  <p className="font-['Inter'] text-[14px]">Nenhuma solicitação encontrada no banco de dados.</p>
                </div>
              ) : (
                filteredAnalises.map((item) => {
                  const isSelected = selectedAnalysis?.id === item.id;
                  return (
                    <div
                      key={item.id}
                      onClick={() => {
                        setSelectedAnalysis(item);
                        setAdminNotes(item.adminNotes || '');
                      }}
                      className={`bg-white rounded-2xl p-5 border transition-all cursor-pointer flex flex-col gap-3 ${
                        isSelected
                          ? 'border-[#264191] ring-2 ring-[#264191]/20 shadow-md'
                          : 'border-[#e0e3e5] hover:border-[#c5c6cd] shadow-xs'
                      }`}
                    >
                      <div className="flex items-start justify-between gap-2">
                        <div>
                          <div className="flex items-center gap-2">
                            <span className="font-['Plus_Jakarta_Sans'] font-bold text-[16px] text-[#191c1e]">
                              {item.fullName}
                            </span>
                            {item.urgency === 'prioritaria' && (
                              <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-amber-100 text-amber-800">
                                ⚡ PRIORITÁRIO 24H
                              </span>
                            )}
                          </div>
                          <span className="font-['Inter'] text-[12px] text-[#75777e]">
                            Enviado em: {formatDate(item.createdAt)}
                          </span>
                        </div>

                        <span
                          className={`px-2.5 py-1 rounded-full text-[11px] font-semibold font-mono capitalize ${
                            item.status === 'pendente'
                              ? 'bg-amber-100 text-amber-800'
                              : item.status === 'em_analise'
                              ? 'bg-blue-100 text-blue-800'
                              : item.status === 'retificacao_necessaria'
                              ? 'bg-rose-100 text-rose-800'
                              : item.status === 'aprovado'
                              ? 'bg-emerald-100 text-emerald-800'
                              : 'bg-slate-100 text-slate-800'
                          }`}
                        >
                          {item.status.replace('_', ' ')}
                        </span>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-[13px] text-[#44474d]">
                        <div className="flex items-center gap-1.5">
                          <span className="material-symbols-outlined text-[16px] text-[#264191]">phone</span>
                          <span>{item.phone}</span>
                        </div>
                        <div className="flex items-center gap-1.5">
                          <span className="material-symbols-outlined text-[16px] text-[#264191]">mail</span>
                          <span className="truncate">{item.email}</span>
                        </div>
                      </div>

                      <div className="flex items-center justify-between text-[12px] pt-2 border-t border-[#f2f4f6]">
                        <span className="font-['Inter'] text-[#264191] font-semibold flex items-center gap-1">
                          <span className="material-symbols-outlined text-[15px]">flag</span>
                          {item.objective}
                        </span>
                        <span className="font-mono text-[#75777e] flex items-center gap-1">
                          <span className="material-symbols-outlined text-[15px]">description</span>
                          {item.certType ? item.certType.replace('_', ' ') : 'Certidão'}
                        </span>
                      </div>
                    </div>
                  );
                })
              )}
            </div>

            {/* Detail & Analysis Workspace (5 cols) */}
            <div className="lg:col-span-5 bg-white rounded-2xl p-6 border border-[#e0e3e5] shadow-xs sticky top-24">
              {selectedAnalysis ? (
                <div className="flex flex-col gap-5">
                  <div className="flex items-start justify-between border-b border-[#f2f4f6] pb-4">
                    <div>
                      <span className="font-mono text-[11px] text-[#264191] font-bold uppercase">
                        PARECER & GESTÃO DA TRIAGEM
                      </span>
                      <h3 className="font-['Plus_Jakarta_Sans'] font-bold text-[18px] text-[#191c1e]">
                        {selectedAnalysis.fullName}
                      </h3>
                      <span className="text-[12px] text-[#75777e]">
                        Enviado em {formatDate(selectedAnalysis.createdAt)}
                      </span>
                    </div>

                    <button
                      onClick={() => handleDeleteAnalysis(selectedAnalysis.id!)}
                      className="p-1.5 rounded text-rose-600 hover:bg-rose-50 transition-colors"
                      title="Excluir Registro"
                    >
                      <span className="material-symbols-outlined text-[20px]">delete</span>
                    </button>
                  </div>

                  {/* Direct Contact Actions */}
                  <div className="flex items-center gap-2">
                    <a
                      href={`https://wa.me/55${selectedAnalysis.phone.replace(/\D/g, '')}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-1 py-2 px-3 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white font-['Inter'] text-[12.5px] font-semibold flex items-center justify-center gap-1.5 transition-colors"
                    >
                      <span className="material-symbols-outlined text-[16px]">chat</span>
                      <span>Chamar no WhatsApp</span>
                    </a>
                    <a
                      href={`mailto:${selectedAnalysis.email}?subject=Análise Lexdocs - Retorno Registral`}
                      className="flex-1 py-2 px-3 rounded-lg bg-[#0d1c32] hover:bg-[#264191] text-white font-['Inter'] text-[12.5px] font-semibold flex items-center justify-center gap-1.5 transition-colors"
                    >
                      <span className="material-symbols-outlined text-[16px]">mail</span>
                      <span>Enviar E-mail</span>
                    </a>
                  </div>

                  {/* Structured Details */}
                  <div className="bg-[#f7f9fb] p-3.5 rounded-xl border border-[#e0e3e5] text-[13px] flex flex-col gap-2">
                    {selectedAnalysis.originRegistry && (
                      <div>
                        <strong className="text-[#191c1e] block text-[12px]">Cartório Informado:</strong>
                        <span className="text-[#44474d]">{selectedAnalysis.originRegistry}</span>
                      </div>
                    )}
                    <div>
                      <strong className="text-[#191c1e] block text-[12px]">Descrição / Divergências:</strong>
                      <p className="text-[#44474d] leading-relaxed whitespace-pre-wrap mt-0.5">
                        {selectedAnalysis.details || 'Nenhum detalhe adicional fornecido.'}
                      </p>
                    </div>
                  </div>

                  {/* Attached Documents for Analysis */}
                  {selectedAnalysis.documents && selectedAnalysis.documents.length > 0 && (
                    <div className="p-3.5 bg-amber-50/70 rounded-xl border border-amber-200 text-[13px] flex flex-col gap-2.5">
                      <div className="flex items-center justify-between">
                        <strong className="text-[#191c1e] flex items-center gap-1.5 text-[12.5px]">
                          <span className="material-symbols-outlined text-rose-600 text-[18px]">
                            picture_as_pdf
                          </span>
                          <span>Arquivos em PDF / Certidões ({selectedAnalysis.documents.length})</span>
                        </strong>
                        <span className="text-[11px] font-mono text-amber-900 bg-amber-100 px-2 py-0.5 rounded">
                          Disponível para Análise
                        </span>
                      </div>

                      <div className="flex flex-col gap-2">
                        {selectedAnalysis.documents.map((doc, idx) => (
                          <div
                            key={doc.id || idx}
                            className="bg-white p-2.5 rounded-lg border border-amber-200/80 flex items-center justify-between gap-2 shadow-2xs"
                          >
                            <div className="flex items-center gap-2 min-w-0">
                              <span className="material-symbols-outlined text-rose-600 text-[20px] shrink-0">
                                description
                              </span>
                              <div className="min-w-0">
                                <p className="font-semibold text-[#191c1e] truncate text-[12.5px] max-w-[180px] sm:max-w-xs">
                                  {doc.name}
                                </p>
                                <p className="text-[11px] text-[#75777e]">
                                  {formatFileSize(doc.size)}
                                </p>
                              </div>
                            </div>

                            <div className="flex items-center gap-1.5 shrink-0">
                              <button
                                onClick={() => setPreviewDoc(doc)}
                                className="px-2.5 py-1 rounded-md bg-[#0d1c32] hover:bg-[#264191] text-white text-[11.5px] font-medium transition-colors flex items-center gap-1"
                              >
                                <span className="material-symbols-outlined text-[14px]">visibility</span>
                                <span>Visualizar</span>
                              </button>
                              <button
                                onClick={() => triggerDownload(doc)}
                                className="p-1 rounded-md bg-[#eceef0] hover:bg-[#e0e3e5] text-[#191c1e] text-[11.5px] transition-colors"
                                title="Baixar documento"
                              >
                                <span className="material-symbols-outlined text-[16px]">download</span>
                              </button>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Status update selector */}
                  <div className="flex flex-col gap-1.5">
                    <label className="text-[12.5px] font-semibold text-[#191c1e]">
                      Atualizar Status da Triagem:
                    </label>
                    <select
                      value={selectedAnalysis.status}
                      onChange={(e) => handleStatusChange(selectedAnalysis.id!, e.target.value as any)}
                      className="py-2 px-3 rounded-lg border border-[#e0e3e5] text-[13px] font-['Inter'] bg-white focus:ring-2 focus:ring-[#264191]"
                    >
                      <option value="pendente">Pendente de Triagem</option>
                      <option value="em_analise">Em Análise Técnica</option>
                      <option value="retificacao_necessaria">Retificação Necessária (Art. 110)</option>
                      <option value="aprovado">Documento Consistente / Regular</option>
                      <option value="concluido">Processo Concluído</option>
                    </select>
                  </div>

                  {/* Admin notes textarea */}
                  <div className="flex flex-col gap-1.5">
                    <label className="text-[12.5px] font-semibold text-[#191c1e]">
                      Anotações Técnicas do Analista (Interno):
                    </label>
                    <textarea
                      rows={3}
                      value={adminNotes}
                      onChange={(e) => setAdminNotes(e.target.value)}
                      placeholder="Ex: Identificada divergência no nome da avó na folha 42 do livro A-12..."
                      className="p-2.5 rounded-lg border border-[#e0e3e5] text-[13px] font-['Inter'] focus:ring-2 focus:ring-[#264191]"
                    />
                    <button
                      onClick={handleSaveNotes}
                      disabled={isSaving}
                      className="self-end px-4 py-1.5 rounded-lg bg-[#0d1c32] hover:bg-[#264191] text-white text-[12px] font-semibold transition-colors flex items-center gap-1"
                    >
                      <span className="material-symbols-outlined text-[16px]">save</span>
                      <span>Salvar Anotações</span>
                    </button>
                  </div>
                </div>
              ) : (
                <div className="py-16 text-center text-[#75777e] flex flex-col items-center gap-2">
                  <span className="material-symbols-outlined text-[36px] text-[#c5c6cd]">
                    touch_app
                  </span>
                  <p className="text-[13.5px]">
                    Selecione uma solicitação ao lado para gerenciar o status e emitir o parecer da triagem.
                  </p>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Tab 2: Contact Leads */}
        {activeTab === 'contatos' && (
          <div className="flex flex-col gap-4">
            {filteredContatos.length === 0 ? (
              <div className="bg-white rounded-2xl p-12 text-center border border-[#e0e3e5] text-[#75777e]">
                <span className="material-symbols-outlined text-[40px] text-[#c5c6cd] mb-2">
                  mail
                </span>
                <p className="font-['Inter'] text-[14px]">Nenhuma mensagem recebida no formulário de contato.</p>
              </div>
            ) : (
              filteredContatos.map((lead) => (
                <div
                  key={lead.id}
                  className="bg-white rounded-2xl p-6 border border-[#e0e3e5] shadow-xs flex flex-col gap-4"
                >
                  <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 border-b border-[#f2f4f6] pb-3">
                    <div>
                      <div className="flex items-center gap-2">
                        <h4 className="font-['Plus_Jakarta_Sans'] font-bold text-[16px] text-[#191c1e]">
                          {lead.nome}
                        </h4>
                        <span className="px-2 py-0.5 rounded text-[11px] font-mono font-semibold bg-[#eceef0] text-[#264191]">
                          Assunto: {lead.assunto}
                        </span>
                        {lead.documentos && lead.documentos.length > 0 && (
                          <span className="px-2 py-0.5 rounded text-[11px] font-mono font-semibold bg-rose-50 text-rose-700 border border-rose-200 flex items-center gap-1">
                            <span className="material-symbols-outlined text-[13px]">picture_as_pdf</span>
                            <span>{lead.documentos.length} PDF(s)</span>
                          </span>
                        )}
                      </div>
                      <span className="text-[12px] text-[#75777e]">
                        Enviado em {formatDate(lead.createdAt)}
                      </span>
                    </div>

                    <div className="flex items-center gap-2">
                      <select
                        value={lead.status}
                        onChange={(e) => handleContactStatusChange(lead.id!, e.target.value as any)}
                        className="py-1 px-2.5 rounded-lg border border-[#e0e3e5] text-[12px] font-['Inter'] bg-white focus:ring-2 focus:ring-[#264191]"
                      >
                        <option value="novo">Novo</option>
                        <option value="em_atendimento">Em Atendimento</option>
                        <option value="concluido">Concluído</option>
                        <option value="arquivado">Arquivado</option>
                      </select>

                      <a
                        href={`https://wa.me/55${lead.telefone.replace(/\D/g, '')}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white flex items-center justify-center transition-colors"
                        title="Abrir WhatsApp"
                      >
                        <span className="material-symbols-outlined text-[18px]">chat</span>
                      </a>

                      <button
                        onClick={() => handleDeleteContact(lead.id!)}
                        className="p-1.5 rounded-lg text-[#75777e] hover:text-rose-600 hover:bg-rose-50 transition-colors"
                        title="Excluir mensagem"
                      >
                        <span className="material-symbols-outlined text-[18px]">delete</span>
                      </button>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-[13px] text-[#44474d]">
                    <div>
                      <strong>Telefone:</strong> {lead.telefone}
                    </div>
                    <div>
                      <strong>E-mail:</strong> {lead.email}
                    </div>
                  </div>

                  <div className="p-3.5 bg-[#f7f9fb] rounded-xl border border-[#e0e3e5] text-[13px] text-[#191c1e]">
                    <strong className="block text-[12px] text-[#75777e] mb-1">Mensagem enviada:</strong>
                    <p className="leading-relaxed whitespace-pre-wrap">{lead.mensagem}</p>
                  </div>

                  {/* Attached Documents for Contact Lead */}
                  {lead.documentos && lead.documentos.length > 0 && (
                    <div className="p-3.5 bg-[#f0f4ff] rounded-xl border border-[#c7d7fe] flex flex-col gap-2.5">
                      <div className="flex items-center justify-between">
                        <strong className="text-[#191c1e] text-[12.5px] flex items-center gap-1.5">
                          <span className="material-symbols-outlined text-rose-600 text-[18px]">
                            picture_as_pdf
                          </span>
                          <span>Documentos / Certidões em PDF Anexados ({lead.documentos.length})</span>
                        </strong>
                        <span className="text-[11px] font-mono text-[#264191] bg-white px-2 py-0.5 rounded border border-[#c7d7fe]">
                          Salvo no Firebase
                        </span>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                        {lead.documentos.map((doc, idx) => (
                          <div
                            key={doc.id || idx}
                            className="bg-white p-2.5 rounded-lg border border-[#e0e3e5] flex items-center justify-between gap-2 shadow-2xs"
                          >
                            <div className="flex items-center gap-2 min-w-0">
                              <span className="material-symbols-outlined text-rose-600 text-[20px] shrink-0">
                                picture_as_pdf
                              </span>
                              <div className="min-w-0">
                                <p className="font-semibold text-[#191c1e] truncate text-[12.5px] max-w-[140px] sm:max-w-[180px]">
                                  {doc.name}
                                </p>
                                <p className="text-[11px] text-[#75777e]">
                                  {formatFileSize(doc.size)}
                                </p>
                              </div>
                            </div>

                            <div className="flex items-center gap-1 shrink-0">
                              <button
                                onClick={() => setPreviewDoc(doc)}
                                className="px-2.5 py-1 rounded-md bg-[#0d1c32] hover:bg-[#264191] text-white text-[11.5px] font-medium transition-colors flex items-center gap-1"
                                title="Visualizar documento em tela cheia"
                              >
                                <span className="material-symbols-outlined text-[14px]">visibility</span>
                                <span>Visualizar</span>
                              </button>
                              <button
                                onClick={() => triggerDownload(doc)}
                                className="p-1 rounded-md bg-[#eceef0] hover:bg-[#e0e3e5] text-[#191c1e] text-[11.5px] transition-colors"
                                title="Baixar PDF original"
                              >
                                <span className="material-symbols-outlined text-[16px]">download</span>
                              </button>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              ))
            )}
          </div>
        )}
      </div>

      {/* PDF & Document Full-screen Preview Modal */}
      <PdfPreviewModal
        isOpen={!!previewDoc}
        onClose={() => setPreviewDoc(null)}
        document={previewDoc}
      />
    </div>
  );
};
