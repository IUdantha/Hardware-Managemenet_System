import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

import Input from "../../components/customer/FormElements/Input";
import Popup from "../../components/PopUp";
import Button from "../../components/customer/FormElements/Button";
import Button2 from "../../components/customer/FormElements/Button2";
import LoadingSpinner from "../../components/Spinner";
import ErrorModal from "../../components/customer/UIElements/ErrorModal";
import {
  VALIDATOR_REQUIRE,
} from "../../features/customer/validators";
import { useForm } from "../../features/customer/form-hook";
import { useHttpClient } from "../../features/customer/http-hook";

import AdminCheck from '../../components/auth/AdminCheck'
import Sidebar from '../../components/customer/Sidebar';


const CustomerEdit = () => {
  const { isLoading, error, sendRequest, clearError } = useHttpClient();
  const [loadedCustomer, setLoadedCustomer] = useState();
  const customerId = useParams().customerId;
  const navigate = useNavigate();

  const [formState, inputHandler, setFormData] = useForm(
    
    {
      recNub: {
        value: "",
        isValid: false,
      },
   
      name: {
        value: "",
        isValid: false,
      },
      email: {
        value: "",
        isValid: false,
      },
      type: {
        value: "",
        isValid: false,
      },
      nic: {
        value: "",
        isValid: false,
      },

      date: {
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
    const fetchCustomer = async () => {
      try {
        const responseData = await sendRequest(
          `http://localhost:5000/api/customers/${customerId}`
        );
        setLoadedCustomer(responseData.customer);
        setFormData(

          {
            recNub: {
              value: responseData.customer.recNub,
              isValid: true,
            },
          
            name: {
              value: responseData.customer.name,
              isValid: true,
            },
            email: {
              value: responseData.customer.email,
              isValid: true,
            },
            type: {
              value: responseData.customer.type,
              isValid: false,
            },
            nic: {
              value: responseData.customer.nic,
              isValid: false,
            },

            date: {
              value: responseData.customer.date,
              isValid: false,
            },

            contact: {
              value: responseData.customer.contact,
              isValid: false,
            },
            address: {
              value: responseData.customer.address,
              isValid: false,
            },
          },
          true
        );
      } catch (err) {}
    };
    fetchCustomer();
  }, [sendRequest, customerId, setFormData]);

  const customerUpdateSubmitHandler = async (event) => {
    event.preventDefault();
    try {
      await sendRequest(
        `http://localhost:5000/api/customers/${customerId}`,
        "PATCH",
        JSON.stringify({
          recNub: formState.inputs.recNub.value,
          name: formState.inputs.name.value,
          email: formState.inputs.email.value,
          type: formState.inputs.type.value,
          nic: formState.inputs.nic.value,
          date: formState.inputs.date.value,
          contact: formState.inputs.contact.value,
          address: formState.inputs.address.value,
        }),
        {
          "Content-Type": "application/json",
        }
      );
      // history.push("/" + auth.userId + "/payments");
    } catch (err) {}
    navigate("/customerDetails");
  };

  const confirmDeleteHandler = async () => {
    try {
      await sendRequest(
        `http://localhost:5000/api/customers/${customerId}`,
        'DELETE'
      );
    } catch (err) {}
    navigate("/customerDetails");
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
      <Sidebar>
      {/* <ErrorModal error={error} onClear={clearError} /> */}
      {!isLoading && loadedCustomer && (<h2>Customer Details [{loadedCustomer.name}]</h2>)}
      {!isLoading && loadedCustomer && (
        <form className="payment-form" onSubmit={customerUpdateSubmitHandler}>
          

          <Input
            id="recNub"
            element="input"
            type="number"
            label="Record Number"
            validators={[VALIDATOR_REQUIRE()]}
            errorText="Please enter a valid Record number."
            onInput={inputHandler}
            initialValue={loadedCustomer.recNub}
            initialValid={true}
            disable={true}
          />

          <Input
            id="name"
            element="input"
            type="text"
            label="name"
            validators={[VALIDATOR_REQUIRE()]}
            errorText="Please enter a valid name."
            onInput={inputHandler}
            initialValue={loadedCustomer.name}
            initialValid={true}
           
          />
          <Input
            id="email"
            element="input"
            type="email"
            label="email"
            validators={[VALIDATOR_REQUIRE()]}
            errorText="Please enter a valid email."
            onInput={inputHandler}
            initialValue={loadedCustomer.email}
            initialValid={true}
          />
          <Input
            id="type"
            element="input"
            type="text"
            label="Type"
            validators={[VALIDATOR_REQUIRE()]}
            errorText="Please enter a valid type."
            onInput={inputHandler}
            initialValue={loadedCustomer.type}
            initialValid={true}
          />
          
          <Input
            id="nic"
            element="input"
            type="text"
            label="NIC"
            validators={[VALIDATOR_REQUIRE()]}
            errorText="Please enter a valid nic."
            onInput={inputHandler}
            initialValue={loadedCustomer.nic}
            initialValid={true}
          />

          <Input
            id="date"
            element="input"
            type="date"
            label="Register Date"
            validators={[VALIDATOR_REQUIRE()]}
            errorText="Please enter a valid date."
            onInput={inputHandler}
            initialValue={loadedCustomer.date}
            initialValid={true}
          />

          <Input
            id="contact"
            element="input"
            type="number"
            label="contact"
            validators={[VALIDATOR_REQUIRE()]}
            errorText="Please enter a valid contact."
            onInput={inputHandler}
            initialValue={loadedCustomer.contact}
            initialValid={true}
          />
          <Input
            id="address"
            element="text"
            type="text"
            label="address"
            validators={[VALIDATOR_REQUIRE()]}
            errorText="Please enter a valid address"
            onInput={inputHandler}
            initialValue={loadedCustomer.address}
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
      
      </Sidebar>
    </React.Fragment>
  );
};

export default CustomerEdit;
