import React from 'react'
import Sidebar from '../../components/finance/Sidebar';
import AdminCheck from '../../components/auth/AdminCheck'


import '../page.css'
import "./FinanceReports.css"
import Button4 from '../../components/finance/FormElements/Button4';
const FinanceReports = () => {
  return (
    
    <>
   
    <Sidebar>
    <div className="container-dash">
    {/* <h2>REPORT & INVOICES</h2> */}
    </div>
    <div className="page-content">
        <div className="white-box">
          <h4><center><b>Section of Reports & Invoices Generate</b></center></h4>
          <br />
          <br />
          <AdminCheck />
          <div className='button-space'>
            <Button4 to="/financePaymentReports">Detailed Payment Report & Invoices<br/>
              <lord-icon
                class="lord-icon-lg"
                src="https://cdn.lordicon.com/frjgvxce.json"
                trigger="loop"
                delay="100"
                colors="primary:#360000">
              </lord-icon>
            </Button4>
            <Button4 to="/financeLoanReports">Detailed Loan & Debits Info<br />
              <lord-icon
                class="lord-icon-lg"
                src="https://cdn.lordicon.com/cigflfol.json"
                trigger="loop"
                delay="100"
                colors="primary:#360000">
              </lord-icon>
            </Button4>
          </div>
        </div>
        
    </div>
  

    </Sidebar>
    

    </>
  )
}


export default FinanceReports ;