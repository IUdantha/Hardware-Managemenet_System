import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

//Bring the header component
import Header from "./components/Header";

//Bring the pages

// import Dashboard from './pages/auth/Dashboard'
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";
import AdminDashboard from "./pages/auth/AdminDashboard";
import ManagerRegister from "./pages/auth/ManagerRegister";
import ManagerDashboard from "./pages/auth/ManagerDashboard";
import AdminProfile from "./pages/auth/AdminProfile";
import ManagerProfile from "./pages/auth/ManagerProfile";
import ManagerDetails from "./pages/auth/ManagerDetails";
import ManagerEdit from "./pages/auth/ManagerEdit";
import AddManager from "./components/auth/AddManager";

//Delivery

import DeliveryOverview from "./pages/delivery/DeliveryOverview";
import DeliveryDetails from "./pages/delivery/DeliveryDetails";
import DriverDetails from "./pages/delivery/DriverDetails";
import TrackDelivery from "./pages/delivery/TrackDelivery";
import DriverForm from "./pages/delivery/DriverForm";
import DriverEdit from "./pages/delivery/DriverEdit";
import DeliveryEdit from "./pages/delivery/DeliveryEdit";

import DeliveryForm from "./pages/delivery/DeliveryForm";

//finance
import FinanceOverview from "./pages/finance/FinanceOverview";
import FinancePayments from "./pages/finance/FinancePayments";
import FinanceMaintenance from "./pages/finance/FinanceMaintenance";
import FinanceLoans from "./pages/finance/FinanceLoans";
import FinanceReports from "./pages/finance/FinanceReports";
import PaymentEdit from "./pages/finance/PaymentEdit";
import NewLoan from "./pages/finance/NewLoan";
import LoanEdit from "./pages/finance/LoanEdit";
import FinancePaymentReports from "./pages/finance/FinancePaymentReports";
import FinanceLoanReports from "./pages/finance/FinanceLoanReports";

//customer

import CustomerDetails from "./pages/customer/CustomerDetails";
import CustomerEdit from "./pages/customer/CustomerEdit";
import CustomerFormnew from "./pages/customer/CustomerFormnew";

//feedback
import FeedbackDetails from "./pages/customer/FeedbackDetails";
import CustomerFeedbackForm from "./pages/customer/CustomerFeedbackForm";

//inquire

import InquireDetails from "./pages/customer/InquireDetails";
import InquireEdit from "./pages/customer/InquireEdit";
import InquireForm from "./pages/customer/InquireForm";
import CustomerDashboard from "./pages/customer/CustomerDashboard";

//employee

import EmployeeDetails from "./pages/employee/EmployeeDetails";
import EmployeeEdit from "./pages/employee/EmployeeEdit";
import EmployeeAdd from "./pages/employee/EmployeeAdd";

import EmployeeDashboard from "./pages/employee/EmployeeDashboard";
import EmployeeProfile from "./pages/employee/EmployeeProfile";
import EmployeeReqLeave from "./pages/employee/EmployeeReqLeave";

import ManagerCheckLeave from "./pages/auth/ManagerCheckLeave";

//inventory
import InventoryDashboard from "./pages/inventory/InventoryDashboard";
import ItemForm from "./pages/inventory/ItemForm";
import UpdateItemForm from "./pages/inventory/UpdateItemForm";
import StoreRequests from "./pages/inventory/StoreRequests";
import SupplierRequests from "./pages/inventory/SupplierRequests";
import InventorySupplierForm from "./pages/inventory/InventorySupplierForm";

//Sales
import SalesOrderList from "./pages/sales/SalesOrderList";
import SalesAddItems from "./pages/sales/SalesAddItems";
import SalesInvoice from "./pages/sales/SalesInvoice";
import InvoiceEdit from "./components/sales/InvoiceEdit";

//supplier
import ManageSupplier from './pages/supplier/ManageSupplier'
import DisplaySuppliers from './pages/supplier/DisplaySuppliers'
import EditSuppliers from './pages/supplier/EditSuppliers'
import DisplayContracts from './pages/supplier/DisplayContracts'
import AddContract from './pages/supplier/AddContract'
import EditContracts from './pages/supplier/EditContracts'
import SuppliersDashboard from './pages/auth/SuppliersDashboard' 
import Manager_displaySuppliers from './pages/supplier/Manager_displaySuppliers' 
import SupplierProfile from './pages/supplier/SupplierProfile'

//notification
import Notifications from "./pages/notificationPage";

