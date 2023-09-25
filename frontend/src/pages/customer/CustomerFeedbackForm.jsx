import React from 'react'
import  CustomerSideBar  from '../../components/auth/CustomerSideBar';
import AddFeedback from "../../components/customer/AddFeedback"
import CustomerCheck from '../../components/auth/CustomerCheck'


const CustomerFeedbackForm = () => {
  return (
    <>

    < CustomerSideBar >
    <div className="container-dash">
    <h2>Customer Feedback Form</h2>
    </div>

    <div className="page-content">
      <div className="white-box">
        <CustomerCheck />
        <AddFeedback />
      </div>
    
    </div>

    </ CustomerSideBar >
    

    </>
  )
}


export default CustomerFeedbackForm ;
