import React from "react";
import { default as MaterialInput } from "@material-ui/core/Input";

const Input = props => {
  const input =
    props.type === "file" ? (
      <input type={props.type} />
    ) : (
      <MaterialInput type={props.type} />
    );
  return input;
};

export default Input;
