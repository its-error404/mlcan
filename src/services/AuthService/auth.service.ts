import axiosInstance from "../../interceptor/axiosInstance";
import { deserialize } from "serializr";
import { User } from "../../models/user.model";
import Notification from "../../shared/components/Notification";
import { NotificationTypes } from "../../enums/notificationTypes";
import { useState } from "react";
import { useHistory } from "react-router";
import { HOME } from "../../routes/routeConstants/appRoutes";
import { ApiRoutes } from "../../routes/routeConstants/apiRoutes";
import { AuthContext } from "../../context/AuthContext";

const UserService = () => {
	const history = useHistory();

	const [error, setError] = useState<Error>();

	const [loading, setLoading] = useState(false);

	const { setAuthenticated } = AuthContext();

	const loginUser = (data: User) => {
		setLoading(true);
		return axiosInstance
			.post(ApiRoutes.USER_LOGIN, data)
			.then((response) => {
				const user = deserialize(User, response.data["user"]);
				Notification({
					message: "Login",
					description: "Logged in successfully",
					type: NotificationTypes.SUCCESS,
				});
				setAuthenticated(user);
				history.push(HOME);
			})
			.catch((error) => {
				Notification({
					message: "Login failed",
					description: "incorrect email or password",
					type: NotificationTypes.ERROR,
				});
				setError(error);
			})
			.finally(() => {
				setLoading(false);
			});
	};

	return {
		error,
		loading,
		loginUser,
	};
};

export default UserService;
