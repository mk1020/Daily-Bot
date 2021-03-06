import React from 'react';
import { Redirect, Route } from 'react-router-dom';
import { userPool } from '../api/aws-cognito';
import { CognitoUser } from 'amazon-cognito-identity-js';

type userData = {
	Username: string;
	Pool: any;
};


export const PrivateRoute = ({ component: Component, ...rest }) => {
	const userData: userData = {
		Username: rest.email,
		Pool: userPool,
	};
	const cognitoUser = new CognitoUser(userData);

	<Route
		{...rest}
		render={(props:any) => {
			cognitoUser.getUserData(function(err, userData) {
				if (err) {
					alert(err.message || JSON.stringify(err));
					return <Redirect to={}/>;
				}
				console.log('User data for user ' + userData);
			});
		}}
	/>;
};
