
import  CustomerSideBar  from '../../components/auth/CustomerSideBar'
import CustomerCheck from '../../components/auth/CustomerCheck'

function CustomerDashboard() {


  return <>
<CustomerCheck />
< CustomerSideBar >
    <div className="dash-heading">
    <h2> Customer Profile</h2>
    </div>
    
</ CustomerSideBar >
    
  </>


  
}

export default CustomerDashboard
