// routes/agentUsers.js

const express = require("express");
const router = express.Router();
const agentUserController = require("../controllers/payUsersControllers");
const checkid = require("../middlewares/checkIdsMiddlware");
// Routes for agentUsers
router.post("/chooseAgent", checkid, agentUserController.createAgentUser);
router.get("/getallusersPaid/", agentUserController.getAllAgentUsers);
router.get("/getPaidbyid/:id", agentUserController.getAgentUserById);
router.get(
  "/getPaidbyUserID/:userId",
  agentUserController.getAgentUsersByUserId
);
router.get(
  "/getPaidbyAgentID/:agentId",
  agentUserController.getAgentUsersByAgentId
);
router.put("/updatePaiduserbyID/:id", agentUserController.updateAgentUser);
router.delete("/DeleteUserPaid/:id", agentUserController.deleteAgentUser);

module.exports = router;
