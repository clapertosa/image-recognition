import React from "react";
import { NavLink } from "react-router-dom";
import styles from "./NavBarItem.scss";

const NavBarItem = props => {
  let backgroundColor = props.backgroundColor
    ? { background: props.backgroundColor }
    : null;
  return (
    <li className={styles["navbar-item"]} style={backgroundColor}>
      <NavLink
        exact={props.exact}
        activeClassName={styles.active}
        to={props.url ? props.url : "#"}
      >
        {props.children}
      </NavLink>
    </li>
  );
};

export default NavBarItem;
