import React, { useState } from "react";
import "../styles/Phishing.css";

function Phishing() {
  const [isHowItWorksExpanded, setIsHowItWorksExpanded] = useState(false);
  const [isHowToIdentifyExpanded, setIsHowToIdentifyExpanded] = useState(false);

  const toggleHowItWorks = () => {
    setIsHowItWorksExpanded(!isHowItWorksExpanded);
  };

  const toggleHowToIdentify = () => {
    setIsHowToIdentifyExpanded(!isHowToIdentifyExpanded);
  };

  return (
    <div className="phishing-container">
      <h1>Phishing</h1>
      <p>
        Phishing é uma técnica de engenharia social usada por criminosos para
        coletar informações pessoais, financeiras ou de segurança. Eles fazem
        isso enviando e-mails ou mensagens que parecem ser de instituições
        confiáveis.
      </p>
      <div className="expanding-container">
        <h1
          onClick={toggleHowItWorks}
          data-symbol={isHowItWorksExpanded ? "-" : "+"}
        >
          Como funciona ?
        </h1>
        {isHowItWorksExpanded && (
          <p>
            Os criminosos enviam e-mails ou mensagens que parecem ser de
            instituições confiáveis. Esses e-mails e mensagens geralmente contêm
            links para sites falsos que imitam sites reais. Quando você insere
            suas informações nesses sites falsos, os criminosos as coletam.
          </p>
        )}
      </div>
      <div className="expanding-container">
        <h1
          onClick={toggleHowToIdentify}
          data-symbol={isHowToIdentifyExpanded ? "-" : "+"}
        >
          Como identificar ?
        </h1>
        {isHowToIdentifyExpanded && (
          <p>
            Existem várias maneiras de identificar tentativas de phishing.
            Alguns sinais incluem erros de ortografia e gramática, endereços de
            e-mail ou URLs estranhos, solicitações de informações pessoais ou
            financeiras e ameaças ou urgência excessiva.
          </p>
        )}
      </div>
    </div>
  );
}

export default Phishing;
