import React, { useState, useEffect } from "react";
import axios from "axios";
import "../styles/Quiz.css";
import { useNavigate } from "react-router-dom";

function Quiz() {
  const navigate = useNavigate();

  const questions = [
    {
      question: "Qual é a capital da França?",
      options: ["Londres", "Paris", "Berlim", "Madrid"],
      correctAnswer: "Paris",
      points: 10,
    },
    {
      question: "Qual é o maior planeta do Sistema Solar?",
      options: ["Júpiter", "Terra", "Marte", "Saturno"],
      correctAnswer: "Júpiter",
      points: 20,
    },
    {
      question: "Qual é o animal terrestre mais rápido?",
      options: ["Cavalo", "Lebre", "Guepardo", "Elefante"],
      correctAnswer: "Guepardo",
      points: 30,
    },
  ];

  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedOption, setSelectedOption] = useState("");
  const [score, setScore] = useState(0);
  const [timer, setTimer] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false); // Estado para controlar se o usuário está logado
  const [errorMessage, setErrorMessage] = useState(null); // Estado para controlar a mensagem de erro

  useEffect(() => {
    // Verifique se o usuário está logado ao montar o componente
    const checkLoginStatus = () => {
      const accessToken = localStorage.getItem("accessToken");
      if (!accessToken) {
        setIsLoggedIn(false);
      } else {
        setIsLoggedIn(true);
      }
    };

    checkLoginStatus();
  }, []);

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

  useEffect(() => {
    const saveScore = async () => {
      if (!isLoggedIn) {
        // Verifique se o usuário está logado antes de tentar salvar a pontuação
        setErrorMessage("Faça login para salvar sua pontuação.");
        return;
      }
      try {
        const response = await axios.post(
          "http://localhost:3001/score/save-score",
          {
            time: timer,
            score: score,
          },
          {
            headers: { accessToken: localStorage.getItem("accessToken") },
          }
        );

        if (response.data.error) {
          setErrorMessage("Erro ao salvar a pontuação: " + response.data.error);
        } else {
          setErrorMessage("");
        }
      } catch (error) {
        setErrorMessage("Erro ao salvar a pontuação: " + error);
      }
    };

    if (!isPlaying && currentQuestion === questions.length) {
      saveScore(); // Salva a pontuação automaticamente quando o quiz for concluído
    }
  }, [isPlaying, currentQuestion, questions.length, timer, score, isLoggedIn]);

  const formatTime = (seconds) => {
    if (seconds < 60) {
      return `${seconds} segundos`;
    } else if (seconds < 3600) {
      const minutes = Math.floor(seconds / 60);
      const remainingSeconds = seconds % 60;
      return `${minutes} minuto${minutes !== 1 ? "s" : ""} e ${remainingSeconds} segundo${remainingSeconds !== 1 ? "s" : ""}`;
    } else {
      const hours = Math.floor(seconds / 3600);
      const remainingMinutes = Math.floor((seconds % 3600) / 60);
      return `${hours} hora${hours !== 1 ? "s" : ""} e ${remainingMinutes} minuto${remainingMinutes !== 1 ? "s" : ""}`;
    }
  };

  return (
    <div className="quiz-container">
      {!isPlaying && currentQuestion === 0 && (
        <div>
          <h2>Quiz de Segurança Boa Sorte!</h2>
          <button onClick={handlePlayClick}>Jogar</button>
          {!isLoggedIn && (
            <p>
              Para guardar a sua pontuação, por favor{" "}
              <button
                className="login-button-jogo"
                onClick={() => navigate("/login")}
              >
                Inicie Sessão
              </button>
              .
            </p>
          )}
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
                  className={
                    selectedOption === option ? "selected" : "option-button"
                  }
                >
                  {option}
                </button>
              </li>
            ))}
          </ul>
          {selectedOption && (
            <button className="next-button" onClick={handleNextQuestion}>
              Próxima Pergunta
            </button>
          )}
        </div>
      )}
      {!isPlaying && currentQuestion === questions.length && (
        <div>
          <h2>Quiz Concluído!</h2>
          <p>
            Pontuação Final: {score} de{" "}
            {questions.reduce((acc, curr) => acc + curr.points, 0)} pontos
          </p>
          <p>Tempo: {formatTime(timer)}</p>
          {errorMessage && <p className="error-message">{errorMessage}</p>}
          <button className="next-button" onClick={handlePlayClick}>
            Tentar Novamente
          </button>
        </div>
      )}
    </div>
  );
}

export default Quiz;
