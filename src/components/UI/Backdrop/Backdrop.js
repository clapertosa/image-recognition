import React from "react";

import styles from "./Backdrop.scss";

const Backdrop = props => {
  let visible = props.showBackdrop ? styles.visible : styles["not-visible"];

  return (
    <div
      className={`${styles.backdrop} ${visible}`}
      onClick={props.backdropClicked}
    >
      Backdrop
    </div>
  );
};

export default Backdrop;
