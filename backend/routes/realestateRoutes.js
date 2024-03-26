const express = require("express");
const router = express.Router();
const realEstateController = require("../controllers/realestateController");
const userMiddleware = require("../middlewares/userMiddleware");
// router.use(userMiddleware.verifyToken);
// Routes for real estate CRUD operations
router.post("/addrealestate", realEstateController.create);
router.get("/getallrealstates", realEstateController.getAll);
router.get("/getestatebyid/:id", realEstateController.getById);
router.put("/updaterealestate/:id", realEstateController.updateById);
router.delete("/deleterealestate/:id", realEstateController.deleteById);
// Define route to get real estate entries by userAgent
router.get("/getBYagent/:agentId", realEstateController.getAllByAgent);
module.exports = router;
