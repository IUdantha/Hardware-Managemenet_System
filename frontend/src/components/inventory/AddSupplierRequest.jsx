import React, {useState } from "react";
import { useNavigate } from "react-router-dom";
import { VALIDATOR_REQUIRE, VALIDATOR_MIN} from "../../features/finance/validators";
import { useForm } from "../../features/finance/form-hook";
import { useHttpClient } from "../../features/finance/http-hook";
import{FaArrowLeft} from "react-icons/fa"

import Input from "../../components/finance/FormElements/Input";
import Button from "../../components/finance/FormElements/Button";
import AdminCheck from "../../components/auth/AdminCheck";
import LoadingSpinner from "../../components/Spinner";
import Popup from "../PopUp";

import "./editItem.css";


const AddSupplierRequest = () => {
  const { isLoading, sendRequest} = useHttpClient();

  const navigate = useNavigate();

  const [buttonPopup, setButtonPopup] = useState(false)
  const showButtonPopup= () => setButtonPopup(!buttonPopup);

  const [formState, inputHandler] = useForm(
    {
        supplierid: {
        value: "",
        isValid: false,
      },
        itemname: {
        value: "",
        isValid: false,
      },
        amount: {
        value: "",
        isValid: false,
      },
    },
    false
  );
  

  const maintenanceAddSubmitHandler = async (event) => {
    event.preventDefault();
    try {
      await sendRequest(
        `http://localhost:5000/api/supplierRequests/`,
        "POST",
        JSON.stringify({
            supplierid: formState.inputs.supplierid.value,
            itemname: formState.inputs.itemname.value,            
            amount: formState.inputs.amount.value,
        }),   
        {
          "Content-Type": "application/json",
        }
      );
    } catch (err) {

    }
    navigate("/supplierRequests");
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

      <div className="inventoryeditbackbutton">
        <button onClick={() =>{ navigate('/supplierRequests')}}><FaArrowLeft/> BACK</button>
      </div>

      <form className="payment-form" onSubmit={maintenanceAddSubmitHandler}>
        <div className="additemtitle">
          <h2>Add new supplier req</h2>
        </div>
        <br />

        <Input
          id="supplierid"
          element="input"
          type="text"
          label="Supplier Id"
          validators={[VALIDATOR_REQUIRE()]}
          errorText="Please enter a supplier id."
          onInput={inputHandler}
        />

        <Input
          id="itemname"
          element="input"
          type="text"
          label="Item Name"
          validators={[VALIDATOR_REQUIRE()]}
          errorText="Please enter a item name."
          onInput={inputHandler}
        />
        
        <Input
          id="amount"
          element="input"
          type="number"
          label="Amount"
          validators={[VALIDATOR_REQUIRE(), VALIDATOR_MIN(0)]}
          minVal={0}
          errorText="Please enter a amount."
          onInput={inputHandler}
        />

      </form>

      
        <div className="inventoryitemaddbutton">
          <Button disabled={!formState.isValid} onClick={showButtonPopup}>
            ADD
          </Button>
        </div>
      

      <Popup trigger={buttonPopup} setTrigger={showButtonPopup} popup_description="Are you sure you want to Add new Request ?">
        <button className='confirm-button' onClick={maintenanceAddSubmitHandler}>OK</button>
      </Popup>

    </React.Fragment>
  );
};

export default AddSupplierRequest;
