import React from 'react'

import InventorySidebar from '../../components/inventory/InventorySidebar'
import AdminCheck from '../../components/auth/AdminCheck'
import EditItem from "../../components/inventory/EditItem"


function UpdateItemForm() {
  
  return (

      <>
      <InventorySidebar>

      <div className="container-dash">
        <h2>Update Item</h2>
      </div>

      <div className="page-content">
        <div className="white-box">

          <AdminCheck />
          <EditItem />

        </div>
      </div>

    </InventorySidebar>
    </>
  )
}

export default UpdateItemForm




