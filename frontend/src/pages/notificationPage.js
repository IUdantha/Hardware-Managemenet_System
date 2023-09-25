import React, { useEffect, useState } from "react";
import AdminSideBar from "../components/auth/AdminSideBar";
import PaymentRecords from "../components/finance/PaymentRecords";
import AdminCheck from "../components/auth/AdminCheck";
import ManagerCheck from "../components/auth/ManagerCheck";
import Button from "../components/finance/FormElements/Button";
import { useHttpClient } from "../features/finance/http-hook";

const FinancePayments = () => {
  const [notificationData, setNotificationData] = useState([]);
  const { isLoading, error, sendRequest, clearError } = useHttpClient();

  useEffect(() => {
    // Fetch notification data from the server
    const fetchNotificationData = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/notifications");
        const data = await response.json();
        if (Array.isArray(data.notifis)) {
          setNotificationData(data.notifis);
        } else {
          console.error("Invalid notification data format:", data);
        }
      } catch (error) {
        console.error("Error fetching notification data:", error);
      }
    };

    fetchNotificationData();
  }, []);

  const confirmDeleteHandler = async (notification) => {
    try {
      await sendRequest(
        `http://localhost:5000/api/notifications/${notification}`,
        "DELETE"
      );
      // Reload the page after successful deletion
      window.location.reload();
    } catch (err) {
      console.log("Error occur. the request not called the backend");
    }
  };

  const reversedNotifications = [...notificationData].reverse();

  return (
    <>
      <AdminSideBar>
        <div className="container-dash"></div>

        <div className="page-content">
          <div className="white-box">
            {<AdminCheck /> || <ManagerCheck />}
            <h3>Notifications</h3>
            <br />
            {reversedNotifications.length > 0 ? (
              <table className="table table-striped" id="myTable">
                <tbody>
                  {reversedNotifications.map((notification) => (
                    <tr key={notification.id}>
                      <td>{notification.dateTime}</td>
                      <td>{notification.message}</td>
                      <td>
                        <div
                          onClick={() => confirmDeleteHandler(notification.id)}
                        >
                          <ion-icon
                            name="checkmark-circle-outline"
                            style={{ fontSize: "20px" }}
                          ></ion-icon>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            ) : (
              <p>No notifications found.</p>
            )}
          </div>
        </div>
      </AdminSideBar>
    </>
  );
};

export default FinancePayments;
