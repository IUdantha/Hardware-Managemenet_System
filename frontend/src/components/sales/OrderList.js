import React, { useState } from "react";
//import { FaEdit } from "react-icons/fa";

import Button from "./FormElements/Button";
import { useHttpClient } from "../../features/sales/http-hook";
//import PaymentEdit from "../../pages/finance/PaymentEdit";

const OrderList = (props) => {
  const [filteredItems, setFilteredItems] = useState(props.items);

  function handleSearch(event) {
    const filter = event.target.value.toUpperCase();
    const filtered = props.items.filter((orders) =>
      Object.values(orders).join(" ").toUpperCase().includes(filter)
    );
    setFilteredItems(filtered);
  }

  //________________________________________________
  /*
const {isLoading, error, sendRequest, clearError} = useHttpClient{};

const refreshpage = {} => {window.location.reload();}

const confirmDeleteHandler = async(iid) =>{

  try{
    await sendRequest(
      `http://localhost:5000/api/offorders/${iid}`,
      'DELETE'
    );
  } catch (err){}

  refreshpage();
};
*/

  //-_______________________________________________
  return (
    <ul>
      <div className="search-bar">
        <div>
          <b>Records</b>
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
      <table className="table table-striped" id="myTable">
        <thead>
          <tr id="tableHeader">
            <th scope="col">Order ID</th>
            <th scope="col">Date</th>
            <th scope="col">Customer Name</th>
            <th scope="col">Total Price</th>
            <th scope="col"></th>
          </tr>
        </thead>
        <tbody>
          {filteredItems.length === 0 && (
            <tr>
              <td colSpan="6">
                <div className="center">
                  <h2>No Payments found.</h2>
                </div>
              </td>
            </tr>
          )}
          {filteredItems.map((orderList) => (
            <tr key={orderList.id}>
              <td>#{orderList.orderID}</td>
              <td>{orderList.date}</td>
              <td>{orderList.customername}</td>
              <td>
                <b>Rs.{orderList.totAmount}</b>
              </td>
              <td className="alignCell">
                <Button to={`/financePayments/payment/${orderList.id}`}>
                  Edit
                </Button>
              </td>

              <td>
                <Popup
                  trigger={buttonPopup}
                  setTrigger={showButtonPopup}
                  popup_description="Confirm Delete?"
                >
                  <button
                    className="confirm-button"
                    onClick={() => {
                      confirmDeleteHandler(orders._id);
                    }}
                  >
                    Confirm
                  </button>
                </Popup>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </ul>
  );
};

export default OrderList;
