
import SupplierSidebar from '../../components/auth/SupplierSideBar'
import SupplierCheck from '../../components/auth/SupplierCheck'
import ManagerButtons from '../../components/auth/ManagerButtons'

function SuppliersDashboard() {

  console.log(localStorage.getItem('email'))

  return <>
<SupplierCheck />
<SupplierSidebar>
    <div className="dash-heading">
    <h2> Supplier Dashboard</h2>
    </div>
    
    {/* <div>
        <ManagerButtons />
    </div> */}
</SupplierSidebar>
    
  </>


  
}

export default SuppliersDashboard
