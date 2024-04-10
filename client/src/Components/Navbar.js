import React, { useState } from "react";
import { Link } from "react-router-dom";
import Logo from "../assets/Icon.png";
import Loginicon from "../assets/Loginicon.png";
import "../styles/Navbar.css";
import "../styles/t.css";

export default function Navbar() {
  const [selectedItem, setSelectedItem] = useState(null);

  const handleItemClick = (itemName) => {
    setSelectedItem(itemName);
  };

  const handleLogoClick = () => {
    setSelectedItem(null); // Remove a seleção ao clicar no Logo
  };

  const handleLoginClick = () => {
    setSelectedItem(null); // Remove a seleção ao clicar no ícone de login
  };

  return (
    <nav className="navbar">
      <Link to="/" onClick={handleLogoClick}>
        <div className="logo">
          <img src={Logo} alt="Logo" />
        </div>
      </Link>
      <div className="menu-section">
        <ul>
          <li>
            <a href="#"> </a>
          </li>
          <li>
            <a href="#"> Segurança Digital ▼</a>
            <ul className="dropdown">
              <li>
                <a href="#"> Digital</a>
              </li>
              <li>
                <a href="#"> Física</a>
              </li>
            </ul>
          </li>
        </ul>
        {/* <Link
          to="/seguranca_digital"
          className={selectedItem === "seguranca_digital" ? "selected" : ""}
          onClick={() => handleItemClick("seguranca_digital")}
        >
          Seguranca Digital
        </Link> */}
        <Link
          to="/jogos"
          className={selectedItem === "jogos" ? "selected" : ""}
          onClick={() => handleItemClick("jogos")}
        >
          Jogos
        </Link>
        <Link
          to="/tabela_de_classificacao"
          className={
            selectedItem === "tabela_de_classificacao" ? "selected" : ""
          }
          onClick={() => handleItemClick("tabela_de_classificacao")}
        >
          Tabela De Classificação
        </Link>
        <Link to="/login" onClick={handleLoginClick}>
          <img src={Loginicon} alt="Login" className="login-icon" />
        </Link>
      </div>
    </nav>
  );
}
