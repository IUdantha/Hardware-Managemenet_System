import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

import Input from "../finance/FormElements/Input";
import Button from "../finance/FormElements/Button";
import Button2 from "../finance/FormElements/Button2";
import LoadingSpinner from "../Spinner";
import ErrorModal from "../finance/UIElements/ErrorModal";
import { VALIDATOR_REQUIRE } from "../../features/finance/validators";
import { useForm } from "../../features/finance/form-hook";
import { useHttpClient } from "../../features/finance/http-hook";

import AdminCheck from "../auth/AdminCheck";
// import Popup from "./PopUp";

import { FaArrowLeft } from "react-icons/fa";

const EditItem = () => {
  const { isLoading, error, sendRequest, clearError } = useHttpClient();
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
          `http://localhost:5000/api/offorders/${itemId}`
        );
        setLoadedItem(responseData.item);
        console.log(responseData.item);
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

  const itemAddSubmitHandler = async (event) => {
    event.preventDefault();
    try {
      await sendRequest(
        `http://localhost:5000/api/offorders/add`,
        "POST",
        JSON.stringify({
          itemname: formState.inputs.itemname.value,
          description: formState.inputs.description.value,
          price: formState.inputs.price.value,
          category: formState.inputs.category.value,
          stock: formState.inputs.stock.value,
          quantity: formState.inputs.quantity.value,
          totPrice: formState.inputs.totPrice.value,
        }),
        {
          "Content-Type": "application/json",
        }
      );
      // history.push("/" + auth.userId + "/payments");
    } catch (err) {}
    navigate("/salesOrderList");
  };

  // pop up show

  // const [buttonPopupedit, setButtonPopupedit] = useState(false)
  // const showButtonPopupedit= () => setButtonPopupedit(!buttonPopupedit);

  const confirmDeleteHandler = async () => {
    try {
      await sendRequest(
        `http://localhost:5000/api/offorders/${itemId}`,
        "DELETE"
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

      {/* <ErrorModal error={error} onClear={clearError} /> */}

      {!isLoading && loadedItem && (
        <form className="payment-form" onSubmit={itemAddSubmitHandler}>
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
            element="input"
            type="text"
            label="Description"
            validators={[VALIDATOR_REQUIRE()]}
            errorText="Please enter a valid description."
            onInput={inputHandler}
            initialValue={loadedItem.description}
            initialValid={true}
            disable={true}
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
            disable={true}
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
            disable={true}
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
            disable={true}
          />

          <Input
            id="quantity"
            element="input"
            type="number"
            label="Quantity"
            validators={[VALIDATOR_REQUIRE()]}
            errorText="Please enter Quantity."
            onInput={inputHandler}
            initialValue={"0"}
            initialValid={true}
          />

          <Input
            id="totPrice"
            element="input"
            type="number"
            label="Total Price"
            validators={[VALIDATOR_REQUIRE()]}
            errorText="Please enter total price."
            onInput={inputHandler}
            initialValue={"0"}
            initialValid={true}
          />

          <div></div>
          <Button disabled={!formState.isValid}>ADD</Button>
        </form>
      )}
      <div className="inventoryeditdeletebutton">
        {/* <div className="inventoryeditbutton">
          <Button disabled={!formState.isValid} onClick={showButtonPopupedit}>
            UPDATE
          </Button>
        </div> */}
      </div>

      {/* <Popup trigger={buttonPopupedit} setTrigger={showButtonPopupedit} popup_description="Are you sure you want to Update this Item?">
        <button className='confirm-button' onClick={itemUpdateSubmitHandler} >Confirm</button>
      </Popup>  */}
    </React.Fragment>
  );
};

export default EditItem;

/*onSubmit={itemUpdateSubmitHandler}


<Input
            id="imagepath"
            element="input"
            type="text"
            label="Imagepath"
            validators={[VALIDATOR_REQUIRE()]}
            errorText="Please upload an image."
            onInput={inputHandler}
            initialValue={loadedItem.imagepath}
            initialValid={true}
          />


const [buttonPopup, setButtonPopup] = useState(false)
const showButtonPopup= () => setButtonPopup(!buttonPopup);

<div className="inventorydeletebutton">
          <Button onClick={showButtonPopup}>
            DELETE
          </Button>
        </div>

<Popup trigger={buttonPopup} setTrigger={showButtonPopup} popup_description="Are you sure you want to Delete this Item?">
        <button className='confirm-button' onClick={confirmDeleteHandler}>Confirm</button>
      </Popup>
*/
