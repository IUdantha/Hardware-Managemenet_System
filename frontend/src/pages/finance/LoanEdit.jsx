import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

import Input from "../../components/finance/FormElements/Input";
import Button from "../../components/finance/FormElements/Button";
import Button2 from "../../components/finance/FormElements/Button2";
import LoadingSpinner from "../../components/Spinner";
import ErrorModal from "../../components/finance/UIElements/ErrorModal";
import {
  VALIDATOR_REQUIRE, VALIDATOR_MIN,
} from "../../features/finance/validators";
import { useForm } from "../../features/finance/form-hook";
import { useHttpClient } from "../../features/finance/http-hook";
import "./PaymentForm.css";
import AdminCheck from '../../components/auth/AdminCheck'
import Sidebar from '../../components/finance/Sidebar';
import Modal from "../../features/finance/Modal"


const LoanEdit = () => {
  const { isLoading, error, sendRequest, clearError } = useHttpClient();
  const [loadedLoan, setLoadedLoan] = useState();
  const [showDeleteConfirmModal, setDeleteShowConfirmModal] = useState(false);
  const [showUpdateConfirmModal, setUpdateShowConfirmModal] = useState(false);
  const loanId = useParams().loanId;
  const navigate = useNavigate();

  const showDeleteWarningHandler = () => {
    setDeleteShowConfirmModal(true);
  };

  const cancelDeleteHandler = () => {
    setDeleteShowConfirmModal(false);
  };

  const showUpdateWarningHandler = () => {
    setUpdateShowConfirmModal(true);
  };

  const cancelUpdateHandler = () => {
    setUpdateShowConfirmModal(false);
  };

  const [formState, inputHandler, setFormData] = useForm(
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

  useEffect(() => {
    const fetchLoan = async () => {
      try {
        const responseData = await sendRequest(
          `http://localhost:5000/api/loans/${loanId}`
        );
        setLoadedLoan(responseData.loan);
        setFormData(
          {
            loanNum: {
              value: responseData.loan.loanNum,
              isValid: true,
            },
            loanType: {
              value: responseData.loan.loanType,
              isValid: true,
            },
            amount: {
              value: responseData.loan.amount,
              isValid: false,
            },
            interest: {
              value: responseData.loan.interest,
              isValid: false,
            },
            period: {
              value: responseData.loan.period,
              isValid: false,
            },
            monthPayment: {
              value: responseData.loan.monthPayment,
              isValid: false,
            },
          },
          true
        );
      } catch (err) {}
    };
    fetchLoan();
  }, [sendRequest, loanId, setFormData]);

  const loanUpdateSubmitHandler = async (event) => {
    event.preventDefault();
    try {
      await sendRequest(
        `http://localhost:5000/api/loans/${loanId}`,
        "PATCH",
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
        message: "Loan record updated",
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
    navigate("/financeLoans");
  };

  const confirmDeleteHandler = async () => {
    try {
      await sendRequest(
        `http://localhost:5000/api/loans/${loanId}`,
        'DELETE'
      );
      // Add notification to the "notifications" collection
      const notificationData = {
        message: "Loan record deleted",
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
      <Modal
        show={showDeleteConfirmModal}//showDeleteConfirmModal
        onCancel={cancelDeleteHandler}
        header="Are you sure?"
        footerClass="place-item__modal-actions"
        footer={
          <React.Fragment>
            <Button onClick={confirmDeleteHandler}>
              CONFIRM
            </Button>
            <Button2 onClick={cancelDeleteHandler}>
              CANCEL
            </Button2>
          </React.Fragment>
        }
        >
        <p>
          Do you want to proceed and delete this payment Record? Please note that it
          can't be undone thereafter.
        </p>
      </Modal>
      <Modal
        show={showUpdateConfirmModal}
        onCancel={cancelUpdateHandler}
        header="Are you sure?"
        footerClass="place-item__modal-actions"
        footer={
          <React.Fragment>
            <Button onClick={loanUpdateSubmitHandler}>
              CONFIRM
            </Button>
            <Button2 onClick={cancelUpdateHandler}>
              CANCEL
            </Button2>
          </React.Fragment>
        }
        >
        <p>
          After confirmation, the update will success!
        </p>
      </Modal>
      <AdminCheck />
      <Sidebar>
      {/* <ErrorModal error={error} onClear={clearError} /> */}
      <h2>LOANS & DEBITS</h2>
      {!isLoading && loadedLoan && (
        <form className="payment-form" onSubmit={loanUpdateSubmitHandler}>
            <h3>#{loadedLoan.loanNum} - Loan Details</h3>
          <Input
            id="loanNum"
            element="input"
            type="number"
            label="Loan Number"
            validators={[VALIDATOR_REQUIRE(), VALIDATOR_MIN(0)]}
            minVal={0}
            errorText="Please enter a valid Loan number."
            onInput={inputHandler}
            initialValue={loadedLoan.loanNum}
            initialValid={true}
            disable={true}
          />
          <Input
            id="loanType"
            element="input"
            type="text"
            label="Loan Type"
            validators={[VALIDATOR_REQUIRE()]}
            errorText="Please enter a valid Loan type."
            onInput={inputHandler}
            initialValue={loadedLoan.loanType}
            initialValid={true}
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
            initialValue={loadedLoan.amount}
            initialValid={true}
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
            initialValue={loadedLoan.interest}
            initialValid={true}
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
            initialValue={loadedLoan.period}
            initialValid={true}
          />
          <Input
            id="monthPayment"
            element="input"
            type="number"
            step="any"
            label="Monthly Payment"
            validators={[VALIDATOR_REQUIRE(), VALIDATOR_MIN(0)]}
            minVal={0}
            errorText="Please enter a valid Monthly Payment."
            onInput={inputHandler}
            initialValue={loadedLoan.monthPayment}
            initialValid={true}
          />

          <div >
          <Button type="button" onClick={showUpdateWarningHandler} disabled={!formState.isValid}>
            UPDATE
          </Button>
          <Button2 type="button" onClick={showDeleteWarningHandler}>
              DELETE
          </Button2>
          </div>
        </form>
      )}
      
      </Sidebar>
    </React.Fragment>
  );
};

export default LoanEdit;
