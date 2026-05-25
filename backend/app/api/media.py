from fastapi import APIRouter

router = APIRouter(prefix="/api/media", tags=["media"])


@router.get("/health")
def media_health():
    return {"status": "ok"}
