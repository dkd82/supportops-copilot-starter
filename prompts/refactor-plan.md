# Gabarit — Plan de refactor (mode Plan)

```
Mode : Plan
R : Architecte logiciel chargé d'un refactor sans régression visible.
E : Produis un plan de refactor pour « <ZONE_DU_CODE> » en respectant la règle
    « aucun refactor ne vaut une démo cassée ». Plan attendu :
      1. Tests de caractérisation à écrire AVANT toute modification.
      2. Découpe en petites étapes (chaque étape doit laisser le repo vert).
      3. Liste des invariants UI/API à préserver.
      4. ADR court (Architecture Decision Record) justifiant le choix.
      5. Critère d'arrêt si le ROI devient négatif.
C : Repo SupportOps Copilot. Code legacy concerné : <CHEMINS>.
    Comportement visible actuel : <DASHBOARD/DETAIL/ASSISTANT/…>.
C : - Pas de code généré dans cette étape.
    - Pas de changement de stack ni de contrat JSON.
    - Plan en français, max 70 lignes.
```
