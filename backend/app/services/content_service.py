from __future__ import annotations

import json
from json import JSONDecodeError
from pathlib import Path
from typing import Any

from fastapi import HTTPException

DATA_DIR = Path(__file__).resolve().parents[1] / "data"


def load_json_file(filename: str) -> Any:
    path = DATA_DIR / filename
    if not path.exists():
        raise HTTPException(status_code=404, detail=f"Missing content file: {filename}")
    try:
        with path.open("r", encoding="utf-8") as f:
            return json.load(f)
    except JSONDecodeError as exc:
        raise HTTPException(status_code=500, detail=f"Invalid JSON in {filename}: {exc.msg}") from exc


def get_profile() -> dict[str, Any]:
    return load_json_file("profile.json")


def get_timeline() -> list[dict[str, Any]]:
    return load_json_file("timeline.json")


def get_gallery() -> list[dict[str, Any]]:
    return load_json_file("gallery.json")


def get_letter() -> dict[str, Any]:
    return load_json_file("letter.json")


def get_settings() -> dict[str, Any]:
    return load_json_file("settings.json")


def get_museum_bundle() -> dict[str, Any]:
    data: dict[str, Any] = {}
    errors: dict[str, str] = {}
    keys = {
        "profile": get_profile,
        "timeline": get_timeline,
        "gallery": get_gallery,
        "letter": get_letter,
        "settings": get_settings,
    }
    for key, loader in keys.items():
        try:
            data[key] = loader()
        except HTTPException as exc:
            data[key] = {} if key in {"profile", "letter", "settings"} else []
            errors[key] = exc.detail
    if errors:
        data["errors"] = errors
    return data
