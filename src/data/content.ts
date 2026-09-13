import { FaqItem, ServiceItem, StrategicPillar, PracticalCommitment, WorkPhase } from '../types';

export const FAQ_DATA: FaqItem[] = [
  {
    id: 'faq-1',
    category: 'certidoes',
    tag: 'Conceito Fundamental',
    question: 'O que é a análise documental técnica?',
    answer: 'Trata-se de um exame minucioso e preventivo realizado sobre assentos do Registro Civil e documentos correlatos. Nosso trabalho confronta rigorosamente grafias de sobrenomes, datas cronológicas de eventos (nascimento, casamento, óbito), averbações prévias e a consistência genealógica entre diferentes gerações de uma mesma linhagem familiar.',
    highlight: 'Finalidade prática: Identificar antinomias, discrepâncias de filiação ou omissões formais antes que o documento seja apresentado a consulados, cartórios para casamentos ou processos de cidadania estrangeira.',
    keywords: ['analise', 'documental', 'tecnica', 'prevencao', 'grafias', 'datas', 'averbacoes', 'registros', 'consistencia', 'genealogica', 'sobrenome', 'certidao']
  },
  {
    id: 'faq-2',
    category: 'certidoes',
    tag: 'Acervo Suportado',
    question: 'Quais tipos de certidões e documentos podem ser analisados?',
    answer: 'Examinamos ampla gama de instrumentos do Registro Civil das Pessoas Naturais e certidões afins, incluindo:',
    items: [
      'Certidões de Nascimento, Casamento e Óbito',
      'Certidões em Inteiro Teor & Reprográficas',
      'Dossiês de Habilitação para Cidadanias',
      'Documentos para Inventários Extrajudiciais'
    ],
    keywords: ['tipos', 'certidoes', 'documentos', 'nascimento', 'casamento', 'obito', 'inteiro teor', 'reprografica', 'cidadania', 'inventarios', 'matriculas']
  },
  {
    id: 'faq-3',
    category: 'institucional',
    tag: 'Transparência Regulamentar',
    question: 'A Lexdocs é um escritório de advocacia?',
    answer: 'Não. A Lexdocs opera exclusivamente no ramo de consultoria, organização e análise técnica e administrativa documental perante órgãos registrais. Nossos relatórios constituem laudos de conformidade material e estrutural de assentos. Não exercemos representação judicial, sustentação forense nem prestamos assessoria jurídica privativa regulada pela Lei Federal nº 8.906/1994 (Estatuto da OAB). Quando uma retificação exigir via judicial contenciosa ou intervenção de advogado habilitado, emitimos a orientação técnica para que o requerente contrate o causídico de sua confiança.',
    keywords: ['escritorio', 'advocacia', 'atuacao', 'tecnica', 'administrativa', 'cartorio', 'oab', 'lei 8906', 'extrajudicial', 'advogado']
  },
  {
    id: 'faq-4',
    category: 'triagem',
    tag: 'Custos & Orçamentos',
    question: 'A triagem preliminar tem algum custo inicial?',
    answer: 'A recepção primária dos arquivos e a conferência sumária de viabilidade técnica são realizadas sem qualquer compromisso financeiro. Após confirmar a legibilidade e o escopo documental, emitimos um parecer prévio informando a viabilidade de retificação ou auditoria e apresentamos uma proposta de honorários clara, com tabela discriminada por documento, prazos acordados e sem cobranças ocultas.',
    keywords: ['triagem', 'preliminar', 'custo', 'inicial', 'gratis', 'orcamento', 'viabilidade', 'proposta', 'financeira', 'sem compromisso', 'valor', 'preco']
  },
  {
    id: 'faq-5',
    category: 'triagem',
    tag: 'Prazos de Entrega',
    question: 'Qual é o prazo médio de retorno da análise?',
    answer: 'Nossos prazos são estruturados de acordo com o grau de aprofundamento do exame:',
    cards: [
      {
        title: 'Triagem Preliminar',
        subtitle: '24h a 48h úteis',
        desc: 'Recebimento, auditoria de legibilidade e parecer inicial de viabilidade registral.'
      },
      {
        title: 'Dossiê Completo / Minuta',
        subtitle: '3 a 7 dias úteis',
        desc: 'Confrontação analítica entre certidões e redação dos requerimentos fundamentados.'
      }
    ],
    keywords: ['prazo', 'medio', 'retorno', 'sla', 'horas', 'dias', 'tempo', 'analise', 'resposta', 'urgencia']
  },
  {
    id: 'faq-6',
    category: 'seguranca',
    tag: 'Conformidade & Proteção de Dados',
    question: 'Como é assegurada a privacidade e sigilo dos meus documentos?',
    answer: 'Adotamos protocolo estrito de governança documental fundado nas diretrizes da LGPD (Lei Federal nº 13.709/2018):',
    items: [
      'Criptografia em trânsito e repouso: Uploads protegidos por certificado TLS 1.3 de ponta a ponta.',
      'Acesso estritamente segregado: Apenas o analista designado para o seu protocolo visualiza o material.',
      'Expurgo definitivo: Findo o ciclo da análise ou após solicitação do titular, os arquivos são descarregados de forma irreversível.'
    ],
    keywords: ['privacidade', 'sigilo', 'lgpd', 'seguranca', 'criptografia', 'protecao', 'dados', 'pessoais', 'lei 13709']
  },
  {
    id: 'faq-7',
    category: 'certidoes',
    tag: 'Envio e Manuseio',
    question: 'Preciso enviar a certidão original física impressa?',
    answer: 'Não é necessário enviar originais físicos. Toda a fase de triagem analítica, elaboração de parecer técnico e redação de requerimentos é operada integralmente sobre reproduções digitalizadas (scans em PDF com 300 DPI ou fotografias nítidas em boa iluminação).',
    highlight: 'Atenção: A certidão em via original física permanece sob sua guarda integral, evitando extravios e despesas postais. Você só apresentará os documentos físicos diretamente ao Oficial de Registro no dia da formalização do protocolo.',
    keywords: ['certidao', 'original', 'fisica', 'correios', 'envio', 'digitalizado', 'pdf', 'scan', 'foto', 'cartorio']
  },
  {
    id: 'faq-8',
    category: 'institucional',
    tag: 'Resultado do Procedimento',
    question: 'A análise documental garante o deferimento ou aprovação automática no cartório?',
    answer: 'Em estrita conformidade com os princípios éticos e a independência funcional conferida aos Oficiais de Registro Civil (Lei 6.015/73 e Lei 8.935/94), nenhuma entidade técnica pode assegurar ou prometer deferimento imediato. O juízo de qualificação registral é privativo do Oficial de Registro ou do Ministério Público. O que a análise técnica da Lexdocs proporciona é a máxima blindagem documental: alinhamos os fundamentos estritamente às normas das Corregedorias Gerais de Justiça e ao Código Nacional de Normas do CNJ, reduzindo a índices mínimos a incidência de notas devolutivas, atrasos desnecessários ou recusas formais.',
    keywords: ['garantia', 'deferimento', 'aprovacao', 'cartorio', 'nota devolutiva', 'registrador', 'autonoma', 'cnj']
  },
  {
    id: 'faq-9',
    category: 'retificacoes',
    tag: 'Minutas & Procedimentos',
    question: 'A Lexdocs faz a retificação da certidão ou apenas elabora o requerimento?',
    answer: 'A alteração material do assentamento é ato registral privativo executado pelo próprio Cartório de Registro Civil competente. A Lexdocs atua na elaboração e estruturação integral da petição/requerimento administrativo extrajudicial (fundamentado, por exemplo, no Artigo 110 da Lei Federal 6.015/73 com as alterações da Lei 13.484/17 e provimentos do CNJ). Entregamos o documento redigido com rigor técnico, acompanhado do dossiê de provas organizado por índice cronológico e das instruções detalhadas para que você ou seu procurador apenas assine e protocole na serventia correspondente.',
    keywords: ['retificacao', 'certidao', 'minuta', 'requerimento', 'artigo 110', 'lei 6015', 'cartorio', 'protocolo', 'administrativo']
  },
  {
    id: 'faq-10',
    category: 'triagem',
    tag: 'Primeiros Passos',
    question: 'Como solicito uma análise ou entro em contato?',
    answer: 'O procedimento é simplificado e 100% digital em 3 etapas:',
    steps: [
      {
        num: 1,
        title: 'Envio inicial',
        desc: 'Encaminhe a digitalização das certidões via formulário do site ou pelo WhatsApp oficial.'
      },
      {
        num: 2,
        title: 'Conferência de Viabilidade',
        desc: 'Nossa equipe examina a legibilidade e expede o parecer de escopo em até 48 horas úteis.'
      },
      {
        num: 3,
        title: 'Execução e Devolutiva',
        desc: 'Uma vez aceita a proposta, iniciamos o cotejo integral e entregamos o relatório e as minutas finalizadas.'
      }
    ],
    keywords: ['como', 'solicitar', 'analise', 'contato', 'whatsapp', 'formulario', 'passo a passo', 'comecar', 'iniciar']
  }
];

