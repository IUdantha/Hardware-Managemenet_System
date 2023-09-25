import React from 'react'
import EmpSideBar from '../../components/employee/EmpSideBar';

import AdminCheck from '../../components/auth/AdminCheck'

import EmployeeRecords from '../../components/employee/EmployeeRecords';
const EmployeeDetails = () => {
  return (
    <>
   
    <EmpSideBar>
    <div className="container-dash">
    <h2>Employee Details</h2>
    </div>

    <div className="page-content">
      <div className="white-box">
        <AdminCheck />
        <EmployeeRecords />
      </div>
    
    </div>

    </EmpSideBar>
    

    </>
  )
}


export default EmployeeDetails ;