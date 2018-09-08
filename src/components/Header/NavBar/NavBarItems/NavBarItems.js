import React from "react";
import { NavBarItem } from "../../../../components";

import styles from "./NavBarItems.scss";

const NavBarItems = props => {
  let navBarLinks = (
    <ul>
      <NavBarItem exact url="/">
        Home
      </NavBarItem>
      <NavBarItem url="/login">Login</NavBarItem>
      <NavBarItem url="/signup" backgroundColor="#007209">
        Signup
      </NavBarItem>
    </ul>
  );

  if (props.isAuthenticated) {
    navBarLinks = (
      <ul>
        <NavBarItem exact url="/">
          Home
        </NavBarItem>
        <NavBarItem url="/user">User</NavBarItem>
        <NavBarItem url="/logout" backgroundColor="#007209">
          Logout
        </NavBarItem>
      </ul>
    );
  }

  return navBarLinks;
};

export default NavBarItems;
