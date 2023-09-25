import React from 'react'
import Sidebar from '../../components/finance/Sidebar';
import FinanceOverviewDetails from "../../components/finance/financeOverviewDetails"

import '../page.css'
const FinanceOverview = () => {
  return (
    <>
   
    <Sidebar>
    <div className="container-dash">
    {/* <h2>DASHBOARD</h2> */}
    </div>
    <div className="page-content">
        <div>
        <h2>Business Overview</h2>
          <FinanceOverviewDetails/>
          <iframe title="Upul hardware Report" width="100%"  height="600px" src="https://app.powerbi.com/reportEmbed?reportId=1196edf9-00be-49f8-b85f-f3327a4be4d7&autoAuth=true&ctid=44e3cf94-19c9-4e32-96c3-14f5bf01391a" frameborder="0" allowFullScreen="true"/>
        </div>
    </div>
  

    </Sidebar>
    

    </>
  )
}


export default FinanceOverview ;