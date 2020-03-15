import React, { useState, useEffect } from 'react';
import { Auth } from 'aws-amplify';

export const AuthContext = React.createContext({});

const Auth = ({ children }) => {
	const [isAuthenticated, setIsAuthenticated] = useState(false);

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

	useEffect(() => {}, []);
};
