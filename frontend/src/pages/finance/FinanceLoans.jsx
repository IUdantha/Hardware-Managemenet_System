import React from 'react'
import Sidebar from '../../components/finance/Sidebar';
import AdminCheck from '../../components/auth/AdminCheck';
import LoanRecords from "../../components/finance/LoanRecords"

import '../page.css'
const FinanceLoans = () => {
  return (    <>
   
   <Sidebar>
    <div className="container-dash">
    {/* <h2>LOANS & DEBITS</h2> */}
    </div>

    <div className="page-content">
      <div className="white-box">
        <AdminCheck />
        <LoanRecords />
      </div>
    
    </div>

    </Sidebar>
    

    </>
  )
}


export default FinanceLoans ;