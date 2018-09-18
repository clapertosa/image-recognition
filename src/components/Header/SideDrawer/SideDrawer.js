import React from "react";
import { NavBarItems } from "../../../components";

import styles from "./SideDrawer.scss";

const SideDrawer = props => {
  let visible = props.showSideDrawer ? styles.open : styles.close;

  return (
    <React.Fragment>
      <div
        onClick={props.closeSideDrawer}
        className={`${styles["side-drawer"]} ${visible}`}
      >
        <NavBarItems />
      </div>
    </React.Fragment>
  );
};

export default SideDrawer;
