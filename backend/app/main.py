from pathlib import Path

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles

from app.api.routes import router as api_router

app = FastAPI(title="Museo de Mamá API")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

BASE_DIR = Path(__file__).resolve().parents[1]
REPO_ROOT = BASE_DIR.parents[1]
INPUT_IMAGES_DIR = REPO_ROOT / "input" / "images"
BACKEND_STATIC_DIR = BASE_DIR / "static"

images_dir = INPUT_IMAGES_DIR if INPUT_IMAGES_DIR.exists() else BACKEND_STATIC_DIR / "images"

app.mount("/static/images", StaticFiles(directory=str(images_dir)), name="static-images")
app.mount("/static/music", StaticFiles(directory=str(BACKEND_STATIC_DIR / "music")), name="static-music")
app.mount("/static/videos", StaticFiles(directory=str(BACKEND_STATIC_DIR / "videos")), name="static-videos")

app.include_router(api_router)


@app.get("/")
def root():
    return {"message": "Museo de Mamá API running"}
