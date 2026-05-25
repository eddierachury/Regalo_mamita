from fastapi import APIRouter

from app.services.content_service import (
    get_gallery,
    get_letter,
    get_museum_bundle,
    get_profile,
    get_settings,
    get_timeline,
)

router = APIRouter(prefix="/api", tags=["content"])


@router.get("/profile")
def profile():
    return get_profile()


@router.get("/timeline")
def timeline():
    return get_timeline()


@router.get("/gallery")
def gallery():
    return get_gallery()


@router.get("/letter")
def letter():
    return get_letter()


@router.get("/settings")
def settings():
    return get_settings()


@router.get("/museum")
def museum():
    return get_museum_bundle()
