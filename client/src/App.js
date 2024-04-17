import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Homepage from "./pages/Homepage";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Navbar from "./Components/Navbar";
import Phishing from "./pages/Phishing";
import { AuthContext } from "./helpers/AuthContex";
import { useState, useEffect } from "react";
import axios from "axios";

function App() {

  const [authState, setAuthState] = useState(false);

  useEffect(() => {
   axios.get("http://localhost:3001/auth/auth", {headers: {accessToken: localStorage.getItem("accessToken"),},}).then((response) => {
    if (response.data.error) {
      setAuthState(false);
    }else{
      setAuthState(true);
    }
    });
  }, []);

  return (
    <div className="App">
      <AuthContext.Provider value={{authState, setAuthState}}>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<Homepage />} />
          <Route path="/login" element={!authState ? <Login /> : <Homepage />} />
          <Route path="/register" element={!authState ? <Register /> : <Homepage />} />
          <Route path="/phishing" element={<Phishing />} />
        </Routes>
      </Router>
      </AuthContext.Provider>
    </div>
  );
}

export default App;
