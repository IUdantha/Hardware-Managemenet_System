import React from 'react'
import Sidebar from '../../components/supplier/Manager_sidebar';
import SupplierRecords from "../../components/supplier/ManagerSupplierRecords"
import ManagerCheck from '../../components/auth/ManagerCheck'


const DisSuppliers = () => {
  return (
    <>
   
    <Sidebar>
    <div className="container-dash">
    <h2>SUPPLIER RECORDS</h2>
    </div>

    <div className="page-content">
      <div className="white-box">
        <ManagerCheck />
        <SupplierRecords />
      </div>
    
    </div>

    </Sidebar>
    

    </>
  )
}


export default DisSuppliers ;