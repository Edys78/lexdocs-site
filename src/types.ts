export type PageRoute = 'inicio' | 'sobre' | 'servicos' | 'faq' | 'contato' | 'solicitar-analise' | 'admin-painel';

export type FaqCategory = 'all' | 'triagem' | 'certidoes' | 'retificacoes' | 'seguranca' | 'institucional';

export interface FaqItem {
  id: string;
  category: FaqCategory;
  tag: string;
  question: string;
  answer: string;
  highlight?: string;
  items?: string[];
  cards?: { title: string; subtitle: string; desc: string }[];
  steps?: { num: number; title: string; desc: string }[];
  keywords: string[];
}

export interface ServiceItem {
  id: string;
  title: string;
  subtitle: string;
  category: string;
  description: string;
  icon: string;
  deliverables: string[];
  normativeBase: string;
  sla: string;
}

export interface StrategicPillar {
  id: string;
  badge: string;
  title: string;
  description: string;
  subLinkText: string;
  isDark?: boolean;
}

export interface PracticalCommitment {
  id: string;
  title: string;
  description: string;
  icon: string;
}

export interface WorkPhase {
  phaseNumber: string;
  icon: string;
  title: string;
  description: string;
  statusBadge: string;
}

export interface AnalysisRequest {
  id?: string;
  fullName: string;
  email: string;
  phone: string;
  certType: 'nascimento' | 'casamento' | 'obito' | 'pasta_completa' | 'outro';
  objective: 'retificacao_erro' | 'cidadania_italiana' | 'cidadania_portuguesa' | 'inventario' | 'casamento' | 'outros';
  originRegistry: string;
  details: string;
  urgency: 'padrao' | 'prioritario';
  filesCount: number;
}
