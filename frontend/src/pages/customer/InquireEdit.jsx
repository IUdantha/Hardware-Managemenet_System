import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

import Input from "../../components/customer/FormElements/Input";
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


const InquireEdit = () => {
  const { isLoading, error, sendRequest, clearError } = useHttpClient();
  const [loadedInquire, setLoadedInquire] = useState();
  const inquireId = useParams().inquireId;
  const navigate = useNavigate();

  const [formState, inputHandler, setFormData] = useForm(
    
    {
      name: {
        value: "",
        isValid: false,
      },
   
      customId: {
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

      type: {
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
    const fetchInquire = async () => {
      try {
        const responseData = await sendRequest(
          `http://localhost:5000/api/inquires/${inquireId}`
        );
        setLoadedInquire(responseData.inquire);
        setFormData(

          {
            name: {
              value: responseData.inquire.name,
              isValid: true,
            },
          
            customId: {
              value: responseData.inquire.customId,
              isValid: true,
            },
            email: {
              value: responseData.inquire.email,
              isValid: true,
            }, 
            contact: {
              value: responseData.inquire.contact,
              isValid: false,
            },
            type: {
              value: responseData.inquire.type,
              isValid: false,
            },

            address: {
              value: responseData.inquire.address,
              isValid: false,
            },
          },
          true
        );
      } catch (err) {}
    };
    fetchInquire();
  }, [sendRequest, inquireId, setFormData]);

  const inquireUpdateSubmitHandler = async (event) => {
    event.preventDefault();
    try {
      await sendRequest(
        `http://localhost:5000/api/inquires/${inquireId}`,
        "PATCH",
        JSON.stringify({
          name: formState.inputs.name.value,
          customId: formState.inputs.customId.value,
          email: formState.inputs.email.value,
          contact: formState.inputs.contact.value,
          type: formState.inputs.type.value,
          address: formState.inputs.address.value,
         
        }),
        {
          "Content-Type": "application/json",
        }
      );
      // history.push("/" + auth.userId + "/payments");
    } catch (err) {}
    navigate("/inquireDetails");
  };

  const confirmDeleteHandler = async () => {
    try {
      await sendRequest(
        `http://localhost:5000/api/inquires/${inquireId}`,
        'DELETE'
      );
    } catch (err) {}
    navigate("/inquireDetails");
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
      {!isLoading && loadedInquire && (<h2>Inquire Details [{loadedInquire.name}]</h2>)}
      {!isLoading && loadedInquire && (
        <form className="payment-form" onSubmit={inquireUpdateSubmitHandler}>
          

          <Input
            id="name"
            element="input"
            type="text"
            label="Customer Name"
            validators={[VALIDATOR_REQUIRE()]}
            errorText="Please enter a valid Name."
            onInput={inputHandler}
            initialValue={loadedInquire.name}
            initialValid={true}
           
          />

          <Input
            id="customId"
            element="input"
            type="number"
            label="Record No"
            validators={[VALIDATOR_REQUIRE()]}
            errorText="Please enter a valid customer id."
            onInput={inputHandler}
            initialValue={loadedInquire.customId}
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
            initialValue={loadedInquire.email}
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
            initialValue={loadedInquire.contact}
            initialValid={true}
          />    


          <Input
            id="type"
            element="input"
            type="text"
            label="Inquire"
            validators={[VALIDATOR_REQUIRE()]}
            errorText="Please enter a valid type."
            onInput={inputHandler}
            initialValue={loadedInquire.type}
            initialValid={true}
          />
          

          <Input
            id="address"
            element="text"
            type="text"
            label="Item "
            validators={[VALIDATOR_REQUIRE()]}
            errorText="Please enter a valid item code"
            onInput={inputHandler}
            initialValue={loadedInquire.address}
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

export default InquireEdit;
