import React, { useEffect, useState } from "react";
import { useHttpClient } from "../../features/finance/http-hook";

import StoreRequestList from "../inventory/StoreRequestList";
import LoadingSpinner from "../Spinner";

const StoreRequestRecords = () => {
  const { isLoading, sendRequest} = useHttpClient();
  const [loadedStoreRequests, setStoreRequests] = useState();

  useEffect(() => {
    const fetchPayments = async () => {
      try {
        const responseData = await sendRequest(
          "http://localhost:5000/api/storeRequests"
        );

        setStoreRequests(responseData.storerequests);
      } catch (err) {}
    };
    fetchPayments();
  }, [sendRequest]);

  return (
    <React.Fragment>

      {isLoading && <LoadingSpinner />}
      {!isLoading && loadedStoreRequests && <StoreRequestList items={loadedStoreRequests} />}
      
    </React.Fragment>
  );
};

export default StoreRequestRecords;
