import React from 'react';
import styled from 'styled-components';
import { NavLink } from 'react-router-dom';

const StyledNav = styled.header`
  display: flex;
  flex-direction: column;
  width: 100%;
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

      &:hover {
        background: #707070;
      }
    }
    span {
      font-size: 2.5rem;
      cursor: pointer;
    }
  }
`;

const BottomBar = styled.nav`
  background-color: #ffffff;
  height: 105px;
  box-shadow: inset 0 -12px 12px -12px rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: space-around;
  align-items: center;

  img {
    width: 20%;
    user-select: none;
  }
  div {
    width: 45%;
    display: flex;
    justify-content: space-between;
    align-items: center;

    a {
      text-decoration: none;
      color: #222;
      font-size: 1.8rem;
      user-select: none;
    }
  }
`;

class Nav extends React.Component {
  state = {
    open: false,
  };
  render() {
    return (
      <StyledNav>
        <TopBar>
          <div>
            <NavLink to="/test">Test</NavLink>
            <NavLink to="/test">Test</NavLink>
            <NavLink to="/test">Test</NavLink>
            <NavLink to="/test">Sign In</NavLink>
            <span
              className="fas fa-clipboard-list"
              onClick={() =>
                this.setState(prevState => ({ open: !prevState.open }))
              }
            />
          </div>
        </TopBar>
        {this.state.open ? (
          <BottomBar>
            <img
              src="https://cdn.touchbistro.com/wp-content/themes/touchbistro2017/assets/images/logo.png"
              alt="placeholder logo from example"
            />
            <div>
              <NavLink to="/">HOME</NavLink>
              <NavLink to="/add-inventory">ADD INVENTORY</NavLink>
              <NavLink to="/test">TEST</NavLink>
              <NavLink to="/test">TEST</NavLink>
              <NavLink to="/test">TEST</NavLink>
              <NavLink to="/test">TEST</NavLink>
            </div>
          </BottomBar>
        ) : null}
      </StyledNav>
    );
  }
}
export default Nav;
