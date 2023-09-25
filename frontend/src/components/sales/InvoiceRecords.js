import React, { useEffect, useState } from "react";

//import PaymentList from "../finance/PaymentList";
//import ErrorModal from "../../components/finance/UIElements/ErrorModal";
import LoadingSpinner from "../Spinner";
import { useHttpClient } from "../../features/finance/http-hook";

import InvoiceList from "../sales/InvoiceList";

const ItemRecords = () => {
  const { isLoading, error, sendRequest, clearError } = useHttpClient();
  const [loadedItems, setLoadedItems] = useState();

  useEffect(() => {
    const fetchItems = async () => {
      try {
        const responseData = await sendRequest(
          "http://localhost:5000/api/salesinvoice"
        );

        setLoadedItems(responseData.offOrders);

      } catch (err) {}
    };
    fetchItems();
  }, [sendRequest]);


  
  return (
    <React.Fragment>
      {/* <ErrorModal error={error} onClear={clearError} /> */}
      {isLoading && <LoadingSpinner />}
      {!isLoading && loadedItems && <InvoiceList items={loadedItems} />}
    </React.Fragment>
  );
};

export default ItemRecords;
