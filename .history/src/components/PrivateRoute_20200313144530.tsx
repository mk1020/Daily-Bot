import React from 'react';
import { Redirect, Route } from 'react-router-dom';
import { CognitoUser, CognitoUserPool } from 'amazon-cognito-identity-js';
type userData = {
	Username: string;
	Pool: any;
};
type poolData = {
	UserPoolId: string;
	ClientId: string;
};
const UserPoolId = 'eu-central-1_7VyHQApew';

const poolData: poolData = {
	UserPoolId: UserPoolId,
	ClientId: '2sqov0b8nuk4mhtfjoackulf0n',
};
export const userPool = new CognitoUserPool(poolData);

export const PrivateRoute = ({ component: Component, ...rest }) => {
	const userData: userData = {
		Username: rest.email,
		Pool: userPool,
	};
	const cognitoUser = new CognitoUser(userData);
	debugger
	return (
		<Route
			{...rest}
			render={(props: any) => {

				cognitoUser.getUserData(function(err, userData) {
					debugger
					if (err) {
						return <Redirect to="/signin" />;
					}
					debugger
					return <Component {...props} />;
				});
			}}
		/>
	);
};
