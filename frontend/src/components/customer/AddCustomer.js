import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import Input from "../../components/customer/FormElements/Input";
import Button from "../../components/customer/FormElements/Button";
import Button2 from "../../components/customer/FormElements/Button2";
import LoadingSpinner from "../../components/Spinner";
import ErrorModal from "../../components/customer/UIElements/ErrorModal";
import { VALIDATOR_REQUIRE, VALIDATOR_EMAIL, VALIDATOR_TEL} from "../../features/customer/validators";
import { useForm } from "../../features/customer/form-hook";
import { useHttpClient } from "../../features/customer/http-hook";
import AdminCheck from "../../components/auth/AdminCheck";
import Sidebar from "../../components/customer/Sidebar";

const AddCustomer = () => {
  const { isLoading, error, sendRequest, clearError } = useHttpClient();

  const navigate = useNavigate();

  const [formState, inputHandler] = useForm(

    {
      recNub: {
        value: "",
        isValid: false,
      },
    
      name: {
        value: "",
        isValid: false,
      },
      email: {
        value: "",
        isValid: false,
      },

      password: {
        value: "",
        isValid: false,
      },

      password2: {
        value: "",
        isValid: false,
      },


      type: {
        value: "",
        isValid: false,
      },


      nic: {
        value: "",
        isValid: false,
      },

      date: {
        value: "",
        isValid: false,
      },

      contact: {
        value: "",
        isValid: false,
      },
      address: {
        value: "",
        isValid: false,
      },
    },
    false
  );

  const customerAddSubmitHandler = async (event) => {
    event.preventDefault();
    try { //customer
      if(formState.inputs.password.value === formState.inputs.password2.value){
      await sendRequest(
        `http://localhost:5000/api/customers/`,
        "POST",
        JSON.stringify({
          recNub: formState.inputs.recNub.value,
          name: formState.inputs.name.value,
          email: formState.inputs.email.value,
          type: formState.inputs.type.value,
          nic: formState.inputs.nic.value,
          date: formState.inputs.date.value,
          contact: formState.inputs.contact.value,
          address: formState.inputs.address.value,
        }),

        {
          "Content-Type": "application/json",
        }
      );

        //User
        await sendRequest(
          `http://localhost:5000/api/users/`,
          "POST",
          JSON.stringify({
            name: formState.inputs.name.value,
            email: formState.inputs.email.value,
            password: formState.inputs.password.value,
            type: formState.inputs.type.value,
   
          }),

          {
            "Content-Type": "application/json",
          }
        );
        navigate("/customerDetails");
      }else{
        alert("Passowrds do not match!");
      }
    


      // history.push("/" + auth.userId + "/payments");
    } catch (err) {}
   
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
      <AdminCheck />
      {/* <ErrorModal error={error} onClear={clearError} /> */}
      <form className="payment-form" onSubmit={customerAddSubmitHandler}>
        <h2>Add a new Customer</h2>
        <br />

        <Input
          id="recNub"
          element="input"
          type="number"
          label="Record Number"
          validators={[VALIDATOR_REQUIRE()]}
          errorText="Please enter a valid Record number."
          onInput={inputHandler}
        />
        
        <Input
          id="name"
          element="input"
          type="text"
          label="Customer Name"
          validators={[VALIDATOR_REQUIRE()]}
          errorText="Please enter a valid customer name."
          onInput={inputHandler}
        />
        <Input
          id="email"
          element="input"
          type="email"
          label="E-mail"
          validators={[VALIDATOR_REQUIRE(), VALIDATOR_EMAIL()]}
          errorText="Please enter a valid e-mail."
          onInput={inputHandler}
        />

          <Input
          id="password"
          element="input"
          type="password"
          label="Password"
          validators={[VALIDATOR_REQUIRE()]}
          errorText="Please enter a valid password."
          onInput={inputHandler}
        />
        <Input
          id="password2"
          element="input"
          type="password"
          label="Re-enter password"
          validators={[VALIDATOR_REQUIRE()]}
          errorText="Please enter your password again."
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
          id="nic"
          element="input"
          type="text"
          label="NIC"
          validators={[VALIDATOR_REQUIRE()]}
          errorText="Please enter a valid nic."
          onInput={inputHandler}
        />

        <Input
          id="date"
          element="input"
          type="date"
          label="Register Date"
          validators={[VALIDATOR_REQUIRE()]}
          errorText="Please enter a valid Date."
          onInput={inputHandler}
        />

        <Input
          id="contact"
          element="input"
          type="number"
          label="Contact No"
          validators={[VALIDATOR_REQUIRE(), VALIDATOR_TEL()]}
          errorText="Please enter a valid contact no."
          onInput={inputHandler}
        />
        <Input
          id="address"
          element="text"
          type="text"
          label="Address"
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

export default AddCustomer;
