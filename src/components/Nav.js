import React from 'react';
import styled from 'styled-components';
import { NavLink } from 'react-router-dom';
import { CSSTransition } from 'react-transition-group';

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
  justify-content: flex-end;
  align-items: center;

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
`;

const BottomBar = styled.nav`
  display: none;
  overflow: hidden;
  background-color: #ffffff;
  height: 105px;
  box-shadow: inset 0 -12px 12px -12px rgba(0, 0, 0, 0.5);
  justify-content: space-around;
  align-items: center;

  img {
    width: 35%;
    user-select: none;
    border-radius: 20px;
  }
  div {
    width: 45%;
    display: flex;
    justify-content: space-between;
    align-items: center;

    a,
    .icon-bottom {
      text-decoration: none;
      color: #222;
      user-select: none;
      cursor: pointer;

      &.bottom-active {
        .icon-bottom {
          font-size: 4rem;
        }
      }
    }
    .refreshing {
      animation: spin 0.75s linear 0s infinite;
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

class Nav extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
      refreshing: false,
    };
  }
  refresh = () => {
    this.setState({ refreshing: true });
    setTimeout(() => this.setState({ refreshing: false }), 3000); // Would likely be an AJAX call
  };
  render() {
    return (
      <StyledNav>
        <TopBar open={this.state.open}>
          <div>
            <NavLink to="/1" activeClassName="top-active">
              Test
            </NavLink>
            <NavLink to="/2" activeClassName="top-active">
              Test
            </NavLink>
            <NavLink to="/3" activeClassName="top-active">
              Test
            </NavLink>
            <NavLink to="/4" activeClassName="top-active">
              Sign In
            </NavLink>
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
              <NavLink to="/" exact activeClassName="bottom-active">
                <span className="fas fa-home icon-bottom" />
              </NavLink>
              <NavLink to="/add-item" activeClassName="bottom-active">
                <span className="far fa-plus-square icon-bottom" />
              </NavLink>
              <NavLink to="/modify-item" activeClassName="bottom-active">
                <span className="far fa-edit icon-bottom" />
              </NavLink>
              <NavLink to="/delete-item" activeClassName="bottom-active">
                <span className="far fa-minus-square icon-bottom" />
              </NavLink>
              <span
                className={`fas fa-sync-alt icon-bottom${
                  this.state.refreshing ? ' refreshing' : ''
                }`}
                onClick={this.refresh}
              />
            </div>
          </BottomBar>
        </CSSTransition>
      </StyledNav>
    );
  }
}
export default Nav;
