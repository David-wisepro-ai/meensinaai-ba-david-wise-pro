/**
 * dados.js — Estado machine-readable do negócio (schema v2.0.0)
 *
 * Lido pelo painel.html (Quartel General). Atualizado pelas skills do template
 * e por todos os agentes ao concluir tarefa.
 *
 * NÃO EDITE MANUALMENTE este arquivo. Use as skills apropriadas:
 *   - /gerar-perfil-do-negocio   → atualiza empresa.* + publico_alvo.* + marca.* + atividade_recente
 *   - /plano-de-acao-90-dias     → cria plano-001-discovery/, atualiza planos.lista[*] + agentes.* + metricas
 *   - /novo-plano-de-acao        → cria plano-NNN-<slug>/, atualiza planos.lista[*] (não sobrescreve outros)
 *   - /concluir-plano            → planos.lista[ativo].status = "concluido", _ativo.txt limpa
 *   - /pausar-plano              → planos.lista[ativo].status = "pausado"
 *   - /retomar-plano             → planos.ativo = <slug>, status volta pra em_andamento
 *   - qualquer agente do time    → agentes.<seu-nome>.* + entregas[]
 *
 * SCHEMA: 2.0.0
 *
 * Mudanças versus v1.0.x:
 *   - perfil.md monolítico → empresa.md + publico-alvo.md + marca/ (4 arquivos)
 *   - plano único → planos.ativo + planos.lista[<slug>] (multi-plano)
 *   - chave de plano = pasta no disco (ex: "plano-002-campanha-memorial-day")
 *
 * Migration v1.x → v2.0.0: scripts/migrations/v1-to-v2.py
 */

