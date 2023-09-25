import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
// import authService from '../../features/auth/authService'
// import authSlice from '../../features/auth/authSlice'
import Input from "../../components/delivery/FormElements/Input";
import Button from "../../components/delivery/FormElements/Button";
import Button2 from "../../components/delivery/FormElements/Button2";
import LoadingSpinner from "../../components/Spinner";
import ErrorModal from "../../components/delivery/UIElements/ErrorModal";
import {
  VALIDATOR_REQUIRE,
  VALIDATOR_EMAIL,
  VALIDATOR_TEL,
} from "../../features/delivery/validators";
import { useForm } from "../../features/delivery/form-hook";
import { useHttpClient } from "../../features/delivery/http-hook";

import AdminCheck from "../../components/auth/AdminCheck";
import Sidebar from "../../components/delivery/Sidebar";

const AddDelivery = () => {
  const { isLoading, error, sendRequest, clearError } = useHttpClient();

  const navigate = useNavigate();

  const [formState, inputHandler] = useForm(
    {
      name: {
        value: "",
        isValid: false,
      },
      orderId: {
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
      distance: {
        value: "",
        isValid: false,
      },
      cost: {
        value: "",
        isValid: false,
      },
      time: {
        value: "",
        isValid: false,
      },
    },
    false
  );

  const deliveryAddSubmitHandler = async (event) => {
    event.preventDefault();
    try {
      await sendRequest(
        `http://localhost:5000/api/deliveries/`,
        "POST",
        JSON.stringify({
          name: formState.inputs.name.value,
          orderId: formState.inputs.orderId.value,
          email: formState.inputs.email.value,
          contact: formState.inputs.contact.value,
          address: formState.inputs.address.value,
          distance: formState.inputs.distance.value,
          cost: formState.inputs.cost.value,
          time: formState.inputs.time.value,
        }),

        {
          "Content-Type": "application/json",
        }
      );
      // const responseData = await sendRequest(
      //   "http://localhost:5000/api/users/"
      // );
      // console.log(responseData)
      // if(responseData.type === 'admin'){
      //   navigate('/deliveryDetails')
      // }
      // const token = responseData.token

      // const config = {
      //   headers: {
      //       Authorization:`Bearer ${token}`,
      //   }
      //}

      // Add notification to the "notifications" collection
      const notificationData = {
        message: "Delivery record added",
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
    navigate("/deliveryDetails");
    // }else if(user.type === 'employee'){
    //   navigate('/')
    // }else if(user.type === 'customer'){
    //   navigate('/')
    // }
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
      <form className="payment-form" onSubmit={deliveryAddSubmitHandler}>
        <h2>Add Delivery Details</h2>
        <br />
        <Input
          id="name"
          element="input"
          type="text"
          label="Customer Name"
          validators={[VALIDATOR_REQUIRE()]}
          errorText="Please enter a name."
          onInput={inputHandler}
        />
        <Input
          id="orderId"
          element="input"
          type="text"
          label="Order ID"
          validators={[VALIDATOR_REQUIRE()]}
          errorText="Please enter a valid order Id."
          onInput={inputHandler}
        />
        <Input
          id="email"
          element="input"
          type="email"
          label="Email"
          validators={[VALIDATOR_REQUIRE(), VALIDATOR_EMAIL()]}
          errorText="Please enter a valid email."
          onInput={inputHandler}
        />

        <Input
          id="contact"
          element="input"
          type="number"
          label="Contact Number"
          validators={[VALIDATOR_REQUIRE(), VALIDATOR_TEL()]}
          errorText="Please enter a valid contact number."
          onInput={inputHandler}
        />
        <Input
          id="address"
          element="text"
          type="text"
          label="Address"
          validators={[VALIDATOR_REQUIRE()]}
          errorText="Please enter a valid Address."
          onInput={inputHandler}
        />
        <Input
          id="distance"
          element="select"
          label="Distance"
          options={[
            { value: "", label: "Select distance", disabled: true },
            { value: "1 km", label: "1 km" },
            { value: "2 km", label: "2 km" },
            { value: "3 km", label: "3 km" },
            { value: "4 km", label: "4 km" },
            { value: "5 km", label: "5 km" },
          ]}
          onInput={inputHandler}
          validators={[VALIDATOR_REQUIRE()]}
          errorText="Please select an option."
        />

        <Input
          id="cost"
          element="select"
          label="Delivery Cost"
          options={[
            { value: "", label: "Select delivery cost", disabled: true },
            { value: "200", label: "Rs. 200.00" },
            { value: "300", label: "Rs. 300.00" },
            { value: "400", label: "Rs. 400.00" },
            { value: "500", label: "Rs. 500.00" },
            { value: "600", label: "Rs. 500.00" },
          ]}
          onInput={inputHandler}
          validators={[VALIDATOR_REQUIRE()]}
          errorText="Please select an option."
        />

        <Input
          id="time"
          element="select"
          label="Estimated Time"
          options={[
            { value: "", label: "Select estimated time", disabled: true },
            { value: "15", label: "15 min" },
            { value: "30", label: "30 min" },
            { value: "45", label: "45 min" },
            { value: "60", label: "60 min" },
            { value: "70", label: "70 min" },
          ]}
          onInput={inputHandler}
          validators={[VALIDATOR_REQUIRE()]}
          errorText="Please select an option."
        />

        <div>
          <Button type="submit" disabled={!formState.isValid}>
            ADD
          </Button>
          <Button2 onClick={() => navigate("/deliveryDetails")}>CANCEL</Button2>
        </div>
      </form>
    </React.Fragment>
  );
};

export default AddDelivery;
