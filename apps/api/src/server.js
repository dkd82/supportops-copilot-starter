// apps/api/src/server.js — squelette minimal volontaire.
// Codex va l'étoffer au TP1. NE PAS écrire toute la logique ici à la main.
import express from 'express';

export function createApp() {
  const app = express();
  app.use(express.json());

  app.get('/health', (_req, res) => {
    res.status(200).json({ status: 'ok' });
  });

  // TODO TP1 : POST /incidents, GET /incidents, GET /incidents/:id, POST /triage

  return app;
}

if (import.meta.url === `file://${process.argv[1]}`) {
  const port = Number(process.env.PORT || 3001);
  createApp().listen(port, () => {
    console.log(`SupportOps API listening on http://localhost:${port}`);
  });
}
