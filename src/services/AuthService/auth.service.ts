import axiosInstance from "../../interceptor/axiosInstance";
import { deserialize } from "serializr";
import { User } from "../../models/user.model";
import Notification from "../../shared/components/Notification";
import { NotificationTypes } from "../../enums/notificationTypes";
import { useState } from "react";
import { ApiRoutes } from "../../routes/routeConstants/apiRoutes";
import { AuthContext } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { AppRoutes } from "../../routes/routeConstants/appRoutes";
import { setAuthToken, removeAuthToken } from "./authToken";
import { UserService } from "./UserServiceTypes";

const useUserService = (): UserService => {
  const navigate = useNavigate();
  const [error, setError] = useState<Error | undefined>();
  const [loading, setLoading] = useState<boolean>(false);
  const { setAuthenticated } = AuthContext();

  const loginUser = async (data: User) => {
    setLoading(true);
    try {
      const response = await axiosInstance.post(ApiRoutes.USER_LOGIN, data);
  
      if (response.status === 200 && response.data && response.data.success) {
        const user = deserialize(User, response.data["user"]);
        if (data.email === 'root.user@user.com' && data.password === 'URoot%78') {
          setAuthToken(response.data.data.tokens.access_token);
          setAuthenticated(user);
          console.log(response)
          console.log("Authentication successful");
          return true;
        } else {
          console.log("Authentication failed");
          return false;
        }
      } else {
        console.log("Authentication failed - Server response not successful");
        return false;
      }
    } catch (error) {
      console.error("Error during login:", error);
      // setError(error);
      return false;
    }
  };
  
  const handleLogin = async (data: User) => {
    const success = await loginUser(data);
    return success;
  };

  const performLogin = async (data: User) => {
    const success = await handleLogin(data);
    if (success) {
      navigate(AppRoutes.CONTAINERS);
    }
    return success;
  };

  return {
    error,
    loading,
    performLogin,
  };
};

export default useUserService