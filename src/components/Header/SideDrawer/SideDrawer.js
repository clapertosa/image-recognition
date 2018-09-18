import React from "react";
import { NavBarItems } from "../../../components";

import styles from "./SideDrawer.scss";

const SideDrawer = props => {
  let visible = props.showSideDrawer ? styles.open : styles.close;
  let touchStart, touchEnd;

  return (
    <React.Fragment>
      <div
        id="side-drawer"
        className={`${styles["side-drawer"]} ${visible}`}
        onTouchStart={touch => (touchStart = touch.touches[0].screenX)}
        onTouchMove={touch => (touchEnd = touch.touches[0].screenX)}
        onTouchEnd={() =>
          touchEnd < touchStart ? props.closeSideDrawer() : null
        }
        onClick={props.closeSideDrawer}
      >
        <NavBarItems />
      </div>
    </React.Fragment>
  );
};

export default SideDrawer;
