import React, { useState } from "react";
import "../styles/Phishing.css";
import beSafe from "../assets/beSafe.png";

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
      <h1> PHISHING</h1>
      <div className="intro">
        <img src={beSafe} alt="beSafe" className="beSafe" />
        <p>
          O phishing (trocadilho com “fishing” ou “ir à pesca” em inglês, dado
          que a informação é como que um “anzol” que se espera que alguém
          “morda”) consiste em utilizar métodos vários que levem o utilizador a
          revelar dados pessoais e confidenciais, como os seus números de
          cartão de crédito, informação de contas bancárias, números de
          segurança social, passwords, entre outros.
        </p>
      </div>
      <div className="expanding-container">
        <h1 onClick={toggleHowItWorks} data-symbol={isHowItWorksExpanded ? "-" : "+"}>
          Como funciona o Phishing?
        </h1>
        {isHowItWorksExpanded && (
          <p>
            Os “phishers” recorrem a várias formas de obtenção de informação,
            nomeadamente, spam, mensagens de pop-up ou de e-mail, fazendo-se
            passar por empresas ou organizações legítimas com as quais a
            potencial vítima tem negócios – por exemplo, o seu fornecedor de
            serviços de Internet, banco, serviços de pagamentos online ou até
            um organismo governamental. <br /><br />Estas mensagens costumam alegar que o
            utilizador precisa de “atualizar” ou “validar” a informação da sua
            conta, chegando a ameaçar com consequências negativas (o fecho da
            conta, por exemplo) caso não haja resposta. A estas técnicas de
            ameaça e manipulação dá-se o nome de Engenharia Social, nas quais
            também se inserem as formas mais sedutoras de persuasão, como a
            “oferta” de artigos, viagens ou dinheiro através da Internet.
          </p>
        )}
      </div>
      <div className="expanding-container">
        <h1 onClick={toggleHowToIdentify} data-symbol={isHowToIdentifyExpanded ? "-" : "+"}>
          Como identificar o Phishing?
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
