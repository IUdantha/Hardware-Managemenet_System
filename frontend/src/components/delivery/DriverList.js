import React, { useState } from "react";
import {useNavigate} from 'react-router-dom'
import { FaPenSquare , FaPlusCircle } from "react-icons/fa";

import Button from "./FormElements/Button";
import Button3 from "./FormElements/Button3";
import DriverEdit from "../../pages/delivery/DriverEdit";

//Report generate
import "jspdf-autotable";
import jsPDF from 'jspdf';

const DriverList = (props) => {

  const [assignedDrivers, setAssignedDrivers] = useState([]);

  const handleClick = (driverId) => {
    setAssignedDrivers([...assignedDrivers, driverId]);
  };


  const [filteredItems, setFilteredItems] = useState(props.items);
  const navigate = useNavigate();

  function handleSearch(event) {
    const filter = event.target.value.toUpperCase();
    const filtered = props.items.filter((driver) =>
      Object.values(driver).join(" ").toUpperCase().includes(filter)
    );
    setFilteredItems(filtered);
  }

  //Report Generation
  const exportFeedbacks = () => {
    //console.log("Export PDF")
  
    const unit = "pt";
    const size = "A3";
    const orientation = "portrait";
    const marginLeft = 40;
    const doc = new jsPDF(orientation, unit, size);
  
    const title = "Driver details Report";
    const headers = [["Name", "NIC", "Email", "Contact","Licence No", "Plate No"]];
  
    const fed = filteredItems.map(
        data => [
            data.name,
            data.nic,
            data.email,
            data.contact,
            data.licenceNo,
            data.plateNo,
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
    doc.save("Driver-details-Report.pdf")
  
  }



  return (
    <ul>
      <div className="search-bar">
        <div>
          <b>Drivers</b>
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
            <th scope="col">NIC</th>
            <th scope="col">Email</th>
            <th scope="col">Contact</th>
            <th scope="col">Licence No</th>
            <th scope="col">Plate No</th>
            <th scope="col"> </th>
            <th scope="col"> </th>
      
          </tr>
        </thead>
        <tbody>
          {filteredItems.length === 0 && (
            <tr>
              <td colSpan="6">
                <div className="center">
                  <h2>No Drivers found.</h2>
                </div>
              </td>
            </tr>
          )}
          {filteredItems.map((driver) => (
            <tr key={driver.id}>
              <td>{driver.name}</td>
              <td>{driver.nic}</td>
              <td>{driver.email}</td>
              <td>{driver.contact}</td>
              <td>{driver.licenceNo}</td>
              <td>{driver.plateNo}</td>
              <td className="alignCell">
                <button className="btn-assign"   onClick={() => handleClick(driver.id)} disabled={assignedDrivers.includes(driver.id)} 
                 style={{   backgroundColor: assignedDrivers.includes(driver.id) ? 'grey' : '',
                 border: assignedDrivers.includes(driver.id) ? '2px solid grey' : '' }}>
                 {assignedDrivers.includes(driver.id) ? 'Assigned' : 'Assign'}</button>
              </td>
              <td>
              <button className='btn-Dedit' onClick={() => navigate(`/driverEdit/${driver.id}`)}> <FaPenSquare/></button>
              </td>
            
            </tr>
          ))}
        </tbody>
      </table>
      <Button3 to="/driverForm">
        <FaPlusCircle /> Add Drivers
      </Button3>
      <button className = "btn-dReports" onClick= { exportFeedbacks}> Generate Report</button>
  
    </ul>
  );
};

export default DriverList;
