import React, { useState } from "react";
import { useFormik } from "formik";
import "./LoginForm.scss";
import validateLoginSchema, { LoginFormValues } from "./LoginValidation";
import { ReactComponent as EmailIcon } from "../../../assets/single color icons - SVG/mail.svg";
import { ReactComponent as LockIcon } from "../../../assets/single color icons - SVG/password.svg";
import Logo from "../../../assets/Logo/PNG/MLCAN logo.png";
import { useAuth } from "../../../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { ApiRoutes } from "../../../routes/routeConstants/apiRoutes";
import * as yup from 'yup';

const initialValues: LoginFormValues = {
  email: "",
  password: "",
};

const validateLogin = async (values: LoginFormValues) => {
  try {
    await validateLoginSchema.validate(values, { abortEarly: false });
    return {}; 
  } catch (validationErrors) {
    if (validationErrors instanceof yup.ValidationError) {
    
      const errors: Record<string, string> = {};
      validationErrors.inner.forEach((error) => {
        if (error.path) {
          errors[error.path] = error.message;
        }
      });
      return errors;
    }
    console.error("Validation error:", validationErrors);
    return {};
  }
};

const LoginForm: React.FC = () => {
  const [isForgotPassword, setForgotPassword] = useState(false);
  const { login } = useAuth()!;
  const navigate = useNavigate()
  const formik = useFormik({
    initialValues,
    onSubmit: async (values) => {
      try {
        const success = await login(values.email, values.password);
        if (success) {
          navigate(ApiRoutes.CONTAINERS)
        } else {
         formik.errors.password = "Check your password and Try again !"
        }
      } catch (error) {
        console.log("Error", error);
      }
    },
    validate: validateLogin,
  });
  
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
          <form className="login-form" onSubmit={formik.handleSubmit}>
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
                    <input
                      id="email"
                      name="email"
                      placeholder="Enter"
                      type="text"
                      className="email-input"
                      onChange={formik.handleChange}
                      value={formik.values.email}
                      onBlur={formik.handleBlur}
                    />
                    {formik.touched.email && formik.errors.email ? (
                      <div className="error-message">{formik.errors.email}</div>
                    ) : null}
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
                    <input
                      id="email"
                      name="email"
                      placeholder="Enter"
                      type="text"
                      className="email-input"
                      onChange={formik.handleChange}
                      value={formik.values.email}
                      onBlur={formik.handleBlur}
                    />
                    {formik.touched.email && formik.errors.email ? (
                      <div className="error-message">{formik.errors.email}</div>
                    ) : null}
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
                    <input
                      id="password"
                      name="password"
                      placeholder="Enter"
                      type="password"
                      className="password-input"
                      onChange={formik.handleChange}
                      value={formik.values.password}
                      onBlur={formik.handleBlur}
                    />
                    {formik.touched.password && formik.errors.password ? (
                      <div className="error-message">
                        {formik.errors.password}
                      </div>
                    ) : null}
                  </div>
                </div>
              </div>
            )}
            <div className="login-items">
              <button type="submit">
                {isForgotPassword ? "Send Password to Email" : "Login"}
              </button>
              <p onClick={() => setForgotPassword(!isForgotPassword)}>
                {isForgotPassword ? "Login Here" : "Forgot Password?"}
              </p>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;
