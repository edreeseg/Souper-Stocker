import React from 'react';
import styled from 'styled-components';
import { NavLink } from 'react-router-dom';

const StyledNav = styled.header`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 150px;
  position: fixed;
  top: 0;
  left: 0;
`;

const TopBar = styled.section`
  background-color: #464646;
  height: 30%;
  display: flex;
  justify-content: flex-end;
  align-items: center;

  div {
    height: 100%;
    width: 60%;
    display: flex;
    justify-content: space-around;

    a {
      display: flex;
      justify-content: center;
      align-items: center;
      height: 100%;
      width: 10%;
      text-decoration: none;
      color: #eee;

      &:hover {
        background: #707070;
      }
    }
  }
`;

const BottomBar = styled.nav`
  background-color: #ffffff;
  height: 70%;
  box-shadow: inset 0 -12px 12px -12px rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: space-around;
  align-items: center;

  img {
    width: 20%;
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
    }
  }
`;

const Nav = props => (
  <StyledNav>
    <TopBar>
      <div>
        <NavLink to="/test">Test</NavLink>
        <NavLink to="/test">Test</NavLink>
        <NavLink to="/test">Test</NavLink>
        <NavLink to="/test">Sign In</NavLink>
        <NavLink to="/test">Test</NavLink>
      </div>
    </TopBar>
    <BottomBar>
      <img
        src="https://cdn.touchbistro.com/wp-content/themes/touchbistro2017/assets/images/logo.png"
        alt="logo"
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
  </StyledNav>
);

export default Nav;
