import React, { useState } from "react";
import { FaPlusCircle } from "react-icons/fa";
import "./paymentList.css";
import Button from "./FormElements/Button";
import Button3 from "./FormElements/Button3";
import PaymentEdit from "../../pages/finance/PaymentEdit";

//generate report
import "jspdf-autotable";
import jsPDF from "jspdf";

const LoanList = (props) => {
  const [filteredItems, setFilteredItems] = useState(props.items);

  function handleSearch(event) {
    const filter = event.target.value.toUpperCase();
    const filtered = props.items.filter((loan) =>
      Object.values(loan).join(" ").toUpperCase().includes(filter)
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

    const title = `Loan & Debit Details Report [${formattedDate} | ${formattedTime}]`;
    const headers = [
      [
        "Loan num",
        "Loan type",
        "Amount",
        "Interest",
        "Period",
        "Monthly Payment",
      ],
    ];

    const fed = filteredItems.map((data) => [
      data.loanNum,
      data.loanType,
      data.amount,
      data.interest,
      data.period,
      data.monthPayment,
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
    doc.save("Loan-Report.pdf");
  };

  //-----------------------------------

  return (
    <ul>
      <div className="search-bar">
        <div>
          <b>Loan & Debit Details</b>
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
            <th scope="col">Loan num</th>
            <th scope="col">Loan Type</th>
            <th scope="col">Amount</th>
            <th scope="col">Interest</th>
            <th scope="col">Period</th>
            <th scope="col">Monthly Payment</th>
            <th scope="col"></th>
          </tr>
        </thead>
        <tbody>
          {filteredItems.length === 0 && (
            <tr>
              <td colSpan="6">
                <div className="center">
                  <h2>No loans details found.</h2>
                </div>
              </td>
            </tr>
          )}
          {filteredItems.map((loan) => (
            <tr key={loan.id}>
              <td>#{loan.loanNum}</td>
              <td>{loan.loanType}</td>
              <td>{loan.amount}</td>
              <td>{loan.interest}</td>
              <td>{loan.period}</td>
              <td>
                <b>Rs.{loan.monthPayment}</b>
              </td>
              <td className="alignCell">
                <Button to={`/financeLoans/loan/${loan.id}`}>EDIT</Button>
                {/* <Button to={PaymentEdit}>EDIT</Button> */}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <Button3 to="/financeLoans/newloan">
        <FaPlusCircle /> ADD
      </Button3>
    </ul>
  );
};

export default LoanList;
