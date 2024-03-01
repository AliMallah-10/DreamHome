const express = require("express");
const app = express();
const cors = require("cors");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const dbConnect = require("./config/config");
const path = require("path");

// Import user routes
const homePropertyRoutes = require("./routes/homepropertyRoutes");
const userRoutes = require("./routes/userRoutes");
const transactionsRoute = require("./routes/transactionsRoutes");
// Middleware
app.use(
  cors({
    origin: "http://localhost:3001",
    credentials: true,
  })
);
// Set 'views' as the folder containing your views
app.set("../backend/views", path.join(__dirname, "../backend/views"));

// Set EJS as the view engine
app.set("view engine", "ejs");
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
app.use("/transaction", transactionsRoute)
app.use("/uploads", express.static("uploads"));

// Access environment variables
const port = process.env.PORT || 7000;

app.listen(port, () => {
  console.log(`Good app listening on port ${port}`);
});

module.exports = app;
