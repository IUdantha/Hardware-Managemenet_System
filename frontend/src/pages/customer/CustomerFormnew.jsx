import React from 'react'
import Sidebar from '../../components/customer/Sidebar';
import AddCustomer from "../../components/customer/AddCustomer"
import AdminCheck from '../../components/auth/AdminCheck'

const CustomerFormnew = () => {
  return (
    <>

    <Sidebar>
    <div className="container-dash">
    <h2>Customer Details Form</h2>
    </div>

    <div className="page-content">
      <div className="white-box">
        <AdminCheck />
        <AddCustomer />
      </div>
    
    </div>

    </Sidebar>
    

    </>
  )
}


export default CustomerFormnew ;