
import EmployeeSideBar from '../../components/employee/EmployeeSideBar'
import EmployeeCheck from '../../components/auth/EmployeeCheck'
import EmployeeDashComponent from '../../components/employee/EmployeeDashComponent'
import { useParams, useNavigate } from "react-router-dom";


function EmployeeDashboard() {

  const navigate = useNavigate();

  return <>
<EmployeeCheck />
<EmployeeSideBar>
  
    <div className="dash-heading">
    <h2> Employee Dashboard</h2>
    </div><div className="coners">
        </div>
        <div className='empdashboardbutton'>
            <button onClick={() => {navigate('/employeeProfile')}}>
                My profile
            </button>
        </div>
            
    
</EmployeeSideBar>
    
  </>


  
}

export default EmployeeDashboard
