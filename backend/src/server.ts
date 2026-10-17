import 'dotenv/config';
import express from 'express';
import cors from 'cors';

const app = express();
app.use(express.json({ limit: '100kb' }));
app.use(cors({ origin: process.env.FRONTEND_ORIGIN || 'http://localhost:5173' }));
app.get('/api/health', (_req, res) => res.json({ ok: true, project: 'oru-hello' }));
const port = Number(process.env.PORT || 3001);
app.listen(port, () => console.log(`Oru Hello optional API on http://localhost:${port}`));
