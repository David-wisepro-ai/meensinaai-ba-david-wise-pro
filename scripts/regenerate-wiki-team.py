#!/usr/bin/env python3
"""
Regenera wiki/team/ inteiro baseado no estado atual de .claude/agents/ e
.claude/skills/.

Uso:
    cd ~/meensinaai-ba-<aluno>
    python3 scripts/regenerate-wiki-team.py

Quando rodar:
- Apos onboarding (Onboarding Chief roda na FASE 8.5 apos renomear agents)
- Quando aluno cria agente novo via /criar-agente (Arquiteto chama)
- Quando aluno deleta agente
- Manualmente, sempre que `.claude/agents/` ou `.claude/skills/` muda

Tolerante a:
- Agents renomeados (ex: nome-do-dono -> ceo, marcos -> cfo)
- Agents novos do nicho que nao estao em CATEGORIES (caem em "Outros")
- Subdiretorios em .claude/agents/ (ex: nicho/)
"""
import re
from pathlib import Path
import sys

ROOT = Path.cwd()
AGENTS_DIR = ROOT / ".claude/agents"
SKILLS_DIR = ROOT / ".claude/skills"
WIKI_TEAM = ROOT / "wiki/team"

if not AGENTS_DIR.exists():
    print(f"❌ {AGENTS_DIR} nao existe. Rode este script da raiz do repo.", file=sys.stderr)
    sys.exit(1)

# Categorização padrão. Agents fora dela caem em "Outros / Customizados".
# Aluno pode editar este arquivo se quiser reagrupar.
CATEGORIES = {
    "CEO": ["ceo"],
    "Arquiteto da empresa": ["arquiteto"],
    "Chiefs (orquestram squads)": [
        "traffic-chief", "brand-chief", "design-chief", "hormozi-chief",
        "advisory-chief", "data-chief", "story-chief", "copy-chief",
        "chief-content", "meta-ads-chief", "seo-chief",
    ],
    "Meta Ads (anúncios pagos Meta)": [
        "meta-ads-strategist", "meta-ads-campaign-builder", "meta-ads-pixel-tracker",
        "meta-ads-audience-architect", "meta-ads-competitor-spy",
        "meta-ads-creative-director", "meta-ads-optimizer", "meta-ads-analyst",
        "meta-ads-knowledge-curator", "meta-ads-manager",
    ],
    "SEO (busca orgânica + AEO/GEO)": [
        "seo-technical", "seo-local", "seo-content", "seo-schema", "seo-sitemap",
        "seo-geo", "seo-dataforseo", "seo-google", "seo-backlinks", "seo-cluster",
        "seo-drift", "seo-ecommerce", "seo-flow", "seo-image-gen", "seo-maps",
        "seo-performance", "seo-sxo", "seo-visual",
    ],
    "Pipeline Carrossel": [
        "marina", "andre", "ana-paula", "eugene-schwartz", "bruno", "chief-content",
    ],
    "Conteúdo": ["beatriz", "diego", "lucas", "rafael", "gustavo", "daniela", "mariana"],
    "Tráfego e Ads": [
        "aline", "camila", "fernando", "henrique", "larissa",
        "google-ads-manager", "meta-ads-manager",
    ],
    "Vendas, CRM e Funil": [
        "juliana", "pedro", "rodrigo", "vinicius", "tatiana", "valeria",
        "eduardo", "nina", "crm-manager",
    ],
    "Produto e Operações": ["patricia", "renata", "thiago", "carolina", "isabela", "danilo"],
    "Financeiro": ["marcos", "cfo"],
    "Segurança": ["cristina"],
    "Engenharia e Dev": ["felipe", "gabriel", "victor"],
    "Hub Comunicação": ["sofia", "comunicacao-hub"],
    "Scrapers e Ferramentas": [
        "permit-scraper", "google-my-business", "twitter-scraper",
        "instagram-scraper", "youtube-transcriber", "substack-writer",
        "skill-creator", "suporte-ba",
    ],
}

