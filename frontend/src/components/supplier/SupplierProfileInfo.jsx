import React, { useEffect, useState } from "react";
import ErrorModal from "../../components/auth/UIElements/ErrorModal";
import LoadingSpinner from "../Spinner";
import { useHttpClient } from "../../features/auth/http-hook";
import { useParams } from 'react-router-dom';
import { useForm } from "../../features/delivery/form-hook";
import { FaUserCircle } from 'react-icons/fa';
import SupplierCheck from "../auth/SupplierCheck";


const SupplierProfileInfo = () => {
  const supplierId  = useParams().id;
  const { isLoading, error, sendRequest, clearError } = useHttpClient();
  const [loadedSuppliers, setLoadedSuppliers] = useState();

  useEffect(() => {
    const fetchSuppliers= async () => {
      try {
        const responseData = await sendRequest(
          `http://localhost:5000/api/suppliers/${supplierId}`
        );
        setLoadedSuppliers(responseData.manager);
      } catch (err) {}
    };
    fetchSuppliers();
  }, [sendRequest, supplierId]);

  if (isLoading) {
    return (
      <div className="center">
        <LoadingSpinner />
      </div>
    );
  }

  return (
    <React.Fragment>

      <SupplierCheck />
  
      {/* <ErrorModal error={error} onClear={clearError} /> */}
      {!isLoading && loadedSuppliers && (<div className="centered-heading">MY PROFILE</div>)}
      {!isLoading && loadedSuppliers && (
        <div className="profile-details">
          <div className="profile-photo">
             <FaUserCircle className="profile-photo-icon" />
          </div>
          <div className="profile-info-item">
            <div className="profile-label">Name:</div>
            <div className="profile-label-text">{loadedSuppliers.name}</div>
          </div>
          <div className="profile-info-item">
            <div className="profile-label">Email:</div>
            <div className="profile-label-text">{loadedSuppliers.email}</div>
          </div>
          <div className="profile-info-item">
            <div className="profile-label">NIC Number:</div>
            <div className="profile-label-text">{loadedSuppliers.nic}</div>
          </div>
          <div className="profile-info-item">
            <div className="profile-label">User Type:</div>
            <div className="profile-label-text">{loadedSuppliers.type}</div>
          </div>
          <div className="profile-info-item">
            <div className="profile-label">Contact Number:</div>
            <div className="profile-label-text">{loadedSuppliers.contact}</div>
          </div>
          <div className="profile-info-item">
            <div className="profile-label">Address:</div>
            <div className="profile-label-text">{loadedSuppliers.address}</div>
          </div>
        </div>
      )}
    </React.Fragment>
  );
};

export default SupplierProfileInfo;
