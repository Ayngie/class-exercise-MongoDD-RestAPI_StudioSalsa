require("express-async-errors");
const express = require("express");
const router = express.Router();

const {
  getAllBookings,
  getBookingById,
  createNewBooking,
  updateBooking,
  deleteBooking,
} = require("../controllers/bookingController");

router.get("/", getAllBookings);
router.get("/:restaurantId", getBookingById);
router.post("/", createNewBooking);
router.put("/:restaurantId", updateBooking);
router.delete("/:restaurantId", deleteBooking);
module.exports = router;

//
