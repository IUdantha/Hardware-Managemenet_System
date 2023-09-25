import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import Input from "../../components/finance/FormElements/Input";
import Button from "../../components/finance/FormElements/Button";
import Button2 from "../../components/finance/FormElements/Button2";
import LoadingSpinner from "../../components/Spinner";
import ErrorModal from "../../components/finance/UIElements/ErrorModal";
import {
  VALIDATOR_REQUIRE,
  VALIDATOR_MIN,
  VALIDATOR_MAX,
} from "../../features/finance/validators";
import { useForm } from "../../features/finance/form-hook";
import { useHttpClient } from "../../features/finance/http-hook";
import "../../pages/finance/PaymentForm.css";
import AdminCheck from "../../components/auth/AdminCheck";
import Sidebar from "../../components/finance/Sidebar";

const AddMaintenance = () => {
  const { isLoading, error, sendRequest, clearError } = useHttpClient();

  const navigate = useNavigate();

  const [formState, inputHandler] = useForm(
    {
      recNub: {
        value: "",
        isValid: false,
      },
      description: {
        value: "",
        isValid: false,
      },
      type: {
        value: "",
        isValid: false,
      },
      date: {
        value: "",
        isValid: false,
      },
      amount: {
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

  const maintenanceAddSubmitHandler = async (event) => {
    event.preventDefault();
    try {
      await sendRequest(
        `http://localhost:5000/api/payments/`,
        "POST",
        JSON.stringify({
          recNub: formState.inputs.recNub.value,
          description: formState.inputs.description.value,
          type: formState.inputs.type.value,
          date: formState.inputs.date.value,
          amount: formState.inputs.amount.value,
          note: formState.inputs.note.value,
        }),
        {
          "Content-Type": "application/json",
        }
      );

      // Add notification to the "notifications" collection
      const notificationData = {
        message: "Payment record added",
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
    navigate("/financePayments");
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
      <form className="payment-form" onSubmit={maintenanceAddSubmitHandler}>
        <h2>Add new Maintenance Payment</h2>
        <br />
        <Input
          id="recNub"
          element="input"
          type="number"
          label="Record Number"
          validators={[VALIDATOR_REQUIRE(), VALIDATOR_MIN(0)]}
          minVal={0}
          errorText="Please enter a valid Record number."
          onInput={inputHandler}
        />
        <Input
          id="description"
          element="input"
          type="text"
          label="Description"
          validators={[VALIDATOR_REQUIRE()]}
          errorText="Please enter a valid description."
          onInput={inputHandler}
        />
        <Input
          id="type"
          element="select"
          label="Type"
          options={[
            { value: "", label: "Select the Type", disabled: true },
            { value: "Income", label: "Income" },
            { value: "Outgoing", label: "Outgoing" },
          ]}
          validators={[VALIDATOR_REQUIRE()]}
          errorText="Please enter a valid type."
          onInput={inputHandler}
        />

        <Input
          id="date"
          element="input"
          type="date"
          label="Date"
          validators={[VALIDATOR_REQUIRE()]}
          errorText="Please enter a valid date."
          onInput={inputHandler}
        />
        <Input
          id="amount"
          element="input"
          type="number"
          label="Amount"
          validators={[
            VALIDATOR_REQUIRE(),
            VALIDATOR_MIN(100),
            VALIDATOR_MAX(100000),
          ]}
          minVal={0}
          errorText="Please enter a valid Amount."
          onInput={inputHandler}
        />
        <Input
          id="note"
          element="text"
          type="text"
          label="Note"
          validators={[VALIDATOR_REQUIRE()]}
          errorText="Please enter a valid note about what you updated"
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

export default AddMaintenance;
