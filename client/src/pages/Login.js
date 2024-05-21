import React, { useState, useContext } from "react";
import axios from "axios";
import "../styles/Login.css";
import { FaUser } from "react-icons/fa";
import { FaLock } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../helpers/AuthContex";


function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const { setAuthState } = useContext(AuthContext);

  const navigate = useNavigate(); // Create a navigate object


  const login = () => {
    const data = { username: username, password: password };
    axios.post("http://localhost:3001/auth/login", data).then((response) => {
      if (response.data.error) {
      alert(response.data.error);
      }else{
        localStorage.setItem("accessToken", response.data.token);
        setAuthState({status: true});
        navigate("/");
      }
    });
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
          <a href="/forgotpassword">Esqueceu-se da palavra-passe?</a> 
          </div>
          <button type="submit">Entrar</button>{" "}
          <div className="register-link">
            <p> 
              Não tens conta? <a href="/register">Criar Conta</a>{" "}
            </p>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Login;
