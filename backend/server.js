const express = require("express");
const app = express();
const cors = require("cors");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const dbConnect = require("./config/config");

// Import user routes
const homePropertyRoutes = require("./routes/homepropertyRoutes");
const userRoutes = require("./routes/userRoutes");

const agentRoutes = require("./routes/agentRoutes");
const realestateRoutes = require("./routes/realestateRoutes");
const usersPaid = require("./routes/PayUsersRoutes");
// Middleware
app.use(
  cors({
    origin: "http://localhost:3001",
    credentials: true,
  })
);

app.use(express.json());
app.use(cookieParser());
app.use(bodyParser.json());
// app.use(
//   bodyParser.urlencoded({ extended: true, limit: 10000, parameterLimit: 2 })
// );
app.use(bodyParser.urlencoded({ extended: true }));

// Use user routes
app.use("/homeProperty", homePropertyRoutes);
app.use("/users", userRoutes);

app.use("/agents", agentRoutes);
app.use("/realestate", realestateRoutes);
app.use("/paidUser", usersPaid);
app.use("/uploads", express.static("uploads"));

// Access environment variables
const port = process.env.PORT || 7000;

app.listen(port, () => {
  console.log(`Good app listening on port ${port}`);
});

module.exports = app;
