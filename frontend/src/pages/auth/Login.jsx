import {useState, useEffect} from 'react'
//useSelector - select something from the state(isError,...)
//useDispatch - asyncThunk(), reducer, register, reset
import {useSelector, useDispatch} from 'react-redux'
import "./login.css"
import { FaEnvelope, FaLock } from 'react-icons/fa';
//To redirect
import{useNavigate} from 'react-router-dom'

import {toast} from 'react-toastify'

import {login, reset} from '../../features/auth/authSlice'

import Spinner from '../../components/Spinner'

function Login() {

  const [formData, setFormData] = useState({

    email: '',
    password: '',

  })

  //Get details from the form
  const {email,password} = formData

  const navigate = useNavigate()
  const dispatch = useDispatch()

  const {user, isLoading, isError, isSuccess, message} = useSelector(
    (state) => state.auth
    
  )
  
  
  
  useEffect( () => {
      
    if(isError){
      toast.error(message)
    }

    if(isSuccess && user){
      
        if(user.type === 'manager'){
          navigate('/managerDashboard')
        }
        if(user.type === 'customer'){
          navigate('/customerDashboard')
        }
        if(user.type === 'admin'){
          navigate('/adminDashboard')
        }
        if(user.type === 'supplier'){
          navigate('/supplierdash')
        }
        if(user.type === 'employee'){
          navigate('/employeeProfile')
        }
  
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

    const userData = {
      email, password,
    };
    // Store email in localStorage
  localStorage.setItem('email', email);

    dispatch(login(userData))
  }

  if (isLoading){
      return <Spinner/>
  }

  
  return <>
 
 <div className='login-bg-container'>
  <section className='form-container-login'>
   
    <section className="heading-login">
      <h1 style={{color: "#360000"}}>
        <center>Login</center>
      </h1>
    </section>

    <section className="form">
      <form onSubmit = {onSubmit}>
    
        <div className="form-group-login">
          <div className="input-icon">
            <FaEnvelope />
          </div>
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

        <div className="form-group-login">
          <div className="input-icon">
            <FaLock />
          </div>
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

   
        <div className="form-group-login">
          <button type='submit' className='btn btn-block'>
            Submit
          </button>
        </div>
      
      </form>
    </section>
  
  </section>
</div>
  </>
}

export default Login
