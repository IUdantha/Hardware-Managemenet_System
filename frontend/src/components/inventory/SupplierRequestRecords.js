import React, { useEffect, useState } from "react";
import { useHttpClient } from "../../features/finance/http-hook";

import SupplierRequestList from "../inventory/SupplierRequestList";
import LoadingSpinner from "../Spinner";

const SupplierRequestRecords = () => {

  const { isLoading, sendRequest} = useHttpClient();
  const [loadedSupplierRequests, setSupplierRequests] = useState();

  useEffect(() => {
    const fetchPayments = async () => {
      try {
        const responseData = await sendRequest(
          "http://localhost:5000/api/supplierRequests"
        );

        setSupplierRequests(responseData.supplierRequests);
      } catch (err) {
        
      }
    };
    fetchPayments();
  }, [sendRequest]);

  return (
    <React.Fragment>
      {isLoading && <LoadingSpinner />}
      {!isLoading && loadedSupplierRequests && <SupplierRequestList items={loadedSupplierRequests} />}
    </React.Fragment>
  );
};

export default SupplierRequestRecords;
