
import EmployeeSideBar from '../../components/employee/EmployeeSideBar'
import EmployeeCheck from '../../components/auth/EmployeeCheck'
import EmployeeDashComponent from '../../components/employee/EmployeeDashComponent'
import { useParams, useNavigate } from "react-router-dom";


function EmployeeProfile() {
  const navigate = useNavigate();


  return <>
<EmployeeCheck />
<EmployeeSideBar>
    <div className="dash-heading">
    <h2> Employee Profile</h2>
    </div>
<div className='empbackbutton'>
    <button onClick={() => {navigate('/employeeDashboard')}}>
      Back
    </button>

</div>
    
   
</EmployeeSideBar>
    
  </>


  
}

export default EmployeeProfile
