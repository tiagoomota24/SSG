import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import axios from "axios";
import "../styles/Login.css";
import {useNavigate} from "react-router-dom";

function Registration() {

  const navigate = useNavigate();

  const initialValues = {
    username: "",
    password: "",
    email: ""
  };

  const validationSchema = Yup.object().shape({
    username: Yup.string().min(3, 'O Utilizador deve ter pelo menos 3 caracteres').max(15, 'O Utilizador deve ter no máximo 15 caracteres').required('Obrigatório!'),
    password: Yup.string().min(4, 'A senha deve ter pelo menos 4 caracteres').max(20, 'A senha deve ter no máximo 20 caracteres').required('Obrigatório!'),
    email: Yup.string().email('O endereço de email é inválido').required('Obrigatório!')
  });

  const onSubmit = (data) => {
    axios.post("http://localhost:3001/auth/checkUsername", { username: data.username })
      .then((response) => {
        if (response.data.exists) {
          alert("Nome de usuário já existe!");
        } else {
          axios.post("http://localhost:3001/auth/checkEmail", { email: data.email })
            .then((response) => {
              if (response.data.exists) {
                alert("Email já está em uso!");
              } else {
                axios.post("http://localhost:3001/auth", data).then((response) => {
                  console.log(response);
                  navigate("/login");
                });
              }
            });
        }
      });
  };

  return (
    <div className="page">
      <div className="wrapper">
        <h2>Criar Conta</h2>
        <Formik
          initialValues={initialValues}
          onSubmit={onSubmit}
          validationSchema={validationSchema}
        >
          <Form className="formContainer">
            <div className="input-box">
              <label>Username: </label>
              <Field
                autoComplete="off"
                id="inputCreatePost1"
                name="username"
                placeholder="(Ex. Tiago123)"
              />
              <ErrorMessage name="username" component="span" />
            </div>
            <div className="input-box">
            <label>Email: </label>
              <Field
                autoComplete="off"
                id="inputCreatePost2"
                name="email"
                placeholder="Insira email..."
              />
              <ErrorMessage name="email" component="span" />
            </div>
            <div className="input-box">
              <label>Password: </label>
              <Field
                autoComplete="off"
                type="password"
                id="inputCreatePost3"
                name="password"
                placeholder="Insira a senha..."
              />
              <ErrorMessage name="password" component="span" />
            </div>
            <button type="submit"> Register</button>
          </Form>
        </Formik>
      </div>
    </div>
  );
}

export default Registration;
