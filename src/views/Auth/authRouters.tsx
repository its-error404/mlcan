import React, { FC } from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import RegisterForm from "../../views/Auth/RegisterForm";
import LoginForm from "../../views/Auth/LoginForm";
import { RouterProps } from "../../shared/types/route.type";
import * as AppRoutes from "../../routes/routeConstants/appRoutes";

const authRouter = () => {
	const routes: RouterProps[] = [
		{ exact: true, path: AppRoutes.REGISTER, component: RegisterForm },
		{ exact: true, path: AppRoutes.LOGIN, component: LoginForm },
	];

	return (
		<Switch>
			{routes.map(({ component, ...routerProps }) => (
				<Route {...routerProps} component={component as FC} />
			))}
			<Redirect exact strict from={AppRoutes.AUTH} to={AppRoutes.LOGIN} />
		</Switch>
	);
};

export default authRouter;
