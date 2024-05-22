import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { AuthContext } from "../helpers/AuthContex";
import { useNavigate } from "react-router-dom";
import "../styles/AdminPage.css"; // Import the CSS file

const AdminPage = () => {
  const [users, setUsers] = useState([]);
  const { authState } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (!authState.isAdmin) {
      alert("Acesso negado. Apenas administradores podem acessar esta página.");
      navigate("/");
      return;
    }

    axios.get("http://localhost:3001/auth/users", {
      headers: { accessToken: localStorage.getItem("accessToken") },
    }).then((response) => {
      setUsers(response.data);
    }).catch((error) => {
      console.error("Error fetching users:", error);
    });
  }, [authState.isAdmin, navigate]);

  const handleDelete = (userId) => {
    axios.delete(`http://localhost:3001/auth/users/${userId}`, {
      headers: { accessToken: localStorage.getItem("accessToken") },
    }).then(() => {
      setUsers(users.filter(user => user.id !== userId));
    }).catch((error) => {
      console.error("Error deleting user:", error);
    });
  };

  const handleMakeAdmin = (userId) => {
    axios
      .put(
        `http://localhost:3001/auth/users/${userId}/makeAdmin`,
        {},
        {
          headers: { accessToken: localStorage.getItem("accessToken") },
        }
      )
      .then((response) => {
        setUsers(
          users.map((user) =>
            user.id === userId ? { ...user, isAdmin: true } : user
          )
        );
      })
      .catch((error) => {
        console.error("Error making user admin:", error);
      });
  };

  return (
    <div className="admin-container">
      <div className="admin-header">
        <h1>Controlar Contas</h1>
      </div>
      <ul className="user-list">
        {users.map((user) => (
          <li key={user.id}>
            {user.username} ({user.email}){" "}
            {user.isAdmin ? (
              <span>(Admin)</span>
            ) : (
              <button
                className="admin-button"
                onClick={() => handleMakeAdmin(user.id)}
              >
                Tornar Admin
              </button>
            )}
            <button
              className="delete-button"
              onClick={() => handleDelete(user.id)}
            >
              Eliminar
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AdminPage;