export const STRATEGIC_PILLARS: StrategicPillar[] = [
  {
    id: 'pillar-1',
    badge: 'MISSÃO INSTITUCIONAL',
    title: 'Clareza e salvaguarda de direitos',
    description: 'Conceder clareza e segurança no exame de certidões e atos registrais, resguardando os direitos das partes através de diagnósticos preliminares precisos.',
    subLinkText: 'Prevenção de vícios de forma e conteúdo'
  },
  {
    id: 'pillar-2',
    badge: 'VISÃO DE FUTURO',
    title: 'Referência em inteligência documental',
    description: 'Ser a referência nacional em auditoria e inteligência documental extrajudicial, reconhecida pela excelência técnica, agilidade e integridade.',
    subLinkText: 'Padrão ouro em conformidade cartorária',
    isDark: true
  }
];

export const PRACTICAL_COMMITMENTS: PracticalCommitment[] = [
  {
    id: 'comm-1',
    title: 'Precisão Analítica',
    description: 'Atenção minuciosa a cada letra, data, carimbo e averbação marginal do assento.',
    icon: 'search_check'
  },
  {
    id: 'comm-2',
    title: 'Ética Registral',
    description: 'Atuação transparente e respeito irrestrito às normas técnicas das Corregedorias.',
    icon: 'shield_check'
  },
  {
    id: 'comm-3',
    title: 'Clareza & Acesso',
    description: 'Comunicação humana e direta, desprovida de jargões técnicos indecifráveis.',
    icon: 'chat_paste_go'
  },
  {
    id: 'comm-4',
    title: 'Organização',
    description: 'Estruturação lógica, temporal e genealógica detalhada de todos os acervos.',
    icon: 'account_tree'
  },
  {
    id: 'comm-5',
    title: 'Responsabilidade',
    description: 'Sem falsas promessas: foco integral em diagnóstico técnico fundamentado na lei.',
    icon: 'verified_user'
  }
];

