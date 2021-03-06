import React, { useState } from 'react';
import { API, graphqlOperation } from 'aws-amplify';
import { createPost } from './graphql/mutations';
import { getPost } from './graphql/queries';
import SignIn from './components/SignIn';
import SignUp from './components/SignUp';
import { Route } from 'react-router-dom';
import './App.css';
import {
	CognitoUserPool,
	CognitoUserAttribute,
	CognitoUser,
} from 'amazon-cognito-identity-js';

const poolData = {
	UserPoolId: 'eu-central-1_7VyHQApew',
	ClientId: '98bao7og9b858tmq9d22t2550'
};

let attributeList = [];
const email = {
	Name: "email",
	Value: "email3@mymail.com",
}

const name = {
	Name: "name",
	Value: "Mike1",
}

attributeList.push(new CognitoUserAttribute(email));
attributeList.push(new CognitoUserAttribute(name));


const userPool = new CognitoUserPool(poolData);
userPool.signUp(email.Value, 'Nnl12345678', attributeList, null, (err, result)=>{
	 if (err) console.log(err); else console.log(result)
	
	});

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
			<Route path="/signup" render={() => <SignUp />} />
		</div>
	);
};

export default App;
