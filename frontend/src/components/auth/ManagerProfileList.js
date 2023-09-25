import React, { useState } from "react";
import { FaPenSquare , FaRegTrashAlt } from "react-icons/fa";

import Button from "./FormElements/Button";
import ManagerEdit from "../../pages/auth/ManagerEdit";
import { useParams, useNavigate } from "react-router-dom";

const ManagerProfileList = (props) => {
  const [filteredItems, setFilteredItems] = useState(props.items);
  const managerId = useParams().id;
  
  function handleSearch(event) {
    const filter = event.target.value.toUpperCase();
    const filtered = props.items.filter((manager) =>
      Object.values(manager).join(" ").toUpperCase().includes(filter)
    );
    setFilteredItems(filtered);
  }

  return (
    <ul>
      <div className="search-bar">
        <div>
          <b>Managers</b>
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
            <th scope="col">Email</th>
            <th scope="col">NIC</th>
            <th scope="col">Contact</th>
            <th scope="col">Address</th>
            <th scope="col"> </th>
           
      
          </tr>
        </thead>
        <tbody>
          {filteredItems.length === 0 && (
            <tr>
              <td colSpan="6">
                <div className="center">
                  <h2>No Managers found.</h2>
                </div>
              </td>
            </tr>
          )}
          {filteredItems.map((manager) => (
            <tr key={manager.id}>
              <td>{manager.name}</td>
              <td>{manager.email}</td>
              <td>{manager.nic}</td>
              <td>{manager.contact}</td>
              <td>{manager.address}</td>
      
              <td>
                <Button to={`/managerEdit/${manager.id}`}> <FaPenSquare/></Button>
              </td>
            
            </tr>
          ))}
        </tbody>
      </table>
    </ul>
  );
};

export default ManagerProfileList;
