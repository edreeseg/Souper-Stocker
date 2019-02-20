import React from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { CSSTransition } from 'react-transition-group';

import logo from '../assets/soup.svg';
import { getInventory, setOperation, logout } from '../redux/actions';

const StyledNav = styled.header`
  display: flex;
  flex-direction: column;
  width: 100%;

  .icon-top {
    font-size: 2.5rem;
    cursor: pointer;
  }

  .icon-bottom {
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 3.5rem;
  }
`;

const TopBar = styled.section`
  background-color: #464646;
  height: 45px;
  display: flex;
  justify-content: space-between;
  align-items: center;

  h2 {
    color: #eee;
    font-size: 1.8rem;
    margin-left: 10px;
  }

  div {
    height: 100%;
    width: 60%;
    display: flex;
    justify-content: space-around;

    a,
    span {
      display: flex;
      justify-content: center;
      align-items: center;
      height: 100%;
      width: 10%;
      text-decoration: none;
      color: #eee;
      user-select: none;
      cursor: pointer;

      &:hover,
      &.top-active {
        background: #707070;
      }
      &:active {
        background: #848484;
      }
    }
    .icon-top {
      background: ${props => (props.open ? '#707070' : 'transparent')};
    }
  }

  .logo-container {
    display: flex;
    justify-content: ${props =>
      props.loggedIn ? 'space-between' : 'flex-start'};
    align-items: center;
    width: 27%;
    padding: 0 20px;

    img {
      height: 90%;
    }
  }
`;

const BottomBar = styled.nav`
  display: none;
  overflow: hidden;
  background-color: #ffffff;
  height: 105px;
  box-shadow: inset 0 -12px 12px -12px rgba(0, 0, 0, 0.5);
  justify-content: space-around;
  align-items: center;

  a {
    text-decoration: none;
  }

  img {
    height: 80%;
    min-height: 88px;
    user-select: none;
    border-radius: 20px;
  }
  div {
    width: 45%;
    display: flex;
    justify-content: space-between;
    align-items: center;

    .refreshing {
      animation: spin 0.75s linear 0s infinite;
      color: #3aa74c;
    }

    @keyframes spin {
      0% {
        transform: rotate(0deg);
      }
      50% {
        transform: rotate(180deg);
      }
      100% {
        transform: rotate(360deg);
      }
    }
  }

  /* React Transition Group Animations for Bottom Bar: */

  &.tray-enter {
    display: flex;
    height: 0;

    * {
      opacity: 0;
    }
  }
  &.tray-enter-active {
    display: flex;
    height: 105px;
    transition: height 200ms ease;

    * {
      opacity: 1;
      transition: opacity 200ms ease;
    }
  }
  &.tray-enter-done {
    display: flex;
  }
  &.tray-exit {
    display: flex;
  }
  &.tray-exit-active {
    height: 0;
    display: flex;
    transition: height 200ms ease;

    * {
      opacity: 0;
      transition: opacity 200ms ease;
    }
  }
`;

const Icon = styled.span`
  text-decoration: none;
  color: ${props => (props.name === props.current ? '#3AA74C' : '#222')};
  user-select: none;
  cursor: pointer;
`;

class Nav extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
    };
  }
  handleOperationChange = e => {
    const name = e.target.getAttribute('name');
    this.props.setOperation(name === this.props.currentOperation ? null : name);
  };
  handleLogout = e => {
    this.props.logout();
    this.props.history.push('/auth');
  };
  refresh = e => {
    this.props.getInventory(this.props.user);
  };
  render() {
    return (
      <StyledNav>
        <TopBar open={this.state.open} loggedIn={this.props.user}>
          <div className="logo-container">
            <Link to="/">
              <img src={logo} alt="soup logo" />
            </Link>
            {this.props.user ? <h2>Welcome, {this.props.user.name}!</h2> : null}
          </div>
          <div>
            <a href="/1">Volunteer</a>
            <a href="/2">About Us</a>
            {this.props.user ? (
              <Link to={`/users/${this.props.user.username}`}>My Account</Link>
            ) : (
              <span>My Account</span>
            )}
            <span onClick={this.handleLogout}>
              {this.props.user ? 'Logout' : 'Login'}
            </span>
            <span
              className="fas fa-clipboard-list icon-top"
              onClick={() =>
                this.props.user
                  ? this.setState(prevState => ({ open: !prevState.open }))
                  : null
              }
            />
          </div>
        </TopBar>
        <CSSTransition in={this.state.open} classNames="tray" timeout={500}>
          <BottomBar>
            <img src="https://i.imgur.com/ixE731v.jpg" alt="placeholder logo" />
            <div>
              <Link to="/">
                <Icon
                  className="fas fa-home icon-bottom"
                  name={null}
                  current={this.props.currentOperation}
                  onClick={this.handleOperationChange}
                />
              </Link>
              <Link to="/add-item">
                <Icon
                  className="far fa-plus-square icon-bottom"
                  name="POST"
                  current={this.props.currentOperation}
                  onClick={this.handleOperationChange}
                />
              </Link>
              <Icon
                className="far fa-edit icon-bottom"
                name="PUT"
                current={this.props.currentOperation}
                onClick={this.handleOperationChange}
              />
              <Icon
                className="far fa-minus-square icon-bottom"
                name="DELETE"
                current={this.props.currentOperation}
                onClick={this.handleOperationChange}
              />
              <Icon
                className={`fas fa-sync-alt icon-bottom${
                  this.props.refreshing ? ' refreshing' : ''
                }`}
                name="GET"
                current={this.props.currentOperation}
                onClick={this.refresh}
              />
            </div>
          </BottomBar>
        </CSSTransition>
      </StyledNav>
    );
  }
}

const mapStateToProps = state => {
  return {
    user: state.user,
    error: state.error,
    loading: state.loading,
    refreshing: state.refreshing,
    currentOperation: state.currentOperation,
  };
};

export default connect(
  // Must be written this way so React-Redux plays nice with React-Router.
  mapStateToProps,
  { getInventory, setOperation, logout },
  null,
  { pure: false }
)(Nav);
