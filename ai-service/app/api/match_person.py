from fastapi import APIRouter
from fastapi import UploadFile
from fastapi import File

from app.embeddings.face_embedding import (
    generate_embedding
)

from app.matching.faiss_index import (
    search_person
)

router = APIRouter()

@router.post("/match-person")
async def match_person(
    image: UploadFile = File(...)
):

    file_bytes = await image.read()

    embedding = generate_embedding(
        file_bytes
    )

    result = search_person(
        embedding
    )

    if result is None:

        return {
            "success": False,
            "message": "No persons registered"
        }

    return {
        "success": True,
        "match": result
    }