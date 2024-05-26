import React, { useState, useEffect } from "react";
import axios from "axios";
import "../styles/Classificacao.css";

function Classificacao() {
  const [jogadores, setJogadores] = useState([]);

  useEffect(() => {
    axios
      .get("https://ssg-2rzn.onrender.com/score/get-scores")
      .then((response) => {
        if (Array.isArray(response.data)) {
          const jogadoresMelhoresResultados = encontrarMelhoresResultados(
            response.data
          );
          setJogadores(jogadoresMelhoresResultados);
        } else {
          console.error("");
        }
      })
      .catch((error) => {
        console.error("");
      });
  }, []);

  const encontrarMelhoresResultados = (resultados) => {
    const melhoresResultadosMap = new Map();

    resultados.forEach((resultado) => {
      const jogador = resultado.User.username;
      if (!melhoresResultadosMap.has(jogador)) {
        melhoresResultadosMap.set(jogador, resultado);
      } else {
        const resultadoExistente = melhoresResultadosMap.get(jogador);
        if (
          resultado.score > resultadoExistente.score ||
          (resultado.score === resultadoExistente.score &&
            resultado.time < resultadoExistente.time)
        ) {
          melhoresResultadosMap.set(jogador, resultado);
        }
      }
    });

    return Array.from(melhoresResultadosMap.values()).sort((a, b) => {
      if (b.score === a.score) {
        return a.time - b.time;
      }
      return b.score - a.score;
    });
  };

  function formatTime(seconds) {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes.toString().padStart(2, "0")}:${remainingSeconds
      .toString()
      .padStart(2, "0")}`;
  }

  return (
    <div className="classificacao-container">
      <h1>Classificação</h1>
      <table className="classificacao-table">
        <thead>
          <tr>
            <th>Posição</th>
            <th>Nome</th>
            <th>Pontuação</th>
            <th>Tempo</th>
          </tr>
        </thead>
        <tbody>
          {Array.isArray(jogadores) &&
            jogadores.map((jogador, index) => (
              <tr
                key={index}
                className={`classificacao-row ${
                  index === 0 ? "posicao-1" : ""
                } ${index === 1 ? "posicao-2" : ""} ${
                  index === 2 ? "posicao-3" : ""
                }`}
              >
                <td>{index + 1}</td>
                <td>{jogador.User.username}</td>
                <td>{jogador.score}</td>
                <td>{formatTime(jogador.time)}</td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
}

export default Classificacao;
