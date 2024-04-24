import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Homepage from "./pages/Homepage";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Nav from "./Components/Nav";
import Phishing from "./pages/Phishing";
import Jogos from "./pages/Jogos";
import Classificacao from "./pages/Classificacao";
import { AuthContext } from "./helpers/AuthContex";
import { useState, useEffect } from "react";
import axios from "axios";

function App() {

  const [authState, setAuthState] = useState({
    status: !!localStorage.getItem("accessToken"),
  });
  
  useEffect(() => {
    if (!localStorage.getItem("accessToken")) {
      setAuthState({ status: false });
    }
  }, []);

  useEffect(() => {
    if (authState.status) {
      axios
        .get("http://localhost:3001/auth/auth", {
          headers: { accessToken: localStorage.getItem("accessToken") },
        })
        .then((response) => {
          if (response.data.error) {
            setAuthState({ status: false });
          }
        })
        .catch((error) => {
          console.error("Error checking authentication status:", error);
        });
    }
  }, [authState.status]);
  
  useEffect(() => {
    const handleStorageChange = (e) => {
      if (e.key === "accessToken" && !e.newValue) {
        setAuthState({ status: false });
      }
    };
  
    window.addEventListener("storage", handleStorageChange);
  
    return () => {
      window.removeEventListener("storage", handleStorageChange);
    };
  }, []);

  return (
    <div className="App">
      <AuthContext.Provider value={{authState, setAuthState}}>
      <Router>
        <Nav />
        <Routes>
          <Route path="/" element={<Homepage />} />
          <Route path="/login" element={localStorage.getItem("accessToken") ? <Homepage /> : <Login />} />
          <Route path="/register" element={localStorage.getItem("accessToken") ? <Homepage /> : <Register />} />
          <Route path="/phishing" element={<Phishing />} />
          <Route path="/jogos" element={<Jogos />} />
          <Route path="/tabela_de_classificacao" element={<Classificacao />} /> 
        </Routes>
      </Router>
      </AuthContext.Provider>
    </div>
  );
}

export default App;
