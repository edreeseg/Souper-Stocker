import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import { Nav, Home, Authentication, AddInventory } from './components';

class App extends Component {
  render() {
    return (
      <>
        <Nav />
        <Route exact path="/" component={props => <Home {...props} />} />
        <Route path="/auth" render={props => <Authentication {...props} />} />
        <Route path="/add" component={AddInventory} />
      </>
    );
  }
}

export default App;
