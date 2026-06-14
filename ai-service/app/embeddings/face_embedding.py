import cv2
import numpy as np
from insightface.app import FaceAnalysis

face_app = FaceAnalysis(
    providers=["CPUExecutionProvider"]
)

face_app.prepare(
    ctx_id=0,
    det_size=(640, 640)
)

def generate_embedding(file_bytes):

    image_np = np.frombuffer(
        file_bytes,
        dtype=np.uint8
    )

    image = cv2.imdecode(
        image_np,
        cv2.IMREAD_COLOR
    )

    faces = face_app.get(image)

    if len(faces) == 0:
        return None

    return faces[0].embedding