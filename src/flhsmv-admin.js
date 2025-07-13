import React, { useEffect, useState } from "react";

export default function DisplaySubmissions() {
  const [data, setData] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  // ✅ Use environment variable or fallback
  const API_URL = process.env.REACT_APP_API_URL || "https://flhsmv-backend.onrender.com";

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await fetch(`${API_URL}/data`, {
          headers: {
            Accept: "application/json"
          }
        });

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status} ${response.statusText}`);
        }

        let jsonData;
        try {
          jsonData = await response.json();
        } catch (jsonErr) {
          throw new Error("Failed to parse JSON response: " + jsonErr.message);
        }

        if (!Array.isArray(jsonData)) {
          throw new Error("Response data is not an array");
        }

        setData(jsonData);
      } catch (err) {
        console.error("Error fetching or processing data:", err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [API_URL]);

  if (loading) {
    return <p>Loading submissions...</p>;
  }

  if (error) {
    return (
      <div style={{ color: "red" }}>
        <p>Error loading data: {error}</p>
        <p>Check your backend server is running and accessible at the given URL.</p>
      </div>
    );
  }

  if (data.length === 0) {
    return <p>No submissions found.</p>;
  }

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
