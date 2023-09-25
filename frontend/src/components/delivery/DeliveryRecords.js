import React, { useEffect, useState } from "react";

import DeliveryList from "../delivery/DeliveryList";
import ErrorModal from "../../components/delivery/UIElements/ErrorModal";
import LoadingSpinner from "../Spinner";
import { useHttpClient } from "../../features/delivery/http-hook";

const DeliveryRecords = () => {
  const { isLoading, error, sendRequest, clearError } = useHttpClient();
  const [loadedDeliveries, setLoadedDeliveries] = useState();

  useEffect(() => {
    const fetchDeliveries = async () => {
      try {
        const responseData = await sendRequest(
          "http://localhost:5000/api/deliveries"
        );

        setLoadedDeliveries(responseData.deliveries);
      } catch (err) {}
    };
    fetchDeliveries();
  }, [sendRequest]);

  return (
    <React.Fragment>
      {/* <ErrorModal error={error} onClear={clearError} /> */}
      {isLoading && <LoadingSpinner />}
      {!isLoading && loadedDeliveries && <DeliveryList items={loadedDeliveries} />}
    </React.Fragment>
  );
};

export default DeliveryRecords;
