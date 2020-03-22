import React, { useState, useEffect } from 'react';
import { Auth } from 'aws-amplify';
import { rejects } from 'assert';
import { resolve } from 'url';

type CredentialsSignIn = {
	email: string | undefined;
	pass: string | undefined;
};

type CredentialsSignUp = {
	email: string;
	name: string;
	pass: string;
};
interface IAuthContext {
	isAuthenticated: boolean | undefined;
	signIn: (credentialsSignIn: CredentialsSignIn) => any | undefined;
	signOut: () => Promise<void> | undefined;
	signUp: (credentialsSignUp: CredentialsSignUp) => Promise<void> | undefined;
}
const initialAuthContext = {
	isAuthenticated: undefined,
	signIn: () => undefined,
	signOut: () => undefined,
	signUp: () => undefined,
};
export const AuthContext = React.createContext<IAuthContext>(
	initialAuthContext
);

const AuthComponent = ({ children }) => {
	const [isAuthenticated, setIsAuthenticated] = useState(false);
	const [errSignIn, setErrSignIn] = useState('');
	const [errSignOut, setErrSignOut] = useState('');
	const [errSignUp, setErrSignUp] = useState('');

	const checkAuth = () => {
		Auth.currentAuthenticatedUser().then(
			res => setIsAuthenticated(true),
			err => setIsAuthenticated(false)
		);
	};

	useEffect(() => {
		checkAuth();
	}, []);
	const signIn = async ({ email, pass }) =>
		await Auth.signIn(email, pass).then(
			(data) => {setIsAuthenticated(true); debugger},
			err => {
				setIsAuthenticated(false);
				setErrSignIn(err.message);
				return(err)
			}
		);
debugger
	const signOut = () =>
		Auth.signOut().then(
			() => setIsAuthenticated(false),
			err => setErrSignOut(err.message)
		);

	const signUp = credentials =>
		Auth.signUp(credentials).then(
			() => setIsAuthenticated(true),
			(err) => {
				setIsAuthenticated(false);
				setErrSignUp(err.message);
			}
		);
	return (
		<AuthContext.Provider value={{ isAuthenticated, signIn, signOut, signUp }}>
			{children}
		</AuthContext.Provider>
	);
};
export default AuthComponent;
