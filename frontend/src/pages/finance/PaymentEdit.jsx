import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

import Input from "../../components/finance/FormElements/Input";
import Button from "../../components/finance/FormElements/Button";
import Button2 from "../../components/finance/FormElements/Button2";
import LoadingSpinner from "../../components/Spinner";
import ErrorModal from "../../components/finance/UIElements/ErrorModal";
import {
  VALIDATOR_MIN,
  VALIDATOR_REQUIRE,
} from "../../features/finance/validators";
import { useForm } from "../../features/finance/form-hook";
import { useHttpClient } from "../../features/finance/http-hook";
import "./PaymentForm.css";
import AdminCheck from '../../components/auth/AdminCheck'
import Sidebar from '../../components/finance/Sidebar';
import Modal from "../../features/finance/Modal"


const PaymentEdit = () => {
  const { isLoading, error, sendRequest, clearError } = useHttpClient();
  const [loadedPayment, setLoadedPayment] = useState();
  const [showDeleteConfirmModal, setDeleteShowConfirmModal] = useState(false);
  const [showUpdateConfirmModal, setUpdateShowConfirmModal] = useState(false);
  const paymentId = useParams().paymentId;
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

  useEffect(() => {
    const fetchPayment = async () => {
      try {
        const responseData = await sendRequest(
          `http://localhost:5000/api/payments/${paymentId}`
        );
        setLoadedPayment(responseData.payment);
        setFormData(
          {
            recNub: {
              value: responseData.payment.recNub,
              isValid: true,
            },
            description: {
              value: responseData.payment.description,
              isValid: true,
            },
            type: {
              value: responseData.payment.type,
              isValid: false,
            },
            date: {
              value: responseData.payment.date,
              isValid: false,
            },
            amount: {
              value: responseData.payment.amount,
              isValid: false,
            },
            note: {
              value: responseData.payment.note,
              isValid: false,
            },
          },
          true
        );
      } catch (err) {}
    };
    fetchPayment();
  }, [sendRequest, paymentId, setFormData]);

  const paymentUpdateSubmitHandler = async (event) => {
    event.preventDefault();
    try {
      await sendRequest(
        `http://localhost:5000/api/payments/${paymentId}`,
        "PATCH",
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
        message: "Payment record Updated",
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

  const confirmDeleteHandler = async () => {
    try {
      await sendRequest(
        `http://localhost:5000/api/payments/${paymentId}`,
        'DELETE'
      );

      // Add notification to the "notifications" collection
      const notificationData = {
        message: "Payment record deleted",
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
            <Button onClick={paymentUpdateSubmitHandler}>
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
      {!isLoading && loadedPayment && (<h2>Record Details #[{loadedPayment.recNub}]</h2>)}
      {!isLoading && loadedPayment && (
        <form className="payment-form" onSubmit={paymentUpdateSubmitHandler}>
          <Input
            id="recNub"
            element="input"
            type="number"
            label="Record Number"
            validators={[VALIDATOR_REQUIRE()]}
            errorText="Please enter a valid Record number."
            onInput={inputHandler}
            initialValue={loadedPayment.recNub}
            initialValid={true}
            disable={true}
          />
          <Input
            id="description"
            element="input"
            type="text"
            label="Description"
            validators={[VALIDATOR_REQUIRE()]}
            errorText="Please enter a valid description."
            onInput={inputHandler}
            initialValue={loadedPayment.description}
            initialValid={true}
          />
          <Input
            id="type"
            element="select"
            options={[
              { value: "", label: "Select the Type", disabled: true },
              { value: "Income", label: "Income" },
              { value: "Outgoing", label: "Outgoing" },
            ]}
            label="Type"
            validators={[VALIDATOR_REQUIRE()]}
            errorText="Please enter a valid type."
            onInput={inputHandler}
            initialValue={loadedPayment.type}
            initialValid={true}
          />

          
          <Input
            id="date"
            element="input"
            type="date"
            label="Date"
            validators={[VALIDATOR_REQUIRE()]}
            errorText="Please enter a valid date."
            onInput={inputHandler}
            initialValue={loadedPayment.date}
            initialValid={true}
          />
          <Input
            id="amount"
            element="input"
            type="number"
            label="Amount"
            validators={[VALIDATOR_REQUIRE()]}
            errorText="Please enter a valid Amount."
            onInput={inputHandler}
            initialValue={loadedPayment.amount}
            initialValid={true}
          />
          <Input
            id="note"
            element="text"
            type="text"
            label="Note"
            validators={[VALIDATOR_REQUIRE()]}
            errorText="Please enter a valid note about what you updated"
            onInput={inputHandler}
            initialValue={loadedPayment.note}
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

export default PaymentEdit;
