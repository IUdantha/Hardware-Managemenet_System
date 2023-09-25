import React from 'react'
import { NavLink } from 'react-router-dom'

import { useState } from 'react'

import {
    FaBars,
    FaUserAlt,
    FaTh
} from "react-icons/fa"

const ManagerCSideBar = ({children}) => {

    const [isOpen, setIsOpen] = useState(true);
    const toggle = () => setIsOpen (!isOpen);

    const menuItem=[
        {
            path: "/managerDashboard",
            name: "Sections",
            icon: <FaTh/>
        },

        {
            path: "/managerProfile",
            name: "My Profile",
            icon: <FaUserAlt/>
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
                    <NavLink to={item.path} key={index} id="link" className={(navData) => (navData.isActive ? "active-style" : "link")} style={{paddingLeft: isOpen ? "30px" : "15px"}}>
                        <div className="icon">{item.icon}</div>
                        <div style={{display: isOpen ? "block" : "none"}} className="link_text">{item.name}</div>
                    </NavLink>
                )
                
                )
            }
        </div>
        <main>
          {children}  
        </main>
    </div>
    </>
  )
}


export default ManagerCSideBar;