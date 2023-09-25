import React from 'react'
import Sidebar from '../../components/delivery/Sidebar';
import DriverRecords from "../../components/delivery/DriverRecords"
import AdminCheck from '../../components/auth/AdminCheck'

const DriverDetails = () => {
  return (
    <>
   
    <Sidebar>
    <div className="container-dash">
    <h2>Driver Details</h2>
    </div>

    <div className="page-content">
      <div className="white-box">
        <AdminCheck />
        <DriverRecords />
      </div>
    
    </div>

    </Sidebar>
    

    </>
  )
}


export default DriverDetails ;