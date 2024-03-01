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
const upload = multer({ storage: storage }).single("image");

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
      } = req.body;
      const image = req.file ? req.file.path : null;
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
      });
      await homeProperty.save();
      res.status(201).json({ message: "Home property created successfully" });
    });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Controller for retrieving all home properties
exports.getAllHomeProperties = async (req, res) => {
  try {
    const homeProperties = await HomeProperty.find();
    res.status(200).json(homeProperties);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Controller for retrieving a single home property by ID
exports.getHomePropertyById = async (req, res) => {
  try {
    const homeProperty = await HomeProperty.findById(req.params.id);
    if (!homeProperty) {
      return res.status(404).json({ message: "Home property not found" });
    }
    res.status(200).json(homeProperty);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Controller for updating a home property by ID

// Update home property by ID
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
      } = req.body;
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
      };

      // If there is a new file, update the image field
      if (req.file) {
        updateFields.image = req.file.filename;
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
