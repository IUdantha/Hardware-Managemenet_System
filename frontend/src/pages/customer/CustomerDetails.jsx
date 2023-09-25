import React from 'react'
import Sidebar from '../../components/customer/Sidebar';
import CustomerRecords from "../../components/customer/CustomerRecords"
import AdminCheck from '../../components/auth/AdminCheck'

const CustomerDetails = () => {
  return (
    <>
   
    <Sidebar>
    <div className="container-dash">
    <h2>Customer Details</h2>
    </div>

    <div className="page-content">
      <div className="white-box">
        <AdminCheck />
        <CustomerRecords />
      </div>
    
    </div>

    </Sidebar>
    

    </>
  )
}


export default CustomerDetails ;