function App() {
  return (
    <>
      <Router>
        <div className="container">
          <Header />
          <Routes>
            {/* <Route path="/" element={<Dashboard />} /> */}
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />

            <Route path="/adminDashboard" element={<AdminDashboard />} />
            <Route path="/managerRegister" element={<ManagerRegister />} />
            <Route path="/managerDashboard" element={<ManagerDashboard />} />
            <Route path="/adminProfile/:id" element={<AdminProfile />} />
            <Route path="/managerProfile/:id" element={<ManagerProfile />} />
            <Route path="/managerDetails" element={<ManagerDetails />} />
            <Route path="/managerEdit/:id" element={<ManagerEdit />} />
            <Route path="/addManager" element={<AddManager />} />

            <Route path="/deliveryOverview" element={<DeliveryOverview />} />
            <Route path="/deliveryDetails" element={<DeliveryDetails />} />
            <Route path="/driverDetails" element={<DriverDetails />} />
            <Route path="/trackDelivery" element={<TrackDelivery />} />
            <Route path="/driverForm" element={<DriverForm />} />
            <Route path="/driverEdit/:id" element={<DriverEdit />} />
            <Route path="/deliveryEdit/:id" element={<DeliveryEdit />} />

            <Route path="/deliveryForm" element={<DeliveryForm />} />

            {/* Customer */}
            <Route path="/customerDetails" element={<CustomerDetails />} />
            <Route
              path="/customerDetails/customer/:customerId"
              element={<CustomerEdit />}
            />
            <Route path="/customerFormnew" element={<CustomerFormnew />} />

            {/* Feedback */}
            <Route path="/feedbackDetails" element={<FeedbackDetails />} />
            <Route
              path="/customerFeedbackForm"
              element={<CustomerFeedbackForm />}
            />

            {/* Inquire */}
            <Route path="/inquireDetails" element={<InquireDetails />} />
            <Route
              path="/InquireDetails/inquire/:inquireId"
              element={<InquireEdit />}
            />

            <Route path="/inquireForm" element={<InquireForm />} />

            <Route path="/customerDashboard" element={<CustomerDashboard />} />

            {/*employee*/}

            <Route path="/employeeDetails" element={<EmployeeDetails />} />
            <Route
              path="/employeeEdit/:employeeId"
              element={<EmployeeEdit />}
            />
            <Route path="/addEmployee" element={<EmployeeAdd />} />

            <Route path="/employeeDashboard" element={<EmployeeDashboard />} />
            <Route path="/employeeProfile" element={<EmployeeProfile />} />
            <Route path="/employeeReqLeave" element={<EmployeeReqLeave />} />

            <Route path="/managerCheckLeave" element={<ManagerCheckLeave />} />

            {/* Finance */}
            <Route path="/financeOverview" element={<FinanceOverview />} />
            <Route path="/financePayments" element={<FinancePayments />} />
            <Route
              path="/financePayments/payment/:paymentId"
              element={<PaymentEdit />}
            />
            <Route
              path="/financeMaintenance"
              element={<FinanceMaintenance />}
            />
            <Route path="/financeLoans" element={<FinanceLoans />} />
            <Route path="/financeLoans/loan/:loanId" element={<LoanEdit />} />
            <Route path="/financeLoans/newloan" element={<NewLoan />} />
            <Route path="/financeReports" element={<FinanceReports />} />
            <Route
              path="/financePaymentReports"
              element={<FinancePaymentReports />}
            />
            <Route
              path="/financeLoanReports"
              element={<FinanceLoanReports />}
            />

            {/* Inventory */}
            <Route
              path="/inventoryDashboard"
              element={<InventoryDashboard />}
            />
            <Route path="/itemForm" element={<ItemForm />} />
            <Route
              path="/updateItemForm/:itemId"
              element={<UpdateItemForm />}
            />
            <Route path="/storeRequests" element={<StoreRequests />} />
            <Route path="/supplierRequests" element={<SupplierRequests />} />
            <Route
              path="/inventorySupplierForm"
              element={<InventorySupplierForm />}
            />

            {/* Sales */}
            <Route path="/salesOrderList" element={<SalesOrderList />} />
            <Route path="/salesAddItems/:itemId" element={<SalesAddItems />} />

            <Route path="/salesInvoice" element={<SalesInvoice />} />
            <Route
              path="/salesInvoice/invoiceEdit/:itemId"
              element={<InvoiceEdit />}
            />

    {/* Supplier */}
            <Route path='/manageSupplier' element={<ManageSupplier/>} />
              <Route path='/displaySuppliers' element={<DisplaySuppliers/>} />
              <Route
              path='/displaySuppliers/edit/:supplierId'
              element={<EditSuppliers/>}
              />
              <Route path='/displayContracts' element={<DisplayContracts/>} />
              <Route path='/addContract' element={<AddContract/>} />
              <Route
              path='/displayContracts/edit/:contractId'
              element={<EditContracts/>}
              />
              <Route path='/supplierdash' element={<SuppliersDashboard/>} />
              <Route path='/manager_suppliers' element={<Manager_displaySuppliers/>} />
              <Route path='/supplier_prof/:id' element={<SupplierProfile/>} />

            {/* Notification */}
            <Route path="/notifications" element={<Notifications />} />
          </Routes>
        </div>
      </Router>

      <ToastContainer />
    </>
  );
}

export default App;
