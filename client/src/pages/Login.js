import React, { useState } from "react";
import axios from "axios";
import "../styles/Login.css";
import { FaUser } from "react-icons/fa";
import { FaLock } from "react-icons/fa";


function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const login = () => {
    const data = { username: username, password: password };
    axios.post("http://localhost:3001/auth/login", data).then((response) => {
      console.log(response.data);
    });
  };
  return (
    <div className="page">
    <div className="wrapper">
      <form action="">
        <h2>Bem vindo ao SSG</h2>
        <div className="input-box">
          <label>Username</label>
          <input type="text" onChange={(event) => { setUsername(event.target.value); }}/>
          <FaUser className="icon" />
        </div>
        <div className="input-box">
          <label>Password</label>
          <input type="password" onChange={(event) => { setPassword(event.target.value); }}/>
          <FaLock className="icon"/>
        </div>
        <div className="remember-forgot">
          <label>
            <input type="checkbox" /> Lembrar-me
          </label>
          <a href="/">Esqueceu-se da palavra-passe?</a>
        </div>
        <button onClick={login}> Login </button>
        <div className="register-link">
          <p>Não tens conta? <a href="/">Criar Conta</a> </p>
        </div>
      </form>
    </div>
    </div>
  );
}

export default Login;