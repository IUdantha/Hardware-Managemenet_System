import React, { useReducer, useEffect } from "react";

import { validate } from "../../../features/finance/validators";


const inputReducer = (state, action) => {
  switch (action.type) {
    case "CHANGE":
      return {
        ...state,
        value: action.val,
        isValid: validate(action.val, action.validators),
      };
    case "TOUCH": {
      return {
        ...state,
        isTouched: true,
      };
    }
    default:
      return state;
  }
};

const Input = (props) => {
  const [inputState, dispatch] = useReducer(inputReducer, {
    value: props.initialValue || "",
    isTouched: false,
    isValid: props.initialValid || false,
  });

  const { id, onInput } = props;
  const { value, isValid } = inputState;

  useEffect(() => {
    onInput(id, value, isValid);
  }, [id, value, isValid, onInput]);

  const changeHandler = (event) => {
    dispatch({
      type: "CHANGE",
      val: event.target.value,
      validators: props.validators,
    });
  };

  const touchHandler = () => {
    dispatch({
      type: "TOUCH",
    });
  };

  // const element =
  //   props.element === "input" ? (
  //     <input
  //       id={props.id}
  //       type={props.type}
  //       placeholder={props.placeholder}
  //       onChange={changeHandler}
  //       onBlur={touchHandler}
  //       value={inputState.value}
  //       disabled={props.disable}
  //     />
  //   ) : (
  //     <textarea
  //       id={props.id}
  //       rows={props.rows || 3}
  //       onChange={changeHandler}
  //       onBlur={touchHandler}
  //       value={inputState.value}
  //     />
  //   );
  let element;
  if (props.element === "input") {
    element = (
      <input
        id={props.id}
        type={props.type}
        placeholder={props.placeholder}
        onChange={changeHandler}
        onBlur={touchHandler}
        value={inputState.value}
        disabled={props.disable}
      />
    );
  } else if (props.element === "text") {
    element = (
      <textarea
        id={props.id}
        rows={props.rows || 3}
        onChange={changeHandler}
        onBlur={touchHandler}
        value={inputState.value}
      />
    );
  } else if(props.element === "select"){
     element = (
     <select
      id={props.id}
      value={inputState.value}
      onChange={changeHandler}
      onBlur={touchHandler}
      disabled={props.disable}
 
      
  >
    {props.options.map((option) => (
      <option key={option.value} value={option.value}>
         {option.label}
      </option>
    ))}
  </select> );
  }else if (props.element === "radio") {
    element = (
      <div>
        {props.options.map((option) => (
          <div key={option.value}>
            <input
              type="radio"
              id={option.value}
              name={props.id}
              value={option.value}
              checked={inputState.value === option.value}
              onChange={changeHandler}
              onBlur={touchHandler}
              disabled={props.disable}
            />
            <label htmlFor={option.value}>{option.label}</label>
          </div>
        ))}
      </div>
    );
  }
  
  return (
    <div
      className={`formf-control ${
        !inputState.isValid && inputState.isTouched && "formf-control--invalid"
      }`}
    >
      <label htmlFor={props.id}>{props.label}</label>
      {element}{" "}
      {!inputState.isValid && inputState.isTouched && <p>{props.errorText}</p>}
    </div>
  );
};

export default Input;
