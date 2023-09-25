
import {useNavigate} from 'react-router-dom'

import AdminSideBar from '../../components/auth/AdminSideBar';
import AdminCheck from '../../components/auth/AdminCheck';
import AdminButtons from '../../components/auth/AdminButtons';

function AdminDashboard() {


  return <>
 <AdminCheck />
 <AdminSideBar>
    <div className="dash-heading">
    {/* <h2> Dashboard</h2> */}
    </div>
    <div>
        <AdminButtons />
    </div>

    </AdminSideBar>
  </>


  
} export default AdminDashboard


