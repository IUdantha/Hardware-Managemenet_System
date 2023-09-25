import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import Input from "../../components/customer/FormElements/Input";
import Button from "../../components/customer/FormElements/Button";
import Button2 from "../../components/customer/FormElements/Button2";
import LoadingSpinner from "../../components/Spinner";
import ErrorModal from "../../components/customer/UIElements/ErrorModal";
import { VALIDATOR_REQUIRE } from "../../features/customer/validators";
import { useForm } from "../../features/customer/form-hook";
import { useHttpClient } from "../../features/customer/http-hook";

import CustomerCheck from "../../components/auth//CustomerCheck";
import Sidebar from "../../components/customer/Sidebar";

const AddInquire = () => {
  const { isLoading, error, sendRequest, clearError } = useHttpClient();

  const navigate = useNavigate();

  const [formState, inputHandler] = useForm(

    {
      name: {
        value: "",
        isValid: false,
      },
    
      customId: {
        value: "",
        isValid: false,
      },

      email: {
        value: "",
        isValid: false,
      },

      contact: {
        value: "",
        isValid: false,
      },
      type: {
        value: "",
        isValid: false,
      },

      address: {
        value: "",
        isValid: false,
      },


     /* date: {
        value: "",
        isValid: false,
      },*/

  

      
    },
    false
  );

  const inquireAddSubmitHandler = async (event) => {
    event.preventDefault();
    try {
      await sendRequest(
        `http://localhost:5000/api/inquires/`,
        "POST",
        JSON.stringify({
          name: formState.inputs.name.value,
          customId: formState.inputs.customId.value,
          email: formState.inputs.email.value,
          contact: formState.inputs.contact.value,
          type: formState.inputs.type.value,
          address: formState.inputs.address.value,
          
        }),
        {
          "Content-Type": "application/json",
        }
      );
      // history.push("/" + auth.userId + "/payments");
    } catch (err) {}
    navigate("/inquireDetails");
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
      <form className="inquire-form" onSubmit={inquireAddSubmitHandler}>
        <h2>Add Inquires</h2>
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
          id="customId"
          element="input"
          type="number"
          label="Record No"
          validators={[VALIDATOR_REQUIRE()]}
          errorText="Please enter a valid customer Id."
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
          id="contact"
          element="input"
          type="number"
          label="Contact No"
          validators={[VALIDATOR_REQUIRE()]}
          errorText="Please enter a valid contact no."
          onInput={inputHandler}
        />
        <Input
            id="type"
            element="input"
            type="text"
            label="Inquire "
            validators={[VALIDATOR_REQUIRE()]}
            errorText="Please enter a valid inquire."
            onInput={inputHandler}
                />
    

        <Input
          id="address"
          element="text"
          type="text"
          label="Item"
          validators={[VALIDATOR_REQUIRE()]}
          errorText="Please enter a valid address"
          onInput={inputHandler}
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

export default AddInquire;
