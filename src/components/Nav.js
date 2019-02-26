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
    cursor: pointer;
  }

  .icon-bottom {
    display: flex;
    justify-content: center;
    align-items: center;
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
      font-size: 0.7em;
      padding: 0 10px;
      justify-content: center;
      align-items: center;
      height: 100%;
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
    .inventory-button {
      padding: 0 20px;
      font-size: 1em;
    }
    .icon-top {
      background: ${props => (props.open ? '#707070' : 'transparent')};
    }
  }

  .logo-container {
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 27%;
    padding: 0 20px;

    h2 {
      font-size: 0.75em;
    }

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
  > div {
    width: 45%;
    display: flex;
    justify-content: space-between;
    align-items: center;

    .refreshing {
      animation: spin 0.75s linear 0s infinite;
      color: #3aa74c;

      span {
        visibility: hidden;
      }
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
  position: relative;
  text-decoration: none;
  font-size: 1.5em;
  color: ${props => (props.name === props.current ? '#3AA74C' : '#222')};
  user-select: none;
  cursor: pointer;

  .label {
    position: absolute;
    width: 500%;
    text-align: center;
    top: calc(100% + 10px);
    left: 50%;
    transform: translateX(-50%);
    font-size: 15px;
    font-weight: normal;
    font-family: 'Roboto', sans-serif;
  }
`;

class Nav extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
    };
  }
  componentDidUpdate(prevProps, prevState) {
    if (!this.props.user || this.props.user.role !== 1)
      if (prevState.open) this.setState({ open: false });
  }
  handleOperationChange = e => {
    const name = e.target.getAttribute('name');
    this.props.setOperation(name === this.props.currentOperation ? null : name);
  };
  handleLogout = e => {
    localStorage.removeItem('soupUser');
    this.props.logout();
    this.props.history.push('/auth');
  };
  refresh = e => {
    this.props.getInventory(this.props.user);
    if (this.props.currentOperation === 'POST') {
      this.props.history.push('/');
      this.props.setOperation(null);
    }
  };
  openMenu = e => {
    if (this.props.user && this.props.user.role === 1)
      this.setState(prevState => ({ open: !prevState.open }));
  };
  render() {
    return (
      <StyledNav>
        <TopBar open={this.state.open} loggedIn={this.props.user}>
          <div className="logo-container">
            <Link to="/" onClick={() => this.props.setOperation(null)}>
              <img src={logo} alt="soup logo" />
            </Link>
            {this.props.user ? (
              <h2>Welcome, {this.props.user.name}!</h2>
            ) : (
              <h2>Souper Stocker</h2>
            )}
          </div>
          <div>
            <Link to="/volunteer">Volunteer</Link>
            <a href="https://serene-snyder-c92c58.netlify.com/about.html">
              About Us
            </a>
            {this.props.user ? (
              <span>My Account</span>
            ) : (
              <span>My Account</span>
            )}
            <span onClick={this.handleLogout}>
              {this.props.user ? 'Logout' : 'Login'}
            </span>
            <span
              className="fas fa-clipboard-list icon-top inventory-button"
              onClick={this.openMenu}
            />
          </div>
        </TopBar>
        <CSSTransition in={this.state.open} classNames="tray" timeout={500}>
          <BottomBar>
            <div>
              <Link to="/add-item">
                <Icon
                  className="far fa-plus-square icon-bottom"
                  name="POST"
                  current={this.props.currentOperation}
                  onClick={this.handleOperationChange}
                >
                  <span className="label">ADD ITEM</span>
                </Icon>
              </Link>
              <Icon
                className="far fa-edit icon-bottom"
                name="PUT"
                current={this.props.currentOperation}
                onClick={this.handleOperationChange}
              >
                <span className="label">UPDATE ITEM</span>
              </Icon>
              <Icon
                className="far fa-minus-square icon-bottom"
                name="DELETE"
                current={this.props.currentOperation}
                onClick={this.handleOperationChange}
              >
                <span className="label">DELETE ITEM</span>
              </Icon>
              <Icon
                className={`fas fa-sync-alt icon-bottom${
                  this.props.refreshing ? ' refreshing' : ''
                }`}
                name="GET"
                current={this.props.currentOperation}
                onClick={this.refresh}
              >
                <span className="label">REFRESH INVENTORY</span>
              </Icon>
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
