const express = require("express");
const router = express.Router();
const realEstateController = require("../controllers/realestateController");

// Routes for real estate CRUD operations
router.post("/addrealestate", realEstateController.create);
router.get("/getallrealstates", realEstateController.getAll);
router.get("/getestatebyid/:id", realEstateController.getById);
router.put("/updaterealestate/:id", realEstateController.updateById);
router.delete("/deleterealestate/:id", realEstateController.deleteById);

module.exports = router;
