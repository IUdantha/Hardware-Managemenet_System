import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import Input from "../../components/auth/FormElements/Input";
import Button from "../../components/auth/FormElements/Button";
import Button2 from "../../components/auth/FormElements/Button2";
import LoadingSpinner from "../../components/Spinner";
import ErrorModal from "../../components/auth/UIElements/ErrorModal";
import { VALIDATOR_REQUIRE , VALIDATOR_EMAIL, VALIDATOR_TEL, VALIDATOR_PASSWORD} from "../../features/auth/validators";
import { useForm } from "../../features/auth/form-hook";
import { useHttpClient } from "../../features/auth/http-hook";
import AdminCheck from "../../components/auth/AdminCheck";
import AdminSideBar from "../../components/auth/AdminSideBar";

const AddManager = () => {
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
      password: {
        value: "",
        isValid: false,
      },
      password2: {
        value: "",
        isValid: false,
      },
      nic: {
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

  const managerAddSubmitHandler = async (event) => {
    event.preventDefault();
    try {
      //Manager
      if(formState.inputs.password.value === formState.inputs.password2.value){
        await sendRequest(
          `http://localhost:5000/api/managers/`,
          "POST",
          JSON.stringify({
            name: formState.inputs.name.value,
            email: formState.inputs.email.value,
            nic: formState.inputs.nic.value,
            contact: formState.inputs.contact.value,
            address: formState.inputs.address.value,
            password: formState.inputs.password.value,
   
          }),
          {
            "Content-Type": "application/json",
          }
        );
       
        navigate("/managerDetails");
        
      }else{
        alert("Passwords do not match!");
      }
    
      // history.push("/" + auth.userId + "/payments");
    } catch (err) {
      
    }

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
      <AdminSideBar>
         <AdminCheck />
           <div className="page-content">
             <div className="white-box">
      {/* <ErrorModal error={error} onClear={clearError} /> */}
      <form className="payment-form" onSubmit={managerAddSubmitHandler}>
        <h2>Register Managers</h2>
        <br />
        <Input
          id="name"
          element="input"
          type="text"
          label="Manager Name"
          validators={[VALIDATOR_REQUIRE()]}
          errorText="Please enter a name."
          onInput={inputHandler}
        />
        <Input
          id="email"
          element="input"
          type="email"
          label="Email"
          validators={[VALIDATOR_REQUIRE(), VALIDATOR_EMAIL()]}
          errorText="Please enter a valid email."
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
          id="nic"
          element="input"
          type="text"
          label="NIC Number"
          validators={[VALIDATOR_REQUIRE()]}
          errorText="Please enter a valid nic number."
          onInput={inputHandler}
        />
    

        <Input
          id="contact"
          element="input"
          type="number"
          label="Contact Number"
          validators={[VALIDATOR_REQUIRE(), VALIDATOR_TEL()]}
          errorText="Please enter a valid contact number."
          onInput={inputHandler}
        />
        <Input
          id="address"
          element="text"
          type="text"
          label="Address"
          validators={[VALIDATOR_REQUIRE()]}
          errorText="Please enter a valid Address."
          onInput={inputHandler}
        />
        

        <div>
          <Button type="submit" disabled={!formState.isValid}>
            ADD
          </Button>
        </div>
      </form>
      </div>
      </div>
      </AdminSideBar>
    </React.Fragment>
  );
};

export default AddManager;
