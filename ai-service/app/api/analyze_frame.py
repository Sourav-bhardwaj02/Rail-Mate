from fastapi import APIRouter
from pydantic import BaseModel

import cv2
import base64
import numpy as np
import os

from insightface.app import FaceAnalysis
from app.recognition.face_matcher import match_face

router = APIRouter()

face_app = FaceAnalysis(
    providers=["CPUExecutionProvider"]
)

face_app.prepare(
    ctx_id=-1,
    det_size=(1280, 1280)
)


class FrameRequest(BaseModel):
    frame: str


@router.post("/analyze-frame")
async def analyze_frame(
    data: FrameRequest
):

    try:

        image_data = data.frame.split(",")[1]

        image_bytes = base64.b64decode(
            image_data
        )

        image_np = np.frombuffer(
            image_bytes,
            dtype=np.uint8
        )

        image = cv2.imdecode(
            image_np,
            cv2.IMREAD_COLOR
        )

        if image is None:

            print(
                "IMAGE DECODE FAILED"
            )

            return {
                "found": False,
                "confidence": 0
            }

        print(
            "IMAGE SHAPE:",
            image.shape
        )

        cv2.imwrite(
            "debug_frame.jpg",
            image
        )

        faces = face_app.get(
            image
        )

        print(
            "FACES FOUND:",
            len(faces)
        )

        if len(faces) == 0:

            return {
                "found": False,
                "confidence": 0
            }

        face = faces[0]

        box = face.bbox.astype(
            int
        )

        print(
            "FACE BOX:",
            box
        )

        embeddings_dir = (
            "storage/embeddings"
        )

        if not os.path.exists(
            embeddings_dir
        ):

            print(
                "EMBEDDINGS FOLDER NOT FOUND"
            )

            return {
                "found": False,
                "confidence": 0
            }

        registered_people = [
            f.replace(
                ".pkl",
                ""
            )
            for f in os.listdir(
                embeddings_dir
            )
            if f.endswith(
                ".pkl"
            )
        ]

        print(
            "REGISTERED PEOPLE:",
            registered_people
        )

        if len(
            registered_people
        ) == 0:

            print(
                "NO REGISTERED PERSON"
            )

            return {
                "found": False,
                "confidence": 0
            }

        best_score = 0
        best_person = None

        for person_id in registered_people:

            try:

                score = match_face(
                    face.embedding,
                    person_id
                )

                print(
                    person_id,
                    score
                )

                if score > best_score:

                    best_score = score
                    best_person = person_id

            except Exception as e:

                print(
                    "MATCH ERROR:",
                    person_id,
                    str(e)
                )

        print(
            "BEST MATCH:",
            best_person
        )

        print(
            "BEST SCORE:",
            best_score
        )

        return {
            "found": best_score > 0.60,
            "confidence": float(
                best_score
            ),
            "person": best_person
        }

    except Exception as e:

        print(
            "AI ERROR:",
            str(e)
        )

        return {
            "found": False,
            "confidence": 0
        }