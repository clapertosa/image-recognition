import React from "react";
import { Input as MaterialInput } from "@material-ui/core";

const Input = props => {
  const input =
    props.type === "file" ? (
      <input type={props.type} />
    ) : (
      <MaterialInput type={props.type} />
    );
  return <MaterialInput type={props.type} />;
};

export default Input;
