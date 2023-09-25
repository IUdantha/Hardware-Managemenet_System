import React from "react";

//Components
import InventorySidebar from '../../components/inventory/InventorySidebar'
import AdminCheck from '../../components/auth/AdminCheck'
import StoreRequestRecords from '../../components/inventory/StoreRequestRecords'



const StoreRequests = () => {
  
  return (
    <>
    <InventorySidebar>

      <div className="container-dash">
        <h2>Store Requests</h2>
      </div>

      <div className="page-content">
        <div className="white-box">

          <AdminCheck/>
          <StoreRequestRecords/>
       
        </div>
      </div>
  
    </InventorySidebar>
    </>
  )
}

export default StoreRequests ;