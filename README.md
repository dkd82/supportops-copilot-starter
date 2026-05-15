# SupportOps Copilot — Workspace formation OpenAI Codex

Workspace de départ pour la formation **OpenAI Codex pour développeurs web (2 jours)**.
Le fil rouge est **SupportOps Copilot**, un outil interne de gestion d'incidents support.

## Pré-requis

- Node.js ≥ 20, npm ≥ 10
- Un compte ChatGPT Plus/Pro/Business **ou** une `OPENAI_API_KEY`
- OpenAI Codex CLI installé : `npm install -g @openai/codex`
- Git ≥ 2.40

## Démarrage

```bash
# 1. Cloner le repo
git clone <URL_DU_REPO_FORMATEUR> supportops
cd supportops

# 2. Lancer Codex depuis la racine (il lira AGENTS.md automatiquement)
codex
```

## Arborescence

```
supportops/
├── AGENTS.md                 # contexte permanent lu par Codex
├── .codex/config.toml        # profils, sandbox, approbations
├── docs/
│   ├── architecture.md       # contrats JSON, schéma DB, parcours
│   └── definition-of-done.md # checklist de fin de TP
├── prompts/                  # gabarits de prompts RECC réutilisables
│   ├── 00_context.md
│   ├── feature-plan.md
│   ├── fullstack-feature.md
│   ├── bug-diagnosis.md
│   ├── review-pr.md
│   ├── refactor-plan.md
│   └── codex-operating-model.md
└── apps/
    ├── api/                  # backend Express + SQLite
    └── web/                  # frontend React + Vite
```

## Suivre la formation

Ouvre le notebook `TP-OpenAI-Codex.ipynb` (fourni par le formateur) et déroule
les TPs dans l'ordre : TP0 → TP8. Chaque TP indique le **mode** Codex à utiliser
et le **prompt RECC** à coller.
