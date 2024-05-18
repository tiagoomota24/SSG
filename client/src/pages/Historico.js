import React, { useState, useEffect } from "react";
import axios from "axios";
import "../styles/Historico.css";

function Historico() {
  const [history, setHistory] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [scoresPerPage] = useState(5);

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

  const formatDate = (dateString) => {
    const options = { year: "numeric", month: "long", day: "numeric", hour: "2-digit", minute: "2-digit" };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  const formatTime = (timeInSeconds) => {
    if (timeInSeconds < 60) {
      return `${timeInSeconds} segundos`;
    } else if (timeInSeconds < 3600) {
      const minutes = Math.floor(timeInSeconds / 60);
      const remainingSeconds = timeInSeconds % 60;
      return `${minutes} minuto${minutes > 1 ? "s" : ""} e ${remainingSeconds} segundo${remainingSeconds > 1 ? "s" : ""}`;
    } else {
      const hours = Math.floor(timeInSeconds / 3600);
      const remainingMinutes = Math.floor((timeInSeconds % 3600) / 60);
      return `${hours} hora${hours > 1 ? "s" : ""} e ${remainingMinutes} minuto${remainingMinutes > 1 ? "s" : ""}`;
    }
  };

  const indexOfLastScore = currentPage * scoresPerPage;
  const indexOfFirstScore = indexOfLastScore - scoresPerPage;
  const currentScores = history.slice(indexOfFirstScore, indexOfLastScore);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div className="container1">
      <h2>Histórico</h2>
      <p className="description">Veja suas pontuações anteriores:</p>
      {history.length === 0 && <p className="no-results">Sem resultados para mostrar, ainda não jogou.</p>}
      <ul>
        {currentScores.map((entry) => (
          <li key={entry.id}>
            <span className="score">Pontos: {entry.score}</span>
            <span className="date">Data: {formatDate(entry.createdAt)}</span>
            <span className="time">Tempo: {formatTime(entry.time)}</span>
          </li>
        ))}
      </ul>
      <div className="pagination">
        {history.length > scoresPerPage && (
          <ul>
            {Array.from({ length: Math.ceil(history.length / scoresPerPage) }, (_, index) => (
              <li key={index}>
                <button onClick={() => paginate(index + 1)}>{index + 1}</button>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}

export default Historico;
