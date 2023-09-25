/*

import {useState, useEffect} from 'react'
import {useNavigate, useParams} from 'react-router-dom'
import {toast} from 'react-toastify'
import { getSpecificItems, updateItem, getItems } from '../../features/inventory/itemSlice'
//import {reset} from '../../features/auth/authSlice'
import {useSelector, useDispatch} from 'react-redux'

//import Popup from 'reactjs-popup'
import 'reactjs-popup/dist/index.css';
import Spinner from '../../components/Spinner'
//import Sidebar from '../../components/delivery/Sidebar'
//import AdminCheck from '../../components/auth/AdminCheck';


function UpdateItemForm(item) {


  const navigate = useNavigate()
  const dispatch = useDispatch()
  const param = useParams()

  const id = param.id;

  //const {items} = useSelector((state) => state.items[props.id] )

  

  


    


    
    const {isLoading, isError, message} = useSelector((state) => state.items )
    const {user} = useSelector((state) => state.auth)

    useEffect(() => {

      if(isError){
        console.log(message);
      }
  
      //get the goals from the backend and put it 'const {goals}' here
      //dispatch(getSpecificItems(id))
      //dispatch(getItems())


  
      
  
    }, [user,id, navigate, isError, message, dispatch])
  
    //const {items} = useSelector((state) => state.items )

    const [formData, setFormData] = useState({
      itemname: ``,
      itemid: `${id}`,
      unit: '',
      price: '',
      stock: '',
    })

    const {itemname,itemid,unit,price,stock} = formData


     //create onChange funciton
    const onChange = (e) => {
        setFormData((prevState) => ({...prevState,[e.target.name]: e.target.value  }));
    }



    //create onSubmit funciton
    const onSubmit = (e) => {

        e.preventDefault()
    
        const itemData = {itemname, itemid, unit, price, stock}
    
        dispatch(updateItem(id))
        
        if(isError){
            toast.error(message)
        }
        else{
          navigate('/inventoryDashboard')        
        }      
    }



    if(isLoading){
        return <Spinner/>
    }


    
    return <>
    
        <h2>Update item</h2>

        <form>
            <div className="form-group">
                <input 
                    type='text'
                    className='form-control'
                    id='itemname'
                    name='itemname' 
                    value={itemname} 
                    placeholder='Enter Item name'
                    onChange={onChange}
                />
            </div>

              <div className="form-group">
              <input 
                  type='text'
                  className='form-control'
                  id='itemid'
                  name='itemid' 
                  value={itemid} 
                  placeholder='Enter Item id'
                  onChange={onChange}
                />
              </div>
              
              <div className="form-group">
              <input 
                  type='text'
                  className='form-control'
                  id='unit'
                  name='unit' 
                  value={unit} 
                  placeholder='Enter Unit'
                  onChange={onChange}
                />
              </div>

              <div className="form-group">
                <input 
                  type='number'
                  className='form-control'
                  id='price'
                  name='price' 
                  value={price} 
                  placeholder='Enter price'
                  onChange={onChange}
                />
              </div>

              <div className="form-group">
                <input 
                  type='number'
                  className='form-control'
                  id='stock'
                  name='stock' 
                  value={stock} 
                  placeholder='Enter stock'
                  onChange={onChange}
                />
              </div>
              
            <div className="form-group">
                <button className='btn-cancel' onClick={() => {navigate('/inventoryDashboard')}}> Cancel </button>
                <button  type='submit' className='btn-add' onClick={onSubmit}> Submit </button>            
            </div>          
        </form>

        
        
    </>
}

export default UpdateItemForm

*/
import React from 'react'
import Sidebar from '../../components/sales/Sidebar';
import AdminCheck from '../../components/auth/AdminCheck'

import AddItems from "../../components/sales/AddItems"


function UpdateItemForm() {
  

    //const navigate = useNavigate()

    return <>
     <Sidebar>
    <div className="container-dash">
    <h2>Add Sales Items</h2>
    </div>

    <div className="page-content">
      <div className="white-box">
        <AdminCheck />
        <AddItems />
      </div>
    
    </div>

    </Sidebar>
    
    </>
}

export default UpdateItemForm




