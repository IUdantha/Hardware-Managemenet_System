import React from 'react'

//Components
import InventorySidebar from '../../components/inventory/InventorySidebar'
import AdminCheck from '../../components/auth/AdminCheck'
import AddSupplierRequest from '../../components/inventory/AddSupplierRequest'



const InventorySupplierForm = () => {

  return (
    <>
    <InventorySidebar>

      <div className="container-dash">
        <h2>Add Supplier Request</h2>
      </div>

      <div className="page-content">
        <div className="white-box">

          <AdminCheck />
          <AddSupplierRequest/>
          
        </div> 
      </div>

    </InventorySidebar>
    </>
  )
}

export default InventorySupplierForm;
