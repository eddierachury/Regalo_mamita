from fastapi import APIRouter

from app.api.content import router as content_router
from app.api.media import router as media_router

router = APIRouter()
router.include_router(content_router)
router.include_router(media_router)
