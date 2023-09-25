import React from 'react'
import AdminSideBar from '../../components/auth/AdminSideBar';
import ManagerRecords from "../../components/auth/ManagerRecords"
import AdminCheck from '../../components/auth/AdminCheck'


const ManagerDetails = () => {
  return (
    <>
   
    <AdminSideBar>
    <div className="container-dash">
    {/* <h2>Manager Details</h2> */}
    </div>

    <div className="page-content">
      <div className="white-box">
        <AdminCheck />
        <ManagerRecords />
      </div>
    
    </div>

    </AdminSideBar>
    

    </>
  )
}


export default ManagerDetails ;