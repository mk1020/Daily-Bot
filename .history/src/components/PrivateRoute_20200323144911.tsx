import React, { useContext, useState } from 'react';
import { Redirect, Route } from 'react-router-dom';
import { AuthContext } from './Auth';
import { Auth } from 'aws-amplify';

type privateRouteProps = {
	path: string
	exact: boolean
    component: (props: any)=> JSX.Element;
}

const checkAuth = async () => {
	await Auth.currentAuthenticatedUser().then(
		res => {
			setIsAuthenticated(true);				
		},
		err => setIsAuthenticated(false)
	);
};
export const PrivateRoute =  ({ component: Component, ...rest }: privateRouteProps): JSX.Element => {
const []
	debugger
	return (
		<Route
			{...rest}
			render={(props: any) =>
				isAuthenticated ? <Component {...props} /> : <Redirect to="/signin" />
			}
		/>
	);
};
