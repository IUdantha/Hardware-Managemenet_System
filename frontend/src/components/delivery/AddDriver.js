import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import Input from "../../components/delivery/FormElements/Input";
import Button from "../../components/delivery/FormElements/Button";
import Button2 from "../../components/delivery/FormElements/Button2";
import LoadingSpinner from "../../components/Spinner";
import ErrorModal from "../../components/delivery/UIElements/ErrorModal";
import {
  VALIDATOR_REQUIRE,
  VALIDATOR_EMAIL,
  VALIDATOR_TEL,
} from "../../features/delivery/validators";
import { useForm } from "../../features/delivery/form-hook";
import { useHttpClient } from "../../features/delivery/http-hook";

import AdminCheck from "../../components/auth/AdminCheck";
import Sidebar from "../../components/delivery/Sidebar";

const AddDriver = () => {
  const { isLoading, error, sendRequest, clearError } = useHttpClient();

  const navigate = useNavigate();

  const [formState, inputHandler] = useForm(
    {
      name: {
        value: "",
        isValid: false,
      },
      nic: {
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
      address: {
        value: "",
        isValid: false,
      },
      licenceNo: {
        value: "",
        isValid: false,
      },
      plateNo: {
        value: "",
        isValid: false,
      },
    },
    false
  );

  const driverAddSubmitHandler = async (event) => {
    event.preventDefault();
    try {
      await sendRequest(
        `http://localhost:5000/api/drivers/`,
        "POST",
        JSON.stringify({
          name: formState.inputs.name.value,
          nic: formState.inputs.nic.value,
          email: formState.inputs.email.value,
          contact: formState.inputs.contact.value,
          address: formState.inputs.address.value,
          licenceNo: formState.inputs.licenceNo.value,
          plateNo: formState.inputs.plateNo.value,
        }),
        {
          "Content-Type": "application/json",
        }
      );
      // Add notification to the "notifications" collection
      const notificationData = {
        message: "Driver record added",
        dateTime: new Date().toISOString(),
      };

      await sendRequest(
        `http://localhost:5000/api/notifications/`,
        "POST",
        JSON.stringify(notificationData),
        {
          "Content-Type": "application/json",
        }
      );
    } catch (err) {}
    navigate("/driverDetails");
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
      <form className="payment-form" onSubmit={driverAddSubmitHandler}>
        <h2>Add Driver Details</h2>
        <br />
        <Input
          id="name"
          element="input"
          type="text"
          label="Driver Name"
          validators={[VALIDATOR_REQUIRE()]}
          errorText="Please enter a name."
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
        <Input
          id="licenceNo"
          element="input"
          type="text"
          label="Licence Number"
          validators={[VALIDATOR_REQUIRE()]}
          errorText="Please enter a valid licence number"
          onInput={inputHandler}
        />

        <Input
          id="plateNo"
          element="input"
          type="text"
          label="Plate Number"
          validators={[VALIDATOR_REQUIRE()]}
          errorText="Please enter a valid plate number"
          onInput={inputHandler}
        />

        <div>
          <Button type="submit" disabled={!formState.isValid}>
            ADD
          </Button>
          <Button2 onClick={() => navigate("/driverDetails")}>CANCEL</Button2>
        </div>
      </form>
    </React.Fragment>
  );
};

export default AddDriver;
