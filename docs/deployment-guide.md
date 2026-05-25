# Deployment Guide

## Local development
- Backend: `cd backend && pip install -r requirements.txt && uvicorn app.main:app --reload`
- Frontend: `cd frontend && npm install && npm run dev`
- En local, las imágenes se sirven desde `input/images/` y se exponen como `/static/images/[filename]`.

## Build / Production
- Frontend build: `npm run build`
- Backend production: `uvicorn app.main:app --host 0.0.0.0 --port 8000`

## Environment variable
- `VITE_API_BASE_URL`

## Option A: split hosting
Frontend en Vercel/Netlify + Backend en Render/Railway.

## Option B: single VPS
VPS único con Nginx como reverse proxy para frontend estático y FastAPI.

## Images in production
Para producción tienes dos opciones:
1. Desplegar también `input/images/` junto con el backend para que `/static/images/` siga resolviendo desde ahí.
2. Copiar manualmente las imágenes al directorio estático de imágenes del backend y ajustar la ruta estática en `backend/app/main.py` si tu entorno lo requiere.
