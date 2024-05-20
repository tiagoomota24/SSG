import React, { useState, useEffect } from "react";
import "../styles/DetalhesConta.css";
import axios from "axios";
import { MdEdit } from "react-icons/md";
import { Link, useNavigate } from "react-router-dom";


function DetalhesConta() {
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password] = useState("********");
  const navigate = useNavigate();


  useEffect(() => {
    axios
      .get("http://localhost:3001/auth/userDetails", {
        headers: { accessToken: localStorage.getItem("accessToken") },
      })
      .then((response) => {
        setEmail(response.data.email);
        setUsername(response.data.username);
      })
      .catch((error) => {
        console.error("There was an error!", error);
      });
  }, []);

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(
      `Email: ${email}, Username: ${username}, Password: ${password}`
    );
  };

    const handleLogout = () => {
    navigate("/");
    }

  return (
    <div className="page">
      <div className="wrapper">
        <form onSubmit={handleSubmit}>
          <h2>Dados da Conta</h2>
          <div className="input-box">
            <label>Email</label>
            <input
              className="input-field"
              type="email"
              value={email}
              readOnly
            />
            <Link to="/editar-email">
              <MdEdit className="edit-icon" title="editar-email" />
            </Link>
          </div>
          <div className="input-box">
            <label>Username</label>
            <input
              className="input-field"
              type="text"
              value={username}
              readOnly
            />
          </div>
          <div className="input-box">
            <label>Senha</label>
            <input
              className="input-field"
              type="password"
              value={password}
              readOnly
            />
            <Link to="/editar-senha">
              <MdEdit className="edit-icon" title="editar-senha" />
            </Link>
          </div>
          <button type="button" onClick={handleLogout}>Sair</button>
        </form>
      </div>
    </div>
  );
}

export default DetalhesConta;
