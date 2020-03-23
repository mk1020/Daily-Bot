import React, { useContext, useState } from 'react';
import { Redirect, Route } from 'react-router-dom';
import { AuthContext } from './Auth';
import { Auth } from 'aws-amplify';

type privateRouteProps = {
	path: string
	exact: boolean
    component: (props: any)=> JSX.Element;
}

function getCookie(name) {
	let matches = document.cookie.match(new RegExp(
	  "(?:^|; )" + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + "=([^;]*)"
	));
	return matches ? decodeURIComponent(matches[1]) : undefined;
  }

export const PrivateRoute =  ({ component: Component, ...rest }: privateRouteProps): JSX.Element => {
const [isAuthenticated, setIsAuthenticated ] =useState(false);


	debugger
	return (
		<Route
			{...rest}
			render={(props: any) =>
				isAuthenticated ? <Component {...props} /> : <Redirect to="/signin" />
			}
		/>
	);
};
