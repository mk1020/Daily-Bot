import React from 'react';
import {useQuery, getNames, AmplifyProvider} from 'aws-amplify-react-hooks';
import {API, graphqlOperation} from 'aws-amplify';

import logo from './logo.svg';
import './App.css';

const client = {API, graphqlOperation};

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>d</p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
