import React from "react";
import styles from "../Box.scss";

const FaceBox = props => {
  return props.data.map((faceCoords, index) => {
    let coords = calculateBoxPosition(faceCoords);
    return (
      <div className={styles["box-container"]}>
        <div
          key={index}
          className={styles.box}
          style={{
            top: coords.top + "%",
            right: coords.right + "%",
            bottom: coords.bottom + "%",
            left: coords.left + "%"
          }}
        />
      </div>
    );
  });
};

const calculateBoxPosition = faceCoords => {
  const image = document.getElementById("image");
  const width = image.naturalWidth;
  const height = image.naturalHeight;

  return {
    left: (faceCoords.LeftX / width) * 100,
    top: (faceCoords.TopY / height) * 100 - 1,
    right: ((width - faceCoords.RightX) / width) * 100,
    bottom: ((height - faceCoords.BottomY) / height) * 100 + 1
  };
};

export default FaceBox;
