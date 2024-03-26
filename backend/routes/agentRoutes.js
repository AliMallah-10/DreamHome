const express = require("express");
const agentController = require("../controllers/agentController");

const router = express.Router();
const userMiddleware = require("../middlewares/userMiddleware");
// router.use(userMiddleware.verifyToken);
// Routes for agents
router.post("/addagent", agentController.createAgent);
router.get("/getallagents", agentController.getAllAgents);
router.get("/getagentbyid/:id", agentController.getAgentById);
router.put("/updateagent/:id", agentController.updateAgent);
router.delete("/deleteagent/:id", agentController.deleteAgent);
// Define route to get agent by reference ID
router.get(
  "/agents/reference/:referenceId",
  agentController.getAgentByReferenceId
);

module.exports = router;
