import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import Amplify from 'aws-amplify';
import awsconfig from './aws-exports';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './redux/store';

Amplify.configure({...awsconfig, cookieStorage: {
	// REQUIRED - Cookie domain (only required if cookieStorage is provided)
		domain: 'http://localhost:3000',
	// OPTIONAL - Cookie path
		path: '/',
	// OPTIONAL - Cookie expiration in days
		expires: 365,
	// OPTIONAL - Cookie secure flag
	// Either true or false, indicating if the cookie transmission requires a secure protocol (https).
		secure: true
	} });

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
