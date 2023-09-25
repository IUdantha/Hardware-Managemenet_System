import React, {useState } from "react";
import { useNavigate } from "react-router-dom";
import { VALIDATOR_REQUIRE, VALIDATOR_MIN, } from "../../features/finance/validators";
import { useForm } from "../../features/finance/form-hook";
import { useHttpClient } from "../../features/finance/http-hook";
import {FaArrowLeft} from "react-icons/fa"

import Input from "../../components/finance/FormElements/Input";
import Button from "../../components/finance/FormElements/Button";
import LoadingSpinner from "../../components/Spinner";
import AdminCheck from "../../components/auth/AdminCheck";
import Popup from "../PopUp";

import "./editItem.css";


const Additem = () => {

  const { isLoading, sendRequest} = useHttpClient();
  const navigate = useNavigate();

  const [buttonPopup, setButtonPopup] = useState(false)
  const showButtonPopup= () => setButtonPopup(!buttonPopup);

  const [formState, inputHandler] = useForm(
    {
        itemname: {
        value: "",
        isValid: false,
      },
        description: {
        value: "",
        isValid: false,
      },
        price: {
        value: "",
        isValid: false,
      },
        category: {
        value: "",
        isValid: false,
      },
 /*     imagepath:{
        value: "",
        isValid: false,
      },                 */
        stock: {
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
        `http://localhost:5000/api/items/`,
        "POST",
        JSON.stringify({
            itemname: formState.inputs.itemname.value,
            description: formState.inputs.description.value,            
            price: formState.inputs.price.value,
            category: formState.inputs.category.value,
            //imagepath: formState.inputs.imagepath.value,
            stock: formState.inputs.stock.value,
        }),   
        {
          "Content-Type": "application/json",
        }
      );
    } catch (err) {}
    navigate("/inventoryDashboard");
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
        <button onClick={() =>{ navigate('/inventoryDashboard')}}><FaArrowLeft/> BACK</button>
      </div>

      <form className="payment-form" onSubmit={maintenanceAddSubmitHandler}>
        <div className="additemtitle">
          <h2>Add new item</h2>
        </div>
        <br />
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
          id="description"
          element="text"
          type="text"
          label="Description"
          validators={[VALIDATOR_REQUIRE()]}
          errorText="Please enter a description."
          onInput={inputHandler}
        />
        <Input
          id="price"
          element="input"
          type="number"
          label="Price"
          validators={[VALIDATOR_REQUIRE(), VALIDATOR_MIN(0)]}
          minVal={0}
          errorText="Please enter a price."
          onInput={inputHandler}
        />

        <Input
          id="category"
          element="input"
          type="text"
          label="Category"
          validators={[VALIDATOR_REQUIRE()]}
          errorText="Please enter a category."
          onInput={inputHandler}
        />
  
        <Input
          id="stock"
          element="input"
          type="number"
          label="Stock"
          validators={[VALIDATOR_REQUIRE()]}
          errorText="Please enter Stock."
          onInput={inputHandler}
        />

      </form>

      
        <div className="inventoryitemaddbutton">
          <Button disabled={!formState.isValid} onClick={showButtonPopup}>
            ADD
          </Button>
        </div>
      

      <Popup trigger={buttonPopup} setTrigger={showButtonPopup} popup_description="Are you sure you want to Add this Item?">
        <button className='confirm-button' onClick={maintenanceAddSubmitHandler}>OK</button>
      </Popup>

    </React.Fragment>
  );
};

export default Additem;

