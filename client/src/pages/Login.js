import React, { useState, useContext } from "react";
import axios from "axios";
import "../styles/Login.css";
import { FaUser } from "react-icons/fa";
import { FaLock } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../helpers/AuthContex";

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const { setAuthState } = useContext(AuthContext);
  const [errorMessage, setErrorMessage] = useState("");

  const navigate = useNavigate(); // Create a navigate object

  const login = async () => {
    const data = { username, password };
    try {
      const response = await axios.post(
        "https://ssg-2rzn.onrender.com/auth/login",
        data
      );
      if (response.data.error) {
        setErrorMessage(response.data.error);
      } else {
        localStorage.setItem("accessToken", response.data.token);
        setAuthState({
          status: true,
          isAdmin: response.data.isAdmin,
        });
        navigate("/");
      }
    } catch (error) {
      if (error.response && error.response.data && error.response.data.error) {
        setErrorMessage(error.response.data.error);
      } else {
        setErrorMessage(
          "Erro no servidor. Por favor, tente novamente mais tarde."
        );
      }
    }
  };

  return (
    <div className="page">
      <div className="wrapper">
        <form
          action=""
          onSubmit={(event) => {
            event.preventDefault();
            login();
          }}
        >
          <h2>Bem-vindo ao SSG</h2>
          {errorMessage && <div className="error-message">{errorMessage}</div>}
          <div className="input-box">
            <label>Utilizador</label>
            <input
              type="text"
              onChange={(event) => {
                setUsername(event.target.value);
              }}
            />
            <FaUser className="icon" />
          </div>
          <div className="input-box">
            <label>Palavra-passe</label>
            <input
              type="password"
              onChange={(event) => {
                setPassword(event.target.value);
              }}
            />
            <FaLock className="icon" />
          </div>
          <div className="remember-forgot">
            <Link to="/forgotpassword">Esqueceu-se da palavra-passe?</Link>
          </div>
          <button type="submit">Entrar</button>{" "}
          <div className="register-link">
            <p>
              Não tens conta? <Link to ="/register">Criar Conta</Link>{" "}
            </p>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Login;
