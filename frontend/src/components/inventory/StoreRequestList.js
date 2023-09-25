import React, { useState } from "react";

import Button from "../finance/FormElements/Button";
import Button2 from "../finance/FormElements/Button2";

const StoreRequestList = (props) => {

  const [filteredItems, setFilteredItems] = useState(props.items);
 
  function handleSearch(event) {
    const filter = event.target.value.toUpperCase();
    const filtered = props.items.filter((loan) =>
      Object.values(loan).join(" ").toUpperCase().includes(filter)
    );
    setFilteredItems(filtered);
  }

  return (
    <ul>
      <div className="search-bar">
        <div>
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
      
        
          {filteredItems.length === 0 && (
            <div className="center">
              <h2>No loans details found.</h2>
            </div>             
          )}

          {filteredItems.map((storeRequest) => (
            < div className="storerequestbox" key={storeRequest.id}>             
              <div className="storerequestboxpart1">
                Store Request ID : #{storeRequest.id}
              </div>

              <div className="storerequestboxpart2">
                Item Name : {storeRequest.itemid}
                <br></br>
                <br></br>

                Quantity : {storeRequest.quantity}     
              </div> 

              <div className="storereqbuttons">
                <Button>Accept</Button>     
                <Button2>Reject</Button2>   
              </div>
                              
            </div>
          ))}
        
      
    </ul>
  );
};

export default StoreRequestList;