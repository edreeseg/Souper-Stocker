import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import { Nav, Home } from './components';

class App extends Component {
  render() {
    return (
      <>
        <Nav />
        <Route path="/" component={Home} />
      </>
    );
  }
}

export default App;