export const WORK_PHASES: WorkPhase[] = [
  {
    phaseNumber: 'FASE 01',
    icon: 'lock',
    title: 'Recepção Criptografada e Custódia Segura',
    description: 'Ingresso seguro dos acervos digitais com indexação hash e estrita conformidade com as diretrizes da Lei Geral de Proteção de Dados (LGPD).',
    statusBadge: 'Sigilo Profissional Absoluto'
  },
  {
    phaseNumber: 'FASE 02',
    icon: 'manage_search',
    title: 'Exame Paleográfico e Fonético',
    description: 'Confronto sistemático de caligrafias históricas, abreviações cartorárias e variações ortográficas de patronímicos através das gerações.',
    statusBadge: 'Identificação de Discrepâncias'
  },
  {
    phaseNumber: 'FASE 03',
    icon: 'schema',
    title: 'Cruzamento Cronológico e Genealógico',
    description: 'Validação encadeada de assentos de nascimento, casamento e óbito, verificando coerência de datas, idades registradas e locais de ocorrência.',
    statusBadge: 'Linha de Registro Contínua'
  },
  {
    phaseNumber: 'FASE 04',
    icon: 'task',
    title: 'Relatório Técnico e Minuta Prévia',
    description: 'Emissão de parecer analítico estruturado com checklist resolutivo, indicando a rota cartorária adequada (retificação administrativa ou judicial).',
    statusBadge: 'Dossiê Pronto p/ Protocolo'
  }
];

export const SERVICES_DATA: ServiceItem[] = [
  {
    id: 'serv-1',
    title: 'Auditoria e Exame de Certidões Civis',
    subtitle: 'Nascimento, Casamento e Óbito (Breve Relato e Inteiro Teor)',
    category: 'Auditoria Registral',
    description: 'Confronto analítico de elementos intrínsecos e extrínsecos de certidões cartorárias. Mapeamento de lapsos de grafia, divergências em datas e filiações desarmônicas.',
    icon: 'assignment',
    deliverables: [
      'Relatório analítico comparativo com apontamento de divergências',
      'Verificação fonética e onomástica de sobrenomes',
      'Conferência de averbações e anotações marginais',
      'Checklist de aderência ao provimento cartorário'
    ],
    normativeBase: 'Lei Federal 6.015/1973 & Normas das Corregedorias Gerais de Justiça',
    sla: '2 a 4 dias úteis'
  },
  {
    id: 'serv-2',
    title: 'Minutas para Retificação Administrativa',
    subtitle: 'Enquadramento fundamentado no Art. 110 da LRP',
    category: 'Procedimentos Extrajudiciais',
    description: 'Redação técnica de requerimentos administrativos dirigidos aos Oficiais Registradores, instruídos com a cadeia documental probatória necessária para deferimento sem notas devolutivas.',
    icon: 'history_edu',
    deliverables: [
      'Petição técnica estruturada nos termos da Lei 13.484/17',
      'Dossiê comprobatório organizado cronologicamente',
      'Instruções detalhadas para assinatura e protocolo pelo requerente',
      'Guia de custas e emolumentos estimados'
    ],
    normativeBase: 'Art. 110 e seguintes da Lei 6.015/73 alterada pela Lei 13.484/17',
    sla: '3 a 5 dias úteis'
  }
];
