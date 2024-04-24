import React from 'react';
import '../styles/Classificacao.css';

function Classificacao() {
  const jogadores = [
    { posicao: 1, nome: 'Jogador 1', score: 100, tempo: '00:30' },
    { posicao: 2, nome: 'Jogador 2', score: 90, tempo: '00:45' },
    { posicao: 3, nome: 'Jogador 3', score: 80, tempo: '01:00' },
    { posicao: 4, nome: 'Jogador 4', score: 70, tempo: '01:15' },
    // Adicione mais jogadores conforme necessário
  ];

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
          {jogadores.map(jogador => (
            <tr
              key={jogador.posicao}
              className={`
                classificacao-row
                ${jogador.posicao === 1 ? 'posicao-1' : ''}
                ${jogador.posicao === 2 ? 'posicao-2' : ''}
                ${jogador.posicao === 3 ? 'posicao-3' : ''}
                ${jogador.posicao === 4 ? 'posicao-4' : ''}
              `}
            >
              <td>{jogador.posicao}</td>
              <td>{jogador.nome}</td>
              <td>{jogador.score}</td>
              <td>{jogador.tempo}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Classificacao;
