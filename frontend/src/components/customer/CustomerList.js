import React, { useState } from "react";
import { FaEdit } from "react-icons/fa";

import Button from "./FormElements/Button";
import CustomerEdit from "../../pages/customer/CustomerEdit";
import "jspdf-autotable";
import jsPDF from 'jspdf';


const CustomerList = (props) => {
  const [filteredItems, setFilteredItems] = useState(props.items);

  function handleSearch(event) {
    const filter = event.target.value.toUpperCase();
    const filtered = props.items.filter((customer) =>
      Object.values(customer).join(" ").toUpperCase().includes(filter)
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
  
    const title = "Customer Details Report";
    const headers = [["Record Number", "Name", "Email", "Type","NIC","Register Date","Contact"]];
  
    const fed = filteredItems.map(
        data => [
            data.recNub,
            data.name,
            data.email,
            data.type,
            data.nic,
            data.date,
            data.contact
        ]
    );
  
    let content = {
        startY: 50,
        head: headers,
        body: fed
    };
  
    doc.setFontSize(20);
    doc.text(title, marginLeft, 40);
    require('jspdf-autotable');
    doc.autoTable(content);
    doc.save("CustomerDetails.pdf")
  
  }



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
           <th scope="col">Rec Nub</th>
            <th scope="col">Name</th>
            <th scope="col">E-mail</th>
            <th scope="col">Type</th>
            <th scope="col">Nic</th>
            <th scope="col">Register Date</th>
            <th scope="col">Contact</th>
            <th scope="col"></th>
          </tr>
        </thead>
        <tbody>
          {filteredItems.length === 0 && (
            <tr>
              <td colSpan="6">
                <div className="center">
                  <h2>No Customers found.</h2>
                </div>
              </td>
            </tr>
          )}
          {filteredItems.map((customer) => (
            <tr key={customer.id}>
              <td>#00{customer.recNub}</td>
              <td>{customer.name}</td>
              <td>{customer.email}</td>
              <td>{customer.type}</td>
              <td>{customer.nic}</td>
              <td>{customer.date}</td>
              <td>
                0{customer.contact}
              </td>
              <td className="alignCell">
                <Button to={`/customerDetails/customer/${customer.id}`}>
                  EDIT
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <Button onClick={() => {exportFeedbacks()}}>Download</Button>
    </ul>
  );
};

export default CustomerList;
