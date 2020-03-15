import React, { useState, useEffect } from 'react';
import { Auth } from 'aws-amplify';

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
	signIn: (credentialsSignIn: CredentialsSignIn) => Promise<void> | undefined;
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

	const checkAuth = () => {
		Auth.currentAuthenticatedUser().then(
			res => setIsAuthenticated(true),
			err => setIsAuthenticated(false)
		);
	};

	useEffect(() => {
		checkAuth();
	}, []);
	const signIn = ({ email, pass }) =>
		Auth.signIn(email, pass).then(
			() => {setIsAuthenticated(true);debugger },
			() => setIsAuthenticated(false)
		);
	const signOut = () =>
		Auth.signOut().then(
			() => setIsAuthenticated(false),
			err => alert(err)
		);

	const signUp = credentials =>
		Auth.signUp(credentials).then(
			() => setIsAuthenticated(true),
			() => setIsAuthenticated(false)
		);
	return (
		<AuthContext.Provider value={{ isAuthenticated, signIn, signOut, signUp }}>
			{children}
		</AuthContext.Provider>
	);
};
export default AuthComponent;
