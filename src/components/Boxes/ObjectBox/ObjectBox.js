import React from "react";
import styles from "../Box.scss";

const ObjectBox = props => {
  return props.data.map((object, index) => {
    let coords = calculateBoxPosition(object);
    return (
      <div
        key={index}
        className={styles.box}
        style={{
          top: coords.top + "%",
          right: coords.right + "%",
          bottom: coords.bottom + "%",
          left: coords.left + "%"
        }}
      >
        <span className={styles.description}>{object.ObjectClassName}</span>
      </div>
    );
  });
};

const calculateBoxPosition = objectCoords => {
  const image = document.getElementById("image");
  const width = image.naturalWidth;
  const height = image.naturalHeight;

  return {
    left: (objectCoords.X / width) * 100,
    top: (objectCoords.Y / height) * 100,
    right: ((width - objectCoords.Width) / width) * 100,
    bottom: ((height - objectCoords.Height) / height) * 100
  };
};

export default ObjectBox;
