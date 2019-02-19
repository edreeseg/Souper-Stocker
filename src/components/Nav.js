import React from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { CSSTransition } from 'react-transition-group';

import logo from '../assets/soup.svg';
import { getInventory, setOperation } from '../redux/actions';

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

      &:hover,
      &.top-active {
        background: #707070;
      }
      &:active {
        background: #848484;
      }
    }
    span {
      background: ${props => (props.open ? '#707070' : 'transparent')};
    }
  }

  .logo-container {
    display: flex;
    justify-content: ${props =>
      props.loggedIn ? 'space-between' : 'flex-start'};
    align-items: center;
    width: 40%;
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
      refreshing: false,
    };
  }
  handleOperationChange = e => {
    const name = e.target.getAttribute('name');
    this.props.setOperation(name === this.props.currentOperation ? null : name);
  };
  refresh = () => {
    this.setState({ refreshing: true });
    this.props.getInventory(this.props.user);
    this.refreshTimer = window.setInterval(() => {
      if (!this.props.loading) this.setState({ refreshing: false });
      window.clearInterval(this.refreshTimer);
    }, 100);
  };
  render() {
    return (
      <StyledNav>
        <TopBar open={this.state.open} loggedIn={this.props.user}>
          <div className="logo-container">
            <img src={logo} alt="soup logo" />
            {this.props.user ? <h2>Welcome, {this.props.user.name}!</h2> : null}
          </div>
          <div>
            <a href="/1">Test</a>
            <a href="/2">Test</a>
            <a href="/3">Test</a>
            <a href="/4">Sign In</a>
            <span
              className="fas fa-clipboard-list icon-top"
              onClick={() =>
                this.setState(prevState => ({ open: !prevState.open }))
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
                  this.state.refreshing ? ' refreshing' : ''
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
    currentOperation: state.currentOperation,
  };
};

export default connect(
  // Must be written this way so React-Redux plays nice with React-Router.
  mapStateToProps,
  { getInventory, setOperation },
  null,
  { pure: false }
)(Nav);
