import axiosInstance from "../../interceptor/axiosInstance";
import { deserialize } from "serializr";
import { User } from "../../models/user.model";
import {
  setAuthToken,
  removeAuthToken,
  setUserInfo,
  IS_ADMIN,
} from "./authToken";
import { ApiRoutes } from "../../routes/routeConstants/apiRoutes";
import { notification } from "antd";
import '../../views/Auth/LoginForm/LoginForm.scss'
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

      setUserInfo(
        response.data.data.user.uid,
        response.data.data.user.email,
        response.data.data.user.phone,
        response.data.data.user.admin
      );

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
  if (accessToken) {
    return true;
  } else {
    return false;
  }
};

export const logoutUser = () => {
  removeAuthToken();
  notification.success({
    message: "Logout Successful",
    description: "Visit again !",
    className: "custom-notification-placement",
  });

  setTimeout(() => {
    notification.destroy(); 
  }, 3000);
};
