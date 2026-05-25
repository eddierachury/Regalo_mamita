# Regalo_mamita - Museo de Mamá
Proyecto full-stack emocional para celebrar a mamá con recuerdos, carta interactiva, música opcional y celebración final.

## Stack
- Backend: FastAPI
- Frontend: React + Vite + Tailwind + Framer Motion

## Estructura
Raíz incluye `backend/`, `frontend/`, `docs/`, `input/` y sin carpeta anidada `museo-mama/`.

## Setup local
- Backend: `cd backend && python -m venv .venv && source .venv/bin/activate && pip install -r requirements.txt && uvicorn app.main:app --reload`
- Frontend: `cd frontend && npm install && npm run dev`

## Estado actual
Base funcional creada con contenido personalizado y endpoints JSON.

## Media privada manual
- `backend/app/static/music/madrecita-querida.mp3`
- `backend/app/static/videos/ecuacion_mama.mp4`
