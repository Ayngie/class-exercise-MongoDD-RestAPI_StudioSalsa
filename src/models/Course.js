const mongoose = require("mongoose");

const CourseSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    previousKnowledge: {
      type: String,
      required: true,
      maxLength: 200,
    },
    instructor: {
        type: [String],
        require: true,
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
    dayOfWeek: {
        type: String,
        required: true
    },
    occasions: {
        type: Number,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    danceType: {
        type: String,
        required: true
    },
   
    level: {
      type: Number,
      require: true,
    },
    term: {
        type: String,
        required: true
    },
    classLengthMins: {
        type: Number,
        required: true
    }, 
    couplesDance: {
        type: Boolean,
        required: true
    },
    maxParticipants: {
        type: Number,
        requred: true,
    }
  
    
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Course", CourseSchema);
