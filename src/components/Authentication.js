import React from 'react';
import { connect } from 'react-redux';
import { register, login } from '../redux/actions';
import styled from 'styled-components';

class Authentication extends React.Component {
  // Both Login and Register functionality
  state = {
    name: '',
    title: '',
    username: '',
    password: '',
    email: '',
    role_id: '',
    loc_id: '',
    error: null,
    registering: false,
  };
  componentDidUpdate(prevProps) {
    if (this.props.user !== null) this.props.history.push('/');
  }
  handleChange = e => {
    this.setState({ [e.target.name]: e.target.value, error: null });
  };
  handleRegister = e => {
    e.preventDefault();
    const [name, title, username, password, email, role_id, loc_id] = [
      this.state.name,
      this.state.title,
      this.state.username,
      this.state.password,
      this.state.email,
      this.state.role_id,
      this.state.loc_id,
    ];
    if (!name || !title || !username || !password || !email || !role_id)
      return this.setState({
        error:
          'User must provide name, title, username, password, email, and role_id.',
      });
    const user = {
      name,
      title,
      username,
      password,
      email,
      role_id: Number(role_id),
      loc_id: loc_id ? Number(loc_id) : null,
    };
    this.props.register(user);
    this.setState({
      name: '',
      title: '',
      username: '',
      password: '',
      email: '',
      role_id: '',
      loc_id: '',
    });
  };
  handleLogin = e => {
    e.preventDefault();
    const [username, password] = [this.state.username, this.state.password];
    if (!username || !password)
      return this.setState({
        error: 'Please provide both a username and a password.',
      });
    const user = { username, password };
    this.props.login(user);
    this.setState({ username: '', password: '' });
  };
  handleTransition = e => {
    this.setState(prevState => {
      return {
        name: '',
        title: '',
        username: '',
        password: '',
        role_id: '',
        loc_id: '',
        registering: !prevState.registering,
      };
    });
  };
  render() {
    return this.state.registering ? (
      <>
        <form onSubmit={this.handleRegister}>
          <input
            type="text"
            placeholder="Full Name"
            name="name"
            onChange={this.handleChange}
            value={this.state.name}
          />
          <input
            type="text"
            placeholder="Title"
            name="title"
            onChange={this.handleChange}
            value={this.state.title}
          />
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
          <input
            type="email"
            placeholder="Email"
            name="email"
            onChange={this.handleChange}
            value={this.state.email}
          />
          <input
            type="number"
            placeholder="Role ID"
            name="role_id"
            onChange={this.handleChange}
            value={this.state.role_id}
          />
          <input
            type="number"
            placeholder="Location ID"
            name="loc_id"
            onChange={this.handleChange}
            value={this.state.loc_id}
          />
          <button>Submit</button>
        </form>
        <button onClick={this.handleTransition}>Login</button>
      </>
    ) : (
      <>
        <form onSubmit={this.handleLogin}>
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
        <button onClick={this.handleTransition}>Register</button>
      </>
    );
  }
}

const mapStateToProps = state => {
  return {
    user: state.user,
  };
};

export default connect(
  mapStateToProps,
  { register, login }
)(Authentication);