import React, { useContext, useState } from 'react';
import { Redirect, Route } from 'react-router-dom';
import { AuthContext } from './Auth';
import { Auth } from 'aws-amplify';

type privateRouteProps = {
	path: string;
	exact: boolean;
	component: (props: any) => JSX.Element;
};

const isAuthenticated = () => {
	const isAuthenticated: Number = document.cookie.indexOf('accessToken');
	return isAuthenticated == -1 ? false : true;
};

export const PrivateRoute = ({
	component: Component,
	...rest
}: privateRouteProps): JSX.Element => {
	return (
		<Route
			{...rest}
			render={(props: any) =>
				isAuthenticated() ? <Component {...props} /> : <Redirect to="/signin" />
			}
		/>
	);
};
