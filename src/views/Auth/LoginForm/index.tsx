// import InputField from "../../../shared/components/InputField";
// import { validationSchema } from "./LoginValidation";
// import { Button } from "antd";
// import UserService from "../../../services/AuthService/auth.service";
// import { useNavigate } from "react-router-dom";
// import { AppRoutes } from "../../../routes/routeConstants/appRoutes";
// import { AuthContext } from "../../../context/AuthContext";

import React, { useState } from "react";
import { useFormik } from "formik";
import "./LoginForm.scss";
import validateLogin, { LoginFormValues } from "./LoginValidation";
import { ReactComponent as EmailIcon } from "../../../assets/single color icons - SVG/mail.svg";
import { ReactComponent as LockIcon } from "../../../assets/single color icons - SVG/password.svg";
import Logo from "../../../assets/Logo/PNG/MLCAN logo.png";
import Axios from "axios";
import { useNavigate } from "react-router-dom";

const initialValues: LoginFormValues = {
  email: "",
  password: "",
};

const LoginForm = () => {
  const [isForgotPassword, setForgotPassword] = useState(false);
  const navigate = useNavigate();

  const onSubmit = async (values: typeof initialValues) => {
    console.log(values);
    try {
      const response = await Axios.post(
        "https://bcb0c878-9e76-4de6-a365-0880817cf153.mock.pstmn.io/api/v1/users",

        {
          grant_type: "password",
          client_id: "rDxi3yoY3uz8pJ1ANxUXkv0Q1n245d_RSvlXEuJJFXg",
          client_secret: "EFb19pka46ccvU9PfCD6VpvjkmVwFJukL2SoFTk1Zq0",
          email: values.email,
          password: values.password,
        }
      );

      console.log("Response:", response);
      navigate("/containers");
    } catch (error) {
      console.log("Error", error);
    }
  };

  const formik = useFormik({
    initialValues,
    onSubmit,
    validate: validateLogin,
  });

  return (
    <div className="login">
      <div className="background">
        <div className="mlcan-logo">
          <img src={Logo} alt="Logo" width={400} />
        </div>
        <div className={`login-box ${isForgotPassword ? 'forgot-password-mode' : ''}`}>
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
                <div className="login-container">
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