DEPARTMENTS = {
    "conteudo": {
        "title": "Conteúdo",
        "agents": ["beatriz", "diego", "lucas", "rafael", "gustavo", "daniela",
                   "mariana", "marina", "ana-paula"],
        "chief": "chief-content",
        "squads": ["copy-squad", "storytelling"],
    },
    "trafego": {
        "title": "Tráfego e Ads",
        "agents": ["aline", "camila", "fernando", "henrique", "larissa",
                   "google-ads-manager", "meta-ads-manager"],
        "chief": "traffic-chief",
        "squads": ["traffic-masters"],
    },
    "vendas": {
        "title": "Vendas e CRM",
        "agents": ["juliana", "pedro", "rodrigo", "vinicius", "tatiana",
                   "valeria", "eduardo", "nina", "crm-manager"],
        "chief": None,
        "squads": ["hormozi-squad"],
    },
    "produto": {
        "title": "Produto e Operações",
        "agents": ["patricia", "renata", "thiago", "carolina", "isabela", "danilo"],
        "chief": None,
        "squads": ["design-squad"],
    },
    "estrategia": {
        "title": "Estratégia",
        "agents": ["sofia", "isabela", "larissa"],
        "chief": "advisory-chief",
        "squads": ["advisory-board", "data-squad", "brand-squad"],
    },
    "seguranca": {
        "title": "Segurança",
        "agents": ["cristina", "bruno"],
        "chief": None,
        "squads": [],
    },
    "engenharia": {
        "title": "Engenharia e Dev",
        "agents": ["felipe", "gabriel", "victor"],
        "chief": None,
        "squads": [],
    },
    "meta-ads": {
        "title": "Meta Ads (anúncios pagos Meta)",
        "agents": [
            "meta-ads-strategist", "meta-ads-campaign-builder", "meta-ads-pixel-tracker",
            "meta-ads-audience-architect", "meta-ads-competitor-spy",
            "meta-ads-creative-director", "meta-ads-optimizer", "meta-ads-analyst",
            "meta-ads-knowledge-curator", "meta-ads-manager",
        ],
        "chief": "meta-ads-chief",
        "squads": [],
    },
    "seo": {
        "title": "SEO (busca orgânica + AEO/GEO)",
        "agents": [
            "seo-technical", "seo-local", "seo-content", "seo-schema", "seo-sitemap",
            "seo-geo", "seo-dataforseo", "seo-google", "seo-backlinks", "seo-cluster",
            "seo-drift", "seo-ecommerce", "seo-flow", "seo-image-gen", "seo-maps",
            "seo-performance", "seo-sxo", "seo-visual",
        ],
        "chief": "seo-chief",
        "squads": [],
    },
}

# Descrições curtas de departamento (mesmo estilo de SQUAD_DESC). Usadas no
# topo de cada página de departamento e no index de departamentos.
DEPT_DESC = {
    "meta-ads": "10 especialistas em anúncios Meta (Advantage+, Andromeda, Pixel/CAPI, audiences). Use pra campanha Facebook/Instagram profunda.",
    "seo": "19 especialistas em SEO (técnico, local, conteúdo, schema, AEO/GEO). Use pra rankear no Google e ser citado por IAs.",
}

SQUAD_DESC = {
    "advisory-board": "Conselho estratégico (Buffett, Munger, Bezos, Naval, Thiel, etc). Use pra decisões grandes.",
    "brand-squad": "15 estrategistas de marca (Kapferer, Neumeier, Aaker, Ries). Use pra positioning, naming.",
    "copy-squad": "23 copywriters lendários (Schwartz, Halbert, Carlton). Use pra sales letter, VSL, headlines.",
    "data-squad": "7 estrategistas de growth/analytics (Avinash, Sean Ellis, Peter Fader). Use pra North Star, CLV.",
    "design-squad": "8 líderes de design (Brad Frost, Dan Mall). Use pra design system, atomic, WCAG.",
    "hormozi-squad": "16 personas Alex Hormozi (Grand Slam Offer, $100M Offers/Leads). Use pra oferta + escala.",
    "storytelling": "12 mestres da narrativa (Campbell, Snyder, Harmon, Duarte). Use pra pitch, talk, brand story.",
    "traffic-masters": "16 especialistas em tráfego pago (Molly Pittman, Ralph Burns, Kasim Aslam). Use pra Meta, Google, TikTok.",
}

SQUAD_CHIEF = {
    "advisory-board": "advisory-chief",
    "brand-squad": "brand-chief",
    "copy-squad": "copy-chief",
    "data-squad": "data-chief",
    "design-squad": "design-chief",
    "hormozi-squad": "hormozi-chief",
    "storytelling": "story-chief",
    "traffic-masters": "traffic-chief",
}


def parse_agent_frontmatter(path):
    content = path.read_text()
    if not content.startswith("---"):
        return {"name": path.stem, "description": ""}
    end = content.find("\n---\n", 4)
    if end == -1:
        return {"name": path.stem, "description": ""}
    fm = content[4:end]
    result = {"name": path.stem, "description": ""}
    for line in fm.split("\n"):
        if line.startswith("name:"):
            result["name"] = line.split(":", 1)[1].strip().strip('"')
        elif line.startswith("description:"):
            desc = line.split(":", 1)[1].strip().strip('"')
            if len(desc) > 250:
                desc = desc[:247] + "..."
            result["description"] = desc
    return result


