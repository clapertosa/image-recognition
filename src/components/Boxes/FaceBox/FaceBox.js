import React from "react";
import styles from "../Box.scss";

const FaceBox = props => {
  return props.data.map(({ region_info }, index) => {
    let coords = calculateBoxPosition(region_info.bounding_box);

    return (
      <div key={index} className={styles["box-container"]}>
        <div
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

const calculateBoxPosition = coords => {
  const image = document.getElementById("image");
  const width = image.naturalWidth;
  const height = image.naturalHeight;

  return {
    left: coords.left_col * 100,
    top: coords.top_row * 100,
    right: ((width - coords.right_col * width) * 100) / width,
    bottom: ((height - coords.bottom_row * height) * 100) / height
  };
};

export default FaceBox;
