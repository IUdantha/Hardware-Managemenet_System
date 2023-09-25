import {useEffect} from 'react'
import {useNavigate} from 'react-router-dom'
import {useSelector} from 'react-redux'


function AdminCheck() {

  const navigate = useNavigate()
  const {user} = useSelector((state) => state.auth )


  useEffect(() => {


    if(!user){
      navigate('/login')
    }else if(user.type !== 'admin'){
        navigate('/login')
    }

  }, [user, navigate])

} export default AdminCheck