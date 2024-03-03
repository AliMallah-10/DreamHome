const multer = require("multer");
const Agent = require("../models/agent");
const validator = require("email-validator"); // Importing email validation library

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

const agentController = {
  // Middleware to check if email already exists
  checkEmailExists: async (req, res, next) => {
    try {
      const existingAgent = await Agent.findOne({ email: req.body.email });
      if (existingAgent) {
        return res.status(400).json({ message: "Email already exists" });
      }
      next();
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },

  // Middleware to check if phone number already exists
  checkPhoneExists: async (req, res, next) => {
    try {
      const existingAgent = await Agent.findOne({ phone: req.body.phone });
      if (existingAgent) {
        return res.status(400).json({ message: "Phone number already exists" });
      }
      next();
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },

  // Middleware to check if email is valid
  checkValidEmail: async (req, res, next) => {
    const isValidEmail = validator.validate(req.body.email);
    if (!isValidEmail) {
      return res.status(400).json({ message: "Invalid email address" });
    }
    next();
  },

  // Create a new agent
  createAgent: async (req, res) => {
    try {
      upload(req, res, async function (err) {
        if (err instanceof multer.MulterError) {
          return res.status(400).json({ message: err.message });
        } else if (err) {
          return res.status(500).json({ message: err.message });
        }

        const { fullName, email, phone, address, bio, reference } = req.body;
        const image = req.file.path; // Path to the uploaded image

        const agent = new Agent({
          fullName,
          email,
          phone,
          address,
          bio,
          image,
          reference,
        });

        await agent.save();
        res.status(201).json({ message: "Agent created successfully" });
      });
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  },

  // Update agent details
  updateAgent: async (req, res) => {
    try {
      upload(req, res, async function (err) {
        if (err instanceof multer.MulterError) {
          return res.status(400).json({ message: err.message });
        } else if (err) {
          return res.status(500).json({ message: err.message });
        }

        const { fullName, email, phone, address, bio, reference } = req.body;

        const updates = {
          fullName,
          email,
          phone,
          address,
          bio,
          reference,
        };

        if (req.file) {
          updates.image = req.file.path; // Path to the uploaded image
        }

        const agent = await Agent.findByIdAndUpdate(req.params.id, updates, {
          new: true,
        });

        if (!agent) {
          return res.status(404).json({ message: "Agent not found" });
        }

        res.json({ message: "Agent updated successfully" });
      });
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  },

  // Get all agents
  getAllAgents: async (req, res) => {
    try {
      const agents = await Agent.find();
      res.json(agents);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },

  // Get a single agent by ID
  getAgentById: async (req, res) => {
    try {
      const agent = await Agent.findById(req.params.id);
      if (!agent) {
        return res.status(404).json({ message: "Agent not found" });
      }
      res.json(agent);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },

  // Delete an agent
  deleteAgent: async (req, res) => {
    try {
      const agent = await Agent.findByIdAndDelete(req.params.id);
      if (!agent) {
        return res.status(404).json({ message: "Agent not found" });
      }
      res.json({ message: "Agent deleted successfully" });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },
};

module.exports = agentController;
