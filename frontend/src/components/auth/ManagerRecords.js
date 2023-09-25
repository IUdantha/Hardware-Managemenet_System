import React, { useEffect, useState } from "react";

import ManagerList from "../auth/ManagerList";
import ErrorModal from "../../components/auth/UIElements/ErrorModal";
import LoadingSpinner from "../Spinner";
import { useHttpClient } from "../../features/auth/http-hook";

const ManagerRecords = () => {
  const { isLoading, error, sendRequest, clearError } = useHttpClient();
  const [loadedManagers, setLoadedManagers] = useState();

  useEffect(() => {
    const fetchManagers = async () => {
      try {
        const responseData = await sendRequest(
          "http://localhost:5000/api/managers"
        );

        setLoadedManagers(responseData.managers);
      } catch (err) {}
    };
    fetchManagers();
  }, [sendRequest]);

  return (
    <React.Fragment>
      {/* <ErrorModal error={error} onClear={clearError} /> */}
      {isLoading && <LoadingSpinner />}
      {!isLoading && loadedManagers && <ManagerList items={loadedManagers} />}
    </React.Fragment>
  );
};

export default ManagerRecords;
