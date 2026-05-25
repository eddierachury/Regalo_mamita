# Backend - Museo de Mamá

## Setup
1. cd backend
2. python -m venv .venv
3. source .venv/bin/activate (Windows: .venv\\Scripts\\activate)
4. pip install -r requirements.txt

## Run
uvicorn app.main:app --reload

## Endpoints
- GET /api/profile
- GET /api/timeline
- GET /api/gallery
- GET /api/letter
- GET /api/settings
- GET /api/museum
- GET /docs
