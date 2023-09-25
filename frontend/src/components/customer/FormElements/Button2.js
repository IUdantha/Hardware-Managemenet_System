import React from "react";
import { Link } from "react-router-dom";


const Button = (props) => {
  if (props.href) {
    return (
      <a className={"anco"} href={props.href}>
        {props.children}
      </a>
    );
  }
  if (props.to) {
    return (
      <Link to={props.to} exact={props.exact} className={"buttonB2 anco"}>
        {props.children}
      </Link>
    );
  }
  return (
    <button
      className={"buttonB2"}
      type={props.type}
      onClick={props.onClick}
      disabled={props.disabled}
    >
      {props.children}
    </button>
  );
};

export default Button;
