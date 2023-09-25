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
import ManagerCheck from "../auth/ManagerCheck";
import Sidebar from "./Sidebar";

const AddContract = () => {
  const { isLoading, error, sendRequest, clearError } = useHttpClient();

  const navigate = useNavigate();

  const [formState, inputHandler] = useForm(
    {
      contractId: {
        value: "",
        isValid: false,
      },
      validFrom: {
        value: "",
        isValid: false,
      },
      validTill: {
        value: "",
        isValid: false,
      },
      description: {
        value: "",
        isValid: false,
      },
    },
    false
  );

  const addContractHandler = async (event) => {
    event.preventDefault();
    try {
      await sendRequest(
        `http://localhost:5000/api/contracts/`,
        "POST",
        JSON.stringify({
          contractId: formState.inputs.contractId.value,
          validFrom: formState.inputs.validFrom.value,
          validTill: formState.inputs.validTill.value,
          description: formState.inputs.description.value,
        }),
        {
          "Content-Type": "application/json",
        }
      );
      // history.push("/" + auth.userId + "/payments");
    } catch (err) {}
    navigate("/displayContracts");
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
      <ManagerCheck />
      {/* <ErrorModal error={error} onClear={clearError} /> */}
      <form className="payment-form" onSubmit={addContractHandler}>
        <h2>Add new Contract</h2>
        <br />
        <Input
          id="contractId"
          element="input"
          type="text"
          label="Contract ID"
          validators={[VALIDATOR_REQUIRE()]}
          errorText="Please enter a valid ID."
          onInput={inputHandler}
        />
        <Input
          id="validFrom"
          element="input"
          type="date"
          label="Valid From"
          validators={[VALIDATOR_REQUIRE()]}
          errorText="Please enter a valid date."
          onInput={inputHandler}
        />
        <Input
          id="validTill"
          element="input"
          type="date"
          label="Valid Till"
          validators={[VALIDATOR_REQUIRE()]}
          errorText="Please enter a valid date."
          onInput={inputHandler}
        />

        <Input
          id="description"
          element="input"
          type="text"
          label="Description"
          validators={[VALIDATOR_REQUIRE()]}
          errorText="Please enter the Description."
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

export default AddContract;
