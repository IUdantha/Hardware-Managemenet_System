import React, { useEffect, useState } from "react";

import InquireList from "./InquireList";
import ErrorModal from "./UIElements/ErrorModal";
import LoadingSpinner from "../Spinner";
import { useHttpClient } from "../../features/customer/http-hook";

const InquireRecords = () => {
  const { isLoading, error, sendRequest, clearError } = useHttpClient();
  const [loadedInquires, setLoadedInquires] = useState();

  useEffect(() => {
    const fetchInquires = async () => {
      try {
        const responseData = await sendRequest(
          "http://localhost:5000/api/inquires"
        );

        setLoadedInquires(responseData.inquires);
      } catch (err) {}
    };
    fetchInquires();
  }, [sendRequest]);

  return (
    <React.Fragment>
      {/* <ErrorModal error={error} onClear={clearError} /> */}
      {isLoading && <LoadingSpinner />}
      {!isLoading && loadedInquires && <InquireList items={loadedInquires} />}
    </React.Fragment>
  );
};

export default InquireRecords;
