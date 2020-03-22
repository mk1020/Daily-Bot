import React, { useState, useContext } from 'react';
import { API, graphqlOperation } from 'aws-amplify';
//import { createPost } from './graphql/mutations';
//import { getPost } from './graphql/queries';
import SignIn from './components/SignIn/SignIn';
import SignUp from './components/SignUp/SignUp';
import ForgotPass from './components/ForgotPass/ForgotPass';
import { Route } from 'react-router-dom';
import styles from './App.module.css';
import { connect } from 'react-redux';
import { signInUser, signUpUser, forgotPassword } from './api/aws-cognito';
import { PrivateRoute } from './components/PrivateRoute';
import { Home } from './components/home/home';
import AuthComponent from './components/Auth';
import Dashboard from './components/Dashboard/Dashboard';
import { AuthContext } from './components/Auth';
import img_loading from './img/loading.svg';
import { Switch } from '@material-ui/core';

const App = () => {
	const [title, setTitle] = useState('');
	const [registrSuccessful, setRegistrSuccessful] = useState(false);
	const { isRequest } = useContext(AuthContext);

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
debugger
	return (
		<div className="App">
			<AuthComponent>
				{isRequest ? (
					<img className={styles.img_loading} src={img_loading} alt="img-women" />
				) : (
					<Switch>
						<Route exact path="/signin" render={() => <SignIn />} />
						<Route exact path="/signup" render={() => <SignUp />} />
						<PrivateRoute exact path="/" component={Dashboard} />
						<PrivateRoute exact path="/signin" component={Dashboard} />
						<Route path="/forgotpassword" render={() => <ForgotPass />} />
					</Switch>
				)}
			</AuthComponent>
		</div>
	);
};

export default connect(state => ({}))(App);
