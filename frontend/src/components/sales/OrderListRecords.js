import React, { useEffect, useState } from "react";

import OrderList from "../OrderList";
//import ErrorModal from "./UIElements/ErrorModal";
import LoadingSpinner from "../Spinner";
import { useHttpClient } from "../../features/sales/http-hook";

const OrderListRecords = () => {
  const { isLoading, error, sendRequest, clearError } = useHttpClient();
  const [loadedOrderList, setLoadedOrderList] = useState();

  useEffect(() => {
    const fetchOrderList = async () => {
      try {
        const responseData = await sendRequest(
          "http://localhost:5000/api/OrderList"
        );

        setLoadedOrderList(responseData.orderList);
      } catch (err) {}
    };
    fetchOrderList();
  }, [sendRequest]);

  return (
    <React.Fragment>
      {/* <ErrorModal error={error} onClear={clearError} /> */}
      {isLoading && <LoadingSpinner />}
      {!isLoading && loadedOrderList && <OrderList items={loadedOrderList} />}
    </React.Fragment>
  );
};

export default OrderListRecords;
