import React from 'react'
import Sidebar from '../../components/delivery/Sidebar';
import AddDriver from "../../components/delivery/AddDriver"
import AdminCheck from '../../components/auth/AdminCheck'

const DriverForm = () => {
  return (
    <>

    <Sidebar>
    <div className="container-dash">
    <h2>Drivers</h2>
    </div>

    <div className="page-content">
      <div className="white-box">
        <AdminCheck />
        <AddDriver />
      </div>
    
    </div>

    </Sidebar>
    

    </>
  )
}


export default DriverForm ;