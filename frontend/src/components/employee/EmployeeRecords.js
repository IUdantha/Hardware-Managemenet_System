import React, { useEffect, useState } from "react";

import EmployeeList from "../employee/EmployeeList";
import ErrorModal from "../../components/employee/UIElements/ErrorModal";
import LoadingSpinner from "../Spinner";
import { useHttpClient } from "../../features/employee/http-hook";

const EmployeeRecords = () => {
  const { isLoading, error, sendRequest, clearError } = useHttpClient();
  const [loadedDetails, setLoadedDetails] = useState();

  useEffect(() => {
    const fetchDetails = async () => {
      try {
        const responseData = await sendRequest(
          "http://localhost:5000/api/employees"
        );

        setLoadedDetails(responseData.employees);
      } catch (err) {}
    };
    fetchDetails();
  }, [sendRequest]);

  return (
    <React.Fragment>
      {/* <ErrorModal error={error} onClear={clearError} /> */}
      {isLoading && <LoadingSpinner />}
      {!isLoading && loadedDetails && <EmployeeList items={loadedDetails} />}
    </React.Fragment>
  );
};

export default EmployeeRecords;
