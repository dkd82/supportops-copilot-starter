# Architecture — SupportOps Copilot

## Vue d'ensemble

```
┌────────────────────┐      HTTP JSON      ┌─────────────────────┐
│  React / Vite      │ ──────────────────► │  Express API         │
│  apps/web          │ ◄────────────────── │  apps/api            │
│  - Dashboard       │                     │  - /health           │
│  - Création        │                     │  - /incidents (CRUD) │
│  - Détail          │                     │  - /triage (IA)      │
│  - Assistant panel │                     │                      │
└────────────────────┘                     └──────────┬──────────┘
                                                       │
                                              ┌────────┴────────┐
                                              │  SQLite local   │
                                              │  data/support.db│
                                              └────────┬────────┘
                                                       │
                                              ┌────────┴────────────┐
                                              │  OpenAI Responses   │
                                              │  + tools internes   │
                                              │  (read-only DB)     │
                                              └─────────────────────┘
```

## Endpoints API (contrats stables)

| Méthode | Route               | Rôle                            | Statuts attendus |
|---------|---------------------|---------------------------------|------------------|
| GET     | `/health`           | Smoke test serveur              | 200              |
| POST    | `/incidents`        | Crée un incident                | 201, 400         |
| GET     | `/incidents`        | Liste + filtres `?severity&status` | 200            |
| GET     | `/incidents/:id`    | Détail incident                 | 200, 404         |
| POST    | `/triage`           | Demande recommandation IA       | 200, 400, 502    |

## Schéma SQLite

```sql
CREATE TABLE customers (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  plan TEXT NOT NULL CHECK (plan IN ('free','pro','enterprise')),
  created_at TEXT NOT NULL
);

CREATE TABLE incidents (
  id TEXT PRIMARY KEY,
  customer_id TEXT NOT NULL REFERENCES customers(id),
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  severity TEXT NOT NULL CHECK (severity IN ('low','medium','high','critical')),
  priority TEXT NOT NULL CHECK (priority IN ('P1','P2','P3','P4')),
  status TEXT NOT NULL CHECK (status IN ('open','in_progress','resolved')),
  sla_due_at TEXT NOT NULL,
  created_at TEXT NOT NULL
);

CREATE TABLE incident_events (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  incident_id TEXT NOT NULL REFERENCES incidents(id),
  kind TEXT NOT NULL,
  payload TEXT NOT NULL,
  created_at TEXT NOT NULL
);
```

## Tools IA exposés (read-only)

| Tool                          | Entrée               | Sortie                          |
|-------------------------------|----------------------|---------------------------------|
| `get_customer_profile`        | `{ customerId }`     | `{ name, plan, since }`         |
| `get_sla_status`              | `{ incidentId }`     | `{ slaDueAt, remainingMinutes }` |
| `search_similar_incidents`    | `{ query, limit }`   | `[{ id, title, resolution }]`   |

> Aucun tool n'écrit en base. L'IA propose, l'utilisateur applique via l'UI.
