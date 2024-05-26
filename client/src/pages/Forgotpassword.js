import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "../styles/Forgotpassword.css";

const PasswordResetRequest = () => {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();
  const [isSuccess, setIsSuccess] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        "https://ssg-2rzn.onrender.com/auth/requestPasswordReset",
        { email }
      );
      setMessage(response.data.message);
      setTimeout(() => {
        navigate("/resetpassword", { state: { email } });
      }, 3000); // 3 segundos de atraso // Redireciona para a página de inserção do token
      setIsSuccess(true);
    } catch (error) {
      setMessage(error.response ? error.response.data.message : "Server error");
      setIsSuccess(false);
    }
  };

  return (
    <div className="password-reset-request">
      <h1>Recuperar Palavra-passe</h1>
      <form onSubmit={handleSubmit}>
        <label htmlFor="email">Email:</label>
        <input
          type="email"
          id="email"
          name="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <button type="submit">Solicitar Redefinição da senha</button>
      </form>
      {message && (
        <p className={isSuccess ? "message-success" : "message-error"}>
          {message}
        </p>
      )}
    </div>
  );
};

export default PasswordResetRequest;
