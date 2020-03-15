import React from 'react';
import { Redirect, Route } from 'react-router-dom';
import { CognitoUser, CognitoUserPool } from 'amazon-cognito-identity-js';
import { Auth } from 'aws-amplify'
import { type } from 'os';

const checkUser = async () => {
	await Auth.currentAuthenticatedUser().then(res=>{debugger}, (err)=>{debugger})

  }
type component = {
	exact: boolean;
	path: string;
	component: (props: any)=> Element;
	email: string;
}
export const PrivateRoute = ({ component: Component, ...rest }) => {
  checkUser();

	return (
		<Route
			{...rest}
			render={async(props: any) => {
				await Auth.currentAuthenticatedUser().then(res=>{
					return <Component {...props}/>
				}, (err)=>{
					return <Redirect to="/signin"/>
				})

			}}
		/>
	);
};
