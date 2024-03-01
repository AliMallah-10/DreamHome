const mongoose = require("mongoose");

const transactionsSchema = new mongoose.Schema(
  {
    userRef: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    propertyRef: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "HomeProperty",
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const Transactions = mongoose.model("Transactions", transactionsSchema);

module.exports = Transactions;
