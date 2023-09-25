import React from 'react'
import EmployeeSideBar from '../../components/employee/EmployeeSideBar';
import CreateLeave from "../../components/employee/CreateLeave"
import EmployeeCheck from '../../components/auth/EmployeeCheck'


const EmployeeReqLeave = () => {
  return (
    <>

    <EmployeeSideBar>
    <div className="container-dash">
    <h2>Leave Request</h2>
    </div>

    <div className="page-content">
      <div className="white-box">
        <EmployeeCheck />
        <CreateLeave />
      </div>
    
    </div>

    </EmployeeSideBar>
    

    </>
  )
}


export default EmployeeReqLeave