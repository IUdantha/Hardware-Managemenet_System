import React, { useEffect, useState } from "react";

import PaymentList from "../finance/PaymentList";
import ErrorModal from "../../components/finance/UIElements/ErrorModal";
import LoadingSpinner from "../Spinner";
import { useHttpClient } from "../../features/finance/http-hook";

const PaymentRecords = () => {
  const { isLoading, error, sendRequest, clearError } = useHttpClient();
  const [loadedPayments, setLoadedPayments] = useState();

  useEffect(() => {
    const fetchPayments = async () => {
      try {
        const responseData = await sendRequest(
          "http://localhost:5000/api/payments"
        );

        setLoadedPayments(responseData.payments);
      } catch (err) {}
    };
    fetchPayments();
  }, [sendRequest]);

  return (
    <React.Fragment>
      {/* <ErrorModal error={error} onClear={clearError} /> */}
      {isLoading && <LoadingSpinner />}
      {!isLoading && loadedPayments && <PaymentList items={loadedPayments} />}
    </React.Fragment>
  );
};

export default PaymentRecords;
