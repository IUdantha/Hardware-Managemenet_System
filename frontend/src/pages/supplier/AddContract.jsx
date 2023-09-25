import React from 'react'
import Sidebar from '../../components/supplier/Manager_sidebar';
import AddContracts from "../../components/supplier/AddContract"
import ManagerCheck from '../../components/auth/ManagerCheck'

const AddContract = () => {
  return (
    <>

    <Sidebar>
    <div className="container-dash">
    <h2>Add Contract</h2>
    </div>

    <div className="page-content">
      <div className="white-box">
        <ManagerCheck />
        <AddContracts />
      </div>
    
    </div>

    </Sidebar>
    

    </>
  )
}


export default AddContract ;