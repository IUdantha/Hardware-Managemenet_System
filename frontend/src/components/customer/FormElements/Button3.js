import React from "react";
import { Link } from "react-router-dom";

const Button = (props) => {
  if (props.href) {
    return (
      <a className={"anco3"} href={props.href}>
        {props.children}
      </a>
    );
  }
  if (props.to) {
    return (
      <Link to={props.to} exact={props.exact} className={"buttonB3 anco3"}>
        {props.children}
      </Link>
    );
  }
  return (
    <button
      className={"buttonB3"}
      type={props.type}
      onClick={props.onClick}
      disabled={props.disabled}
    >
      {props.children}
    </button>
  );
};

export default Button;
