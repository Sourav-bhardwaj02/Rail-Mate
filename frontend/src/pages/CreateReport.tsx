import { useState } from "react";
import api from "../services/api";

export default function CreateReport() {

  const [fullName, setFullName] =
    useState("");

  const submitReport =
    async () => {

      try {

        const response =
          await api.post(
            "/reports",
            {
              fullName,
              age: 25,
              gender: "Male",
              description:
                "Missing Person",
              lastSeenStation:
                "New Delhi",
              reporterName:
                "Sourav",
              reporterPhone:
                "9999999999",
            }
          );

        console.log(
          response.data
        );

      } catch (error) {

        console.error(error);
      }
    };

  return (
    <div>

      <h1>
        Create Report
      </h1>

      <input
        value={fullName}
        onChange={(e) =>
          setFullName(
            e.target.value
          )
        }
        placeholder="Full Name"
      />

      <button
        onClick={submitReport}
      >
        Submit
      </button>

    </div>
  );
}