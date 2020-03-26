import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import Amplify, { Auth } from 'aws-amplify';
import awsconfig from './aws-exports';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './redux/store';

Amplify.configure( {
	API: {
		"aws_appsync_graphqlEndpoint": "https://wamop45pkrguxcgdqainvyv64a.appsync-api.eu-central-1.amazonaws.com/graphql",
		"aws_appsync_region": "eu-central-1",
		"aws_appsync_authenticationType": "AMAZON_COGNITO_USER_POOLS",
	},
	Auth: { 
		identityPoolId: 'eu-central-1:b7ab90c5-47ea-4937-b1b6-7901837d9fed',
		region: 'eu-central-1',
		userPoolId: 'eu-central-1_incRTtdVN',
		userPoolWebClientId: '67a76j43csre1grvptkl8dbi1i',
		cookieStorage: {
			// REQUIRED - Cookie domain (only required if cookieStorage is provided)
			domain: 'localhost',
			// OPTIONAL - Cookie path
			// OPTIONAL - Cookie expiration in days
			expires: 365,
			// OPTIONAL - Cookie secure flag
			// Either true or false, indicating if the cookie transmission requires a secure protocol (https).
			secure: false,
		},
	},
} );

ReactDOM.render(
	<Provider store={store}>
		<BrowserRouter>
			<App />
		</BrowserRouter>
	</Provider>,
	document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
