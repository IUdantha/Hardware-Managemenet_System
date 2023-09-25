import React from 'react'
import Sidebar from '../../components/supplier/Manager_sidebar';
import ContractRecords from "../../components/supplier/ContractRecords"
import ManagerCheck from '../../components/auth/ManagerCheck'


const DisContracts = () => {

  
  return (
    <>
   
    <Sidebar>
    <div className="container-dash">
    <h2>CONTRACT RECORDS</h2>
    </div>

    <div className="page-content">
      <div className="white-box">
        <ManagerCheck />
        <ContractRecords />
      </div>
    
    </div>

    </Sidebar>
    

    </>
  )
}


export default DisContracts ;