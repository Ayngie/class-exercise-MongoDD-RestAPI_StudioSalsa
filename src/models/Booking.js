const mongoose = require("mongoose");
const Course = require("./Course");


const BookingSchema = new mongoose.Schema(
  {
    fName: {
        type: String,
        required: true,
      },
      lName: {
        type: String,
        required: true,
      },
      partner: {
        type: String,
      },
      email: {
        type: String,
        required: true,
      },
      mobileNumber: {
        type: String,
        required: true
      },
      role: {
        type: String,
        required: true
      },

    course: {
        type: Course,
       required: true
    }

  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Booking", BookingSchema);
