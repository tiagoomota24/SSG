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

  const renderPageNumbers = () => {
    const totalPages = Math.ceil(history.length / scoresPerPage);
    const pageNumbers = [];

    if (totalPages <= 7) {
      for (let i = 1; i <= totalPages; i++) {
        pageNumbers.push(i);
      }
    } else {
      if (currentPage <= 4) {
        for (let i = 1; i <= 6; i++) {
          pageNumbers.push(i);
        }
        pageNumbers.push('...');
        pageNumbers.push(totalPages);
      } else if (currentPage > totalPages - 4) {
        pageNumbers.push(1);
        pageNumbers.push('...');
        for (let i = totalPages - 5; i <= totalPages; i++) {
          pageNumbers.push(i);
        }
      } else {
        pageNumbers.push(1);
        pageNumbers.push('...');
        for (let i = currentPage - 2; i <= currentPage + 2; i++) {
          pageNumbers.push(i);
        }
        pageNumbers.push('...');
        pageNumbers.push(totalPages);
      }
    }

    return pageNumbers;
  };

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
            <li>
              <button
                onClick={() => paginate(currentPage - 1)}
                disabled={currentPage === 1}
              >
                &laquo;
              </button>
            </li>
            {renderPageNumbers().map((number, index) => (
              <li key={index}>
                {number === '...' ? (
                  <span className="dots">...</span>
                ) : (
                  <button
                    onClick={() => paginate(number)}
                    className={currentPage === number ? 'active' : ''}
                  >
                    {number}
                  </button>
                )}
              </li>
            ))}
            <li>
              <button
                onClick={() => paginate(currentPage + 1)}
                disabled={currentPage === Math.ceil(history.length / scoresPerPage)}
              >
                &raquo;
              </button>
            </li>
          </ul>
        )}
      </div>
    </div>
  );
}

export default Historico;
