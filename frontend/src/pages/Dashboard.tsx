import { useEffect, useState } from "react";
import axios from "axios";

export default function Dashboard() {
  const [matches, setMatches] =
    useState<any[]>([]);

  useEffect(() => {
    axios
      .get(
        `${import.meta.env.VITE_API_URL}/api/matches`
      )
      .then((res) =>
        setMatches(res.data.data)
      );
  }, []);

  return (
    <div>
      <h1>Matches</h1>

      {matches.map((match) => (
        <div key={match.id}>
          <h3>
            {match.personName}
          </h3>

          <p>
            {match.station}
          </p>

          <p>
            Confidence:
            {match.confidence}%
          </p>
        </div>
      ))}
    </div>
  );
}