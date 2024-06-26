import React, { useState, useEffect } from "react";
import emailjs from "emailjs-com"; // Importe o SDK do EmailJS
import "../styles/Contact.css";
import axios from "axios";

const Contact = () => {
  const [name, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [responseMessage, setResponseMessage] = useState("");

  useEffect(() => {
    axios
      .get("https://ssg-2rzn.onrender.com/auth/userDetails", {
        headers: { accessToken: localStorage.getItem("accessToken") },
      })
      .then((response) => {
        setEmail(response.data.email);
        setUsername(response.data.username);
      })
      .catch((error) => {
        console.error("There was an error!", error);
      });
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();

    // Enviar o e-mail usando o SDK do EmailJS
    emailjs
      .sendForm(
        "service_jj85nsa",
        "template_pii0zyc",
        e.target,
        "O5zVUWMmOiZyO3s4-"
      )
      .then(
        (result) => {
          console.log(result.text);
          setResponseMessage("Sua mensagem foi enviada com sucesso!");
        },
        (error) => {
          console.error(error.text);
          setResponseMessage("Erro ao enviar a mensagem. Tente novamente.");
        }
      );
  };

  return (
    <div className="contact-page">
      <h1>Fale Conosco</h1>
      <form onSubmit={handleSubmit}>
        <label htmlFor="name">Nome:</label>
        <input
          type="text"
          id="name"
          name="from_name"
          value={name}
          onChange={(e) => setUsername(e.target.value)}
          required
        />
        <label htmlFor="email">Email:</label>
        <input
          type="email"
          id="email"
          name="reply_to" // Corrigido de "replay_to" para "reply_to"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <label htmlFor="message">Mensagem:</label>
        <textarea
          id="message"
          name="message"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          required
        ></textarea>
        <button type="submit">Enviar Mensagem</button>
      </form>
      {responseMessage && <p>{responseMessage}</p>}
    </div>
  );
};

export default Contact;
