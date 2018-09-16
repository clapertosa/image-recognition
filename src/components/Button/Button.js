import React from "react";
import { Button as MaterialButton } from "@material-ui/core";

const Button = props => {
  const button = props.onClick ? (
    <MaterialButton
      onClick={() => props.onClick()}
      disabled={props.disabled}
      type={props.type}
      size={props.size}
      variant={props.variant}
      color={props.color}
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
    >
      {props.children}
    </MaterialButton>
  );
  return button;
};

export default Button;
