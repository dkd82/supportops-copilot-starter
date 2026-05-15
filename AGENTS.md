# AGENTS.md — SupportOps Copilot

> Fichier de contexte permanent lu automatiquement par OpenAI Codex à chaque session.
> Toute règle ici s'applique à **tous** les prompts de tous les TPs.

## 1. Mission produit

**SupportOps Copilot** est un outil interne de gestion d'incidents support pour
les équipes SaaS. L'application doit permettre, depuis un navigateur :

1. Créer un incident (client, sévérité, description).
2. Lister/filtrer les incidents (priorité, SLA, statut).
3. Voir le détail d'un incident (timeline + assistant IA).
4. Obtenir une recommandation de triage générée par IA (avec fallback).

> **Règle d'or** : si un changement ne renforce pas un de ces 4 parcours visibles,
> il est hors trajectoire et doit être justifié.

## 2. Stack imposée

| Couche       | Techno                                | Localisation          |
|--------------|---------------------------------------|-----------------------|
| Backend API  | Node.js 20 + Express 4 + better-sqlite3 | `apps/api/`         |
| Frontend     | React 18 + Vite 5                     | `apps/web/`           |
| Base de données | SQLite locale (fichier `data/support.db`) | `apps/api/data/` |
| Assistant IA | OpenAI Responses API + tool calling   | `apps/api/src/ai/`    |
| Tests API    | Vitest + supertest                    | `apps/api/tests/`     |
| Lint         | ESLint config par défaut Vite         | racine de chaque app  |

**Interdits** : changer de framework, ajouter TypeScript sans demande explicite,
ajouter une UI library lourde (MUI, Antd). Tailwind autorisé via CDN uniquement.

## 3. Contrats JSON (à respecter strictement)

```jsonc
// POST /incidents (body)
{ "customerId": "cust_123", "title": "string", "description": "string", "severity": "low|medium|high|critical" }

// Incident (réponse)
{ "id": "inc_...", "customerId": "...", "title": "...", "description": "...",
  "severity": "...", "priority": "P1|P2|P3|P4", "status": "open|in_progress|resolved",
  "slaDueAt": "ISO-8601", "createdAt": "ISO-8601" }

// POST /triage (body)
{ "incidentId": "inc_..." }
// → { "priority": "P1..P4", "rationale": "string", "suggestedActions": ["..."] }
```

## 4. Modes Codex à utiliser

| Situation                              | Mode dominant | Approval        | Sandbox          |
|----------------------------------------|---------------|-----------------|------------------|
| Spec floue, grosse feature, refactor   | **Plan**      | on-request      | read-only        |
| Changement localisé déjà cadré         | **Code**      | on-request      | workspace-write  |
| Échec test/build/runtime               | **Debug**     | on-failure      | workspace-write  |
| Avant merge / livraison                | **Review**    | on-request      | read-only        |
| Tâches longues, parallèles, full-stack | **Agent**     | on-request      | workspace-write  |

> Toujours commencer en **Plan** si la tâche fait plus de ~30 lignes de diff.

## 5. Définition of Done (DoD)

Un changement n'est "fait" que si **tous** les points suivants sont vrais :

- [ ] `npm test --workspace apps/api` passe (au moins 1 test couvre le comportement modifié).
- [ ] `npm run build --workspace apps/web` réussit sans warning bloquant.
- [ ] L'écran impacté reste utilisable en mode démo (sans backend si demandé).
- [ ] Le contrat JSON modifié est documenté dans `docs/architecture.md`.
- [ ] Pas de secret commité (cf. `.gitignore`).
- [ ] Codex a produit un résumé du diff avec **risques restants** explicites.

## 6. Conventions de code

- Indentation 2 espaces, point-virgule obligatoire côté JS.
- Nommage : `camelCase` pour variables/fonctions, `PascalCase` pour composants React, `kebab-case` pour fichiers de routes.
- Pas de `console.log` en code livré (utiliser un logger minimal).
- Erreurs API : toujours `{ "error": "code", "message": "human readable" }` avec status HTTP cohérent.

## 7. Sécurité (bornes pour Codex)

- Aucun appel à `OPENAI_API_KEY` côté frontend.
- Aucune écriture en base depuis un tool exposé au modèle (les tools sont **read-only**).
- Pas de `dangerouslySetInnerHTML` côté React.
- Variables d'environnement uniquement via `.env.local` (jamais commité).

## 8. Méthode de prompting : RECC

Tout prompt non trivial doit suivre **RECC** :

- **R**ôle — qui Codex incarne (tech lead, reviewer, debugger, architecte…)
- **E**xigence — résultat observable et testable attendu
- **C**ontexte — repo, stack, fichiers, état actuel, hypothèses
- **C**ontraintes & critères — fichiers autorisés, sécurité, tests, build, format final

Voir `prompts/` pour les gabarits réutilisables.
