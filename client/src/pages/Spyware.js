import React, { useState, useEffect, useContext } from "react";
import "../styles/Phishing.css";
import beSafe from "../assets/beSafe.png";
import { AuthContext } from "../helpers/AuthContex";
import axios from "axios";

function Spyware() {
  const [isHowItWorksExpanded, setIsHowItWorksExpanded] = useState(false);
  const [isHowToIdentifyExpanded, setIsHowToIdentifyExpanded] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [content, setContent] = useState({
    intro: "",
    howItWorks: "",
    howToIdentify: "",
  });

  const { authState } = useContext(AuthContext);

  useEffect(() => {
    axios.get("https://ssg-2rzn.onrender.com/phishing/phishingContent/4").then((response) => {
      setContent(response.data);
    }).catch((error) => {
      console.error("Error fetching content:", error);
    });
  }, []);

  const toggleHowItWorks = () => {
    setIsHowItWorksExpanded(!isHowItWorksExpanded);
  };

  const toggleHowToIdentify = () => {
    setIsHowToIdentifyExpanded(!isHowToIdentifyExpanded);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setContent((prevContent) => ({
      ...prevContent,
      [name]: value,
    }));
  };

  const handleSave = () => {
    axios.post("https://ssg-2rzn.onrender.com/phishing/phishingContent/4", content, {
      headers: { accessToken: localStorage.getItem("accessToken") },
    }).then((response) => {
      setEditMode(false);
      alert("Conteudo foi guardado com sucesso!");
    }).catch((error) => {
      console.error("Error saving content:", error);
    });
  };

  return (
    <div className="phishing-container">
      <h1> SPYWARE</h1>
      <div className="intro">
        <img src={beSafe} alt="beSafe" className="beSafe" />
        {editMode ? (
          <textarea name="intro" value={content.intro} onChange={handleInputChange} />
        ) : (
          <p>{content.intro}</p>
        )}
      </div>
      <div className="expanding-container">
        <h1 onClick={toggleHowItWorks} data-symbol={isHowItWorksExpanded ? "-" : "+"}>
          Como funciona o Spyware?
        </h1>
        {isHowItWorksExpanded && (
          <div>
            {editMode ? (
              <textarea name="howItWorks" value={content.howItWorks} onChange={handleInputChange} />
            ) : (
              <p>{content.howItWorks}</p>
            )}
          </div>
        )}
      </div>
      <div className="expanding-container">
        <h1 onClick={toggleHowToIdentify} data-symbol={isHowToIdentifyExpanded ? "-" : "+"}>
          Como identificar o Spyware?
        </h1>
        {isHowToIdentifyExpanded && (
          <div>
            {editMode ? (
              <textarea name="howToIdentify" value={content.howToIdentify} onChange={handleInputChange} />
            ) : (
              <p>{content.howToIdentify}</p>
            )}
          </div>
        )}
      </div>
      {authState.isAdmin && (
        <div className="admin-controls">
          {editMode ? (
            <button className="save-button" onClick={handleSave}>Guardar</button>
          ) : (
            <button className="edit-button" onClick={() => setEditMode(true)}>Editar</button>
          )}
        </div>
      )}
    </div>
  );
}

export default Spyware;
