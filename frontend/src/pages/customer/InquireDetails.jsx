import React from 'react'
import Sidebar from '../../components/customer/Sidebar';
import InquireRecords from "../../components/customer/InquireRecords"
import AdminCheck from '../../components/auth/AdminCheck'


const InquireDetails = () => {
  return (
    <>
   
    <Sidebar>
    <div className="container-dash">
    <h2>Inquire Details</h2>
    </div>

    <div className="page-content">
      <div className="white-box">
        <AdminCheck />
        <InquireRecords />
      </div>
    
    </div>

    </Sidebar>
    

    </>
  )
}


export default InquireDetails ;