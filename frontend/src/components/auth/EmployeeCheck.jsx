import {useEffect} from 'react'
import {useNavigate} from 'react-router-dom'
import {useSelector} from 'react-redux'


function EmployeeCheck() {

  const navigate = useNavigate()
  const {user} = useSelector((state) => state.auth )


  useEffect(() => {


    if(!user){
      navigate('/login')
    }else if(user.type !== 'employee'){
        navigate('/login')
    }

  }, [user, navigate])

} export default EmployeeCheck