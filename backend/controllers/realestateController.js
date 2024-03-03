const RealEstate = require("../models/realestate");
const multer = require("multer");

// Multer configuration for image uploads
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
const upload = multer({ storage: storage });

const realEstateController = {
  // Create a new real estate entry
  create: async (req, res) => {
    try {
      // Handling file upload
      upload.array("images", 5)(req, res, async function (err) {
        if (err instanceof multer.MulterError) {
          return res.status(400).json({ message: err.message });
        } else if (err) {
          return res.status(500).json({ message: err.message });
        }

        // If file upload is successful, create a new real estate entry
        const newRealEstate = await RealEstate.create({
          ...req.body,
          images: req.files.map((file) => file.path),
        });

        res.status(201).json({ message: "Add successfully" });
      });
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  },

  // Get all real estate entries
  getAll: async (req, res) => {
    try {
      const realEstates = await RealEstate.find();
      res.status(200).json(realEstates);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },

  // Get a single real estate entry by ID
  getById: async (req, res) => {
    try {
      const realEstate = await RealEstate.findById(req.params.id);
      if (!realEstate) {
        return res.status(404).json({ message: "Real estate not found" });
      }
      res.status(200).json(realEstate);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },

  // Update a real estate entry by ID
  updateById: async (req, res) => {
    try {
      // Handling file upload
      upload.array("images", 5)(req, res, async function (err) {
        if (err instanceof multer.MulterError) {
          return res.status(400).json({ message: err.message });
        } else if (err) {
          return res.status(500).json({ message: err.message });
        }

        // If file upload is successful
        const updatedData = { ...req.body };

        // Check if new images are uploaded
        if (req.files && req.files.length > 0) {
          // Update images array with new file paths
          updatedData.images = req.files.map((file) => file.path);
        }

        // Perform the update operation
        const updatedRealEstate = await RealEstate.findByIdAndUpdate(
          req.params.id,
          updatedData,
          { new: true }
        );

        if (!updatedRealEstate) {
          return res.status(404).json({ message: "Real estate not found" });
        }

        res.status(200).json({ message: "Real estate updated successfully" });
      });
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  },

  // Delete a real estate entry by ID
  deleteById: async (req, res) => {
    try {
      const deletedRealEstate = await RealEstate.findByIdAndDelete(
        req.params.id
      );
      if (!deletedRealEstate) {
        return res.status(404).json({ message: "Real estate not found" });
      }
      res.status(200).json({ message: "Real estate deleted successfully" });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },
};

module.exports = realEstateController;
