const Transactions = require("../models/transactions");

// Controller to create a new transaction
exports.createTransaction = async (req, res) => {
  try {
    const { userRef, propertyRef } = req.body;

    // Create a new transaction instance
    const newTransaction = new Transactions({
      userRef,
      propertyRef,
    });

    // Save the transaction to the database
    await newTransaction.save();

    res
      .status(201)
      .json({
        message: "Transaction created successfully",
        transaction: newTransaction,
      });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
};

// Controller to get all transactions with populated fields
exports.getAllTransactions = async (req, res) => {
  try {
    const transactions = await Transactions.find()
      .populate({
        path: "userRef",
        select: "email username",
      })
      .populate({
        path: "propertyRef",
        select: "title style",
      });

    res.status(200).json(transactions);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
};

// Controller to get a transaction by ID with populated fields
exports.getTransactionById = async (req, res) => {
  try {
    const transactionId = req.params.id;

    const transaction = await Transactions.findById(transactionId)
      .populate({
        path: "userRef",
        select: "email username",
      })
      .populate({
        path: "propertyRef",
        select: "title style",
      });

    if (!transaction) {
      return res.status(404).json({ message: "Transaction not found" });
    }

    res.status(200).json(transaction);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
};

// Controller to update a transaction by ID
exports.updateTransactionById = async (req, res) => {
  try {
    const transactionId = req.params.id;
    const { userRef, propertyRef } = req.body;

    const updatedTransaction = await Transactions.findByIdAndUpdate(
      transactionId,
      { userRef, propertyRef },
      { new: true }
    );

    if (!updatedTransaction) {
      return res.status(404).json({ message: "Transaction not found" });
    }

    res
      .status(200)
      .json({
        message: "Transaction updated successfully",
        transaction: updatedTransaction,
      });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
};

// Controller to delete a transaction by ID
exports.deleteTransactionById = async (req, res) => {
  try {
    const transactionId = req.params.id;

    const deletedTransaction = await Transactions.findByIdAndDelete(
      transactionId
    );

    if (!deletedTransaction) {
      return res.status(404).json({ message: "Transaction not found" });
    }

    res.status(200).json({ message: "Transaction deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
};
