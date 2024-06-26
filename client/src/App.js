import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Homepage from "./pages/Homepage";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Nav from "./Components/Nav";
import Phishing from "./pages/Phishing";
import Jogos from "./pages/Jogos";
import Classificacao from "./pages/Classificacao";
import Quiz from "./pages/Quiz";
import DetalhesConta from "./pages/DetalhesConta";
import EditPassword from "./pages/EditPassword";
import EditEmail from "./pages/EditEmail";
import EditUsername from "./pages/EditUsername";
import Historico from "./pages/Historico";
import { AuthContext } from "./helpers/AuthContex";
import { useState, useEffect } from "react";
import axios from "axios";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import i18n from "./i18n";
import { I18nextProvider } from 'react-i18next';
import Depoimentos from "./pages/Depoimentos";
import Forgotpassword from "./pages/Forgotpassword";
import Resetpassword from "./pages/Resetpassword";
import Contact from "./pages/Contact";
import Footer from "./Components/Footer";
import AdminPage from "./pages/AdminPage";
import Malware from "./pages/Malware";
import Ransomware from "./pages/Ransomware";
import Activation from "./pages/Activation";
import Spyware from "./pages/Spyware";
import DDOS from "./pages/Ddos";

function App() {

  const [authState, setAuthState] = useState({
    status: !!localStorage.getItem("accessToken"),
    isAdmin: false
  });
  
  useEffect(() => {
    if (!localStorage.getItem("accessToken")) {
      setAuthState({ status: false , isAdmin: false});
    }
  }, []);

  useEffect(() => {
    if (authState.status) {
      axios
        .get("https://ssg-2rzn.onrender.com/auth/auth", {
          headers: { accessToken: localStorage.getItem("accessToken") },
        })
        .then((response) => {
          if (response.data.error) {
            setAuthState({ status: false, isAdmin: false });
          }
          else{
            setAuthState({
              status: true,
              isAdmin: response.data.isAdmin
            });
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
        setAuthState({ status: false, isAdmin: false});
      }
    };
  
    window.addEventListener("storage", handleStorageChange);
  
    return () => {
      window.removeEventListener("storage", handleStorageChange);
    };
  }, []);

  return (
    <div className="App">
    <I18nextProvider i18n={i18n}>
      <AuthContext.Provider value={{authState, setAuthState}}>
      <Router>
        <div id="root">
      <ToastContainer />
        <Nav />
        <div className="main-content">
        <Routes>
          <Route path="/" element={<Homepage />} />
          <Route path="/login" element={localStorage.getItem("accessToken") ? <Homepage /> : <Login />} />
          <Route path="/register" element={localStorage.getItem("accessToken") ? <Homepage /> : <Register />} />
          <Route path="/phishing" element={<Phishing />} />
          <Route path="/malware" element={<Malware />} />
          <Route path="/ransomware" element={<Ransomware />} />
          <Route path="/spyware" element={<Spyware />} />
          <Route path="/ddos" element={<DDOS />} />
          <Route path="/jogos" element={<Jogos />} />
          <Route path="/tabela_de_classificacao" element={<Classificacao />} /> 
          <Route path="/quiz" element={<Quiz />} />
          <Route path="/detalhes-da-conta" element={<DetalhesConta />} />
          <Route path="/editar-senha" element={<EditPassword />} />
          <Route path="/editar-email" element={<EditEmail />} />
          <Route path="/editar-username" element={<EditUsername />} />
          <Route path="/historico" element={<Historico />} />
          <Route path="/depoimentos" element={<Depoimentos />} />
          <Route path="/forgotpassword" element={<Forgotpassword />} />
          <Route path="/resetpassword" element={<Resetpassword />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/admin" element={authState.isAdmin ? <AdminPage /> : <Homepage />} />
          <Route path="/activation" element={<Activation />} />
        </Routes>
        </div>
        <Footer />
        </div>
      </Router>
      </AuthContext.Provider>
      </I18nextProvider>
    </div>
  );
}

export default App;
