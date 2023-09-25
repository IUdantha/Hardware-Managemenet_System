import React from 'react'
// import {useEffect} from 'react'
import { NavLink } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { useHttpClient } from "../../features/auth/http-hook";
// import { useParams } from 'react-router-dom';
// import {useSelector, useDispatch} from 'react-redux'
// import {reset} from '../../features/auth/authSlice'
// import { getProfile } from '../../features/auth/managerSlice'
import mongoose from 'mongoose';

import {
    FaBars,
    FaUserAlt,
    FaTh
} from "react-icons/fa"



const ManagerSideBar = ({props, children}) => {

    const [isOpen, setIsOpen] = useState(false);
    const toggle = () => setIsOpen (!isOpen);
   
    const menuItem=[
        {
            path: "/managerDashboard",
            name: "Sections",
            icon: <FaTh/>
        },

        
    ]
  return (
    <>
    

    <div className='container_delivery' >
        
        <div style={{width: isOpen ? "300px" : "70px"}} className='sidebar_delivery'>
            <div className='top_section'>
                
                <div style={{marginLeft: isOpen ? "170px" : "0px"}} className = "bars">
                    <FaBars onClick={toggle}/>
                </div>
            </div>
            {
                menuItem.map((item, index) => (
                 
                    <NavLink to={item.path} key={index} id="link" className={(navData) => (navData.isActive ? "active-style" : "link")} style={{paddingLeft: isOpen ? "30px" : "15px", textDecoration: "none"}}>
                        <div className="icon">{item.icon}</div>
                        <div style={{display: isOpen ? "block" : "none",  textDecoration: "none"}} className="link_text">{item.name}</div>
                    </NavLink>
                 
                )
                
                )
            }
        </div>
        <main style={{ width: isOpen ? 'calc(108% - 250px)' : '92%', transition: 'width 0.5s', paddingLeft: isOpen ? "30px" : "32px" }}>
          {children}  
        </main>
    </div>
    </>
  )
}


export default ManagerSideBar;