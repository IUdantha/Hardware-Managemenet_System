import React, { useEffect, useState } from "react";
import ErrorModal from "../../components/auth/UIElements/ErrorModal";
import LoadingSpinner from "../Spinner";
import { useHttpClient } from "../../features/auth/http-hook";
import { useParams } from 'react-router-dom';
import AdminSideBar from "./AdminSideBar";
import { useForm } from "../../features/delivery/form-hook";
import AdminCheck from "./AdminCheck";
import { FaUserCircle } from 'react-icons/fa';


const AdminProfileInfo = () => {
  const adminId  = useParams().id;
  const { isLoading, error, sendRequest, clearError } = useHttpClient();
  const [loadedAdmins, setLoadedAdmins] = useState();

  useEffect(() => {
    const fetchAdmin= async () => {
      try {
        const responseData = await sendRequest(
          `http://localhost:5000/api/admins/${adminId}`
        );
        setLoadedAdmins(responseData.admin);
      } catch (err) {}
    };
    fetchAdmin();
  }, [sendRequest, adminId]);

  if (isLoading) {
    return (
      <div className="center">
        <LoadingSpinner />
      </div>
    );
  }

  return (
    <React.Fragment>

      <AdminCheck />
  
      {/* <ErrorModal error={error} onClear={clearError} /> */}
      {!isLoading && loadedAdmins && (<div className="centered-heading">MY PROFILE</div>)}
      {!isLoading && loadedAdmins && (
        <div className="profile-details">
          <div className="profile-photo">
             <FaUserCircle className="profile-photo-icon" />
          </div>
          <div className="profile-info-item">
            <div className="profile-label">Name:</div>
            <div className="profile-label-text">{loadedAdmins.name}</div>
          </div>
          <div className="profile-info-item">
            <div className="profile-label">Email:</div>
            <div className="profile-label-text">{loadedAdmins.email}</div>
          </div>
          <div className="profile-info-item">
            <div className="profile-label">NIC Number:</div>
            <div className="profile-label-text">{loadedAdmins.nic}</div>
          </div>
          <div className="profile-info-item">
            <div className="profile-label">User Type:</div>
            <div className="profile-label-text">{loadedAdmins.type}</div>
          </div>
          <div className="profile-info-item">
            <div className="profile-label">Contact Number:</div>
            <div className="profile-label-text">{loadedAdmins.contact}</div>
          </div>
          <div className="profile-info-item">
            <div className="profile-label">Address:</div>
            <div className="profile-label-text">{loadedAdmins.address}</div>
          </div>
        </div>
      )}
    </React.Fragment>
  );
};

export default AdminProfileInfo;
