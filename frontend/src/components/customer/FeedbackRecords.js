import React, { useEffect, useState } from "react";

import FeedbackList from "../customer/FeedbackList";
import ErrorModal from "../../components/customer/UIElements/ErrorModal";
import LoadingSpinner from "../Spinner";
import { useHttpClient } from "../../features/customer/http-hook";

const FeedbackRecords = () => {
  const { isLoading, error, sendRequest, clearError } = useHttpClient();
  const [loadedFeedbacks, setLoadedFeedbacks] = useState();

  useEffect(() => {
    const fetchFeedbacks = async () => {
      try {
        const responseData = await sendRequest(
          "http://localhost:5000/api/feedbacks"
        );

        setLoadedFeedbacks(responseData.feedbacks);
      } catch (err) {}
    };
    fetchFeedbacks();
  }, [sendRequest]);

  return (
    <React.Fragment>
      {/* <ErrorModal error={error} onClear={clearError} /> */}
      {isLoading && <LoadingSpinner />}
      {!isLoading && loadedFeedbacks && <FeedbackList items={loadedFeedbacks} />}
    </React.Fragment>
  );
};

export default FeedbackRecords;
