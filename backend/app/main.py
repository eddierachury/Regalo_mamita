from pathlib import Path

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles

from app.api.routes import router as api_router

app = FastAPI(
    title="Museo de Mamá API",
    description="Backend API for the Museo de Mamá emotional birthday website.",
    version="1.0.0",
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],
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


@app.get("/")
def read_root():
    return {
        "message": "Museo de Mamá API is running",
        "docs": "/docs",
        "museum": "/api/museum",
    }