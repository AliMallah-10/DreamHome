const express = require("express");
const router = express.Router();
const {
  createHomeProperty,
  getAllHomeProperties,
  getHomePropertyById,
  updateHomeProperty,
  deleteHomeProperty,
  getHomePropertiesByAgentId,
  updateImage,
  deleteImage,
} = require("../controllers/homepropertyControllers");
const {
  validationMiddleware,
  authorizationMiddleware,
  errorHandlingMiddleware,
  loggingMiddleware,
  validateHouseData,
} = require("../middlewares/homepropertyMiddleware");
const userMiddleware = require("../middlewares/userMiddleware");
// router.use(userMiddleware.verifyToken);
// Route for creating a new home property
router.post(
  "/addhomeProperties",
  loggingMiddleware,
  validationMiddleware,
  createHomeProperty,
  validateHouseData
);

// Route for retrieving all home properties
router.get("/GethomeProperties", loggingMiddleware, getAllHomeProperties);

// Route for retrieving a single home property by ID
router.get("/GethomeProperties/:id", loggingMiddleware, getHomePropertyById);
// Define the route to retrieve home properties by agent ID
router.get(
  "/getBYAgentID/:agentId",
  loggingMiddleware,
  getHomePropertiesByAgentId
);
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
// Update image route
router.put("/updateImage/:id/:index", getAllHomeProperties);

// Delete image route
router.delete("/deleteImage/:id/:index", getAllHomeProperties);
// Apply error handling middleware at the end to catch any errors that occur during request processing
// router.use(errorHandlingMiddleware);

module.exports = router;
