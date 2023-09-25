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
} from "../../features/finance/validators";
import { useForm } from "../../features/finance/form-hook";
import { useHttpClient } from "../../features/finance/http-hook";
import "../../pages/finance/PaymentForm.css";
import AdminCheck from "../../components/auth/AdminCheck";
import Sidebar from "../../components/finance/Sidebar";

const AddLoan = () => {
  const { isLoading, error, sendRequest, clearError } = useHttpClient();

  const navigate = useNavigate();

  const [formState, inputHandler] = useForm(
    {
      loanNum: {
        value: "",
        isValid: false,
      },
      loanType: {
        value: "",
        isValid: false,
      },
      amount: {
        value: "",
        isValid: false,
      },
      interest: {
        value: "",
        isValid: false,
      },
      period: {
        value: "",
        isValid: false,
      },
      monthPayment: {
        value: "",
        isValid: false,
      },
    },
    false
  );

  const loanAddSubmitHandler = async (event) => {
    event.preventDefault();
    try {
      await sendRequest(
        `http://localhost:5000/api/loans/`,
        "POST",
        JSON.stringify({
          loanNum: formState.inputs.loanNum.value,
          loanType: formState.inputs.loanType.value,
          amount: formState.inputs.amount.value,
          interest: formState.inputs.interest.value,
          period: formState.inputs.period.value,
          monthPayment: formState.inputs.monthPayment.value,
        }),
        {
          "Content-Type": "application/json",
        }
      );

      // Add notification to the "notifications" collection
      const notificationData = {
        message: "Loan record added",
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
    } catch (err) {
      console.log("There is an error!" + err);
    }
    navigate("/financeLoans");
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
      <ErrorModal error={error} onClear={clearError} />
      <form className="payment-form" onSubmit={loanAddSubmitHandler}>
        <h2>
          <center>Add new Loan or Debit</center>
        </h2>
        <br />
        <Input
          id="loanNum"
          element="input"
          type="number"
          label="Loan Number"
          validators={[VALIDATOR_REQUIRE(), VALIDATOR_MIN(0)]}
          minVal={0}
          errorText="Please enter a valid Loan number."
          onInput={inputHandler}
        />
        <Input
          id="loanType"
          element="input"
          type="text"
          label="Loan Type"
          validators={[VALIDATOR_REQUIRE()]}
          errorText="Please enter a valid Loan type."
          onInput={inputHandler}
        />
        <Input
          id="amount"
          element="input"
          type="number"
          label="Amount"
          validators={[VALIDATOR_REQUIRE(), VALIDATOR_MIN(0)]}
          minVal={0}
          errorText="Please enter a valid Amount."
          onInput={inputHandler}
        />

        <Input
          id="interest"
          step="any"
          element="input"
          type="number"
          label="Interest"
          validators={[VALIDATOR_REQUIRE(), VALIDATOR_MIN(0)]}
          minVal={0}
          errorText="Please enter a valid interest."
          onInput={inputHandler}
        />
        <Input
          id="period"
          element="input"
          type="number"
          label="Period"
          validators={[VALIDATOR_REQUIRE(), VALIDATOR_MIN(0)]}
          minVal={0}
          errorText="Please enter a valid Period."
          onInput={inputHandler}
        />
        <Input
          id="monthPayment"
          element="input"
          type="number"
          label="Monthly Payment"
          validators={[VALIDATOR_REQUIRE(), VALIDATOR_MIN(0)]}
          minVal={0}
          errorText="Please enter a valid Monthly Payment."
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

export default AddLoan;
