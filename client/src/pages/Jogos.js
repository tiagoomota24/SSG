import React, { useState } from "react";
import Quiz from "../assets/quiz.png";
import Jet from "../assets/jet.png";
import "../styles/Jogos.css";

function Jogos() {
  const [hoveredGame, setHoveredGame] = useState(null);

  const handleMouseEnter = (game) => {
    setHoveredGame(game);
  };

  const handleMouseLeave = () => {
    setHoveredGame(null);
  };

  return (
    <>
      <h1>Jogos</h1>
      <div className="jogos-container">
        <div
          onMouseEnter={() => handleMouseEnter("Quiz")}
          onMouseLeave={handleMouseLeave}
          className={`jogo-item ${hoveredGame === "Quiz" ? "hovered" : ""}`}
        >
          <img
            src={Quiz}
            alt="Jogo Quiz"
            className="jogo-image"
          />
          {hoveredGame === "Quiz" && (
            <div className="jogo-description">
              <p className="jogo-text">Quiz divertido para testar o conhecimento sobre segurança!</p>
              <button className="jogo-button">
                Jogar
              </button>
            </div>
          )}
        </div>
        <div
          onMouseEnter={() => handleMouseEnter("Jet")}
          onMouseLeave={handleMouseLeave}
          className={`jogo-item ${hoveredGame === "Jet" ? "hovered" : ""}`}
        >
          <img
            src={Jet}
            alt="Jogo Jet"
            className="jogo-image"
          />
          {hoveredGame === "Jet" && (
            <div className="jogo-description">
              <p className="jogo-text">Voe alto e dispare para as respostas corretas!</p>
              <button className="jogo-button">
                Jogar
              </button>
            </div>
          )}
        </div>
      </div>
    </>
  );
}

export default Jogos;
