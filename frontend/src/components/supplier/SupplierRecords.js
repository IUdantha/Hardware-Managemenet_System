import React, { useEffect, useState } from "react";

import SupplierList from "./SupplierList";
import ErrorModal from "../../components/supplier/UIElements/ErrorModal";
import LoadingSpinner from "../Spinner";
import { useHttpClient } from "../../features/supplier/http-hook";

const SupplierRecords = () => {
  const { isLoading, error, sendRequest, clearError } = useHttpClient();
  const [loadedSuppliers, setLoadedSuppliers] = useState();

  useEffect(() => {
    const fetchSuppliers = async () => {
      try {
        const responseData = await sendRequest(
          "http://localhost:5000/api/suppliers"
        );

        setLoadedSuppliers(responseData.suppliers);
      } catch (err) {}
    };
    fetchSuppliers();
  }, [sendRequest]);

  return (
    <React.Fragment>
      {/* <ErrorModal error={error} onClear={clearError} /> */}
      {isLoading && <LoadingSpinner />}
      {!isLoading && loadedSuppliers && (
        <SupplierList items={loadedSuppliers} />
      )}
    </React.Fragment>
  );
};

export default SupplierRecords;