def find_category(name):
    for cat, names in CATEGORIES.items():
        if name in names:
            return cat
    return "Outros / Customizados do nicho"


def find_dept(name):
    for dept_id, dept in DEPARTMENTS.items():
        if name in dept["agents"]:
            return dept_id, dept["title"]
    return None, None


# Limpar wiki/team/ atual (mantém .gitkeep se houver)
if WIKI_TEAM.exists():
    import shutil
    shutil.rmtree(WIKI_TEAM)
WIKI_TEAM.mkdir(parents=True)

# 1. Coletar agents reais
agents_data = []
for agent_md in sorted(AGENTS_DIR.rglob("*.md")):
    fm = parse_agent_frontmatter(agent_md)
    name = fm["name"]
    desc = fm["description"]
    cat = find_category(name)
    dept_id, dept_title = find_dept(name)
    agents_data.append({
        "name": name,
        "desc": desc,
        "cat": cat,
        "dept_id": dept_id,
        "dept_title": dept_title,
    })

# 2. wiki/team/agents/<nome>.md
agents_dir = WIKI_TEAM / "agents"
agents_dir.mkdir(parents=True)
for a in agents_data:
    page = f"""# {a['name'].replace('-', ' ').title()}

> **Função:** {a['desc'][:200] if a['desc'] else 'Ver definição completa em .claude/agents/'}
> **Categoria:** {a['cat']}
"""
    if a["dept_title"]:
        page += f"> **Departamento:** [[../departments/{a['dept_id']}|{a['dept_title']}]]\n"
    page += f"""
## Como invocar

Você fala sempre com o CEO. Ele invoca este agente via:
```
Agent(subagent_type: "{a['name']}", prompt: "<sua tarefa>")
```

## Definição completa do subagent

Ver `.claude/agents/{a['name']}.md`.

## Navegação

- ← [[index|Catálogo de agentes]]
- ↑ [[../index|Time]]
"""
    (agents_dir / f"{a['name']}.md").write_text(page)

# 3. wiki/team/agents/index.md
idx = ["# Agentes — Catálogo", "", f"> Time: **{len(agents_data)} agentes**.", "",
       "## Visão por categoria", ""]
seen = set()
for cat in CATEGORIES.keys():
    in_cat = [a for a in agents_data if a["cat"] == cat and a["name"] not in seen]
    if not in_cat:
        continue
    idx.append(f"### {cat} ({len(in_cat)})")
    for a in in_cat:
        seen.add(a["name"])
        d = (a["desc"][:120] + "...") if len(a["desc"]) > 120 else a["desc"]
        idx.append(f"- [[{a['name']}]] — {d}")
    idx.append("")

# Outros (custom do nicho ou não categorizados)
others = [a for a in agents_data if a["name"] not in seen]
if others:
    idx.append(f"### Outros / Customizados do nicho ({len(others)})")
    for a in others:
        d = (a["desc"][:120] + "...") if len(a["desc"]) > 120 else a["desc"]
        idx.append(f"- [[{a['name']}]] — {d}")
    idx.append("")

idx.append("## Navegação")
idx.append("")
idx.append("- ↑ [[../index|Time]]")
idx.append("- → [[../squads/index|Squads]]")
idx.append("- → [[../departments/index|Departamentos]]")
(agents_dir / "index.md").write_text("\n".join(idx))

# 4. wiki/team/squads/<squad>.md
squads_dir = WIKI_TEAM / "squads"
squads_dir.mkdir(parents=True)
squads_list = []
agent_names = {a["name"] for a in agents_data}

if SKILLS_DIR.exists():
    for squad_dir in sorted(SKILLS_DIR.iterdir()):
        if not squad_dir.is_dir():
            continue
        name = squad_dir.name
        desc = SQUAD_DESC.get(name, f"Squad {name}")
        chief = SQUAD_CHIEF.get(name)
        chief_exists = chief in agent_names if chief else False

        personas_d = squad_dir / "personas"
        personas = sorted([p.stem for p in personas_d.glob("*.md")]) if personas_d.exists() else []
        fw_d = squad_dir / "frameworks"
        fws = sorted([f.stem for f in fw_d.glob("*.md")]) if fw_d.exists() else []

        page = f"""# {name.replace('-', ' ').title()}

> {desc}

## Chief (orquestrador)

"""
        if chief and chief_exists:
            page += f"- [[../agents/{chief}]] — orquestra este squad.\n\n"
        else:
            page += "- _(sem Chief dedicado neste squad)_\n\n"

        page += f"## Personas ({len(personas)})\n\n"
        for p in personas:
            page += f"- `{p}`\n"
        page += f"\n## Frameworks ({len(fws)})\n\n"
        for f in fws:
            page += f"- `{f}`\n"
        page += f"""
## Como invocar

Você fala com o CEO. Ele invoca:
```
Agent(subagent_type: "{chief or '<chief>'}", prompt: "<tarefa>")
```

## Definição completa

Ver `.claude/skills/{name}/`.

## Navegação

- ← [[index|Catálogo de squads]]
- ↑ [[../index|Time]]
"""
        (squads_dir / f"{name}.md").write_text(page)
        squads_list.append({"name": name, "desc": desc, "chief": chief, "chief_exists": chief_exists, "personas": len(personas), "fws": len(fws)})

