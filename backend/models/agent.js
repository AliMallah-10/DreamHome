const mongoose = require("mongoose");

const agentSchema = new mongoose.Schema(
  {
    fullName: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      validate: {
        validator: function (v) {
          return /\b[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}\b/i.test(v);
        },
        message: (props) => `${props.value} is not a valid email address!`,
      },
    },
    phone: {
      type: String,
      required: true,
      validate: {
        validator: function (v) {
          // Regular expression to match common phone number formats
          return /^(\+\d{1,3}[- ]?)?\d{3,14}$/.test(v);
        },
        message: (props) => `${props.value} is not a valid phone number!`,
      },
    },

    address: {
      type: String,
      required: true,
    },
    bio: {
      type: String,
      required: true,
    },
    image: {
      type: String,
      required: true,
    },

    reference: {
      type: String, // You can change the type according to your requirements
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const Agent = mongoose.model("Agent", agentSchema);

module.exports = Agent;
