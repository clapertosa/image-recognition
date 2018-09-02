import React from "react";
import styles from "./NavBarItem.scss";

const NavBarItem = props => {
  let backgroundColor = props.backgroundColor
    ? { background: props.backgroundColor }
    : null;
  return (
    <li className={styles["navbar-item"]} style={backgroundColor}>
      <a href={props.url ? props.url : "#"}>{props.children}</a>
    </li>
  );
};

export default NavBarItem;
