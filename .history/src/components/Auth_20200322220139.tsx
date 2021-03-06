import React, { useState, useEffect } from 'react';
import { Auth } from 'aws-amplify';
import { useLocation, useHistory } from 'react-router-dom';
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
	isRequest: boolean | undefined;
	signIn: (credentialsSignIn: CredentialsSignIn) => Promise<unknown> | undefined;
	signOut: () => Promise<unknown> | undefined;
	signUp: (credentialsSignUp: CredentialsSignUp) => Promise<unknown> | undefined;
}
const initialAuthContext = {
	isAuthenticated: undefined,
	isRequest: undefined,
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
	const [isRequest, setIsRequest] = useState(false);
	let location = useLocation();
	let history = useHistory();
	
	const checkAuth =  () => {
		setIsRequest(true)
		 Auth.currentAuthenticatedUser().then(
			res => {
				setIsAuthenticated(true);
				if (location.pathname=="/signin") history.push('/')
				setIsRequest(false)
			},
			err => {setIsAuthenticated(false); setIsRequest(false)}
		);
	};

	/* useEffect(() => {
		checkAuth();
	}, []); */
	const signIn = async ({ email, pass }) =>
		new Promise(
			async (resolve, reject) =>
				await Auth.signIn(email, pass).then(
					data => {
						setIsAuthenticated(true);
						resolve(data);
					},
					err => {
						setIsAuthenticated(false);
						setErrSignIn(err.message);
						reject(err);
					}
				)
		);

	const signOut = () =>
		new Promise(
			async (resolve, reject) =>
				await Auth.signOut().then(
					data => {
						setIsAuthenticated(false);
						resolve(data);
					},
					err => {
						setErrSignOut(err.message);
						reject(err);
					}
				)
		);

	const signUp = credentials =>
		new Promise(async (resolve, reject) =>
			Auth.signUp(credentials).then(
				data => {
					setIsAuthenticated(true);
					resolve(data);
				},
				err => {
					setIsAuthenticated(false);
					setErrSignUp(err.message);
					reject(err);
				}
			)
		);
	return (
		<AuthContext.Provider value={{ isAuthenticated,isRequest, signIn, signOut, signUp }}>
			{children}
		</AuthContext.Provider>
	);
};
export default AuthComponent;
