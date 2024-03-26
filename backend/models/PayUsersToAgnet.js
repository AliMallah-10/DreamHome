// models/agentUser.js

const mongoose = require("mongoose");

const agentUserSchema = new mongoose.Schema({
  agentId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Agent",
    required: true,
  },
  agentEmail: {
    type: String,
    // required: true,
  },
  usersPay: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
});

const AgentUser = mongoose.model("AgentUser", agentUserSchema);

module.exports = AgentUser;
