const mongoose = require("mongoose");

const EventSchema = new mongoose.Schema(
  {
    name: {
        type: String,
        required: true
    },
    startDate: {
        type: String,
        required: true
    },
    endDate: {
      type: String,
      required: true
  },
  startTime: {
    type: String,
    required: true
  },
  endTime: {
    type: String,
    required: true
  },
  location: {
    venue: {
      type: String,
      required: true
    },
    street: {
      type: String,
      required: true
    },
    zipCode: {
      type: String,
      required: true
    },
    city: {
      type: String,
      required: true
    }
  },
    desc: {
      type: String,
      minLength: 3,
      maxLength: 1500,
  },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Event", EventSchema);
