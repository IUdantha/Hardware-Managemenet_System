import React from "react";
import { Link } from "react-router-dom";

import "./Button4.css";

const Button = (props) => {
  if (props.href) {
    return (
      <a className={"anco4"} href={props.href}>
        {props.children}
      </a>
    );
  }
  if (props.to) {
    return (
      <Link to={props.to} exact={props.exact} className={"buttonB4 anco4"}>
        {props.children}
      </Link>
    );
  }
  return (
    <button
      className={"buttonB4"}
      type={props.type}
      onClick={props.onClick}
      disabled={props.disabled}
    >
      {props.children}
    </button>
  );
};

export default Button;
