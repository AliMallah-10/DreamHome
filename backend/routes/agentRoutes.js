const express = require("express");
const agentController = require("../controllers/agentController");

const router = express.Router();

// Routes for agents
router.post("/addagent", agentController.createAgent);
router.get("/getallagents", agentController.getAllAgents);
router.get("/getagentbyid/:id", agentController.getAgentById);
router.put("/updateagent/:id", agentController.updateAgent);
router.delete("/deleteagent/:id", agentController.deleteAgent);

module.exports = router;
