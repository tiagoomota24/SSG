import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import '../styles/PasswordReset.css';
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";

const Resetpassword = () => {
  const location = useLocation();
  const [email] = useState(location.state?.email || ''); // Obter o email passado via estado
  const [message, setMessage] = useState('');
  const [isSuccess, setIsSuccess] = useState(false);
  const navigate = useNavigate();

  const validationSchema = Yup.object().shape({
    token: Yup.string().required('Obrigatório!'),
    newPassword: Yup.string()
      .min(8, 'A senha deve ter pelo menos 8 caracteres')
      .max(20, 'A senha deve ter no máximo 20 caracteres')
      .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])/, "Deve incluir maiúsculas, minúsculas e números")
      .required('Obrigatório!'),
  });

  const handleSubmit = async (values, { setSubmitting }) => {
    try {
      const response = await axios.post('https://ssg-2rzn.onrender.com/auth/verifyCodeAndResetPassword', {
        email,
        code: values.token,
        newPassword: values.newPassword,
      });
      setMessage(response.data.message);
      setIsSuccess(true);
      setTimeout(() => {
        navigate('/login', { state: { email } });
      }, 3000);
    } catch (error) {
      setMessage(error.response ? error.response.data.message : 'Server error');
      setIsSuccess(false);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="password-reset">
      <h1>Enter Verification Code</h1>
      <Formik
        initialValues={{ token: "", newPassword: "" }}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ isSubmitting }) => (
          <Form>
            <div>
              <label htmlFor="token">Verification Code:</label>
              <Field type="text" id="token" name="token" />
              <ErrorMessage name="token" component="div" className="error-message" />
            </div>
            <div>
              <label htmlFor="newPassword">New Password:</label>
              <Field type="password" id="newPassword" name="newPassword" />
              <ErrorMessage name="newPassword" component="div" className="error-message" />
            </div>
            <button type="submit" disabled={isSubmitting}>Reset Password</button>
          </Form>
        )}
      </Formik>
      {message && <p className={isSuccess ? "message-success" : "message-error"}>{message}</p>}
    </div>
  );
};

export default Resetpassword;
