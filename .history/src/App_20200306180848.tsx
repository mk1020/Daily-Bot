import React from 'react';
import {useQuery, getNames, AmplifyProvider} from 'aws-amplify-react-hooks';
import Amplify from 'aws-amplify';
import awsmobile from './aws-exports

import logo from './logo.svg';
import './App.css';

Amplify.configure(awsmobile);

const App = () => {
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
};

export default App;
