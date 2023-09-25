import React from 'react'
import { NavLink } from 'react-router-dom'

import { useState } from 'react'

import {
    FaBars,
    FaMapMarkedAlt,
    FaTh,
    FaUser,
    FaTruck
} from "react-icons/fa"

const Sidebar = ({children}) => {

    const [isOpen, setIsOpen] = useState(true);
    const toggle = () => setIsOpen (!isOpen);

    const menuItem=[
        {
            path: "/deliveryOverview",
            name: "Overview",
            icon: <FaTh/>
        },

        {
            path: "/deliveryDetails",
            name: "Delivery Details",
            icon: <FaTruck />
        },

        {
            path: "/driverDetails",
            name: "Driver Details",
            icon: <FaUser/>
        },

        {
            path: "/trackDelivery",
            name: "Track Delivery",
            icon: <FaMapMarkedAlt/>
        },
    ]
  return (
    <>
   
    <div className='container_delivery' >
        
        <div style={{width: isOpen ? "250px" : "70px"}} className='sidebar_delivery'>
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


export default Sidebar;