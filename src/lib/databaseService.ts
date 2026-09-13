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
  duvida?: string;
  assunto?: string;
  mensagem?: string;
  origem?: string;
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

// 1. Salvar Dúvida / Contato na coleção 'duvidas' do Firestore usando o SDK Modular
export async function saveContactLead(data: Omit<LeadContact, 'status' | 'createdAt'>): Promise<string> {
  try {
    const colRef = collection(db, 'duvidas');
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

    const duvidaText = restData.duvida || restData.mensagem || '';

    const docRef = await addDoc(colRef, {
      nome: restData.nome,
      telefone: restData.telefone || '',
      email: restData.email,
      duvida: duvidaText,
      mensagem: duvidaText,
      assunto: restData.assunto || 'Dúvida Geral',
      origem: restData.origem || 'formulario_contato',
      documentos: docsMetadata,
      status: 'novo',
      createdAt: serverTimestamp()
    });

    // Se houver arquivos e o tamanho total for maior, gravamos cada arquivo na subcoleção individualmente
    if (documentos && documentos.length > 0 && !isUnderLimit) {
      for (const docItem of documentos) {
        if (docItem.dataUrl) {
          const fileDocRef = doc(db, 'duvidas', docRef.id, 'arquivos', docItem.id);
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
    console.error('Erro ao salvar dúvida no Firebase:', error);
    throw error;
  }
}

// 1.1 Buscar arquivo específico de uma dúvida (caso armazenado em subcoleção)
export async function fetchContactFile(duvidaId: string, fileId: string): Promise<string | null> {
  try {
    const fileRef = doc(db, 'duvidas', duvidaId, 'arquivos', fileId);
    let snap = await getDoc(fileRef);
    if (snap.exists()) {
      return snap.data()?.dataUrl || null;
    }
    // Fallback para contatos caso venha de coleção legada
    const legacyFileRef = doc(db, 'contatos', duvidaId, 'arquivos', fileId);
    snap = await getDoc(legacyFileRef);
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

// 5. Listar dúvidas e contatos recebidos (para o Painel do Administrador)
export async function fetchAllContacts(): Promise<LeadContact[]> {
  try {
    // Buscar da coleção principal 'duvidas'
    const colRefDuvidas = collection(db, 'duvidas');
    const snapDuvidas = await getDocs(query(colRefDuvidas, orderBy('createdAt', 'desc'))).catch(async () => {
      return await getDocs(colRefDuvidas);
    });

    const duvidasList = snapDuvidas.docs.map(docSnap => {
      const data = docSnap.data();
      return {
        id: docSnap.id,
        nome: data.nome || 'Visitante',
        email: data.email || '',
        telefone: data.telefone || '',
        duvida: data.duvida || data.mensagem || '',
        assunto: data.assunto || 'Dúvida Geral',
        mensagem: data.duvida || data.mensagem || '',
        origem: data.origem || 'duvidas',
        documentos: data.documentos || [],
        status: data.status || 'novo',
        adminNotes: data.adminNotes || '',
        createdAt: data.createdAt
      } as LeadContact;
    });

    // Também buscar de 'contatos' legados se houver
    try {
      const colRefContatos = collection(db, 'contatos');
      const snapContatos = await getDocs(colRefContatos);
      const contatosList = snapContatos.docs
        .filter(d => !duvidasList.some(duv => duv.id === d.id))
        .map(docSnap => {
          const data = docSnap.data();
          return {
            id: docSnap.id,
            nome: data.nome || 'Visitante',
            email: data.email || '',
            telefone: data.telefone || '',
            duvida: data.duvida || data.mensagem || '',
            assunto: data.assunto || 'Contato',
            mensagem: data.mensagem || data.duvida || '',
            origem: data.origem || 'contatos',
            documentos: data.documentos || [],
            status: data.status || 'novo',
            adminNotes: data.adminNotes || '',
            createdAt: data.createdAt
          } as LeadContact;
        });

      return [...duvidasList, ...contatosList];
    } catch {
      return duvidasList;
    }
  } catch (error) {
    console.error('Erro ao buscar dúvidas/contatos:', error);
    return [];
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

// 7. Atualizar status de dúvida ou contato
export async function updateContactStatus(id: string, status: LeadContact['status'], adminNotes?: string): Promise<void> {
  try {
    const duvidaRef = doc(db, 'duvidas', id);
    try {
      await updateDoc(duvidaRef, { 
        status,
        ...(adminNotes !== undefined ? { adminNotes } : {})
      });
      return;
    } catch {
      // Fallback para contatos
      const docRef = doc(db, 'contatos', id);
      await updateDoc(docRef, { 
        status,
        ...(adminNotes !== undefined ? { adminNotes } : {})
      });
    }
  } catch (error) {
    console.error('Erro ao atualizar status do contato:', error);
    throw error;
  }
}

// 8. Excluir dúvida ou contato
export async function deleteContactLead(id: string): Promise<void> {
  try {
    const duvidaRef = doc(db, 'duvidas', id);
    try {
      await deleteDoc(duvidaRef);
    } catch {
      // Fallback
    }
    try {
      const docRef = doc(db, 'contatos', id);
      await deleteDoc(docRef);
    } catch {
      // Ignore
    }
  } catch (error) {
    console.error('Erro ao excluir dúvida:', error);
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
