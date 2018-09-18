import React from "react";

import styles from "./Backdrop.scss";

const Backdrop = props => {
  let visible = props.showBackdrop ? styles.visible : styles["not-visible"];
  let touchStart, touchEnd;

  return (
    <div
      id="backdrop"
      className={`${styles.backdrop} ${visible}`}
      onTouchStart={touch => (touchStart = touch.touches[0].screenX)}
      onTouchMove={touch => (touchEnd = touch.touches[0].screenX)}
      onTouchEnd={() =>
        touchEnd < touchStart ? props.closeSideDrawer() : null
      }
      onClick={props.closeSideDrawer}
    >
      Backdrop
    </div>
  );
};

export default Backdrop;
