// middleware/checkIds.js

const mongoose = require("mongoose");
const User = require("../models/user"); // Import your User model
const Agent = require("../models/agent"); // Import your Agent model

const checkUserAndAgentIds = async (req, res, next) => {
  try {
    // Check if user ID is provided and valid
    if (
      req.body.usersPay &&
      !mongoose.Types.ObjectId.isValid(req.body.usersPay)
    ) {
      return res.status(400).json({ message: "Invalid User ID format" });
    }

    // Check if agent ID is provided and valid
    if (
      req.body.agentId &&
      !mongoose.Types.ObjectId.isValid(req.body.agentId)
    ) {
      return res.status(400).json({ message: "Invalid Agent ID format" });
    }

    // Check if user ID exists
    if (req.body.usersPay) {
      const user = await User.findById(req.body.usersPay);
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }
    }

    // Check if agent ID exists
    if (req.body.agentId) {
      const agent = await Agent.findById(req.body.agentId);
      if (!agent) {
        return res.status(404).json({ message: "Agent not found" });
      }
    }

    // If both user and agent IDs are valid and found, proceed to the next middleware/controller
    next();
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = checkUserAndAgentIds;
