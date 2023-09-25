import React from 'react'
import { useNavigate } from 'react-router-dom'

const AdminButtons = () => {

    
const navigate = useNavigate()
  return (
    <section className="form">
        <div className="page-content-forDashboard">
            <div className="white-box-forDashboard">
                <div className="form-group">
               
                <div className="button-container">
                    <button  className='btn-ad' onClick={() =>{ navigate('/customerFormnew')}}>
                        <ion-icon name="people-circle-outline"></ion-icon>
                        Customer Management
                    </button>
                    <button className='btn-ad'onClick={() =>{ navigate('/employeeDetails')}}>
                        <ion-icon name="accessibility-outline"></ion-icon>
                        Employee Management
                    </button>
                    <button  className='btn-ad' onClick={() =>{ navigate('/displaySuppliers')}}>
                        <ion-icon name="boat-outline"></ion-icon>
                        Supplier Management
                    </button>
                    <button  className='btn-ad' onClick={() =>{ navigate('/inventoryDashboard')}}>
                        <ion-icon name="grid-outline"></ion-icon>
                        Inventory Management
                    </button>
                    <button className='btn-ad' onClick={() =>{ navigate('/SalesOrderList')}}>
                        <ion-icon name="receipt-outline"></ion-icon>
                        Sales Management
                    </button>
                    <button className='btn-ad'>
                        <ion-icon name="storefront-outline"></ion-icon>
                        Online Store
                    </button>
                    <button className='btn-ad' onClick={() =>{ navigate('/deliveryOverview')}}>
                        <ion-icon name="car-outline"></ion-icon>
                        Delivery Management
                    </button>
                    <button className='btn-ad'onClick={() =>{ navigate('/financeOverview')}}>
                        <ion-icon name="cash-outline"></ion-icon>
                        Finance Management
                    </button>
                   </div>

                </div>
            </div>
        </div>
    </section>
  )
}


export default AdminButtons