import React from 'react'
import  CustomerSideBar from '../../components/auth/CustomerSideBar';
import AddInquire from "../../components/customer/AddInquire"
import CustomerCheck from '../../components/auth/CustomerCheck'
const InquireForm = () => {
  return (
    <>

    < CustomerSideBar >
    <div className="container-dash">
    <h2>Customer  Inquires Details Form</h2>
    </div>

    <div className="page-content">
      <div className="white-box">
        <CustomerCheck />
        <AddInquire />
      </div>
    
    </div>

    </ CustomerSideBar >
    

    </>
  )
}


export default InquireForm ;