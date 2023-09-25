import React, { useEffect, useState } from "react";

import CustomerList from "../customer/CustomerList";
import ErrorModal from "../../components/customer/UIElements/ErrorModal";
import LoadingSpinner from "../Spinner";
import { useHttpClient } from "../../features/customer/http-hook";

const CustomerRecords = () => {
  const { isLoading, error, sendRequest, clearError } = useHttpClient();
  const [loadedCustomers, setLoadedCustomers] = useState();

  useEffect(() => {
    const fetchCustomers = async () => {
      try {
        const responseData = await sendRequest(
          "http://localhost:5000/api/customers"
        );

        setLoadedCustomers(responseData.customers);
      } catch (err) {}
    };
    fetchCustomers();
  }, [sendRequest]);

  return (
    <React.Fragment>
      {/* <ErrorModal error={error} onClear={clearError} /> */}
      {isLoading && <LoadingSpinner />}
      {!isLoading && loadedCustomers && <CustomerList items={loadedCustomers} />}
    </React.Fragment>
  );
};

export default CustomerRecords;
