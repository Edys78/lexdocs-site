/**
 * Utilitários para processamento de arquivos sem limites de tamanho,
 * com compressão inteligente de imagens para manter legibilidade máxima
 * e leitura completa de arquivos PDF.
 */

export interface ProcessedDocument {
  id: string;
  name: string;
  size: number;
  type: string;
  dataUrl: string;
  uploadedAt: string;
}

/**
 * Redimensiona e otimiza imagens (JPG, PNG, WebP) mantendo nitidez de textos
 * para documentos e certidões cartorárias.
 */
export async function optimizeImageFile(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const img = new Image();
    const reader = new FileReader();

    reader.onload = (e) => {
      img.src = e.target?.result as string;
    };

    reader.onerror = (err) => reject(err);

    img.onload = () => {
      const MAX_DIMENSION = 2000; // Resolução suficiente para ler letras miúdas de certidões
      let width = img.width;
      let height = img.height;

      if (width > MAX_DIMENSION || height > MAX_DIMENSION) {
        if (width > height) {
          height = Math.round((height * MAX_DIMENSION) / width);
          width = MAX_DIMENSION;
        } else {
          width = Math.round((width * MAX_DIMENSION) / height);
          height = MAX_DIMENSION;
        }
      }

      const canvas = document.createElement('canvas');
      canvas.width = width;
      canvas.height = height;

      const ctx = canvas.getContext('2d');
      if (!ctx) {
        // Fallback para o base64 original se canvas falhar
        resolve(img.src);
        return;
      }

      // Preenchimento de fundo branco para evitar transparências pretas em conversões PNG -> JPEG
      ctx.fillStyle = '#FFFFFF';
      ctx.fillRect(0, 0, width, height);
      ctx.drawImage(img, 0, 0, width, height);

      // Exportar como JPEG de alta qualidade (0.88 preserva traços de carimbos e assinaturas)
      const dataUrl = canvas.toDataURL('image/jpeg', 0.88);
      resolve(dataUrl);
    };

    img.onerror = () => {
      // Fallback para leitura direta
      const fallbackReader = new FileReader();
      fallbackReader.onload = () => resolve(fallbackReader.result as string);
      fallbackReader.onerror = (err) => reject(err);
      fallbackReader.readAsDataURL(file);
    };

    reader.readAsDataURL(file);
  });
}

/**
 * Lê arquivo PDF ou outros formatos diretamente como base64 sem limite de tamanho.
 */
export async function readFileAsDataUrl(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = (err) => reject(err);
    reader.readAsDataURL(file);
  });
}

/**
 * Processa qualquer arquivo (PDF ou Imagem) sem limites artificiais de tamanho.
 */
export async function processUploadFile(file: File): Promise<ProcessedDocument> {
  const isImage = file.type.startsWith('image/');
  let dataUrl = '';

  if (isImage) {
    try {
      dataUrl = await optimizeImageFile(file);
    } catch {
      dataUrl = await readFileAsDataUrl(file);
    }
  } else {
    dataUrl = await readFileAsDataUrl(file);
  }

  return {
    id: `doc_${Date.now()}_${Math.random().toString(36).substring(2, 8)}`,
    name: file.name,
    size: file.size,
    type: file.type || (file.name.toLowerCase().endsWith('.pdf') ? 'application/pdf' : 'application/octet-stream'),
    dataUrl,
    uploadedAt: new Date().toISOString(),
  };
}
