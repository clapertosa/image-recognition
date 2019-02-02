import React from "react";
import styles from "./Objects.scss";

const Objects = props => {
  return (
    <ul className={styles.container}>
      {props.data.map((object, index) => {
        return (
          <li
            key={index}
            className={styles.object}
            style={{
              color:
                object.value > 0.95
                  ? "#38f238"
                  : object.value < 0.95 && object.value > 0.9
                  ? "#cece25"
                  : "silver"
            }}
          >
            {object.name}
          </li>
        );
      })}
    </ul>
  );
};

export default Objects;
