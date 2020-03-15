import React, { useContext } from 'react';
import { Redirect, Route } from 'react-router-dom';
import { AuthContext } from './Auth';

type prsivate = {
	path: string
    component: (props: any)=> JSX.Element;
}

export const PrivateRoute = async ({ component: Component, ...rest }: prsivate): JSX.Element => {
	const { isAuthenticated } = useContext(AuthContext);

	return (
		<Route
			{...rest}
			render={(props: any) =>
				isAuthenticated ? <Component {...props} /> : <Redirect to="/signin" />
			}
		/>
	);
};
