import React, { useState, useEffect } from "react";
import axios from "axios";
import "../styles/Quiz.css";

function Quiz() {
  const questions = [
    {
      question: "Qual é a capital da França?",
      options: ["Londres", "Paris", "Berlim", "Madrid"],
      correctAnswer: "Paris",
      points: 10
    },
    {
      question: "Qual é o maior planeta do Sistema Solar?",
      options: ["Júpiter", "Terra", "Marte", "Saturno"],
      correctAnswer: "Júpiter",
      points: 20
    },
    {
      question: "Qual é o animal terrestre mais rápido?",
      options: ["Cavalo", "Lebre", "Guepardo", "Elefante"],
      correctAnswer: "Guepardo",
      points: 30
    }
  ];

  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedOption, setSelectedOption] = useState("");
  const [score, setScore] = useState(0);
  const [timer, setTimer] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    let intervalId;
    if (isPlaying) {
      intervalId = setInterval(() => {
        setTimer((prevTimer) => prevTimer + 1);
      }, 1000);
    }
    return () => clearInterval(intervalId);
  }, [isPlaying]);

  const handleOptionSelect = (option) => {
    setSelectedOption(option);
  };

  const handleNextQuestion = () => {
    const currentQuestionObj = questions[currentQuestion];
    if (selectedOption === currentQuestionObj.correctAnswer) {
      setScore(score + currentQuestionObj.points);
    }
    setSelectedOption("");
    setCurrentQuestion(currentQuestion + 1);
  };

  const handlePlayClick = () => {
    setErrorMessage(null); // Limpar a mensagem de erro
    setIsPlaying(true);
    setCurrentQuestion(0); // Reset to first question
    setScore(0); // Reset score
    setTimer(0); // Reset timer
  };

  useEffect(() => {
    if (currentQuestion === questions.length) {
      setIsPlaying(false); // Stop the timer when all questions are answered
    }
  }, [currentQuestion, questions.length]);

  const [errorMessage, setErrorMessage] = useState(null);

  async function saveScore() {
    try {
      const response = await axios.post('http://localhost:3001/score/save-score', {
        time: timer,
        score: score,
      }, {
        headers: { accessToken: localStorage.getItem('accessToken') },
      });
  
      if (response.data.error) {
        setErrorMessage('Erro ao salvar a pontuação:' + response.data.error);
      }
    } catch (error) {
      setErrorMessage('Erro ao salvar a pontuação:' + error);
    }
  }

  return (
    <div className="quiz-container">
      {!isPlaying && currentQuestion === 0 && (
        <div>
          <h2>Quiz de Segurança Boa Sorte!</h2>
          <button onClick={handlePlayClick}>Jogar</button>
        </div>
      )}
      {isPlaying && currentQuestion < questions.length && (
        <div className="question-container">
          <h2>{questions[currentQuestion].question}</h2>
          <ul>
            {questions[currentQuestion].options.map((option, index) => (
              <li key={index}>
                <button
                  onClick={() => handleOptionSelect(option)}
                  className={selectedOption === option ? "selected" : "option-button"}
                >
                  {option}
                </button>
              </li>
            ))}
          </ul>
          {selectedOption && (
            <button className="next-button" onClick={handleNextQuestion}>Próxima Pergunta</button>
          )}
        </div>
      )}
      {!isPlaying && currentQuestion === questions.length && (
        <div>
          <h2>Quiz Concluído!</h2>
          <p>Pontuação Final: {score} de {questions.reduce((acc, curr) => acc + curr.points, 0)} pontos</p>
          <p>Tempo: {timer} segundos</p>
          {errorMessage && <p className="error-message">{errorMessage}</p>}
          <button className="next-button" onClick={saveScore}>Guardar pontuação</button>
          <button className="next-button" onClick={handlePlayClick}>Tentar Novamente</button>
        </div>
      )}
    </div>
  );
}

export default Quiz;
