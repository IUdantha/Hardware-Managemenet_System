import React, { useState } from "react";
import { FaEdit } from "react-icons/fa";
import "./paymentList.css";
import Button from "./FormElements/Button";
import PaymentEdit from "../../pages/finance/PaymentEdit";

//generate report
import "jspdf-autotable";
import jsPDF from "jspdf";

const PaymentList = (props) => {
  const [filteredItems, setFilteredItems] = useState(props.items);

  function handleSearch(event) {
    const filter = event.target.value.toUpperCase();
    const filtered = props.items.filter((payment) =>
      Object.values(payment).join(" ").toUpperCase().includes(filter)
    );
    setFilteredItems(filtered);
  }

  //Generate Report
  const exportFeedbacks = () => {
    //console.log("Export PDF")

    const unit = "pt";
    const size = "A3";
    const orientation = "portrait";
    const marginLeft = 40;
    const doc = new jsPDF(orientation, unit, size);

    const date = new Date();

    // Get the date and time
    const year = date.getFullYear();
    const month = date.getMonth() + 1; // Adding 1 because month is zero-based
    const day = date.getDate();
    const hours = date.getHours();
    const minutes = date.getMinutes();
    const seconds = date.getSeconds();

    // Create formatted date and time strings
    const formattedDate = `${year}-${month}-${day}`;
    const formattedTime = `${hours}:${minutes}:${seconds}`;

    const title = `Payment Records Detail Report [${formattedDate} | ${formattedTime}]`;
    const headers = [
      ["Rec ID", "Rec Nub", "Description", "Type", "Date", "Amount"],
    ];

    const fed = filteredItems.map((data) => [
      data.id,
      data.recNub,
      data.description,
      data.type,
      data.date,
      data.amount,
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
    doc.save("Payment-Report.pdf");
  };

  //-----------------------------------
  return (
    <ul>
      <div className="search-bar">
        <div>
          <b>Records</b>
        </div>
        <div className="search-download">
          <lord-icon
            class="lord-icon-sm"
            src="https://cdn.lordicon.com/ausvvtws.json"
            trigger="loop"
            delay="300"
            colors="primary:#360000"
            onClick={() => exportFeedbacks()}
          ></lord-icon>
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
            <th scope="col">Rec ID</th>
            <th scope="col">Rec Nub</th>
            <th scope="col">Description</th>
            <th scope="col">Type</th>
            <th scope="col">Date</th>
            <th scope="col">Amount</th>
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
          {[...filteredItems].reverse().map((payment) => (
            <tr key={payment.id}>
              <td className="description">#{payment.id}</td>
              <td>#{payment.recNub}</td>
              <td>{payment.description}</td>
              <td>{payment.type}</td>
              <td>{payment.date}</td>
              <td>
                <b>Rs.{payment.amount}</b>
              </td>
              <td className="alignCell">
                <Button to={`/financePayments/payment/${payment.id}`}>
                  EDIT
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </ul>
  );
};

export default PaymentList;
