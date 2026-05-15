# Operating Model Codex — règles d'équipe

Ce document décrit **comment l'équipe utilise Codex au quotidien** sur SupportOps Copilot.
Il est lu en complément d'`AGENTS.md`.

## 1. Choix du mode (rituel)

```
RECC → Plan → Code → Tests → Review → Debug si nécessaire → Docs → Démo web
```

- **Spec floue** → Plan (sandbox read-only).
- **Changement localisé déjà cadré** → Code (sandbox workspace-write).
- **Échec test/build/runtime** → Debug.
- **Avant merge** → Review (sandbox read-only).
- **Tâches longues parallélisables** → Agent (sous-agents disjoints).

## 2. Approbations

- Par défaut : `approval_policy = on-request`.
- Pour les TPs sensibles (TP3 Debug en CI, TP6 Multi-agents) : `on-failure` autorisé.
- **Jamais `never` sur main**.

## 3. Sécurité

- Pas de secret en clair dans le repo. `.env.local` uniquement.
- Pas de tool IA qui écrit en base.
- Sandbox `danger-full-access` interdit hors investigation explicite.

## 4. Documentation

- Toute modification de contrat JSON met à jour `docs/architecture.md` dans le même PR.
- Toute nouvelle variable d'env est documentée dans le README.
- Les décisions structurantes vivent dans `docs/adr/NNNN-titre.md`.

## 5. Communication des prompts

- Les prompts qui marchent sont remontés dans `prompts/` (RECC + mode + validations).
- Les prompts qui ratent sont notés dans `docs/anti-patterns.md` avec la raison.
