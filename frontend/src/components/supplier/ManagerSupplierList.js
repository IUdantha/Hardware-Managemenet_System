import "jspdf-autotable";
import jsPDF from "jspdf";
import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { FaEdit } from "react-icons/fa";
import Button from "./FormElements/Button";
import Button2 from "./FormElements/Button2";
import { useHttpClient } from "../../features/supplier/http-hook";

import SupplierEdit from "../../pages/supplier/EditSuppliers";

const SupplierList = (props) => {
  const [filteredItems, setFilteredItems] = useState(props.items);
  const navigate = useNavigate();
  const { sendRequest } = useHttpClient();

  function handleSearch(event) {
    const filter = event.target.value.toUpperCase();
    const filtered = props.items.filter((supplier) =>
      Object.values(supplier).join(" ").toUpperCase().includes(filter)
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

    const title = "Supplier List Report";
    const headers = [
      [
        "Supplier ID",
        "Name",
        "NIC",
        "Contact",
        "Address",
        "Item ID",
        "Contract ID",
        "Email",
      ],
    ];

    const fed = filteredItems.map((data) => [
      data.supplierId,
      data.name,
      data.nic,
      data.contact,
      data.address,
      data.itemId,
      data.contractId,
      data.email,
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
    doc.save("Supplier-List-Report.pdf");
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
            <th scope="col">Supplier ID</th>
            <th scope="col">Name</th>
            <th scope="col">NIC</th>
            <th scope="col">Contact</th>
            <th scope="col">Address</th>
            <th scope="col">Item ID</th>
            <th scope="col">Contract ID</th>
            <th scope="col">Email</th>
          </tr>
        </thead>
        <tbody>
          {filteredItems.length === 0 && (
            <tr>
              <td colSpan="6">
                <div className="center">
                  <h2>No Suppliers found.</h2>
                </div>
              </td>
            </tr>
          )}
          {filteredItems.map((supplier) => (
            <tr key={supplier.id}>
              <td>#{supplier.supplierId}</td>
              <td>{supplier.name}</td>
              <td>{supplier.nic}</td>
              <td>{supplier.contact}</td>
              <td>{supplier.address}</td>
              <td>{supplier.itemId}</td>
              <td>{supplier.contractId}</td>
              <td>{supplier.email}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <Button
        onClick={() => {
          exportFeedbacks();
        }}
      >
        Download Report
      </Button>
    </ul>
  );
};

export default SupplierList;
