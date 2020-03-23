import React, { useContext, useState } from 'react';
import { Redirect, Route } from 'react-router-dom';

type privateRouteProps = {
	path: string;
	exact: boolean;
	component: (props: any) => JSX.Element;
	isAuthenticated: boolean;
};



export const PrivateRoute = ({
	component: Component,
	isAuthenticated,
	...rest
}: privateRouteProps): JSX.Element => {
	return (
		<Route
			{...rest}
			render={(props: any) =>
				isAuthenticated ? <Component {...props} /> : <Redirect to="/signin" />
			}
		/>
	);
};
