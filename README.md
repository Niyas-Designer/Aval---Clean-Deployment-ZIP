# ORU HELLO 🎵

Responsive React website starter, structured to grow page by page.

## Requirements
Node.js 20.19+ or 22.12+ and npm.

## Start frontend
```bash
npm install
npm run dev
```
Open http://localhost:5173

## Optional backend
Start in a second terminal:
```bash
npm run dev:backend
```
Test http://localhost:3001/api/health

The frontend can work without the backend. Add API and persistence only if future page requirements demand them.

## Structure
- `frontend/` — React/Vite/TypeScript responsive UI
- `frontend/src/app/` — app composition and future routing
- `frontend/src/pages/` — page-by-page screens
- `frontend/src/components/` — reusable components
- `frontend/src/assets/audio/` — approved local audio files (none bundled)
- `backend/` — optional Express/TypeScript API
- `shared/` — future contracts/types
- `docs/` — decisions and implementation notes

### Note
No audio or song lyrics are included yet. User will supply exact final website requirements and approve the chosen track. No data collection endpoint is active.
