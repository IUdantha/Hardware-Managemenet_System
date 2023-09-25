const express = require("express");
const colors = require("colors");
const dotenv = require("dotenv").config();
const { errorHandler } = require("./middleware/errorMiddleware");
const connectDB = require("./config/db");
const port = process.env.PORT || 5000;

//Run the function
connectDB();

const app = express();

//Add middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

//give access to localhost 3000 to 5000 (to different domain)
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PATCH, DELETE");

  next();
});

//When you hit this address from the frontend, it will redirect to this file

app.use("/api/goals", require("./routes/delivery/goalRoutes"));
app.use("/api/users", require("./routes/auth/userRoutes"));
app.use("/api/managers", require("./routes/auth/managerRoutes"));
app.use("/api/admins", require("./routes/auth/adminRoutes"));
app.use("/api/drivers", require("./routes/delivery/driverRoutes"));
app.use("/api/deliveries", require("./routes/delivery/deliveryRoutes"));

//finance routes
const bodyParser = require("body-parser");
app.use(bodyParser.json());

app.use("/api/payments", require("./routes/finance/paymentRoutes"));
app.use("/api/loans", require("./routes/finance/loanRoutes"));

//app.use("/api/orders", require("./routes/sales/orderRoutes"));

//app.use("/api/orderLists", require("./routes/sales/orderListRoutes"));
//app.use("/api/orderCarts", require("./routes/sales/orderCartRoutes"));

// Inventory routes
app.use("/api/items", require("./routes/inventory/itemRoutes"));
app.use("/api/storeRequests", require("./routes/inventory/storeRequestRoutes"));
app.use(
  "/api/supplierRequests",
  require("./routes/inventory/supplierRequestRoutes")
);

app.use("/api/employees", require("./routes/employee/empRoutes"));
app.use("/api/leaves", require("./routes/employee/leaveRoutes"));

app.use("/api/customers", require("./routes/customer/customerRoutes"));
app.use("/api/inquires", require("./routes/customer/inquireRoutes"));
app.use("/api/feedbacks", require("./routes/customer/feedbackRoutes"));

//sales routes
app.use("/api/offorders", require("./routes/sales/offOrderRoutes"));
app.use("/api/salesinvoice", require("./routes/sales/salesinvoiceRoutes"));

//give access to localhost 3000 to 5000 (to different domain)
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PATCH, DELETE");

  next();
});

//supplier routes
app.use("/api/suppliers", require("./routes/supplier/supplierRoutes"));
app.use("/api/invoices", require("./routes/supplier/invoiceRoutes"));
app.use("/api/contracts", require("./routes/supplier/contractDetailsRoutes"));

//notification
app.use("/api/notifications", require("./routes/notifi"));

//overwrite the default express error handler
app.use(errorHandler);

app.listen(port, () => console.log(`Server started on port ${port}`));
