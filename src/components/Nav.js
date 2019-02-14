import React from 'react';
import styled from 'styled-components';
import { NavLink } from 'react-router-dom';

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

      &:hover {
        background: #707070;
      }
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
    width: 35%;
    user-select: none;
    border-radius: 20px;
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
              className="fas fa-clipboard-list icon-top"
              onClick={() =>
                this.setState(prevState => ({ open: !prevState.open }))
              }
            />
          </div>
        </TopBar>
        {this.state.open ? (
          <BottomBar>
            <img src="https://i.imgur.com/ixE731v.jpg" alt="placeholder logo" />
            <div>
              <NavLink to="/">
                <span className="fas fa-home icon-bottom" />
              </NavLink>
              <NavLink to="/add-inventory">
                <span className="far fa-plus-square icon-bottom" />
              </NavLink>
              <NavLink to="/test">
                <span className="far fa-edit icon-bottom" />
              </NavLink>
              <NavLink to="/test">
                <span className="far fa-minus-square icon-bottom" />
              </NavLink>
              <NavLink to="/test">
                <span className="fas fa-sync-alt icon-bottom" />
              </NavLink>
            </div>
          </BottomBar>
        ) : null}
      </StyledNav>
    );
  }
}
export default Nav;
