import React from "react";

import styles from "./DrawerToggle.scss";

const DrawerToggle = props => {
  return (
    <div onClick={props.drawerToggleClicked} className={styles.drawertoggle}>
      <div />
      <div />
      <div />
    </div>
  );
};

export default DrawerToggle;
