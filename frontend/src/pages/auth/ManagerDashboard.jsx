

import ManagerSideBar from '../../components/auth/ManagerSideBar'
import ManagerCheck from '../../components/auth/ManagerCheck'
import ManagerButtons from '../../components/auth/ManagerButtons'

function ManagerDashboard() {


  return <>
<ManagerCheck />
<ManagerSideBar>
    <div>
        <ManagerButtons />
    </div>
</ManagerSideBar>
    
  </>


  
}

export default ManagerDashboard
