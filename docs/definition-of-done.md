# Definition of Done — SupportOps Copilot

Un changement est terminé **uniquement** si la checklist ci-dessous est cochée.
Cette checklist sert aussi de prompt de **Review** en fin de TP.

## Backend

- [ ] Les routes touchées renvoient les bons codes HTTP (200/201/400/404/502).
- [ ] Le contrat JSON est conforme à `docs/architecture.md`.
- [ ] Au moins un test Vitest couvre le happy path **et** un test couvre une erreur.
- [ ] `npm test --workspace apps/api` passe en local.
- [ ] Aucune écriture en DB depuis un tool exposé au modèle IA.

## Frontend

- [ ] L'écran touché reste utilisable sans backend (mock data si `VITE_API_BASE_URL` absent).
- [ ] `npm run build --workspace apps/web` passe sans warning bloquant.
- [ ] Les états vide / chargement / erreur sont visibles.
- [ ] Pas de `console.log` ni `dangerouslySetInnerHTML`.

## IA (si concernée)

- [ ] La fonction est désactivée proprement si `OPENAI_API_KEY` est absent (fallback visible).
- [ ] Les tools sont read-only et bornés (timeouts + limites de résultats).
- [ ] Le panneau assistant affiche : prompt envoyé (résumé), tool calls, réponse finale.

## Documentation / livraison

- [ ] `docs/architecture.md` à jour si un contrat change.
- [ ] README mis à jour si une variable d'env est ajoutée.
- [ ] Pas de secret commité (`.env*` ignorés).
- [ ] Codex a produit un résumé du diff avec **risques restants** explicites.
