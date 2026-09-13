import React from 'react';

interface PdfPreviewModalProps {
  isOpen: boolean;
  onClose: () => void;
  document: {
    name: string;
    size?: number;
    type?: string;
    dataUrl?: string;
  } | null;
}

export const PdfPreviewModal: React.FC<PdfPreviewModalProps> = ({
  isOpen,
  onClose,
  document,
}) => {
  if (!isOpen || !document) return null;

  const formatSize = (bytes?: number) => {
    if (!bytes) return '';
    if (bytes < 1024) return `${bytes} B`;
    if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
    return `${(bytes / (1024 * 1024)).toFixed(2)} MB`;
  };

  const handleDownload = () => {
    if (!document.dataUrl) return;
    const a = window.document.createElement('a');
    a.href = document.dataUrl;
    a.download = document.name || 'documento.pdf';
    window.document.body.appendChild(a);
    a.click();
    window.document.body.removeChild(a);
  };

  const isPdf = document.type?.includes('pdf') || document.name.toLowerCase().endsWith('.pdf') || document.dataUrl?.startsWith('data:application/pdf');

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-xs">
      <div 
        className="bg-white rounded-2xl w-full max-w-4xl max-h-[90vh] flex flex-col shadow-2xl overflow-hidden border border-[#e0e3e5]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="p-4 sm:p-5 border-b border-[#e0e3e5] flex items-center justify-between bg-[#0d1c32] text-white">
          <div className="flex items-center gap-3 min-w-0">
            <span className="material-symbols-outlined text-[#eec14b] text-[28px] shrink-0">
              {isPdf ? 'picture_as_pdf' : 'description'}
            </span>
            <div className="min-w-0">
              <h3 className="font-['Plus_Jakarta_Sans'] font-bold text-[16px] truncate text-white">
                {document.name}
              </h3>
              <p className="text-[12px] text-[#c5c6cd]">
                {document.type || 'Documento PDF'} {document.size ? `• ${formatSize(document.size)}` : ''}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleDownload}
              className="px-3 py-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-white text-[13px] font-medium transition-colors flex items-center gap-1.5 border border-white/20"
              title="Baixar arquivo original"
            >
              <span className="material-symbols-outlined text-[18px]">download</span>
              <span className="hidden sm:inline">Baixar</span>
            </button>

            <button
              onClick={onClose}
              className="p-1.5 rounded-lg text-white/80 hover:text-white hover:bg-white/10 transition-colors"
              title="Fechar visualizador"
            >
              <span className="material-symbols-outlined text-[24px]">close</span>
            </button>
          </div>
        </div>

        {/* Content Viewer */}
        <div className="flex-1 p-4 bg-[#f2f4f6] overflow-auto flex items-center justify-center min-h-[400px]">
          {document.dataUrl ? (
            isPdf ? (
              <iframe
                src={`${document.dataUrl}#toolbar=1&navpanes=0`}
                title={document.name}
                className="w-full h-[65vh] rounded-xl border border-[#e0e3e5] bg-white shadow-inner"
              />
            ) : (
              <img
                src={document.dataUrl}
                alt={document.name}
                className="max-w-full max-h-[65vh] object-contain rounded-xl border border-[#e0e3e5] shadow-sm bg-white"
              />
            )
          ) : (
            <div className="text-center p-8 text-[#75777e] flex flex-col items-center gap-2">
              <span className="material-symbols-outlined text-[48px] text-[#c5c6cd]">
                error_outline
              </span>
              <p className="text-[14px]">Pré-visualização não disponível diretamente neste formato.</p>
              <button
                onClick={handleDownload}
                className="mt-2 px-4 py-2 bg-[#0d1c32] text-white text-[13px] rounded-lg font-semibold hover:bg-[#264191]"
              >
                Baixar Arquivo
              </button>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-3.5 bg-white border-t border-[#e0e3e5] flex items-center justify-between text-[12px] text-[#75777e]">
          <span>Lexdocs Gestão Registral & Triagem Documental</span>
          <button
            onClick={onClose}
            className="px-4 py-1.5 rounded-lg bg-[#eceef0] hover:bg-[#e0e3e5] text-[#191c1e] font-semibold transition-colors"
          >
            Fechar
          </button>
        </div>
      </div>
    </div>
  );
};
