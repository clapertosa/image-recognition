import React from "react";
import { NavBarItems } from "../../../components";

import styles from "./NavBar.scss";

const NavBar = props => {
  return (
    <React.Fragment>
      <nav>
        <NavBarItems isAuthenticated={props.isAuthenticated} />
      </nav>
    </React.Fragment>
  );
};

export default NavBar;
