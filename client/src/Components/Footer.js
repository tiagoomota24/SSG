import React from "react";
import { Link } from "react-router-dom";
import "../styles/Footer.css"; // Crie um arquivo CSS para estilizar o footer

const Footer = () => {
  return (
    <footer className="footer bg-dark text-white">
      <div className="container">
        <div className="row">
          <div className="col-md-4">
            <h5>Sobre Nós</h5>
            <p>
              Somos uma plataforma dedicada a ensinar segurança digital de forma divertida e interativa através de jogos educativos.
            </p>
          </div>
          <div className="col-md-4">
            <h5>Navegação</h5>
            <ul className="list-unstyled">
              <li>
                <Link to="/" className="text-black">Home</Link>
              </li>
              <li>
                <Link to="/jogos" className="text-black">Jogos</Link>
              </li>
              <li>
                <Link to="/tabela_de_classificacao" className="text-black">Tabela de Classificação</Link>
              </li>
              <li>
                <Link to="/contact" className="text-black">Contato</Link>
              </li>
            </ul>
          </div>
          <div className="col-md-4">
            <h5>Contato</h5>
            <p>Email: ssgseriousgames@gmail.com</p>
          </div>
        </div>
        <div className="text-center mt-3">
          <p>&copy; 2024 Segurança Digital. Todos os direitos reservados.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
