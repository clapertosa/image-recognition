import React from "react";
import styles from "./Spinner.scss";

const Spinner = () => {
  return (
    <div className={[styles["sk-circle"], styles.fade].join(" ")}>
      <div className={[styles["sk-circle1"], styles["sk-child"]].join(" ")} />
      <div className={[styles["sk-circle2"], styles["sk-child"]].join(" ")} />
      <div className={[styles["sk-circle3"], styles["sk-child"]].join(" ")} />
      <div className={[styles["sk-circle4"], styles["sk-child"]].join(" ")} />
      <div className={[styles["sk-circle5"], styles["sk-child"]].join(" ")} />
      <div className={[styles["sk-circle6"], styles["sk-child"]].join(" ")} />
      <div className={[styles["sk-circle7"], styles["sk-child"]].join(" ")} />
      <div className={[styles["sk-circle8"], styles["sk-child"]].join(" ")} />
      <div className={[styles["sk-circle9"], styles["sk-child"]].join(" ")} />
      <div className={[styles["sk-circle10"], styles["sk-child"]].join(" ")} />
      <div className={[styles["sk-circle11"], styles["sk-child"]].join(" ")} />
      <div className={[styles["sk-circle12"], styles["sk-child"]].join(" ")} />
    </div>
  );
};

export default Spinner;
