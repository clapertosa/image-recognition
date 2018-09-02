import React from "react";
import { NavBarItems } from "../../../components";

import styles from "./NavBar.scss";

const NavBar = props => {
  return (
    <React.Fragment>
      <nav>
        <NavBarItems />
      </nav>
      {/*<div className="menu-toggle">
        <i className="fa fa-bars" aria-hidden="true" />
  </div>*/}
    </React.Fragment>
  );
};

export default NavBar;
