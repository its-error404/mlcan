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

const UserService = () => {
  const navigate = useNavigate();
  const [error, setError] = useState<Error | undefined>();
  const [loading, setLoading] = useState<boolean>(false);
  const { setAuthenticated } = AuthContext();

  const loginUser = async (data: User) => {
    
      setLoading(true);
     return axiosInstance
	 .post(ApiRoutes.USER_LOGIN, data)
	 .then((response) => {
		const user = deserialize(User, response.data["user"])
		setAuthToken(response.data.data.tokens.access_token)
		setAuthenticated(user);
		return true;
	 })
     
     .catch ((error) => {
	  	setError(error);
      	return false;
    })
  };

  const logoutUser = () =>{
	removeAuthToken()
  }

  const handleLogin = async (data: User) => {
    const success = await loginUser(data);
    if (success) {
      Notification({
        message: "Login",
        description: "Logged in successfully",
        type: NotificationTypes.SUCCESS,
      });
      navigate(AppRoutes.CONTAINERS);
    } else {
      Notification({
        message: "Login failed",
        description: "incorrect email or password",
        type: NotificationTypes.ERROR,
      });
    }
  };

  return {
    error,
    loading,
    handleLogin,
	logoutUser
  };
};

export default UserService;
