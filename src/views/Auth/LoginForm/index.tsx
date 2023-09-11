import React, { useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik"; // Import Formik components
import "./LoginForm.scss";
import { LoginFormValues } from "./LoginValidation";
import { ReactComponent as EmailIcon } from "../../../assets/single color icons - SVG/mail.svg";
import { ReactComponent as LockIcon } from "../../../assets/single color icons - SVG/password.svg";
import Logo from "../../../assets/Logo/PNG/MLCAN logo.png";
import { useAuth } from "../../../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { onSubmit } from "../../../services/AuthService/auth.service";

const initialValues: LoginFormValues = {
  email: "",
  password: "",
};

const LoginForm: React.FC = () => {
  const [isForgotPassword, setForgotPassword] = useState(false);
  const { login } = useAuth()!;
  const navigate = useNavigate();

  return (
    <div className="login">
      <div className="background">
        <div className="mlcan-logo">
          <img src={Logo} alt="Logo" width={400} />
        </div>
        <div
          className={`login-box ${
            isForgotPassword ? "forgot-password-mode" : ""
          }`}
        >
          <h2>
            {isForgotPassword ? "Forgot Password" : "Login into Admin Portal"}
          </h2>
          <br></br>
          <Formik
            initialValues={initialValues}
            onSubmit={async (values, {setErrors}) => {
              await onSubmit(values, login, navigate, setErrors);
            }}
          >
            <Form className="login-form">
              {isForgotPassword ? (
                <div className="fp-logic">
                  <div className="fp-container">
                    <label htmlFor="email">Registered Email</label>
                    <br></br>
                    <br></br>
                    <div className="email-data">
                      <span className="email-input-image">
                        <EmailIcon width="16" height="16" fill="currentColor" />
                      </span>
                      <Field
                        type="text"
                        id="email"
                        name="email"
                        placeholder="Enter"
                        className="email-input"
                      />
                      <ErrorMessage
                        name="email"
                        component="div"
                        className="error-message"
                      />
                    </div>
                  </div>
                </div>
              ) : (
                <div className="login-logic">
                  <div className="email-container">
                    <label htmlFor="email">Email</label>
                    <br></br>
                    <br></br>
                    <div className="email-data">
                      <span className="email-input-image">
                        <EmailIcon width="16" height="16" fill="currentColor" />
                      </span>
                      <Field
                        type="text"
                        id="email"
                        name="email"
                        placeholder="Enter"
                        className="email-input"
                      />
                      <ErrorMessage
                        name="email"
                        component="div"
                        className="error-message"
                      />
                    </div>
                  </div>
                  <br></br>

                  <div className="password-container">
                    <label htmlFor="password">Password</label>
                    <br></br>
                    <br></br>
                    <div className="password-data">
                      <span className="password-input-image">
                        <LockIcon width={16} height={16} fill="currentColor" />
                      </span>
                      <Field
                        type="password"
                        id="password"
                        name="password"
                        placeholder="Enter"
                        className="password-input"
                      />
                      <ErrorMessage
                        name="password"
                        component="div"
                        className="error-message"
                      />
                    </div>
                  </div>
                </div>
              )}
              <div className="login-items">
                <button type="submit">
                  {isForgotPassword
                    ? "Send Password to Email"
                    : "Login"}
                </button>
                <p onClick={() => setForgotPassword(!isForgotPassword)}>
                  {isForgotPassword ? "Login Here" : "Forgot Password?"}
                </p>
              </div>
            </Form>
          </Formik>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;
