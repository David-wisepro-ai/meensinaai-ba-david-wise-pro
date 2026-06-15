#!/usr/bin/env python3
"""
Migration v1.x → v2.0.0 — Portal Empresa AI multi-planos.

Roda a partir da raiz do repo do aluno (~/meensinaai-ba-<aluno>/).

Mudanças:
- meu-negocio/perfil.md (monolítico) → meu-negocio/empresa.md + meu-negocio/publico-alvo.md
- meu-negocio/plano-de-acao.md (único) → meu-negocio/planos-de-acao/plano-001-discovery/
  ├── prd.md
  ├── tarefas.md
  └── entregas/
- dados.js schema 1.x → 2.0.0 (planos.ativo + planos.lista)
- VERSION 1.0.3 → 2.0.0
- Marca: status_geracao = "pendente_migracao" (cliente roda /atualizar-marca depois)

Backups antes: meu-negocio/.backups/<timestamp>-v1-to-v2/
Não deleta arquivos antigos (mantém perfil.md.bak e plano-de-acao.md.bak por 30d).

Uso:
    python3 scripts/migrations/v1-to-v2.py
"""

import json
import os
import re
import shutil
import sys
from datetime import datetime, timezone
from pathlib import Path


REPO = Path.cwd()
MEU_NEGOCIO = REPO / "meu-negocio"
PLANOS_DIR = MEU_NEGOCIO / "planos-de-acao"
PLANO_DISCOVERY = PLANOS_DIR / "plano-001-discovery"


def now_iso():
    return datetime.now(timezone.utc).isoformat()


def now_stamp():
    return datetime.now(timezone.utc).strftime("%Y%m%d-%H%M%S")


def log(msg):
    print(f"[migration v1→v2] {msg}")


def fail(msg):
    print(f"[migration v1→v2] ERRO: {msg}", file=sys.stderr)
    sys.exit(1)


# ---------- 1. Pre-checks ----------
def precheck():
    if not MEU_NEGOCIO.exists():
        fail(f"Pasta meu-negocio/ não encontrada. Você está na raiz do repo do aluno?")

    perfil = MEU_NEGOCIO / "perfil.md"
    plano = MEU_NEGOCIO / "plano-de-acao.md"
    dados = MEU_NEGOCIO / "dados.js"

    if not dados.exists():
        fail(f"meu-negocio/dados.js não existe. Migration pressupõe instalação do template.")

    log(f"Pre-check OK. perfil.md: {'existe' if perfil.exists() else 'não'}, plano-de-acao.md: {'existe' if plano.exists() else 'não'}")
    return perfil, plano, dados


# ---------- 2. Backup ----------
def backup(perfil, plano, dados):
    stamp = now_stamp()
    bdir = MEU_NEGOCIO / ".backups" / f"{stamp}-v1-to-v2"
    bdir.mkdir(parents=True, exist_ok=True)

    if perfil.exists():
        shutil.copy2(perfil, bdir / "perfil.md")
    if plano.exists():
        shutil.copy2(plano, bdir / "plano-de-acao.md")
    shutil.copy2(dados, bdir / "dados.js")

    version_file = REPO / "VERSION"
    if version_file.exists():
        shutil.copy2(version_file, bdir / "VERSION")

    log(f"Backup salvo em {bdir.relative_to(REPO)}")
    return bdir


# ---------- 3. Parse perfil.md ----------
def parse_perfil_v1(perfil_path):
    """
    Extrai dados do perfil v1 monolítico.
    Heurística: parsing por seção numerada (1-9).
    """
    if not perfil_path.exists():
        log("perfil.md não existe — pulando split")
        return None

    text = perfil_path.read_text(encoding="utf-8")

    secoes = {}
    # Split por '## ' (markdown h2)
    blocos = re.split(r"^## ", text, flags=re.MULTILINE)
    for b in blocos:
        if not b.strip():
            continue
        first_line = b.split("\n", 1)[0].strip()
        rest = b.split("\n", 1)[1] if "\n" in b else ""
        # Secao tipo "1. Identificacao" ou "Identificacao"
        m = re.match(r"^(\d+)\.?\s*(.+)$", first_line)
        if m:
            num = int(m.group(1))
            nome = m.group(2).strip()
            secoes[num] = {"titulo": nome, "conteudo": rest.strip()}
        else:
            secoes[first_line] = {"titulo": first_line, "conteudo": rest.strip()}

    return secoes


