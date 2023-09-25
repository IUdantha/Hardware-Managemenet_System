import React from 'react'
import EmpSideBar from '../../components/employee/EmpSideBar';
import AddEmployee from "../../components/employee/AddEmployee"
import AdminCheck from '../../components/auth/AdminCheck'


const EmployeeAdd = () => {
  return (
    <>

    <EmpSideBar>
    <div className="container-dash">
    <h2>Add Employee</h2>
    </div>

    <div className="page-content">
      <div className="white-box">
        <AdminCheck />
        <AddEmployee />
      </div>
    
    </div>

    </EmpSideBar>
    

    </>
  )
}


export default EmployeeAdd ;