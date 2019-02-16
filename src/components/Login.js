import React from 'react';
import { connect } from 'react-redux';

import { login } from '../redux/actions';

class Login extends React.Component {
  state = {
    username: '',
    password: '',
    error: null,
  };
  handleChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };
  handleSubmit = e => {
    e.preventDefault();
    const [username, password] = [this.state.username, this.state.password];
    if (!username || !password)
      return this.setState({
        error: 'Please enter both a username and password.',
      });
    this.props.login({ username, password });
  };
  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <input
          type="text"
          placeholder="Username"
          name="username"
          onChange={this.handleChange}
          value={this.state.username}
        />
        <input
          type="password"
          placeholder="Password"
          name="password"
          onChange={this.handleChange}
          value={this.state.password}
        />
        <button>Login</button>
      </form>
    );
  }
}

const mapStateToProps = state => {
  return {};
};

export default connect(
  mapStateToProps,
  { login }
)(Login);
