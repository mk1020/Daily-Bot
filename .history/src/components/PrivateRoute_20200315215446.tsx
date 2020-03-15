import React, {useContext} from 'react';
import { Redirect, Route } from 'react-router-dom';
import { CognitoUser, CognitoUserPool } from 'amazon-cognito-identity-js';
import { Auth } from 'aws-amplify';
import { AuthContext } from './Auth';


type component = {
	exact: boolean;
	path: string;
	component: (props: any) => any;
	email: string;
};

export const PrivateRoute = async ({
	component: Component,
	...rest
}: component) => {
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
