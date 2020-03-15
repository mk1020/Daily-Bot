import React from 'react';
import { Redirect, Route } from 'react-router-dom';
import { userPool } from '../api/aws-cognito';
import { CognitoUser } from 'amazon-cognito-identity-js';

type userData = {
	Username: string;
	Pool: any;
};

const cognitoUser = new CognitoUser(userData);

export const PrivateRoute = ({ component: Component, ...rest }) => {
	const userData: userData = {
		Username: rest.email,
		Pool: userPool,
	};
	<Route
		{...rest}
		render={props => {
			cognitoUser.getUserData(function(err, userData) {
				if (err) {
					alert(err.message || JSON.stringify(err));
					return;
				}
				console.log('User data for user ' + userData);
			});
		}}
	/>;
};
