import React, { useState } from "react";
import axios from "axios";
import "../styles/Login.css";
import { FaUser } from "react-icons/fa";
import { FaLock } from "react-icons/fa";
import { useNavigate } from "react-router-dom";


function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate(); // Create a navigate object


  const login = () => {
    const data = { username: username, password: password };
    axios.post("http://localhost:3001/auth/login", data).then((response) => {
      if (response.data.error) {
      alert(response.data.error);
      }else{
        sessionStorage.setItem("accessToken", response.data);
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
{/*             <label>
              <input type="checkbox" /> Lembrar-me
            </label> */}
            <a href="/">Esqueceu-se da palavra-passe?</a>
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
