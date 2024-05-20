import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import '../styles/PasswordReset.css';

const Resetpassword = () => {
  const location = useLocation();
  const [email] = useState(location.state?.email || ''); // Obter o email passado via estado
  const [token, setToken] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [message, setMessage] = useState('');
  const [isSuccess, setIsSuccess] = useState(false);
  const navigate = useNavigate();


  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://localhost:3001/auth/verifyCodeAndResetPassword', {
        email,
        code: token,
        newPassword,
      });
      setMessage(response.data.message);
      setTimeout(() => {
        navigate('/login', { state: { email } });
      }, 3000);
      setIsSuccess(true);
    } catch (error) {
      setMessage(error.response ? error.response.data.message : 'Server error');
      setIsSuccess(false);
    }
  };

  return (
    <div className="password-reset">
      <h1>Enter Verification Code</h1>
      <form onSubmit={handleSubmit}>
        <label htmlFor="token">Verification Code:</label>
        <input
          type="text"
          id="token"
          name="token"
          value={token}
          onChange={(e) => setToken(e.target.value)}
          required
        />
        <label htmlFor="newPassword">New Password:</label>
        <input
          type="password"
          id="newPassword"
          name="newPassword"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
          required
        />
        <button type="submit">Reset Password</button>
      </form>
      {message && <p className={isSuccess ? "message-success" : "message-error"}>{message}</p>}
    </div>
  );
};

export default Resetpassword;