window.DADOS_NEGOCIO = {
  versao: "2.0.0",
  ultima_atualizacao: "2026-06-22T18:00:00Z",

  /**
   * Identificação básica da empresa. Preenchida por /gerar-perfil-do-negocio.
   * Reflete os dados estruturados de meu-negocio/empresa.md.
   */
  empresa: {
    nome: null,
    cnpj_taxid: null,
    fundacao: null,
    geografia: null,
    idioma: "pt-BR",
    site: null,
    instagram: null,
    linkedin: null,
    produto_principal: null,
    ticket_medio: null,
    margem_aproximada: null,
    canais_aquisicao: [],
    cac: null,
    ltv: null,
    meta_faturamento_90d: null,
    maior_gargalo: null
  },

  /**
   * Cliente ideal e voz autêntica do cliente. Preenchido por /gerar-perfil-do-negocio.
   * Reflete dados de meu-negocio/publico-alvo.md.
   */
  publico_alvo: {
    faixa_etaria: null,
    renda: null,
    profissao: null,
    geografia: null,
    dor_principal: null,
    top_3_dores: [],
    top_3_objecoes: [],
    voz_autentica: null
  },

  /**
   * Marca do cliente. Gerado pelo brand-squad automaticamente ao final do /gerar-perfil-do-negocio.
   * Reflete dados de meu-negocio/marca/* (brand-voice, visual-guidelines, padroes-site, padroes-postagem).
   */
  marca: {
    tom: null,
    palavras_evitar: [],
    palavras_preferir: [],
    paleta_cores: [],
    tipografia: null,
    status_geracao: "pendente"
  },

  /**
   * Estado de cada agente do time. Preenchido por /plano-de-acao-90-dias e /novo-plano-de-acao
   * (inicializa todos os agentes mencionados nas tarefas) e atualizado por cada agente
   * ao iniciar/concluir tarefa.
   *
   * Status possíveis: "ocioso" | "trabalhando" | "concluido" | "bloqueado"
   *
   * CHAVE OBRIGATÓRIA = nome próprio em minúsculo (marina, pedro, ana-paula...).
   * Nunca usar role-based (marketing, vendas).
   *
   * Exemplo:
   *   marina: {
   *     status: "trabalhando",
   *     plano: "plano-002-campanha-memorial-day",
   *     task_atual: "task-002",
   *     inicio: "2026-05-08T10:30:00Z",
   *     ultima_entrega: null,
   *     cargo: "Social Media Strategist"
   *   }
   */
  agentes: {
    victor: {
      status: "ocioso",
      plano: null,
      task_atual: null,
      inicio: null,
      ultima_entrega: "2026-06-22T18:00:00Z",
      cargo: "Full Stack Developer"
    }
  },

  /**
   * Multi-planos de ação. Cada plano é uma pasta em planos-de-acao/<slug>/.
   *
   * planos.ativo aponta pra chave do plano em execução agora (string ou null).
   * planos.lista é um dicionário de todos os planos do cliente.
   *
   * Cada plano segue schema:
   *   {
   *     titulo: "Plano de Discovery 90 Dias",
   *     slug: "discovery",
   *     pasta: "plano-001-discovery",
   *     objetivo: "Melhorar Conversão",
   *     status: "rascunho" | "em_andamento" | "pausado" | "concluido",
   *     data_inicio: "2026-05-08T10:00:00Z",
   *     data_conclusao: null,
   *     total_semanas: 12,
   *     semana_atual: 1,
   *     prd_path: "meu-negocio/planos-de-acao/plano-001-discovery/prd.md",
   *     tarefas_path: "meu-negocio/planos-de-acao/plano-001-discovery/tarefas.md",
   *     tarefas: { a_fazer: [], em_andamento: [], concluidas: [] }
   *   }
   */
  planos: {
    ativo: null,
    total: 0,
    lista: {}
  },

  /**
   * Últimas 50 entregas produzidas por agentes. Agregado de TODOS os planos.
   * Cada entrada:
   *   {
   *     id, tipo, titulo, caminho, agente, plano (slug), task_id, criado_em
   *   }
   */
  entregas: [
    {
      id: "ent-victor-2026-06-22-conversao-whatsapp",
      tipo: "frontend",
      titulo: "Toda a conversao do site virou botao verde de WhatsApp (#25D366) com mensagem ja preenchida por produto. Removido o formulario de captura de lead das 3 paginas de venda. Helper waLink() e WA_MSG criados em brand.ts. CSL ganhou 2 opcoes (online e presencial). Home (hero, cards de curso, CTA final) e as 3 paginas de venda (Project Manager, Curso de Construtor/CSL, Wise Day) todas com a mesma logica. Todos os links target=_blank rel=noopener.",
      caminho: "frontend/lib/brand.ts, frontend/components/Landing.tsx, frontend/app/page.tsx, frontend/app/project-manager/page.tsx, frontend/app/curso-construtor/page.tsx, frontend/app/wise-day/page.tsx",
      agente: "victor",
      plano: null,
      task_id: null,
      criado_em: "2026-06-22T18:00:00Z"
    },
    {
      id: "ent-victor-2026-06-20-landing-dark-premium",
      tipo: "frontend",
      titulo: "Paginas de venda (Project Manager, Curso de Construtor e Wise Day) padronizadas no estilo dark premium da home: fundo navy escuro com brilho dourado, hero com selo pulsante, VSL em moldura dourada, cards glass-morphism nas dores/beneficios/conteudo/reviews, CTAs dourados, painel de oferta + formulario em destaque, FAQ e upsell dark. Conteudo, props, links e formulario intactos. Responsivo desktop + mobile.",
      caminho: "frontend/components/Landing.tsx, frontend/components/Vsl.tsx, frontend/components/PandaVideo.tsx",
      agente: "victor",
      plano: null,
      task_id: null,
      criado_em: "2026-06-20T16:00:00Z"
    },
    {
      id: "ent-victor-2026-06-20-responsividade",
      tipo: "frontend",
      titulo: "Passada completa de responsividade mobile: header com menu hamburger/drawer, hero empilhado, grids colapsando em 1 coluna, tipografia fluida com clamp(), CTAs full-width, footer e StatBand adaptados, sem scroll horizontal no celular",
      caminho: "frontend/app/layout.tsx, frontend/app/page.tsx, frontend/components/SiteHeader.tsx, frontend/components/SiteFooter.tsx, frontend/components/StatBand.tsx, frontend/components/WhatsAppFloat.tsx, frontend/components/Landing.tsx, frontend/app/portal/page.tsx",
      agente: "victor",
      plano: null,
      task_id: null,
      criado_em: "2026-06-20T12:00:00Z"
    },
    {
      id: "ent-victor-2026-06-20-cursos",
      tipo: "frontend",
      titulo: "Home #cursos reestruturada em 2 categorias (Project Manager + CSL) e horarios corrigidos pro padrao EUA (AM/PM, Massachusetts)",
      caminho: "frontend/app/page.tsx, frontend/app/curso-construtor/page.tsx",
      agente: "victor",
      plano: null,
      task_id: null,
      criado_em: "2026-06-20T00:00:00Z"
    }
  ],

  /**
   * Métricas agregadas do plano ATIVO. Recalculadas a cada update.
   * (Métricas de planos passados ficam dentro de planos.lista[<slug>].)
   */
  metricas: {
    plano_ativo: null,
    total_tarefas: 0,
    concluidas: 0,
    em_andamento: 0,
    a_fazer: 0,
    progresso_pct: 0,
    total_entregas: 4
  },

  /**
   * Últimas 20 atividades pro painel. Agregado de todos os planos.
   * Cada entrada: { timestamp, agente, plano (slug), acao_resumida }
   */
  atividade_recente: [
    {
      timestamp: "2026-06-22T18:00:00Z",
      agente: "victor",
      plano: null,
      acao_resumida: "Trocou toda a conversao do site por botoes verdes de WhatsApp com mensagem automatica ja preenchida por produto, pra atendente saber na hora o que a pessoa quer. Removeu o formulario de captura de lead das 3 paginas de venda. CSL tem 2 botoes (turma online e turma presencial). Mensagens: Project Manager, CSL Online, CSL Presencial, Wise Day e uma geral pra home. Mexeu em brand.ts, Landing.tsx, home e as 3 paginas de venda. Nao tocou no portal do aluno. Sem deploy."
    },
    {
      timestamp: "2026-06-20T16:00:00Z",
      agente: "victor",
      plano: null,
      acao_resumida: "Padronizou as 3 paginas de venda (Project Manager, Curso de Construtor e Wise Day) no mesmo visual dark premium da home: fundo navy escuro com brilho dourado e textura de grid, hero com selo pulsante, VSL em moldura dourada, todas as secoes (copy de venda, dores, beneficios, conteudo, reviews, oferta, FAQ, upsell) viraram cards glass-morphism com borda dourada e texto claro, CTAs dourados levando ao formulario. Conteudo, props, links e o formulario de captura continuam funcionando. Responsivo no celular e no computador. Arquivos: Landing.tsx, Vsl.tsx, PandaVideo.tsx."
    },
    {
      timestamp: "2026-06-20T12:00:00Z",
      agente: "victor",
      plano: null,
      acao_resumida: "Deixou o site responsivo no celular e no computador: menu hamburger com drawer no mobile, hero empilhado, todos os grids colapsando pra 1 coluna, titulos com tipografia fluida (clamp), CTAs full-width, footer e faixa de numeros adaptados, e garantia de zero scroll horizontal no celular. Home, header, footer e paginas de venda (Landing). Portal recebeu ajuste leve de padding."
    },
    {
      timestamp: "2026-06-20T00:00:00Z",
      agente: "victor",
      plano: null,
      acao_resumida: "Reestruturou a secao Nossos cursos da home em 2 categorias (Construction Project Manager e Construction Supervisor License) e corrigiu os horarios do Construtor pro padrao EUA (6 PM as 9 PM online, 7:30 AM as 12 PM presencial, horario de Massachusetts)."
    }
  ]
};
