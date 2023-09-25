import React from 'react'
import Sidebar from '../../components/finance/Sidebar';
import PaymentRecords from "../../components/finance/PaymentRecords"
import AdminCheck from '../../components/auth/AdminCheck'

import '../page.css'
const FinancePayments = () => {
  return (
    <>
   
    <Sidebar>
    <div className="container-dash">
    {/* <h2>PAYMENT RECORDS</h2> */}
    </div>

    <div className="page-content">
      <div className="white-box">
        <AdminCheck />
        <PaymentRecords />
      </div> 
    </div>

    </Sidebar>
    

    </>
  )
}


export default FinancePayments ;