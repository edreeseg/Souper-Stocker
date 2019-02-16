import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import { Nav, Home, Register, Login, AddInventory } from './components';

class App extends Component {
  render() {
    return (
      <>
        <Nav />
        <Route exact path="/" component={Home} />
        <Route path="/register" component={Register} />
        <Route path="/login" component={Login} />
        <Route path="/add" component={AddInventory} />
      </>
    );
  }
}

export default App;
