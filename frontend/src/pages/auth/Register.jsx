import {useState, useEffect} from 'react'
//useSelector - select something from the state(isError,...)
//useDispatch - asyncThunk(), reducer, register, reset
import {useSelector, useDispatch} from 'react-redux'

//To redirect
import{useNavigate} from 'react-router-dom'

//To display toast msgs
import {toast} from 'react-toastify'

import {FaUser} from 'react-icons/fa'

import {register, reset} from '../../features/auth/authSlice'

import Spinner from '../../components/Spinner'

function Register() {


  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    password2: '',
    type:'',

  })

  //Get details from the form (Current State)
  const {name,email,password,password2,type} = formData

  // returns a function that lets you navigate programmatically
  const navigate = useNavigate()
  //returns a reference to the dispatch function from the Redux store. You may use it to dispatch actions as needed.
  const dispatch = useDispatch()

  //Allows you to extract data from the Redux store state, using a selector function.
  const {user, isLoading, isError, isSuccess, message} = useSelector(
    (state) => state.auth
    
  )
  
  //By using this Hook, you tell React that your component needs to do something after render.
  //React will remember the function you passed, and call it later after performing the DOM updates.
    useEffect( () => {

      if(isError){
        toast.error(message)
      }

      if(isSuccess || user){
          navigate('/')
      }

      dispatch(reset())
    }, [ user, isError, isSuccess, message, navigate, dispatch] )

  //create onChange function
  //To make the typing available
  const onChange = (e) => {
    setFormData((prevState) => ({
      //get the previous state
      //spread across the previous state to get all the other fields
      ...prevState,
      [e.target.name]: e.target.value,

    }))
  }

  //create onSubmit funciton
  const onSubmit = (e) => {
    e.preventDefault()

    if(password !== password2){
      toast.error('Passwords do not match')
    } else{
      const userData = {
        name, email, password, type
      }

      //dispatch - It takes in a function argument that returns the part of the state that you want
      //dispatching the function in authSlice.js
      //call the register function with arguments
      dispatch(register(userData))
  
    }
  }

  if(isLoading){
    //loading sign
    return <Spinner/>
  }

  return <>

  <div className="register-content">
    <section className="heading-register">
      <h1>
        <FaUser />Register
      </h1>
      <p>Please create an account</p>
    </section>

    <section className="form">
      <form onSubmit = {onSubmit}>
        <div className="form-group">
          <input 
            type='text'
            className='form-control'
            id='name'
            name='name' 
            value={name} 
            placeholder='Enter your name'
            onChange={onChange}
          />
        </div>
        <div className="form-group">
          <input 
            type='email'
            className='form-control'
            id='email'
            name='email' 
            value={email} 
            placeholder='Enter your email'
            onChange={onChange}
          />
        </div>

        <div className="form-group">
          <input 
            type='password'
            className='form-control'
            id='password'
            name='password' 
            value={password} 
            placeholder='Enter password'
            onChange={onChange}
          />
        </div>

        <div className="form-group">
          <input 
            type='password'
            className='form-control'
            id='password2'
            name='password2' 
            value={password2} 
            placeholder='Confirm password'
            onChange={onChange}
          />
        </div>
        <div className="form-group">
        <select name="type" id="type" value={type} onChange={onChange}>
          <option value=" " >Select Type</option>
          <option value="customer">Customer</option>
          
        </select>
        </div>
        <div className="form-group">
          <button type='submit' className='btn btn-block'>
            Submit
          </button>
        </div>
      
      </form>
    </section>
    </div>
  </>
  
}

export default Register
