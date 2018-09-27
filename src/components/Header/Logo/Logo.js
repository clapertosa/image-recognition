import React from "react";
import { NavLink } from "react-router-dom";
import logo from "../../../assets/images/logo.svg";

import styles from "./Logo.scss";

const Logo = props => {
  return (
    <div onClick={props.closeSideDrawer} className={styles.logo}>
      <NavLink to="/">
        <img src={logo} alt="Eye logo" />
      </NavLink>
    </div>
  );
};

export default Logo;
