import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import { Nav, Home, Authentication, AddItem, Locations } from './components';

class App extends Component {
  render() {
    return (
      <>
        <Route path="/" component={Nav} />
        <Route exact path="/" render={props => <Home {...props} />} />
        <Route path="/auth" render={props => <Authentication {...props} />} />
        <Route path="/volunteer" component={Locations} />
        <Route path="/add-item" component={AddItem} />
      </>
    );
  }
}

export default App;
