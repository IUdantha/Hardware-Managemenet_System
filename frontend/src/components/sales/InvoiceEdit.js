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
import "../../pages/finance/PaymentForm.css";
import AdminCheck from "../auth/AdminCheck";
// import Popup from "./PopUp";
// import "./editItem.css";
import { FaArrowLeft } from "react-icons/fa";
import Sidebar from "./Sidebar";
import Modal from "../../features/sales/Modal";

const InvoiceEdit = () => {
  const { isLoading, error, sendRequest, clearError } = useHttpClient();
  const [loadedInvoice, setLoadedInvoice] = useState();
  const [showDeleteConfirmModal, setDeleteShowConfirmModal] = useState(false);
  const [showUpdateConfirmModal, setUpdateShowConfirmModal] = useState(false);
  const itemId = useParams().itemId;
  const navigate = useNavigate();

  const showDeleteWarningHandler = () => {
    setDeleteShowConfirmModal(true);
  };

  const cancelDeleteHandler = () => {
    setDeleteShowConfirmModal(false);
  };

  const showUpdateWarningHandler = () => {
    setUpdateShowConfirmModal(true);
  };

  const cancelUpdateHandler = () => {
    setUpdateShowConfirmModal(false);
  };

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

      stock: {
        value: "",
        isValid: false,
      },

      quantity: {
        value: "",
        isValid: false,
      },

      totPrice: {
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
          `http://localhost:5000/api/salesinvoice/${itemId}`
        );
        setLoadedInvoice(responseData.invoice);
        setFormData(
          {
            itemname: {
              value: responseData.invoice.itemname,
              isValid: true,
            },
            description: {
              value: responseData.invoice.description,
              isValid: true,
            },
            price: {
              value: responseData.invoice.price,
              isValid: false,
            },
            category: {
              value: responseData.invoice.category,
              isValid: false,
            },
            stock: {
              value: responseData.invoice.stock,
              isValid: false,
            },
            quantity: {
              value: responseData.invoice.quantity,
              isValid: false,
            },
            totPrice: {
              value: responseData.invoice.totPrice,
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
        `http://localhost:5000/api/salesinvoice/${itemId}`,
        "PATCH",
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
    navigate("/salesInvoice");
  };

  const confirmDeleteHandler = async () => {
    try {
      await sendRequest(
        `http://localhost:5000/api/salesinvoice/${itemId}`,
        "DELETE"
      );
      // Add notification to the "notifications" collection
      const notificationData = {
        message: " Order list item Deleted",
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
    navigate("/salesInvoice");
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
      <Modal
        show={showDeleteConfirmModal} //showDeleteConfirmModal
        onCancel={cancelDeleteHandler}
        header="Are you sure?"
        footerClass="place-item__modal-actions"
        footer={
          <React.Fragment>
            <Button onClick={confirmDeleteHandler}>CONFIRM</Button>
            <Button2 onClick={cancelDeleteHandler}>CANCEL</Button2>
          </React.Fragment>
        }
      >
        <p>
          Do you want to proceed and delete this order Item?
        </p>
      </Modal>
      <Modal
        show={showUpdateConfirmModal}
        onCancel={cancelUpdateHandler}
        header="Are you sure?"
        footerClass="place-item__modal-actions"
        footer={
          <React.Fragment>
            <Button onClick={itemAddSubmitHandler}>CONFIRM</Button>
            <Button2 onClick={cancelUpdateHandler}>CANCEL</Button2>
          </React.Fragment>
        }
      >
        <p>After confirmation, the update will success!</p>
      </Modal>
      <AdminCheck />
      <Sidebar>
        {/* <ErrorModal error={error} onClear={clearError} /> */}
        {!isLoading && loadedInvoice && (
          <form className="payment-form" onSubmit={itemAddSubmitHandler}>
            <h2>Edit Invoice</h2>
            <h4>#{loadedInvoice.id}</h4>
            <Input
              id="itemname"
              element="input"
              type="text"
              label="Item Name"
              validators={[VALIDATOR_REQUIRE()]}
              errorText="Please enter a item name."
              onInput={inputHandler}
              initialValue={loadedInvoice.itemname}
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
              initialValue={loadedInvoice.description}
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
              initialValue={loadedInvoice.price}
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
              initialValue={loadedInvoice.category}
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
              initialValue={loadedInvoice.stock}
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
              initialValue={loadedInvoice.quantity}
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
              initialValue={loadedInvoice.totPrice}
              initialValid={true}
            />

            <div>
              <Button
                type="button"
                onClick={showUpdateWarningHandler}
                disabled={!formState.isValid}
              >
                UPDATE
              </Button>
              <Button2 type="button" onClick={showDeleteWarningHandler}>
                DELETE
              </Button2>
            </div>
          </form>
        )}
      </Sidebar>
    </React.Fragment>
  );
};

export default InvoiceEdit;
