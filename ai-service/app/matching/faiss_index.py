import os
import pickle
import numpy as np

EMBEDDING_DIR = "storage/embeddings"

os.makedirs(
    EMBEDDING_DIR,
    exist_ok=True
)


def add_person(
    person_id,
    embedding
):

    file_path = (
        f"{EMBEDDING_DIR}/"
        f"{person_id}.pkl"
    )

    with open(
        file_path,
        "wb"
    ) as f:

        pickle.dump(
            embedding,
            f
        )

    print(
        "REGISTERED:",
        person_id
    )


def get_person(
    person_id
):

    file_path = (
        f"{EMBEDDING_DIR}/"
        f"{person_id}.pkl"
    )

    if not os.path.exists(
        file_path
    ):
        return None

    with open(
        file_path,
        "rb"
    ) as f:

        return pickle.load(f)


def search_person(
    embedding
):

    best_person = None
    best_score = -1

    for file_name in os.listdir(
        EMBEDDING_DIR
    ):

        if not file_name.endswith(
            ".pkl"
        ):
            continue

        person_id = (
            file_name
            .replace(".pkl", "")
        )

        saved_embedding = get_person(
            person_id
        )

        score = np.dot(
            embedding,
            saved_embedding
        ) / (
            np.linalg.norm(
                embedding
            )
            *
            np.linalg.norm(
                saved_embedding
            )
        )

        if score > best_score:

            best_score = score
            best_person = person_id

    if best_person is None:

        return None

    return {
        "person_id":
            best_person,
        "distance":
            float(best_score)
    }