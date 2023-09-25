import React from 'react'
import ManagerESideBar from '../../components/auth/ManagerEsideBar';

import LeaveRecords from '../../components/auth/LeaveRecords';
const ManagerCheckLeave = () => {
  return (
    <>
   
    <ManagerESideBar>
    <div className="container-dash">
    <h2>Leave Details</h2>
    </div>

    <div className="page-content">
      <div className="white-box">
        <LeaveRecords />
      </div>
    
    </div>

    </ManagerESideBar>
    

    </>
  )
}


export default ManagerCheckLeave ;