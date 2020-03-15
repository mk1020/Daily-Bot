import React from 'react';
import { Redirect, Route } from 'react-router-dom';
import { CognitoUser, CognitoUserPool } from 'amazon-cognito-identity-js';
import { Auth } from 'aws-amplify'

const checkUser = async () => {
	await Auth.currentAuthenticatedUser().then(res=>{debugger}, (err)=>{debugger})

  }

export const PrivateRoute = ({ Component: Component, ...rest }) => {
  checkUser();

	return (
		<Route
			{...rest}
			render={(props: any) => {
				await Auth.currentAuthenticatedUser().then(res=>{debugger}, (err)=>{debugger})

			}}
		/>
	);
};
