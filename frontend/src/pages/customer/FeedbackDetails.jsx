import React from 'react'
import Sidebar from '../../components/customer/Sidebar';
import FeedbackRecords from "../../components/customer/FeedbackRecords";
import AdminCheck from '../../components/auth/AdminCheck'

const FeedbackDetails = () => {
  return (
    <>
   
    <Sidebar>
    <div className="container-dash">
    <h2>Feedback Details</h2>
    </div>

    <div className="page-content">
      <div className="white-box">
        <AdminCheck />
        <FeedbackRecords />
      </div>
    
    </div>

    </Sidebar>
    

    </>
  )
}


export default FeedbackDetails ;