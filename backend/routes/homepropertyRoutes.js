const express = require("express");
const router = express.Router();
const {
  createHomeProperty,
  getAllHomeProperties,
  getHomePropertyById,
  updateHomeProperty,
  deleteHomeProperty,
} = require("../controllers/homepropertyControllers");
const {
  validationMiddleware,
  authorizationMiddleware,
  errorHandlingMiddleware,
  loggingMiddleware,
} = require("../middlewares/homepropertyMiddleware");

// Route for creating a new home property
router.post(
  "/addhomeProperties",
  loggingMiddleware,
  validationMiddleware,
  createHomeProperty
);

// Route for retrieving all home properties
router.get("/GethomeProperties", loggingMiddleware, getAllHomeProperties);

// Route for retrieving a single home property by ID
router.get("/GethomeProperties/:id", loggingMiddleware, getHomePropertyById);

// Route for updating a home property by ID
router.put(
  "/UpdatehomeProperties/:id",
  loggingMiddleware,
  validationMiddleware,
  updateHomeProperty
);

// Route for deleting a home property by ID
router.delete(
  "/DeletehomeProperties/:id",
  loggingMiddleware,
  deleteHomeProperty
);

// Apply error handling middleware at the end to catch any errors that occur during request processing
// router.use(errorHandlingMiddleware);

module.exports = router;
