import cv2
import pickle

from insightface.app import FaceAnalysis

face_app = FaceAnalysis(
    providers=["CPUExecutionProvider"]
)

face_app.prepare(
    ctx_id=0,
    det_size=(640, 640)
)


def register_person(
    image_path,
    person_id
):

    image = cv2.imread(
        image_path
    )

    faces = face_app.get(
        image
    )

    if len(faces) == 0:
        print("No face found")
        return

    embedding = faces[0].embedding

    with open(
        f"storage/embeddings/{person_id}.pkl",
        "wb"
    ) as f:

        pickle.dump(
            embedding,
            f
        )

    print(
        "Registered:",
        person_id
    )