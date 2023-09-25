import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import Input from "../../components/employee/FormElements/Input";
import Button from "../../components/employee/FormElements/Button";
import Button2 from "../../components/employee/FormElements/Button2";
import LoadingSpinner from "../../components/Spinner";
import ErrorModal from "./UIElements/ErrorModal";
import { VALIDATOR_REQUIRE } from "../../features/employee/validators";
import { useForm } from "../../features/employee/form-hook";
import { useHttpClient } from "../../features/employee/http-hook";    

import EmployeeCheck from "../../components/auth/EmployeeCheck";
import EmployeeSideBar from "../../components/employee/EmployeeSideBar";

const CreateLeave = () => {
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
        reason: {
          value: "",
          isValid: false,
        },
        date: {
          value: "",
          isValid: false,
        },
        time: {
          value: "",
          isValid: false,
        },
        note: {
          value: "",
          isValid: false,
        },
      },
      false
    );

  const employeeReqSubmitHandler = async (event) => {
    event.preventDefault();
    try {
      await sendRequest(
        `http://localhost:5000/api/leaves/`,
        "POST",
        JSON.stringify({
          empid: formState.inputs.empid.value,
          name: formState.inputs.name.value,
          reason: formState.inputs.reason.value,
          date: formState.inputs.date.value,
          time: formState.inputs.time.value,
          note: formState.inputs.note.value,
                    
        }),
        {
          "Content-Type": "application/json",
        }
      );
      // history.push("/" + auth.userId + "/employees");
    } catch (err) {}
    navigate("/ManagerCheckLeave");
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
      <EmployeeCheck />
      {/* <ErrorModal error={error} onClear={clearError} /> */}
      <form className="payment-form" onSubmit={employeeReqSubmitHandler}>
        <h2>Leave Form</h2>
        <br />
        <Input
          id="empid"
          element="input"
          type="text"
          label="Employee ID"
          validators={[VALIDATOR_REQUIRE()]}
          errorText="please complete the field."
          onInput={inputHandler}
        />
        <Input
          id="name"
          element="input"
          type="text"
          label="Name"
          validators={[VALIDATOR_REQUIRE()]}
          errorText="please complete the field."
          onInput={inputHandler}
        />
        <Input
          id="reason"
          element="input"
          type="text"
          label="Reason"
          validators={[VALIDATOR_REQUIRE()]}
          errorText="please complete the field."
          onInput={inputHandler}
        />

        <Input
          id="date"
          element="input"
          type="date"
          label="Date"
          validators={[VALIDATOR_REQUIRE()]}
          errorText="please complete the field."
          onInput={inputHandler}
        />
        <Input
          id="time"
          element="input"
          type="time"
          label="Time"
          validators={[VALIDATOR_REQUIRE()]}
          errorText="please complete the field."
          onInput={inputHandler}
        />
    
        <Input
          id="note"
          element="text"
          type="text"
          label="Note"
          validators={[VALIDATOR_REQUIRE()]}
          errorText="please complete the field."
          onInput={inputHandler}
        />
     
     
        <div>
          <Button type="submit" disabled={!formState.isValid}>
            Submit
          </Button>
        </div>
      </form>
    </React.Fragment>
  );
};

export default CreateLeave;
