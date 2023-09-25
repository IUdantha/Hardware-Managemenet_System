import React, { useEffect, useState } from "react";

import LoanList from "../finance/LoanList";
import ErrorModal from "../../components/finance/UIElements/ErrorModal";
import LoadingSpinner from "../Spinner";
import { useHttpClient } from "../../features/finance/http-hook";

const PaymentRecords = () => {
  const { isLoading, error, sendRequest, clearError } = useHttpClient();
  const [loadedLoans, setLoadedLoans] = useState();

  useEffect(() => {
    const fetchPayments = async () => {
      try {
        const responseData = await sendRequest(
          "http://localhost:5000/api/loans"
        );

        setLoadedLoans(responseData.loans);
      } catch (err) {}
    };
    fetchPayments();
  }, [sendRequest]);

  return (
    <React.Fragment>
      {/* <ErrorModal error={error} onClear={clearError} /> */}
      {isLoading && <LoadingSpinner />}
      {!isLoading && loadedLoans && <LoanList items={loadedLoans} />}
    </React.Fragment>
  );
};

export default PaymentRecords;
