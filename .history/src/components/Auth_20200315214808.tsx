import React, { useState, useEffect } from 'react';
import { Auth } from 'aws-amplify';

interface IAuthContext {
	isAuthenticated: boolean | undefined;
	signIn: ()=> Promise<void>;
	signOut: ()=> Promise<void>;
	signUp: ()=> Promise<void>;
}

export const AuthContext = React.createContext<IAuthContext | {}>({});

const AuthComponent = ({ children }) => {
	const [isAuthenticated, setIsAuthenticated] = useState(false);

	const checkAuth =  () => {
		 Auth.currentAuthenticatedUser().then(
			res => setIsAuthenticated(true),
			err => setIsAuthenticated(false)
		);
	};

	useEffect(() => {
		checkAuth();
	}, []);
	const signIn = ({ username, pass }) =>
		Auth.signIn(username, pass).then(
			() => setIsAuthenticated(true),
			() => setIsAuthenticated(false)
		);
	const signOut = () => 
		Auth.signOut().then(
			() => setIsAuthenticated(false),
			err => alert(err)
		);
	;
	const signUp = credentials => 
		Auth.signUp(credentials).then(
			() => setIsAuthenticated(true),
			() => setIsAuthenticated(false)
		);
	;
	return (<AuthContext.Provider value={{isAuthenticated, signIn, signOut, signUp}}>
		{children}
	</AuthContext.Provider>)
};
export default AuthComponent;
