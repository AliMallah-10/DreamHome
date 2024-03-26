// controllers/agentUserController.js

const AgentUser = require("../models/PayUsersToAgnet");

const agentUserController = {
  createAgentUser: async (req, res) => {
    try {
      const { agentId, agentEmail, usersPay } = req.body;

      const agentUser = new AgentUser({
        agentId,
        agentEmail,
        usersPay,
      });

      const savedAgentUser = await agentUser.save();
      res.status(201).json({
        message: "Agent user created successfully",
      });
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  },

  getAllAgentUsers: async (req, res) => {
    try {
      const agentUsers = await AgentUser.find();
      res.json(agentUsers);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },

  getAgentUserById: async (req, res) => {
    try {
      const agentUser = await AgentUser.findById(req.params.id);
      if (!agentUser) {
        return res.status(404).json({ message: "Agent user not found" });
      }
      res.json(agentUser);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },
  getAgentUsersByUserId: async (req, res) => {
    try {
      const agentUsers = await AgentUser.find({ usersPay: req.params.userId })
        .populate("usersPay", "username email") // Populate usersPay with username and email
        .populate("agentId", "fullName email") // Populate agentId with fullName and email
        .exec();

      res.status(200).json(agentUsers);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },

  getAgentUsersByAgentId: async (req, res) => {
    try {
      const agentUsers = await AgentUser.find({ agentId: req.params.agentId })
        .populate("usersPay", "username email") // Populate usersPay with username and email
        .populate("agentId", "fullName email") // Populate agentId with fullName and email
        .exec();

      res.status(200).json(agentUsers);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },

  updateAgentUser: async (req, res) => {
    try {
      const { agentId, agentEmail, usersPay } = req.body;

      const updatedAgentUser = await AgentUser.findByIdAndUpdate(
        req.params.id,
        { agentId, agentEmail, usersPay },
        { new: true }
      );

      if (!updatedAgentUser) {
        return res.status(404).json({ message: "Agent user not found" });
      }

      res.json({
        message: "Agent user updated successfully",
      });
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  },

  deleteAgentUser: async (req, res) => {
    try {
      const agentUser = await AgentUser.findByIdAndDelete(req.params.id);
      if (!agentUser) {
        return res.status(404).json({ message: "Agent user not found" });
      }
      res.json({ message: "Agent user deleted successfully" });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },
};

module.exports = agentUserController;
