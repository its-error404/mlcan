import axiosInstance from "../../interceptor/axiosInstance";
import { deserialize } from "serializr";
import { User } from "../../models/user.model";
import { setAuthToken, removeAuthToken, setUserInfo, IS_ADMIN } from "./authToken";
import { ApiRoutes } from "../../routes/routeConstants/apiRoutes";
import loginSchema, { LoginFormValues } from "../../views/Auth/LoginForm/LoginValidation";


import * as yup from 'yup';

export const onSubmit = async (
  values: LoginFormValues,
  login: (email: string, password: string) => Promise<boolean>,
  navigate: (route: string) => void,
  setErrors: any
) => {
  try {
    await loginSchema.validate(values, { abortEarly: false });

    const success = await login(values.email, values.password);
    if (success) {
      navigate(ApiRoutes.CONTAINERS);
    } else {
      setErrors({ password: "Check your password and try again!" });
    }
  } catch (error) {
    if (error instanceof yup.ValidationError) {
      const errors: { [key: string]: string } = {};
      error.inner.forEach((e) => {
        errors[e.path] = e.message;
      });
      setErrors(errors);
    } else {
      console.log("Error", error);
    }
  }
};


export const loginUser = async (email: string, password: string) => {
  try {

    const response = await axiosInstance.post(ApiRoutes.USER_LOGIN, {
      email,
      password,
    });
    
    if (response.status === 200) {

      const user = deserialize(User, response.data.data.user);

      if (response.data.data.tokens.access_token)

        setAuthToken(response.data.data.tokens.access_token);

        const isAdmin = localStorage.getItem(IS_ADMIN) === "true";
                if (isAdmin) {

                    response.data.data.user.admin = "User";
                } else {
                    response.data.data.user.admin = "Admin";
                }

        setUserInfo(response.data.data.user.uid, response.data.data.user.email, response.data.data.user.phone, response.data.data.user.admin)
        

      return { success: true, user };
    } else {
      return { success: false, error: "Authentication failed" };
    }
  } catch (error) {
    console.error("Error during login:", error);
    return { success: false, error: "An error occurred" };
  }
};

export const isAuthenticated = () => {
  const accessToken = localStorage.getItem("access_token");
  if(accessToken) {
    return true
  }
  else {
    return false
  }
};

export const logoutUser = () => {
  removeAuthToken();
};
