import React, { useState, useEffect } from "react";
import axios from "axios";

function Historico() {
  const [history, setHistory] = useState([]);

  useEffect(() => {
    const fetchHistory = async () => {
      try {
        const response = await axios.get("http://localhost:3001/score/get-user-scores", {
          headers: { accessToken: localStorage.getItem("accessToken") },
        });
        setHistory(response.data);
      } catch (error) {
        console.error("Error fetching history:", error);
      }
    };

    fetchHistory();
  }, []);

  return (
    <div>
      <h2>User History</h2>
      <ul>
        {history.map((entry) => (
          <li key={entry.id}>
            Score: {entry.score}, Date: {entry.createdAt}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Historico;
