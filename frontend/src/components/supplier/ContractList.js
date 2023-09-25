import React, { useState } from "react";
import { FaEdit } from "react-icons/fa";

import Button from "./FormElements/Button3";
import SupplierEdit from "../../pages/supplier/EditSuppliers";

const ContractList = (props) => {
  const [filteredItems, setFilteredItems] = useState(props.items);

  function handleSearch(event) {
    const filter = event.target.value.toUpperCase();
    const filtered = props.items.filter((contract) =>
      Object.values(contract).join(" ").toUpperCase().includes(filter)
    );
    setFilteredItems(filtered);
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
            <th scope="col">Contract ID</th>
            <th scope="col">Valid From</th>
            <th scope="col">Valid Till</th>
            <th scope="col">Description</th>
            <th scope="col"></th>
          </tr>
        </thead>
        <tbody>
          {filteredItems.length === 0 && (
            <tr>
              <td colSpan="6">
                <div className="center">
                  <h2>No Contracts found.</h2>
                </div>
              </td>
            </tr>
          )}
          {filteredItems.map((contract) => (
            <tr key={contract.id}>
              <td>#{contract.contractId}</td>
              <td>{contract.validFrom}</td>
              <td>{contract.validTill}</td>
              <td>{contract.description}</td>

              <td className="alignCell">
                <Button to={`/displayContracts/edit/${contract.id}`}>
                  EDIT
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <Button to={`/addContract`}>Add New Contract</Button>
    </ul>
  );
};

export default ContractList;
