import React, { useState } from "react";
import { FaEdit } from "react-icons/fa";
import emailjs from '@emailjs/browser';
import Button from "../employee/FormElements/Button";
import Button2 from "../employee/FormElements/Button2";

//import EmployeeEdit from "../../pages/employee/EmployeeEdit";

const LeaveList = (props) => {
  const [filteredItems, setFilteredItems] = useState(props.items);

  function handleSearch(event) {
    const filter = event.target.value.toUpperCase();
    const filtered = props.items.filter((employee) =>
      Object.values(employee).join(" ").toUpperCase().includes(filter)
    );
    setFilteredItems(filtered);
  }

  const sendEmail = (e) => {
    e.preventDefault();

    emailjs.sendForm('service_12jlgi4', 'template_66cclww', e.target, 'Pdu6qrTk6EabUJOOi')
      .then((result) => {
          console.log(result.text);
      }, (error) => {
          console.log(error.text);
      });
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
            <th scope="col">EmpID</th>
            <th scope="col">Name</th>
            <th scope="col">Reason</th>
            <th scope="col">Date</th>
            <th scope="col">Time</th>
            <th scope="col">Note</th>
            <th scope="col"></th>
            <th scope="col"></th>

          </tr>
        </thead>
        <tbody>
          {filteredItems.length === 0 && (
            <tr>
              <td colSpan="6">
                <div className="center">
                  <h2>No Request found.</h2>
                </div>
              </td>
            </tr>
          )}
          {filteredItems.map((request) => (
            <tr key={request.id}>
              <td>{request.empid}</td>
              <td>{request.name}</td>
              <td>{request.reason}</td>
              <td>{request.date}</td>
              <td>{request.time}</td>
              <td>{request.note}</td> 
              <td className="alignCell">

                
                <form onSubmit={sendEmail}>
                  <input type="hidden" name="empid" value={request.empid}/>
                  <input type="hidden" name="name" value={request.name}/>
                  <Button type="submit" >Accept</Button> 
                </form>
              
              
              </td>
              <td>
              <Button2 type="Submit">
                Deny
            </Button2>
              </td>
        
              
            
            </tr>
          ))}
        </tbody>
      </table>
    </ul>
  );
};

export default LeaveList;
