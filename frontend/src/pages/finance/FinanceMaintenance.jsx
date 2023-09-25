import React from 'react'
import Sidebar from '../../components/finance/Sidebar';
import AddMaintenance from "../../components/finance/AddMaintenance"
import AdminCheck from '../../components/auth/AdminCheck'

import '../page.css'
const FinanceMaintenance = () => {
  return (
    <>

    <Sidebar>
    <div className="container-dash">
    {/* <h2>MAINTENANCE</h2> */}
    </div>

    <div className="page-content">
      <div className="white-box">
        <AdminCheck />
        <AddMaintenance />
      </div>
    
    </div>

    </Sidebar>
    

    </>
  )
}


export default FinanceMaintenance ;