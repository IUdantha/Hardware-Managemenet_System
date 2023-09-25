import React, { useState } from "react";

//import { FaEdit } from "react-icons/fa";

import { useNavigate } from "react-router-dom";

import Button from "../finance/FormElements/Button";
//import PaymentEdit from "../../pages/finance/PaymentEdit";
import LoadingSpinner from "../Spinner";
//import "../../pages/inventory/inventoryPages.css"
import { useHttpClient } from "../../features/finance/http-hook";
//import Popup from "./PopUp";

//---------
//import "jspdf-autotable";
//import jsPDF from 'jspdf';

const ItemList = (props) => {
  const navigate = useNavigate();

  const [filteredItems, setFilteredItems] = useState(props.items);

  function handleSearch(event) {
    const filter = event.target.value.toUpperCase();
    const filtered = props.items.filter((items) =>
      Object.values(items).join(" ").toUpperCase().includes(filter)
    );
    setFilteredItems(filtered);
  }

  //------------

  const { isLoading, error, sendRequest, clearError } = useHttpClient();

  const refreshpage = () => {
    window.location.reload();
  };

  const confirmDeleteHandler = async (iid) => {
    try {
      await sendRequest(`http://localhost:5000/api/items/${iid}`, "DELETE");
    } catch (err) {}

    //navigate("/supplierRequests");
    refreshpage();
  };

  //---------------------

  const [buttonPopup, setButtonPopup] = useState(false);
  const showButtonPopup = () => setButtonPopup(!buttonPopup);

  const [buttonPopup2, setButtonPopup2] = useState(false);
  const showButtonPopup2 = () => setButtonPopup2(!buttonPopup2);

  // report generation  -----------------------------------

  // const exportFeedbacks = () => {
  //   //console.log("Export PDF")

  //   const unit = "pt";
  //   const size = "A3";
  //   const orientation = "portrait";
  //   const marginLeft = 40;
  //   const doc = new jsPDF(orientation, unit, size);

  //   const title = "Item List Report";
  //   const headers = [["Item Name", "Description", "Price", "Category","Stock"]];

  //   const fed = filteredItems.map(
  //       data => [
  //           data.itemname,
  //           data.description,
  //           data.price,
  //           data.category,
  //           data.stock
  //       ]
  //   );

  //   let content = {
  //       startY: 50,
  //       head: headers,
  //       body: fed
  //   };

  //   doc.setFontSize(20);
  //   doc.text(title, marginLeft, 40);
  //   require('jspdf-autotable');
  //   doc.autoTable(content);
  //   doc.save("Item-List-Report.pdf")

  //   showButtonPopup2();
  // }
  //-------------------------------------------

  return (
    <ul>
      <div className="search-bar">
        <div className="inventoryaddbutton">
          <h3>Item List</h3>
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
            <th scope="col">Item Name</th>
            <th scope="col">Description</th>
            <th scope="col">Price</th>
            <th scope="col">Category</th>

            <th scope="col">Stock</th>

            <th scope="col"></th>
          </tr>
        </thead>
        <tbody>
          {filteredItems.length === 0 && (
            <tr>
              <td colSpan="6">
                <div className="center">
                  <h2>No Items found.</h2>
                </div>
              </td>
            </tr>
          )}
          {filteredItems.map((items) => (
            <tr key={items._id}>
              <td>{items.itemname}</td>
              <td>{items.description}</td>
              <td>RS.{items.price}</td>
              <td>{items.category}</td>
              <td>{items.stock}</td>

              <td className="alignCell">
                <Button to={`/salesAddItems/${items._id}`}>ADD</Button>
              </td>
              {/* <Popup trigger={buttonPopup} setTrigger={showButtonPopup} popup_description="Are you sure you want to Delete this Item?">
                <button className='confirm-button' onClick={() => {confirmDeleteHandler(items._id)}}>Confirm</button>
              </Popup>  */}
            </tr>
          ))}
        </tbody>
      </table>
      {/* 
      <div className="downloaditemlistbutton">
        <button onClick={showButtonPopup2}> Download Item List </button>
        
      </div>
      <Popup trigger={buttonPopup2} setTrigger={showButtonPopup2} popup_description="Are you sure you want to Download report ?">
        <button className='confirm-button' onClick={() => {exportFeedbacks()}}>Confirm</button>
      </Popup>  */}
    </ul>
  );
};

export default ItemList;
/*<Button to={`/deleteItem/${items._id}`}>
                DELETE
              </Button>  
              
              
              onClick={showButtonPopup}*/
