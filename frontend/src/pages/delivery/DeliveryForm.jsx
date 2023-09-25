import React from 'react'
import Sidebar from '../../components/delivery/Sidebar';
import AddDelivery from "../../components/delivery/AddDelivery"
import AdminCheck from '../../components/auth/AdminCheck'

const DeliveryForm = () => {
  return (
    <>

    <Sidebar>
    <div className="container-dash">
    <h2>Deliveries</h2>
    </div>

    <div className="page-content">
      <div className="white-box">
        <AdminCheck />
        <AddDelivery />
      </div>
    
    </div>

    </Sidebar>
    

    </>
  )
}


export default DeliveryForm ;