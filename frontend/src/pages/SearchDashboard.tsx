import axios from "axios";

export default function SearchDashboard() {

  const search = async () => {

    const result =
      await axios.post(
        "http://localhost:5000/api/search",
        {
          profile:
            "Missing Person Profile",
          frame:
            "Current Camera Frame",
        }
      );

    console.log(
      result.data
    );
  };

  return (
    <div>
      <h1>
        Search Dashboard
      </h1>

      <button
        onClick={search}
      >
        Start Search
      </button>
    </div>
  );
}