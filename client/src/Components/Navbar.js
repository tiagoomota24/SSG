import React, { useState, useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import Logo from "../assets/Icon.png";
import Loginicon from "../assets/Loginicon.png";
import "../styles/Navbar.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { Dropdown } from "react-bootstrap";
import { AuthContext } from "../helpers/AuthContex";

export default function Navbar() {
  const [selectedItem, setSelectedItem] = useState(null);
  const { authState, setAuthState } = useContext(AuthContext);
  const [isLoggedIn, setIsLoggedIn] = useState(authState.status);

  

  useEffect(() => {
    setIsLoggedIn(authState.status);
  }, [authState]);

  const handleItemClick = (itemName) => {
    setSelectedItem(itemName);
  };

  const handleLogoClick = () => {
    setSelectedItem(null); // Remove a seleção ao clicar no Logo
  };

  const handleLoginClick = () => {
    setSelectedItem(null); // Remove a seleção ao clicar no ícone de login
  };

  const handleLogout = () => {
    localStorage.removeItem("accessToken");
    setAuthState(false);
  };

  return (
    <nav className="navbar">
      <Link to="/" onClick={handleLogoClick}>
        <div className="logo">
          <img src={Logo} alt="Logo" />
        </div>
      </Link>
      <div className="menu-section">
        <Dropdown className="menu-item">
          <Dropdown.Toggle variant="secondary" id="dropdownMenuButton1">
            Seguranca Digital
          </Dropdown.Toggle>

          <Dropdown.Menu>
            <Dropdown.Item as={Link} to="/phishing">
              Phishing
            </Dropdown.Item>
            <Dropdown.Item href="#">Malware</Dropdown.Item>
            <Dropdown.Item href="#">Ransomware</Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
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
        {!isLoggedIn ? (
          <>
            <Link to="/login" onClick={handleLoginClick}>
              <img src={Loginicon} alt="Login" className="login-icon" />
              Login
            </Link>
          </>
        ) : (
          <button onClick={handleLogout} className="logout-button">
            Logout
          </button>
        )}
      </div>
    </nav>
  );
}
