from pydantic import BaseModel
from typing import List


class TimelineItem(BaseModel):
    id: int
    date: str
    title: str
    description: str
    image: str
    imageAlt: str


class GalleryItem(BaseModel):
    id: int
    title: str
    description: str
    image: str
    imageAlt: str


class Letter(BaseModel):
    title: str
    intro: str
    buttonText: str
    paragraphs: List[str]
    signature: str