# ---------- 4. Build empresa.md ----------
def build_empresa_md(secoes):
    """
    empresa.md vem das seções 1, 2, 7, 8, 9 do perfil v1.
    Identificação, Produto, Stack, Aquisição, Metas.
    """
    s = secoes or {}

    def get(idx):
        return s.get(idx, {}).get("conteudo", "_(migrado da v1.x — preencher se faltar)_")

    content = f"""---
versao: 2.0.0
ultima_atualizacao: {now_iso()}
modo_geracao: migrado-v1
status: completo
---

# Empresa

## Identificação
{get(1)}

## Produto / Serviço
{get(2)}

## Stack atual
{get(7)}

## Aquisição
{get(8)}

## Metas
{get(9)}
"""
    (MEU_NEGOCIO / "empresa.md").write_text(content, encoding="utf-8")
    log("Criado meu-negocio/empresa.md")


# ---------- 5. Build publico-alvo.md ----------
def build_publico_alvo_md(secoes):
    """
    publico-alvo.md vem das seções 3, 4, 6 (ICP, Dores/Objeções, Voz).
    Seção 5 (Diferenciais) entra como apêndice.
    """
    s = secoes or {}

    def get(idx):
        return s.get(idx, {}).get("conteudo", "_(migrado da v1.x — preencher se faltar)_")

    content = f"""---
versao: 2.0.0
ultima_atualizacao: {now_iso()}
modo_geracao: migrado-v1
status: completo
---

# Público-Alvo

## ICP (Ideal Customer Profile)
{get(3)}

## Top 3 dores e objeções
{get(4)}

## Voz autêntica
{get(6)}

## Diferenciais reais
{get(5)}
"""
    (MEU_NEGOCIO / "publico-alvo.md").write_text(content, encoding="utf-8")
    log("Criado meu-negocio/publico-alvo.md")


# ---------- 6. Move plano-de-acao.md → plano-001-discovery/ ----------
def move_plano_v1(plano_path):
    PLANO_DISCOVERY.mkdir(parents=True, exist_ok=True)
    (PLANO_DISCOVERY / "entregas").mkdir(exist_ok=True)

    # prd.md
    prd_content = f"""---
versao: 2.0.0
data_criacao: {datetime.now(timezone.utc).strftime('%Y-%m-%d')}
slug: discovery
plano_id: plano-001-discovery
status: em_andamento
---

# PRD — Plano de Discovery 90 Dias (Migrado v1.x)

## Objetivo
Plano de discovery migrado da v1.x. Metas e estratégia originais preservadas em tarefas.md.

## Contexto
Migrado automaticamente em {now_iso()} via scripts/migrations/v1-to-v2.py.

## Tarefas
Ver `tarefas.md` na mesma pasta.
"""
    (PLANO_DISCOVERY / "prd.md").write_text(prd_content, encoding="utf-8")
    log("Criado plano-001-discovery/prd.md")

    # tarefas.md (cópia direta do plano antigo, ou placeholder se não existe)
    if plano_path and plano_path.exists():
        tarefas_content = plano_path.read_text(encoding="utf-8")
        # Bumpa frontmatter pra schema 2.0.0 se for o caso
        if tarefas_content.startswith("---"):
            tarefas_content = re.sub(
                r"^---.*?---",
                f"""---
versao: 2.0.0
ultima_atualizacao: {now_iso()}
plano_id: plano-001-discovery
migrado_de: v1.x
---""",
                tarefas_content,
                count=1,
                flags=re.DOTALL,
            )
        (PLANO_DISCOVERY / "tarefas.md").write_text(tarefas_content, encoding="utf-8")
        log("Movido plano-de-acao.md → plano-001-discovery/tarefas.md")

        # Renomear original pra .bak (não deletar)
        bak = plano_path.with_suffix(".md.bak")
        plano_path.rename(bak)
        log(f"plano-de-acao.md → plano-de-acao.md.bak (preservado 30d)")
    else:
        placeholder = f"""---
versao: 2.0.0
ultima_atualizacao: {now_iso()}
plano_id: plano-001-discovery
---

# Tarefas — Plano de Discovery (placeholder pós-migração)

> Plano vazio. Rode `/plano-de-acao-90-dias` pra popular tarefas baseado em empresa.md + publico-alvo.md.

## A Fazer
_(vazio)_

## Em Andamento
_(vazio)_

## Concluídas
_(vazio)_
"""
        (PLANO_DISCOVERY / "tarefas.md").write_text(placeholder, encoding="utf-8")
        log("Criado tarefas.md placeholder")

    # _ativo.txt
    (PLANOS_DIR / "_ativo.txt").write_text("plano-001-discovery\n", encoding="utf-8")
    log("Criado _ativo.txt → plano-001-discovery")


