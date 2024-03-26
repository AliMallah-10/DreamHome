const HomeProperty = require("../models/homeProperty");
const multer = require("multer");

// Multer configuration
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/"); // Set the destination folder for uploaded files
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(
      null,
      file.fieldname +
        "-" +
        uniqueSuffix +
        "." +
        file.originalname.split(".").pop()
    );
  },
});

// Upload middleware
const upload = multer({ storage: storage }).array("image", 6);
// Function to check if a number is positive
function isPositiveNumber(number) {
  return number >= 0;
}
// Controller for creating a new home property
exports.createHomeProperty = async (req, res) => {
  try {
    upload(req, res, async (err) => {
      if (err) {
        return res.status(400).json({ error: err.message });
      }
      const {
        description,
        price,
        location,
        type,
        rooms,
        buildYear,
        areaSize,
        title,
        floor,
        style,
        userRef,
        Agent,
      } = req.body;

      // Check if all numbers are positive
      if (
        !isPositiveNumber(price) ||
        !isPositiveNumber(rooms) ||
        !isPositiveNumber(buildYear) ||
        !isPositiveNumber(areaSize) ||
        !isPositiveNumber(floor)
      ) {
        return res.status(400).json({
          error: "Number must be positive numbers",
        });
      }

      let image = [];
      if (req.files && req.files.length > 0) {
        image = req.files.map((file) => file.path);
      }

      const homeProperty = new HomeProperty({
        description,
        price,
        location,
        type,
        image,
        rooms,
        buildYear,
        areaSize,
        title,
        floor,
        style,
        userRef,
        Agent,
      });
      await homeProperty.save();
      res.status(201).json({ message: "Home property created successfully" });
    });
  } catch (error) {
    // Check if the error is a validation error
    if (error.name === "ValidationError") {
      // If it's a validation error, return a custom error message
      return res
        .status(400)
        .json({ error: "Validation failed: " + error.message });
    }
    // If it's not a validation error, return a generic error message
    res.status(500).json({ error: "Internal Server Error" });
  }
};
// Controller for retrieving all home properties
exports.getAllHomeProperties = async (req, res) => {
  try {
    const homeProperties = await HomeProperty.find().populate({
      path: "Agent",
      select: "fullName email phone", // Specify the fields you want to select
    });
    res.status(200).json(homeProperties);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
// Controller for retrieving all home properties related to a specific agent's ID
exports.getHomePropertiesByAgentId = async (req, res) => {
  try {
    const agentId = req.params.agentId; // Get the agent's ID from the request parameters

    // Find all home properties where the Agent field matches the specified agentId
    const homeProperties = await HomeProperty.find({ Agent: agentId }).populate(
      {
        path: "Agent",
        select: "fullName email phone", // Specify the fields you want to select from the Agent model
      }
    );

    // Return the list of home properties
    res.status(200).json(homeProperties);
  } catch (error) {
    // Handle any errors
    res.status(500).json({ error: error.message });
  }
};
// Controller for retrieving a single home property by ID
exports.getHomePropertyById = async (req, res) => {
  try {
    const homeProperty = await HomeProperty.findById(req.params.id).populate({
      path: "Agent",
      select: "fullName email phone", // Specify the fields you want to select
    });
    if (!homeProperty) {
      return res.status(404).json({ message: "Home property not found" });
    }
    res.status(200).json(homeProperty);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Controller for updating a home property by ID
exports.updateHomeProperty = async (req, res) => {
  try {
    // Call the upload middleware to handle the image upload
    upload(req, res, async (err) => {
      if (err) {
        return res.status(400).json({ error: err.message });
      }

      const homePropertyId = req.params.id;
      const {
        description,
        price,
        location,
        type,
        rooms,
        buildYear,
        areaSize,
        title,
        floor,
        style,
        userRef,
        Agent,
      } = req.body;

      // Check if all numbers are positive
      if (
        !isPositiveNumber(price) ||
        !isPositiveNumber(rooms) ||
        !isPositiveNumber(buildYear) ||
        !isPositiveNumber(areaSize) ||
        !isPositiveNumber(floor)
      ) {
        return res.status(400).json({
          error: "Number must be positive numbers",
        });
      }

      const updateFields = {
        description,
        price,
        location,
        type,
        rooms,
        buildYear,
        areaSize,
        title,
        floor,
        style,
        userRef,
        Agent,
      };

      // If there are new files, update the image field
      if (req.files && req.files.length > 0) {
        updateFields.image = req.files.map((file) => file.path);
      }

      const updatedHomeProperty = await HomeProperty.findByIdAndUpdate(
        homePropertyId,
        updateFields,
        { new: true }
      );

      if (!updatedHomeProperty) {
        return res.status(404).json({ message: "Home property not found" });
      }

      res.status(200).json({ message: "Home property updated successfully" });
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
// Controller for deleting a home property by ID
exports.deleteHomeProperty = async (req, res) => {
  try {
    const homeProperty = await HomeProperty.findByIdAndDelete(req.params.id);
    if (!homeProperty) {
      return res.status(404).json({ message: "Home property not found" });
    }
    res.status(200).json({ message: "Home property deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
// Controller for updating an image by index
exports.updateImage = async (req, res) => {
  try {
    const homePropertyId = req.params.id;
    const imageIndex = req.params.index;
    const file = req.file;

    if (!file) {
      return res.status(400).json({ error: "No file uploaded" });
    }

    // Update the image at the specified index
    // Your logic to update the image in the database

    res.status(200).json({ message: "Image updated successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Controller for deleting an image by index
exports.deleteImage = async (req, res) => {
  try {
    const homePropertyId = req.params.id;
    const imageIndex = req.params.index;

    // Delete the image at the specified index
    // Your logic to delete the image from the database

    res.status(200).json({ message: "Image deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
