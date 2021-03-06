import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Authentication from './Authentication';

class App extends Component {
  render() {
    return (
      <div className="App">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h2>Welcome to Login App</h2>
        </div>
        <Authentication />
      </div>
    );
  }
}

export default App;
