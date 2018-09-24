import React from "react";
import { default as MaterialButton } from "@material-ui/core/Button";

const Button = props => {
  const button = props.onClick ? (
    <MaterialButton
      onClick={() => props.onClick()}
      disabled={props.disabled}
      type={props.type}
      size={props.size}
      variant={props.variant}
      color={props.color}
      style={{ float: props.float, color: props.disabled ? "gray" : "white" }}
    >
      {props.children}
    </MaterialButton>
  ) : (
    <MaterialButton
      disabled={props.disabled}
      type={props.type}
      size={props.size}
      variant={props.variant}
      color={props.color}
      style={{ float: props.float, color: props.disabled ? "gray" : "white" }}
    >
      {props.children}
    </MaterialButton>
  );
  return button;
};

export default Button;
