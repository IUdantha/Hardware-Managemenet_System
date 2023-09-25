import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

import Input from "../../components/delivery/FormElements/Input";
import Button from "../../components/delivery/FormElements/Button";
import Button2 from "../../components/delivery/FormElements/Button2";
import LoadingSpinner from "../../components/Spinner";
import ErrorModal from "../../components/delivery/UIElements/ErrorModal";
import {
  VALIDATOR_REQUIRE,
} from "../../features/delivery/validators";
import { useForm } from "../../features/delivery/form-hook";
import { useHttpClient } from "../../features/delivery/http-hook";
import AdminCheck from '../../components/auth/AdminCheck'
import Sidebar from '../../components/delivery/Sidebar';
import Modal from "../../features/finance/Modal"


const DeliveryEdit = () => {
  const { isLoading, error, sendRequest, clearError } = useHttpClient();
  const [loadedDelivery, setLoadedDelivery] = useState();
  const [showDeleteConfirmModal, setDeleteShowConfirmModal] = useState(false);
  const [showUpdateConfirmModal, setUpdateShowConfirmModal] = useState(false);
  const deliveryId = useParams().id;
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
      name: {
        value: "",
        isValid: false,
      },
      orderId: {
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
      distance: {
        value: "",
        isValid: false,
      },
      cost: {
        value: "",
        isValid: false,
      },
      time: {
        value: "",
        isValid: false,
      },
    },
    false
  );

  useEffect(() => {
    const fetchDelivery = async () => {
      try {
        const responseData = await sendRequest(
          `http://localhost:5000/api/deliveries/${deliveryId}`
        );
        setLoadedDelivery(responseData.delivery);
        setFormData(
          {
            name: {
              value: responseData.delivery.name,
              isValid: true,
            },
            orderId: {
              value: responseData.delivery.orderId,
              isValid: true,
            },
            email: {
              value: responseData.delivery.email,
              isValid: false,
            },
            contact: {
              value: responseData.delivery.contact,
              isValid: false,
            },
            address: {
              value: responseData.delivery.address,
              isValid: false,
            },
            distance: {
              value: responseData.delivery.distance,
              isValid: false,
            },
            cost: {
              value: responseData.delivery.cost,
              isValid: false,
            },
            time: {
                value: responseData.delivery.time,
                isValid: false,
              },
          },
          true
        );
      } catch (err) {}
    };
    fetchDelivery();
  }, [sendRequest, deliveryId, setFormData]);

  const deliveryUpdateSubmitHandler = async (event) => {
    event.preventDefault();
    try {
      await sendRequest(
        `http://localhost:5000/api/deliveries/${deliveryId}`,
        "PATCH",
        JSON.stringify({
          name: formState.inputs.name.value,
          orderId: formState.inputs.orderId.value,
          email: formState.inputs.email.value,
          contact: formState.inputs.contact.value,
          address: formState.inputs.address.value,
          distance: formState.inputs.distance.value,
          cost: formState.inputs.cost.value,
          time: formState.inputs.time.value,
        }),
        {
          "Content-Type": "application/json",
        }
      );
      // Add notification to the "notifications" collection
      const notificationData = {
        message: "Delivery record updated",
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
    navigate("/deliveryDetails");
  };

  const confirmDeleteHandler = async () => {
    try {
      await sendRequest(
        `http://localhost:5000/api/deliveries/${deliveryId}`,
        'DELETE'
      );
      // Add notification to the "notifications" collection
      const notificationData = {
        message: "Delivery record deleted",
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
    navigate("/deliveryDetails");
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
            <Button onClick={deliveryUpdateSubmitHandler}>
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
      {!isLoading && loadedDelivery && (<h2>Delivery Details</h2>)}
      {!isLoading && loadedDelivery && (
        <form className="payment-form" onSubmit={deliveryUpdateSubmitHandler}>
          <Input
            id="name"
            element="input"
            type="text"
            label="Customer Name"
            validators={[VALIDATOR_REQUIRE()]}
            errorText="Please enter a name."
            onInput={inputHandler}
            initialValue={loadedDelivery.name}
            initialValid={true}
            disable={true}
          
          />
          <Input
            id="orderId"
            element="input"
            type="text"
            label="Order ID"
            validators={[VALIDATOR_REQUIRE()]}
            errorText="Please enter a valid orderId."
            onInput={inputHandler}
            initialValue={loadedDelivery.orderId}
            initialValid={true}
            disable={true}
          />
          <Input
            id="email"
            element="input"
            type="email"
            label="Email"
            validators={[VALIDATOR_REQUIRE()]}
            errorText="Please enter a valid email."
            onInput={inputHandler}
            initialValue={loadedDelivery.email}
            initialValid={true}
            disable={true}
          />
          
          <Input
            id="contact"
            element="input"
            type="number"
            label="Contact Number"
            validators={[VALIDATOR_REQUIRE()]}
            errorText="Please enter a valid contact number."
            onInput={inputHandler}
            initialValue={loadedDelivery.contact}
            initialValid={true}
          />
          <Input
            id="address"
            element="text"
            type="text"
            label="Address"
            validators={[VALIDATOR_REQUIRE()]}
            errorText="Please enter a valid Address."
            onInput={inputHandler}
            initialValue={loadedDelivery.address}
            initialValid={true}
          />
          <Input
            id="distance" 
            element="input"
            type="text"
            label="Distance"
            validators={[VALIDATOR_REQUIRE()]}
            errorText="Please enter distance"
            onInput={inputHandler}
            initialValue={loadedDelivery.distance}
            initialValid={true}
          />
        <Input
            id="cost"
            element="input"
            type="text"
            label="Delivery Cost"
            validators={[VALIDATOR_REQUIRE()]}
            errorText="Please enter delivery cost"
            onInput={inputHandler}
            initialValue={loadedDelivery.cost}
            initialValid={true}
          />
        <Input
            id="time"
            element="input"
            type="text"
            label="Estimated delivery time"
            validators={[VALIDATOR_REQUIRE()]}
            errorText="Please enter estimated delivery time"
            onInput={inputHandler}
            initialValue={loadedDelivery.time}
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

export default DeliveryEdit;