# ---------- 7. Reescrever dados.js no schema 2.0.0 ----------
def rewrite_dados_v2(dados_path, secoes):
    """
    Reescreve dados.js no schema 2.0.0. Preserva o que dá pra inferir do v1.
    """
    # Parse dados.js antigo (regex pra extrair window.DADOS_NEGOCIO = {...})
    text = dados_path.read_text(encoding="utf-8")
    m = re.search(r"window\.DADOS_NEGOCIO\s*=\s*(\{.*?\});\s*$", text, re.DOTALL)
    old = {}
    if m:
        try:
            # Tentativa de eval seguro (substituir por JSON quando possível)
            # JS objects podem ter trailing commas, keys sem aspas. Não-trivial.
            # Estratégia: extrair valores via regex pontual.
            log("Tentando extrair valores do dados.js v1.x via regex pontual")
        except Exception as e:
            log(f"Não foi possível parsear dados.js v1.x: {e}. Seguindo com placeholders.")

    def extract(pattern, default=None):
        mm = re.search(pattern, text, re.DOTALL)
        if mm:
            return mm.group(1).strip().strip('"').strip("'")
        return default

    nome_negocio = extract(r"nome:\s*\"([^\"]*)\"") or extract(r"nome:\s*'([^']*)'")
    nicho = extract(r"nicho:\s*\"([^\"]*)\"")
    geografia = extract(r"geografia:\s*\"([^\"]*)\"")

    # Schema 2.0.0
    dados_v2 = {
        "versao": "2.0.0",
        "ultima_atualizacao": now_iso(),
        "empresa": {
            "nome": nome_negocio,
            "cnpj_taxid": None,
            "fundacao": None,
            "geografia": geografia,
            "idioma": "pt-BR",
            "site": None,
            "instagram": None,
            "linkedin": None,
            "produto_principal": nicho,
            "ticket_medio": None,
            "margem_aproximada": None,
            "canais_aquisicao": [],
            "cac": None,
            "ltv": None,
            "meta_faturamento_90d": None,
            "maior_gargalo": None,
        },
        "publico_alvo": {
            "faixa_etaria": None,
            "renda": None,
            "profissao": None,
            "geografia": None,
            "dor_principal": None,
            "top_3_dores": [],
            "top_3_objecoes": [],
            "voz_autentica": None,
        },
        "marca": {
            "tom": None,
            "palavras_evitar": [],
            "palavras_preferir": [],
            "paleta_cores": [],
            "tipografia": None,
            "status_geracao": "pendente_migracao",
        },
        "agentes": {},
        "planos": {
            "ativo": "plano-001-discovery",
            "total": 1,
            "lista": {
                "plano-001-discovery": {
                    "titulo": "Plano de Discovery 90 Dias (Migrado v1.x)",
                    "slug": "discovery",
                    "pasta": "plano-001-discovery",
                    "objetivo": "Migrado da v1.x",
                    "status": "em_andamento",
                    "data_inicio": now_iso(),
                    "data_conclusao": None,
                    "total_semanas": 12,
                    "semana_atual": 1,
                    "prd_path": "meu-negocio/planos-de-acao/plano-001-discovery/prd.md",
                    "tarefas_path": "meu-negocio/planos-de-acao/plano-001-discovery/tarefas.md",
                    "tarefas": {"a_fazer": [], "em_andamento": [], "concluidas": []},
                }
            },
        },
        "entregas": [],
        "metricas": {
            "plano_ativo": "plano-001-discovery",
            "total_tarefas": 0,
            "concluidas": 0,
            "em_andamento": 0,
            "a_fazer": 0,
            "progresso_pct": 0,
            "total_entregas": 0,
        },
        "atividade_recente": [
            {
                "timestamp": now_iso(),
                "agente": "migration-v1-to-v2",
                "plano": "plano-001-discovery",
                "acao_resumida": "Migração v1.x → v2.0.0 concluída",
            }
        ],
    }

    js_content = f"""/**
 * dados.js — Estado machine-readable do negócio (schema v2.0.0)
 * Migrado automaticamente da v1.x em {now_iso()}
 *
 * NÃO EDITE MANUALMENTE. Use as skills:
 *   - /gerar-perfil-do-negocio
 *   - /plano-de-acao-90-dias
 *   - /novo-plano-de-acao
 *   - /concluir-plano | /pausar-plano | /retomar-plano
 *   - /atualizar-marca (pra gerar marca/ via brand-squad)
 */

window.DADOS_NEGOCIO = {json.dumps(dados_v2, indent=2, ensure_ascii=False)};
"""
    dados_path.write_text(js_content, encoding="utf-8")
    log("Reescrito dados.js no schema 2.0.0")


