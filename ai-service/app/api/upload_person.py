from fastapi import APIRouter
from fastapi import UploadFile
from fastapi import File

from app.embeddings.face_embedding import (
    generate_embedding
)

from app.matching.faiss_index import (
    add_person
)

router = APIRouter()


@router.post("/upload-person")
async def upload_person(
    person_id: str,
    image: UploadFile = File(...)
):

    try:

        print(
            "UPLOAD RECEIVED:",
            person_id
        )

        file_bytes = await image.read()

        print(
            "IMAGE SIZE:",
            len(file_bytes)
        )

        embedding = generate_embedding(
            file_bytes
        )

        if embedding is None:

            print(
                "NO FACE FOUND"
            )

            return {
                "success": False,
                "message": "No face found"
            }

        print(
            "EMBEDDING GENERATED"
        )

        add_person(
            person_id,
            embedding
        )

        print(
            "PERSON SAVED:",
            person_id
        )

        return {
            "success": True,
            "person_id": person_id
        }

    except Exception as e:

        print(
            "UPLOAD ERROR:",
            e
        )

        return {
            "success": False,
            "message": str(e)
        }