# 5. wiki/team/squads/index.md
sq = ["# Squads — Catálogo", "", f"> {len(squads_list)} squads.", "", "## Squads disponíveis", ""]
for s in squads_list:
    sq.append(f"### [[{s['name']}]]")
    sq.append(s["desc"])
    chief_link = f"[[../agents/{s['chief']}]]" if s["chief"] and s["chief_exists"] else "_sem Chief_"
    sq.append(f"- Chief: {chief_link} | Personas: {s['personas']} | Frameworks: {s['fws']}")
    sq.append("")
sq.append("## Navegação")
sq.append("")
sq.append("- ↑ [[../index|Time]]")
sq.append("- → [[../agents/index|Agentes]]")
(squads_dir / "index.md").write_text("\n".join(sq))

# 6. wiki/team/departments/<dept>.md
dept_dir = WIKI_TEAM / "departments"
dept_dir.mkdir(parents=True)
for dept_id, dept in DEPARTMENTS.items():
    # Filtrar agents que existem de fato no repo
    existing = [a for a in dept["agents"] if a in agent_names]
    dept_blurb = DEPT_DESC.get(dept_id, f"Hub do departamento {dept['title']}.")
    page = f"""# {dept['title']}

> {dept_blurb}

## Chief responsável

"""
    if dept["chief"] and dept["chief"] in agent_names:
        page += f"- [[../agents/{dept['chief']}]]\n\n"
    else:
        page += "- _(sem Chief dedicado)_\n\n"
    page += f"## Agentes ({len(existing)})\n\n"
    for a in existing:
        page += f"- [[../agents/{a}]]\n"
    page += "\n"
    if dept["squads"]:
        page += f"## Squads ligados ({len(dept['squads'])})\n\n"
        for s in dept["squads"]:
            page += f"- [[../squads/{s}]]\n"
        page += "\n"
    page += """## Navegação

- ← [[index|Catálogo de departamentos]]
- ↑ [[../index|Time]]
"""
    (dept_dir / f"{dept_id}.md").write_text(page)

# 7. wiki/team/departments/index.md
dpx = ["# Departamentos — Hub", "", f"> {len(DEPARTMENTS)} departamentos.", "", "## Departamentos", ""]
for dept_id, dept in DEPARTMENTS.items():
    dpx.append(f"### [[{dept_id}|{dept['title']}]]")
    if dept_id in DEPT_DESC:
        dpx.append(DEPT_DESC[dept_id])
    dpx.append(f"- {len(dept['agents'])} agentes (no template)")
    if dept["chief"] and dept["chief"] in agent_names:
        dpx.append(f"- Chief: [[../agents/{dept['chief']}]]")
    dpx.append("")
dpx.append("## Navegação")
dpx.append("")
dpx.append("- ↑ [[../index|Time]]")
(dept_dir / "index.md").write_text("\n".join(dpx))

# 8. wiki/team/index.md
team_index = f"""# Time — Hub Geral

> Visão completa: **{len(agents_data)} agentes**, **{len(squads_list)} squads**, **{len(DEPARTMENTS)} departamentos**.
> Você fala SEMPRE com o CEO. Ele invoca o agente ou Chief certo.

## Estrutura

```
Você (dono)
   ↓
CEO (orquestrador)
   ↓
   ├─ Especialista direto (1 agente resolve)
   ├─ Chief de squad (orquestra time)
   └─ Hub Comm (Sofia → Telegram/Email)
```

## Navegar

- 👥 [[agents/index|Agentes ({len(agents_data)})]]
- 🎯 [[squads/index|Squads ({len(squads_list)})]]
- 🏢 [[departments/index|Departamentos ({len(DEPARTMENTS)})]]

## Regenerar este hub

Sempre que criar/renomear/deletar agente, rode:
```bash
python3 scripts/regenerate-wiki-team.py
```
"""
(WIKI_TEAM / "index.md").write_text(team_index)

print(f"✅ wiki/team/ regenerado:")
print(f"   - {len(agents_data)} agent pages")
print(f"   - {len(squads_list)} squad pages + index")
print(f"   - {len(DEPARTMENTS)} department pages + index")
print(f"   - wiki/team/index.md (hub geral)")
