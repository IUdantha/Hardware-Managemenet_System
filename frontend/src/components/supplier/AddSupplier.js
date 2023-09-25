import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import Input from "./FormElements/Input";
import Button from "./FormElements/Button";
import Button2 from "./FormElements/Button2";
import LoadingSpinner from "../Spinner";
import ErrorModal from "./UIElements/ErrorModal";
import { VALIDATOR_REQUIRE } from "../../features/supplier/validators";
import { useForm } from "../../features/supplier/form-hook";
import { useHttpClient } from "../../features/supplier/http-hook";
import AdminCheck from "../auth/AdminCheck";
import Sidebar from "./Sidebar";

const AddSupplier = () => {
  const { isLoading, error, sendRequest, clearError } = useHttpClient();

  const navigate = useNavigate();

  const [formState, inputHandler] = useForm(
    {
      supplierId: {
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
      contact: {
        value: "",
        isValid: false,
      },
      address: {
        value: "",
        isValid: false,
      },
      itemId: {
        value: "",
        isValid: false,
      },
      contractId: {
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
    },
    false
  );

  const addSupplierHandler = async (event) => {
    event.preventDefault();
    try {
      await sendRequest(
        `http://localhost:5000/api/suppliers/`,
        "POST",
        JSON.stringify({
          supplierId: formState.inputs.supplierId.value,
          name: formState.inputs.name.value,
          nic: formState.inputs.nic.value,
          contact: formState.inputs.contact.value,
          address: formState.inputs.address.value,
          itemId: formState.inputs.itemId.value,
          contractId: formState.inputs.contractId.value,
          email: formState.inputs.email.value,
          password: formState.inputs.password.value,
        }),
        {
          "Content-Type": "application/json",
        }
      );
      // history.push("/" + auth.userId + "/payments");
      // Add notification to the "notifications" collection
      const notificationData = {
        message: "Supplier added",
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
    navigate("/displaySuppliers");
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
      <form className="payment-form" onSubmit={addSupplierHandler}>
        <h2>Add new Supplier</h2>
        <br />
        <Input
          id="supplierId"
          element="input"
          type="text"
          label="Supplier ID"
          validators={[VALIDATOR_REQUIRE()]}
          errorText="Please enter a valid ID."
          onInput={inputHandler}
        />
        <Input
          id="name"
          element="input"
          type="text"
          label="name"
          validators={[VALIDATOR_REQUIRE()]}
          errorText="Please enter the name."
          onInput={inputHandler}
        />
        <Input
          id="nic"
          element="input"
          type="text"
          label="nic"
          validators={[VALIDATOR_REQUIRE()]}
          errorText="Please enter the NIC."
          onInput={inputHandler}
        />

        <Input
          id="contact"
          element="input"
          type="number"
          label="contact"
          validators={[VALIDATOR_REQUIRE()]}
          errorText="Please enter the Contact Number."
          onInput={inputHandler}
        />
        <Input
          id="itemId"
          element="input"
          type="text"
          label="itemID"
          validators={[VALIDATOR_REQUIRE()]}
          errorText="Please enter a valid ItemId."
          onInput={inputHandler}
        />
        <Input
          id="address"
          element="text"
          type="text"
          label="address"
          validators={[VALIDATOR_REQUIRE()]}
          errorText="Please enter a valid address"
          onInput={inputHandler}
        />
        <Input
          id="contractId"
          element="input"
          type="text"
          label="contractID"
          validators={[VALIDATOR_REQUIRE()]}
          errorText="Please enter a valid ID"
          onInput={inputHandler}
        />
        <Input
          id="email"
          element="input"
          type="email"
          label="email"
          validators={[VALIDATOR_REQUIRE()]}
          errorText="Please enter a valid email"
          onInput={inputHandler}
        />

        <Input
          id="password"
          element="input"
          type="text"
          label="password"
          validators={[VALIDATOR_REQUIRE()]}
          errorText="Please enter a password"
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

export default AddSupplier;
