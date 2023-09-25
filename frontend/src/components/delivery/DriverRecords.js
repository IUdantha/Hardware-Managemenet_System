import React, { useEffect, useState } from "react";

import DriverList from "../delivery/DriverList";
import ErrorModal from "../../components/delivery/UIElements/ErrorModal";
import LoadingSpinner from "../Spinner";
import { useHttpClient } from "../../features/delivery/http-hook";

const DriverRecords = () => {
  const { isLoading, error, sendRequest, clearError } = useHttpClient();
  const [loadedDrivers, setLoadedDrivers] = useState();

  useEffect(() => {
    const fetchDrivers = async () => {
      try {
        const responseData = await sendRequest(
          "http://localhost:5000/api/drivers"
        );

        setLoadedDrivers(responseData.drivers);
      } catch (err) {}
    };
    fetchDrivers();
  }, [sendRequest]);

  return (
    <React.Fragment>
      {/* <ErrorModal error={error} onClear={clearError} /> */}
      {isLoading && <LoadingSpinner />}
      {!isLoading && loadedDrivers && <DriverList items={loadedDrivers} />}
    </React.Fragment>
  );
};

export default DriverRecords;
