import React, { useEffect, useState } from "react";

import ContractList from "./ContractList";
import ErrorModal from "../../components/supplier/UIElements/ErrorModal";
import LoadingSpinner from "../Spinner";
import { useHttpClient } from "../../features/supplier/http-hook";

const ContractRecords = () => {
  const { isLoading, error, sendRequest, clearError } = useHttpClient();
  const [loadedContracts, setLoadedContracts] = useState();

  useEffect(() => {
    const fetchContracts = async () => {
      try {
        const responseData = await sendRequest(
          "http://localhost:5000/api/contracts"
        );

        setLoadedContracts(responseData.contracts);
      } catch (err) {}
    };
    fetchContracts();
  }, [sendRequest]);

  return (
    <React.Fragment>
      {/* <ErrorModal error={error} onClear={clearError} /> */}
      {isLoading && <LoadingSpinner />}
      {!isLoading && loadedContracts && <ContractList items={loadedContracts} />}
    </React.Fragment>
  );
};

export default ContractRecords;