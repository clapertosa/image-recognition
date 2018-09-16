import React from "react";
import styles from "./Caption.scss";

const Caption = props => {
  return !props.nsfw ? (
    <div className={styles.caption}>{props.caption}</div>
  ) : (
    <div className={styles.caption}>
      NSFW classification: {classifyNsfw(props.caption)}
    </div>
  );
};

const classifyNsfw = score => {
  if (score >= 0.0 && score <= 0.2) {
    return <span style={{ color: "green" }}>safe</span>;
  } else if (score >= 0.8 && score <= 1.0) {
    return <span style={{ color: "red" }}>unsafe</span>;
  } else if (score >= 0.2 && score <= 0.8) {
    return <span style={{ color: "red" }}>racist</span>;
  } else {
    return <span style={{ color: "yellow" }}>moderate</span>;
  }
};

export default Caption;
