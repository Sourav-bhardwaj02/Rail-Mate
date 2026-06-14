import cv2

from insightface.app import FaceAnalysis

from app.recognition.face_matcher import (
    match_face
)

face_app = FaceAnalysis(
    providers=["CPUExecutionProvider"]
)

face_app.prepare(
    ctx_id=0,
    det_size=(640,640)
)

image = cv2.imread(
    "../backend/uploads/1781337724052-561695988.jpeg"
)
faces = face_app.get(
    image
)

embedding = faces[0].embedding

score = match_face(
    embedding,
    "person1"
)

print(
    "MATCH SCORE:",
    score
)