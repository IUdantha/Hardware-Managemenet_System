import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useHttpClient } from "../../features/finance/http-hook";

import Button from "../finance/FormElements/Button";
import Popup from "../inventory/PopUp";

import "../../pages/inventory/inventoryPages.css";

const SupplierRequestList = (props) => {
  const navigate = useNavigate();

  const [filteredItems, setFilteredItems] = useState(props.items);

  function handleSearch(event) {
    const filter = event.target.value.toUpperCase();
    const filtered = props.items.filter((supplierRequests) =>
      Object.values(supplierRequests).join(" ").toUpperCase().includes(filter)
    );
    setFilteredItems(filtered);
  }

  const { sendRequest } = useHttpClient();

  const refreshpage = () => {
    window.location.reload();
  };

  const confirmDeleteHandler = async (iid) => {
    try {
      await sendRequest(
        `http://localhost:5000/api/supplierRequests/${iid}`,
        "DELETE"
      );
    } catch (err) {}

    //navigate("/supplierRequests");
    refreshpage();
  };

  const [buttonPopup, setButtonPopup] = useState(false);
  const showButtonPopup = () => setButtonPopup(!buttonPopup);

  return (
    <ul>
      <div className="search-bar">
        <div /*className="inventoryaddbutton"*/>
          <button
            className="supplierreqaddbutton"
            onClick={() => {
              navigate("/inventorySupplierForm");
            }}
          >
            Add Supplier req +
          </button>
        </div>

        <div>
          <input
            onKeyUp={handleSearch}
            id="myInput"
            className="search-bar-input form-control rounded"
            type="text"
            placeholder="Search"
          />
        </div>
      </div>

      {filteredItems.length === 0 && (
        <div className="center">
          <h2>No Items found.</h2>
        </div>
      )}

      {filteredItems.map((supplierRequests) => (
        <div className="storerequestbox" key={supplierRequests._id}>
          <div className="storerequestboxpart2">
            <table>
              <tr>
                <td>Supplier Id </td>
                <td>: {supplierRequests.supplierid}</td>
              </tr>
              <br></br>
              <tr>
                <td>Item Name </td>
                <td>: {supplierRequests.itemname}</td>
              </tr>
              <br></br>

              <tr>
                <td>Amount </td>
                <td>: {supplierRequests.amount}</td>
              </tr>
            </table>
          </div>
          <div className="supplierreqdeletebutton">
            <Button onClick={showButtonPopup}>DELETE</Button>
          </div>
          <Popup
            trigger={buttonPopup}
            setTrigger={showButtonPopup}
            popup_description="Are you sure you want to Delete this Item?"
          >
            <button
              className="confirm-button"
              onClick={() => {
                confirmDeleteHandler(supplierRequests._id);
              }}
            >
              Confirm
            </button>
          </Popup>
        </div>
      ))}
    </ul>
  );
};

export default SupplierRequestList;
