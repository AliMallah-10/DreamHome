// validationMiddleware.js
const { validationResult } = require("express-validator");

const validationMiddleware = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  next();
};
const errorHandlingMiddleware = (err, req, res, next) => {
  // Your error handling logic here
  // Handle errors and send an appropriate error response to the client
  console.error(err.stack); // Log the error stack trace for debugging
  res.status(500).json({ message: "Internal Server Error" }); // Send a generic 500 Internal Server Error response
};
const loggingMiddleware = (req, res, next) => {
  // Your logging logic here
  // Log information about the incoming request
  console.log(`${req.method} ${req.url} - ${new Date()}`);
  // Call next() to proceed to the next middleware
  next();
};
const validateHouseData = (req, res, next) => {
  const requiredFields = [
    "title",
    "style",
    "location",
    "price",
    "type",
    "rooms",
    "buildYear",
    "areaSize",
    "floor",
    "description",
    "image",
  ];

  // Check if all required fields are present in the request body
  const missingFields = requiredFields.filter((field) => !req.body[field]);

  if (missingFields.length > 0) {
    return res
      .status(400)
      .json({ error: "All fields are required" });
  }

  // If all required fields are present, proceed to the next middleware
  next();
};



module.exports = {
  validationMiddleware,
  errorHandlingMiddleware,
  loggingMiddleware,
  validateHouseData
};
