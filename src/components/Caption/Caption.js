import React from "react";
import styles from "./Caption.scss";

const Caption = props => {
  return (
    <div
      className={[
        styles.caption,
        props.animate ? styles["enter-from-left"] : ""
      ].join(" ")}
    >
      {getCaptionType(props.type, props.data)}
    </div>
  );
};

const getCaptionType = (type, data) => {
  switch (type) {
    case "faces":
      return `Faces detected: ${
        data.outputs[0].data.regions ? data.outputs[0].data.regions.length : 0
      }`;
    case "objects":
      return (
        <span>
          Legend: <span style={{ color: "#38f238" }}>certain</span> -{" "}
          <span style={{ color: "#cece25" }}>probable</span> -{" "}
          <span style={{ color: "silver" }}>uncertain</span>
        </span>
      );
    case "nsfw":
      return classifyNsfw(
        data.outputs[0].data.concepts[0].value -
          data.outputs[0].data.concepts[1].value
      );
    default:
      return data;
  }
};

const classifyNsfw = score => {
  if (score > 0.7) {
    return (
      <div>
        NSFW Classification: <span style={{ color: "#38f238" }}>safe</span>
      </div>
    );
  } else if (score <= 0.7 && score > 0.5) {
    return (
      <div>
        NSFW Classification: <span style={{ color: "#cece25" }}>moderate</span>
      </div>
    );
  } else {
    return (
      <div>
        NSFW Classification: <span style={{ color: "red" }}>unsafe</span>
      </div>
    );
  }
};

export default Caption;
