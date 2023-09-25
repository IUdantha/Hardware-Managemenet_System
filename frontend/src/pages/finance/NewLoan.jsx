import React from 'react'
import Sidebar from '../../components/finance/Sidebar';
import AddLoan from "../../components/finance/AddLoan"
import AdminCheck from '../../components/auth/AdminCheck'

import '../page.css'
const NewLoan = () => {
  return (
    <>

    <Sidebar>
    <div className="container-dash">
    <h2>LOANS & DEBITS</h2>
    </div>

    <div className="page-content">
      <div className="white-box">
        <AdminCheck />
        <AddLoan />
      </div>
    
    </div>

    </Sidebar>
    

    </>
  )
}


export default NewLoan ;