import React from 'react'
import AdminProfileInfo from '../../components/auth/AdminProfileInfo';
import AdminSideBar from '../../components/auth/AdminSideBar';
import AdminCheck from '../../components/auth/AdminCheck'


function AdminProfile() {

  return <>

 <AdminSideBar>
    <div className="page-content-profile">
      <div className="white-box-profile">
        <AdminCheck />
        <AdminProfileInfo />
      </div>
    
    </div>

    </AdminSideBar>
  </>

  
}

export default AdminProfile
