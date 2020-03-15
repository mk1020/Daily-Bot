import React, { useState, useEffect } from 'react';
import { Auth } from 'aws-amplify';

export const AuthContext = React.createContext({});

const AuthComponent = ({ children }) => {
	const [isAuthenticated, setIsAuthenticated] = useState(false);

	const checkAuth = async () => {
		await Auth.currentAuthenticatedUser().then(
			res => setIsAuthenticated(true),
			err => setIsAuthenticated(false)
		);
	};

	useEffect(() => {}, []);
};
