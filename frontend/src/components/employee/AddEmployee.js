import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import Input from "../../components/employee/FormElements/Input";
import Button from "../../components/employee/FormElements/Button";
import Button2 from "../../components/employee/FormElements/Button2";
import LoadingSpinner from "../../components/Spinner";
import ErrorModal from "./UIElements/ErrorModal";
import { VALIDATOR_REQUIRE, VALIDATOR_TEL, VALIDATOR_EMAIL } from "../../features/employee/validators";
import { useForm } from "../../features/employee/form-hook";
import { useHttpClient } from "../../features/employee/http-hook";    

import AdminCheck from "../../components/auth/AdminCheck";
import EmpSideBar from "../../components/employee/EmpSideBar";

const AddEmployee = () => {
  const { isLoading, error, sendRequest, clearError } = useHttpClient();

  const navigate = useNavigate();

  const [formState, inputHandler] = useForm(
    {
      empid: {
        value: "",
        isValid: false,
      },
        name: {
        value: "",
        isValid: false,
      },
      nic: {
        value: "",
        isValid: false,
      },
      /*
      type: {
        value: "",
        isValid: false,
      },*/
      email: {
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
      gender: {
        value: "",
        isValid: false,
      },
      age: {
        value: "",
        isValid: false,
      },
      password: {
        value: "",
        isValid: false,
      },
    },
    false
  );

  const employeeAddSubmitHandler = async (event) => {
    event.preventDefault();
    try {
      await sendRequest(
        `http://localhost:5000/api/employees/`,
        "POST",
        JSON.stringify({
          empid: formState.inputs.empid.value,
          name: formState.inputs.name.value,
          nic: formState.inputs.nic.value,
          //type: formState.inputs.type.value,
          email: formState.inputs.email.value,
          contact: formState.inputs.contact.value,
          address: formState.inputs.address.value,
          gender: formState.inputs.gender.value,
          age: formState.inputs.age.value,
          password: formState.inputs.password.value,
          

          
        }),
        {
          "Content-Type": "application/json",
        }
      );
      // history.push("/" + auth.userId + "/employees");
    } catch (err) {}
    navigate("/employeeDetails");
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
      <form className="payment-form" onSubmit={employeeAddSubmitHandler}>
        <h2>Add new Employee</h2>
        <br />
        <Input
          id="empid"
          element="input"
          type="text"
          label="Employee ID"
          validators={[VALIDATOR_REQUIRE()]}
          errorText="Please enter a valid employee id."
          onInput={inputHandler}
        />
        <Input
          id="name"
          element="input"
          type="text"
          label="Name"
          validators={[VALIDATOR_REQUIRE()]}
          errorText="Please enter a valid name."
          onInput={inputHandler}
        />
        <Input
          id="nic"
          element="input"
          type="text"
          label="NIC"
          validators={[VALIDATOR_REQUIRE()]}
          errorText="Please enter a valid nic number."
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
          id="contact"
          element="input"
          type="number"
          label="contact"
          validators={[VALIDATOR_REQUIRE(), VALIDATOR_TEL()]}
          errorText="Please enter a valid number."
          onInput={inputHandler}
        />
        <Input
          id="address"
          element="input"
          type="text"
          label="Address"
          validators={[VALIDATOR_REQUIRE()]}
          errorText="Please enter a valid Address."
          onInput={inputHandler}
          />
        <Input
          id="gender"
          element="radio"
          label="Gender"
          options={[
            { value: "male", label: "Male" },
            { value: "female", label: "Female" },
          ]}
          onInput={inputHandler}
          validators={[VALIDATOR_REQUIRE()]}
          errorText="Please select an option."
        />
        {/* <Input
          id="gender"
          element="input"
          type="text"
          label="gender"
          validators={[VALIDATOR_REQUIRE()]}
          errorText="Please enter a valid gender."
          onInput={inputHandler}
        /> */}
        <Input
          id="age"
          element="input"
          type="number"
          label="Age"
          validators={[VALIDATOR_REQUIRE()]}
          errorText="Please enter a valid age."
          onInput={inputHandler}
        />
        <Input
          id="password"
          element="input"
          type="text"
          label="password"
          validators={[VALIDATOR_REQUIRE()]}
          errorText="Please enter a valid password."
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

export default AddEmployee;
