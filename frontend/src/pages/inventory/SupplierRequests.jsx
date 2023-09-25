import React from 'react'

//Components
import InventorySidebar from '../../components/inventory/InventorySidebar'
import SupplierRequestRecords from '../../components/inventory/SupplierRequestRecords'
import AdminCheck from '../../components/auth/AdminCheck'


const SupplierRequests = () => {

  return (
    <>
    <InventorySidebar>
      <div className="container-dash">
        <h2>Supplier Requests</h2>
      </div>

      <div className="page-content">
        <div className="white-box">

          <AdminCheck/>
          <SupplierRequestRecords />
        
        </div>
      </div>

    </InventorySidebar>
    </>
  )
}

export default SupplierRequests ;
