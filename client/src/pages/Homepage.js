import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../styles/Home.css";
import Quizz from "../assets/quiz.png";
import Jet from "../assets/jet.png";

const Homepage = ({ testimonials }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();
  const [alertMessage, setAlertMessage] = useState("");

  useEffect(() => {
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

  const handleRegisterClick = (event) => {
    if (isLoggedIn) {
      event.preventDefault();
      setAlertMessage("Já estás logado!");
    } else {
      navigate("/register");
    }
  };

  return (
    <div className="home-container">
      <div className="banner">
        <div className="banner-text">
          <h1>Bem-vindo à Plataforma de Jogos Serios para Segurança Digital</h1>
          <p>Aprenda sobre segurança digital de forma divertida e interativa!</p>
          <Link to="/register" onClick={handleRegisterClick} className="cta-button">
            Regista-te
          </Link>
          {alertMessage && <p className="alert-message">{alertMessage}</p>}
        </div>
      </div>
      <div className="section">
        <h2>Jogos Disponíveis</h2>
        <div className="games-preview">
          <div className="game-card">
            <img src={Quizz} alt="Quiz Game" className="game-image" />
            <h3>Quiz de Segurança</h3>
            <p>Testa o teu conhecimento em segurança digital!</p>
            <Link to="/quiz" className="game-button">
              Jogar
            </Link>
          </div>
        </div>
      </div>
      <div className="section">
        <h2>Benefícios da Plataforma</h2>
        <ul className="benefits-list">
          <li>Aprenda segurança digital de forma divertida e interativa.</li>
          <li>Desafie-se com jogos envolventes.</li>
          <li>Melhore as suas habilidades e conhecimento em segurança.</li>
        </ul>
      </div>
      <div className="section">
        <h2>Depoimentos</h2>
        <div className="testimonials">
          <blockquote>
            "Esta plataforma ajudou-me a entender melhor a segurança digital de uma maneira divertida!" - João
          </blockquote>
          <blockquote>
            "Os jogos são incríveis e educativos. Recomendo para todos!" - Maria
          </blockquote>
        </div>
      </div>
      <div className="section">
        <h2>Últimas Notícias</h2>
        <div className="news-preview">
          <div className="news-item">
            <img src={Jet} alt="Jet Game" className="news-image" />
            <h3>Jet Adventure - Em breve!</h3>
            <p>Voe alto e aprenda sobre segurança digital com o nosso novo jogo que está por vir. Fique atento para mais atualizações!</p>
          </div>
        </div>
      </div>
      <div className="section contact-section">
        <h2>Contato e Suporte</h2>
        <p>Se tiver alguma dúvida, entre em contato conosco.</p>
        <Link to="/contact" className="contact-button">
          Fale Conosco
        </Link>
      </div>
    </div>
  );
};

export default Homepage;
