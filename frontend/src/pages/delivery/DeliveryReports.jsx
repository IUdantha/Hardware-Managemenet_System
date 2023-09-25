import React from 'react'
import ManagerSideBar from '../../components/auth/ManagerSideBar';
import DeliveryReportList from "../../components/delivery/DeliveryReportList"
import ManagerCheck from '../../components/auth/ManagerCheck'
import { useHttpClient } from "../../features/delivery/http-hook";

const DeliveryReports = () => {

    const { isLoading, error, sendRequest, clearError } = useHttpClient();
    const [loadedReports, setLoadedReports] = useState();
  
    useEffect(() => {
      const fetchReports= async () => {
        try {
          const responseData = await sendRequest(
            "http://localhost:5000/api/drivers"
          );
  
          setLoaded(responseData.drivers);
        } catch (err) {}
      };
      fetchDrivers();
    }, [sendRequest]);

  return (
    <>
   
    <ManagerSideBar>
    <div className="container-dash">
    <h2>Generate Reports</h2>
    </div>

    <div className="page-content">
      <div className="white-box">
        <ManagerCheck />
        <React.Fragment>
            {/* <ErrorModal error={error} onClear={clearError} /> */}
            {isLoading && <LoadingSpinner />}
            {!isLoading && loadedDrivers && <DeliveryReportList items={loadedDrivers} />}
        </React.Fragment>

      </div>
    
    </div>

    </ManagerSideBar>
    

    </>
  )
}


export default DeliveryReports ;