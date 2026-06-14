from fastapi import FastAPI
from app.api.upload_person import router as upload_router
from app.api.match_person import router as match_router
from app.api.analyze_frame import (
    router as analyze_router
)

app = FastAPI(title="Missing Person AI Service")

app.include_router(upload_router, prefix="/api")
app.include_router(match_router, prefix="/api")
app.include_router(
    analyze_router,
    prefix="/api"
)

@app.get("/")
def root():
    return {
        "success": True,
        "message": "AI Service Running"
    }