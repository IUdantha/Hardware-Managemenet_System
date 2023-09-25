import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import { FaEdit } from "react-icons/fa";

import Button from "./FormElements/Button";
import PaymentEdit from "../../pages/finance/PaymentEdit";
import { useHttpClient } from "../../features/finance/http-hook";

import "jspdf-autotable";
import jsPDF from "jspdf";

const InvoiceList = (props) => {
  const { isLoading, error, sendRequest, clearError } = useHttpClient();
  const navigate = useNavigate();

  const [filteredItems, setFilteredItems] = useState(props.items);

  function handleSearch(event) {
    const filter = event.target.value.toUpperCase();
    const filtered = props.items.filter((payment) =>
      Object.values(payment).join(" ").toUpperCase().includes(filter)
    );
    setFilteredItems(filtered);
  }

  const exportFeedbacks = () => {
    //console.log("Export PDF")

    const unit = "pt";
    const size = "A3";
    const orientation = "portrait";
    const marginLeft = 40;
    const doc = new jsPDF(orientation, unit, size);

    const title = "Invoice";
    const headers = [
      ["Item Name", "Description", "Price", "Quantity", "Total Price"],
    ];

    const fed = filteredItems.map((data) => [
      data.itemname,
      data.description,
      data.price,
      data.quantity,
      data.totPrice,
    ]);

    let content = {
      startY: 50,
      head: headers,
      body: fed,
    };

    doc.setFontSize(20);
    doc.text(title, marginLeft, 40);
    require("jspdf-autotable");
    doc.autoTable(content);
    doc.save("Item-List-Report.pdf");
  };

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
            <th scope="col">Item Name</th>
            <th scope="col">Description</th>
            <th scope="col">Price</th>
            <th scope="col">Quantity</th>
            <th scope="col">Total Price</th>
            <th scope="col"></th>
          </tr>
        </thead>
        <tbody>
          {filteredItems.length === 0 && (
            <tr>
              <td colSpan="6">
                <div className="center">
                  <h2>No Order found.</h2>
                </div>
              </td>
            </tr>
          )}
          {filteredItems.map((offOrder) => (
            <tr key={offOrder.id}>
              <td>{offOrder.itemname}</td>
              <td>{offOrder.description}</td>
              <td>{offOrder.price}</td>
              <td>{offOrder.quantity}</td>
              <td>{offOrder.totPrice}</td>

              <td className="alignCell">
                <Button to={`invoiceEdit/${offOrder.id}`}>EDIT</Button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <Button
        onClick={() => {
          exportFeedbacks();
        }}
      >
        Print Invoice
      </Button>
    </ul>
  );
};

export default InvoiceList;
