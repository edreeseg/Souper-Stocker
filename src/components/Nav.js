import React from 'react';
import { NavLink } from 'react-router-dom';

const Nav = props => (
  <nav>
    <NavLink to="/">HOME</NavLink>
    <NavLink to="/add-inventory">ADD INVENTORY</NavLink>
    <NavLink to="/volunteer">VOLUNTEER</NavLink>
  </nav>
);

export default Nav;
