import React from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';
import { register, login } from '../redux/actions';

const AuthForm = styled.form`
  position: absolute;
  top: 50%;
  height: 50%;
  transform: translateY(-50%);
  margin: 0 auto;
  width: 100%;
  background: rgba(8, 43, 50, 0.9);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  > * {
    margin-bottom: 4px;
  }

  p {
    color: #dfdfdf;
    user-select: none;

    span {
      text-decoration: underline;
      cursor: pointer;
    }
  }
`;

const FormBackground = styled.div`
  position: relative;
  width: 100%;

  img {
    width: 100%;
    user-select: none;
  }
`;

const MidSection = styled.div`
  width: 90%;
  margin: 20px auto;
  display: flex;
  justify-content: space-between;

  div {
    width: 47.5%;
    padding: 40px 0;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    align-items: center;
    text-align: center;

    h2 {
      font-size: 4rem;
      font-weight: 300;
    }
    h3 {
      font-size: 3rem;
      font-weight: 300;
    }
    p {
      font-size: 2.2rem;
      font-weight: 300;
    }
  }

  img {
    width: 47.5%;
    height: auto;
    align-self: center;
  }
`;

const StyledFooter = styled.footer`
  width: 100%;
  height: 150px;
  border-top: 2px solid #222;
  background: #464646;
`;

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
    return (
      <section>
        <FormBackground>
          <img
            src="https://i.imgur.com/cjQP0CZ.jpg"
            alt="cityscape background"
          />
          <AuthForm
            onSubmit={
              this.state.registering ? this.handleRegister : this.handleLogin
            }
          >
            {this.state.registering ? (
              <>
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
                <p>
                  Already have an account with us?{' '}
                  <span onClick={this.handleTransition}>Log in!</span>
                </p>
              </>
            ) : (
              <>
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
                <p>
                  Don't have an account?{' '}
                  <span onClick={this.handleTransition}>Sign up!</span>
                </p>
              </>
            )}
          </AuthForm>
        </FormBackground>
        <MidSection>
          <div>
            <h2>Leap Into the Future</h2>
            <p>A fast and easy interface built on a rock-solid foundation</p>
            <h3>Savour the Moment</h3>
            <p>Save yourself time and hassle</p>
          </div>
          <img src="https://i.imgur.com/CZGn6mL.jpg" alt="fistbump" />
        </MidSection>
        <MidSection>
          <img
            src="https://i.imgur.com/3OEHRqB.jpg"
            alt="wall art - 'Together we create'"
          />
          <div>
            <h2>Be a Part of Something</h2>
            <p>Volunteer your time and brighten someone's day.</p>
            <h3>Flexible and Transparent Scheduling</h3>
            <p>See who needs help and where - no question, no uncertainty.</p>
          </div>
        </MidSection>
        <StyledFooter />
      </section>
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
