import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/Depoimentos.css";

const TestimonialForm = ({ addTestimonial }) => {
  const [testimonial, setTestimonial] = useState({ text: "", author: "" });
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    addTestimonial(testimonial);
    navigate("/");
  };

  return (
    <div className="testimonial-form-container">
      <h2>Envie seu Depoimento</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <textarea
            value={testimonial.text}
            onChange={(e) => setTestimonial({ ...testimonial, text: e.target.value })}
            placeholder="Escreva seu depoimento"
            required
          />
        </div>
        <div>
          <input
            type="text"
            value={testimonial.author}
            onChange={(e) => setTestimonial({ ...testimonial, author: e.target.value })}
            placeholder="Seu nome"
            required
          />
        </div>
        <button type="submit">Enviar Depoimento</button>
      </form>
    </div>
  );
};

export default TestimonialForm;