# ---------- 8. Bump VERSION ----------
def bump_version():
    version_file = REPO / "VERSION"
    version_file.write_text("2.0.0\n", encoding="utf-8")
    log("VERSION → 2.0.0")


# ---------- 9. Changelog ----------
def append_changelog(backup_dir):
    changelog = REPO / ".changelog-aluno.md"
    entry = f"""
## {now_iso()} — Migração v1.x → v2.0.0 (multi-planos)
- Backup salvo em meu-negocio/.backups/{backup_dir.name}/
- perfil.md quebrado em empresa.md + publico-alvo.md
- plano-de-acao.md v1 movido pra planos-de-acao/plano-001-discovery/tarefas.md
- _ativo.txt aponta pra plano-001-discovery
- dados.js reescrito no schema 2.0.0
- VERSION 1.0.3 → 2.0.0
- Marca pendente: rode /atualizar-marca pra gerar com brand-squad
- Arquivos antigos preservados como .bak (limpeza em 30 dias)
"""
    if changelog.exists():
        changelog.write_text(changelog.read_text(encoding="utf-8") + entry, encoding="utf-8")
    else:
        changelog.write_text(f"# Changelog do Aluno\n{entry}", encoding="utf-8")
    log("Append em .changelog-aluno.md")


# ---------- 10. Rename perfil.md → perfil.md.bak ----------
def preserve_perfil_old(perfil_path):
    if perfil_path and perfil_path.exists():
        bak = perfil_path.with_suffix(".md.bak")
        perfil_path.rename(bak)
        log(f"perfil.md → perfil.md.bak (preservado 30d)")


# ---------- main ----------
def main():
    log(f"Iniciando migração no repo {REPO}")
    perfil, plano, dados = precheck()
    bdir = backup(perfil, plano, dados)

    secoes = parse_perfil_v1(perfil)
    if secoes:
        build_empresa_md(secoes)
        build_publico_alvo_md(secoes)
        preserve_perfil_old(perfil)
    else:
        log("perfil.md vazio ou não-existente — criando empresa.md/publico-alvo.md em branco")
        build_empresa_md({})
        build_publico_alvo_md({})

    move_plano_v1(plano)
    rewrite_dados_v2(dados, secoes)
    bump_version()
    append_changelog(bdir)

    log("=" * 60)
    log("✅ Migração v1.x → v2.0.0 concluída.")
    log("Próximos passos:")
    log("  1. Rode /atualizar-marca pra gerar marca/ (brand-squad)")
    log("  2. Rode /listar-planos pra ver estado atual")
    log("  3. Atualize o painel (F5)")
    log(f"  4. Backups em {bdir.relative_to(REPO)}")
    log("  5. Arquivos .bak serão removidos na próxima migration (>30d)")


if __name__ == "__main__":
    main()
