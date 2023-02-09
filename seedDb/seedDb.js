require("dotenv").config();

const mongoose = require("mongoose");

const CourseMockData = require("./courses");
const EventMockData = require("./events");
const Course = require("../src/models/Course");
const Event = require("../src/models/Event");

const populateDbWithMockData = async (connectionString) => {
  try {
    mongoose.set("strictQuery", false);

    const conn = await mongoose.connect(connectionString);

    console.log(`MongoDB connected: ${conn.connection.host}`);

    await Course.create(CourseMockData.courses);
    await Event.create(EventMockData.events);

    console.log("Database successfully populated with test data");
  } catch (error) {
    console.error(error);
  } finally {
    process.exit(0);
  }
};

populateDbWithMockData(process.env.MONGO_CONNECTION_STRING);
