import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import axios from "axios";
import "../styles/Login.css"; // Importe o CSS do Login
import { toast, ToastContainer } from "react-toastify";
import { useNavigate } from "react-router-dom";

function EditUsername() {
  const navigate = useNavigate();

  const initialValues = {
    currentUsername: "",
    newUsername: "",
  };

  const validationSchema = Yup.object({
    currentUsername: Yup.string()
      .required("Obrigatório!"),
    newUsername: Yup.string()
      .required("Obrigatório!"),
  });

  const onSubmit = (values, { setSubmitting, setStatus }) => {
    axios
      .put("http://localhost:3001/auth/changeUsername", values, {
        headers: { 'accessToken': localStorage.getItem('accessToken') }
      })
      .then(response => {
        if (response.data.error) {
          setStatus(response.data.error);
        } else {
          setStatus(null);
          toast.success('Nome de utilizador alterado com sucesso!');
        }
      })
      .catch(error => {
        if (error.response && error.response.data && error.response.data.error) {
          setStatus(error.response.data.error);
        } else {
          setStatus('Houve um erro!');
        }
      })
      .finally(() => {
          setSubmitting(false);
      });
  };

  return (
    <div className="page">
      <div className="wrapper">
        <h2>Editar Nome de Utilizador</h2>
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={onSubmit}
        >
          {({ isSubmitting, status }) => (
            <Form>
              <div className="input-box">
                <label>Nome de utilizador atual</label>
                <Field type="text" name="currentUsername" />
                <ErrorMessage name="currentUsername" component="span" />
              </div>
              <div className="input-box">
                <label>Novo nome de utilizador</label>
                <Field type="text" name="newUsername" />
                <ErrorMessage name="newUsername" component="span" />
              </div>
              {status && <span>{status}</span>}
              <button type="submit" disabled={isSubmitting}>
                {isSubmitting ? "Alterando..." : "Alterar Nome de utilizador"}
              </button>
              <button type="button" onClick={() => navigate('/detalhes-da-conta')}>
                Voltar
              </button>
            </Form>
          )}
        </Formik>
      </div>
      <ToastContainer position="top-right" />
    </div>
  );
}

export default EditUsername;
