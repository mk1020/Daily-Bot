import React, {useContext} from 'react';
import { Redirect, Route } from 'react-router-dom';
import { AuthContext } from './Auth';


type component = {
	path: string;
	component: (props: any) => any;
};

export const PrivateRoute = async ({
	component: Component,
	...rest
}) => {
	const {isAuthenticated}  = useContext(AuthContext);
    
	return (
		<Route
			{...rest}
			render={(props: any) => 
				isAuthenticated ? <Component {...props} /> : <Redirect to="/signin" />
			}
		/>
	);
};
