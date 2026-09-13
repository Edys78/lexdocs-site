import { 
  collection, 
  addDoc, 
  setDoc,
  getDocs, 
  getDoc,
  doc, 
  updateDoc, 
  deleteDoc, 
  query, 
  orderBy, 
  serverTimestamp,
  Timestamp 
} from 'firebase/firestore';
import { db } from './firebase';

export interface LeadContact {
  id?: string;
  nome: string;
  email: string;
  telefone?: string;
  assunto: string;
  mensagem: string;
  origem: string;
  documentos?: Array<{
    id: string;
    name: string;
    size: number;
    type: string;
    dataUrl?: string;
    uploadedAt: string;
  }>;
  status: 'novo' | 'em_atendimento' | 'concluido' | 'arquivado';
  adminNotes?: string;
  createdAt?: Timestamp | Date | any;
}

export interface DocumentAnalysisRequest {
  id?: string;
  fullName: string;
  email: string;
  phone?: string;
  certType?: string;
  objective: string;
  originRegistry?: string;
  details: string;
  urgency: 'padrao' | 'prioritaria';
  status: 'pendente' | 'em_analise' | 'aprovado' | 'retificacao_necessaria' | 'concluido';
  adminNotes?: string;
  documents?: Array<{
    id: string;
    name: string;
    size: number;
    type: string;
    dataUrl?: string;
    uploadedAt: string;
  }>;
  createdAt?: Timestamp | Date | any;
  updatedAt?: Timestamp | Date | any;
}

export interface TrackingClickEvent {
  id?: string;
  tipo: 'whatsapp_click' | 'email_click' | 'button_cta' | 'page_view';
  detalhe?: string;
  pagina?: string;
  data: string;
  createdAt?: any;
}

// 1. Salvar Contato do Formulário de Contato com suporte a qualquer quantidade e tamanho de anexos
export async function saveContactLead(data: Omit<LeadContact, 'status' | 'createdAt'>): Promise<string> {
  try {
    const colRef = collection(db, 'contatos');
    const { documentos, ...restData } = data;

    // Calcular tamanho total aproximado dos anexos
    const totalDataSize = (documentos || []).reduce((acc, d) => acc + (d.dataUrl?.length || 0), 0);

    // Se o tamanho total for pequeno (< 500KB), mantemos o dataUrl diretamente no documento para performance
    const isUnderLimit = totalDataSize < 500 * 1024;

    // Metadados dos documentos para o documento principal
    const docsMetadata = (documentos || []).map(docItem => ({
      id: docItem.id,
      name: docItem.name,
      size: docItem.size,
      type: docItem.type,
      uploadedAt: docItem.uploadedAt,
      ...(isUnderLimit ? { dataUrl: docItem.dataUrl } : {})
    }));

    const docRef = await addDoc(colRef, {
      ...restData,
      telefone: restData.telefone || '',
      documentos: docsMetadata,
      status: 'novo',
      createdAt: serverTimestamp()
    });

    // Se houver arquivos e o tamanho total for maior, gravamos cada arquivo na subcoleção individualmente
    if (documentos && documentos.length > 0 && !isUnderLimit) {
      for (const docItem of documentos) {
        if (docItem.dataUrl) {
          const fileDocRef = doc(db, 'contatos', docRef.id, 'arquivos', docItem.id);
          await setDoc(fileDocRef, {
            id: docItem.id,
            name: docItem.name,
            size: docItem.size,
            type: docItem.type,
            dataUrl: docItem.dataUrl,
            uploadedAt: docItem.uploadedAt,
            createdAt: serverTimestamp()
          });
        }
      }
    }

    return docRef.id;
  } catch (error) {
    console.error('Erro ao salvar contato no Firebase:', error);
    throw error;
  }
}

// 1.1 Buscar arquivo específico de um contato (caso armazenado em subcoleção)
export async function fetchContactFile(contactId: string, fileId: string): Promise<string | null> {
  try {
    const fileRef = doc(db, 'contatos', contactId, 'arquivos', fileId);
    const snap = await getDoc(fileRef);
    if (snap.exists()) {
      return snap.data()?.dataUrl || null;
    }
    return null;
  } catch (err) {
    console.error('Erro ao buscar arquivo da subcoleção:', err);
    return null;
  }
}

