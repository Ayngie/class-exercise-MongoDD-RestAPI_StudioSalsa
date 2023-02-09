const mongoose = require("mongoose");

//vi embeddar bookingschema i courseschema
//detta är ett subdocument
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
      required: true,
    },
    role: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

//parent document
const CourseSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    previousKnowledge: {
      type: String,
      required: true,
      maxLength: 1500,
    },
    instructor: {
      type: [String],
      require: true,
    },
    startDate: {
      type: String,
      required: true,
    },
    endDate: {
      type: String,
      required: true,
    },
    startTime: {
      type: String,
      required: true,
    },
    endTime: {
      type: String,
      required: true,
    },
    dayOfWeek: {
      type: String,
      required: true,
    },
    occasions: {
      type: Number,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    danceType: {
      type: String,
      required: true,
    },

    level: {
      type: Number,
      require: true,
    },
    term: {
      type: String,
      required: true,
    },
    classLengthMins: {
      type: Number,
      required: true,
    },
    couplesDance: {
      type: Boolean,
      required: true,
    },
    maxParticipants: {
      type: Number,
      requred: true,
    },
    bookings: {
      type: [BookingSchema], //en array av subdocuments
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Course", CourseSchema);
