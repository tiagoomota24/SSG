import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import axios from "axios";
import "../styles/Login.css"; // Importe o CSS do Login
import { toast, ToastContainer } from "react-toastify";
import { useNavigate } from "react-router-dom";

function EditEmail() {
  const navigate = useNavigate();

  const initialValues = {
    currentEmail: "",
    newEmail: "",
  };

  const validationSchema = Yup.object({
    currentEmail: Yup.string()
      .email("O endereço de email é inválido")
      .required("Obrigatório!"),
    newEmail: Yup.string()
      .email("O endereço de email é inválido")
      .required("Obrigatório!"),
  });

  const onSubmit = (values, { setSubmitting, setStatus }) => {
    axios
      .put("https://ssg-2rzn.onrender.com/auth/changeEmail", values, {
        headers: { accessToken: localStorage.getItem("accessToken") },
      })
      .then((response) => {
        if (response.data.error) {
          setStatus(response.data.error);
        } else {
          setStatus(null);
          toast.success("Email alterado com sucesso!");
        }
      })
      .catch((error) => {
        if (
          error.response &&
          error.response.data &&
          error.response.data.error
        ) {
          setStatus(error.response.data.error);
        } else {
          setStatus("Houve um erro!");
        }
      })
      .finally(() => {
        setSubmitting(false);
      });
  };

  return (
    <div className="page">
      <div className="wrapper">
        <h2>Editar Email</h2>
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={onSubmit}
        >
          {({ isSubmitting, status }) => (
            <Form>
              <div className="input-box">
                <label>Email atual</label>
                <Field type="email" name="currentEmail" />
                <ErrorMessage name="currentEmail" component="span" />
              </div>
              <div className="input-box">
                <label>Novo email</label>
                <Field type="email" name="newEmail" />
                <ErrorMessage name="newEmail" component="span" />
              </div>
              {status && <span>{status}</span>}
              <button type="submit" disabled={isSubmitting}>
                {isSubmitting ? "Alterado" : "Alterar email"}
              </button>
              <button
                type="button"
                onClick={() => navigate("/detalhes-da-conta")}
              >
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

export default EditEmail;
