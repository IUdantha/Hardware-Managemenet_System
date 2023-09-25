import React from 'react'
import Sidebar from '../../components/supplier/Sidebar';
import AddSupplier from "../../components/supplier/AddSupplier"
import AdminCheck from '../../components/auth/AdminCheck'


const ManageSupplier = () => {
  return (
    <>

    <Sidebar>
    <div className="container-dash">
    <h2>Add Supplier</h2>
    </div>

    <div className="page-content">
      <div className="white-box">
        <AdminCheck />
        <AddSupplier />
      </div>
    
    </div>

    </Sidebar>
    

    </>
  )
}


export default ManageSupplier ;