import React, { useEffect, useState } from "react";
import ManagerProfileList from "./ManagerProfileList";
import ErrorModal from "../../components/auth/UIElements/ErrorModal";
import LoadingSpinner from "../Spinner";
import { useHttpClient } from "../../features/auth/http-hook";
import { useParams } from 'react-router-dom';
import ManagerSideBar from "./ManagerSideBar";
import { useForm } from "../../features/delivery/form-hook";
import ManagerCheck from "./ManagerCheck";
import { FaUserCircle } from 'react-icons/fa';


const ManagerProfileInfo = () => {
  const managerId  = useParams().id;
  const { isLoading, error, sendRequest, clearError } = useHttpClient();
  const [loadedManagers, setLoadedManagers] = useState();

  useEffect(() => {
    const fetchManager= async () => {
      try {
        const responseData = await sendRequest(
          `http://localhost:5000/api/managers/${managerId}`
        );
        setLoadedManagers(responseData.manager);
      } catch (err) {}
    };
    fetchManager();
  }, [sendRequest, managerId]);

  if (isLoading) {
    return (
      <div className="center">
        <LoadingSpinner />
      </div>
    );
  }

  return (
    <React.Fragment>

      <ManagerCheck />
  
      {/* <ErrorModal error={error} onClear={clearError} /> */}
      {!isLoading && loadedManagers && (<div className="centered-heading">MY PROFILE</div>)}
      {!isLoading && loadedManagers && (
        <div className="profile-details">
          <div className="profile-photo">
             <FaUserCircle className="profile-photo-icon" />
          </div>
          <div className="profile-info-item">
            <div className="profile-label">Name:</div>
            <div className="profile-label-text">{loadedManagers.name}</div>
          </div>
          <div className="profile-info-item">
            <div className="profile-label">Email:</div>
            <div className="profile-label-text">{loadedManagers.email}</div>
          </div>
          <div className="profile-info-item">
            <div className="profile-label">NIC Number:</div>
            <div className="profile-label-text">{loadedManagers.nic}</div>
          </div>
          <div className="profile-info-item">
            <div className="profile-label">User Type:</div>
            <div className="profile-label-text">{loadedManagers.type}</div>
          </div>
          <div className="profile-info-item">
            <div className="profile-label">Contact Number:</div>
            <div className="profile-label-text">{loadedManagers.contact}</div>
          </div>
          <div className="profile-info-item">
            <div className="profile-label">Address:</div>
            <div className="profile-label-text">{loadedManagers.address}</div>
          </div>
        </div>
      )}
    </React.Fragment>
  );
};

export default ManagerProfileInfo;
