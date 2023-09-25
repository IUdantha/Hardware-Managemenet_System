import React from "react";

// Components
import InventorySidebar from '../../components/inventory/InventorySidebar'
import AdminCheck from '../../components/auth/AdminCheck'
import ItemRecords from '../../components/inventory/ItemRecords';



const InventoryDashboard = () => {
            
  return (
    <>
    <InventorySidebar>

      <div className="container-dash">
        <h2>Inventory</h2>
      </div>

      <div className="page-content">
        <div className="white-box">

          <AdminCheck />
          <ItemRecords />

        </div> 
      </div>

    </InventorySidebar>
    </>
  )
}

export default InventoryDashboard;