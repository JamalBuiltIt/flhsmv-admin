import React, { useEffect, useState } from "react";

export default function DisplaySubmissions() {
  const [data, setData] = useState([]);

  useEffect(() => {
    fetch("https://flhsmv-backend.onrender.com/data")
      .then((res) => res.json())
      .then((data) => setData(data))
      .catch((err) => console.error("Error fetching data:", err));
  }, []);

  return (
    <div>
      <h2>Submitted Data</h2>
      <ul>
        {data.map((entry, index) => (
          <li key={index}>
            <pre>{JSON.stringify(entry, null, 2)}</pre>
          </li>
        ))}
      </ul>
    </div>
  );
}
