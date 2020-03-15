import React, { useState } from 'react';
import { API, graphqlOperation } from 'aws-amplify';
//import { createPost } from './graphql/mutations';
//import { getPost } from './graphql/queries';
import SignIn from './components/SignIn/SignIn';
import SignUp from './components/SignUp/SignUp';
import { Route } from 'react-router-dom';
import './App.module.css';
import { connect } from 'react-redux';
import { signInUser, signUpUser, forgotPassword } from './api/aws-cognito';
import { PrivateRoute } from './components/PrivateRoute';
import { Home } from './components/home/home';
import AuthComponent from './components/Auth';

const App = () => {
	const [title, setTitle] = useState('');

	/* const addTitle = async () => {
		await API.graphql(
			graphqlOperation(createPost, { input: { id: 2, title: title } })
		);
		setTitle('');
	}; */

	/* 	const getPosts = async () => {
		const allPosts = await API.graphql(graphqlOperation(getPost, { id: 2 }));
		console.log('all posts', allPosts);
		debugger;
	}; */
	return (
		<div className="App">
			<AuthComponent>
				<switch>
				<Route exact path="/signin" render={() => <SignIn />} />
				<Route exact path="/signup" render={() => <SignUp />} />
				<PrivateRoute path="/home" component={Home} />
				</switch> {/* зачем нужен switch? */}
			</AuthComponent>
		</div>
	);
};

export default connect(state => ({}))(App);
