import { useState } from "react";
import api from "../services/api";

export default function RegisterPerson() {

  const [images, setImages] =
    useState<FileList | null>(null);

  const uploadImages =
    async () => {

      if (!images) return;

      const formData =
        new FormData();

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

      const response =
        await api.post(
          "/upload",
          formData
        );

      console.log(
        response.data
      );
    };

  return (
    <div>

      <h1>
        Upload Missing Person
      </h1>

      <input
        type="file"
        multiple
        onChange={(e) =>
          setImages(
            e.target.files
          )
        }
      />

      <button
        onClick={uploadImages}
      >
        Upload
      </button>

    </div>
  );
}