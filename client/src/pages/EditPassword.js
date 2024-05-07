import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import axios from "axios";
import "../styles/Login.css"; // Importe o CSS do EditPassword
import { toast, ToastContainer } from "react-toastify";
import { useNavigate } from "react-router-dom";

function EditPassword() {
  const navigate = useNavigate();

  const initialValues = {
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  };

  const validationSchema = Yup.object({
    currentPassword: Yup.string().required("Obrigatório!"),
    newPassword: Yup.string().min(8, 'A senha deve ter pelo menos 8 caracteres').max(20, 'A senha deve ter no máximo 20 caracteres')
    .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])/,"Deve incluir maiúsculas, minúsculas e números")
    .required('Obrigatório!'),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref("newPassword"), null], "As senhas não coincidem")
      .required("Obrigatório!"),
  });

  const onSubmit = (values, { setSubmitting, setStatus }) => {
    axios
      .put(
        "http://localhost:3001/auth/changePassword",
        {
          currentPassword: values.currentPassword,
          newPassword: values.newPassword,
        },
        {
          headers: { accessToken: localStorage.getItem("accessToken") },
        }
      )
      .then((response) => {
        if (response.data.error) {
          setStatus(response.data.error);
        } else {
          setStatus(null);
          toast.success("Senha alterada com sucesso!");
        }
      })
      .catch((error) => {
        if (error.response && error.response.data && error.response.data.error) {
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
        <h2>Editar Senha</h2>
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={onSubmit}
        >
          {({ isSubmitting, status }) => (
            <Form>
              <div className="input-box">
                <label>Senha atual</label>
                <Field type="password" name="currentPassword" />
                <ErrorMessage name="currentPassword" component="span" />
              </div>
              <div className="input-box">
                <label>Nova senha</label>
                <Field type="password" name="newPassword" />
                <ErrorMessage name="newPassword" component="span" />
              </div>
              <div className="input-box">
                <label>Confirme a nova senha</label>
                <Field type="password" name="confirmPassword" />
                <ErrorMessage name="confirmPassword" component="span" />
              </div>
              {status && <span>{status}</span>}
              <button type="submit" disabled={isSubmitting}>
                {isSubmitting ? "Alterando..." : "Alterar senha"}
              </button>
              <button type="button" onClick={() => navigate("/detalhes-da-conta")}>
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

export default EditPassword;
