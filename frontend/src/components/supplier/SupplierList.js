import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { FaEdit } from "react-icons/fa";

import Button from "./FormElements/Button";
import Button2 from "./FormElements/Button2";
import Button3 from "./FormElements/Button3";

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
  //confirm delete handler
  const refreshpage = () => {
    window.location.reload();
  };

  const confirmDeleteHandler = async (supplierId) => {
    try {
      await sendRequest(
        `http://localhost:5000/api/suppliers/${supplierId}`,
        "DELETE"
      );
      // Add notification to the "notifications" collection
      const notificationData = {
        message: "Supplier record deleted",
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

    refreshpage();
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
            <th scope="col"></th>
            <th scope="col"></th>
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

              <td className="alignCell">
                <Button to={`/displaySuppliers/edit/${supplier.id}`}>
                  EDIT
                </Button>
              </td>
              <td>
                <Button2
                  onClick={() => {
                    confirmDeleteHandler(supplier.id);
                  }}
                >
                  DELETE
                </Button2>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <Button3 to={`/manageSupplier`}>Add New Suppliers</Button3>
    </ul>
  );
};

export default SupplierList;
