import React from "react";
import { NavBarItems, Backdrop } from "../../../components";

import styles from "./SideDrawer.scss";

const SideDrawer = props => {
  let visible = props.showSideDrawer ? styles.open : styles.close;

  return (
    <React.Fragment>
      {/*<Backdrop />*/}
      <div className={`${styles.sidedrawer} ${visible}`}>
        <NavBarItems />
      </div>
    </React.Fragment>
  );
};

export default SideDrawer;
