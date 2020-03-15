import React, { useContext } from 'react';
import { Redirect, Route } from 'react-router-dom';
import { AuthContext } from './Auth';

type privateRouteProps = {
	path: string
    component: (props: any)=> JSX.Element;
}

export const PrivateRoute =  ({ component: Component, ...rest }: privateRouteProps): JSX.Element => {
	const { isAuthenticated } = useContext(AuthContext);
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
