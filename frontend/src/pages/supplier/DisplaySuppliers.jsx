import React from 'react'
import Sidebar from '../../components/supplier/Sidebar';
import SupplierRecords from "../../components/supplier/SupplierRecords"
import AdminCheck from '../../components/auth/AdminCheck'


const DisSuppliers = () => {
  return (
    <>
   
    <Sidebar>
    <div className="container-dash">
    <h2>SUPPLIER RECORDS</h2>
    </div>

    <div className="page-content">
      <div className="white-box">
        <AdminCheck />
        <SupplierRecords />
      </div>
    
    </div>

    </Sidebar>
    

    </>
  )
}


export default DisSuppliers ;