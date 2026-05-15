# 00 — Prompt de contexte (à coller en début de session si besoin)

> Codex lit déjà `AGENTS.md`. Ce prompt sert quand tu veux **re-cadrer**
> une session qui dérive, ou ouvrir une nouvelle conversation rapide.

```
Mode : Plan
R (Rôle)      : Tu es tech lead du projet SupportOps Copilot.
E (Exigence)  : Confirme en 5 puces ce que tu sais du projet à partir de AGENTS.md
                et de docs/architecture.md, puis liste les zones grises que je
                dois clarifier avant de coder.
C (Contexte)  : Repo monorepo apps/api (Express+SQLite) et apps/web (React+Vite).
                Fil rouge : créer/lister/voir un incident + assistant IA.
C (Critères)  : Pas d'écriture de fichier. Réponse en français. Liste tes
                hypothèses explicitement.
```
