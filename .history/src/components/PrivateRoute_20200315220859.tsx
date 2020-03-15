import React, { useContext } from 'react';
import { Redirect, Route } from 'react-router-dom';
import { AuthContext } from './Auth';

type prsivate = {
	[x: string]: any;
    component: any;
}
/* 	path: string;
	component: (props: any) => any;
};
 */
export const PrivateRoute = async ({ component: Component, ...rest }: prsivate): Promise<JSX.Element> => {
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
