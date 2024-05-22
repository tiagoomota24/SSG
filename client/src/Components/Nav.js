import React, { useState, useContext, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Navbar, Nav, Container, NavDropdown } from "react-bootstrap";
import { Link } from "react-router-dom";
import Logo from "../assets/Icon.png";
import Loginicon from "../assets/Loginicon.png";
import { AuthContext } from "../helpers/AuthContex";
import { IoIosLogOut } from "react-icons/io";
import { MdAccountCircle } from "react-icons/md";
import { useTranslation } from "react-i18next";
import ptFlag from "../assets/ptFlag.png";
import enFlag from "../assets/engFlag.png";

const MyNavbar = ({ onLogout }) => {
  const { t, i18n } = useTranslation();
  const [selectedItem, setSelectedItem] = useState(null);
  const { authState, setAuthState } = useContext(AuthContext);
  const [isLoggedIn, setIsLoggedIn] = useState(authState.status);
  const [language, setLanguage] = useState('PT');

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
    setAuthState({ status: false, isAdmin: false });
  };

  const handleLanguageChange = (lang) => {
    setLanguage(lang);
    i18n.changeLanguage(lang.toLowerCase());
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
            <Nav.Link as={Link} to="/" onClick={() => handleItemClick(null)} className={selectedItem === null ? 'active' : ''}>{t('home')}</Nav.Link>
            <Nav.Link as={Link} to="/jogos" onClick={() => handleItemClick('jogos')} className={selectedItem === 'jogos' ? 'active' : ''}>{t('games')}</Nav.Link>
            <Nav.Link as={Link} to="/tabela_de_classificacao" onClick={() => handleItemClick('tabela_de_classificacao')} className={selectedItem === 'tabela_de_classificacao' ? 'active' : ''}>{t('leaderboard')}</Nav.Link>
            <NavDropdown title={t('digital_security')} id="basic-nav-dropdown">
              <NavDropdown.Item as={Link} to="/phishing" onClick={() => handleItemClick('phishing')} className={selectedItem === 'phishing' ? 'active' : ''}>{t('phishing')}</NavDropdown.Item>
              <NavDropdown.Item as={Link} to="/malware" onClick={() => handleItemClick('malware')} className={selectedItem === 'malware' ? 'active' : ''}>{t('malware')}</NavDropdown.Item>
              <NavDropdown.Item as={Link} to="/ransomware" onClick={() => handleItemClick('ransomware')} className={selectedItem === 'ransomware' ? 'active' : ''}>{t('ransomware')}</NavDropdown.Item>
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
                {t(' Login')}
              </Nav.Link>
            ) : (
              <>
                <NavDropdown title={<><MdAccountCircle className="icon" /> {t('account')} </>} id="basic-nav-dropdown">
                  <NavDropdown.Item as={Link} to="/detalhes-da-conta" onClick={() => handleItemClick('detalhes-da-conta')} className={selectedItem === 'detalhes-da-conta' ? 'active' : ''}>{t('account_details')}</NavDropdown.Item>
                  <NavDropdown.Item as={Link} to="/historico" onClick={() => handleItemClick('historico')} className={selectedItem === 'historico' ? 'active' : ''}>{t('history')}</NavDropdown.Item>
                  <NavDropdown.Divider />                  
                  {authState.isAdmin && (
                  <NavDropdown.Item href="/admin">{t('adminPanel')}</NavDropdown.Item> // Adiciona o link para administração
                )}
                </NavDropdown>
              <Nav.Link as={Link} to='/' onClick={handleLogout} className="logout-button">
                <IoIosLogOut className="icon" />
                {t('logout')}
              </Nav.Link>
            </>
            )}
            <NavDropdown title={language} id="language-dropdown">
              <NavDropdown.Item onClick={() => handleLanguageChange('PT')}>
                <img src={ptFlag} alt="Portuguese" width="20" height="20" className="d-inline-block align-top" />{' '}
                Português
              </NavDropdown.Item>
              <NavDropdown.Item onClick={() => handleLanguageChange('ENG')}>
                <img src={enFlag} alt="English" width="20" height="20" className="d-inline-block align-top" />{' '}
                English
              </NavDropdown.Item>
            </NavDropdown>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default MyNavbar;
