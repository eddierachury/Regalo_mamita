# Regalo_mamita - Museo de Mamá
Proyecto full-stack emocional para celebrar a mamá con recuerdos, carta interactiva, música opcional y celebración final.

## Stack
- Backend: FastAPI
- Frontend: React + Vite + Tailwind + Framer Motion

## Estructura
Raíz incluye `backend/`, `frontend/`, `docs/`, `input/` y sin carpeta anidada `museo-mama/`.

---

## 🌸 Uso rápido (un solo clic)

### Paso 1 — Construir el frontend (solo la primera vez)
Haz doble clic en **`build-museo.bat`** en la raíz del proyecto.
Esto instala dependencias y construye el frontend. Solo necesitas hacerlo una vez (o cuando cambies el código del frontend).

### Paso 2 — Abrir el museo
Haz doble clic en **`start-museo.bat`**.
Se abrirá automáticamente en tu navegador en `http://127.0.0.1:8000`.

Para cerrar el servidor, cierra la ventana de la terminal o presiona `CTRL+C`.

---

## Setup de desarrollo
- Backend: `cd backend && python -m venv .venv && .venv\Scripts\activate && pip install -r requirements.txt && uvicorn app.main:app --reload`
- Frontend: `cd frontend && npm install && npm run dev`

En modo desarrollo el frontend corre en `:5173` y el backend en `:8000`. El archivo `frontend/.env.development` configura `VITE_API_BASE_URL=http://localhost:8000` automáticamente.

## Estado actual
Base funcional creada con contenido personalizado y endpoints JSON.

## Media privada manual
- `backend/app/static/music/madrecita-querida.mp3`
- `backend/app/static/videos/ecuacion_mama.mp4`
