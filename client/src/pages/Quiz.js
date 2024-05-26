import React, { useState, useEffect } from "react";
import axios from "axios";
import "../styles/Quiz.css";
import { useNavigate } from "react-router-dom";

function Quiz() {
  const navigate = useNavigate();

  const questionsData = [
    {
      question: "O que é phishing?",
      options: [
        "Todas as anteriores",
        "Uma técnica de obtenção fraudulenta de informações",
        "Uma forma de encriptação de dados",
        "Um tipo de firewall"
      ],
      correctAnswer: "Uma técnica de obtenção fraudulenta de informações",
      points: 10,
    },
    {
      question: "Qual das seguintes opções é um sinal de phishing?",
      options: [
        "Erros de ortografia e gramática",
        "Endereços de e-mail ou URLs estranhos",
        "Solicitações de informações pessoais ou financeiras",
        "Todas as anteriores"
      ],
      correctAnswer: "Todas as anteriores",
      points: 20,
    },
    {
      question: "Como os 'phishers' costumam se passar por empresas legítimas?",
      options: [
        "Usar anúncios online",
        "Enviar e-mails ou mensagens pop-up",
        "Todas as anteriores",
        "Usar redes sociais"
      ],
      correctAnswer: "Enviar e-mails ou mensagens pop-up",
      points: 30,
    },
    {
      question: "O que é malware?",
      options: [
        "Um software de segurança",
        "Um software malicioso",
        "Uma técnica de phishing",
        "Todas as anteriores"
      ],
      correctAnswer: "Um software malicioso",
      points: 10,
    },
    {
      question: "Qual das seguintes opções NÃO é um tipo de malware?",
      options: [
        "Vírus",
        "Worm",
        "Firewall",
        "Trojan"
      ],
      correctAnswer: "Firewall",
      points: 20,
    },
    {
      question: "Como o malware pode ser distribuído?",
      options: [
        "E-mails de phishing",
        "Downloads de software infectado",
        "Anexos de e-mail maliciosos",
        "Todas as anteriores"
      ],
      correctAnswer: "Todas as anteriores",
      points: 30,
    },
    {
      question: "Qual é um sinal comum de infeção por malware?",
      options: [
        "Desempenho lento do computador",
        "Aparecimento de pop-ups intrusivos",
        "Programas que iniciam automaticamente",
        "Todas as anteriores"
      ],
      correctAnswer: "Todas as anteriores",
      points: 10,
    },
    {
      question: "O que é ransomware?",
      options: [
        "Um tipo de software antivírus",
        "Um software que rouba informações",
        "Um malware que criptografa dados e exige resgate",
        "Um programa de firewall"
      ],
      correctAnswer: "Um malware que criptografa dados e exige resgate",
      points: 20,
    },
    {
      question: "Como o ransomware geralmente entra em um sistema?",
      options: [
        "Através de e-mails de phishing",
        "Por meio de downloads de software infetado",
        "Por meio de anexos de e-mail maliciosos",
        "Todas as anteriores"
      ],
      correctAnswer: "Todas as anteriores",
      points: 30,
    },
    {
      question: "Qual das seguintes medidas pode ajudar a proteger contra ransomware?",
      options: [
        "Manter o software atualizado",
        "Ter um bom programa antivírus instalado",
        "Evitar clicar em links ou baixar anexos de e-mails desconhecidos",
        "Todas as anteriores"
      ],
      correctAnswer: "Todas as anteriores",
      points: 10,
    },
    {
      question: "O que é um ataque DDoS?",
      options: [
        "Uma técnica de obtenção fraudulenta de informações",
        "Um ataque cibernético que usa múltiplos sistemas para inundar um alvo com tráfego",
        "Um tipo de firewall",
        "Uma forma de encriptação de dados"
      ],
      correctAnswer: "Um ataque cibernético que usa múltiplos sistemas para inundar um alvo com tráfego",
      points: 10,
    },
    {
      question: "Como os ataques DDoS funcionam?",
      options: [
        "Usar anúncios online",
        "Sobrecarregar o servidor alvo com um volume enorme de tráfego",
        "Criar sites de compras",
        "Usar redes sociais"
      ],
      correctAnswer: "Sobrecarregar o servidor alvo com um volume enorme de tráfego",
      points: 20,
    },
    {
      question: "Como identificar um ataque DDoS?",
      options: [
        "Aumento súbito e significativo no tráfego de rede",
        "Erro de ortografia em e-mails",
        "Pop-ups intrusivos",
        "Programas iniciando automaticamente"
      ],
      correctAnswer: "Aumento súbito e significativo no tráfego de rede",
      points: 30,
    },
    {
      question: "O que é spyware?",
      options: [
        "Um software de segurança",
        "Um software malicioso que coleta informações sem o conhecimento do utilizador",
        "Uma técnica de phishing",
        "Um tipo de firewall"
      ],
      correctAnswer: "Um software malicioso que coleta informações sem o conhecimento do utilizador",
      points: 10,
    },
    {
      question: "Como o spyware geralmente se instala em um sistema?",
      options: [
        "Através de downloads de software gratuitos ou anexos de e-mail maliciosos",
        "Ao criar sites de compras",
        "Ao usar anúncios online",
        "Ao usar redes sociais"
      ],
      correctAnswer: "Através de downloads de software gratuitos ou anexos de e-mail maliciosos",
      points: 20,
    },
    {
      question: "Como identificar spyware em seu sistema?",
      options: [
        "Desempenho lento do computador",
        "Mudanças inesperadas nas configurações do navegador",
        "Anúncios pop-up excessivos",
        "Todas as anteriores"
      ],
      correctAnswer: "Todas as anteriores",
      points: 30,
    }
  ];

  const [questions, setQuestions] = useState(questionsData);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedOption, setSelectedOption] = useState("");
  const [score, setScore] = useState(0);
  const [timer, setTimer] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false); // Estado para controlar se o usuário está logado
  const [errorMessage, setErrorMessage] = useState(null); // Estado para controlar a mensagem de erro
  const [showInstructions, setShowInstructions] = useState(false); // Estado para controlar a exibição das instruções

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

  const shuffleArray = (array) => {
    return array.sort(() => Math.random() - 0.5);
  };

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
    setShowInstructions(false); // Ocultar instruções ao iniciar o jogo
    
    const shuffledQuestions = questionsData.map((question) => {
      return {
        ...question,
        options: shuffleArray([...question.options]), // Embaralhe as opções de resposta
      };
    });

    setQuestions(shuffledQuestions);
  };
  

  const handleShowInstructions = () => {
    setShowInstructions(!showInstructions);
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
          "https://ssg-2rzn.onrender.com/score/save-score",
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
          <p className="intro-paragraph">
            Neste Quiz vais ter que responder a algumas perguntas sobre segurança digital, cada pergunta tem um valor de pontos associado, sê rápido. Boa Sorte!
          </p>
          <button className="btn" onClick={handlePlayClick}>Jogar</button>
          <button className="instruction-button" onClick={handleShowInstructions}>
            {showInstructions ? "Ocultar Instruções" : "Mostrar Instruções"}
          </button>
          {showInstructions && (
            <div className="instructions-container show">
              <h3>Instruções:</h3>
              <p>1. Leia cada pergunta com atenção.</p>
              <p>2. Selecione a resposta que você acredita ser correta.</p>
              <p>3. Clique no botão "Próxima Pergunta" para avançar.</p>
              <p>4. Sua pontuação será calculada com base nas respostas corretas e no tempo total.</p>
              <p>5. Faça login para salvar sua pontuação e competir com outros jogadores.</p>
              <p>Divirta-se e boa sorte!</p>
              <p><strong>Nota:</strong> Sempre que clicares em "Tentar Novamente", o jogo recomeçará imediatamente. Está atento, todos os segundos contam!</p>
            </div>
          )}
          {!isLoggedIn && (
            <p>
              Para guardar a sua pontuação, por favor{" "}
              <button
                className="login-button-jogo"
                onClick={() => navigate("/login")}
              >
                Inicie Sessão
              </button>
            </p>
          )}
        </div>
      )}
      {isPlaying && currentQuestion < questions.length && (
        <div className="question-container">
          <h2>{questions[currentQuestion].question}</h2>
          <p className="question-counter">Pergunta {currentQuestion + 1} de {questions.length}</p>
          <ul>
            {questions[currentQuestion].options.map((option, index) => (
              <li key={index}>
                <button
                  onClick={() => handleOptionSelect(option)}
                  className={`option-button ${selectedOption === option ? "selected" : ""}`}
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
