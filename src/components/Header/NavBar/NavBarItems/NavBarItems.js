import React from "react";
import { NavBarItem } from "../../../../components";

import styles from "./NavBarItems.scss";

const NavBarItems = props => {
  return (
    <ul className={styles["navbar-items"]}>
      <NavBarItem exact url="/">
        Home
      </NavBarItem>
      <NavBarItem url="/login">Login</NavBarItem>
      <NavBarItem url="/signup" backgroundColor="#007209">
        Signup
      </NavBarItem>
    </ul>
  );
};

export default NavBarItems;
