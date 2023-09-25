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
      <Link to={props.to} exact={props.exact} className={"buttonB anco"}>
        {props.children}
      </Link>
    );
  }

  if (props.navigate) {
    return (
      <React.Fragment>
        <button
          className={"buttonB"}
          type={props.type}
          onClick={props.onClick}
          disabled={props.disabled}
          href={props.navigate}
        >
          {props.children}
        </button>
      </React.Fragment>
    );
  }

  return (
    <button
      className={"buttonB"}
      type={props.type}
      onClick={props.onClick}
      disabled={props.disabled}
    >
      {props.children}
    </button>
  );
};

export default Button;
