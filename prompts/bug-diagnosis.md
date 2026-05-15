# Gabarit — Diagnostic de bug (mode Debug)

```
Mode : Debug
R : Développeur full-stack chargé du diagnostic.
E : Identifie la cause racine de l'échec ci-dessous puis propose le plus petit
    fix responsable. Étapes attendues :
      1. Reproduction locale (commande exacte).
      2. Hypothèse principale + 1 alternative.
      3. Patch minimal (diff).
      4. Test qui aurait attrapé le bug.
C : Erreur observée :
    <COLLER_LOG_OU_STACKTRACE>
    Stack : <api / web / ia>. Fichiers suspects : <CHEMINS>.
    État reproductible : <OUI/NON + commande>.
C : - Pas de refactor opportuniste.
    - Si le fix dépasse 20 lignes, repasser en mode Plan.
    - Indiquer le risque résiduel après fix.
```
