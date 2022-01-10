import axiosInstance from "../../interceptor/axiosInstance";
import { deserialize } from "serializr";
import { User } from "../../models/user.model";
import { store } from "../../store";
import { AUTHENTICATED } from "../../store/definitions/authConstants";
import Notification from "../../shared/components/Notification";
import { NotificationTypes } from "../../enums/notificationTypes";
import { useState } from "react";
import { useHistory } from "react-router";
import { HOME } from "../../routes/routeConstants/appRoutes";
import { ApiRoutes } from "../../routes/routeConstants/apiRoutes";

const UserService = () => {
	const history = useHistory();

	const [user, setUser] = useState<User>();

	const [error, setError] = useState<Error>();

	const [loading, setLoading] = useState(false);

	const loginUser = (data: User) => {
		setLoading(true);
		return axiosInstance
			.post(ApiRoutes.USER_LOGIN, data)
			.then((response) => {
				const userDetails = deserialize(User, response.data["user"]);
				store.dispatch({
					type: AUTHENTICATED,
					payload: {
						authenticated: true,
						user: userDetails,
					},
				});
				Notification({
					message: "Login",
					description: "Logged in successfully",
					type: NotificationTypes.SUCCESS,
				});
				setUser(userDetails);
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
		user,
		error,
		loading,
		loginUser,
	};
};

export default UserService;
