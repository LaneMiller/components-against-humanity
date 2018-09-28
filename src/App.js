import React, { Component } from 'react';
import Main from './containers/Main'
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App" style={{height: `${window.innerHeight}px`}}>
        <Main />
      </div>
    );
  }
}

export default App;
