import React from 'react'
import Sidebar from '../../components/sales/Sidebar';
import ItemRecords from "../../components/sales/ItemRecords"
import AdminCheck from '../../components/auth/AdminCheck'

const SalesOrderList = () => {
  return (
    <>
   
    <Sidebar>
    <div className="container-dash">
    <h2>ORDER LIST RECORDS</h2>
    </div>

    <div className="page-content">
      <div className="white-box">
        <AdminCheck />
        <ItemRecords />
      </div>
    
    </div>

    </Sidebar>
    

    </>
  )
}


export default SalesOrderList ;