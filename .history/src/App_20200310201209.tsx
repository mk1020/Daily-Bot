import React, { useState } from 'react';
import { API, graphqlOperation } from 'aws-amplify';
import { createPost } from './graphql/mutations';
import { getPost } from './graphql/queries';
import SignIn from './components/SignIn/SignIn';
import SignUp from './components/SignUp/SignUp';
import { Route } from 'react-router-dom';
import './App.module.css';
import { signInUser, signUpUser, forgotPassword } from './api/aws-cognito';

/*  signUpUser("covboi555@mail.ru", 'Mike', "Mm123456").then((success)=> {
	console.log("seccess registration", success);
	
}) */

signInUser("covboi555@mail.ru", "1234567890lk").then((success)=>{
	console.log("seccess login", success);
})


/* forgotPassword('covboi555@mail.ru').then(
	success => {
		debugger;
		console.log('forgor succes', success);
	},
	err => {
		console.log('err', err);
		debugger;
	}
); */
debugger;
const App = () => {
	const [title, setTitle] = useState('');

	const addTitle = async () => {
		await API.graphql(
			graphqlOperation(createPost, { input: { id: 2, title: title } })
		);
		setTitle('');
	};

	const getPosts = async () => {
		const allPosts = await API.graphql(graphqlOperation(getPost, { id: 2 }));
		console.log('all posts', allPosts);
		debugger;
	};
	return (
		<div className="App">
			<Route exact path="/" render={() => <SignIn />} />
			<Route exact path="/signup" render={() => <SignUp />} />
		</div>
	);
};

export default App;
