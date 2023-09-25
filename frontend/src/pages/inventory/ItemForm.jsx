import React from 'react'

//Components
import InventorySidebar from '../../components/inventory/InventorySidebar'
import Additem from '../../components/inventory/AddItem'
import AdminCheck from '../../components/auth/AdminCheck'



const ItemForm = () => {

  return (
    <>
    <InventorySidebar>
      <div className="container-dash">
        <h2>Add Item</h2>
      </div>

      <div className="page-content">
        <div className="white-box">

        <AdminCheck />
        <Additem />

        </div>
      </div>

    </InventorySidebar>
    </>
  )
}

export default ItemForm;
