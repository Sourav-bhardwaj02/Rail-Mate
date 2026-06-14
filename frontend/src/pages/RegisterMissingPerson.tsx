import { useState } from "react";
import api from "../services/api";
import { useNavigate } from "react-router-dom";

export default function RegisterMissingPerson() {

  const [fullName, setFullName] =
    useState("");

  const [images, setImages] =
    useState<FileList | null>(null);
const navigate = useNavigate();
  const submit = async () => {

    const formData =
      new FormData();

    formData.append(
      "fullName",
      fullName
    );

    formData.append(
      "age",
      "25"
    );

    formData.append(
      "gender",
      "Male"
    );

    formData.append(
      "description",
      "Missing Person"
    );

    formData.append(
      "lastSeenStation",
      "New Delhi"
    );

    formData.append(
      "reporterName",
      "Sourav"
    );

    formData.append(
      "reporterPhone",
      "9999999999"
    );

    if (images) {

      for (
        let i = 0;
        i < images.length;
        i++
      ) {
        formData.append(
          "images",
          images[i]
        );
      }
    }

    const response =
      await api.post(
        "/reports",
        formData
      );

    console.log(
      response.data
    );   
    navigate("/camera");
  };

  return (
    <div>

      <h1>
        Missing Person Report
      </h1>

      <input
        placeholder="Full Name"
        value={fullName}
        onChange={(e) =>
          setFullName(
            e.target.value
          )
        }
      />

      <br />

      <input
        type="file"
        multiple
        onChange={(e) =>
          setImages(
            e.target.files
          )
        }
      />

      <br />

      <button
        onClick={submit}
      >
        Submit
      </button>

    </div>
  );
}