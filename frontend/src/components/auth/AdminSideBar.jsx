import React from 'react'
import { NavLink } from 'react-router-dom'
import { useState } from 'react'

import {
    FaBars,
    FaUserAlt,
    FaTh,
    FaAddressBook
} from "react-icons/fa"

const AdminSideBar = ({children}) => {

    const [isOpen, setIsOpen] = useState(false);
    const toggle = () => setIsOpen (!isOpen);

    //new
    // const sidebarToggle = document.querySelector('.sidebar-toggle');
    // const sidebar = document.querySelector('.sidebar');
    // const content = document.querySelector('.content');

    // sidebarToggle.addEventListener('click', () => {
    // sidebar.classList.toggle('open');
    // content.classList.toggle('sidebar-open');
    // });

    const menuItem=[
        {
            path: "/adminDashboard",
            name: "Sections",
            icon: <FaTh/>
        },

        {
            path: "/managerDetails",
            name: "Manager Details",
            icon: <FaAddressBook/>
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


export default AdminSideBar;