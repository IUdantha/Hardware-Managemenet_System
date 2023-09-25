import React, { useEffect, useState } from "react";

import LeaveList from "../auth/LeaveList";
import ErrorModal from "../../components/employee/UIElements/ErrorModal";
import LoadingSpinner from "../Spinner";
import { useHttpClient } from "../../features/employee/http-hook";

const LeaveRecords = () => {
  const { isLoading, error, sendRequest, clearError } = useHttpClient();
  const [loadedDetails, setLoadedDetails] = useState();

  useEffect(() => {
    const fetchDetails = async () => {
      try {
        const responseData = await sendRequest(
          "http://localhost:5000/api/leaves"
        );

        setLoadedDetails(responseData.leaves);
      } catch (err) {}
    };
    fetchDetails();
  }, [sendRequest]);

  return (
    <React.Fragment>
      {/* <ErrorModal error={error} onClear={clearError} /> */}
      {isLoading && <LoadingSpinner />}
      {!isLoading && loadedDetails && <LeaveList items={loadedDetails} />}
    </React.Fragment>
  );
};

export default LeaveRecords;
