import axiosInstance from "../../interceptor/axiosInstance";
import { deserialize } from "serializr";
import { User } from "../../models/user.model";
import { setAuthToken, removeAuthToken } from "./authToken";
import { ApiRoutes } from "../../routes/routeConstants/apiRoutes";
import { Navigate, useNavigate } from "react-router-dom";



export const loginUser = async (email: string, password: string) => {
  try {

    const response = await axiosInstance.post(ApiRoutes.USER_LOGIN, {
      email,
      password,
    });

    if (response.status === 200 && response.data && response.data.success && email === "root.user@user.com" && password === "URoot%78") {

      const user = deserialize(User, response.data.data.user);

      if (response.data.data.tokens.access_token)

        setAuthToken(response.data.data.tokens.access_token);

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
