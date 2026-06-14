import numpy as np

from app.matching.faiss_index import (
    get_person
)

def match_face(
    embedding,
    person_id
):

    stored_embedding = (
        get_person(
            person_id
        )
    )

    if stored_embedding is None:

        print(
            "NO REGISTERED PERSON"
        )

        return 0

    similarity = (
        np.dot(
            embedding,
            stored_embedding
        )
        /
        (
            np.linalg.norm(
                embedding
            )
            *
            np.linalg.norm(
                stored_embedding
            )
        )
    )

    return float(
        similarity
    )