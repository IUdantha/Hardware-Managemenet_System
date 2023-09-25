import React from 'react'
import AdminSideBar from '../../components/auth/AdminSideBar';
import AddManager from "../../components/auth/AddManager"
import AdminCheck from '../../components/auth/AdminCheck'


const ManagerRegister = () => {
  return (
    <>

    <AdminSideBar>
    <div className="container-dash">
    <h2>Manager Details</h2>
    </div>

    <div className="page-content">
      <div className="white-box">
        <AdminCheck />
        <AddManager/>
      </div>
    
    </div>

    </AdminSideBar>
    

    </>
  )
}


export default ManagerRegister;