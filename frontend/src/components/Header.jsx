import { FaSignInAlt, FaSignOutAlt, FaUser, FaUserCircle, FaBell } from 'react-icons/fa'
import { Link, useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { logout, reset } from '../features/auth/authSlice'
import { useEffect } from 'react'; // Import useEffect from 'react' to use side effects

function Header() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);

  const onLogout = () => {
    dispatch(logout());
    dispatch(reset());
    navigate('/login');
  }

  const onNotification = () => {
    navigate('/notifications');
  }

  const onProfile = () => {
    if (user.type === 'admin') {
      navigate(`/adminProfile/${user._id}`);
    } else if (user.type === 'manager') {
      navigate(`/managerProfile/${user._id}`);
    } else if (user.type === 'customer') {
      navigate(`/customerProfile/${user._id}`);
    } else if (user.type === 'supplier') {
      navigate(`/supplier_prof/${user._id}`);
    } else if (user.type === 'employee') {
      navigate(`/employeeProfile/${user._id}`);
    }
  }
  const onLogo = () => {
    if (!user){
      navigate('/login')
    }else if (user.type === 'admin') {
      navigate('/adminDashboard')
    } else if (user.type === 'manager') {
      navigate('/managerDashboard')
    } else if (user.type === 'customer') {
      navigate('/customerDashboard')
    } else if (user.type === 'supplier') {
      navigate('/supplierdash')
    } else if (user.type === 'employee') {
      navigate('/employeeDashboard')
    } 
  }

  useEffect(() => {
    // Update the date and time immediately when the component mounts
    updateDateTime();

    // Update the date and time every second
    const intervalId = setInterval(updateDateTime, 1000);

    // Clean up the interval when the component unmounts
    return () => clearInterval(intervalId);
  }, []); // Empty dependency array to run the effect only once when the component mounts

  function updateDateTime() {
    var dateTime = new Date();
    var date = dateTime.toLocaleDateString();
    var time = dateTime.toLocaleTimeString();
    document.getElementById('datetime').innerHTML = date + ' ' + time;
  }

  return (
    <header className='header'>
      <div className='logo'>
        <img onClick={onLogo} src="hardware_logo.png" alt="Logo" />
        <h1 style={{ marginRight: '10px' }}> | </h1>
        <h1 onClick={onLogo}>  UPUL HARDWARE</h1>
      </div>
      <ul>
        {/* Display live date and time */}
        <h5 style={{paddingTop: "20px", paddingRight: "20px"}}><div id="datetime"></div></h5>
        {user ? (
          <>
            <li>
              <button className="btn-lgt" onClick={onNotification} style={{ backgroundColor: " #d6d4d4", border: "none", paddingBottom: "1px", alignItems: "right" }}>
                <FaBell />
              </button>
            </li>
            <li>
              <button className="btn-lgt" onClick={onProfile} style={{ backgroundColor: " #d6d4d4", border: "none", paddingBottom: "1px", alignItems: "right" }}>
                <FaUserCircle />
              </button>
            </li>
            <li>
              <button className="btn-lgt" onClick={onLogout} style={{ backgroundColor: " #d6d4d4", border: "none", paddingBottom: "1px", alignItems: "right" }}>
                <FaSignOutAlt />
              </button>
            </li>
          </>
        ) : (
          <>
            {/*Linking to pages*/}
            <li>
              <Link to='/login' style={{ alignItems: 'flex-end', paddingTop: '10px' }}>
                <FaSignInAlt />Login
              </Link>
            </li>
            <li>
              <Link to='/register' style={{ alignItems: 'flex-end', paddingTop: '10px' }}>
                <FaUser />Register
              </Link>
            </li>
          </>
        )}
      </ul>

      
    </header>
  );
}

export default Header;
