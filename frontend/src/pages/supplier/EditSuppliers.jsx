  import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

import Input from "../../components/supplier/FormElements/Input";
import Button from "../../components/supplier/FormElements/Button";
import Button2 from "../../components/supplier/FormElements/Button2";
import LoadingSpinner from "../../components/Spinner";
import ErrorModal from "../../components/supplier/UIElements/ErrorModal";
import {
  VALIDATOR_REQUIRE,
} from "../../features/supplier/validators";
import { useForm } from "../../features/supplier/form-hook";
import { useHttpClient } from "../../features/supplier/http-hook";

import AdminCheck from '../../components/auth/AdminCheck';
import Sidebar from '../../components/supplier/Sidebar';


const EditSuppliers = () => {
  const { isLoading, error, sendRequest, clearError } = useHttpClient();
  const [loadedSupplier, setLoadedSupplier] = useState();
  const supplierId = useParams().supplierId;
  const navigate = useNavigate();

  const [formState, inputHandler, setFormData] = useForm(
    {
        supplierId: {
            value: "",
            isValid: false,
          },
          name: {
            value: "",
            isValid: false,
          },
          nic: {
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
          itemId: {
            value: "",
            isValid: false,
          },
          contractId: {
            value: "",
            isValid: false,
          },
          email: {
            value: "",
            isValid: false,
          },
          
    },
    false
  );

  useEffect(() => {
    const fetchSupplier = async () => {
      try {
        const responseData = await sendRequest(
          `http://localhost:5000/api/suppliers/${supplierId}`
        );
        setLoadedSupplier(responseData.supplier);
        setFormData(
          {
            supplierId: {
              value: responseData.supplier.supplierId,
              isValid: true,
            },
            name: {
              value: responseData.supplier.name,
              isValid: true,
            },
            nic: {
              value: responseData.supplier.nic,
              isValid: false,
            },
            contact: {
              value: responseData.supplier.contact,
              isValid: false,
            },
            address: {
              value: responseData.supplier.address,
              isValid: false,
            },
            itemId: {
              value: responseData.supplier.itemId,
              isValid: false,
            },
            contractId: {
                value: responseData.supplier.contractId,
                isValid: false,
            },
            email: {
                value: responseData.supplier.email,
                isValid: false,
            },
            
          },
          true
        );
      } catch (err) {}
    };
    fetchSupplier();
  }, [sendRequest, supplierId, setFormData]);

  const supplierUpdateSubmitHandler = async (event) => {
    event.preventDefault();
    try {
      await sendRequest(
        `http://localhost:5000/api/suppliers/${supplierId}`,
        "PATCH",
        JSON.stringify({
            supplierId: formState.inputs.supplierId.value,
            name: formState.inputs.name.value,
            nic: formState.inputs.nic.value,
            contact: formState.inputs.contact.value,
            address: formState.inputs.address.value,
            itemId: formState.inputs.itemId.value,
            contractId: formState.inputs.contractId.value,
            email: formState.inputs.email.value,
            
        }),
        {
          "Content-Type": "application/json",
        }
      );
      // history.push("/" + auth.userId + "/payments");
      // Add notification to the "notifications" collection
      const notificationData = {
        message: "Supplier record updated",
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
    navigate("/displaySuppliers");
  };

  const confirmDeleteHandler = async () => {
    try {
      await sendRequest(
        `http://localhost:5000/api/suppliers/${supplierId}`,
        'DELETE'
      );
    } catch (err) {}
    navigate("/displaySuppliers");
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
      {!isLoading && loadedSupplier && (<h2>Record Details #[{loadedSupplier.supplierId}]</h2>)}
      {!isLoading && loadedSupplier && (
        <form className="payment-form" onSubmit={supplierUpdateSubmitHandler}>
          <Input
            id="supplierId"
            element="input"
            type="text"
            label="Supplier ID"
            validators={[VALIDATOR_REQUIRE()]}
            errorText="Please enter a valid ID."
            onInput={inputHandler}
            initialValue={loadedSupplier.supplierId}
            initialValid={true}
            disable={true}
          />
          <Input
            id="name"
            element="input"
            type="text"
            label="name"
            validators={[VALIDATOR_REQUIRE()]}
            errorText="Please enter the name."
            onInput={inputHandler}
            initialValue={loadedSupplier.name}
            initialValid={true}
          />
          <Input
            id="nic"
            element="input"
            type="text"
            label="nic"
            validators={[VALIDATOR_REQUIRE()]}
            errorText="Please enter the NIC."
            onInput={inputHandler}
            initialValue={loadedSupplier.nic}
            initialValid={true}
          />
          
          <Input
            id="contact"
            element="input"
            type="number"
            label="contact"
            validators={[VALIDATOR_REQUIRE()]}
            errorText="Please enter the Contact Number."
            onInput={inputHandler}
            initialValue={loadedSupplier.contact}
            initialValid={true}
          />
          <Input
            id="itemId"
            element="input"
            type="text"
            label="itemID"
            validators={[VALIDATOR_REQUIRE()]}
            errorText="Please enter a valid Amount."
            onInput={inputHandler}
            initialValue={loadedSupplier.itemId}
            initialValid={true}
          />
          <Input
            id="address"
            element="text"
            type="text"
            label="address"
            validators={[VALIDATOR_REQUIRE()]}
            errorText="Please enter a valid note about what you updated"
            onInput={inputHandler}
            initialValue={loadedSupplier.address}
            initialValid={true}
          />
          <Input
            id="contractId"
            element="input"
            type="text"
            label="contractID"
            validators={[VALIDATOR_REQUIRE()]}
            errorText="Please enter a valid note about what you updated"
            onInput={inputHandler}
            initialValue={loadedSupplier.contractId}
            initialValid={true}
          />
          <Input
            id="email"
            element="input"
            type="email"
            label="email"
            validators={[VALIDATOR_REQUIRE()]}
            errorText="Please enter a valid note about what you updated"
            onInput={inputHandler}
            initialValue={loadedSupplier.email}
            initialValid={true}
            disable={true}

          />
          

          <div >
          <Button type="submit" disabled={!formState.isValid}>
            UPDATE
          </Button>
          {/* <Button2 onClick={confirmDeleteHandler}>
              DELETE
          </Button2> */}
          </div>
        </form>
      )}
      
      </Sidebar>
    </React.Fragment>
  );
};

export default EditSuppliers;