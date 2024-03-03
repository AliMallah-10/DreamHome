const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Define schema for realestate
const realestateSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    area: {
      type: Number,
      required: true,
      min: 0,
    },
    kind: {
      type: String,
      enum: ["buy", "sell"],
      required: true,
    },
    images: [
      {
        type: String, // Assuming image URLs are stored as strings
      },
    ],
    place: {
      type: String,
      required: true,
    },
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    amount: {
      type: Number,
      required: true,
      min: 0,
    },
  },
  {
    timestamps: true,
  }
);

// Create the model
const RealEstate = mongoose.model("RealEstate", realestateSchema);

module.exports = RealEstate;
