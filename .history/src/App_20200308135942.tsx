import React, { useState } from 'react';
import { useQuery, getNames, AmplifyProvider } from 'aws-amplify-react-hooks';
import { API, graphqlOperation } from 'aws-amplify';
import { createPost } from './graphql/mutations';
import { getPost } from './graphql/queries';

import './App.css';

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
			<input type="text" value={title} onChange={e => setTitle(e.target.value)} />
			<button onClick={getPosts}>Get All Posts</button>
			<button onClick={addTitle}>Add Title in Base</button>
		</div>
	);
};

export default App;
