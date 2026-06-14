import cv2

from insightface.app import FaceAnalysis
from app.recognition.face_matcher import match_face

face_app = FaceAnalysis(
    providers=["CPUExecutionProvider"]
)

face_app.prepare(
    ctx_id=0,
    det_size=(640, 640)
)

cap = cv2.VideoCapture(0)

while True:

    success, frame = cap.read()

    if not success:
        break

    faces = face_app.get(frame)

    for face in faces:

        score = match_face(
            face.embedding,
            "person1"
        )

        box = face.bbox.astype(int)

        x1, y1, x2, y2 = box

        color = (0, 0, 255)
        label = f"UNKNOWN {score:.2f}"

        if score > 0.60:

            color = (0, 255, 0)
            label = f"MATCH {score:.2f}"

        cv2.rectangle(
            frame,
            (x1, y1),
            (x2, y2),
            color,
            2
        )

        cv2.putText(
            frame,
            label,
            (x1, y1 - 10),
            cv2.FONT_HERSHEY_SIMPLEX,
            0.7,
            color,
            2
        )

    cv2.imshow(
        "Missing Person Finder",
        frame
    )

    key = cv2.waitKey(1)

    if key == 27:
        break

cap.release()
cv2.destroyAllWindows()