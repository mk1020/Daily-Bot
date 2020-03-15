import React from 'react';
import { Redirect, Route } from 'react-router-dom';
import { CognitoUser, CognitoUserPool } from 'amazon-cognito-identity-js';
import { Auth } from 'aws-amplify';
import { type } from 'os';

const checkUser = async () => {
	await Auth.currentAuthenticatedUser().then(
		res => {
			debugger;
		},
		err => {
			debugger;
		}
	);
};
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
	let mark;
	await Auth.currentAuthenticatedUser().then(
		res => {
			mark = true;
		},
		err => {
			mark = false;
		}
	);
	return (
		<Route
			{...rest}
			render={(props: any) => 
				mark ? <Component {...props} /> : <Redirect to="/signin" />;
			}
		/>
	);
};
