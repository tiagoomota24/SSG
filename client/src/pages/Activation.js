import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import '../styles/Activation.css';  // Import the CSS file

const Activation = () => {
  const [message, setMessage] = useState('');
  const [isSuccess, setIsSuccess] = useState(false);
  const navigate = useNavigate();

  const validationSchema = Yup.object().shape({
    email: Yup.string().email('Email inválido').required('Obrigatório!'),
    activationCode: Yup.string().required('Obrigatório!'),
  });

  const handleSubmit = async (values, { setSubmitting }) => {
    try {
      const response = await axios.post('http://localhost:3001/auth/activateAccount', {
        email: values.email,
        activationCode: values.activationCode,
      });
      setMessage(response.data.message);
      setIsSuccess(true);
      setTimeout(() => {
        navigate('/login');
      }, 3000);
    } catch (error) {
      setMessage(error.response ? error.response.data.message : 'Erro no servidor');
      setIsSuccess(false);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="activation">
      <h1>Ativar Conta</h1>
      <Formik
        initialValues={{ email: '', activationCode: '' }}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ isSubmitting }) => (
          <Form>
            <div>
              <label htmlFor="email">Email:</label>
              <Field type="email" id="email" name="email" />
              <ErrorMessage name="email" component="div" className="error-message" />
            </div>
            <div>
              <label htmlFor="activationCode">Código de Ativação:</label>
              <Field type="text" id="activationCode" name="activationCode" />
              <ErrorMessage name="activationCode" component="div" className="error-message" />
            </div>
            <button type="submit" disabled={isSubmitting}>Ativar Conta</button>
          </Form>
        )}
      </Formik>
      {message && <p className={isSuccess ? "message-success" : "message-error"}>{message}</p>}
    </div>
  );
};

export default Activation;
