import React from 'react'
import ManagerSideBar from '../../components/auth/ManagerSideBar';
import ManagerProfileInfo from "../../components/auth/ManagerProfileInfo"
import ManagerCheck from '../../components/auth/ManagerCheck'

const ManagerProfile = () => {
  return (
    <>
   
    <ManagerSideBar>
 

    <div className="page-content-profile">
      <div className="white-box-profile">
        <ManagerCheck />
        <ManagerProfileInfo />
      </div>
    
    </div>

    </ManagerSideBar>
    

    </>
  )
}


export default ManagerProfile ;