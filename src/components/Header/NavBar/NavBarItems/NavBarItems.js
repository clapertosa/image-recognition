import React from "react";
import { NavBarItem } from "../../../../components";

import styles from "./NavBarItems.scss";

const NavBarItems = () => {
  return (
    <ul className={styles["navbar-items"]}>
      <NavBarItem>Home</NavBarItem>
      <NavBarItem>Login</NavBarItem>
      <NavBarItem backgroundColor="#007209">Signup</NavBarItem>
    </ul>
  );
};

export default NavBarItems;
