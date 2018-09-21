import React from "react";
import styles from "./Image.scss";

const Image = props => {
  return (
    <div className={styles["image-container"]}>
      {props.children}
      <img
        id="image"
        className={[styles.image, styles["image-animation"]].join(" ")}
        src={props.imageUrl}
        alt="Chosen pic"
      />
    </div>
  );
};

export default Image;
