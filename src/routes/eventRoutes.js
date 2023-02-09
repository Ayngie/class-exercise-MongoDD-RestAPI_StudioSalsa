const express = require("express");

const router = express.Router();
const {
  getAllEvents,
  getEventById,
  createNewEvent,
  updateEventById,
  deleteEventById,
} = require("../controllers/eventController");

// Routes
// GET /api/v1/events - Get all events
router.get("/", getAllEvents);

// GET /api/v1/events/:eventId - Get event by id
router.get("/:eventId", getEventById);

// POST /api/v1/events - Create new event
router.post("/", createNewEvent);

// PUT /api/v1/events/:eventId - Update event (by id)
router.put("/:eventId", updateEventById);

// DELETE /api/v1/events/:eventId - Delete event (by id)
router.delete("/:eventId", deleteEventById);



module.exports = router;
