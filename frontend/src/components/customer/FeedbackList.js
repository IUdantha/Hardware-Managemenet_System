import React, { useState } from "react";
import { FaEdit } from "react-icons/fa";

import Button from "./FormElements/Button";


const FeedbackList = (props) => {
  const [filteredItems, setFilteredItems] = useState(props.items);

  function handleSearch(event) {
    const filter = event.target.value.toUpperCase();
    const filtered = props.items.filter((feedback) =>
      Object.values(feedback).join(" ").toUpperCase().includes(filter)
    );
    setFilteredItems(filtered);
  }

  return (
    <ul>
      <div className="search-bar">
        <div>
          <b>Feedback </b>
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
            <th scope="col">Customer Name</th>
            <th scope="col">Type</th>
            <th scope="col">Contact</th>
            <th scope="col">How Helpful</th>
            <th scope="col">Rate Us</th>
            <th scope="col">CheckoutExperience</th>
            <th scope="col">Satisfaction</th>
            
          </tr>
        </thead>
        <tbody>
          {filteredItems.length === 0 && (
            <tr>
              <td colSpan="6">
                <div className="center">
                  <h2>No Feedbacks found.</h2>
                </div>
              </td>
            </tr>
          )}
          {filteredItems.map((feedback) => (
            <tr key={feedback.id}>
              <td>{feedback.name}</td>
              <td>{feedback.type}</td>
              <td>0{feedback.contact}</td>
              <td>{feedback.help}</td>
              <td>{feedback.reccomend}</td>
              <td>{feedback.easy}</td>
              <td>{feedback.happy}</td>
            
                
         
          
            </tr>

        ))} 
        </tbody>
      </table>
    </ul>
  );
};

export default FeedbackList;
