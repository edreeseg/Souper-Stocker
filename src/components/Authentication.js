import React from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';
import { register, login } from '../redux/actions';
import Loading from './Loading';

const FormContainer = styled.section`
  position: absolute;
  top: 50%;
  height: 60%;
  transform: translateY(-50%);
  margin: 0 auto;
  width: 100%;
  background: rgba(8, 43, 50, 0.9);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  p {
    color: #dfdfdf;
    user-select: none;

    span {
      text-decoration: underline;
      cursor: pointer;
    }
  }
`;

const AuthForm = styled.form`
  width: 20%;
  display: flex;
  flex-direction: column;
  align-items: center;

  input {
    width: 100%;
  }
  p {
    font-size: 0.65em;
  }
  button {
    background: transparent;
    color: #eee;
    border: 1px solid #eee;
    padding: 5px 15px;
    cursor: pointer;

    &:hover {
      background: #eee;
      color: rgb(8, 43, 50);
    }
  }

  > * {
    margin-bottom: 5px;
  }
  .register-buttons {
    text-align: center;
    width: 125%;
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
      font-weight: 300;
      font-size: 1.6em;
    }
    h3 {
      font-weight: 300;
      font-size: 1.3em;
    }
    p {
      font-size: 1em;
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
  border-top: 2px solid #222;
  background: #464646;
  color: #eee;
  padding: 10px;

  section {
    width: 90%;
    margin: 0 auto;
    display: flex;
    justify-content: space-between;

    div {
      height: 80%;
      display: flex;
      flex-direction: column;
      justify-content: space-around;

      &:first-child {
        width: 60%;
      }
      &:last-child {
        width: 30%;
      }
    }
  }

  h3 {
    margin-bottom: 5px;
    font-size: 1.1em;
  }

  p {
    font-size: 0.7em;
    margin-bottom: 5px;
  }
`;

const Register = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;

  div {
    display: flex;
    flex-direction: column;

    input,
    select {
      margin-bottom: 5px;

      &:last-child {
        margin-bottom: 0;
      }
    }
  }
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
    newsletter: '',
    error: null,
    registering: false,
  };
  componentDidMount() {
    const storedUser = JSON.parse(localStorage.getItem('soupUser'));
    if (storedUser) this.props.history.push('/');
  }
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
        newsletter: '',
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
          <FormContainer>
            <AuthForm
              onSubmit={
                this.state.registering ? this.handleRegister : this.handleLogin
              }
            >
              {this.props.loading ? (
                <Loading color="#eee" />
              ) : this.state.registering ? (
                <>
                  <Register>
                    <div>
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
                    </div>
                    <div>
                      <input
                        type="email"
                        placeholder="Email"
                        name="email"
                        onChange={this.handleChange}
                        value={this.state.email}
                      />
                      <select
                        name="role_id"
                        onChange={this.handleChange}
                        value={this.state.role_id}
                      >
                        <option value="" disabled hidden>
                          Role
                        </option>
                        <option value={1}>Manager</option>
                        <option value={2}>Volunteer</option>
                      </select>
                      <select
                        name="loc_id"
                        onChange={this.handleChange}
                        value={this.state.loc_id}
                      >
                        <option value="" disabled hidden>
                          Location
                        </option>
                        <option value={1}>Test Kitchen 1</option>
                        <option value={2}>Test Kitchen 2</option>
                        <option value={3}>Test Kitchen 3</option>
                        <option value={4}>Test Kitchen 4</option>
                      </select>
                    </div>
                  </Register>
                  <div className="register-buttons">
                    <button type="submit">Submit</button>
                    <p>
                      Already have an account with us?{' '}
                      <span onClick={this.handleTransition}>Log in!</span>
                    </p>
                  </div>
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
          </FormContainer>
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
            <p>Volunteer your time and brighten someone's day</p>
            <h3>Flexible and Transparent Scheduling</h3>
            <p>See who needs help and where - no question, no uncertainty</p>
          </div>
        </MidSection>
        <StyledFooter>
          <section>
            <div>
              <h3>Keep in Touch</h3>
              <p>
                Want to learn more about our program? Keep informed on volunteer
                opportunities? Need some positive vibes in your inbox every now
                and then? Subscribe to our newsletter!
              </p>
              <form>
                <input
                  type="email"
                  placeholder="Email"
                  name="newsletter"
                  onChange={this.handleChange}
                  value={this.state.newsletter}
                />
                <button>Subscribe</button>
              </form>
            </div>
            <div>
              <address>
                <p>
                  Test Kitchen 1<br />
                  123 Lambda Way
                  <br />
                  San Francisco, CA 12000
                  <br />
                  (555) 555-5555
                </p>
              </address>
            </div>
          </section>
        </StyledFooter>
      </section>
    );
  }
}

const mapStateToProps = state => {
  return {
    user: state.user,
    loading: state.loading,
    error: state.error,
  };
};

export default connect(
  mapStateToProps,
  { register, login }
)(Authentication);
