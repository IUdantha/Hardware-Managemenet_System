import React, { useEffect, useState } from "react";
import PaymentList from "../finance/PaymentList";
import ErrorModal from "../../components/finance/UIElements/ErrorModal";
import LoadingSpinner from "../Spinner";
import { useHttpClient } from "../../features/finance/http-hook";

const PaymentRecords = () => {
  const { isLoading, error, sendRequest, clearError } = useHttpClient();
  const [loadedPayments, setLoadedPayments] = useState([]);
  const [income, setIncome] = useState(0);
  const [outgoing, setOutgoing] = useState(0);
  const [profit, setProfit] = useState(0);
  const [selectedYear, setSelectedYear] = useState("");
  const [selectedMonth, setSelectedMonth] = useState("");
  const [years, setYears] = useState([]);
  const [months, setMonths] = useState([]);

  const handleYearSelect = (event) => {
    setSelectedYear(event.target.value);
  };

  const handleMonthSelect = (event) => {
    setSelectedMonth(event.target.value);
  };

  useEffect(() => {
    const fetchPayments = async () => {
      try {
        const responseData = await sendRequest(
          "http://localhost:5000/api/payments"
        );

        const payments = responseData.payments;

        // Filter payments based on selected year and month
        const filteredPayments = payments.filter((payment) => {
          const paymentYear = payment.date.slice(0, 4);
          const paymentMonth = payment.date.slice(5, 7);

          if (selectedYear && selectedMonth) {
            return (
              paymentYear === selectedYear && paymentMonth === selectedMonth
            );
          } else if (selectedYear) {
            return paymentYear === selectedYear;
          } else if (selectedMonth) {
            return paymentMonth === selectedMonth;
          } else {
            return true;
          }
        });

        // Calculate income, outgoing, and profit
        const incomeAmount = filteredPayments
          .filter((payment) => payment.type === "Income")
          .reduce((total, payment) => total + payment.amount, 0);

        const outgoingAmount = filteredPayments
          .filter((payment) => payment.type === "Outgoing")
          .reduce((total, payment) => total + payment.amount, 0);

        const calculatedProfit = incomeAmount - outgoingAmount;

        setLoadedPayments(filteredPayments);
        setIncome(incomeAmount);
        setOutgoing(outgoingAmount);
        setProfit(calculatedProfit);
      } catch (err) {
        // Handle error
      }
    };

    fetchPayments();
  }, [sendRequest, selectedYear, selectedMonth]);

  useEffect(() => {
    const currentYear = new Date().getFullYear();
    const availableYears = [];

    // Generate the list of years starting from the current year up to 10 years back
    for (let year = currentYear; year >= currentYear - 10; year--) {
      availableYears.push(year.toString());
    }

    setYears(availableYears);
  }, []);

  useEffect(() => {
    const availableMonths = [];

    // Generate the list of months from January to December
    for (let month = 1; month <= 12; month++) {
      availableMonths.push(month.toString().padStart(2, "0"));
    }

    setMonths(availableMonths);
  }, []);

  return (
    <React.Fragment>
      {/* <ErrorModal error={error} onClear={clearError} /> */}
      {isLoading && <LoadingSpinner />}
      <div className="overviweDropdown">
        <div>
          <div className="">
            <select value={selectedYear} onChange={handleYearSelect}>
              <option value="">All Years</option>
              {years.map((year) => (
                <option key={year} value={year}>
                  {year}
                </option>
              ))}
            </select>
          </div>
          <div className="">
            <select value={selectedMonth} onChange={handleMonthSelect}>
              <option value="">All Months</option>
              {months.map((month) => (
                <option key={month} value={month}>
                  {month}
                </option>
              ))}
            </select>
          </div>
        </div>
        <div className="overView-cards-container">
          <div className="overView-cards">
            Income <br /> LKR {income}/=
          </div>
          <div className="overView-cards">
            Outgoing <br /> LKR {outgoing}/=
          </div>
          <div className="overView-cards">
            Current Balance <br /> LKR {profit}/=
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default PaymentRecords;
