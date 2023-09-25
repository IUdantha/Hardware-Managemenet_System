import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {VALIDATOR_REQUIRE,} from "../../features/finance/validators";
import { useForm } from "../../features/finance/form-hook";
import { useHttpClient } from "../../features/finance/http-hook";
import {FaArrowLeft} from "react-icons/fa"


import Input from "../finance/FormElements/Input";
import Button from "../finance/FormElements/Button";
import AdminCheck from '../auth/AdminCheck'
import LoadingSpinner from "../Spinner";
import Popup from "../PopUp";

import "./editItem.css";

const EditItem = () => {

  const { isLoading, sendRequest } = useHttpClient();
  const [loadedItem, setLoadedItem] = useState();
  const itemId = useParams().itemId;
  const navigate = useNavigate();

  const [formState, inputHandler, setFormData] = useForm(
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
 /*       imagepath:{
        value: "",
        isValid: false,
      },*/
        stock: {
        value: "",
        isValid: false,
      },
    },
    false
  );

  useEffect(() => {
    const fetchItem = async () => {
      try {
        const responseData = await sendRequest(
          `http://localhost:5000/api/items/${itemId}`
        );
        setLoadedItem(responseData.item);
        setFormData(
          {
            itemname: {
              value: responseData.item.itemname,
              isValid: true,
            },
            description: {
              value: responseData.item.description,
              isValid: true,
            },
            price: {
              value: responseData.item.price,
              isValid: false,
            },
            category: {
              value: responseData.item.category,
              isValid: false,
            },
 /*           imagepath: {
              value: responseData.item.imagepath,
              isValid: false,
            },*/
            stock: {
              value: responseData.item.stock,
              isValid: false,
            },
          },
          true
        );
      } catch (err) {}
    };
    fetchItem();
  }, [sendRequest, itemId, setFormData]);


  const itemUpdateSubmitHandler = async (event) => {
    event.preventDefault();
    try {
      await sendRequest(
        `http://localhost:5000/api/items/${itemId}`,
        "PATCH",
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
      // history.push("/" + auth.userId + "/payments");
    } catch (err) {}
    navigate("/inventoryDashboard");
  };

// pop up show
const [buttonPopupedit, setButtonPopupedit] = useState(false)
const showButtonPopupedit= () => setButtonPopupedit(!buttonPopupedit);


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
        <button onClick={() =>{ navigate('/inventoryDashboard')}}><FaArrowLeft/> BACK </button>
      </div>

      {!isLoading && loadedItem && (
        <form className="payment-form" /*onSubmit={itemUpdateSubmitHandler}*/>
          <Input
            id="itemname"
            element="input"
            type="text"
            label="Item Name"
            validators={[VALIDATOR_REQUIRE()]}
            errorText="Please enter a item name."
            onInput={inputHandler}
            initialValue={loadedItem.itemname}
            initialValid={true}
            disable={true}
          />
          <Input
            id="description"
            element="text"
            type="text"
            label="Description"
            validators={[VALIDATOR_REQUIRE()]}
            errorText="Please enter a valid description."
            onInput={inputHandler}
            initialValue={loadedItem.description}
            initialValid={true}
          />
          <Input
            id="price"
            element="input"
            type="number"
            label="Price"
            validators={[VALIDATOR_REQUIRE()]}
            errorText="Please enter a price."
            onInput={inputHandler}
            initialValue={loadedItem.price}
            initialValid={true}
          />
          
          <Input
            id="category"
            element="input"
            type="text"
            label="Category"
            validators={[VALIDATOR_REQUIRE()]}
            errorText="Please enter a category."
            onInput={inputHandler}
            initialValue={loadedItem.category}
            initialValid={true}
          />
          
          <Input
            id="stock"
            element="input"
            type="number"
            label="Stock"
            validators={[VALIDATOR_REQUIRE()]}
            errorText="Please enter Stock."
            onInput={inputHandler}
            initialValue={loadedItem.stock}
            initialValid={true}
          />

          <div >
          </div>
        </form>
        
        
      )}
      <div className="inventoryeditdeletebutton">
        <div className="inventoryeditbutton">
          <Button disabled={!formState.isValid} onClick={showButtonPopupedit}>
            UPDATE
          </Button>
        </div>
      </div>
      
      <Popup trigger={buttonPopupedit} setTrigger={showButtonPopupedit} popup_description="Are you sure you want to Update this Item?">
        <button className='confirm-button' onClick={itemUpdateSubmitHandler} >Confirm</button>
      </Popup> 

    </React.Fragment>
  );
};

export default EditItem;