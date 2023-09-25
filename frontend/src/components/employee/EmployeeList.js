import React, { useState } from "react";
import { FaEdit } from "react-icons/fa";

import Button from "./FormElements/Button";
import EmployeeEdit from "../../pages/employee/EmployeeEdit";
import "jspdf-autotable";
import jsPDF from 'jspdf';

//import "../../pages/inventory/inventoryPages.css"

const EmployeeList = (props) => {
  const [filteredItems, setFilteredItems] = useState(props.items);

  function handleSearch(event) {
    const filter = event.target.value.toUpperCase();
    const filtered = props.items.filter((employee) =>
      Object.values(employee).join(" ").toUpperCase().includes(filter)
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
  
    const title = "Employee Deatils Report";
    const headers = [["EmpID", "Name", "Nic","Email","Contact","Address","Gender","Age"]];
  
    const fed = filteredItems.map(
        data => [
            data.empid,
            data.name,
            data.nic,
           // data.type,
            data.email,
            data.contact,
            data.address,
            data.gender,
            data.age
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
    doc.save("Employee-Details-Report.pdf")
  
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
            <th scope="col">Employee ID</th>
            <th scope="col">Name</th>
            <th scope="col">NIC</th>
           {/* } <th scope="col">Type</th> */}
            <th scope="col">Email</th>
            <th scope="col">Contact</th>
            <th scope="col">Address</th>
            <th scope="col">Gender</th>
            <th scope="col">Age</th>
            <th scope="col"></th>
          </tr>
        </thead>
        <tbody>
          {filteredItems.length === 0 && (
            <tr>
              <td colSpan="6">
                <div className="center">
                  <h2>No Employee found.</h2>
                </div>
              </td>
            </tr>
          )}
          {filteredItems.map((employee) => (
            <tr key={employee.id}>
              <td>{employee.empid}</td>
              <td>{employee.name}</td>
              <td>{employee.nic}</td>
              {/* <td>{employee.type}</td> */}
              <td>{employee.email}</td>
              <td>{employee.contact}</td>
              <td>{employee.address}</td>
              <td>{employee.gender}</td>
              <td>{employee.age}</td>
       
              <td className="alignCell">
                <Button to={`/employeeEdit/${employee.id}`}>
                  EDIT
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <button onClick={() => {exportFeedbacks()}}> download</button>
    </ul>
  );
};

export default EmployeeList;
