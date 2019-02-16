import React from 'react';
import { connect } from 'react-redux';
import { register } from '../redux/actions';
import styled from 'styled-components';

class Register extends React.Component {
  state = {
    name: '',
    title: '',
    username: '',
    password: '',
    role_id: '',
    loc_id: '',
    error: null,
  };
  handleChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };
  handleSubmit = e => {
    e.preventDefault();
    const [name, title, username, password, role_id, loc_id] = [
      this.state.name,
      this.state.title,
      this.state.username,
      this.state.password,
      this.state.role_id,
      this.state.loc_id,
    ];
    if (!name || !title || !username || !password || !role_id)
      return this.setState({
        error:
          'User must provide name, title, username, password, and role_id.',
      });
    const user = {
      name,
      title,
      username,
      password,
      role_id: role_id ? Number(role_id) : null,
      loc_id: loc_id ? Number(loc_id) : null,
    };
    this.props.register(user);
    this.setState({
      name: '',
      title: '',
      username: '',
      password: '',
      role_id: '',
      loc_id: '',
    });
  };
  render() {
    return (
      <section>
        <form onSubmit={this.handleSubmit}>
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
      </section>
    );
  }
}

const mapStateToProps = state => {
  return {};
};

export default connect(
  mapStateToProps,
  { register }
)(Register);
