from pathlib import Path

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import FileResponse, HTMLResponse
from fastapi.staticfiles import StaticFiles

from app.api.routes import router as api_router

app = FastAPI(
    title="Museo de Mamá API",
    description="Backend API for the Museo de Mamá emotional birthday website.",
    version="1.0.0",
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:5173",
        "http://localhost:5174",
        "http://localhost:8000",
        "http://127.0.0.1:8000",
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Path resolution
# __file__ = backend/app/main.py
APP_DIR = Path(__file__).resolve().parent
BACKEND_DIR = APP_DIR.parent
PROJECT_ROOT = BACKEND_DIR.parent

# Images are stored in input/images to avoid duplicating binary files in backend/app/static/images
INPUT_IMAGES_DIR = PROJECT_ROOT / "input" / "images"

# Standard backend static folders
APP_STATIC_DIR = APP_DIR / "static"
FALLBACK_IMAGES_DIR = APP_STATIC_DIR / "images"
MUSIC_DIR = APP_STATIC_DIR / "music"
VIDEOS_DIR = APP_STATIC_DIR / "videos"

# Ensure non-binary static folders exist
MUSIC_DIR.mkdir(parents=True, exist_ok=True)
VIDEOS_DIR.mkdir(parents=True, exist_ok=True)
FALLBACK_IMAGES_DIR.mkdir(parents=True, exist_ok=True)

# Prefer input/images if available, otherwise fallback to backend/app/static/images
images_dir = INPUT_IMAGES_DIR if INPUT_IMAGES_DIR.exists() else FALLBACK_IMAGES_DIR

app.mount("/static/images", StaticFiles(directory=str(images_dir)), name="static-images")
app.mount("/static/music", StaticFiles(directory=str(MUSIC_DIR)), name="static-music")
app.mount("/static/videos", StaticFiles(directory=str(VIDEOS_DIR)), name="static-videos")

app.include_router(api_router)

# ── Built frontend serving (production / one-click mode) ──
FRONTEND_DIST_DIR = PROJECT_ROOT / "frontend" / "dist"
FRONTEND_INDEX = FRONTEND_DIST_DIR / "index.html"

# Mount the Vite-built assets directory if the build exists
if FRONTEND_DIST_DIR.exists() and (FRONTEND_DIST_DIR / "assets").exists():
    app.mount(
        "/assets",
        StaticFiles(directory=str(FRONTEND_DIST_DIR / "assets")),
        name="frontend-assets",
    )


@app.get("/")
def read_root():
    """Serve the built React app if available, otherwise return API info."""
    if FRONTEND_INDEX.exists():
        return FileResponse(str(FRONTEND_INDEX), media_type="text/html")
    return HTMLResponse(
        content=(
            "<html><body style='font-family:sans-serif;text-align:center;padding:3rem'>"
            "<h1>🌸 Museo de Mamá — API está corriendo</h1>"
            "<p>El frontend no está construido todavía.</p>"
            "<p>Ejecuta <code>build-museo.bat</code> en la raíz del proyecto y luego reinicia el servidor.</p>"
            "<hr><p><a href='/docs'>Documentación de la API</a> · "
            "<a href='/api/museum'>Datos del museo</a></p>"
            "</body></html>"
        ),
        status_code=200,
    )


@app.get("/{full_path:path}")
def spa_fallback(full_path: str):
    """
    Catch-all for client-side routing.
    Any path that is not /api/*, /static/*, or /assets/* will receive the
    React index.html so the frontend router can handle it.
    """
    if FRONTEND_INDEX.exists():
        return FileResponse(str(FRONTEND_INDEX), media_type="text/html")
    return HTMLResponse(
        content=(
            "<html><body style='font-family:sans-serif;text-align:center;padding:3rem'>"
            "<h1>🌸 Museo de Mamá</h1>"
            "<p>Frontend no encontrado. Ejecuta <code>build-museo.bat</code> primero.</p>"
            "</body></html>"
        ),
        status_code=200,
    )