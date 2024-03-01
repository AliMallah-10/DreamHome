const express = require("express");
const router = express.Router();
const transactionController = require("../controllers/transactionControllers");
const userMiddleware = require("../middlewares/userMiddleware");
router.use(userMiddleware.verifyToken);
// Create a new transaction
router.post("/addtransaction", transactionController.createTransaction);

// Get all transactions
router.get("/getAllTransactions", transactionController.getAllTransactions);

// Get a transaction by ID
router.get("/getTransactions/:id", transactionController.getTransactionById);

// Update a transaction by ID
router.put(
  "/updateTransactions/:id",
  transactionController.updateTransactionById
);

// Delete a transaction by ID
router.delete(
  "/deleteTransactions/:id",
  transactionController.deleteTransactionById
);

module.exports = router;
