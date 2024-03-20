import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Homepage from "./pages/Homepage";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Navbar from "./Components/Navbar";

function App() {
  return (
    <div className="App">
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" exact component={Homepage} />
          <Route path="/login" element={Login} />
          <Route path="/register" exact component={Register} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
