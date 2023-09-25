import React, { useState } from "react";
import {useNavigate} from 'react-router-dom'
import { FaPenSquare , FaPlusCircle } from "react-icons/fa";
import Button3 from "./FormElements/Button3";

import Button from "./FormElements/Button";
import DeliveryEdit from "../../pages/delivery/DeliveryEdit";

//Report generate
import "jspdf-autotable";
import jsPDF from 'jspdf';

const DeliveryList = (props) => {
  const [filteredItems, setFilteredItems] = useState(props.items);
  const navigate = useNavigate();


  function handleSearch(event) {
    const filter = event.target.value.toUpperCase();
    const filtered = props.items.filter((delivery) =>
      Object.values(delivery).join(" ").toUpperCase().includes(filter)
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
  
    const title = "Delivery details Report";
    const headers = [["Name", "OrderID", "Email", "Contact","Address", "Distance", "Cost","Time"]];
  
    const fed = filteredItems.map(
        data => [
            data.name,
            data.orderId,
            data.email,
            data.contact,
            data.address,
            data.distance,
            data.cost,
            data.time,
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
    doc.save("Delivery-details-Report.pdf")
  
  }



  return (
    <ul>
      <div className="search-bar">
        <div>
          <b>Deliveries</b>
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
            <th scope="col">OrderID</th>
            <th scope="col">Email</th>
            <th scope="col">Contact</th>
            <th scope="col">Address</th>
            <th scope="col">Distance</th>
            <th scope="col">Cost </th>
            <th scope="col">Time </th>
            <th scope="col"> </th>
            <th scope="col"> </th>
      
          </tr>
        </thead>
        <tbody>
          {filteredItems.length === 0 && (
            <tr>
              <td colSpan="6">
                <div className="center">
                  <h2>No Deliveries found.</h2>
                </div>
              </td>
            </tr>
          )}
          {[...filteredItems].reverse().map((delivery) => (
            <tr key={delivery.id}>
              <td>{delivery.name}</td>
              <td>{delivery.orderId}</td>
              <td>{delivery.email}</td>
              <td>{delivery.contact}</td>
              <td>{delivery.address}</td>
              <td>{delivery.distance}</td>
              <td>Rs.{delivery.cost}</td>
              <td>{delivery.time}min</td>
              <td className="alignCell">
                <button className="btn-assign" onClick={() => navigate('/driverDetails')}> Assign </button>
              </td>
              <td>
               <button className='btn-Dedit' onClick={() => navigate(`/deliveryEdit/${delivery.id}`)}> <FaPenSquare/></button>
              </td>
            
            </tr>
          ))}
        </tbody>
      </table>
      <Button3 to="/deliveryForm">
        <FaPlusCircle /> Add Deliveries
      </Button3>
      <button className = "btn-dReports" onClick= { exportFeedbacks}> Generate Report</button>
  
    </ul>
  );
};

export default DeliveryList;
