import React, { useContext } from 'react';
import { Redirect, Route } from 'react-router-dom';
import { AuthContext } from './Auth';
import { useLocation, useHistory } from 'react-router-dom';

type privateRouteProps = {
	path: string
	exact: boolean
    component: (props: any)=> JSX.Element;
}

export const PrivateRoute =  ({ component: Component, ...rest }: privateRouteProps): JSX.Element => {
	const { isAuthenticated } = useContext(AuthContext);
	let history = useHistory();

   // if (rest.path =='/signin' && isAuthenticated == true) {history.push('/'); rest.path='/'}
	return (
		<Route
			{...rest}
			render={(props: any) =>
				isAuthenticated ? <Component {...props} /> : <Redirect to="/signin" />
			}
		/>
	);
};
