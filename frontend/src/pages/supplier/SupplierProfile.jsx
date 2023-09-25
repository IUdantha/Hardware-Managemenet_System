import React from 'react'
import ManagerProfileInfo from "../../components/auth/ManagerProfileInfo"

import '../page.css'
import SupplierSideBar from '../../components/auth/SupplierSideBar';
import SupplierCheck from '../../components/auth/SupplierCheck';
import  { useEffect, useState } from "react";
import SupplierProfileInfo from '../../components/supplier/SupplierProfileInfo';

const SupplierProfile = () => {
  return (
    <>
   
    <SupplierSideBar>
    <div className="container-dash">
    <h2>My Profile</h2>
    </div>

    <div className="page-content">
      <div className="white-box">
        <SupplierCheck />
        <h2>Supplier Profile</h2>
        <SupplierProfileInfo />
      </div>
    
    </div>

    </SupplierSideBar>
    

    </>
  )
}

export default SupplierProfile ;