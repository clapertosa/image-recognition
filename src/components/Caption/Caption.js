import React from "react";
import ReactDOM from "react-dom";
import styles from "./Caption.scss";

const Caption = props => {
  return (
    <div className={styles.caption}>
      {getCaptionType(props.type, props.data)}
    </div>
  );
};

const getCaptionType = (type, data) => {
  switch (type) {
    case "describe":
      return data.BestOutcome.Description;
    case "faces":
      return `Faces detected: ${data.FaceCount}`;
    case "objects":
      return `Objects detected: ${data.ObjectCount}`;
    case "nsfw":
      return classifyNsfw(data.Score);
    default:
      return data;
  }
};

const classifyNsfw = score => {
  if (score >= 0.0 && score <= 0.2) {
    return (
      <div>
        NSFW Classification: <span style={{ color: "green" }}>safe</span>
      </div>
    );
  } else if (score >= 0.8 && score <= 1.0) {
    return (
      <div>
        NSFW Classification: <span style={{ color: "red" }}>unsafe</span>
      </div>
    );
  } else if (score >= 0.2 && score <= 0.8) {
    return (
      <div>
        NSFW Classification: <span style={{ color: "red" }}>racist</span>
      </div>
    );
  } else {
    return (
      <div>
        NSFW Classification: <span style={{ color: "yellow" }}>moderate</span>
      </div>
    );
  }
};

export default Caption;
