import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import Input from "../../components/customer/FormElements/Input";
import Button from "../../components/customer/FormElements/Button";
import Button2 from "../../components/customer/FormElements/Button2";
import LoadingSpinner from "../../components/Spinner";
import ErrorModal from "../../components/customer/UIElements/ErrorModal";
import { VALIDATOR_REQUIRE, VALIDATOR_TEL } from "../../features/customer/validators";
import { useForm } from "../../features/customer/form-hook";
import { useHttpClient } from "../../features/customer/http-hook";

import CustomerCheck from "../../components/auth/CustomerCheck";
import Sidebar from "../../components/customer/Sidebar";

const AddFeedback = () => {
  const { isLoading, error, sendRequest, clearError } = useHttpClient();

  const navigate = useNavigate();

  const [formState, inputHandler] = useForm(

    {
      name: {
        value: "",
        isValid: false,
      },
    
      email: {
        value: "",
        isValid: false,
      },
      type: {
        value: "",
        isValid: false,
      },

      contact: {
        value: "",
        isValid: false,
      },

      date: {
        value: "",
        isValid: false,
      },

      know: {
        value: "",
        isValid: false,
      },

      help: {
        value: "",
        isValid: false,
      },

      reccomend: {
        value: "",
        isValid: false,
      },

      easy: {
        value: "",
        isValid: false,
      },

      happy: {
        value: "",
        isValid: false,
      },

    },
    false
  );

  const feedbackAddSubmitHandler = async (event) => {
    event.preventDefault();
    try {
      await sendRequest(
        `http://localhost:5000/api/feedbacks/`,
        "POST",
        JSON.stringify({
          name: formState.inputs.name.value,
          email: formState.inputs.email.value,
          type: formState.inputs.type.value,
          contact: formState.inputs.contact.value,
          date: formState.inputs.date.value,
          know: formState.inputs.date.value,
          help: formState.inputs.help.value,
          reccomend: formState.inputs.reccomend.value,
          easy: formState.inputs.easy.value,
          happy: formState.inputs.happy.value,
          
        }),
        {
          "Content-Type": "application/json",
        }
      );
      // history.push("/" + auth.userId + "/payments");
    } catch (err) {}
    navigate("/feedbackDetails");
  };

  if (isLoading) {
    return (
      <div className="center">
        <LoadingSpinner />
      </div>
    );
  }

  return (
    <React.Fragment>
      <CustomerCheck />
      {/* <ErrorModal error={error} onClear={clearError} /> */}
      <form className="feedback-form" onSubmit={feedbackAddSubmitHandler}>
        <h2>Add Feedback</h2>
        <br />

        <Input
          id="name"
          element="input"
          type="text"
          label="Customer Name"
          validators={[VALIDATOR_REQUIRE()]}
          errorText="Please enter a valid Name."
          onInput={inputHandler}
        />
        
        <Input
          id="email"
          element="input"
          type="email"
          label="E-mail"
          validators={[VALIDATOR_REQUIRE()]}
          errorText="Please enter a valid e-mail."
          onInput={inputHandler}
        />

      <Input
          id="type"
          element="select"
          label="Customer Type"
          options={[
            { value: "", label: "Select type" , disabled: true },
            { value: "customer", label: "customer" },
            { value: "customer", label: "loyaly Customer" },
           
           
          ]}
          onInput={inputHandler}
          validators={[VALIDATOR_REQUIRE()]}
          errorText="Please select an option."
         
        />

        
        <Input
          id="contact"
          element="input"
          type="number"
          label="Contact No"
          validators={[VALIDATOR_REQUIRE(),VALIDATOR_TEL()]}
          errorText="Please enter a valid contact no."
          onInput={inputHandler}
        />

        <Input
          id="date"
          element="input"
          type="date"
          label=" Date"
          validators={[VALIDATOR_REQUIRE()]}
          errorText="Please enter a valid Date."
          onInput={inputHandler}
        />

        <Input
          id="know"
          element="text"
          type="text"
          label="Any additional comments regarding the hardware store?"
          validators={[VALIDATOR_REQUIRE()]}
          errorText="Please enter a valid reason"
          onInput={inputHandler}
        />
        <Input
          id="help"
          element="text"
          type="text"
          label="How helpful the staff?"
          validators={[VALIDATOR_REQUIRE()]}
          errorText="Please enter a valid contact no."
          onInput={inputHandler}
        />
        <Input
          id="reccomend"
          element="input"
          type="number"
          label="Rate Us"
          validators={[VALIDATOR_REQUIRE(),VALIDATOR_TEL()]}
          errorText="Please enter a valid Number."
          onInput={inputHandler}
        />

          <Input
          id="easy"
          element="select"
          label="Are you happy with checkout experience?"
          options={[
            { value: "", label: "Select type" , disabled: true },
            { value: "good", label: "good" },
            { value: "good", label: "Execellent" },
            { value: "good", label: "Poor" },
            { value: "good", label: "Normal" },
           
           
          ]}
          onInput={inputHandler}
          validators={[VALIDATOR_REQUIRE()]}
          errorText="Please select an option."
         
        />


      <Input
          id="happy"
          element="radio"
          label="Are you satisfied with our service?"
          options={[
            { value: "yes", label: "Yes" },
            { value: "no", label: "No" },
          ]}
          onInput={inputHandler}
          validators={[VALIDATOR_REQUIRE()]}
          errorText="Please select an option."
        />
        <div>
          <Button type="submit" disabled={!formState.isValid}>
            ADD
          </Button>
        </div>
      </form>
    </React.Fragment>
  );
};

export default AddFeedback;
