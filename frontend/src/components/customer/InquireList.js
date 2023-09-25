import React, { useState } from "react";
import { FaEdit } from "react-icons/fa";

import Button from "./FormElements/Button";
import InquireEdit from "../../pages/customer/InquireEdit";

const InquireList = (props) => {
  const [filteredItems, setFilteredItems] = useState(props.items);

  function handleSearch(event) {
    const filter = event.target.value.toUpperCase();
    const filtered = props.items.filter((inquire) =>
      Object.values(inquire).join(" ").toUpperCase().includes(filter)
    );
    setFilteredItems(filtered);
  }

  return (
    <ul>
      <div className="search-bar">
        <div>
          <b>Inquire Records</b>
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
            <th scope="col">Name</th>
            <th scope="col">RecNo</th>
            <th scope="col">Email</th>
            <th scope="col">Contact</th>
            <th scope="col">Inquire</th>
            <th scope="col">Item </th>
          </tr>
        </thead>
        <tbody>
          {filteredItems.length === 0 && (
            <tr>
              <td colSpan="6">
                <div className="center">
                  <h2>No Inquires found.</h2>
                </div>
              </td>
            </tr>
          )}
          {filteredItems.map((inquire) => (
            <tr key={inquire.id}>
              <td>{inquire.name}</td>
              <td>{inquire.customId}</td>
              <td>{inquire.email}</td>
              <td>0{inquire.contact}</td>
              <td>{inquire.type}</td>
              <td>{inquire.address}</td>
             
              <td className="alignCell">
                <Button to={`/inquireDetails/inquire/${inquire.id}`}>
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

export default InquireList;
