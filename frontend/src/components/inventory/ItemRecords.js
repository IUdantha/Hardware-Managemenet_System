import React, { useEffect, useState } from "react";
import { useHttpClient } from "../../features/finance/http-hook";

import LoadingSpinner from "../Spinner";
import ItemList from "../inventory/ItemList";

const ItemRecords = () => {

  const { isLoading,sendRequest} = useHttpClient();
  const [loadedItems, setLoadedItems] = useState();

  useEffect(() => {
    const fetchItems = async () => {
      try {
        const responseData = await sendRequest(
          "http://localhost:5000/api/items"
        );

        setLoadedItems(responseData.items);

      } catch (err) {
        
      }
    };
    fetchItems();
  }, [sendRequest]);

  return (
    <React.Fragment>

      {isLoading && <LoadingSpinner />}
      {!isLoading && loadedItems && <ItemList items={loadedItems} />}

    </React.Fragment>
  );
};

export default ItemRecords;
