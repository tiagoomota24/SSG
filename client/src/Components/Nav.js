import React, { useState, useContext, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Navbar, Nav, Container, NavDropdown } from "react-bootstrap";
import { Link } from "react-router-dom";
import Logo from "../assets/Icon.png";
import Loginicon from "../assets/Loginicon.png";
import { AuthContext } from "../helpers/AuthContex";
import { IoIosLogOut } from "react-icons/io";

const MyNavbar = ({ onLogout }) => {
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
    <Navbar bg="dark" expand="lg" variant="dark">
      <Container>
        <Navbar.Brand as={Link} to="/" onClick={handleLogoClick}>
          <img
            alt=""
            src={Logo}
            width="100"
            height="80"
            className="d-inline-block align-top"
          />{' '}
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link as={Link} to="/" onClick={() => handleItemClick(null)} className={selectedItem === null ? "active" : ""}>Home</Nav.Link>
            <Nav.Link as={Link} to="/jogos" onClick={() => handleItemClick("jogos")} className={selectedItem === "jogos" ? "active" : ""}>Jogos</Nav.Link>
            <Nav.Link as={Link} to="/tabela_de_classificacao" onClick={() => handleItemClick("tabela_de_classificacao")} className={selectedItem === "tabela_de_classificacao" ? "active" : ""}>Tabela De Classificação</Nav.Link>
            <NavDropdown title="Seguranca Digital" id="basic-nav-dropdown">
              <NavDropdown.Item as={Link} to="/phishing" onClick={() => handleItemClick("phishing")} className={selectedItem === "phishing" ? "active" : ""}>Phishing</NavDropdown.Item>
              <NavDropdown.Item as={Link} to="#" onClick={() => handleItemClick("malware")} className={selectedItem === "malware" ? "active" : ""}>Malware</NavDropdown.Item>
              <NavDropdown.Item as={Link} to="#" onClick={() => handleItemClick("ransomware")} className={selectedItem === "ransomware" ? "active" : ""}>Ransomware</NavDropdown.Item>
            </NavDropdown>
          </Nav>
          <Nav>
            {!isLoggedIn ? (
              <Nav.Link as={Link} to="/login" onClick={handleLoginClick}>
                <img
                  src={Loginicon}
                  alt="Login"
                  width="30"
                  height="30"
                  className="d-inline-block align-top"
                />{' '}
                Login
              </Nav.Link>
            ) : (
              <Nav.Link onClick={handleLogout} className="logout-button">
                <IoIosLogOut className="icon" />
                Terminar-sessão
              </Nav.Link>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default MyNavbar;
