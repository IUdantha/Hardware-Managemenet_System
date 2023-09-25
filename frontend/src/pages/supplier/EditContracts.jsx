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
import ManagerCheck from '../../components/auth/ManagerCheck';
import Sidebar from '../../components/supplier/Manager_sidebar';


const EditContracts = () => {
  const { isLoading, error, sendRequest, clearError } = useHttpClient();
  const [LoadedContract, setLoadedContract] = useState();
  const contractId = useParams().contractId;
  const navigate = useNavigate();

  const [formState, inputHandler, setFormData] = useForm(
    {
        contractId: {
            value: "",
            isValid: false,
          },
          validFrom: {
            value: "",
            isValid: false,
          },
          validTill: {
            value: "",
            isValid: false,
          },
          description: {
            value: "",
            isValid: false,
          }
    },
    false
  );

  useEffect(() => {
    const fetchContract = async () => {
      try {
        const responseData = await sendRequest(
          `http://localhost:5000/api/contracts/${contractId}`
        );
        setLoadedContract(responseData.contract);
        setFormData(
          {
            contractId: {
              value: responseData.contract.contractId,
              isValid: true,
            },
            validFrom: {
              value: responseData.contract.name,
              isValid: true,
            },
            validTill: {
              value: responseData.contract.nic,
              isValid: false,
            },
            description: {
              value: responseData.contract.contact,
              isValid: false,
            }
          },
          true
        );
      } catch (err) {}
    };
    fetchContract();
  }, [sendRequest, contractId, setFormData]);

  const contractUpdateSubmitHandler = async (event) => {
    event.preventDefault();
    try {
      await sendRequest(
        `http://localhost:5000/api/contracts/${contractId}`,
        "PATCH",
        JSON.stringify({
            contractId: formState.inputs.contractId.value,
            validFrom: formState.inputs.validFrom.value,
            validTill: formState.inputs.validTill.value,
            description: formState.inputs.description.value,
        }),
        {
          "Content-Type": "application/json",
        }
      );
      // history.push("/" + auth.userId + "/payments");
    } catch (err) {}
    navigate("/displayContracts");
  };

  const confirmDeleteHandler = async () => {
    try {
      await sendRequest(
        `http://localhost:5000/api/contracts/${contractId}`,
        'DELETE'
      );
    } catch (err) {}
    navigate("/displayContracts");
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
      <ManagerCheck />
      <Sidebar>
      {/* <ErrorModal error={error} onClear={clearError} /> */}
      {!isLoading && LoadedContract && (<h2>Record Details #[{LoadedContract.contractId}]</h2>)}
      {!isLoading && LoadedContract && (
        <form className="payment-form" onSubmit={contractUpdateSubmitHandler}>
          <Input
            id="contractId"
            element="input"
            type="text"
            label="Contract ID"
            validators={[VALIDATOR_REQUIRE()]}
            errorText="Please enter a valid ID."
            onInput={inputHandler}
            initialValue={LoadedContract.contractId}
            initialValid={true}
            disable={true}
          />
          <Input
            id="validFrom"
            element="input"
            type="text"
            label="Valid From"
            validators={[VALIDATOR_REQUIRE()]}
            errorText="Please enter the date."
            onInput={inputHandler}
            initialValue={LoadedContract.validFrom}
            initialValid={true}
          />
          <Input
            id="validTill"
            element="input"
            type="text"
            label="Valid Till"
            validators={[VALIDATOR_REQUIRE()]}
            errorText="Please enter the date."
            onInput={inputHandler}
            initialValue={LoadedContract.validTill}
            initialValid={true}
          />
          
          <Input
            id="description"
            element="input"
            type="text"
            label="Description"
            validators={[VALIDATOR_REQUIRE()]}
            errorText="Please enter the Description."
            onInput={inputHandler}
            initialValue={LoadedContract.description}
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

export default EditContracts;