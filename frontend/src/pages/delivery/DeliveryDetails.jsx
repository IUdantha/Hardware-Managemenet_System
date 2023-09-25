import React from 'react'
import Sidebar from '../../components/delivery/Sidebar';
import DeliveryRecords from "../../components/delivery/DeliveryRecords"
import AdminCheck from '../../components/auth/AdminCheck'

const DeliveryDetails = () => {
  return (
    <>
   
    <Sidebar>
    <div className="container-dash">
    <h2>Delivery Details</h2>
    </div>

    <div className="page-content">
      <div className="white-box">
        <AdminCheck />
        <DeliveryRecords />
      </div>
    
    </div>

    </Sidebar>
    

    </>
  )
}


export default DeliveryDetails ;