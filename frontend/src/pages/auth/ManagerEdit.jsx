import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

import Input from "../../components/auth/FormElements/Input";
import Button from "../../components/auth/FormElements/Button";
import Button2 from "../../components/auth/FormElements/Button2";
import LoadingSpinner from "../../components/Spinner";
import ErrorModal from "../../components/auth/UIElements/ErrorModal";
import {
  VALIDATOR_REQUIRE,
} from "../../features/auth/validators";
import { useForm } from "../../features/auth/form-hook";
import { useHttpClient } from "../../features/auth/http-hook";

import AdminCheck from '../../components/auth/AdminCheck'
import AdminSideBar from '../../components/auth/AdminSideBar';


const ManagerEdit = () => {
  const { isLoading, error, sendRequest, clearError } = useHttpClient();
  const [loadedManager, setLoadedManager] = useState();
  const managerId = useParams().id;
  const navigate = useNavigate();

  const [formState, inputHandler, setFormData] = useForm(
    {
      name: {
        value: "",
        isValid: false,
      },
      email: {
        value: "",
        isValid: false,
      },
      nic: {
        value: "",
        isValid: false,
      },

      type: {
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
  
    },
    false
  );

  useEffect(() => {
    const fetchManager = async () => {
      try {
        const responseData = await sendRequest(
          `http://localhost:5000/api/managers/${managerId}`
        );
        setLoadedManager(responseData.manager);
        setFormData(
          {
            name: {
              value: responseData.manager.name,
              isValid: true,
            },
            email: {
                value: responseData.manager.email,
                isValid: false,
              },
            nic: {
              value: responseData.manager.nic,
              isValid: true,
            },
            type: {
                value: responseData.manager.type,
                isValid: true,
              },
            contact: {
              value: responseData.manager.contact,
              isValid: false,
            },
            address: {
              value: responseData.manager.address,
              isValid: false,
            },
        
          },
          true
        );
      } catch (err) {}
    };
    fetchManager();
  }, [sendRequest, managerId, setFormData]);

  const managerUpdateSubmitHandler = async (event) => {
    event.preventDefault();
    try {
      await sendRequest(
        `http://localhost:5000/api/managers/${managerId}`,
        "PATCH",
        JSON.stringify({
          name: formState.inputs.name.value,
          email: formState.inputs.email.value,
          nic: formState.inputs.nic.value,
          type: formState.inputs.type.value,
          contact: formState.inputs.contact.value,
          address: formState.inputs.address.value,
         
        
        }),
        {
          "Content-Type": "application/json",
        }
      );
      // history.push("/" + auth.userId + "/payments");
    } catch (err) {}
    navigate("/managerDetails");
  };

  const confirmDeleteHandler = async () => {
    try {
      await sendRequest(
        `http://localhost:5000/api/managers/${managerId}`,
        'DELETE'
      );
      
    } catch (err) {}
    navigate("/managerDetails");
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
      <AdminSideBar>
      {/* <ErrorModal error={error} onClear={clearError} /> */}
      <h2>Manager Details</h2>
      {!isLoading && loadedManager && (
        <form className="payment-form" onSubmit={managerUpdateSubmitHandler}>
          <Input
            id="name"
            element="input"
            type="text"
            label="Manager Name"
            validators={[VALIDATOR_REQUIRE()]}
            errorText="Please enter a name."
            onInput={inputHandler}
            initialValue={loadedManager.name}
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
            initialValue={loadedManager.email}
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
            initialValue={loadedManager.nic}
            initialValid={true}
          />
        <Input
            id="type" 
            element="input"
            type="text"
            label="User Type"
            validators={[VALIDATOR_REQUIRE()]}
            errorText="Please enter a valid user type"
            onInput={inputHandler}
            initialValue={loadedManager.type}
            initialValid={true}
          />

          <Input
            id="contact"
            element="input"
            type="number"
            label="Contact Number"
            validators={[VALIDATOR_REQUIRE()]}
            errorText="Please enter a valid contact number."
            onInput={inputHandler}
            initialValue={loadedManager.contact}
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
            initialValue={loadedManager.address}
            initialValid={true}
          />
     
       
          <div >
          <Button type="submit" disabled={!formState.isValid}>
            UPDATE
          </Button>
          <Button2 onClick={confirmDeleteHandler}>
              DELETE
          </Button2>
          </div>
        </form>
      )}
      
      </AdminSideBar>
    </React.Fragment>
  );
};

export default ManagerEdit;
