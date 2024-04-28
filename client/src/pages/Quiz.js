import React, { useState, useEffect } from "react";

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

  return (
    <div>
      {!isPlaying && currentQuestion === 0 && (
        <div>
          <h2>Quiz de Segurança Boa Sorte!</h2>
          <button onClick={handlePlayClick}>Jogar</button>
        </div>
      )}
      {isPlaying && currentQuestion < questions.length && (
        <div>
          <h2>{questions[currentQuestion].question}</h2>
          <ul>
            {questions[currentQuestion].options.map((option, index) => (
              <li key={index}>
                <button
                  onClick={() => handleOptionSelect(option)}
                  className={
                    selectedOption === option ? "selected" : ""
                  }
                >
                  {option}
                </button>
              </li>
            ))}
          </ul>
          {selectedOption && (
            <button onClick={handleNextQuestion}>Próxima Pergunta</button>
          )}
        </div>
      )}
      {!isPlaying && currentQuestion === questions.length && (
        <div>
          <h2>Quiz Concluído!</h2>
          <p>Pontuação Final: {score} de {questions.reduce((acc, curr) => acc + curr.points, 0)} pontos</p>
          <p>Tempo: {timer} segundos</p>
          <button onClick={handlePlayClick}>Tentar Novamente</button>
        </div>
      )}
    </div>
  );
}

export default Quiz;