// 2. Salvar Solicitação de Análise Documental (Texto e Dados Estruturados no Firestore)
export async function saveAnalysisRequest(
  data: Omit<DocumentAnalysisRequest, 'status' | 'createdAt' | 'updatedAt'>
): Promise<string> {
  try {
    const colRef = collection(db, 'solicitacoes_analise');
    const docRef = await addDoc(colRef, {
      ...data,
      phone: data.phone || '',
      status: 'pendente',
      adminNotes: '',
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp()
    });
    return docRef.id;
  } catch (error) {
    console.error('Erro ao salvar solicitação de análise no Firebase:', error);
    throw error;
  }
}

// 3. Registrar Eventos de Cliques (WhatsApp, Botões de Conversão, etc)
export async function recordInteractionEvent(event: TrackingClickEvent): Promise<void> {
  try {
    const colRef = collection(db, 'interacoes_cliques');
    await addDoc(colRef, {
      ...event,
      createdAt: serverTimestamp()
    });
  } catch (error) {
    console.warn('Registro de clique silencioso falhou:', error);
  }
}

// 4. Listar todas as solicitações de análise (para o Painel do Analista / Admin)
export async function fetchAllAnalysisRequests(): Promise<DocumentAnalysisRequest[]> {
  try {
    const colRef = collection(db, 'solicitacoes_analise');
    const q = query(colRef, orderBy('createdAt', 'desc'));
    const snapshot = await getDocs(q);
    return snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    })) as DocumentAnalysisRequest[];
  } catch (error) {
    console.error('Erro ao buscar solicitações com ordenação, buscando direto:', error);
    const colRef = collection(db, 'solicitacoes_analise');
    const snapshot = await getDocs(colRef);
    return snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    })) as DocumentAnalysisRequest[];
  }
}

// 5. Listar contatos recebidos
export async function fetchAllContacts(): Promise<LeadContact[]> {
  try {
    const colRef = collection(db, 'contatos');
    const q = query(colRef, orderBy('createdAt', 'desc'));
    const snapshot = await getDocs(q);
    return snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    })) as LeadContact[];
  } catch (error) {
    console.error('Erro ao buscar contatos:', error);
    const colRef = collection(db, 'contatos');
    const snapshot = await getDocs(colRef);
    return snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    })) as LeadContact[];
  }
}

// 6. Atualizar status e notas de uma análise
export async function updateAnalysisStatus(
  id: string, 
  status: DocumentAnalysisRequest['status'],
  adminNotes?: string
): Promise<void> {
  try {
    const docRef = doc(db, 'solicitacoes_analise', id);
    await updateDoc(docRef, {
      status,
      ...(adminNotes !== undefined ? { adminNotes } : {}),
      updatedAt: serverTimestamp()
    });
  } catch (error) {
    console.error('Erro ao atualizar status:', error);
    throw error;
  }
}

// 7. Atualizar status de contato
export async function updateContactStatus(id: string, status: LeadContact['status'], adminNotes?: string): Promise<void> {
  try {
    const docRef = doc(db, 'contatos', id);
    await updateDoc(docRef, { 
      status,
      ...(adminNotes !== undefined ? { adminNotes } : {})
    });
  } catch (error) {
    console.error('Erro ao atualizar contato:', error);
    throw error;
  }
}

// 8. Excluir contato
export async function deleteContactLead(id: string): Promise<void> {
  try {
    const docRef = doc(db, 'contatos', id);
    await deleteDoc(docRef);
  } catch (error) {
    console.error('Erro ao excluir contato:', error);
    throw error;
  }
}

// 9. Excluir solicitação
export async function deleteAnalysisRequest(id: string): Promise<void> {
  try {
    const docRef = doc(db, 'solicitacoes_analise', id);
    await deleteDoc(docRef);
  } catch (error) {
    console.error('Erro ao excluir análise:', error);
    throw error;
  }
}
