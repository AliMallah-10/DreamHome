const mongoose = require("mongoose");

const homePropertySchema = new mongoose.Schema(
  {
    description: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    location: {
      type: String,
      required: true,
    },
    type: {
      type: String,
      enum: ["sell", "buy", "rent"],
      required: true,
    },
    image: {
      type: String,
      required: true,
    },
    rooms: {
      type: Number,
      required: true,
    },
    buildYear: {
      type: Number,
      required: true,
    },
    areaSize: {
      type: Number,
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    floor: {
      type: Number,
      required: true,
    },
    style: {
      type: String,
      required: true,
    },
    userRef: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      // required: true,
    },
  },
  {
    timestamps: true,
  }
);

const HomeProperty = mongoose.model("HomeProperty", homePropertySchema);

module.exports = HomeProperty;
