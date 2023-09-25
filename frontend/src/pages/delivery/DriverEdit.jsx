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


const DriverEdit = () => {
  const { isLoading, error, sendRequest, clearError } = useHttpClient();
  const [loadedDriver, setLoadedDriver] = useState();
  const [showDeleteConfirmModal, setDeleteShowConfirmModal] = useState(false);
  const [showUpdateConfirmModal, setUpdateShowConfirmModal] = useState(false);
  const driverId = useParams().id;
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

  useEffect(() => {
    const fetchDriver = async () => {
      try {
        const responseData = await sendRequest(
          `http://localhost:5000/api/drivers/${driverId}`
        );
        setLoadedDriver(responseData.driver);
        setFormData(
          {
            name: {
              value: responseData.driver.name,
              isValid: true,
            },
            nic: {
              value: responseData.driver.nic,
              isValid: true,
            },
            email: {
              value: responseData.driver.email,
              isValid: false,
            },
            contact: {
              value: responseData.driver.contact,
              isValid: false,
            },
            address: {
              value: responseData.driver.address,
              isValid: false,
            },
            licenceNo: {
              value: responseData.driver.licenceNo,
              isValid: false,
            },
            plateNo: {
              value: responseData.driver.plateNo,
              isValid: false,
            },
          },
          true
        );
      } catch (err) {}
    };
    fetchDriver();
  }, [sendRequest, driverId, setFormData]);

  const driverUpdateSubmitHandler = async (event) => {
    event.preventDefault();
    try {
      await sendRequest(
        `http://localhost:5000/api/drivers/${driverId}`,
        "PATCH",
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
        message: "Driver record updated",
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

  const confirmDeleteHandler = async () => {
    try {
      await sendRequest(
        `http://localhost:5000/api/drivers/${driverId}`,
        'DELETE'
      );
      // Add notification to the "notifications" collection
      const notificationData = {
        message: "Driver record deleted",
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
            <Button onClick={driverUpdateSubmitHandler}>
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
      {!isLoading && loadedDriver && (<h2>Driver Details</h2>)}
      {!isLoading && loadedDriver && (
        <form className="payment-form" onSubmit={driverUpdateSubmitHandler}>
          <Input
            id="name"
            element="input"
            type="text"
            label="Driver Name"
            validators={[VALIDATOR_REQUIRE()]}
            errorText="Please enter a name."
            onInput={inputHandler}
            initialValue={loadedDriver.name}
            initialValid={true}
          
          />
          <Input
            id="nic"
            element="input"
            type="text"
            label="NIC Number"
            validators={[VALIDATOR_REQUIRE()]}
            errorText="Please enter a valid nic number."
            onInput={inputHandler}
            initialValue={loadedDriver.nic}
            initialValid={true}
          />
          <Input
            id="email"
            element="input"
            type="email"
            label="Email"
            validators={[VALIDATOR_REQUIRE()]}
            errorText="Please enter a valid email."
            onInput={inputHandler}
            initialValue={loadedDriver.email}
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
            initialValue={loadedDriver.contact}
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
            initialValue={loadedDriver.address}
            initialValid={true}
          />
          <Input
            id="licenceNo" 
            element="input"
            type="text"
            label="Licence No"
            validators={[VALIDATOR_REQUIRE()]}
            errorText="Please enter a valid licence No"
            onInput={inputHandler}
            initialValue={loadedDriver.licenceNo}
            initialValid={true}
            disable={true}
          />
        <Input
            id="plateNo"
            element="input"
            type="text"
            label="Plate No"
            validators={[VALIDATOR_REQUIRE()]}
            errorText="Please enter a valid plate No"
            onInput={inputHandler}
            initialValue={loadedDriver.plateNo}
            initialValid={true}
            disable={true}
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

export default DriverEdit;
