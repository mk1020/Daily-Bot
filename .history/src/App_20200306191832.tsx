import React, { useState } from 'react';
import { useQuery, getNames, AmplifyProvider } from 'aws-amplify-react-hooks';
import Amplify from '@aws-amplify/core';
import awsconfig from './aws-exports';
import API, { graphqlOperation } from '@aws-amplify/api';
import { createPost } from './graphql/mutations';
import logo from './logo.svg';
import './App.css';


const App = async () => {
await Amplify.configure(awsconfig);

  const [title, setTitle] = useState('');

  const addTitle = async () => {
    await API.graphql(
      graphqlOperation(createPost, { input: { title: title } })
    );
    setTitle('');
  };
  return (
    <div className="App">
      <input
        type="text"
        value={title}
        onChange={e => setTitle(e.target.value)}
      />
      <button onClick={addTitle}>Add Title in Base</button>
    </div>
  );
};

export default App;
