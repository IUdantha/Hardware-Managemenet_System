import React from 'react'
import "./popUp2.css"

function Popup(props) {
  return (props.trigger) ? (

    <div className='popup-background1'>      
        <div className='popup-box'>

          <div className='popup-title-box'>
            <span className='popup-title-text'>{props.popup_description}</span>
          </div>
          {props.children}
         
          <button className='close-button' onClick={() =>props.setTrigger()}>Cancel</button>
                
        </div>    
    </div>
  ): "";
} 

export default Popup