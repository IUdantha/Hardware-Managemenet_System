import React from 'react'
import Sidebar from '../../components/sales/Sidebar';
import InvoiceRecords from "../../components/sales/InvoiceRecords"
import AdminCheck from '../../components/auth/AdminCheck'


const SalesInvoice = () => {
  return (
    <>
   
    <Sidebar>
    <div className="container-dash">
    <h2>INVOICE</h2>
    </div>

    <div className="page-content">
      <div className="white-box">
        <AdminCheck />
        <InvoiceRecords />
      </div>
    
    </div>

    </Sidebar>
    

    </>
  )
}


export default SalesInvoice ;