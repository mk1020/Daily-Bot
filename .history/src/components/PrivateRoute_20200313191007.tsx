import React from 'react';
import { Redirect, Route } from 'react-router-dom';
import { CognitoUser, CognitoUserPool } from 'amazon-cognito-identity-js';
import { Auth } from 'aws-amplify'

const checkUser = async () => {
	await console.log(Auth.currentAuthenticatedUser())
  }

export const PrivateRoute = ({ component: Component, ...rest }) => {
  checkUser();
debugger
	return (
		<Route
			{...rest}
			render={(props: any) => {
				
			}}
		/>
	);
};
