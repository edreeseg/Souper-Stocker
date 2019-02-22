import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Route } from 'react-router-dom';
import {
  Nav,
  Home,
  Authentication,
  AddItem,
  Locations,
  Error,
} from './components';

class App extends Component {
  render() {
    return (
      <>
        {this.props.error ? <Route path="/" component={Error} /> : null}
        <Route path="/" component={Nav} />
        <Route exact path="/" render={props => <Home {...props} />} />
        <Route path="/auth" render={props => <Authentication {...props} />} />
        <Route path="/volunteer" component={Locations} />
        <Route path="/add-item" component={AddItem} />
      </>
    );
  }
}

const mapStateToProps = state => {
  return {
    error: state.error,
  };
};

export default connect(
  mapStateToProps,
  null,
  null,
  { pure: false }
)(App);
