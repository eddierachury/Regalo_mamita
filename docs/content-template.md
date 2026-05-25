# Content Template

## JSON content files
- `profile.json`: datos principales de mamá y hero.
- `timeline.json`: 6 recuerdos con `date`, `title`, `description`, `image`, `imageAlt`.
- `gallery.json`: 14 fotos con `title`, `description`, `image`, `imageAlt`.
- `letter.json`: título, intro, botón, párrafos, firma.
- `settings.json`: música, video, tema y mensaje final.

## Cómo actualizar imágenes
- En este repositorio, las imágenes fuente se almacenan en `input/images/`.
- El backend las expone públicamente mediante rutas `/static/images/`.
- En los JSON, siempre usar rutas como `/static/images/[filename]`.
- No usar rutas `input/images/...` en los JSON.
- No duplicar imágenes dentro de `backend/app/static/images/` salvo un caso manual de despliegue que lo requiera.

## Música local (manual)
Agregar manualmente: `backend/app/static/music/madrecita-querida.mp3`

## Video Manim (manual)
Agregar manualmente: `backend/app/static/videos/ecuacion_mama.mp4`

## Archivos manuales requeridos
- `backend/app/static/music/madrecita-querida.mp3`
- `backend/app/static/videos/ecuacion_mama.mp4`
